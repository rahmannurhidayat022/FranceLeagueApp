const webPush = require("web-push");

const vapidKeys = {
  publicKey: "BBL-UhD2H1iPLAPJJKnb9tvD1EwsG7qWqxhUyBMfs7SAzP9v_yrOw83tQj65ZNjSgOOgQ4nfIoX-2RyfXwLfgOw",
  privateKey: "Jv5pNv05H43IdvgL48YjWFzR-7Wuva956Yj_4-JkvRY",
};

webPush.setVapidDetails("mailto: rahmannurhidayat022@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);
const pushSubscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/e1vZ5CxnM-Y:APA91bF8hQ9Kz6qHULLRP0RGVqdQB2KPmMEt72QfxDoHjXqp3jn9g1-9eb_TWJoZMaqsi9ihTqhwqDzWDw9bq3EFAvRZfrAZ8fUe6QKRPxO_BkFiIG_NAhkXbNhH89So8sfmpVk124B3",
  keys: {
    p256dh: "BOj17aqFn4JN4x47Td4IH/I+cHeKXDygH34sJQ4OUPxuo7gwgyX93pYLSfC/0+SZ/nUGVbGMwCyJyqbLMsHXY6s=",
    auth: "HFsdOhA3F5aed+SZ3O5T4Q==",
  },
};
const payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

const options = {
  gcmAPIKey: "248887263118",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
