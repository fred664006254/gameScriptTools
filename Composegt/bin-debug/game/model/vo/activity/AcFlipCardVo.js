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
var AcFlipCardVo = (function (_super) {
    __extends(AcFlipCardVo, _super);
    function AcFlipCardVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cardinfo = [];
        _this.lotterynum = 0;
        _this.taskinfo = {};
        _this.stageinfo = {};
        _this.flags = {};
        _this.lastday = 0;
        return _this;
    }
    AcFlipCardVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        var isRefreshTask = false;
        for (var key in data.taskinfo) {
            if (data.taskinfo.hasOwnProperty(key)) {
                var element = data.taskinfo[key];
                if (!this.taskinfo[key] || !this.taskinfo[key] != element) {
                    isRefreshTask = true;
                }
            }
        }
        this.cardinfo = data.cardinfo;
        this.lotterynum = data.lotterynum;
        this.taskinfo = data.taskinfo;
        this.stageinfo = data.stageinfo;
        this.flags = data.flags;
        this.lastday = data.lastday;
        if (isRefreshTask) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FLIPCARD_TASK_REFRESH);
        }
    };
    /**
     * 任务的状态
     */
    AcFlipCardVo.prototype.getTaskStatus = function (id) {
        if (!this.flags || !this.flags[id]) {
            return false;
        }
        return this.flags[id] && this.flags[id] == 1 ? true : false;
    };
    /**
 * 任务类型的进度
 */
    AcFlipCardVo.prototype.gettTaskNum = function (type) {
        if (!this.taskinfo || !this.taskinfo[type]) {
            return 0;
        }
        return this.taskinfo[type] ? this.taskinfo[type] : 0;
    };
    //翻一次价格
    AcFlipCardVo.prototype.getFlipPrice = function () {
        var len = this.getFlipNums();
        return this.config.costRange[len] || 0;
    };
    //一键价格
    AcFlipCardVo.prototype.getBatchFlipPrice = function () {
        var len = this.getFlipNums();
        var costRange = this.config.costRange;
        var price = 0;
        for (var index = len; index < 6; index++) {
            price += costRange[index];
        }
        return price;
    };
    AcFlipCardVo.prototype.isFlipEnable = function () {
        var len = this.getFlipNums();
        return len < 6;
        // for (var key in this.cardinfo) {
        // 	if (this.cardinfo.hasOwnProperty(key)) {
        // 		var element = this.cardinfo[key];
        // 		if(element.get == 0)
        // 		{
        // 			return true;
        // 		}
        // 	}
        // }
        // return false
    };
    AcFlipCardVo.prototype.isCardReset = function () {
        return this.getFlipNums() == 0;
    };
    AcFlipCardVo.prototype.getFlipNums = function () {
        var num = 0;
        for (var key in this.cardinfo) {
            if (this.cardinfo.hasOwnProperty(key)) {
                var element = this.cardinfo[key];
                if (element.get == 1) {
                    num++;
                }
            }
        }
        return num;
    };
    AcFlipCardVo.prototype.getCurSelectCardIdx = function () {
        var num = 1;
        var keys = Object.keys(this.cardinfo);
        for (var index = 0; index < keys.length; index++) {
            var key = keys[index];
            if (this.cardinfo.hasOwnProperty(key)) {
                var element = this.cardinfo[key];
                if (element.get == 0) {
                    num = Number(key);
                    break;
                }
            }
        }
        return num;
    };
    AcFlipCardVo.prototype.isCardFliped = function (index) {
        return this.cardinfo[index].get == 1;
    };
    AcFlipCardVo.prototype.getCardType = function (index) {
        return this.cardinfo[index].ctype;
    };
    AcFlipCardVo.prototype.getCardReward = function (index) {
        return this.cardinfo[index].rewards || null;
    };
    AcFlipCardVo.prototype.getStageinfo = function (stage) {
        return this.stageinfo[stage] || 0;
    };
    Object.defineProperty(AcFlipCardVo.prototype, "isShowRedDot", {
        get: function () {
            var lotterynum = this.lotterynum;
            var cfg = this.config;
            var ReviewNum = cfg.ReviewNum;
            for (var index = 1; index <= ReviewNum.length; index++) {
                var stage = this.getStageinfo(index);
                if (stage == 0 && ReviewNum[index - 1].needNum <= lotterynum) {
                    return true;
                }
            }
            return this.isShowTaskRed();
        },
        enumerable: true,
        configurable: true
    });
    AcFlipCardVo.prototype.isShowTaskRed = function () {
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
    AcFlipCardVo.prototype.dispose = function () {
        this.cardinfo = [];
        this.lotterynum = 0;
        this.taskinfo = 0;
        this.stageinfo = [];
        this.flags = null;
        this.lastday = null;
        _super.prototype.dispose.call(this);
    };
    return AcFlipCardVo;
}(AcBaseVo));
__reflect(AcFlipCardVo.prototype, "AcFlipCardVo");
