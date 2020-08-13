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
 * 限时活动奖励
 * author dmj
 * date 2017/11/07
 * @class AcLimitedRewardView
 */
var AcLimitedRewardView = (function (_super) {
    __extends(AcLimitedRewardView, _super);
    function AcLimitedRewardView() {
        var _this = _super.call(this) || this;
        _this._activeCfgList = [];
        _this._getAllRewardBtn = null;
        _this._actTimeArr = [];
        _this._isGetAll = false;
        return _this;
    }
    AcLimitedRewardView.prototype.getContainerY = function () {
        return 14;
    };
    AcLimitedRewardView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD), this.useCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LIMITREWARD_ITEM_CLICK, this.refreshList, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETALLLIMITEDREWARD, this.getAllRewardCallback, this);
        this.refreshList();
        // let cfg:Config.AcCfg.LimitedRewardCfg = <Config.AcCfg.LimitedRewardCfg>this.acVo.config;
        // this._activeCfgList = cfg.getLimitedRewardItemList();
        var temW = GameConfig.stageWidth - 10;
        var temH = GameConfig.stageHeigth - 160;
        var desc = this.acVo && this.acVo.checkIsHasExtraTime() ? "limitedRewardDesc" : "limitedRewardDesc_old";
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal(desc), TextFieldConst.FONTSIZE_TITLE_SMALL);
        descTF.x = GameConfig.stageWidth / 2 - descTF.width / 2;
        descTF.y = 5;
        this.addChildToContainer(descTF);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = temW;
        bg.height = temH;
        bg.x = 5;
        bg.y = descTF.y + descTF.height + 15;
        this.addChildToContainer(bg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, temW - 10, temH - 10 - 80);
        this._scrollList = ComponentManager.getScrollList(AcLimitedRewardScrollItem, this._activeCfgList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(10, bg.y + 10);
        if (Api.playerVoApi.getPlayerVipLevel() >= 3 || Api.playerVoApi.getPlayerLevel() >= 10) {
            //一键领取
            var getAllRewardBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "acLimitedRewardGetAll", this.getAllRewardBtnClick, this);
            getAllRewardBtn.setPosition(bg.x + bg.width / 2 - getAllRewardBtn.width / 2, bg.y + bg.height - 40 - getAllRewardBtn.height / 2);
            this.addChildToContainer(getAllRewardBtn);
            this._getAllRewardBtn = getAllRewardBtn;
            if (this.isCanGetAllReward()) {
                this._getAllRewardBtn.setGray(false);
            }
            else {
                this._getAllRewardBtn.setGray(true);
            }
        }
        else {
            var allText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            allText.text = LanguageManager.getlocal("limitedGetAllTip");
            allText.setPosition(bg.x + bg.width / 2 - allText.width / 2, bg.y + bg.height - 35 - allText.height / 2);
            this.addChildToContainer(allText);
        }
    };
    AcLimitedRewardView.prototype.getAllRewardBtnClick = function () {
        if (this.isCanGetAllReward()) {
            if (this._isGetAll) {
                return;
            }
            this._isGetAll = true;
            var uid = Api.playerVoApi.getPlayerID();
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETALLLIMITEDREWARD, { "uid": uid });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLimitedRewardGetAllTip"));
        }
    };
    AcLimitedRewardView.prototype.getAllRewardCallback = function (evt) {
        this._isGetAll = false;
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var rewardList = GameData.formatRewardItem(rData.rewards);
        this._actTimeArr = App.CommonUtil.playRewardFlyAction(rewardList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
        if (this._scrollList) {
            this._scrollList.refreshData(this._activeCfgList);
        }
        if (this._getAllRewardBtn) {
            if (this.isCanGetAllReward()) {
                this._getAllRewardBtn.setGray(false);
            }
            else {
                this._getAllRewardBtn.setGray(true);
            }
        }
    };
    AcLimitedRewardView.prototype.isCanGetAllReward = function () {
        if (this._activeCfgList.length > 0) {
            for (var i = 0; i < this._activeCfgList.length; i++) {
                var vo = this._activeCfgList[i];
                if (vo && vo.isStart && vo.isShowRedDot) {
                    return true;
                }
            }
        }
        return false;
    };
    AcLimitedRewardView.prototype.getRuleInfo = function () {
        if (this.acVo && this.acVo.checkIsHasExtraTime()) {
            return _super.prototype.getRuleInfo.call(this);
        }
        return null;
    };
    AcLimitedRewardView.prototype.refreshList = function () {
        var list = Api.acVoApi.getActivityVoListByAid(this.aid);
        list.sort(function (a, b) {
            // 有红点的在前，没红点的在后
            if (a.red != b.red) {
                return a.red ? -1 : 1;
            }
            return a.code - b.code;
        });
        this._activeCfgList.length = 0;
        for (var key in list) {
            if (list.hasOwnProperty(key)) {
                var vo = list[key];
                if (vo && vo.isStart) {
                    this._activeCfgList.push(vo);
                }
            }
        }
        if (this._scrollList) {
            this._scrollList.refreshData(this._activeCfgList);
        }
    };
    AcLimitedRewardView.prototype.getTitleStr = function () {
        return "ac" + App.StringUtil.firstCharToUper(this.aid) + "_Title";
    };
    AcLimitedRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress6_bg", "dinner_rankbg", "dinnerrankpopupview", "dinner_rank_titlebg", "achievement_state3",
            "common_titlebg", "signin_had_get"
        ]);
    };
    AcLimitedRewardView.prototype.useCallback = function (event) {
        for (var i = 0; i < this._activeCfgList.length; i++) {
            var acLimitedRewardScrollItem = this._scrollList.getItemByIndex(i);
            if (acLimitedRewardScrollItem) {
                acLimitedRewardScrollItem.checkBtnState();
            }
        }
        if (this._getAllRewardBtn) {
            if (this.isCanGetAllReward()) {
                this._getAllRewardBtn.setGray(false);
            }
            else {
                this._getAllRewardBtn.setGray(true);
            }
        }
    };
    AcLimitedRewardView.prototype.tick = function () {
    };
    AcLimitedRewardView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD), this.useCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LIMITREWARD_ITEM_CLICK, this.refreshList, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETALLLIMITEDREWARD, this.getAllRewardCallback, this);
        this._scrollList = null;
        this._activeCfgList = [];
        this._getAllRewardBtn = null;
        if (this._actTimeArr.length > 0) {
            for (var i = 0; i < this._actTimeArr.length; i++) {
                egret.clearTimeout(this._actTimeArr[i]);
            }
        }
        this._actTimeArr = [];
        this._isGetAll = false;
        _super.prototype.dispose.call(this);
    };
    return AcLimitedRewardView;
}(AcCommonView));
__reflect(AcLimitedRewardView.prototype, "AcLimitedRewardView");
//# sourceMappingURL=AcLimitedRewardView.js.map