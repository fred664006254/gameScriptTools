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
var AcConquerMainLandVo = (function (_super) {
    __extends(AcConquerMainLandVo, _super);
    function AcConquerMainLandVo() {
        var _this = _super.call(this) || this;
        _this.selIdx = 0;
        _this.info = null;
        _this.servant = null;
        _this.task = null;
        _this.specialNum = 0;
        _this.specialGiftNum = 0;
        _this.mapInfo = null;
        _this.myarmyinfo = [];
        _this.maxCity = 0;
        _this.teamspecialNum = {};
        _this.dontnotice = [];
        _this.prankinfo = null;
        _this.zrankinfo = null;
        _this.warlog = null;
        _this.myscore = 0;
        _this.lastteam = {};
        _this.zidarr = [];
        return _this;
    }
    AcConquerMainLandVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcConquerMainLandVo.prototype, "checkIsJJL", {
        get: function () {
            return this.code == 6;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandVo.prototype.getThisCn = function (cnName) {
        var thisCode = this.code;
        if (LanguageManager.checkHasKey(cnName + "-" + thisCode)) {
            return cnName + "-" + thisCode;
        }
        else {
            return cnName + "-" + this.getUiCode();
        }
    };
    AcConquerMainLandVo.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerMainLandVo.prototype.getCountDown = function () {
        var num = 0;
        var period = this.getCurPeriod();
        if (this.isInActivity()) {
            num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    //判断当前活动阶段 1尚未开启 2活动开启  3特殊阶段休战 4当前活动已经结束
    AcConquerMainLandVo.prototype.getCurPeriod = function () {
        var period = 1;
        var st = this.st + 2 * 3600;
        var et = this.et - 86400 * this.cfg.extraTime;
        if (GameData.serverTime < st) {
            period = 1;
        }
        else if (GameData.serverTime >= st && GameData.serverTime < et) {
            period = 2;
            var day = this.getNowDay();
            for (var i in this.cfg.timeAndBuff[day - 1]) {
                var unit = this.cfg.timeAndBuff[day - 1][i];
                var startTime = st + Number(day - 1) * 86400 + unit.startTime;
                var endTime = st + Number(day - 1) * 86400 + unit.endTime;
                if (unit.buff == 0 && GameData.serverTime >= startTime && GameData.serverTime <= endTime) {
                    period = 3;
                    break;
                }
            }
        }
        else if (GameData.serverTime >= et) {
            period = 4;
        }
        return period;
    };
    //交战阶段 1正常 2激战
    AcConquerMainLandVo.prototype.getFightPeriod = function () {
        var day = this.getNowDay();
        var st = this.st + 2 * 3600;
        var et = this.et - 86400 * this.cfg.extraTime;
        var period = 1;
        var cfg = this.cfg.timeAndBuff[day - 1];
        var specialbuff = 1;
        if (cfg && cfg[cfg.length - 2] && cfg[cfg.length - 2].buff) {
            specialbuff = cfg[cfg.length - 2].buff;
            for (var i in cfg) {
                var unit = cfg[i];
                var startTime = st + Number(day - 1) * 86400 + unit.startTime;
                var endTime = st + Number(day - 1) * 86400 + unit.endTime;
                if (unit.buff >= specialbuff && GameData.serverTime >= startTime && GameData.serverTime < endTime) {
                    period = 2;
                    break;
                }
            }
        }
        return period;
    };
    //获取最终胜利区服
    AcConquerMainLandVo.prototype.getWinServer = function () {
        var zid = 1;
        var rank = this.getZrankList();
        zid = Number(rank[0] ? rank[0].zid : "1");
        return zid;
    };
    AcConquerMainLandVo.prototype.getNowDay = function () {
        var day = 0;
        var count = 0;
        count = Math.ceil((GameData.serverTime - this.st - 2 * 3600) / 86400);
        var st = this.st + 2 * 3600;
        var et = this.et - 86400 * this.cfg.extraTime;
        if (GameData.serverTime < st) {
            day = 0;
        }
        else if (GameData.serverTime >= et) {
            day = 4;
        }
        else {
            day = count % 3 == 0 ? 3 : (count % 3);
        }
        return Math.max(0, day);
    };
    AcConquerMainLandVo.prototype.getPeriodTime = function () {
        var period = this.getCurPeriod();
        var time = 0;
        var today0 = this.st + 2 * 3600;
        var day = this.getNowDay();
        switch (period) {
            case 1:
                time = this.st + 2 * 3600;
                break;
            case 3:
                for (var i in this.cfg.timeAndBuff[day - 1]) {
                    var unit = this.cfg.timeAndBuff[day - 1][i];
                    var startTime = today0 + Number(day - 1) * 86400 + unit.startTime;
                    var endTime = today0 + Number(day - 1) * 86400 + unit.endTime;
                    if (unit.buff == 0 && GameData.serverTime >= startTime && GameData.serverTime <= endTime) {
                        if (Number(i) == 0) {
                            time = endTime;
                        }
                        else {
                            time = endTime + 32400;
                        }
                        break;
                    }
                }
                break;
        }
        return Math.max(0, time - GameData.serverTime);
    };
    //参赛资格
    AcConquerMainLandVo.prototype.isCanJoin = function () {
        var flag = false;
        if (this.info && this.info.iscanjoin) {
            flag = true;
        }
        return flag;
    };
    Object.defineProperty(AcConquerMainLandVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //可派出军队
    AcConquerMainLandVo.prototype.getpublicRedhot1 = function () {
        if (Api.redpointVoApi.checkHaveRedPointByAid(this.aid, "sendArmy") && this.isCanJoin() && this.isInActivity() && this.getCurPeriod() == 2) {
            return true;
        }
        return false;
    };
    AcConquerMainLandVo.prototype.getLastTeamInfo = function (armyid) {
        var team = [];
        if (this.lastteam && this.lastteam[armyid]) {
            for (var i in this.lastteam[armyid]) {
                var unit = this.lastteam[armyid][i];
                var sid = unit;
                var attend = this.getServantAttend(sid);
                if (attend == 0) {
                    team.push({
                        army: armyid,
                        data: Api.servantVoApi.getServantObj(sid),
                        isAttend: false
                    });
                }
            }
            team.sort(function (a, b) {
                return b.data.total - a.data.total;
            });
        }
        return team;
    };
    //有募兵道具
    AcConquerMainLandVo.prototype.getpublicRedhot2 = function () {
        if (this.checkIsJJL) {
            if (this.getCurPeriod() == 3) {
                return false;
            }
        }
        var flag = false;
        var itemnum = this.getItemNum();
        if (itemnum > 0 && this.isInActivity()) {
            flag = true;
        }
        return flag;
    };
    //任务奖励
    AcConquerMainLandVo.prototype.getpublicRedhot3 = function () {
        //任务
        var cfg = this.cfg;
        if (!cfg || !this.isInActivity() || !this.isCanJoin()) {
            return false;
        }
        var task = this.getTask();
        for (var i in task) {
            var unit = task[i];
            var taskNum = this.getTaskValue(unit.questType);
            var taskBoo = this.getTaskLq(unit.sortId);
            if (taskNum >= unit.value && taskBoo == false) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcConquerMainLandVo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i < 4; ++i) {
                if (i == 2) {
                    continue;
                }
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st + 2 * 3600, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    //个人排名
    AcConquerMainLandVo.prototype.getMyPrank = function () {
        var rank = 0;
        if (this.prankinfo && this.prankinfo.myrank && this.prankinfo.myrank.myrank) {
            rank = this.prankinfo.myrank.myrank;
        }
        return rank;
    };
    //个人分数
    AcConquerMainLandVo.prototype.getMyPScore = function () {
        var score = 0;
        if (this.prankinfo && this.prankinfo.myrank && this.prankinfo.myrank.value) {
            score = this.prankinfo.myrank.value;
        }
        return score;
    };
    //个人分数
    AcConquerMainLandVo.prototype.getMyScore = function () {
        var score = this.myscore;
        return score;
    };
    AcConquerMainLandVo.prototype.getPrankList = function () {
        var arr = [];
        if (this.prankinfo && this.prankinfo.rankList) {
            arr = this.prankinfo.rankList;
        }
        return arr;
    };
    //区服排名
    AcConquerMainLandVo.prototype.getMyServerRank = function () {
        var rank = 0;
        var list = this.getZrankList();
        for (var i in list) {
            if (Api.mergeServerVoApi.judgeIsSameServer(Api.mergeServerVoApi.getTrueZid(), Number(list[i].zid))) {
                rank = Number(i) + 1;
                break;
            }
        }
        return rank;
    };
    //区服分数
    AcConquerMainLandVo.prototype.getMyServerScore = function () {
        var score = 0;
        var list = this.getZrankList();
        for (var i in list) {
            if (Api.mergeServerVoApi.judgeIsSameServer(Api.mergeServerVoApi.getTrueZid(), Number(list[i].zid))) {
                score = list[i].zscore;
                break;
            }
        }
        return score;
    };
    AcConquerMainLandVo.prototype.getZrankList = function () {
        var arr = [];
        if (this.zrankinfo && this.zrankinfo.rankList) {
            arr = this.zrankinfo.rankList;
        }
        return arr;
    };
    //获取任务
    AcConquerMainLandVo.prototype.getTask = function () {
        var arr = [];
        var task = this.cfg.task;
        for (var i in task) {
            var unit = task[i];
            if (this.getTaskLq(unit.sortId)) {
                arr.push(unit);
            }
            else {
                if (unit.show == 0) {
                    arr.push(unit);
                }
                else {
                    var needCfg = task[unit.show - 1];
                    if (this.getTaskValue(unit.questType) >= needCfg.value) {
                        arr.push(unit);
                    }
                }
            }
        }
        return arr;
    };
    //任务完成进度
    AcConquerMainLandVo.prototype.getTaskValue = function (taskType) {
        var num = 0;
        if (this.task && this.task[taskType] && this.isCanJoin()) {
            num = this.task[taskType];
        }
        return num;
    };
    //任务完成进度
    AcConquerMainLandVo.prototype.getTaskLq = function (taskId) {
        var flag = false;
        if (this.task && this.task.flags && this.task.flags[taskId] && this.isCanJoin()) {
            flag = this.task.flags[taskId] == 1;
        }
        return flag;
    };
    AcConquerMainLandVo.prototype.getMyRecord = function (data) {
        //战斗开启 打斗记录 战斗结束
        var nowday = this.getNowDay();
        var tmp = this.cfg.timeAndBuff[nowday - 1];
        var st = this.st + 2 * 3600;
        var obj = {};
        for (var i in tmp) {
            var unit = tmp[i];
            var startTime = st + Number(nowday - 1) * 86400 + unit.startTime;
            var endTime = st + Number(nowday - 1) * 86400 + unit.endTime;
            if (GameData.serverTime >= startTime) {
                if (unit.buff == 0 && Number(i) == 0 && GameData.serverTime >= endTime) {
                    //开战提示
                    obj.start = {
                        time: endTime,
                        type: 1,
                        army: nowday,
                    };
                }
                if (this.getFightPeriod() == 2 && GameData.serverTime < endTime) {
                    //激战期内倍率变动
                    obj.fight = {
                        time: startTime,
                        type: 2,
                        buff: unit.buff,
                    };
                }
                //结束期
                if (unit.buff == 0 && Number(i) > 0 && GameData.serverTime < endTime) {
                    //今日结束
                    obj.end = {
                        time: startTime,
                        type: 3,
                        army: nowday,
                    };
                }
            }
        }
        var record = [];
        var max = data.length;
        if (obj.start) {
            record.push(obj.start);
        }
        for (var i = 0; i < max; ++i) {
            var unit = data[i];
            var citylevel = unit.mainland;
            var cityNum = unit.building;
            var cityIdx = unit.segment;
            record.push({
                time: unit.st,
                type: unit.conquerStat,
                cityId: citylevel + "_" + cityNum,
                army: unit.teamnum,
                lasttime: unit.scorestat ? (unit.st - unit.scorestat.st) : 0,
                score: unit.scorestat ? App.StringUtil.changeIntToText(unit.scorestat.getScore, 4) : 0,
                usenum: unit.scorestat ? App.StringUtil.changeIntToText(unit.scorestat.usenum, 4) : 0,
                fightteam: unit.fightteam,
                uid: unit.uid,
                name: Api.playerVoApi.getPlayerName(),
                title: Api.playerVoApi.getTitleid(1),
                fuid: unit.fuid,
                fname: unit.fname,
                ftitle: unit.ftitle,
                citylevel: citylevel,
                cityNum: cityNum,
                cityIdx: cityIdx
            });
        }
        record.sort(function (a, b) {
            return a.time - b.time;
        });
        if (obj.end) {
            record.push(obj.end);
        }
        if (obj.fight) {
            record.push(obj.fight);
        }
        record.reverse();
        return record;
    };
    //获取每分钟收益
    AcConquerMainLandVo.prototype.getMyScorePerMin = function () {
        var per = 0;
        for (var i in this.myarmyinfo) {
            var unit = this.myarmyinfo[i];
            var citylevel = unit.mainland;
            var cityNum = unit.building;
            var cityIdx = unit.segment;
            var num = 0;
            if (citylevel == 7) {
                num = this.cfg.mainLand[citylevel - 1].getScore[0][0];
            }
            else {
                if (this.cfg.mainLand[citylevel - 1].getScore[cityNum - 1]) {
                    num = this.cfg.mainLand[citylevel - 1].getScore[cityNum - 1][cityIdx - 1];
                }
                else {
                    num = this.cfg.mainLand[citylevel - 1].getScore[this.cfg.mainLand[citylevel - 1].getScore.length - 1][cityIdx - 1];
                }
            }
            per += num;
        }
        return per * this.getTimeBuff();
    };
    AcConquerMainLandVo.prototype.getTimeBuff = function () {
        var buff = 1;
        var day = this.getNowDay();
        var tmp = this.cfg.timeAndBuff[day - 1];
        var st = this.st + 2 * 3600;
        for (var i in tmp) {
            var unit = tmp[i];
            var startTime = st + Number(day - 1) * 86400 + unit.startTime;
            var endTime = st + Number(day - 1) * 86400 + unit.endTime;
            if (GameData.serverTime >= startTime && GameData.serverTime < endTime) {
                buff = unit.buff;
                break;
            }
        }
        return buff;
    };
    //军团信息
    AcConquerMainLandVo.prototype.isArmySend = function (id) {
        var flag = false;
        for (var i in this.myarmyinfo) {
            var unit = this.myarmyinfo[i];
            if (Number(unit.teamnum) == id) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    //获取出战军团的门客信息
    AcConquerMainLandVo.prototype.getArmyServant = function (id) {
        var obj = {};
        if (this.isArmySend(id)) {
            for (var i in this.myarmyinfo) {
                var unit = this.myarmyinfo[i];
                if (Number(unit.teamnum) == id) {
                    obj = unit.team;
                    break;
                }
            }
        }
        var arr = [];
        for (var i in obj) {
            var sid = obj[i].sid;
            var attend = this.getServantAttend(obj[i].servantId);
            arr.push({
                army: id,
                data: Api.servantVoApi.getServantObj(sid),
                isAttend: false
            });
        }
        arr.sort(function (a, b) {
            return b.data.total - a.data.total;
        });
        return arr;
    };
    AcConquerMainLandVo.prototype.setZidInfo = function (data) {
        this.zidarr = [];
        this.zidarr = data;
    };
    AcConquerMainLandVo.prototype.getArmyInfo = function (armyid) {
        var obj = {};
        var citylevel = 0;
        var cityNum = 0; //
        var cityIdx = 0;
        var total = 0;
        var addPower = this.getAddpower(armyid);
        if (this.isArmySend(armyid)) {
            for (var i in this.myarmyinfo) {
                var unit = this.myarmyinfo[i];
                if (Number(unit.teamnum) == armyid) {
                    citylevel = unit.mainland;
                    cityNum = unit.building;
                    cityIdx = unit.segment;
                    for (var i_1 in unit.team) {
                        total += (unit.team[i_1].dps);
                    }
                    var num = 0;
                    if (citylevel == 7) {
                        num = this.cfg.mainLand[citylevel - 1].getScore[0][0];
                    }
                    else {
                        if (this.cfg.mainLand[citylevel - 1].getScore[cityNum - 1]) {
                            num = this.cfg.mainLand[citylevel - 1].getScore[cityNum - 1][cityIdx - 1];
                        }
                        else {
                            num = this.cfg.mainLand[citylevel - 1].getScore[this.cfg.mainLand[citylevel - 1].getScore.length - 1][cityIdx - 1];
                        }
                    }
                    obj = {
                        cityId: citylevel + "_" + cityNum,
                        scoreper: num * this.getTimeBuff(),
                        totalnum: total,
                        citylevel: unit.mainland,
                        cityNum: unit.building,
                        cityIdx: unit.segment,
                    };
                    break;
                }
            }
        }
        obj.addPower = addPower;
        return obj;
    };
    AcConquerMainLandVo.prototype.clearArmyInfo = function (armyid) {
        if (this.isArmySend(armyid)) {
            for (var i in this.myarmyinfo) {
                var unit = this.myarmyinfo[i];
                if (Number(unit.teamnum) == armyid) {
                    this.myarmyinfo.splice(Number(i), 1);
                    break;
                }
            }
        }
    };
    AcConquerMainLandVo.prototype.getCityName = function (cityId) {
        var cityArr = cityId.split("_");
        var cityLevel = Number(cityArr[0]);
        var cityNum = Number(cityArr[1]);
        var cityIdx = Number(cityArr[2]);
        var cityName = '';
        var code = "1";
        if (cityNum > this.cfg.mainLand[cityLevel - 1].buildingNum) {
            var num = this.cfg.mainLand[cityLevel - 1].buildingNum;
            //城市
            var partname1 = LanguageManager.getlocal("acmainlandcity" + cityLevel + "_" + (cityNum % num == 0 ? num : (cityNum % num)) + "-" + code);
            //方位
            var partname2 = "";
            if (cityNum > (num * 9)) {
                var tmp = (cityNum - (num * 9)) % 8 == 0 ? 8 : ((cityNum - (num * 9)) % 8);
                partname2 = LanguageManager.getlocal("acmainlandcityPos" + tmp + "-" + code) + (Math.ceil(cityNum / (num * 9)) - 1);
            }
            else {
                partname2 = LanguageManager.getlocal("acmainlandcityPos" + (Math.ceil(cityNum / num) - 1) + "-" + code); //(cityNum - 24) % 8 == 0 ? (8) : ((cityNum - 24) % 8)
            }
            cityName = partname1 + partname2;
        }
        else {
            cityName = LanguageManager.getlocal("acmainlandcity" + cityLevel + "_" + cityNum + "-" + code);
        }
        if (cityIdx) {
            var nameStr = '';
            if (cityLevel > 3) {
                nameStr = LanguageManager.getlocal("acConquerMainLandWarBuild4-" + code, [cityIdx.toString()]);
            }
            else {
                nameStr = LanguageManager.getlocal("acConquerMainLandWarBuild" + cityLevel + "_" + cityNum + "_" + cityIdx + "-" + code, [cityIdx.toString()]);
            }
            cityName += nameStr;
        }
        return cityName;
    };
    //获取对应城市被占领的据点
    AcConquerMainLandVo.prototype.getCityObserveNum = function (cityLevel, cityNum) {
        var num = 0;
        for (var i in this.mapInfo) {
            var unit = this.mapInfo[i];
            if (Number(unit.mainland) == cityLevel && Number(unit.building) == cityNum) {
                num = unit.num;
                break;
            }
        }
        return num;
    };
    //战斗记录
    AcConquerMainLandVo.prototype.getWarLog = function () {
        var log = this.warlog;
        var arr = [];
        /**
         * "segment":1,
                "p2":2,
                "uid":2000258,
                "building":1,
                "fuid":2000160,
                "p1":2,
                "name":"密藏今",
                "p3":2
                mainland:1
         */
        for (var i in log) {
            var unit = log[i];
            var citylevel = unit.mainland;
            var winId = unit.p1 == 2 ? unit.fuid : unit.uid;
            var loseId = unit.p1 == 2 ? unit.uid : unit.fuid;
            var obj = {
                callback: unit.p1 == 3,
                title: {
                    type: unit.p1,
                },
                report: {
                    type: unit.p1 == 2 ? 5 : unit.p2,
                    rid: unit.p2,
                },
                win: {
                    type: (unit.p3 >= 3 ? (unit.p1 == 1 ? 2 : 1) : 0),
                    num: unit.p3,
                },
                time: unit.st,
                winId: winId,
                loseId: loseId,
                winzid: Api.mergeServerVoApi.getTrueZid(winId),
                losezid: Api.mergeServerVoApi.getTrueZid(loseId),
                winName: unit.p1 == 2 ? "" + unit.fname : "" + unit.name,
                loseName: unit.p1 == 2 ? "" + unit.name : "" + unit.fname,
                winTitle: unit.p1 == 2 ? unit.ftitle : unit.title,
                loseTitle: unit.p1 == 2 ? unit.title : unit.ftitle,
                zid: Api.mergeServerVoApi.getTrueZid(winId),
                fzid: Api.mergeServerVoApi.getTrueZid(loseId),
                citylevel: citylevel,
                cityNum: unit.building,
                cityIdx: unit.segment,
                fightteam: unit.fightteam,
                winteam: unit.p1 == 2 ? unit.fightteam.fteam : unit.fightteam.mteam,
                loseteam: unit.p1 == 2 ? unit.fightteam.mteam : unit.fightteam.fteam,
            };
            arr.push(obj);
        }
        return arr;
    };
    AcConquerMainLandVo.prototype.setWarLog = function (data) {
        this.warlog = data;
    };
    //最近一条记录
    AcConquerMainLandVo.prototype.getLastChargeLog = function () {
        var log = this.getWarLog();
        var obj = null;
        if (log && log[0]) {
            obj = log[0];
        }
        return obj;
    };
    //填充数目的最低级城市数目 一定是4的倍数
    AcConquerMainLandVo.prototype.getCityMax = function () {
        var num = this.maxCity;
        return num;
    };
    //募兵总加成
    AcConquerMainLandVo.prototype.getAddpower = function (armyid) {
        var num = 0;
        if (this.teamspecialNum && this.teamspecialNum[armyid]) {
            num = this.teamspecialNum[armyid];
        }
        var total = num * this.cfg.addPower;
        return total;
    };
    //募兵令数
    AcConquerMainLandVo.prototype.getItemNum = function () {
        if (this.checkIsJJL) {
            return this.specialGiftNum;
        }
        else {
            return this.specialNum;
        }
    };
    //门客出战费用 0就是免费
    AcConquerMainLandVo.prototype.getServantCost = function (sid) {
        var todayhave = 0;
        if (this.servant && this.servant[sid]) {
            todayhave = this.servant[sid];
        }
        var num = this.cfg.teamInfo.warTime - todayhave;
        var cost = 0;
        if (num <= 0) {
            cost = this.cfg.teamInfo.buyTime[Math.min(-num, this.cfg.teamInfo.buyTime.length - 1)];
        }
        return {
            cost: cost,
            freeNum: num
        };
    };
    //门客出战军团
    AcConquerMainLandVo.prototype.getServantAttend = function (sid) {
        var attend = 0; //App.MathUtil.getRandom(0,4);
        for (var i in this.myarmyinfo) {
            var unit = this.myarmyinfo[i];
            for (var k in unit.team) {
                if (Number(unit.team[k].sid) == Number(sid)) {
                    attend = unit.teamnum;
                    return attend;
                }
            }
        }
        return attend;
    };
    AcConquerMainLandVo.prototype.isTip = function (type) {
        var flag = true;
        if (this.dontnotice[type - 1] && this.dontnotice[type - 1] == 1) {
            flag = false;
        }
        return flag;
    };
    //大地图信息 占领人数
    AcConquerMainLandVo.prototype.setMapInfo = function (data) {
        this.mapInfo = data;
    };
    //补充城市数目
    AcConquerMainLandVo.prototype.setMaxCity = function (num) {
        this.maxCity = num;
    };
    //补充城市数目
    AcConquerMainLandVo.prototype.setMyScore = function (num) {
        if (num) {
            this.myscore = Number(num);
            App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_MAINLAND_ZG_FRESH);
        }
    };
    //我的军团信息
    AcConquerMainLandVo.prototype.setMyTeamInfo = function (data) {
        /*--mid
        --uid
        --team
        --teamnum
        --specialNum
        --mainland
        --building
        --segment
        --st
        --npc
        --group
        --version*/
        this.myarmyinfo = data;
    };
    AcConquerMainLandVo.prototype.setPrankinfo = function (data) {
        this.prankinfo = {
            rankList: data.rankList,
            myrank: data.myrank
        };
    };
    AcConquerMainLandVo.prototype.setZrankinfo = function (data) {
        this.zrankinfo = data;
        this.zrankinfo = {
            rankList: data.zidrankList,
            myrank: data.myrank
        };
    };
    AcConquerMainLandVo.prototype.isInJudge = function () {
        var flag = false;
        if (this.getCurPeriod() > 1) {
            var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
            var st = today0 + 22 * 3600;
            var et = today0 + 22 * 3600 + 10 * 60;
            if (GameData.serverTime >= st && GameData.serverTime < et) {
                flag = true;
            }
        }
        return flag;
    };
    AcConquerMainLandVo.prototype.dispose = function () {
        this.selIdx = 0;
        this.info = null;
        this.servant = null;
        this.task = null;
        this.specialNum = 0;
        this.specialGiftNum = 0;
        this.mapInfo = null;
        this.myarmyinfo = [];
        this.maxCity = 0;
        this.teamspecialNum = null;
        this.dontnotice = [];
        this.prankinfo = null;
        this.zrankinfo = null;
        this.warlog = null;
        this.zidarr = [];
        this.lastteam = null;
        ;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandVo;
}(AcBaseVo));
__reflect(AcConquerMainLandVo.prototype, "AcConquerMainLandVo");
//# sourceMappingURL=AcConquerMainLandVo.js.map