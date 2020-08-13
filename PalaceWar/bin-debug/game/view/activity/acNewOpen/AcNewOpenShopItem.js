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
var AcNewOpenShopItem = (function (_super) {
    __extends(AcNewOpenShopItem, _super);
    function AcNewOpenShopItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        //购买按钮
        _this._buyBtn = null;
        _this._cfg = null;
        _this._limitNumTF = null;
        _this._isRequesting = false;
        return _this;
    }
    Object.defineProperty(AcNewOpenShopItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenShopItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenShopItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenShopItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_NEWOPEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenShopItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewOpenShopItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            case 3:
            case 4:
                code = "4";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcNewOpenShopItem.prototype.initItem = function (index, data, itemparam) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY), this.buyHandlerCallback, this);
        this._cfg = data;
        var view = this;
        view._code = itemparam;
        var code = view.getUiCode();
        var wordsBg = BaseBitmap.create("public_scrollitembg");
        wordsBg.height = 150;
        wordsBg.x = GameConfig.stageWidth / 2 - wordsBg.width / 2;
        this.addChild(wordsBg);
        var rewardItemVo = data.rewardIcons;
        var icon = GameData.getItemIcon(rewardItemVo, true);
        icon.x = 15 + wordsBg.x;
        icon.y = 24;
        this.addChild(icon);
        var itemNameBg = BaseBitmap.create("public_titlebg");
        itemNameBg.x = icon.x + 115;
        itemNameBg.y = icon.y;
        var itemNameBgWidth = 240;
        itemNameBg.width = itemNameBgWidth;
        this.addChild(itemNameBg);
        var itemNameTF = ComponentManager.getTextField(rewardItemVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        itemNameTF.x = itemNameBg.x + 15;
        itemNameTF.y = itemNameBg.y + itemNameBg.height / 2 - itemNameTF.height / 2;
        this.addChild(itemNameTF);
        var itemDescTF = ComponentManager.getTextField(rewardItemVo.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemDescTF.x = itemNameBg.x;
        itemDescTF.y = itemNameBg.y + itemNameBg.height + 7;
        itemDescTF.width = 280;
        this.addChild(itemDescTF);
        this._buyBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "nothing", this.buyHandler, this);
        var str = "" + data.specialCost;
        this._buyBtn.setText(str, false);
        this._buyBtn.addTextIcon(App.CommonUtil.getResByCode("acnewopen_specialitem2", code), 1);
        this._buyBtn.x = wordsBg.x + wordsBg.width - this._buyBtn.width - 12;
        this._buyBtn.y = wordsBg.height / 2 - this._buyBtn.height / 2;
        this.addChild(this._buyBtn);
        this._limitNumTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._limitNumTF.y = this._buyBtn.y + this._buyBtn.height + 7;
        this.addChild(this._limitNumTF);
        this.update();
        this.height = 156;
    };
    AcNewOpenShopItem.prototype.update = function () {
        var buyNum = this._cfg.limit - this.vo.getShopByNum(this._cfg.id);
        this._limitNumTF.text = LanguageManager.getlocal("acNewOpenShopbuy", [buyNum.toString()]);
        if (buyNum > 0) {
            this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_GREEN2; // 0x00ff00;
        }
        else {
            this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_RED;
            this._buyBtn.setEnable(false);
        }
        this._limitNumTF.x = this._buyBtn.x + this._buyBtn.width / 2 - this._limitNumTF.width / 2;
    };
    AcNewOpenShopItem.prototype.buyHandler = function (param) {
        if (this.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        var limitNum = this.vo.getSpecialNum() - this._cfg.specialCost;
        if (limitNum < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acNewOpenNotEnough"));
            return;
        }
        this._isRequesting = true;
        this.vo.lastidx = this._cfg.id;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY, { activeId: this.vo.aidAndCode, rkey: this._cfg.id, num: 1 });
    };
    AcNewOpenShopItem.prototype.buyHandlerCallback = function (event) {
        if (this._isRequesting == false) {
            return;
        }
        this._isRequesting = false;
        if (event && event.data && event.data.ret) {
            var rData = event.data.data;
            if (rData.ret == 0) {
                var rewards = rData.data.rewards;
                var rewardList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rewardList);
                this.update();
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("shopBuyFailure"));
            }
        }
    };
    AcNewOpenShopItem.prototype.getSpaceY = function () {
        return 8;
    };
    AcNewOpenShopItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY), this.buyHandlerCallback, this);
        this._code = null;
        this._buyBtn = null;
        this._cfg = null;
        this._limitNumTF = null;
        this._isRequesting = false;
        _super.prototype.dispose.call(this);
    };
    return AcNewOpenShopItem;
}(ScrollListItem));
__reflect(AcNewOpenShopItem.prototype, "AcNewOpenShopItem");
//# sourceMappingURL=AcNewOpenShopItem.js.map