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
        var NewYearSignUpCfg = (function () {
            function NewYearSignUpCfg() {
                /** 展示时间 */
                this.extraTime = 0;
                this.newSignUpItemCfgList = [];
            }
            /**
             * 初始化数据
             */
            NewYearSignUpCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "newSignUp") {
                        this.newSignUpItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new NewSignUpItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.newSignUpItemCfgList.push(itemcfg);
                        }
                    }
                }
            };
            NewYearSignUpCfg.prototype.getNewSignUpItemCfg = function (index) {
                return this.newSignUpItemCfgList[index];
            };
            return NewYearSignUpCfg;
        }());
        AcCfg.NewYearSignUpCfg = NewYearSignUpCfg;
        __reflect(NewYearSignUpCfg.prototype, "Config.AcCfg.NewYearSignUpCfg");
        /**
         * item
         */
        var NewSignUpItemCfg = (function (_super) {
            __extends(NewSignUpItemCfg, _super);
            function NewSignUpItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return NewSignUpItemCfg;
        }(BaseItemCfg));
        AcCfg.NewSignUpItemCfg = NewSignUpItemCfg;
        __reflect(NewSignUpItemCfg.prototype, "Config.AcCfg.NewSignUpItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NewYearSignUpCfg.js.map