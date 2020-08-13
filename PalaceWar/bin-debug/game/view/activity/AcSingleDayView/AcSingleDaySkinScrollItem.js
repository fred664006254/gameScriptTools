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
var AcSingleDaySkinScrollItem = (function (_super) {
    __extends(AcSingleDaySkinScrollItem, _super);
    function AcSingleDaySkinScrollItem() {
        var _this = _super.call(this) || this;
        _this._uiData = undefined;
        _this._isGray = false;
        _this._nodeContainer = undefined;
        _this._isOwn = false;
        _this._rewardVo = undefined;
        _this._ownerTxt2 = undefined;
        _this._ownerTxt = undefined;
        _this._aid = undefined;
        _this._code = undefined;
        _this._buyBtn = undefined;
        _this._limitNum = undefined;
        return _this;
    }
    Object.defineProperty(AcSingleDaySkinScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDaySkinScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDaySkinScrollItem.prototype.initItem = function (index, data) {
        this.width = 305;
        this.height = 425;
        this._uiData = data;
        var serSkincfg = undefined;
        var wifeSkincfg = undefined;
        this._aid = this._uiData[2];
        this._code = this._uiData[3];
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var bg = BaseBitmap.create("acsingleday_skinbg1_1");
        bg.width = 302;
        bg.height = 425;
        // bg.anchorOffsetX = bg.width/2;
        bg.x = (this.width - bg.width) / 2;
        bg.name = "bg";
        this._nodeContainer.addChild(bg);
        var rect = new egret.Rectangle(0, 0, 405, 440);
        var tarScale = 0.61;
        var tarY = bg.y;
        var skinImgPath = "";
        var skinNameStr = "";
        var ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr2");
        var isGray = true;
        this._buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", this.buyBtnHandler, this);
        this._rewardVo = new RewardItemVo();
        this._rewardVo.initData(this._uiData[0].itemID);
        this._isOwn = false;
        if (this._rewardVo.type == 16) {
            bg.texture = ResourceManager.getRes("acsingleday_skinbg2_1");
            wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._rewardVo.id);
            var info = Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._rewardVo.id);
            if (info) {
                this._isOwn = true;
                isGray = false;
                // App.DisplayUtil.changeToGray(this._buyBtn);
                // bg.texture = ResourceManager.getRes("acsingleday_skinbg2_1");
            }
            else {
                this._isOwn = false;
                isGray = true;
                // App.DisplayUtil.changeToNormal(this._buyBtn);
                // bg.texture = ResourceManager.getRes("acsingleday_skinbg2_2");
            }
            skinImgPath = wifeSkincfg.body;
            skinNameStr = LanguageManager.getlocal("wifeName_" + wifeSkincfg.wifeId) + " " + wifeSkincfg.name;
            tarScale = 0.53;
            rect.width = 640;
            rect.height = 600;
            tarY = bg.y + 32;
            var skinImg = BaseLoadBitmap.create(skinImgPath);
            skinImg.mask = rect;
            skinImg.setScale(tarScale);
            skinImg.x = bg.x + bg.width / 2 - rect.width * tarScale / 2;
            skinImg.y = tarY;
            this._nodeContainer.addChild(skinImg);
            var namebg = BaseBitmap.create("acsingleday_skinnamebg");
            namebg.x = bg.x + bg.width / 2 - namebg.width / 2;
            namebg.y = bg.y + 30 - 2;
            this._nodeContainer.addChild(namebg);
            var skinNameTxt = ComponentManager.getTextField(skinNameStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            skinNameTxt.x = namebg.x + namebg.width / 2 - skinNameTxt.width / 2;
            skinNameTxt.y = namebg.y + namebg.height * namebg.scaleY / 2 - skinNameTxt.height / 2;
            this._nodeContainer.addChild(skinNameTxt);
        }
        else if (this._rewardVo.type == 11) {
            bg.texture = ResourceManager.getRes("acsingleday_skinbg1_1");
            var _name = LanguageManager.getlocal("itemName_" + this._rewardVo.id);
            var _icon = "itemicon" + this._rewardVo.id;
            var itemCfg = Config.TitleCfg.getTitleCfgById(this._rewardVo.id);
            var light = BaseBitmap.create("tailor_get_light");
            light.setScale(0.5);
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            light.x = bg.x + bg.width / 2;
            light.y = bg.y + bg.height / 2 - 40;
            egret.Tween.get(light, { loop: true }).to({ rotation: 360 }, 5000);
            this._nodeContainer.addChild(light);
            var deltaS = 1.3;
            var avatarImg = BaseLoadBitmap.create(_icon);
            avatarImg.width = avatarImg.height = 100 * deltaS;
            avatarImg.x = bg.x + bg.width / 2 - 50 * deltaS + 5;
            avatarImg.y = bg.y + bg.height / 2 - 105;
            this._nodeContainer.addChild(avatarImg);
            var namebg = BaseBitmap.create("acsingleday_skinnamebg");
            namebg.x = bg.x + bg.width / 2 - namebg.width / 2;
            namebg.y = bg.y + 30 - 2;
            this._nodeContainer.addChild(namebg);
            var itemNameTxt = ComponentManager.getTextField(_name, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            itemNameTxt.x = namebg.x + namebg.width / 2 - itemNameTxt.width / 2;
            itemNameTxt.y = namebg.y + namebg.height * namebg.scaleY / 2 - itemNameTxt.height / 2;
            this._nodeContainer.addChild(itemNameTxt);
            if (Api.itemVoApi.getTitleInfoVoById(this._rewardVo.id).num > 0) {
                if (!Api.switchVoApi.checkOpenTitleLv()) {
                    this._isOwn = true;
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }
                else {
                    if (this.vo.skin[this._uiData[1]] && this.vo.skin[this._uiData[1]] >= this._uiData[0].limit) {
                        this._isOwn = true;
                        App.DisplayUtil.changeToGray(this._buyBtn);
                    }
                    else {
                        this._isOwn = false;
                        App.DisplayUtil.changeToNormal(this._buyBtn);
                    }
                }
            }
            else {
                this._isOwn = false;
                App.DisplayUtil.changeToNormal(this._buyBtn);
            }
        }
        else if (this._rewardVo.type == 6) {
            var _name = LanguageManager.getlocal("itemName_" + this._rewardVo.id);
            var _icon = "itemicon" + this._rewardVo.id;
            var light = BaseBitmap.create("tailor_get_light");
            light.setScale(0.5);
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            light.x = bg.x + bg.width / 2;
            light.y = bg.y + bg.height / 2 - 40;
            egret.Tween.get(light, { loop: true }).to({ rotation: 360 }, 5000);
            this._nodeContainer.addChild(light);
            var deltaS = 1.3;
            var avatarImg = BaseLoadBitmap.create(_icon);
            avatarImg.width = avatarImg.height = 100 * deltaS;
            avatarImg.x = bg.x + bg.width / 2 - 50 * deltaS + 5;
            avatarImg.y = bg.y + bg.height / 2 - 105;
            this._nodeContainer.addChild(avatarImg);
            var namebg = BaseBitmap.create("acsingleday_skinnamebg");
            namebg.x = bg.x + bg.width / 2 - namebg.width / 2;
            namebg.y = bg.y + 30 - 2;
            this._nodeContainer.addChild(namebg);
            var itemNameTxt = ComponentManager.getTextField(_name, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            itemNameTxt.x = namebg.x + namebg.width / 2 - itemNameTxt.width / 2;
            itemNameTxt.y = namebg.y + namebg.height * namebg.scaleY / 2 - itemNameTxt.height / 2;
            this._nodeContainer.addChild(itemNameTxt);
            var bnum = this.vo.skin[this._uiData[1]] || 0;
            var limitNum = this._uiData[0].limit - bnum;
            if (limitNum <= 0) {
                App.DisplayUtil.changeToGray(this._buyBtn);
            }
            else {
                App.DisplayUtil.changeToNormal(this._buyBtn);
            }
        }
        var btmask = BaseBitmap.create("acsingleday_skinnameb2");
        btmask.x = bg.x + bg.width / 2 - btmask.width / 2;
        btmask.y = bg.y + bg.height - btmask.height - 75;
        this._nodeContainer.addChild(btmask);
        if (this._rewardVo.type == 16) {
            var _ownerTxt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_GREEN);
            var strKey2 = "acSingleDaySkin_getWife2";
            if (Api.wifeVoApi.getWifeInfoVoById(wifeSkincfg.wifeId)) {
                strKey2 = "acSingleDaySkin_getWife1";
            }
            _ownerTxt2.text = LanguageManager.getlocal(strKey2);
            _ownerTxt2.x = bg.x + bg.width / 2 - _ownerTxt2.width / 2;
            _ownerTxt2.y = bg.y + bg.height - 97;
            this._nodeContainer.addChild(_ownerTxt2);
            this._ownerTxt2 = _ownerTxt2;
        }
        else if (this._uiData[0].limit > 0) {
            var bnum = this.vo.skin[this._uiData[1]] || 0;
            var limitNum = this._uiData[0].limit - bnum;
            var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            limitTxt.x = bg.x + bg.width / 2 - limitTxt.width / 2;
            limitTxt.y = btmask.y + btmask.height / 2 - limitTxt.height / 2;
            this._nodeContainer.addChild(limitTxt);
            this._limitNum = limitTxt;
        }
        var view = this;
        var tag = BaseBitmap.create('shopview_corner');
        view.setLayoutPosition(LayoutConst.lefttop, tag, view, [9, 12]);
        view.addChild(tag);
        var cost = (this._uiData[0].rebate * 10);
        var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle', [cost.toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
        tagTxt.rotation = -45;
        view.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [5, 27]);
        var tagnum = 10 - this._uiData[0].rebate * 10;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
            tagTxt.text = LanguageManager.getlocal('sweetgiftShopDiscount-1', [(tagnum * 10).toString()]);
        }
        view.addChild(tagTxt);
        var strKey = "acSineleDaySkin_own";
        if (this._isOwn == false) {
            strKey = "acSineleDaySkin_notown";
        }
        this._buyBtn.setText("" + (this._uiData[0].price * this._uiData[0].rebate), false);
        this._buyBtn.addTextIcon("public_icon1", 2);
        this._buyBtn.x = bg.x + bg.width / 2 - this._buyBtn.width / 2;
        this._buyBtn.y = bg.y + bg.height - this._buyBtn.height - 14;
        this._buyBtn.name = "buyBtn";
        this._nodeContainer.addChild(this._buyBtn);
        // if(this._isOwn){
        //    App.DisplayUtil.changeToGray(this._buyBtn);
        // }
        var detailBtn = ComponentManager.getButton("servant_detailBtn", "", this.detailBtnHandler, this);
        detailBtn.x = bg.x + bg.width - detailBtn.width - 13;
        detailBtn.y = bg.y + 56;
        this._nodeContainer.addChild(detailBtn);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (this._rewardVo.type == 16 && vo.isBuySkin(this._uiData[1])) {
            App.DisplayUtil.changeToGray(this._buyBtn);
        }
    };
    AcSingleDaySkinScrollItem.prototype.refreshUI = function () {
        var bg = this._nodeContainer.getChildByName("bg");
        if (this._rewardVo.type == 16) {
            var info = Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._rewardVo.id);
            if (info) {
                this._isOwn = true;
            }
            else {
                this._isOwn = false;
            }
        }
        else if (this._rewardVo.type == 11) {
            if (Api.itemVoApi.getTitleInfoVoById(this._rewardVo.id).num > 0) {
                if (!Api.switchVoApi.checkOpenTitleLv()) {
                    this._isOwn = true;
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }
                else {
                    if (this.vo.skin[this._uiData[1]] && this.vo.skin[this._uiData[1]] >= this._uiData[0].limit) {
                        this._isOwn = true;
                        App.DisplayUtil.changeToGray(this._buyBtn);
                    }
                    else {
                        this._isOwn = false;
                        App.DisplayUtil.changeToNormal(this._buyBtn);
                    }
                }
            }
            else {
                this._isOwn = false;
                App.DisplayUtil.changeToNormal(this._buyBtn);
            }
            if (this._limitNum) {
                var bnum = this.vo.skin[this._uiData[1]] || 0;
                var limitNum = this._uiData[0].limit - bnum;
                this._limitNum.text = LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
            }
        }
        else if (this._rewardVo.type == 6) {
            if (this._limitNum) {
                var bnum = this.vo.skin[this._uiData[1]] || 0;
                var limitNum = this._uiData[0].limit - bnum;
                if (limitNum <= 0) {
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }
                else {
                    App.DisplayUtil.changeToNormal(this._buyBtn);
                }
                this._isOwn = false;
                this._limitNum.text = LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
            }
        }
        var strKey = "acSineleDaySkin_own";
        if (this._isOwn == false) {
            strKey = "acSineleDaySkin_notown";
        }
        if (this._ownerTxt) {
            this._ownerTxt.text = LanguageManager.getlocal(strKey);
            this._ownerTxt.x = bg.x + bg.width / 2 - this._ownerTxt.width / 2;
        }
        if (this._rewardVo.type == 16) {
            var wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._rewardVo.id);
            var strKey2 = "acSingleDaySkin_getWife2";
            if (Api.wifeVoApi.getWifeInfoVoById(wifeSkincfg.wifeId)) {
                strKey2 = "acSingleDaySkin_getWife1";
            }
            this._ownerTxt2.text = LanguageManager.getlocal(strKey2);
        }
    };
    AcSingleDaySkinScrollItem.prototype.detailBtnHandler = function () {
        var param = {};
        if (this._rewardVo.type == 16) {
            param["skinId"] = this._rewardVo.id;
        }
        else if (this._rewardVo.type == 11) {
            param["titleId"] = this._rewardVo.id;
        }
        else if (this._rewardVo.type == 6) {
            param["itemId"] = this._rewardVo.id;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAYSKINPROPERTYPOPUPVIEW, param);
    };
    AcSingleDaySkinScrollItem.prototype.buyBtnCallbackHandler = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ACTIVITY_BUYSINGLEDAYSHOP, this.buyBtnCallbackHandler, this);
        var data = event.data;
        if (data.data.ret == 0) {
            this.refreshUI();
            var rewards = data.data.data.rewards;
            var replacerewards = data.data.data.replacerewards;
            var rvo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rvo);
            var buyBtn = this._nodeContainer.getChildByName("buyBtn");
            if (buyBtn) {
                App.DisplayUtil.changeToGray(buyBtn);
            }
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, {
                    "replacerewards": replacerewards, "message": "changeOtherRewardTip"
                });
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("manageTrader_buy_fail"));
        }
    };
    AcSingleDaySkinScrollItem.prototype.buyBtnHandler = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        // if(this._isOwn && this._rewardVo.type == 16){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acSineleDaySkin_ownTip1"));
        //     return;
        // }
        if (this._rewardVo.type == 16 && vo.isBuySkin(this._uiData[1])) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acSineleDaySkin_ownTip3"));
            return;
        }
        if (this._rewardVo.type == 11 && Api.itemVoApi.getTitleInfoVoById(this._rewardVo.id).num > 0) {
            if (!Api.switchVoApi.checkOpenTitleLv()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acSineleDaySkin_ownTip2"));
                return;
            }
            else {
                // || this._uiData[0].limit == 0 
                if (this.vo.skin[this._uiData[1]] && this.vo.skin[this._uiData[1]] >= this._uiData[0].limit) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
                    return;
                }
            }
        }
        if (this._rewardVo.type == 6 && vo.isBuySkin(this._uiData[1])) {
            if (this.vo.skin[this._uiData[1]] && this.vo.skin[this._uiData[1]] >= this._uiData[0].limit) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
                return;
            }
        }
        this.composeHandler();
    };
    AcSingleDaySkinScrollItem.prototype.composeHandler = function () {
        var view = this;
        var itemcfg = this._uiData[0];
        var coupon = view.vo.getMyRedpt();
        var arr = [];
        for (var i in coupon) {
            var unit = coupon[i];
            if (unit.value <= Math.ceil(itemcfg.rebate * itemcfg.price * 0.5)) {
                arr.push(unit);
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAYBUYCONFIRMPOPUPVIEW, {
            id: itemcfg.id,
            price: itemcfg.rebate * itemcfg.price,
            itemid: this._uiData[0].itemID,
            coupon: arr,
            confirmCallback: this._doRequest,
            handler: this,
        });
    };
    AcSingleDaySkinScrollItem.prototype._doRequest = function (param) {
        var itemType = 1;
        var itemId = this._uiData[1];
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ACTIVITY_BUYSINGLEDAYSHOP, this.buyBtnCallbackHandler, this);
        var couponId = 0;
        if (param && Number(param) > 0) {
            couponId = param;
            NetManager.request(NetRequestConst.REQYEST_ACTIVITY_BUYSINGLEDAYSHOP, { mType: itemType, itemKey: itemId, activeId: this._aid + "-" + this._code, couponId: couponId });
        }
        else {
            NetManager.request(NetRequestConst.REQYEST_ACTIVITY_BUYSINGLEDAYSHOP, { mType: itemType, itemKey: itemId, activeId: this._aid + "-" + this._code });
        }
    };
    AcSingleDaySkinScrollItem.prototype.touchHandler = function (event) {
        var scalV = 0.97;
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._nodeContainer.setScale(scalV);
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._nodeContainer.setScale(1.0);
                break;
            case egret.TouchEvent.TOUCH_END:
                this._nodeContainer.setScale(1.0);
                // ViewController.getInstance().openView(ViewConst.COMMON.SKINDETAILVIEW,this._uiData);
                break;
        }
    };
    AcSingleDaySkinScrollItem.prototype.getSpaceX = function () {
        return 3;
    };
    AcSingleDaySkinScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcSingleDaySkinScrollItem.prototype.dispose = function () {
        this._nodeContainer = null;
        this._uiData = null;
        this._isGray = false;
        this._isOwn = false;
        this._rewardVo = null;
        this._ownerTxt2 = null;
        this._ownerTxt = null;
        this._aid = null;
        this._code = null;
        this._buyBtn = null;
        this._limitNum = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDaySkinScrollItem;
}(ScrollListItem));
__reflect(AcSingleDaySkinScrollItem.prototype, "AcSingleDaySkinScrollItem");
//# sourceMappingURL=AcSingleDaySkinScrollItem.js.map