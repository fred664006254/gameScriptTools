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
 * 兰亭荷花
 * date 2020.4.14
 * author yangchengguo
 * @class AcLotusVo
 */
var AcLotusVo = (function (_super) {
    __extends(AcLotusVo, _super);
    function AcLotusVo() {
        return _super.call(this) || this;
    }
    AcLotusVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //是否免费
    AcLotusVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //道具数量
    AcLotusVo.prototype.getToolNum = function () {
        if (this.num) {
            return this.num;
        }
        return 0;
    };
    //充值数量
    AcLotusVo.prototype.getRechargeNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    /**当前进度 */
    AcLotusVo.prototype.getProcessNum = function () {
        if (this.ainfo && this.ainfo.v) {
            return this.ainfo.v;
        }
        return 0;
    };
    /**当前进度奖励是否领取 */
    AcLotusVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcLotusVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveList();
        var count = achieveData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetAchieveRewardById(achieveData[i].id)) {
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.getProcessNum() >= achieveData[i].specialnum) {
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
    AcLotusVo.prototype.getCurrMaxProNum = function () {
        var data = this.cfg.getAchieveList();
        return data[data.length - 1].specialnum;
    };
    //可领奖励id
    AcLotusVo.prototype.getAchieveRewardId = function () {
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].specialnum) {
                    return data[i].id;
                }
            }
        }
        return 0;
    };
    //当前到哪个进度
    AcLotusVo.prototype.getCurProcessIndex = function () {
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (this.getProcessNum() < data[i].specialnum) {
                return i;
            }
        }
        if (this.getProcessNum() >= this.getCurrMaxProNum()) {
            return data.length - 1;
        }
        return 0;
    };
    //获取展示对应的数据
    AcLotusVo.prototype.getShowSkinData = function () {
        var data = this.cfg.exchange;
        var itemVo = GameData.formatRewardItem(data.needParts)[0];
        return itemVo;
    };
    Object.defineProperty(AcLotusVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchieveReward() || this.isCanPlay() || this.isCanExchange();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取进度奖励
    AcLotusVo.prototype.isCangetAchieveReward = function () {
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].specialnum) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否可以兑换
    AcLotusVo.prototype.isCanExchange = function () {
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
    //是否有次数
    AcLotusVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    //倒计时
    AcLotusVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcLotusVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcLotusVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotusVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcLotusVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLotusVo;
}(AcBaseVo));
__reflect(AcLotusVo.prototype, "AcLotusVo");
//# sourceMappingURL=AcLotusVo.js.map