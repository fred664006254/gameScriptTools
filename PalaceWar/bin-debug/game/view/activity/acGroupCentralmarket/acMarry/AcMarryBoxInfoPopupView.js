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
var AcMarryBoxInfoPopupView = (function (_super) {
    __extends(AcMarryBoxInfoPopupView, _super);
    function AcMarryBoxInfoPopupView() {
        var _this = _super.call(this) || this;
        _this._receiveBtn = null;
        _this._receiveBM = null;
        return _this;
    }
    AcMarryBoxInfoPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWMARRYREWARDS, this.receiveBoxRewardHandle, this);
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = this.param.data.boxCfg;
        var bg = BaseLoadBitmap.create("acmarryview_boxbg");
        bg.width = 548;
        bg.height = 183;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var npcBMScale = 0.41;
        var npcBM = BaseLoadBitmap.create(vo.getNpcBM(cfg.id));
        npcBM.width = 405;
        npcBM.height = 467;
        if (cfg.id == "5") {
            npcBM.width = 640;
            npcBM.height = 840;
            npcBMScale = 0.22;
        }
        npcBM.setScale(npcBMScale);
        npcBM.setPosition(bg.x + 80, bg.y + bg.height - npcBM.height * npcBMScale - 5);
        this.addChildToContainer(npcBM);
        var npcNamebgscale = 0.5;
        var npcNamebg = BaseBitmap.create("wifeview_namebg");
        if (!PlatformManager.checkIsTextHorizontal()) {
            npcNamebg.setScale(npcNamebgscale);
            npcNamebg.setPosition(bg.x + 25, bg.y + 10);
        }
        else {
            npcNamebg.setPosition(bg.x + 15, bg.y + 10);
        }
        this.addChildToContainer(npcNamebg);
        var npcNameTxt = ComponentManager.getTextField(vo.getNpcName(cfg.id), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        if (!PlatformManager.checkIsTextHorizontal()) {
            npcNameTxt.width = 20;
            npcNameTxt.setPosition(npcNamebg.x + npcNamebg.width * npcNamebgscale / 2 - npcNameTxt.width / 2, npcNamebg.y + 47 - npcNameTxt.height / 2);
        }
        else {
            npcNamebg.width = (npcNameTxt.width + 30) * 2;
            npcNamebg.setScale(npcNamebgscale);
            npcNameTxt.setPosition(npcNamebg.x + npcNamebg.width * npcNamebgscale / 2 - npcNameTxt.width / 2, npcNamebg.y + npcNamebg.height * npcNamebgscale / 2 - npcNameTxt.height / 2);
        }
        this.addChildToContainer(npcNameTxt);
        var descBg = BaseBitmap.create("public_itemtipbg");
        descBg.width = 325;
        descBg.anchorOffsetX = descBg.width / 2;
        descBg.anchorOffsetY = descBg.height / 2;
        descBg.rotation = 180;
        descBg.setPosition(bg.x + bg.width - descBg.width / 2, bg.y + bg.height - descBg.height / 2 - 5);
        this.addChildToContainer(descBg);
        var descTxtStr = "acMarryViewRewardDesc";
        if (code != "1") {
            descTxtStr = "acMarryViewRewardDesc-" + code;
        }
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(descTxtStr, [String(cfg.killPoint)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.setPosition(bg.x + bg.width - descTxt.width - 20, descBg.y - descTxt.height / 2);
        this.addChildToContainer(descTxt);
        var npcTalkTail = BaseBitmap.create("public_9_bg13_tail");
        npcTalkTail.anchorOffsetX = npcTalkTail.width / 2;
        npcTalkTail.anchorOffsetY = npcTalkTail.height / 2;
        npcTalkTail.skewY = 180;
        npcTalkTail.rotation = 90;
        npcTalkTail.setPosition(npcBM.x + npcBM.width * npcBMScale, npcBM.y + npcBM.width * npcBMScale / 2);
        this.addChildToContainer(npcTalkTail);
        var npcTalkBg = BaseBitmap.create("public_9_bg13");
        npcTalkBg.width = 270;
        var npcTalkTxtStr = "acMarryViewNpcBoxTalk" + cfg.id;
        if (code != "1") {
            npcTalkTxtStr = "acMarryViewNpcBoxTalk" + cfg.id + "-" + code;
        }
        var npcTalkTxt = ComponentManager.getTextField(LanguageManager.getlocal(npcTalkTxtStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        npcTalkTxt.width = 242;
        npcTalkBg.height = 35 + npcTalkTxt.height;
        npcTalkBg.setPosition(npcTalkTail.x + npcTalkTail.width / 2 - 9, npcTalkTail.y - npcTalkBg.height / 2);
        npcTalkTxt.setPosition(npcTalkBg.x + npcTalkBg.width / 2 - npcTalkTxt.width / 2, npcTalkBg.y + npcTalkBg.height / 2 - npcTalkTxt.height / 2);
        this.addChildToContainer(npcTalkBg);
        this.addChildToContainer(npcTalkTxt);
        var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 530;
        buttomBg.height = 120;
        buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
        this.addChildToContainer(buttomBg);
        var buttomBg2 = BaseBitmap.create("public_9_bg14");
        buttomBg2.width = 520;
        buttomBg2.height = 110;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        this.addChildToContainer(buttomBg2);
        var rewardVoList = GameData.formatRewardItem(cfg.getReward);
        var scaleValue = 0.85;
        var offestHeight = 0;
        var startWidth = 10;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true);
            rewardDB.setScale(scaleValue);
            var rewardDBWidth = rewardDB.width * scaleValue;
            var posX = buttomBg2.x + startWidth + (((i) % 5) * (rewardDBWidth + startWidth));
            var posY = buttomBg2.y + 10 + (Math.floor((i) / 5) * (rewardDB.height * scaleValue + 5));
            rewardDB.setPosition(posX, posY);
            this.addChildToContainer(rewardDB);
            offestHeight = rewardDB.height * scaleValue;
        }
        if (rewardVoList.length > 5) {
            buttomBg.height = 220;
            buttomBg2.height = 210;
        }
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.receiveClick, this);
        this._receiveBtn.setPosition(buttomBg.x + buttomBg.width / 2 - this._receiveBtn.width / 2, buttomBg.y + buttomBg.height + 20);
        this.addChildToContainer(this._receiveBtn);
        var receiveBMScale = 0.75;
        this._receiveBM = BaseBitmap.create("collectflag");
        this._receiveBM.setScale(receiveBMScale);
        this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width * receiveBMScale / 2, this._receiveBtn.y + this._receiveBtn.height / 2 - this._receiveBM.height * receiveBMScale / 2);
        this.addChildToContainer(this._receiveBM);
        this.refreshView();
    };
    /**刷新ui */
    AcMarryBoxInfoPopupView.prototype.refreshView = function () {
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
    AcMarryBoxInfoPopupView.prototype.receiveBoxRewardHandle = function (event) {
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
    AcMarryBoxInfoPopupView.prototype.receiveClick = function () {
        var boxcfg = this.param.data.boxCfg;
        this.request(NetRequestConst.REQUST_ACTIVITY_GETTWMARRYREWARDS, { activeId: this.param.data.aid + "-" + this.param.data.code, rkey: Number(boxcfg.id) });
    };
    // protected getShowHeight(): number {
    // 	return 555;
    // }
    AcMarryBoxInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_namebg",
        ]);
    };
    AcMarryBoxInfoPopupView.prototype.getTitleStr = function () {
        return "acmidAutumnAcInfoTitle";
    };
    AcMarryBoxInfoPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWMARRYREWARDS, this.receiveBoxRewardHandle, this);
        this._receiveBtn = null;
        this._receiveBM = null;
        _super.prototype.dispose.call(this);
    };
    return AcMarryBoxInfoPopupView;
}(PopupView));
__reflect(AcMarryBoxInfoPopupView.prototype, "AcMarryBoxInfoPopupView");
//# sourceMappingURL=AcMarryBoxInfoPopupView.js.map