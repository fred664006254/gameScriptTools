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
var SadunVoApi = (function (_super) {
    __extends(SadunVoApi, _super);
    function SadunVoApi() {
        var _this = _super.call(this) || this;
        _this.currPrison = 0;
        return _this;
    }
    //  功能预览用于，判断是否完成第一次子嗣联姻／
    SadunVoApi.prototype.isShowNpc = function () {
        var achVo = Api.achievementVoApi.getAchievementInfoVoById("403");
        if (achVo) {
            if (achVo.v > 0) {
                return true;
            }
        }
        return false;
    };
    SadunVoApi.prototype.dispose = function () {
        this.currPrison = 0;
        _super.prototype.dispose.call(this);
    };
    return SadunVoApi;
}(BaseVoApi));
__reflect(SadunVoApi.prototype, "SadunVoApi");
//# sourceMappingURL=SadunVoApi.js.map