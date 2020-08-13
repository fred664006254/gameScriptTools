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
var CoverView = (function (_super) {
    __extends(CoverView, _super);
    function CoverView() {
        return _super.call(this) || this;
    }
    CoverView.prototype.initView = function () {
        this._canCheckCount = 0;
        this._checking = false;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_SETCOVER, this.setCoverCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETCOVERREWARD, this.rewardCallback, this);
        var bottomBg = BaseBitmap.create("coverBg");
        bottomBg.y = -10;
        bottomBg.height = GameConfig.stageHeigth;
        this.addChildToContainer(bottomBg);
        // 设置或领取按钮
        var btnStr = "";
        if (Api.otherInfoVoApi.getCoverState() === 0) {
            btnStr = "cover_goSetting";
        }
        else {
            btnStr = "taskCollect";
        }
        var setOrGetRewardBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, btnStr, this.setOrGetRewardButtonHandler, this);
        setOrGetRewardBtn.x = GameConfig.stageWidth / 2 - setOrGetRewardBtn.width / 2;
        setOrGetRewardBtn.y = 810 - setOrGetRewardBtn.height / 2;
        setOrGetRewardBtn.name = "setOrGetRewardBtn";
        this.addChildToContainer(setOrGetRewardBtn);
        this._oneBtn = setOrGetRewardBtn;
        // 奖励
        // let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem("6_1150_1|6_1201_1|6_1207_1|6_1208_1|6_1209_1|6_1210_1|6_1001_5|6_1003_5");
        var rewardVoList = GameData.formatRewardItem(Config.GameprojectCfg.rewardWB5);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 400, 200);
        this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem, rewardVoList, rect);
        this._scrollList.x = GameConfig.stageWidth / 2 - (Math.min(4, rewardVoList.length) / 2) * 100;
        this._scrollList.y = 545;
        this.addChildToContainer(this._scrollList);
        // 文字
        var enterTxt = ComponentManager.getTextField(LanguageManager.getlocal("cover_desc1"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        enterTxt.textAlign = TextFieldConst.ALIGH_LEFT;
        enterTxt.x = 37;
        enterTxt.y = 455 - enterTxt.height / 2;
        enterTxt.lineSpacing = 10;
        this.addChildToContainer(enterTxt);
        var getTxt = ComponentManager.getTextField(LanguageManager.getlocal("cover_desc2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
        getTxt.x = GameConfig.stageWidth / 2 - getTxt.width / 2;
        getTxt.y = 505 - getTxt.height / 2;
        getTxt.lineSpacing = 10;
        this.addChildToContainer(getTxt);
    };
    CoverView.prototype.setCoverCallback = function (event) {
        console.log("setCoverCallback");
        var _a = event.data, ret = _a.ret, data = _a.data;
        if (ret) {
            this._oneBtn.setText("taskCollect");
        }
    };
    CoverView.prototype.rewardCallback = function (event) {
        console.log("rewardCallback");
        var _a = event.data, ret = _a.ret, data = _a.data;
        if (ret) {
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
            this.hide();
        }
    };
    CoverView.prototype.setOrGetRewardButtonHandler = function () {
        console.log("setOrGetRewardButtonHandler");
        if (Api.otherInfoVoApi.getCoverState() === 0) {
            console.log("callBackDrop");
            RSDKHelper.callBackDrop();
            this._canCheckCount = 3;
        }
        else if (Api.otherInfoVoApi.getCoverState() === 1) {
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETCOVERREWARD, {});
        }
        else {
            console.log("已领取了奖励,为什么还要点按钮");
        }
    };
    CoverView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["coverBg"]);
    };
    CoverView.prototype.tick = function () {
        var _this = this;
        if (!this._checking && this._canCheckCount > 0) {
            this._checking = true;
            RSDKHelper.checkBackDrop(function (result) {
                console.log("checkBackDrop检测结果" + result);
                _this._checking = false;
                if (result) {
                    _this._canCheckCount = 0;
                    _this.request(NetRequestConst.REQUEST_OTHERINFO_SETCOVER, {});
                }
                else {
                    _this._canCheckCount--;
                }
            });
        }
        // console.log("tick");
    };
    CoverView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_SETCOVER, this.setCoverCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETCOVERREWARD, this.rewardCallback, this);
        this._scrollList = null;
        this._oneBtn = null;
        this._canCheckCount = 0;
        this._checking = false;
        _super.prototype.dispose.call(this);
    };
    return CoverView;
}(CommonView));
__reflect(CoverView.prototype, "CoverView");
