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
var AcSmashEggVo = (function (_super) {
    __extends(AcSmashEggVo, _super);
    function AcSmashEggVo() {
        var _this = _super.call(this) || this;
        _this.isfree = 0;
        _this.rewards = null;
        _this.num = 0;
        //蛋池信息 0银蛋 1金蛋
        _this.info = null;
        //蛋的状态 0未开 1已开
        _this.egginfo = null;
        _this.egglog = null;
        return _this;
    }
    AcSmashEggVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**
    * 获得进度奖励的配置
    */
    AcSmashEggVo.prototype.getSortAchievementCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.achievementItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.checkRewardFlag(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getnum() >= rechargeData[i].needNum) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
                continue;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
                continue;
            }
        }
        return rechargeData;
    };
    /** 是否领过进度奖励了 */
    AcSmashEggVo.prototype.checkRewardFlag = function (id) {
        if (this.rewards[id]) {
            return true;
        }
        return false;
    };
    AcSmashEggVo.prototype.getnum = function () {
        return this.num;
    };
    /**check free time */
    AcSmashEggVo.prototype.isFree = function () {
        if (this.isfree == 1) {
            return true;
        }
        return false;
    };
    /** 道具数量 */
    AcSmashEggVo.prototype.getItemValue = function () {
        return this.v;
    };
    Object.defineProperty(AcSmashEggVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            if (this.isStart == false) {
                return false;
            }
            return this.checkGameRedDot() || this.checkAchievementRedDot() || this.checkSkinRedDot() || this.checkHaveHammerRedDot();
        },
        enumerable: true,
        configurable: true
    });
    AcSmashEggVo.prototype.checkGameRedDot = function () {
        if (this.checkIsInEndShowTime()) {
            return false;
        }
        return this.isFree();
    };
    AcSmashEggVo.prototype.checkHaveHammerRedDot = function () {
        if (this.checkIsInEndShowTime()) {
            return false;
        }
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.useItem);
        if (hasNum && hasNum > 0) {
            return true;
        }
        return false;
    };
    /**
    * 皮肤红点
    */
    AcSmashEggVo.prototype.checkSkinRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rewardsVo = GameData.formatRewardItem(cfg.itemExchange[0].costProof)[0];
        var rewardsVo2 = GameData.formatRewardItem(cfg.itemExchange[0].getReward)[0];
        var rewardsVo3 = GameData.formatRewardItem(cfg.itemExchange[1].costProof)[0];
        var proofNum = Api.itemVoApi.getItemNumInfoVoById(rewardsVo.id);
        if (Api.itemVoApi.getItemInfoVoById(rewardsVo2.id) || Api.servantVoApi.isOwnSkinOfSkinId(String(cfg.show))) {
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(String(cfg.show));
            if (!skincfg.canExchangeItem()) {
                if (proofNum >= rewardsVo3.num) {
                    return true;
                }
            }
            else {
                if (proofNum >= rewardsVo.num) {
                    return true;
                }
            }
        }
        else {
            if (proofNum >= rewardsVo.num) {
                return true;
            }
        }
        return false;
    };
    /**进度奖励的小红点 */
    AcSmashEggVo.prototype.checkAchievementRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.achievementItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.checkRewardFlag(rechargeData[i].id)) && this.getnum() >= rechargeData[i].needNum) {
                return true;
            }
        }
        return false;
    };
    AcSmashEggVo.prototype.getSortEggRewardCfgList = function () {
        var eggRewardList = [];
        var normalEgg = this.cfg.normalEgg;
        var normalStr = '';
        for (var i = 0; i < normalEgg.length; i++) {
            var element = normalEgg[i];
            var str = element[0];
            if (typeof (str) != 'string') {
                str = element[1];
            }
            normalStr += str + '|';
        }
        normalStr = normalStr.substring(0, normalStr.length - 1);
        var goldenEgg = this.cfg.goldenEgg;
        var goldenStr = '';
        for (var i = 0; i < goldenEgg.length; i++) {
            var element = goldenEgg[i];
            var str = element[0];
            if (typeof (str) != 'string') {
                str = element[1];
            }
            goldenStr += str + '|';
        }
        goldenStr = goldenStr.substring(0, goldenStr.length - 1);
        eggRewardList.push(goldenStr);
        eggRewardList.push(normalStr);
        // let data = this.cfg.getMoonCakeList();
        // data.sort((a, b) => {return a.itemId - b.itemId});
        // return data;
        return eggRewardList;
    };
    AcSmashEggVo.prototype.getSkinNeedItemNum = function () {
        return GameData.formatRewardItem(this.cfg.itemExchange[0].costProof)[0].num;
    };
    AcSmashEggVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    Object.defineProperty(AcSmashEggVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //活动兑换
    AcSmashEggVo.prototype.getpublicRedhot4 = function () {
        //任务
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        // for(let i in cfg.claim){
        // 	let unit = <Config.AcCfg.DWClaimItemCfg>cfg.claim[i];
        // 	let claimNum = this.getClaim(unit.id);
        // 	if (unit.limit && claimNum>=unit.limit)
        // 	{
        // 		continue;
        // 	}
        // 	let need1=0,need2=0,need3=0;
        // 	if (unit.costZongZi)
        // 	{
        // 		need1 = unit.costZongZi;
        // 	}
        // 	if (unit.costDaGao)
        // 	{
        // 		need2 = unit.costDaGao;
        // 	}
        // 	if (unit.costXiongHuang)
        // 	{
        // 		need3 = unit.costXiongHuang;
        // 	}
        // 	if (this.getActivityItem(1)>=need1 && this.getActivityItem(2)>=need2 && this.getActivityItem(3)>=need3)
        // 	{
        // 		return true;
        // 	}
        // }
        return false;
    };
    Object.defineProperty(AcSmashEggVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcSmashEggVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcSmashEggVo.prototype.dispose = function () {
        this.isfree = 0;
        this.rewards = null;
        this.num = 0;
        this.info = null;
        this.egginfo = null;
        this.egglog = null;
    };
    return AcSmashEggVo;
}(AcBaseVo));
__reflect(AcSmashEggVo.prototype, "AcSmashEggVo");
//# sourceMappingURL=AcSmashEggVo.js.map