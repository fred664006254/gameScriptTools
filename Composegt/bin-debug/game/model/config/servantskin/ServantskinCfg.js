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
    var ServantskinCfg;
    (function (ServantskinCfg) {
        var servantSkinListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!servantSkinListCfg.hasOwnProperty(String(key))) {
                    servantSkinListCfg[String(key)] = new ServantskinItemCfg();
                }
                itemCfg = servantSkinListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        ServantskinCfg.formatData = formatData;
        function getServantSkinItemById(id) {
            return servantSkinListCfg[String(id)];
        }
        ServantskinCfg.getServantSkinItemById = getServantSkinItemById;
        function getServantSkinList() {
            var list = [];
            for (var key in servantSkinListCfg) {
                if (Api.switchVoApi.checkIsServantSkinState(key)) {
                    list.push(servantSkinListCfg[key]);
                }
            }
            return list;
        }
        ServantskinCfg.getServantSkinList = getServantSkinList;
        function getSkinMaxNum() {
            return Object.keys(servantSkinListCfg).length;
        }
        ServantskinCfg.getSkinMaxNum = getSkinMaxNum;
        /**
         *
         * 某门客是否配了皮肤
         */
        function isSkinDeploy(serid) {
            for (var key in servantSkinListCfg) {
                if (servantSkinListCfg.hasOwnProperty(key)) {
                    var element = servantSkinListCfg[key];
                    if (element.servantId == serid && Api.switchVoApi.checkIsServantSkinState(element.id)) {
                        return true;
                    }
                }
            }
            return false;
        }
        ServantskinCfg.isSkinDeploy = isSkinDeploy;
        function getIdListBySerVantId(sid) {
            var list = [];
            for (var key in servantSkinListCfg) {
                if (servantSkinListCfg.hasOwnProperty(key)) {
                    var element = servantSkinListCfg[key];
                    if (element.servantId == sid && Api.switchVoApi.checkIsServantSkinState(element.id)) {
                        list.push(key);
                    }
                }
            }
            return list;
        }
        ServantskinCfg.getIdListBySerVantId = getIdListBySerVantId;
        function getSkinIdByBid(bid) {
            for (var key in servantSkinListCfg) {
                if (servantSkinListCfg.hasOwnProperty(key)) {
                    var addAbility = servantSkinListCfg[key].addAbility;
                    for (var index = 0; index < addAbility.length; index++) {
                        if (addAbility[index] == bid) {
                            return key;
                        }
                    }
                }
            }
        }
        ServantskinCfg.getSkinIdByBid = getSkinIdByBid;
    })(ServantskinCfg = Config.ServantskinCfg || (Config.ServantskinCfg = {}));
    var ServantskinItemCfg = (function (_super) {
        __extends(ServantskinItemCfg, _super);
        function ServantskinItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ServantskinItemCfg.prototype, "skinImgPath", {
            get: function () {
                return "";
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 皮肤的名字
         */
        ServantskinItemCfg.prototype.getSkinName = function () {
            return LanguageManager.getlocal("servantSkinName" + this.id);
        };
        /**
         * 皮肤的说明
         */
        ServantskinItemCfg.prototype.getSkinDesc = function () {
            return LanguageManager.getlocal("servantSkinDesc" + this.id);
        };
        ServantskinItemCfg.prototype.getSkinDropDesc = function () {
            return LanguageManager.getlocal("skinDropDesc_" + this.id);
        };
        Object.defineProperty(ServantskinItemCfg.prototype, "icon", {
            /**皮肤icon */
            get: function () {
                return "skin_half_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantskinItemCfg.prototype, "iconBg", {
            /**皮肤iconBg */
            get: function () {
                return "itembg_7";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantskinItemCfg.prototype, "body", {
            /**皮肤半身像 ,暂时取的是门客资源*/
            get: function () {
                return "skin_full_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantskinItemCfg.prototype, "bone", {
            /**皮肤骨骼 */
            get: function () {
                return "servant_full2_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        ServantskinItemCfg.prototype.getIconContainer = function (isTouchInfo) {
            var container = GameData.getIconContainer(this.icon, this.iconBg);
            return container;
        };
        return ServantskinItemCfg;
    }(BaseItemCfg));
    __reflect(ServantskinItemCfg.prototype, "ServantskinItemCfg");
})(Config || (Config = {}));
