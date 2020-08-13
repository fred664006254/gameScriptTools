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
 * 筑阁祭天得奖励弹框
 * 只适用于筑阁祭天活动
 * @author 张朝阳
 * date 2019/5/24
 * @class AcWorshipGetRewardPopupView
 */
var AcWorshipGetRewardPopupView = (function (_super) {
    __extends(AcWorshipGetRewardPopupView, _super);
    function AcWorshipGetRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._rewardArrList = [];
        _this._otherRewardArrList = [];
        _this._count = 0;
        _this._buttomBg = null;
        _this._isPlayAni = null;
        _this._otherContainer = null;
        _this._otherRewardHeigth = 0;
        _this._buffersHeight = 0;
        _this._buffersContainer = null;
        _this._callBack = null;
        _this._isHasCri = false;
        _this._aidCode = null;
        return _this;
    }
    AcWorshipGetRewardPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcWorshipGetRewardPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcWorshipGetRewardPopupView.prototype.initView = function () {
        this.titleTF.visible = false;
        var re_data = this.param.data;
        var rewards_data = this.param.data.rewards;
        var otherRewards_data = this.param.data.otherRewards;
        this._isPlayAni = this.param.data.isPlayAni;
        this._callBack = this.param.data.callback;
        this._aidCode = this.param.data.aidCode;
        var criArr = this.param.data.criArr;
        if (rewards_data) {
            this._rewardArrList = GameData.formatRewardItem(rewards_data);
        }
        else {
            if (re_data) {
                if (typeof (re_data) == "string") {
                    this._rewardArrList = GameData.formatRewardItem(re_data);
                }
                else {
                    this._rewardArrList = re_data;
                }
            }
        }
        this.showInitView();
        this._otherContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._otherContainer);
        if (otherRewards_data) {
            this.getOtherReward(otherRewards_data);
        }
        this._buffersContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._buffersContainer);
        if (criArr) {
            this.initBuffers(criArr);
        }
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - okBtn.width / 2, this._buttomBg.y + +this._buttomBg.height + 30);
        this._otherContainer.addChild(okBtn);
        if (this._isPlayAni) {
            this._count = 0;
            this._otherContainer.alpha = 0;
            this._buffersContainer.alpha = 0;
            TimerManager.doTimer(100, this._rewardArrList.length, this.playAni, this);
        }
        else {
            this.noPlayAni();
        }
    };
    /**buff 相关 */
    AcWorshipGetRewardPopupView.prototype.initBuffers = function (buffers) {
        var v = 0;
        for (var i = 0; i < buffers.length; i++) {
            var item = buffers[i];
            if (String(item) == "2") {
                v++;
            }
        }
        if (v > 0) {
            this._isHasCri = true;
        }
        else {
            this._isHasCri = false;
            ;
        }
        // let cyhtNum = buffers["cyht"] ? buffers["cyht"] : 0;
        // let tjhcNum = buffers["tjhc"] ? buffers["tjhc"] : 0;
        // let csjdNum = buffers["csjd"] ? buffers["csjd"] : 0;
        // let wealthLuckTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingGetRewardPopupViewBufferType1", [String(cyhtNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // wealthLuckTxt1.setPosition(this._buttomBg.x + 20, this._buttomBg.y + this._otherRewardHeigth + 15);
        // this._buffersContainer.addChild(wealthLuckTxt1);
        var msgStr = "acWorshipGetRewardPopupViewBuffer-" + this.param.data.code;
        var msgBg = null;
        if (this._aidCode && this._aidCode == "yiyibushe-1") {
            msgStr = "acYiyibusheCritMsg-" + this.param.data.code;
            msgBg = BaseBitmap.create("public_9_bg47");
            msgBg.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - msgBg.width / 2, this._buttomBg.y + 7);
            this._buffersContainer.addChild(msgBg);
        }
        if (this.param.data && this.param.data.msgStr) {
            msgStr = this.param.data.msgStr;
        }
        var wealthLuckTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(msgStr, [String(v)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        wealthLuckTxt2.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - wealthLuckTxt2.width / 2, this._buttomBg.y + this._otherRewardHeigth + 15);
        this._buffersContainer.addChild(wealthLuckTxt2);
        // let wealthLuckTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingGetRewardPopupViewBufferType3", [String(csjdNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // wealthLuckTxt3.setPosition(this._buttomBg.x + this._buttomBg.width - wealthLuckTxt3.width - 20, wealthLuckTxt1.y);
        // this._buffersContainer.addChild(wealthLuckTxt3);
        if (msgBg) {
            msgBg.width = wealthLuckTxt2.width + 60;
            msgBg.x = this._buttomBg.x + this._buttomBg.width / 2 - msgBg.width / 2;
            wealthLuckTxt2.y = msgBg.y + msgBg.height / 2 - wealthLuckTxt2.height / 2;
            this._buffersHeight = msgBg.height + 5;
            this._buttomBg.height += this._buffersHeight;
        }
        else {
            this._buffersHeight = wealthLuckTxt2.height + 5;
            this._buttomBg.height += this._buffersHeight;
        }
    };
    /**
     * 显示初始化View
     */
    AcWorshipGetRewardPopupView.prototype.showInitView = function () {
        var light = BaseBitmap.create("tailor_get_light");
        light.anchorOffsetX = light.width / 2;
        light.anchorOffsetY = light.height / 2;
        light.x = GameConfig.stageWidth / 2;
        light.y = 40 + light.height / 2;
        egret.Tween.get(light, { loop: true }).to({ rotation: 360 }, 5000);
        this.addChildToContainer(light);
        var light2 = BaseBitmap.create("tailor_get_light");
        light2.anchorOffsetX = light2.width / 2;
        light2.anchorOffsetY = light2.height / 2;
        light2.x = light.x;
        light2.y = light.y;
        egret.Tween.get(light2, { loop: true }).to({ rotation: -360 }, 5000);
        this.addChildToContainer(light2);
        var wordBM = BaseBitmap.create("tailor_get_word");
        wordBM.anchorOffsetX = wordBM.width / 2;
        wordBM.anchorOffsetY = wordBM.height / 2;
        wordBM.x = GameConfig.stageWidth / 2;
        wordBM.y = light.y;
        if (this._isPlayAni) {
            wordBM.setScale(0);
            egret.Tween.get(wordBM, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        }
        this.addChildToContainer(wordBM);
        this._buttomBg = BaseBitmap.create("public_9_wordbg2");
        this._buttomBg.height = 180;
        this._buttomBg.x = this.viewBg.x + this.viewBg.width / 2 - this._buttomBg.width / 2;
        this._buttomBg.y = wordBM.y + wordBM.height;
        this.addChildToContainer(this._buttomBg);
        var offestNum = 0;
        if (this._rewardArrList.length < 11) {
            offestNum = Math.floor((this._rewardArrList.length) / (6));
        }
        else if (this._rewardArrList.length >= 11) {
            offestNum = 2;
        }
        this._buttomBg.height += offestNum * (135);
    };
    /**
     * 播放动画
     */
    AcWorshipGetRewardPopupView.prototype.playAni = function () {
        this.createItem(this._count);
    };
    /**
     * 不播放动画
     */
    AcWorshipGetRewardPopupView.prototype.noPlayAni = function () {
        for (var i = 0; i < this._rewardArrList.length; i++) {
            this.createItem(i);
        }
    };
    /**
     * 实例化 Item
     */
    AcWorshipGetRewardPopupView.prototype.createItem = function (count) {
        var _this = this;
        var rewardDB = GameData.getItemIcon(this._rewardArrList[count], true, true);
        rewardDB.anchorOffsetX = rewardDB.width / 2;
        rewardDB.anchorOffsetY = rewardDB.height / 2;
        var rewardDBWidth = rewardDB.width;
        var maxLength = this._rewardArrList.length > 5 ? 6 : this._rewardArrList.length + 1;
        var startWidth = (this._buttomBg.width - rewardDBWidth * (maxLength - 1)) / (maxLength);
        var posX = this._buttomBg.x + startWidth + 6 + rewardDB.width / 2 + (((count) % 5) * (rewardDBWidth + startWidth));
        var posY = this._buttomBg.y + rewardDB.height / 2 + 30 + this._otherRewardHeigth + this._buffersHeight + (Math.floor((count) / 5) * (rewardDB.height + 35));
        rewardDB.setPosition(posX, posY);
        this.addChildToContainer(rewardDB);
        if (this._isPlayAni) {
            rewardDB.setScale(0);
            egret.Tween.get(rewardDB, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50).call(function () {
                egret.Tween.removeTweens(rewardDB);
                if (_this.param.data.criArr) {
                    var cri = _this.param.data.criArr[count];
                    if (cri && String(cri) == "2") {
                        var criCloud = BaseBitmap.create("acworshipview_cricloud");
                        criCloud.setPosition(rewardDB.x + rewardDB.width / 2 - criCloud.width - 3, rewardDB.y - rewardDB.height / 2 + 3);
                        _this.addChildToContainer(criCloud);
                        var criStr = "acworshipview_cri";
                        if (_this._aidCode && _this._aidCode == "yiyibushe-1") {
                            criStr = "acyiyibushe_good_text";
                        }
                        var cri_1 = BaseBitmap.create(criStr);
                        cri_1.setPosition(criCloud.x + criCloud.width - cri_1.width + 2, criCloud.y + criCloud.height - cri_1.height - 2);
                        _this.addChildToContainer(cri_1);
                    }
                }
            }, this);
            this._count++;
            if (this._count == this._rewardArrList.length) {
                egret.Tween.get(this._otherContainer).to({ alpha: 1 }, 500);
                if (this._isHasCri) {
                    egret.Tween.get(this._buffersContainer).to({ alpha: 1 }, 500);
                }
            }
        }
    };
    /**
    * 获得额外的奖励
    */
    AcWorshipGetRewardPopupView.prototype.getOtherReward = function (otherData) {
        this._otherRewardArrList = GameData.formatRewardItem(otherData);
        var otherRewardBg = BaseBitmap.create("public_9_bg47");
        otherRewardBg.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - otherRewardBg.width / 2, this._buttomBg.y + 30);
        this._otherContainer.addChild(otherRewardBg);
        var rewardIconWidth = 0;
        var otherRewardDesWidth = 0;
        var otherRewardNumWidth = 0;
        for (var i = 0; i < this._otherRewardArrList.length; i++) {
            var rewardIcon = BaseLoadBitmap.create(this._otherRewardArrList[i].icon);
            rewardIcon.height = 42;
            rewardIcon.width = 42;
            rewardIcon.setPosition(otherRewardBg.x + otherRewardBg.width / 2 - rewardIcon.width / 2, otherRewardBg.y + 9 + (i * (rewardIcon.height)));
            this._otherContainer.addChild(rewardIcon);
            rewardIconWidth = rewardIcon.width > rewardIconWidth ? rewardIcon.width : rewardIconWidth;
            var extraRewardDes = ComponentManager.getTextField(LanguageManager.getlocal("extraRewardDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            extraRewardDes.setPosition(rewardIcon.x - extraRewardDes.width - 5, rewardIcon.y + rewardIcon.height / 2 - extraRewardDes.height / 2);
            this._otherContainer.addChild(extraRewardDes);
            otherRewardDesWidth = extraRewardDes.width > otherRewardDesWidth ? extraRewardDes.width : otherRewardDesWidth;
            var extraRewardNum = ComponentManager.getTextField("x" + String(this._otherRewardArrList[0].num), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
            extraRewardNum.setPosition(rewardIcon.x + rewardIcon.width + 5, rewardIcon.y + rewardIcon.height / 2 - extraRewardNum.height / 2);
            this._otherContainer.addChild(extraRewardNum);
            otherRewardNumWidth = extraRewardNum.width > otherRewardNumWidth ? extraRewardNum.width : otherRewardNumWidth;
        }
        otherRewardBg.width = rewardIconWidth + otherRewardNumWidth + otherRewardDesWidth + 200;
        otherRewardBg.height += (this._otherRewardArrList.length - 1) * 42;
        otherRewardBg.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - otherRewardBg.width / 2, this._buttomBg.y + 30);
        this._otherRewardHeigth = otherRewardBg.height + 20;
        this._buttomBg.height += this._otherRewardHeigth;
    };
    AcWorshipGetRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'public_9_wordbg2', "tailor_get_light",
            "tailor_get_word", "acworshipview_cricloud", "acworshipview_cri"
        ]);
    };
    AcWorshipGetRewardPopupView.prototype.dispose = function () {
        // this._scrollList =null;
        TimerManager.remove(this.playAni, this);
        if (this._callBack) {
            this._callBack.apply(this.param.data.handler);
        }
        this._callBack = null;
        this._rewardArrList = [];
        this._otherRewardArrList = [];
        this._otherRewardArrList = [];
        this._count = 0;
        this._buttomBg = null;
        this._isPlayAni = null;
        this._otherContainer = null;
        this._otherRewardHeigth = null;
        this._buffersHeight = 0;
        this._buffersContainer = null;
        this._isHasCri = false;
        this._aidCode = null;
        _super.prototype.dispose.call(this);
    };
    return AcWorshipGetRewardPopupView;
}(BaseView));
__reflect(AcWorshipGetRewardPopupView.prototype, "AcWorshipGetRewardPopupView");
//# sourceMappingURL=AcWorshipGetRewardPopupView.js.map