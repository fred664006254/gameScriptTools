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
 * @class WifeUnLockView
 */
var WifeUnLockView = (function (_super) {
    __extends(WifeUnLockView, _super);
    function WifeUnLockView() {
        var _this = _super.call(this) || this;
        _this._sexType = 0; //0女 1男
        return _this;
    }
    WifeUnLockView.prototype.initView = function () {
        var _this = this;
        this.titleTF.text = LanguageManager.getlocal(Api.switchVoApi.checkIsInBlueWife() ? "wifeUnLockViewTitle2" : "wifeUnLockViewTitle");
        this._wifVoApi = Api.wifeVoApi;
        var unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
        // if(unlockList.length <= 0 )
        // {
        // 	return;
        // }
        this._sexType = 0;
        if (Api.switchVoApi.checkOpenBlueWife() && Api.gameinfoVoApi.getSexswitch() && Api.gameinfoVoApi.getSexdefault()) {
            this._sexType = 1;
        }
        var bottomBg = BaseBitmap.create("public_9_bg23");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth;
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 120;
        this.addChildToContainer(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 0, GameConfig.stageHeigth - this.container.y + 20);
        var scrollList = ComponentManager.getScrollList(WifeScrollItem2, unlockList, rect, this._sexType);
        scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
        this.addChildToContainer(scrollList);
        scrollList.setPosition(0, -15);
        if (Api.switchVoApi.checkIsInBlueWife()) {
            var malebtn_1 = ComponentManager.getButton(this._sexType == 0 ? "malelistbtn" : "femalelistbtn", '', function () {
                if (_this._sexType == 0) {
                    _this._sexType = 1;
                    scrollList.refreshData(unlockList, _this._sexType);
                }
                else if (_this._sexType > 0) {
                    _this._sexType = 0;
                    scrollList.refreshData(unlockList, _this._sexType);
                }
                malebtn_1.setBtnBitMap(_this._sexType == 0 ? "malelistbtn" : "femalelistbtn");
            }, this);
            malebtn_1.x = 40;
            malebtn_1.y = this.container.y - malebtn_1.height + 10;
            this.addChild(malebtn_1);
            scrollList.setPosition(0, 0);
        }
    };
    WifeUnLockView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    WifeUnLockView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeUnLockView;
}(CommonView));
__reflect(WifeUnLockView.prototype, "WifeUnLockView");
//# sourceMappingURL=WifeUnLockView.js.map