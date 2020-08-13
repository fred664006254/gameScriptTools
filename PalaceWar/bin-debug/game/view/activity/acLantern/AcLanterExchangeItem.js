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
var AcLanterExchangeItem = (function (_super) {
    __extends(AcLanterExchangeItem, _super);
    function AcLanterExchangeItem() {
        var _this = _super.call(this) || this;
        _this._cfg = null;
        _this._code = '';
        _this._claimText = null;
        _this._claimBtn = null;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    Object.defineProperty(AcLanterExchangeItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanterExchangeItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanterExchangeItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_ANNUALPRAY2020;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanterExchangeItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcLanterExchangeItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcLanterExchangeItem.prototype.init = function (data, itemparam, f, o) {
        var view = this;
        view._code = itemparam;
        view.width = 530;
        view.height = 135;
        this._cfg = data;
        var code = this.getUiCode();
        this._obj = o;
        this._callbackF = f;
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = view.width;
        wordsBg.height = view.height;
        this.addChild(wordsBg);
        this._claimBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.clickButton, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this._claimBtn, wordsBg, [18, 0]);
        this.addChild(this._claimBtn);
        this._claimText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._claimText, this._claimBtn, [0, -this._claimText.textHeight - 5]);
        this.addChild(this._claimText);
        this.resetBtn();
        var costItem = null;
        var getItem = null;
        if (data.costdeZi) {
            costItem = "1035_1_" + data.costdeZi + "_" + code;
        }
        if (data.costchuanZi) {
            if (costItem) {
                costItem += "|";
            }
            else {
                costItem = "";
            }
            costItem += "1035_2_" + data.costchuanZi + "_" + code;
        }
        if (data.costshiZi) {
            if (costItem) {
                costItem += "|";
            }
            else {
                costItem = "";
            }
            costItem += "1035_3_" + data.costshiZi + "_" + code;
        }
        if (data.costdaiZi) {
            if (costItem) {
                costItem += "|";
            }
            else {
                costItem = "";
            }
            costItem += "1035_4_" + data.costdaiZi + "_" + code;
        }
        if (data.item) {
            getItem = data.item;
        }
        var icons = GameData.getRewardItemIcons(costItem, true);
        var len = icons.length;
        var tpx = 7;
        switch (len) {
            case 1:
                tpx = 100;
                break;
            case 2:
                tpx = 55;
                break;
            case 3:
                tpx = 22;
                break;
        }
        for (var i = 0; i < len; i++) {
            var icon = icons[i];
            if (icon) {
                icon.setScale(0.65);
                icon.x = tpx + i * (70);
                icon.y = (view.height - icon.height * icon.scaleY) / 2;
                this.addChild(icon);
                // if(i < len - 1){
                //     let plus1:BaseBitmap = BaseBitmap.create(`dechuanchangeadd-${code}`);
                //     plus1.setPosition(icon.x+icon.width*icon.scaleX,icon.y+icon.height*icon.scaleY/2-plus1.height/2);
                //     this.addChild(plus1);
                // }
            }
        }
        var getIcon = GameData.getRewardItemIcons(getItem, true)[0];
        getIcon.setScale(0.65);
        // let iconbg = <BaseBitmap>getIcon.getChildByName(`iconBg`);
        // iconbg.setScale(1.48);
        // iconbg.setRes(`dechuanchangeiconbg-${this.getUiCode()}`);
        // iconbg.x = -8;
        // iconbg.y = -6;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, getIcon, wordsBg, [310, 0]);
        this.addChild(getIcon);
        var arrow = BaseBitmap.create("dechuanchangearrow-1");
        arrow.setPosition(getIcon.x - arrow.width + 3, getIcon.y + getIcon.height * getIcon.scaleY / 2 - arrow.height / 2);
        this.addChild(arrow);
    };
    Object.defineProperty(AcLanterExchangeItem.prototype, "sortId", {
        get: function () {
            var n = this._cfg.id;
            if (this._cfg.limit && this._cfg.limit <= this.vo.getBuyLimitnum(this._cfg.id)) {
                n += 10000;
            }
            return n;
        },
        enumerable: true,
        configurable: true
    });
    AcLanterExchangeItem.prototype.clickButton = function () {
        this.vo.lastpos = this._claimText.localToGlobal(this._claimText.width, 20);
        this._callbackF.apply(this._obj, [this._cfg.id]);
    };
    AcLanterExchangeItem.prototype.resetBtn = function () {
        var vo = this.vo;
        if (this._cfg.limit) {
            var claimNum = this._cfg.limit - vo.getBuyLimitnum(this._cfg.id);
            if (claimNum > 0) {
                this._claimText.text = LanguageManager.getlocal("acDuanWuClaimTimes", [String(claimNum)]);
                var need1 = 0, need2 = 0, need3 = 0, need4 = 0;
                if (this._cfg.costdeZi) {
                    need1 = this._cfg.costdeZi;
                }
                if (this._cfg.costchuanZi) {
                    need2 = this._cfg.costchuanZi;
                }
                if (this._cfg.costshiZi) {
                    need3 = this._cfg.costshiZi;
                }
                if (this._cfg.costdaiZi) {
                    need4 = this._cfg.costdaiZi;
                }
                if (vo.dayNumById(1) >= need1 && vo.dayNumById(2) >= need2 && vo.dayNumById(3) >= need3 && vo.dayNumById(4) >= need4) {
                    App.DisplayUtil.changeToNormal(this._claimBtn);
                }
                else {
                    App.DisplayUtil.changeToGray(this._claimBtn);
                }
            }
            else {
                this._claimText.text = LanguageManager.getlocal("acDuanWuClaimTimes2", [String(claimNum)]);
                this._claimBtn.setEnable(false);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._claimText, this._claimBtn, [0, -this._claimText.textHeight - 5]);
        }
        else {
            var need1 = 0, need2 = 0, need3 = 0, need4 = 0;
            if (this._cfg.costdeZi) {
                need1 = this._cfg.costdeZi;
            }
            if (this._cfg.costchuanZi) {
                need2 = this._cfg.costchuanZi;
            }
            if (this._cfg.costshiZi) {
                need3 = this._cfg.costshiZi;
            }
            if (this._cfg.costdaiZi) {
                need4 = this._cfg.costdaiZi;
            }
            if (vo.dayNumById(1) >= need1 && vo.dayNumById(2) >= need2 && vo.dayNumById(3) >= need3 && vo.dayNumById(4) >= need4) {
                App.DisplayUtil.changeToNormal(this._claimBtn);
            }
            else {
                App.DisplayUtil.changeToGray(this._claimBtn);
            }
        }
    };
    AcLanterExchangeItem.prototype.dispose = function () {
        this._cfg = null;
        this._code = null;
        this._claimText = null;
        this._claimBtn = null;
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AcLanterExchangeItem;
}(BaseDisplayObjectContainer));
__reflect(AcLanterExchangeItem.prototype, "AcLanterExchangeItem");
//# sourceMappingURL=AcLanterExchangeItem.js.map