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
var AcCommonView = (function (_super) {
    __extends(AcCommonView, _super);
    function AcCommonView() {
        var _this = _super.call(this) || this;
        _this.aid = App.StringUtil.firstCharToLower(_this.getClassName().replace("Ac", "").replace("View", ""));
        return _this;
    }
    AcCommonView.prototype.getUiCode = function () {
        return this.code;
    };
    AcCommonView.prototype.getResourceList = function () {
        var resArr = [];
        if (this.code && ResourceManager.hasRes(String(this.aid).toLowerCase() + this.code)) {
            resArr.push(String(this.aid).toLowerCase() + this.code);
        }
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    Object.defineProperty(AcCommonView.prototype, "code", {
        get: function () {
            if (this.param && this.param.data) {
                return this.param.data;
            }
            else {
                return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    //根据资源名字得到完整资源名字
    AcCommonView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcCommonView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    Object.defineProperty(AcCommonView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //概率展示
    AcCommonView.prototype.getProbInfo = function () {
        if (!Api.switchVoApi.checkOpenProbInfo()) {
            return "";
        }
        var probStr = this.getClassName().toLowerCase().replace("view", "") + "ProbInfo" + this.code;
        if (LanguageManager.checkHasKey(probStr)) {
            return probStr;
        }
        else {
        }
        return "";
    };
    // 规则说明内容
    AcCommonView.prototype.getRuleInfo = function () {
        var acRuleStr = this.getClassName().toLowerCase().replace("view", "") + "RuleInfo" + this.code;
        var ruleStr = this.getClassName().toLowerCase().replace("view", "") + "RuleInfo";
        if (LanguageManager.checkHasKey(acRuleStr)) {
            return acRuleStr;
        }
        else if (LanguageManager.checkHasKey(ruleStr)) {
            return ruleStr;
        }
        else {
        }
        return "";
    };
    AcCommonView.prototype.getTitleStr = function () {
        return "ac" + App.StringUtil.firstCharToUper(this.acVo.aidAndCode) + "_Title";
    };
    AcCommonView.prototype.getTitleParams = function () {
        return null;
    };
    return AcCommonView;
}(CommonView));
__reflect(AcCommonView.prototype, "AcCommonView");
