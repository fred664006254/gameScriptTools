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
var CrossServerHegemonyVoApi = (function (_super) {
    __extends(CrossServerHegemonyVoApi, _super);
    function CrossServerHegemonyVoApi() {
        var _this = _super.call(this) || this;
        // private _crossServerHegemonyVo : AcCrossServerHegemonyVo;
        _this._rqClickIdx = 0;
        _this._rqClickType = "";
        _this._scoreClickIdx = 0;
        _this._scoreClickType = "";
        //每一场比赛时长
        _this._matchTime = 60 * 60;
        //晋级赛的每日时间列表
        _this._matchTimeList1 = [10 * 60 * 60, 16 * 60 * 60, 21 * 60 * 60];
        //淘汰赛比赛时间
        _this._matchTimeList2 = [21 * 60 * 60];
        _this._curData = null;
        _this._flagRankData = null;
        _this._mainSelectData = null;
        _this._pkinfo = null;
        _this._mainSearchDetail = false;
        _this._myRank = null;
        return _this;
    }
    Object.defineProperty(CrossServerHegemonyVoApi.prototype, "cfg", {
        // public get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
        // 	return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, '1');
        // }
        get: function () {
            // return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, '1');
            return null;
        },
        enumerable: true,
        configurable: true
    });
    CrossServerHegemonyVoApi.prototype.dispose = function () {
        // this._crossServerHegemonyVo = null;
        this._rqClickIdx = 0;
        this._rqClickType = '';
        _super.prototype.dispose.call(this);
    };
    CrossServerHegemonyVoApi.prototype.setRank = function (rankData) {
        this._myRank = rankData;
    };
    CrossServerHegemonyVoApi.prototype.getRank = function () {
        return this._myRank;
    };
    CrossServerHegemonyVoApi.prototype.setMainSearchDetail = function (data) {
        this._mainSearchDetail = data;
    };
    CrossServerHegemonyVoApi.prototype.getMainSearchDetail = function () {
        return this._mainSearchDetail;
    };
    CrossServerHegemonyVoApi.prototype.setMainSelectData = function (data) {
        this._mainSelectData = data;
    };
    CrossServerHegemonyVoApi.prototype.getMainSelectData = function () {
        return this._mainSelectData;
    };
    CrossServerHegemonyVoApi.prototype.updateCurData = function (data) {
        this._curData = data;
    };
    CrossServerHegemonyVoApi.prototype.getCurData = function () {
        return this._curData;
    };
    CrossServerHegemonyVoApi.prototype.setPkinfo = function (d) {
        this._pkinfo = d;
    };
    CrossServerHegemonyVoApi.prototype.getPkinfo = function () {
        return this._pkinfo;
    };
    CrossServerHegemonyVoApi.prototype.getDetailPkInfo = function (index) {
        var data = this._pkinfo[index];
        if (data && data.length > 0) {
            data.sort(function (a, b) { return a.maid - b.maid; });
        }
        var obj = new Object();
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (!obj.hasOwnProperty(String(d["maid"]))) {
                if (!obj.hasOwnProperty(String(d["taid"]))) {
                    obj[d["maid"]] = { id1: String(d["maid"]), name1: d["mname"], win: -1, id2: String(d["taid"]), name2: d["tname"] };
                    if (Number(d["win"]) == 1) {
                        obj[d["maid"]]["win"] = 1;
                    }
                }
                else {
                    if (Number(d["win"]) == 1) {
                        obj[d["taid"]]["win"] = 2;
                    }
                }
            }
        }
        var returnList = [];
        for (var key in obj) {
            returnList.push(obj[key]);
        }
        return returnList;
    };
    CrossServerHegemonyVoApi.prototype.setFlagRankData = function (data) {
        this._flagRankData = data;
    };
    CrossServerHegemonyVoApi.prototype.getFlagRankData = function () {
        return this._flagRankData;
    };
    CrossServerHegemonyVoApi.prototype.setFlagOnlyRankData = function (data) {
        if (this._flagRankData) {
            this._flagRankData.rank = data;
        }
    };
    CrossServerHegemonyVoApi.prototype.getMyInfo = function () {
        if (this._curData && this._curData.info && this._curData.info.info && this._curData.info.info[Api.playerVoApi.getPlayerID()]) {
            return this._curData.info.info[Api.playerVoApi.getPlayerID()];
        }
        else {
            return null;
        }
    };
    CrossServerHegemonyVoApi.prototype.getMatchTime = function () {
        return this._matchTime;
    };
    CrossServerHegemonyVoApi.prototype.getMatchTimeList1 = function () {
        return this._matchTimeList1;
    };
    CrossServerHegemonyVoApi.prototype.getMatchTimeList2 = function () {
        return this._matchTimeList2;
    };
    CrossServerHegemonyVoApi.prototype.setRqClickIdx = function (type, index) {
        this._rqClickIdx = index;
        this._rqClickType = type;
    };
    CrossServerHegemonyVoApi.prototype.getRqClickIdx = function () {
        return this._rqClickIdx;
    };
    CrossServerHegemonyVoApi.prototype.getRqClickType = function () {
        return this._rqClickType;
    };
    CrossServerHegemonyVoApi.prototype.setScoreClickIdx = function (type, index) {
        this._scoreClickIdx = index;
        this._scoreClickType = type;
    };
    CrossServerHegemonyVoApi.prototype.getScoreClickIdx = function () {
        return this._scoreClickIdx;
    };
    CrossServerHegemonyVoApi.prototype.getScoreClickType = function () {
        return this._scoreClickType;
    };
    return CrossServerHegemonyVoApi;
}(BaseVoApi));
__reflect(CrossServerHegemonyVoApi.prototype, "CrossServerHegemonyVoApi");
//# sourceMappingURL=CrossServerHegemonyVoApi.js.map