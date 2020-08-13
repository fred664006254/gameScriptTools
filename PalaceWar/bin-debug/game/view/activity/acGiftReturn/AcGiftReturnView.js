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
  * 好礼相送 活动
  * @author 张朝阳
  * date 2019/6/24
  * @class AcGiftReturnView
  */
var AcGiftReturnView = (function (_super) {
    __extends(AcGiftReturnView, _super);
    function AcGiftReturnView() {
        var _this = _super.call(this) || this;
        _this._countDownTime = null;
        _this._countDownTimeBg = null;
        _this._progress = null;
        _this._chargeBtn = null;
        _this._receiveBtn = null;
        _this._receiveNumTF = null;
        _this._itemNumTF = null;
        _this._showContainerNumber = 5;
        _this._endPosX = 0;
        _this._giftReturnList = [];
        _this._scrolV = null;
        _this._midBg = null;
        return _this;
    }
    AcGiftReturnView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.resetItems, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GIFTRETURNGETTASK, this.taskRewardHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GIFTRETURNEXCHANGE, this.chargekRewardHandle, this);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var getItemVo = GameData.formatRewardItem(cfg.task.getReward)[0];
        var titlebg = BaseLoadBitmap.create("acgiftreturnview_titlebg-" + this.getUiCode());
        titlebg.width = 640;
        titlebg.height = 92;
        var topBg = BaseLoadBitmap.create("acgiftreturnview_topbg-" + this.getUiCode());
        topBg.width = 640;
        topBg.height = 150;
        topBg.setPosition(0, titlebg.y + titlebg.height - 7);
        this.addChildToContainer(topBg);
        var descBg = BaseLoadBitmap.create("acgiftreturnview_descbg-" + this.getUiCode());
        descBg.width = 595;
        descBg.height = 129;
        descBg.setPosition(topBg.x + topBg.width / 2 - descBg.width / 2, topBg.y + topBg.height / 2 - descBg.height / 2);
        this.addChildToContainer(descBg);
        var acTime = ComponentManager.getTextField(LanguageManager.getlocal("acGiftReturnfView_acTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        acTime.setPosition(descBg.x + 38, descBg.y + 25);
        this.addChildToContainer(acTime);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acGiftReturnView_acDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        descTF.width = 520;
        descTF.lineSpacing = 3;
        descTF.setPosition(acTime.x, acTime.y + acTime.height + 5);
        this.addChildToContainer(descTF);
        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
        this._countDownTimeBg.y = descBg.y + descBg.height - this._countDownTimeBg.height / 2 - 8;
        this.addChildToContainer(this._countDownTimeBg);
        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acGiftReturnView_acCountTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);
        var curtainBg = BaseLoadBitmap.create("acgiftreturnview_curtain-" + this.getUiCode());
        curtainBg.width = 640;
        curtainBg.height = 150;
        curtainBg.setPosition(topBg.x, topBg.y);
        this.addChildToContainer(curtainBg);
        this.addChildToContainer(titlebg);
        var midBg = BaseBitmap.create("acgiftreturnview_common_midbg");
        midBg.width = 640;
        midBg.height = 555;
        midBg.setPosition(0, topBg.y + topBg.height);
        this.addChildToContainer(midBg);
        this._midBg = midBg;
        var l = cfg.claimItemCfgList.length;
        if (l < this._showContainerNumber) {
            var scrolNode = new BaseDisplayObjectContainer();
            scrolNode.height = 530;
            scrolNode.width = l * 179;
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, 530);
            var scrolV = ComponentManager.getScrollView(scrolNode, rect);
            scrolV.setPosition(midBg.x, midBg.y + midBg.height / 2 - scrolV.height / 2);
            scrolV.bounces = false;
            this.addChildToContainer(scrolV);
            this._scrolV = scrolV;
            for (var i = 0; i < l; i++) {
                var itemCfg = cfg.claimItemCfgList[i];
                var container = new AcGiftReturnItem();
                container.init(itemCfg, this.aid, this.code);
                container.setPosition(i * (container.width), 0);
                scrolNode.addChild(container);
            }
        }
        else if (l >= this._showContainerNumber) {
            this._giftReturnList = [];
            for (var i = 0; i < l; i++) {
                var itemCfg = cfg.claimItemCfgList[i];
                var container = new AcGiftReturnItem();
                container.init(itemCfg, this.aid, this.code);
                container.setPosition(i * (container.width), midBg.y + midBg.height / 2 - container.height / 2);
                this.addChildToContainer(container);
                this.playAni(container, i, container.x, l);
                if (i == (l - 1)) {
                    this._endPosX = container.x;
                }
                this._giftReturnList.push(container);
            }
        }
        // else if (l > this._showContainerNumber) {
        //     // for (let i = 0; i < (this._showContainerNumber + 1); i++) {
        //     //     let skinContainer = this.getPoolContainer(keys[i]);
        //     //     skinContainer.setPosition(180 * (i - 1), 195);
        //     //     if (i == 0) {
        //     //         skinContainer.visible = false;
        //     //     }
        //     //     let pos = { x: skinContainer.x, y: skinContainer.y, visible: skinContainer.visible };
        //     //     this._containerList.push(skinContainer);
        //     //     this._posList.push(pos);
        //     // }
        //     // this._startPosX = this._posList[0].x;
        //     // this.movePos();
        // }
        var buttomBg = BaseLoadBitmap.create("acgiftreturnview_buttombg-" + this.getUiCode());
        buttomBg.width = 640;
        buttomBg.height = 71;
        buttomBg.setPosition(0, GameConfig.stageHeigth - buttomBg.height);
        this.addChildToContainer(buttomBg);
        this._chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "gotocharge", function () {
            var v = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
            if ((!v.isStart) || v.checkIsInEndShowTime()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }, this);
        this._chargeBtn.setPosition(buttomBg.x + buttomBg.width / 2 - this._chargeBtn.width / 2, buttomBg.y + buttomBg.height / 2 - this._chargeBtn.height / 2);
        this.addChildToContainer(this._chargeBtn);
        if (vo.checkIsInEndShowTime()) {
            this._chargeBtn.setGray(true);
        }
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", function () {
            var v = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
            if ((!v.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GIFTRETURNGETTASK, { activeId: v.aidAndCode });
        }, this);
        this._receiveBtn.setPosition(buttomBg.x + buttomBg.width / 2 - this._receiveBtn.width / 2, buttomBg.y + buttomBg.height / 2 - this._receiveBtn.height / 2);
        this.addChildToContainer(this._receiveBtn);
        var buttomBg2 = BaseLoadBitmap.create("acgiftreturnview_buttomredbg-" + this.getUiCode());
        buttomBg2.width = 640;
        buttomBg2.height = buttomBg.y - midBg.y - midBg.height;
        buttomBg2.setPosition(buttomBg.x, buttomBg.y - buttomBg2.height);
        this.addChildToContainer(buttomBg2);
        var itembg = BaseBitmap.create("acgiftreturnview_common_itembg");
        itembg.setPosition(buttomBg2.x + 25, buttomBg2.y + buttomBg2.height - 2 - itembg.height);
        this.addChildToContainer(itembg);
        var itemScale = 0.65;
        var item = BaseLoadBitmap.create("itemicon" + cfg.getItemVo().id); //65--43
        item.width = 100;
        item.height = 100;
        item.setScale(itemScale);
        item.setPosition(itembg.x + itembg.width / 2 - item.width / 2 * itemScale, itembg.y + itembg.height / 2 - item.height / 2 * itemScale);
        this.addChildToContainer(item);
        var itemNumbg = BaseBitmap.create("acgiftreturnview_common_itemnumbg");
        itemNumbg.setPosition(itembg.x + itembg.width - itemNumbg.width / 2, itembg.y - 3);
        this.addChildToContainer(itemNumbg);
        var itemRewardNumTF = ComponentManager.getTextField("x" + getItemVo.num, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        itemRewardNumTF.setPosition(itemNumbg.x + itemNumbg.width / 2 - itemRewardNumTF.width / 2, itemNumbg.y + itemNumbg.height / 2 - itemRewardNumTF.height / 2);
        this.addChildToContainer(itemRewardNumTF);
        this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 520);
        this._progress.setPosition(itembg.x + itembg.width + 10, buttomBg2.y + buttomBg2.height - this._progress.height - 5);
        this.addChildToContainer(this._progress);
        this._progress.setPercentage(vo.getChargeValue() / cfg.task.value, String(vo.getChargeValue()) + "/" + String(cfg.task.value) + " " + LanguageManager.getlocal("itemType1"));
        this._receiveNumTF = ComponentManager.getTextField(LanguageManager.getlocal("acGiftReturnView_ReceiveNum-" + this.code, [String(vo.getReceiveNum()), String(cfg.task.times), String(getItemVo.num), getItemVo.name]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._receiveNumTF.setPosition(this._progress.x + this._progress.width / 2 - this._receiveNumTF.width / 2, this._progress.y - this._receiveNumTF.height - 7);
        this.addChildToContainer(this._receiveNumTF);
        var numBg = BaseLoadBitmap.create("acgiftreturnview_common_numbg");
        numBg.width = 640;
        numBg.height = 31;
        numBg.setPosition(buttomBg2.x, this._receiveNumTF.y - numBg.height - 10);
        this.addChildToContainer(numBg);
        var itemBMScale = 0.43;
        var itemBM = BaseLoadBitmap.create("itemicon" + cfg.getItemVo().id);
        itemBM.width = 100;
        itemBM.height = 100;
        itemBM.setScale(itemBMScale);
        itemBM.setPosition(numBg.x + 250, numBg.y + numBg.height / 2 - itemBM.height / 2 * itemBMScale);
        this.addChildToContainer(itemBM);
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(cfg.getItemVo().id);
        this._itemNumTF = ComponentManager.getTextField(LanguageManager.getlocal("acGiftReturnView_ItemNum-" + this.code, [String(itemNum)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._itemNumTF.setPosition(itemBM.x + itemBM.width * itemBMScale + 2, numBg.y + numBg.height - this._itemNumTF.height - 3);
        this.addChildToContainer(this._itemNumTF);
        this.tick();
        this.refreshView();
    };
    AcGiftReturnView.prototype.resetItems = function () {
        if (this._scrolV) {
            this._scrolV.dispose();
            this._scrolV = null;
        }
        else {
            return;
        }
        for (var i_1 = 0; i_1 < this._giftReturnList.length; i_1++) {
            this._giftReturnList[i_1].dispose();
        }
        this._giftReturnList.length = 0;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var getItemVo = GameData.formatRewardItem(cfg.task.getReward)[0];
        var l = cfg.claimItemCfgList.length;
        var midBg = this._midBg;
        if (l < this._showContainerNumber) {
            var scrolNode = new BaseDisplayObjectContainer();
            scrolNode.height = 530;
            scrolNode.width = l * 179;
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, 530);
            var scrolV = ComponentManager.getScrollView(scrolNode, rect);
            scrolV.setPosition(midBg.x, midBg.y + midBg.height / 2 - scrolV.height / 2);
            scrolV.bounces = false;
            this.addChildToContainer(scrolV);
            this._scrolV = scrolV;
            for (var i = 0; i < l; i++) {
                var itemCfg = cfg.claimItemCfgList[i];
                var container = new AcGiftReturnItem();
                container.init(itemCfg, this.aid, this.code);
                container.setPosition(i * (container.width), 0);
                scrolNode.addChild(container);
            }
        }
        else if (l >= this._showContainerNumber) {
            for (var i = 0; i < l; i++) {
                var itemCfg = cfg.claimItemCfgList[i];
                var container = new AcGiftReturnItem();
                container.init(itemCfg, this.aid, this.code);
                container.setPosition(i * (container.width), midBg.y + midBg.height / 2 - container.height / 2);
                this.addChildToContainer(container);
                this.playAni(container, i, container.x, l);
                if (i == (l - 1)) {
                    this._endPosX = container.x;
                }
                this._giftReturnList.push(container);
            }
        }
    };
    AcGiftReturnView.prototype.playAni = function (container, l, startX, len) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var offestWidth = 179;
        container.x = startX;
        egret.Tween.removeTweens(container);
        var view = this;
        // egret.Tween.get(container).to({ x: -offestWidth }, 25 * (startX + offestWidth)).call(() => {
        //     egret.Tween.removeTweens(container);
        //     view._giftReturnList.sort((a, b) => {
        //         return a.x - b.x;
        //     })
        //     view.playAni(container, cfg.claimItemCfgList.length - 1, view._giftReturnList[view._giftReturnList.length - 1].x + offestWidth);
        // }, this);
        var endx = (len - 1) * offestWidth;
        egret.Tween.get(container, { loop: true }).
            to({ x: -offestWidth }, 25 * (startX + offestWidth)).
            to({ x: endx }, 0).
            to({ x: startX }, 25 * (endx - startX));
    };
    AcGiftReturnView.prototype.tick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._countDownTime.text = LanguageManager.getlocal("acGiftReturnView_acCountTime-" + this.code, [vo.acCountDown]);
        }
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
    };
    AcGiftReturnView.prototype.refreshView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(cfg.getItemVo().id);
        this._itemNumTF.text = LanguageManager.getlocal("acGiftReturnView_ItemNum-" + this.code, [String(itemNum)]);
        var getItemVo = GameData.formatRewardItem(cfg.task.getReward)[0];
        this._receiveNumTF.text = LanguageManager.getlocal("acGiftReturnView_ReceiveNum-" + this.code, [String(vo.getReceiveNum()), String(cfg.task.times), String(getItemVo.num), getItemVo.name]);
        this._receiveNumTF.setPosition(this._progress.x + this._progress.width / 2 - this._receiveNumTF.width / 2, this._progress.y - this._receiveNumTF.height - 7);
        if (vo.checkReceiveEndReward()) {
            this._chargeBtn.setVisible(false);
            this._receiveBtn.setVisible(true);
            this._receiveBtn.setEnable(false);
            this._progress.setPercentage((cfg.task.value + vo.getChargeValue()) / cfg.task.value, String((cfg.task.value + vo.getChargeValue())) + "/" + String(cfg.task.value) + " " + LanguageManager.getlocal("itemType1"));
        }
        else {
            this._progress.setPercentage(vo.getChargeValue() / cfg.task.value, String(vo.getChargeValue()) + "/" + String(cfg.task.value) + " " + LanguageManager.getlocal("itemType1"));
            if (vo.checkReceiveReward()) {
                this._chargeBtn.setVisible(false);
                this._receiveBtn.setVisible(true);
                this._receiveBtn.setEnable(true);
            }
            else {
                this._chargeBtn.setVisible(true);
                this._receiveBtn.setVisible(false);
            }
        }
    };
    AcGiftReturnView.prototype.chargekRewardHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardsVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVo);
        }
    };
    AcGiftReturnView.prototype.taskRewardHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardsVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVo);
        }
    };
    AcGiftReturnView.prototype.getRuleInfo = function () {
        return "acGiftReturnRuleInfo-" + this.code;
    };
    AcGiftReturnView.prototype.getBgName = function () {
        return null;
    };
    AcGiftReturnView.prototype.getTitleBgName = function () {
        return null;
    };
    AcGiftReturnView.prototype.getTitleStr = function () {
        return null;
    };
    AcGiftReturnView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acgiftreturnview_common_midbg", "acgiftreturnview_common_itembg", "progress7", "progress7_bg",
            "acwealthcarpview_skineffect", "acgiftreturnview_common_skintxt", "acgiftreturnview_common_own",
            "acgiftreturnview_common_itemnumbg"
        ]);
    };
    AcGiftReturnView.prototype.getUiCode = function () {
        return _super.prototype.getUiCode.call(this);
    };
    AcGiftReturnView.prototype.getProbablyInfo = function () {
        return "";
    };
    AcGiftReturnView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.resetItems, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GIFTRETURNGETTASK, this.taskRewardHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GIFTRETURNEXCHANGE, this.chargekRewardHandle, this);
        this._countDownTime = null;
        this._countDownTimeBg = null;
        this._progress = null;
        this._chargeBtn = null;
        this._receiveBtn = null;
        this._receiveNumTF = null;
        this._itemNumTF = null;
        this._showContainerNumber = 5;
        this._giftReturnList = [];
        this._scrolV = null;
        this._midBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcGiftReturnView;
}(AcCommonView));
__reflect(AcGiftReturnView.prototype, "AcGiftReturnView");
//# sourceMappingURL=AcGiftReturnView.js.map