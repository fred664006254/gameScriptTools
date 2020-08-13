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
var AcCrossServerServantVoApi = (function (_super) {
    __extends(AcCrossServerServantVoApi, _super);
    function AcCrossServerServantVoApi() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossServerServantVoApi.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_SERVANTPK);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerServantVoApi.prototype, "cfg", {
        get: function () {
            return this.vo.cfg;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerServantVoApi.prototype.initData = function (data) {
        this.vo.initData(data);
    };
    /*
    *1开始时间  2结束时间前12h 3结束时间前7h 4结束时间前2h 5结束时间前30min 6结束时间前10min 7结束时间前3min 8展示期
    */
    AcCrossServerServantVoApi.prototype.getCurpeirod = function () {
        return this.vo.getCurpeirod();
    };
    AcCrossServerServantVoApi.prototype.getCountTime = function () {
        var st = this.vo.st;
        var et = this.vo.et - 86400;
        var period = this.getCurpeirod();
        if (period < 8) {
            return et - GameData.serverTime;
        }
    };
    /*
    *获取对战的两个门客的支援人数
    */
    AcCrossServerServantVoApi.prototype.getCheerNum = function (area) {
        if (this.vo.tinfo[this.getVsServant(area)]) {
            return this.vo.tinfo[this.getVsServant(area)][1];
        }
        return 0;
    };
    /*
    *获取对战的两个门客的支援人数
    */
    AcCrossServerServantVoApi.prototype.getCheerPlayer = function (area) {
        var arr = [];
        // let rid = Math.floor(Math.random() * 20);
        for (var i in this.vo["sinfo" + area]) {
            var unit = this.vo["sinfo" + area][i];
            arr.push({
                uid: unit.uid,
                name: unit.name,
                zid: unit.zid
            });
        }
        return arr;
    };
    /*
*获取对战的两个门客
*/
    AcCrossServerServantVoApi.prototype.getVsServant = function (area) {
        //return area == 1 ? '1001' : '1002';
        return this.cfg["servantId" + area];
    };
    /*
    *获取对战的两个门客对应新皮肤
    */
    AcCrossServerServantVoApi.prototype.getVsServantSkin = function (area) {
        //return area == 1 ? '1001' : '1002';
        var skin = this.cfg["servantSkin" + area];
        return skin.split('_')[1]; //`skin_full_${skin.split('_')[1]}`;
    };
    /*
    *获取支持的门客
    */
    AcCrossServerServantVoApi.prototype.getCheerForArea = function () {
        for (var i = 1; i < 3; ++i) {
            if (Number(this.vo.sid) == Number(this.cfg["servantId" + i])) {
                return i;
            }
        }
        return 0;
    };
    /*
    *获取支持的门客
    */
    AcCrossServerServantVoApi.prototype.getCheerServantId = function () {
        return Number(this.vo.sid);
    };
    /*
    *获取赢的门客
    */
    AcCrossServerServantVoApi.prototype.getWinServant = function () {
        if (this.getCurpeirod() == 8) {
            for (var i = 1; i < 3; ++i) {
                if (Number(this.cfg["servantId" + i]) == Number(this.vo.maxsid)) {
                    return i;
                }
            }
        }
        else {
            return 0;
        }
    };
    /*
    *获取赢的门客
    */
    AcCrossServerServantVoApi.prototype.getWinServantId = function () {
        if (this.getCurpeirod() == 8) {
            return Number(this.vo.maxsid);
        }
        else {
            return 0;
        }
    };
    Object.defineProperty(AcCrossServerServantVoApi.prototype, "acTimeAndHour", {
        /*
        *获取活动日期
        */
        get: function () {
            var st = this.vo.st;
            var et = this.vo.et - 86400;
            return App.DateUtil.getOpenLocalTime(st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    /*
    *获取活动参与区服
    */
    AcCrossServerServantVoApi.prototype.getCrossServer = function () {
        return this.vo.pkzids;
    };
    /*
    *获取属性
    */
    AcCrossServerServantVoApi.prototype.getTotalNum = function (area, type) {
        var total = this.vo.tinfo[this.getVsServant(area)] ? this.vo.tinfo[this.getVsServant(area)][0] : 0;
        var str = Math.floor(total / 10000).toString();
        // if(PlatformManager.checkIsEnLang())
        // {
        // 	str = Math.floor(total / 1000).toString();
        // }
        var arr = [];
        for (var i = 1; i <= 6; ++i) {
            if (str[str.length - i]) {
                arr.push(str[str.length - i]);
            }
            else {
                arr.push('0');
            }
        }
        return arr[type - 1];
    };
    /*
    *获取活动参与区服
    */
    AcCrossServerServantVoApi.prototype.getIsWinner = function () {
        return Number(this.vo.maxsid) == this.getCheerServantId();
    };
    /*
    *是否领取过奖励
    */
    AcCrossServerServantVoApi.prototype.getIsLqPreward = function () {
        return this.vo.preward == 1;
    };
    /*
    *是否领取过奖励
    */
    AcCrossServerServantVoApi.prototype.getIsLqZreward = function () {
        return this.vo.zreward == 1;
    };
    AcCrossServerServantVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerServantVoApi;
}(BaseVoApi));
__reflect(AcCrossServerServantVoApi.prototype, "AcCrossServerServantVoApi");
//# sourceMappingURL=AcCrossServerServantVoApi.js.map