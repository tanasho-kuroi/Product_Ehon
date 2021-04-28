// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC4zb_-tmQ_V9Z0pjSIU-inQczMeRr7F-w',
  authDomain: 'jsehon-1a4e0.firebaseapp.com',
  projectId: 'jsehon-1a4e0',
  storageBucket: 'jsehon-1a4e0.appspot.com',
  messagingSenderId: '132518767095',
  appId: '1:132518767095:web:13bcef879592d7e75926f2',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// set instance
const form = document.querySelector('form');
const imgSample = document.getElementById('page5');
// const imgSample = document.getElementsByClassName('imgUpC');
const fileUp = document.getElementById('fileup');
const storage = firebase.storage(); //Cloud Storage

// grobal variable
var file_name;
var blob;
// var nowpage;

// fileUpが変更された際に処理開始
fileUp.addEventListener('change', (e) => {
  e.preventDefault(); //ページ遷移をなくす
  // imgSample.parentNode.removeChild(imgSample);
  var file = e.target.files;
  file_name = file[0].name; //file name取得
  nowpage = 1; //ページ数取得
  blob = new Blob(file, { type: 'image/jpeg' }); //blob形式
  console.warn(blob);
  // storageのarea_imagesへの参照を定義
  var uploadRef = storage.ref(`${nowpage}`).child(file_name);
  uploadRef.put(blob).then((snapshot) => {
    console.log(snapshot.state);
    // URL取得
    uploadRef
      .getDownloadURL()
      .then((url) => {
        //HTMLに表示
        // imgSample.style.backgroundImage = 'url(' + url + ')';
        imgSample.src = url;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // value リセットする
  file_name = '';
  blob = '';
});

//////////////// ページ読み込みの際に画像DL ///////////////
nowpage = 1; //ページ数取得
file_name = 'dousei_couple.png'; //file_name 取得

//ストレージのルートのリファレンスを取得
var storageRef = firebase.storage().ref(`${nowpage}`);
//ストレージのルートにあるsample.pngのリファレンスを取得
var imgSampleR = storageRef.child(file_name);

window.onload = function () {
  //htmlロード完了したらストレージの画像を表示してみる
  imgSampleR
    .getDownloadURL()
    .then(function (url) {
      document.getElementById('page5').style.backgroundImage = 'url(' + url + ')';
    })
    .catch(function (error) {
      // Handle any errors
      console.log(error);
    });
};
