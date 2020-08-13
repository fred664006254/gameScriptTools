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
        _this.sexnum = 0; //"玩家性别 1代表是女，不存在则为男",
        _this.sexswitch = 0; //"性转开关 大于等于1为开 否则为关",
        _this.sexdefault = 0; //"性转默认值 1代表有 不存在则为没有",
        _this.dailyTaskStepGuide = 0;
        return _this;
    }
    GameinfoVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
            if (data.info && data.info.clientInfo) {
                this.dailyTaskStepGuide = data.info.clientInfo.dailyTaskStepGuide;
            }
            if (data.info && data.info.sexnum != null) {
                this.sexnum = data.info.sexnum;
            }
            if (data.info && data.info.sexswitch != null) {
                this.sexswitch = data.info.sexswitch;
            }
            if (data.info && data.info.sexdefault != null) {
                this.sexdefault = data.info.sexdefault;
            }
        }
    };
    GameinfoVo.prototype.dispose = function () {
        this.newerflag = 0;
        this.sexnum = 0; //"玩家性别 1代表是女，不存在则为男",
        this.sexswitch = 0; //"性转开关 大于等于1为开 否则为关",
        this.sexdefault = 0; //"性转默认值 1代表有 不存在则为没有",
        this.dailyTaskStepGuide = 0;
    };
    return GameinfoVo;
}(BaseVo));
__reflect(GameinfoVo.prototype, "GameinfoVo");
