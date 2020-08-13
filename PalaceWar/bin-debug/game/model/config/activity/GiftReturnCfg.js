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
        *  的 cfg
        * @author 张朝阳
        * date 2019/7/1
        * @class GiftReturnCfg
        */
        var GiftReturnCfg = (function () {
            function GiftReturnCfg() {
                this.extraTime = 0;
                /**充值任务，重复X轮。前端展示为元宝数量 */
                this.task = null;
                /**充值列表 */
                this._claimItemCfgList = [];
                /**
                 * 初始化数据
                 */
                this.extra = null;
            }
            GiftReturnCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this["" + key] = data[key];
                    if (key == "claim") {
                        this._claimItemCfgList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new GiftReturnClaimItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i + 1);
                            this._claimItemCfgList.push(itemcfg);
                        }
                    }
                }
            };
            GiftReturnCfg.prototype.getItemVo = function () {
                var rewardItemVo = GameData.formatRewardItem(this.task.getReward)[0];
                return rewardItemVo;
            };
            Object.defineProperty(GiftReturnCfg.prototype, "claimItemCfgList", {
                get: function () {
                    var tempArray = [];
                    for (var i = 0; i < this._claimItemCfgList.length; i++) {
                        var onecfg = this._claimItemCfgList[i];
                        if (!onecfg.preItem) {
                            tempArray.push(onecfg);
                            continue;
                        }
                        var rewardVoList = GameData.formatRewardItem(onecfg.preItem);
                        var isShow = false;
                        for (var j = 0; j < rewardVoList.length; j++) {
                            if (rewardVoList[j].type == 19) {
                                var skinid = rewardVoList[j].id;
                                var skincfg = Config.ServantskinCfg.getServantSkinItemById(skinid);
                                var servant = Api.servantVoApi.getServantObj(skincfg.servantId);
                                var skinvo = void 0;
                                if (servant && servant.skin) {
                                    skinvo = servant.skin[Number(skinid)];
                                }
                                if (skinvo && skinvo.getbookIdList().length > 0) {
                                    isShow = true;
                                    break;
                                }
                            }
                            else if (rewardVoList[j].type == 6) {
                                if (Api.itemVoApi.getItemNumInfoVoById(rewardVoList[j].id) > 0) {
                                    isShow = true;
                                    break;
                                }
                            }
                        }
                        if (isShow) {
                            tempArray.push(onecfg);
                        }
                    }
                    return tempArray;
                },
                enumerable: true,
                configurable: true
            });
            return GiftReturnCfg;
        }());
        AcCfg.GiftReturnCfg = GiftReturnCfg;
        __reflect(GiftReturnCfg.prototype, "Config.AcCfg.GiftReturnCfg");
        /**活动期间，进度奖励 */
        var GiftReturnClaimItemCfg = (function (_super) {
            __extends(GiftReturnClaimItemCfg, _super);
            function GiftReturnClaimItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return GiftReturnClaimItemCfg;
        }(BaseItemCfg));
        AcCfg.GiftReturnClaimItemCfg = GiftReturnClaimItemCfg;
        __reflect(GiftReturnClaimItemCfg.prototype, "Config.AcCfg.GiftReturnClaimItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=GiftReturnCfg.js.map