// let nowpage;
nowpage = 1;

$(function () {
  $('#flipbook').turn({
    elevation: 30,
    duration: 1000,
    gradients: true,
    autoCenter: false,
  });
  console.log(nowpage);
});
