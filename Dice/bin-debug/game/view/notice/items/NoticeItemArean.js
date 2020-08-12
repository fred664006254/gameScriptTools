/**
 * 公告--公平竞技场
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
var NoticeItemArean = (function (_super) {
    __extends(NoticeItemArean, _super);
    function NoticeItemArean() {
        var _this = _super.call(this) || this;
        _this._startTimer = new Date().getTime();
        return _this;
    }
    NoticeItemArean.prototype.initView = function () {
        this._banner = BaseLoadBitmap.create('notice_popup_banner_1');
        this.addChild(this._banner);
        var _mask = BaseLoadBitmap.create('notice_popup_mask');
        _mask.width = 510;
        _mask.height = 42;
        this.addChild(_mask);
        _mask.x = 0;
        _mask.y = 197 - 44;
        var _tips = ComponentMgr.getTextField(LangMger.getlocal('noticePopupText2', [this.formatTime(this._startTimer)]), TextFieldConst.SIZE_20, 0xffffff);
        _tips.bold = true;
        _tips.stroke = 2;
        _tips.strokeColor = 0x0960af;
        this.addChild(_tips);
        _tips.x = (_mask.width - _tips.width) / 2;
        _tips.y = _mask.y + (_mask.height - _tips.height) / 2;
        // this.addTouchTap(this.onTouchTap, this);
    };
    // private onTouchTap() {
    //     console.log('jump to special advance......');
    // }
    NoticeItemArean.prototype.formatTime = function (timestamp) {
        var d = new Date(timestamp);
        var yyyy = d.getFullYear();
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        return yyyy + "." + (mm < 10 ? "0" + mm : mm) + "." + (dd < 10 ? "0" + dd : dd);
    };
    NoticeItemArean.prototype.dispose = function () {
        // this.removeTouchTap();
        this._banner = null;
        _super.prototype.dispose.call(this);
    };
    return NoticeItemArean;
}(BaseDisplayObjectContainer));
__reflect(NoticeItemArean.prototype, "NoticeItemArean");
//# sourceMappingURL=NoticeItemArean.js.map