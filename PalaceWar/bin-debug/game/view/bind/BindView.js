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
var BindView = (function (_super) {
    __extends(BindView, _super);
    function BindView() {
        return _super.call(this) || this;
    }
    BindView.prototype.initView = function () {
        this._opening = true;
        this._bindState = 0;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETGTFBREWARD, this.rewardCallback, this);
        var bottomBgStr = "bindViewBg";
        var bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.x = 10 + GameData.popupviewOffsetX;
        this.addChildToContainer(bottomBg);
        // 文字
        var bindWay = ComponentManager.getTextField(LanguageManager.getlocal("bindWay"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        bindWay.textAlign = TextFieldConst.ALIGH_LEFT;
        bindWay.x = 250 + GameData.popupviewOffsetX;
        bindWay.y = 120;
        bindWay.width = 300;
        bindWay.lineSpacing = 10;
        this.addChildToContainer(bindWay);
        // 绑定或领取按钮
        var btnStr = "bindBtn";
        var bindOrGetRewardBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, btnStr, this.bindOrGetRewardButtonHandler, this);
        bindOrGetRewardBtn.x = 400 - bindOrGetRewardBtn.width / 2 + GameData.popupviewOffsetX;
        bindOrGetRewardBtn.y = 222 - bindOrGetRewardBtn.height / 2;
        bindOrGetRewardBtn.name = "bindOrGetRewardBtn";
        bindOrGetRewardBtn.visible = false;
        this.addChildToContainer(bindOrGetRewardBtn);
        this._mainBtn = bindOrGetRewardBtn;
        // 不同平台，奖励不同
        var rewardStr = Config.GameprojectCfg.rewardGT1;
        if (PlatformManager.checkIsTWBSp() == false && PlatformManager.checkIsThSp() == false && PlatformManager.checkIsKRSp() == false && PlatformManager.checkIsEnSp() == false && PlatformManager.checkIsIdnSp() == false) {
            rewardStr = Config.GameprojectCfg.rewardGT_cn;
        }
        var rewardVoList = GameData.formatRewardItem(rewardStr);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 500, 110);
        this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem, rewardVoList, rect);
        this._scrollList.x = 284 - (Math.min(5, rewardVoList.length) / 2) * 100 + GameData.popupviewOffsetX;
        this._scrollList.y = 320;
        this.addChildToContainer(this._scrollList);
        this.checkBindState();
    };
    BindView.prototype.bindOrGetRewardButtonHandler = function () {
        if (this._bindState === 1) {
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETGTFBREWARD, {});
        }
        else {
            if (PlatformManager.callBind(this.checkBindStateCallback.bind(this))) {
                this.hide();
            }
        }
    };
    // 检查绑定状态
    BindView.prototype.checkBindState = function () {
        PlatformManager.checkBindStatus(this.checkBindStateCallback.bind(this));
    };
    // 检查绑定状态回调
    BindView.prototype.checkBindStateCallback = function (code) {
        var result = Number(code);
        console.log("checkBindStateCallback", result);
        if (this._opening) {
            this._bindState = result;
            if (result === 1) {
                this._mainBtn.setText("taskCollect");
            }
            else {
                this._mainBtn.setText("bindBtn");
            }
            if (!this._mainBtn.visible) {
                this._mainBtn.visible = true;
            }
        }
    };
    BindView.prototype.rewardCallback = function (event) {
        console.log("rewardCallback");
        var _a = event.data, ret = _a.ret, data = _a.data;
        if (ret) {
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
            this.hide();
        }
    };
    BindView.prototype.getShowHeight = function () {
        return 500 + GameData.popupviewOffsetX * 2 - 40;
    };
    BindView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["bindViewBg"]);
    };
    BindView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETGTFBREWARD, this.rewardCallback, this);
        this._scrollList = null;
        this._mainBtn = null;
        this._opening = false;
        this._bindState = 0;
        _super.prototype.dispose.call(this);
    };
    return BindView;
}(PopupView));
__reflect(BindView.prototype, "BindView");
//# sourceMappingURL=BindView.js.map