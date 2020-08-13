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
var AcBattleGroundVo = (function (_super) {
    __extends(AcBattleGroundVo, _super);
    function AcBattleGroundVo() {
        var _this = _super.call(this) || this;
        _this.selIdx = -1;
        _this.lastpos = null;
        _this.info = null;
        _this.flag = false;
        //是否参与过
        _this.isjoin = 0;
        //衙门分数
        _this.point = 0;
        //当日是否被攻击过
        _this.isattacked = 0;
        //起始时间
        _this.versionst = 0;
        //淘汰轮次
        _this.weedOut = null;
        //衙门状态{lasttime=0, num=0, extranum=0,streak=0,morale=0,rankover=0,asids={},rsids={}}
        _this.cinfo = null;
        //防守信息
        _this.dinfo = null;
        //仇人信息
        _this.einfo = null;
        //当日战斗信息{fightnum=0,sids={},fids={},useids={},tmpattr={blood=0,atk=0,skill=0,isbuy="0"},handle=0}
        _this.ainfo = null;
        //是否可领奖{flag=0, msid=0}
        _this.rewardc = null;
        _this.lastday = 0;
        _this.updated_at = 0;
        //参赛资格
        _this.iscanjoin = 0;
        //地图信息
        _this.map = null;
        _this.revengeIdx = 0;
        _this.init = true;
        //是否被淘汰
        _this.myalive = 0;
        _this.myrank = null;
        _this.extraList = [];
        _this.waiting = 0;
        _this.cheer = 0;
        _this.task = null;
        return _this;
    }
    AcBattleGroundVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.cheer = data.cheer;
        this.task = data.task;
        if (data.ainfo) {
            this.setRaceInfo(data);
        }
    };
    AcBattleGroundVo.prototype.setRaceInfo = function (data) {
        this.weedOut = data.weedOut;
        this.versionst = data.versionst;
        this.point = data.point;
        this.einfo = data.einfo;
        this.lastday = data.lastday;
        this.isjoin = data.isjoin;
        if (data.rewardc) {
            this.rewardc = data.rewardc;
        }
        if (data.info != null) {
            if (this.cinfo == null) {
                this.cinfo = new AtkraceInfoVo();
            }
            this.cinfo.initData(data.info);
        }
        else if (this.cinfo != null) {
            this.cinfo.dispose();
            this.cinfo = null;
        }
        if (data.ainfo != null && Object.keys(data.ainfo).length > 0) {
            if (this.ainfo == null) {
                this.ainfo = new AtkraceAtkInfoVo();
            }
            this.ainfo.initData(data.ainfo);
        }
        else if (this.ainfo != null) {
            this.ainfo.dispose();
            this.ainfo = null;
        }
        this.dinfo = data.dinfo;
        /**
         * App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_TREASURE_LIST);
         */
    };
    AcBattleGroundVo.prototype.setMap = function (data) {
        this.map = data;
    };
    AcBattleGroundVo.prototype.getMapLenth = function () {
        var len = 0;
        if (this.map && this.map.length) {
            len = this.map.length;
        }
        return len;
    };
    AcBattleGroundVo.prototype.setAlive = function (data) {
        this.myalive = data;
    };
    AcBattleGroundVo.prototype.setRank = function (data) {
        this.myrank = data;
    };
    Object.defineProperty(AcBattleGroundVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.versionst, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundVo.prototype, "isShowRedDot", {
        /*
        *红点机制
        */
        get: function () {
            return this.getRedPot1() || this.getRedPot2();
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundVo.prototype.getRedPot1 = function () {
        var flag = false;
        if (this.getCurperiod() < 3) {
            flag = this.init && this.getAttendQuality();
        }
        return flag;
    };
    AcBattleGroundVo.prototype.getRedPot2 = function () {
        return (!this.getAttendQuality() && ((this.cheer > 0 && this.canGetTask()) || (this.getCurRound() == 1 && Api.atkraceVoApi.isShowNpc() && !(this.cheer > 0))));
    };
    /*
    *活动周期内
    */
    AcBattleGroundVo.prototype.isInActy = function () {
        var flag = false;
        if (GameData.serverTime >= this.versionst && GameData.serverTime < this.et - 86400) {
            flag = true;
        }
        return flag;
    };
    AcBattleGroundVo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    /**
     *  获取地图上帮会信息
     * */
    AcBattleGroundVo.prototype.getAllInfoById = function (id) {
        var status = 0;
        var info = this.map[id - 1];
        if (!info) {
            return null;
        }
        var total = info.mn;
        var num = Number(info.alivemn);
        var arr = [0.5, 0.2, 0];
        if (num == 0) {
            status = 4;
        }
        else {
            for (var i in arr) {
                if (num >= total * arr[i]) {
                    status = Number(i) + 1;
                    break;
                }
            }
        }
        //帮会存活人数>=50%
        var lv = 0;
        for (var i in this.cfg.help) {
            var unit = this.cfg.help[i];
            if (info.cheerexp >= unit.needHelp) {
                lv = Number(i) + 1;
            }
        }
        return {
            num: num,
            alliName: info.name,
            alliId: id,
            total: total,
            period: status,
            server: info.zid,
            mid: info.id,
            affect: info.affect,
            cheerlv: lv,
            cheerexp: info.cheerexp ? info.cheerexp : 0,
        };
    };
    AcBattleGroundVo.prototype.showCheerFire = function () {
        var flag = true;
        for (var i in this.map) {
            var unit = this.map[i];
        }
        return flag;
    };
    /**
     *  是否有资格参赛
     * */
    AcBattleGroundVo.prototype.getAttendQuality = function () {
        return this.info.iscanjoin == 1;
    };
    /**
     *  判断最后是否冠军产生
     * */
    AcBattleGroundVo.prototype.isChampWin = function () {
        var flag = false;
        var tmp = Api.chatVoApi.arr_clone(this.map);
        tmp.sort(function (a, b) {
            return Number(b.alivemn) - Number(a.alivemn);
        });
        var totalAlive = 0;
        for (var i in tmp) {
            totalAlive += Number(tmp[i].alivemn);
        }
        if (tmp[0] && totalAlive == Number(tmp[0].alivemn)) {
            flag = true;
        }
        return flag;
    };
    /**
     *  当期阶段 1预热期 2活动期 3展示公告期 4结束
     * */
    AcBattleGroundVo.prototype.getCurperiod = function () {
        var period = 0;
        if ((GameData.serverTime < this.versionst)) {
            period = 1;
        }
        else {
            if (this.isChampWin()) {
                period = 3;
            }
            else {
                var round = this.getCurRound();
                if (round == 0 || this.isActyEnd()) {
                    period = 4;
                }
                else {
                    period = 2;
                }
            }
        }
        return period;
    };
    /**
     *  获取倒计时
     * */
    AcBattleGroundVo.prototype.getCountCD = function () {
        var curPeriod = this.getCurperiod();
        var time = 0;
        switch (curPeriod) {
            case 1:
                time = this.versionst;
                break;
            case 2:
                time = this.versionst + this.weedOut[this.getCurRound() - 1].time;
                break;
            case 3:
                time = this.et;
                break;
            case 4:
                time = 0;
                break;
        }
        return time - GameData.serverTime;
    };
    /**
     *  获取当前轮数
     * */
    AcBattleGroundVo.prototype.getCurRound = function () {
        var round = 0;
        for (var i in this.weedOut) {
            var unit = this.weedOut[i];
            if (GameData.serverTime < (this.versionst + unit.time) && GameData.serverTime >= this.versionst) {
                round = Number(i) + 1;
                break;
            }
        }
        return round;
    };
    /**
     *  获取当前我的排名
     * */
    AcBattleGroundVo.prototype.getMyRank = function () {
        var rank = 0;
        if (this.myrank && this.myrank.myrank) {
            rank = this.myrank.myrank;
        }
        return rank;
    };
    /**
     *  获取是否被淘汰
     * */
    AcBattleGroundVo.prototype.getJoinIn = function () {
        return this.myalive && this.myalive == 1;
    };
    /**
     *  获取获胜帮会信息
     * */
    AcBattleGroundVo.prototype.getWinnerAlliance = function () {
        var tmp = Api.chatVoApi.arr_clone(this.map);
        tmp.sort(function (a, b) {
            return b.alivemn - a.alivemn;
        });
        return {
            name: tmp[0].name,
            mid: tmp[0].id,
        };
    };
    /**
     *  帮会是否被淘汰
     * */
    AcBattleGroundVo.prototype.isAlliOut = function (id) {
        var info = this.getAllInfoById(id);
        return info && Number(info.num) === 0;
    };
    /**
     *  帮会下某个人是否被淘汰
     * */
    AcBattleGroundVo.prototype.isAlliMemberOut = function (allid, uid) {
        return Math.random() > 0.5;
    };
    /**
     *  返回战斗记录
     * */
    AcBattleGroundVo.prototype.getBattleLog = function (data) {
        var arr = [];
        for (var i in data) {
            var unit = data[i].info;
            arr.push({
                id: data[i].id,
                alliName: unit.alliancename,
                playerName: unit.name,
                servantName: Config.ServantCfg.getServantItemById(unit.sid).name,
                enermyName: unit.uname2,
                enermyNum: unit.fightnum,
                time: unit.st,
                uid: unit.uid,
                info: unit,
                support: unit.support ? unit.support : 0
            });
        }
        arr.sort(function (a, b) {
            return b.time - a.time;
        });
        return arr;
    };
    /**
     *  返回战斗记录
     * */
    AcBattleGroundVo.prototype.setExtraList = function (data) {
        this.extraList = [];
        this.extraList = data;
        // arr.sort((a,b)=>{
        // 	return b.time - a.time
        // })
    };
    AcBattleGroundVo.prototype.getLastChargeLog = function () {
        var info = null;
        if (this.cinfo.lastuid) {
            info = {
                playerName: this.cinfo.lastname,
                uid: this.cinfo.lastuid
            };
        }
        return info;
    };
    /**
     * 战斗信息
     */
    AcBattleGroundVo.prototype.getMyFightInfo = function () {
        return this.ainfo;
    };
    /**
     * 武馆信息息
     */
    AcBattleGroundVo.prototype.getMyInfo = function () {
        return this.cinfo;
    };
    AcBattleGroundVo.prototype.getMydInfo = function () {
        return this.dinfo;
    };
    AcBattleGroundVo.prototype.getMyeInfo = function () {
        return this.einfo;
    };
    AcBattleGroundVo.prototype.getPoint = function () {
        return this.point;
    };
    AcBattleGroundVo.prototype.getRewardc = function () {
        return this.rewardc;
    };
    AcBattleGroundVo.prototype.getDecreePolicyAddAttrInfo = function () {
        return Api.promoteVoApi.getDecreePolicyAddAttrInfo("atkrace", 5);
    };
    AcBattleGroundVo.prototype.getRevengeIdx = function () {
        return this.revengeIdx;
    };
    AcBattleGroundVo.prototype.setRevengeIdx = function (num) {
        this.revengeIdx = num;
    };
    /**
     * 歼灭公告信息
     */
    AcBattleGroundVo.prototype.getKillNoticeInfo = function (code) {
        var tmp = [];
        for (var i in this.extraList) {
            var unit = this.extraList[i].info;
            tmp.push(LanguageManager.getlocal("acBattleGroundTip6-" + code, [
                unit.name, unit.uname2, unit.multikill, App.DateUtil.getFormatBySecond(unit.st, 2)
            ]));
        }
        return tmp;
    };
    AcBattleGroundVo.prototype.setWaiting = function (data) {
        this.waiting = data;
    };
    AcBattleGroundVo.prototype.isWaiting = function () {
        return this.waiting == 1;
    };
    AcBattleGroundVo.prototype.getCheerId = function () {
        var info = null;
        var cheerid = this.cheer;
        if (cheerid) {
            var alliinfo = this.getAllianceInfoById(cheerid);
            info = {
                id: cheerid,
                name: alliinfo.alliName,
                isout: alliinfo.num == 0,
            };
        }
        return info;
    };
    AcBattleGroundVo.prototype.getAllianceInfoById = function (allid) {
        for (var i in this.map) {
            var unit = this.map[i];
            if (Number(unit.id) == Number(allid)) {
                return this.getAllInfoById(Number(i) + 1);
            }
        }
    };
    AcBattleGroundVo.prototype.isGetTask = function (key) {
        var flag = false;
        if (this.task && this.task.flags && this.task.flags[key]) {
            flag = this.task.flags[key] == 1;
        }
        return flag;
    };
    AcBattleGroundVo.prototype.getTaskValue = function (questType) {
        var num = 0;
        if (this.task && this.task.v && this.task.v[questType]) {
            num = this.task.v[questType];
        }
        return num;
    };
    AcBattleGroundVo.prototype.canGetTask = function () {
        var flag = false;
        for (var i in this.cfg.audienceTask) {
            var unit = this.cfg.audienceTask[i];
            var num = this.getTaskValue(unit.questType);
            if (num >= unit.value && !this.isGetTask(i)) {
                flag = true;
            }
        }
        return flag;
    };
    AcBattleGroundVo.prototype.getCheerALlianceOut = function () {
        var flag = false;
        var cheerid = this.getCheerId();
        flag = cheerid && cheerid.isout;
        return flag;
    };
    AcBattleGroundVo.prototype.getIsCheerServantFight = function (uid, servantid) {
        var flag = false;
        if (this.cinfo && this.cinfo.usesp && this.cinfo.usesp[uid] && this.cinfo.usesp[uid][servantid]) {
            flag = this.cinfo.usesp[uid][servantid] == 1;
        }
        return flag;
    };
    AcBattleGroundVo.prototype.dispose = function () {
        this.point = 0;
        this.einfo = null;
        this.lastday = 0;
        this.isjoin = 0;
        this.cinfo.dispose();
        this.cinfo = null;
        this.info = null;
        this.ainfo.dispose();
        this.ainfo = null;
        this.dinfo = null;
        this.rewardc = null;
        this.init = true;
        this.myalive = 0;
        this.myrank = null;
        this.extraList = [];
        this.waiting = 0;
        this.task = null;
        this.flag = false;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundVo;
}(AcBaseVo));
__reflect(AcBattleGroundVo.prototype, "AcBattleGroundVo");
//# sourceMappingURL=AcBattleGroundVo.js.map