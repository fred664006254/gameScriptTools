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
     *
     * author qianjun
     * @class 宝箱列表
     */
    var BoxCfg;
    (function (BoxCfg) {
        var totalBox = {};
        function formatData(data) {
            for (var key in data.totalBox) {
                var itemCfg = void 0;
                if (!totalBox.hasOwnProperty(String(key))) {
                    totalBox[String(key)] = new BoxCfgItem();
                }
                itemCfg = totalBox[String(key)];
                itemCfg.initData(data.totalBox[key]);
                itemCfg.id = String(key);
            }
        }
        BoxCfg.formatData = formatData;
        function getBoxCfgById(boxid) {
            var cfg = totalBox[boxid];
            return cfg;
        }
        BoxCfg.getBoxCfgById = getBoxCfgById;
    })(BoxCfg = Config.BoxCfg || (Config.BoxCfg = {}));
    var BoxCfgItem = (function (_super) {
        __extends(BoxCfgItem, _super);
        function BoxCfgItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BoxCfgItem.prototype, "name", {
            /**
             * 宝箱名称
             */
            get: function () {
                return LangMger.getlocal("boxname_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxCfgItem.prototype, "icon", {
            /**
             * 宝箱icon
             */
            get: function () {
                var iconstr = "itembox" + this.id;
                if (!RES.hasRes(iconstr)) {
                    iconstr = "itembox1004";
                }
                return iconstr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxCfgItem.prototype, "goldNum", {
            /**
             * 宝箱包含金币数
             */
            get: function () {
                var num = 0;
                var level = Api.UserinfoVoApi.getLevel();
                if (this.boxGold && this.boxGold.length) {
                    var rid = Math.min(level, this.boxGold.length);
                    num = this.boxGold[rid - 1];
                }
                return num;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxCfgItem.prototype, "gemNum", {
            /**
             * 宝箱包含钻石数
             */
            get: function () {
                var num = 0;
                var level = Api.UserinfoVoApi.getLevel();
                if (this.boxGem && this.boxGem.length) {
                    var rid = Math.min(level, this.boxGold.length);
                    num = this.boxGem[rid - 1];
                }
                return num;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 各类型骰子获得数
         */
        BoxCfgItem.prototype.getCardNumByType = function (type) {
            var num = 0;
            var level = Api.UserinfoVoApi.getLevel();
            var rarr = this["boxCard" + type + "Num"];
            if (rarr && rarr.length) {
                var rid = Math.min(level, rarr.length);
                num = rarr[rid - 1];
            }
            return num;
        };
        /**
         * 获取该类型的卡片是否有扩展气泡提示
         */
        BoxCfgItem.prototype.getCardPoolShow = function (type) {
            var flag = false;
            if (this["boxCard" + type + "Show"] && this["boxCard" + type + "Show"] == 1) {
                flag = true;
            }
            return flag;
        };
        /**
         * 获取该类型的卡片是否有几率获得显示
         */
        BoxCfgItem.prototype.getCardRatioShow = function (type) {
            var flag = false;
            if (this["boxCard" + type + "Ratio"] && this["boxCard" + type + "Ratio"].length) {
                flag = true;
            }
            return flag;
        };
        /**
         * 获取该类型的卡片是否有扩展气泡提示
         */
        BoxCfgItem.prototype.getCardPool = function (type) {
            // let arr = [`100_416_1`,`100_416_1`,`100_416_1`];
            var arr = [];
            if (this.getCardPoolShow(type)) {
                if (this["boxCard" + type + "Pool"]) {
                    var pool = this["boxCard" + type + "Pool"];
                    for (var i in pool) {
                        arr.push(pool[i][0]);
                    }
                }
            }
            return arr;
        };
        return BoxCfgItem;
    }(BaseItemCfg));
    Config.BoxCfgItem = BoxCfgItem;
    __reflect(BoxCfgItem.prototype, "Config.BoxCfgItem");
})(Config || (Config = {}));
//# sourceMappingURL=BoxCfg.js.map