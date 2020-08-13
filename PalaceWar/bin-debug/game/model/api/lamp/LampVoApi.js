/**
 * 跑马灯api
 * author shaoliang
 * date 2017/10/28
 * @class LampVoApi
 */
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
var LampVoApi = (function (_super) {
    __extends(LampVoApi, _super);
    function LampVoApi() {
        var _this = _super.call(this) || this;
        _this._waitingShow = [];
        return _this;
    }
    // [{"msg":"","need":"103","st":1509164487,"uid":1000505,"dtype":"1","name":"甘守"},
    // {"msg":"","need":"1007","st":1509164487,"uid":1000505,"dtype":"2","name":"甘守"},
    // {"msg":"","need":"6666666","st":1509164487,"uid":1000505,"dtype":"3","name":"甘守"},
    // {"msg":"","need":"5","st":1509164487,"uid":1000505,"dtype":"4","name":"甘守"},
    // {"msg":"","need":"5","st":1509164487,"uid":1000505,"dtype":"5","name":"甘守"},
    // {"msg":"下午发布goon广告11111","uid":"","st":1509170545,"need":"","dtype":"100","name":""}];
    LampVoApi.prototype.insertLampInfo = function (t) {
        for (var k in t) {
            this._waitingShow.push(t[k]);
            if (t[k].dtype == 6) {
                var godName = String(t[k].info[0]);
                App.CommonUtil.showGodLoginFlaunt(godName.substring(5, godName.length));
            }
        }
        if (this._waitingShow.length > 0) {
            this._waitingShow.sort(function (a, b) {
                // let valueA = Config.LampinfoCfg.getLampInfoItemCfg(a.dtype);
                // let valueB = Config.LampinfoCfg.getLampInfoItemCfg(a.dtype);;
                return a.sortId - b.sortId;
            });
        }
    };
    LampVoApi.prototype.formatData = function (data) {
        this.insertLampInfo(data);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SHOW_LAMP);
    };
    LampVoApi.prototype.getShowLampInfo = function () {
        if (this._waitingShow.length > 0) {
            var a = this._waitingShow.shift();
            return a;
        }
        else {
            return null;
        }
    };
    LampVoApi.prototype.dispose = function () {
        this._waitingShow.length = 0;
        _super.prototype.dispose.call(this);
    };
    return LampVoApi;
}(BaseVoApi));
__reflect(LampVoApi.prototype, "LampVoApi");
//# sourceMappingURL=LampVoApi.js.map