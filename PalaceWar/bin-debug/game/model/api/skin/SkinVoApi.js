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
 * 皮肤vo
 * author yanyuling
 * date 2018/08/13
 * @class SkinVo
 */
var SkinVoApi = (function (_super) {
    __extends(SkinVoApi, _super);
    function SkinVoApi() {
        return _super.call(this) || this;
    }
    SkinVoApi.prototype.checkServantExchange = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenExchangeSkin()) {
            if (Api.switchVoApi.checkOpenServantSkin()) {
                var list = Config.ServantskinCfg.getServantSkinList();
                for (var index = 0; index < list.length; index++) {
                    var tmp = list[index];
                    var id = tmp.id;
                    if (typeof tmp.displayTime != "undefined" && this.getShowTime() >= tmp.displayTime) {
                        if (Api.servantVoApi.getServantObj(tmp.servantId)) {
                            var exchange = tmp.exchangeItem;
                            var itemvo = GameData.formatRewardItem(exchange);
                            var needNum = itemvo[0].num;
                            var have = Api.itemVoApi.getItemNumInfoVoById(itemvo[0].id);
                            if (tmp.canExchangeItem() && have >= needNum) {
                                flag = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return flag;
    };
    SkinVoApi.prototype.checkWifeExchange = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenExchangeSkin()) {
            if (!Api.switchVoApi.checkCloseWifeskin()) {
                var list = Config.WifeskinCfg.getWifeCfgList();
                for (var index = 0; index < list.length; index++) {
                    var tmp = list[index];
                    var id = tmp.id;
                    if (typeof tmp.displayTime != "undefined" && this.getShowTime() >= tmp.displayTime) {
                        if (Api.wifeVoApi.getWifeInfoVoById(tmp.wifeId) && !Api.wifeSkinVoApi.isOwnSkinOfSkinId(id)) {
                            var exchange = tmp.claim;
                            var itemvo = GameData.formatRewardItem(exchange);
                            var needNum = itemvo[0].num;
                            var have = Api.itemVoApi.getItemNumInfoVoById(itemvo[0].id);
                            if (have >= needNum) {
                                flag = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return flag;
    };
    SkinVoApi.prototype.checkNpcMessage = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenExchangeSkin()) {
            flag = this.checkWifeExchange(); //this.checkServantExchange() ||
        }
        return flag;
    };
    SkinVoApi.prototype.checkNpcMessage2 = function () {
        var flag = false;
        if (Api.switchVoApi.checkOpenExchangeSkin()) {
            flag = this.checkServantExchange() || this.checkWifeExchange();
        }
        return flag;
    };
    SkinVoApi.prototype.isShowNpc = function () {
        if (Api.switchVoApi.openCrossChat())
            return true;
        else {
            return false;
        }
    };
    SkinVoApi.prototype.getServantSkinFirstInfo = function (skinId) {
        if (!this.skinVo || !this.skinVo.sinfo || !this.skinVo.sinfo[skinId]) {
            return null;
        }
        return this.skinVo.sinfo[skinId];
    };
    SkinVoApi.prototype.getWifeSkinFirstInfo = function (skinId) {
        if (!this.skinVo || !this.skinVo.winfo || !this.skinVo.winfo[skinId]) {
            return null;
        }
        return this.skinVo.winfo[skinId];
    };
    //开服时间至今多少天
    SkinVoApi.prototype.getShowTime = function () {
        return Api.otherInfoVoApi.getServerOpenDay();
    };
    SkinVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SkinVoApi;
}(BaseVoApi));
__reflect(SkinVoApi.prototype, "SkinVoApi");
//# sourceMappingURL=SkinVoApi.js.map