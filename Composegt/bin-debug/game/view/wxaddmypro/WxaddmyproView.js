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
var WxaddmyproView = (function (_super) {
    __extends(WxaddmyproView, _super);
    function WxaddmyproView() {
        var _this = _super.call(this) || this;
        _this.curIndex = 0;
        _this.autoNextPoint = -1;
        _this.READTIME = 5;
        return _this;
    }
    WxaddmyproView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "uncompress",
        ]);
    };
    WxaddmyproView.prototype.initView = function () {
        this.showBg();
        this.okButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.okButtonClick, this);
        this.addChild(this.okButton);
        this.adNode = new BaseDisplayObjectContainer();
        this.adNode.width = 518;
        this.adNode.height = 528;
        this.addChild(this.adNode);
        this.adImgs = [];
        for (var i_1 = 0; i_1 < 4; i_1++) {
            this.adImgs[i_1] = BaseLoadBitmap.create("wxaddmypro_" + (i_1 + 1));
            this.adNode.addChild(this.adImgs[i_1]);
        }
        this.rewardNode = new BaseDisplayObjectContainer();
        this.addChild(this.rewardNode);
        var rewards = Config.CustomgiftCfg["3"].content;
        var rewardArr = GameData.formatRewardItem(rewards);
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(0.8);
            iconItem.x = -(108 * rewardArr.length) / 2 + 108 * index;
            this.rewardNode.addChild(iconItem);
        }
        this.pointNode = new BaseDisplayObjectContainer();
        this.addChild(this.pointNode);
        this.points = [];
        for (var i = 0; i < 4; i++) {
            this.points[i] = BaseBitmap.create("wxaddmypro_point2");
            this.points[i].x = -37 * 4 / 2 + 37 * i;
            this.pointNode.addChild(this.points[i]);
            var indexTxt = ComponentManager.getTextField(String(i + 1), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            indexTxt.x = this.points[i].x + this.points[i].width / 2 - indexTxt.width / 2;
            indexTxt.y = this.points[i].y + this.points[i].height / 2 - indexTxt.height / 2;
            this.pointNode.addChild(indexTxt);
        }
        this.leftButton = ComponentManager.getButton("btn_leftpage", "", this.leftButtonClick, this);
        this.addChild(this.leftButton);
        this.rightButton = ComponentManager.getButton("btn_leftpage", "", this.rightButtonClick, this);
        this.rightButton.scaleX = -1;
        this.addChild(this.rightButton);
        this.autoNextPoint = new Date().getTime();
        this.refreshIndex();
    };
    WxaddmyproView.prototype.leftButtonClick = function () {
        this.curIndex = Math.max(0, this.curIndex - 1);
        this.autoNextPoint = -1;
        this.refreshIndex();
    };
    WxaddmyproView.prototype.rightButtonClick = function () {
        this.curIndex = Math.min(3, this.curIndex + 1);
        this.autoNextPoint = -1;
        this.refreshIndex();
    };
    WxaddmyproView.prototype.okButtonClick = function () {
        console.log("okButtonClick");
        if (WxaddmyproView.readOverTime + this.READTIME > GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wxaddmypro_please_read_4_pages"));
            return;
        }
        else if (Api.otherInfoVoApi.wxaddmyproStatus() == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wxaddmypro_please_open_from_mypro"));
            return;
        }
        else if (Api.otherInfoVoApi.wxaddmyproStatus() == 1) {
            this.request(NetRequestConst.REQUEST_OTHERINFO_GETWXADDMYPROREWARD, {});
        }
    };
    WxaddmyproView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rewards = data.data.data.rewards;
            var rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
            this.hide();
        }
    };
    WxaddmyproView.prototype.refreshIndex = function () {
        console.log("refreshIndex", this.curIndex);
        if (this.curIndex >= 3 && WxaddmyproView.readOverTime === 0) {
            // 标记一下读完的时间
            WxaddmyproView.readOverTime = GameData.serverTime;
        }
        for (var i = 0; i < 4; i++) {
            this.adImgs[i].visible = this.curIndex === i;
        }
        for (var i = 0; i < 4; i++) {
            this.points[i].texture = ResourceManager.getRes(this.curIndex === i ? "wxaddmypro_point1" : "wxaddmypro_point2");
        }
        this.leftButton.visible = this.curIndex > 0;
        this.rightButton.visible = this.curIndex < 3;
    };
    WxaddmyproView.prototype.tick = function () {
        if (WxaddmyproView.readOverTime > 0 && WxaddmyproView.readOverTime + this.READTIME < GameData.serverTime) {
            App.DisplayUtil.changeToNormal(this.okButton);
        }
        else {
            App.DisplayUtil.changeToGray(this.okButton);
        }
        this.okButton.setText(LanguageManager.getlocal("taskCollect")
            + ((WxaddmyproView.readOverTime === 0 || WxaddmyproView.readOverTime + this.READTIME < GameData.serverTime) ? "" : ("(" + Math.floor(WxaddmyproView.readOverTime + this.READTIME - GameData.serverTime) + "s)")), false);
        if (this.autoNextPoint !== -1) {
            this.curIndex = Math.min(3, Math.floor((new Date().getTime() - this.autoNextPoint) / 1000 / 3));
            this.refreshIndex();
            if (new Date().getTime() - this.autoNextPoint > 3000 * 4) {
                this.autoNextPoint = -1;
            }
        }
    };
    WxaddmyproView.prototype.showBg = function () {
        var bg = BaseBitmap.create("load_2");
        bg.width = 562;
        bg.height = 778;
        this.addChild(bg);
        this.bg = bg;
    };
    WxaddmyproView.prototype.resetBgSize = function () {
        this.viewBg.height = 920;
        this.viewBg.y = GameConfig.stageHeigth / 2 - this.viewBg.height / 2;
        this.bg.x = GameConfig.stageWidth / 2 - this.bg.width / 2;
        this.bg.y = GameConfig.stageHeigth / 2 - this.bg.height / 2 + 10;
        this.closeBtn.y = this.viewBg.y + 10;
        this.titleTF.x = GameConfig.stageWidth / 2 + 10 - this.titleTF.width / 2;
        this.titleTF.y = this.viewBg.y + 30;
        this.titleTF.size = TextFieldConst.FONTSIZE_BUTTON_COMMON;
        this.okButton.x = GameConfig.stageWidth / 2 - this.okButton.width / 2;
        this.okButton.y = this.viewBg.y + this.viewBg.height - 95 - this.okButton.height / 2;
        this.adNode.x = GameConfig.stageWidth / 2 - this.adNode.width / 2;
        this.adNode.y = this.viewBg.y + 110;
        this.rewardNode.x = GameConfig.stageWidth / 2;
        this.rewardNode.y = this.viewBg.y + this.viewBg.height - 229;
        this.pointNode.x = GameConfig.stageWidth / 2;
        this.pointNode.y = this.viewBg.y + this.viewBg.height - 264;
        this.leftButton.x = 0;
        this.leftButton.y = this.viewBg.y + this.viewBg.height - 274;
        this.rightButton.x = GameConfig.stageWidth;
        this.rightButton.y = this.viewBg.y + this.viewBg.height - 274;
    };
    WxaddmyproView.prototype.getShowHeight = function () {
        return 775;
    };
    WxaddmyproView.prototype.getCloseBtnName = function () {
        return "load_closebtn";
    };
    WxaddmyproView.prototype.getBgName = function () {
        return "load_bg";
    };
    WxaddmyproView.prototype.getSheepType = function () {
        return 1;
    };
    WxaddmyproView.prototype.dispose = function () {
        this.okButton = null;
        this.adNode = null;
        this.adImgs = null;
        this.bg = null;
        this.rewardNode = null;
        this.points = null;
        this.pointNode = null;
        this.curIndex = 0;
        this.leftButton = null;
        this.rightButton = null;
        this.autoNextPoint = -1;
        _super.prototype.dispose.call(this);
    };
    WxaddmyproView.readOverTime = 0;
    return WxaddmyproView;
}(PopupView));
__reflect(WxaddmyproView.prototype, "WxaddmyproView");
