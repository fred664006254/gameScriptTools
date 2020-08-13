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
var AcAskGodVo = /** @class */ (function (_super) {
    __extends(AcAskGodVo, _super);
    function AcAskGodVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.claim = null;
        _this.isfree = 0;
        _this.slimit = 0;
        return _this;
    }
    AcAskGodVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcAskGodVo.prototype.getExchangeTimes = function (id) {
        if (this.claim && this.claim[id]) {
            return this.claim[id];
        }
        return 0;
    };
    AcAskGodVo.prototype.showExchangeDot = function () {
        var dataList = this.cfg.getShopList();
        for (var i = 0; i < dataList.length; i++) {
            if (this.getExchangeTimes(dataList[i].id + "") < dataList[i].limitTime) {
                if (Api.itemVoApi.getItemNumInfoVoById(dataList[i].needItem) >= dataList[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    Object.defineProperty(AcAskGodVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodVo.prototype.getSortAchievementCfg = function (isSort) {
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
    AcAskGodVo.prototype.isGetAchievementById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcAskGodVo.prototype.getAchieveNum = function () {
        var num = 0;
        if (this.ainfo && this.ainfo.v) {
            num = this.ainfo.v;
        }
        return num;
    };
    AcAskGodVo.prototype.isShowAchieveDot = function () {
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
    AcAskGodVo.prototype.getAchieveStatus = function (i) {
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
    Object.defineProperty(AcAskGodVo.prototype, "isShowRedDot", {
        get: function () {
            var b = this.isShowAchieveDot() || this.showExchangeDot();
            if (b) {
                return b;
            }
            if (!this.checkIsInEndShowTime()) {
                return this.isfree > 0;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcAskGodVo.prototype.dispose = function () {
        this.ainfo = null;
        this.claim = null;
        this.isfree = null;
        _super.prototype.dispose.call(this);
    };
    return AcAskGodVo;
}(AcBaseVo));
//# sourceMappingURL=AcAskGodVo.js.map