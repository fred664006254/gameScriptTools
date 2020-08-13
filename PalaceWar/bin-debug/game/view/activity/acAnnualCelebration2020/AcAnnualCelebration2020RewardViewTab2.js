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
var AcAnnualCelebration2020RewardViewTab2 = (function (_super) {
    __extends(AcAnnualCelebration2020RewardViewTab2, _super);
    function AcAnnualCelebration2020RewardViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcAnnualCelebration2020RewardViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020RewardViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020RewardViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020RewardViewTab2.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcAnnualCelebration2020View');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020RewardViewTab2.prototype, "uicode", {
        get: function () {
            return this.uiCode;
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualCelebration2020RewardViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020GETTASK), this.useCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.restList, this);
        var bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = GameConfig.stageHeigth - 169;
        bottomBg2.width = GameConfig.stageWidth - 32;
        bottomBg2.x = GameConfig.stageWidth / 2 - bottomBg2.width / 2;
        bottomBg2.y = 10;
        // this.addChild(bottomBg2);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomBg2.height - 10);
        var newArr = this.getArr();
        var scrollList = ComponentManager.getScrollList(AcAnnualCelebration2020TaskScrollItem, newArr, rect, { aid: this.aid, code: this.code, uicode: this.uicode });
        scrollList.x = 5;
        scrollList.y = 5 + bottomBg2.y;
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcAnnualCelebration2020RewardViewTab2.prototype.restList = function () {
        var newarr = this.getArr();
        this._scrollList.refreshData(newarr, { aid: this.aid, code: this.code, uicode: this.uicode });
    };
    // private getArr():Array<any>
    // {
    // 	let taskTab = this.cfg.task[0];
    //     let keys = Object.keys(taskTab); 
    // 	let arr1 =[];
    // 	let arr2 =[];
    //     let arr3=[];
    // 	for(var i in keys)
    // 	{
    //         var currTask = taskTab[keys[i]]; 
    // 		var  taskNum=this.vo.getTaskNum(currTask.id);
    // 		if(!this.vo.getTaskFlag(currTask.id) )
    // 		{
    // 			arr1.push(currTask);
    // 		}
    //         else
    // 		{
    // 			if(taskNum>=currTask.value)
    // 			{
    // 				arr2.push(currTask);
    // 			}
    // 			else
    // 			{
    // 				arr3.push(currTask);
    // 			} 
    // 		}
    // 	}  
    // 	return arr2.concat(arr3).concat(arr1); 
    // }
    AcAnnualCelebration2020RewardViewTab2.prototype.getArr = function () {
        var view = this;
        var arr = [];
        var task = view.cfg.task;
        for (var i in task) {
            var unit = task[i];
            var id = Number(i);
            var keys = Object.keys(unit);
            var length_1 = keys.length;
            if (id == 2) {
                if (length_1 > this.vo.getAcContinueDays()) {
                    length_1 = this.vo.getAcContinueDays();
                }
            }
            for (var j = 0; j < length_1; j++) {
                var tmp = unit[keys[j]];
                var tasknum = view.vo.getTaskNum(j + 1, id + 1);
                var canget = view.vo.getTaskFlag(j + 1, id + 1);
                tmp.id1 = id + 1;
                tmp.id2 = j + 1;
                if (!canget && Number(j) == (length_1 - 1)) {
                    arr.push(tmp);
                    break;
                }
                if (canget) {
                    arr.push(tmp);
                    break;
                }
            }
        }
        return arr;
    };
    AcAnnualCelebration2020RewardViewTab2.prototype.useCallback = function (event) {
        if (event.data.ret) {
            var rewards = "";
            rewards = this.vo.tmpReward;
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards));
        }
    };
    AcAnnualCelebration2020RewardViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020GETTASK), this.useCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.restList, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcAnnualCelebration2020RewardViewTab2;
}(AcCommonViewTab));
__reflect(AcAnnualCelebration2020RewardViewTab2.prototype, "AcAnnualCelebration2020RewardViewTab2");
//# sourceMappingURL=AcAnnualCelebration2020RewardViewTab2.js.map