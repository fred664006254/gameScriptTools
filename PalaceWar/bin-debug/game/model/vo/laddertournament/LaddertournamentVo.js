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
var LaddertournamentVo = (function (_super) {
    __extends(LaddertournamentVo, _super);
    function LaddertournamentVo() {
        var _this = _super.call(this) || this;
        /**
         * 战斗记录
         */
        _this.logs = [];
        /**
         * 当前第几轮
         */
        _this.nowturn = 0;
        /**
         * 对手
         */
        _this.competitor = {};
        /**
         * 当天0点
         */
        _this.lastday = 0;
        /**
         * 活动开始时间
         */
        _this.version = 0;
        /**
         * "fightNum" 战斗次数
         */
        _this.info = {};
        /**
         * 军功
         */
        _this.shopscore = 0;
        /**
         * 排行榜分数
         */
        _this.point = 0;
        /**
         * 门客队伍
         */
        _this.team = [];
        /**
         * 刷新
         * @param num
         * @param lasttime
         */
        _this.refresh = {};
        _this.rankArr = [];
        _this.myrankArr = {};
        _this.preRankArr = [];
        _this.preMyrankArr = {};
        return _this;
    }
    LaddertournamentVo.prototype.initData = function (data) {
        if (data) {
            if (data.logs != null) {
                this.setLogs(data.logs);
            }
            if (data.nowturn != null) {
                this.nowturn = data.nowturn;
            }
            if (data.competitor != null) {
                this.competitor = data.competitor;
            }
            if (data.lastday != null) {
                this.lastday = data.lastday;
            }
            if (data.version != null) {
                this.version = data.version;
            }
            if (data.info != null) {
                this.info = data.info;
            }
            if (data.shopscore != null) {
                this.shopscore = data.shopscore;
            }
            if (data.point != null) {
                this.point = data.point;
            }
            if (data.team != null) {
                this.team = data.team;
            }
            if (data.refresh != null) {
                this.refresh = data.refresh;
            }
            if (data.rankArr != null) {
                this.rankArr = data.rankArr;
            }
            if (data.myrankArr != null) {
                this.myrankArr = data.myrankArr;
            }
        }
    };
    LaddertournamentVo.prototype.setLogs = function (data) {
        this.logs.length = 0;
        for (var k = 0; k < data.length; k++) {
            var oneData = data[k];
            this.logs.push(oneData);
            var pkData = oneData.pklogs;
            if (pkData[0][4].uid == Api.playerVoApi.getPlayerID()) {
                var reportData = [];
                for (var i = 0; i < pkData.length; i++) {
                    reportData[i] = [];
                    reportData[i][0] = pkData[i][0] == 1 ? 2 : 1;
                    reportData[i][1] = pkData[i][1] == 1 ? 2 : 1;
                    reportData[i][2] = pkData[i][2];
                    reportData[i][3] = pkData[i][4];
                    reportData[i][4] = pkData[i][3];
                }
                oneData.pklogs = reportData;
                var scoreData = [oneData.getPoint[1], oneData.getPoint[0]];
                oneData.getPoint = scoreData;
            }
        }
    };
    LaddertournamentVo.prototype.dispose = function () {
        this.logs.length = 0;
        this.nowturn = 0;
        this.competitor = {};
        this.lastday = 0;
        this.info = {};
        this.shopscore = 0;
        this.point = 0;
        this.team.length = 0;
        this.refresh = {};
        this.rankArr.length = 0;
        this.myrankArr = {};
        this.preRankArr.length = 0;
        this.preMyrankArr = {};
    };
    return LaddertournamentVo;
}(BaseVo));
__reflect(LaddertournamentVo.prototype, "LaddertournamentVo");
//# sourceMappingURL=LaddertournamentVo.js.map