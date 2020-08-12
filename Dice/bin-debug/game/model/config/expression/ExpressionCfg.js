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
    var ExpressionCfg;
    (function (ExpressionCfg) {
        var expressionList = {};
        function formatData(data) {
            for (var key in data.expressionList) {
                if (data.expressionList.hasOwnProperty(key)) {
                    expressionList[key] = data[key];
                }
            }
        }
        ExpressionCfg.formatData = formatData;
        /**
         * 获取免费表情列表
         */
        function getFreeExpression() {
            var frees = [];
            for (var key in expressionList) {
                if (expressionList.hasOwnProperty(key)) {
                    if (key.toString()["startsWith"]("1")) {
                        frees.push(key);
                    }
                }
            }
            frees = ["dianzan", "fennu", "daku", "daxiao", "koubizi"];
            return frees;
        }
        ExpressionCfg.getFreeExpression = getFreeExpression;
        /**
         * 获取高级表情列表
         */
        function getBuyExpre() {
            var buys = [];
            for (var key in expressionList) {
                if (expressionList.hasOwnProperty(key)) {
                    if (key.toString()["startsWith"]("2")) {
                        buys.push(key);
                    }
                }
            }
            buys = ["kaixin", "juqi", "leile", "xuanyao", "wanku"];
            return buys;
        }
        ExpressionCfg.getBuyExpre = getBuyExpre;
    })(ExpressionCfg = Config.ExpressionCfg || (Config.ExpressionCfg = {}));
    var ExpressionItemCfg = (function (_super) {
        __extends(ExpressionItemCfg, _super);
        function ExpressionItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ExpressionItemCfg;
    }(BaseItemCfg));
    __reflect(ExpressionItemCfg.prototype, "ExpressionItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=ExpressionCfg.js.map