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
var AcWifeSkinInheritVo = (function (_super) {
    __extends(AcWifeSkinInheritVo, _super);
    function AcWifeSkinInheritVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addskin = 0;
        _this.lotterynum = 0;
        _this.lotterysnum = 0;
        _this.preward = 0;
        _this.firstOpen = 0;
        _this.chargenum = 0;
        return _this;
    }
    AcWifeSkinInheritVo.prototype.initData = function (data) {
        var olv = this.lotterynum;
        for (var key in data) {
            this[key] = data[key];
        }
        // if(olv < this.lotterynum){
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFESKININHERIT_RECALL_NUM_REFRESH);
        // }
    };
    Object.defineProperty(AcWifeSkinInheritVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWifeSkinInheritVo.prototype.getAvgConfig = function (id, code) {
        return this.cfg.getDialogById(id, code);
    };
    AcWifeSkinInheritVo.prototype.getFirstOpen = function () {
        return Boolean(this.firstOpen);
    };
    Object.defineProperty(AcWifeSkinInheritVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.cfg) {
                return false;
            }
            var stageinfo = this.stageinfo;
            var lotterysnum = this.lotterysnum;
            var ReviewNum = this.cfg.FireNum;
            for (var index = 0; index < ReviewNum.length; index++) {
                var element = ReviewNum[index];
                if (element.needNum <= lotterysnum) {
                    if (!this.stageinfo["" + (index + 1)]) {
                        return true;
                    }
                }
            }
            return this.lotterynum > 0;
        },
        enumerable: true,
        configurable: true
    });
    // 1->宝箱关闭 ,2->可以领取宝箱, 3->已经打开宝箱
    AcWifeSkinInheritVo.prototype.getBoxStatusById = function (index) {
        var fireNeed = this.cfg.FireNum[index]["needNum"];
        if (this.lotterysnum >= fireNeed) {
            if (this.stageinfo[String(index + 1)]) {
                //已经打开宝箱
                return 3;
            }
            else {
                //可以领取宝箱
                return 2;
            }
        }
        else {
            //宝箱关闭
            return 1;
        }
    };
    AcWifeSkinInheritVo.prototype.isRightRed = function () {
        var stageinfo = this.stageinfo;
        var lotterysnum = this.lotterysnum;
        var ReviewNum = this.cfg.FireNum;
        var ReviewItemNum = this.cfg.wifeSkinInheritItemNum;
        for (var index = 0; index < ReviewNum.length; index++) {
            var element = ReviewNum[index];
            if (element.needNum <= lotterysnum && element.needNum >= ReviewItemNum / 2 && !this.stageinfo["" + (index + 1)]) {
                return true;
            }
        }
        return false;
    };
    AcWifeSkinInheritVo.prototype.isLeftRed = function () {
        var stageinfo = this.stageinfo;
        var lotterysnum = this.lotterysnum;
        var ReviewNum = this.cfg.FireNum;
        var ReviewItemNum = this.cfg.wifeSkinInheritItemNum;
        for (var index = 0; index < ReviewNum.length; index++) {
            var element = ReviewNum[index];
            if (element.needNum <= lotterysnum && element.needNum < ReviewItemNum / 2 && !this.stageinfo["" + (index + 1)]) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcWifeSkinInheritVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcWifeSkinInheritVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcWifeSkinInheritVo.prototype.getAcLocalTime = function (showHour, color) {
        if (color) {
            return LanguageManager.getlocal("acWifeSkinInheritReward_Time", ["<font color=" + color + ">" + (showHour ? this.acTimeAndHour : this.acTime) + "</font>"]);
        }
        else {
            return LanguageManager.getlocal("acWifeSkinInheritReward_Time", [showHour ? this.acTimeAndHour : this.acTime]);
        }
    };
    AcWifeSkinInheritVo.prototype.dispose = function () {
        this.addskin = 0;
        this.lotterynum = 0;
        this.lotterysnum = 0;
        this.preward = 0;
        this.stageinfo = {};
        this.firstOpen = 0;
        _super.prototype.dispose.call(this);
    };
    return AcWifeSkinInheritVo;
}(AcBaseVo));
__reflect(AcWifeSkinInheritVo.prototype, "AcWifeSkinInheritVo");
