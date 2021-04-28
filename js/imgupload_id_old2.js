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

// grobal variable

// nowpage = 5; //nowpageはグローバルで取得済み

// set instance
const form = document.querySelector('form');
// const imgSample = document.getElementById('imgSample');
let imgSample = document.getElementById('page3');
const fileUp = document.getElementById('fileup');
const storage = firebase.storage(); //Cloud Storage

let file_name;
let blob;
let idName;
let upPage;
upPage = Math.ceil(nowpage / 2);
idName = 'page' + upPage; //page数をid名に反映

// fileUpが変更された際に処理開始
fileUp.addEventListener('change', (e, page) => {
  e.preventDefault(); //ページ遷移をなくす
  nowpage = $('#flipbook').turn('page'); //page数の取得

  upPage = Math.floor(nowpage / 2);
  idName = 'page' + upPage; //page数をid名に反映
  console.log(idName);
  imgSample = document.getElementById(idName);
  // console.log(imgSample);
  var file = e.target.files;
  file_name = file[0].name; //file name取得
  blob = new Blob(file, { type: 'image/jpeg' }); //blob形式
  console.warn(blob);

  // localstrageにPage数とファイル名を保存(その前に、同じPage数のもの削除)
  const dataPath = {
    pageLocal: upPage,
    fileLocal: file_name,
  };
  const jsonData = JSON.stringify(dataPath); //配列をJSONdata(文字列)変換
  localStorage.removeItem(idName); // localstorageに既に保存済みの、同じPage数のPath削除
  localStorage.setItem(idName, jsonData); // localstorageに保存

  // storageのarea_imagesへの参照を定義
  let uploadRef = storage.ref(`${upPage}`).child(file_name);
  uploadRef.put(blob).then((snapshot) => {
    console.log(snapshot.state);
    // URL取得
    uploadRef
      .getDownloadURL()
      .then((url) => {
        //HTMLに表示
        // imgSample.style.backgroundImage = 'url(' + url + ')';
        imgSample.src = url;
        var orgWidth = imgSample.width; // 元の横幅を保存
        var orgHeight = imgSample.height; // 元の高さを保存

        imgSample.style.width = 520 + 'px';
        // imgSample.height = orgHeight * (imgSample.width / orgWidth); //縦横比維持
        // 元の縦横比でやろうとしたけど、、、逆におかしくなる？
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
// file_name = 'dousei_couple.png'; //file_name 取得

// //ストレージのルートのリファレンスを取得
// let storageRef = firebase.storage().ref(`${upPage}`);
// //ストレージのルートにあるsample.pngのリファレンスを取得
// let imgSampleR = storageRef.child(file_name);

window.onload = function () {
  let storageRef;
  let imgSampleR;
  let uploadRef;
  let jsonData;
  let data;

  // local storage からパス読み込み
  const ProcessP0 = async function () {
    upPage = 0;
    idName = 'page' + upPage;
    if (localStorage.getItem(idName)) {
      jsonData = localStorage.getItem(idName);
      data = JSON.parse(jsonData);
      console.log(data);
      file_name = data.fileLocal;
    }
    //ストレージのルートのリファレンスを取得
    storageRef = firebase.storage().ref(`${upPage}`);
    //ストレージのルートにあるsample.pngのリファレンスを取得
    imgSampleR = storageRef.child(file_name);

    //htmlロード完了したらストレージの画像を表示してみる
    imgSampleR.getDownloadURL().then(function (url) {
      console.log(idName);
      // document.getElementById(idName).style.backgroundImage = 'url(' + url + ')';

      imgSampleR = document.getElementById(idName);
      uploadRef = storage.ref(`${upPage}`).child(file_name);
      uploadRef
        .getDownloadURL()
        .then((url) => {
          //HTMLに表示
          // imgSampleR.style.backgroundImage = 'url(' + url + ')';
          console.log(url);
          imgSampleR.src = url;
          var orgWidth = imgSampleR.width; // 元の横幅を保存
          var orgHeight = imgSampleR.height; // 元の高さを保存

          imgSampleR.style.width = 520 + 'px';
          // imgSample.height = orgHeight * (imgSample.width / orgWidth); //縦横比維持
          // 元の縦横比でやろうとしたけど、、、逆におかしくなる？
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const ProcessP1 = async function () {
    upPage = 1;
    idName = 'page' + upPage;
    if (localStorage.getItem(idName)) {
      jsonData = localStorage.getItem(idName);
      data = JSON.parse(jsonData);
      console.log(data);
      file_name = data.fileLocal;
    }
    //ストレージのルートのリファレンスを取得
    storageRef = firebase.storage().ref(`${upPage}`);
    //ストレージのルートにあるsample.pngのリファレンスを取得
    imgSampleR = storageRef.child(file_name);

    //htmlロード完了したらストレージの画像を表示してみる
    imgSampleR.getDownloadURL().then(function (url) {
      console.log(idName);
      // document.getElementById(idName).style.backgroundImage = 'url(' + url + ')';

      imgSampleR = document.getElementById(idName);
      uploadRef = storage.ref(`${upPage}`).child(file_name);
      uploadRef
        .getDownloadURL()
        .then((url) => {
          //HTMLに表示
          // imgSampleR.style.backgroundImage = 'url(' + url + ')';
          console.log(url);
          imgSampleR.src = url;
          var orgWidth = imgSampleR.width; // 元の横幅を保存
          var orgHeight = imgSampleR.height; // 元の高さを保存

          imgSampleR.style.width = 520 + 'px';
          // imgSample.height = orgHeight * (imgSample.width / orgWidth); //縦横比維持
          // 元の縦横比でやろうとしたけど、、、逆におかしくなる？
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const processAll = async function () {
    await ProcessP0();
    await ProcessP1();
  };
  processAll;
};

window.onload = function () {
  let storageRef;
  let imgSampleR;
  let uploadRef;
  let jsonData;
  let data;

  for (let i = 0; i <= 4; i++) {
    upPage = i;
    idName = 'page' + upPage;
    if (localStorage.getItem(idName)) {
      jsonData = localStorage.getItem(idName);
      data = JSON.parse(jsonData);
      console.log(data);
      file_name = data.fileLocal;
    }
    // https://firebasestorage.googleapis.com/v0/b/jsehon-1a4e0.appspot.com/o/2%2Ficon1.png?alt=media&token=4d8b1956-db91-42ce-8c13-43c3f4059be4
    // https://firebasestorage.googleapis.com/v0/b/jsehon-1a4e0.appspot.com/o/3%2Ficon1.png?alt=media&token=86541021-85b2-43d3-8c4a-a4213b7ada70
    // (Page3,4だけエラー) TypeError: Cannot set property 'src' of null

    //ストレージのルートのリファレンスを取得
    storageRef = firebase.storage().ref(`${upPage}`);
    //ストレージのルートにあるsample.pngのリファレンスを取得
    imgSampleR = storageRef.child(file_name);

    //htmlロード完了したらストレージの画像を表示してみる
    imgSampleR.getDownloadURL().then(function (url) {
      console.log(idName);
      // document.getElementById(idName).style.backgroundImage = 'url(' + url + ')';

      imgSampleR = document.getElementById(idName);
      uploadRef = storage.ref(`${upPage}`).child(file_name);
      uploadRef
        .getDownloadURL()
        .then((url) => {
          //HTMLに表示
          // imgSampleR.style.backgroundImage = 'url(' + url + ')';
          console.log(url);
          imgSampleR.src = url;
          var orgWidth = imgSampleR.width; // 元の横幅を保存
          var orgHeight = imgSampleR.height; // 元の高さを保存

          imgSampleR.style.width = 520 + 'px';
          // imgSample.height = orgHeight * (imgSample.width / orgWidth); //縦横比維持
          // 元の縦横比でやろうとしたけど、、、逆におかしくなる？
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
};
