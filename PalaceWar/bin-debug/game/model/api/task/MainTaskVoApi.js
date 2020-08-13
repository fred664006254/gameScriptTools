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
 * 主线任务api
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskVoApi
 */
var MainTaskVoApi = (function (_super) {
    __extends(MainTaskVoApi, _super);
    function MainTaskVoApi() {
        var _this = _super.call(this) || this;
        _this._isGoExcuting = false;
        _this._goExcutingUiName = "";
        _this._isKeepGuide = false;
        return _this;
    }
    MainTaskVoApi.prototype.getCurMainTaskId = function () {
        return this.mainTaskVo.taskId;
    };
    MainTaskVoApi.prototype.getCurMainTaskValue = function () {
        return this.mainTaskVo.value;
    };
    MainTaskVoApi.prototype.getCurTaskNameAndDescTxt = function () {
        // taskId ="105001";
        var taskId = this.getCurMainTaskId();
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        var questType = taskCfg.questType;
        var resultStr = [];
        var tmpNameTxt = undefined;
        var tmpDescTxt = undefined;
        if (questType == 201) {
            var servantName = LanguageManager.getlocal("servant_name" + taskCfg.need);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType, [servantName]);
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [servantName, String(taskCfg.value)]);
        }
        else if (questType == 105) {
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [LanguageManager.getlocal("officialTitle" + taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 202) {
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [String(taskCfg.need), String(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 206) {
            var clvStr = LanguageManager.getlocal("servant_clvStr" + taskCfg.need);
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [String(taskCfg.value), clvStr]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 106) {
            var bcid = Math.floor((taskCfg.value - 1) / 41) + 1;
            var chaellageName = LanguageManager.getlocal("challengeTitle" + bcid);
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [String(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType, [chaellageName]);
        }
        else {
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [String(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        resultStr.push(tmpNameTxt);
        resultStr.push(tmpDescTxt);
        return resultStr;
    };
    MainTaskVoApi.prototype.isCurTaskReach = function () {
        var taskId = this.getCurMainTaskId();
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        if (this.getCurMainTaskValue() >= taskCfg.value) {
            return true;
        }
        return false;
    };
    MainTaskVoApi.prototype.checkShowGuide = function (uiName, param) {
        if (Api.rookieVoApi.isInGuiding) {
            return;
        }
        if (this._isGoExcuting) {
            var taskId = this.getCurMainTaskId();
            var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
            if (uiName && taskCfg.questType == 301) {
                return;
            }
            //方案1
            if (!this._isKeepGuide) {
                this.isGoExcuting = false;
            }
            MainTaskGuideNode.getInstance().show(uiName);
            if (uiName && this._isKeepGuide) {
                MainTaskGuideNode.getInstance().resetUIPos(uiName);
            }
            //方案2
            // MainTaskGuideNode.showGuideInstance(uiName);
        }
    };
    MainTaskVoApi.prototype.hideGuide = function () {
        if (!MainTaskGuideNode.hasInstance()) {
            this.isGoExcuting = false;
            this._isKeepGuide = false;
            this._goExcutingUiName = "";
            return;
        }
        //方案1
        this._goExcutingUiName = "";
        if (this._isKeepGuide) {
            MainTaskGuideNode.getInstance().resetUIPos();
        }
        else {
            this.isGoExcuting = false;
            MainTaskGuideNode.hideInstance();
        }
        //方案2
        // MainTaskGuideNode.hideGuideInstance();
    };
    Object.defineProperty(MainTaskVoApi.prototype, "goExcutingUiName", {
        set: function (name) {
            this._goExcutingUiName = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainTaskVoApi.prototype, "isGoExcuting", {
        set: function (isV) {
            this._isGoExcuting = isV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainTaskVoApi.prototype, "isKeepGuide", {
        set: function (isV) {
            this._isKeepGuide = isV;
        },
        enumerable: true,
        configurable: true
    });
    return MainTaskVoApi;
}(BaseVoApi));
__reflect(MainTaskVoApi.prototype, "MainTaskVoApi");
//# sourceMappingURL=MainTaskVoApi.js.map