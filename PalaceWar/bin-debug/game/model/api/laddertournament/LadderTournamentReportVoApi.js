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
var LadderTournamentReportVoApi = (function (_super) {
    __extends(LadderTournamentReportVoApi, _super);
    function LadderTournamentReportVoApi() {
        var _this = _super.call(this) || this;
        _this.reportData = [];
        _this.score = 0;
        _this.isAttack = false;
        return _this;
    }
    LadderTournamentReportVoApi.prototype.formatData1 = function (data, score) {
        if (data) {
            this.reportData.length = 0;
            if (data[0][4].uid == Api.playerVoApi.getPlayerID()) {
                var reportData = [];
                for (var i = 0; i < data.length; i++) {
                    reportData[i] = [];
                    reportData[i][0] = data[i][0] == 1 ? 2 : 1;
                    reportData[i][1] = data[i][1] == 1 ? 2 : 1;
                    reportData[i][2] = data[i][2];
                    reportData[i][3] = data[i][4];
                    reportData[i][4] = data[i][3];
                }
                this.reportData = reportData;
                this.score = score[1];
                this.isAttack = false;
            }
            else {
                this.reportData = data;
                this.score = score[0];
                this.isAttack = true;
            }
        }
    };
    /**
     * 获取index
     * @param t第几场
     * @param r第几回合
     */
    LadderTournamentReportVoApi.prototype.getIndexByTypeAndRound = function (t, r) {
        var index = t == 1 ? 0 : (t - 2) * 5 + r;
        return index;
    };
    /**
     * 单轮双方总血量
     * @param type
     */
    LadderTournamentReportVoApi.prototype.getBattleBloodByRound = function (t, r) {
        var index = this.getIndexByTypeAndRound(t, r);
        var playerData = this.reportData[index];
        var info = [playerData[3].fullattr, playerData[4].fullattr];
        for (var i = 0; i < 2; i++) {
            if (info[i] == null) {
                info[i] = 0;
            }
        }
        return info;
    };
    /**
     * 先手 1 or 2
     */
    LadderTournamentReportVoApi.prototype.getFirstHandByRound = function (t, r) {
        var index = this.getIndexByTypeAndRound(t, r);
        return this.reportData[index][0];
    };
    /**
     * 参赛者信息
     */
    LadderTournamentReportVoApi.prototype.getCompetitorInfo = function (t, r) {
        var index = this.getIndexByTypeAndRound(t, r);
        var info = [];
        info.push(this.reportData[index][3]);
        info.push(this.reportData[index][4]);
        return info;
    };
    /**
     * 单回合战斗信息
     * @param pos 1 or 2
     */
    LadderTournamentReportVoApi.prototype.getReportByRoundAndIndex = function (t, r, idx) {
        var index = this.getIndexByTypeAndRound(t, r);
        var info = [];
        var isCrit = 0;
        var damage = 0;
        var damageTab = this.reportData[index][2][idx - 1];
        if (damageTab) {
            isCrit = damageTab[0];
            damage = damageTab[1];
        }
        info.push(isCrit);
        info.push(damage);
        return info;
    };
    /**
     * 单场5轮门客信息
     * @param pos 1 or 2
     */
    LadderTournamentReportVoApi.prototype.getServantInfo = function (t, pos) {
        var index = this.getIndexByTypeAndRound(t, 1);
        var info = [];
        for (var i = index; i < (index + 5); i++) {
            if (pos == 1) {
                info.push(this.reportData[i][3]);
            }
            else {
                info.push(this.reportData[i][4]);
            }
        }
        return info;
    };
    /**
     * 战斗结果  1 or 2
     */
    LadderTournamentReportVoApi.prototype.getBattleResultByRound = function (t, r) {
        var index = this.getIndexByTypeAndRound(t, r);
        if (!this.reportData[index]) {
            return 1;
        }
        return this.reportData[index][1];
    };
    /**
     *  一场战斗结果比分
     */
    LadderTournamentReportVoApi.prototype.getBattleResultByType = function (t) {
        var index = this.getIndexByTypeAndRound(t, 1);
        var score = [0, 0];
        var endIdx = index + 5;
        if (t == 1) {
            endIdx = index + 1;
        }
        for (var i = index; i < endIdx; i++) {
            if (this.reportData[i][1] == 1) {
                score[0]++;
            }
            else {
                score[1]++;
            }
        }
        return score;
    };
    /**
     *  一场战斗胜负结果
     */
    LadderTournamentReportVoApi.prototype.getBattleWinByType = function (t) {
        var index = this.getIndexByTypeAndRound(t, 1);
        var score = [0, 0];
        var endIdx = index + 5;
        if (t == 1) {
            endIdx = index + 1;
        }
        for (var i = index; i < endIdx; i++) {
            if (this.reportData[i][1] == 1) {
                score[0]++;
            }
            else {
                score[1]++;
            }
        }
        return score[0] > score[1];
    };
    /**
     *  整场战斗结果比分
     */
    LadderTournamentReportVoApi.prototype.getAllBattleResult = function () {
        var score = [0, 0];
        for (var i = 1; i <= 5; i++) {
            if (this.getBattleWinByType(i)) {
                score[0]++;
            }
            else {
                score[1]++;
            }
        }
        return score;
    };
    LadderTournamentReportVoApi.prototype.dispose = function () {
        this.reportData.length = 0;
        this.score = 0;
        this.isAttack = null;
        _super.prototype.dispose.call(this);
    };
    return LadderTournamentReportVoApi;
}(BaseVoApi));
__reflect(LadderTournamentReportVoApi.prototype, "LadderTournamentReportVoApi");
//# sourceMappingURL=LadderTournamentReportVoApi.js.map