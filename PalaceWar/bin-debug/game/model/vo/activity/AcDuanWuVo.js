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
var AcDuanWuVo = (function (_super) {
    __extends(AcDuanWuVo, _super);
    function AcDuanWuVo() {
        var _this = _super.call(this) || this;
        /**
            self.info[k].v = 0
            self.info[k].ainfo = {v1=0,v2=0,v3=0}
            self.info[k].binfo = {v=0,flags={}}
            self.info[k].cinfo = {v=0,task={},flags={}}
            self.info[k].stask = {v=0,num=0}
            self.info[k].shop = {}
            self.info[k].claim = {}
         */
        //道具数量 v1 粽子 v2 打糕 v3雄黄
        _this.ainfo = null;
        //累计充值 v充值的元宝 flags领取标记
        _this.binfo = null;
        //任务完成 task{601:x,602:x},flags={1:1,2:1}
        _this.cinfo = null;
        //商店任务情况 v 总消费元宝数  num 领取奖励次数
        _this.stask = null;
        // 商城购买信息
        _this.shop = null;
        //兑换信息 同商店
        _this.claim = null;
        _this.lastidx = -1;
        _this.lastpos = null;
        return _this;
    }
    AcDuanWuVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcDuanWuVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    //获取活动道具  1 粽子 2打糕 3雄黄
    AcDuanWuVo.prototype.getActivityItem = function (type) {
        var num = 0;
        if (this.ainfo && this.ainfo["v" + type]) {
            num = this.ainfo["v" + type];
        }
        return num;
    };
    //获取累积充值数目
    AcDuanWuVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.binfo && this.binfo.v) {
            num = this.binfo.v;
        }
        return num;
    };
    //获取任务完成次数
    AcDuanWuVo.prototype.getTask = function (type) {
        var num = 0;
        if (this.cinfo && this.cinfo.task && this.cinfo.task[type]) {
            num = this.cinfo.task[type];
        }
        return num;
    };
    //获取商店购买次数
    AcDuanWuVo.prototype.getShop = function (type) {
        var num = 0;
        if (this.shop && this.shop[type]) {
            num = this.shop[type];
        }
        return num;
    };
    //获取商店购买次数
    AcDuanWuVo.prototype.getClaim = function (type) {
        var num = 0;
        if (this.claim && this.claim[type]) {
            num = this.claim[type];
        }
        return num;
    };
    //获取商店任务购买次数
    AcDuanWuVo.prototype.getShopTask = function () {
        var num = 0;
        if (this.stask && this.stask.num) {
            num = this.stask.num;
        }
        return num;
    };
    //获取商店任务总消费元宝数
    AcDuanWuVo.prototype.getShopTaskV = function () {
        var num = 0;
        if (this.stask && this.stask.v) {
            num = this.stask.v;
        }
        return num;
    };
    /*任务奖励是否领取*/
    AcDuanWuVo.prototype.isGetTaskReward = function (key) {
        var flag = false;
        if (this.cinfo && this.cinfo.task && this.cinfo.flags[key]) {
            flag = true;
        }
        return flag;
    };
    /*累积充值领取判断*/
    AcDuanWuVo.prototype.isGetRecharge = function (id) {
        if (this.binfo && this.binfo.flags) {
            for (var key in this.binfo.flags) {
                if (this.binfo.flags[id] == 1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    Object.defineProperty(AcDuanWuVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //充值奖励
    AcDuanWuVo.prototype.getpublicRedhot1 = function () {
        //充值
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && this.isGetRecharge(unit.id) == false) {
                return true;
            }
        }
        return false;
    };
    //任务奖励
    AcDuanWuVo.prototype.getpublicRedhot3 = function () {
        //任务
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        for (var i in cfg.task) {
            var unit = cfg.task[i];
            var taskNum = this.getTask(unit.questType);
            var taskBoo = this.isGetTaskReward(Number(i));
            if (taskNum >= unit.value && taskBoo == false) {
                return true;
            }
        }
        return false;
    };
    //活动兑换
    AcDuanWuVo.prototype.getpublicRedhot4 = function () {
        //任务
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        for (var i in cfg.claim) {
            var unit = cfg.claim[i];
            var claimNum = this.getClaim(unit.id);
            if (unit.limit && claimNum >= unit.limit) {
                continue;
            }
            var need1 = 0, need2 = 0, need3 = 0;
            if (unit.costZongZi) {
                need1 = unit.costZongZi;
            }
            if (unit.costDaGao) {
                need2 = unit.costDaGao;
            }
            if (unit.costXiongHuang) {
                need3 = unit.costXiongHuang;
            }
            if (this.getActivityItem(1) >= need1 && this.getActivityItem(2) >= need2 && this.getActivityItem(3) >= need3) {
                return true;
            }
        }
        return false;
    };
    //商店任务
    AcDuanWuVo.prototype.getpublicRedhot2 = function () {
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var canGetNum = Math.floor(this.getShopTaskV() / this.cfg.shopTask.value);
        if (canGetNum > this.getShopTask() && this.getShopTask() < this.cfg.shopTask.times) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcDuanWuVo.prototype, "isShowRedDot", {
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
    Object.defineProperty(AcDuanWuVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcDuanWuVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcDuanWuVo.prototype.getArr = function (key) {
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
                        // if(currObj.needMeter|| currObj.rank ||currObj.needGem||currObj.questType||currObj.limit)
                        // {
                        list[i][key2].key = Number(key2) + 1;
                        if (list[i][key2].key) {
                            arr.push(list[i][key2]);
                        }
                        // } 
                    }
                }
            }
        }
        return arr;
    };
    AcDuanWuVo.prototype.dispose = function () {
        this.ainfo = null;
        this.binfo = null;
        this.cinfo = null;
        this.shop = null;
        this.stask = null;
        this.claim = null;
        this.lastidx = -1;
        this.lastpos = null;
        _super.prototype.dispose.call(this);
    };
    return AcDuanWuVo;
}(AcBaseVo));
__reflect(AcDuanWuVo.prototype, "AcDuanWuVo");
//# sourceMappingURL=AcDuanWuVo.js.map