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
var InviteViewTab2 = (function (_super) {
    __extends(InviteViewTab2, _super);
    function InviteViewTab2() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    InviteViewTab2.prototype.initView = function () {
        this.friendPowerList = Api.inviteVoApi.getFriendPowerList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 490);
        this._scrollList = ComponentManager.getScrollList(InviteViewTab2ScrollItem, this.friendPowerList, rect);
        this.addChild(this._scrollList);
        this._scrollList.y = 90;
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth;
        borderBg.height = GameConfig.stageHeigth - 455;
        borderBg.x = 0;
        borderBg.y = 80;
        this.addChild(borderBg);
    };
    InviteViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return InviteViewTab2;
}(CommonViewTab));
__reflect(InviteViewTab2.prototype, "InviteViewTab2");
