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
     * 自定义头像配置类
     * author zhaozhantao
     * date 2019/7/31
     * @namespace PortraitCfg
     */
    var PortraitCfg;
    (function (PortraitCfg) {
        var portraitList = {};
        function formatData(data) {
            for (var key in data) {
                var portraitCfg = void 0;
                if (!portraitList.hasOwnProperty(String(key))) {
                    portraitList[String(key)] = new PortraitItemCfg();
                }
                portraitCfg = portraitList[String(key)];
                portraitCfg.initData(data[key]);
                portraitCfg.id = String(key);
            }
        }
        PortraitCfg.formatData = formatData;
        /**
         * 通过道具id获取单个道具配置
         * @param id 道具id
         */
        function getPortraitCfgById(id) {
            return portraitList[String(id)];
        }
        PortraitCfg.getPortraitCfgById = getPortraitCfgById;
        function getPortraitCfg() {
            return portraitList;
        }
        PortraitCfg.getPortraitCfg = getPortraitCfg;
        function getPortraitIdList() {
            return Object.keys(portraitList);
        }
        PortraitCfg.getPortraitIdList = getPortraitIdList;
    })(PortraitCfg = Config.PortraitCfg || (Config.PortraitCfg = {}));
    var PortraitItemCfg = (function (_super) {
        __extends(PortraitItemCfg, _super);
        function PortraitItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 分组  1委任状，2称号，3头像框，4头像
             */
            _this.group = 4;
            return _this;
        }
        Object.defineProperty(PortraitItemCfg.prototype, "qualityColor", {
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
        Object.defineProperty(PortraitItemCfg.prototype, "name", {
            get: function () {
                return LanguageManager.getlocal("itemName_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PortraitItemCfg.prototype, "icon", {
            /**
             * 道具图片
             */
            get: function () {
                return "user_head" + this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PortraitItemCfg.prototype, "iconBg", {
            /**
             * 道具图片背景
             */
            get: function () {
                return "itembg_" + (this.quality ? this.quality : 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PortraitItemCfg.prototype, "desc", {
            // 道具描述
            get: function () {
                return LanguageManager.getlocal("itemDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PortraitItemCfg.prototype, "dropDesc", {
            // 道具描述
            get: function () {
                return LanguageManager.getlocal("itemDropDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        return PortraitItemCfg;
    }(BaseItemCfg));
    Config.PortraitItemCfg = PortraitItemCfg;
    __reflect(PortraitItemCfg.prototype, "Config.PortraitItemCfg");
})(Config || (Config = {}));
