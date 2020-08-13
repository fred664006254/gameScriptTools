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
var AcSkySoundVo = (function (_super) {
    __extends(AcSkySoundVo, _super);
    function AcSkySoundVo() {
        var _this = _super.call(this) || this;
        _this.sinfo = null;
        _this.ainfo = null;
        _this.claim = null;
        _this.isfree = 0;
        _this.v = 0;
        _this.num = 0;
        return _this;
    }
    AcSkySoundVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcSkySoundVo.prototype.getSpecialNum = function (name) {
        if (name == "costSpecial2") {
            if (this.ainfo && this.ainfo["v1"]) {
                return this.ainfo["v1"];
            }
        }
        else if (name == "costSpecial4") {
            if (this.ainfo && this.ainfo["v2"]) {
                return this.ainfo["v2"];
            }
        }
        else if (name == "costSpecial8") {
            if (this.ainfo && this.ainfo["v3"]) {
                return this.ainfo["v3"];
            }
        }
        return 0;
    };
    AcSkySoundVo.prototype.getExchangeTimes = function (id) {
        if (this.claim && this.claim[id]) {
            return this.claim[id];
        }
        return 0;
    };
    AcSkySoundVo.prototype.canGetExchange = function (id) {
        var exData = this.cfg.getExchangeList();
        if (exData && exData.length > 0) {
            for (var i = 0; i < exData.length; i++) {
                if (String(exData[i].id) == id) {
                    if (this.claim && this.claim[id] && exData[i].limit && this.claim[id] >= exData[i].limit) {
                        return 2;
                    }
                    else {
                        var keys = ["costSpecial2", "costSpecial4", "costSpecial8"];
                        if (!exData[i][keys[0]] || this.getSpecialNum(keys[0]) >= exData[i][keys[0]]) {
                            if (!exData[i][keys[1]] || this.getSpecialNum(keys[1]) >= exData[i][keys[1]]) {
                                if (!exData[i][keys[2]] || this.getSpecialNum(keys[2]) >= exData[i][keys[2]]) {
                                    return 1;
                                }
                            }
                        }
                        return 0;
                    }
                }
            }
        }
        return 0;
    };
    AcSkySoundVo.prototype.showExchangeDot = function () {
        var exData = this.cfg.getExchangeList();
        for (var i = 0; i < exData.length; i++) {
            if (this.canGetExchange(String(exData[i].id)) == 1) {
                return true;
            }
        }
        return false;
    };
    AcSkySoundVo.prototype.showExchangeWifeDot = function () {
        var change = this.cfg.change[0];
        var changearr = change.split("_");
        var have = Api.itemVoApi.getItemNumInfoVoById(changearr[1]);
        var need = parseInt(changearr[2]);
        return have >= need;
    };
    AcSkySoundVo.prototype.getSortExchangeCfg = function () {
        var data = this.cfg.getExchangeList();
        for (var i = 0; i < data.length; i++) {
            if (this.canGetExchange(String(data[i].id)) == 2) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else {
                data[i].sortId = Number(data[i].id);
            }
        }
        data.sort(function (a, b) { return a.sortId - b.sortId; });
        return data;
    };
    AcSkySoundVo.prototype.getWifeNeed = function () {
        var change = this.cfg.change[0];
        return parseInt(change.split("_")[2]);
    };
    Object.defineProperty(AcSkySoundVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSkySoundVo.prototype.getSortAchievementCfg = function (isSort) {
        if (isSort === void 0) { isSort = true; }
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(String(data[i].id))) {
                data[i].sortId = data.length + Number(data[i].id);
            }
            else if (this.getAchieveNum() >= data[i].needNum) {
                data[i].sortId = (Number(data[i].id)) - data.length - 1;
            }
            else {
                data[i].sortId = Number(data[i].id);
            }
        }
        if (isSort) {
            data.sort(function (a, b) { return a.sortId - b.sortId; });
        }
        else {
            data.sort(function (a, b) { return a.id - b.id; });
        }
        return data;
    };
    //是否已领取进度奖励
    AcSkySoundVo.prototype.isGetAchievementById = function (id) {
        if (this.sinfo && this.sinfo.flags && this.sinfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcSkySoundVo.prototype.getProcess = function () {
        return this.num;
    };
    AcSkySoundVo.prototype.getAchieveNum = function () {
        var num = 0;
        if (this.sinfo && this.sinfo.v) {
            num = this.sinfo.v;
        }
        return num;
    };
    AcSkySoundVo.prototype.isShowAchieveDot = function () {
        var data = this.cfg.getAchieveList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementById(String(data[i].id))) {
                if (this.getAchieveNum() >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    AcSkySoundVo.prototype.getAchRewardNum = function () {
        var data = this.cfg.getAchieveList();
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            if (this.isGetAchievementById(String(data[i].id))) {
                count++;
            }
        }
        return count;
    };
    AcSkySoundVo.prototype.getAchieveStatus = function (i) {
        var data = this.cfg.getAchieveList();
        data.sort(function (a, b) {
            return a.id - b.id;
        });
        if (!this.isGetAchievementById(String(data[i].id))) {
            if (this.getAchieveNum() >= data[i].needNum) {
                return 2;
            }
            else {
                return 1;
            }
        }
        return 3;
    };
    Object.defineProperty(AcSkySoundVo.prototype, "isShowRedDot", {
        get: function () {
            var b = this.isShowAchieveDot() || this.showExchangeDot() || this.showExchangeWifeDot();
            if (b) {
                return b;
            }
            if (!this.checkIsInEndShowTime()) {
                return this.getProcess() > 0 || this.isfree > 0;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcSkySoundVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcSkySoundVo.prototype.dispose = function () {
        this.sinfo = null;
        this.ainfo = null;
        this.isfree = null;
        this.num = 0;
        _super.prototype.dispose.call(this);
    };
    return AcSkySoundVo;
}(AcBaseVo));
__reflect(AcSkySoundVo.prototype, "AcSkySoundVo");
//# sourceMappingURL=AcSkySoundVo.js.map