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
/*
    author : shaoliang
    date : 2019.10.21
    desc : 选择队伍的图标
*/
var LadderTeamIcon = (function (_super) {
    __extends(LadderTeamIcon, _super);
    function LadderTeamIcon() {
        var _this = _super.call(this) || this;
        _this._idx = 0;
        _this._arrow = null;
        _this._word = null;
        _this._fuction = null;
        _this._obj = null;
        _this._clip = null;
        _this._buffclip = null;
        _this._isFull = null;
        return _this;
    }
    LadderTeamIcon.prototype.init = function (idx, f, o, isFull) {
        this._idx = idx;
        this._fuction = f;
        this._obj = o;
        this.setTeamFull(isFull);
        this._buffclip = ComponentManager.getCustomMovieClip("ladder_ef_team", 10, 150);
        this._buffclip.y = 130;
        this._buffclip.x = 50;
        this._buffclip.playWithTime(0);
        this.addChild(this._buffclip);
        this._buffclip.visible = false;
        this.addTouchTap(this.iconClick, this);
    };
    LadderTeamIcon.prototype.iconClick = function () {
        this._fuction.apply(this._obj, [this._idx]);
    };
    LadderTeamIcon.prototype.setTeamFull = function (b) {
        if (b == this._isFull) {
            return;
        }
        this._isFull = b;
        if (this._clip) {
            this._clip.dispose();
            this._clip = null;
        }
        if (b) {
            if (this._arrow) {
                this._arrow.dispose();
                this._arrow = null;
            }
            if (this._word) {
                this._word.dispose();
                this._word = null;
            }
            this._clip = ComponentManager.getCustomMovieClip("ladder_soldiers_stand" + this._idx + "_", 4, 150);
            this._clip.y = 100;
            this._clip.playWithTime(0);
            this.addChild(this._clip);
        }
        else {
            this._clip = BaseLoadBitmap.create("ladder_soldiers_empty1");
            this._clip.y = 100;
            this.addChild(this._clip);
            var arrow = BaseLoadBitmap.create("ladder_arrow");
            arrow.width = 83;
            arrow.height = 123;
            arrow.setPosition(50, 30);
            this.addChild(arrow);
            this._arrow = arrow;
            egret.Tween.get(arrow, { loop: true }).to({ y: arrow.y + 20 }, 400).to({ y: arrow.y }, 400);
            var word = BaseBitmap.create("ladderview_dispatch");
            word.setPosition(arrow.x + arrow.width / 2 - word.width / 2 + 20, arrow.y + arrow.height + 35);
            this.addChild(word);
            this._word = word;
        }
    };
    LadderTeamIcon.prototype.setBuff = function (b) {
        this._buffclip.visible = b;
    };
    LadderTeamIcon.prototype.dispose = function () {
        this._idx = 0;
        this._arrow = null;
        this._fuction = null;
        this._obj = null;
        this._isFull = null;
        this._word = null;
        this._clip = null;
        this._buffclip = null;
        _super.prototype.dispose.call(this);
    };
    return LadderTeamIcon;
}(BaseDisplayObjectContainer));
__reflect(LadderTeamIcon.prototype, "LadderTeamIcon");
//# sourceMappingURL=LadderTeamIcon.js.map