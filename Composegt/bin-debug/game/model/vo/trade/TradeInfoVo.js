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
/**
 * 主线任务vo
 * author yanyuling
 * date 2018/01/04
 * @class TradeVo
 */
var TradeInfoVo = (function (_super) {
    __extends(TradeInfoVo, _super);
    function TradeInfoVo() {
        return _super.call(this) || this;
    }
    TradeInfoVo.prototype.initData = function (data) {
        if (data.cid != null) {
            this.cid = data.cid;
            this.rewards = data.rewards;
        }
    };
    TradeInfoVo.prototype.dispose = function () {
        this.cid = null;
        this.rewards = null;
    };
    return TradeInfoVo;
}(BaseVo));
__reflect(TradeInfoVo.prototype, "TradeInfoVo");
