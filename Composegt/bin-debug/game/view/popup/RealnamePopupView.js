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
var RealnamePopupView = (function (_super) {
    __extends(RealnamePopupView, _super);
    function RealnamePopupView() {
        var _this = _super.call(this) || this;
        _this.rewardArrList = [];
        _this._goBtn = null;
        _this.touchBoo = false;
        _this.isRealNameBoo = false;
        return _this;
    }
    RealnamePopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION), this.refreshUIInfo, this);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 528;
        bg.height = 230;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 20;
        this.addChildToContainer(bg);
        var re_data = Config.GameprojectCfg.rewardFKYLC3;
        this.rewardArrList = GameData.formatRewardItem(re_data);
        var itemContainer = new BaseDisplayObjectContainer();
        var l = this.rewardArrList.length;
        var scaleNum = 1;
        var newnum = 0;
        for (var i = 0; i < l; i++) {
            var icon = GameData.getItemIcon(this.rewardArrList[i]);
            var num = i % 5;
            icon.setPosition((icon.width + 30) * num, (icon.height + 20) * Math.floor(i / 5));
            icon.scaleX = scaleNum;
            icon.scaleY = scaleNum;
            itemContainer.addChild(icon);
            newnum = (icon.height + 20) * Math.floor(i / 5);
        }
        itemContainer.setPosition(this.viewBg.x + (this.viewBg.width - itemContainer.width) / 2, 80);
        this.addChildToContainer(itemContainer);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "realnameBtn", this.collectHandler, this);
        this._goBtn.x = bg.x + bg.width / 2 - this._goBtn.width / 2;
        this._goBtn.y = bg.y + bg.height - this._goBtn.height / 2 + 55;
        this.addChildToContainer(this._goBtn);
        this.restBtnType();
    };
    RealnamePopupView.prototype.restBtnType = function () {
        var _this = this;
        //实名认证是否认证过   ture已经认证
        RSDKHelper.ifRealNameAuth(function (result) {
            if (result) {
                _this.isRealNameBoo = result;
                NetManager.request(MessageConst.MESSAGE_REALNAME, null);
            }
        });
        if (Api.otherInfoVoApi.certification()) {
            var collectflag = BaseBitmap.create("collectflag");
            collectflag.x = this._goBtn.x + 20;
            collectflag.y = this._goBtn.y;
            collectflag.scaleX = 0.6;
            collectflag.scaleY = 0.6;
            this.addChildToContainer(collectflag);
            this._goBtn.visible = false;
            return;
        }
        if (this.isRealNameBoo) {
            this._goBtn.visible = true;
            this._goBtn.setText("taskCollect");
        }
    };
    RealnamePopupView.prototype.checkRealName = function () {
        RSDKHelper.getRealNameAuth(function (data) {
            if (data == "0" || data == "2") {
                NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION, null);
                NetManager.request(MessageConst.MESSAGE_REALNAME, null);
            }
        });
    };
    RealnamePopupView.prototype.collectHandler = function (evt) {
        if (this.isRealNameBoo) {
            NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION, null);
            NetManager.request(MessageConst.MESSAGE_REALNAME, null);
        }
        else {
            this.checkRealName();
        }
    };
    RealnamePopupView.prototype.refreshUIInfo = function (evt) {
        if (evt.data.ret) {
            this.restBtnType();
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards));
        }
    };
    RealnamePopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETCERTIFICATION), this.refreshUIInfo, this);
        this.touchBoo = false;
        this._goBtn = null;
        _super.prototype.dispose.call(this);
    };
    return RealnamePopupView;
}(PopupView));
__reflect(RealnamePopupView.prototype, "RealnamePopupView");
