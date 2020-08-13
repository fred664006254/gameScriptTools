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
/**
 * 红颜省亲系统api
 * author shaoliang
 * date 2019/2/20
 * @class WifebanishVoApi
 */
var WifebanishVoApi = (function (_super) {
    __extends(WifebanishVoApi, _super);
    function WifebanishVoApi() {
        return _super.call(this) || this;
    }
    WifebanishVoApi.prototype.getPosNum = function () {
        return this.wifebanishVo.pos_num;
    };
    WifebanishVoApi.prototype.getTotalPosNum = function () {
        var num = this.wifebanishVo.pos_num;
        var list = Api.acVoApi.getActivityVoListByAid(AcConst.AID_BATTLEPASS);
        list.sort(function (a, b) {
            return a.et - b.et;
        });
        for (var i in list) {
            var vo = list[i];
            if (vo && vo.isInActivity() && vo.getWifeBanPos()) {
                num += vo.getWifeBanPos();
            }
        }
        return num;
    };
    WifebanishVoApi.prototype.getBanishNum = function () {
        return Object.keys(this.wifebanishVo.wifeBanishInfoVo).length;
    };
    WifebanishVoApi.prototype.getBanishInfoVo = function (key) {
        return this.wifebanishVo.wifeBanishInfoVo[String(key)];
    };
    WifebanishVoApi.prototype.getBanishInfoVoByWife = function (wifeId) {
        wifeId = String(wifeId);
        for (var k in this.wifebanishVo.wifeBanishInfoVo) {
            if (this.wifebanishVo.wifeBanishInfoVo[k].wifeId == wifeId) {
                return this.wifebanishVo.wifeBanishInfoVo[k];
            }
        }
        return null;
    };
    WifebanishVoApi.prototype.getIsWifeBanishing = function (wifeId) {
        for (var k in this.wifebanishVo.wifeBanishInfoVo) {
            if (this.wifebanishVo.wifeBanishInfoVo[k].wifeId == wifeId && this.wifebanishVo.wifeBanishInfoVo[k].et > GameData.serverTime) {
                return 1;
            }
        }
        return 0;
    };
    WifebanishVoApi.prototype.getWifeHead = function (wid) {
        var container = new BaseDisplayObjectContainer();
        var headbg = BaseBitmap.create("banish_wifebg");
        container.addChild(headbg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, headbg.width, headbg.height - 5);
        var wifecfg = Config.WifeCfg.getWifeCfgById(wid);
        var wifePic = wifecfg.icon; //"wife_half_"+wid;
        if (Api.wifeSkinVoApi.isHaveSkin(wid)) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wid);
            if (wifeSkinVo && wifeSkinVo.equip != "") {
                var skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
                wifePic = skinCfg.icon;
            }
        }
        var wifeHead = BaseLoadBitmap.create(wifePic, rect);
        container.addChild(wifeHead);
        var mask = BaseBitmap.create("banish_wifemask");
        mask.setPosition(7, 6);
        container.addChild(mask);
        wifeHead.mask = mask;
        return container;
    };
    WifebanishVoApi.prototype.isShowNpc = function () {
        if (Api.switchVoApi.checkOpenBanish() && Api.wifeVoApi.getWifeNum() > Config.BanishCfg.getNumNeed()) {
            return true;
        }
        return false;
    };
    WifebanishVoApi.prototype.checkNpcMessage = function () {
        if (this.isShowNpc()) {
            for (var k in this.wifebanishVo.wifeBanishInfoVo) {
                if (this.wifebanishVo.wifeBanishInfoVo[k].et < GameData.serverTime) {
                    return true;
                }
            }
        }
        return false;
    };
    return WifebanishVoApi;
}(BaseVoApi));
__reflect(WifebanishVoApi.prototype, "WifebanishVoApi");
//# sourceMappingURL=WifebanishVoApi.js.map