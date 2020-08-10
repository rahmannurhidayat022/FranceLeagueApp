const webPush = require("web-push");

const vapidKeys = {
  publicKey: "BBL-UhD2H1iPLAPJJKnb9tvD1EwsG7qWqxhUyBMfs7SAzP9v_yrOw83tQj65ZNjSgOOgQ4nfIoX-2RyfXwLfgOw",
  privateKey: "Jv5pNv05H43IdvgL48YjWFzR-7Wuva956Yj_4-JkvRY",
};

webPush.setVapidDetails("mailto:rahmannurhidayat022", vapidKeys.publicKey, vapidKeys.privateKey);
const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cD9ZUgAd7BQ:APA91bEPxhgJWrpYReD-o7v0L1lZLCE36JQMkGMGQ3nzKqbIC3NMAnis1Z4KD4utia3rp5IokEEd8P5zGS8JT6vjl7NoNsWtX4LEHaOGQ9VZg55LoRQs0cs5yj4Q_Y1gUw4kr2pt6gye",
  keys: {
    p256dh: "BJxC+ZVp7eMwwOqW7beGVQfgo5GadueCxBnfyo0Y3tJ5imNbLl/yo1JTqUOtYBJFVuNKdFh2b7TMfB6JDmIOl9Q=",
    auth: "E0bUniF1ZgIijrMXvP7BGA==",
  },
};
const payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

const options = {
  gcmAPIKey: "248887263118",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
