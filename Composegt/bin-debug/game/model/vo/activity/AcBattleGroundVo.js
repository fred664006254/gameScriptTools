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
        //battleground  中的info
        _this.winfo = null;
        _this.info = null;
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
        //当前轮次要被淘汰的分数   小于这个 分数就有可能被淘汰
        _this.curOutScore = 0;
        _this.rankData = null;
        _this.pkzids = null;
        _this.onelist = null;
        return _this;
    }
    AcBattleGroundVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        if (data.ainfo) {
            this.setRaceInfo(data);
        }
    };
    AcBattleGroundVo.prototype.setRankData = function (data) {
        this.rankData = data;
        //更新当前轮次淘汰分数
        var curRound = this.getCurRound();
        if (curRound == 0) {
            return;
        }
        var btmLine = this.cfg.weedOut[curRound - 1].btmLine;
        if (btmLine >= this.rankData.rankArr.length) {
            this.curOutScore = 0;
        }
        else {
            var lineData = this.rankData.rankArr[btmLine - 1];
            this.curOutScore = lineData.value;
        }
    };
    AcBattleGroundVo.prototype.getRankFirstAlli = function () {
        if (this.rankData) {
            return this.rankData.allirankArr[0];
        }
    };
    AcBattleGroundVo.prototype.getRankFirstPlayer = function () {
        if (this.rankData) {
            return this.rankData.rankArr[0];
        }
    };
    //排行榜得到个人排行
    AcBattleGroundVo.prototype.getRankPlayerRank = function () {
        if (this.rankData && this.rankData.myrankArr && this.rankData.myrankArr.myrank != null && this.rankData.myrankArr.myrank != undefined) {
            return this.rankData.myrankArr.myrank;
        }
        return 0;
    };
    //排行榜得到个人分数
    AcBattleGroundVo.prototype.getRankPlayerScore = function () {
        if (this.rankData && this.rankData.myrankArr && this.rankData.myrankArr.value != null && this.rankData.myrankArr.value != undefined) {
            return this.rankData.myrankArr.value;
        }
        return null;
    };
    //获得我的帮会数据
    AcBattleGroundVo.prototype.getMyAlliData = function () {
        if (this.rankData) {
            for (var i = 0; i < this.rankData.allirankArr.length; i++) {
                if (this.rankData.allirankArr[i].id == String(Api.playerVoApi.getPlayerAllianceId())) {
                    return this.rankData.allirankArr[i];
                }
            }
        }
    };
    //排行榜得到帮会排行
    AcBattleGroundVo.prototype.getRankAllRank = function () {
        if (this.rankData && this.rankData.myrankArr && this.rankData.myrankArr.myalliRank) {
            return this.rankData.myrankArr.myalliRank;
        }
        return 0;
    };
    //得到帮派存活人数
    AcBattleGroundVo.prototype.getRankAllPlayerNum = function () {
        if (this.rankData) {
            var myAllId = String(Api.playerVoApi.getPlayerAllianceId());
            var allArr = this.rankData.allirankArr;
            for (var i = 0; i < allArr.length; i++) {
                if (allArr[i]["id"] == myAllId) {
                    return Number(allArr[i]["alivemn"]);
                }
            }
        }
        return 0;
    };
    AcBattleGroundVo.prototype.getMyRankList = function () {
        if (this.rankData) {
            return this.rankData.rankArr;
        }
        return [];
    };
    AcBattleGroundVo.prototype.getAlliRankList = function () {
        if (this.rankData) {
            return this.rankData.allirankArr;
        }
        return [];
    };
    AcBattleGroundVo.prototype.setRaceInfo = function (data) {
        this.weedOut = data.weedout;
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
        this.winfo = data.info;
        /**
         * App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_TREASURE_LIST);
         */
    };
    AcBattleGroundVo.prototype.getCountDownTime = function () {
        var et = this.et - 86400;
        return et - GameData.serverTime;
    };
    AcBattleGroundVo.prototype.setMap = function (data) {
        this.map = data;
    };
    AcBattleGroundVo.prototype.getMap = function () {
        return this.map.length;
    };
    AcBattleGroundVo.prototype.setAlive = function (data) {
        this.myalive = data;
    };
    AcBattleGroundVo.prototype.setRank = function (data) {
        this.myrank = data;
    };
    AcBattleGroundVo.prototype.setPkzids = function (data) {
        this.pkzids = data;
    };
    AcBattleGroundVo.prototype.getPkzidsStr = function () {
        var reStr = "";
        var zidObj = null;
        for (var i = 0; i < this.pkzids.length; i++) {
            zidObj = this.pkzids[i];
            if (zidObj.qu) {
                reStr += LanguageManager.getlocal("mergeServerOnlyqu", [String(zidObj.qu)]);
            }
            else {
                reStr += LanguageManager.getlocal("ranserver2", [String(zidObj.zid)]);
            }
            if (i != this.pkzids.length - 1) {
                reStr += "，";
            }
        }
        return reStr;
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
            return this.init && this.getAttendQuality();
        },
        enumerable: true,
        configurable: true
    });
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
    /*
    *检查是否在统计中
    */
    AcBattleGroundVo.prototype.checkIsCal = function () {
        var weedOutList = this.cfg.weedOut;
        var weedOutO = null;
        for (var i = 0; i < weedOutList.length; i++) {
            weedOutO = weedOutList[i];
            if (GameData.serverTime > weedOutO.time + this.versionst && GameData.serverTime < weedOutO.time + this.versionst + 300) {
                return true;
            }
        }
        return false;
    };
    //距离统计结束还有多少秒
    AcBattleGroundVo.prototype.newRoundSecond = function () {
        var weedOutList = this.cfg.weedOut;
        var weedOutO = null;
        for (var i = 0; i < weedOutList.length; i++) {
            weedOutO = weedOutList[i];
            if (GameData.serverTime > weedOutO.time + this.versionst && GameData.serverTime < weedOutO.time + this.versionst + 300) {
                return weedOutO.time + this.versionst + 300 - GameData.serverTime;
            }
        }
        return 0;
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
        return {
            num: num,
            alliName: info.name,
            alliId: id,
            total: total,
            period: status,
            level: info.level,
            server: info.zid,
            mid: info.id,
        };
    };
    /**
     *  是否有资格参赛
     * */
    AcBattleGroundVo.prototype.getAttendQuality = function () {
        // return this.info.iscanjoin == 1;
        return this.info.iscanjoin >= 1;
        // return true;
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
        for (var i = 0; i < this.cfg.weedOut.length; i++) {
            // for(let i in this.weedOut){
            var unit = this.weedOut[i];
            if (GameData.serverTime < (this.versionst + unit.time)) {
                if (GameData.serverTime >= this.versionst) {
                    round = Number(i) + 1;
                    break;
                }
            }
        }
        return round;
    };
    /**
     *  获取当前我的分数
     * */
    AcBattleGroundVo.prototype.getMyScore = function () {
        var value = 0;
        if (this.myrank) {
            value = this.myrank.value;
        }
        return value;
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
                info: unit
            });
        }
        arr.sort(function (a, b) {
            return b.time - a.time;
        });
        return arr;
    };
    AcBattleGroundVo.prototype.getOneList = function () {
        if (this.onelist) {
            var unit = this.onelist.info;
            var obj = {
                id: this.onelist.id,
                alliName: unit.alliancename,
                playerName: unit.name,
                servantName: Config.ServantCfg.getServantItemById(unit.sid).name,
                enermyName: unit.uname2,
                enermyNum: unit.fightnum,
                time: unit.st,
                uid: unit.uid,
                info: unit
            };
            return obj;
        }
        else {
            return null;
        }
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
        if (this.winfo.lastuid) {
            info = {
                playerName: this.winfo.lastname,
                uid: this.winfo.lastuid
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
    // public getDecreePolicyAddAttrInfo()
    // {
    // 	return Api.promoteVoApi.getDecreePolicyAddAttrInfo("atkrace",5);
    // }
    AcBattleGroundVo.prototype.getRevengeIdx = function () {
        return this.revengeIdx;
    };
    AcBattleGroundVo.prototype.setRevengeIdx = function (num) {
        this.revengeIdx = num;
    };
    /**
     * 歼灭公告信息
     */
    AcBattleGroundVo.prototype.getKillNoticeInfo = function () {
        var tmp = [];
        for (var i in this.extraList) {
            var unit = this.extraList[i].info;
            // tmp.push(LanguageManager.getlocal(`acBattleGroundTip6-${this.code}`,[
            tmp.push(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip6"), [
                unit.name, unit.uname2, unit.multikill, App.DateUtil.getFormatBySecond(unit.st, 2)
            ]));
        }
        return tmp;
    };
    AcBattleGroundVo.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcBattleGroundVo.prototype.setWaiting = function (data) {
        this.waiting = data;
    };
    AcBattleGroundVo.prototype.getWaiting = function () {
        return this.waiting;
    };
    AcBattleGroundVo.prototype.isWaiting = function () {
        return this.waiting == 1;
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
        this.rankData = null;
        this.curOutScore = 0;
        this.pkzids = null;
        this.onelist = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundVo;
}(AcBaseVo));
__reflect(AcBattleGroundVo.prototype, "AcBattleGroundVo");
