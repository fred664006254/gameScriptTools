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
var AtkraceInfoVo = (function (_super) {
    __extends(AtkraceInfoVo, _super);
    function AtkraceInfoVo() {
        var _this = _super.call(this) || this;
        /**
         * 上次出战时间
         */
        _this.lasttime = 0;
        /**
         * 战斗次数
         */
        _this.num = 0;
        /**
         * 是否使用出师令
         */
        _this.isuse = 0;
        /**
         * {id1,id2}战斗过的门客
         */
        _this.asids = [];
        /**
         * 额外出师次数
         */
        _this.extranum = 0;
        /**
         * 连胜次数
         */
        _this.streak = 0;
        /**
         * 士气值
         */
        _this.morale = 0;
        /**
         * 连续上榜次数
         */
        _this.rankover = 0;
        /**记录上阵门客 */
        _this.combatlist = [];
        return _this;
    }
    AtkraceInfoVo.prototype.initData = function (data) {
        if (data) {
            this.lasttime = data.lasttime;
            this.num = data.num;
            this.isuse = data.isuse;
            this.asids = data.asids;
            this.extranum = data.extranum;
            this.streak = data.streak;
            this.morale = data.morale;
            this.rankover = data.rankover;
            this.combatlist = data.combatlist || [];
        }
    };
    AtkraceInfoVo.prototype.dispose = function () {
        this.lasttime = 0;
        this.num = 0;
        this.isuse = 0;
        this.asids.length = 0;
        this.extranum = 0;
        this.streak = 0;
        this.morale = 0;
        this.rankover = 0;
    };
    return AtkraceInfoVo;
}(BaseVo));
__reflect(AtkraceInfoVo.prototype, "AtkraceInfoVo");
