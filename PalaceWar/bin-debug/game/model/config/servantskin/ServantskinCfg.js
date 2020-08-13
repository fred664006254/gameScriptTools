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
        function getServantSkinItemByBook(id, servantId) {
            var obj = null;
            for (var key in servantSkinListCfg) {
                if (servantSkinListCfg.hasOwnProperty(key)) {
                    var element = servantSkinListCfg[key];
                    if (element.ability) {
                        for (var k in element.ability) {
                            if (Number(element.ability[k]) == Number(id) && Api.switchVoApi.checkIsServantSkinState(element.id) && element.servantId == servantId) {
                                obj = element;
                                return obj;
                            }
                        }
                    }
                }
            }
            return obj;
        }
        ServantskinCfg.getServantSkinItemByBook = getServantSkinItemByBook;
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
            return this.getServantSkinList().length;
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
                    var ability = servantSkinListCfg[key].ability;
                    for (var index = 0; index < ability.length; index++) {
                        if (ability[index] == bid) {
                            return key;
                        }
                    }
                }
            }
        }
        ServantskinCfg.getSkinIdByBid = getSkinIdByBid;
        function formatRewardItemVoStr(id) {
            var arr = ("" + id).split("_");
            if (arr.length == 3) {
                return "" + id;
            }
            return "19_" + id + "_1";
        }
        ServantskinCfg.formatRewardItemVoStr = formatRewardItemVoStr;
    })(ServantskinCfg = Config.ServantskinCfg || (Config.ServantskinCfg = {}));
    var ServantskinItemCfg = /** @class */ (function (_super) {
        __extends(ServantskinItemCfg, _super);
        function ServantskinItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**门客衣装特殊光环*/
            _this.specialAura = null;
            _this.specialAuraCfg = null;
            _this.randomId = 1;
            return _this;
        }
        ServantskinItemCfg.prototype.initData = function (data) {
            _super.prototype.initData.call(this, data);
            this.addAbility = this.ability;
            if (this.specialAura) {
                this.specialAuraCfg = new ServantskinAuraCfg();
                this.specialAuraCfg.initData(this.specialAura);
            }
        };
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
        /**门客详情背景 门客详情*/
        ServantskinItemCfg.prototype.getServantDetailBg = function () {
            return "servantdetail_skinbg_" + this.skinGround;
        };
        /**门客衣装预览背景 衣装预览*/
        ServantskinItemCfg.prototype.getSkinPreviewBg = function () {
            return "servantskin_previewbg_" + this.skinGround;
        };
        /**门客衣装详情背景 听雨轩*/
        ServantskinItemCfg.prototype.getSkinDetailBg = function () {
            return "servantskin_detailbg_" + this.skinGround;
        };
        /**门客衣装光环背景 听雨轩*/
        ServantskinItemCfg.prototype.getSkinDetailAuraBg = function () {
            return "servantskin_detail_aurabg_" + this.skinGround;
        };
        /**门客衣装背景特效 龙骨 */
        ServantskinItemCfg.prototype.getSkinEffectBone = function () {
            return "servantskin_bg_" + this.skinGround;
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
        Object.defineProperty(ServantskinItemCfg.prototype, "cell", {
            get: function () {
                return "skin_cell_" + this.id;
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
        Object.defineProperty(ServantskinItemCfg.prototype, "name", {
            get: function () {
                return this.getSkinName();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantskinItemCfg.prototype, "servantAndSkinName", {
            get: function () {
                if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
                    return LanguageManager.getlocal("servant_newui_skinname1", [this.getSkinName(), LanguageManager.getlocal("servant_name" + this.servantId)]);
                }
                return LanguageManager.getlocal("servant_newui_skinname", [this.getSkinName(), LanguageManager.getlocal("servant_name" + this.servantId)]);
            },
            enumerable: true,
            configurable: true
        });
        ServantskinItemCfg.prototype.getIconContainer = function (isTouchInfo) {
            var container = GameData.getIconContainer(this.icon, this.iconBg);
            return container;
        };
        Object.defineProperty(ServantskinItemCfg.prototype, "sound", {
            get: function () {
                if (Api.switchVoApi.checkOpenNewSound()) {
                    var arr = ["effect_servant_" + this.servantId, "effect_servant_" + this.servantId + "_2", "effect_servant_" + this.id];
                    var wordIndex = App.MathUtil.getRandom(0, arr.length);
                    this.randomId = wordIndex;
                    return arr[wordIndex];
                }
                else {
                    return "effect_servant_" + this.servantId;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantskinItemCfg.prototype, "sound2", {
            get: function () {
                if (Api.switchVoApi.checkOpenNewSound()) {
                    return "effect_servant_" + this.id;
                }
                else {
                    return "effect_servant_" + this.servantId;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServantskinItemCfg.prototype, "words", {
            /**皮肤说的话 */
            get: function () {
                //todo 后面取配置
                if (Api.switchVoApi.checkOpenNewSound()) {
                    var arr = ["effect_servant_" + this.servantId + "_cn", "effect_servant_" + this.servantId + "_2_cn", "effect_servant_" + this.id];
                    return LanguageManager.getlocal(arr[this.randomId]);
                }
                else {
                    return LanguageManager.getlocal("effect_servant_" + this.servantId + "_cn");
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 是否还可以兑换皮肤道具
         */
        ServantskinItemCfg.prototype.canExchangeItem = function () {
            var cfgNum = this.ability.length;
            var hasNum = 0;
            var servant = Api.servantVoApi.getServantObj(this.servantId);
            if (servant) {
                var skinvo = servant.getSkinInfobyId(this.id);
                if (skinvo) {
                    hasNum = skinvo.getbookIdList().length;
                }
            }
            var itemNum = Api.itemVoApi.getItemNumInfoVoById(this.item);
            return cfgNum > (hasNum + itemNum);
            // return false;
        };
        return ServantskinItemCfg;
    }(BaseItemCfg));
    Config.ServantskinItemCfg = ServantskinItemCfg;
    var ServantskinAuraCfg = /** @class */ (function (_super) {
        __extends(ServantskinAuraCfg, _super);
        function ServantskinAuraCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ServantskinAuraCfg.prototype.initData = function (data) {
            _super.prototype.initData.call(this, data);
        };
        return ServantskinAuraCfg;
    }(BaseItemCfg));
    Config.ServantskinAuraCfg = ServantskinAuraCfg;
})(Config || (Config = {}));
//# sourceMappingURL=ServantskinCfg.js.map