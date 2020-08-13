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
var AcMotherDayVo = (function (_super) {
    __extends(AcMotherDayVo, _super);
    function AcMotherDayVo() {
        var _this = _super.call(this) || this;
        _this.selIdx = 0;
        _this.info = []; // --献花情况25个元素
        _this.rinfo = {}; //{v = 0,flags={}} --充值信息
        _this.rewards = {}; //--奖励领取情况
        _this.num = 0; // --献花次数
        _this.free = 0;
        _this.shop = null;
        _this.task = null;
        return _this;
    }
    AcMotherDayVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.info = data.info;
        this.rewards = data.rewards;
        this.rinfo = data.rinfo;
        this.num = data.num;
        this.free = data.isfree;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MOTHERDAY_FRESH_ITEM);
    };
    //获取自己鲜花数
    AcMotherDayVo.prototype.getFlowers = function () {
        var arr = [];
        if (this.info) {
            arr = this.info;
        }
        ;
        return arr;
    };
    //获取是否已全部激活宝箱
    AcMotherDayVo.prototype.getAllBoxIsLight = function () {
        return this.num >= 25;
    };
    //获取自己鲜花数
    AcMotherDayVo.prototype.getFlowerNum = function () {
        var num = 0;
        if (this.v) {
            num = this.v;
        }
        return num;
    };
    //获取累积充值数目
    AcMotherDayVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.rinfo && this.rinfo.v) {
            num = this.rinfo.v;
        }
        return num;
    };
    //倒计时
    AcMotherDayVo.prototype.getCountDown = function () {
        return this.et - 86400 * this.cfg.extraTime - GameData.serverTime;
    };
    /**
     * 累积充值领取判断
     * */
    AcMotherDayVo.prototype.isGetRecharge = function (id) {
        var flag = false;
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            flag = true;
        }
        return flag;
    };
    Object.defineProperty(AcMotherDayVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //可以献花
    AcMotherDayVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        if (this.isInActivity()) {
            flag = this.v > 0 || this.isFree();
        }
        return flag;
    };
    //是否有未领取宝箱奖励
    AcMotherDayVo.prototype.getpublicRedhot3 = function () {
        if (this.isActyEnd()) {
            return false;
        }
        //奖励进度宝箱
        for (var i in this.cfg.achievement) {
            var unit = this.cfg.achievement[i];
            var id = Number(i) + 1;
            if (this.getBoxStatus(id) == 2 && !this.isGetJinduAward(id)) {
                return true;
            }
        }
        if (this.getBigBoxStatus() == 1) {
            return true;
        }
        return false;
    };
    //是否有未领取充值奖励
    AcMotherDayVo.prototype.getpublicRedhot2 = function () {
        if (this.isActyEnd()) {
            return false;
        }
        //充值
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && !this.isGetRecharge(Number(i) + 1)) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcMotherDayVo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i <= 3; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            if (this.checTaskRedDot() || this.sceneRedDot()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMotherDayVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcMotherDayVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
    };
    AcMotherDayVo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    AcMotherDayVo.prototype.isGetJinduAward = function (id) {
        var flag = false;
        if (this.rewards && this.rewards[id]) {
            flag = true;
        }
        return flag;
    };
    //花盆是否被点亮 1未被开启 2被点亮
    AcMotherDayVo.prototype.getFlowerStatus = function (id) {
        var status = 1;
        if (this.info && this.info[id - 1]) {
            status = 2;
        }
        return status;
    };
    //宝箱状态 1未被开启 2已满足未领取 3已领取
    AcMotherDayVo.prototype.getBoxStatus = function (id) {
        var status = 1;
        if (this.isGetJinduAward(id)) {
            status = 3;
        }
        else {
            if (this.getAllBoxIsLight()) {
                status = 2;
            }
            else {
                var start = 0;
                var end = 0;
                var arr = [];
                if (id < 6) {
                    start = (id - 1) * 5 + 1;
                    end = start + 4;
                    for (var i = start; i <= end; ++i) {
                        arr.push(i);
                    }
                }
                else {
                    start = 11 - id;
                    end = start + 20;
                    for (var i = start; i <= end; i += 5) {
                        arr.push(i);
                    }
                }
                var finish = true;
                for (var i in arr) {
                    var id_1 = arr[i];
                    if (this.info && !this.info[id_1 - 1]) {
                        finish = false;
                        break;
                    }
                }
                if (this.info && finish) {
                    status = 2;
                }
            }
        }
        return status;
    };
    //大宝箱状态 0未被开启 11️已满足未领取 2已领取
    AcMotherDayVo.prototype.getBigBoxStatus = function () {
        var status = 0;
        if (this.rewards && this.rewards["bigPrize"]) {
            status = 2;
        }
        else {
            var all = true;
            for (var i = 1; i < 11; ++i) {
                if (this.getBoxStatus(i) == 1) {
                    all = false;
                    break;
                }
            }
            if (all) {
                status = 1;
                ;
            }
        }
        return status;
    };
    AcMotherDayVo.prototype.isFree = function () {
        return this.free > 0;
    };
    /**
    * 获得充值奖励的配置
    */
    AcMotherDayVo.prototype.getSortRechargeCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.rechargeItemListCfg;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRecharge(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getChargeNum() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
                continue;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
                continue;
            }
        }
        return rechargeData;
    };
    /**任务完成度 */
    AcMotherDayVo.prototype.getTaskFlag = function (dayId, taskId) {
        return this.task && this.task[dayId] && this.task[dayId][taskId] && this.task[dayId][taskId].flag && this.task[dayId][taskId].flag == 2 ? true : false;
    };
    /**任务进度 */
    AcMotherDayVo.prototype.getTaskValue = function (dayId, taskType) {
        return this.task && this.task[dayId] && this.task[dayId][taskType] && this.task[dayId][taskType].v ? this.task[dayId][taskType].v : 0;
    };
    /**
    * 获得Task列表
    */
    AcMotherDayVo.prototype.getSortTaskCfg = function (dayId) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.dailyTaskItemCfgList[dayId];
        for (var i = 0; i < taskData.length; i++) {
            if (this.getTaskFlag(dayId, taskData[i].questType)) {
                taskData[i].sortId = taskData.length + Number(taskData[i].id);
                continue;
            }
            else if (this.getTaskValue(dayId, taskData[i].questType) >= taskData[i].value) {
                taskData[i].sortId = (Number(taskData[i].id)) - taskData.length - 1;
                continue;
            }
            else {
                taskData[i].sortId = Number(taskData[i].id);
                continue;
            }
        }
        return taskData;
    };
    /**
    * 任务的小红点1
    */
    AcMotherDayVo.prototype.checTaskRedDot1 = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.dailyTaskItemCfgList["1"];
        if (rechargeData) {
            for (var i = 0; i < rechargeData.length; i++) {
                if ((!this.getTaskFlag("1", rechargeData[i].questType)) && this.getTaskValue("1", rechargeData[i].questType) >= rechargeData[i].value) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
    * 任务的小红点1
    */
    AcMotherDayVo.prototype.checTaskRedDot2 = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.dailyTaskItemCfgList["2"];
        if (rechargeData) {
            for (var i = 0; i < rechargeData.length; i++) {
                if ((!this.getTaskFlag("2", rechargeData[i].questType)) && this.getTaskValue("2", rechargeData[i].questType) >= rechargeData[i].value) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
    * 任务的小红点1
    */
    AcMotherDayVo.prototype.checTaskRedDot3 = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.dailyTaskItemCfgList["3"];
        if (rechargeData) {
            for (var i = 0; i < rechargeData.length; i++) {
                if ((!this.getTaskFlag("3", rechargeData[i].questType)) && this.getTaskValue("3", rechargeData[i].questType) >= rechargeData[i].value) {
                    return true;
                }
            }
        }
        return false;
    };
    /** 任务小红点 */
    AcMotherDayVo.prototype.checTaskRedDot = function () {
        return this.checTaskRedDot3() || this.checTaskRedDot2() || this.checTaskRedDot1();
    };
    /**当前第几天的任务开启 */
    AcMotherDayVo.prototype.getNowDayTask = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.checkIsInEndShowTime()) {
            var keys_1 = Object.keys(cfg.dailyTaskItemCfgList);
            return keys_1[keys_1.length - 1];
        }
        var keys = Object.keys(this.task);
        return keys[keys.length - 1];
    };
    /**商品购买的数量 */
    AcMotherDayVo.prototype.getShopValue = function (id) {
        return this.shop && this.shop[id] ? this.shop[id] : 0;
    };
    AcMotherDayVo.prototype.sceneRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (cfg.exchangeScene && cfg.exchangeScene.needParts && cfg.exchangeScene.getReward) {
            var needPartsVo = GameData.formatRewardItem(cfg.exchangeScene.needParts)[0];
            var getRewardVo = GameData.formatRewardItem(cfg.exchangeScene.getReward)[0];
            if (needPartsVo && getRewardVo) {
                var scenesid = String(getRewardVo.id);
                var sceneName = "";
                if (String(scenesid)[0] == "1") {
                    sceneName = "homeScene";
                }
                else if (String(scenesid)[0] == "2") {
                    sceneName = "cityScene";
                }
                else if (String(scenesid)[0] == "3") {
                    sceneName = "searchScene";
                }
                if ((!Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid, sceneName)) && (Api.itemVoApi.getItemNumInfoVoById(needPartsVo.id) >= needPartsVo.num)) {
                    return true;
                }
            }
        }
        return false;
    };
    AcMotherDayVo.prototype.dispose = function () {
        this.selIdx = 0;
        this.info = []; // --献花情况25个元素
        this.rinfo = {}; //{v = 0,flags={}} --充值信息
        this.rewards = {}; //--奖励领取情况
        this.num = 0; // --献花次数
        this.free = 0;
        _super.prototype.dispose.call(this);
    };
    return AcMotherDayVo;
}(AcBaseVo));
__reflect(AcMotherDayVo.prototype, "AcMotherDayVo");
//# sourceMappingURL=AcMotherDayVo.js.map