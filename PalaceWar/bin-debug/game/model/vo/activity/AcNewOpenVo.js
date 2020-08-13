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
var AcNewOpenVo = (function (_super) {
    __extends(AcNewOpenVo, _super);
    function AcNewOpenVo() {
        var _this = _super.call(this) || this;
        // 商城购买信息
        _this.shop = null;
        _this.rinfo = null;
        _this.special = 0;
        _this.task = null;
        _this.lastidx = -1;
        _this.lastpos = null;
        _this.pointidx = -1;
        _this.taskid = '';
        return _this;
    }
    AcNewOpenVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcNewOpenVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcNewOpenVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcNewOpenVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    AcNewOpenVo.prototype.getSpecialNum = function () {
        return this.special;
    };
    //获取任务完成次数
    AcNewOpenVo.prototype.getTask = function (id1, id2) {
        var num = 0;
        if (this.task[id1] && this.task[id1][id2] && this.task[id1][id2].num) {
            num = this.task[id1][id2].num;
        }
        return num;
    };
    AcNewOpenVo.prototype.getShopByNum = function (id1) {
        var num = 0;
        if (this.shop && this.shop[id1]) {
            num = this.shop[id1];
        }
        return num;
    };
    /*任务奖励是否领取*/
    AcNewOpenVo.prototype.isGetTaskReward = function (id1, id2) {
        var flag = false;
        if (this.task[id1] && this.task[id1][id2]) {
            flag = this.task[id1][id2].flag == 1;
        }
        return flag;
    };
    /*累积充值领取判断*/
    AcNewOpenVo.prototype.isGetRecharge = function (id) {
        var flag = 0;
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            flag = this.rinfo.flags[id];
        }
        return flag;
    };
    //充值
    AcNewOpenVo.prototype.getChargeNum = function () {
        var charge = 0;
        if (this.rinfo && this.rinfo.v) {
            charge = this.rinfo.v;
        }
        return charge;
    };
    AcNewOpenVo.prototype.getRechangeArr = function () {
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var keys = Object.keys(this.cfg.recharge);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var onecfg = this.cfg.recharge[key];
            var getNum = this.isGetRecharge(onecfg.id);
            if (getNum >= onecfg.maxNum) {
                arr1.push(onecfg);
            }
            else {
                if ((this.getChargeNum() - onecfg.needGem * getNum) >= onecfg.needGem) {
                    arr2.push(onecfg);
                }
                else {
                    arr3.push(onecfg);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcNewOpenVo.prototype.getShopArr = function () {
        var keys = Object.keys(this.cfg.shop);
        var arr = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var onecfg = this.cfg.shop[key];
            arr.push(onecfg);
        }
        return arr;
    };
    //	活动奖励
    AcNewOpenVo.prototype.getpublicRedhot1 = function () {
        //充值
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var task = this.cfg.task;
        for (var i in task) {
            var unit = task[i];
            var id = Number(i);
            for (var k in unit) {
                var isget = this.isGetTaskReward(id, Number(k) - 1);
                var taskNum = this.getTask(id, Number(k) - 1);
                var onecfg = unit[k];
                if (taskNum < onecfg.peopleNum) {
                    break;
                }
                if (!isget && taskNum >= onecfg.peopleNum) {
                    return true;
                }
            }
        }
        return false;
    };
    //	消费奖励
    AcNewOpenVo.prototype.getpublicRedhot2 = function () {
        //充值
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var keys = Object.keys(this.cfg.recharge);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var onecfg = this.cfg.recharge[key];
            var getNum = this.isGetRecharge(onecfg.id);
            if (getNum < onecfg.maxNum && (this.getChargeNum() - onecfg.needGem * getNum) >= onecfg.needGem) {
                return true;
            }
        }
        return false;
    };
    //	shop奖励
    AcNewOpenVo.prototype.getpublicRedhot3 = function () {
        var itemNum = this.getSpecialNum();
        var keys = Object.keys(this.cfg.shop);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var onecfg = this.cfg.shop[key];
            var buynum = this.getShopByNum(onecfg.id);
            if (buynum < onecfg.limit && itemNum >= onecfg.specialCost) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcNewOpenVo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i <= 3; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcNewOpenVo.prototype.dispose = function () {
        this.shop = null;
        this.rinfo = null;
        this.special = 0;
        this.task = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewOpenVo;
}(AcBaseVo));
__reflect(AcNewOpenVo.prototype, "AcNewOpenVo");
//# sourceMappingURL=AcNewOpenVo.js.map