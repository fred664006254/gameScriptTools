var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcNewCrossServerAtkRaceVo = /** @class */ (function (_super) {
    __extends(AcNewCrossServerAtkRaceVo, _super);
    function AcNewCrossServerAtkRaceVo() {
        var _this = _super.call(this) || this;
        _this.info = null;
        _this.sids = [];
        _this.fameSeatCfg = [];
        return _this;
    }
    AcNewCrossServerAtkRaceVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcNewCrossServerAtkRaceVo.prototype.getSids = function () {
        var sids = [];
        if (this.sids && this.sids.length > 0) {
            sids = [];
            for (var i = 0; i < this.sids.length; i++) {
                sids.push(this.sids[i]);
            }
            sids.sort(function (a, b) {
                var servantA = Api.servantVoApi.getServantObj(a);
                var servantB = Api.servantVoApi.getServantObj(b);
                var bookAv = servantA.getAllBookValue();
                var bookBv = servantB.getAllBookValue();
                if (bookAv == bookBv) {
                    return Number(b) - Number(a);
                }
                else {
                    if (bookBv == bookAv) {
                        return Number(b) - Number(a);
                    }
                    return bookBv - bookAv;
                }
            });
        }
        return sids;
    };
    AcNewCrossServerAtkRaceVo.prototype.getBuffBookValueCount = function (bv) {
        var v = 0;
        var allSids = Api.servantVoApi.getServantInfoIdListWithSort(0);
        for (var i = 0; i < allSids.length; i++) {
            var oneid = allSids[i];
            if (GameData.isInArray(oneid, this.sids) == false) {
                var servantObj = Api.servantVoApi.getServantObj(oneid);
                if (servantObj.getTotalBookValue() >= bv) {
                    v++;
                }
            }
        }
        return v;
    };
    Object.defineProperty(AcNewCrossServerAtkRaceVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcNewCrossServerAtkRaceVo.prototype.getPreward = function () {
        return this["info"]["preward"];
    };
    AcNewCrossServerAtkRaceVo.prototype.getZonereward = function () {
        return this["info"]["zonereward"];
    };
    Object.defineProperty(AcNewCrossServerAtkRaceVo.prototype, "isShowRedDot", {
        get: function () {
            var flag = false;
            if ((GameData.serverTime >= (this.et - 86400)) && GameData.serverTime < this.et && !this.getZonereward() || this.dispatchServantRed() || this.checkFameRed()) {
                flag = true;
            }
            if (this.isInActivity() && Api.atkracecrossVoApi.checkNpcMessage()) {
                flag = true;
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    AcNewCrossServerAtkRaceVo.prototype.getZoneRewardRed = function () {
        if ((GameData.serverTime >= (this.et - 86400)) && GameData.serverTime < this.et && !this.getZonereward()) {
            return true;
        }
        return false;
    };
    AcNewCrossServerAtkRaceVo.prototype.dispatchServantRed = function () {
        var b = false;
        if (Api.servantVoApi.getServantCount() >= 30 && this.info && this.info.iscanjoin && (this.st + 7200 > GameData.serverTime)) {
            var localkey = "AcNewCrossServerAtkRaceVo" + this.et + Api.playerVoApi.getPlayerID();
            var value = LocalStorageManager.get(localkey);
            if (!value || value == "") {
                b = true;
            }
        }
        return b;
    };
    AcNewCrossServerAtkRaceVo.prototype.setDispatchServantRed = function () {
        var localkey = "AcNewCrossServerAtkRaceVo" + this.et + Api.playerVoApi.getPlayerID();
        LocalStorageManager.set(localkey, "1");
    };
    AcNewCrossServerAtkRaceVo.prototype.isInActivity = function () {
        var et = this.et;
        if (this.cfg.extraTime) {
            et = this.et - this.cfg.extraTime * 86400;
        }
        return GameData.serverTime >= this.st + 7200 && GameData.serverTime < et;
    };
    //江湖声望相关*****************************
    //跨服数量
    AcNewCrossServerAtkRaceVo.prototype.getCrossServerNum = function () {
        if (this.zids) {
            return this.zids;
        }
        return 1;
    };
    //席位配置
    AcNewCrossServerAtkRaceVo.prototype.getFameSeatCfg = function () {
        if (this.fameSeatCfg.length > 0) {
            return this.fameSeatCfg;
        }
        var baseData = this.cfg.getFameSeatList();
        console.log("getFameSeatCfg ", baseData);
        var lineNum = 1;
        // let seatCount = 0;
        for (var i = 0; i < baseData.length; i++) {
            baseData[i].seatNumber += (this.getCrossServerNum() - 1) * baseData[i].addSeat;
            var baseCfg = baseData[i];
            var rowNum = Math.ceil(baseCfg.seatNumber / baseCfg.perMaxSeat);
            var seatCount = 0;
            for (var k = 0; k < rowNum; k++) {
                var isFirst = false;
                var isLast = false;
                var seatNum = baseCfg.perMaxSeat;
                if (k == rowNum - 1 && baseCfg.seatNumber % baseCfg.perMaxSeat > 0) {
                    seatNum = baseCfg.seatNumber % baseCfg.perMaxSeat;
                }
                if (k == 0) {
                    isFirst = true;
                }
                if (k == rowNum - 1) {
                    isLast = true;
                }
                var seatIndex = k * baseCfg.perMaxSeat;
                var cfg = { lineNum: lineNum, seatNum: seatNum, baseCfg: baseCfg, isFirst: isFirst, seatIndex: seatIndex, isLast: isLast, seatCount: seatCount };
                lineNum += 1;
                seatCount += seatNum;
                this.fameSeatCfg.push(cfg);
            }
        }
        console.log("getFameSeatCfg ", this.fameSeatCfg);
        return this.fameSeatCfg;
    };
    AcNewCrossServerAtkRaceVo.prototype.getFameCfgByLine = function (line) {
        var data = this.getFameSeatCfg();
        if (data && data[line - 1]) {
            return data[line - 1];
        }
        return null;
    };
    //已挑战次数
    AcNewCrossServerAtkRaceVo.prototype.getFameFightNum = function () {
        if (this.presNum) {
            return this.presNum;
        }
        return 0;
    };
    //已购买次数
    AcNewCrossServerAtkRaceVo.prototype.getFameBuyNum = function () {
        if (this.extraPresNum) {
            return this.extraPresNum;
        }
        return 0;
    };
    //每日免费次数
    AcNewCrossServerAtkRaceVo.prototype.getFameMaxNum = function () {
        return this.cfg.freePres;
    };
    //可用次数
    AcNewCrossServerAtkRaceVo.prototype.getFameCanUseNum = function () {
        var canUseNum = this.getFameMaxNum() + this.getFameBuyNum() - this.getFameFightNum();
        if (canUseNum > 0) {
            return canUseNum;
        }
        return 0;
    };
    //超过剩余次数 需要消耗元宝
    AcNewCrossServerAtkRaceVo.prototype.getFameFightCost = function () {
        var costList = this.cfg.presCost;
        var num = this.getFameBuyNum();
        if (num >= costList.length) {
            return costList[costList.length - 1];
        }
        return costList[num];
    };
    //当前名望头衔
    AcNewCrossServerAtkRaceVo.prototype.getCurrFameTitleInfo = function () {
        var fameInfo = Api.atkracecrossVoApi.getMyFameSeatInfo();
        if (fameInfo && fameInfo.attackst) {
            if (fameInfo.fuid) {
                return null;
            }
            return { x: fameInfo.x, y: fameInfo.y };
        }
        return null;
    };
    //江湖名望红点
    AcNewCrossServerAtkRaceVo.prototype.checkFameRed = function () {
        if (this.isInActivity() && Api.servantVoApi.getServantCount() >= 30 && this.info && this.info.iscanjoin) {
            if (Api.atkracecrossVoApi.getMyInfo() && !this.getCurrFameTitleInfo()) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcNewCrossServerAtkRaceVo.prototype, "cfg", {
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    AcNewCrossServerAtkRaceVo.prototype.dispose = function () {
        this.info = null;
        this.sids.length = 0;
        this.fameSeatCfg = [];
        _super.prototype.dispose.call(this);
    };
    return AcNewCrossServerAtkRaceVo;
}(AcBaseVo));
//# sourceMappingURL=AcNewCrossServerAtkRaceVo.js.map