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
var LaddertournamentVoApi = (function (_super) {
    __extends(LaddertournamentVoApi, _super);
    function LaddertournamentVoApi() {
        var _this = _super.call(this) || this;
        _this.laddertournamentVo = null;
        _this.aid = "ladderTournament";
        _this.code = "1";
        _this.opponentInfo = {};
        _this.reportVoApi = null;
        _this.taskReward = null;
        return _this;
    }
    Object.defineProperty(LaddertournamentVoApi.prototype, "aidAndCode", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LaddertournamentVoApi.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LaddertournamentVoApi.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    LaddertournamentVoApi.prototype.setFightData = function (data) {
        if (!this.reportVoApi) {
            this.reportVoApi = new LadderTournamentReportVoApi();
        }
        if (data["test"] == true) {
            var fightData = { "pklogs": [
                    // 1, 谁先手 1，谁赢了， 数组是战斗记录[暴击，伤害]]， fullattr总血量 attr 最后血量，
                    [1, 1, [[0, 2000]],
                        { "name": "123", "pic": 1, level: 1, "quality": 10, "skillValue": 0.03, "skillRate": 0.0035, "plevel": 400, "attr": 180495, "fullattr": 180495, "uid": 1000860 },
                        { "name": "321", "pic": 1, level: 1, "quality": 20, "skillValue": 0.03, "skillRate": 0.0035, "plevel": 12, "attr": -1492, "fullattr": 508, "uid": 1000539 }],
                    [2, 2, [
                            [0, 39600]
                        ],
                        { "s1lv": 1, "quality": 11, "sid": "1002", "clv": 0, "fullattr": 253, "lv": 11, "attr": -39347, "equip": "10021", "s2lv": 1 },
                        { "s1lv": 10, "quality": 198, "sid": "1038", "clv": 6, "fullattr": 10003178059, "lv": 400, "attr": 10003178059, "s2lv": 5 }],
                    [1, 2, [[0, 200], [0, 2420], [0, 180], [0, 2200], [1, 253], [0, 2420], [0, 220], [0, 2200], [0, 220], [0, 1980], [0, 220], [0, 1980], [0, 220], [0, 2420]],
                        { "s1lv": 12, "quality": 1, "sid": "1003", "clv": 0, "fullattr": 14530, "lv": 14, "attr": -1090, "equip": "10031", "s2lv": 5 },
                        { "s1lv": 1, "quality": 11, "sid": "1035", "clv": 6, "fullattr": 306547, "lv": 400, "attr": 305034, "s2lv": 1 }],
                    [2, 2,
                        [[0, 6360], [0, 200], [0, 6440], [0, 180], [0, 440], [0, 180], [0, 440], [0, 220], [0, 400], [0, 200], [0, 360], [0, 180], [0, 360], [0, 220], [0, 400], [0, 200], [0, 440], [0, 180], [0, 360], [0, 180], [0, 440], [0, 220], [0, 400], [0, 200], [0, 440], [0, 180], [0, 400], [0, 220], [0, 440], [0, 180], [0, 360], [0, 180], [0, 360], [0, 200], [0, 360], [0, 220], [0, 440], [0, 220], [0, 400], [0, 180], [0, 440], [0, 180], [0, 440], [0, 200], [0, 400], [0, 220], [0, 360], [0, 200], [0, 400], [0, 220], [0, 400], [0, 220], [0, 360], [0, 180], [0, 400], [0, 220], [0, 400], [0, 220], [0, 400], [0, 180], [0, 360], [0, 200], [0, 360], [0, 200], [0, 360], [0, 180], [0, 440], [0, 200], [0, 400], [0, 180], [0, 360], [0, 220], [0, 360], [0, 180], [0, 400], [0, 200], [0, 360], [0, 180], [0, 360], [0, 200], [0, 400], [0, 180], [0, 440]],
                        { "s1lv": 1, "quality": 1, "sid": "1004", "clv": 7, "fullattr": 16210, "lv": 402, "attr": -430, "s2lv": 1 },
                        { "s1lv": 1, "quality": 2, "sid": "1001", "clv": 1, "fullattr": 29863, "lv": 150, "attr": 21763, "s2lv": 1 }],
                    [1, 1, [[0, 1100], [0, 540], [0, 900], [0, 600], [0, 1100]], { "s1lv": 1, "quality": 5, "sid": "1005", "clv": 1, "fullattr": 5099, "lv": 100, "attr": 3959, "s2lv": 1 }, { "s1lv": 10, "quality": 3, "sid": "1005", "clv": 0, "fullattr": 2652, "lv": 93, "attr": -448, "s2lv": 18 }],
                    [2, 2, [[0, 1100]], { "s1lv": 1, "quality": 3, "sid": "1050", "clv": 0, "fullattr": 630, "lv": 1, "attr": -470, "s2lv": 1 }, { "s1lv": 1, "quality": 5, "sid": "1028", "clv": 0, "fullattr": 50, "lv": 1, "attr": 50, "s2lv": 1 }],
                    [2, 1, [[0, 1000], [0, 6160]], { "s1lv": 1, "quality": 28, "sid": "1041", "clv": 0, "fullattr": 1131, "lv": 17, "attr": 131, "s2lv": 1 }, { "s1lv": 1, "quality": 5, "sid": "1023", "clv": 0, "fullattr": 50, "lv": 1, "attr": -6110, "s2lv": 1 }],
                    [1, 1, [[0, 6800]], { "s1lv": 1, "quality": 34, "sid": "1039", "clv": 0, "fullattr": 641, "lv": 1, "attr": 641, "s2lv": 1 }, { "s1lv": 1, "quality": 3, "sid": "1017", "clv": 0, "fullattr": 69, "lv": 11, "attr": -6731, "s2lv": 1 }],
                    [2, 2, [[0, 880]], { "s1lv": 1, "quality": 21, "sid": "1038", "clv": 0, "fullattr": 210, "lv": 1, "attr": -670, "s2lv": 1 }, { "s1lv": 1, "quality": 4, "sid": "1012", "clv": 0, "fullattr": 40, "lv": 1, "attr": 40, "s2lv": 1 }],
                    [1, 1, [[0, 2520]], { "s1lv": 1, "quality": 14, "sid": "1037", "clv": 0, "fullattr": 140, "lv": 1, "attr": 140, "s2lv": 1 }, { "s1lv": 1, "quality": 3, "sid": "1033", "clv": 0, "fullattr": 30, "lv": 1, "attr": -2490, "s2lv": 1 }],
                    [2, 1, [[0, 600], [0, 2160], [0, 600], [0, 2160], [0, 600], [0, 2400]], { "s1lv": 2, "quality": 12, "sid": "1001", "clv": 3, "fullattr": 617997, "lv": 203, "attr": 616197, "equip": "10011", "s2lv": 2 }, { "s1lv": 1, "quality": 3, "sid": "1002", "clv": 0, "fullattr": 4432, "lv": 89, "attr": -2288, "s2lv": 1 }],
                    [2, 2, [[0, 1100]], { "s1lv": 1, "quality": 9, "sid": "1016", "clv": 0, "fullattr": 93, "lv": 2, "attr": -1007, "s2lv": 1 }, { "s1lv": 1, "quality": 5, "sid": "1027", "clv": 0, "fullattr": 50, "lv": 1, "attr": 50, "s2lv": 1 }],
                    [1, 1, [[0, 1440]], { "s1lv": 1, "quality": 8, "sid": "1012", "clv": 0, "fullattr": 80, "lv": 1, "attr": 80, "s2lv": 1 }, { "s1lv": 1, "quality": 5, "sid": "1024", "clv": 0, "fullattr": 50, "lv": 1, "attr": -1390, "s2lv": 1 }],
                    [2, 2, [[0, 440]], { "s1lv": 1, "quality": 6, "sid": "1034", "clv": 0, "fullattr": 63, "lv": 1, "attr": -377, "s2lv": 1 }, { "s1lv": 1, "quality": 2, "sid": "1007", "clv": 0, "fullattr": 20, "lv": 1, "attr": 20, "s2lv": 1 }],
                    [1, 1, [[0, 1100]], { "s1lv": 1, "quality": 5, "sid": "1019", "clv": 0, "fullattr": 50, "lv": 1, "attr": 50, "s2lv": 1 }, { "s1lv": 1, "quality": 2, "sid": "1009", "clv": 0, "fullattr": 20, "lv": 1, "attr": -1080, "s2lv": 1 }],
                    [2, 2, [[0, 1080]], { "s1lv": 1, "quality": 4, "sid": "2011", "clv": 0, "fullattr": 40, "lv": 1, "attr": -1040, "s2lv": 1 }, { "s1lv": 1, "quality": 6, "sid": "1034", "clv": 0, "fullattr": 60, "lv": 1, "attr": 60, "s2lv": 1 }],
                    [2, 2, [[0, 180]], { "s1lv": 1, "quality": 4, "sid": "2010", "clv": 0, "fullattr": 40, "lv": 1, "attr": -140, "s2lv": 1 }, { "s1lv": 1, "quality": 1, "sid": "1008", "clv": 0, "fullattr": 10, "lv": 1, "attr": 10, "s2lv": 1 }],
                    [1, 1, [[0, 900]], { "s1lv": 1, "quality": 5, "sid": "1018", "clv": 0, "fullattr": 50, "lv": 1, "attr": 50, "s2lv": 1 }, { "s1lv": 1, "quality": 1, "sid": "1016", "clv": 0, "fullattr": 10, "lv": 1, "attr": -890, "s2lv": 1 }],
                    [2, 2, [[0, 440]], { "s1lv": 1, "quality": 8, "sid": "1013", "clv": 0, "fullattr": 80, "lv": 1, "attr": -360, "s2lv": 1 }, { "s1lv": 1, "quality": 2, "sid": "1011", "clv": 0, "fullattr": 20, "lv": 1, "attr": 20, "s2lv": 1 }],
                    [1, 1, [[0, 1980]], { "s1lv": 1, "quality": 11, "sid": "1060", "clv": 0, "fullattr": 110, "lv": 1, "attr": 110, "s2lv": 1 }, { "s1lv": 1, "quality": 3, "sid": "1015", "clv": 0, "fullattr": 30, "lv": 1, "attr": -1950, "s2lv": 1 }],
                    [2, 2, [[0, 540]], { "s1lv": 1, "quality": 9, "sid": "1033", "clv": 0, "fullattr": 90, "lv": 1, "attr": -450, "s2lv": 1 }, { "s1lv": 1, "quality": 3, "sid": "1014", "clv": 0, "fullattr": 30, "lv": 1, "attr": 30, "s2lv": 1 }]
                ],
                "winuid": 1000539,
                "getPoint": [
                    -14,
                    14
                ]
            };
            this.reportVoApi.formatData1(fightData["pklogs"], fightData["getPoint"][0]);
            ViewController.getInstance().openView(ViewConst.COMMON.LADDERFORMTIONVIEW);
        }
        else {
            this.reportVoApi.formatData1(data["pklogs"], data["getPoint"]);
        }
    };
    /**
     * 获得当前总势力
     */
    LaddertournamentVoApi.prototype.getTotalPower = function () {
        var power = 0;
        for (var i = 0; i < this.laddertournamentVo.team.length; i++) {
            var obj = this.laddertournamentVo.team[i];
            if (obj && obj["sids"]) {
                var sids = obj["sids"];
                for (var k in sids) {
                    var servantvo = Api.servantVoApi.getServantObj(sids[k]);
                    power += servantvo.getTotalAttrValye(i + 1);
                }
            }
        }
        return power;
    };
    /**
     * 队伍是否满编
     */
    LaddertournamentVoApi.prototype.isTeamFull = function () {
        var l = 0;
        for (var i = 0; i < this.laddertournamentVo.team.length; i++) {
            if (this.laddertournamentVo.team[i] && this.laddertournamentVo.team[i]["sids"]) {
                if (this.laddertournamentVo.team[i]["sids"].length >= 5) {
                    l++;
                }
            }
        }
        return l >= 4;
    };
    //t: 0~3
    LaddertournamentVoApi.prototype.isTeamFullByType = function (i) {
        if (this.laddertournamentVo.team && this.laddertournamentVo.team[i] && this.laddertournamentVo.team[i]["sids"]) {
            if (this.laddertournamentVo.team[i]["sids"].length >= 5) {
                return true;
            }
        }
        return false;
    };
    /**
     * 本日出战次数
     */
    LaddertournamentVoApi.prototype.getFightTimes = function () {
        if (this.laddertournamentVo.info && this.laddertournamentVo.info.fightNum) {
            return this.laddertournamentVo.info.fightNum;
        }
        return 0;
    };
    LaddertournamentVoApi.prototype.checkLogsRedDot = function () {
        if (this.laddertournamentVo.info && this.laddertournamentVo.info.logsRedPoint) {
            return true;
        }
        return false;
    };
    LaddertournamentVoApi.prototype.getRankArray = function () {
        return this.laddertournamentVo.rankArr;
    };
    LaddertournamentVoApi.prototype.setRankArrya = function (a) {
        if (a) {
            this.laddertournamentVo.rankArr = a;
        }
    };
    LaddertournamentVoApi.prototype.getMyRankArray = function () {
        return this.laddertournamentVo.myrankArr;
    };
    LaddertournamentVoApi.prototype.setMyRankArrya = function (a) {
        if (a) {
            this.laddertournamentVo.myrankArr = a;
        }
    };
    LaddertournamentVoApi.prototype.getPreRankArray = function () {
        return this.laddertournamentVo.preRankArr;
    };
    LaddertournamentVoApi.prototype.setPreRankArrya = function (a) {
        if (a) {
            this.laddertournamentVo.preRankArr = a;
        }
    };
    LaddertournamentVoApi.prototype.getPreMyRankArray = function () {
        return this.laddertournamentVo.preMyrankArr;
    };
    LaddertournamentVoApi.prototype.setPreMyRankArrya = function (a) {
        if (a) {
            this.laddertournamentVo.preMyrankArr = a;
        }
    };
    LaddertournamentVoApi.prototype.getMyPoint = function () {
        return this.laddertournamentVo.point;
    };
    LaddertournamentVoApi.prototype.getRefreshInfo = function () {
        return this.laddertournamentVo.refresh;
    };
    LaddertournamentVoApi.prototype.getCurTurnLessTime = function () {
        var lesstime = this.acVo.et - GameData.serverTime;
        if (lesstime < 0) {
            lesstime = 0;
        }
        return lesstime;
    };
    /**
     * 出战门客
     */
    LaddertournamentVoApi.prototype.getSidsByTeam = function (type) {
        var obj = this.laddertournamentVo.team[type - 1];
        if (obj && obj["sids"]) {
            var sids = obj["sids"];
            var aArray = [];
            for (var k in sids) {
                aArray.push(sids[k]);
            }
            return aArray;
        }
        return [];
    };
    /**
    * buff次数
    */
    LaddertournamentVoApi.prototype.getBuffTimes = function (type) {
        var obj = this.laddertournamentVo.team[type - 1];
        if (obj && obj["buff"] && obj["buff"]["1"]) {
            return obj["buff"]["1"];
        }
        return 0;
    };
    /**
     * 门客出战类型 0 未出战 1～4 四个队伍
     */
    LaddertournamentVoApi.prototype.getServantBattleType = function (sid) {
        var type = 0;
        for (var i = 1; i <= 4; i++) {
            var sids = this.getSidsByTeam(i);
            if (GameData.isInArray(sid, sids)) {
                type = i;
                break;
            }
        }
        return type;
    };
    LaddertournamentVoApi.prototype.getOpponentInfo = function () {
        if (this.laddertournamentVo.competitor && Object.keys(this.laddertournamentVo.competitor).length > 0) {
            var array = [];
            for (var k in this.laddertournamentVo.competitor) {
                array.push(this.laddertournamentVo.competitor[k]);
            }
            return array;
        }
        return null;
    };
    LaddertournamentVoApi.prototype.getLogs = function () {
        return this.laddertournamentVo.logs;
    };
    LaddertournamentVoApi.prototype.setLogs = function (array) {
        this.laddertournamentVo.setLogs(array);
    };
    LaddertournamentVoApi.prototype.getShopscore = function () {
        return this.laddertournamentVo.shopscore;
    };
    LaddertournamentVoApi.prototype.getCanGetScore = function (fpoint, mpoint) {
        var E = 1 / (1 + Math.pow(10, (fpoint - mpoint) / this.cfg.score1));
        var getPoint = Math.floor(this.cfg.score2 * (1 - E));
        return getPoint;
    };
    LaddertournamentVoApi.prototype.getNowturn = function () {
        return this.laddertournamentVo.nowturn;
    };
    /**
     * 本轮剩余时间
     */
    LaddertournamentVoApi.prototype.getNowturnLessTime = function () {
        var lasdday = this.cfg.turnLast;
        var endtime = this.laddertournamentVo.version + lasdday * 86400 * this.getNowturn();
        var lesstime = endtime - GameData.serverTime - 7200;
        if (lesstime <= 0) {
            lesstime = 0;
        }
        return lesstime;
    };
    LaddertournamentVoApi.prototype.getNowturnLessTime2 = function () {
        var lasdday = this.cfg.turnLast;
        var endtime = this.laddertournamentVo.version + lasdday * 86400 * this.getNowturn();
        var lesstime = endtime - GameData.serverTime;
        // if (lesstime<=0)
        // {
        //     lesstime = 0;
        // }
        return lesstime;
    };
    LaddertournamentVoApi.prototype.getNowturnCountDown = function () {
        var lesstime = this.getNowturnLessTime();
        if (lesstime > 0) {
            return LanguageManager.getlocal("acLadder_TimeCountDown1", [App.DateUtil.getFormatBySecond((lesstime), 17)]);
        }
        else {
            return LanguageManager.getlocal("acLadder_TimeCountDownEnd1");
        }
    };
    /**
     * 本日剩余时间
     */
    LaddertournamentVoApi.prototype.getTodayLessTime = function () {
        var endtime = this.laddertournamentVo.lastday + 86400;
        var lesstime = endtime - GameData.serverTime;
        if (lesstime <= 0) {
            lesstime = 0;
        }
        return lesstime;
    };
    /**
     * 上一轮时间时间
     */
    LaddertournamentVoApi.prototype.getLastTurnTime = function () {
        var time = [0, 0];
        var lastTurn = this.getNowturn() - 1;
        var lasdday = this.cfg.turnLast;
        time[0] = this.laddertournamentVo.version + lasdday * 86400 * (lastTurn - 1);
        time[1] = this.laddertournamentVo.version + lasdday * 86400 * lastTurn - 1;
        return time;
    };
    LaddertournamentVoApi.prototype.isTodayFinalDay = function () {
        var b = false;
        var endtime = this.laddertournamentVo.lastday + 86400;
        var lasdday = this.cfg.turnLast;
        var finaltime = this.laddertournamentVo.version + lasdday * 86400 * this.cfg.allTurnNum;
        if (endtime >= finaltime) {
            b = true;
        }
        return b;
    };
    /**
     * 获取参加区服
    */
    LaddertournamentVoApi.prototype.getCrossServer = function () {
        var serveStr = '';
        var map = [];
        var isFk = PlatformManager.checkIsFkylcSp();
        var zidarr = this.laddertournamentVo.info.zidgroup;
        serveStr = App.StringUtil.formatMultiServerServerAndZid([], zidarr);
        // for(let i in zidarr){
        //     let zidname = isFk ?  Api.mergeServerVoApi.getSeverName(Number(zidarr[i])) : Api.mergeServerVoApi.getAfterMergeSeverName(null,true, Number(zidarr[i]));
        // 	if(map.indexOf(zidname) == -1){
        // 		map.push(zidname);
        // 		serveStr += (zidname + ('、'))
        // 	}
        // }
        // serveStr = serveStr.substring(0,serveStr.length - 1);
        return serveStr;
    };
    /**
     * 休战期
    */
    LaddertournamentVoApi.prototype.checkIsTruce = function () {
        var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        var timetab = [22, 24];
        var dayst = today0 + timetab[0] * 3600;
        var dayet = today0 + timetab[1] * 3600;
        if (GameData.serverTime >= dayst && GameData.serverTime < dayet) {
            return true;
        }
        return false;
    };
    LaddertournamentVoApi.prototype.dispose = function () {
        this.reportVoApi = null;
        this.opponentInfo = null;
        this.taskReward = null;
        _super.prototype.dispose.call(this);
    };
    return LaddertournamentVoApi;
}(BaseVoApi));
__reflect(LaddertournamentVoApi.prototype, "LaddertournamentVoApi");
//# sourceMappingURL=LaddertournamentVoApi.js.map