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
var GetGiftPopupView = (function (_super) {
    __extends(GetGiftPopupView, _super);
    function GetGiftPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    GetGiftPopupView.prototype.getResourceList = function () {
        var resArr = [];
        if (GameData.wbrewardsFlag) {
            this._titleResName = "reward_success";
        }
        else {
            // this._titleResName="reward_hasget_title";
            this._titleResName = "";
        }
        resArr.push(this._titleResName);
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    GetGiftPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var titlePic = this._titleResName;
        var title = BaseBitmap.create(titlePic);
        title.setPosition((this.viewBg.width - title.width) / 2, -25);
        this.addChildToContainer(title);
        var msg = GameData.wbrewardsFlag ? LanguageManager.getlocal("getRewardTitle") : LanguageManager.getlocal("hasGetRewardTodayTitle");
        var titleText = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText.setPosition((this.viewBg.width - titleText.width) / 2, 28);
        this.addChildToContainer(titleText);
        var rewardVoList = GameData.formatRewardItem(this.param.data.rewards);
        var itemContainer = new BaseDisplayObjectContainer();
        var l = rewardVoList.length;
        var scaleNum = 0.88;
        var newnum = 0;
        for (var i = 0; i < l; i++) {
            var icon = GameData.getItemIcon(rewardVoList[i], true);
            var num = i % 5;
            icon.setPosition((icon.width + 20) * num, (icon.height + 20) * Math.floor(i / 5));
            icon.setScale(scaleNum);
            itemContainer.addChild(icon);
            newnum = (icon.height + 20) * Math.floor(i / 5);
        }
        itemContainer.setPosition(this.viewBg.x + (this.viewBg.width - itemContainer.width) / 2, 65);
        this.addChildToContainer(itemContainer);
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("getRewardDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_GREEN);
        descText.setPosition((this.viewBg.width - descText.width) / 2, newnum + 178);
        descText.visible = false;
        this.addChildToContainer(descText);
        GameData.wbrewards = null;
        GameData.wbrewardsFlag = false;
    };
    GetGiftPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.y = this.closeBtn.y - 15;
        this.closeBtn.x = GameConfig.stageWidth - this.closeBtn.width - 5;
    };
    GetGiftPopupView.prototype.getTitleStr = function () {
        return null;
    };
    GetGiftPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    GetGiftPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    GetGiftPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    GetGiftPopupView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    GetGiftPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return GetGiftPopupView;
}(PopupView));
__reflect(GetGiftPopupView.prototype, "GetGiftPopupView");
//# sourceMappingURL=GetGiftPopupView.js.map