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
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.x = 17;
        bg.width = 454;
        bg.height = this.bottomBg.height - 73; //570;
        bg.y = 226;
        this.addChild(bg);
        var dibian = BaseBitmap.create("public_line");
        dibian.width = 480;
        dibian.y = 165;
        dibian.x = 8;
        this.addChild(dibian);
        this._vipLevel = Api.playerVoApi.getPlayerVipLevel();
        var info = Config.DailyluckCfg.getLuckIdList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 492, GameConfig.stageHeigth - 354);
        this._scrollList = ComponentManager.getScrollList(WelfareViewGoldblessScrollItem, info, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(0, 235);
        if (!Api.switchVoApi.checkClosePay() && !PlatformManager.checkHideIconByIP()) {
            var lookVipBtn = BaseBitmap.create("godbless_btn_chakanvip");
            lookVipBtn.setPosition(470 - lookVipBtn.width, 140);
            lookVipBtn.addTouchTap(this.lookVip, this);
            this.addChild(lookVipBtn);
        }
        var cardNameTF = ComponentManager.getTextField(LanguageManager.getlocal("godblessTitle"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // cardNameTF.x = 201;//line1.x + line1.width/2 - cardNameTF.width/2;
        // cardNameTF.y = 200;// line1.y + line1.height/2 - cardNameTF.height/2;
        cardNameTF.x = bg.x + bg.width / 2 - cardNameTF.width / 2;
        cardNameTF.y = 200;
        this.addChild(cardNameTF);
        var leftLine = BaseBitmap.create("public_v_huawen01");
        leftLine.x = cardNameTF.x - 40 - leftLine.width;
        leftLine.y = cardNameTF.y + cardNameTF.height / 2 - leftLine.height / 2;
        var rightLine = BaseBitmap.create("public_v_huawen01");
        rightLine.scaleX = -1;
        rightLine.x = cardNameTF.x + cardNameTF.width + 40 + rightLine.width;
        rightLine.y = cardNameTF.y + cardNameTF.height / 2 - rightLine.height / 2;
        this.addChild(leftLine);
        this.addChild(rightLine);
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = 490;
        bottomBg.height = GameConfig.stageHeigth - 65;
        bottomBg.x = 0;
        bottomBg.y = 0;
        this.addChild(bottomBg);
    };
    WelfareViewGodBless.prototype.refresh = function () {
        if (this._vipLevel != Api.playerVoApi.getPlayerVipLevel()) {
            this._vipLevel = Api.playerVoApi.getPlayerVipLevel();
            var info = Config.DailyluckCfg.getLuckIdList();
            this._scrollList.refreshData(info);
        }
    };
    WelfareViewGodBless.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "godbless_bookRoom", "godbless_child", "godbless_manage", "godbless_rank", "godbless_servantLv", "godbless_wife",
            "godbless_btn_chakanvip"
        ]);
    };
    WelfareViewGodBless.prototype.lookVip = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
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
