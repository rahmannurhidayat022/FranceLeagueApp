import idb from "../helper/idb.js";
import getDate from "../helper/date.js";

const request = idb.open("schedule", 1);

const getAll = () => {
  return new Promise((resolve, reject) => {
    request
      .then((db) => {
        const tx = db.transaction("saved", "readonly");
        const store = tx.objectStore("saved");
        return store.getAll();
      })
      .then(data => resolve(data))
      .catch((Err) => {
        reject("Err getAll : " + Err);
      });
  });
};

const getSavedMatch = () => {
  getAll().then((matches) => {
    const tableSaved = document.querySelector(".match-saved");
    let value = "";
    if (matches && matches.length > 0) {
      matches.forEach((match) => {
        value += _setupCardMatches(match);
      });
      tableSaved.innerHTML = value;
      getIdMatch();
    } else {
      tableSaved.innerHTML = `
      <div class="col s12 center-align">
        <img src="./images/No-Image.webp" alt="noImage" class="responsive-img">
        <p>oops..you haven't added a match card yet</p>
      </div>
      `;
    }
  });
};

const getIdMatch = () => {
  const btnDelete = document.querySelectorAll(".btn-delete");
  btnDelete.forEach((e) => {
    e.addEventListener("click", () => {
      let idMatch = e.dataset.matchid;
      _deleteFromDB(idMatch);
    });
  });
};

const _deleteFromDB = (idMatch) => {
  return new Promise((resolve, reject) => {
    let idMatchInt = parseInt(idMatch);
    request
      .then((db) => {
        const transaction = db.transaction("saved", "readwrite");
        transaction.objectStore("saved").delete(idMatchInt);
        return transaction;
      })
      .then((transaction) => {
        if (transaction.complete) {
          resolve(true);
          M.toast({ html: "Match is Deleted" });
          getSavedMatch();
        } else {
          reject(new Error(transaction.onerror));
        }
      });
  });
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
              <a class="btn-floating btn-large halfway-fab waves-effect waves-light red btn-delete" data-matchid="${m.id}">
                <i class="material-icons">clear</i>
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

export default getSavedMatch;
