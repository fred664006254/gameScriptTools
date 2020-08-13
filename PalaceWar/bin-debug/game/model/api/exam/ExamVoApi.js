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
 * 科举答题api
 * author yangchengguo
 * date 2019.7.22
 * @class ExamVoApi
 */
var ExamVoApi = (function (_super) {
    __extends(ExamVoApi, _super);
    function ExamVoApi() {
        return _super.call(this) || this;
    }
    ExamVoApi.prototype.formatData = function (data) {
        if (this.examVo == null) {
            this.examVo = new ExamVo();
        }
        this.examVo.initData(data);
        _super.prototype.formatData.call(this, data);
    };
    Object.defineProperty(ExamVoApi.prototype, "cfg", {
        /**科举答题配置 */
        get: function () {
            return Config.ExamCfg;
        },
        enumerable: true,
        configurable: true
    });
    ExamVoApi.prototype.getVersion = function () {
        return this.examVo.version;
    };
    ExamVoApi.prototype.getSaturdayOtime = function () {
        var currTime = App.DateUtil.getWeeTs(GameData.serverTime);
        if (this.getWeekend() == 0) {
            currTime -= 86400;
        }
        return currTime;
    };
    /**答题信息 */
    ExamVoApi.prototype.getExamPhaseByDay = function (day) {
        // return this.cfg.formatExamPhase();
        var allExamInfo = this.cfg.phase;
        var examPhase = null;
        var key;
        for (var k in allExamInfo) {
            if (allExamInfo[k].day == day) {
                examPhase = allExamInfo[k];
                break;
            }
        }
        if (examPhase) {
            return examPhase;
        }
        return null;
    };
    /**答题类型  0 会试 1 殿试*/
    ExamVoApi.prototype.getExamTypeByDay = function (day) {
        var allExamInfo = this.cfg.phase;
        for (var k in allExamInfo) {
            if (allExamInfo[k].day == day) {
                return Number(k);
            }
        }
    };
    /**获取总分数 */
    ExamVoApi.prototype.getScore = function () {
        return this.examVo.score;
    };
    /**获取答题时间 */
    ExamVoApi.prototype.getReplytime = function () {
        return this.examVo.replytime;
    };
    /**题目信息 */
    ExamVoApi.prototype.getExamProblemByExamType = function (type) {
        var allProblems = [];
        for (var key in this.examVo.phase) {
            allProblems[key] = [];
            var currProblem = this.examVo.phase[Number(key)];
            for (var k in currProblem) {
                allProblems[key].push(currProblem[Number(k)]);
            }
        }
        return allProblems[type];
    };
    /**判断是否为周六或者周日 */
    ExamVoApi.prototype.isWeekend = function () {
        var currDate = App.DateUtil.getServerDate();
        var day = currDate.getDay();
        if (day == 6 || day == 0) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ExamVoApi.prototype, "answeredProblem", {
        /**回答过的题目信息 */
        get: function () {
            return this.examVo.phase;
        },
        enumerable: true,
        configurable: true
    });
    /**回答的问题是否正确 */
    ExamVoApi.prototype.getRightScoreByProblem = function (type, problemNum) {
        var currPhase = this.answeredProblem[type];
        for (var key in currPhase) {
            if (Number(key) == problemNum && currPhase[key][3] > 0) {
                return currPhase[key][1];
            }
        }
        return 0;
    };
    /** 本轮总积分 答对题的数目 */
    ExamVoApi.prototype.getRightAnswerData = function (type) {
        var currPhase = this.answeredProblem[type];
        var rigthNum = 0;
        var score = 0;
        for (var key in currPhase) {
            if (currPhase[key][1] > 0 && currPhase[key][3] > 0) {
                score += currPhase[key][1];
                rigthNum++;
            }
        }
        return { score: score, rightNum: rigthNum };
    };
    /**获取正确答案的id */
    ExamVoApi.prototype.getRightAnswerIdByProblemNum = function (problemNum) {
        for (var key in this.cfg.questionBank) {
            if (Number(key) + 1 == problemNum) {
                return this.cfg.questionBank[Number(key)].rightAnswer;
            }
        }
    };
    /**当前考试是否已结束 */
    ExamVoApi.prototype.isFinishExamByDay = function (day) {
        var type = Api.examVoApi.getExamTypeByDay(day);
        if (this.examVo.examNum[String(type)] != 0) {
            return true;
        }
        return false;
    };
    /**获取活动总的开启结束时间 */
    ExamVoApi.prototype.getStartAndEndTime = function () {
        var currTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var stTime = currTime;
        var etTime = currTime;
        if (this.getWeekend() == 0) {
            stTime -= 86400;
        }
        else if (this.getWeekend() == 6) {
            etTime = etTime + 86400;
        }
        var sunTime = this.getExamPhaseByDay(0).time;
        var hour = App.DateUtil.formatSvrHourByLocalTimeZone(sunTime[1] / 3600).hour;
        etTime += hour * 3600;
        var stStr = App.DateUtil.getFormatBySecond(stTime, 10);
        var etStr = App.DateUtil.getFormatBySecond(etTime, 10);
        return { st: stStr, et: etStr };
    };
    /**获取当前是周几 */
    ExamVoApi.prototype.getWeekend = function () {
        var currDate = App.DateUtil.getServerDate();
        return currDate.getDay();
    };
    /**截止时间戳 不包含展示期*/
    ExamVoApi.prototype.getEndTimeByDay = function (day) {
        var examInfo = this.getExamPhaseByDay(day);
        var endTime = examInfo.time[1];
        var currTime = App.DateUtil.getWeeTs(GameData.serverTime);
        if (day == 0) {
            if (this.getWeekend() == 6) {
                return currTime + endTime + 86400;
            }
        }
        else {
            if (this.getWeekend() == 0) {
                return 0;
            }
        }
        return currTime + endTime;
    };
    /**开始时间戳 */
    ExamVoApi.prototype.getStartTimeByDay = function (day) {
        var examInfo = this.getExamPhaseByDay(day);
        var stTime = examInfo.time[0];
        var currTime = App.DateUtil.getWeeTs(GameData.serverTime);
        if (this.getWeekend() == 6 && day == 0) {
            return currTime + stTime + 86400;
        }
        return currTime + stTime;
    };
    /**距离活动开启剩余时间 */
    ExamVoApi.prototype.getStartTimeCountDownByDay = function (day) {
        var stTime = this.getStartTimeByDay(day);
        var delta = stTime - GameData.serverTime;
        if (delta <= 0) {
            return null;
        }
        return App.DateUtil.getFormatBySecond(delta, 1);
    };
    /**活动结束时间倒计时 */
    ExamVoApi.prototype.getEndTimeCountDownByDay = function (day) {
        var delta = this.getEndTimeByDay(day) - GameData.serverTime;
        if (delta <= 0) {
            return LanguageManager.getlocal("examinationTimeEndStr");
        }
        return App.DateUtil.getFormatBySecond(delta, 1);
    };
    /** 格式化显示时间 */
    ExamVoApi.prototype.getFormatTime = function (time) {
        var currSt = App.DateUtil.getWeeTs(GameData.serverTime);
        var hour = App.DateUtil.formatSvrHourByLocalTimeZone(time / 3600).hour;
        return App.DateUtil.getFormatBySecond(currSt + hour * 3600, 12);
    };
    /**是否在活动期间 */
    ExamVoApi.prototype.isInPeriod = function () {
        if (!this.isWeekend()) {
            return false;
        }
        var currSt = App.DateUtil.getWeeTs(GameData.serverTime);
        var endTime = 0;
        if (this.getWeekend() == 6) {
            endTime = currSt + this.cfg.showTime;
        }
        else if (this.getWeekend() == 0) {
            endTime = currSt + 86400;
        }
        if (endTime > GameData.serverTime) {
            return true;
        }
        return false;
    };
    /**活动版本是否一致 */
    ExamVoApi.prototype.isInVersion = function () {
        if (this.getVersion() == this.getSaturdayOtime()) {
            return true;
        }
        return false;
    };
    /**某天的活动是否正在进行中 */
    ExamVoApi.prototype.isInShow = function (day) {
        var time0 = App.DateUtil.getWeeTs(GameData.serverTime);
        if (this.getWeekend() == day) {
            var examInfo = this.getExamPhaseByDay(day);
            if (examInfo.time[0] + time0 < GameData.serverTime && examInfo.time[1] + time0 > GameData.serverTime) {
                return true;
            }
        }
        return false;
    };
    /**是否显示小红点 */
    ExamVoApi.prototype.isShowRedDot = function () {
        if (this.isInShow(6) == true && !this.isFinishExamByDay(6)) {
            return true;
        }
        else if (this.isInShow(0) == true && !this.isFinishExamByDay(0)) {
            return true;
        }
        return false;
    };
    /**获取答案随机位置数 */
    ExamVoApi.prototype.getAnswerRandPos = function () {
        var arr = [1, 2, 3, 4];
        var newArr = [];
        var k = 0;
        while (k < arr.length) {
            var rand = Math.floor(Math.random() * 10) % 4;
            if (arr[rand] > 0) {
                newArr[k] = arr[rand];
                arr[rand] = 0;
                k++;
            }
        }
        return newArr;
    };
    /**获取当前是周几 */
    ExamVoApi.prototype.getWeekendByType = function (type) {
        var allExamInfo = this.cfg.phase;
        for (var k in allExamInfo) {
            if (k == String(type)) {
                return allExamInfo[k].day;
            }
        }
    };
    /**获取活动总的结束时间 */
    ExamVoApi.prototype.getExamEndTime = function () {
        var currTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var time = 0;
        if (this.getWeekend() == 0) {
            time = currTime + 86400;
        }
        else if (this.getWeekend() == 6) {
            time = currTime + 86400 * 2;
        }
        return time;
    };
    ExamVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ExamVoApi;
}(BaseVoApi));
__reflect(ExamVoApi.prototype, "ExamVoApi");
//# sourceMappingURL=ExamVoApi.js.map