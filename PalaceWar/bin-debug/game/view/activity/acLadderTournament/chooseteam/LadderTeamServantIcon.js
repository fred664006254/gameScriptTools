/*
    author : shaoliang
    date : 2019.10.21
    desc : 选择门客的图标
*/
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
var LadderTeamServantIcon = (function (_super) {
    __extends(LadderTeamServantIcon, _super);
    function LadderTeamServantIcon() {
        var _this = _super.call(this) || this;
        _this._iconBg = null;
        _this._servantIcon = null;
        _this._emptyIcon = null;
        _this._deleteIcon = null;
        _this._idx = 0;
        _this._fuction = null;
        _this._obj = null;
        _this._servantId = null;
        _this._buffClip = null;
        _this._numbg = null;
        _this._numText = null;
        return _this;
    }
    LadderTeamServantIcon.prototype.init = function (idx, f, o) {
        this._idx = idx;
        this._fuction = f;
        this._obj = o;
        this._iconBg = BaseLoadBitmap.create("itembg_1");
        this._iconBg.width = 95;
        this._iconBg.height = 95;
        this.addChild(this._iconBg);
        this._servantIcon = BaseLoadBitmap.create("");
        this._servantIcon.width = 89;
        this._servantIcon.height = 89;
        this._servantIcon.setPosition(3, 3);
        this.addChild(this._servantIcon);
        this._emptyIcon = BaseLoadBitmap.create("servant_half_empty");
        this._emptyIcon.width = 89;
        this._emptyIcon.height = 89;
        this._emptyIcon.setPosition(3, 3);
        this.addChild(this._emptyIcon);
        this._deleteIcon = BaseLoadBitmap.create("button_del1");
        this._deleteIcon.width = 25;
        this._deleteIcon.height = 25;
        this._deleteIcon.x = this._iconBg.width - this._deleteIcon.width;
        this.addChild(this._deleteIcon);
        this._deleteIcon.visible = false;
        this._numbg = BaseBitmap.create("ladderteam_numbg");
        this._numbg.setPosition(this._iconBg.width - this._numbg.width, this._iconBg.height - this._numbg.height);
        this.addChild(this._numbg);
        this._numText = ComponentManager.getBitmapText(String(idx), "activity_fnt");
        this._numText.setScale(0.5);
        this._numText.setPosition(this._numbg.x + this._numbg.width / 2 - this._numText.width / 4, this._numbg.y + this._numbg.height / 2 - this._numText.height / 4);
        this.addChild(this._numText);
        // this._numText.visible = false;
        this._deleteIcon.addTouchTap(this.clickIcon, this);
    };
    LadderTeamServantIcon.prototype.setServant = function (sid, anim) {
        if (anim === void 0) { anim = true; }
        if (sid == this._servantId) {
            return;
        }
        if (sid) {
            // this._numText.visible = true;
            this._servantId = sid;
            var servantvo = Api.servantVoApi.getServantObj(sid);
            var lv = servantvo.clv + 1;
            if (lv > 8) {
                lv = 8;
            }
            this._iconBg.setload("itembg_" + lv);
            this._servantIcon.visible = true;
            this._servantIcon.setload(servantvo.halfImgPath);
            this._emptyIcon.visible = false;
            this._deleteIcon.visible = true;
            if (this._buffClip) {
                this._buffClip.visible = true;
            }
        }
        else {
            // this._numText.visible = false;
            this._servantId = null;
            this._iconBg.setload("itembg_1");
            this._servantIcon.visible = false;
            this._emptyIcon.visible = true;
            this._deleteIcon.visible = false;
            if (this._buffClip) {
                this._buffClip.visible = false;
            }
        }
        // if (anim)
        // {
        //     let clip = ComponentManager.getCustomMovieClip(`zqfsaoguang`, 7, 80);
        //     this.addChild(clip);
        //     clip.setScale(0.88);
        //     clip.x = -16;
        //     clip.y = -6;
        //     clip.setEndCallBack(()=>{
        //         clip.dispose();
        //     },this)
        //     clip.playWithTime(1);
        // }
    };
    LadderTeamServantIcon.prototype.setBuff = function () {
        if (!this._buffClip) {
            var clip = ComponentManager.getCustomMovieClip("ladder_ef_servant", 8, 100);
            this.addChild(clip);
            clip.x = 0;
            clip.y = 0;
            clip.playWithTime(0);
            this._buffClip = clip;
            if (!this._servantId) {
                this._buffClip.visible = false;
            }
        }
    };
    LadderTeamServantIcon.prototype.clickIcon = function () {
        this._fuction.apply(this._obj, [this._idx]);
    };
    LadderTeamServantIcon.prototype.dispose = function () {
        this._idx = 0;
        this._fuction = null;
        this._obj = null;
        this._iconBg = null;
        this._servantIcon = null;
        this._emptyIcon = null;
        this._deleteIcon = null;
        this._servantId = null;
        this._buffClip = null;
        this._numText = null;
        this._numbg = null;
        _super.prototype.dispose.call(this);
    };
    return LadderTeamServantIcon;
}(BaseDisplayObjectContainer));
__reflect(LadderTeamServantIcon.prototype, "LadderTeamServantIcon");
//# sourceMappingURL=LadderTeamServantIcon.js.map