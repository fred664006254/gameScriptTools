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
var AcRyeHarvestVo = (function (_super) {
    __extends(AcRyeHarvestVo, _super);
    function AcRyeHarvestVo() {
        var _this = _super.call(this) || this;
        _this.selIdx = 0;
        _this.info = []; // --献花情况25个元素
        _this.taskinfo = {}; //{v = 0,flags={}} --充值信息
        _this.flags = {}; //{v = 0,flags={}} --充值信息
        _this.stageinfo = {}; //--奖励领取情况
        _this.num = 0; // --献花次数
        _this.free = 0;
        _this.shop = null;
        _this.task = null;
        return _this;
    }
    AcRyeHarvestVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.info = data.info;
        this.stageinfo = data.stageinfo;
        this.taskinfo = data.taskinfo;
        this.flags = data.flags;
        this.num = data.num;
        this.free = data.isfree;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RYEHARVEST_FRESH_ITEM);
    };
    //获取自己鲜花数
    AcRyeHarvestVo.prototype.getFlowers = function () {
        var arr = [];
        if (this.info) {
            arr = this.info;
        }
        ;
        return arr;
    };
    //获取是否已全部激活宝箱
    AcRyeHarvestVo.prototype.getAllBoxIsLight = function () {
        return this.num >= 25;
    };
    //获取自己鲜花数
    AcRyeHarvestVo.prototype.getFlowerNum = function () {
        var num = 0;
        if (this.v) {
            num = this.v;
        }
        return num;
    };
    //获取累积充值数目
    AcRyeHarvestVo.prototype.getChargeNum = function (questType) {
        var num = 0;
        if (this.taskinfo && this.taskinfo[questType]) {
            num = this.taskinfo[questType];
        }
        return num;
    };
    //倒计时
    AcRyeHarvestVo.prototype.getCountDown = function () {
        return this.et - GameData.serverTime;
    };
    /**
     * 累积充值领取判断
     * */
    AcRyeHarvestVo.prototype.isGetRecharge = function (id) {
        var flag = false;
        if (this.flags && this.flags[id]) {
            flag = true;
        }
        return flag;
    };
    Object.defineProperty(AcRyeHarvestVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //可以献花
    AcRyeHarvestVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        if (this.isInActivity()) {
            flag = this.v > 0 || this.isFree();
        }
        return flag;
    };
    //是否有未领取宝箱奖励
    AcRyeHarvestVo.prototype.getpublicRedhot3 = function () {
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
    AcRyeHarvestVo.prototype.getpublicRedhot2 = function () {
        if (this.isActyEnd()) {
            return false;
        }
        //充值
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        // let curCharge = this.getChargeNum();
        // for (let i in cfg.task) {
        // 	let unit = cfg.task[i];
        // 	if (curCharge >= unit.needGem && !this.isGetRecharge(Number(i) + 1)) {
        // 		return true;
        // 	}
        // }
        return false;
    };
    Object.defineProperty(AcRyeHarvestVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.getFlowerNum() > 0) {
                return true;
            }
            // 大箱子能领
            if (this.getBigBoxStatus() == 1) {
                return true;
            }
            // 粮仓能领
            for (var i = 0; i < this.cfg.achievement.length; i++) {
                if (this.getBoxStatus(i + 1) == 2) {
                    return true;
                }
            }
            // 任务能领
            if (this.checTaskRedDot()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRyeHarvestVo.prototype, "acTimeAndHour", {
        get: function () {
            return App.DateUtil.getOpenLocalTime(this.st, this.et, false);
        },
        enumerable: true,
        configurable: true
    });
    AcRyeHarvestVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcRyeHarvestVo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    AcRyeHarvestVo.prototype.isGetJinduAward = function (id) {
        var flag = 0;
        if (this.stageinfo && this.stageinfo[id]) {
            flag = this.stageinfo[id];
        }
        return flag;
    };
    //花盆是否被点亮 1未被开启 2被点亮
    AcRyeHarvestVo.prototype.getFlowerStatus = function (id) {
        var status = 1;
        if (this.info && this.info[id - 1]) {
            status = 2;
        }
        return status;
    };
    //宝箱状态 1未被开启 2已满足未领取 3已领取
    AcRyeHarvestVo.prototype.getBoxStatus = function (id) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var status = 1;
        var getCount = this.isGetJinduAward(id); // 领取过的次数
        if (getCount >= cfg.refresh + 1) {
            // 3轮奖励全部领完
            status = 3;
        }
        else if (Math.floor(this.num / (cfg.drawingLength * cfg.drawingLength)) > getCount) {
            // 上一轮还没有领
            status = 2;
        }
        else if (Math.floor(this.num / (cfg.drawingLength * cfg.drawingLength)) == getCount - 1) {
            // 当前轮已领
            status = 3;
        }
        else {
            // 当前轮不能领或能领
            var isOk = true;
            var condition = cfg.achievement[id - 1].condition;
            for (var i = 0; i < condition.length; i++) {
                var flowerId = condition[i];
                if (this.info[flowerId - 1] == 0) {
                    status = 1;
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                status = 2;
            }
        }
        return status;
    };
    //大宝箱状态是否已领取，true为已领取，false为未领取
    AcRyeHarvestVo.prototype.getBigBoxOneGetted = function (index) {
        var status = false;
        if (this.stageinfo && this.stageinfo["bigPrize"] && this.stageinfo["bigPrize"][index] == 1) {
            status = true;
        }
        return status;
    };
    //外面显示的大宝箱状态，0未空无可领，1有可领，2已空
    AcRyeHarvestVo.prototype.getBigBoxStatus = function () {
        var status = 0;
        var allEmpty = true; // 全空
        for (var i = 0; i < this.cfg.bigPrize.length; i++) {
            var oneBig = this.cfg.bigPrize[i];
            var getted = this.getBigBoxOneGetted(i + 1);
            if (!getted) {
                allEmpty = false; // 并非全空
                if (this.num >= oneBig.needValue) {
                    // 可领
                    status = 1;
                    return status;
                }
            }
        }
        if (allEmpty) {
            status = 2;
        }
        else {
            status = 0;
        }
        return status;
    };
    AcRyeHarvestVo.prototype.isFree = function () {
        return this.free > 0;
    };
    /**
    * 获得充值奖励的配置
    */
    AcRyeHarvestVo.prototype.getSortRechargeCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.rechargeItemListCfg;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRecharge(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
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
    AcRyeHarvestVo.prototype.getTaskFlag = function (dayId, taskId) {
        return this.task && this.task[dayId] && this.task[dayId][taskId] && this.task[dayId][taskId].flag && this.task[dayId][taskId].flag == 2 ? true : false;
    };
    /**任务进度 */
    AcRyeHarvestVo.prototype.getTaskValue = function (dayId, taskType) {
        return this.task && this.task[dayId] && this.task[dayId][taskType] && this.task[dayId][taskType].v ? this.task[dayId][taskType].v : 0;
    };
    /**
    * 获得Task列表
    */
    AcRyeHarvestVo.prototype.getSortTaskCfg = function (dayId) {
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
    AcRyeHarvestVo.prototype.checTaskRedDot1 = function () {
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
    AcRyeHarvestVo.prototype.checTaskRedDot2 = function () {
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
    AcRyeHarvestVo.prototype.checTaskRedDot3 = function () {
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
    AcRyeHarvestVo.prototype.checTaskRedDot = function () {
        for (var i in this.cfg.task) {
            if (!this.isGetRecharge(Number(i) + 1) && this.getChargeNum(this.cfg.task[i].questType) >= this.cfg.task[i].value) {
                // 可领
                return true;
            }
        }
        return false;
    };
    /**当前第几天的任务开启 */
    AcRyeHarvestVo.prototype.getNowDayTask = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.checkIsInEndShowTime()) {
            var keys_1 = Object.keys(cfg.dailyTaskItemCfgList);
            return keys_1[keys_1.length - 1];
        }
        var keys = Object.keys(this.task);
        return keys[keys.length - 1];
    };
    /**商品购买的数量 */
    AcRyeHarvestVo.prototype.getShopValue = function (id) {
        return this.shop && this.shop[id] ? this.shop[id] : 0;
    };
    AcRyeHarvestVo.prototype.sceneRedDot = function () {
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
                if (Api.itemVoApi.getItemNumInfoVoById(needPartsVo.id) >= needPartsVo.num) {
                    return true;
                }
            }
        }
        return false;
    };
    AcRyeHarvestVo.prototype.dispose = function () {
        this.selIdx = 0;
        this.info = []; // --献花情况25个元素
        this.taskinfo = {}; //{v = 0,flags={}} --充值信息
        this.flags = {}; //{v = 0,flags={}} --充值信息
        this.num = 0; // --献花次数
        this.free = 0;
        _super.prototype.dispose.call(this);
    };
    return AcRyeHarvestVo;
}(AcBaseVo));
__reflect(AcRyeHarvestVo.prototype, "AcRyeHarvestVo");
