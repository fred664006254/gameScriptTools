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
  * 除夕签到PopupView
  * author 张朝阳
  * date 2018/12/19
  * @class AcNewYearSignUpPopupView
  */
var AcNewYearSignUpPopupView = (function (_super) {
    __extends(AcNewYearSignUpPopupView, _super);
    function AcNewYearSignUpPopupView() {
        var _this = _super.call(this) || this;
        _this._receiveBtn = null;
        _this._receiveBM = null;
        return _this;
    }
    AcNewYearSignUpPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPALLREWARD, this.receiveHandle, this);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 516;
        bg.height = 220;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var rewardVoList = GameData.formatRewardItem(cfg.bigPrize);
        var rewardScale = 1;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(bg.x + 20 + ((rewardDB.width + 15) * i), bg.y + 35);
            this.addChildToContainer(rewardDB);
        }
        var descStr = "acNewYearSignUpPopupViewDesc";
        if (this.param.data.code == "2") {
            descStr = "acNewYearSignUpPopupViewDesc-" + this.param.data.code;
        }
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal(descStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        descTF.setPosition(bg.x + bg.width / 2 - descTF.width / 2, bg.y + bg.height - descTF.height - 20);
        this.addChildToContainer(descTF);
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acNewYearSignUpViewRecrive", this.receiveBtnClick, this);
        this._receiveBtn.setPosition(bg.x + bg.width / 2 - this._receiveBtn.width / 2, bg.y + bg.height + 20);
        this.addChildToContainer(this._receiveBtn);
        var bmScale = 0.8;
        this._receiveBM = BaseBitmap.create("collectflag");
        this._receiveBM.setScale(bmScale);
        this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width * bmScale / 2, this._receiveBtn.y + this._receiveBtn.height / 2 - this._receiveBM.height * bmScale / 2);
        this.addChildToContainer(this._receiveBM);
        this.refreashView();
    };
    AcNewYearSignUpPopupView.prototype.refreashView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        if (vo.isReceiveSevenReward()) {
            this._receiveBtn.setVisible(false);
            this._receiveBM.setVisible(true);
        }
        else {
            this._receiveBtn.setVisible(true);
            this._receiveBM.setVisible(false);
            if (vo.isHaveReceiveSevenReward()) {
                this._receiveBtn.setEnable(true);
            }
            else {
                this._receiveBtn.setEnable(false);
            }
        }
    };
    AcNewYearSignUpPopupView.prototype.receiveBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        this.request(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPALLREWARD, { activeId: vo.aidAndCode });
    };
    AcNewYearSignUpPopupView.prototype.receiveHandle = function (event) {
        if (event && event.data && event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            this.refreashView();
        }
    };
    AcNewYearSignUpPopupView.prototype.getTitleStr = function () {
        if (this.param.data.code == "2") {
            return "acNewYearSignUpPopupViewTitle-" + this.param.data.code;
        }
        return "acNewYearSignUpPopupViewTitle";
    };
    AcNewYearSignUpPopupView.prototype.getShowHeight = function () {
        return 400;
    };
    AcNewYearSignUpPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcNewYearSignUpPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETNEWYEARSIGNUPALLREWARD, this.receiveHandle, this);
        this._receiveBtn = null;
        this._receiveBM = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewYearSignUpPopupView;
}(PopupView));
__reflect(AcNewYearSignUpPopupView.prototype, "AcNewYearSignUpPopupView");
//# sourceMappingURL=AcNewYearSignUpPopupView.js.map