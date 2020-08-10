import "regenerator-runtime";

// import materialize
import "./styles/materialize.min.css";
import "./script/helper/materialize.min.js";

//import css native
import "./styles/style.css";

//Javascript
import "./script/component/nav-bar.js";
import "./script/component/nav.js";
import "./script/component/footer.js";
import enums from "./script/utils/enums.js";
import urlBase64 from "./script/helper/urlBase64.js";

document.addEventListener("DOMContentLoaded", async () => {
  if ("serviceWorker" in navigator) {
    await registerServiceWorker();
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }
});

const registerServiceWorker = () => {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => {
        console.log("Pendaftaran ServiceWorker berhasil !!");
        notification();
      })
      .catch(() => {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
};

const notification = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }

      console.log("Fitur notifikasi diijinkan.");
      pushManager();

    });
  } else {
    console.error("Browser tidak mendukung notifikasi.");
  }
};

const pushManager = () => {
  if ("PushManager" in window) {
    navigator.serviceWorker.getRegistration().then(function (registration) {
      if (registration) {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64(`${enums.PUBLIC_KEY}`),
          })
          .then((subscribe) => {
            console.log("Berhasil melakukan subscribe dengan endpoint: ", subscribe.endpoint);
            console.log("Berhasil melakukan subscribe dengan p256dh key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
            console.log("Berhasil melakukan subscribe dengan auth key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
          })
          .catch((e) => {
            console.error("Tidak dapat melakukan subscribe ", e.message);
          });
      }
    });
  }
};
