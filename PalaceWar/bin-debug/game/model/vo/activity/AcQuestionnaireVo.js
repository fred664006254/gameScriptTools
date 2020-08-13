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
var AcQuestionnaireVo = (function (_super) {
    __extends(AcQuestionnaireVo, _super);
    function AcQuestionnaireVo() {
        var _this = _super.call(this) || this;
        _this._answerInfo = {};
        _this._flag = 0;
        return _this;
    }
    AcQuestionnaireVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this._flag = data.flag;
    };
    Object.defineProperty(AcQuestionnaireVo.prototype, "isShowIcon", {
        /**
         * 是否显示活动icon，设置后自动显示或者隐藏活动
         */
        get: function () {
            return this._flag !== 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionnaireVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionnaireVo.prototype, "isShowRedDot", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionnaireVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcQuestionnaireVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcQuestionnaireVo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    AcQuestionnaireVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    AcQuestionnaireVo.prototype.setQuestionAnswer = function (id, answer) {
        if (this._answerInfo) {
            this._answerInfo[id] = answer;
        }
    };
    AcQuestionnaireVo.prototype.getQuestionAnswer = function (id) {
        var answer = '';
        if (this._answerInfo && this._answerInfo[id]) {
            answer = this._answerInfo[id];
        }
        return answer;
    };
    AcQuestionnaireVo.prototype.dispose = function () {
        this._answerInfo = {};
        _super.prototype.dispose.call(this);
    };
    return AcQuestionnaireVo;
}(AcBaseVo));
__reflect(AcQuestionnaireVo.prototype, "AcQuestionnaireVo");
//# sourceMappingURL=AcQuestionnaireVo.js.map