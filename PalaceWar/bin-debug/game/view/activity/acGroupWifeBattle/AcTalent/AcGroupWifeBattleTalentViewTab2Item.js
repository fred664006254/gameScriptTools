var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//风华群芳--提升才情tab2 item
var AcGroupWifeBattleTalentViewTab2Item = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleTalentViewTab2Item, _super);
    function AcGroupWifeBattleTalentViewTab2Item() {
        var _this = _super.call(this) || this;
        _this._caiyiTF = null;
        _this._caiqingTF = null;
        return _this;
    }
    AcGroupWifeBattleTalentViewTab2Item.prototype.initItem = function (index, data, param) {
        this._param = param;
        this.width = 600;
        this.height = 156;
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.width = 600;
        bg.height = 151;
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        this._data = data;
        var icon = this.getWifestatusIcon(this._data.wid);
        icon.x = 5;
        icon.y = (bg.height - icon.height) / 2;
        this.addChild(icon);
        var statusLv = Api.wifestatusVoApi.getWifestatusLevelById(this._data.wid);
        var statusTF = ComponentManager.getTextField(LanguageManager.getlocal("wifestatusTitle" + statusLv), 18, TextFieldConst.COLOR_BROWN);
        statusTF.width = 80;
        statusTF.x = 175 - statusTF.width / 2;
        statusTF.y = bg.y + bg.height / 2 - statusTF.height / 2;
        statusTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(statusTF);
        // let wifeVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById();
        var caiyi = Api.wifeVoApi.getWifeInfoVoById(this._data.wid).artistry;
        var caiyiTF = ComponentManager.getTextField(String(caiyi), 18, TextFieldConst.COLOR_BROWN);
        caiyiTF.x = 255 - caiyiTF.width / 2;
        caiyiTF.y = bg.y + bg.height / 2 - caiyiTF.height / 2;
        this._caiyiTF = caiyiTF;
        this.addChild(caiyiTF);
        var caiqing = this._data.talentadd;
        var caiqingp = this._data.taddnum ? this._data.taddnum : 0;
        var cqStr = this.checkHaveBuff() ? App.StringUtil.changeIntToText(caiqing) + "\n<font color=0x3e9b00>(+" + caiqingp + ")</font>" : App.StringUtil.changeIntToText(caiqing);
        var caiqingTF = ComponentManager.getTextField(cqStr, 18, TextFieldConst.COLOR_BROWN);
        caiqingTF.x = 375 - caiqingTF.width / 2;
        caiqingTF.y = bg.y + bg.height / 2 - caiqingTF.height / 2;
        caiqingTF.textAlign = egret.HorizontalAlign.CENTER;
        this._caiqingTF = caiqingTF;
        this.addChild(caiqingTF);
        var upBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "wifeTalentUpBtn", this.upBtnClick, this);
        upBtn.x = bg.x + bg.width - 20 - upBtn.width;
        upBtn.y = bg.y + bg.height / 2 - upBtn.height / 2;
        this.addChild(upBtn);
    };
    AcGroupWifeBattleTalentViewTab2Item.prototype.checkHaveBuff = function () {
        if (this._param) {
            return true;
        }
        var flag = false;
        var modelList = Api.acVoApi.getRanActives();
        for (var i in modelList) {
            var unit = modelList[i];
            if (unit.atype == "22") {
                var t = unit.et - GameData.serverTime - 86400 * 1;
                if (t > 0) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    AcGroupWifeBattleTalentViewTab2Item.prototype.refreshUI = function () {
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._data.wid);
        var caiyi = wifeVo.artistry;
        this._caiyiTF.text = String(caiyi);
        var caiqing = this._data.talentadd;
        var caiqingp = this._data.taddnum;
        var cqStr = caiqing + "\n<font color=0x3e9b00>(+" + caiqingp + ")</font>";
        this._caiqingTF.text = cqStr;
        this._caiqingTF.x = 360 - this._caiqingTF.width / 2;
    };
    AcGroupWifeBattleTalentViewTab2Item.prototype.upBtnClick = function () {
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
    };
    AcGroupWifeBattleTalentViewTab2Item.prototype.getWifestatusIcon = function (wifeId) {
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
    AcGroupWifeBattleTalentViewTab2Item.prototype.clickItemHandler = function (event, wifeId) {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFESTATUSWIFEPOPUPVIEW, { wifeId: wifeId, level: this._data.id });
    };
    AcGroupWifeBattleTalentViewTab2Item.prototype.refreshData = function (index) {
    };
    AcGroupWifeBattleTalentViewTab2Item.prototype.getSpaceY = function () {
        return 0;
    };
    AcGroupWifeBattleTalentViewTab2Item.prototype.dispose = function () {
        this._data = null;
        this._caiyiTF = null;
        this._caiqingTF = null;
        this._param = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleTalentViewTab2Item;
}(ScrollListItem));
//# sourceMappingURL=AcGroupWifeBattleTalentViewTab2Item.js.map