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
        _this.extraAttr = {};
        _this.firstflag = 0;
        _this.attrSum = 0;
        _this.buff = 0;
        _this.team = {};
        _this.zidarr = [];
        return _this;
    }
    AcConquerMainLandVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        for (var key in data) {
            this[key] = data[key];
        }
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
    Object.defineProperty(AcConquerMainLandVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - this.config.extraTime * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 8);
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandVo.prototype.isLastPeriod = function () {
        var day = this.getNowDay();
        if (day == 3) {
            var st = this.st + 2 * 3600;
            var et = this.et - 86400 * this.cfg.extraTime;
            var unit = this.cfg.timeAndBuff[day - 1];
            var startTime = st + Number(day - 1) * 86400 + unit[unit.length - 1].startTime;
            var endTime = st + Number(day - 1) * 86400 + unit[unit.length - 1].endTime;
            if (unit[unit.length - 1].buff == 0 && GameData.serverTime >= startTime && GameData.serverTime <= endTime) {
                return true;
            }
        }
        return false;
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
        //大于每天第一次交战期的buff(一般是1)为激战
        if (cfg && cfg[1] && cfg[1].buff) {
            specialbuff = cfg[1].buff;
            for (var i in cfg) {
                var unit = cfg[i];
                var startTime = st + Number(day - 1) * 86400 + unit.startTime;
                var endTime = st + Number(day - 1) * 86400 + unit.endTime;
                if (unit.buff > specialbuff && GameData.serverTime >= startTime && GameData.serverTime < endTime) {
                    period = 2;
                    break;
                }
            }
        }
        return period;
    };
    //获取最终胜利区服
    AcConquerMainLandVo.prototype.getWinServer = function () {
        var zid = 0;
        var rank = this.getZrankList();
        if (rank[0] && rank[0].zid) {
            zid = Number(rank[0].zid);
        }
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
    AcConquerMainLandVo.prototype.getIdleTeamIndex = function () {
        for (var i = 0; i < 3; i++) {
            if (!this.isArmySend(i + 1)) {
                return i;
            }
        }
        return 0;
    };
    Object.defineProperty(AcConquerMainLandVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.isCanJoin() && this.isInActivity() && this.getCurPeriod() == 2) {
                if (Object.keys(this.team).length < 3) {
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
    AcConquerMainLandVo.prototype.getMyCity = function () {
        var arr = [];
        var info = this.myarmyinfo;
        for (var i = 0; i < info.length; i++) {
            var item = info[i];
            var ispush = true;
            for (var j = 0; j < arr.length; j++) {
                var jtem = arr[j];
                if (item.mainland == jtem.mainland && item.building == jtem.building) {
                    ispush = false;
                }
            }
            if (ispush) {
                arr.push({ mainland: item.mainland, building: item.building });
            }
        }
        return arr;
    };
    AcConquerMainLandVo.prototype.getZrankList = function () {
        var arr = [{ zid: 1 }];
        if (this.zrankinfo && this.zrankinfo.rankList) {
            arr = this.zrankinfo.rankList;
        }
        return arr;
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
                score: unit.scorestat ? App.StringUtil.changeIntToText(unit.scorestat.getScore) : 0,
                fightteam: unit.fightteam,
                uid: unit.uid,
                name: Api.playerVoApi.getPlayerName(),
                title: Api.playerVoApi.getTitleid(),
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
                num = this.cfg.mainLand[citylevel - 1].getScore[cityNum - 1][cityIdx - 1];
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
    AcConquerMainLandVo.prototype.setBuff = function (data) {
        this.buff = 0;
        this.buff = data;
    };
    AcConquerMainLandVo.prototype.getArmyInfo = function (armyid) {
        var obj = {};
        var citylevel = 0;
        var cityNum = 0; //
        var cityIdx = 0;
        var total = 0;
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
                        num = this.cfg.mainLand[citylevel - 1].getScore[cityNum - 1][cityIdx - 1];
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
        var code = this.code;
        if (Number(code) == 2) {
            code = 1;
        }
        if (cityNum > this.cfg.mainLand[cityLevel - 1].buildingNum) {
            cityName = LanguageManager.getlocal("acmainlandcity" + cityLevel + "_" + (cityNum % 24 == 0 ? 24 : (cityNum % 24)) + "-" + code) + LanguageManager.getlocal("acmainlandcityPos" + ((cityNum - 24) % 8 == 0 ? (8) : ((cityNum - 24) % 8)) + "-" + code);
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
            if (PlatformManager.checkIsViSp()) {
                cityName = cityName + " " + nameStr;
            }
            else {
                cityName += nameStr;
            }
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
                winName: unit.p1 == 2 ? unit.fname : unit.name,
                loseName: unit.p1 == 2 ? unit.name : unit.fname,
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
        return true;
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
    //得到区服排名第一名的服务器名称
    AcConquerMainLandVo.prototype.getFirstServerName = function () {
        var serverText = "";
        var serverrankList = this.zrankinfo.zidrankarr; //[];//]//this._rankInfo.serverrankList;
        if (serverrankList.length > 0) {
            var first = serverrankList[0];
            if (this.getQuByZid(first.zid) > 0) {
                // serverText = LanguageManager.getlocal("mergeServer",[String(first[1]),String(first[0])]);
                serverText = LanguageManager.getlocal("mergeServerOnlyqu", [String(this.getQuByZid(first.zid))]);
            }
            else {
                serverText = LanguageManager.getlocal("ranserver2", [String(first.zid)]);
            }
        }
        return serverText;
    };
    AcConquerMainLandVo.prototype.getQuByZid = function (zid) {
        var zidObj = null;
        for (var i = 0; i < this.zidarr.length; i++) {
            zidObj = this.zidarr[i];
            if (Number(zidObj.zid) == Number(zid)) {
                return zidObj.qu;
            }
        }
        return 0;
    };
    AcConquerMainLandVo.prototype.getPowerAddBuff = function (level) {
        return Math.round(this.buff * this.getBuffMultiple(level));
    };
    AcConquerMainLandVo.prototype.getBuffLevel = function () {
        var servantAttBuff = this.cfg.servantAttBuff;
        var totalAddAttr = this.attrSum;
        for (var index = 0; index < servantAttBuff.length; index++) {
            var element = servantAttBuff[index];
            var lower = element.attIncrease[0];
            var upper = element.attIncrease[1];
            if (totalAddAttr >= lower && totalAddAttr <= upper) {
                return index + 1;
            }
        }
        return 1;
    };
    AcConquerMainLandVo.prototype.getNextAddNeedNum = function () {
        //因为数组从零开始 用"当前等级"去取配置直接能取下一级的
        var nextIndex = this.getBuffLevel() > (this.cfg.maxBuffLevel - 1) ? (this.cfg.maxBuffLevel - 1) : this.getBuffLevel();
        return this.cfg.servantAttBuff[nextIndex].attIncrease[1];
    };
    AcConquerMainLandVo.prototype.getNextAddCurNum = function () {
        return this.attrSum;
    };
    AcConquerMainLandVo.prototype.getServantAcPower = function (servantId) {
        servantId = String(servantId);
        var servantInfo = Api.servantVoApi.getServantObj(servantId);
        var total = Number(servantInfo.total);
        var extra = Number((this.extraAttr[servantId] || 0) * this.getPowerAddBuff());
        var acPower = total + extra;
        return acPower;
    };
    AcConquerMainLandVo.prototype.getBuffMultiple = function (level) {
        var servantAttBuff = this.cfg.servantAttBuff;
        level = level || this.getBuffLevel();
        if (level) {
            level = level > this.cfg.maxBuffLevel ? this.cfg.maxBuffLevel : level;
            return servantAttBuff[level - 1].rankBuff;
        }
        return 1;
    };
    AcConquerMainLandVo.prototype.dispose = function () {
        this.selIdx = 0;
        this.info = null;
        this.servant = null;
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
        this.extraAttr = {};
        this.firstflag = 0;
        this.attrSum = 0;
        this.buff = 0;
        this.team = {};
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandVo;
}(AcBaseVo));
__reflect(AcConquerMainLandVo.prototype, "AcConquerMainLandVo");
