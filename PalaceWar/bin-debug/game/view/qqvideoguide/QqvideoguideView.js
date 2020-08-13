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
/**
 * 腾讯视频入口引导
 * author 赵占涛
 * date 2018/07/03
 * @class QqvideoguideView
 */
var QqvideoguideView = (function (_super) {
    __extends(QqvideoguideView, _super);
    function QqvideoguideView() {
        return _super.call(this) || this;
    }
    QqvideoguideView.prototype.initView = function () {
        var acImg = BaseBitmap.create("qqvideoguide_bigimage2");
        // acImg.scaleX = 64/75;
        // acImg.scaleY = 64/75;
        acImg.x = GameConfig.stageWidth / 2 - acImg.width / 2 * acImg.scaleX;
        acImg.y = GameConfig.stageHeigth / 2 - acImg.height / 2 * acImg.scaleY;
        this.addChild(acImg);
        var collectBtn = BaseBitmap.create("qqvideoguide_close");
        collectBtn.addTouchTap(this.okClick, this);
        collectBtn.x = GameConfig.stageWidth / 2 - collectBtn.width / 2;
        collectBtn.y = acImg.y + acImg.height * acImg.scaleY + 20;
        this.addChild(collectBtn);
        var goBtn = BaseBitmap.create("public_alphabg");
        goBtn.width = 500;
        goBtn.height = 80;
        goBtn.addTouchTap(this.goClick, this);
        goBtn.x = GameConfig.stageWidth / 2 - goBtn.width / 2;
        goBtn.y = acImg.y + acImg.height * acImg.scaleY - 140;
        this.addChild(goBtn);
    };
    QqvideoguideView.prototype.okClick = function () {
        this.hide();
    };
    QqvideoguideView.prototype.goClick = function () {
        var urlPath = "https://iwan.qq.com/community/h5index?hidetitlebar=1?ADTAG=txsp.xyx.yxdl"; //"https://iwan.qq.com/m/vadr/h5games.htm"
        window.open(urlPath, "_self");
    };
    QqvideoguideView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "qqvideoguide_bigimage2", "qqvideoguide_close"
        ]);
    };
    QqvideoguideView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return QqvideoguideView;
}(BaseView));
__reflect(QqvideoguideView.prototype, "QqvideoguideView");
//# sourceMappingURL=QqvideoguideView.js.map