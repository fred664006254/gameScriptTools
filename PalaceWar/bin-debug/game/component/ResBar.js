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
        return _super.call(this) || this;
    }
    ResBar.prototype.init = function (type, isAutoRefresh, width) {
        if (typeof (type) != "number") {
            type = ItemEnums[type];
        }
        this._type = type;
        this._bg = BaseBitmap.create("public_9_resbg");
        this.addChild(this._bg);
        var resIcon = BaseBitmap.create("public_icon" + this._type);
        this.addChild(resIcon);
        this._numTxt = ComponentManager.getTextField(String(this.getResNum()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._numTxt.setPosition(50, this._bg.y + (this._bg.height - this._numTxt.height) / 2);
        if (this._type == 3) {
            var str = Api.playerVoApi.getFoodStr();
            this._numTxt.text = str;
        }
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
            App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.refresh, this);
        }
    };
    ResBar.prototype.getResNum = function () {
        return Api.playerVoApi.getValueByResType(this._type);
    };
    ResBar.prototype.refresh = function () {
        if (this._numTxt) {
            this._numTxt.text = String(this.getResNum());
            if (this._type == 3) {
                var str = Api.playerVoApi.getFoodStr();
                this._numTxt.text = str;
            }
            if (this._type == 2) {
                var str = Api.playerVoApi.getPlayerGoldStr();
                this._numTxt.text = str;
            }
            if (this._type == 1) {
                var str = Api.playerVoApi.getPlayerGemStr();
                this._numTxt.text = str;
            }
        }
    };
    ResBar.prototype.setResNum = function (resNum) {
    };
    ResBar.prototype.dispose = function () {
        this._bg = null;
        this._numTxt = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.refresh, this);
        _super.prototype.dispose.call(this);
    };
    return ResBar;
}(BaseDisplayObjectContainer));
__reflect(ResBar.prototype, "ResBar");
//# sourceMappingURL=ResBar.js.map