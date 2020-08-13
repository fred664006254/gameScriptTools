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
    /**
     * 国战配置
     */
    var CountrywarCfg;
    (function (CountrywarCfg) {
        /**
        *--服务器分组数
        */
        CountrywarCfg.warNum = 0;
        /**
         *--最大连胜次数
        */
        CountrywarCfg.servantMaxWin = 0;
        /**
         * --解锁官品
         */
        CountrywarCfg.unlock = 0;
        /**
         * --参加活动最低门客数
         */
        CountrywarCfg.servantLit = 0;
        /**
         * --城池数
         */
        CountrywarCfg.cityNum = 0;
        /**
         * --城池可派遣门客数
         */
        CountrywarCfg.citySerNum = 0;
        /**
         * --可派遣城池数
         */
        CountrywarCfg.cityTotNum = 0;
        /**
         * --门客撤回上限
         */
        CountrywarCfg.servantBack = 0;
        /**
         * --门客撤回上限
         */
        CountrywarCfg.servantBackCost = [];
        /**
         * --具备编辑公告权限的称号
         */
        CountrywarCfg.announceTitle = [];
        /**
         * --公告免费编辑次数
         */
        CountrywarCfg.announceFreeNum = 0;
        /**
         *--公告编辑超过免费次数后的消耗，超过上限值则取上限值 元宝数
         */
        CountrywarCfg.announceCost = [];
        /**
         * --公告花费元宝数
         */
        CountrywarCfg.gemCost = 0;
        /**
         *  --时间表
         */
        CountrywarCfg.readyTime = {};
        /**
        *   --城池选择组合
        */
        CountrywarCfg.cityRandom = [];
        /**
         *  --获胜区奖励
         */
        CountrywarCfg.winnerReward = '';
        /**
        *  --轮空区奖励
        */
        CountrywarCfg.lastReward = '';
        /**
         *  --战败区奖励
         */
        CountrywarCfg.loserReward = '';
        /**
         *  --夺城奖励
         */
        CountrywarCfg.cityOwned = {};
        /**
         * --派遣城池所需最低势力值
         */
        CountrywarCfg.cityLowestPower = {};
        /**
         *  --个人权势排行榜
         */
        CountrywarCfg.rankList = {};
        /**
         *  --锦 囊 商 店
         */
        CountrywarCfg.secretList = {};
        /**
         *  --每日随机门客池
         */
        CountrywarCfg.servantPool = {};
        /**
         *  --胜分计算
         */
        CountrywarCfg.point = {};
        /**
        *  --轮空加分
        */
        CountrywarCfg.loserPointAdd = 0;
        function formatData(data) {
            CountrywarCfg.unlock = data.unlock;
            CountrywarCfg.servantLit = data.servantLit;
            CountrywarCfg.cityNum = data.cityNum;
            CountrywarCfg.citySerNum = data.citySerNum;
            CountrywarCfg.cityTotNum = data.cityTotNum;
            CountrywarCfg.servantBack = data.servantBack;
            CountrywarCfg.servantBackCost = data.servantBackCost;
            CountrywarCfg.announceTitle = data.announceTitle;
            CountrywarCfg.announceFreeNum = data.announceFreeNum;
            CountrywarCfg.announceCost = data.announceCost;
            CountrywarCfg.gemCost = data.gemCost;
            CountrywarCfg.cityRandom = data.cityRandom;
            CountrywarCfg.winnerReward = data.winnerReward;
            CountrywarCfg.loserReward = data.loserReward;
            CountrywarCfg.lastReward = data.lastReward;
            CountrywarCfg.warNum = data.warNum;
            CountrywarCfg.servantMaxWin = data.servantMaxWin;
            CountrywarCfg.loserPointAdd = data.loserPointAdd;
            for (var key in data.readyTime) {
                var itemCfg = void 0;
                var idx = Number(key) + 1;
                if (!CountrywarCfg.readyTime.hasOwnProperty(idx.toString())) {
                    CountrywarCfg.readyTime[idx] = new ReadyTimeCfg();
                }
                itemCfg = CountrywarCfg.readyTime[idx];
                itemCfg.initData(data.readyTime[key]);
                itemCfg.id = idx;
            }
            for (var key in data.cityOwned) {
                var itemCfg = void 0;
                var idx = Number(key) + 1;
                if (!CountrywarCfg.cityOwned.hasOwnProperty(idx.toString())) {
                    CountrywarCfg.cityOwned[idx] = new CityOwnedCfg();
                }
                itemCfg = CountrywarCfg.cityOwned[idx];
                itemCfg.initData(data.cityOwned[key]);
                itemCfg.id = idx;
            }
            for (var key in data.rankList) {
                var itemCfg = void 0;
                var idx = Number(key) + 1;
                if (!CountrywarCfg.rankList.hasOwnProperty(idx.toString())) {
                    CountrywarCfg.rankList[idx] = new RankListCfg();
                }
                itemCfg = CountrywarCfg.rankList[idx];
                itemCfg.initData(data.rankList[key]);
                itemCfg.id = idx;
            }
            for (var key in data.secretList) {
                var itemCfg = void 0;
                var idx = Number(key) + 1;
                if (!CountrywarCfg.secretList.hasOwnProperty(idx.toString())) {
                    CountrywarCfg.secretList[idx] = new SecretListCfg();
                }
                itemCfg = CountrywarCfg.secretList[idx];
                itemCfg.initData(data.secretList[key]);
                itemCfg.id = idx;
            }
            for (var key in data.servantPool) {
                var itemCfg = void 0;
                var idx = Number(key) + 1;
                if (!CountrywarCfg.servantPool.hasOwnProperty(idx.toString())) {
                    CountrywarCfg.servantPool[idx] = new ServantPoolCfg();
                }
                itemCfg = CountrywarCfg.servantPool[idx];
                itemCfg.id = idx;
                itemCfg.servantAddArr = [];
                for (var i in data.servantPool[key]) {
                    var unit = data.servantPool[key][i];
                    var servantAddcfg = new ServantAddCfg();
                    servantAddcfg.id = Number(i) + 1;
                    servantAddcfg.initData(unit);
                    itemCfg.servantAddArr.push(servantAddcfg);
                }
            }
            for (var key in data.point) {
                var itemCfg = void 0;
                var idx = Number(key) + 1;
                if (!CountrywarCfg.point.hasOwnProperty(idx.toString())) {
                    CountrywarCfg.point[idx] = new PointCfg();
                }
                itemCfg = CountrywarCfg.point[idx];
                itemCfg.initData(data.point[key]);
                itemCfg.id = idx;
            }
            for (var key in data.cityLowestPower) {
                var itemCfg = void 0;
                var idx = Number(key) + 1;
                if (!CountrywarCfg.cityLowestPower.hasOwnProperty(idx.toString())) {
                    CountrywarCfg.cityLowestPower[idx] = new CityPowerCfg();
                }
                itemCfg = CountrywarCfg.cityLowestPower[idx];
                itemCfg.initData(data.cityLowestPower[key]);
                itemCfg.id = idx;
            }
        }
        CountrywarCfg.formatData = formatData;
        // /**
        //  *  --获取锦囊列表数据
        //  */
        // export function getItemList():Array<ItemListCfg>{	
        //     return getArr(itemList);  
        // }
        // /**
        //  *  --获取职位加成
        //  */
        // export function getAllianceOfficer():Array<AllianceOfficerCfg>{	
        //     return getArr(allianceOfficer);  
        // }
        /**
        *  --积分计算
        */
        function getPoint() {
            return getArr(CountrywarCfg.point);
        }
        CountrywarCfg.getPoint = getPoint;
        /**
         *  --夺城奖励
         */
        function getCityReward() {
            return getArr(CountrywarCfg.cityOwned);
        }
        CountrywarCfg.getCityReward = getCityReward;
        /**
         * 个人权势
         */
        function getRankListCfg() {
            return getArr(CountrywarCfg.rankList);
        }
        CountrywarCfg.getRankListCfg = getRankListCfg;
        /**
         * 个人权势
         */
        function getSecretListCfg() {
            return getArr(CountrywarCfg.secretList);
        }
        CountrywarCfg.getSecretListCfg = getSecretListCfg;
        function getArr(key) {
            var arr = [];
            if (key) {
                var list = key;
                for (var i in list) {
                    var currObj = list[i];
                    if (currObj) {
                        arr.push(currObj);
                    }
                }
            }
            return arr;
        }
    })(CountrywarCfg = Config.CountrywarCfg || (Config.CountrywarCfg = {}));
    /**
     *
     *  --时间表
        --readyTime：派遣开始时间
        --warTime：战斗开始时间
        --resultTime：结算开始时间
        --endTime：一轮结束时间
    */
    var ReadyTimeCfg = (function (_super) {
        __extends(ReadyTimeCfg, _super);
        function ReadyTimeCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ReadyTimeCfg;
    }(BaseItemCfg));
    Config.ReadyTimeCfg = ReadyTimeCfg;
    __reflect(ReadyTimeCfg.prototype, "Config.ReadyTimeCfg");
    /**
     *
    --夺城奖励
    --cityNum：所夺城池数
    --cityReward：奖励
    */
    var CityOwnedCfg = (function (_super) {
        __extends(CityOwnedCfg, _super);
        function CityOwnedCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(CityOwnedCfg.prototype, "rewardIcons", {
            get: function () {
                // this.getReward += (`18_0001_${this.zongziGet}`);
                return GameData.getRewardItemIcons(this.cityReward, true, false);
            },
            enumerable: true,
            configurable: true
        });
        return CityOwnedCfg;
    }(BaseItemCfg));
    Config.CityOwnedCfg = CityOwnedCfg;
    __reflect(CityOwnedCfg.prototype, "Config.CityOwnedCfg");
    /**
     *
    --个人权势排行榜
    --rankGap：排名上限
    --powerReward：奖励
    */
    var RankListCfg = (function (_super) {
        __extends(RankListCfg, _super);
        function RankListCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(RankListCfg.prototype, "minRank", {
            get: function () {
                return this.rankGap[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RankListCfg.prototype, "maxRank", {
            get: function () {
                return this.rankGap[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RankListCfg.prototype, "rewardIcons", {
            get: function () {
                // this.getReward += (`18_0001_${this.zongziGet}`);
                return GameData.getRewardItemIcons(this.powerReward, true, false);
            },
            enumerable: true,
            configurable: true
        });
        return RankListCfg;
    }(BaseItemCfg));
    __reflect(RankListCfg.prototype, "RankListCfg");
    /**
   * --【锦 囊 商 店】
      --item：道具ID
      --powerup：自己提升战斗力
      --powerdown：敌方减少战斗力
      --moreguest：额外派遣门客数量
      --wins：本轮连胜上限
      --times：抵挡挫志次数
      --cost：购买价格
  */
    var SecretListCfg = (function (_super) {
        __extends(SecretListCfg, _super);
        function SecretListCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SecretListCfg;
    }(BaseItemCfg));
    __reflect(SecretListCfg.prototype, "SecretListCfg");
    /**
    */
    var ServantPoolCfg = (function (_super) {
        __extends(ServantPoolCfg, _super);
        function ServantPoolCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ServantPoolCfg;
    }(BaseItemCfg));
    Config.ServantPoolCfg = ServantPoolCfg;
    __reflect(ServantPoolCfg.prototype, "Config.ServantPoolCfg");
    /**
     *--每日随机门客池
       --servant1：门客1
        --powerUp1：门客1势力加成
        --servant2：门客2
        --powerUp2：门客2势力加成
        --servant3：门客3
        --powerUp3：门客3势力加成
     */
    var ServantAddCfg = (function (_super) {
        __extends(ServantAddCfg, _super);
        function ServantAddCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ServantAddCfg;
    }(BaseItemCfg));
    Config.ServantAddCfg = ServantAddCfg;
    __reflect(ServantAddCfg.prototype, "Config.ServantAddCfg");
    /**
    *胜分计算
    */
    var PointCfg = (function (_super) {
        __extends(PointCfg, _super);
        function PointCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PointCfg;
    }(BaseItemCfg));
    __reflect(PointCfg.prototype, "PointCfg");
    /**
    *--派遣城池所需最低势力值
    --power：最低派遣势力
    */
    var CityPowerCfg = (function (_super) {
        __extends(CityPowerCfg, _super);
        function CityPowerCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CityPowerCfg;
    }(BaseItemCfg));
    __reflect(CityPowerCfg.prototype, "CityPowerCfg");
})(Config || (Config = {}));
//# sourceMappingURL=CountrywarCfg.js.map