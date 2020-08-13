/**
 * 称帝api
 * author shaoliang
 * date 2018/04/08
 * @class PrestigeVoApi
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
var PrestigeVoApi = (function (_super) {
    __extends(PrestigeVoApi, _super);
    function PrestigeVoApi() {
        return _super.call(this) || this;
    }
    PrestigeVoApi.prototype.getPem = function () {
        return this.prestigeVo.pem;
    };
    PrestigeVoApi.prototype.getInfo = function () {
        return this.prestigeVo.info;
    };
    PrestigeVoApi.prototype.getLog = function () {
        return this.prestigeVo.log;
    };
    Object.defineProperty(PrestigeVoApi.prototype, "isShowRedDot", {
        /**
         * 检测是否显示红点，true：显示
         */
        get: function () {
            // return true;
            if (this.prestigeVo.info) {
                var infoTab = this.prestigeVo.info;
                if (Number(infoTab.pid) < 4 && Number(infoTab.v) >= Config.PrestigeCfg.getPrestigeCfgById(Number(infoTab.pid)).prestige) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return PrestigeVoApi;
}(BaseVoApi));
__reflect(PrestigeVoApi.prototype, "PrestigeVoApi");
