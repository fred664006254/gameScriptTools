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
 * 衙门任务
 * date 2019.10.28
 * author ycg
 * @class AcCourtDutyViewTab1
 */
var AcCourtDutyViewTab1 = (function (_super) {
    __extends(AcCourtDutyViewTab1, _super);
    function AcCourtDutyViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._maskPanel = null;
        _this._lockDialog = null;
        _this._fettersList = [];
        _this._fettersBaseList = [];
        _this._lock = null;
        _this._clickHand = null;
        _this._isUnlock = false;
        _this._fettersDataList = [
            { x: 0, y: 20, scaleX: 1, scaleY: 1, rotation: 0 },
            { x: 650, y: 32, scaleX: 1, scaleY: 1, rotation: 108 },
        ];
        _this.initView();
        return _this;
    }
    AcCourtDutyViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_UNLOCK, this.unlockCallback, this);
        var parentView = ViewController.getInstance().getView("AcCourtDutyView");
        this.width = GameConfig.stageWidth;
        this.height = parentView.getListHeight();
        var bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.width = this.width;
        bottomBg.height = this.height;
        bottomBg.setPosition(0, 0);
        this.addChild(bottomBg);
        //public_9_bg32 public_9_probiginnerbg
        var listBg = BaseBitmap.create("public_9_bg32");
        listBg.width = bottomBg.width - 30;
        listBg.height = bottomBg.height - 40;
        listBg.setPosition(15, 20);
        this.addChild(listBg);
        var dataList = this.vo.getSortYaMenTaskCfg();
        var rect = new egret.Rectangle(0, 0, listBg.width - 10, listBg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcCourtDutyViewTaskScrollItem, dataList, rect, { aid: this.aid, code: this.code, type: 1 });
        scrollList.setPosition(listBg.x + 5, listBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        this.initFetters();
    };
    AcCourtDutyViewTab1.prototype.refreshView = function () {
        App.LogUtil.log("tab1 refreshview");
        var dataList = this.vo.getSortYaMenTaskCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code, type: 1 });
        this.refreshFetterPanel();
    };
    //初始化锁链
    AcCourtDutyViewTab1.prototype.initFetters = function () {
        if (this.cfg.needRecharge1 <= 0) {
            return;
        }
        // let locakKey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "1" + this.vo.et;
        // let lock = LocalStorageManager.get(locakKey);
        // App.LogUtil.log("infiFetters: "+lock);
        // if (lock && Number(lock) == 1){
        //     return;
        // }
        if (this.vo.unlock && this.vo.unlock["yaMenTask"] && this.vo.unlock["yaMenTask"] == 1) {
            return;
        }
        if (this._maskPanel == null) {
            this._maskPanel = new BaseDisplayObjectContainer();
            this._maskPanel.width = GameConfig.stageWidth;
            this._maskPanel.height = this.height;
            this.addChild(this._maskPanel);
            var mask = BaseBitmap.create("public_9_bg90");
            mask.width = this._maskPanel.width;
            mask.height = this._maskPanel.height;
            this._maskPanel.addChild(mask);
            this._maskPanel.touchEnabled = true;
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
            var lockBgStr = ResourceManager.hasRes("accourtduty_unlock-" + this.getTypeCode()) ? "accourtduty_unlock-" + this.getTypeCode() : "accourtduty_unlock-1";
            this._lock = BaseBitmap.create(lockBgStr);
            this._lock.setPosition(this._maskPanel.x + this._maskPanel.width / 2 - this._lock.width / 2, this._maskPanel.y + 240);
            this._maskPanel.addChild(this._lock);
            this._lockDialog = new BaseDisplayObjectContainer();
            this._lockDialog.width = GameConfig.stageWidth;
            this._lockDialog.height = this.height;
            this._maskPanel.addChild(this._lockDialog);
            var dalogBgStr = ResourceManager.hasRes("accourtduty_chargetipbg-" + this.getTypeCode()) ? "accourtduty_chargetipbg-" + this.getTypeCode() : "accourtduty_chargetipbg-1";
            var dialogBg = BaseBitmap.create(dalogBgStr);
            dialogBg.x = this._lockDialog.width / 2 - dialogBg.width / 2;
            dialogBg.y = this._lockDialog.height - dialogBg.height;
            this._lockDialog.addChild(dialogBg);
            var dialogTxtBg = BaseBitmap.create("accourtduty_txtbg");
            dialogTxtBg.x = dialogBg.x + 211;
            dialogTxtBg.y = dialogBg.y + 85;
            this._lockDialog.addChild(dialogTxtBg);
            var dialogText = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyRechargeInfo1-" + this.getTypeCode(), ["" + this.cfg.needRecharge1]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            dialogText.width = dialogTxtBg.width - 20;
            dialogText.x = dialogTxtBg.x + dialogTxtBg.width / 2 - dialogText.width / 2;
            dialogText.y = dialogTxtBg.y + 5;
            this._lockDialog.addChild(dialogText);
            var rechargeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyRechargeTitle-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            rechargeTxt.x = dialogTxtBg.x + dialogTxtBg.width / 2 - rechargeTxt.width / 2;
            rechargeTxt.y = dialogTxtBg.y + dialogTxtBg.height + 5;
            this._lockDialog.addChild(rechargeTxt);
            //进度条
            var progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 380);
            progress.setPosition(dialogTxtBg.x + dialogTxtBg.width / 2 - progress.width / 2, rechargeTxt.y + rechargeTxt.height + 3);
            this._lockDialog.addChild(progress);
            var currRechargeNum = this.vo.getRechargeNum();
            var currRechargeNumStr = LanguageManager.getlocal("acCourtDutyRechargeNum-" + this.getTypeCode(), ["" + currRechargeNum, "" + this.cfg.needRecharge1]);
            progress.setPercentage(currRechargeNum / this.cfg.needRecharge1, currRechargeNumStr);
            progress.name = "progress";
            var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acCourtDutyRechargeGo-" + this.getTypeCode(), this.rechargeHandler, this);
            rechargeBtn.x = progress.x + progress.width / 2 - rechargeBtn.width / 2;
            rechargeBtn.y = progress.y + progress.height + 2;
            this._lockDialog.addChild(rechargeBtn);
            rechargeBtn.name = "rechargeBtn";
            var unlockBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acCourtDutyRechargeUnlock-" + this.getTypeCode(), this.unlockHandler, this);
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
            if (this.cfg.needRecharge1 <= this.vo.getRechargeNum()) {
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
    AcCourtDutyViewTab1.prototype.playFetters = function () {
        var _this = this;
        // let locakKey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + "1" + this.vo.et;
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
    AcCourtDutyViewTab1.prototype.hideMaskPanel = function () {
        this._maskPanel.visible = false;
    };
    //刷新充值进度
    AcCourtDutyViewTab1.prototype.refreshFetterPanel = function () {
        if (this._lockDialog) {
            var currNum = this.vo.getRechargeNum();
            var progress = this._lockDialog.getChildByName("progress");
            var currNumStr = LanguageManager.getlocal("acCourtDutyRechargeNum-" + this.getTypeCode(), ["" + currNum, "" + this.cfg.needRecharge1]);
            progress.setPercentage(currNum / this.cfg.needRecharge1, currNumStr);
            var unlockBtn = this._lockDialog.getChildByName("unlockBtn");
            var rechargeBtn = this._lockDialog.getChildByName("rechargeBtn");
            if (this.cfg.needRecharge1 <= currNum) {
                unlockBtn.visible = true;
                rechargeBtn.visible = false;
                this._clickHand.visible = true;
                App.CommonUtil.addIconToBDOC(unlockBtn);
            }
            else {
                unlockBtn.visible = false;
                rechargeBtn.visible = true;
                this._clickHand.visible = false;
            }
        }
    };
    AcCourtDutyViewTab1.prototype.rechargeHandler = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcCourtDutyViewTab1.prototype.unlockHandler = function () {
        var unlockBtn = this._lockDialog.getChildByName("unlockBtn");
        unlockBtn.touchEnabled = false;
        this._isUnlock = true;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_UNLOCK, { activeId: this.vo.aidAndCode, bigType: "yaMenTask" });
    };
    AcCourtDutyViewTab1.prototype.unlockCallback = function (evt) {
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
    AcCourtDutyViewTab1.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcCourtDutyViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCourtDutyViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCourtDutyViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_UNLOCK, this.unlockCallback, this);
        this._scrollList = null;
        this._maskPanel = null;
        this._lockDialog = null;
        this._lock = null;
        this._fettersList = [];
        this._fettersBaseList = [];
        this._clickHand = null;
        this._isUnlock = false;
        _super.prototype.dispose.call(this);
    };
    return AcCourtDutyViewTab1;
}(AcCommonViewTab));
__reflect(AcCourtDutyViewTab1.prototype, "AcCourtDutyViewTab1");
//# sourceMappingURL=AcCourtDutyViewTab1.js.map