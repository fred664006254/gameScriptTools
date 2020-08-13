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
/**
 * 主线任务api
 * author yanyuling
 * date 2018/01/04
 * @class TradeVoApi
 */
var TradeVoApi = (function (_super) {
    __extends(TradeVoApi, _super);
    function TradeVoApi() {
        return _super.call(this) || this;
    }
    TradeVoApi.prototype.getCurrentCid = function () {
        return this.tradeVo.cid;
    };
    TradeVoApi.prototype.getCurrentRewards = function () {
        return this.tradeVo.rewards;
    };
    TradeVoApi.prototype.getCurrentTradeCfg = function () {
        if (Config.TradeCfg.getMaxTradeIndex() + 1 == Number(this.getCurrentCid())) {
            return null;
            // return <Config.TradeItemCfg>Config.TradeCfg.getTradeCfgById(String(Config.TradeCfg.getMaxTradeIndex()));
        }
        return Config.TradeCfg.getTradeCfgById(this.getCurrentCid());
        ;
    };
    TradeVoApi.prototype.isBatchEnable = function () {
        return this.tradeVo.batchFlag > 0;
    };
    //计算可以打多少关
    TradeVoApi.prototype.getAttNum = function (startIndex) {
        var num = 0;
        var myGoldNum = Api.playerVoApi.getPlayerGold();
        for (var index = startIndex; index <= 200; index++) {
            var cfg = Config.TradeCfg.getTradeCfgById(index + "");
            if (!cfg) {
                break;
            }
            //atk1 智力A 钱A atk2 智力B 钱B
            var battleReport = this.getBattleResult(Api.playerVoApi.getRealInte(), myGoldNum, cfg.tradeInte, cfg.tradeGold);
            if (battleReport.success) {
                num++;
            }
            myGoldNum = myGoldNum - battleReport.cost;
        }
        return num;
    };
    //atk1 智力A 钱A atk2 智力B 钱B
    TradeVoApi.prototype.getBattleResult = function (inte1, gold1, inte2, gold2) {
        // let finaSold1 = Math.ceil(soldier1-soldier2 * (atk2+1000)/(atk1+1000))
        // let finaSold2 = Math.ceil(soldier2-soldier1 * (atk1+1000)/(atk2+1000))
        // let costNum = soldier2 * (atk2+1000)/(atk1+1000);
        var finaSold1 = Math.ceil(gold1 - gold2 * (inte2 + 1000) / (inte1 + 1000));
        var finaSold2 = Math.ceil(gold2 - gold1 * (inte1 + 1000) / (inte2 + 1000));
        var costNum = Math.floor(gold2 * (inte2 + 1000) / (inte1 + 1000));
        var success = false;
        if (finaSold1 > 0) {
            finaSold2 = 0;
            success = true;
        }
        else if (finaSold1 == 0 && finaSold2 == 0) {
            finaSold1 = 0;
            finaSold2 = 1;
        }
        else {
            finaSold1 = 0;
        }
        var battleReport = {
            success: success,
            left1: finaSold1,
            left2: finaSold2,
            cost: costNum
        };
        return battleReport;
    };
    //计算消耗多少钱数
    TradeVoApi.prototype.getAttCostNum = function (startIndex, carNum) {
        var costNum = 0;
        var myGoldNum = Api.playerVoApi.getPlayerGold();
        for (var index = startIndex; index < startIndex + carNum; index++) {
            var cfg = Config.TradeCfg.getTradeCfgById(index + "");
            if (!cfg) {
                break;
            }
            // 智力A 钱A atk2 智力B 钱B
            var battleReport = this.getBattleResult(Api.playerVoApi.getRealInte(), myGoldNum, cfg.tradeInte, cfg.tradeGold);
            if (battleReport.success) {
                costNum = costNum + battleReport.cost;
            }
            myGoldNum = myGoldNum - battleReport.cost;
        }
        return costNum;
    };
    TradeVoApi.prototype.getAttCostNum2 = function (startIndex, carNum) {
        var costNum = 0;
        var myGoldNum = Api.playerVoApi.getPlayerGold();
        for (var index = startIndex; index < startIndex + carNum; index++) {
            var cfg = Config.TradeCfg.getTradeCfgById(index + "");
            if (!cfg) {
                break;
            }
            // 智力A 钱A atk2 智力B 钱B
            var battleReport = this.getBattleResult(Api.playerVoApi.getRealInte(), myGoldNum, cfg.tradeInte, cfg.tradeGold);
            costNum = costNum + battleReport.cost;
        }
        return costNum;
    };
    TradeVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(GameConfig.config.tradebaseCfg.unlock)]);
    };
    TradeVoApi.prototype.isShowNpc = function () {
        if (Api.playerVoApi.getPlayerLevel() >= GameConfig.config.tradebaseCfg.unlock) {
            return true;
        }
        else {
            return false;
        }
    };
    // public checkNpcMessage():boolean
    // {
    // 	if(Api.playerVoApi.getPlayerLevel()>=GameConfig.config.tradebaseCfg.unlock)
    // 	{
    // 		return true
    // 	}
    // 	else
    // 	{
    // 		return false
    // 	}
    // }
    TradeVoApi.prototype.getDecreePolicyAddAttrInfo = function () {
        return Api.promoteVoApi.getDecreePolicyAddAttrInfo("trade", 8);
    };
    return TradeVoApi;
}(BaseVoApi));
__reflect(TradeVoApi.prototype, "TradeVoApi");
//# sourceMappingURL=TradeVoApi.js.map