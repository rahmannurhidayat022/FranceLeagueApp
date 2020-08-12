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

//ServiceWorkerWebpackPlugin Registration
import runtime from "serviceworker-webpack-plugin/lib/runtime.js";

document.addEventListener("DOMContentLoaded", async () => {
  if ("serviceWorker" in navigator) {
    const registration = await runtime.register();
    registration
      .then(status => {
        if (status.active) {
          console.log('[SW] Actived!');
          notification();
        } else {
          console.error('[SW] Failed to registration!');
          throw onerror;
        }
      })
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }
});

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
  navigator.serviceWorker.ready.then(() => {
    if (('PushManager' in window)) {
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
  })
};
