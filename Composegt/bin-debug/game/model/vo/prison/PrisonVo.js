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
var PrisonVo = (function (_super) {
    __extends(PrisonVo, _super);
    function PrisonVo() {
        var _this = _super.call(this) || this;
        // "model.prison"] = "牢房模型",
        // ["model.prison.info"] = "牢房信息",
        // ["model.prison.info.*"] = "牢房中囚犯id和惩罚次数",
        // ["model.prison.mypre"] = "我的名望",
        // ["model.prison.dailypre"] = "每日产出",
        // ["model.prison.maxpre"] = "名望上限",
        _this.info = {};
        _this.lastday = 0;
        _this.mypre = 0;
        _this.dailypre = 0;
        _this.maxpre = 0;
        return _this;
    }
    PrisonVo.prototype.initData = function (data) {
        if (data) {
            if (data.info) {
                this.info = data.info;
            }
            if (data.dailypre) {
                this.dailypre = data.dailypre;
            }
            if (data.mypre) {
                this.mypre = data.mypre;
            }
            else {
                this.mypre = 0;
            }
            if (data.maxpre) {
                this.maxpre = data.maxpre;
            }
            if (data.lastday) {
                this.lastday = data.lastday;
            }
        }
    };
    PrisonVo.prototype.dispose = function () {
        this.info = {};
        this.lastday = 0;
        this.mypre = 0;
        this.dailypre = 0;
        this.maxpre = 0;
    };
    return PrisonVo;
}(BaseVo));
__reflect(PrisonVo.prototype, "PrisonVo");
