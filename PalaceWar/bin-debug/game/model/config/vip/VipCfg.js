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
    /**
     * Vip配置
     */
    var VipCfg;
    (function (VipCfg) {
        var vipList = {};
        var maxLevel;
        var vipLength;
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!vipList.hasOwnProperty(String(key))) {
                    vipList[String(key)] = new VipItemCfg();
                }
                itemCfg = vipList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.level = Number(key);
            }
        }
        VipCfg.formatData = formatData;
        /**
         *  根据vip等级获取对应配置
         * @param vipLevel vip等级
         */
        function getVipCfgByLevel(vipLevel) {
            return vipList[String(vipLevel)];
        }
        VipCfg.getVipCfgByLevel = getVipCfgByLevel;
        function getvipLength(vipLevel) {
            return vipLength;
        }
        VipCfg.getvipLength = getvipLength;
        function getUnlockLvel(key) {
            var lv = null;
            for (var i = 0; i <= getMaxLevel(); i++) {
                if (getVipCfgByLevel(i)[key] == 1) {
                    lv = i;
                    break;
                }
            }
            return lv;
        }
        VipCfg.getUnlockLvel = getUnlockLvel;
        /**
         * 获取最大VIP等级
         */
        function getMaxLevel() {
            if (!maxLevel) {
                maxLevel = 0;
                for (var key in vipList) {
                    var itemCfg = vipList[key];
                    if (maxLevel < itemCfg.level) {
                        maxLevel = itemCfg.level;
                    }
                }
            }
            return maxLevel;
        }
        VipCfg.getMaxLevel = getMaxLevel;
        /**
         * 获取自动打boss vip等级
         */
        function getAutoBossLevel() {
            var lv = null;
            for (var key in vipList) {
                var itemCfg = vipList[key];
                if (itemCfg.autoBoss) {
                    lv = itemCfg.level;
                    break;
                }
            }
            return lv;
        }
        VipCfg.getAutoBossLevel = getAutoBossLevel;
        /**
         *  根据字段取解锁等级
         * @param vipLevel vip等级
         */
        function getVipUnlockByLevel(str) {
            if (str === void 0) { str = ""; }
            for (var key in vipList) {
                if (vipList[key][str]) {
                    return Number(key);
                }
            }
            return null;
        }
        VipCfg.getVipUnlockByLevel = getVipUnlockByLevel;
    })(VipCfg = Config.VipCfg || (Config.VipCfg = {}));
    var VipItemCfg = /** @class */ (function (_super) {
        __extends(VipItemCfg, _super);
        function VipItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VipItemCfg.prototype.getServantSkinId = function () {
            if (this.getServantSkin) {
                var itemCfg = Config.ItemCfg.getItemCfgById(this.getServantSkin);
                if (itemCfg && itemCfg.servantSkinID) {
                    return itemCfg.servantSkinID;
                }
            }
            return null;
        };
        Object.defineProperty(VipItemCfg.prototype, "icon", {
            get: function () {
                return "vip_icon_" + this.level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "icon2", {
            /**
             *新版vip图标
             */
            get: function () {
                return "vip2_icon_" + this.level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "needGemLocalStr", {
            get: function () {
                var vipStr = "";
                var vipDiscount = "";
                if (Api.switchVoApi.checkOpenVipTxtpop()) {
                    vipStr = "vipLevel_needGem_Desc";
                    vipDiscount = "vipLevel_needGem_Desc_for_discount";
                }
                else {
                    vipStr = "vipLevel_needGem_Desc2";
                    vipDiscount = "vipLevel_needGem_Desc2_for_discount";
                }
                // vip折扣
                var acBaseVo = Api.acVoApi.checkIsVipDiscount();
                if (acBaseVo) {
                    var itemcfg = null;
                    if (acBaseVo.code == 1) {
                        itemcfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 1);
                    }
                    else {
                        itemcfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 4);
                    }
                    return LanguageManager.getlocal(vipDiscount, [this.needGem.toString(),
                        itemcfg.vipList[this.level].needGem.toString()]);
                }
                else {
                    return LanguageManager.getlocal(vipStr, [this.needGem.toString()]);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "birthRatioLocalStr", {
            get: function () {
                return LanguageManager.getlocal("vipLevel_birthRatio_Desc", [Math.round(this.birthRatio * 100) + "%"]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "maxStrengthLocalStr", {
            get: function () {
                return LanguageManager.getlocal("vipLevel_maxStrength_Desc", [this.maxStrength.toString()]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "maxEnergyLocalStr", {
            get: function () {
                return LanguageManager.getlocal("vipLevel_maxEnergy_Desc", [this.maxEnergy.toString()]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "maxVigourLocalStr", {
            get: function () {
                return LanguageManager.getlocal("vipLevel_maxVigour_Desc", [this.maxVigour.toString()]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "searchLuckLocalStr", {
            get: function () {
                return LanguageManager.getlocal("searchLuck_Desc", [this.searchLuckFree.toString()]);
            },
            enumerable: true,
            configurable: true
        });
        VipItemCfg.prototype.dailyLuckLocalStr = function (i) {
            if (i === void 0) { i = 0; }
            return LanguageManager.getlocal("dailyLuck_Desc" + i, [this.dailyLuckNum.toString()]);
        };
        Object.defineProperty(VipItemCfg.prototype, "localStr", {
            get: function () {
                var localStr = "";
                if (this.needGem) {
                    localStr += this.needGemLocalStr;
                }
                if (Api.switchVoApi.checkOpenDinnerLimit() && this.level == Config.DinnerCfg.getNeedVip()) {
                    localStr += "\n" + LanguageManager.getlocal("dinner_vip_limit_desc");
                }
                if (Api.switchVoApi.checkOpenFastFight()) {
                    if (3 == this.level) {
                        localStr += "\n" + LanguageManager.getlocal("fastFight_vip_desc");
                    }
                }
                //一键公务描述
                if (Api.switchVoApi.checkOpenOfficialbusiness()) {
                    var needVip = GameConfig.config.affairCfg['needVip'];
                    if (needVip === this.level) {
                        localStr += "\n" + LanguageManager.getlocal("affter_vip_desc");
                    }
                }
                if (this.autoBoss) {
                    var descstr = LanguageManager.getlocal("vipunlock_autoboss");
                    localStr += localStr ? "\n" + descstr : descstr;
                }
                if (this.dailySolider) {
                    var descstr = LanguageManager.getlocal("vipunlock_dailySolider");
                    localStr += localStr ? "\n" + descstr : descstr;
                }
                if (this.dailyBoss) {
                    var descstr = LanguageManager.getlocal("vipunlock_dailyBoss");
                    localStr += localStr ? "\n" + descstr : descstr;
                }
                if (this.allianceBoss) {
                    var descstr = LanguageManager.getlocal("vipunlock_allianceBoss");
                    localStr += localStr ? "\n" + descstr : descstr;
                }
                if (Api.switchVoApi.checkOpenAllianceTask() && this.allianceTask) {
                    var descstr = LanguageManager.getlocal("vipunlock_allianceTask");
                    localStr += localStr ? "\n" + descstr : descstr;
                }
                if (this.level == Config.SearchbaseCfg.needVip) {
                    var descstr = LanguageManager.getlocal("vipunlock_autosearch");
                    localStr += localStr ? "\n" + descstr : descstr;
                }
                if (this.level == GameConfig.config.wifebaseCfg.needVip) {
                    var descstr = LanguageManager.getlocal("vipunlock_wifebatch");
                    localStr += localStr ? "\n" + descstr : descstr;
                }
                if (this.level == GameConfig.config.bookroomCfg.needVip && Api.switchVoApi.checkOpenAutoStudy()) {
                    var descstr = LanguageManager.getlocal("vipunlock_studyonekey");
                    localStr += localStr ? "\n" + descstr : descstr;
                }
                if (Api.switchVoApi.checkOpenWifeStatus() && this.level == 5) {
                    localStr += "\n" + LanguageManager.getlocal("vipsealupdes");
                }
                if (Api.switchVoApi.checkAutoMopup() && this.level == 6) {
                    localStr += "\n" + LanguageManager.getlocal("challengeAutoFightUnlock");
                }
                if (Api.switchVoApi.checkAutoAtkrace() && this.level == 6) {
                    localStr += "\n" + LanguageManager.getlocal("atkraceAutoFightUnlock");
                }
                if (this.birthRatio) {
                    localStr += localStr ? "\n" + this.birthRatioLocalStr : this.birthRatioLocalStr;
                }
                if (this.maxStrength) {
                    localStr += localStr ? "\n" + this.maxStrengthLocalStr : this.maxStrengthLocalStr;
                }
                if (this.maxEnergy) {
                    localStr += localStr ? "\n" + this.maxEnergyLocalStr : this.maxEnergyLocalStr;
                }
                if (this.maxVigour) {
                    localStr += localStr ? "\n" + this.maxVigourLocalStr : this.maxVigourLocalStr;
                }
                if (this.searchLuckFree) {
                    localStr += localStr ? "\n" + this.searchLuckLocalStr : this.searchLuckFree;
                }
                if (Api.practiceVoApi.isPlayerPracticeEnable() && this.level > 2) {
                    var vipAddV = GameConfig.config.practicebaseCfg.vip[this.level];
                    localStr += "\n" + LanguageManager.getlocal("practice_vipAdd2", [(vipAddV * 100).toFixed(0)]);
                }
                if (this.dailyLuckNum) {
                    for (var i = 1; i < 7; i++) {
                        localStr += localStr ? "\n" + this.dailyLuckLocalStr(i) : this.dailyLuckNum;
                    }
                }
                return localStr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "extraRewardVoList", {
            get: function () {
                if (!this._extraRewardList) {
                    if (this.reward) {
                        this._extraRewardList = GameData.formatRewardItem(this.reward);
                    }
                }
                return this._extraRewardList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VipItemCfg.prototype, "searchLuckFreeLocalStr", {
            // public get extraRwardItemsList():BaseDisplayObjectContainer[]
            // {
            // 	if(this.reward)
            // 	{
            // 		return GameData.getRewardItemIcons(this.reward,true,true);
            // 	}
            // 	return null;
            // }
            get: function () {
                return LanguageManager.getlocal("searchLuckFreeChangeDesc", [String(this.level), String(this.searchLuckFree)]);
            },
            enumerable: true,
            configurable: true
        });
        return VipItemCfg;
    }(BaseItemCfg));
    Config.VipItemCfg = VipItemCfg;
})(Config || (Config = {}));
//# sourceMappingURL=VipCfg.js.map