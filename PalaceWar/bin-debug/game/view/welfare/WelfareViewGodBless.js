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
var WelfareViewGodBless = (function (_super) {
    __extends(WelfareViewGodBless, _super);
    function WelfareViewGodBless() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._vipLevel = 0;
        return _this;
    }
    WelfareViewGodBless.prototype.init = function () {
        _super.prototype.init.call(this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.refresh, this);
        this._vipLevel = Api.playerVoApi.getPlayerVipLevel();
        var info = Config.DailyluckCfg.getLuckIdList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 492, GameConfig.stageHeigth - 304);
        this._scrollList = ComponentManager.getScrollList(WelfareViewGoldblessScrollItem, info, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(0, 195);
        if ((!Api.switchVoApi.checkClosePay()) && Api.switchVoApi.checkIsOlyShenheFile() == false) {
            var lookVipBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "lookVIP", this.lookVip, this);
            lookVipBtn.setPosition(375, 136);
            lookVipBtn.setScale(0.8);
            this.addChild(lookVipBtn);
        }
        if (Api.switchVoApi.checkIsOlyShenheFile()) {
            var bg1 = new BaseShape();
            bg1.graphics.beginFill(0);
            bg1.graphics.drawRect(0, 0, 370, 40);
            bg1.graphics.endFill();
            bg1.setPosition(0, 135);
            this.addChild(bg1);
        }
    };
    WelfareViewGodBless.prototype.refresh = function () {
        if (this._vipLevel != Api.playerVoApi.getPlayerVipLevel()) {
            this._vipLevel = Api.playerVoApi.getPlayerVipLevel();
            var info = Config.DailyluckCfg.getLuckIdList();
            this._scrollList.refreshData(info);
        }
    };
    WelfareViewGodBless.prototype.lookVip = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
    };
    WelfareViewGodBless.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "godbless_bookRoom", "godbless_child", "godbless_manage", "godbless_rank", "godbless_servantLv", "godbless_wife",
            "godbless_wife_blueType",
        ]);
    };
    WelfareViewGodBless.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.refresh, this);
        this._scrollList = null;
        this._vipLevel = 0;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewGodBless;
}(WelfareViewTab));
__reflect(WelfareViewGodBless.prototype, "WelfareViewGodBless");
//# sourceMappingURL=WelfareViewGodBless.js.map