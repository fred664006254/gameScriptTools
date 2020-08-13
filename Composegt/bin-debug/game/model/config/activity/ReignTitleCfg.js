var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var ReignTitleCfg = (function () {
            function ReignTitleCfg() {
                // --元宝抽取价格（元宝）
                this.reignTitlePrice = null;
                // --元宝文字与道具的2类概率
                this.reignTitleType = null;
                // --元宝抽取四个文字分别的概率
                this.reignTitleRate = null;
                // --元宝抽取文字时道具备选
                this.reignTitleReward = null;
                // --升级的头像框ID
                this.reignTitleRewardID = null;
                // --升级需要的文字数量需求
                this.reignTitleLevelNeed = null;
                // --任务奖励的最大天数
                this.maxDay = null;
                // --文字兑换的道具ID
                this.exchangeItem = null;
                // --第一天活跃任务
                this.dayTask1 = null;
                // --第二天活跃任务
                this.dayTask2 = null;
                // --第三天活跃任务
                this.dayTask3 = null;
                // --第四天活跃任务
                this.dayTask4 = null;
                // 文字兑换
                this.rechangeReignTitle = null;
            }
            //解析数据
            ReignTitleCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
            };
            return ReignTitleCfg;
        }());
        AcCfg.ReignTitleCfg = ReignTitleCfg;
        __reflect(ReignTitleCfg.prototype, "Config.AcCfg.ReignTitleCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
