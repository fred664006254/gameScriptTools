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
// TypeScript file
var ChangebgDetailPopupView = (function (_super) {
    __extends(ChangebgDetailPopupView, _super);
    function ChangebgDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._unlockBtn = null;
        _this._sceneName = null;
        _this._tempBg = null;
        return _this;
    }
    ChangebgDetailPopupView.prototype.initView = function () {
        this._obj = this.param.data.o;
        this._callbackF = this.param.data.f;
        var curKey = this.param.data.key;
        this._sceneName = this.param.data.scene;
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 528;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, 13);
        this.addChildToContainer(itemBg);
        var tempBg = BaseBitmap.create("public_9_bg4");
        tempBg.width = 528;
        tempBg.x = this.viewBg.width / 2 - tempBg.width / 2;
        tempBg.height = 70;
        this.addChildToContainer(tempBg);
        tempBg.visible = false;
        this._tempBg = tempBg;
        var itemBg2 = BaseBitmap.create("public_9_cell_title");
        itemBg2.width = itemBg.width - 4;
        itemBg2.height = 34;
        itemBg2.x = itemBg.x + 2;
        itemBg2.y = itemBg.y + 2;
        this.addChildToContainer(itemBg2);
        var line = BaseBitmap.create("public_line3");
        if (!PlatformManager.checkIsEnLang()) {
            line.width = 400;
        }
        line.setPosition(this.viewBg.width / 2 - line.width / 2, itemBg2.y + 8);
        this.addChildToContainer(line);
        var sceneName = ComponentManager.getTextField(LanguageManager.getlocal("changebg_name_" + curKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        sceneName.setPosition(10, itemBg2.y + 6);
        if (PlatformManager.checkIsEnLang()) {
            line.width += sceneName.width + 10;
        }
        sceneName.width = this.viewBg.width - 20;
        sceneName.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(sceneName);
        if (PlatformManager.checkIsEnLang()) {
            line.x = sceneName.x + sceneName.width / 2 - line.width / 2;
        }
        var sceneStr = this.param.data.scene;
        var abilitycfg = Config.SceneCfg.getSceneCfgBySceneName(sceneStr, curKey).personalityCfg;
        var servantId = abilitycfg.servant;
        var textkey = Api.servantVoApi.getServantObj(servantId) ? 1 : 2;
        var servantName;
        if (abilitycfg.buffType) {
            var offsetY = 0;
            if (abilitycfg.buffType == 2) {
                // 5-11;
                // 11 17;
                // 17-23
                // 23-5
                var str5 = App.DateUtil.formatSvrHourByLocalTimeZone(5).hour;
                var str11 = App.DateUtil.formatSvrHourByLocalTimeZone(11).hour;
                var str17 = App.DateUtil.formatSvrHourByLocalTimeZone(17).hour;
                var str23 = App.DateUtil.formatSvrHourByLocalTimeZone(23).hour;
                ;
                // return [str5+"",str11+"",str11+"",str17+"",str17+"",str23+"",str23+"",str5+""];  
                var timedesc = ComponentManager.getTextField(LanguageManager.getlocal("changebg_timedesc", [str5 + "", str11 + "", str11 + "", str17 + "", str17 + "", str23 + "", str23 + "", str5 + ""]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                timedesc.width = this.viewBg.width - 60;
                timedesc.lineSpacing = 5;
                timedesc.setPosition(36 + GameData.popupviewOffsetX, itemBg2.y + 8 + itemBg2.height);
                this.addChildToContainer(timedesc);
                var linetext = ComponentManager.getTextField("-------------------------------------------------------------------", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                linetext.setPosition(timedesc.x, timedesc.y + 5 + timedesc.height);
                this.addChildToContainer(linetext);
                offsetY = timedesc.height + 30;
            }
            servantName = ComponentManager.getTextField(LanguageManager.getlocal("changebg_force_title"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            servantName.setPosition(36 + GameData.popupviewOffsetX, itemBg2.y + 8 + itemBg2.height + offsetY);
            servantName.width = this.viewBg.width - 60;
            servantName.lineSpacing = 5;
            this.addChildToContainer(servantName);
            itemBg.height = servantName.y + 15 + servantName.height;
            tempBg.y = itemBg.y + itemBg.height + 25;
            var count = 0;
            // let index:number = 1;
            // if (abilitycfg.buffType)
            // {
            var abilityDesc = ComponentManager.getTextField(LanguageManager.getlocal("changebg_buff" + abilitycfg.buffType), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            abilityDesc.setPosition(36 + count % 2 * 252 + GameData.popupviewOffsetX, servantName.y + 18 + servantName.height + Math.floor(count / 2) * 30);
            this.addChildToContainer(abilityDesc);
            var ability = ComponentManager.getTextField("+" + (abilitycfg.buffValue * 100) + "%", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
            ability.setPosition(abilityDesc.x + abilityDesc.width + 3, abilityDesc.y);
            this.addChildToContainer(ability);
            count++;
            // }
            itemBg.height = servantName.y + 15 + servantName.height + Math.floor((count + 1) / 2) * 30;
            tempBg.y = itemBg.y + itemBg.height + 25;
        }
        else {
            servantName = ComponentManager.getTextField(LanguageManager.getlocal("changebg_servant_title" + textkey, [LanguageManager.getlocal("servant_name" + servantId)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            servantName.setPosition(36 + GameData.popupviewOffsetX, itemBg2.y + 8 + itemBg2.height);
            servantName.width = this.viewBg.width - 60;
            this.addChildToContainer(servantName);
            var count = 0;
            var abilityType1 = abilitycfg.type1;
            var index = 1;
            for (var k in abilityType1) {
                var v = abilityType1[k];
                if (v) {
                    var abilityDesc = ComponentManager.getTextField(LanguageManager.getlocal("exchangeScene_pro" + index), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                    abilityDesc.setPosition(36 + count % 2 * 252 + GameData.popupviewOffsetX, servantName.y + 18 + servantName.height + Math.floor(count / 2) * 30);
                    this.addChildToContainer(abilityDesc);
                    var ability = ComponentManager.getTextField("+" + abilitycfg.powerAdd, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
                    ability.setPosition(abilityDesc.x + abilityDesc.width + 3, abilityDesc.y);
                    this.addChildToContainer(ability);
                    count++;
                }
                index++;
            }
            var abilityType2 = abilitycfg.type2;
            index = 1;
            for (var k in abilityType2) {
                var v = abilityType2[k];
                if (v) {
                    var abilityDesc = ComponentManager.getTextField(LanguageManager.getlocal("exchangeScene_pro" + index), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                    abilityDesc.setPosition(36 + count % 2 * 252 + GameData.popupviewOffsetX, servantName.y + 18 + servantName.height + Math.floor(count / 2) * 30);
                    this.addChildToContainer(abilityDesc);
                    var ability = ComponentManager.getTextField("+" + abilitycfg.ratioAdd * 100 + "%", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
                    ability.setPosition(abilityDesc.x + abilityDesc.width + 3, abilityDesc.y);
                    this.addChildToContainer(ability);
                    count++;
                }
                index++;
            }
            itemBg.height = servantName.y + 15 + servantName.height + Math.floor(count / 2) * 30;
            tempBg.y = itemBg.y + itemBg.height + 25;
        }
        if (Api.otherInfoVoApi.isHasScene(curKey, this._sceneName)) {
            if (Api.switchVoApi.checkOpenChangeBg()) {
                var useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "useBtn", this.useHandler, this);
                useBtn.setPosition(this.viewBg.width / 2 - useBtn.width / 2, itemBg.height + itemBg.y + 12);
                this.addChildToContainer(useBtn);
                useBtn.y = tempBg.y + tempBg.height / 2 - useBtn.height / 2;
                useBtn.setColor(TextFieldConst.COLOR_BLACK);
                if (curKey == Api.otherInfoVoApi.getCurSceneId(this._sceneName)) {
                    useBtn.setEnable(false);
                }
                else {
                    useBtn.setEnable(true);
                }
            }
        }
        else {
            if (abilitycfg.price) {
                if (Api.switchVoApi.checkOpenChangeBg()) {
                    var buyBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "", this.buyHandler, this);
                    buyBtn.setPosition(this.viewBg.width / 2 - buyBtn.width / 2, itemBg.height + itemBg.y + 6);
                    this.addChildToContainer(buyBtn);
                    buyBtn.y = tempBg.y + tempBg.height / 2 - buyBtn.height / 2;
                    var gemIcon = BaseLoadBitmap.create("itemicon1");
                    gemIcon.scaleX = 0.4;
                    gemIcon.scaleY = 0.4;
                    gemIcon.x = 26;
                    gemIcon.y = 10;
                    buyBtn.addChild(gemIcon);
                    var buyBtnText = ComponentManager.getTextField(String(abilitycfg.price), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
                    buyBtnText.setPosition(78, 20);
                    buyBtn.addChild(buyBtnText);
                }
            }
            else if (abilitycfg.unlock) {
                if (abilitycfg.unlock <= Api.playerVoApi.getPlayerLevel()) {
                    if (Api.switchVoApi.checkOpenChangeBg()) {
                        this._unlockBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "changebg_unlock", this.buyRealHandler, this);
                        this._unlockBtn.setPosition(this.viewBg.width / 2 - this._unlockBtn.width / 2, itemBg.height + itemBg.y + 6);
                        this.addChildToContainer(this._unlockBtn);
                        this._unlockBtn.y = tempBg.y + tempBg.height / 2 - this._unlockBtn.height / 2;
                        this._unlockBtn.setColor(TextFieldConst.COLOR_BLACK);
                        App.CommonUtil.addIconToBDOC(this._unlockBtn);
                    }
                }
                else {
                    var lockText = ComponentManager.getTextField(LanguageManager.getlocal("changebgUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(abilitycfg.unlock)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
                    lockText.setPosition(20, itemBg.height + itemBg.y + 10);
                    lockText.width = this.viewBg.width - 40;
                    lockText.textAlign = egret.HorizontalAlign.CENTER;
                    lockText.lineSpacing = 6;
                    this.addChildToContainer(lockText);
                    lockText.y = tempBg.y + tempBg.height / 2 - lockText.height / 2;
                }
            }
            else if (abilitycfg.activityUnlock) {
                if (Api.otherInfoVoApi.isHasSceneUnlock(curKey, this._sceneName)) {
                    if (Api.switchVoApi.checkOpenChangeBg()) {
                        this._unlockBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "changebg_unlock", this.buyRealHandler, this);
                        this._unlockBtn.setPosition(this.viewBg.width / 2 - this._unlockBtn.width / 2, itemBg.height + itemBg.y + 6);
                        this.addChildToContainer(this._unlockBtn);
                        this._unlockBtn.y = tempBg.y + tempBg.height / 2 - this._unlockBtn.height / 2;
                        this._unlockBtn.setColor(TextFieldConst.COLOR_BLACK);
                        App.CommonUtil.addIconToBDOC(this._unlockBtn);
                    }
                }
                else {
                    var lockText = ComponentManager.getTextField(LanguageManager.getlocal("changebgUnlockDesc_" + curKey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
                    lockText.setPosition(20, itemBg.height + itemBg.y + 10);
                    lockText.width = this.viewBg.width - 40;
                    lockText.textAlign = egret.HorizontalAlign.CENTER;
                    lockText.lineSpacing = 6;
                    this.addChildToContainer(lockText);
                    lockText.y = tempBg.y + tempBg.height / 2 - lockText.height / 2;
                }
            }
        }
    };
    ChangebgDetailPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        if (this.container.y + this._tempBg.y + this._tempBg.height + 13 + 1 > this.viewBg.y + this.viewBg.height) {
            this.viewBg.height += 30;
        }
    };
    ChangebgDetailPopupView.prototype.useHandler = function () {
        var curKey = this.param.data.key;
        if (curKey == Api.otherInfoVoApi.getCurSceneId()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("changebg_is_using"));
            return;
        }
        this.request(NetRequestConst.REQYEST_OTHERINFO_SWITCHSCENESKIN, { skinId: curKey, skinType: this._sceneName });
    };
    ChangebgDetailPopupView.prototype.buyHandler = function () {
        var curKey = this.param.data.key;
        var sceneStr = this.param.data.scene;
        var scenecfg = Config.SceneCfg.getSceneCfgBySceneName(sceneStr, curKey);
        var needNum = scenecfg.personalityCfg.price;
        if (Api.playerVoApi.getPlayerGem() < needNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
            return;
        }
        var message = LanguageManager.getlocal("changebg_buyskin", [String(needNum)]);
        var mesObj = {
            confirmCallback: this.buyRealHandler,
            handler: this,
            icon: "itemicon1",
            iconBg: "itembg_1",
            num: Api.playerVoApi.getPlayerGem(),
            useNum: needNum,
            msg: message,
            id: 1,
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    ChangebgDetailPopupView.prototype.buyRealHandler = function () {
        var curKey = this.param.data.key;
        this.request(NetRequestConst.REQYEST_OTHERINFO_BUYSCENESKIN, { skinId: curKey, skinType: this._sceneName });
    };
    ChangebgDetailPopupView.prototype.receiveData = function (data) {
        var view = this;
        var cmd = data.data.cmd;
        if (data.ret == true) {
            var curKey = this.param.data.key;
            if (cmd == NetRequestConst.REQYEST_OTHERINFO_BUYSCENESKIN) {
                App.CommonUtil.showTip(LanguageManager.getlocal("changebg_get"));
                this.refreshAndClose();
            }
            else if (cmd == NetRequestConst.REQYEST_OTHERINFO_SWITCHSCENESKIN) {
                App.CommonUtil.showTip(LanguageManager.getlocal("changebg_use_success"));
                if (this._sceneName.toLowerCase() == "homescene") {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGEBG + "homescene", { id: curKey });
                }
                else if (this._sceneName.toLowerCase() == "cityscene") {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGEBG + "cityscene", { id: curKey });
                }
                this.refreshAndClose();
            }
        }
    };
    ChangebgDetailPopupView.prototype.refreshAndClose = function () {
        if (this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    ChangebgDetailPopupView.prototype.getTitleStr = function () {
        return "detail";
    };
    ChangebgDetailPopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    ChangebgDetailPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        App.CommonUtil.removeIconFromBDOC(this._unlockBtn);
        this._unlockBtn = null;
        this._sceneName = null;
        _super.prototype.dispose.call(this);
    };
    return ChangebgDetailPopupView;
}(PopupView));
__reflect(ChangebgDetailPopupView.prototype, "ChangebgDetailPopupView");
//# sourceMappingURL=ChangebgDetailPopupView.js.map