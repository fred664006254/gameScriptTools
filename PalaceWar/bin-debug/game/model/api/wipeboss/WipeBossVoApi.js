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
var WipeBossVoApi = (function (_super) {
    __extends(WipeBossVoApi, _super);
    function WipeBossVoApi() {
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
    WipeBossVoApi.prototype.dispose = function () {
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
    WipeBossVoApi.prototype.getAllianceInfoNum = function () {
        var count = 0;
        for (var i in this._enermy) {
            var unit = this._enermy[i];
            count += (Object.keys(unit).length);
        }
        return count;
    };
    WipeBossVoApi.prototype.getMyPrank = function () {
        var rank = 0;
        if (this._rankInfo.myrank.myrank) {
            rank = this._rankInfo.myrank.myrank;
        }
        return rank;
    };
    WipeBossVoApi.prototype.getMyAllPrank = function () {
        var rank = 0;
        if (this._rankInfo.allimyrank.myrank) {
            rank = this._rankInfo.allimyrank.myrank;
        }
        return rank;
    };
    WipeBossVoApi.prototype.getMyAScore = function () {
        var value = 0;
        if (this._rankInfo.allimyrank.value) {
            value = this._rankInfo.allimyrank.value;
        }
        return value;
    };
    WipeBossVoApi.prototype.getMyPScore = function () {
        var value = 0;
        if (this._rankInfo.myrank.value) {
            value = this._rankInfo.myrank.value;
        }
        return value;
    };
    WipeBossVoApi.prototype.getMyAlliMemPrank = function () {
        var rank = 0;
        if (this._rankInfo.allirank.myrank) {
            rank = this._rankInfo.allirank.myrank.myrank;
        }
        return rank;
    };
    WipeBossVoApi.prototype.getMyAlliMemScore = function () {
        var value = 0;
        if (this._rankInfo.allirank.myrank) {
            value = this._rankInfo.allirank.myrank.value;
        }
        return value;
    };
    WipeBossVoApi.prototype.setClickIdx = function (type, index) {
        this._clickIdx = index;
        this._clickType = type;
    };
    WipeBossVoApi.prototype.getClickIdx = function () {
        return this._clickIdx;
    };
    WipeBossVoApi.prototype.getClickType = function () {
        return this._clickType;
    };
    /**
     * 鳌拜活动阶段
     * 1鳌拜未出现 2鳌拜出现未被击杀 3鳌拜出现被击杀
    */
    WipeBossVoApi.prototype.getWipePeriod = function () {
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
    WipeBossVoApi.prototype.getIsKillAll = function () {
        return this._bossNumInfo.bossnum[0] == 0 && this._bossNumInfo.bossnum[1] == 0;
    };
    WipeBossVoApi.prototype.getWipeKillPlayer = function () {
        return this._bossNumInfo.finalkillname;
    };
    /**
     * 鳌拜活动 宝物、敌人剩余数量
    */
    WipeBossVoApi.prototype.getWipeLastEnermy = function () {
        return this._bossNumInfo.bossnum ? this._bossNumInfo.bossnum : [0, 0];
    };
    /**
     * 获取排名信息
    */
    WipeBossVoApi.prototype.getWipeInfo = function () {
        return this._rankInfo.rankList;
    };
    /**
     * 获取对应怪物的击杀信息
    */
    WipeBossVoApi.prototype.getWipeDamageInfo = function (foeId, bosskey) {
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
    WipeBossVoApi.prototype.setEnermyInfo = function (info) {
        this._enermy = {};
        if (info.enemy) {
            this._enermy = info.enemy;
        }
        this._killed = {};
        if (info.killed) {
            this._killed = info.killed;
        }
    };
    WipeBossVoApi.prototype.getWipeBossAllianceInfo = function (type) {
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
    Object.defineProperty(WipeBossVoApi.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_WIPEBOSS, '1');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 鳌拜活动 击杀信息
    */
    WipeBossVoApi.prototype.setKillLog = function (info) {
        this._killLog = [];
        this._killLog = info;
        this._killLog.sort(function (a, b) {
            return b.ts - a.ts;
        });
    };
    WipeBossVoApi.prototype.getShowFightInfo = function (index) {
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
    WipeBossVoApi.prototype.setBossInfo = function (info, append) {
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
    WipeBossVoApi.prototype.getWipeBlood = function (type, key) {
        if (this._bossInfo[type] && this._bossInfo[type][key]) {
            return this._bossInfo[type][key].bosshp;
        }
        return undefined;
    };
    /**
    * 获取排行信息
    *
   */
    WipeBossVoApi.prototype.setRankInfo = function (info) {
        this._rankInfo.rankList = info.rankList;
        this._rankInfo.myrank = info.myrank;
        this._rankInfo.allirankList = info.allirankList;
        this._rankInfo.allimyrank = info.allimyrank;
        this._rankInfo.allirank = info.allirank;
    };
    WipeBossVoApi.prototype.getRankInfo = function () {
        return this._rankInfo;
    };
    WipeBossVoApi.prototype.getAlliMemInfo = function () {
        var tmp = [];
        if (this._rankInfo.allirank && this._rankInfo.allirank.rankList) {
            tmp = this._rankInfo.allirank.rankList;
        }
        return tmp;
    };
    /**
    * 获取怪物数目信息
    *
   */
    WipeBossVoApi.prototype.setBossNumInfo = function (info) {
        this._bossNumInfo.bossnum = info.bossnum;
        if (typeof info.finalbosshp != 'undefined') {
            this._bossNumInfo.finalbosshp = info.finalbosshp;
        }
        if (typeof info.finalkillname != 'undefined') {
            this._bossNumInfo.finalkillname = info.finalkillname;
        }
    };
    WipeBossVoApi.prototype.getBossNumInfo = function () {
        return this._bossNumInfo;
    };
    return WipeBossVoApi;
}(BaseVoApi));
__reflect(WipeBossVoApi.prototype, "WipeBossVoApi");
//# sourceMappingURL=WipeBossVoApi.js.map