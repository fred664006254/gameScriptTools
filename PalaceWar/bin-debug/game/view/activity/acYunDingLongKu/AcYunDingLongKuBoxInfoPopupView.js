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
  * 比武招亲宝箱详情
  * @author 张朝阳
  * date 2018/8/30
  * @class AcMarryBoxInfoPopupView
  */
var AcYunDingLongKuBoxInfoPopupView = (function (_super) {
    __extends(AcYunDingLongKuBoxInfoPopupView, _super);
    function AcYunDingLongKuBoxInfoPopupView() {
        var _this = _super.call(this) || this;
        _this._receiveBtn = null;
        _this._receiveBM = null;
        return _this;
    }
    AcYunDingLongKuBoxInfoPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUGETREWARDS, this.receiveBoxRewardHandle, this);
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = this.param.data.boxCfg;
        var topBg = BaseBitmap.create("public_9_bg3");
        this.addChildToContainer(topBg);
        var tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuViewRewardDesc-" + code, [String(cfg.killPoint)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topBg.width = tipTxt1.textWidth + 40;
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = 15;
        tipTxt1.x = topBg.x + topBg.width / 2 - tipTxt1.width / 2;
        tipTxt1.y = topBg.y + topBg.height / 2 - tipTxt1.height / 2;
        this.addChildToContainer(tipTxt1);
        var midbg = BaseBitmap.create("public_9_bg4");
        midbg.width = 520;
        midbg.height = 70;
        midbg.x = this.viewBg.x + this.viewBg.width / 2 - midbg.width / 2;
        midbg.y = topBg.y + topBg.height + 15;
        this.addChildToContainer(midbg);
        var tipTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tipTxt2.text = LanguageManager.getlocal("acYunDingLongKuViewRewardtip-" + code);
        tipTxt2.x = midbg.x + 10;
        tipTxt2.y = midbg.y + 20;
        this.addChildToContainer(tipTxt2);
        var buttomBg = BaseBitmap.create("public_9_bg1");
        buttomBg.width = 500;
        // buttomBg.height = 120;
        buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, tipTxt2.y + tipTxt2.height + 10);
        this.addChildToContainer(buttomBg);
        var rewardVoList = GameData.formatRewardItem(cfg.getReward);
        var scaleValue = 1;
        var offestHeight = 0;
        var startWidth = 10;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true);
            rewardDB.setScale(scaleValue);
            var rewardDBWidth = rewardDB.width * scaleValue;
            var posX = buttomBg.x + startWidth + (((i) % 4) * (rewardDBWidth + startWidth));
            var posY = buttomBg.y + 10 + (Math.floor((i) / 4) * (rewardDB.height * scaleValue + 5));
            rewardDB.setPosition(posX, posY);
            this.addChildToContainer(rewardDB);
            offestHeight = rewardDB.height * scaleValue;
        }
        var h = (rewardVoList.length % 4 == 0 ? rewardVoList.length / 4 : Math.floor(rewardVoList.length / 4) + 1) * (offestHeight + 10);
        buttomBg.height = 10 + h;
        midbg.height += buttomBg.height;
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.receiveClick, this);
        this._receiveBtn.setPosition(midbg.x + midbg.width / 2 - this._receiveBtn.width / 2, midbg.y + midbg.height + 20);
        this.addChildToContainer(this._receiveBtn);
        var receiveBMScale = 0.75;
        this._receiveBM = BaseBitmap.create("collectflag");
        this._receiveBM.setScale(receiveBMScale);
        this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width * receiveBMScale / 2, this._receiveBtn.y + this._receiveBtn.height / 2 - this._receiveBM.height * receiveBMScale / 2);
        this.addChildToContainer(this._receiveBM);
        this.refreshView();
    };
    /**刷新ui */
    AcYunDingLongKuBoxInfoPopupView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var boxcfg = this.param.data.boxCfg;
        if (vo.getScore() >= boxcfg.killPoint) {
            if (vo.getBoxFlag(boxcfg.id)) {
                this._receiveBtn.setVisible(false);
                this._receiveBM.setVisible(true);
            }
            else {
                this._receiveBtn.setVisible(true);
                this._receiveBtn.setEnable(true);
                this._receiveBM.setVisible(false);
            }
        }
        else {
            this._receiveBtn.setVisible(true);
            this._receiveBtn.setEnable(false);
            this._receiveBM.setVisible(false);
        }
    };
    AcYunDingLongKuBoxInfoPopupView.prototype.receiveBoxRewardHandle = function (event) {
        if (event.data.ret) {
            var reward = GameData.formatRewardItem(event.data.data.data.rewards);
            App.CommonUtil.playRewardFlyAction(reward);
            this.refreshView();
            var replacerewards = event.data.data.data.replacerewards;
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    };
    AcYunDingLongKuBoxInfoPopupView.prototype.receiveClick = function () {
        var boxcfg = this.param.data.boxCfg;
        this.request(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUGETREWARDS, { activeId: this.param.data.aid + "-" + this.param.data.code, rkey: Number(boxcfg.id) });
    };
    // protected getShowHeight(): number {
    // 	return 555;
    // }
    AcYunDingLongKuBoxInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_namebg",
        ]);
    };
    AcYunDingLongKuBoxInfoPopupView.prototype.getTitleStr = function () {
        return "acYunDingLongKuBoxInfoPopupView-" + this.param.data.code;
    };
    AcYunDingLongKuBoxInfoPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_YUNDINGLONGKUGETREWARDS, this.receiveBoxRewardHandle, this);
        this._receiveBtn = null;
        this._receiveBM = null;
        _super.prototype.dispose.call(this);
    };
    return AcYunDingLongKuBoxInfoPopupView;
}(PopupView));
__reflect(AcYunDingLongKuBoxInfoPopupView.prototype, "AcYunDingLongKuBoxInfoPopupView");
//# sourceMappingURL=AcYunDingLongKuBoxInfoPopupView.js.map