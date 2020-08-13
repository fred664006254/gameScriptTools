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
  * 黄忠属性说明
  * author 张朝阳
  * date 2018/7/2
  * @class AcArcherInfoPopupView
  */
var AcArcherInfoPopupView = (function (_super) {
    __extends(AcArcherInfoPopupView, _super);
    function AcArcherInfoPopupView() {
        return _super.call(this) || this;
    }
    /**
     * 初始化view
     */
    AcArcherInfoPopupView.prototype.initView = function () {
        var infobg = BaseBitmap.create("acarcherview_info");
        infobg.setPosition(this.getShowWidth() / 2 - infobg.width / 2, 0);
        this.addChildToContainer(infobg);
        var servantCfg = Config.ServantCfg.getServantItemById("2018");
        if (servantCfg.quality2) {
            var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 30 + GameData.popupviewOffsetX;
            cornerImg.y = 250;
            cornerImg.setScale(1.3);
            this.addChildToContainer(cornerImg);
        }
    };
    /**标题 */
    AcArcherInfoPopupView.prototype.getTitleStr = function () {
        return "acArcherInfoTitle";
    };
    /**
     * 设置当前高度
     */
    AcArcherInfoPopupView.prototype.getShowHeight = function () {
        return 395 + 9;
    };
    /**关闭界面 */
    AcArcherInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcArcherInfoPopupView;
}(PopupView));
__reflect(AcArcherInfoPopupView.prototype, "AcArcherInfoPopupView");
//# sourceMappingURL=AcArcherInfoPopupView.js.map