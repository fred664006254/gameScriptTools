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
  * 荷塘月色
  * @author jiangliuyang
  * date 2018/8/30
  * @class AcMoonlightAcInfoPopupView
  */
var AcMoonlightAcInfoPopupView = (function (_super) {
    __extends(AcMoonlightAcInfoPopupView, _super);
    function AcMoonlightAcInfoPopupView() {
        var _this = _super.call(this) || this;
        _this.aid = null;
        _this.code = null;
        return _this;
    }
    AcMoonlightAcInfoPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        this.aid = aid;
        this.code = code;
        var vo = undefined;
        var bg = null;
        vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        // if(code == "6" || code == "7"){
        //     bg = BaseLoadBitmap.create("acmidautumnview_infobg6");
        // } else {
        //     bg = BaseLoadBitmap.create("acmidautumnview_infobg");
        // }
        bg = BaseLoadBitmap.create(this.getDefaultRes("acmoonlightview_infobg"));
        bg.width = 537;
        bg.height = 487;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 5);
        this.addChildToContainer(bg);
        // let acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoTime",[vo.acTime]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_WHITE);
        // acTimeTF.setPosition(bg.x + 20,bg.y + bg.height - acTimeTF.height - 80);
        // this.addChildToContainer(acTimeTF);
        // let acDesc = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acMoonlight_acInfoDesc")),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        // acDesc.width = 508;
        // acDesc.lineSpacing = 3;
        // acDesc.setPosition(acTimeTF.x,acTimeTF.y + acTimeTF.height + 3);
        // this.addChildToContainer(acDesc);
    };
    //根据资源名字得到完整资源名字
    AcMoonlightAcInfoPopupView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcMoonlightAcInfoPopupView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcMoonlightAcInfoPopupView.prototype.getShowHeight = function () {
        return 575;
    };
    AcMoonlightAcInfoPopupView.prototype.getTitleStr = function () {
        return "acmidAutumnAcInfoTitle";
    };
    AcMoonlightAcInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMoonlightAcInfoPopupView;
}(PopupView));
__reflect(AcMoonlightAcInfoPopupView.prototype, "AcMoonlightAcInfoPopupView");
