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
var AcActivityExchangeItem = (function (_super) {
    __extends(AcActivityExchangeItem, _super);
    function AcActivityExchangeItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcActivityExchangeItem.prototype, "Vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code.toString());
        },
        enumerable: true,
        configurable: true
    });
    AcActivityExchangeItem.prototype.initItem = function (index, data, param) {
        this.initData(data);
        this.width = 602;
        this.height = 142 + this.getSpaceY();
        var _bg = BaseLoadBitmap.create("public_popupscrollitembg");
        this.addChild(_bg);
        _bg.width = 602;
        _bg.height = 142;
        for (var i = 0; i < this._costs.length; i++) {
            var _icon_ = GameData.getRewardItemIcons(this._costs[i], true)[0];
            this.addChild(_icon_);
            _icon_.x = 116 * i + 8;
            _icon_.y = 28;
            _icon_.setScale(84 / _icon_.width);
            var _numLabel_ = ComponentManager.getTextField(this.getNumText(this._costs[i]), 16, 0x301e19);
            this.addChild(_numLabel_);
            _numLabel_.width = 100;
            _numLabel_.textAlign = TextFieldConst.ALIGH_CENTER;
            _numLabel_.x = 116 * i;
            _numLabel_.y = 116;
            if (i > 0) {
                var _plus = BaseLoadBitmap.create("acactivityexchange_plus");
                this.addChild(_plus);
                _plus.width = 32;
                _plus.height = 30;
                _plus.y = 55;
                _plus.x = _icon_.x - 32;
            }
        }
        var _rewIcon = GameData.getRewardItemIcons(this._reward, true)[0];
        this.addChild(_rewIcon);
        _rewIcon.x = 116 * this._costs.length + 8;
        _rewIcon.y = 28;
        _rewIcon.setScale(84 / _rewIcon.width);
        var _arrow = BaseLoadBitmap.create("acactivityexchange_arrow");
        this.addChild(_arrow);
        _arrow.width = 32;
        _arrow.height = 22;
        _arrow.y = 59;
        _arrow.x = _rewIcon.x - 32;
        // 领取按钮和限制次数
        this._getRewBtn = ComponentManager.getButton("btn2_small_yellow", "acActivityExchangeText1", this.Buy, this);
        this.addChild(this._getRewBtn);
        this._getRewBtn.setPosition(452, 56);
        // this._getRewBtn.setEnable(this.isCanBuy());
        this._getRewBtn.setGray(!this.isCanBuy());
        if (this._itemInfo.limit > 0) {
            var _tip_params = [this._limitNum > 0 ? "0x3e9b00" : "0xbb2800", this._limitNum.toString()];
            this._limitTip = ComponentManager.getTextField(LanguageManager.getlocal("acActivityExchangeText2", _tip_params), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0x301e19);
            this.addChild(this._limitTip);
            this._limitTip.width = 140;
            this._limitTip.textAlign = TextFieldConst.ALIGH_CENTER;
            this._limitTip.setPosition(452, 30);
        }
    };
    AcActivityExchangeItem.prototype.initData = function (data) {
        _a = [data.aid, data.code, data.itemCfg], this._aid = _a[0], this._code = _a[1], this._itemInfo = _a[2];
        this._costs = data.itemCfg.costItems.slice();
        this._reward = data.itemCfg.getReward;
        this._sortId = data.itemCfg.sortId;
        this._limitNum = this.Vo.getSurNumById(this._sortId);
        var _a;
    };
    AcActivityExchangeItem.prototype.getNumText = function (msg) {
        var _a = this.getHasNum(msg), _hasNum = _a[0], _needNum = _a[1], _hasNumStr = _a[2];
        var _color = _hasNum >= _needNum ? "0x3e9b00" : "0xbb2800";
        return "<font color=" + _color + ">" + _hasNum + "</font>/" + _needNum;
    };
    AcActivityExchangeItem.prototype.getHasNum = function (msg) {
        var _a = msg.split("_").map(function (v) { return parseInt(v); }), __type = _a[0], __id = _a[1], _needNum = _a[2];
        var _hasNum = 0;
        var _hasNumStr = "0";
        switch (__type) {
            case 1:
                _hasNum = Api.playerVoApi.getPlayerGem();
                _hasNumStr = Api.playerVoApi.getPlayerGemStr();
                break;
            case 2:
                _hasNum = Api.playerVoApi.getPlayerGold();
                _hasNumStr = Api.playerVoApi.getPlayerGoldStr();
                break;
            case 6:
                _hasNum = Api.itemVoApi.getItemNumInfoVoById(__id);
                _hasNumStr = _hasNum.toString();
                break;
            default:
                break;
        }
        return [_hasNum, _needNum, _hasNumStr];
    };
    AcActivityExchangeItem.prototype.Buy = function () {
        if (this.Vo.isEnd) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal("acActivityExchangeText5"),
                callback: function () {
                    ViewController.getInstance().hideView(ViewConst.COMMON.ACACTIVITYEXCHANGEVIEW);
                },
                handler: this
            });
            return;
        }
        if (this._itemInfo.limit > 0 && (!this._limitNum || this._limitNum <= 0)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acActivityExchangeText3"));
            return;
        }
        for (var i = 0; i < this._costs.length; i++) {
            var _a = this.getHasNum(this._costs[i]), _has = _a[0], _need = _a[1];
            if (_has < _need) {
                var _itemVo = GameData.formatRewardItem(this._costs[i])[0];
                App.CommonUtil.showTip(LanguageManager.getlocal("acActivityExchangeText4", [_itemVo.name]));
                return;
            }
        }
        this.Vo.buyPoint = this._getRewBtn.localToGlobal(this._getRewBtn.width - 40, 20);
        NetManager.request(NetRequestConst.REQUEST_ACEXCHANGE_EXCHANGE, {
            "activeId": this._aid + "-" + this._code,
            "rkey": this._sortId,
            "num": 1
        });
    };
    AcActivityExchangeItem.prototype.isCanBuy = function () {
        var rsl = true;
        if (this._itemInfo.limit > 0 && (!this._limitNum || this._limitNum <= 0)) {
            rsl = false;
        }
        else {
            for (var i = 0; i < this._costs.length; i++) {
                var _a = this.getHasNum(this._costs[i]), _has = _a[0], _need = _a[1];
                if (_has < _need) {
                    rsl = false;
                    break;
                }
            }
        }
        return rsl;
    };
    AcActivityExchangeItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcActivityExchangeItem.prototype.getSpaceY = function () {
        return 6;
    };
    Object.defineProperty(AcActivityExchangeItem.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    AcActivityExchangeItem.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._itemInfo = null;
        this._sortId = null;
        this._costs = null;
        this._reward = null;
        this._limitNum = null;
        this._limitTip = null;
        this._getRewBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcActivityExchangeItem;
}(ScrollListItem));
__reflect(AcActivityExchangeItem.prototype, "AcActivityExchangeItem");
//# sourceMappingURL=AcActivityExchangeItem.js.map