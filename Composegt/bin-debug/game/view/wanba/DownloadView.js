var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var DownloadView = (function (_super) {
    __extends(DownloadView, _super);
    function DownloadView() {
        return _super.call(this) || this;
    }
    DownloadView.prototype.initView = function () {
        var bottomBgStr = "";
        if (PlatformManager.checkIsWanbaSp()) {
            bottomBgStr = "downloadRewordBg3";
        }
        else if (App.DeviceUtil.IsMobile()) {
            bottomBgStr = "downloadRewordBg2";
        }
        else {
            bottomBgStr = "downloadRewordBg";
        }
        var bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.x = 10;
        this.addChildToContainer(bottomBg);
        if ((PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && !App.DeviceUtil.wanbaIsDownloadApp) || (PlatformManager.checkIsTWBSp() && App.DeviceUtil.IsMobile())) {
            // 下载按钮
            var goDownloadBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "downloadPackage", this.downloadButtonHandler, this);
            goDownloadBtn.x = 400 - goDownloadBtn.width / 2;
            goDownloadBtn.y = 222 - goDownloadBtn.height / 2;
            goDownloadBtn.name = "goDownloadBtn";
            this.addChildToContainer(goDownloadBtn);
        }
        else if (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && App.DeviceUtil.wanbaIsDownloadApp) {
            // 去微端登录
            var goLoginLabel = BaseBitmap.create("weiduanreward_getlabel");
            goLoginLabel.x = 400 - goLoginLabel.width / 2;
            goLoginLabel.y = 222 - goLoginLabel.height / 2;
            this.addChildToContainer(goLoginLabel);
        }
        // 不同平台，奖励不同
        var rewardStr = "";
        if (PlatformManager.checkIsTWBSp()) {
            rewardStr = Config.GameprojectCfg.rewardGT;
        }
        else if (PlatformManager.checkIsWanbaSp()) {
            rewardStr = Config.GameprojectCfg.rewardWB4;
        }
        var rewardVoList = GameData.formatRewardItem(rewardStr);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 500, 110);
        this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem, rewardVoList, rect);
        this._scrollList.x = 284 - (Math.min(5, rewardVoList.length) / 2) * 100;
        this._scrollList.y = 320;
        this.addChildToContainer(this._scrollList);
    };
    DownloadView.prototype.downloadButtonHandler = function () {
        if (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid()) {
            qqwanbaplugin.downloadApp();
            // console.log(url);
            // window.open(url);
        }
        else if (PlatformManager.checkIsTWBSp()) {
            window.open("https://go.onelink.me/FcNW?pid=H5");
        }
    };
    DownloadView.prototype.getShowHeight = function () {
        return 500;
    };
    DownloadView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["downloadRewordBg", "downloadRewordBg2", "downloadRewordBg3", "weiduanreward_getlabel"]);
    };
    DownloadView.prototype.getTitleStr = function () {
        if (PlatformManager.checkIsTWBSp()) {
            return "downloadViewTitle";
        }
        else if (PlatformManager.checkIsWanbaSp()) {
            if (App.DeviceUtil.wanbaIsDownloadApp) {
                return "downloadViewTitle2";
            }
            else {
                return "downloadViewTitle1";
            }
        }
        return "downloadViewTitle";
    };
    DownloadView.prototype.dispose = function () {
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return DownloadView;
}(PopupView));
__reflect(DownloadView.prototype, "DownloadView");
