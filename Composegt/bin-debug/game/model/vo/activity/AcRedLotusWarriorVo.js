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
var AcRedLotusWarriorVo = (function (_super) {
    __extends(AcRedLotusWarriorVo, _super);
    function AcRedLotusWarriorVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 红莲勇士 玩家充值元宝数"
        _this.v = null;
        // 红莲勇士 玩家本次活动获得头盔数
        _this.thenum = null;
        // 红莲勇士 玩家剩余可突击次数
        _this.attacknum = null;
        // 红莲勇士 玩家以往累积数
        _this.accumulatenum = null;
        // 红莲勇士 得到头盔数"
        _this.chipnum = null;
        // 抽奖次数领取
        _this.flags = null;
        return _this;
    }
    AcRedLotusWarriorVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REDLOTUSWARRIOR_REFRESHVO);
    };
    Object.defineProperty(AcRedLotusWarriorVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRedLotusWarriorVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.cfg) {
                return false;
            }
            if (this.attacknum > 0 && this.chipnum < this.cfg.helmetItemNum) {
                return true;
            }
            var helmetNum = this.cfg.helmetNum;
            for (var i = 0; i < helmetNum.length; i++) {
                if (helmetNum[i].needNum <= this.chipnum && (!this.flags[i + 1])) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcRedLotusWarriorVo.prototype.checkBoxCollected = function (boxIndex) {
        if (this.flags[boxIndex + 1]) {
            return true;
        }
        return false;
    };
    AcRedLotusWarriorVo.prototype.maxHelmetNeedNum = function () {
        return this.cfg.helmetItemNum;
    };
    Object.defineProperty(AcRedLotusWarriorVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcRedLotusWarriorVo.prototype.isInActivity = function () {
        // if(Api.servantVoApi.isOwnSkinOfSkinId(""+this.cfg.zhentianSkinId)){
        // 	return false;
        // }
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcRedLotusWarriorVo.prototype.isAcTimeOut = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcRedLotusWarriorVo.prototype.dispose = function () {
        this.v = null;
        // 红莲勇士 玩家本次活动获得头盔数
        this.thenum = null;
        // 红莲勇士 玩家剩余可突击次数
        this.attacknum = null;
        // 红莲勇士 玩家以往累积数
        this.accumulatenum = null;
        // 红莲勇士 得到头盔数"
        this.chipnum = null;
        // 抽奖次数领取
        this.flags = null;
        _super.prototype.dispose.call(this);
    };
    return AcRedLotusWarriorVo;
}(AcBaseVo));
__reflect(AcRedLotusWarriorVo.prototype, "AcRedLotusWarriorVo");
