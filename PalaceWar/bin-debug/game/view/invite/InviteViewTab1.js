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
var InviteViewTab1 = (function (_super) {
    __extends(InviteViewTab1, _super);
    function InviteViewTab1() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    InviteViewTab1.prototype.initView = function () {
        console.log("InviteViewTab1.initView");
        this.friendNumList = Api.inviteVoApi.getFriendNumList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 350 - 80);
        this._scrollList = ComponentManager.getScrollList(InviteViewTab1ScrollItem, this.friendNumList, rect);
        this.addChild(this._scrollList);
        this._scrollList.y = 80;
        console.log("InviteViewTab1.initView over");
    };
    InviteViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return InviteViewTab1;
}(CommonViewTab));
__reflect(InviteViewTab1.prototype, "InviteViewTab1");
//# sourceMappingURL=InviteViewTab1.js.map