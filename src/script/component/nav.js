import nextMatches from "../js/home.js";
import getStandings from "../js/standings.js";
import { getAllMatch } from "../js/db.js";
import getSavedMatch from "../js/saved.js";

document.addEventListener("DOMContentLoaded", function () {
  // SIDEBAR NAVIGATION
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
          elm.addEventListener("click", function (event) {
            let sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "./nav.html", true);
    xhttp.send();
  }

  // Load page content
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        let content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;

          //load per-page
          if (page === "home") {
            //slider image pada home page
            let sliderInHomePage = document.querySelectorAll(".slider");
            M.Slider.init(sliderInHomePage);

            //ambil jadwal petandingan
            let matches = nextMatches();

            //simpan semua match ke DB
            matches.then((data) => {
              getAllMatch(data);
            });
          } else if (page === "standings") {
            //ambil klasemen
            getStandings();
          } else if (page === "saved") {
            //tampilkan match yang sudah terSave
            getSavedMatch();
          }
        } else if (this.status == 404) {
          content.innerHTML = `
          <div class="not-found container center-align">
            <h1>Ops...</h1>
            <p>page not available</p>
          </div>
          `;
        } else {
          content.innerHTML = `
          <div class="not-found container center-align">
            <h1>Ops...</h1>
            <p>the page cannot be accessed</p>
          </div>
          `;
        }
      }
    };
    xhttp.open("GET", "./" + page + ".html", true);
    xhttp.send();
  }
});
