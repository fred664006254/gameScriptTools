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
    var EmperorachieveCfg;
    (function (EmperorachieveCfg) {
        EmperorachieveCfg.king1List = [];
        EmperorachieveCfg.king2List = [];
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
                if (key == "king1") {
                    EmperorachieveCfg.king1List = [];
                    for (var k in data[key]) {
                        var item = new EmperorAchieveItemCfg();
                        item.initData(data[key][k]);
                        item.id = k;
                        item.sortId = Number(k);
                        EmperorachieveCfg.king1List.push(item);
                    }
                }
                else if (key == "king2") {
                    EmperorachieveCfg.king2List = [];
                    for (var k in data[key]) {
                        var item = new EmperorAchieveItemCfg();
                        item.initData(data[key][k]);
                        item.id = k;
                        item.sortId = Number(k);
                        EmperorachieveCfg.king2List.push(item);
                    }
                }
            }
        }
        EmperorachieveCfg.formatData = formatData;
        function getKing1CfgList() {
            return EmperorachieveCfg.king1List;
        }
        EmperorachieveCfg.getKing1CfgList = getKing1CfgList;
        function getKing2CfgList() {
            return EmperorachieveCfg.king2List;
        }
        EmperorachieveCfg.getKing2CfgList = getKing2CfgList;
        var EmperorAchieveItemCfg = (function (_super) {
            __extends(EmperorAchieveItemCfg, _super);
            function EmperorAchieveItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return EmperorAchieveItemCfg;
        }(BaseItemCfg));
        EmperorachieveCfg.EmperorAchieveItemCfg = EmperorAchieveItemCfg;
        __reflect(EmperorAchieveItemCfg.prototype, "Config.EmperorachieveCfg.EmperorAchieveItemCfg");
    })(EmperorachieveCfg = Config.EmperorachieveCfg || (Config.EmperorachieveCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=EmperorachieveCfg.js.map