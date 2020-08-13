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
     * 道具配置类
     * author shaoliang
     * date 2017/10/28
     * @namespace TitleCfg
     */
    var TitleCfg;
    (function (TitleCfg) {
        var titleList = {};
        function formatData(data) {
            for (var key in data) {
                var titleCfg = void 0;
                if (!titleList.hasOwnProperty(String(key))) {
                    titleList[String(key)] = new TitleItemCfg();
                }
                titleCfg = titleList[String(key)];
                titleCfg.initData(data[key]);
                titleCfg.id = String(key);
            }
        }
        TitleCfg.formatData = formatData;
        /**
         * 通过道具id获取单个道具配置
         * @param id 道具id
         */
        function getTitleCfgById(id) {
            return titleList[String(id)];
        }
        TitleCfg.getTitleCfgById = getTitleCfgById;
        function getTitleCfg() {
            return titleList;
        }
        TitleCfg.getTitleCfg = getTitleCfg;
        function getTitleIdList() {
            return Object.keys(titleList);
        }
        TitleCfg.getTitleIdList = getTitleIdList;
        function getIsonlyTitleIdList() {
            var result = [];
            for (var key in titleList) {
                var cfg = titleList[key];
                if (Number(cfg.id) <= 3005 && cfg.isOnly == 1 && cfg.unlock == 1) {
                    result.push(key);
                }
            }
            return result;
        }
        TitleCfg.getIsonlyTitleIdList = getIsonlyTitleIdList;
        function isTitleOPend(titleId) {
            var cfg = titleList[titleId];
            if (!cfg) {
                return false;
            }
            if (cfg.state == 0 && Api.switchVoApi.checkIsTitleState(titleId)) {
                return true;
            }
            if (cfg.state == 1 && !Api.switchVoApi.checkIsTitleState(titleId)) {
                return true;
            }
            return false;
        }
        TitleCfg.isTitleOPend = isTitleOPend;
        function isTheKingTitleId(titleId) {
            return String(titleId) == "3201";
        }
        TitleCfg.isTheKingTitleId = isTheKingTitleId;
        //有等级的称号icon3
        function getTitleIcon3WithLv(tid, tlv) {
            if (tlv === void 0) { tlv = 1; }
            if (Number(tlv) > 1) {
                return "user_title_" + tid + "_3_" + tlv;
            }
            return "user_title_" + tid + "_3";
        }
        TitleCfg.getTitleIcon3WithLv = getTitleIcon3WithLv;
        // export function getIsonlyTitleIdList()
        // {
        // 	let result = [];
        // 	for (var key in titleList) {
        // 		if (titleList[key].isOnly == 1) {
        // 			result.push(key);
        // 		}
        // 	}
        // 	return result;
        // }
    })(TitleCfg = Config.TitleCfg || (Config.TitleCfg = {}));
    var TitleItemCfg = (function (_super) {
        __extends(TitleItemCfg, _super);
        function TitleItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lvLimit = 100;
            _this.emperorLvUpNeed = [];
            return _this;
        }
        Object.defineProperty(TitleItemCfg.prototype, "unlock", {
            get: function () {
                return Config.TitleCfg.isTitleOPend(this.id) ? 1 : 0;
                // return this._unlock;
                // if(Config.TitleCfg.isTitleOPend(this.id))
                // {
                // 	return 1;
                // }
                // return 0;
            },
            set: function (value) {
                this._unlock = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleItemCfg.prototype, "qualityColor", {
            /**
             * 道具名称
             */
            get: function () {
                var color = TextFieldConst.COLOR_QUALITY_WHITE_NEW;
                switch (Number(this.quality)) {
                    case 1:
                        color = TextFieldConst.COLOR_QUALITY_WHITE_NEW;
                        break;
                    case 2:
                        color = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
                        break;
                    case 3:
                        color = TextFieldConst.COLOR_QUALITY_BLUE_NEW;
                        break;
                    case 4:
                        color = TextFieldConst.COLOR_QUALITY_PURPLE_NEW;
                        break;
                    case 5:
                        color = TextFieldConst.COLOR_QUALITY_ORANGE_NEW;
                        break;
                    case 6:
                        color = TextFieldConst.COLOR_QUALITY_RED_NEW;
                        break;
                    case 7:
                        color = TextFieldConst.COLOR_QUALITY_YELLOW_NEW;
                        break;
                    case 8:
                        color = TextFieldConst.COLOR_QUALITY_GOLD_NEW;
                        break;
                }
                return color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleItemCfg.prototype, "name", {
            get: function () {
                return LanguageManager.getlocal("itemName_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleItemCfg.prototype, "titleIcon", {
            get: function () {
                return "user_title_" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleItemCfg.prototype, "titleIcon2", {
            get: function () {
                return "user_title_" + this.id + "_2";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleItemCfg.prototype, "titleIcon3", {
            get: function () {
                return "user_title_" + this.id + "_3";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleItemCfg.prototype, "icon", {
            /**
             * 道具图片
             */
            get: function () {
                return "itemicon" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleItemCfg.prototype, "iconBg", {
            /**
             * 道具图片背景
             */
            get: function () {
                return "itembg_" + (this.quality ? this.quality : 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleItemCfg.prototype, "desc", {
            // 道具描述
            get: function () {
                if (this.isLvUp == 1) {
                    var parms = [];
                    if (this.effect1) {
                        parms.push(String(this.effect1));
                    }
                    if (this.effect2) {
                        parms.push(String(this.effect2 * 100 + "%"));
                    }
                    if (this.atkEffect) {
                        parms.push(String(Math.ceil(this.atkEffect * 100)));
                    }
                    return LanguageManager.getlocal("itemDesc_" + this.id, parms);
                }
                else {
                    return LanguageManager.getlocal("itemDesc_" + this.id);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TitleItemCfg.prototype, "dropDesc", {
            // 道具描述
            get: function () {
                return LanguageManager.getlocal("itemDropDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        return TitleItemCfg;
    }(BaseItemCfg));
    Config.TitleItemCfg = TitleItemCfg;
    __reflect(TitleItemCfg.prototype, "Config.TitleItemCfg");
})(Config || (Config = {}));
