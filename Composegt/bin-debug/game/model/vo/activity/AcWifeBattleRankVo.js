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
var AcWifeBattleRankVo = (function (_super) {
    __extends(AcWifeBattleRankVo, _super);
    function AcWifeBattleRankVo() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcWifeBattleRankVo.prototype, "acTime", {
        /**
         * 活动开始结束时间，显示：活动日期：x月x日-x月x日
         */
        // public getAcLocalTime(showHour?:boolean, color?:string):string
        // {
        // 	if (color) {
        // 		return LanguageManager.getlocal("acLocalTime",["<font color=" + color + ">" + (showHour?this.acTimeAndHour:this.acTime) + "</font>"]);
        // 	} else {
        // 		return LanguageManager.getlocal("acLocalTime",[showHour?this.acTimeAndHour:this.acTime]);
        // 	}
        // }
        /**
         * 活动开始结束时间，格式：x月x日-x月x日
         */
        get: function () {
            return App.DateUtil.getOpenLocalTime(this.st, this.et - 86400, false);
        },
        enumerable: true,
        configurable: true
    });
    return AcWifeBattleRankVo;
}(AcBaseVo));
__reflect(AcWifeBattleRankVo.prototype, "AcWifeBattleRankVo");
