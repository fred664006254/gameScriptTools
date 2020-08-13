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
var AcMonopolyVo = (function (_super) {
    __extends(AcMonopolyVo, _super);
    function AcMonopolyVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.v = 0; //"大富翁活动 玩家充值元宝数",
        _this.dicenum = 0; //"大富翁活动 玩家可投掷次数",
        _this.position = 1; //"大富翁活动 玩家现在位置",
        _this.usenum = 0; //"大富翁活动 玩家已投掷次数",
        _this.theturn = 0; //"大富翁活动 玩家当前轮次",
        _this.rangeacct = 0; // "大富翁活动 区间累计数（几率控制用）",
        _this.rangenum = 0; // "大富翁活动 区间投掷数（几率控制用）",
        _this.positionarr = []; // = "大富翁活动 第几轮 位置数组信息{x,x,...,x} 该轮踩过位置数组",
        _this.tinfo = []; // "大富翁活动 第几天 任务信息{task = {}, flags = {}} task各个任务类型的进度 flags各个任务奖励的领取标识",
        _this.turnflag = []; //"大富翁活动 轮次奖励领取标识",
        return _this;
    }
    AcMonopolyVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        var isrefreshTaskList = false;
        // let dtask = data.tinfo[this.diffDay].task || {};
        // for (let key in dtask) {
        // 	if (dtask.hasOwnProperty(key)) {
        // 		let element = dtask[key];
        // 		let mytask = this.tinfo[this.diffDay].task[key];
        // 		if(!mytask || mytask!=element){
        // 			isrefreshTaskList = true;
        // 			break;
        // 		}
        // 	}
        // }
        this.v = data.v;
        this.dicenum = data.dicenum;
        this.position = data.position;
        this.usenum = data.usenum;
        this.theturn = data.theturn;
        this.rangeacct = data.rangeacct;
        this.tinfo = data.tinfo;
        this.rangenum = data.rangenum;
        this.positionarr = data.positionarr;
        this.turnflag = data.turnflag;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH);
        // if(isrefreshTaskList){
        // 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MONOPOLY_TASKLIST_REFRESH);
        // }
    };
    Object.defineProperty(AcMonopolyVo.prototype, "diffDay", {
        get: function () {
            var starday = App.DateUtil.getWeeTs(this.st);
            return Math.ceil((GameData.serverTime - starday) / 86400);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务的状态
     */
    AcMonopolyVo.prototype.getTaskStatus = function (id) {
        if (!this.tinfo || !this.tinfo[this.diffDay] || !this.tinfo[this.diffDay].flags || !this.tinfo[this.diffDay].flags[id]) {
            return false;
        }
        return this.tinfo[this.diffDay].flags[id] && this.tinfo[this.diffDay].flags[id] == 1 ? true : false;
    };
    /**
 * 任务类型的进度
 */
    AcMonopolyVo.prototype.gettTaskNum = function (type) {
        if (!this.tinfo || !this.tinfo[this.diffDay] || !this.tinfo[this.diffDay].task || !this.tinfo[this.diffDay].task[type]) {
            return 0;
        }
        return this.tinfo[this.diffDay].task[type] ? this.tinfo[this.diffDay].task[type] : 0;
    };
    AcMonopolyVo.prototype.getTurnFlag = function (turn) {
        return this.turnflag && this.turnflag["" + turn];
    };
    AcMonopolyVo.prototype.isTurnRewardCollectEnable = function (turn) {
        if (turn < this.theturn && !this.turnflag["" + turn]) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcMonopolyVo.prototype, "isShowRedDot", {
        get: function () {
            return this.dicenum > 0 || this.isShowTaskRed() || this.isShowRewardRed();
        },
        enumerable: true,
        configurable: true
    });
    AcMonopolyVo.prototype.isShowTaskRed = function () {
        var cfg = this.config;
        var task = cfg.task;
        for (var index = 0; index < task.length; index++) {
            // var element = task[index];
            var element = task[index];
            var openType = element.openType;
            var taskNum = this.gettTaskNum("" + element.questType);
            if (taskNum >= element.value && !this.getTaskStatus("" + (index + 1))) {
                return true;
            }
        }
        return false;
    };
    AcMonopolyVo.prototype.isShowRewardRed = function () {
        var cfg = this.config;
        var turnReward = cfg.turnReward;
        for (var key in turnReward) {
            if (turnReward.hasOwnProperty(key) && this.isTurnRewardCollectEnable(turnReward[key].id)) {
                return true;
            }
        }
        return false;
    };
    AcMonopolyVo.prototype.dispose = function () {
        this.v = 0;
        this.dicenum = null;
        this.position = null;
        this.usenum = null;
        this.theturn = null;
        this.rangeacct = null;
        this.rangeacct = null;
        this.rangenum = null;
        this.positionarr = null;
        this.turnflag = [];
        _super.prototype.dispose.call(this);
    };
    return AcMonopolyVo;
}(AcBaseVo));
__reflect(AcMonopolyVo.prototype, "AcMonopolyVo");
