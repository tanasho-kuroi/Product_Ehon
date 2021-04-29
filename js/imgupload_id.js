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
// set instance
const form = document.querySelector('form');
// const imgSample = document.getElementById('imgSample');
let imgSample = document.getElementById('page3');
const fileUp = document.getElementById('fileup');
const storage = firebase.storage(); //Cloud Storage
const flipBook = document.getElementById('flipbook');

let file_name; //画像のファイル名
let blob;
let idName; //写真をUPするHTMLのID名
let upPage; //写真をアップするページ(数)
let imgSampleR; //firebase上の画像URL
let readMaxPage; //読み込んだページのMax値。これ以下のページは読み込みしない(２重読み込み防止)。
readMaxPage = 1;

///////////  開いているPageから写真のPath取得  /////////////
const getPicPath = function (upPage) {
  idName = 'page' + upPage; //page数をid名に反映
  console.log(upPage);
  imgSampleR = document.getElementById(idName);
  // console.log(idName);
  // console.log(imgSampleR);
  return imgSampleR;
};

///////////  local storageから画像のファイル名取得  /////////////
const getLocalStoragePath = function (idName) {
  if (localStorage.getItem(idName)) {
    jsonData = localStorage.getItem(idName);
    data = JSON.parse(jsonData);
    // console.log(data);
    file_name = data.fileLocal;
  }
  return file_name;
};

///////////  画像アップロード  /////////////
const imgUploadBook = function (upPage, file_name) {
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
      // 元の縦横比でやろうとした
    })
    .catch(function (error) {
      // Handle any errors
      console.log(error);
    });
  return uploadRef;
};

////// flipBookが変更された際に処理開始 //////
flipBook.addEventListener('click', (e, page) => {
  nowPage = $('#flipbook').turn('page'); //page数の取得
  upPage = Math.floor(nowPage / 2) + 1; //1ページ先ということで,+1

  if (upPage > readMaxPage) {
    //  開いているPageから写真のPath取得
    imgSampleR = getPicPath(upPage);

    //  local storageから画像のファイル名取得
    file_name = getLocalStoragePath(idName);
    console.log(file_name);

    // 画像アップロード
    uploadRef = imgUploadBook(upPage, file_name);

    readMaxPage = upPage; //readMaxPageの更新
  }
  console.log(readMaxPage);
  console.log(upPage);
});

// fileUpが変更された際に処理開始
fileUp.addEventListener('change', (e, page) => {
  // e.preventDefault(); //ページ遷移をなくす
  nowPage = $('#flipbook').turn('page'); //page数の取得

  upPage = Math.floor(nowPage / 2);
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

window.onload = function () {
  //htmlロード完了したらストレージの画像を表示してみる
  upPage = 0;
  //  開いているPageから写真のPath取得
  imgSampleR = getPicPath(upPage);

  //  local storageから画像のファイル名取得
  file_name = getLocalStoragePath(idName);
  console.log(file_name);

  // 画像アップロード
  uploadRef = imgUploadBook(upPage, file_name);

  if (upPage > readMaxPage) {
    readMaxPage = upPage;
  } //readMaxPageの更新
};
