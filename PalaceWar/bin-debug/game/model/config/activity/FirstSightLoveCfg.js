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
    var AcCfg;
    (function (AcCfg) {
        /**
         * 女优活动 依见钟情
          */
        var FirstSightLoveCfg = (function () {
            function FirstSightLoveCfg() {
            }
            FirstSightLoveCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "festival1") {
                        this.festivalList1 = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new FirstSightLoveFestivalItem1();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
                            this.festivalList1.push(itemCfg);
                        }
                    }
                    else if (key == "festival2") {
                        this.festivalList2 = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new FirstSightLoveFestivalItem2();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
                            this.festivalList2.push(itemCfg);
                        }
                    }
                }
            };
            return FirstSightLoveCfg;
        }());
        AcCfg.FirstSightLoveCfg = FirstSightLoveCfg;
        __reflect(FirstSightLoveCfg.prototype, "Config.AcCfg.FirstSightLoveCfg");
        var FirstSightLoveFestivalItem1 = (function (_super) {
            __extends(FirstSightLoveFestivalItem1, _super);
            function FirstSightLoveFestivalItem1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return FirstSightLoveFestivalItem1;
        }(BaseItemCfg));
        AcCfg.FirstSightLoveFestivalItem1 = FirstSightLoveFestivalItem1;
        __reflect(FirstSightLoveFestivalItem1.prototype, "Config.AcCfg.FirstSightLoveFestivalItem1");
        var FirstSightLoveFestivalItem2 = (function (_super) {
            __extends(FirstSightLoveFestivalItem2, _super);
            function FirstSightLoveFestivalItem2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return FirstSightLoveFestivalItem2;
        }(BaseItemCfg));
        AcCfg.FirstSightLoveFestivalItem2 = FirstSightLoveFestivalItem2;
        __reflect(FirstSightLoveFestivalItem2.prototype, "Config.AcCfg.FirstSightLoveFestivalItem2");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=FirstSightLoveCfg.js.map