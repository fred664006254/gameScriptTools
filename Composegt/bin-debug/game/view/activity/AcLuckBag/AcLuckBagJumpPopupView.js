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
 * 道具不足跳转弹板
 * author dky
 * date 2018/3/26
 * @class AcLuckBagJumpPopupView
 */
var AcLuckBagJumpPopupView = (function (_super) {
    __extends(AcLuckBagJumpPopupView, _super);
    function AcLuckBagJumpPopupView() {
        var _this = _super.call(this) || this;
        _this._target = null;
        return _this;
    }
    AcLuckBagJumpPopupView.prototype.initView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        this._callback = this.param.data.callback;
        this._target = this.param.data.target;
        var msg = LanguageManager.getlocal("itemJumpDesc");
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 530;
        bg.height = 220;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var bg2 = BaseBitmap.create("public_tc_bg03");
        bg2.width = 510;
        bg2.height = 200;
        bg2.x = this.viewBg.x + this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = bg.y + 10;
        this.addChildToContainer(bg2);
        var cor1 = BaseBitmap.create("public_tcdw_bg01");
        cor1.x = bg2.x;
        cor1.y = bg2.y;
        this.addChildToContainer(cor1);
        var cor2 = BaseBitmap.create("public_tcdw_bg02");
        cor2.x = bg2.x + bg2.width - cor2.width;
        cor2.y = bg2.y;
        this.addChildToContainer(cor2);
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagLess1"), 20, TextFieldConst.COLOR_BROWN);
        descText.x = this.viewBg.width / 2 - descText.width / 2;
        descText.y = bg2.y + 30;
        this.addChildToContainer(descText);
        var descText1 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagJumpDesc1", [cfg.needGem.toString()]), 20, TextFieldConst.COLOR_BROWN);
        descText1.width = 450;
        descText1.textAlign = egret.HorizontalAlign.CENTER;
        descText1.x = this.viewBg.width / 2 - descText1.width / 2;
        descText1.y = descText.y + descText.height + 30;
        this.addChildToContainer(descText1);
        var descText2 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckBagJumpDesc2", [cfg.needPoint.toString()]), 20, TextFieldConst.COLOR_BROWN);
        descText2.width = 450;
        descText2.textAlign = egret.HorizontalAlign.CENTER;
        descText2.x = this.viewBg.width / 2 - descText2.width / 2;
        descText2.y = descText1.y + descText1.height + 8;
        this.addChildToContainer(descText2);
        var missionBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "acLuckBagJumpMission", this.clickMissionBtnHandler, this);
        missionBtn.x = this.viewBg.x + 70;
        missionBtn.y = bg.y + bg.height + 15;
        this.addChildToContainer(missionBtn);
        var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acLuckBagJumpRecharge", this.clickRechargeBtnHandler, this);
        rechargeBtn.x = this.viewBg.x + this.viewBg.width - 70 - rechargeBtn.width;
        rechargeBtn.y = bg.y + bg.height + 15;
        this.addChildToContainer(rechargeBtn);
    };
    // protected resetBgSize():void
    // {
    // 	super.resetBgSize();
    // 	this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
    // }
    AcLuckBagJumpPopupView.prototype.clickMissionBtnHandler = function (data) {
        ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
        if (this._callback && this._target) {
            this._callback.apply(this._target);
        }
        this.hide();
    };
    AcLuckBagJumpPopupView.prototype.clickRechargeBtnHandler = function (data) {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        if (this._callback && this._target) {
            this._callback.apply(this._target);
        }
        this.hide();
    };
    AcLuckBagJumpPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcLuckBagJumpPopupView.prototype.getTitleStr = function () {
        return "acLuckBagJumpPopupViewTitle";
    };
    AcLuckBagJumpPopupView.prototype.dispose = function () {
        this._callback = null;
        ;
        this._target = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckBagJumpPopupView;
}(PopupView));
__reflect(AcLuckBagJumpPopupView.prototype, "AcLuckBagJumpPopupView");
