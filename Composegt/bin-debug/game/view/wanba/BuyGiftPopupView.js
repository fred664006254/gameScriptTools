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
var BuyGiftPopupView = (function (_super) {
    __extends(BuyGiftPopupView, _super);
    function BuyGiftPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    BuyGiftPopupView.prototype.getResourceList = function () {
        var resArr = [];
        // if(GameData.wbrewardsFlag)
        // {
        this._titleResName = "reward_success";
        // }
        // else
        // {
        // this._titleResName="reward_hasget_title";
        // }
        resArr.push(this._titleResName);
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    BuyGiftPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        if (this.param.data && this.param.data.code == "0") {
            var titlePic = this._titleResName;
            var title = BaseBitmap.create(titlePic);
            title.setPosition((this.viewBg.width - title.width) / 2, -25);
            this.addChildToContainer(title);
            var msg = LanguageManager.getlocal("wanbaRewardTitle");
            var titleText = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleText.setPosition((this.viewBg.width - titleText.width) / 2, 32);
            this.addChildToContainer(titleText);
            var descStr = LanguageManager.getlocal("wanbaRewardGetDesc", ["100"]);
            if (PlatformManager.getGiftId() == "502") {
                descStr = LanguageManager.getlocal("wanbaRewardGetDesc", ["200"]);
            }
            var descText = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            descText.setPosition((this.viewBg.width - descText.width) / 2, titleText.y + titleText.height + 10);
            this.addChildToContainer(descText);
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
            itemContainer.setPosition(this.viewBg.x + (this.viewBg.width - itemContainer.width) / 2, 100);
            this.addChildToContainer(itemContainer);
            GameData.wbrewards = null;
            GameData.wbrewardsFlag = false;
        }
        else {
            var msg = this.getErrorTitle(this.param.data.code);
            var titleText = ComponentManager.getTextField(msg, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_RED);
            titleText.setPosition((this.viewBg.width - titleText.width) / 2, 32);
            this.addChildToContainer(titleText);
            var descStr = this.getErrorMsg(this.param.data.code);
            var descText = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            descText.setPosition((this.viewBg.width - descText.width) / 2, titleText.y + titleText.height + 20);
            this.addChildToContainer(descText);
        }
    };
    BuyGiftPopupView.prototype.getErrorTitle = function (code) {
        var codeList = {
            "2000": "系统繁忙",
            "2001": "参数错误",
            "2002": "拉取礼包数据出错",
            "2003": "礼包兑换达到上限",
            "2004": "非积分兑换礼包及VIP礼包，无需校验",
            "2005": "积分不足，无法兑换积分礼包",
            "2006": "用户非VIP，无法兑换VIP礼包",
            "2007": "用户VIP等级与VIP礼包等级不符，无法兑换",
            "2008": "礼包已过期",
            "2009": "单用户兑换礼包次数限制",
        };
        return codeList[code] ? codeList[code] : "";
    };
    BuyGiftPopupView.prototype.getErrorMsg = function (code) {
        var codeList = {
            "2000": "请您稍后重试",
            "2001": "请核实再尝试",
            "2002": "请重新尝试",
            "2003": "礼包每日仅可兑换一次\n请明天再来哦~！",
            "2004": "祝您游戏愉快~！",
            "2005": "请获得积分后，再来尝试",
            "2006": "请升级VIP后再来尝试",
            "2007": "请升级VIP后再来尝试",
            "2008": "无法领取",
            "2009": "超出兑换礼包次数上限",
        };
        return codeList[code] ? codeList[code] : "";
    };
    BuyGiftPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.y = this.closeBtn.y - 15;
    };
    BuyGiftPopupView.prototype.getTitleStr = function () {
        return null;
    };
    BuyGiftPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    BuyGiftPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    BuyGiftPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    BuyGiftPopupView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    BuyGiftPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return BuyGiftPopupView;
}(PopupView));
__reflect(BuyGiftPopupView.prototype, "BuyGiftPopupView");
