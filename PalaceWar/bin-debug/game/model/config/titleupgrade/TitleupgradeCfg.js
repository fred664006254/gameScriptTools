var Config;
(function (Config) {
    var TitleupgradeCfg;
    (function (TitleupgradeCfg) {
        //--王位排序。
        TitleupgradeCfg.wangOrder = [];
        //--王位升级系统
        TitleupgradeCfg.wangList = [];
        //--帝位排序。
        TitleupgradeCfg.diOrder = [];
        //--帝位升级系统
        TitleupgradeCfg.diList = [];
        //--皇位排序。
        TitleupgradeCfg.huangOrder = [];
        //--皇位升级系统
        TitleupgradeCfg.huangList = [];
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        TitleupgradeCfg.formatData = formatData;
        function getWangOrder() {
            var titlecfg = Config.TitleCfg.getTitleCfg();
            var special = 3201;
            for (var i in titlecfg) {
                var cfg = titlecfg[i];
                if (cfg.isTitle == 1 && cfg.titleType == 2 && this.wangOrder.indexOf(Number(cfg.id)) == -1) {
                    this.wangOrder.push(Number(cfg.id));
                }
            }
            var idx = this.wangOrder.indexOf(special);
            var mid = 0; //Math.floor(this.wangOrder.length / 2)
            var tmp = this.wangOrder[mid];
            this.wangOrder[mid] = this.wangOrder[idx];
            this.wangOrder[idx] = tmp;
            return this.wangOrder;
        }
        TitleupgradeCfg.getWangOrder = getWangOrder;
        function getDiOrder() {
            var titlecfg = Config.TitleCfg.getTitleCfg();
            //千古一帝居中
            var special = 3101;
            for (var i in titlecfg) {
                var cfg = titlecfg[i];
                if (cfg.id != "3201" && cfg.isTitle == 1 && cfg.titleType == 1 && this.diOrder.indexOf(Number(cfg.id)) == -1) {
                    this.diOrder.push(Number(cfg.id));
                }
            }
            var idx = this.diOrder.indexOf(special);
            var mid = 0; //Math.floor(this.diOrder.length / 2)
            var tmp = this.diOrder[mid];
            this.diOrder[mid] = this.diOrder[idx];
            this.diOrder[idx] = tmp;
            return this.diOrder;
        }
        TitleupgradeCfg.getDiOrder = getDiOrder;
        function getHuangOrder() {
            var titlecfg = Config.TitleCfg.getTitleCfg();
            //昭烈皇居中 崇德皇左边、玄明皇右边
            var special = 3151;
            for (var i in titlecfg) {
                var cfg = titlecfg[i];
                if (cfg.id != "3201" && cfg.isTitle == 1 && cfg.titleType == 7 && this.huangOrder.indexOf(Number(cfg.id)) == -1) {
                    this.huangOrder.push(Number(cfg.id));
                }
            }
            var idx = this.huangOrder.indexOf(special);
            var mid = 0; //Math.floor(this.diOrder.length / 2)
            var tmp = this.huangOrder[mid];
            this.huangOrder[mid] = this.huangOrder[idx];
            this.huangOrder[idx] = tmp;
            special = 3153;
            idx = this.huangOrder.indexOf(special);
            mid = 1; //Math.floor(this.diOrder.length / 2)
            tmp = this.huangOrder[mid];
            this.huangOrder[mid] = this.huangOrder[idx];
            this.huangOrder[idx] = tmp;
            special = 3152;
            idx = this.huangOrder.indexOf(special);
            mid = 2; //Math.floor(this.diOrder.length / 2)
            tmp = this.huangOrder[mid];
            this.huangOrder[mid] = this.huangOrder[idx];
            this.huangOrder[idx] = tmp;
            return this.huangOrder;
        }
        TitleupgradeCfg.getHuangOrder = getHuangOrder;
    })(TitleupgradeCfg = Config.TitleupgradeCfg || (Config.TitleupgradeCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=TitleupgradeCfg.js.map