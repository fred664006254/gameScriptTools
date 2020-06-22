require('./weapp-adapter.js');
require('./platform.js');
require('./manifest.js');
require('./egret.wxgame.js');

// 启动微信小游戏本地缓存，如果开发者不需要此功能，只需注释即可
// require('./library/image.js');
// require('./library/text.js');

let runOptions = {
  //以下为自动修改，请勿修改
  //The following is automatically modified, please do not modify
  //----auto option start----
  entryClassName: "Main",
  orientation: "portrait",
  frameRate: 60,
  scaleMode: (window.screen.availHeight / window.screen.availWidth > 1136 / 640) ? "exactFit" : "fixedWidth",
  contentWidth: 640,
  contentHeight: 1136,
  showFPS: true,
  fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
  showLog: false,
  maxTouches: 2,
  //----auto option end----
  renderMode: 'webgl',
  audioType: 0,
  calculateCanvasScaleFactor: function (context) {
    var backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  }
};
const runEgret = function() {

  egret.runEgret(runOptions);
}

if (wx.loadSubpackage) {
  require("./EgretSubPackageLoading.js");
  runOptions.entryClassName = "EgretSubPackageLoading";
  runEgret();
  let task = wx.loadSubpackage({
    // 开发者根据自身需求更改
    name: "stage1",
    success: function () {
      EgretSubPackageLoading.instance.onSuccess();
    }
  });

  task.onProgressUpdate(res => {
    EgretSubPackageLoading.instance.setProgress(res);
  })
}
else {
  //
  require("./stage1/game.js");
  runEgret();
}
// require("egret.min.js")
