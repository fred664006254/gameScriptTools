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
var FairArenaVo = (function (_super) {
    __extends(FairArenaVo, _super);
    function FairArenaVo() {
        var _this = _super.call(this) || this;
        _this.status = 0; //1 结束 2开始
        _this.winNum = 0; //胜利次数
        _this.loseNum = 0; //失败次数
        _this.line = null; //选取队列
        _this.pool = null; //骰子信息
        _this.rewards = null; //奖励领取信息
        return _this;
    }
    FairArenaVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    FairArenaVo.prototype.dispose = function () {
        this.status = 0; //0 结束 1开始
        this.winNum = 0; //胜利次数
        this.loseNum = 0; //失败次数
        this.line = null; //选取队列
        this.pool = null; //骰子信息
        this.rewards = null; //奖励领取信息
    };
    return FairArenaVo;
}(BaseVo));
__reflect(FairArenaVo.prototype, "FairArenaVo");
//# sourceMappingURL=FairArenaVo.js.map