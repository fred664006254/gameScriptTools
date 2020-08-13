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
  * 赵云信息显示
  * author 张朝阳
  * date 2018/7/10
  * @class AcMazeInfoPopupView
  */
var AcMazeInfoPopupView = (function (_super) {
    __extends(AcMazeInfoPopupView, _super);
    function AcMazeInfoPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcMazeInfoPopupView.prototype, "vo", {
        /**
         * 服务器返回数据
         */
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcMazeInfoPopupView.prototype.initView = function () {
        var infobg = BaseBitmap.create("acmazeview_infobg");
        infobg.setPosition(this.getShowWidth() / 2 - infobg.width / 2, 0);
        this.addChildToContainer(infobg);
        var detailBg = BaseBitmap.create("public_9_downbg");
        detailBg.width = 281;
        detailBg.height = 172;
        detailBg.setPosition(infobg.x + infobg.width - detailBg.width - 10, infobg.y + infobg.height - detailBg.height - 10);
        this.addChildToContainer(detailBg);
        var acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeViewAcTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acTimeTF.setPosition(detailBg.x + 20, detailBg.y + 10);
        acTimeTF.lineSpacing = 2;
        this.addChildToContainer(acTimeTF);
        var acDetailTF = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeViewAcDetail"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDetailTF.width = 250;
        acDetailTF.lineSpacing = 2;
        acDetailTF.setPosition(acTimeTF.x, acTimeTF.y + acTimeTF.height + 2);
        this.addChildToContainer(acDetailTF);
        var servantCfg = Config.ServantCfg.getServantItemById("2017");
        if (servantCfg.quality2) {
            var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 30 + GameData.popupviewOffsetX;
            cornerImg.y = 250;
            cornerImg.setScale(1.3);
            this.addChildToContainer(cornerImg);
        }
    };
    AcMazeInfoPopupView.prototype.getTitleStr = function () {
        return "atkracecrossDetailTitle";
    };
    AcMazeInfoPopupView.prototype.getShowHeight = function () {
        return 395 + 9;
    };
    AcMazeInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMazeInfoPopupView;
}(PopupView));
__reflect(AcMazeInfoPopupView.prototype, "AcMazeInfoPopupView");
//# sourceMappingURL=AcMazeInfoPopupView.js.map