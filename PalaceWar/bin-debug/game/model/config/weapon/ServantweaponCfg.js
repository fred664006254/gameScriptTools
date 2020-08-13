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
var Config;
(function (Config) {
    var ServantweaponCfg;
    (function (ServantweaponCfg) {
        /**
         * 神器
         */
        var weaponList = {};
        /**
        --神器等级经验表  初始为1级，1级的为1升2的消耗
        --lv:等级
        --needItem:需要道具
         */
        ServantweaponCfg.weaponLv = {};
        /**
         * 神器进阶
         */
        var weaponPromotion = {};
        /**
         * 铸魂消耗
         * needItem:需要道具数量，每个神器需要的道具就是自己
         */
        ServantweaponCfg.weaponSoul = {};
        /**
           * 珍器坊商店
           */
        var shop1 = {};
        var shop2 = {};
        var shop_part3 = {};
        function formatData(data) {
            ServantweaponCfg.lvNeed = data.lvNeed;
            ServantweaponCfg.weaponLv = data.weaponLv;
            ServantweaponCfg.weaponSoul = data.weaponSoul;
            for (var key in data.weapon) {
                var itemCfg = void 0;
                if (!weaponList.hasOwnProperty(String(key))) {
                    weaponList[String(key)] = new ServantWeaponItemCfg();
                }
                itemCfg = weaponList[String(key)];
                itemCfg.initData(data.weapon[key]);
                itemCfg.id = String(key);
            }
            for (var key in data.weaponPromotion) {
                var itemCfg = void 0;
                if (!weaponPromotion.hasOwnProperty(String(key))) {
                    weaponPromotion[String(key)] = new ServantWeaponPromotionItemCfg();
                }
                itemCfg = weaponPromotion[String(key)];
                itemCfg.initData(data.weaponPromotion[key]);
                itemCfg.id = String(key);
            }
            shop1 = data.shop1;
            shop2 = data.shop2;
        }
        ServantweaponCfg.formatData = formatData;
        function getShopArr() {
            var arr = [];
            var date = App.DateUtil.getServerDate();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            // for(let key in data.shop)
            // {
            // 	let itemCfg:ServantWeaponShopItemCfg;
            // 	let index = Number(key);
            // 	if(!shop.hasOwnProperty(String(index)))
            // 	{
            // 		shop[String(index)]=new ServantWeaponShopItemCfg();
            // 	}
            // 	itemCfg=shop[String(index)];
            // 	itemCfg.initData(data.shop[key]);
            // 	itemCfg.id=(index);
            // }
            //按月刷新
            for (var i in shop1[month]) {
                arr.push(shop1[month][i]);
            }
            //固定位置
            for (var i in shop2) {
                arr.push(shop2[i]);
            }
            var tmp = [];
            for (var i in arr) {
                var itemCfg = new ServantWeaponShopItemCfg();
                var index = Number(i) + 1;
                itemCfg.initData(arr[i]);
                itemCfg.id = (index);
                tmp.push(itemCfg);
            }
            return tmp;
        }
        ServantweaponCfg.getShopArr = getShopArr;
        function getWeaponItemById(id) {
            return weaponList[String(id)];
        }
        ServantweaponCfg.getWeaponItemById = getWeaponItemById;
        function getWeaponPromotionItemById(id) {
            return weaponPromotion[String(id)];
        }
        ServantweaponCfg.getWeaponPromotionItemById = getWeaponPromotionItemById;
        function getWeaponIdByServantId(id) {
            for (var key in weaponList) {
                if (weaponList[key].servantID == id) {
                    return String(key);
                }
            }
            return null;
        }
        ServantweaponCfg.getWeaponIdByServantId = getWeaponIdByServantId;
        function getWeaponItemByServantId(id) {
            var wId = this.getWeaponIdByServantId(id);
            if (wId) {
                return this.getWeaponItemById(wId);
            }
            return null;
        }
        ServantweaponCfg.getWeaponItemByServantId = getWeaponItemByServantId;
        function checkOpenWeaponByServantId(id) {
            var cfg = this.getWeaponItemByServantId(id);
            if (cfg) //&& Api.switchVoApi.checkWeaponById(cfg.id)
             {
                return true;
            }
            return false;
        }
        ServantweaponCfg.checkOpenWeaponByServantId = checkOpenWeaponByServantId;
    })(ServantweaponCfg = Config.ServantweaponCfg || (Config.ServantweaponCfg = {}));
    var ServantWeaponItemCfg = /** @class */ (function (_super) {
        __extends(ServantWeaponItemCfg, _super);
        function ServantWeaponItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ServantWeaponItemCfg.prototype, "icon", {
            get: function () {
                return "weapon_icon_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantWeaponItemCfg.prototype, "itemIcon", {
            get: function () {
                return "itemicon" + this.itemID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantWeaponItemCfg.prototype, "name", {
            get: function () {
                return LanguageManager.getlocal("weapon_name_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantWeaponItemCfg.prototype, "desc", {
            get: function () {
                return LanguageManager.getlocal("weapon_desc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        ServantWeaponItemCfg.prototype.getMaxLv = function () {
            return this.maxLevel;
        };
        ServantWeaponItemCfg.prototype.getMaxPromotionLv = function () {
            return this.maxPromotion;
        };
        ServantWeaponItemCfg.prototype.getMaxSoulLv = function () {
            return this.maxSoul;
        };
        //取当前等级神器的各项资质和总和， 计算各种战斗加成值用
        ServantWeaponItemCfg.prototype.getWeaponPromotionValue = function (clv) {
            // 星星数
            var addTab = [this.iniStrength, this.iniIntelligence, this.iniPolitics, this.iniCharm];
            //总值
            var valueTab = [this.iniStrength, this.iniIntelligence, this.iniPolitics, this.iniCharm];
            var starTab = [0, 0, 0, 0];
            for (var i = 1; i < clv; i++) {
                for (var j = 0; j < 4; j++) {
                    valueTab[j] += addTab[j];
                }
                var cfg = Config.ServantweaponCfg.getWeaponPromotionItemById(i);
                var staradd = cfg.star;
                if (staradd) {
                    for (var k in cfg.abilityType) {
                        var v = cfg.abilityType[k];
                        addTab[v - 1] += staradd;
                    }
                }
            }
            valueTab[4] = valueTab[0] + valueTab[1] + valueTab[2] + valueTab[3];
            return valueTab;
        };
        //对照表
        ServantWeaponItemCfg.prototype.getPromationList = function () {
            // 星星数
            var addTab = [this.iniStrength, this.iniIntelligence, this.iniPolitics, this.iniCharm];
            var valueTab = [this.iniStrength, this.iniIntelligence, this.iniPolitics, this.iniCharm];
            //总值
            var array = [];
            array.push([1, valueTab[0], valueTab[1], valueTab[2], valueTab[3], valueTab[0] + valueTab[1] + valueTab[2] + valueTab[3]]);
            var starTab = [0, 0, 0, 0];
            var clv = this.maxPromotion;
            for (var i = 1; i < clv; i++) {
                for (var j = 0; j < 4; j++) {
                    valueTab[j] += addTab[j];
                }
                var cfg = Config.ServantweaponCfg.getWeaponPromotionItemById(i);
                var staradd = cfg.star;
                if (staradd) {
                    for (var k in cfg.abilityType) {
                        var v = cfg.abilityType[k];
                        addTab[v - 1] += staradd;
                    }
                }
                var total = valueTab[0] + valueTab[1] + valueTab[2] + valueTab[3];
                array.push([i + 1, valueTab[0], valueTab[1], valueTab[2], valueTab[3], total]);
            }
            return array;
        };
        // 下一级增加资质和星级。 神器加工用
        ServantWeaponItemCfg.prototype.getWeaponPromotionStarAndAdd = function (clv) {
            // 星星数
            var addTab = [this.iniStrength, this.iniIntelligence, this.iniPolitics, this.iniCharm];
            //总值
            // let valueTab = [this.iniStrength,this.iniIntelligence,this.iniPolitics,this.iniCharm];
            var starTab = [0, 0, 0, 0];
            var showTab = [1, 1, 1, 1];
            for (var i = 1; i < clv; i++) {
                // for (let j = 0; j<4; j++)
                // {
                // 	valueTab[j] += addTab[j];
                // }
                var cfg_1 = Config.ServantweaponCfg.getWeaponPromotionItemById(i);
                var staradd_1 = cfg_1.star;
                if (staradd_1) {
                    for (var k in cfg_1.abilityType) {
                        var v = cfg_1.abilityType[k];
                        addTab[v - 1] += staradd_1;
                    }
                }
            }
            var cfg = Config.ServantweaponCfg.getWeaponPromotionItemById(clv);
            var staradd = cfg.star;
            if (staradd) {
                for (var k in cfg.abilityType) {
                    var v = cfg.abilityType[k];
                    starTab[v - 1] = staradd;
                }
            }
            return [addTab, starTab, showTab];
        };
        return ServantWeaponItemCfg;
    }(BaseItemCfg));
    Config.ServantWeaponItemCfg = ServantWeaponItemCfg;
    var ServantWeaponPromotionItemCfg = /** @class */ (function (_super) {
        __extends(ServantWeaponPromotionItemCfg, _super);
        function ServantWeaponPromotionItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 每次升品增加星数（资质数）
             */
            _this.star = 0;
            return _this;
        }
        return ServantWeaponPromotionItemCfg;
    }(BaseItemCfg));
    var ServantWeaponShopItemCfg = /** @class */ (function (_super) {
        __extends(ServantWeaponShopItemCfg, _super);
        function ServantWeaponShopItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ServantWeaponShopItemCfg;
    }(BaseItemCfg));
    Config.ServantWeaponShopItemCfg = ServantWeaponShopItemCfg;
})(Config || (Config = {}));
//# sourceMappingURL=ServantweaponCfg.js.map