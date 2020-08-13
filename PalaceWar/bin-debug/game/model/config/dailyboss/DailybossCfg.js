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
    var DailybossCfg;
    (function (DailybossCfg) {
        /**
         * 中午BOSS 突厥来袭
         */
        var boss1;
        /**
         * 晚上BOSS
         */
        var boss2;
        /**
         * 每日限购次数
         */
        var shop = {};
        /**
         * 雁门关中午通关礼包
         */
        DailybossCfg.boss1MaxNum = 0;
        DailybossCfg.shopList = [];
        function getShopList() {
            var shoptemp = [];
            for (var k in DailybossCfg.shopList) {
                if (DailybossCfg.shopList[k] && DailybossCfg.shopList[k].levelNeed <= Api.playerVoApi.getPlayerLevel()) {
                    if (DailybossCfg.shopList[k].content == "6_1740_1") {
                        if (Api.switchVoApi.checkOpenServantLevel450()) {
                            shoptemp.push(DailybossCfg.shopList[k]);
                        }
                    }
                    else if (DailybossCfg.shopList[k].special) {
                        if (DailybossCfg.shopList[k].special == PlatformManager.getSpidKey()) {
                            shoptemp.push(DailybossCfg.shopList[k]);
                        }
                    }
                    else {
                        shoptemp.push(DailybossCfg.shopList[k]);
                    }
                }
            }
            return shoptemp;
        }
        DailybossCfg.getShopList = getShopList;
        function getShopItemById(id) {
            return shop[id];
        }
        DailybossCfg.getShopItemById = getShopItemById;
        function getBossNameByType(type) {
            return LanguageManager.getlocal("dailybossTitle" + type);
        }
        DailybossCfg.getBossNameByType = getBossNameByType;
        function checkInBoss1Time(leftDayTime) {
            var startTime = DailybossCfg.boss1Time[0] * App.DateUtil.hourSeconds;
            var endTime = DailybossCfg.boss1Time[1] * App.DateUtil.hourSeconds;
            if (leftDayTime >= startTime && leftDayTime <= endTime) {
                return true;
            }
            return false;
        }
        DailybossCfg.checkInBoss1Time = checkInBoss1Time;
        function checkInBoss2Time(leftDayTime) {
            var startTime = DailybossCfg.boss2Time[0] * App.DateUtil.hourSeconds;
            var endTime = DailybossCfg.boss2Time[1] * App.DateUtil.hourSeconds;
            if (leftDayTime >= startTime && leftDayTime <= endTime) {
                return true;
            }
            return false;
        }
        DailybossCfg.checkInBoss2Time = checkInBoss2Time;
        /**
         * 返回boss战状态0等待开始状态,1开始,2结束等待下一轮
         */
        function getStatus(leftDayTime) {
            var status = 0;
            var start1Time = DailybossCfg.boss1Time[0] * App.DateUtil.hourSeconds;
            var end1Time = DailybossCfg.boss1Time[1] * App.DateUtil.hourSeconds;
            var start2Time = DailybossCfg.boss2Time[0] * App.DateUtil.hourSeconds;
            var end2Time = DailybossCfg.boss2Time[1] * App.DateUtil.hourSeconds;
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
        DailybossCfg.getStatus = getStatus;
        /**
         * 返回boss战状态0等待开始状态,1开始,2结束等待下一轮
         */
        function getStatusByName(leftDayTime, name) {
            var status = 0;
            var startTime;
            var endTime;
            if (name == "boss1") {
                startTime = DailybossCfg.boss1Time[0] * App.DateUtil.hourSeconds;
                endTime = DailybossCfg.boss1Time[1] * App.DateUtil.hourSeconds;
            }
            else {
                startTime = DailybossCfg.boss2Time[0] * App.DateUtil.hourSeconds;
                endTime = DailybossCfg.boss2Time[1] * App.DateUtil.hourSeconds;
            }
            if (leftDayTime >= startTime && leftDayTime <= endTime) {
                status = 1;
            }
            return status;
        }
        DailybossCfg.getStatusByName = getStatusByName;
        function getInTimeStr(type) {
            var boos1Time = App.DateUtil.formatSvrHourByLocalTimeZone(DailybossCfg.boss1Time[0]).hour;
            var boos1Time2 = App.DateUtil.formatSvrHourByLocalTimeZone(DailybossCfg.boss1Time[1]).hour;
            var boos2Time = App.DateUtil.formatSvrHourByLocalTimeZone(DailybossCfg.boss2Time[0]).hour;
            var boos2Time2 = App.DateUtil.formatSvrHourByLocalTimeZone(DailybossCfg.boss2Time[1]).hour;
            if (type == 1) {
                return boos1Time + ":00-" + boos1Time2 + ":00";
            }
            else {
                return boos2Time + ":00-" + boos2Time2 + ":00";
            }
        }
        DailybossCfg.getInTimeStr = getInTimeStr;
        function getNextStartLeftTime(leftDayTime) {
            var status = getStatus(leftDayTime);
            var start1Time = DailybossCfg.boss1Time[0] * App.DateUtil.hourSeconds;
            var start2Time = DailybossCfg.boss2Time[0] * App.DateUtil.hourSeconds;
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
        DailybossCfg.getNextStartLeftTime = getNextStartLeftTime;
        function getEndTimeByName(leftDayTime, name) {
            var endTime;
            if (name == "boss1") {
                endTime = DailybossCfg.boss1Time[1] * App.DateUtil.hourSeconds;
            }
            else {
                endTime = DailybossCfg.boss2Time[1] * App.DateUtil.hourSeconds;
            }
            return endTime - leftDayTime;
        }
        DailybossCfg.getEndTimeByName = getEndTimeByName;
        function getNextStartLeftTimeByName(leftDayTime, name) {
            var status = getStatusByName(leftDayTime, name);
            var startTime;
            if (name == "boss1") {
                startTime = DailybossCfg.boss1Time[0] * App.DateUtil.hourSeconds;
            }
            else {
                startTime = DailybossCfg.boss2Time[0] * App.DateUtil.hourSeconds;
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
        DailybossCfg.getNextStartLeftTimeByName = getNextStartLeftTimeByName;
        function getLeftTime(leftDayTime) {
            var leftTime = 0;
            if (checkInBoss1Time(leftDayTime)) {
                var endTime = DailybossCfg.boss1Time[1] * App.DateUtil.hourSeconds;
                leftTime = endTime - leftDayTime;
            }
            else if (checkInBoss2Time(leftDayTime)) {
                var endTime = DailybossCfg.boss2Time[1] * App.DateUtil.hourSeconds;
                leftTime = endTime - leftDayTime;
            }
            return leftTime;
        }
        DailybossCfg.getLeftTime = getLeftTime;
        function formatData(data) {
            for (var key in data) {
                if (key == "shop") {
                    var shopData = data[key];
                    for (var shopkey in shopData) {
                        var dailyBossShopItemCfg = new DailybossShopItemCfg();
                        dailyBossShopItemCfg.initData(shopData[shopkey]);
                        dailyBossShopItemCfg.id = String(shopkey);
                        shop[shopkey] = dailyBossShopItemCfg;
                        DailybossCfg.shopList.push(dailyBossShopItemCfg);
                    }
                    DailybossCfg.shopList.sort(function (a, b) {
                        return Number(a.id) - Number(b.id);
                    });
                }
                else if (key == "boss1") {
                    boss1 = data[key];
                }
                else if (key == "boss2") {
                    boss2 = data[key];
                }
                else if (key == "boss1MaxNum") {
                    DailybossCfg.boss1MaxNum = data[key];
                }
                else {
                    if (!DailybossCfg[key]) {
                        DailybossCfg[key] = data[key];
                    }
                }
            }
        }
        DailybossCfg.formatData = formatData;
        function formatDataByServer(data) {
            for (var key in data) {
                DailybossCfg[key] = data[key];
            }
        }
        DailybossCfg.formatDataByServer = formatDataByServer;
    })(DailybossCfg = Config.DailybossCfg || (Config.DailybossCfg = {}));
    /**
     * boss商店
     */
    var DailybossShopItemCfg = (function (_super) {
        __extends(DailybossShopItemCfg, _super);
        function DailybossShopItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.levelNeed = 0;
            return _this;
        }
        Object.defineProperty(DailybossShopItemCfg.prototype, "itemCfg", {
            get: function () {
                return Config.ItemCfg.getItemCfgById(this.content.split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DailybossShopItemCfg.prototype, "name", {
            get: function () {
                return this.itemCfg.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DailybossShopItemCfg.prototype, "iconContainer", {
            get: function () {
                return this.itemCfg.getIconContainer(true);
            },
            enumerable: true,
            configurable: true
        });
        DailybossShopItemCfg.prototype.getNeedScoreByNum = function (num) {
            if (!num) {
                num = 0;
            }
            num = Math.max(0, Math.min(this.needScore.length - 1, num));
            return this.needScore[num];
        };
        return DailybossShopItemCfg;
    }(BaseItemCfg));
    Config.DailybossShopItemCfg = DailybossShopItemCfg;
    __reflect(DailybossShopItemCfg.prototype, "Config.DailybossShopItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=DailybossCfg.js.map