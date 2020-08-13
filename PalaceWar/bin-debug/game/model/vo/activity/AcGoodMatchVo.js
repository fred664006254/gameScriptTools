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
 * 情系良缘
 * date 2020.7.21
 * author ycg
 * @class AcGoodMatchVo
 */
var AcGoodMatchVo = /** @class */ (function (_super) {
    __extends(AcGoodMatchVo, _super);
    function AcGoodMatchVo() {
        var _this = _super.call(this) || this;
        _this.map = null; // 地图数据
        return _this;
    }
    AcGoodMatchVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcGoodMatchVo.prototype.setAchRewardId = function (id) {
        this.achRewardId = id;
    };
    AcGoodMatchVo.prototype.getAchRewardId = function () {
        return this.achRewardId;
    };
    //是否免费
    AcGoodMatchVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //道具数量
    AcGoodMatchVo.prototype.getToolNum = function () {
        if (this.num) {
            return this.num;
        }
        return 0;
    };
    //充值数量
    AcGoodMatchVo.prototype.getRechargeNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    AcGoodMatchVo.prototype.getNeedRecharge = function () {
        var currNum = this.getRechargeNum();
        var num = this.cfg.needGem - currNum % this.cfg.needGem;
        return num;
    };
    /**当前进度 */
    AcGoodMatchVo.prototype.getProcessNum = function () {
        if (this.ainfo && this.ainfo.v) {
            return this.ainfo.v;
        }
        return 0;
    };
    /**当前进度奖励是否领取 */
    AcGoodMatchVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcGoodMatchVo.prototype.getSortAchievementCfg = function () {
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
    AcGoodMatchVo.prototype.getCurrMaxProNum = function () {
        var data = this.cfg.getAchieveList();
        return data[data.length - 1].needNum;
    };
    //可领奖励id
    AcGoodMatchVo.prototype.getAchieveRewardId = function () {
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
    AcGoodMatchVo.prototype.getCurProcessIndex = function () {
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
    //全服进度相关
    AcGoodMatchVo.prototype.isGetServerRewardById = function (id) {
        if (this.zinfo && this.zinfo.flags && this.zinfo.flags[id]) {
            return true;
        }
        return false;
    };
    //全服当前进度
    AcGoodMatchVo.prototype.getServerProcessNum = function () {
        if (this.zinfo && this.zinfo.v) {
            return this.zinfo.v;
        }
        return 0;
    };
    AcGoodMatchVo.prototype.getSortServerAchievementCfg = function () {
        var achieveData = this.cfg.getServerAchieveList();
        var count = achieveData.length;
        var data = [];
        var currNum = this.getServerProcessNum();
        var pCurrNum = this.getProcessNum();
        for (var i = 0; i < count; i++) {
            if (this.isGetServerRewardById(achieveData[i].id)) {
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (currNum >= achieveData[i].needNum2 && pCurrNum >= achieveData[i].needNum1) {
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
    AcGoodMatchVo.prototype.checkServerRewardRed = function () {
        var currNum = this.getServerProcessNum();
        var pCurrNum = this.getProcessNum();
        var data = this.cfg.getServerAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetServerRewardById(data[i].id) && currNum >= data[i].needNum2 && pCurrNum >= data[i].needNum1) {
                return true;
            }
        }
        return false;
    };
    //奖池id
    AcGoodMatchVo.prototype.getPoolRewardId = function () {
        var currNum = this.getProcessNum();
        var id = this.matchtype;
        if (id == 0) {
            if (currNum == 0) {
                id = 0;
            }
            else {
                id = 1;
            }
        }
        return id;
    };
    AcGoodMatchVo.prototype.getMapData = function () {
        if (this.map) {
            return this.map;
        }
        return null;
    };
    //剩余气球数量
    AcGoodMatchVo.prototype.getCurrBallNum = function () {
        var count = 0;
        if (this.map) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i] == 0) {
                    count++;
                }
            }
        }
        else {
            count = 16;
        }
        return count;
    };
    //获取展示对应的数据
    AcGoodMatchVo.prototype.getShowSkinData = function () {
        var data = this.cfg.change;
        var itemVo = GameData.formatRewardItem(data.needItem)[0];
        return itemVo;
    };
    Object.defineProperty(AcGoodMatchVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.checkAchieveRed() || this.checkServerRewardRed() || this.isCanPlay() || this.checkExchangeRed();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取进度奖励
    AcGoodMatchVo.prototype.checkAchieveRed = function () {
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
    AcGoodMatchVo.prototype.checkExchangeRed = function () {
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
    AcGoodMatchVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    //倒计时
    AcGoodMatchVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcGoodMatchVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcGoodMatchVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGoodMatchVo.prototype.dispose = function () {
        this.achRewardId = null;
        this.isfree = 0;
        this.ainfo = null;
        this.zinfo = null;
        this.map = null;
        this.matchtype = 0;
        _super.prototype.dispose.call(this);
    };
    return AcGoodMatchVo;
}(AcBaseVo));
//# sourceMappingURL=AcGoodMatchVo.js.map