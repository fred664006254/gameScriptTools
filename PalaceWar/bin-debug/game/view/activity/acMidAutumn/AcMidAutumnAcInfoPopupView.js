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
  * 中秋活动详情
  * @author 张朝阳
  * date 2018/8/30
  * @class AcMidAutumnAcInfoPopupView
  */
var AcMidAutumnAcInfoPopupView = (function (_super) {
    __extends(AcMidAutumnAcInfoPopupView, _super);
    function AcMidAutumnAcInfoPopupView() {
        return _super.call(this) || this;
    }
    AcMidAutumnAcInfoPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var bg = BaseLoadBitmap.create("acmidautumnview_infobg");
        bg.width = 548;
        bg.height = 489;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        acTimeTF.setPosition(bg.x + 20, bg.y + bg.height - acTimeTF.height - 80);
        this.addChildToContainer(acTimeTF);
        var infoDec = '';
        if (Api.switchVoApi.checkServantRefuseBattle()) {
            infoDec = "acmidAutumnAcInfoDesc_withOpenRefusal";
        }
        else {
            infoDec = "acmidAutumnAcInfoDesc";
        }
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal(infoDec), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.width = 508;
        acDesc.lineSpacing = 3;
        acDesc.setPosition(acTimeTF.x, acTimeTF.y + acTimeTF.height + 3);
        this.addChildToContainer(acDesc);
        var servantCfg = Config.ServantCfg.getServantItemById("1052");
        if (servantCfg.quality2) {
            var cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = 45;
            cornerImg.y = 260;
            cornerImg.setScale(1.3);
            this.addChildToContainer(cornerImg);
        }
    };
    AcMidAutumnAcInfoPopupView.prototype.getShowHeight = function () {
        return 555;
    };
    AcMidAutumnAcInfoPopupView.prototype.getTitleStr = function () {
        return "acmidAutumnAcInfoTitle";
    };
    AcMidAutumnAcInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMidAutumnAcInfoPopupView;
}(PopupView));
__reflect(AcMidAutumnAcInfoPopupView.prototype, "AcMidAutumnAcInfoPopupView");
//# sourceMappingURL=AcMidAutumnAcInfoPopupView.js.map