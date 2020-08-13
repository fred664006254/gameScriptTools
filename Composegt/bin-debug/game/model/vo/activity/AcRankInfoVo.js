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
var AcRankInfoVo = (function (_super) {
    __extends(AcRankInfoVo, _super);
    function AcRankInfoVo() {
        var _this = _super.call(this) || this;
        _this.activeId = "";
        _this.myrank = null;
        _this.rankList = null;
        return _this;
    }
    AcRankInfoVo.prototype.initData = function (data) {
        if (data.activeId) {
            this.activeId = data.activeId;
        }
        if (data.myrank) {
            this.myrank = data.myrank;
        }
        if (data.rankList) {
            this.rankList = data.rankList;
        }
    };
    /**
     * 排行榜面板标题
     */
    AcRankInfoVo.prototype.getTitleStr = function () {
        if (this.activeId.indexOf("limitedreward")) {
            return "userProgressTitle";
        }
        return "";
    };
    /**
     * 活动进度标题
     */
    AcRankInfoVo.prototype.getProgressTitle = function () {
        if (this.activeId.indexOf("limitedreward")) {
            return LanguageManager.getlocal("limitedTitle", [this.getProgressDesc()]);
        }
        return "";
    };
    /**
     * 活动进度描述
     */
    AcRankInfoVo.prototype.getProgressDesc = function () {
        if (this.activeId.indexOf("limitedreward")) {
            return LanguageManager.getlocal("ac" + App.StringUtil.firstCharToUper(this.activeId) + "_Title");
        }
        return "";
    };
    AcRankInfoVo.prototype.dispose = function () {
        this.activeId = "";
        this.myrank = null;
        this.rankList = null;
    };
    return AcRankInfoVo;
}(BaseVo));
__reflect(AcRankInfoVo.prototype, "AcRankInfoVo");
