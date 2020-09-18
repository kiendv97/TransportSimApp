firebase.initializeApp({
    apiKey: "AIzaSyB1BHs4F0IZ3Rre8pXaTjl9PC32oCHQ0Xc",
    authDomain: "giaosim-25a66.firebaseapp.com",
    databaseURL: "https://giaosim-25a66.firebaseio.com",
    projectId: "giaosim-25a66",
    storageBucket: "giaosim-25a66.appspot.com",
    messagingSenderId: "G-E6R3128ZBM",
    appId: "1:1002712245481:web:e4e71ed57c09b03d3ebc78",
    measurementId: "G-E6R3128ZBM",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// firebase.analytics();
const messaging = firebase.messaging();

messaging.usePublicVapidKey('BKjO5jF0o1JmDVvpaJ4_QSSnIXcxScOJIhgktgfU_1KHNekecU-7l7MWIftT9NOHETRjTXgWM1hJUcgH1yEg4lU');
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
});
messaging.onTokenRefresh(() => {
    //When the token is updated, onTokenRefresh is called.
    messaging.getToken().then((refreshedToken) => {
        console.log(refreshedToken)
    }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
    });
});
