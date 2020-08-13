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
var AcOneYearPackVo = (function (_super) {
    __extends(AcOneYearPackVo, _super);
    function AcOneYearPackVo() {
        var _this = _super.call(this) || this;
        _this.charge = 0; //"充值额度",
        _this.citemnum = 0; //"充值给的已道具数量",
        _this.score = 0; //幸运值",
        _this.stagenum = 0; //"已领取的阶段奖励次数",
        _this.opened = 0;
        return _this;
    }
    AcOneYearPackVo.prototype.initData = function (data) {
        var old_citemnum = this.citemnum;
        var old_score = this.score;
        for (var key in data) {
            this[key] = data[key];
        }
        // if(old_citemnum != this.citemnum || old_score != this.score){
        App.MessageHelper.dispatchEvent(MessageConst.MESAAGE_ONEPACK_VO_CHANGE);
        // }
    };
    AcOneYearPackVo.prototype.getOpened = function () {
        return this.opened && this.opened == 1;
    };
    Object.defineProperty(AcOneYearPackVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearPackVo.prototype, "isShowRedDot", {
        get: function () {
            if (Api.itemVoApi.getItemNumInfoVoById(this.cfg.drawItemID) > 0) {
                return true;
            }
            if (this.stagenum == 0 && this.score >= this.cfg.luckExchangePoint1) {
                return true;
            }
            if (this.stagenum > 0 && this.score >= this.cfg.luckExchangePoint2) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcOneYearPackVo.prototype.dispose = function () {
        this.charge = 0;
        this.citemnum = 0;
        this.score = 0;
        this.stagenum = 0;
        this.opened = 0;
    };
    return AcOneYearPackVo;
}(AcBaseVo));
__reflect(AcOneYearPackVo.prototype, "AcOneYearPackVo");
