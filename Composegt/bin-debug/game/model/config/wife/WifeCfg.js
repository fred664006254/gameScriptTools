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
     * 红颜配置
     */
    var WifeCfg;
    (function (WifeCfg) {
        var wifeListCfg = [];
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!wifeListCfg.hasOwnProperty(String(key))) {
                    wifeListCfg[String(key)] = new WifeItemCfg();
                }
                itemCfg = wifeListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        WifeCfg.formatData = formatData;
        function getWifeCfgById(id) {
            return wifeListCfg[String(id)];
        }
        WifeCfg.getWifeCfgById = getWifeCfgById;
        function getWifeCfgList() {
            var list = [];
            for (var key in wifeListCfg) {
                if (!Config.WifeCfg.checkIsLockedByGM(key)) {
                    list[key] = wifeListCfg[key];
                }
            }
            return list;
        }
        WifeCfg.getWifeCfgList = getWifeCfgList;
        /**
         * 获取最大长度
         */
        function getMaxLength() {
            return Object.keys(wifeListCfg).length;
        }
        WifeCfg.getMaxLength = getMaxLength;
        function checkIsLockedByGM(id) {
            var cfg = wifeListCfg[String(id)];
            if (cfg.state == 0) {
                if (Api.switchVoApi.checkIsWifeLocked(id)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        }
        WifeCfg.checkIsLockedByGM = checkIsLockedByGM;
    })(WifeCfg = Config.WifeCfg || (Config.WifeCfg = {}));
    var WifeItemCfg = (function (_super) {
        __extends(WifeItemCfg, _super);
        function WifeItemCfg() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WifeItemCfg.prototype, "name", {
            /**红颜名称 */
            get: function () {
                if (this.isBule()) {
                    return LanguageManager.getlocal("wifeName_" + this.id + "_male");
                }
                return LanguageManager.getlocal("wifeName_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        WifeItemCfg.prototype.getName = function (isBlue) {
            if (isBlue) {
                return LanguageManager.getlocal("wifeName_" + this.id + "_male");
            }
            return LanguageManager.getlocal("wifeName_" + this.id);
        };
        Object.defineProperty(WifeItemCfg.prototype, "nameJP", {
            /**红颜日本名称 */
            get: function () {
                if (String(this.id) == "222") {
                    return "";
                }
                else {
                    if (this.isBule()) {
                        return LanguageManager.getlocal("wifeName_" + this.id + "_jp" + "_male");
                    }
                    return LanguageManager.getlocal("wifeName_" + this.id + "_jp");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "desc", {
            /**红颜描述 */
            get: function () {
                if (this.isBule()) {
                    return LanguageManager.getlocal("wifeDesc_" + this.id + "_male");
                }
                return LanguageManager.getlocal("wifeDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "dialogIds", {
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
        WifeItemCfg.prototype.getArtistrySkillList = function () {
            var itemDataList = [
                {
                    skillId: 1,
                    artistrySkillMax: Config.WifebaseCfg.artistrySkill_1_Max
                }, {
                    skillId: 2,
                    artistrySkillMax: Config.WifebaseCfg.artistrySkill_2_Max
                }
            ];
            return itemDataList;
        };
        Object.defineProperty(WifeItemCfg.prototype, "words", {
            /**红颜说的话 */
            get: function () {
                //todo 后面取配置
                var wordIndex = App.MathUtil.getRandom(1, 4);
                if (this.isBule()) {
                    wordIndex = App.MathUtil.getRandom(1, 6);
                    return LanguageManager.getlocal("wifeWords_male_" + this.id + "_" + wordIndex);
                }
                return LanguageManager.getlocal("wifeWords_" + this.id + "_" + wordIndex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "wifeunlock", {
            /**红颜解锁条件 */
            get: function () {
                if (this.unlock) {
                    if (this.unlock["needPower"]) {
                        return LanguageManager.getlocal("wifeUnlock_2", [this.unlock["needPower"]]);
                    }
                    if (this.unlock["needVip"]) {
                        if (PlatformManager.checkIsWxCfg()) {
                            return LanguageManager.getlocal("searchnewdesc_" + this.id);
                        }
                        return LanguageManager.getlocal("wifeUnlock_3", [this.unlock["needVip"]]);
                    }
                    if (this.unlock["needQQ"]) {
                        if (PlatformManager.checkIsWxCfg()) {
                            return LanguageManager.getlocal("searchnewdesc_" + this.id);
                        }
                        return LanguageManager.getlocal("wifeUnlock_4");
                    }
                    if (this.unlock["needActive"]) {
                        return LanguageManager.getlocal("wifeUnlock_5");
                    }
                    if (this.unlock["needServantlv"]) {
                        var revo = GameData.formatRewardItem(this.unlock["needServantlv"])[0];
                        return LanguageManager.getlocal("wifeUnlock_6", [revo.name, "" + revo.num]);
                    }
                }
                return LanguageManager.getlocal("wifeUnlock_1");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "bg", {
            /**红颜背景 */
            get: function () {
                return "wifeview_bg1";
                // return "wifeview_bg" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "icon", {
            /**红颜icon */
            get: function () {
                if (this.isBule() && ResourceManager.hasRes("wife_half_" + this.id + "_male")) {
                    return "wife_half_" + this.id + "_male";
                }
                return "wife_half_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        /**红颜icon 区分男女 */
        WifeItemCfg.prototype.getIcon = function (isBlue) {
            if (isBlue && ResourceManager.hasRes("wife_half_" + this.id + "_male")) {
                return "wife_half_" + this.id + "_male";
            }
            return "wife_half_" + this.id;
        };
        /**红颜半身像 区分男女*/
        WifeItemCfg.prototype.getBody = function (isBlue) {
            // 安希的寻访id为73
            // if (
            // 	(this.id == "211" && Api.wifeVoApi.getWifeInfoVoById(211) === null && Api.searchVoApi.getWifeValueById("73") === 0)
            // 	|| 
            // 	(this.id == "212" && Api.wifeVoApi.getWifeInfoVoById(212) === null && Api.searchVoApi.getWifeValueById("24") === 0)) {
            // 	return "wife_full3_" + this.id;
            // } else {
            // 	return "wife_full_" + this.id;
            // }
            // if(!Api.switchVoApi.checkOpenBuleWife()||Api.gameinfoVoApi.getSexdefault()!=1){
            // 	return "wife_full_" + this.id;
            // }
            // if(Api.wifeVoApi.getWifeInfoVoById(this.id))
            // {
            // 	let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this.id)
            // 	if(wifeInfoVo.sexflag&&wifeInfoVo.sexflag >= 1&&ResourceManager.hasRes("wife_full_" + this.id+"_male"))
            // 	{
            // 		return "wife_full_" + this.id+"_male";
            // 	}
            // }else
            // {
            // 	if(ResourceManager.hasRes("wife_full_" + this.id+"_male"))
            // 	{
            // 		return "wife_full_" + this.id+"_male";
            // 	}
            // }
            if (isBlue && ResourceManager.hasRes("wife_full_" + this.id + "_male")) {
                return "wife_full_" + this.id + "_male";
            }
            return "wife_full_" + this.id;
        };
        Object.defineProperty(WifeItemCfg.prototype, "body", {
            /**红颜半身像 */
            get: function () {
                // 安希的寻访id为73
                // if (
                // 	(this.id == "211" && Api.wifeVoApi.getWifeInfoVoById(211) === null && Api.searchVoApi.getWifeValueById("73") === 0)
                // 	|| 
                // 	(this.id == "212" && Api.wifeVoApi.getWifeInfoVoById(212) === null && Api.searchVoApi.getWifeValueById("24") === 0)) {
                // 	return "wife_full3_" + this.id;
                // } else {
                // 	return "wife_full_" + this.id;
                // }
                // if(!Api.switchVoApi.checkOpenBuleWife()||Api.gameinfoVoApi.getSexdefault()!=1){
                // 	return "wife_full_" + this.id;
                // }
                // if(Api.wifeVoApi.getWifeInfoVoById(this.id))
                // {
                // 	let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this.id)
                // 	if(wifeInfoVo.sexflag&&wifeInfoVo.sexflag >= 1&&ResourceManager.hasRes("wife_full_" + this.id+"_male"))
                // 	{
                // 		return "wife_full_" + this.id+"_male";
                // 	}
                // }else
                // {
                // 	if(ResourceManager.hasRes("wife_full_" + this.id+"_male"))
                // 	{
                // 		return "wife_full_" + this.id+"_male";
                // 	}
                // }
                if (this.isBule() && ResourceManager.hasRes("wife_full_" + this.id + "_male")) {
                    return "wife_full_" + this.id + "_male";
                }
                return "wife_full_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        WifeItemCfg.prototype.isBule = function () {
            if (!Api.switchVoApi.checkOpenBuleWife() || Api.gameinfoVoApi.getSexswitch() != 1) {
                return false;
            }
            if (Api.wifeVoApi.getWifeInfoVoById(this.id)) {
                var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this.id);
                if (wifeInfoVo.sexflag && wifeInfoVo.sexflag >= 1 && Api.wifeVoApi.checkWifeCanChangeSex(this.id)) {
                    return true;
                }
            }
            else {
                if (Api.wifeVoApi.checkWifeCanChangeSex(this.id) && Api.gameinfoVoApi.getSexdefault()) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperty(WifeItemCfg.prototype, "body2", {
            /**红颜脱衣半身像 */
            get: function () {
                if (this.isBule()) {
                    return "wife_full2_" + this.id + "_male";
                }
                return "wife_full2_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "sound", {
            /**红颜声音 */
            get: function () {
                if (this.isBule()) {
                    var id = App.MathUtil.getRandom(1, 4);
                    return "effect_wife_" + this.id + "_male_" + id;
                }
                return "effect_wife_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        //蓝颜根据序号取声音
        WifeItemCfg.prototype.getBlueSoundBySoundId = function (id) {
            return "effect_wife_" + this.id + "_male_" + id;
        };
        //区分男女
        WifeItemCfg.prototype.getBone = function (isBlue) {
            if (isBlue) {
                return "wife_full_" + this.id + "_male";
            }
            return "wife_full_" + this.id;
        };
        Object.defineProperty(WifeItemCfg.prototype, "bone", {
            /**红颜骨骼 */
            get: function () {
                if (this.isBule()) {
                    return "wife_full_" + this.id + "_male";
                }
                return "wife_full_" + this.id;
                // return "wife_full3_3051";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifeItemCfg.prototype, "bone2", {
            /**红颜脱衣服骨骼 */
            get: function () {
                if (this.isBule()) {
                    return "wife_full2_" + this.id + "_male";
                }
                return "wife_full2_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        return WifeItemCfg;
    }(BaseItemCfg));
    Config.WifeItemCfg = WifeItemCfg;
    __reflect(WifeItemCfg.prototype, "Config.WifeItemCfg");
})(Config || (Config = {}));
