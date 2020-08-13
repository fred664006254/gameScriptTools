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
var AcAskGodRewardTab1ScrollItem = /** @class */ (function (_super) {
    __extends(AcAskGodRewardTab1ScrollItem, _super);
    function AcAskGodRewardTab1ScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcAskGodRewardTab1ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodRewardTab1ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodRewardTab1ScrollItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodRewardTab1ScrollItem.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodRewardTab1ScrollItem.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    /**
     * 初始化itemview
     */
    AcAskGodRewardTab1ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this.width = 530;
        var itemBg = BaseBitmap.create("public_popupscrollitembg");
        itemBg.height = 140;
        itemBg.x = this.width / 2 - itemBg.width / 2;
        this.addChild(itemBg);
        var rewards = this._itemData.item;
        if (this._itemData.costSpecial8) {
            rewards = "1064_0_" + this._itemData.costSpecial8 + "_" + this.getTypeCode() + "|" + rewards;
        }
        if (this._itemData.costSpecial4) {
            rewards = "1063_0_" + this._itemData.costSpecial4 + "_" + this.getTypeCode() + "|" + rewards;
        }
        if (this._itemData.costSpecial2) {
            rewards = "1062_0_" + this._itemData.costSpecial2 + "_" + this.getTypeCode() + "|" + rewards;
        }
        var rewardIconList = GameData.getRewardItemIcons(rewards, true);
        var scale = 0.7;
        var spaceX = 20;
        for (var i = 0; i < rewardIconList.length; i++) {
            var rewardDB = rewardIconList[i];
            rewardDB.setScale(scale);
            rewardDB.setPosition(17 + i * (rewardDB.width * rewardDB.scaleX + spaceX), itemBg.height / 2 - rewardDB.height * rewardDB.scaleY / 2);
            this.addChild(rewardDB);
            if (i == rewardIconList.length - 2) {
                var arrow = BaseBitmap.create("dechuanchangearrow-1");
                arrow.setPosition(rewardDB.x + rewardDB.width * rewardDB.scaleX - 3, itemBg.height / 2 - arrow.height / 2);
                this.addChild(arrow);
            }
            else if (i == rewardIconList.length - 1) {
                rewardDB.x = 17 + i * (rewardDB.width * rewardDB.scaleX + spaceX) + 5;
            }
            else {
                var add = BaseBitmap.create("public_itemadd");
                add.setPosition(rewardDB.x + rewardDB.width * rewardDB.scaleX, itemBg.height / 2 - add.height / 2);
                this.addChild(add);
            }
        }
        this.height = itemBg.height + this.getSpaceY();
        var state = this.vo.canGetExchange(String(this._itemData.id));
        var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "acSkySoundExchangeBtnTxt", function () {
            if ((!_this.vo.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            var st = _this.vo.canGetExchange(String(_this._itemData.id));
            if (st == 1) {
                NetManager.request(NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGE, { activeId: _this.vo.aidAndCode, shopId: Number(data.id) });
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("acSkySoundExchangeNoTxt"));
            }
        }, this);
        reviceBtn.scaleX = 0.95;
        reviceBtn.setPosition(itemBg.x + itemBg.width - reviceBtn.width * reviceBtn.scaleX - 5, itemBg.y + itemBg.height / 2 - reviceBtn.height / 2);
        this.addChild(reviceBtn);
        if (state == 2) {
            reviceBtn.setEnable(false);
        }
        if (this._itemData.limit) {
            var lefttimes = this._itemData.limit - this.vo.getExchangeTimes(String(data.id));
            lefttimes = lefttimes > 0 ? lefttimes : 0;
            var txt = ComponentManager.getTextField(LanguageManager.getlocal("acSkySoundExchangeDescTxt", [String(lefttimes)]), 18, TextFieldConst.COLOR_BROWN);
            txt.width = reviceBtn.width * reviceBtn.scaleX;
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.x = reviceBtn.x;
            txt.y = reviceBtn.y - txt.height;
            this.addChild(txt);
        }
    };
    AcAskGodRewardTab1ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcAskGodRewardTab1ScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcAskGodRewardTab1ScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcAskGodRewardTab1ScrollItem.js.map