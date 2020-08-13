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
/**
 * 红颜技能
 * author ycg
 * date 2019.10.23
 * @class WifeMultiSkillPopupViewTab1
 */
var WifeMultiSkillPopupViewTab1 = /** @class */ (function (_super) {
    __extends(WifeMultiSkillPopupViewTab1, _super);
    function WifeMultiSkillPopupViewTab1() {
        var _this = _super.call(this) || this;
        _this._wifeId = null;
        _this._wifeExp = null;
        _this._scrollList = null;
        _this._exchangeBtn = null;
        _this._index = 0;
        _this._isSkill2 = false;
        _this.initView();
        return _this;
    }
    WifeMultiSkillPopupViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD, this.doGive, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, this.refreshview, this);
        var parentView = ViewController.getInstance().getView("WifeMultiSkillPopupView");
        this._wifeId = parentView.getWifeId();
        var id = this._wifeId;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var cfg = Config.WifeCfg.getWifeCfgById(id);
        this.width = 574;
        var serCfg = null;
        var iconBg = "itembg_1";
        var iconStr = "wifeview_skillnoservant_icon";
        var nameStr = "";
        if (cfg.servantId) {
            serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
            iconBg = serCfg.qualityBoxImgPath;
            if (Api.servantVoApi.getServantObj(cfg.servantId)) {
                var serVo = Api.servantVoApi.getServantObj(cfg.servantId);
                iconBg = serVo.qualityBoxImgPath;
            }
            iconStr = serCfg.halfIcon;
            nameStr = LanguageManager.getlocal("wifeSkillServant", [serCfg.name]);
        }
        else {
            var nameParam = LanguageManager.getlocal("wifeMultiSkillNoHaveServant");
            nameStr = LanguageManager.getlocal("wifeSkillServant", [nameParam]);
        }
        var temW = 108;
        var iconBgBt = BaseLoadBitmap.create(iconBg);
        this.addChild(iconBgBt);
        iconBgBt.x = 30;
        iconBgBt.y = 75;
        var iconBt = BaseLoadBitmap.create(iconStr);
        this.addChild(iconBt);
        if (serCfg) {
            iconBgBt.scaleX = temW / 194;
            iconBgBt.scaleY = temW / 192;
            iconBt.x = iconBgBt.x + 5;
            iconBt.y = iconBgBt.y + 5;
            iconBt.scaleX = (temW - 10) / 180;
            iconBt.scaleY = (temW - 10) / 177;
        }
        else {
            iconBt.x = iconBgBt.x + 4;
            iconBt.y = iconBgBt.y + 4;
        }
        var nameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        nameTF.x = 150;
        nameTF.y = iconBgBt.y + 10;
        this.addChild(nameTF);
        if (cfg.servantId && !Api.servantVoApi.getServantObj(cfg.servantId)) {
            var getTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeServantGet"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
            getTF.x = nameTF.x + nameTF.width + 5;
            getTF.y = nameTF.y;
            this.addChild(getTF);
            var maskBt = BaseBitmap.create("wifeview_mask");
            maskBt.x = iconBgBt.x;
            maskBt.y = iconBgBt.y;
            this.addChild(maskBt);
        }
        var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
        this._wifeExp = ComponentManager.getTextField(expStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._wifeExp.x = nameTF.x;
        this._wifeExp.y = nameTF.y + nameTF.height + 15;
        this.addChild(this._wifeExp);
        var tipTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkilTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        tipTF.x = nameTF.x;
        tipTF.y = this._wifeExp.y + this._wifeExp.height + 15;
        this.addChild(tipTF);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 535;
        bottomBg.height = 535;
        bottomBg.x = this.width / 2 - bottomBg.width / 2 - 1;
        bottomBg.y = tipTF.y + tipTF.height + 15;
        this.addChild(bottomBg);
        var dataList = cfg.wifeSkill;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 525, 525);
        this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem, dataList, rect, { id: id });
        this.addChild(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 5, bottomBg.y + 5);
        if (Api.switchVoApi.checkWifeExpExchangeOpen()) {
            var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "wifeSkillExcange", this.exchangeBtnClick, this);
            exchangeBtn.setPosition(this.width / 2 - exchangeBtn.width / 2, bottomBg.y + 543);
            this.addChild(exchangeBtn);
            this._exchangeBtn = exchangeBtn;
            if (Api.wifeVoApi.hasTransformRed(id) && Api.wifeVoApi.hasTransformRed2(id)) {
                App.CommonUtil.addIconToBDOC(exchangeBtn);
            }
            this.checkExchange();
        }
    };
    WifeMultiSkillPopupViewTab1.prototype.checkExchange = function () {
        if (!this._exchangeBtn) {
            return;
        }
        if (Api.wifeVoApi.isAllSkillLevelMax(this._wifeInfoVo.id) && Api.wifeVoApi.isAllSkill2LevelMax(this._wifeInfoVo.id)) {
            this._exchangeBtn.visible = true;
            if (Api.wifeVoApi.hasTransformRed(this._wifeInfoVo.id) && Api.wifeVoApi.hasTransformRed2(this._wifeInfoVo.id)) {
                App.CommonUtil.addIconToBDOC(this._exchangeBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
            }
        }
        else {
            this._exchangeBtn.visible = false;
        }
    };
    WifeMultiSkillPopupViewTab1.prototype.exchangeBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEEXPEXCHANGEPOPUPVIEW, { id: this._wifeInfoVo.id, callback: this.exchangeCallback, handler: this });
    };
    WifeMultiSkillPopupViewTab1.prototype.exchangeCallback = function (num2) {
        this.request(NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE, { wifeId: this.param.data.id.toString(), num: num2 });
    };
    WifeMultiSkillPopupViewTab1.prototype.doGive = function (event) {
        App.LogUtil.log("dogive tab1");
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, { wifeId: this.param.data.id.toString(), key: data.index });
    };
    //请求回调
    WifeMultiSkillPopupViewTab1.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADESKILL) {
                // if (this._isSkill2){
                //     return;
                // }
                if (data.data.data && data.data.data.rewards) {
                    var rewards = GameData.formatRewardItem(data.data.data.rewards);
                    if (rewards && rewards.length > 0) {
                        App.CommonUtil.playRewardFlyAction(rewards);
                    }
                }
                var index = this._index;
                var wideItem = this._scrollList.getItemByIndex(index);
                wideItem.refreshData(index, this.param.data.id);
                var id = this.param.data.id;
                this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
                var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
                this._wifeExp.text = expStr;
                App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
                this.checkExchange();
            }
            else if (data.data.cmd == NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE) {
                if (data.data.data && data.data.data.rewards) {
                    if (this._isSkill2) {
                        return;
                    }
                    var rewards = GameData.formatRewardItem(data.data.data.rewards);
                    if (rewards && rewards.length > 0) {
                        App.CommonUtil.playRewardFlyAction(rewards);
                    }
                    var id = this.param.data.id;
                    this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
                    var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
                    this._wifeExp.text = expStr;
                    this.checkExchange();
                }
            }
        }
    };
    WifeMultiSkillPopupViewTab1.prototype.refreshview = function () {
        var id = this.param.data.id;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        var expStr = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp.toString();
        this._wifeExp.text = expStr;
    };
    WifeMultiSkillPopupViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD, this.doGive, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, this.refreshview, this);
        this._wifeId = null;
        this._wifeInfoVo = null;
        this._wifeExp = null;
        this._scrollList = null;
        this._exchangeBtn = null;
        this._index = 0;
        this._isSkill2 = false;
        _super.prototype.dispose.call(this);
    };
    return WifeMultiSkillPopupViewTab1;
}(CommonViewTab));
//# sourceMappingURL=WifeMultiSkillPopupViewTab1.js.map