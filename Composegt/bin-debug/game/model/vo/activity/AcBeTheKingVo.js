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
var AcBeTheKingVo = (function (_super) {
    __extends(AcBeTheKingVo, _super);
    function AcBeTheKingVo() {
        var _this = _super.call(this) || this;
        _this.merank = 999999;
        return _this;
    }
    Object.defineProperty(AcBeTheKingVo.prototype, "cfg", {
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    AcBeTheKingVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_BEKING_TASK);
    };
    Object.defineProperty(AcBeTheKingVo.prototype, "kingPower", {
        get: function () {
            return this.info.v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeTheKingVo.prototype, "buff", {
        get: function () {
            return this.info.buff;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeTheKingVo.prototype, "cnum", {
        get: function () {
            return this.info.cnum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeTheKingVo.prototype, "cbacknum", {
        get: function () {
            return this.info.cbacknum;
        },
        enumerable: true,
        configurable: true
    });
    AcBeTheKingVo.prototype.isDuringPreview = function () {
        var presecs = GameData.serverTime - this.st;
        if (this.st < GameData.serverTime && presecs <= 86400) {
            return true;
        }
        return false;
    };
    //如果return 0 ，则表示过了预告期
    AcBeTheKingVo.prototype.getPreTimeStr = function () {
        var presecs = this.st + 86400 - GameData.serverTime;
        if (presecs >= 0) {
            return App.DateUtil.getFormatBySecond(presecs, 1);
        }
        return "0";
    };
    AcBeTheKingVo.prototype.getBattleTimeStr = function () {
        var presecs = GameData.serverTime - this.st;
        var est = this.st - GameData.serverTime;
        if (presecs > 86400 && est >= 86400) {
            return App.DateUtil.getFormatBySecond(est - 86400, 2);
        }
    };
    // public isTaskUnLocked(tid:string)
    // {
    // }
    AcBeTheKingVo.prototype.isVoteEnable = function (uid) {
        var voteinfo = this.info.voteinfo;
        var len = Object.keys(voteinfo).length;
        if (len >= 3 && !voteinfo[uid]) {
            return false;
        }
        return true;
    };
    AcBeTheKingVo.prototype.getVoteNum = function (uid) {
        var num = this.info.voteinfo[uid] || 0;
        return num;
    };
    AcBeTheKingVo.prototype.getTaskInfo = function () {
        return this.ainfo.task;
    };
    AcBeTheKingVo.prototype.getTaskValueByReuestType = function (queType) {
        return this.ainfo.task[queType] || 0;
    };
    AcBeTheKingVo.prototype.isgetTaskReward = function (stageId) {
        return this.ainfo.rewardinfo[stageId] ? true : false;
    };
    //返回最大的解锁任务id
    AcBeTheKingVo.prototype.getMaxTaskId = function () {
        var keys = Object.keys(this.ainfo.task);
        return keys[keys.length - 1];
    };
    AcBeTheKingVo.prototype.setRankInfos = function (ranks) {
        this._rankList = ranks;
    };
    AcBeTheKingVo.prototype.getRankInfos = function () {
        return this._rankList;
    };
    AcBeTheKingVo.prototype.getCdTxtStr = function () {
        if (this.isDuringPreview()) {
            //  this.st + 86400*3 - GameData.serverTime
            return LanguageManager.getlocal("betheKing_iconTxt1", [this.getPreTimeStr()]);
        }
        else if (this.et - GameData.serverTime > 86400) {
            var str = App.DateUtil.getFormatBySecond(this.et - GameData.serverTime - 86400, 1);
            return LanguageManager.getlocal("betheKing_iconTxt2", [str]);
        }
        else {
            return LanguageManager.getlocal("acRank_acCDEnd");
        }
    };
    AcBeTheKingVo.prototype.getPowerAddValue = function () {
        var gem = this.buff;
        var cost = this.config.cost;
        var v1 = this.config.prestigeRate1;
        var v2 = this.config.prestigeRate2;
        var v3 = this.config.prestigeRate3;
        var plus = gem == 0 ? 0 : (gem / (gem * v1 + v2) + v3); //0.25;
        var plusStr = Math.round(plus * 10000) / 100 + "";
        return plusStr;
    };
    AcBeTheKingVo.prototype.getConvertStatus = function () {
        var servantExchange = this.cfg.servantExchange["1"];
        var servantID = servantExchange.servantID;
        if (Api.servantVoApi.getServantObj(servantID)) {
            return 2;
        }
        else {
            var needItem = servantExchange.needItem;
            var iconTab = needItem.split("_");
            var needN = Number(iconTab[2]);
            var owdn = Api.itemVoApi.getItemNumInfoVoById(iconTab[1]);
            if (owdn >= needN) {
                return 1;
            }
        }
        return 0;
    };
    AcBeTheKingVo.prototype.dispose = function () {
        this.zidgroup = null;
        _super.prototype.dispose.call(this);
    };
    return AcBeTheKingVo;
}(AcBaseVo));
__reflect(AcBeTheKingVo.prototype, "AcBeTheKingVo");
