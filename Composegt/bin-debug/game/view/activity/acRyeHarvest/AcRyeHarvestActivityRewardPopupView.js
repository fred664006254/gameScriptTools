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
 * 	拼图奖励活动奖励相关
 * author 张朝阳
 * date 2019/7/16
 * @class AcRyeHarvestActivityRewardPopupView
 */
var AcRyeHarvestActivityRewardPopupView = (function (_super) {
    __extends(AcRyeHarvestActivityRewardPopupView, _super);
    function AcRyeHarvestActivityRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._chargeBtn = null;
        _this._taskBtn = null;
        _this._shopBtn = null;
        _this._chargeContainer = null;
        _this._taskContainer = null;
        _this._shopContainer = null;
        _this._shopNotPartContainer = null;
        _this._shopHasPartContainer = null;
        /**充值奖励ScrollList */
        _this._chargeScrollList = null;
        _this._taskTabBar = null;
        _this._taskScrollList = null;
        _this._shopScrollList = null;
        _this._isCharge = false;
        _this._isTask = false;
        _this._isShop = false;
        _this._containerType = 0;
        _this._dayId = 1;
        _this._tabType = 0;
        _this._gemTF = null;
        _this._gemTF2 = null;
        _this._gemTF3 = null;
        return _this;
    }
    AcRyeHarvestActivityRewardPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_RYEHARVEST_GETCHARGE, this.chargeHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_RYEHARVEST_GETRYEHARVESTTASK, this.taskHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_RYEHARVEST_BUYRYEHARVESTSHOP, this.shopHandle, this);
    };
    /**
     * 刷新UI
     */
    AcRyeHarvestActivityRewardPopupView.prototype.refreashView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        if (vo.getpublicRedhot2()) {
            App.CommonUtil.addIconToBDOC(this._chargeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._chargeBtn);
        }
        if (vo.checTaskRedDot()) {
            App.CommonUtil.addIconToBDOC(this._taskBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
        }
        if (this._chargeScrollList) {
            var chargelist = vo.getSortRechargeCfg();
            chargelist.sort(function (a, b) { return a.sortId - b.sortId; });
            this._chargeScrollList.refreshData(chargelist, { aid: this.param.data.aid, code: this.param.data.code });
        }
        if (this._taskScrollList) {
            var tasklist = vo.getSortTaskCfg(String(this._dayId));
            tasklist.sort(function (a, b) { return a.sortId - b.sortId; });
            this._taskScrollList.refreshData(tasklist, { aid: this.param.data.aid, code: this.param.data.code, dayId: this._dayId });
        }
        this.refreashTabBar();
        if (this._shopScrollList) {
            this._shopScrollList.refreshData(cfg.getShopCfgList(), { aid: this.param.data.aid, code: this.param.data.code });
        }
        if (this._gemTF) {
            this._gemTF.text = String(Api.playerVoApi.getPlayerGem());
        }
        if (this._gemTF2) {
            this._gemTF2.text = String(Api.playerVoApi.getPlayerGem());
        }
        if (this._gemTF3) {
            this._gemTF3.text = String(Api.itemVoApi.getItemNumInfoVoById(2011));
        }
    };
    /**tab 刷新 */
    AcRyeHarvestActivityRewardPopupView.prototype.refreashTabBar = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        if (this._taskTabBar) {
            if (vo.checTaskRedDot1()) {
                this._taskTabBar.addRedPoint(0);
            }
            else {
                this._taskTabBar.removeRedPoint(0);
            }
            if (vo.checTaskRedDot2()) {
                this._taskTabBar.addRedPoint(1);
            }
            else {
                this._taskTabBar.removeRedPoint(1);
            }
            if (vo.checTaskRedDot3()) {
                this._taskTabBar.addRedPoint(2);
            }
            else {
                this._taskTabBar.removeRedPoint(2);
            }
        }
    };
    /**充值奖励返回 */
    AcRyeHarvestActivityRewardPopupView.prototype.chargeHandle = function (event) {
        if (event.data.ret) {
            var specialGift = event.data.data.data.specialGift;
            var rewards = event.data.data.data.rewards;
            if (specialGift) {
                rewards = "1007_0_" + specialGift + "_" + this.getUiCode() + "|" + event.data.data.data.rewards;
            }
            var rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
    };
    /** 任务奖励返回 */
    AcRyeHarvestActivityRewardPopupView.prototype.taskHandle = function (event) {
        if (event.data.ret) {
            var specialReward = event.data.data.data.specialReward;
            var rewards = event.data.data.data.rewards;
            if (specialReward) {
                rewards = "1007_0_" + specialReward + "_" + this.getUiCode() + "|" + event.data.data.data.rewards;
            }
            var rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
    };
    /** 任务奖励返回 */
    AcRyeHarvestActivityRewardPopupView.prototype.shopHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
    };
    /**
     * 重置高度
     */
    AcRyeHarvestActivityRewardPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.x -= 35;
        this._chargeBtn = ComponentManager.getButton("acmotherdayview_rechargebtn-" + this.getUiCode(), "", this.chargeBtnClick, this);
        this._chargeBtn.setPosition(this.viewBg.x + 65, 0);
        this.addChildToContainer(this._chargeBtn);
        this._taskBtn = ComponentManager.getButton("acmotherdayview_taskbtn-" + this.getUiCode(), "", this.taskBtnClick, this);
        this._taskBtn.setPosition(this.viewBg.x + 235, 0);
        this.addChildToContainer(this._taskBtn);
        this._shopBtn = ComponentManager.getButton("acmotherdayview_shopbtn-" + this.getUiCode(), "", this.shopBtnClick, this);
        this._shopBtn.setPosition(this.viewBg.x + 405, 0);
        this.addChildToContainer(this._shopBtn);
        if (this.param && this.param.data && this.param.data.type) {
            if (this.param.data.type == 2) {
                // this.rankBtnClick();
            }
            if (this.param.data.type == 3) {
                // this.rechargeBtnClick();
            }
        }
        else {
            this.chargeBtnClick();
        }
        this.refreashView();
    };
    /**
     * 充值说明事件
     */
    AcRyeHarvestActivityRewardPopupView.prototype.chargeBtnClick = function () {
        this._containerType = 1;
        if (this._isCharge) {
            return;
        }
        this._isCharge = true;
        this._isShop = false;
        this._isTask = false;
        this._chargeBtn.touchEnabled = false;
        this._taskBtn.touchEnabled = true;
        this._shopBtn.touchEnabled = true;
        this._chargeBtn.updateButtonImage(BaseButton.BTN_STATE2);
        this._taskBtn.updateButtonImage(BaseButton.BTN_STATE1);
        this._shopBtn.updateButtonImage(BaseButton.BTN_STATE1);
        this.showChargeUI();
    };
    /**
     * 充值奖励UI
     */
    AcRyeHarvestActivityRewardPopupView.prototype.showChargeUI = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var list = vo.getSortRechargeCfg();
        list.sort(function (a, b) { return a.sortId - b.sortId; });
        if (this._taskContainer && (this.container.getChildByName("taskContainer"))) {
            this.container.removeChild(this._taskContainer);
        }
        if (this._shopContainer && (this.container.getChildByName("shopContainer"))) {
            this.container.removeChild(this._shopContainer);
        }
        if (this._chargeContainer) {
            this._chargeScrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code });
            this.addChildToContainer(this._chargeContainer);
            return;
        }
        this._chargeContainer = new BaseDisplayObjectContainer();
        this._chargeContainer.name = "chargeContainer";
        this.addChildToContainer(this._chargeContainer);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 624;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._chargeBtn.y + this._chargeBtn.height + 5);
        this._chargeContainer.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 20);
        this._chargeScrollList = ComponentManager.getScrollList(AcRyeHarvestActivityRewardChargeScrollItem, list, rect, { aid: this.param.data.aid, code: this.param.data.code });
        this._chargeScrollList.setPosition(bg.x + 5, bg.y + 10);
        this._chargeScrollList.bounces = false;
        this._chargeContainer.addChild(this._chargeScrollList);
    };
    /**
     * 任务说明事件
     */
    AcRyeHarvestActivityRewardPopupView.prototype.taskBtnClick = function () {
        this._containerType = 2;
        if (this._isTask) {
            return;
        }
        this._isCharge = false;
        this._isShop = false;
        this._isTask = true;
        this._chargeBtn.touchEnabled = true;
        this._taskBtn.touchEnabled = false;
        this._shopBtn.touchEnabled = true;
        this._chargeBtn.updateButtonImage(BaseButton.BTN_STATE1);
        this._taskBtn.updateButtonImage(BaseButton.BTN_STATE2);
        this._shopBtn.updateButtonImage(BaseButton.BTN_STATE1);
        this.showTaskUI();
    };
    /**
     * 任务奖励UI
     */
    AcRyeHarvestActivityRewardPopupView.prototype.showTaskUI = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        if (this._chargeContainer && (this.container.getChildByName("chargeContainer"))) {
            this.container.removeChild(this._chargeContainer);
        }
        if (this._shopContainer && (this.container.getChildByName("shopContainer"))) {
            this.container.removeChild(this._shopContainer);
        }
        if (this._taskContainer) {
            this.taskTabBarClick({ index: this._tabType });
            this.refreashTabBar();
            this.addChildToContainer(this._taskContainer);
            return;
        }
        this._taskContainer = new BaseDisplayObjectContainer();
        this._taskContainer.name = "taskContainer";
        this.addChildToContainer(this._taskContainer);
        var tabarArr = ["acRyeHarvestActivityRewardTaskTab1-" + this.param.data.code, "acRyeHarvestActivityRewardTaskTab2-" + this.param.data.code, "acRyeHarvestActivityRewardTaskTab3-" + this.param.data.code];
        this._taskTabBar = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabarArr, this.taskTabBarClick, this);
        this._taskTabBar.setPosition(this.viewBg.x + 25, this._taskBtn.y + this._taskBtn.height + 5);
        this._taskContainer.addChild(this._taskTabBar);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 624 - 46;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._taskTabBar.y + this._taskTabBar.height);
        this._taskContainer.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 20);
        this._taskScrollList = ComponentManager.getScrollList(AcRyeHarvestActivityRewardTaskScrollItem, null, rect, { dayId: this._dayId, aid: this.param.data.aid, code: this.param.data.code });
        this._taskScrollList.setPosition(bg.x + 5, bg.y + 10);
        this._taskScrollList.bounces = false;
        this._taskContainer.addChild(this._taskScrollList);
        this._tabType = Number(vo.getNowDayTask()) - 1;
        this.taskTabBarClick({ index: this._tabType });
        this._taskTabBar.selectedIndex = this._tabType;
        this.refreashTabBar();
    };
    /**Tab 事件 */
    AcRyeHarvestActivityRewardPopupView.prototype.taskTabBarClick = function (data) {
        this._tabType = data.index;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        if (data.index == 0) {
            this._dayId = 1;
            var list = vo.getSortTaskCfg(String(this._dayId));
            list.sort(function (a, b) { return a.sortId - b.sortId; });
            this._taskScrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code, dayId: this._dayId });
        }
        else if (data.index == 1) {
            this._dayId = 2;
            var list = vo.getSortTaskCfg(String(this._dayId));
            list.sort(function (a, b) { return a.sortId - b.sortId; });
            this._taskScrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code, dayId: this._dayId });
        }
        else if (data.index == 2) {
            this._dayId = 3;
            var list = vo.getSortTaskCfg(String(this._dayId));
            list.sort(function (a, b) { return a.sortId - b.sortId; });
            this._taskScrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code, dayId: this._dayId });
        }
    };
    /**
     * 充值说明事件
     */
    AcRyeHarvestActivityRewardPopupView.prototype.shopBtnClick = function () {
        this._containerType = 3;
        if (this._isShop) {
            return;
        }
        this._isCharge = false;
        this._isShop = true;
        this._isTask = false;
        this._chargeBtn.touchEnabled = true;
        this._taskBtn.touchEnabled = true;
        this._shopBtn.touchEnabled = false;
        this._chargeBtn.updateButtonImage(BaseButton.BTN_STATE1);
        this._taskBtn.updateButtonImage(BaseButton.BTN_STATE1);
        this._shopBtn.updateButtonImage(BaseButton.BTN_STATE2);
        this.showShopUI();
    };
    /**
     * 充值奖励UI
     */
    AcRyeHarvestActivityRewardPopupView.prototype.showShopUI = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        // let list = vo.getSortRechargeCfg();
        // list.sort((a, b) => { return a.sortId - b.sortId });
        if (this._taskContainer && (this.container.getChildByName("taskContainer"))) {
            this.container.removeChild(this._taskContainer);
        }
        if (this._chargeContainer && (this.container.getChildByName("chargeContainer"))) {
            this.container.removeChild(this._chargeContainer);
        }
        if (this._shopContainer) {
            this._shopHasPartContainer.setVisible(false);
            this._shopNotPartContainer.setVisible(true);
            this.addChildToContainer(this._shopContainer);
            return;
        }
        this._shopContainer = new BaseDisplayObjectContainer();
        this._shopContainer.name = "shopContainer";
        this.addChildToContainer(this._shopContainer);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 624;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._chargeBtn.y + this._chargeBtn.height + 5);
        this._shopContainer.addChild(bg);
        this._shopNotPartContainer = new BaseDisplayObjectContainer();
        this._shopContainer.addChild(this._shopNotPartContainer);
        var itembg = BaseBitmap.create("specialview_commoni_namebg");
        itembg.setPosition(bg.x + bg.width / 2 - itembg.width / 2, bg.y + 25 - itembg.height / 2);
        this._shopNotPartContainer.addChild(itembg);
        var needIconScale = 0.4;
        var itemGem = BaseLoadBitmap.create("itemicon1");
        itemGem.width = 100;
        itemGem.height = 100;
        itemGem.setScale(needIconScale);
        itemGem.setPosition(itembg.x, itembg.y + itembg.height / 2 - itemGem.height / 2 * needIconScale);
        this._shopNotPartContainer.addChild(itemGem);
        this._gemTF = ComponentManager.getTextField(String(Api.playerVoApi.getPlayerGem()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._gemTF.setPosition(itemGem.x + itemGem.width * needIconScale, itembg.y + itembg.height / 2 - this._gemTF.height / 2);
        this._shopNotPartContainer.addChild(this._gemTF);
        this._shopHasPartContainer = new BaseDisplayObjectContainer();
        this._shopContainer.addChild(this._shopHasPartContainer);
        var itembg2 = BaseBitmap.create("specialview_commoni_namebg");
        itembg2.setPosition(bg.x + bg.width / 2 - itembg2.width - 50, bg.y + 25 - itembg2.height / 2);
        this._shopHasPartContainer.addChild(itembg2);
        var itemGem2 = BaseLoadBitmap.create("itemicon1");
        itemGem2.width = 100;
        itemGem2.height = 100;
        itemGem2.setScale(needIconScale);
        itemGem2.setPosition(itembg2.x, itembg2.y + itembg2.height / 2 - itemGem2.height / 2 * needIconScale);
        this._shopHasPartContainer.addChild(itemGem2);
        this._gemTF2 = ComponentManager.getTextField(String(Api.playerVoApi.getPlayerGem()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._gemTF2.setPosition(itemGem2.x + itemGem2.width * needIconScale, itembg2.y + itembg2.height / 2 - this._gemTF2.height / 2);
        this._shopHasPartContainer.addChild(this._gemTF2);
        var itembg3 = BaseBitmap.create("specialview_commoni_namebg");
        itembg3.setPosition(bg.x + bg.width / 2 + 50, bg.y + 25 - itembg3.height / 2);
        this._shopHasPartContainer.addChild(itembg3);
        var itemGem3 = BaseLoadBitmap.create("itemicon2011");
        itemGem3.width = 100;
        itemGem3.height = 100;
        itemGem3.setScale(needIconScale);
        itemGem3.setPosition(itembg3.x, itembg3.y + itembg3.height / 2 - itemGem3.height / 2 * needIconScale);
        this._shopHasPartContainer.addChild(itemGem3);
        this._gemTF3 = ComponentManager.getTextField(String(Api.itemVoApi.getItemNumInfoVoById(2011)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._gemTF3.setPosition(itemGem3.x + itemGem3.width * needIconScale, itembg3.y + itembg3.height / 2 - this._gemTF3.height / 2);
        this._shopHasPartContainer.addChild(this._gemTF3);
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 20 - 35);
        this._shopScrollList = ComponentManager.getScrollList(AcRyeHarvestActivityRewardShopScrollItem, cfg.getShopCfgList(), rect, { aid: this.param.data.aid, code: this.param.data.code });
        this._shopScrollList.setPosition(bg.x + 5, bg.y + 10 + 35);
        this._shopScrollList.bounces = false;
        this._shopContainer.addChild(this._shopScrollList);
        this._shopHasPartContainer.setVisible(false);
        this._shopNotPartContainer.setVisible(true);
    };
    AcRyeHarvestActivityRewardPopupView.prototype.getTitleStr = function () {
        return "acRyeHarvestActivityRewardPopupViewTitle-" + this.param.data.code;
    };
    AcRyeHarvestActivityRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accarnivalview_tab_green", "accarnivalview_tab_red", "progress5", "progress3_bg", "activity_charge_red", "specialview_commoni_namebg",
            "shopview_corner"
        ]);
    };
    AcRyeHarvestActivityRewardPopupView.prototype.getUiCode = function () {
        if (this.param.data.code == "4") {
            return "3";
        }
        return this.param.data.code;
    };
    AcRyeHarvestActivityRewardPopupView.prototype.getShowHeight = function () {
        return 840;
    };
    AcRyeHarvestActivityRewardPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_RYEHARVEST_GETCHARGE, this.chargeHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_RYEHARVEST_GETRYEHARVESTTASK, this.taskHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_RYEHARVEST_BUYRYEHARVESTSHOP, this.shopHandle, this);
        this._chargeBtn = null;
        this._taskBtn = null;
        this._shopBtn = null;
        this._chargeContainer = null;
        this._taskContainer = null;
        this._shopContainer = null;
        this._chargeScrollList = null;
        this._taskScrollList = null;
        this._shopNotPartContainer = null;
        this._shopHasPartContainer = null;
        this._taskTabBar = null;
        this._isCharge = false;
        this._isTask = false;
        this._isShop = false;
        this._containerType = 0;
        this._dayId = 1;
        this._tabType = 0;
        this._shopScrollList = null;
        this._gemTF = null;
        this._gemTF2 = null;
        this._gemTF3 = null;
        _super.prototype.dispose.call(this);
    };
    return AcRyeHarvestActivityRewardPopupView;
}(PopupView));
__reflect(AcRyeHarvestActivityRewardPopupView.prototype, "AcRyeHarvestActivityRewardPopupView");
