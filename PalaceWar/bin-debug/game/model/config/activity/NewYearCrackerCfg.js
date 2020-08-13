var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var NewYearCrackerCfg = (function () {
            function NewYearCrackerCfg() {
                /**
                 * --连续七天完成t1任务奖励
                 */
                /**
                 *  --炮坐标。1-7由远至近
                    --picCoord:炮，图片定位坐标。xxx={x,y}
                    --titCoord:炮文字底板定位坐标，文字需要与底板居中对齐。xxx={x,y}
                 */
                this.coordinate = [];
                /**
                 * -点炮奖励
                 *  --needItem：所需额度：单位（元宝）
                    --getReward：奖励
                 */
                this.recharge = [];
                /**
                 * --活动期间活跃任务   注：每日不重置
                    --openType：跳转
                    --questType：任务类型  特殊类型：1--登录X天
                    --value：进度
                    --zongziGet：获得粽子
                    --getReward：奖励
                 */
                this.dailyTask = [];
                this.maxGem = 500;
            }
            NewYearCrackerCfg.prototype.formatData = function (data) {
                this.ratio = data.ratio;
                this.extraTime = data.extraTime;
                this.firecracker = data.firecracker;
                this.dailyTask = data.dailyTask;
                this.recharge = data.recharge;
                this.bigPrize = data.bigPrize;
                this.coordinate = data.coordinate;
                // for(var key in data.recharge)
                // {
                //     let itemCfg:NewYearCrackerItemCfg;
                //     let index = Number(key) + 1;
                //     if(!this.recharge.hasOwnProperty(String(index)))
                //     {
                //         this.recharge[String(index)]=new NewYearCrackerItemCfg();
                //     }
                //     itemCfg=this.recharge[String(index)];
                //     itemCfg.initData(data.recharge[key]);
                //     itemCfg.id=index;
                // }
            };
            return NewYearCrackerCfg;
        }());
        AcCfg.NewYearCrackerCfg = NewYearCrackerCfg;
        __reflect(NewYearCrackerCfg.prototype, "Config.AcCfg.NewYearCrackerCfg");
        // class NewYearCrackerItemCfg extends BaseItemCfg
        // {
        //     public id:number;
        //     /**
        //      * 所需额度：单位（元宝）
        //      */
        //     public needItem:number;
        //     /**
        //      * 奖励
        //      */
        //     public getReward:string;
        //     public get rewardIcons():BaseDisplayObjectContainer[]
        //     {
        //         return GameData.getRewardItemIcons(this.getReward,true,false);
        //     }
        // }
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NewYearCrackerCfg.js.map