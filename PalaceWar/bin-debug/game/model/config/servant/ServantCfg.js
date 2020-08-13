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
    var ServantCfg;
    (function (ServantCfg) {
        ServantCfg.servantListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!ServantCfg.servantListCfg.hasOwnProperty(String(key))) {
                    ServantCfg.servantListCfg[String(key)] = new ServantItemCfg();
                }
                itemCfg = ServantCfg.servantListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
                itemCfg._quality2 = data[key].quality2;
            }
        }
        ServantCfg.formatData = formatData;
        function getServantItemById(id) {
            return ServantCfg.servantListCfg[String(id)];
        }
        ServantCfg.getServantItemById = getServantItemById;
        function checkIsLockedByGM(servantId) {
            var sercfg = ServantCfg.servantListCfg[servantId];
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
        //是否能门客免战
        function checkCanAvoidAtkrace(servantId) {
            var sercfg = ServantCfg.servantListCfg[servantId];
            if (sercfg.avoid) {
                return true;
            }
            else {
                return false;
            }
        }
        ServantCfg.checkCanAvoidAtkrace = checkCanAvoidAtkrace;
        //获取所有能免战的门客id列表
        function getCanAvoidServantList() {
            var idList = [];
            for (var key in ServantCfg.servantListCfg) {
                if (ServantCfg.servantListCfg.hasOwnProperty(key)) {
                    var element = ServantCfg.servantListCfg[key];
                    if (element.avoid && (element.state == 1 || Api.switchVoApi.checkIsServantLocked(element.id))) {
                        idList.push(element.id);
                    }
                }
            }
            return idList;
        }
        ServantCfg.getCanAvoidServantList = getCanAvoidServantList;
        function formatRewardItemVoStr(id) {
            var arr = ("" + id).split("_");
            if (arr.length == 3) {
                return "" + id;
            }
            return "8_" + id + "_1";
        }
        ServantCfg.formatRewardItemVoStr = formatRewardItemVoStr;
    })(ServantCfg = Config.ServantCfg || (Config.ServantCfg = {}));
    var ServantItemCfg = /** @class */ (function (_super) {
        __extends(ServantItemCfg, _super);
        function ServantItemCfg() {
            var _this = _super.call(this) || this;
            _this.randomdId = 0;
            return _this;
        }
        Object.defineProperty(ServantItemCfg.prototype, "quality2", {
            get: function () {
                if (Api.switchVoApi.checkOpenServantLvLabel()) {
                    return this._quality2;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
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
                if (Api.switchVoApi.checkOpenNewSound()) {
                    var arr = ["effect_servant_" + this.id, "effect_servant_" + this.id + "_2"];
                    this.randomdId = App.MathUtil.getRandom(0, arr.length);
                    return arr[this.randomdId];
                }
                else {
                    return "effect_servant_" + this.id;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantItemCfg.prototype, "words", {
            get: function () {
                var arr = ["effect_servant_" + this.id + "_cn", "effect_servant_" + this.id + "_2_cn"];
                return LanguageManager.getlocal(arr[this.randomdId]); //
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
        // 默认总资质
        ServantItemCfg.prototype.getTotalAbility = function () {
            var v = 0;
            for (var i = 0; i < this.ability.length; i++) {
                var abcfg = GameConfig.config.abilityCfg[this.ability[i]];
                v += abcfg.num;
            }
            return v;
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
        // 是否有皮肤开启的光环
        ServantItemCfg.prototype.isOpenAuraBySkin = function () {
            var skinList = Config.ServantskinCfg.getIdListBySerVantId(this.id);
            for (var i = 0; i < skinList.length; i++) {
                if (Api.servantVoApi.isOwnSkinOfSkinId(skinList[i])) {
                    var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(skinList[i]);
                    if (servantSkinCfg.specialAura) {
                        return true;
                    }
                }
            }
            return false;
        };
        return ServantItemCfg;
    }(BaseItemCfg));
    Config.ServantItemCfg = ServantItemCfg;
})(Config || (Config = {}));
//# sourceMappingURL=ServantCfg.js.map