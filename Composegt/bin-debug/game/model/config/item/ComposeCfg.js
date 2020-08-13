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
    var ComposeCfg;
    (function (ComposeCfg) {
        var composeListArrCfg = {};
        var composeListCfg = {};
        function formatData(data) {
            for (var v in data) {
                if (!composeListCfg.hasOwnProperty(String(key))) {
                    composeListCfg[String(v)] = {};
                }
                if (!composeListArrCfg.hasOwnProperty(String(key))) {
                    composeListArrCfg[String(v)] = [];
                }
                var vArr = composeListArrCfg[String(v)];
                var vCfg = composeListCfg[String(v)];
                var vdata = data[v];
                for (var key in vdata) {
                    var itemCfg = void 0;
                    if (!vCfg.hasOwnProperty(String(key))) {
                        vCfg[String(key)] = new ComposeItemCfg();
                    }
                    itemCfg = vCfg[String(key)];
                    itemCfg.initData(vdata[key]);
                    itemCfg.id = String(key);
                    vArr.push(itemCfg);
                }
                vArr.sort(function (a, b) {
                    if (a.timeLimit) {
                        if (b.timeLimit) {
                            return Number(a.id) - Number(b.id);
                        }
                        else {
                            return -1;
                        }
                    }
                    else {
                        if (b.timeLimit) {
                            return Number(b.timeLimit);
                        }
                        else {
                            return Number(a.id) - Number(b.id);
                        }
                    }
                });
            }
        }
        ComposeCfg.formatData = formatData;
        function getItemCfgById(id, v) {
            return composeListCfg[String(v)][id];
        }
        ComposeCfg.getItemCfgById = getItemCfgById;
        function getComposeList(version) {
            return composeListArrCfg[String(version)];
        }
        ComposeCfg.getComposeList = getComposeList;
    })(ComposeCfg = Config.ComposeCfg || (Config.ComposeCfg = {}));
    var ComposeItemCfg = (function (_super) {
        __extends(ComposeItemCfg, _super);
        function ComposeItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ComposeItemCfg.prototype, "name", {
            get: function () {
                return this.itemCfg.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComposeItemCfg.prototype, "desc", {
            get: function () {
                return this.itemCfg.desc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComposeItemCfg.prototype, "icon", {
            get: function () {
                return this.itemCfg.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComposeItemCfg.prototype, "itemCfg", {
            get: function () {
                return Config.ItemCfg.getItemCfgById(this.itemId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComposeItemCfg.prototype, "iconBg", {
            get: function () {
                return this.itemCfg.iconBg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComposeItemCfg.prototype, "nameTxt", {
            get: function () {
                return this.itemCfg.nameTxt;
            },
            enumerable: true,
            configurable: true
        });
        ComposeItemCfg.prototype.getDescTxt = function (showEffectStr) {
            return this.itemCfg.getDescTxt(showEffectStr);
        };
        Object.defineProperty(ComposeItemCfg.prototype, "needItemCfgList", {
            get: function () {
                if (!this._needItemCfgList) {
                    var list = [];
                    for (var needItemId in this.needItem) {
                        list.push(Config.ItemCfg.getItemCfgById(needItemId));
                    }
                    list.sort(function (a, b) {
                        return Number(a.id) - Number(b.id);
                    });
                    this._needItemCfgList = list;
                }
                return this._needItemCfgList;
            },
            enumerable: true,
            configurable: true
        });
        ComposeItemCfg.prototype.getNeedItemNumById = function (needItemId) {
            for (var needItemId_1 in this.needItem) {
                if (String(needItemId_1) == (needItemId_1)) {
                    return this.needItem[needItemId_1];
                }
            }
            return 0;
        };
        /**
         * 获取icon显示对象
         * @param isTouchInfo 是否点击显示详细信息
         */
        ComposeItemCfg.prototype.getIconContainer = function (isTouchInfo) {
            return this.itemCfg.getIconContainer(isTouchInfo);
        };
        return ComposeItemCfg;
    }(BaseItemCfg));
    Config.ComposeItemCfg = ComposeItemCfg;
    __reflect(ComposeItemCfg.prototype, "Config.ComposeItemCfg");
})(Config || (Config = {}));
