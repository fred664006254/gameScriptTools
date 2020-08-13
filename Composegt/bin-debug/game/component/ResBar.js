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
var ResBar = (function (_super) {
    __extends(ResBar, _super);
    function ResBar() {
        var _this = _super.call(this) || this;
        _this._isPlaying = false;
        _this._isShowAni = false;
        _this._levyRate = 0;
        return _this;
    }
    ResBar.prototype.init = function (type, isAutoRefresh, width, color) {
        if (typeof (type) != "number") {
            type = ItemEnums[type];
        }
        this._type = type;
        this._bg = BaseBitmap.create("public_hb_bg03");
        this._bg.x = 10;
        this.addChild(this._bg);
        var resIcon = BaseBitmap.create("public_icon" + this._type);
        resIcon.y = -10;
        this.addChild(resIcon);
        this._numTxt = ComponentManager.getTextField(String(this.getResNum()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._numTxt.setPosition(55, this._bg.y + (this._bg.height - this._numTxt.height) / 2 + 2);
        if (this._type == 2) {
            var str = Api.playerVoApi.getPlayerGoldStr();
            this._numTxt.text = str;
        }
        if (this._type == 1) {
            var str = Api.playerVoApi.getPlayerGemStr();
            this._numTxt.text = str;
        }
        this.addChild(this._numTxt);
        if (width) {
            this._bg.width = width;
        }
        if (isAutoRefresh) {
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS, this.refresh, this);
            App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.refresh, this);
        }
    };
    ResBar.prototype.getResNum = function () {
        return Api.playerVoApi.getValueByResType(this._type);
    };
    ResBar.prototype.refresh = function () {
        this.setResNum(this.getResNum());
    };
    ResBar.prototype.setResNum = function (resNum) {
        var _this = this;
        if (this._numTxt && !this._isPlaying) {
            if (this._numTxt.text != String(resNum)) {
                this._numTxt.text = String(resNum);
                if (this._isShowAni) {
                    this._isPlaying = true;
                    this._numTxt.anchorOffsetX = this._numTxt.width / 2;
                    this._numTxt.anchorOffsetY = this._numTxt.height / 2;
                    this._numTxt.setPosition(55 + this._numTxt.width / 2, this._bg.y + (this._bg.height - this._numTxt.height) / 2 + 2 + this._numTxt.height / 2);
                    egret.Tween.get(this._numTxt)
                        .to({ scaleX: 1.1, scaleY: 1.1 }, 200)
                        .to({ scaleX: 1, scaleY: 1 }, 200)
                        .call(function () {
                        _this._isPlaying = false;
                        egret.Tween.removeTweens(_this._numTxt);
                    }, this);
                }
            }
        }
    };
    Object.defineProperty(ResBar.prototype, "levyRate", {
        set: function (levyRate) {
            if (levyRate > this._levyRate) {
                var addRateStr = LanguageManager.getlocal("levy_addnum", ["+", App.StringUtil.changeIntToText3(levyRate - this._levyRate)]);
                this.setRateAddEffect(addRateStr);
            }
            this._levyRate = levyRate;
        },
        enumerable: true,
        configurable: true
    });
    ResBar.prototype.setRateAddEffect = function (addRateStr) {
        var container = new BaseDisplayObjectContainer();
        // this.addChild(container);
        LayerManager.msgLayer.addChild(container);
        var pos = this.localToGlobal(0, 0);
        var bgPic = "public_itemtipbg";
        var numBg = BaseBitmap.create(bgPic);
        container.addChild(numBg);
        var iconBt = BaseBitmap.create("public_icon" + this._type);
        iconBt.setScale(0.7);
        iconBt.x = -10;
        container.addChild(iconBt);
        var msgTF = ComponentManager.getBitmapText(addRateStr, TextFieldConst.FONTNAME_ITEMTIP);
        msgTF.setScale(0.7);
        msgTF.x = iconBt.width * iconBt.scaleX;
        msgTF.y = numBg.y + numBg.height / 2 - msgTF.height * msgTF.scaleY / 2;
        numBg.width = msgTF.width + 50;
        container.addChild(msgTF);
        container.x = this.width / 2 - container.width / 2 + 10 + pos.x;
        container.y = 60 + pos.y;
        egret.Tween.get(container).to({ y: 20 }, 1000).call(function () {
            container.dispose();
            container = null;
        }, this);
    };
    ResBar.prototype.changeResBgY = function (offsetY) {
        this._bg.y += offsetY;
        this._numTxt.y += offsetY;
    };
    Object.defineProperty(ResBar.prototype, "isShowAni", {
        set: function (isShowAni) {
            if (this._isShowAni != isShowAni) {
                this._isShowAni = isShowAni;
            }
        },
        enumerable: true,
        configurable: true
    });
    ResBar.prototype.dispose = function () {
        this._bg = null;
        this._numTxt = null;
        this._type = null;
        this._isPlaying = false;
        this._isShowAni = false;
        this._levyRate = 0;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.refresh, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS, this.refresh, this);
        _super.prototype.dispose.call(this);
    };
    return ResBar;
}(BaseDisplayObjectContainer));
__reflect(ResBar.prototype, "ResBar");
