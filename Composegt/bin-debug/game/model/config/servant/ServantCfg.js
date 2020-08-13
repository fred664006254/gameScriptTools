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
    var ServantCfg;
    (function (ServantCfg) {
        var servantListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!servantListCfg.hasOwnProperty(String(key))) {
                    servantListCfg[String(key)] = new ServantItemCfg();
                }
                itemCfg = servantListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        ServantCfg.formatData = formatData;
        function getServantItemById(id) {
            return servantListCfg[String(id)];
        }
        ServantCfg.getServantItemById = getServantItemById;
        function checkIsLockedByGM(servantId) {
            var sercfg = servantListCfg[servantId];
            if (sercfg.state == 0) {
                if (Api.switchVoApi.checkIsServantLocked(servantId)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        }
        ServantCfg.checkIsLockedByGM = checkIsLockedByGM;
        /**
         * 获取门客品质ICON资源KEY (静态图)
         * 1-普通(没Icon) 2-名仕 3-传奇 4-神将
         * @param sid 门客ID
         * @return String 品质图标Key
         */
        function getQualityIconKeyBySid(sid) {
            var _servant = Config.ServantCfg.getServantItemById(sid);
            var _icon = "";
            if (_servant && _servant.quality && _servant.quality > 1) {
                _icon = "servant_qualitytag" + _servant.quality;
            }
            return _icon;
        }
        ServantCfg.getQualityIconKeyBySid = getQualityIconKeyBySid;
        /**
         * 获取门客品质ICON资源KEY（帧动画）
         * 1-普通(没动画) 2-名仕(没动画) 3-传奇 4-神将
         * @param sid 门客ID
         * @return String 品质动画Key前缀
         */
        function getQualityMvKeyBySid(sid) {
            var _servant = Config.ServantCfg.getServantItemById(sid);
            var _icon = "";
            if (_servant && _servant.quality && _servant.quality > 1) {
                _icon = "servantquality" + _servant.quality + "_eff";
            }
            return _icon;
        }
        ServantCfg.getQualityMvKeyBySid = getQualityMvKeyBySid;
    })(ServantCfg = Config.ServantCfg || (Config.ServantCfg = {}));
    var ServantItemCfg = (function (_super) {
        __extends(ServantItemCfg, _super);
        function ServantItemCfg() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ServantItemCfg.prototype, "wifeId", {
            get: function () {
                if (!this._wifeId || Config.WifeCfg.checkIsLockedByGM(this._wifeId)) {
                    return null;
                }
                return this._wifeId;
            },
            set: function (tmpid) {
                this._wifeId = tmpid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "name", {
            get: function () {
                return LanguageManager.getlocal("servant_name" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "desc", {
            get: function () {
                return LanguageManager.getlocal("servant_Desc" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "story", {
            get: function () {
                return LanguageManager.getlocal("servant_story" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "dialogIds", {
            /**
             *
             * 对话ids
             */
            get: function () {
                if (this.dialogue) {
                    var dialogids = this.dialogue.split("_");
                    return dialogids;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "fullIcon", {
            get: function () {
                return "servant_full_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "halfIcon", {
            get: function () {
                return "servant_half_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "sound", {
            get: function () {
                return "effect_servant_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "dropDesc", {
            // 道具描述
            get: function () {
                return LanguageManager.getlocal("servantDropDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        ServantItemCfg.prototype.isContainsAbility = function (bid) {
            if (this.ability.indexOf(bid) > -1) {
                return true;
            }
            else {
                return false;
            }
        };
        ServantItemCfg.prototype.getStarNums = function () {
            var num = 0;
            for (var key in this.ability) {
                if (this.ability.hasOwnProperty(key)) {
                    var tmpAcfg = GameConfig.config.abilityCfg[this.ability[key]];
                    num += tmpAcfg.num;
                }
            }
            return num;
        };
        Object.defineProperty(ServantItemCfg.prototype, "qualityBoxImgPath", {
            //获取品质框资源
            get: function () {
                var tmpCfg = GameConfig.config.servantCfg[this.id];
                return "servant_cardbg_" + tmpCfg.quality;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "body", {
            /**皮肤半身像 ,暂时取的是门客资源*/
            get: function () {
                return "servant_full_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "bone", {
            /**皮肤骨骼 */
            get: function () {
                return "servant_full2_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        //文将还是武将
        ServantItemCfg.prototype.getServantType = function () {
            return this.showType + '';
        };
        return ServantItemCfg;
    }(BaseItemCfg));
    Config.ServantItemCfg = ServantItemCfg;
    __reflect(ServantItemCfg.prototype, "Config.ServantItemCfg");
})(Config || (Config = {}));
