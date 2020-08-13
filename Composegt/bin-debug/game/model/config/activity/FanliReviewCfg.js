var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var FanliReviewCfg = (function () {
            function FanliReviewCfg() {
                //1次回顾获得记忆碎片				
                this.ReviewItem = "6_2113_1";
                //记忆碎片上限				
                this.ReviewItemNum = 100;
                //范蠡皮肤ID				
                this.fanliSkinId = 10341;
                //100次回顾获得范蠡皮肤				
                this.ReviewReward = "19_10341_1";
                //1次回顾获得记忆传承x个				
                this.ReviewPool = [];
                // 	{"6_2114_1",70,0,0},				
                // 	{"6_2114_2",20,0,0},				
                // 	{"6_2114_3",10,0,0},				
                // },				
                //-活动期间，抽奖次数的进度奖励				
                //needNum：所需回顾次数				
                //getReward：奖励				
                this.ReviewNum = [];
            }
            FanliReviewCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
            };
            FanliReviewCfg.prototype.getServantSkinId = function () {
                return this.ReviewReward.split("_")[1];
            };
            return FanliReviewCfg;
        }());
        AcCfg.FanliReviewCfg = FanliReviewCfg;
        __reflect(FanliReviewCfg.prototype, "Config.AcCfg.FanliReviewCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
