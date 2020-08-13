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
     * 皮肤配置
     */
    var WifeskinCfg;
    (function (WifeskinCfg) {
        var wifeListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!wifeListCfg.hasOwnProperty(String(key))) {
                    wifeListCfg[String(key)] = new WifeSkinItemCfg();
                }
                itemCfg = wifeListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        WifeskinCfg.formatData = formatData;
        function getWifeCfgById(id) {
            return wifeListCfg[String(id)];
        }
        WifeskinCfg.getWifeCfgById = getWifeCfgById;
        function isSkinOPend(skinId) {
            var cfg = wifeListCfg[skinId];
            if (!cfg) {
                return false;
            }
            if (cfg.state == 0 && Api.switchVoApi.checkIsSkinState(skinId)) {
                return true;
            }
            else if (cfg.state == 1 && !Api.switchVoApi.checkIsSkinState(skinId)) {
                return true;
            }
            else if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(skinId)) {
                return true;
            }
            return false;
        }
        WifeskinCfg.isSkinOPend = isSkinOPend;
        function getWifeCfgList() {
            var arr = new Array();
            for (var key in wifeListCfg) {
                if (isSkinOPend(key)) {
                    arr.push(wifeListCfg[key]);
                }
            }
            return arr;
        }
        WifeskinCfg.getWifeCfgList = getWifeCfgList;
        /**
         * 获取最大长度
         */
        function getMaxLength() {
            var length = 0;
            for (var key in wifeListCfg) {
                if (isSkinOPend(key)) {
                    length++;
                }
            }
            return length;
            // return Object.keys(wifeListCfg).length;
        }
        WifeskinCfg.getMaxLength = getMaxLength;
        function formatRewardItemVoStr(id) {
            var arr = ("" + id).split("_");
            if (arr.length == 3) {
                return "" + id;
            }
            return "16_" + id + "_1";
        }
        WifeskinCfg.formatRewardItemVoStr = formatRewardItemVoStr;
    })(WifeskinCfg = Config.WifeskinCfg || (Config.WifeskinCfg = {}));
    var WifeSkinItemCfg = (function (_super) {
        __extends(WifeSkinItemCfg, _super);
        function WifeSkinItemCfg() {
            var _this = _super.call(this) || this;
            /**皮肤声音 */
            _this.randomId = 1;
            return _this;
        }
        Object.defineProperty(WifeSkinItemCfg.prototype, "name", {
            /**皮肤名称 */
            get: function () {
                return LanguageManager.getlocal("skinName" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "desc", {
            /**皮肤描述 */
            get: function () {
                return LanguageManager.getlocal("skinDesc" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "desc2", {
            /**皮肤描述 */
            get: function () {
                return LanguageManager.getlocal("skinDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "dropDesc", {
            get: function () {
                return LanguageManager.getlocal("skinDropDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "isBlueSkin", {
            get: function () {
                return this.isBlue && this.isBlue == 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "words", {
            /**皮肤说的话 */
            get: function () {
                //todo 后面取配置
                // let wordIndex = App.MathUtil.getRandom(1,4)
                // return LanguageManager.getlocal("wifeWords_" + this.id + "_" + wordIndex);
                //todo 后面取配置
                if (Api.switchVoApi.checkOpenNewSound()) {
                    var arr = ["wifeWords_" + this.wifeId + "_1_cn", "wifeWords_" + this.wifeId + "_2_cn", "effect_wifeskin_" + this.id + "_cn"];
                    if (Api.switchVoApi.checkWifeSkinLevelUp()) {
                        var unit = Config.WifeskinCfg.getWifeCfgById(this.id);
                        var levelup = unit.levelUp;
                        var skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(unit.id);
                        for (var j in levelup) {
                            var obj = levelup[j];
                            if (obj && obj.levelUpUnlock) {
                                var tmp = String(obj.levelUpUnlock).split("_");
                                //剧情、配音、背景
                                var type = "";
                                if (tmp.length == 1) {
                                }
                                else {
                                    var id = Number(tmp[1]);
                                    if (id < 200) {
                                    }
                                    else if (id < 300) {
                                        //有开关
                                        if (Api.switchVoApi.checkWifeSkinSoundOpen(unit.id) && skinLevel >= (Number(j) + 1)) {
                                            //配音
                                            arr.push("effect_wifeskin_" + obj.levelUpUnlock + "_cn");
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return LanguageManager.getlocal(arr[this.randomId]);
                }
                else {
                    return LanguageManager.getlocal("wifeWords_" + this.wifeId + "_" + App.MathUtil.getRandom(1, 4));
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "icon", {
            /**皮肤icon */
            get: function () {
                return "wife_skinhalf_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "body", {
            /**皮肤半身像 */
            get: function () {
                return "wife_skin_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "body2", {
            /**皮肤脱衣半身像 */
            get: function () {
                return "wife_skinfull2_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "bone", {
            /**皮肤骨骼 */
            get: function () {
                return "wife_full3_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "bone2", {
            /**皮肤骨骼脱一夫 */
            get: function () {
                return "wife_full4_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeSkinItemCfg.prototype, "canAtHome", {
            /**看家 */
            get: function () {
                return (this.canHome && this.canHome == 1);
            },
            enumerable: true,
            configurable: true
        });
        WifeSkinItemCfg.prototype.getIcon = function (isBlue) {
            return "wife_skinhalf_" + this.id;
        };
        /**皮肤半身像 区分男女 */
        WifeSkinItemCfg.prototype.getBody = function (isBlue) {
            return "wife_skin_" + this.id;
        };
        /**皮肤骨骼  区分男女 */
        WifeSkinItemCfg.prototype.getBone = function (isBlue) {
            return "wife_full3_" + this.id;
        };
        /**皮肤名称 区分男女 */
        WifeSkinItemCfg.prototype.getName = function (isBlue) {
            return LanguageManager.getlocal("skinName" + this.id, null, !isBlue);
        };
        Object.defineProperty(WifeSkinItemCfg.prototype, "sound", {
            get: function () {
                if (Api.switchVoApi.checkOpenNewSound()) {
                    var arr = ["effect_wife_" + this.wifeId, "effect_wife_" + this.wifeId + "_2", "effect_wifeskin_" + this.id];
                    if (Api.switchVoApi.checkWifeSkinLevelUp()) {
                        var unit = Config.WifeskinCfg.getWifeCfgById(this.id);
                        var levelup = unit.levelUp;
                        var skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(unit.id);
                        for (var j in levelup) {
                            var obj = levelup[j];
                            if (obj && obj.levelUpUnlock) {
                                var tmp = String(obj.levelUpUnlock).split("_");
                                //剧情、配音、背景
                                var type = "";
                                if (tmp.length == 1) {
                                }
                                else {
                                    var id = Number(tmp[1]);
                                    if (id < 200) {
                                    }
                                    else if (id < 300) {
                                        //有开关
                                        if (Api.switchVoApi.checkWifeSkinSoundOpen(unit.id) && skinLevel >= (Number(j) + 1)) {
                                            //配音
                                            arr.push("effect_wifeskin_" + obj.levelUpUnlock);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    var wordIndex = App.MathUtil.getRandom(0, arr.length);
                    this.randomId = wordIndex;
                    return arr[wordIndex];
                }
                else {
                    return "effect_wifeskin_" + this.id;
                }
            },
            enumerable: true,
            configurable: true
        });
        return WifeSkinItemCfg;
    }(BaseItemCfg));
    Config.WifeSkinItemCfg = WifeSkinItemCfg;
    __reflect(WifeSkinItemCfg.prototype, "Config.WifeSkinItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=WifeSkinCfg.js.map