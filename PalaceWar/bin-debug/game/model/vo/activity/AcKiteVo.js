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
var AcKiteVo = (function (_super) {
    __extends(AcKiteVo, _super);
    function AcKiteVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.firstOpen = null;
        _this.rankInfo = { myrank: 0, rankList: {} };
        return _this;
    }
    AcKiteVo.prototype.dispose = function () {
        this.lotterynum = null;
        this.scorenum = null;
        this.chargenum = null;
        this.maxhight = null;
        this.nowhight = null;
        this.mapinfo = null;
        this.posinfo = null;
        this.taskinfo = null;
        this.stageinfo = null;
        this.flags = null;
        this.lastday = null;
        this.firstOpen = null;
        this.rankInfo = null;
        _super.prototype.dispose.call(this);
    };
    AcKiteVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_KITE_REFRESHVO);
    };
    Object.defineProperty(AcKiteVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcKiteVo.prototype.getSkinNeedData = function () {
        var data = this.cfg.getProgressList();
        for (var i = 0; i < data.length; i++) {
            var rewardArr = data[i].getReward.split("|");
            for (var j = 0; j < rewardArr.length; j++) {
                var itemId = rewardArr[j].split("_")[1];
                var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
                if (itemCfg.servantSkinID && itemCfg.servantSkinID == Number(this.cfg.corePrize)) {
                    return data[i].need;
                }
            }
        }
        return 0;
    };
    AcKiteVo.prototype.isFirst = function () {
        return this.firstOpen != 1;
    };
    Object.defineProperty(AcKiteVo.prototype, "starNum", {
        /**拥有数量 */
        get: function () {
            return this.scorenum ? this.scorenum : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteVo.prototype, "useNum", {
        /**抽取次数 */
        get: function () {
            return this.lotterynum ? this.lotterynum : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteVo.prototype, "curStep", {
        get: function () {
            // let progress = this.cfg.progress;
            // for (let i = 0; i < progress.length; i++) {
            // 	const element = progress[i];
            // 	if(this.lotterynum >= element.needNum){
            // 		continue;
            // 	}else{
            // 		return i;
            // 	}	
            // }
            // return progress.length;
            var maxDrawNum = this.cfg.progressList[this.cfg.progressList.length - 1]["need"];
            return this.lotterynum / maxDrawNum;
        },
        enumerable: true,
        configurable: true
    });
    AcKiteVo.prototype.isHaveBoxRedDot = function () {
        var boxCfg = this.cfg.progressList;
        for (var index = 0; index < boxCfg.length; index++) {
            var rStatus = this.getBoxStatusByIndex(boxCfg[index].id);
            if (rStatus == 2) {
                return true;
            }
        }
        return false;
    };
    /**
     * 任务奖励红点
     */
    AcKiteVo.prototype.isHaveTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        var tasklist = cfg.getTaskList();
        for (var i = 0; i < tasklist.length; i++) {
            if (!this.getTaskStatus(tasklist[i].id) && this.getTaskNum(String(tasklist[i].questType)) >= tasklist[i].value) {
                return true;
            }
        }
        return false;
    };
    /**
     * 任务类型的进度
     */
    AcKiteVo.prototype.getTaskNum = function (type) {
        return this.taskinfo[type] ? this.taskinfo[type] : 0;
    };
    /**
     * 任务的状态
     */
    AcKiteVo.prototype.getTaskStatus = function (taskId) {
        return this.flags[taskId] && this.flags[taskId] == 1 ? true : false;
    };
    /**
     * 获得Task列表
     */
    AcKiteVo.prototype.getSortTask = function () {
        var baseTaskData = this.cfg.getTaskList();
        var taskLength = baseTaskData.length;
        var arr = [];
        for (var i = 0; i < baseTaskData.length; i++) {
            if (this.getTaskStatus(baseTaskData[i].id)) {
                baseTaskData[i].sortId = taskLength + Number(baseTaskData[i].id);
            }
            else if (this.getTaskNum(baseTaskData[i].questType) >= baseTaskData[i].value) {
                baseTaskData[i].sortId = (Number(baseTaskData[i].id)) - taskLength - 1;
            }
            else {
                baseTaskData[i].sortId = Number(baseTaskData[i].id);
            }
            arr.push(baseTaskData[i]);
        }
        arr.sort(function (a, b) { return a.sortId - b.sortId; });
        return arr;
    };
    /**
     * 进度配置
     */
    AcKiteVo.prototype.getSortProcessCfg = function () {
        var data = [];
        var dataList = this.cfg.progressList;
        var sepIndex = 5;
        var sepNeed = dataList[sepIndex - 1].need;
        var len = dataList.length;
        // if (this.lotterynum < sepNeed){
        // 	len = 5;
        // }
        for (var i = 0; i < len; i++) {
            var status_1 = this.getBoxStatusByIndex(dataList[i].id);
            if (status_1 == 3) {
                dataList[i].sortId = dataList.length + Number(dataList[i].id);
            }
            else if (status_1 == 2) {
                dataList[i].sortId = Number(dataList[i].id) - dataList.length;
            }
            else {
                dataList[i].sortId = Number(dataList[i].id);
            }
            data.push(dataList[i]);
        }
        data.sort(function (a, b) { return a.sortId - b.sortId; });
        return data;
    };
    AcKiteVo.prototype.isSecondProcess = function () {
        var dataList = this.cfg.progressList;
        var sepIndex = 5;
        var sepNeed = dataList[sepIndex - 1].need;
        if (this.lotterynum >= sepNeed) {
            return true;
        }
        return false;
    };
    AcKiteVo.prototype.isSecondProcessRed = function () {
        var data = this.cfg.progressList;
        for (var i = 5; i < data.length; i++) {
            var rStatus = this.getBoxStatusByIndex(data[i].id);
            if (rStatus == 2) {
                return true;
            }
        }
        return false;
    };
    AcKiteVo.prototype.getCurrRedProcessId = function () {
        var data = this.cfg.progressList;
        for (var i = 0; i < data.length; i++) {
            var rStatus = this.getBoxStatusByIndex(data[i].id);
            if (rStatus == 2) {
                return data[i].id;
            }
            else if (rStatus == 1) {
                return data[i].id;
            }
        }
        return 1;
    };
    // 1->宝箱不可领取 ,2->可以领取宝箱, 3->已经打开宝箱
    AcKiteVo.prototype.getBoxStatusByIndex = function (id) {
        if (this.stageinfo[id]) {
            return 3;
        }
        else {
            var need = 0;
            var data = this.cfg.progressList;
            for (var i = 0; i < data.length; i++) {
                if (String(data[i].id) == String(id)) {
                    need = data[i].need;
                    break;
                }
            }
            if (this.lotterynum >= need) {
                return 2;
            }
            else {
                return 1;
            }
        }
    };
    Object.defineProperty(AcKiteVo.prototype, "progressPercent", {
        // public setRankInfo(data:any){
        // 	this.rankInfo = {
        // 		myrank:data.myrank,
        // 		rankList:data.rankList
        // 	}
        // }
        get: function () {
            var data = this.cfg.getProgressList();
            var index = 4;
            var max = data[index].need;
            // return Math.min(1,this.lotterynum/this.cfg.getMaxBoxNeedNum());
            return Math.min(1, this.lotterynum / max);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.isHaveBoxRedDot() || this.isHaveTaskRedDot()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcKiteVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * (this.cfg.extraTime || 0);
    };
    Object.defineProperty(AcKiteVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - (this.config.extraTime || 0) * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return LanguageManager.getlocal("acKiteTimeCountDown", [App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1)]);
        },
        enumerable: true,
        configurable: true
    });
    return AcKiteVo;
}(AcBaseVo));
__reflect(AcKiteVo.prototype, "AcKiteVo");
//# sourceMappingURL=AcKiteVo.js.map