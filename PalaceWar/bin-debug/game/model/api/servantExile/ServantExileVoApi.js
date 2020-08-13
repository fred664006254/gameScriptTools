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
 * 门客出海系统api
 * author 张朝阳
 * date 2019/2/22
 * @class ServantExileVoApi
 */
var ServantExileVoApi = (function (_super) {
    __extends(ServantExileVoApi, _super);
    function ServantExileVoApi() {
        var _this = _super.call(this) || this;
        /**
         * "3":{
                "servantId":"1007",
                "st":1595815367,
                "freeEndTime":1595901767,
                "et":1604455367,
                "buffSid":"1001"
            }
        */
        _this.info = null;
        /**席位 */
        _this.pos_num = 0;
        return _this;
    }
    ServantExileVoApi.prototype.formatData = function (data) {
        this.info = data.info;
        this.pos_num = data.pos_num;
    };
    /**获得席位的个数 */
    ServantExileVoApi.prototype.getSeatNumber = function () {
        return this.pos_num;
    };
    ServantExileVoApi.prototype.getSeatNumber2 = function () {
        return this.pos_num + this.getCardSeatNumber();
    };
    ServantExileVoApi.prototype.getCardSeatNumber = function () {
        var num = 0;
        for (var key in this.info) {
            if (this.info[key].lastet && this.info[key].lastet > GameData.serverTime) {
                num++;
            }
        }
        return num;
    };
    ServantExileVoApi.prototype.getCardSeatIndex = function (idx) {
        var num = this.getActNumber();
        for (var key in this.info) {
            if (this.info[key].lastet && this.info[key].lastet > GameData.serverTime) {
                num++;
                if (this.pos_num + num == idx) {
                    return Number(key);
                }
            }
        }
        return null;
    };
    ServantExileVoApi.prototype.getTotalSeatNumber = function () {
        var num = this.pos_num;
        var list = Api.acVoApi.getActivityVoListByAid(AcConst.AID_BATTLEPASS);
        list.sort(function (a, b) {
            return a.et - b.et;
        });
        for (var i in list) {
            var vo = list[i];
            if (vo && vo.isInActivity() && vo.getServantBanPos()) {
                num += vo.getServantBanPos();
            }
        }
        for (var key in this.info) {
            if (this.info[key].lastet && this.info[key].lastet > GameData.serverTime) {
                num++;
            }
        }
        return num;
    };
    ServantExileVoApi.prototype.getActNumber = function () {
        var num = 0;
        var list = Api.acVoApi.getActivityVoListByAid(AcConst.AID_BATTLEPASS);
        list.sort(function (a, b) {
            return a.et - b.et;
        });
        for (var i in list) {
            var vo = list[i];
            if (vo && vo.isInActivity() && vo.getServantBanPos()) {
                num += vo.getServantBanPos();
            }
        }
        return num;
    };
    /**正在使用的席位数量 */
    ServantExileVoApi.prototype.getUseSeatNumber = function () {
        var num = 0;
        for (var key in this.info) {
            if (this.info[key] && this.info[key].servantId) {
                num++;
            }
        }
        return num;
    };
    /**剩余的席位数量 */
    ServantExileVoApi.prototype.getRemainSeatNumber = function () {
        // let remainNumber = Api.servantVoApi.getServantCount() - Config.ExileCfg.servantNeed - this.getUseSeatNumber();
        var remainNumber = Api.servantVoApi.getServantCount() - this.getUseSeatNumber();
        return remainNumber;
    };
    /**门客出海的信息
     * @param servantId
     *  */
    ServantExileVoApi.prototype.getServantExileInfoForServantId = function (servantId) {
        for (var key in this.info) {
            if (this.info[key].servantId == servantId) {
                return this.info[key];
            }
        }
        return null;
    };
    /**
     * 门客出海的信息
     * @param key
     */
    ServantExileVoApi.prototype.getServantExileInfoForKey = function (key) {
        if (this.info[key]) {
            return this.info[key];
        }
        return null;
    };
    ServantExileVoApi.prototype.hasServantExileForKey = function (key) {
        if (this.info[key] && this.info[key].servantId) {
            return true;
        }
        return false;
    };
    ServantExileVoApi.prototype.getServantBackTime = function (servantId) {
        var servantInfo = this.getServantExileInfoForServantId(servantId);
        var backTime = 0;
        if (servantInfo) {
            var et = 0;
            if (servantInfo.et) {
                et = servantInfo.et;
            }
            else {
                et = servantInfo.st + Config.ExileCfg.exileTime * 86400;
            }
            backTime = et - GameData.serverTime;
            if (backTime > 0) {
                return backTime;
            }
        }
        return null;
    };
    /**门客免费撤回的时间 */
    ServantExileVoApi.prototype.getServantFreeTimeBack = function (servantId) {
        var servantInfo = this.getServantExileInfoForServantId(servantId);
        if (servantInfo.freeEndTime) {
            if (servantInfo.freeEndTime > GameData.serverTime) {
                return servantInfo.freeEndTime - GameData.serverTime;
            }
        }
        return null;
    };
    ServantExileVoApi.prototype.isShowExileRedDot = function () {
        for (var key in this.info) {
            var oneinfo = this.info[key];
            if (oneinfo.servantId) {
                var servantInfoVo = Api.servantVoApi.getServantObj(oneinfo.servantId);
                if (servantInfoVo && servantInfoVo.banishSt == null) {
                    return true;
                }
            }
        }
        return false;
    };
    ServantExileVoApi.prototype.isShowNpc = function () {
        if (Api.switchVoApi.checkOpenExile() && Config.ExileCfg.numNeed < Api.servantVoApi.getServantCount()) {
            return true;
        }
        return false;
    };
    ServantExileVoApi.prototype.getIsBuffed = function (servantId) {
        for (var key in this.info) {
            if (this.info[key].buffSid == servantId) {
                return true;
            }
        }
        return false;
    };
    ServantExileVoApi.prototype.getIsBuffedBySeat = function (seat) {
        var theinfo = this.info[String(seat)];
        if (theinfo && theinfo.buffSid) {
            return true;
        }
        return false;
    };
    ServantExileVoApi.prototype.getExileBuffRed = function () {
        if (!Api.switchVoApi.checkOpenExileBuff()) {
            return false;
        }
        for (var key in this.info) {
            if (this.info[key] && this.info[key].servantId && this.getIsBuffedBySeat(key) == false) {
                return true;
            }
        }
        return false;
    };
    ServantExileVoApi.prototype.dispose = function () {
        this.info = null;
        this.pos_num = 0;
        _super.prototype.dispose.call(this);
    };
    return ServantExileVoApi;
}(BaseVoApi));
__reflect(ServantExileVoApi.prototype, "ServantExileVoApi");
//# sourceMappingURL=ServantExileVoApi.js.map