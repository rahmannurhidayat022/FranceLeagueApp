const webPush = require("web-push");

const vapidKeys = {
  publicKey: "BBL-UhD2H1iPLAPJJKnb9tvD1EwsG7qWqxhUyBMfs7SAzP9v_yrOw83tQj65ZNjSgOOgQ4nfIoX-2RyfXwLfgOw",
  privateKey: "Jv5pNv05H43IdvgL48YjWFzR-7Wuva956Yj_4-JkvRY",
};

webPush.setVapidDetails("mailto: rahmannurhidayat022@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);
const pushSubscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/cUCQkOEeoH8:APA91bHQTgu-y2lHiuKBoswMJyzf2Or-KUD6Sb_xy5KAQoVXX1IHgw-RyQyfWpg9_UfG51OOLgLUi16l3XwZ1a-5YhvkkizatHdqQovq9GEWLgwEFvwIgWHooqy7k8VEwLPja_k_RcTc",
  keys: {
    p256dh: "BDbeatuKTSodCc3O3zUUPJd2O6jmmOQntdbEHx7pJDOF02IOEv+xvnTYyq0q3j538tiklqLhq9x/pxw0FVVL28o=",
    auth: "djyMJF4C48feJQjz1CneDA==",
  },
};
const payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

const options = {
  gcmAPIKey: "248887263118",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
