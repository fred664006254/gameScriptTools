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
var CrossServerWipeBossVoApi = (function (_super) {
    __extends(CrossServerWipeBossVoApi, _super);
    function CrossServerWipeBossVoApi() {
        var _this = _super.call(this) || this;
        _this._clickIdx = 0;
        _this._clickType = '';
        _this._enermy = {};
        _this._killed = {};
        _this._killLog = [];
        _this._bossInfo = {};
        _this._rankInfo = {};
        _this._bossNumInfo = {};
        return _this;
    }
    CrossServerWipeBossVoApi.prototype.dispose = function () {
        this._wipeBossVo = null;
        this._bossInfo = {};
        this._bossNumInfo = {};
        this._clickIdx = 0;
        this._clickType = '';
        this._enermy = {};
        this._killLog = [];
        this._killed = {};
        this._rankInfo = {};
        _super.prototype.dispose.call(this);
    };
    CrossServerWipeBossVoApi.prototype.getAllianceInfoNum = function () {
        var count = 0;
        for (var i in this._enermy) {
            var unit = this._enermy[i];
            count += (Object.keys(unit).length);
        }
        return count;
    };
    CrossServerWipeBossVoApi.prototype.getRankFirstPlayer = function () {
        if (this._rankInfo.rankList && this._rankInfo.rankList.length > 0) {
            return this._rankInfo.rankList[0];
        }
        return null;
    };
    CrossServerWipeBossVoApi.prototype.getMyServerName = function () {
        // if(this._rankInfo.serverrank.myrank){
        //     let obj = this._rankInfo.serverrank.myrank;
        //     if(obj.qu > 0){
        //         name = LanguageManager.getlocal("mergeServer",[String(obj.qu),String(obj.zid)]);
        //     } else {
        //         // "ranserver2":"{1}服",
        //         name = LanguageManager.getlocal("ranserver2",[String(obj.zid)]);
        //     }
        // }
        var serverText = null;
        var zid = Api.mergeServerVoApi.getTrueZid();
        var qu = Api.mergeServerVoApi.getQuByZid(zid);
        if (qu > 0) {
            serverText = LanguageManager.getlocal("mergeServer", [String(qu), String(zid)]);
        }
        else {
            serverText = LanguageManager.getlocal("ranserver2", [String(zid)]);
        }
        return serverText;
    };
    //我的名字  带区服
    CrossServerWipeBossVoApi.prototype.getMyRankName = function () {
        var name = Api.playerVoApi.getPlayerName();
        var serverText = null;
        var zid = Api.mergeServerVoApi.getTrueZid();
        var qu = Api.mergeServerVoApi.getQuByZid(zid);
        if (qu > 0) {
            serverText = LanguageManager.getlocal("mergeServer", [String(qu), String(zid)]);
        }
        else {
            serverText = LanguageManager.getlocal("ranserver2", [String(zid)]);
        }
        name = name + "(" + serverText + ")";
        return name;
    };
    //我在所有个人的排行
    CrossServerWipeBossVoApi.prototype.getMyRank = function () {
        var rank = 0;
        if (this._rankInfo.myrank) {
            rank = this._rankInfo.myrank;
        }
        return rank;
    };
    //我在我所在区服排行
    CrossServerWipeBossVoApi.prototype.getMyRankInServer = function () {
        var rank = 0;
        if (this._rankInfo.serverrank.myrank) {
            rank = this._rankInfo.serverrank.myrank.myrank;
        }
        return rank;
    };
    CrossServerWipeBossVoApi.prototype.getPkzidsStr = function () {
        var reStr = "";
        var zidObj = null;
        for (var i = 0; i < this._rankInfo.pkzids.length; i++) {
            zidObj = this._rankInfo.pkzids[i];
            if (zidObj.qu) {
                reStr += LanguageManager.getlocal("mergeServerOnlyqu", [String(zidObj.qu)]);
                // reStr += LanguageManager.getlocal("mergeServer",[String(zidObj.qu),String(zidObj.zid)]);;
            }
            else {
                reStr += LanguageManager.getlocal("ranserver2", [String(zidObj.zid)]);
            }
            if (i != this._rankInfo.pkzids.length - 1) {
                reStr += "，";
            }
        }
        return reStr;
    };
    CrossServerWipeBossVoApi.prototype.getPkzidNum = function () {
        return this._rankInfo.pkzids.length;
    };
    //得到区服排名第一名的服务器名称
    CrossServerWipeBossVoApi.prototype.getFirstServerName = function () {
        var serverText = "";
        var serverrankList = this._rankInfo.serverrankList;
        if (serverrankList.length > 0) {
            var first = serverrankList[0];
            if (first[1] > 0) {
                // serverText = LanguageManager.getlocal("mergeServer",[String(first[1]),String(first[0])]);
                serverText = LanguageManager.getlocal("mergeServerOnlyqu", [String(first[1])]);
            }
            else {
                serverText = LanguageManager.getlocal("ranserver2", [String(first[0])]);
            }
        }
        return serverText;
    };
    //区服排名
    CrossServerWipeBossVoApi.prototype.getMyServerRank = function () {
        var rank = 0;
        // let myZid = this._rankInfo.serverrank.myrank.zid;
        // let myQu = this._rankInfo.serverrank.myrank.qu;
        var myZid = Api.mergeServerVoApi.getTrueZid();
        var myQu = Api.mergeServerVoApi.getQuByZid(myZid);
        var serverrankList = this._rankInfo.serverrankList;
        var listObj = null;
        for (var i = 0; i < serverrankList.length; i++) {
            listObj = serverrankList[i];
            if (listObj[0] == myZid && listObj[1] == myQu) {
                rank = i + 1;
                break;
            }
        }
        return rank;
    };
    //区服分数
    CrossServerWipeBossVoApi.prototype.getMyServerScore = function () {
        var score = 0;
        // let myZid = this._rankInfo.serverrank.myrank.zid;
        // let myQu = this._rankInfo.serverrank.myrank.qu;
        var myZid = Api.mergeServerVoApi.getTrueZid();
        var myQu = Api.mergeServerVoApi.getQuByZid(myZid);
        var serverrankList = this._rankInfo.serverrankList;
        var listObj = null;
        for (var i = 0; i < serverrankList.length; i++) {
            listObj = serverrankList[i];
            if (listObj[0] == myZid && listObj[1] == myQu) {
                score = listObj[2];
                break;
            }
        }
        return score;
    };
    CrossServerWipeBossVoApi.prototype.getMyScore = function () {
        var value = 0;
        if (this._rankInfo.serverrank.myrank.score) {
            value = this._rankInfo.serverrank.myrank.score;
        }
        return value;
    };
    CrossServerWipeBossVoApi.prototype.getMyAlliMemPrank = function () {
        var rank = 0;
        if (this._rankInfo.serverrank.myrank) {
            rank = this._rankInfo.serverrank.myrank.myrank;
        }
        return rank;
    };
    CrossServerWipeBossVoApi.prototype.getMyAlliMemScore = function () {
        var value = 0;
        if (this._rankInfo.serverrank.myrank) {
            value = this._rankInfo.serverrank.myrank.value;
        }
        return value;
    };
    CrossServerWipeBossVoApi.prototype.setClickIdx = function (type, index) {
        this._clickIdx = index;
        this._clickType = type;
    };
    CrossServerWipeBossVoApi.prototype.getClickIdx = function () {
        return this._clickIdx;
    };
    CrossServerWipeBossVoApi.prototype.getClickType = function () {
        return this._clickType;
    };
    /**
     * 鳌拜活动阶段
     * 1鳌拜未出现 2鳌拜出现未被击杀 3鳌拜出现被击杀
    */
    CrossServerWipeBossVoApi.prototype.getWipePeriod = function () {
        var period = 1;
        if (typeof this._bossNumInfo.finalbosshp == 'undefined') {
            period = 1;
        }
        else {
            if (this._bossNumInfo.finalbosshp > 0) {
                period = 2;
            }
            else {
                period = 3;
            }
        }
        return period;
    };
    CrossServerWipeBossVoApi.prototype.getIsKillAll = function () {
        return this._bossNumInfo.bossnum[0] == 0 && this._bossNumInfo.bossnum[1] == 0;
    };
    CrossServerWipeBossVoApi.prototype.getWipeKillPlayer = function () {
        return this._bossNumInfo.finalkillname;
    };
    /**
     * 鳌拜活动 宝物、敌人剩余数量
    */
    CrossServerWipeBossVoApi.prototype.getWipeLastEnermy = function () {
        return this._bossNumInfo.bossnum ? this._bossNumInfo.bossnum : [0, 0];
    };
    /**
     * 获取排名信息
    */
    CrossServerWipeBossVoApi.prototype.getWipeInfo = function () {
        return this._rankInfo.rankList;
    };
    /**
     * 获取对应怪物的击杀信息
    */
    CrossServerWipeBossVoApi.prototype.getWipeDamageInfo = function (foeId, bosskey) {
        var obj = [];
        var unit = this._bossInfo[foeId][bosskey];
        if (unit && unit.damagelog) {
            for (var i in unit.damagelog) {
                obj.push({
                    name: unit.damagelog[i].name,
                    score: unit.damagelog[i].damage,
                    uid: unit.damagelog[i].uid,
                });
            }
            obj.sort(function (a, b) {
                return b.score - a.score;
            });
        }
        return obj;
    };
    /**
     * 获取帮会敌情信息
     * 1未击杀 2已击杀
    */
    CrossServerWipeBossVoApi.prototype.setEnermyInfo = function (info) {
        this._enermy = {};
        if (info.enemy) {
            this._enermy = info.enemy;
        }
        this._killed = {};
        if (info.killed) {
            this._killed = info.killed;
        }
    };
    CrossServerWipeBossVoApi.prototype.getWipeBossAllianceInfo = function (type) {
        var arr = [];
        if (type == 1) {
            for (var i in this._enermy) {
                var unit = this._enermy[i];
                for (var j in unit) {
                    var tmp = unit[j];
                    arr.push({
                        findname: tmp.findname,
                        curBlood: tmp.BossHp,
                        type: type,
                        bosstype: i,
                        bosskey: j,
                    });
                }
            }
        }
        else {
            for (var i in this._killed) {
                var unit = this._killed[i];
                for (var j in unit) {
                    var tmp = unit[j];
                    arr.push({
                        findname: tmp.findname,
                        killername: tmp.killername,
                        type: type,
                        bosstype: i,
                        bosskey: j,
                        rewardsidx: tmp.rewardsidx
                    });
                }
            }
            // arr.push({
            //     findname : `玩家${i}`,
            //     npcName : `怪物${i}`,
            //     bossScore : i + 100,
            //     curBlood : 80,
            //     uid : i,
            //     type : type,
            //     killName : `霍去病${i}`,
            //     killReward : "",
            //     foeId : i + 1
            // });
        }
        return arr;
    };
    Object.defineProperty(CrossServerWipeBossVoApi.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, '1');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 鳌拜活动 击杀信息
    */
    CrossServerWipeBossVoApi.prototype.setKillLog = function (info) {
        this._killLog = [];
        this._killLog = info;
        this._killLog.sort(function (a, b) {
            return b.ts - a.ts;
        });
    };
    CrossServerWipeBossVoApi.prototype.getShowFightInfo = function (index) {
        var msg = null;
        if (this._killLog.length) {
            var unit = this._killLog[index];
            if (unit) {
                msg = {
                    name: unit.name,
                    reward: unit.rewards,
                    servantId: unit.servantId,
                    bossId: unit.bosstype
                };
            }
        }
        return msg;
    };
    /**
     * 获取血量信息
     *
    */
    CrossServerWipeBossVoApi.prototype.setBossInfo = function (info, append) {
        if (append === void 0) { append = false; }
        if (!this._bossInfo[info.bosstype]) {
            this._bossInfo[info.bosstype] = {};
        }
        if (!this._bossInfo[info.bosstype][info.bosskey]) {
            this._bossInfo[info.bosstype][info.bosskey] = {};
        }
        this._bossInfo[info.bosstype][info.bosskey].bosshp = Number(info.bosshp);
        if (append) {
            for (var i in info.damagelog) {
                this._bossInfo[info.bosstype][info.bosskey].damagelog.push(info.damagelog[i]);
            }
        }
        else {
            this._bossInfo[info.bosstype][info.bosskey].damagelog = [];
            if (info.damagelog && info.damagelog.length) {
                this._bossInfo[info.bosstype][info.bosskey].damagelog = info.damagelog;
            }
        }
    };
    CrossServerWipeBossVoApi.prototype.getWipeBlood = function (type, key) {
        if (this._bossInfo[type] && this._bossInfo[type][key]) {
            return this._bossInfo[type][key].bosshp;
        }
        return undefined;
    };
    /**
    * 获取排行信息
    *
   */
    CrossServerWipeBossVoApi.prototype.setRankInfo = function (info) {
        // this._rankInfo.rankList = info.rankList;
        // this._rankInfo.myrank = info.myrank;
        // this._rankInfo.allirankList = info.allirankList;
        // this._rankInfo.allimyrank = info.allimyrank;
        // this._rankInfo.allirank = info.allirank;
        this._rankInfo = info;
    };
    CrossServerWipeBossVoApi.prototype.getRankInfo = function () {
        return this._rankInfo;
    };
    CrossServerWipeBossVoApi.prototype.getMyServerInfo = function () {
        var tmp = [];
        if (this._rankInfo.serverrank && this._rankInfo.serverrank.rankList) {
            tmp = this._rankInfo.serverrank.rankList;
        }
        return tmp;
    };
    /**
    * 获取怪物数目信息
    *
   */
    CrossServerWipeBossVoApi.prototype.setBossNumInfo = function (info) {
        this._bossNumInfo.bossnum = info.bossnum;
        if (typeof info.finalbosshp != 'undefined') {
            this._bossNumInfo.finalbosshp = info.finalbosshp;
        }
        if (typeof info.finalkillname != 'undefined') {
            this._bossNumInfo.finalkillname = info.finalkillname;
        }
    };
    CrossServerWipeBossVoApi.prototype.getBossNumInfo = function () {
        return this._bossNumInfo;
    };
    return CrossServerWipeBossVoApi;
}(BaseVoApi));
__reflect(CrossServerWipeBossVoApi.prototype, "CrossServerWipeBossVoApi");
