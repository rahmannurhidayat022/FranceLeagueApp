import enums from "../utils/enums.js";
import request from "../helper/request.js";
import urlReplace from "../helper/urlReplace.js";

const ENDPOINT = `${enums.BASE_URL}competitions/${enums.LEAGUE_CODE}/standings`;

const getStandings = () => {
  if ("caches" in window) {
    global.caches.match(ENDPOINT).then((res) => {
      if (res) {
        res.json().then((data) => {
          showStandings(data);
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
    .then((data) => {
      showStandings(data);
    })
    .catch(request.Error);
};

const showStandings = (data) => {
  let value = "";
  const tableStandings = document.querySelector("#standings");
  data.standings[0].table.forEach((standing) => {
    value += setTableValue(standing);
  });
  tableStandings.innerHTML = setTable(value);
};

const setTableValue = (m) => {
  return `
     <tr>
          <td><img src="${urlReplace(m.team.crestUrl)}" width="30px" alt="badge"/></td>
          <td>${m.team.name}</td>
          <td>${m.won}</td>
          <td>${m.draw}</td>
          <td>${m.lost}</td>
          <td>${m.points}</td>
          <td>${m.goalsFor}</td>
          <td>${m.goalsAgainst}</td>
          <td>${m.goalDifference}</td>
     </tr>
     `;
};

const setTable = (value) => {
  return `
     <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
     <table class="striped responsive-table">
          <thead>
               <tr>
                    <th></th>
                    <th>Team Name</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>P</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
               </tr>
               </thead>
          <tbody id="standingsValue">
               ${value}
          </tbody>
     </table>
     </div>`;
};

export default getStandings;
