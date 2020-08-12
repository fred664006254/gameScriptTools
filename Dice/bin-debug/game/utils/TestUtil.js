var App;
(function (App) {
    /**
     * 测试工具类
     * author 陈可
     * date 2018/12/25
     * @class TestUtil
     */
    var TestUtil;
    (function (TestUtil) {
        /**
         * 获取testplat参数，必须是已有的，否则返回空字符串
         */
        function getTestPlat() {
            var testPlat = getRealTestPlat();
            if (testPlat && testPlat.indexOf("test") == 0 && testPlat != "test") {
                testPlat = testPlat.replace("test", "");
            }
            return testPlat;
        }
        TestUtil.getTestPlat = getTestPlat;
        function getRealTestPlat() {
            var realTestPlat = App.CommonUtil.getOption("testplat");
            var testPlat = realTestPlat;
            if (testPlat && testPlat.indexOf("test") == 0 && testPlat != "test") {
                testPlat = testPlat.replace("test", "");
            }
            testPlat = testPlat && ServerCfg.allHost[testPlat] ? testPlat : "";
            if (!testPlat) {
                realTestPlat = "";
            }
            return realTestPlat;
        }
        /**
         * 检测是否是testplat1000服
         */
        function checkIsTestPlat1000() {
            var is1000Test = false;
            var testPlat = getRealTestPlat();
            if (testPlat && testPlat.indexOf("test") == 0 && testPlat != "test") {
                is1000Test = true;
            }
            return is1000Test;
        }
        TestUtil.checkIsTestPlat1000 = checkIsTestPlat1000;
    })(TestUtil = App.TestUtil || (App.TestUtil = {}));
})(App || (App = {}));
//# sourceMappingURL=TestUtil.js.map