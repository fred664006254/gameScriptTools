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
var TradeVo = (function (_super) {
    __extends(TradeVo, _super);
    function TradeVo() {
        var _this = _super.call(this) || this;
        _this.point = 0; //"通商分数",
        _this.lastday = 0; //"特殊数据重置时间",
        _this.updated_at = 0; //"数据上次更新时间",
        _this.rewards = null;
        _this.batchFlag = 0;
        return _this;
    }
    TradeVo.prototype.initData = function (data) {
        if (data.point != null) {
            this.point = data.point;
        }
        if (data.lastday != null) {
            this.lastday = data.lastday;
        }
        if (data.updated_at != null) {
            this.updated_at = data.updated_at;
        }
        if (data.info != null) {
            this.cid = data.info.cid;
            this.rewards = data.info.rewards;
        }
        if (data.flag != null) {
            this.batchFlag = data.flag;
        }
    };
    TradeVo.prototype.dispose = function () {
        this.point = 0;
        this.lastday = 0;
        this.updated_at = 0;
        this.cid = null;
        this.rewards = null;
        this.batchFlag = 0;
    };
    return TradeVo;
}(BaseVo));
__reflect(TradeVo.prototype, "TradeVo");
