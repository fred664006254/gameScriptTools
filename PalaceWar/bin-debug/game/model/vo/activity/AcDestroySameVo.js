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
var AcDestroySameVo = (function (_super) {
    __extends(AcDestroySameVo, _super);
    function AcDestroySameVo() {
        var _this = _super.call(this) || this;
        _this.lastidx = -1;
        _this.lastpos = null;
        _this.pointidx = -1;
        _this.taskid = '';
        _this.round = 1;
        _this.rinfo = null;
        _this.bossrwd = null;
        _this.task = null;
        _this.grid = null;
        _this._curHp = [];
        _this.isfree = 0;
        _this.shop = null;
        return _this;
    }
    AcDestroySameVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**商品购买的数量 */
    AcDestroySameVo.prototype.getShopValue = function (id) {
        return this.shop && this.shop[id] ? this.shop[id] : 0;
    };
    //充值奖励
    AcDestroySameVo.prototype.getpublicRedhot1 = function () {
        //充值
        var cfg = this.cfg;
        if (this.isEnd) {
            return false;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && this.isGetRecharge(Number(i)) == false) {
                return true;
            }
        }
        return false;
    };
    //任务奖励
    AcDestroySameVo.prototype.getpublicRedhot2 = function () {
        //任务
        var cfg = this.cfg;
        if (this.isEnd) {
            return false;
        }
        var task = cfg.task;
        for (var i in task) {
            var unit = task[i];
            var id = Number(i);
            for (var j = 0; j < 3; ++j) {
                var tasknum = this.getTask(id + 1, j + 1);
                var isget = this.isGetTaskReward(id + 1, j + 1);
                var tmp = unit[j];
                if (!isget && tasknum >= unit[j].value) {
                    return true;
                }
            }
        }
        return false;
    };
    //击杀首领
    AcDestroySameVo.prototype.getpublicRedhot3 = function () {
        if (this.isEnd) {
            return false;
        }
        var curround = this.getCurround();
        for (var i = 1; i < curround; ++i) {
            if (this.bossrwd && typeof this.bossrwd[i] != "undefined" && !this.isGetRoundReward(i)) {
                return true;
            }
        }
        if (curround == Object.keys(this.cfg.bossList).length && this.bossrwd && typeof this.bossrwd[curround] != "undefined" && this.getCurbossHp() == 0) {
            return true;
        }
        return false;
    };
    //免费
    AcDestroySameVo.prototype.getpublicRedhot4 = function () {
        if (this.isEnd) {
            return false;
        }
        return this.isfree > 0;
    };
    Object.defineProperty(AcDestroySameVo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i <= 4; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcDestroySameVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcDestroySameVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    AcDestroySameVo.prototype.getItemNum = function () {
        var num = this.v;
        return num;
    };
    AcDestroySameVo.prototype.getFreeNum = function () {
        var num = this.isfree;
        return num;
    };
    //充值
    AcDestroySameVo.prototype.getChargeNum = function () {
        var charge = 0;
        if (this.rinfo && this.rinfo.v) {
            charge = this.rinfo.v;
        }
        return charge;
    };
    //获取任务完成次数
    AcDestroySameVo.prototype.getTask = function (id1, id2) {
        var num = 0;
        if (this.task[id1] && this.task[id1][id2]) {
            num = this.task[id1][id2].v;
        }
        return num;
    };
    /*任务奖励是否领取*/
    AcDestroySameVo.prototype.isGetTaskReward = function (id1, id2) {
        var flag = false;
        if (this.task[id1] && this.task[id1][id2]) {
            flag = this.task[id1][id2].f == 1;
        }
        return flag;
    };
    /*累积充值领取判断*/
    AcDestroySameVo.prototype.isGetRecharge = function (id) {
        var flag = false;
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            flag = this.rinfo.flags[id] == 1;
        }
        return flag;
    };
    /*获取位置上的南瓜*/
    AcDestroySameVo.prototype.getPopPos = function (x, y) {
        var type = 0;
        if (this.grid[x - 1] && this.grid[x - 1][y - 1]) {
            type = this.grid[x - 1][y - 1];
        }
        return type;
    };
    AcDestroySameVo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return [];
        }
        var list = cfg;
        for (var i in list) {
            if (i == key) {
                for (var key2 in list[i]) {
                    if (list[i][key2]) {
                        var currObj = list[i][key2];
                        if (currObj.getReward) {
                            list[i][key2].key = Number(key2) + 1;
                            if (list[i][key2].key) {
                                arr.push(list[i][key2]);
                            }
                        }
                    }
                }
            }
        }
        return arr;
    };
    //当前多少轮
    AcDestroySameVo.prototype.getCurround = function () {
        var round = this.round;
        return round;
    };
    //当前boss血量
    AcDestroySameVo.prototype.setBosshp = function (num) {
        this._curHp = num;
    };
    AcDestroySameVo.prototype.getCurbossHp = function () {
        var hp = this._curHp[this.round - 1];
        return hp;
    };
    //轮数奖励
    AcDestroySameVo.prototype.isGetRoundReward = function (round) {
        if (this.bossrwd && this.bossrwd[round]) {
            return true;
        }
        return false;
    };
    AcDestroySameVo.prototype.dispose = function () {
        this.lastidx = -1;
        this.lastpos = null;
        this.round = 1;
        this.rinfo = null;
        this.task = null;
        this.grid = null;
        this._curHp = null;
        this.bossrwd = null;
        this.pointidx = -1;
        this.taskid = '';
        this.shop = null;
        _super.prototype.dispose.call(this);
    };
    return AcDestroySameVo;
}(AcBaseVo));
__reflect(AcDestroySameVo.prototype, "AcDestroySameVo");
//# sourceMappingURL=AcDestroySameVo.js.map