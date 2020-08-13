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
  * @class AcBuildingWorshipAcInfoPopupView
  */
var AcBuildingWorshipAcInfoPopupView = (function (_super) {
    __extends(AcBuildingWorshipAcInfoPopupView, _super);
    function AcBuildingWorshipAcInfoPopupView() {
        return _super.call(this) || this;
    }
    AcBuildingWorshipAcInfoPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var vo = undefined;
        var bg = null;
        if (aid == "flipCard") {
            vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
            bg = BaseLoadBitmap.create("flipcard_infobg" + code);
        }
        else {
            vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
            if (code == "6" || code == "7" || code == "9") {
                bg = BaseLoadBitmap.create("acmidautumnview_infobg6");
            }
            else {
                bg = BaseLoadBitmap.create("acmidautumnview_infobg");
            }
        }
        bg.width = 548;
        bg.height = 489;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 5);
        this.addChildToContainer(bg);
        var acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoTime", [vo.acTime]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        acTimeTF.setPosition(bg.x + 20, bg.y + bg.height - acTimeTF.height - 80);
        this.addChildToContainer(acTimeTF);
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (aid == "flipCard") {
            // acDesc.text = LanguageManager.getlocal("acFlipCard_acmidAutumnAcInfoDesc1");
            acDesc.text = "";
            acTimeTF.text = "";
        }
        else {
            if (code == "6" || code == "7") {
                acDesc.text = LanguageManager.getlocal("acmidAutumnAcInfoDesc6");
            }
            else {
                acDesc.text = LanguageManager.getlocal("acmidAutumnAcInfoDesc");
            }
        }
        acDesc.width = 508;
        acDesc.lineSpacing = 3;
        acDesc.setPosition(acTimeTF.x, acTimeTF.y + acTimeTF.height + 3);
        this.addChildToContainer(acDesc);
    };
    AcBuildingWorshipAcInfoPopupView.prototype.getShowHeight = function () {
        return 575;
    };
    AcBuildingWorshipAcInfoPopupView.prototype.getTitleStr = function () {
        return "acmidAutumnAcInfoTitle";
    };
    AcBuildingWorshipAcInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBuildingWorshipAcInfoPopupView;
}(PopupView));
__reflect(AcBuildingWorshipAcInfoPopupView.prototype, "AcBuildingWorshipAcInfoPopupView");
