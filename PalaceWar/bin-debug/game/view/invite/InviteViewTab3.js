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
var InviteViewTab3 = (function (_super) {
    __extends(InviteViewTab3, _super);
    function InviteViewTab3() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    InviteViewTab3.prototype.initView = function () {
        this.friendRechargeList = Api.inviteVoApi.getFriendRechargeList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 350 - 80);
        this._scrollList = ComponentManager.getScrollList(InviteViewTab3ScrollItem, this.friendRechargeList, rect);
        this.addChild(this._scrollList);
        this._scrollList.y = 80;
    };
    InviteViewTab3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return InviteViewTab3;
}(CommonViewTab));
__reflect(InviteViewTab3.prototype, "InviteViewTab3");
//# sourceMappingURL=InviteViewTab3.js.map