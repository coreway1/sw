importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js');


const config = {
    apiKey: "AIzaSyCh7jZ9eRWeiyj9GF6G9tWBhUsqZghB4U0",
    authDomain: "testphp-33d2a.firebaseapp.com",
    projectId: "testphp-33d2a",
    storageBucket: "testphp-33d2a.appspot.com",
    messagingSenderId: "195167984137",
    appId: "1:195167984137:web:83226bef72f5960426f6d8"
  };
  firebase.initializeApp(config);
  
  // Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

console.log(messaging);


messaging.setBackgroundMessageHandler(function(payload) {
    
 var  title =payload.data.title;
  
 var options ={
        body: payload.data.body,
        icon: payload.data.icon,
        image: payload.data.image,
        data:{
            time: new Date(Date.now()).toString(),
            click_action: payload.data.click_action
        },
        actions: JSON.parse(payload.data.actions)
      
  };
 return self.registration.showNotification(title, options);

  
});


self.addEventListener('notificationclick', function(event) {
   var action_click=event.action ? event.action : event.notification.data.click_action ? event.notification.data.click_action : '/';  
  event.notification.close();

  event.waitUntil(
    clients.openWindow(action_click)
  );
});