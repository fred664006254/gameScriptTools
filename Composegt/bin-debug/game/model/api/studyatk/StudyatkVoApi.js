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
 * 演武场api
 * author yanyuling
 * date 2017/11/28
 * @class StudyatkVoApi
 */
var StudyatkVoApi = (function (_super) {
    __extends(StudyatkVoApi, _super);
    function StudyatkVoApi() {
        return _super.call(this) || this;
    }
    StudyatkVoApi.prototype.getStudyAtkList = function () {
        return this.studyatkVo.atkList;
    };
    StudyatkVoApi.prototype.getStudyAtkInfoByIdx = function (idx) {
        return this.studyatkVo.atkList[idx];
    };
    StudyatkVoApi.prototype.getStudySkillInfoTotalExp = function () {
        return this.studyatkVo.skillinfo.total;
    };
    StudyatkVoApi.prototype.getStudySkillInfoLv = function () {
        return this.studyatkVo.skillinfo.level;
    };
    StudyatkVoApi.prototype.getStudyatkFinishinfo = function () {
        return this.studyatkVo.finishinfo;
    };
    StudyatkVoApi.prototype.getStudyatkFinishRet = function () {
        return this.studyatkVo.finishinfo.ret;
    };
    StudyatkVoApi.prototype.getJoinId = function () {
        return this.studyatkVo.join_uid;
    };
    StudyatkVoApi.prototype.getNextPkTime = function (uname) {
        var atkinfo = this.studyatkVo.atkinfo;
        for (var key in atkinfo) {
            if (atkinfo[key].dtype == 3) {
                var time = atkinfo[key].st + GameConfig.config.studyatkbaseCfg.interval;
                if (atkinfo[key].name1 == Api.playerVoApi.getPlayerName() && atkinfo[key].name2 && time >= GameData.serverTime) {
                    return time;
                }
            }
        }
        return 0;
    };
    /**
     * 是否可加入练武
     */
    StudyatkVoApi.prototype.getNextJoinTime = function () {
        var atkinfo = this.studyatkVo.atkinfo;
        for (var key in atkinfo) {
            if (atkinfo[key].dtype == 3) {
                var time = atkinfo[key].st + GameConfig.config.studyatkbaseCfg.interval;
                if (atkinfo[key].name2 == Api.playerVoApi.getPlayerName() && time >= GameData.serverTime) {
                    return time;
                }
            }
        }
        return 0;
    };
    StudyatkVoApi.prototype.isShowNpc = function () {
        var boo = false;
        if (Api.composemapVoApi.getMaxLv() >= GameConfig.config.studyatkbaseCfg.needLv) {
            boo = true;
        }
        else {
            boo = false;
        }
        return boo;
    };
    StudyatkVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("composeUnlockFuncDesc", [GameConfig.config.studyatkbaseCfg.needLv + ""]);
    };
    StudyatkVoApi.prototype.openMainView = function () {
        var studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
        var tmpFuid = Api.playerVoApi.getPlayerID();
        var endSec = this.studyatkVo.create_time + studyAtkBaseCfg.lastTime;
        if (this.studyatkVo.join_uid > 0) {
            endSec = this.studyatkVo.join_st + studyAtkBaseCfg.lastTime;
            tmpFuid = this.studyatkVo.join_uid;
        }
        if (endSec > GameData.serverTime) {
            ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW, { uid: tmpFuid });
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKVIEW);
        }
    };
    StudyatkVoApi.prototype.checkNpcMessage = function () {
        var totalExp = this.getStudySkillInfoTotalExp();
        var cfgData = Config.StudyatkCfg.getStudyatkCfgById(Math.min(Config.StudyatkCfg.getMaxLevel(), Number(this.getStudySkillInfoLv()) + 1));
        if (totalExp < cfgData.needExp) {
            return false;
        }
        return true;
    };
    StudyatkVoApi.prototype.getNextEnterTime = function () {
        var interval = GameConfig.config.studyatkbaseCfg.interval;
        return this.studyatkVo.goout_time + interval;
    };
    return StudyatkVoApi;
}(BaseVoApi));
__reflect(StudyatkVoApi.prototype, "StudyatkVoApi");
