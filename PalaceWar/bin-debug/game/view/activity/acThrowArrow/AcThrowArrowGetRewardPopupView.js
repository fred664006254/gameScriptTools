/**
 * 恭喜获得奖励的通用弹板
 * @param rewards  获得的奖励列表
 * @param otherRewards  获得的其他奖励列表 指 额外获得的奖励列表
 * @param isPlayAni  是否播放动画
 */
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
var AcThrowArrowGetRewardPopupView = (function (_super) {
    __extends(AcThrowArrowGetRewardPopupView, _super);
    function AcThrowArrowGetRewardPopupView() {
        var _this = _super.call(this) || this;
        // private _scrollList: ScrollList;
        _this._rewardArrList = [];
        _this._count = 0;
        _this._buttomBg = null;
        _this._isPlayAni = null;
        _this._otherContainer = null;
        _this._otherRewardHeigth = 0;
        _this._callBack = null;
        return _this;
    }
    AcThrowArrowGetRewardPopupView.prototype.initView = function () {
        this.titleTF.visible = false;
        this._isPlayAni = true;
        var rewards_data = this.param.data.rewards;
        this._callBack = this.param.data.callback;
        if (rewards_data) {
            this._rewardArrList = GameData.formatRewardItem(rewards_data);
        }
        this.showInitView();
        this._otherContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._otherContainer);
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        okBtn.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - okBtn.width / 2, this._buttomBg.y + +this._buttomBg.height + 30);
        this._otherContainer.addChild(okBtn);
        if (this._isPlayAni) {
            this._count = 0;
            this._otherContainer.alpha = 0;
            TimerManager.doTimer(100, this._rewardArrList.length, this.playAni, this);
        }
        else {
            this.noPlayAni();
        }
    };
    /**
     * 显示初始化View
     */
    AcThrowArrowGetRewardPopupView.prototype.showInitView = function () {
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
        var wordBM = BaseBitmap.create(this.getTitleResName());
        wordBM.anchorOffsetX = wordBM.width / 2;
        wordBM.anchorOffsetY = wordBM.height / 2;
        wordBM.x = GameConfig.stageWidth / 2;
        wordBM.y = light.y;
        if (this._isPlayAni) {
            wordBM.setScale(0);
            egret.Tween.get(wordBM, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        }
        this.addChildToContainer(wordBM);
        var arrowTypeBM = BaseBitmap.create("acthrowarrowview_itemtitle_" + this.param.data.type + "-" + this.getUiCode());
        arrowTypeBM.anchorOffsetX = arrowTypeBM.width / 2;
        arrowTypeBM.anchorOffsetY = arrowTypeBM.height / 2;
        arrowTypeBM.setPosition(GameConfig.stageWidth / 2, wordBM.y + wordBM.height / 2 + 30);
        if (this._isPlayAni) {
            arrowTypeBM.setScale(0);
            egret.Tween.get(arrowTypeBM, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        }
        this.addChildToContainer(arrowTypeBM);
        this._buttomBg = BaseBitmap.create("public_9_wordbg2");
        this._buttomBg.height = 180;
        this._buttomBg.x = this.viewBg.x + this.viewBg.width / 2 - this._buttomBg.width / 2;
        this._buttomBg.y = arrowTypeBM.y + arrowTypeBM.height / 2 + 20;
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
    AcThrowArrowGetRewardPopupView.prototype.playAni = function () {
        this.createItem(this._count);
    };
    /**
     * 不播放动画
     */
    AcThrowArrowGetRewardPopupView.prototype.noPlayAni = function () {
        for (var i = 0; i < this._rewardArrList.length; i++) {
            this.createItem(i);
        }
    };
    /**
     * 实例化 Item
     */
    AcThrowArrowGetRewardPopupView.prototype.createItem = function (count) {
        var rewardDB = GameData.getItemIcon(this._rewardArrList[count], true, true);
        rewardDB.anchorOffsetX = rewardDB.width / 2;
        rewardDB.anchorOffsetY = rewardDB.height / 2;
        var rewardDBWidth = rewardDB.width;
        var maxLength = this._rewardArrList.length > 5 ? 6 : this._rewardArrList.length + 1;
        var startWidth = (this._buttomBg.width - rewardDBWidth * (maxLength - 1)) / (maxLength);
        var posX = this._buttomBg.x + startWidth + 6 + rewardDB.width / 2 + (((count) % 5) * (rewardDBWidth + startWidth));
        var posY = this._buttomBg.y + rewardDB.height / 2 + 30 + this._otherRewardHeigth + (Math.floor((count) / 5) * (rewardDB.height + 35));
        rewardDB.setPosition(posX, posY);
        this.addChildToContainer(rewardDB);
        if (this._isPlayAni) {
            rewardDB.setScale(0);
            egret.Tween.get(rewardDB, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
            this._count++;
            if (this._count == this._rewardArrList.length) {
                egret.Tween.get(this._otherContainer).to({ alpha: 1 }, 500);
            }
        }
    };
    AcThrowArrowGetRewardPopupView.prototype.getUiCode = function () {
        if (this.param.data.code == "2") {
            return "1";
        }
        return this.param.data.code;
    };
    AcThrowArrowGetRewardPopupView.prototype.getTitleResName = function () {
        if (this.getUiCode() == "3") {
            return "tailor_get_word";
        }
        return "acthrowarrowview_common_rewardtip";
    };
    AcThrowArrowGetRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'public_9_wordbg2', "tailor_get_light",
            this.getTitleResName(), "acthrowarrowview_itemtitle_" + this.param.data.type + "-" + this.getUiCode(),
        ]);
    };
    AcThrowArrowGetRewardPopupView.prototype.dispose = function () {
        // this._scrollList =null;
        TimerManager.remove(this.playAni, this);
        if (this._callBack) {
            this._callBack.apply(this.param.data.handler);
        }
        this._callBack = null;
        this._rewardArrList = [];
        this._count = 0;
        this._buttomBg = null;
        this._isPlayAni = null;
        this._otherContainer = null;
        this._otherRewardHeigth = null;
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowGetRewardPopupView;
}(BaseView));
__reflect(AcThrowArrowGetRewardPopupView.prototype, "AcThrowArrowGetRewardPopupView");
//# sourceMappingURL=AcThrowArrowGetRewardPopupView.js.map