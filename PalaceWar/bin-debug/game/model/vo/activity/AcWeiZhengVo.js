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
var AcWeiZhengVo = (function (_super) {
    __extends(AcWeiZhengVo, _super);
    function AcWeiZhengVo() {
        var _this = _super.call(this) || this;
        _this.task = {};
        _this.binfo = {};
        _this.bqnum = 0;
        _this.diffday = 0;
        _this.lastidx = -1;
        _this.lastpos = null;
        return _this;
    }
    AcWeiZhengVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcWeiZhengVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.config.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcWeiZhengVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        //任务
        for (var i = 1; i < 4; ++i) {
            if (this.canDayRewardLq(i)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    AcWeiZhengVo.prototype.canDayRewardLq = function (day) {
        var flag = false;
        for (var j in this.config.task[day]) {
            var unit = this.config.task[day][j];
            if (this.canTaskLq(unit.questType, day)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    AcWeiZhengVo.prototype.getpublicRedhot2 = function () {
        var flag = false;
        var num = this.getChargeNum();
        for (var i in this.config.recharge) {
            var unit = this.config.recharge[i];
            var id = Number(i) + 1;
            if (num >= unit.needGem && !this.getChargeLq(id)) {
                flag = true;
                break;
            }
        }
        //充值
        return flag;
    };
    AcWeiZhengVo.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code + "";
                break;
        }
        return code;
    };
    //可兑换
    AcWeiZhengVo.prototype.getpublicRedhot3 = function () {
        var flag = false;
        var sid = this.config.getSkinId(this.getUiCode());
        var scfg = Config.ServantskinCfg.getServantSkinItemById(sid);
        var haveskin = !scfg.canExchangeItem(); //this.haveSkin(this.getUiCode());
        var item = GameData.formatRewardItem(this.config.claim[haveskin ? 1 : 0].costShu)[0];
        var num = Api.itemVoApi.getItemNumInfoVoById(item.id);
        if (!haveskin && num >= item.num) {
            flag = true;
        }
        return flag;
    };
    Object.defineProperty(AcWeiZhengVo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i < 4; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcWeiZhengVo.prototype.isInActy = function () {
        var flag = false;
        if (GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400) {
            flag = true;
        }
        return flag;
    };
    AcWeiZhengVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActy()) {
            num = this.et - this.config.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    //任务完成进度
    AcWeiZhengVo.prototype.getTaskValue = function (taskType, day) {
        var num = 0;
        if (this.task[day] && this.task[day][taskType] && this.task[day][taskType].v) {
            num = this.task[day][taskType].v;
        }
        return num;
    };
    //任务完成进度
    AcWeiZhengVo.prototype.getTaskLq = function (taskType, day) {
        var flag = false;
        if (this.task[day] && this.task[day][taskType] && this.task[day][taskType].flag) {
            flag = this.task[day][taskType].flag == 2;
        }
        return flag;
    };
    //能否领取
    AcWeiZhengVo.prototype.canTaskLq = function (taskType, day) {
        var flag = false;
        if (this.task[day] && this.task[day][taskType] && this.task[day][taskType].flag) {
            flag = this.task[day][taskType].flag == 1;
        }
        return flag;
    };
    //充值进度
    AcWeiZhengVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.binfo && this.binfo.v) {
            num = this.binfo.v;
        }
        return num;
    };
    AcWeiZhengVo.prototype.getChargeLq = function (id) {
        var flag = false;
        if (this.binfo && this.binfo.flags) {
            flag = this.binfo.flags[id] == 1;
        }
        return flag;
    };
    AcWeiZhengVo.prototype.getBqNum = function () {
        return this.bqnum;
    };
    AcWeiZhengVo.prototype.getBqCost = function () {
        var bqnum = Math.min(this.bqnum, this.config.missCost.length - 1);
        return this.config.missCost[bqnum];
    };
    //获取进度日期
    AcWeiZhengVo.prototype.getNowDay = function () {
        var day = this.diffday;
        return day; //Math.min(day , 3);
    };
    //是否已获得此皮肤
    AcWeiZhengVo.prototype.haveSkin = function (code) {
        var flag = false;
        var rewardvo = GameData.formatRewardItem(this.config.claim[0].getReward)[0];
        var skinid = this.config.getSkinId(code);
        if (Api.itemVoApi.getItemNumInfoVoById(rewardvo.id) > 0 || Api.servantVoApi.isOwnSkinOfSkinId(skinid)) {
            flag = true;
        }
        return flag;
    };
    AcWeiZhengVo.prototype.dispose = function () {
        this.task = null;
        this.binfo = null;
        this.bqnum = 0;
        this.diffday = 0;
        _super.prototype.dispose.call(this);
    };
    return AcWeiZhengVo;
}(AcBaseVo));
__reflect(AcWeiZhengVo.prototype, "AcWeiZhengVo");
//# sourceMappingURL=AcWeiZhengVo.js.map