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
        value += setTableValue(match);
      });
      tableSaved.innerHTML = value;
      getIdMatch();
    } else {
      tableSaved.innerHTML = `
      <tr>
        <td>Empty</td>
        <td>Empty</td>
        <td>VS</td>
        <td>Empty</td>
        <td class="center-align">
            <button class="btn btn-delete red disabled" data-matchid="Empty">Delete</button>
        </td>
      </tr>
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

const setTableValue = (m) => {
  return `
  <tr>
    <td>${getDate(m.utcDate)}</td>
    <td>${m.homeTeam.name}</td>
    <td>VS</td>
    <td>${m.awayTeam.name}</td>
    <td class="center-align">
          <button class="btn btn-delete red" data-matchid="${m.id}">Delete</button>
    </td>
  </tr>
  `;
};

export default getSavedMatch;
