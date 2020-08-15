import enums from "../utils/enums.js";
import request from "../helper/request.js";
import getDate from "../helper/date.js";
import { dataDB } from "./db.js";

const ENDPOINT = `${enums.BASE_URL}competitions/${enums.LEAGUE_CODE}/matches?status=SCHEDULED`;

const nextMatches = () => {
  return new Promise((resolve, reject) => {
    console.log("caches" in window);
    if ("caches" in window) {
      caches.match(ENDPOINT).then((res) => {
        if (res) {
          res.json().then((data) => {
            showMatches(data);
            resolve(data);
          });
        }
      });
    }

    fetch(ENDPOINT, {
      headers: {
        "X-Auth-Token": enums.API_KEY,
      },
    })
      .then(request.status)
      .then(request.json)
      .then(async (data) => {
        showMatches(data);
        if (data) {
          await resolve(data);
        } else {
          reject(new Error("data not found " + data));
        }
      })
      .catch(request.Error);
  });
};

const showMatches = (data) => {
  let value = "";
  const tableMatches = document.querySelector(".next-match");
  const alertMatch = document.querySelector(".alert-match");
  data.matches.forEach((match) => {
    value += _setupCardMatches(match);
  });
  tableMatches.innerHTML = value;
  alertMatch.innerHTML = _setBlockquotes(data.matches[0]);
  _sendIdMatch();
};

const _sendIdMatch = () => {
  const btnSave = document.querySelectorAll(".save-match");
  btnSave.forEach((e) => {
    e.addEventListener("click", async () => {
      let idMatch = e.dataset.matchid;
      await dataDB(idMatch);

      e.remove();
    });
  });
};

const _setBlockquotes = (m) => {
  return `
  <blockquote class="yellow p2 center-align">
    This league will begin in ${getDate(m.season.startDate)} until ${getDate(m.season.endDate)}
  </blockquote>
  `;
};

const _setupCardMatches = (m) => {
  return `
  <div class="col s12 m6 l4">
    <div class="card card-matches">
        <div class="card-image">
              <img src="./images/card-image.webp" height="200">
              <span class="card-title black-text">
                  <b>${getDate(m.utcDate)}</b>
              </span>
              <a class="btn-floating btn-large halfway-fab waves-effect waves-light red save-match" data-matchid="${m.id}">
                <i class="material-icons">add</i>
              </a>
        </div>
        <div class="card-content center-align">
              <div class="row">
                  <div class="col s5">
                        <b>Home Team</b>
                  </div>
                  <div class="col s2"></div>
                  <div class="col s5">
                        <b>Away Team</b>
                  </div>
              </div>
              <div class="row">
                  <div class="col s5">${m.homeTeam.name}</div>
                  <div class="col s2"> VS </div>
                  <div class="col s5">${m.awayTeam.name}</div>
              </div>
        </div>
    </div>
  </div>
  `;
};

export default nextMatches;
