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
var AcCrossServerPowerVo = (function (_super) {
    __extends(AcCrossServerPowerVo, _super);
    function AcCrossServerPowerVo() {
        var _this = _super.call(this) || this;
        _this.info = null;
        return _this;
    }
    AcCrossServerPowerVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcCrossServerPowerVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st + 7200, et, true);
        },
        enumerable: true,
        configurable: true
    });
    //个人奖励是否领取
    AcCrossServerPowerVo.prototype.isGetPreward = function () {
        return this.info ? this.info.preward == 1 : false;
    };
    //获取区域排名
    AcCrossServerPowerVo.prototype.isGettZonereward = function () {
        return this.info ? this.info.zonereward == 1 : false;
    };
    //获取当前亲密排行榜自己的分数
    AcCrossServerPowerVo.prototype.getCurPoints = function () {
        return this.info ? Number(this.info.v) : 0;
    };
    //自己的参赛资格
    AcCrossServerPowerVo.prototype.getIsCanJoin = function () {
        return this.info ? this.info.iscanjoin : false;
    };
    //当前时间阶段 0即将开始  1:准备开始倒计时  2:结束倒计时   3:展示期 4:活动结束
    AcCrossServerPowerVo.prototype.judgeTimeProcess = function () {
        var timeNumber = 3600 * 2;
        var timeNumber2 = 3600 * 24;
        var type = 0;
        if (GameData.serverTime < this.st) {
            type = 0;
        }
        else if (GameData.serverTime >= this.st && GameData.serverTime < (this.st + timeNumber)) {
            type = 1;
        }
        else if (GameData.serverTime >= (this.st + timeNumber) && GameData.serverTime < (this.et - timeNumber2)) {
            type = 2;
        }
        else if ((GameData.serverTime >= (this.et - timeNumber2)) && GameData.serverTime < this.et) {
            type = 3;
        }
        else if (GameData.serverTime >= this.et) {
            type = 4;
        }
        return type;
    };
    //时间转格式
    AcCrossServerPowerVo.prototype.getCountTimeStr = function (num) {
        var time = num;
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcCrossServerPowerVo.prototype.dispose = function () {
        this.info = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerPowerVo;
}(AcBaseVo));
__reflect(AcCrossServerPowerVo.prototype, "AcCrossServerPowerVo");
