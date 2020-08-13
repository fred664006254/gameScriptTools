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
var Config;
(function (Config) {
    var DailybossnewCfg;
    (function (DailybossnewCfg) {
        /**
         * 晚上BOSS
         */
        DailybossnewCfg.boss2 = {};
        /**
         * 每日限购次数
         */
        DailybossnewCfg.shopList = {};
        function getShopList() {
            var shoptemp = [];
            for (var k in DailybossnewCfg.shopList) {
                if (DailybossnewCfg.shopList[k] && DailybossnewCfg.shopList[k].levelNeed <= Api.playerVoApi.getPlayerLevel()) {
                    if (DailybossnewCfg.shopList[k].getReward == "6_1740_1") {
                        if (Api.switchVoApi.checkOpenServantLevel450()) {
                            shoptemp.push(DailybossnewCfg.shopList[k]);
                        }
                    }
                    else {
                        shoptemp.push(DailybossnewCfg.shopList[k]);
                    }
                }
            }
            return shoptemp;
        }
        DailybossnewCfg.getShopList = getShopList;
        function getShopItemById(id) {
            return DailybossnewCfg.shopList[id];
        }
        DailybossnewCfg.getShopItemById = getShopItemById;
        function getBossNameByType(type) {
            return LanguageManager.getlocal("dailybossTitleNew");
        }
        DailybossnewCfg.getBossNameByType = getBossNameByType;
        function checkInBoss2Time(leftDayTime) {
            var startTime = DailybossnewCfg.boss2Time[0] * App.DateUtil.hourSeconds;
            var endTime = DailybossnewCfg.boss2Time[1] * App.DateUtil.hourSeconds;
            if (leftDayTime >= startTime && leftDayTime <= endTime) {
                return true;
            }
            return false;
        }
        DailybossnewCfg.checkInBoss2Time = checkInBoss2Time;
        /**
         * 返回boss战状态0等待开始状态,1开始,2结束等待下一轮
         */
        function getStatus(leftDayTime) {
            var status = 0;
            var start1Time = DailybossnewCfg.boss2Time[0] * App.DateUtil.hourSeconds;
            var end1Time = DailybossnewCfg.boss2Time[1] * App.DateUtil.hourSeconds;
            var start2Time = DailybossnewCfg.boss2Time[0] * App.DateUtil.hourSeconds;
            var end2Time = DailybossnewCfg.boss2Time[1] * App.DateUtil.hourSeconds;
            if (leftDayTime < start1Time) {
                status = 0;
            }
            else if (leftDayTime >= start1Time && leftDayTime <= end1Time) {
                status = 1;
            }
            else if (leftDayTime > end1Time) {
                if (leftDayTime < start2Time) {
                    status = 0;
                }
                else if (leftDayTime >= start2Time && leftDayTime <= end2Time) {
                    status = 1;
                }
                else if (leftDayTime > end2Time) {
                    status = 2;
                }
            }
            return status;
        }
        DailybossnewCfg.getStatus = getStatus;
        /**
         * 返回boss战状态0等待开始状态,1开始,2结束等待下一轮
         */
        function getStatusByName(leftDayTime, name) {
            var status = 0;
            var startTime;
            var endTime;
            startTime = DailybossnewCfg.boss2Time[0] * App.DateUtil.hourSeconds;
            endTime = DailybossnewCfg.boss2Time[1] * App.DateUtil.hourSeconds;
            if (leftDayTime >= startTime && leftDayTime <= endTime) {
                status = 1;
            }
            return status;
        }
        DailybossnewCfg.getStatusByName = getStatusByName;
        function getInTimeStr(type) {
            var boos1Time = App.DateUtil.formatSvrHourByLocalTimeZone(DailybossnewCfg.boss2Time[0]).hour;
            var boos1Time2 = App.DateUtil.formatSvrHourByLocalTimeZone(DailybossnewCfg.boss2Time[1]).hour;
            var boos2Time = App.DateUtil.formatSvrHourByLocalTimeZone(DailybossnewCfg.boss2Time[0]).hour;
            var boos2Time2 = App.DateUtil.formatSvrHourByLocalTimeZone(DailybossnewCfg.boss2Time[1]).hour;
            if (type == 1) {
                if (boos1Time2 == 0) {
                    boos1Time2 = 24;
                }
                return boos1Time + ":00-" + boos1Time2 + ":00";
            }
            else {
                if (boos2Time2 == 0) {
                    boos2Time2 = 24;
                }
                return boos2Time + ":00-" + boos2Time2 + ":00";
            }
        }
        DailybossnewCfg.getInTimeStr = getInTimeStr;
        function getNextStartLeftTime(leftDayTime) {
            var status = getStatus(leftDayTime);
            var start1Time = DailybossnewCfg.boss2Time[0] * App.DateUtil.hourSeconds;
            var start2Time = DailybossnewCfg.boss2Time[0] * App.DateUtil.hourSeconds;
            if (status == 0) {
                if (leftDayTime < start1Time) {
                    return start1Time - leftDayTime;
                }
                else {
                    return start2Time - leftDayTime;
                }
            }
            return 0;
        }
        DailybossnewCfg.getNextStartLeftTime = getNextStartLeftTime;
        function getEndTimeByName(leftDayTime, name) {
            var endTime;
            if (name == "boss1") {
                endTime = DailybossnewCfg.boss2Time[1] * App.DateUtil.hourSeconds;
            }
            else {
                endTime = DailybossnewCfg.boss2Time[1] * App.DateUtil.hourSeconds;
            }
            return endTime - leftDayTime;
        }
        DailybossnewCfg.getEndTimeByName = getEndTimeByName;
        function getNextStartLeftTimeByName(leftDayTime, name) {
            var status = getStatusByName(leftDayTime, name);
            var startTime;
            if (name == "boss1") {
                startTime = DailybossnewCfg.boss2Time[0] * App.DateUtil.hourSeconds;
            }
            else {
                startTime = DailybossnewCfg.boss2Time[0] * App.DateUtil.hourSeconds;
            }
            if (status == 0) {
                if (leftDayTime < startTime) {
                    return startTime - leftDayTime;
                }
                else {
                    return startTime - leftDayTime + 86400;
                }
            }
            return 0;
        }
        DailybossnewCfg.getNextStartLeftTimeByName = getNextStartLeftTimeByName;
        function getLeftTime(leftDayTime) {
            var leftTime = 0;
            var endTime = DailybossnewCfg.boss2Time[1] * App.DateUtil.hourSeconds;
            leftTime = endTime - leftDayTime;
            return leftTime;
        }
        DailybossnewCfg.getLeftTime = getLeftTime;
        function formatData(data) {
            for (var key in data) {
                if (key == "shop") {
                    var shopData = data[key];
                    for (var shopkey in shopData) {
                        var dailyBossShopItemCfg = new DailybossnewShopItemCfg();
                        dailyBossShopItemCfg.initData(shopData[shopkey]);
                        dailyBossShopItemCfg.id = Number(shopkey) + 1;
                        DailybossnewCfg.shopList[dailyBossShopItemCfg.id] = dailyBossShopItemCfg;
                    }
                }
                else if (key == "boss2") {
                    DailybossnewCfg.boss2 = data[key];
                }
                else if (key == "boss2Time") {
                    DailybossnewCfg.boss2Time = data[key];
                }
                else {
                    if (!Config.DailybossCfg[key]) {
                        Config.DailybossCfg[key] = data[key];
                    }
                }
            }
        }
        DailybossnewCfg.formatData = formatData;
    })(DailybossnewCfg = Config.DailybossnewCfg || (Config.DailybossnewCfg = {}));
    /**
     * 排名奖励
     */
    var DailybossnewAwardCfg = (function (_super) {
        __extends(DailybossnewAwardCfg, _super);
        function DailybossnewAwardCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DailybossnewAwardCfg;
    }(BaseItemCfg));
    Config.DailybossnewAwardCfg = DailybossnewAwardCfg;
    __reflect(DailybossnewAwardCfg.prototype, "Config.DailybossnewAwardCfg");
    /**
     * boss商店
     */
    var DailybossnewShopItemCfg = (function (_super) {
        __extends(DailybossnewShopItemCfg, _super);
        function DailybossnewShopItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.levelNeed = 0;
            return _this;
        }
        Object.defineProperty(DailybossnewShopItemCfg.prototype, "itemCfg", {
            get: function () {
                return Config.ItemCfg.getItemCfgById(this.getReward.split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DailybossnewShopItemCfg.prototype, "name", {
            get: function () {
                return this.itemCfg.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DailybossnewShopItemCfg.prototype, "iconContainer", {
            get: function () {
                return this.itemCfg.getIconContainer(true);
            },
            enumerable: true,
            configurable: true
        });
        DailybossnewShopItemCfg.prototype.getNeedScoreByNum = function (num) {
            if (!num) {
                num = 0;
            }
            num = Math.max(0, Math.min(this.needScore.length - 1, num));
            return this.needScore[num];
        };
        return DailybossnewShopItemCfg;
    }(BaseItemCfg));
    Config.DailybossnewShopItemCfg = DailybossnewShopItemCfg;
    __reflect(DailybossnewShopItemCfg.prototype, "Config.DailybossnewShopItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=DailybossnewCfg.js.map