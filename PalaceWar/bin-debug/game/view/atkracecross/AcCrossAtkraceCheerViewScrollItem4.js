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
 * author : wxz
 * date : 2020.7.8
 * desc : 积分兑换itemrender
 */
var AcCrossAtkraceCheerViewScrollItem4 = /** @class */ (function (_super) {
    __extends(AcCrossAtkraceCheerViewScrollItem4, _super);
    function AcCrossAtkraceCheerViewScrollItem4() {
        var _this = _super.call(this) || this;
        _this._aid = "";
        _this._code = "";
        _this._data = null;
        return _this;
    }
    Object.defineProperty(AcCrossAtkraceCheerViewScrollItem4.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerViewScrollItem4.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerViewScrollItem4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossAtkraceCheerViewScrollItem4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossAtkraceCheerViewScrollItem4.prototype.initItem = function (index, data, itemparam) {
        this._aid = itemparam.aid;
        this._code = itemparam.code;
        this._data = data;
        var item;
        item = GameData.formatRewardItem(data.sell)[0];
        var wordsBg = BaseBitmap.create("accshegemony_shopitembg");
        wordsBg.width = 204;
        wordsBg.height = 287;
        this.width = wordsBg.width;
        this.height = wordsBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wordsBg, this);
        this.addChild(wordsBg);
        var itemNameTF = ComponentManager.getTextField(item.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, item.nameColor);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemNameTF, wordsBg, [0, 32]);
        this.addChild(itemNameTF);
        var icon = GameData.getItemIcon(item, true);
        icon.width = icon.height = 106;
        icon.x = this.width / 2 - icon.width / 2;
        icon.y = 60;
        this.addChild(icon);
        //限购
        var buyNum = 0;
        if (data.isItem) {
            buyNum = this.vo.getShop2BuyNumById(data.id);
        }
        else {
            buyNum = this.vo.getShopBuyNumById(data.id);
        }
        var curNum = data.limitNum - buyNum;
        var limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('acCrossserverPowerCheerScoreShopLimit', [String(curNum), String(TextFieldConst.COLOR_WARN_GREEN4)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN4);
        limitTxt.x = this.width / 2 - limitTxt.width / 2;
        limitTxt.y = 193 - 25;
        this.addChild(limitTxt);
        if (data.limitType == 0) {
            limitTxt.visible = false;
        }
        var scoreIcon;
        if (data.isItem) {
            var needId = this.cfg.change.needNum.split("_")[1];
            scoreIcon = BaseBitmap.create("itemicon" + needId);
            scoreIcon.setScale(0.35);
        }
        else {
            scoreIcon = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_flagicon", this.code, "7"));
            scoreIcon.setScale(0.7);
        }
        this.addChild(scoreIcon);
        var costNum = ComponentManager.getTextField("" + data.cost, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChild(costNum);
        var costW = scoreIcon.width * scoreIcon.scaleX + costNum.width;
        scoreIcon.x = limitTxt.x + limitTxt.width / 2 - costW / 2;
        scoreIcon.y = 185;
        costNum.setPosition(scoreIcon.x + scoreIcon.width * scoreIcon.scaleX, 193);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "", this.buyHandler, this, null, null, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, wordsBg, [0, 20]);
        var cost = data.cost;
        btn.setText(LanguageManager.getlocal("acCrossserverPowerCheerScoreShopExchange"), false);
        this.addChild(btn);
        var have = data.isItem ? this.vo.getExchangeItemNum() : this.vo.getFlagScore();
        if (!this.vo.isStart || (data.limitNum > 0 && curNum <= 0) || have < cost) {
            btn.setGray(true);
        }
        if (data.isItem && !this.vo.checkIsInEndShowTime()) {
            btn.setGray(true);
        }
    };
    AcCrossAtkraceCheerViewScrollItem4.prototype.buyHandler = function (evt) {
        var vo = this.vo;
        if (!vo) {
            return;
        }
        if (!this.vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (!this.vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("croessServerPowerExchangeTimeTipTxt"));
            return;
        }
        // let view = this;
        if (this._data.limitType != 0 && this._data.limitNum > 0) {
            var num = 0;
            if (this._data.isItem) {
                num = this.vo.getShop2BuyNumById(this._data.id);
            }
            else {
                num = this.vo.getShopBuyNumById(this._data.id);
            }
            var curNum = this._data.limitNum - num;
            if (curNum <= 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("croessServerPowerExchangeNoTimes"));
                return;
            }
        }
        var cost = this._data.cost;
        var have = this._data.isItem ? this.vo.getExchangeItemNum() : this.vo.getFlagScore();
        if (have < cost) {
            if (this._data.isItem) {
                App.CommonUtil.showTip(LanguageManager.getlocal("croessServerAtkraceExchangeNoEnough"));
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerFlagNotEnough", this.code)));
            }
            return;
        }
        if (this._data.isItem) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_SHOP2EXCHANGE, {
                activeId: this.vo.aidAndCode,
                rkey: this._data.id,
                num: 1
            });
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ATKRACEG_SHOPBUY, {
                activeId: this.vo.aidAndCode,
                rkey: this._data.id,
                num: 1
            });
        }
    };
    AcCrossAtkraceCheerViewScrollItem4.prototype.getSpaceX = function () {
        return 0;
    };
    AcCrossAtkraceCheerViewScrollItem4.prototype.getSpaceY = function () {
        return 10;
    };
    AcCrossAtkraceCheerViewScrollItem4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossAtkraceCheerViewScrollItem4;
}(ScrollListItem));
//# sourceMappingURL=AcCrossAtkraceCheerViewScrollItem4.js.map