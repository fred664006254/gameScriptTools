/**
 * 公告--皇室令牌
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
var NoticeItemVip = (function (_super) {
    __extends(NoticeItemVip, _super);
    function NoticeItemVip() {
        return _super.call(this) || this;
    }
    NoticeItemVip.prototype.initView = function () {
        this._banner = BaseLoadBitmap.create('notice_popup_banner_3');
        this.addChild(this._banner);
        // this.addTouchTap(this.onTouchTap, this);
    };
    // private onTouchTap() {
    // }
    NoticeItemVip.prototype.dispose = function () {
        this.removeTouchTap();
        this._banner = null;
        _super.prototype.dispose.call(this);
    };
    return NoticeItemVip;
}(BaseDisplayObjectContainer));
__reflect(NoticeItemVip.prototype, "NoticeItemVip");
//# sourceMappingURL=NoticeItemVip.js.map