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
 * 神兵宝库
 * date 2020.6.10
 * author yangtao
 * @class AcWeaponHouseVo
 */
var AcWeaponHouseVo = (function (_super) {
    __extends(AcWeaponHouseVo, _super);
    function AcWeaponHouseVo() {
        var _this = _super.call(this) || this;
        _this.rinfo = null; //充值
        _this.refreshNum = -1;
        return _this;
    }
    AcWeaponHouseVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    // public isAddPhy()
    // {
    //     this.refresh.num++;
    //     this.refresh.st = GameData.serverTime;
    // }
    //倒计时
    AcWeaponHouseVo.prototype.getDuTime = function () {
        if (this.refresh.st == 0) {
            return App.DateUtil.getFormatBySecond(this.cfg.addTime, 1);
        }
        var time = this.cfg.addTime - (GameData.serverTime - this.refresh.st) % this.cfg.addTime;
        // if(time <= 0)
        // {
        //     time = 0;
        //     this.isAddPhy();
        // }
        if (this.refresh) {
            this.refreshNum = this.refresh.num + Math.floor((GameData.serverTime - this.refresh.st) / this.cfg.addTime);
            this.refreshNum = this.refreshNum > this.cfg.baseTime ? this.cfg.baseTime : this.refreshNum;
        }
        return App.DateUtil.getFormatBySecond(time, 1);
    };
    //获取恢复次数
    AcWeaponHouseVo.prototype.rePhy = function () {
        if (this.refresh) {
            if (this.refresh.num == 0 && this.refresh.st == 0) {
                return Number(this.cfg.baseTime - this.refresh.num);
            }
            else {
                this.refreshNum = this.refresh.num + Math.floor((GameData.serverTime - this.refresh.st) / this.cfg.addTime);
                this.refreshNum = this.refreshNum > this.cfg.baseTime ? this.cfg.baseTime : this.refreshNum;
                return Number(this.refreshNum);
            }
        }
        return 0;
    };
    //是否有次数
    AcWeaponHouseVo.prototype.isFree = function () {
        if ((this.v + this.rePhy()) > 0) {
            return true;
        }
        return false;
    };
    //获得可用次数
    AcWeaponHouseVo.prototype.getRechargeNum = function () {
        if ((this.v + this.rePhy()) > 0) {
            return ((this.v + this.rePhy()) + "/1");
        }
        return "0/1";
    };
    AcWeaponHouseVo.prototype.getRechargeNums = function () {
        if ((this.v + this.rePhy()) > 0) {
            return (this.v + this.rePhy());
        }
        return 0;
    };
    AcWeaponHouseVo.prototype.getScoreNum = function () {
        var num = 0;
        if (this.ainfo[1] && this.ainfo[1].v) {
            num = this.ainfo[1].v;
        }
        return num;
    };
    AcWeaponHouseVo.prototype.shouGoldNum = function () {
        var num;
        if (this.buynum >= this.cfg.costMoney.length) {
            num = this.cfg.costMoney[this.cfg.costMoney.length - 1];
        }
        else {
            num = this.cfg.costMoney[this.buynum];
        }
        return num;
    };
    //选择购买十次
    AcWeaponHouseVo.prototype.showGoldNumTen = function () {
        var num = 0;
        if (this.buynum >= this.cfg.costMoney.length) {
            num = this.cfg.costMoney[this.cfg.costMoney.length - 1] * 10;
        }
        else {
            for (var index = this.buynum; index < (this.cfg.costMoney.length - 1); index++) {
                num += this.cfg.costMoney[index];
            }
            num += ((10 - (this.cfg.costMoney.length - 1 - this.buynum)) * this.cfg.costMoney[this.cfg.costMoney.length - 1]);
        }
        return num;
    };
    //获取累积充值数目
    AcWeaponHouseVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.rinfo && this.rinfo.v) {
            num = this.rinfo.v;
        }
        return num;
    };
    //获取完成数目
    AcWeaponHouseVo.prototype.getNeedNum = function (id1, id2) {
        var num = 0;
        if (this.rinfo && this.rinfo.v) {
            num = this.rinfo.v;
        }
        return num;
    };
    /*累积充值领取判断*/
    AcWeaponHouseVo.prototype.isGetRecharge = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    // public getNeedMoney():number{
    //     let rechargeData = this.cfg.getRechargeList();
    //     if (rechargeData && rechargeData.length > 0){
    //         for (let i=0; i < rechargeData.length; i++){
    //             let rewards = rechargeData[i].getReward.split("|");
    //             for (let key in rewards){
    //                 let id = rewards[key].split("_")[1];
    // 				let itemCfg = Config.ItemCfg.getItemCfgById(id);
    // 				if(itemCfg)
    // 				{
    // 					if(itemCfg.getRewards && itemCfg.getRewards.split("_")[1] && itemCfg.getRewards.split("_")[1] == String(this.cfg.show))
    // 					{
    // 						return rechargeData[i].needGem;
    // 					}
    // 				}
    //             }
    //         }
    //     }
    //     return 0;
    // }	
    //获得充值奖励的配置
    AcWeaponHouseVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRecharge(String(rechargeData[i].id))) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
            }
            else if (this.getChargeNum() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
            }
        }
        rechargeData.sort(function (a, b) { return a.sortId - b.sortId; });
        return rechargeData;
    };
    //获取全服任务完成次数
    AcWeaponHouseVo.prototype.getTask = function (id1, id2) {
        var num = 0;
        if (this.zinfo[id1] && this.zinfo[id1][id2] && this.zinfo[id1][id2].num) {
            num = this.zinfo[id1][id2].num;
        }
        return num;
    };
    //获取个人任务完成次数
    AcWeaponHouseVo.prototype.getOneTask = function (id1) {
        var num = 0;
        if (this.ainfo[id1] && this.ainfo[id1].v) {
            num = this.ainfo[id1].v;
        }
        return num;
    };
    /*任务奖励是否领取*/
    AcWeaponHouseVo.prototype.isGetTaskReward = function (id1, id2) {
        var flag = false;
        if (this.zinfo[id1] && this.zinfo[id1][id2]) {
            flag = this.zinfo[id1][id2].flag == 1;
        }
        return flag;
    };
    /*个人任务当前进度*/
    AcWeaponHouseVo.prototype.GeOnetTaskReward = function (id1, id2) {
        var flag = false;
        if (this.ainfo[id1] && (this.ainfo[id1].stage == id2)) {
            //flag = this.ainfo[id1].f == 1;
            flag = true;
        }
        return flag;
    };
    /*个人任务奖励是否领取*/
    AcWeaponHouseVo.prototype.isGeOnetTaskReward = function (id1, id2) {
        var flag = false;
        if (this.ainfo[id1] && (this.ainfo[id1].stage == id2)) {
            flag = this.ainfo[id1].f == 1;
        }
        return flag;
    };
    //充值奖励红点
    AcWeaponHouseVo.prototype.isShowRechargeDot = function () {
        var curNum = this.getChargeNum();
        var data = this.cfg.getRechargeList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRecharge(String(data[i].id))) {
                if (curNum >= data[i].needGem) {
                    return true;
                }
            }
        }
        return false;
    };
    //全服奖励红点
    AcWeaponHouseVo.prototype.getAllRedhot = function () {
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var task = this.cfg.scheduleAll;
        for (var i in task) {
            var unit = task[i];
            var id = Number(i);
            for (var k in unit) {
                var isget = this.isGetTaskReward(id, Number(k) - 1);
                var taskNum = this.getTask(id, Number(k) - 1);
                var onecfg = unit[k];
                if (onecfg.needNum) {
                    if (taskNum < onecfg.needNum) {
                        break;
                    }
                    if (!isget && taskNum >= onecfg.needNum) {
                        return true;
                    }
                }
                else {
                    if (taskNum < onecfg.value2) {
                        break;
                    }
                    if (!isget && taskNum >= onecfg.value2) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    //个人奖励红点
    AcWeaponHouseVo.prototype.isShowOneDot = function () {
        if (this.ainfo) {
            var task = this.ainfo;
            for (var i in task) {
                if (task[i].f == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    //图标红点
    AcWeaponHouseVo.prototype.getRedPoint = function () {
        if (this.isShowOneDot() || this.getAllRedhot() || this.isShowRechargeDot()) {
            return true;
        }
        return false;
    };
    AcWeaponHouseVo.prototype.getMapData = function () {
        return this.map;
    };
    // public getNeedRecharge():number{
    //     let num = this.getRechargeNums();
    //     let needNum = this.cfg.needGem - num % this.cfg.needGem;
    //     return needNum;
    // }
    //道具数量
    AcWeaponHouseVo.prototype.getToolNum = function () {
        if (this.num) {
            return this.num;
        }
        return 0;
    };
    /**当前进度 */
    AcWeaponHouseVo.prototype.getProcessNum = function () {
        if (this.ainfo && this.ainfo.v) {
            return this.ainfo.v;
        }
        return 0;
    };
    /**当前进度奖励是否领取 */
    AcWeaponHouseVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    //是否有免费次数
    AcWeaponHouseVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcWeaponHouseVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.isInActivity() && this.isFree()) {
                return true;
            }
            return this.getRedPoint();
        },
        enumerable: true,
        configurable: true
    });
    //倒计时
    AcWeaponHouseVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcWeaponHouseVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcWeaponHouseVo.prototype.isInAct = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    Object.defineProperty(AcWeaponHouseVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcWeaponHouseVo;
}(AcBaseVo));
__reflect(AcWeaponHouseVo.prototype, "AcWeaponHouseVo");
/**
 * 格子数据
 */
var GridItemData = (function () {
    function GridItemData() {
        this.value = 0; //值
    }
    Object.defineProperty(GridItemData.prototype, "disX", {
        /**x的位置 */
        get: function () {
            var _half = 50 >> 1;
            var disX = 59 + (5 + 108) * this.j + _half;
            return disX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridItemData.prototype, "disY", {
        /**y的位置 */
        get: function () {
            var _half = 108 >> 1;
            var disY = 74 + (5 + 108) * this.i + _half;
            return disY;
        },
        enumerable: true,
        configurable: true
    });
    return GridItemData;
}());
__reflect(GridItemData.prototype, "GridItemData");
//# sourceMappingURL=AcWeaponHouseVo.js.map