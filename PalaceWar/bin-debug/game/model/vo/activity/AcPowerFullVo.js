var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 权倾朝野
 * date 2020.7.14
 * author ycg
 * @class AcPowerFullVo
 */
var AcPowerFullVo = /** @class */ (function (_super) {
    __extends(AcPowerFullVo, _super);
    function AcPowerFullVo() {
        return _super.call(this) || this;
    }
    AcPowerFullVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcPowerFullVo.prototype.setAchRewardId = function (id) {
        this.achRewardId = id;
    };
    AcPowerFullVo.prototype.getAchRewardId = function () {
        return this.achRewardId;
    };
    //是否免费
    AcPowerFullVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //道具数量
    AcPowerFullVo.prototype.getToolNum = function () {
        if (this.num) {
            return this.num;
        }
        return 0;
    };
    //充值数量
    AcPowerFullVo.prototype.getRechargeNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    //特殊奖励数量
    AcPowerFullVo.prototype.getSpecailNum = function () {
        if (this.slimit) {
            return this.slimit;
        }
        return 0;
    };
    AcPowerFullVo.prototype.getNeedRecharge = function () {
        var currNum = this.getRechargeNum();
        var num = this.cfg.needGem - currNum % this.cfg.needGem;
        return num;
    };
    /**当前进度 */
    AcPowerFullVo.prototype.getProcessNum = function () {
        if (this.ainfo && this.ainfo.v) {
            return this.ainfo.v;
        }
        return 0;
    };
    /**当前进度奖励是否领取 */
    AcPowerFullVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcPowerFullVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveList();
        var count = achieveData.length;
        var data = [];
        var currNum = this.getProcessNum();
        for (var i = 0; i < count; i++) {
            if (this.isGetAchieveRewardById(achieveData[i].id)) {
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (currNum >= achieveData[i].needNum) {
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
    AcPowerFullVo.prototype.getCurrMaxProNum = function () {
        var data = this.cfg.getAchieveList();
        return data[data.length - 1].needNum;
    };
    //可领奖励id
    AcPowerFullVo.prototype.getAchieveRewardId = function () {
        var data = this.cfg.getAchieveList();
        var currNum = this.getProcessNum();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (currNum >= data[i].needNum) {
                    return data[i].id;
                }
            }
        }
        return 0;
    };
    //当前到哪个进度
    AcPowerFullVo.prototype.getCurProcessIndex = function () {
        var data = this.cfg.getAchieveList();
        var currNum = this.getProcessNum();
        for (var i = 0; i < data.length; i++) {
            if (currNum < data[i].needNum) {
                return i;
            }
        }
        if (currNum >= this.getCurrMaxProNum()) {
            return data.length - 1;
        }
        return 0;
    };
    //商店购买次数
    AcPowerFullVo.prototype.getShopBuyNum = function (id) {
        if (this.claim && this.claim[id]) {
            return this.claim[id];
        }
        return 0;
    };
    //获取展示对应的数据
    AcPowerFullVo.prototype.getShowSkinData = function () {
        var data = this.cfg.change;
        var itemVo = GameData.formatRewardItem(data.needItem)[0];
        return itemVo;
    };
    Object.defineProperty(AcPowerFullVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.checkAchieveRed() || this.isCanPlay() || this.checkExchangeRed();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取进度奖励
    AcPowerFullVo.prototype.checkAchieveRed = function () {
        var data = this.cfg.getAchieveList();
        var currNum = this.getProcessNum();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (currNum >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否可以兑换
    AcPowerFullVo.prototype.checkExchangeRed = function () {
        var str = this.cfg.change.needItem;
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
    //是否有次数
    AcPowerFullVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    //当前衣装获取数量
    AcPowerFullVo.prototype.getHasSkinNum = function () {
        // let servantInfoVo = Api.servantVoApi.getServantObj("2004");
        // if (servantInfoVo){
        //     return servantInfoVo.getSkinNums();
        // }
        // this.getHasSkinId();
        // let count = 0;
        // let skinIdArr = ["20041", "20042"]
        // for (let i=0; i < skinIdArr.length; i++){
        //     if (Api.servantVoApi.isOwnSkinOfSkinId(skinIdArr[i])){
        //         count +=1;
        //     }
        // }
        // return 0;
        var data = this.getHasSkinId();
        return data.length;
    };
    AcPowerFullVo.prototype.getHasSkinId = function () {
        var data = [];
        var servantInfoVo = Api.servantVoApi.getServantObj("2004");
        if (servantInfoVo) {
            var skinInfo = servantInfoVo.getOwnSkinIdList();
            if (skinInfo) {
                for (var i = 0; i < skinInfo.length; i++) {
                    if (skinInfo[i] != String(this.cfg.show)) {
                        data.push(skinInfo[i]);
                    }
                }
            }
        }
        if (data.length > 1) {
            data.sort(function (a, b) { return Number(a) - Number(b); });
        }
        return data;
    };
    //衣装对话
    AcPowerFullVo.prototype.getShowSkinDialogId = function () {
        var skinNum = this.getHasSkinNum() + 1;
        if (skinNum > 3) {
            skinNum = 3;
        }
        if (this.plotinfo && this.plotinfo[skinNum]) {
            return 0;
        }
        return skinNum;
    };
    //倒计时
    AcPowerFullVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcPowerFullVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcPowerFullVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcPowerFullVo.prototype.dispose = function () {
        this.achRewardId = null;
        _super.prototype.dispose.call(this);
    };
    return AcPowerFullVo;
}(AcBaseVo));
//# sourceMappingURL=AcPowerFullVo.js.map