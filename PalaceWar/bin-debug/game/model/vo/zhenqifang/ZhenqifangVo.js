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
var ZhenqifangVo = (function (_super) {
    __extends(ZhenqifangVo, _super);
    function ZhenqifangVo() {
        var _this = _super.call(this) || this;
        _this.freefresh = 0;
        _this.freeitask = 0;
        _this.friend = null;
        _this.ftask = [];
        _this.info = null;
        _this.itask = [];
        _this.level = 0;
        _this.shop = null;
        _this.exp = 0;
        _this._oldlv = 0;
        return _this;
    }
    ZhenqifangVo.prototype.initData = function (data) {
        if (data) {
            if (!this._oldlv) {
                this._oldlv = data.level;
            }
            for (var i in data) {
                this[i] = data[i];
            }
        }
        if (this.level > this._oldlv || (GameData.serverTime <= (App.DateUtil.getWeeTs(GameData.serverTime) + 3) && App.DateUtil.getWeeTs(GameData.serverTime) <= GameData.serverTime)) {
            Api.zhenqifangVoApi.freshlist = true;
            Api.zhenqifangVoApi.freshfriendlist = true;
        }
        this._oldlv = this.level;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_DATAREFRESH);
    };
    ZhenqifangVo.prototype.dispose = function () {
        this.freefresh = 0;
        this.freeitask = 0;
        this.friend = null;
        this.ftask = null;
        this.info = null;
        this.itask = null;
        this.level = 0;
        this.shop = null;
        this.exp = 0;
        this._oldlv = 0;
    };
    return ZhenqifangVo;
}(BaseVo));
__reflect(ZhenqifangVo.prototype, "ZhenqifangVo");
//# sourceMappingURL=ZhenqifangVo.js.map