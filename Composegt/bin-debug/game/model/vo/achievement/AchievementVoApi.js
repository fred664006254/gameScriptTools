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
 * 邮件api
 * author dky
 * date 2017/11/4
 * @class AchievementVoApi
 */
var AchievementVoApi = (function (_super) {
    __extends(AchievementVoApi, _super);
    function AchievementVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 获取成就列表
     */
    AchievementVoApi.prototype.getAchievementInfoVoList = function () {
        var achievementInfoVoObj = this.achievementVo.achievementInfoVoObj;
        var arr = new Array();
        for (var key in achievementInfoVoObj) {
            var acvCfg = Config.AchievementCfg.getAchievementCfgById(key);
            if (Api.switchVoApi.checkOpenShenhe()) {
                if (!acvCfg.isShieldWhenShenhe) {
                    arr.push(achievementInfoVoObj[key]);
                }
            }
            else {
                //过滤商贸和征伐
                if (acvCfg.id == "118" && !Api.switchVoApi.checkOpenTrade()) {
                    continue;
                }
                if (acvCfg.id == "117" && !Api.switchVoApi.checkOpenConquest()) {
                    continue;
                }
                arr.push(achievementInfoVoObj[key]);
            }
        }
        arr.sort(this.sortA);
        return arr;
    };
    AchievementVoApi.prototype.checkRedPoint = function () {
        if (Api.achievementVoApi.getAchGetNum() > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 获取可以领取的成就数量
     */
    AchievementVoApi.prototype.getAchGetNum = function () {
        var num = 0;
        var achVolist = this.getAchievementInfoVoList();
        for (var index = 0; index < achVolist.length; index++) {
            var element = achVolist[index];
            if (element.f == 1) {
                num++;
            }
        }
        return num;
    };
    AchievementVoApi.prototype.sortA = function (a, b) {
        if (a.f == b.f) {
            var achCfgA = Config.AchievementCfg.getAchievementCfgById(a.id);
            var curValueA = achCfgA.value[Api.achievementVoApi.getAchProById(a.id)];
            var perA = a.v / curValueA;
            if (perA > 1) {
                perA = 1;
            }
            var achCfgB = Config.AchievementCfg.getAchievementCfgById(b.id);
            var curValueB = achCfgB.value[Api.achievementVoApi.getAchProById(b.id)];
            var perB = b.v / curValueB;
            if (perB > 1) {
                perB = 1;
            }
            if (perA == perB) {
                return a.cfg.sort - b.cfg.sort;
            }
            return perB - perA;
        }
        var af;
        var bf;
        if (a.f == 1) {
            af = 3;
        }
        else if (a.f == 0) {
            af = 2;
        }
        else {
            af = 1;
        }
        if (b.f == 1) {
            bf = 3;
        }
        else if (b.f == 0) {
            bf = 2;
        }
        else {
            bf = 1;
        }
        return bf - af;
    };
    /**
     * 获取成就详情列表
     */
    AchievementVoApi.prototype.getAchDetailList = function (aid) {
        var _this = this;
        var achCfg = this.getAchievementInfoVoById(aid).cfg;
        var arr = new Array();
        for (var index = 0; index < achCfg.value.length; index++) {
            // var element = achCfg.value[index];
            arr.push(index);
        }
        var achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(aid);
        var stage = achInfoVo.stage;
        var curValue = achCfg.value[Api.achievementVoApi.getAchProById(aid)];
        //todo对数组进行排序
        arr.sort(function (a, b) {
            var stateA = _this.getAchDetailState(aid, a);
            var stateB = _this.getAchDetailState(aid, b);
            if (stateA == stateB) {
                return a - b;
            }
            return stateA - stateB;
            // return 0;
        });
        return arr;
    };
    /**
     * 获取成就详情列表某个完成状态
     * 1可领取 2进行种 3未完成 4 已领取
     */
    AchievementVoApi.prototype.getAchDetailState = function (aid, index) {
        var state = 3;
        var achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(aid);
        var achCfg = Config.AchievementCfg.getAchievementCfgById(aid);
        var stage = achInfoVo.stage;
        var curValue = achCfg.value[Api.achievementVoApi.getAchProById(aid)];
        if (index < achInfoVo.stage - 1) {
            //不是最後一個
            state = 4;
        }
        else {
            if (achCfg.value[index] > achInfoVo.v) {
                if (index == achInfoVo.stage - 1) {
                    //2进行种
                    state = 2;
                }
                else {
                    //未完成
                    state = 3;
                }
            }
            else {
                if (index == achInfoVo.stage - 1) {
                    //可领取0未完成 1已完成 2已领取",
                    if (achInfoVo.f == 0) {
                        state = 3;
                    }
                    else if (achInfoVo.f == 1) {
                        state = 1;
                    }
                    else if (achInfoVo.f == 2) {
                        state = 4;
                    }
                }
                else {
                    //进行中
                    state = 2;
                }
            }
        }
        return state;
    };
    /**
     * 根据成就index获取成就详情列表位置
     * @param id 子嗣id
     */
    AchievementVoApi.prototype.getAchDetailIndexVoById = function (aid, index) {
        var achVolist = this.getAchDetailList(aid);
        for (var i = 0; i < achVolist.length; i++) {
            if (index == achVolist[i]) {
                return i;
            }
        }
        return 0;
    };
    /**
     * 根据成就index获取成就详情列表位置2
     * @param id 子嗣id
     */
    AchievementVoApi.prototype.getAchDetailIndexVoById2 = function (aid, index, achVolist) {
        // let achVolist = this.getAchDetailList(aid);
        for (var i = 0; i < achVolist.length; i++) {
            if (index == achVolist[i]) {
                return i;
            }
        }
        return 0;
    };
    /**
     * 根据成就id获取成就列表位置
     * @param id 子嗣id
     */
    AchievementVoApi.prototype.getAchIndexVoById = function (id) {
        var achVolist = this.getAchievementInfoVoList();
        for (var i = 0; i < achVolist.length; i++) {
            if (id == achVolist[i].id) {
                return i;
            }
        }
        return 0;
    };
    /**
     * 根据成就id获取成就列表位置2
     * @param id 子嗣id
     */
    AchievementVoApi.prototype.getAchIndexVoById2 = function (id, achVolist) {
        // let achVolist = this.getAchievementInfoVoList();
        for (var i = 0; i < achVolist.length; i++) {
            if (id == achVolist[i].id) {
                return i;
            }
        }
        return 0;
    };
    /**
     * 根据成就id获取完成到几阶段了
     *
     */
    AchievementVoApi.prototype.getAchProById = function (mid) {
        var achCfg = Config.AchievementCfg.getAchievementCfgById(mid);
        var achVo = this.getAchievementInfoVoById(mid);
        var stage = achVo.stage;
        // if(achVo.f == 1 || achVo.f == 2)
        // {
        // 	return achVo.stage;
        // }
        // if(){
        // }
        return achVo.stage - 1;
    };
    /**
     * 根据成就id获取vo
     * @param id  邮件id
     */
    AchievementVoApi.prototype.getAchievementInfoVoById = function (mid) {
        if (this.achievementVo) {
            var achievementInfoVoObj = this.achievementVo.achievementInfoVoObj;
            if (achievementInfoVoObj && achievementInfoVoObj[mid]) {
                return achievementInfoVoObj[mid];
            }
        }
        return null;
    };
    AchievementVoApi.prototype.dispose = function () {
        this.achievementVo = null;
        _super.prototype.dispose.call(this);
    };
    return AchievementVoApi;
}(BaseVoApi));
__reflect(AchievementVoApi.prototype, "AchievementVoApi");
