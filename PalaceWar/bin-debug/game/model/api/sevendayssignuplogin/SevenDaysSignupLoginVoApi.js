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
 * 七日好礼api
 * @author 张朝阳
 * date 2019/3/22
 * @class SevenDaysSignupLoginVoApi
 */
var SevenDaysSignupLoginVoApi = (function (_super) {
    __extends(SevenDaysSignupLoginVoApi, _super);
    function SevenDaysSignupLoginVoApi() {
        var _this = _super.call(this) || this;
        /**
         * 新号的信息
         */
        _this.info = null;
        /**新号的标示 */
        _this.newer = 0;
        _this.signUp3Flag = null;
        _this.init_flag = 0;
        return _this;
    }
    SevenDaysSignupLoginVoApi.prototype.formatData = function (data) {
        this.info = data.info;
        this.newer = data.newer;
        this.init_flag = data.init_flag;
        this.signUp3Flag = data.info.signUp3Flag;
    };
    /**活动时间是否已结束 */
    SevenDaysSignupLoginVoApi.prototype.checkTimeEnd = function () {
        if (this.info && this.info.et <= GameData.serverTime) {
            return true;
        }
        return false;
    };
    /**任务的排序id */
    SevenDaysSignupLoginVoApi.prototype.getSortTask = function (day) {
        var cfg = Config.SevendayssignupCfg.getTaskCfgById(String(day));
        var taskData = cfg;
        for (var i = 0; i < taskData.length; i++) {
            if (this.checkTaskReceive(Number(day), Number(taskData[i].id))) {
                taskData[i].sortId = taskData.length + Number(taskData[i].id);
                continue;
            }
            else if (this.checkTaskSuccess(Number(day), Number(taskData[i].id))) {
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
    /**是否显示小红点 */
    SevenDaysSignupLoginVoApi.prototype.checkShowRedDot = function () {
        if (this.checkLoginShowRedDot() || this.checkTaskShowRedDot() || this.checkReadShowRedDot()) {
            return true;
        }
        return false;
    };
    /**是否有任务的奖励显示红点 */
    SevenDaysSignupLoginVoApi.prototype.checkTaskShowRedDot = function () {
        if (this.info.diffday) {
            for (var i = 1; i <= this.info.diffday; i++) {
                if (this.checkSinfleTaskShowRedDot(i)) {
                    return true;
                }
            }
        }
        return false;
    };
    SevenDaysSignupLoginVoApi.prototype.checkSinfleTaskShowRedDot = function (index) {
        if (this.info.diffday && index <= this.info.diffday) {
            var taskCfg = Config.SevendayssignupCfg.getTaskCfgById(String(index));
            for (var key in taskCfg) {
                if (this.checkTaskSuccess(index, Number(taskCfg[key].id))) {
                    return true;
                }
            }
        }
        return false;
    };
    SevenDaysSignupLoginVoApi.prototype.checkReadShowRedDot = function () {
        if (this.info.diffday) {
            for (var i = 1; i <= this.info.diffday; i++) {
                if (this.checkSingleReadShowRedDot(i)) {
                    return true;
                }
            }
        }
        return false;
    };
    SevenDaysSignupLoginVoApi.prototype.checkSingleReadShowRedDot = function (index) {
        if (this.info.diffday && index <= this.info.diffday) {
            if (!this.checkReadReward(index)) {
                return true;
            }
        }
        return false;
    };
    /**是否有登陆的奖励显示红点 */
    SevenDaysSignupLoginVoApi.prototype.checkLoginShowRedDot = function () {
        if (this.info.diffday) {
            for (var i = 1; i <= this.info.diffday; i++) {
                if (this.checkSingleLoginShowRedDot(i)) {
                    return true;
                }
            }
        }
        return false;
    };
    /** 单个登陆奖励的红点显示*/
    SevenDaysSignupLoginVoApi.prototype.checkSingleLoginShowRedDot = function (index) {
        if (this.info.diffday && index <= this.info.diffday) {
            if ((this.checkLoginReward(index) == false && this.info.diffday >= index) || (this.checkVIPReward(index) == false && Api.playerVoApi.getPlayerVipLevel() >= Number(Config.SevendayssignupCfg.getSignUpCfgById(String(index)).needVip))) {
                return true;
            }
        }
        return false;
    };
    SevenDaysSignupLoginVoApi.prototype.isEnSp = function () {
        return PlatformManager.checkIsEnSp();
        // return true;
    };
    SevenDaysSignupLoginVoApi.prototype.checkShowFirView = function () {
        if (this.checkCreateMainIcon()) {
            if (this.isEnSp()) {
                if (this.info && this.info.diffday && this.info.diffday == 1) {
                    var value = LocalStorageManager.get("isShowSevenDaysSignUpFirShowView" + Api.playerVoApi.getPlayerID());
                    if (!value) {
                        Api.viewqueueVoApi.checkShowView(ViewConst.COMMON.SEVENDAYSSIGNUPFIRSHOWVIEW);
                    }
                }
            }
        }
    };
    /**当前的type */
    SevenDaysSignupLoginVoApi.prototype.nowType = function () {
        if (PlatformManager.checkIsRuSp()) {
            if (this.info.diffday && this.info.diffday <= 2) {
                return this.info.diffday;
            }
            return 7;
        }
        else if (this.isEnSp()) {
            if (this.info.diffday && this.info.diffday <= 2) {
                return this.info.diffday;
            }
            return 7;
        }
        else {
            if (this.info.diffday && this.info.diffday <= 2) {
                return 2;
            }
            return 7;
        }
    };
    /**当前天数  */
    SevenDaysSignupLoginVoApi.prototype.nowDay = function () {
        if (this.info.diffday && this.checkNewUserLoginThanSeven()) {
            return this.info.diffday;
        }
        return Config.SevendayssignupCfg.signUpItemCfgList.length;
    };
    /**任务的进度 */
    SevenDaysSignupLoginVoApi.prototype.taskValue = function (day, index) {
        if (this.info.taskinfo && this.info.taskinfo[day] && this.info.taskinfo[day][index] && this.info.taskinfo[day][index].v) {
            return this.info.taskinfo[day][index].v;
        }
        return 0;
    };
    /**任务是否已完成 */
    SevenDaysSignupLoginVoApi.prototype.checkTaskSuccess = function (day, index) {
        if (this.info.taskinfo && this.info.taskinfo[day] && this.info.taskinfo[day][index] && this.info.taskinfo[day][index].flag
            && this.info.taskinfo[day][index].flag == 1) {
            return true;
        }
        return false;
    };
    /**任务的进度 */
    SevenDaysSignupLoginVoApi.prototype.checkTaskReceive = function (day, index) {
        if (this.info.taskinfo && this.info.taskinfo[day] && this.info.taskinfo[day][index] && this.info.taskinfo[day][index].flag
            && this.info.taskinfo[day][index].flag == 2) {
            return true;
        }
        return false;
    };
    /**登陆奖励是否领取 */
    SevenDaysSignupLoginVoApi.prototype.checkLoginReward = function (index) {
        if (this.info.getFlag && this.info.getFlag[index] && this.info.getFlag[index].normal && this.info.getFlag[index].normal == 1) {
            return true;
        }
        return false;
    };
    SevenDaysSignupLoginVoApi.prototype.checkReadReward = function (index) {
        if (this.signUp3Flag && this.signUp3Flag[index] && this.signUp3Flag[index] == 1) {
            return true;
        }
        return false;
    };
    /*俄语特殊奖励*/
    SevenDaysSignupLoginVoApi.prototype.checkSpecialReward = function () {
        if (this.info && this.info.firstdayrwd) {
            return true;
        }
        return false;
    };
    /**VIP奖励是否领取 */
    SevenDaysSignupLoginVoApi.prototype.checkVIPReward = function (index) {
        if (this.info.getFlag[index] && this.info.getFlag[index].vip && this.info.getFlag[index].vip == 1) {
            return true;
        }
        return false;
    };
    /**倒计时 */
    SevenDaysSignupLoginVoApi.prototype.CountDownTime = function () {
        if (this.info.et && this.info.et > GameData.serverTime) {
            return App.DateUtil.getFormatBySecond(this.info.et - GameData.serverTime, 1);
        }
        return LanguageManager.getlocal("sevenDaysSignUpViewTimEnd");
    };
    /**是否创建7日好礼mainicon包含判断 */
    SevenDaysSignupLoginVoApi.prototype.checkCreateMainIcon = function () {
        return this.checkUserIsNewer() && this.checkNewUserLoginThanSeven() && Api.switchVoApi.checkOpenSevenDay();
    };
    /**是否是新号 */
    SevenDaysSignupLoginVoApi.prototype.checkUserIsNewer = function () {
        if (this.newer == 1) {
            return true;
        }
        return false;
    };
    /**新号天数是否小于7天 */
    SevenDaysSignupLoginVoApi.prototype.checkNewUserLoginThanSeven = function () {
        if (Object.keys(this.info).length > 0 && this.info.et > GameData.serverTime) {
            return true;
        }
        return false;
    };
    SevenDaysSignupLoginVoApi.prototype.canGetRewardRu = function () {
        var regdt = Api.gameinfoVoApi.getRegdt();
        if (GameData.serverTime - regdt >= Config.SevendayssignupCfg.firstDayNeedTime) {
            return true;
        }
        return false;
    };
    SevenDaysSignupLoginVoApi.prototype.canGetRewardEn = function () {
        var regdt = Api.gameinfoVoApi.getRegdt();
        if (GameData.serverTime - regdt >= Config.SevendayssignupCfg.firstDayNeedTime) {
            return true;
        }
        return false;
    };
    SevenDaysSignupLoginVoApi.prototype.dispose = function () {
        this.info = null;
        this.newer = 0;
        this.init_flag = 0;
        this.signUp3Flag = null;
        _super.prototype.dispose.call(this);
    };
    return SevenDaysSignupLoginVoApi;
}(BaseVoApi));
__reflect(SevenDaysSignupLoginVoApi.prototype, "SevenDaysSignupLoginVoApi");
//# sourceMappingURL=SevenDaysSignupLoginVoApi.js.map