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
var GameinfoVo = (function (_super) {
    __extends(GameinfoVo, _super);
    function GameinfoVo() {
        var _this = _super.call(this) || this;
        _this.jvip = 0; //是否购买协同模式
        _this.svip = 0; //是否购买高级通行证
        _this.royalPass = null;
        _this.jnum = 0; // 当前使用的协同次数
        _this.buynum = 0; // 当天购买协同次数  
        _this.gnum = 0; // 今日已经领取协同宝箱次数
        _this.stepGuild = {};
        _this.newerGuild = 0; //步骤id
        _this.stepId = 0;
        _this.zengfu = 0;
        return _this;
    }
    GameinfoVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    GameinfoVo.prototype.dispose = function () {
        this.jvip = 0;
        this.svip = 0;
        this.stepId = 0;
        this.royalPass = null;
        this.stepGuild = {};
        this.newerGuild = 0;
        this.regdt = 0;
    };
    return GameinfoVo;
}(BaseVo));
__reflect(GameinfoVo.prototype, "GameinfoVo");
//# sourceMappingURL=GameinfoVo.js.map