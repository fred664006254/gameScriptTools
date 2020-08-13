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
    var ItemItemCfg = (function (_super) {
        __extends(ItemItemCfg, _super);
        function ItemItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
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
                var color = TextFieldConst.COLOR_QUALITY_WHITE_NEW;
                switch (Number(this.quality)) {
                    // case 1:
                    // 	color=TextFieldConst.COLOR_QUALITY_WHITE;
                    // 	break;
                    // case 2:
                    // 	color=TextFieldConst.COLOR_QUALITY_GREEN;
                    // 	break;
                    // case 3:
                    // 	color=TextFieldConst.COLOR_QUALITY_BLUE;
                    // 	break;
                    // case 4:
                    // 	color=TextFieldConst.COLOR_QUALITY_PURPLE;
                    // 	break;
                    // case 5:
                    // 	color=TextFieldConst.COLOR_QUALITY_ORANGE;
                    // break;
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
                descStr = App.StringUtil.formatStringColor(LanguageManager.getlocal("effectTitle"), TextFieldConst.COLOR_BROWN) + this.desc;
            }
            else {
                descStr = this.desc;
            }
            var descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            descTxt.lineSpacing = 2;
            return descTxt;
        };
        /**
         * 获取icon显示对象
         */
        ItemItemCfg.prototype.getIconContainer = function (isTouchInfo) {
            var container = GameData.getIconContainer(this.icon, this.iconBg);
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
    __reflect(ItemItemCfg.prototype, "Config.ItemItemCfg");
})(Config || (Config = {}));
