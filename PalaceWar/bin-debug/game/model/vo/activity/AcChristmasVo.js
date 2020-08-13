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
var AcChristmasVo = (function (_super) {
    __extends(AcChristmasVo, _super);
    function AcChristmasVo() {
        var _this = _super.call(this) || this;
        /**层数 */
        _this.floor = null;
        /**每层的奖励 */
        _this.getrewards = null;
        /** 任务 */
        _this.task = null;
        return _this;
    }
    AcChristmasVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**道具的数量 */
    AcChristmasVo.prototype.getItemValue = function () {
        return this.v;
    };
    /**
     * 每层
     */
    AcChristmasVo.prototype.getFloor = function () {
        return this.floor;
    };
    AcChristmasVo.prototype.getFloorCost = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        return cfg.getFloorCost(String(this.floor));
    };
    /**每层的已使用次数 */
    AcChristmasVo.prototype.getFloorValue = function (floor) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        switch (floor) {
            case 1:
                if (this.floor > floor) {
                    return Object.keys(cfg.firstFloor).length;
                }
                else {
                    return Object.keys(this.getrewards).length;
                }
            case 2:
                if (this.floor > floor) {
                    return Object.keys(cfg.secondFloor).length;
                }
                else if (this.floor < floor) {
                    return 0;
                }
                else {
                    return Object.keys(this.getrewards).length;
                }
            case 3:
                if (this.floor > floor) {
                    return Object.keys(cfg.thirdFloor).length;
                }
                else if (this.floor < floor) {
                    return 0;
                }
                else {
                    return Object.keys(this.getrewards).length;
                }
        }
    };
    /**每层的剩余次数 */
    AcChristmasVo.prototype.getOtherFloorValue = function (floor) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var value = this.getFloorValue(floor);
        switch (floor) {
            case 1:
                return Object.keys(cfg.firstFloor).length - value;
            case 2:
                return Object.keys(cfg.secondFloor).length - value;
            case 3:
                return Object.keys(cfg.thirdFloor).length - value;
        }
    };
    AcChristmasVo.prototype.getlotteryValue = function () {
        if (this.floor > 3) {
            return 10;
        }
        var value = this.getOtherFloorValue(this.floor);
        return value >= 10 ? 10 : value;
    };
    /**
     * 每层的奖励item是否领取了
     */
    AcChristmasVo.prototype.getFloorReward = function (itemKey, floor) {
        if (this.floor > floor) {
            return true;
        }
        else if (this.floor < floor) {
            return false;
        }
        for (var key in this.getrewards) {
            if (key == itemKey && this.getrewards[key] == 1) {
                return true;
            }
        }
        return false;
    };
    /**
     * 每层的奖励是否已经全部领完
     */
    AcChristmasVo.prototype.isCompleteFloorReward = function (floor) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var floorData = cfg.getFloorRewardPoolList(floor);
        for (var i = 0; i < floorData.length; i++) {
            if (!this.getFloorReward(floorData[i].id, Number(floor))) {
                return false;
            }
        }
        return true;
    };
    /**
     * 获得现在奖池中的物品
     */
    AcChristmasVo.prototype.getNowRewardPool = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var floorRewardList = cfg.getFloorRewardPoolList(String(this.floor));
        var nowfloorRewardList = [];
        for (var key in floorRewardList) {
            if (this.floor < 4) {
                if (this.getFloorReward(floorRewardList[key].id, this.floor)) {
                    continue;
                }
            }
            nowfloorRewardList.push(floorRewardList[key]);
        }
        return nowfloorRewardList;
    };
    AcChristmasVo.prototype.getItemIndexByType = function (type, floor) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var data = null;
        var f = Number(floor);
        if (f == 1) {
            data = cfg.firstFloor;
        }
        else if (f == 2) {
            data = cfg.secondFloor;
        }
        else if (f == 3) {
            data = cfg.thirdFloor;
        }
        else if (f == 4) {
            data = cfg.finalFloor;
        }
        for (var key in data) {
            var needType = (data[key][0]).split("_")[0];
            if (needType == String(type)) {
                return key;
            }
        }
        return null;
    };
    /**
     * 任务的状态
     */
    AcChristmasVo.prototype.getTaskStatus = function (id) {
        return this.task.flags[id] && this.task.flags[id] == 1 ? true : false;
    };
    /**
     * 任务类型的进度
     */
    AcChristmasVo.prototype.gettTaskNum = function (type) {
        return this.task.v[type] ? this.task.v[type] : 0;
    };
    /**
     * 获得Task列表
     */
    AcChristmasVo.prototype.getSortTask = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = cfg.getTaskCfg();
        for (var i = 0; i < taskData.length; i++) {
            if (this.getTaskStatus(taskData[i].id)) {
                taskData[i].sortId = taskData.length + Number(taskData[i].id);
                continue;
            }
            else if (this.gettTaskNum(taskData[i].questType) >= taskData[i].value) {
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
    Object.defineProperty(AcChristmasVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            return this.isHaveTaskRedDot() || this.isHaveDrawRewardRedDot();
        },
        enumerable: true,
        configurable: true
    });
    /**
 * 任务奖励红点
 */
    AcChristmasVo.prototype.isHaveTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        for (var i = 0; i < cfg.getTaskCfg().length; i++) {
            if (this.gettTaskNum(cfg.getTaskCfg()[i].questType) >= cfg.getTaskCfg()[i].value) {
                if (!this.getTaskStatus(cfg.getTaskCfg()[i].id)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 圣诞活动小红点可抽奖判断
    */
    AcChristmasVo.prototype.isHaveDrawRewardRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        var et = this.et - cfg.extraTime * 86400;
        //活动展示期不显示红点
        if (et <= GameData.serverTime) {
            return false;
        }
        if (this.getItemValue() >= this.getFloorCost()) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcChristmasVo.prototype, "acCountDown", {
        /**
         * 活动结束倒计时，格式：00：00：00
         */
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var et = this.et - cfg.extraTime * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 最后一层的奖励放第一位
     */
    AcChristmasVo.prototype.formatLastRewards = function (rewards) {
        if (!rewards) {
            return null;
        }
        var arr = rewards.split("|");
        if (!arr || arr.length <= 1) {
            return null;
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var finalReward = cfg.getFloorRewardList("4")[0].reward;
        var index = rewards.indexOf(finalReward);
        App.LogUtil.log("formatLastRewards index: " + index + " rewards: " + rewards);
        if (index > -1) {
            var str = rewards.substring(0, index - 1);
            App.LogUtil.log("formatLastRewards11: " + str);
            return finalReward + "|" + str;
        }
        else {
            return null;
        }
    };
    AcChristmasVo.prototype.dispose = function () {
        this.floor = null;
        this.task = null;
        this.getrewards = null;
        this.v = null;
        _super.prototype.dispose.call(this);
    };
    return AcChristmasVo;
}(AcBaseVo));
__reflect(AcChristmasVo.prototype, "AcChristmasVo");
//# sourceMappingURL=AcChristmasVo.js.map