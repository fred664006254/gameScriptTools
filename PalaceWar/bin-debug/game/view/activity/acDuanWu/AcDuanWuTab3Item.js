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
var AcDuanWuTab3Item = (function (_super) {
    __extends(AcDuanWuTab3Item, _super);
    function AcDuanWuTab3Item() {
        var _this = _super.call(this) || this;
        _this._cfg = null;
        _this._code = '';
        _this._claimText = null;
        _this._claimBtn = null;
        _this._callbackF = null;
        _this._obj = null;
        _this._uicode = '';
        return _this;
    }
    Object.defineProperty(AcDuanWuTab3Item.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuTab3Item.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuTab3Item.prototype, "aid", {
        get: function () {
            return AcConst.AID_DUANWU;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuTab3Item.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuTab3Item.prototype, "uicode", {
        get: function () {
            return this._uicode;
        },
        enumerable: true,
        configurable: true
    });
    AcDuanWuTab3Item.prototype.init = function (data, itemparam, f, o) {
        var view = this;
        view._code = itemparam[0];
        view._uicode = itemparam[1];
        view.width = 520;
        view.height = 144;
        this._cfg = data;
        this._obj = o;
        this._callbackF = f;
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = view.width;
        wordsBg.height = view.height;
        this.addChild(wordsBg);
        this._claimText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._claimText.setPosition(436, 28);
        this.addChild(this._claimText);
        this._claimBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.clickButton, this);
        this._claimBtn.setPosition(380, 54);
        this.addChild(this._claimBtn);
        this.resetBtn();
        var costItem = null;
        var getItem = null;
        if (data.costZongZi) {
            costItem = "1013_0_" + data.costZongZi + "_" + view.uicode;
        }
        if (data.costDaGao) {
            if (costItem) {
                costItem += "|";
            }
            else {
                costItem = "";
            }
            costItem += "1014_0_" + data.costDaGao + "_" + view.uicode;
        }
        if (data.costXiongHuang) {
            if (costItem) {
                costItem += "|";
            }
            else {
                costItem = "";
            }
            costItem += "1015_0_" + data.costXiongHuang + "_" + view.uicode;
        }
        if (data.item) {
            getItem = data.item;
        }
        else if (data.getDaGao) {
            getItem = "1014_0_" + data.getDaGao + "_" + view.uicode;
        }
        else if (data.getXiongHuang) {
            getItem = "1015_0_" + data.getXiongHuang + "_" + view.uicode;
        }
        var icons = GameData.getRewardItemIcons(costItem, true);
        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            icon.setScale(0.85);
            icon.setPosition(14 + i * 127, 30);
            this.addChild(icon);
        }
        var getIcon = GameData.getRewardItemIcons(getItem, true)[0];
        getIcon.setPosition(150 + (icons.length - 1) * 127, 30);
        getIcon.setScale(0.85);
        this.addChild(getIcon);
        var arrow = BaseBitmap.create("acduanwu_arrow");
        arrow.setPosition(getIcon.x - arrow.width + 3, view.height / 2 - arrow.height / 2);
        this.addChild(arrow);
        if (icons.length > 1) {
            var plus1 = BaseBitmap.create("acduanwu_plus");
            plus1.setPosition(103, view.height / 2 - plus1.height / 2);
            this.addChild(plus1);
        }
    };
    Object.defineProperty(AcDuanWuTab3Item.prototype, "sortId", {
        get: function () {
            var n = this._cfg.id;
            if (this._cfg.limit && this._cfg.limit <= this.vo.getClaim(this._cfg.id)) {
                n += 10000;
            }
            return n;
        },
        enumerable: true,
        configurable: true
    });
    AcDuanWuTab3Item.prototype.clickButton = function () {
        this.vo.lastpos = this._claimText.localToGlobal(this._claimText.width, 20);
        this._callbackF.apply(this._obj, [this._cfg.id]);
    };
    AcDuanWuTab3Item.prototype.resetBtn = function () {
        var vo = this.vo;
        if (this._cfg.limit) {
            var claimNum = this._cfg.limit - vo.getClaim(this._cfg.id);
            if (claimNum > 0) {
                this._claimText.text = LanguageManager.getlocal("acDuanWuClaimTimes", [String(claimNum)]);
                var need1 = 0, need2 = 0, need3 = 0;
                if (this._cfg.costZongZi) {
                    need1 = this._cfg.costZongZi;
                }
                if (this._cfg.costDaGao) {
                    need2 = this._cfg.costDaGao;
                }
                if (this._cfg.costXiongHuang) {
                    need3 = this._cfg.costXiongHuang;
                }
                if (vo.getActivityItem(1) >= need1 && vo.getActivityItem(2) >= need2 && vo.getActivityItem(3) >= need3) {
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
            this._claimText.x = 436 - this._claimText.width / 2;
        }
        else {
            var need1 = 0, need2 = 0, need3 = 0;
            if (this._cfg.costZongZi) {
                need1 = this._cfg.costZongZi;
            }
            if (this._cfg.costDaGao) {
                need2 = this._cfg.costDaGao;
            }
            if (this._cfg.costXiongHuang) {
                need3 = this._cfg.costXiongHuang;
            }
            if (vo.getActivityItem(1) >= need1 && vo.getActivityItem(2) >= need2 && vo.getActivityItem(3) >= need3) {
                App.DisplayUtil.changeToNormal(this._claimBtn);
            }
            else {
                App.DisplayUtil.changeToGray(this._claimBtn);
            }
        }
    };
    AcDuanWuTab3Item.prototype.dispose = function () {
        this._cfg = null;
        this._code = null;
        this._claimText = null;
        this._claimBtn = null;
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AcDuanWuTab3Item;
}(BaseDisplayObjectContainer));
__reflect(AcDuanWuTab3Item.prototype, "AcDuanWuTab3Item");
//# sourceMappingURL=AcDuanWuTab3Item.js.map