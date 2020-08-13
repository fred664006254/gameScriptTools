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
/**
 * 头像框的组建
 * @author 张朝阳
 * data 2018/9/6
 * @class HeadContainer
 */
var HeadContainer = (function (_super) {
    __extends(HeadContainer, _super);
    function HeadContainer() {
        var _this = _super.call(this) || this;
        /** 头像 */
        _this._head = null;
        /** 头像框 */
        _this._headBg = null;
        _this._headEffect = null;
        return _this;
    }
    /**
     * 入口函数
     */
    HeadContainer.prototype.init = function (headName, headinfo, needCircle) {
        if (needCircle === void 0) { needCircle = false; }
        this._headBg = App.CommonUtil.getHeadPic(headinfo);
        this.addChild(this._headBg);
        var circlemask;
        if (needCircle) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 114, 114);
            this._head = BaseLoadBitmap.create(headName, rect);
            this._head.x = -10;
            this._head.y = -10;
            // this._head.setScale(0.85)
            // let circle:egret.Shape = new egret.Shape();
            // circle.graphics.beginFill(0x0000ff);
            // circle.graphics.drawCircle(46,50,42);
            // circle.graphics.endFill();
            // this._head.mask = circle;
            // circlemask = circle;
        }
        else {
            this._head = BaseLoadBitmap.create(headName);
            this._head.x = 0;
            this._head.y = -7;
            this._head.setScale(2 / 3);
        }
        this.width = 103;
        this.height = 100;
        var ptitleinfo = App.CommonUtil.getPtitleInfo(headinfo);
        var headbgName = ptitleinfo.ptitle;
        // if ("4041" == headbgName)
        // {
        // 	this._headEffect = ComponentManager.getCustomMovieClip("headcircle_anim",10,100);
        // 	this._headEffect.x = -22;
        // 	this._headEffect.y = -22; 
        // 	this.addChild(this._headEffect);
        // 	this._headEffect.playWithTime(0);
        // }
        var eff = App.CommonUtil.getHeadEffect(headbgName);
        if (eff) {
            this._headEffect = eff;
            this.addChild(this._headEffect);
            this._headEffect.setPosition(this.width / 2, this.height / 2);
        }
        // return;
        if (circlemask) {
            this.addChild(circlemask);
        }
        this.addChild(this._head);
    };
    /**
     * 头像换图
     */
    HeadContainer.prototype.setHeadRes = function (headName) {
        this._head.setload(headName);
    };
    /**
     * 头像框换图
     */
    HeadContainer.prototype.setHeadBgRes = function (headbginfo) {
        this._headBg.dispose();
        this._headBg = null;
        this._headBg = App.CommonUtil.getHeadPic(headbginfo);
        this.addChildAt(this._headBg, 0);
    };
    /**
     * 头像框和头像一起换图
     */
    HeadContainer.prototype.setRes = function (headName, headbginfo, needCircle) {
        if (needCircle === void 0) { needCircle = false; }
        this.setHeadRes(headName);
        this.setHeadBgRes(headbginfo);
        var ptitleinfo = App.CommonUtil.getPtitleInfo(headbginfo);
        var headbgName = ptitleinfo.ptitle;
        if (this._headEffect) {
            this._headEffect.dispose();
            this._headEffect = null;
        }
        var eff = App.CommonUtil.getHeadEffect(headbgName);
        if (eff) {
            this._headEffect = eff;
            this.addChild(this._headEffect);
            this._headEffect.setPosition(this.width / 2, this.height / 2);
        }
    };
    HeadContainer.prototype.dispose = function () {
        this._head = null;
        this._headBg = null;
        this._headEffect = null;
        _super.prototype.dispose.call(this);
    };
    return HeadContainer;
}(BaseDisplayObjectContainer));
__reflect(HeadContainer.prototype, "HeadContainer");
//# sourceMappingURL=HeadContainer.js.map