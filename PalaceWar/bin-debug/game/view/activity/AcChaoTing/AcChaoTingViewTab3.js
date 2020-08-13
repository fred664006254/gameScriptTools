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
 * 任务
 * author ycg
 * date 2020.3.24
 */
var AcChaoTingViewTab3 = (function (_super) {
    __extends(AcChaoTingViewTab3, _super);
    function AcChaoTingViewTab3() {
        var _this = _super.call(this) || this;
        _this._maskPanel = null;
        _this._lockDialog = null;
        _this._fettersList = [];
        _this._fettersBaseList = [];
        _this._lock = null;
        _this._clickHand = null;
        _this._isUnlock = false;
        _this._scrollList = null;
        _this._fettersDataList = [
            { x: 0, y: 20, scaleX: 1, scaleY: 1, rotation: 0 },
            { x: 650, y: 32, scaleX: 1, scaleY: 1, rotation: 108 },
        ];
        _this.initView();
        return _this;
    }
    AcChaoTingViewTab3.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACCHAOTING_UNLOCK_TASK, this.unlockCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACCHAOTING_GETTASK, this.getRewardCallback, this);
        var baseView = ViewController.getInstance().getView("AcChaoTingView");
        var showHeight = baseView.getListShowHeight();
        var data = this.vo.getSortTaskCfg();
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, showHeight - 10);
        var scrollList = ComponentManager.getScrollList(AcChaoTingViewTabScrollItem3, data, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(GameConfig.stageWidth / 2 - scrollList.width / 2, 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        this.initFetters();
    };
    AcChaoTingViewTab3.prototype.getRewardCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    };
    AcChaoTingViewTab3.prototype.refreshView = function (evt) {
        var data = this.vo.getSortTaskCfg();
        this._scrollList.refreshData(data, { aid: this.aid, code: this.code });
        this.refreshFetterPanel();
    };
    //初始化锁链
    AcChaoTingViewTab3.prototype.initFetters = function () {
        if (this.cfg.recharge1 <= 0) {
            return;
        }
        // let locakKey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "2"+ this.vo.et;
        // let lock = LocalStorageManager.get(locakKey);
        // App.LogUtil.log("infiFetters: "+lock);
        // if (lock && Number(lock) == 1){
        //     return;
        // }
        if (this.vo.isUnlockTask()) {
            return;
        }
        if (this._maskPanel == null) {
            this._maskPanel = new BaseDisplayObjectContainer();
            this._maskPanel.width = GameConfig.stageWidth;
            this._maskPanel.height = this._scrollList.height;
            this._maskPanel.y = 7;
            this.addChild(this._maskPanel);
            var mask = BaseBitmap.create("public_9_viewmask");
            mask.width = this._maskPanel.width;
            mask.height = this._maskPanel.height;
            this._maskPanel.addChild(mask);
            mask.alpha = 0.8;
            mask.touchEnabled = true;
            var clip = null;
            var bs = null;
            //初始化锁链
            for (var i = 0; i < this._fettersDataList.length; i++) {
                clip = ComponentManager.getCustomMovieClip("accourtduty_effect_unlock", 10, 70);
                clip.x = this._fettersDataList[i].x;
                clip.y = this._fettersDataList[i].y;
                clip.scaleX = this._fettersDataList[i].scaleX;
                clip.scaleY = this._fettersDataList[i].scaleY;
                clip.rotation = this._fettersDataList[i].rotation;
                this._fettersList.push(clip);
                this._maskPanel.addChild(clip);
                bs = BaseLoadBitmap.create("accourtduty_effect_unlock1");
                bs.x = this._fettersDataList[i].x;
                bs.y = this._fettersDataList[i].y;
                bs.scaleX = this._fettersDataList[i].scaleX;
                bs.scaleY = this._fettersDataList[i].scaleY;
                bs.rotation = this._fettersDataList[i].rotation;
                this._fettersBaseList.push(bs);
                this._maskPanel.addChild(bs);
            }
            //锁
            var lockBgStr = ResourceManager.hasRes("acchaoting_lock-" + this.getTypeCode()) ? "acchaoting_lock-" + this.getTypeCode() : "acchaoting_lock-1";
            this._lock = BaseBitmap.create(lockBgStr);
            this._lock.setPosition(this._maskPanel.x + this._maskPanel.width / 2 - this._lock.width / 2, this._maskPanel.y + 200);
            this._maskPanel.addChild(this._lock);
            this._lockDialog = new BaseDisplayObjectContainer();
            this._lockDialog.width = GameConfig.stageWidth;
            this._lockDialog.height = this._maskPanel.height;
            this._maskPanel.addChild(this._lockDialog);
            var dalogBgStr = ResourceManager.hasRes("acchaoting_tasklockbg-" + this.getTypeCode()) ? "acchaoting_tasklockbg-" + this.getTypeCode() : "acchaoting_tasklockbg-1";
            var dialogBg = BaseBitmap.create(dalogBgStr);
            dialogBg.x = this._lockDialog.width / 2 - dialogBg.width / 2;
            dialogBg.y = this._lockDialog.height - dialogBg.height;
            this._lockDialog.addChild(dialogBg);
            var dialogTxtBg = BaseBitmap.create("accourtduty_txtbg");
            dialogTxtBg.x = dialogBg.x + 146;
            dialogTxtBg.y = dialogBg.y + 45;
            this._lockDialog.addChild(dialogTxtBg);
            //解锁条件
            var dialogText = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTaskUnlockInfo-" + this.getTypeCode(), ["" + this.cfg.recharge1]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            dialogText.width = dialogTxtBg.width - 20;
            dialogText.lineSpacing = 4;
            dialogText.x = dialogTxtBg.x + dialogTxtBg.width / 2 - dialogText.width / 2;
            dialogText.y = dialogTxtBg.y + 5;
            this._lockDialog.addChild(dialogText);
            //充值
            var rechargeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTaskUnlockTitle-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            rechargeTxt.x = dialogTxtBg.x + dialogTxtBg.width / 2 - rechargeTxt.width / 2;
            rechargeTxt.y = dialogTxtBg.y + dialogTxtBg.height + 5;
            this._lockDialog.addChild(rechargeTxt);
            //进度条
            var progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 380);
            progress.setPosition(dialogTxtBg.x + dialogTxtBg.width / 2 - progress.width / 2, rechargeTxt.y + rechargeTxt.height + 3);
            this._lockDialog.addChild(progress);
            var currRechargeNum = this.vo.getRechargeNum();
            var currRechargeNumStr = LanguageManager.getlocal("acCourtDutyRechargeNum-" + this.getTypeCode(), ["" + currRechargeNum, "" + this.cfg.recharge1]);
            progress.setPercentage(currRechargeNum / this.cfg.recharge1, currRechargeNumStr);
            progress.name = "progress";
            var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", this.rechargeHandler, this);
            rechargeBtn.x = progress.x + progress.width / 2 - rechargeBtn.width / 2;
            rechargeBtn.y = progress.y + progress.height + 2;
            this._lockDialog.addChild(rechargeBtn);
            rechargeBtn.name = "rechargeBtn";
            var unlockBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "acChaotingTaskUnlock", this.unlockHandler, this);
            unlockBtn.x = progress.x + progress.width / 2 - unlockBtn.width / 2;
            unlockBtn.y = progress.y + progress.height + 2;
            this._lockDialog.addChild(unlockBtn);
            unlockBtn.name = "unlockBtn";
            this._clickHand = BaseBitmap.create("guide_hand");
            this._clickHand.setPosition(unlockBtn.x + unlockBtn.width / 2 - 10, unlockBtn.y + unlockBtn.height / 2 - 15);
            this._lockDialog.addChild(this._clickHand);
            this._clickHand.visible = false;
            egret.Tween.removeTweens(this._clickHand);
            egret.Tween.get(this._clickHand, { loop: true })
                .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
                .to({ scaleX: 1, scaleY: 1 }, 500);
            if (this.cfg.recharge1 <= this.vo.getRechargeNum()) {
                unlockBtn.visible = true;
                rechargeBtn.visible = false;
                this._clickHand.visible = true;
                App.CommonUtil.addIconToBDOC(unlockBtn);
            }
            else {
                unlockBtn.visible = false;
                rechargeBtn.visible = true;
                this._clickHand.visible = false;
                if (!this.vo.isInActivity()) {
                    rechargeBtn.setGray(true);
                }
                else {
                    rechargeBtn.setGray(false);
                }
            }
        }
    };
    //播放锁链特效
    AcChaoTingViewTab3.prototype.playFetters = function () {
        var _this = this;
        // let locakKey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "2" + this.vo.et;
        // LocalStorageManager.set(locakKey, String(1));
        if (!this._maskPanel) {
            return;
        }
        this._lockDialog.visible = false;
        this._lock.visible = false;
        var unlockEffect = ComponentManager.getCustomMovieClip("qingyuanclicked", 12, 70);
        unlockEffect.setPosition(this._lock.x - 100, this._lock.y - 120);
        this._maskPanel.addChild(unlockEffect);
        unlockEffect.playWithTime(1);
        var view = this;
        unlockEffect.setEndCallBack(function () {
            unlockEffect.visible = false;
            for (var i = 0; i < view._fettersDataList.length; i++) {
                view._maskPanel.removeChild(view._fettersBaseList[i]);
            }
            for (var i = 0; i < _this._fettersList.length; i++) {
                view._fettersList[i].playWithTime(1);
                if (i == view._fettersList.length - 1) {
                    view._fettersList[i].setEndCallBack(function () {
                        view.hideMaskPanel();
                    }, view);
                }
            }
        }, view);
        // egret.Tween.get(this._maskPanel)
        // .wait(1000)
        // .call(this.hideMaskPanel, this);
    };
    AcChaoTingViewTab3.prototype.hideMaskPanel = function () {
        this._maskPanel.visible = false;
    };
    //刷新充值进度
    AcChaoTingViewTab3.prototype.refreshFetterPanel = function () {
        if (this._lockDialog) {
            var currNum = this.vo.getRechargeNum();
            var progress = this._lockDialog.getChildByName("progress");
            var currNumStr = LanguageManager.getlocal("acCourtDutyRechargeNum-" + this.getTypeCode(), ["" + currNum, "" + this.cfg.recharge1]);
            progress.setPercentage(currNum / this.cfg.recharge1, currNumStr);
            var unlockBtn = this._lockDialog.getChildByName("unlockBtn");
            var rechargeBtn = this._lockDialog.getChildByName("rechargeBtn");
            if (this.cfg.recharge1 <= currNum) {
                unlockBtn.visible = true;
                rechargeBtn.visible = false;
                this._clickHand.visible = true;
                App.CommonUtil.addIconToBDOC(unlockBtn);
            }
            else {
                unlockBtn.visible = false;
                rechargeBtn.visible = true;
                this._clickHand.visible = false;
                if (!this.vo.isInActivity()) {
                    rechargeBtn.setGray(true);
                }
                else {
                    rechargeBtn.setGray(false);
                }
            }
        }
    };
    AcChaoTingViewTab3.prototype.rechargeHandler = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcChaoTingViewTab3.prototype.unlockHandler = function () {
        var unlockBtn = this._lockDialog.getChildByName("unlockBtn");
        unlockBtn.touchEnabled = false;
        this._isUnlock = true;
        NetManager.request(NetRequestConst.REQUEST_ACCHAOTING_UNLOCK_TASK, { activeId: this.vo.aidAndCode });
    };
    AcChaoTingViewTab3.prototype.unlockCallback = function (evt) {
        if (!this._isUnlock) {
            return;
        }
        if (evt && evt.data && evt.data.ret) {
            this.playFetters();
        }
        else {
            var unlockBtn = this._lockDialog.getChildByName("unlockBtn");
            if (unlockBtn) {
                unlockBtn.touchEnabled = true;
            }
        }
        this._isUnlock = false;
    };
    AcChaoTingViewTab3.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcChaoTingViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaoTingViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcChaoTingViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACCHAOTING_UNLOCK_TASK, this.unlockCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACCHAOTING_GETTASK, this.getRewardCallback, this);
        this._maskPanel = null;
        this._lockDialog = null;
        this._lock = null;
        this._fettersList = [];
        this._fettersBaseList = [];
        this._clickHand = null;
        this._isUnlock = false;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcChaoTingViewTab3;
}(AcCommonViewTab));
__reflect(AcChaoTingViewTab3.prototype, "AcChaoTingViewTab3");
//# sourceMappingURL=AcChaoTingViewTab3.js.map