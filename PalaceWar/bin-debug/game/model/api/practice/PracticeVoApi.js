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
 * 修身
 * author yanyuling
 * date 2018/04/18
 * @class PracticeVoApi
 */
var PracticeVoApi = (function (_super) {
    __extends(PracticeVoApi, _super);
    function PracticeVoApi() {
        var _this = _super.call(this) || this;
        _this._batchNum = 0;
        return _this;
    }
    PracticeVoApi.prototype.getLevel = function () {
        return this.practiceVo.level;
    };
    PracticeVoApi.prototype.geAttrValues = function () {
        return this.practiceVo.attr;
    };
    PracticeVoApi.prototype.geAbilityValues = function () {
        return this.practiceVo.ability;
    };
    PracticeVoApi.prototype.geExp = function () {
        return this.practiceVo.exp;
    };
    PracticeVoApi.prototype.getProgressValue = function () {
        var upgradeNeed = GameConfig.config.practicebaseCfg.upgradeNeed;
        var baseV = 0;
        if (this.practiceVo.level >= upgradeNeed.length) {
            baseV = upgradeNeed[upgradeNeed.length - 1];
        }
        else {
            baseV = upgradeNeed[this.practiceVo.level - 1];
        }
        return { v1: this.practiceVo.exp, v2: baseV };
    };
    PracticeVoApi.prototype.getPower = function () {
        var attr = this.practiceVo.attr;
        return attr[1] + attr[2] + attr[3] + attr[0];
    };
    PracticeVoApi.prototype.getPracticeTaskInfo = function (taskId) {
        return this.practiceVo.task[taskId];
    };
    PracticeVoApi.prototype.getStorageInfo = function () {
        return this.practiceVo.storage;
    };
    PracticeVoApi.prototype.isCollectEnable = function () {
        var num = this.getCurStorageValue();
        if (num > 0) {
            return true;
        }
        return false;
    };
    PracticeVoApi.prototype.getPracticeTaskAccumulation = function (taskvo) {
        var cfg = Config.PracticeCfg.getPracticeListById(taskvo.id);
        var curV = 0;
        var nextV = 0;
        var conditionV = 0;
        var conditionNeed = 0;
        var isComp = false;
        var keys = Object.keys(cfg.getConditionList());
        var keyLen = keys.length;
        if (keyLen == taskvo.stage)
            if (taskvo.stage == keyLen && taskvo.f == 2) {
                isComp = true;
            }
        for (var index = 0; index < keyLen; index++) {
            var key = keys[index];
            var numKey = Number(key);
            if (numKey <= taskvo.stage) {
                var tmpCon = cfg.getConditionList()[key];
                curV += tmpCon.effect;
                if (numKey == taskvo.stage && taskvo.f < 2) {
                    curV -= tmpCon.effect;
                }
                nextV += tmpCon.effect;
                conditionNeed = tmpCon.needNum;
            }
        }
        var curCon = cfg.getConditionList()[String(taskvo.stage)];
        var conditionType = curCon.conditionType;
        // 1：门客等级  2：门客爵位  3：红颜亲密度  4：红颜魅力值
        var servant = undefined;
        var wife = undefined;
        if (cfg.servantId) {
            servant = Api.servantVoApi.getServantObj(cfg.servantId);
        }
        if (cfg.wifeId) {
            wife = Api.wifeVoApi.getWifeInfoVoById(cfg.wifeId);
        }
        conditionV = this._getTaskVoStageV(taskvo);
        /**
         * 当前阶段资质值
         * 下阶段资质值
         * 进度条当前值
         * 进度条当前阶段最大值
         * 是否已领取最后一阶段
         */
        return {
            curV: curV,
            nextV: nextV,
            conditionV: conditionV,
            conditionNeed: conditionNeed,
            isComp: isComp,
        };
    };
    PracticeVoApi.prototype._getTaskVoStageV = function (taskvo) {
        var cfg = Config.PracticeCfg.getPracticeListById(taskvo.id);
        var curCon = cfg.getConditionList()[String(taskvo.stage)];
        var conditionType = curCon.conditionType;
        // 1：门客等级  2：门客爵位  3：红颜亲密度  4：红颜魅力值
        var servant = undefined;
        var wife = undefined;
        if (cfg.servantId) {
            servant = Api.servantVoApi.getServantObj(cfg.servantId);
        }
        if (cfg.wifeId) {
            wife = Api.wifeVoApi.getWifeInfoVoById(cfg.wifeId);
        }
        var conditionV = 0;
        if (servant) {
            if (taskvo.stage == 1) {
                conditionV = 1;
            }
            else {
                switch (conditionType) {
                    case 1:
                        conditionV = servant.level;
                        break;
                    case 2:
                        conditionV = servant.clv;
                        break;
                }
            }
        }
        if (wife) {
            if (taskvo.stage == 1) {
                conditionV = 1;
            }
            else {
                switch (conditionType) {
                    case 3:
                        conditionV = wife.intimacy;
                        break;
                    case 4:
                        conditionV = wife.glamour;
                        break;
                }
            }
        }
        return conditionV;
    };
    PracticeVoApi.prototype.isPracticeOPen = function () {
        return Api.switchVoApi.isPracticeOPen();
    };
    PracticeVoApi.prototype.isPlayerPracticeEnable = function () {
        var isEn = false;
        if (!this.isPracticeOPen()) {
            return isEn;
        }
        var unlockLv = GameConfig.config.practicebaseCfg.unlockLv;
        if (Api.switchVoApi.isPracticeOPen() && Api.playerVoApi.getPlayerLevel() >= unlockLv) {
            isEn = true;
        }
        return isEn;
    };
    PracticeVoApi.prototype.showPracticeGet = function (num) {
        if (num === void 0) { num = 0; }
        // if( this.isPlayerPracticeEnable() && num > 0){
        // 	ViewController.getInstance().openView(ViewConst.POPUP.PRACTICEGETPOPUPVIEW,{pnum:num});
        // }
    };
    PracticeVoApi.prototype.isPracticeBuildingUnlock = function () {
        var isEn = false;
        if (!this.isPracticeOPen()) {
            return isEn;
        }
        var unlockLv = GameConfig.config.practicebaseCfg.unlockLv;
        if (Api.playerVoApi.getPlayerLevel() >= unlockLv) {
            isEn = true;
        }
        return isEn;
    };
    PracticeVoApi.prototype.getbuyNum = function () {
        return this.practiceVo.info.buynum;
    };
    PracticeVoApi.prototype.getspd = function () {
        return this.practiceVo.spd;
    };
    PracticeVoApi.prototype.getRealSpd = function () {
        var spAdd = this.getspdAdd();
        var basecfg = GameConfig.config.practicebaseCfg;
        var speed = basecfg.level[Api.playerVoApi.getPlayerLevel() - 1] * (1 + spAdd);
        return Math.floor(speed);
    };
    PracticeVoApi.prototype.getspdAdd = function () {
        var basecfg = GameConfig.config.practicebaseCfg;
        var add = 0;
        if (Api.shopVoApi.ifBuyMonthCard()) {
            add += basecfg.monthCard;
        }
        if (Api.shopVoApi.ifBuyYearCard()) {
            add += basecfg.yearCard;
        }
        var vipAddLevel = Api.playerVoApi.getPlayerVipLevel();
        if (vipAddLevel > basecfg.vip.length - 1) {
            vipAddLevel = basecfg.vip.length - 1;
        }
        add += basecfg.vip[vipAddLevel];
        return add;
    };
    PracticeVoApi.prototype.getStorageRealLimit = function () {
        var basecfg = GameConfig.config.practicebaseCfg;
        var slv = Api.practiceVoApi.getStorageLv();
        slv = slv ? slv : 0;
        //等级容量
        var curLimit = basecfg.storeLimit[Api.playerVoApi.getPlayerLevel() - 1];
        //加成容量
        var addLimitRate = basecfg.storeAdd * 100 * slv;
        var totalLimit = Number((curLimit * (1 + basecfg.storeAdd * slv)).toFixed(0));
        return totalLimit;
    };
    PracticeVoApi.prototype.isStoregeFull = function () {
        var curLimit = this.getStorageRealLimit();
        var floorMin = this.getCurStorageValue();
        if (floorMin >= curLimit) {
            return true;
        }
        return false;
    };
    PracticeVoApi.prototype.getCurStorageValue = function () {
        var st = this.practiceVo.storage.st;
        var deltaT = GameConfig.config.practicebaseCfg.time;
        var spd = this.getRealSpd();
        var floorMin = Math.floor(Math.floor((GameData.serverTime - st) / deltaT) * spd);
        var curLimit = Math.floor(this.getStorageRealLimit());
        return Math.min(floorMin, curLimit);
    };
    PracticeVoApi.prototype.isPracticeLvupEnable = function () {
        var lv = this.practiceVo.level;
        var maxLv = Config.PracticeBaseCfg.commonMaxLv(); //GameConfig.config.practicebaseCfg.maxLv;
        if (lv == maxLv) {
            return false;
        }
        var lvneed = GameConfig.config.practicebaseCfg.upgradeNeed[lv - 1];
        if (this.practiceVo.exp >= lvneed) {
            return true;
        }
        return false;
    };
    PracticeVoApi.prototype.practiceAttrRedList = function () {
        var attr = this.practiceVo.attr;
        var task = this.practiceVo.task;
        // let showList = [0,0,0,0];
        // let showList = {"1":0,"2":0,"3":0,"4":0};
        var showList = {};
        for (var key in this.practiceVo.task) {
            var taskvo = this.practiceVo.task[key];
            var cfg = Config.PracticeCfg.getPracticeListById(taskvo.id);
            if (!cfg) {
                continue;
            }
            if (cfg.servantId && Config.ServantCfg.checkIsLockedByGM(cfg.servantId)) {
                continue;
            }
            if (cfg.wifeId && Config.WifeCfg.checkIsLockedByGM(cfg.wifeId)) {
                continue;
            }
            if (cfg && cfg.getConditionList()) {
                var con = cfg.getConditionList()[String(taskvo.stage)];
                var tType = cfg.type;
                if (!showList[tType]) {
                    if (this._getTaskVoStageV(taskvo) >= con.needNum && taskvo.f < 2) {
                        showList[tType] = 1;
                    }
                }
            }
        }
        return showList;
    };
    PracticeVoApi.prototype.isTaskLvEnable = function (taskId) {
        var taskvo = this.getPracticeTaskInfo(taskId);
        var cfg = Config.PracticeCfg.getPracticeListById(taskId);
        var con = cfg.getConditionList()[String(taskvo.stage)];
        if (this._getTaskVoStageV(taskvo) >= con.needNum && taskvo.f < 2) {
            return true;
        }
        return false;
    };
    PracticeVoApi.prototype.isShowRedForPBottom = function () {
        if (!this.isPlayerPracticeEnable()) {
            return false;
        }
        if (this.isPracticeLvupEnable()) {
            return true;
        }
        var shL = this.practiceAttrRedList();
        for (var key in shL) {
            if (shL[key] > 0) {
                return true;
            }
        }
        return false;
    };
    PracticeVoApi.prototype.isShowRedForPBottom2 = function () {
        var shL = this.practiceAttrRedList();
        for (var key in shL) {
            if (shL[key] > 0) {
                return true;
            }
        }
        return false;
    };
    PracticeVoApi.prototype.getStorageLv = function () {
        return this.practiceVo.storage.level;
    };
    PracticeVoApi.prototype.isPracticeUnlock = function () {
        var unlockLv = GameConfig.config.practicebaseCfg.unlockLv;
        if (Api.switchVoApi.isPracticeOPen() && Api.playerVoApi.getPlayerLevel() >= unlockLv) {
            return true;
        }
        return false;
    };
    PracticeVoApi.prototype.getUnlockStr = function () {
        var unlockLv = GameConfig.config.practicebaseCfg.unlockLv;
        var str = LanguageManager.getlocal("officialTitle" + unlockLv);
        return LanguageManager.getlocal("practice_unlockTip", [str]);
    };
    PracticeVoApi.prototype.getBatchNum = function () {
        return this._batchNum;
    };
    Object.defineProperty(PracticeVoApi.prototype, "getExp", {
        // 当前技能经验
        get: function () {
            return this.practiceVo.curExp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PracticeVoApi.prototype, "curSkill", {
        // 当前等级
        get: function () {
            var skillLvArr = [];
            if (this.practiceVo.curSkilllv == null) {
                skillLvArr = [1, 1];
            }
            else {
                for (var key in this.practiceVo.curSkilllv) {
                    skillLvArr.push(this.practiceVo.curSkilllv[key]);
                }
            }
            return skillLvArr;
        },
        enumerable: true,
        configurable: true
    });
    //修身技能红点
    PracticeVoApi.prototype.skillRed = function () {
        var practiceSkill = GameConfig.config.practicebaseCfg.practiceSkill;
        var expFNeed = GameConfig.config.practicebaseCfg.expFNeed;
        var expSNeed = GameConfig.config.practicebaseCfg.expSNeed;
        var skill = this.curSkill;
        var lv1 = skill[0];
        var lv2 = skill[1];
        var skillExp = this.getExp;
        if (practiceSkill && practiceSkill.skillF && practiceSkill.skillS) {
            var maxLv1 = practiceSkill.skillF.peak;
            var maxLv2 = practiceSkill.skillS.peak;
            var isBoo = Api.switchVoApi.checkOpenSeat();
            if (lv1 == maxLv1 && lv2 == maxLv2) {
                return false;
            }
            if (skillExp >= expFNeed[lv1 - 1] && isBoo || skillExp >= expFNeed[lv2 - 1] && isBoo) {
                return true;
            }
        }
        return false;
    };
    PracticeVoApi.prototype.setBatchNum = function (num) {
        if (num === void 0) { num = 0; }
        this._batchNum = num;
    };
    PracticeVoApi.prototype.public = function () {
        return Config.PracticeBaseCfg.commonMaxLv();
    };
    return PracticeVoApi;
}(BaseVoApi));
__reflect(PracticeVoApi.prototype, "PracticeVoApi");
//# sourceMappingURL=PracticeVoApi.js.map