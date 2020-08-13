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
 * author dmj
 * date 2017/11/04
 * @class arrivalVoApi
 */
var ArrivalVoApi = (function (_super) {
    __extends(ArrivalVoApi, _super);
    function ArrivalVoApi() {
        return _super.call(this) || this;
    }
    /**累积签到天数 */
    ArrivalVoApi.prototype.getTotalSignDay = function () {
        return this.arrivalVo.arrival_count;
    };
    /**
     * 获取当前前后10天的奖励
     * flag  0未领奖 1已领奖 2不能领取
     */
    ArrivalVoApi.prototype.getSignRewardList = function () {
        var rewardList = [];
        var curIndex = this.getTotalSignDay();
        var num = 10;
        var startIndex = curIndex <= num ? 1 : curIndex - num;
        var endIndex = curIndex + num;
        var curFlag = this.arrivalVo.flag;
        for (var i = startIndex; i <= endIndex; i++) {
            var reward = {};
            var rewardsId = Number((i - 1) % 21 + 1);
            var content = Config.ArrivalCfg.getContentByIndex(rewardsId);
            if (i == 7) {
                if (!Api.sevenDaysSignupLoginVoApi.checkUserIsNewer()) {
                    content = content + "|" + Config.GameprojectCfg.sign7DayReward; //Config.ArrivalCfg.getContentByIndex(rewardsId);
                }
            }
            else if (i == 2) {
                if (!Api.sevenDaysSignupLoginVoApi.checkUserIsNewer()) {
                    content = content + "|" + Config.GameprojectCfg.sign2DayReward;
                }
            }
            else if (i == 3) {
                if (!Api.sevenDaysSignupLoginVoApi.checkUserIsNewer()) {
                    content = content + "|" + Config.GameprojectCfg.sign3DayReward;
                }
            }
            else if (i == 30) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    content = content + "|" + Config.GameprojectCfg.sign30DayReward;
                }
            }
            else if (i == 100) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    content = content + "|" + Config.GameprojectCfg.sign100DayReward;
                }
            }
            else if (i == 365) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    content = content + "|" + Config.GameprojectCfg.sign365DayReward;
                }
            }
            else if (i == Config.Signup500dayCfg.showDay) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    content = content + "|" + Config.Signup500dayCfg.getReward;
                }
            }
            else if (i > Config.Signup500dayCfg.showDay && i <= Config.Signup500dayCfg.showLastDay()) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    content = content + "|" + Config.Signup500dayCfg.getExtraReward;
                }
            }
            else if (i == Config.GameprojectCfg.sign600Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    content = content + "|" + Config.GameprojectCfg.sign600DayReward;
                }
            }
            else if (i == Config.GameprojectCfg.sign700Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    content = content + "|" + Config.GameprojectCfg.sign700DayReward;
                }
            }
            else if (i == Config.GameprojectCfg.sign800Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    content = content + "|" + Config.GameprojectCfg.sign800DayReward;
                }
            }
            else if (i == Config.GameprojectCfg.sign900Day) {
                if (Api.switchVoApi.checkOpenNewSignIn()) {
                    content = content + "|" + Config.GameprojectCfg.sign900DayReward;
                }
            }
            else {
                content = Config.ArrivalCfg.getContentByIndex(rewardsId);
            }
            var rewardItemVoList = GameData.formatRewardItem(content);
            reward.index = i;
            reward.rewardList = rewardItemVoList;
            if (i < curIndex) {
                reward.flag = 1;
            }
            else {
                if (i == curIndex) {
                    reward.flag = curFlag;
                }
                else {
                    reward.flag = 2;
                }
            }
            rewardList.push(reward);
        }
        return rewardList;
    };
    /**
     * 获取当前签到日在数组中的索引
     */
    ArrivalVoApi.prototype.getIndexByCurday = function () {
        var curIndex = this.getTotalSignDay();
        var num = 10;
        var startIndex = curIndex <= num ? curIndex : 11;
        return startIndex;
    };
    /**
     * 检查具体某一天的领取状态
     * @param index 天数
     */
    ArrivalVoApi.prototype.checkFlagByIndex = function (index) {
        var curIndex = this.getTotalSignDay();
        var curFlag = this.arrivalVo.flag;
        if (curIndex > index) {
            return 1;
        }
        else if (index == curIndex) {
            return curFlag;
        }
        return 2;
    };
    /**
     * 获取福利中心按钮排序配置
     */
    ArrivalVoApi.prototype.getFunctionCfgList = function () {
        var arr = [];
        var funcItemList = [];
        var funcItem = {};
        // 首冲
        var payflag = Api.shopVoApi.getPayFlag();
        funcItem = {};
        funcItem.key = "FirstRecharge";
        funcItem.sortid = 999;
        // if(payflag == 0)
        // {
        // 	funcItem.sortid = 21;
        // }
        // else
        // {
        // 	funcItem.sortid = 111;
        // }
        if (!Api.switchVoApi.checkClosePay() && Api.switchVoApi.checkWeChatFirstcharge() == false && Api.switchVoApi.checkIsOlyShenheFile() == false) {
            funcItemList.push(funcItem);
        }
        if (payflag > 0 && Api.switchVoApi.checkOpenNewCharge()) {
            var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
            if (rechargeItemCfg) {
                var itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
                var itemVo2 = Api.shopVoApi.getPayInfoById2("g10");
                if (itemVo1 && itemVo1.st + rechargeItemCfg.lastTime > GameData.serverTime) {
                    // if(itemVo1.isbuy == 0 || itemVo2.isbuy == 0)
                    // {
                    // 充值礼包
                    funcItem = {};
                    funcItem.key = "RechargeBox";
                    funcItem.sortid = 10;
                    if (!Api.switchVoApi.checkClosePay()) {
                        funcItemList.push(funcItem);
                    }
                    // }
                }
            }
        }
        // 签到
        funcItem = {};
        funcItem.key = "Signin";
        funcItem.sortid = 11;
        funcItemList.push(funcItem);
        // 月卡
        funcItem = {};
        funcItem.key = "MonthCard";
        var isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
        if (isBuyMonthCard == false) {
            funcItem.sortid = 31;
        }
        else {
            funcItem.sortid = 311;
        }
        if (!Api.switchVoApi.checkClosePay()) {
            funcItemList.push(funcItem);
        }
        // 年卡
        funcItem = {};
        funcItem.key = "YearCard";
        var isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
        if (isBuyYearCard == false) {
            funcItem.sortid = 41;
        }
        else {
            funcItem.sortid = 411;
        }
        if (!Api.switchVoApi.checkClosePay()) {
            funcItemList.push(funcItem);
        }
        //天恩赐福
        funcItem = {};
        funcItem.key = "GodBless";
        funcItem.sortid = 51;
        funcItemList.push(funcItem);
        //实名认证
        if (!Api.switchVoApi.checkOpenShenhe()) {
            if (PlatformManager.getSpName() == "h5ios3kwan") {
                funcItem = {};
                funcItem.key = "Realname";
                funcItem.sortid = 500;
                funcItemList.push(funcItem);
            }
        }
        // 1.5返利 
        if (Api.switchVoApi.checkOpenRechargeRebate()) {
            funcItem = {};
            funcItem.key = "Rebate";
            funcItem.sortid = 1000;
            funcItemList.push(funcItem);
        }
        if (Api.switchVoApi.checkOpenRechargeRebate2()) {
            funcItem = {};
            funcItem.key = "Rebate2";
            funcItem.sortid = 1000;
            funcItemList.push(funcItem);
        }
        // // 微信关注  officialwechat
        // if(PlatformManager.checkIs3KSp()==true)
        // {
        // 	funcItem = <any>{};
        // 	funcItem.key = "OfficialWeChat";
        // 	funcItem.sortid = 666;
        // 	funcItemList.push(funcItem);
        // }
        if (Api.switchVoApi.checkOpenShenhe() == false && PlatformManager.isSupportBindPhone() && !Api.otherInfoVoApi.isGetBindingReward()) 
        // if(!Api.otherInfoVoApi.isGetBindingReward())
        {
            //手机绑定
            funcItem = {};
            funcItem.key = "Binding";
            funcItem.sortid = 611;
            funcItemList.push(funcItem);
        }
        if (Api.switchVoApi.checkOpenPlayerComeBack()) {
            //召回玩家
            funcItem = {};
            funcItem.key = "PlayerComeBack";
            funcItem.sortid = 995;
            funcItemList.push(funcItem);
        }
        //功能预览
        funcItem = {};
        funcItem.key = "FunctionPreview";
        funcItem.sortid = 999;
        funcItemList.push(funcItem);
        if (Api.switchVoApi.checkopenQQqun()) {
            //q	群福利
            funcItem = {};
            funcItem.key = "Qgroup";
            funcItem.sortid = 998;
            funcItemList.push(funcItem);
        }
        if (Api.switchVoApi.checkOpenNewInvite()) {
            //新版邀请好友
            funcItem = {};
            funcItem.key = "NewInvite";
            funcItem.sortid = 1001;
            funcItemList.push(funcItem);
        }
        if (Api.switchVoApi.checkOpenHousekeeper() && Api.playerVoApi.getPlayerLevel() >= Config.MasterCfg.levelLimit) {
            funcItem = {};
            funcItem.key = "Housekeeper";
            funcItem.sortid = 1002;
            funcItemList.push(funcItem);
        }
        if (Api.shopVoApi.checkShowGrowGold()) {
            funcItem = {};
            funcItem.key = "GrowGold";
            funcItem.sortid = 1003;
            funcItemList.push(funcItem);
        }
        funcItemList.sort(function (a, b) {
            return a.sortid > b.sortid ? 1 : -1;
        });
        for (var i = 0; i < funcItemList.length; i++) {
            arr.push(funcItemList[i].key);
        }
        return arr;
    };
    /**是否显示玩吧八月签到 */
    ArrivalVoApi.prototype.getIsAugustsignin = function () {
        if (GameData.serverTime - 1535731200 < 0 && Api.switchVoApi.checkOpenAugustsign() && PlatformManager.checkIsWanbaSp()) {
            return true;
        }
        return false;
    };
    Object.defineProperty(ArrivalVoApi.prototype, "isShowRedDot", {
        /**
         * 是否显示红点
         */
        get: function () {
            if (this.arrivalVo.flag == 0) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ArrivalVoApi.prototype.isShowed500Rewards = function () {
        if (this.arrivalVo.arrival_count > Config.Signup500dayCfg.showDay) {
            return true;
        }
        if (this.arrivalVo.arrival_count == Config.Signup500dayCfg.showDay && this.arrivalVo.flag == 1) {
            return true;
        }
        return false;
    };
    ArrivalVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ArrivalVoApi;
}(BaseVoApi));
__reflect(ArrivalVoApi.prototype, "ArrivalVoApi");
//# sourceMappingURL=ArrivalVoApi.js.map