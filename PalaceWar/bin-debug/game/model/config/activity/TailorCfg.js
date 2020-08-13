var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var TailorCfg = (function () {
            function TailorCfg() {
            }
            TailorCfg.prototype.formatData = function (data) {
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                    }
                }
            };
            Object.defineProperty(TailorCfg.prototype, "showList", {
                get: function () {
                    var resList = [];
                    for (var index = 0; index < this._showList.length; index++) {
                        var element = this._showList[index];
                        if (Config.WifeskinCfg.isSkinOPend(element[0])) {
                            resList.push(element);
                        }
                    }
                    return resList;
                },
                set: function (param) {
                    this._showList = param;
                },
                enumerable: true,
                configurable: true
            });
            TailorCfg.prototype.getShowItem = function (id) {
                for (var i = 0; i < this.showList.length; i++) {
                    if (this.showList[i][0] == id) {
                        return this.showList[i];
                    }
                }
                return null;
            };
            Object.defineProperty(TailorCfg.prototype, "shop", {
                get: function () {
                    var resList = [];
                    for (var key in this._shop) {
                        if (Config.WifeskinCfg.isSkinOPend(key)) {
                            resList[key] = this._shop[key];
                        }
                    }
                    return resList;
                },
                set: function (param) {
                    this._shop = param;
                },
                enumerable: true,
                configurable: true
            });
            return TailorCfg;
        }());
        AcCfg.TailorCfg = TailorCfg;
        __reflect(TailorCfg.prototype, "Config.AcCfg.TailorCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=TailorCfg.js.map