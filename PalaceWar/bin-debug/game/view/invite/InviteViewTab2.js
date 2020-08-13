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
        rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 350 - 80);
        this._scrollList = ComponentManager.getScrollList(InviteViewTab2ScrollItem, this.friendPowerList, rect);
        this.addChild(this._scrollList);
        this._scrollList.y = 80;
    };
    InviteViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return InviteViewTab2;
}(CommonViewTab));
__reflect(InviteViewTab2.prototype, "InviteViewTab2");
//# sourceMappingURL=InviteViewTab2.js.map