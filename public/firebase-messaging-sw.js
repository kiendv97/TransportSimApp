// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
importScripts("https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.3.0/firebase-messaging.js");
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyB1BHs4F0IZ3Rre8pXaTjl9PC32oCHQ0Xc",
    authDomain: "giaosim-25a66.firebaseapp.com",
    databaseURL: "https://giaosim-25a66.firebaseio.com",
    projectId: "giaosim-25a66",
    storageBucket: "giaosim-25a66.appspot.com",
    messagingSenderId: "1002712245481",
    appId: "1:1002712245481:web:e4e71ed57c09b03d3ebc78",
    measurementId: "G-E6R3128ZBM"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// firebase.analytics();
const messaging = firebase.messaging();

// When a notification is received, the push event is called.
self.addEventListener('push', function (event) {

    console.log("event:push")
    let messageTitle = "MESSAGETITLE"
    let messageBody = "MESSAGEBODY"
    let messageTag = "MESSAGETAG"

    const notificationPromise = self.registration.showNotification(
        messageTitle,
        {
            body: messageBody,
            tag: messageTag
        });

    event.waitUntil(notificationPromise);

}, false)

// If the web application is in the background, setBackGroundMessageHandler is called.
messaging.setBackgroundMessageHandler(function (payload) {

    console.log("backgroundMessage", payload)

    let messageTitle = 'test'
    let messageBody = "MESSAGEBODY"
    let messageTag = "MESSAGEBODY"

    return self.registration.showNotification(
        messageTitle,
        {
            body: messageBody,
            tag: messageTag
        });
});