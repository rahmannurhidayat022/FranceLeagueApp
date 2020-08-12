import enums from "../utils/enums.js";
import request from "../helper/request.js";
import getDate from "../helper/date.js";
import { dataDB } from "./db.js";

const ENDPOINT = `${enums.BASE_URL}competitions/${enums.LEAGUE_CODE}/matches?status=SCHEDULED`;

const nextMatches = () => {
  return new Promise((resolve, reject) => {
    console.log("caches" in window)
    if ("caches" in window) {
      global.caches.match(ENDPOINT).then((res) => {
        if (res) {
          res.json().then((data) => {
            showMatches(data);
            resolve(data)
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
  }
  );
};

const showMatches = (data) => {
  let value = "";
  const tableMatches = document.querySelector(".next-match");
  const alertMatch = document.querySelector(".alert-match");
  data.matches.forEach((match) => {
    value += _setTableValue(match);
  });
  tableMatches.innerHTML = _setTable(value);
  alertMatch.innerHTML = _setBlockquotes(data.matches[0]);
  _sendIdMatch();
};

const _sendIdMatch = () => {
  const btnSave = document.querySelectorAll(".save-match");
  btnSave.forEach((e) => {
    e.addEventListener("click", () => {
      let idMatch = e.dataset.matchid;
      dataDB(idMatch);
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

const _setTableValue = (m) => {
  return `
     <tr>
          <td>${getDate(m.utcDate)}</td>
          <td>${m.homeTeam.name}</td>
          <td>VS</td>
          <td>${m.awayTeam.name}</td>
          <td class="center-align">
          <button class="btn save-match" data-matchid="${m.id}">Save</button>
          </td>
     </tr>
     `;
};

const _setTable = (value) => {
  return `
     <table class="responsive-table highlight">
          <thead>
               <tr>
                    <th>Date</th>
                    <th>Home Team</th>
                    <th> </th>
                    <th>Away Team</th>
                    <th class="center-align">Save Match</th>
               </tr>
          </thead> 
          <tbody>
               ${value}
          </tbody>
     </table>
     `;
};

export default nextMatches;
