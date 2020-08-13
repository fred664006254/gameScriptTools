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
 * 成就系统vo
 * author dky
 * date 2017/10/31
 * @class AchievementVo
 */
var AchievementVo = (function (_super) {
    __extends(AchievementVo, _super);
    function AchievementVo() {
        var _this = _super.call(this) || this;
        _this.achievementInfoVoObj = null;
        return _this;
    }
    AchievementVo.prototype.initData = function (data) {
        if (data.info) {
            this.achievementInfoVoObj = null;
            if (data.info) {
                if (this.achievementInfoVoObj == null) {
                    this.achievementInfoVoObj = {};
                }
                for (var key in data.info) {
                    var acvCfg = Config.AchievementCfg.getAchievementCfgById(key);
                    if (!acvCfg) {
                        continue;
                    }
                    if (this.achievementInfoVoObj[key]) {
                        this.achievementInfoVoObj[key].initData(data.info[key]);
                    }
                    else {
                        var adultInfoVo = new AchievementInfoVo();
                        adultInfoVo.id = key;
                        adultInfoVo.initData(data.info[key]);
                        this.achievementInfoVoObj[key] = adultInfoVo;
                    }
                }
                for (var key in this.achievementInfoVoObj) {
                    if (!data.info[key]) {
                        delete this.achievementInfoVoObj[key];
                    }
                }
            }
        }
    };
    AchievementVo.prototype.dispose = function () {
        if (this.achievementInfoVoObj) {
            for (var key in this.achievementInfoVoObj) {
                (this.achievementInfoVoObj[key]);
                {
                    this.achievementInfoVoObj[key].dispose();
                    this.achievementInfoVoObj[key] = null;
                }
            }
        }
        this.achievementInfoVoObj = null;
    };
    return AchievementVo;
}(BaseVo));
__reflect(AchievementVo.prototype, "AchievementVo");
