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
 * 选择门客的item
 * author 张朝阳
 * date 2018/11/19
 * @class CountryWarSelectServantScrollItem
 */
var CountryWarSelectServantScrollItem = (function (_super) {
    __extends(CountryWarSelectServantScrollItem, _super);
    function CountryWarSelectServantScrollItem() {
        var _this = _super.call(this) || this;
        _this._useServantBtn = null;
        _this._useServantBM = null;
        _this._servantId = null;
        _this._servantInfo = null;
        _this._isUseServant = false;
        _this._cityId = null;
        _this._servantIndex = 0;
        _this._isServantGo = false;
        return _this;
    }
    CountryWarSelectServantScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._cityId = itemParam.cityId;
        this._servantId = data.servantId;
        this._servantInfo = data;
        this._servantIndex = itemParam.index;
        this.width = 528;
        this.height = 130;
        var bg = BaseBitmap.create("public_9_bg14");
        // servantId
        bg.width = this.width;
        bg.height = 130;
        this.addChild(bg);
        // 184 × 184
        //180 × 177
        var scaleVale = 108 / 184;
        var iconBgBt = BaseLoadBitmap.create(data.qualityBoxImgPath);
        iconBgBt.width = 184;
        iconBgBt.height = 184;
        iconBgBt.setScale(scaleVale);
        iconBgBt.setPosition(bg.x + 15, bg.y + bg.height / 2 - iconBgBt.height / 2 * scaleVale);
        this.addChild(iconBgBt);
        var iconBt = BaseLoadBitmap.create(data.halfImgPath);
        iconBt.width = 180;
        iconBt.height = 177;
        iconBt.setScale(scaleVale);
        iconBt.setPosition(iconBgBt.x + iconBgBt.width / 2 * scaleVale - iconBt.width / 2 * scaleVale, iconBgBt.y + iconBgBt.height / 2 * scaleVale - iconBt.height / 2 * scaleVale);
        this.addChild(iconBt);
        if (Api.switchVoApi.checkOpenExile()) {
            if (data.banishSt) {
                var exileBM = BaseBitmap.create("public_servantexilelogo");
                exileBM.setScale(scaleVale);
                exileBM.setPosition(iconBgBt.x + iconBgBt.width * scaleVale - exileBM.width * scaleVale, iconBgBt.y);
                this.addChild(exileBM);
            }
        }
        var servantNameTxt = ComponentManager.getTextField(data.servantName, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        servantNameTxt.setPosition(iconBgBt.x + iconBgBt.width * scaleVale + 15, bg.y + 15);
        this.addChild(servantNameTxt);
        var servantLevelTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarServantLevel", [data.level]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        servantLevelTxt.setPosition(servantNameTxt.x, servantNameTxt.y + servantNameTxt.height + 15);
        this.addChild(servantLevelTxt);
        var servantPowerTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarServantStartPower", [App.StringUtil.changeIntToText(Math.floor(data.fightValue))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        servantPowerTxt.setPosition(servantLevelTxt.x, servantLevelTxt.y + servantLevelTxt.height + 15);
        this.addChild(servantPowerTxt);
        var power = Config.CountrywarCfg.cityLowestPower[this._cityId].power;
        if (Math.floor(data.fightValue) >= power) {
            this._isServantGo = true;
        }
        else {
            this._isServantGo = false;
        }
        var servantInfo = Api.countryWarVoApi.isHaveServant(this._servantId);
        if (servantInfo) {
            var powerUp = servantInfo.powerUp;
            var tipbg = BaseBitmap.create("countrywarservantnamebg");
            tipbg.setPosition(iconBgBt.x, iconBgBt.y + iconBgBt.height * scaleVale - tipbg.height);
            this.addChild(tipbg);
            servantNameTxt.text = data.servantName + LanguageManager.getlocal("countryWarServantAddPower", [String(Math.round(powerUp * 100))]);
            var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarServantNowDay"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
            tiptxt.setPosition(tipbg.x + tipbg.width / 2 - tiptxt.width / 2, tipbg.y + tipbg.height - tiptxt.height - 3);
            this.addChild(tiptxt);
            servantLevelTxt.y = servantNameTxt.y + servantNameTxt.height + 7;
            servantPowerTxt.y = servantLevelTxt.y + servantLevelTxt.height + 7;
            var servantRealPowerTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarServantrealyPower", [App.StringUtil.changeIntToText(Math.floor(data.fightValue * (1 + powerUp)))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            servantRealPowerTxt.setPosition(servantPowerTxt.x, servantPowerTxt.y + servantPowerTxt.height + 7);
            this.addChild(servantRealPowerTxt);
            // if (Math.floor(data.fightValue * (1 + powerUp)) >= power) {
            // 	this._isServantGo = true;
            // }
            // else {
            // 	this._isServantGo = false;
            // }
        }
        if (Api.countryWarVoApi.checkMonthServant(this._servantId)) {
            var cfg = Api.countryWarVoApi.checkMonthServant(this._servantId);
            if (cfg.endTime <= GameData.serverTime) {
                var tipbg = BaseBitmap.create("countrywarservantnamebg");
                tipbg.setPosition(iconBgBt.x, iconBgBt.y + iconBgBt.height * scaleVale - tipbg.height);
                this.addChild(tipbg);
                var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarServantPassPromotion"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                tiptxt.setPosition(tipbg.x + tipbg.width / 2 - tiptxt.width / 2, tipbg.y + tipbg.height - tiptxt.height - 3);
                this.addChild(tiptxt);
            }
        }
        else {
            var tipbg = BaseBitmap.create("countrywarservantnamebg");
            tipbg.setPosition(iconBgBt.x, iconBgBt.y + iconBgBt.height * scaleVale - tipbg.height);
            this.addChild(tipbg);
            var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarServantNotPromotion"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            tiptxt.setPosition(tipbg.x + tipbg.width / 2 - tiptxt.width / 2, tipbg.y + tipbg.height - tiptxt.height - 3);
            this.addChild(tiptxt);
        }
        var useServantBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceWarUseServantBtn", this.useServantClick, this);
        useServantBtn.setPosition(bg.x + bg.width - useServantBtn.width - 15, bg.y + bg.height / 2 - useServantBtn.height / 2);
        this.addChild(useServantBtn);
        if (this._isServantGo) {
            // useServantBtn.setEnable(true);
            useServantBtn.setText("allianceWarUseServantBtn");
        }
        else {
            // useServantBtn.setEnable(false);
            useServantBtn.setText("allianceWarUseServantGoServantInfoViewBtn");
        }
        var useServantBM = BaseBitmap.create("awservantstate1");
        useServantBM.anchorOffsetX = useServantBM.width / 2;
        useServantBM.anchorOffsetY = useServantBM.height / 2;
        useServantBM.setPosition(useServantBtn.x + useServantBtn.width / 2, useServantBtn.y + useServantBtn.height / 2 - 10);
        this.addChild(useServantBM);
        if (Api.countryWarVoApi.isUseServant(this._servantId)) {
            useServantBtn.setVisible(false);
            useServantBM.setVisible(true);
            useServantBM.setRes("discusspqzhong");
            var city = Api.countryWarVoApi.getServerCityId(Number(Api.countryWarVoApi.getServantCityKey(this._servantId)), true);
            var servantCityTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarServantCity", [LanguageManager.getlocal("CountryWarCityName" + city)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            servantCityTxt.setPosition(bg.x + bg.width - servantCityTxt.width - 28, bg.y + bg.height - servantCityTxt.height - 10);
            this.addChild(servantCityTxt);
        }
        else if ((!Api.countryWarVoApi.isUseServant(this._servantId)) && Api.countryWarVoApi.isServantRest(this._servantId)) {
            useServantBtn.setVisible(false);
            useServantBM.setVisible(true);
            useServantBM.setRes("awservantstate1");
        }
        else {
            useServantBtn.setVisible(true);
            useServantBM.setVisible(false);
        }
    };
    /**
     * 	派遣事件
     */
    CountryWarSelectServantScrollItem.prototype.useServantClick = function () {
        if (Api.switchVoApi.checkOpenServerMaintain()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
            return;
        }
        if (!this._isServantGo) {
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, this._servantId);
            return;
        }
        var desc1 = LanguageManager.getlocal("countryWarServantDesc1", [this._servantInfo.servantName, LanguageManager.getlocal("CountryWarCityName" + this._cityId)]);
        // let desc2 = LanguageManager.getlocal("countryWarServantDesc2");
        var titleKey = "countryWarServantTitle";
        ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARCONFIRMPOPUPVIEW, { type: 1, desc1: desc1, titleKey: titleKey, callbackHandle: this.callbackHandle, handle: this });
    };
    /**回调 */
    CountryWarSelectServantScrollItem.prototype.callbackHandle = function () {
        if (Api.switchVoApi.checkOpenServerMaintain()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
            return;
        }
        var servantCityId = Api.countryWarVoApi.getServerCityId(this._cityId);
        NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSERVANT, { sid: this._servantId, city: servantCityId, index: this._servantIndex });
    };
    CountryWarSelectServantScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    CountryWarSelectServantScrollItem.prototype.dispose = function () {
        this._useServantBtn = null;
        this._useServantBM = null;
        this._servantId = null;
        this._isUseServant = false;
        this._cityId = null;
        this._servantInfo = null;
        this._servantIndex = 0;
        this._isServantGo = false;
        _super.prototype.dispose.call(this);
    };
    return CountryWarSelectServantScrollItem;
}(ScrollListItem));
__reflect(CountryWarSelectServantScrollItem.prototype, "CountryWarSelectServantScrollItem");
//# sourceMappingURL=CountryWarSelectServantScrollItem.js.map