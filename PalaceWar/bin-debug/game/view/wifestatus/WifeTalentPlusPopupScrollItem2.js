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
 * 文思泉涌Item
 * author qianjun
 */
var WifeTalentPlusPopupScrollItem2 = (function (_super) {
    __extends(WifeTalentPlusPopupScrollItem2, _super);
    function WifeTalentPlusPopupScrollItem2() {
        var _this = _super.call(this) || this;
        _this._caiyiTF = null;
        _this._caiqingTF = null;
        return _this;
    }
    WifeTalentPlusPopupScrollItem2.prototype.initItem = function (index, data, param) {
        this._param = param;
        this.width = 600;
        this.height = 156;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 600;
        bg.height = 151;
        bg.x = 0;
        this.addChild(bg);
        this._data = data;
        var icon = this.getWifestatusIcon(this._data.wid);
        icon.x = 10;
        icon.y = (bg.height - icon.height) / 2;
        this.addChild(icon);
        var statusLv = Api.wifestatusVoApi.getWifestatusLevelById(this._data.wid);
        var statusTF = ComponentManager.getTextField(LanguageManager.getlocal("wifestatusTitle" + statusLv), 18, TextFieldConst.COLOR_BROWN);
        if (statusLv == "1") {
            statusTF.textColor = TextFieldConst.COLOR_WARN_RED2;
        }
        statusTF.width = 80;
        statusTF.x = 175 - statusTF.width / 2;
        statusTF.y = bg.y + bg.height / 2 - statusTF.height / 2;
        statusTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(statusTF);
        // let wifeVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById();
        var caiyi = data.artadd ? data.artadd : 0; //Api.wifeVoApi.getWifeInfoVoById(this._data.wid).artistry;
        var caiyiTF = ComponentManager.getTextField(String(caiyi), 18, TextFieldConst.COLOR_BROWN);
        caiyiTF.x = 275 - caiyiTF.width / 2;
        caiyiTF.y = bg.y + bg.height / 2 - caiyiTF.height / 2;
        this._caiyiTF = caiyiTF;
        this.addChild(caiyiTF);
        var caiqing = this._data.talentadd;
        var caiqingp = this._data.taddnum ? this._data.taddnum : 0;
        var cqStr = this.checkHaveBuff() ? App.StringUtil.changeIntToText(caiqing) + "\n<font color=0x3e9b00>(+" + caiqingp + ")</font>" : App.StringUtil.changeIntToText(caiqing);
        var caiqingTF = ComponentManager.getTextField(cqStr, 18, TextFieldConst.COLOR_BROWN);
        caiqingTF.x = 395 - caiqingTF.width / 2;
        caiqingTF.y = bg.y + bg.height / 2 - caiqingTF.height / 2;
        caiqingTF.textAlign = egret.HorizontalAlign.CENTER;
        this._caiqingTF = caiqingTF;
        this.addChild(caiqingTF);
        var upBtn = ComponentManager.getButton(statusLv == "1" ? ButtonConst.BTN_SMALL_RED : ButtonConst.BTN_SMALL_YELLOW, statusLv == "1" ? "wifestatusViewTitle" : "wifeTalentUpBtn", this.upBtnClick, this);
        upBtn.x = bg.x + bg.width - 20 - upBtn.width;
        upBtn.y = bg.y + bg.height / 2 - upBtn.height / 2;
        this.addChild(upBtn);
    };
    WifeTalentPlusPopupScrollItem2.prototype.checkHaveBuff = function () {
        if (this._param) {
            return true;
        }
        var modelList = Api.acVoApi.getRanActives();
        for (var i in modelList) {
            var unit = modelList[i];
            if (unit.atype == "22") {
                var t = unit.et - GameData.serverTime - 86400 * 1;
                if (t > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    WifeTalentPlusPopupScrollItem2.prototype.refreshUI = function () {
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._data.wid);
        var caiyi = this._data.artadd ? this._data.artadd : 0;
        this._caiyiTF.text = String(caiyi);
        var caiqing = this._data.talentadd;
        var caiqingp = this._data.taddnum;
        var cqStr = caiqing + "\n<font color=0x3e9b00>(+" + caiqingp + ")</font>";
        this._caiqingTF.text = cqStr;
        this._caiqingTF.x = 360 - this._caiqingTF.width / 2;
    };
    WifeTalentPlusPopupScrollItem2.prototype.upBtnClick = function () {
        var statusLv = Api.wifestatusVoApi.getWifestatusLevelById(this._data.wid);
        if (statusLv == "1") {
            var viewList = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);
            if (this._param) {
                if (viewList && viewList._isShow) {
                    // let WifeTalentView = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEALLTALENTVIEW);
                    // if(WifeTalentView){
                    // 	WifeTalentView.hide();
                    // }
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);
                    var WifeTalentView_1 = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEALLTALENTVIEW);
                    if (WifeTalentView_1) {
                        WifeTalentView_1.hide();
                    }
                    var wifebattle = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEVIEW);
                    if (wifebattle) {
                        wifebattle.hide();
                    }
                }
            }
            else {
                if (viewList && viewList._isShow) {
                    var WifeTalentView_2 = ViewController.getInstance().getView("WifeTalentView");
                    if (WifeTalentView_2) {
                        WifeTalentView_2.hide();
                    }
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);
                    var WifeTalentView_3 = ViewController.getInstance().getView("WifeTalentView");
                    if (WifeTalentView_3) {
                        WifeTalentView_3.hide();
                    }
                    var wifebattle = ViewController.getInstance().getView(ViewConst.COMMON.WIFEBATTLEVIEW);
                    if (wifebattle) {
                        wifebattle.hide();
                    }
                }
            }
        }
        else {
            if (this._param) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIFETALENTUPPOPUPVIEW, {
                    d: this._data,
                    aid: this._param.aid,
                    code: this._param.code
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTUPPOPUPVIEW, this._data);
            }
        }
    };
    WifeTalentPlusPopupScrollItem2.prototype.getWifestatusIcon = function (wifeId) {
        var iconContainer = new BaseDisplayObjectContainer();
        var iconBg = BaseBitmap.create("wifestatus_headbg");
        iconBg.name = "bg2";
        iconContainer.addChild(iconBg);
        var iconStr = Api.wifeVoApi.getWifeIcon(wifeId);
        var icon = BaseLoadBitmap.create(iconStr);
        icon.setPosition(10, 8);
        icon.setScale(0.52);
        iconContainer.cacheAsBitmap = true;
        iconContainer.addChild(icon);
        // iconContainer.addTouchTap(this.clickItemHandler,this,[wifeId]);
        var nameBg = BaseBitmap.create("wifestatus_namebg");
        nameBg.setPosition(iconContainer.width / 2 - nameBg.width / 2, 105);
        iconContainer.addChild(nameBg);
        // nameBg.visible = false;
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var nameTF = ComponentManager.getTextField(wifeCfg.name, 18);
        nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
        nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
        iconContainer.addChild(nameTF);
        // if(Api.wifestatusVoApi.getIsConferById(wifeId))
        // {
        // 	let redDotSp = BaseBitmap.create("public_dot2");
        // 	redDotSp.x = 100;
        // 	redDotSp.y = 10;
        // 	iconContainer.addChild(redDotSp); 
        // }
        return iconContainer;
    };
    WifeTalentPlusPopupScrollItem2.prototype.clickItemHandler = function (event, wifeId) {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFESTATUSWIFEPOPUPVIEW, { wifeId: wifeId, level: this._data.id });
    };
    WifeTalentPlusPopupScrollItem2.prototype.refreshData = function (index) {
    };
    WifeTalentPlusPopupScrollItem2.prototype.getSpaceY = function () {
        return 0;
    };
    WifeTalentPlusPopupScrollItem2.prototype.dispose = function () {
        this._param = null;
        this._data = null;
        this._caiyiTF = null;
        this._caiqingTF = null;
        _super.prototype.dispose.call(this);
    };
    return WifeTalentPlusPopupScrollItem2;
}(ScrollListItem));
__reflect(WifeTalentPlusPopupScrollItem2.prototype, "WifeTalentPlusPopupScrollItem2");
//# sourceMappingURL=WifeTalentPlusPopupScrollItem2.js.map