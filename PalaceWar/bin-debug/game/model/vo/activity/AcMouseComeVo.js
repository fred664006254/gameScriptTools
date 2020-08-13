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
 * 鼠来如意
 * date 2020.6.1
 * author ycg
 * @class AcMouseComeVo
 */
var AcMouseComeVo = (function (_super) {
    __extends(AcMouseComeVo, _super);
    function AcMouseComeVo() {
        return _super.call(this) || this;
    }
    AcMouseComeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //是否免费
    AcMouseComeVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    AcMouseComeVo.prototype.getRechargeNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    AcMouseComeVo.prototype.getNeedRecharge = function () {
        var num = this.getRechargeNum();
        var needNum = this.cfg.needGem - num % this.cfg.needGem;
        return needNum;
    };
    //道具数量
    AcMouseComeVo.prototype.getToolNum = function () {
        if (this.num) {
            return this.num;
        }
        return 0;
    };
    /**当前进度 */
    AcMouseComeVo.prototype.getProcessNum = function () {
        if (this.ainfo && this.ainfo.v) {
            return this.ainfo.v;
        }
        return 0;
    };
    /**当前进度奖励是否领取 */
    AcMouseComeVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcMouseComeVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveCfg();
        var count = achieveData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetAchieveRewardById(achieveData[i].id)) {
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.getProcessNum() >= achieveData[i].needNum) {
                achieveData[i].sortId = achieveData[i].id - count;
            }
            else {
                achieveData[i].sortId = achieveData[i].id;
            }
            data.push(achieveData[i]);
        }
        data.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return data;
    };
    //获取当前最大进度
    AcMouseComeVo.prototype.getMaxProNum = function () {
        var data = this.cfg.getAchieveCfg();
        return data[data.length - 1].needNum;
    };
    //当前进度id
    AcMouseComeVo.prototype.getCurrProIndex = function () {
        var data = this.cfg.getAchieveCfg();
        var currNum = this.getProcessNum();
        for (var i = 0; i < data.length; i++) {
            if (currNum < data[i].needNum) {
                return i;
            }
        }
        if (currNum >= this.getMaxProNum()) {
            return -1;
        }
        return 0;
    };
    //可领奖励id
    AcMouseComeVo.prototype.getAchieveRewardId = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].needNum) {
                    return data[i].id;
                }
            }
        }
        return 0;
    };
    //获取展示对应的数据
    // public getShowSkinData():{needNum:number, index:number}{
    // let data = this.cfg.getAchieveCfg();
    // for (let i = 0; i < data.length; i++){
    //     let rewardsArr = data[i].getReward.split("|");
    //     for (let k = 0; k < rewardsArr.length; k++){
    //         let itemId = rewardsArr[k].split("_")[1];
    //         if (Number(itemId) == this.cfg.show){
    //             return {needNum: data[i].needNum, index: i};
    //         }
    //     }
    // }
    // return {needNum:null, index:null};
    // }
    AcMouseComeVo.prototype.getShowSkinData = function () {
        var data = this.cfg.exchange;
        var itemVo = GameData.formatRewardItem(data.needParts)[0];
        return itemVo;
    };
    Object.defineProperty(AcMouseComeVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchieveReward() || this.isCanPlay() || this.isCanExchange();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取进度奖励
    AcMouseComeVo.prototype.isCangetAchieveReward = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否有免费次数
    AcMouseComeVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    //是否可以兑换
    AcMouseComeVo.prototype.isCanExchange = function () {
        var str = this.cfg.exchange.needParts;
        var itemVo = GameData.formatRewardItem(str)[0];
        var itemData = Api.itemVoApi.getItemInfoVoById(itemVo.id);
        var currNum = 0;
        if (itemData) {
            currNum = itemData.num;
        }
        if (currNum >= itemVo.num) {
            return true;
        }
        return false;
    };
    //倒计时
    AcMouseComeVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcMouseComeVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcMouseComeVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcMouseComeVo;
}(AcBaseVo));
__reflect(AcMouseComeVo.prototype, "AcMouseComeVo");
//# sourceMappingURL=AcMouseComeVo.js.map