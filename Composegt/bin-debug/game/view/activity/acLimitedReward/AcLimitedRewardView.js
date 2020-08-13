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
        return _this;
    }
    AcLimitedRewardView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD), this.useCallback, this);
        this._activeCfgList = Api.acVoApi.getActivityVoListByAid(this.aid);
        // let cfg:Config.AcCfg.LimitedRewardCfg = <Config.AcCfg.LimitedRewardCfg>this.acVo.config;
        // this._activeCfgList = cfg.getLimitedRewardItemList();
        var wenziBg = BaseBitmap.create("servant_wenzibutiao");
        wenziBg.width = 640;
        wenziBg.height = 30;
        wenziBg.x = 0;
        wenziBg.y = -15;
        this.addChildToContainer(wenziBg);
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = 640;
        bottomBg.height = GameConfig.stageHeigth - 138;
        bottomBg.x = 0;
        bottomBg.y = 138;
        this.addChild(bottomBg);
        var temW = GameConfig.stageWidth - 10;
        var temH = GameConfig.stageHeigth - 160;
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("limitedRewardDesc"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF.x = GameConfig.stageWidth / 2 - descTF.width / 2;
        descTF.y = 5;
        this.addChildToContainer(descTF);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = temW;
        bg.height = temH;
        bg.x = 5;
        bg.y = descTF.y + descTF.height + 15;
        this.addChildToContainer(bg);
        bg.visible = false;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, temW - 10, temH - 10);
        this._scrollList = ComponentManager.getScrollList(AcLimitedRewardScrollItem, this._activeCfgList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(10, bg.y + 10);
    };
    AcLimitedRewardView.prototype.getTitleStr = function () {
        return "ac" + App.StringUtil.firstCharToUper(this.aid) + "_Title";
    };
    AcLimitedRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress6_bg", "dinner_rankbg", "dinnerrankpopupview", "achievement_state3",
            "common_titlebg", "servant_wenzibutiao", "activity_charge_red",
        ]);
    };
    AcLimitedRewardView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcLimitedRewardView.prototype.useCallback = function (event) {
        for (var i = 0; i < this._activeCfgList.length; i++) {
            var acLimitedRewardScrollItem = this._scrollList.getItemByIndex(i);
            if (acLimitedRewardScrollItem) {
                acLimitedRewardScrollItem.checkBtnState();
            }
        }
    };
    AcLimitedRewardView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD), this.useCallback, this);
        this._scrollList = null;
        this._activeCfgList = null;
        _super.prototype.dispose.call(this);
    };
    return AcLimitedRewardView;
}(AcCommonView));
__reflect(AcLimitedRewardView.prototype, "AcLimitedRewardView");
