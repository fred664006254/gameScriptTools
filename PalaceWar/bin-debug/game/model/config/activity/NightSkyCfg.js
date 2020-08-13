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
         * 夜观天象
         * author ycg
         * date 2020.6.15
         * @class NightSkyCfg
         */
        var NightSkyCfg = (function () {
            function NightSkyCfg() {
                this.achieveList = [];
            }
            NightSkyCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "nightNum") {
                        this.achieveList = [];
                        for (var k in data[key]) {
                            var itemCfg = new NightSkyAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.achieveList.push(itemCfg);
                        }
                    }
                }
                //pool
                var str = "";
                for (var k in this.nightPool) {
                    str += this.nightPool[k][0] + "|";
                }
                this.poolRewards = str.substring(0, str.length - 1);
            };
            NightSkyCfg.prototype.getAchieveCfg = function () {
                return this.achieveList;
            };
            NightSkyCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return NightSkyCfg;
        }());
        AcCfg.NightSkyCfg = NightSkyCfg;
        __reflect(NightSkyCfg.prototype, "Config.AcCfg.NightSkyCfg");
        /**进度奖励item */
        var NightSkyAchieveItem = (function (_super) {
            __extends(NightSkyAchieveItem, _super);
            function NightSkyAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需分数 */
                _this.needNum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return NightSkyAchieveItem;
        }(BaseItemCfg));
        AcCfg.NightSkyAchieveItem = NightSkyAchieveItem;
        __reflect(NightSkyAchieveItem.prototype, "Config.AcCfg.NightSkyAchieveItem");
        /**
         * 排名奖励
         */
        // export class MouseComeRankItemCfg extends BaseItemCfg
        // {
        // 	public id:number;
        //     private rank:number[] = [];
        //     public getReward:string = '';
        // 	public get minRank():number
        // 	{
        // 		return this.rank[0];
        //     }
        // 	public get maxRank():number
        // 	{
        // 		return this.rank[1];
        // 	}
        // }  
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NightSkyCfg.js.map