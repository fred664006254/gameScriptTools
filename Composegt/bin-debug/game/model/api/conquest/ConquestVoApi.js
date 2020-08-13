/**
 * 征伐系统api
 * author dky
 * date 2017/12/27
 * @class ConquestVoApi
 */
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
var ConquestVoApi = (function (_super) {
    __extends(ConquestVoApi, _super);
    function ConquestVoApi() {
        return _super.call(this) || this;
    }
    ConquestVoApi.prototype.getConquestVo = function () {
        return this.conquestVo;
    };
    ConquestVoApi.prototype.isShowNpc = function () {
        var boo = false;
        var unlock = 3322;
        if (Api.challengeVoApi.getCurChannelId() > unlock) {
            boo = true;
        }
        else {
            boo = false;
        }
        return boo;
    };
    ConquestVoApi.prototype.getLockedString = function () {
        var unlock = 88;
        return LanguageManager.getlocal("prisonUnlockDesc", [unlock + ""]);
    };
    ConquestVoApi.prototype.dispose = function () {
        this.conquestVo = null;
        _super.prototype.dispose.call(this);
    };
    // --[[
    // A方，武力A，兵力A
    // B方，武力B，兵力B
    // 如果 兵A - 兵B * （武B +1000）/（ 武A+1000） >=0
    // 则 兵B=0
    //     兵A = 兵A - 兵B * （武B+1000） /（武A+1000）   (向上取整)
    // 否则：
    //     兵A=0
    //     兵B=兵B - 兵A * （武A+1000） / （武B+1000）  (向上取整)
    // 双方兵力都是0的时候 敌方兵力变为1 本场战斗失败
    // ]]
    ConquestVoApi.prototype.getBattleResult = function (atk1, soldier1, atk2, soldier2) {
        //atk1 武力A 兵力A atk2 武力B 兵力B
        var finaSold1 = Math.ceil(soldier1 - soldier2 * (atk2 + 1000) / (atk1 + 1000));
        var finaSold2 = Math.ceil(soldier2 - soldier1 * (atk1 + 1000) / (atk2 + 1000));
        var costNum = soldier2 * (atk2 + 1000) / (atk1 + 1000);
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
    ConquestVoApi.prototype.getBattleResult2 = function (atk1, soldier1, atk2, soldier2) {
        //atk1 武力A 兵力A atk2 武力B 兵力B
        var fsoldier = Api.levyVoApi.getFakersoldier();
        var costNum1 = soldier2 * (atk2 + 1000) / (atk1 + 1000) * soldier1; // 这里怎么取整下
        var costNum = Math.ceil(costNum1 / (soldier1 + fsoldier));
        var finaSold1 = Math.ceil(soldier1 - costNum);
        var finaSold2 = Math.ceil(soldier2 - (soldier1 + fsoldier) * (atk1 + 1000) / (atk2 + 1000));
        //  计算的时候考虑  士兵1 变成 = 士兵1 + f士兵
        //  但扣除的时候，不全部只扣真兵
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
    //计算可以打多少关
    ConquestVoApi.prototype.getAttNum = function (startIndex) {
        var num = 0;
        var soldierNum = Api.playerVoApi.getSoldier();
        for (var index = startIndex; index <= 200; index++) {
            var cfg = Config.ConquestCfg.getConquestCfgById(index + "");
            // egret.log("index" + index)
            if (!cfg) {
                break;
            }
            var battleReport = this.getBattleResult(Api.playerVoApi.getAtk(), soldierNum, cfg.soldierMid / 10, cfg.soldierMid);
            if (battleReport.success) {
                num++;
            }
            soldierNum = soldierNum - battleReport.cost;
        }
        return num;
    };
    //计算消耗多少兵力
    ConquestVoApi.prototype.getAttCostNum = function (startIndex, carNum) {
        var costNum = 0;
        var soldierNum = Api.playerVoApi.getSoldier();
        for (var index = startIndex; index < startIndex + carNum; index++) {
            var cfg = Config.ConquestCfg.getConquestCfgById(index + "");
            if (!cfg) {
                break;
            }
            var battleReport = this.getBattleResult(Api.playerVoApi.getAtk(), soldierNum, cfg.soldierMid / 10, cfg.soldierMid);
            if (battleReport.success) {
                costNum = costNum + battleReport.cost;
            }
            soldierNum = soldierNum - battleReport.cost;
        }
        return costNum;
    };
    return ConquestVoApi;
}(BaseVoApi));
__reflect(ConquestVoApi.prototype, "ConquestVoApi");
