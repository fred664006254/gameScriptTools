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
     * author dmj
     * date 2017/9/25
     * @class ItemCfg
     */
    var ItemCfg;
    (function (ItemCfg) {
        var itemList = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!itemList.hasOwnProperty(String(key))) {
                    itemList[String(key)] = new ItemItemCfg();
                }
                itemCfg = itemList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        ItemCfg.formatData = formatData;
        /**
         * 通过道具id获取单个道具配置
         * @param id 道具id
         */
        function getItemCfgById(id) {
            return itemList[String(id)];
        }
        ItemCfg.getItemCfgById = getItemCfgById;
    })(ItemCfg = Config.ItemCfg || (Config.ItemCfg = {}));
    var ItemItemCfg = /** @class */ (function (_super) {
        __extends(ItemItemCfg, _super);
        function ItemItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.costHeCheng = 0;
            /**
             * 门客皮肤id
             */
            _this.servantSkinID = 0;
            return _this;
        }
        Object.defineProperty(ItemItemCfg.prototype, "name", {
            /**
             * 道具名称
             */
            get: function () {
                return LanguageManager.getlocal("itemName_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemItemCfg.prototype, "qualityColor", {
            get: function () {
                var color = GameConfig.getQualityColor(Number(this.quality));
                return color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemItemCfg.prototype, "icon", {
            /**
             * 道具图片
             */
            get: function () {
                return "itemicon" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemItemCfg.prototype, "iconBg", {
            /**
             * 道具图片背景
             */
            get: function () {
                return "itembg_" + (this.quality ? this.quality : 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemItemCfg.prototype, "desc", {
            // 道具描述
            get: function () {
                if (GameData.isInArray(this.id, ["2101"]) && Api.switchVoApi.checkWifeSkinLevelUp()) {
                    return LanguageManager.getlocal("itemDesc_" + this.id + "_wifeskinlevelup");
                }
                if (GameData.isInArray(this.id, [
                    "1716", "1717", "1718", "1035", "1036", "1037", "1038", "1039",
                    "51001", "51002", "51003", "51004", "51005", "51006", "51007", "51008", "51009", "51010",
                    "51011", "51012", "51013", "51014", "51015", "51016", "51017", "51018", "51019", "51020", "51021", "51022", "51023", "51024", "51025", "51026", "51027", "51028", "51029", "51030", "51031", "51032", "51033", "51034", "51035", "51036", "51037", "51038", "51039", "51040", "51041", "51042", "51043", "51044", "51045", "51046", "51047", "51048", "51049", "51050", "51051", "51052", "51053", "51054", "51055", "51056", "51057", "51058", "51059", "51060", "51061", "51062", "51063", "51064", "51065", "51066", "51067", "51068", "51069", "51070", "51071", "51072", "51073", "51074", "51075", "51076", "51077", "51078", "51079", "51080"
                ])) {
                    if (Api.switchVoApi.checkOpenServantLevel450()) {
                        return LanguageManager.getlocal("itemDesc_" + this.id + "_withOpen");
                    }
                }
                else if (this.type == 2) {
                    return LanguageManager.getlocal("itemDesc_" + this.id, [String(this.costHeCheng)]);
                }
                // if(this.target == 7)//门客书籍等级
                // {
                // 	let param1 = LanguageManager.getlocal("servant_name"+this.targetId);
                // 	let arry = this.getRewards.split("_");
                // 	let param2 = LanguageManager.getlocal("servant_attrNameTxt"+arry[1]);
                // 	return LanguageManager.getlocal("itemDesc_purpose_" + arry[0],[param1,param2,arry[2]]);
                // }
                // else if(this.target == 8)//红颜亲密/魅力
                // {	
                // 	let arry = this.getRewards.split("_");
                // 	let param1 = LanguageManager.getlocal("wifeName_"+arry[1]);
                // 	return LanguageManager.getlocal("itemDesc_purpose_" + arry[0],[param1,arry[2]]);
                // }
                return LanguageManager.getlocal("itemDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemItemCfg.prototype, "dropDesc", {
            // 道具掉落描述
            get: function () {
                return LanguageManager.getlocal("itemDropDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemItemCfg.prototype, "nameTxt", {
            get: function () {
                var nameTxt = ComponentManager.getTextField(this.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, this.qualityColor);
                return nameTxt;
            },
            enumerable: true,
            configurable: true
        });
        ItemItemCfg.prototype.getDescTxt = function (showEffectStr) {
            var descStr;
            if (showEffectStr) {
                descStr = App.StringUtil.formatStringColor(LanguageManager.getlocal("effectTitle"), TextFieldConst.COLOR_LIGHT_YELLOW) + this.desc;
            }
            else {
                descStr = this.desc;
            }
            var descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            descTxt.lineSpacing = 2;
            return descTxt;
        };
        ItemItemCfg.prototype.descByNum = function (n) {
            var desc = "";
            if (this.target == 7) //门客书籍等级
             {
                var param1 = LanguageManager.getlocal("servant_name" + this.targetId);
                var arry = this.getRewards.split("_");
                var param2 = LanguageManager.getlocal("servant_attrNameTxt" + arry[1]);
                var value = Number(arry[2]) * n;
                desc = LanguageManager.getlocal("itemDesc_purpose_" + arry[0], [param1, param2, String(value)]);
            }
            else if (this.target == 8) //红颜亲密/魅力
             {
                var arry = this.getRewards.split("_");
                var param1 = LanguageManager.getlocal("wifeName_" + arry[1]);
                var value = Number(arry[2]) * n;
                desc = LanguageManager.getlocal("itemDesc_purpose_" + arry[0], [param1, String(value)]);
            }
            var descStr = App.StringUtil.formatStringColor(LanguageManager.getlocal("effectTitle"), TextFieldConst.COLOR_LIGHT_YELLOW) + desc;
            return descStr;
        };
        /**
         * 获取icon显示对象
         */
        ItemItemCfg.prototype.getIconContainer = function (isTouchInfo, num) {
            var container = GameData.getIconContainer(this.icon, this.iconBg, num);
            if (isTouchInfo) {
                var bg = container.getChildByName("iconBg");
                bg.addTouchTap(function (event, id) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, id);
                }, GameData, [this.id]);
            }
            return container;
        };
        return ItemItemCfg;
    }(BaseItemCfg));
    Config.ItemItemCfg = ItemItemCfg;
})(Config || (Config = {}));
//# sourceMappingURL=ItemCfg.js.map