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
* 门客buff
* date 2020.
* author ycg
* @name SixSection1SelectServantPopupViewTab2
*/
var SixSection1SelectServantPopupViewTab2 = (function (_super) {
    __extends(SixSection1SelectServantPopupViewTab2, _super);
    function SixSection1SelectServantPopupViewTab2(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    SixSection1SelectServantPopupViewTab2.prototype.initView = function () {
        this.width = 530;
        this.height = 400;
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 360;
        bg.x = 26;
        bg.y = 0;
        this.addChild(bg);
        var buffList = Config.Sixsection1Cfg.buff;
        var scrollList = ComponentManager.getScrollList(SixSection1SelectServantScrollItem2, buffList, new egret.Rectangle(0, 0, 510, 350));
        scrollList.setPosition(bg.x + 10, bg.y + 5);
        this.addChild(scrollList);
    };
    SixSection1SelectServantPopupViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SixSection1SelectServantPopupViewTab2;
}(CommonViewTab));
__reflect(SixSection1SelectServantPopupViewTab2.prototype, "SixSection1SelectServantPopupViewTab2");
//# sourceMappingURL=SixSection1SelectServantPopupViewTab2.js.map