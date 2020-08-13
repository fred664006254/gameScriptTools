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
 * 鼠来招财
 * date 2020.6.30
 * author wxz
 * @class AcMouseGoldVo
 */
var AcMouseGoldVo = /** @class */ (function (_super) {
    __extends(AcMouseGoldVo, _super);
    function AcMouseGoldVo() {
        var _this = _super.call(this) || this;
        _this.layer = 0;
        return _this;
    }
    AcMouseGoldVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcMouseGoldVo.prototype.getMapDataById = function (id) {
        if (this.map && this.map[String(id)]) {
            return this.map[String(id)];
        }
        else {
            return null;
        }
    };
    AcMouseGoldVo.prototype.getTempMapDataById = function (id) {
        if (this.tempMap && this.tempMap[String(id)]) {
            var obj = this.tempMap[String(id)];
            obj.flag = 1;
            if (obj.itemid) {
                obj.isget = 1;
            }
            return obj;
        }
        else {
            return null;
        }
    };
    AcMouseGoldVo.prototype.getMapItems = function () {
        var retObj = {};
        for (var i = 0; i < this.cfg.special.length; i++) {
            retObj[this.cfg.special[i]] = 0;
        }
        for (var key in this.map) {
            if (this.map[key].itemid) {
                if (!this.map[key].isget) {
                    if (retObj[this.map[key].itemid] >= 0) {
                        retObj[this.map[key].itemid]++;
                    }
                }
            }
        }
        return retObj;
    };
    AcMouseGoldVo.prototype.checkCanClick = function (index) {
        var indexX = index % 4;
        var indexY = Math.floor(index / 4);
        for (var key in this.map) {
            if (this.map[key].flag) {
                var num = parseInt(key) - 1;
                var numX = num % 4;
                var numY = Math.floor(num / 4);
                if (Math.abs(numX - indexX) + Math.abs(numY - indexY) < 2) {
                    return true;
                }
            }
        }
        return false;
    };
    AcMouseGoldVo.prototype.isShowMapDot = function () {
        for (var key in this.map) {
            if (this.map[key].itemid && !this.map[key].isget && this.map[key].flag) {
                return true;
            }
        }
        return false;
    };
    AcMouseGoldVo.prototype.getAllCost = function () {
        var count = 0;
        for (var key in this.map) {
            if (!this.map[key].flag) {
                count++;
            }
        }
        return count;
    };
    AcMouseGoldVo.prototype.getDoorPos = function () {
        var pos = 1;
        for (var key in this.map) {
            if (this.map[key].door) {
                pos = parseInt(key);
                break;
            }
        }
        return pos;
    };
    //是否免费
    AcMouseGoldVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    AcMouseGoldVo.prototype.getRechargeNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    AcMouseGoldVo.prototype.getNeedRecharge = function () {
        var num = this.getRechargeNum();
        var needNum = this.cfg.needGem - num % this.cfg.needGem;
        return needNum;
    };
    //道具数量
    AcMouseGoldVo.prototype.getToolNum = function () {
        if (this.num) {
            return this.num;
        }
        return 0;
    };
    /**当前进度 */
    AcMouseGoldVo.prototype.getProcessNum = function () {
        if (this.ainfo && this.ainfo.v) {
            return this.ainfo.v;
        }
        return 0;
    };
    /**当前进度奖励是否领取 */
    AcMouseGoldVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcMouseGoldVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveCfg();
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
    AcMouseGoldVo.prototype.getMaxProNum = function () {
        var data = this.cfg.getAchieveCfg();
        return data[data.length - 1].specialnum;
    };
    //当前进度id
    AcMouseGoldVo.prototype.getCurrProIndex = function () {
        var data = this.cfg.getAchieveCfg();
        var currNum = this.getProcessNum();
        for (var i = 0; i < data.length; i++) {
            if (currNum < data[i].specialnum) {
                return i;
            }
        }
        if (currNum >= this.getMaxProNum()) {
            return -1;
        }
        return 0;
    };
    //可领奖励id
    AcMouseGoldVo.prototype.getAchieveRewardId = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].specialnum) {
                    return data[i].id;
                }
            }
        }
        return 0;
    };
    AcMouseGoldVo.prototype.getShowSkinData = function () {
        var data = this.cfg.exchange;
        var itemVo = GameData.formatRewardItem(data.needParts)[0];
        return itemVo;
    };
    Object.defineProperty(AcMouseGoldVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchieveReward() || this.isCanPlay() || this.isCanExchange() || this.isShowMapDot();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取进度奖励
    AcMouseGoldVo.prototype.isCangetAchieveReward = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].specialnum) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否有免费次数
    AcMouseGoldVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    //是否可以兑换
    AcMouseGoldVo.prototype.isCanExchange = function () {
        var str = this.cfg.exchange.needItem;
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
    AcMouseGoldVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcMouseGoldVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcMouseGoldVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcMouseGoldVo;
}(AcBaseVo));
//# sourceMappingURL=AcMouseGoldVo.js.map