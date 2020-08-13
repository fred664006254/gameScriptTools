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
 * 未迎娶界面
 * author dmj
 * date 2017/10/9
 * @class WifeViewTab1
 */
var WifeViewTab2 = (function (_super) {
    __extends(WifeViewTab2, _super);
    function WifeViewTab2() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    WifeViewTab2.prototype.initView = function () {
        this._wifVoApi = Api.wifeVoApi;
        var unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
        // if(unlockList.length <= 0 )
        // {
        // 	return;
        // }
        var bottomBg = BaseBitmap.create("public_9v_bg02");
        bottomBg.width = GameConfig.stageWidth - 10;
        bottomBg.height = GameConfig.stageHeigth - 170;
        bottomBg.x = 5;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 14, GameConfig.stageHeigth - 185);
        var scrollList = ComponentManager.getScrollList(WifeScrollItem2, unlockList, rect);
        scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
        this.addChild(scrollList);
        scrollList.setPosition(7, 7);
    };
    WifeViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeViewTab2;
}(CommonViewTab));
__reflect(WifeViewTab2.prototype, "WifeViewTab2");
