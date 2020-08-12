var App;
(function (App) {
    var ObjectUtil;
    (function (ObjectUtil) {
        /**
         * 清理Object对象数据
         * @param params
         */
        function clear(params) {
            if (params && (typeof params) == "object") {
                if (params instanceof Array) {
                    params.length = 0;
                }
                else {
                    for (var key in params) {
                        if (params.hasOwnProperty(key)) {
                            delete params[key];
                        }
                    }
                }
            }
        }
        ObjectUtil.clear = clear;
    })(ObjectUtil = App.ObjectUtil || (App.ObjectUtil = {}));
})(App || (App = {}));
//# sourceMappingURL=ObjectUtil.js.map