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
         * 晚上BOSS
         */
        var boss2;
        /**
         * 每日限购次数
         */
        var shop = {};
        DailybossCfg.shopList = [];
        function getShopItemById(id) {
            return shop[id];
        }
        DailybossCfg.getShopItemById = getShopItemById;
        function getShopByOpenTime() {
            var shops = [];
            var splist = Config.DailybossCfg.shopList;
            // let j=1
            for (var i = 0; i < splist.length; i++) {
                var day = Math.ceil((GameData.serverTime - GameData.serverOpenTime) / 86400);
                if (day >= splist[i]["timeRange"][0] && day <= splist[i]["timeRange"][1]) {
                    // splist[i].id = j+""
                    shops.push(splist[i]);
                    // j++
                }
            }
            return shops;
        }
        DailybossCfg.getShopByOpenTime = getShopByOpenTime;
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
        function getInTimeStr(type) {
            if (type == 1) {
                return DailybossCfg.boss1Time[0] + ":00-" + DailybossCfg.boss1Time[1] + ":00";
            }
            else {
                return DailybossCfg.boss2Time[0] + ":00-" + DailybossCfg.boss2Time[1] + ":00";
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
                    DailybossCfg.boss1 = data[key];
                }
                else if (key == "boss2") {
                    boss2 = data[key];
                }
                else {
                    if (!DailybossCfg[key]) {
                        DailybossCfg[key] = data[key];
                    }
                }
                // boss1MaxNum = 3;
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
            return _super !== null && _super.apply(this, arguments) || this;
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
