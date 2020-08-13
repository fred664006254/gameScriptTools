/**
 * 议事阁系统api
 * author qianjun
 */
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
var CouncilVoApi = (function (_super) {
    __extends(CouncilVoApi, _super);
    function CouncilVoApi() {
        var _this = _super.call(this) || this;
        _this._conucilVo = null;
        _this._eventInfo = {};
        _this._getrewards = {};
        _this._info = {};
        _this._joinevent = {};
        _this._restservant = {};
        _this._rewards = {};
        _this._seatinfo = {};
        _this._rankinfo = {};
        _this._kingdata = null;
        _this._buzheninfo = null;
        return _this;
    }
    CouncilVoApi.prototype.formatData = function (data) {
        this._getrewards = data.getrewards;
        this._info = data.info;
        this._restservant = data.restservant;
        this._joinevent = data.joinevent;
        this._rewards = data.rewards;
        // if(this._conucilVo == null)
        // {
        // 	let className:string = this.getClassName();
        // 	let voClassName:string = "CouncilVo";
        // 	let voClass:any = egret.getDefinitionByName(voClassName);
        // 	this._conucilVo = new voClass();
        // 	// this.chatblockVo.initData(data);
        // 	this[App.StringUtil.firstCharToLower(voClassName)] = this._conucilVo;
        // }
        // this._conucilVo.initData(data);
    };
    CouncilVoApi.prototype.getDescId = function (eventId) {
        return this._info.randevent ? this._info.randevent[eventId] : 1;
    };
    CouncilVoApi.prototype.checkNpcMessage = function () {
        for (var i = 0; i < 5; ++i) {
            if (this.canGetReward(i)) {
                return true;
            }
            // if(this.canJoinEvent(i)){
            // 	return true;
            // }
        }
        return false;
    };
    CouncilVoApi.prototype.canJoinEvent = function (i) {
        var itemnum = Api.itemVoApi.getItemNumInfoVoById(Config.CouncilCfg.needItem);
        if (itemnum > 0) {
            var servantnum = Object.keys(this._info.randevent).length;
            if (Api.servantVoApi.getServantCount() > servantnum) {
                var maxnum = Config.CouncilCfg.maxPlayer;
                var event_1 = this._eventInfo[String(i)];
                var joinevent = this._joinevent[String(i)];
                if (!joinevent) {
                    var eventNum = 0;
                    var endtime = GameData.serverTime + 1;
                    if (event_1 && event_1.num) {
                        eventNum = event_1.num;
                        endtime = event_1.et;
                    }
                    if (endtime > GameData.serverTime && eventNum < maxnum) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    CouncilVoApi.prototype.formatEventData = function (data) {
        for (var i in data) {
            this._eventInfo[i] = data[i];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_COUNCIL_FRESHMODEL);
    };
    CouncilVoApi.prototype.setKingData = function (data) {
        this._kingdata = data;
    };
    CouncilVoApi.prototype.getKingData = function () {
        return this._kingdata;
    };
    Object.defineProperty(CouncilVoApi.prototype, "councilVo", {
        get: function () {
            return this._conucilVo;
        },
        enumerable: true,
        configurable: true
    });
    CouncilVoApi.prototype.isShowNpc = function () {
        return Api.playerVoApi.getPlayerLevel() >= Config.CouncilCfg.needLv;
    };
    CouncilVoApi.prototype.getLockedString = function () {
        var unlock = Config.CouncilCfg.needLv;
        return LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(unlock)]);
    };
    /*
    *1结算间隔  2参加时间 3结算间隔 4领赏时间
    */
    CouncilVoApi.prototype.getCurpeirod = function () {
        var period = 1;
        if (this._eventInfo[1]) {
            var period_arr = [this._eventInfo[1].st + 5 * 60, this._eventInfo[1].st + 10 * 3600, this._eventInfo[1].st + 10 * 3600 + 5 * 60, this._eventInfo[1].st + 24 * 3600];
            for (var i in period_arr) {
                var time = period_arr[i];
                if (GameData.serverTime < time) {
                    period = Number(i) + 1;
                    break;
                }
            }
        }
        return period;
    };
    CouncilVoApi.prototype.canGetReward = function (eventId) {
        var flag = false;
        var isLq = false;
        for (var i in this._getrewards) {
            var unit = this._getrewards[i];
            for (var j in unit) {
                if (GameData.serverTime >= (Number(j) + 10 * 3600 + 5 * 60)) {
                    isLq = true;
                    break;
                }
            }
        }
        if (isLq && this._getrewards[eventId] && Object.keys(this._getrewards[eventId]).length) {
            flag = true;
        }
        return flag;
    };
    CouncilVoApi.prototype.getCountTime = function () {
        var period_arr = [this._eventInfo[1].st + 5 * 60, this._eventInfo[1].st + 10 * 3600, this._eventInfo[1].st + 10 * 3600 + 5 * 60, this._eventInfo[1].st + 24 * 3600];
        var period = this.getCurpeirod();
        return period_arr[period - 1] - GameData.serverTime;
    };
    CouncilVoApi.prototype.getTodayEvent = function () {
        var arr = [];
        for (var i in this._eventInfo) {
            var unit = this._eventInfo[i];
            arr.push({
                eventId: i,
                eventNeedType: i,
                joinNum: unit.num,
                canjoin: false
            });
        }
        return arr;
    };
    CouncilVoApi.prototype.getMaxJoinNum = function () {
        return Config.CouncilCfg.maxPlayer;
    };
    CouncilVoApi.prototype.isVisitEvent = function (eventId) {
        var flag = false;
        if ((this._joinevent[eventId] && this._joinevent[eventId] == 1) || (this._getrewards[eventId] && this._getrewards[eventId][this._eventInfo[eventId].st])) {
            flag = true;
        }
        return flag;
    };
    CouncilVoApi.prototype.getJoinEventSeatId = function (eventId) {
        var idx = null;
        if (this._seatinfo[eventId]) {
            for (var i in this._seatinfo[eventId]) {
                var unit = this._seatinfo[eventId][i];
                if (unit && unit.uid == Api.playerVoApi.getPlayerID()) {
                    idx = Number(i);
                    break;
                }
            }
        }
        return idx;
    };
    CouncilVoApi.prototype.setEventSeatInfo = function (eventId, data) {
        delete this._seatinfo[eventId];
        this._seatinfo[eventId] = data;
    };
    CouncilVoApi.prototype.setEventSeatInfoBack = function (eventId, data) {
        this._seatinfo[eventId] = {};
        this._seatinfo[eventId] = data;
    };
    CouncilVoApi.prototype.setRankInfo = function (eventId, data) {
        delete this._rankinfo[eventId];
        this._rankinfo[eventId] = data;
    };
    CouncilVoApi.prototype.getSeatId = function (eventId) {
        for (var i = 1; i <= Config.CouncilCfg.maxPlayer; ++i) {
            if (typeof this._seatinfo[eventId][i] == 'undefined') {
                return i;
            }
        }
        return Config.CouncilCfg.maxPlayer;
    };
    CouncilVoApi.prototype.getEventPlayerInfo = function (eventId, type) {
        var arr = [];
        if (!type) {
            type = this.getCurpeirod();
        }
        if (type == 4) {
            for (var i in this._rankinfo[eventId].rankArr) {
                var unit = this._rankinfo[eventId].rankArr[i];
                var unitinfo = null;
                for (var i_1 in this._rankinfo[eventId].seatlist) {
                    var temp = this._rankinfo[eventId].seatlist[i_1];
                    if (temp.uid == unit.uid) {
                        unitinfo = temp;
                        break;
                    }
                }
                arr.push({
                    name: unit.name,
                    uid: unit.uid,
                    eventId: eventId,
                    eventNeedType: eventId,
                    pic: unitinfo ? unitinfo.pic : 1,
                    level: unitinfo ? unitinfo.level : 1,
                    totalNum: unit.value,
                    sinfo: unitinfo.sinfo
                });
            }
        }
        else {
            for (var i = 1; i <= this.getMaxJoinNum(); ++i) {
                var unit = this._seatinfo[eventId][i];
                if (unit && type != 1) {
                    arr.push({
                        index: Number(i),
                        name: unit.name,
                        uid: unit.uid,
                        eventId: eventId,
                        eventNeedType: eventId,
                        joinNum: this._eventInfo[eventId].num,
                    });
                }
                else {
                    arr.push({
                        index: Number(i),
                        eventId: eventId,
                        empty: true
                    });
                }
            }
        }
        return arr;
    };
    CouncilVoApi.prototype.getEventInfoById = function (eventId) {
        return {
            eventId: eventId,
            eventNeedType: eventId,
            joinNum: this._eventInfo[eventId].num,
            st: this._eventInfo[eventId].st
        };
    };
    // JOIN_THIS,JOIN_OTHER,NOT_JOIN
    CouncilVoApi.prototype.servantIsJoined = function (eventId, servantId) {
        for (var i in this._buzheninfo) {
            if (this._buzheninfo[i].data.servantId == servantId) {
                return 'JOIN_THIS';
            }
        }
        if (this._restservant[servantId] && this._restservant[servantId] == 1) {
            return 'JOIN_OTHER';
        }
        return 'NOT_JOIN';
    };
    CouncilVoApi.prototype.setBuzhenInfo = function (info) {
        this._buzheninfo = null;
        this._buzheninfo = info;
    };
    CouncilVoApi.prototype.getRewardByRank = function (rank) {
        var ranklist = Config.CouncilCfg.rankList;
        for (var i in ranklist) {
            var unit = ranklist[i];
            if (unit.minRank <= rank && unit.maxRank >= rank) {
                return "5_1_" + unit.exp + "|14_1_" + unit.bookExp;
            }
        }
        return null;
    };
    CouncilVoApi.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.CouncilCfg;
        if (!cfg) {
            return [];
        }
        var list = cfg;
        for (var i in list) {
            if (i == key) {
                for (var key2 in list[i]) {
                    if (list[i][key2]) {
                        var currObj = list[i][key2];
                        if (currObj) {
                            list[i][key2].key = Number(key2);
                            if (list[i][key2].key) {
                                arr.push(list[i][key2]);
                            }
                        }
                    }
                }
            }
        }
        return arr;
    };
    CouncilVoApi.prototype.checkIsGetReward = function () {
        for (var i in this._getrewards) {
            var unit = this._getrewards[i];
            for (var j in unit) {
                if (j < this._eventInfo[i].st) {
                    NetManager.request(NetRequestConst.REQUST_COUNCIL_GETREWARD, {});
                    return;
                }
            }
        }
    };
    CouncilVoApi.prototype.dispose = function () {
        this._conucilVo = null;
        _super.prototype.dispose.call(this);
    };
    return CouncilVoApi;
}(BaseVoApi));
__reflect(CouncilVoApi.prototype, "CouncilVoApi");
//# sourceMappingURL=CouncilVoApi.js.map