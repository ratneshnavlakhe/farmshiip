var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addRobot = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const qrcode = req.query.qrcode;
  admin.database().ref('/robot').once('value').then(snapshot => {
  const data = snapshot.val();
  var robot;
    data.map(function(x) {
      if (x.robot_id == qrcode) {
        robot = x.robot_id;
      }
    });
    console.log('logged robot '+robot);
    admin.database().ref('/controller/'+robot).set({
      connection_status: true,
      direction: 'x',
      spray: false
    });
    res.send("Hello from Firebase!");
  });
});
