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
        function isTheKingTitleId(titleId) {
            return String(titleId) == "3201";
        }
        TitleCfg.isTheKingTitleId = isTheKingTitleId;
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
        /**
         * 是否是头衔
        */
        function getIsTitleOnly(titleId) {
            var cfg = titleList[titleId];
            if (cfg && cfg.type == 4 && cfg.isTitle == 4) {
                return true;
            }
            return false;
        }
        TitleCfg.getIsTitleOnly = getIsTitleOnly;
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
        function formatRewardItemVoStr(id) {
            var arr = ("" + id).split("_");
            if (arr.length == 3) {
                return "" + id;
            }
            return "11_" + id + "_1";
        }
        TitleCfg.formatRewardItemVoStr = formatRewardItemVoStr;
        /**
         * 检查是否有专属头像
         */
        function checkHasSpecialHead(id) {
            var cfg = getTitleCfgById(id);
            if (cfg && cfg.titleType == 7) {
                return true;
            }
            return false;
        }
        TitleCfg.checkHasSpecialHead = checkHasSpecialHead;
        /**
         * 专属头像后缀
         */
        function getSpecialHead(id, pic) {
            var str = "user_head" + id;
            var picstr = pic;
            if (!pic) {
                picstr = Api.playerVoApi.getPlayePicId();
            }
            if (!ResourceManager.hasRes(str)) {
                picstr = 888; //id+"_"+Api.playerVoApi.getUserSex(pic)
            }
            return picstr;
        }
        TitleCfg.getSpecialHead = getSpecialHead;
    })(TitleCfg = Config.TitleCfg || (Config.TitleCfg = {}));
    var TitleItemCfg = /** @class */ (function (_super) {
        __extends(TitleItemCfg, _super);
        function TitleItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
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
        Object.defineProperty(TitleItemCfg.prototype, "name", {
            /**
             * 道具名称
             */
            get: function () {
                return LanguageManager.getlocal("itemName_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 头像框的Icon
         */
        TitleItemCfg.prototype.getHeadBgIcon = function () {
            return "head_circle_bg_" + this.id;
        };
        /**
         * 是否有新变字段
        */
        TitleItemCfg.prototype.isChangePic = function () {
            return (this.changePic && this.changePic.length > 0) ? true : false;
        };
        Object.defineProperty(TitleItemCfg.prototype, "titleIcon2", {
            // public get titleIcon():string
            // {
            // 	return "user_title_"+this.id;
            // }
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
                // if (this.isLvUp == 1)
                // {	
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
                // }
                // else
                // {
                // 	return LanguageManager.getlocal("itemDesc_" + this.id);
                // }
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
        Object.defineProperty(TitleItemCfg.prototype, "titleName", {
            /**
             * 称号的名字
             */
            get: function () {
                return LanguageManager.getlocal("palace_titleName" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取icon显示对象
         */
        TitleItemCfg.prototype.getIconContainer = function (isTouchInfo, num) {
            var container = GameData.getIconContainer(this.icon, this.iconBg, num);
            if (isTouchInfo) {
                var bg = container.getChildByName("iconBg");
                bg.addTouchTap(function (event, id) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, id);
                }, GameData, [this.id]);
            }
            return container;
        };
        return TitleItemCfg;
    }(BaseItemCfg));
    Config.TitleItemCfg = TitleItemCfg;
})(Config || (Config = {}));
//# sourceMappingURL=TitleCfg.js.map