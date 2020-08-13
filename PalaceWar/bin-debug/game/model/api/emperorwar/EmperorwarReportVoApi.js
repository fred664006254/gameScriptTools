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
var EmperorwarReportVoApi = (function (_super) {
    __extends(EmperorwarReportVoApi, _super);
    function EmperorwarReportVoApi() {
        var _this = _super.call(this) || this;
        _this.reportData = [];
        _this._playerDamageTab = [];
        return _this;
    }
    EmperorwarReportVoApi.prototype.formatData = function (data) {
        if (data) {
            if (data[0][4].uid == Api.playerVoApi.getPlayerID() || (data[0][4].uid != Api.playerVoApi.getPlayerID() && data[0][3].uid != Api.playerVoApi.getPlayerID() && this.getBattleWin2(data) == 2)) {
                this.reportData = [[], [], [], [], []];
                for (var i = 0; i < 5; i++) {
                    this.reportData[i][0] = data[i][0] == 1 ? 2 : 1;
                    this.reportData[i][1] = data[i][1] == 1 ? 2 : 1;
                    this.reportData[i][2] = data[i][2];
                    this.reportData[i][3] = data[i][4];
                    this.reportData[i][4] = data[i][3];
                }
            }
            else {
                this.reportData = data;
            }
            var playerData = this.reportData[0];
            var cheerAddAtk = Config.EmperorwarCfg.cheerAddAtk;
            var playerDamage1 = playerData[3].quality * 100;
            var playerDamage2 = playerData[4].quality * 100;
            if (playerData[3].cheer > playerData[4].cheer) {
                playerDamage1 = playerDamage1 * (1 + cheerAddAtk);
            }
            else if (playerData[4].cheer > playerData[3].cheer) {
                playerDamage2 = playerDamage2 * (1 + cheerAddAtk);
            }
            this._playerDamageTab = [playerDamage1, playerDamage2];
        }
    };
    /**
     * 先手 1 or 2
     */
    EmperorwarReportVoApi.prototype.getFirstHandByRound = function (r) {
        return this.reportData[r - 1][0];
    };
    /**
     * 战斗结果  1 or 2
     */
    EmperorwarReportVoApi.prototype.getBattleResultByRound = function (r) {
        if (!this.reportData[r - 1]) {
            return 1;
        }
        return this.reportData[r - 1][1];
    };
    /**
     * 参赛者信息
     */
    EmperorwarReportVoApi.prototype.getCompetitorInfo = function (r) {
        var info = [];
        info.push(this.reportData[r - 1][3]);
        info.push(this.reportData[r - 1][4]);
        return info;
    };
    /**
     * 单回合战斗信息
     * @param pos 1 or 2
     */
    EmperorwarReportVoApi.prototype.getReportByRoundAndIndex = function (r, idx, pos) {
        var info = [];
        var isCrit = 0;
        var damage = 0;
        if (r == 1) {
            var damageTab = this.reportData[r - 1][2][idx - 1];
            if (damageTab) {
                isCrit = damageTab[0];
                damage = damageTab[1];
            }
            else {
                isCrit = 0;
                damage = this._playerDamageTab[pos - 1];
            }
        }
        else {
            var damageTab = this.reportData[r - 1][2][idx - 1];
            if (damageTab) {
                isCrit = damageTab[0];
                damage = damageTab[1];
            }
        }
        info.push(isCrit);
        info.push(damage);
        return info;
    };
    /**
     * 单回合战斗信息
     * @param pos 1 or 2
     */
    EmperorwarReportVoApi.prototype.getBattleBloodByRound = function (r) {
        var playerData = this.reportData[r - 1];
        var info = [playerData[3].fullattr, playerData[4].fullattr];
        for (var i = 0; i < 2; i++) {
            if (info[i] == null) {
                info[i] = 0;
            }
        }
        return info;
    };
    /**
     * 战斗胜利类型
     * @param pos 1 or 2
     */
    EmperorwarReportVoApi.prototype.getBattleWin = function () {
        var winTab = [0, 0];
        for (var i = 1; i <= 5; i++) {
            winTab[this.getBattleResultByRound(i) - 1]++;
            for (var j = 0; j < 2; j++) {
                if (winTab[j] >= 3) {
                    return j + 1;
                }
            }
        }
        return 1;
    };
    EmperorwarReportVoApi.prototype.getBattleWin2 = function (data) {
        var winTab = [0, 0];
        for (var i = 1; i <= 5; i++) {
            winTab[this.getBattleResultByRound2(i, data) - 1]++;
            for (var j = 0; j < 2; j++) {
                if (winTab[j] >= 3) {
                    return j + 1;
                }
            }
        }
        return 1;
    };
    EmperorwarReportVoApi.prototype.getBattleResultByRound2 = function (r, data) {
        if (!data[r - 1]) {
            return 1;
        }
        return data[r - 1][1];
    };
    EmperorwarReportVoApi.prototype.getIsMeJoin = function () {
        return this.reportData[0][3].uid == Api.playerVoApi.getPlayerID();
    };
    EmperorwarReportVoApi.prototype.dispose = function () {
        this.reportData.length = 0;
        this._playerDamageTab.length = 0;
        _super.prototype.dispose.call(this);
    };
    return EmperorwarReportVoApi;
}(BaseVoApi));
__reflect(EmperorwarReportVoApi.prototype, "EmperorwarReportVoApi");
//# sourceMappingURL=EmperorwarReportVoApi.js.map