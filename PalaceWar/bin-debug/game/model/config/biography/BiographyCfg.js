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
     * 列传本纪配置
     */
    var BiographyCfg;
    (function (BiographyCfg) {
        var biographyList = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!biographyList.hasOwnProperty(String(key))) {
                    biographyList[String(key)] = new BiographyItemCfg();
                }
                itemCfg = biographyList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        BiographyCfg.formatData = formatData;
        function getCfgBgId(id) {
            return biographyList[id];
        }
        BiographyCfg.getCfgBgId = getCfgBgId;
    })(BiographyCfg = Config.BiographyCfg || (Config.BiographyCfg = {}));
    var BiographyItemCfg = (function (_super) {
        __extends(BiographyItemCfg, _super);
        function BiographyItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BiographyItemCfg.prototype, "name", {
            get: function () {
                return LanguageManager.getlocal("biography_name" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BiographyItemCfg.prototype, "desc", {
            get: function () {
                return LanguageManager.getlocal("biography_desc" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BiographyItemCfg.prototype, "typeName", {
            get: function () {
                return LanguageManager.getlocal("biography_type" + this.type);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BiographyItemCfg.prototype, "typeName2", {
            get: function () {
                return LanguageManager.getlocal("biography_typename" + this.type);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BiographyItemCfg.prototype, "typeNameColor", {
            get: function () {
                if (this.type == 2) {
                    return TextFieldConst.COLOR_WARN_YELLOW;
                }
                return TextFieldConst.COLOR_LIGHT_YELLOW;
            },
            enumerable: true,
            configurable: true
        });
        return BiographyItemCfg;
    }(BaseItemCfg));
    __reflect(BiographyItemCfg.prototype, "BiographyItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=BiographyCfg.js.map