var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    /**
     * 新官上任配置
     * @author 赵占涛
     */
    var LoginWeekCfg = (function () {
        function LoginWeekCfg() {
        }
        //解析数据
        LoginWeekCfg.prototype.formatData = function (data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        };
        return LoginWeekCfg;
    }());
    Config.LoginWeekCfg = LoginWeekCfg;
    __reflect(LoginWeekCfg.prototype, "Config.LoginWeekCfg");
})(Config || (Config = {}));
