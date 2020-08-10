import idb from "../helper/idb.js";

const request = idb.open("schedule", 1, (upgradeDB) => {
  if (!upgradeDB.objectStoreNames.contains("match")) {
    const matches = upgradeDB.createObjectStore("match", { keyPath: "id", autoIncrement: true });
    matches.createIndex("id", "id", { unique: true });
    const saveMatches = upgradeDB.createObjectStore("saved", { keyPath: "id", autoIncrement: true });
    saveMatches.createIndex("id", "id", { unique: true });
  }
});

request.onsuccess = (e) => {
  console.log("DB installed" + e.target.result);
};

request.onerror = (e) => {
  console.log("Error DB : " + e.target.result);
};

const getAllMatch = async (data) => {
  if (data && data.matches.length > 0) {
    const payload = [];
    data.matches.forEach((match) => {
      const { utcDate, homeTeam, awayTeam } = match;
      payload.push({
        id: match.id,
        utcDate,
        homeTeam,
        awayTeam,
      });
    });
    await clearingValueDB("match"); /** mengecek apakah ada double ID,jika iya Hapus Id tsb */
    insertToDB("match", payload);
  }
};

const clearingValueDB = async (name) => {
  if (request) {
    const db = await request;
    const store = await db.transaction(name, "readwrite").objectStore(name);
    await store.clear();
  }
};

const insertToDB = async (name, items = [], key = "id") => {
  if (request) {
    const db = await request;
    const store = await db.transaction(name, "readwrite").objectStore(name);

    if (items.length > 0) {
      items.forEach(async (data) => {
        const exist = await store.get(data[key]);
        if (exist) {
          /** Jika ID match yang didapat sama dengan yang ada di DB,
           * Maka gunakan Method PUT()
           */
          data.createdAt = exist.createdAt;
          data.updatedAt = new Date();
          await store.put(data);
        } else {
          /** Jika ID match yang didapat tidak sama dengan yang ada di DB,
           * Maka gunakan Method ADD()
           */
          data.createdAt = new Date();
          data.updatedAt = null;
          await store.add(data);
        }
      });
    }

    return await store.complete;
  } else {
    return [];
  }
};

const dataDB = (idMatch) => {
  return new Promise((resolve, reject) => {
    let idMatchInt = parseInt(idMatch);
    request
      .then((db) => {
        const tx = db.transaction("match", "readonly");
        const store = tx.objectStore("match");

        return store.get(idMatchInt);
      })
      .then((data) => {
        if (data) {
          _getSaveMatch(data);
          resolve(true);
          M.toast({ html: "Match is Saved" });
        } else {
          reject(new Error(data.onerror));
        }
      });
  });
};

const _getSaveMatch = async (match) => {
  const payload = [];
  const { utcDate, homeTeam, awayTeam } = match;
  payload.push({
    id: match.id,
    utcDate,
    homeTeam,
    awayTeam,
  });
  insertToDB("saved", payload);
};

export { getAllMatch, dataDB };
