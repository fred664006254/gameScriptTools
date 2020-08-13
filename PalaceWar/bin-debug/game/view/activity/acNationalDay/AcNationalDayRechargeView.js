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
 * 国庆节活动 国库
 * author yangchengguo
 * date 2019.9.10
 * @class AcNationalDayRechargeView
 */
var AcNationalDayRechargeView = (function (_super) {
    __extends(AcNationalDayRechargeView, _super);
    function AcNationalDayRechargeView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._tokenNumInfo = null;
        _this._tokenIcon = null;
        _this._tokenNum = null;
        _this._acDesc = null;
        return _this;
    }
    AcNationalDayRechargeView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETCHARGE, this.getChargeCallback, this);
        //活动介绍背景
        var acDescBgStr = ResourceManager.hasRes("acnationalday_infobg-" + this.getTypeCode()) ? "acnationalday_infobg-" + this.getTypeCode() : "acnationalday_infobg-1";
        var acDescBg = BaseBitmap.create(acDescBgStr);
        acDescBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - acDescBg.width / 2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(acDescBg);
        var descIconStr = ResourceManager.hasRes("acnationalday_charge_icon-" + this.getTypeCode()) ? "acnationalday_charge_icon-" + this.getTypeCode() : "acnationalday_charge_icon-1";
        var descIcon = BaseBitmap.create(descIconStr);
        descIcon.setPosition(0, acDescBg.y + acDescBg.height - descIcon.height - 7);
        this.addChildToContainer(descIcon);
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayChargeInfo-" + this.getTypeCode(), [String(1 / this.cfg.ratio)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acDesc.width = 440;
        acDesc.lineSpacing = 6;
        acDesc.setPosition(descIcon.x + descIcon.width + 5, acDescBg.y + 15);
        this.addChildToContainer(acDesc);
        this._acDesc = acDesc;
        var tokenNumInfo = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayTokenNumTitle-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tokenNumInfo.setPosition(acDesc.x, acDescBg.y + acDescBg.height - tokenNumInfo.height - 13);
        this.addChildToContainer(tokenNumInfo);
        this._tokenNumInfo = tokenNumInfo;
        var tokenIconStr = ResourceManager.hasRes("acnationalday_rewarditem_small_icon-" + this.getTypeCode()) ? "acnationalday_rewarditem_small_icon-" + this.getTypeCode() : "acnationalday_rewarditem_small_icon-1";
        var token = BaseBitmap.create(tokenIconStr);
        token.setPosition(tokenNumInfo.x + tokenNumInfo.width, tokenNumInfo.y + tokenNumInfo.height / 2 - token.height / 2);
        this.addChildToContainer(token);
        this._tokenIcon = token;
        var tokenNum = ComponentManager.getTextField("" + this.vo.getChargeNum(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tokenNum.setPosition(token.x + token.width, token.y + token.height / 2 - tokenNum.height / 2 + 2);
        this.addChildToContainer(tokenNum);
        this._tokenNum = tokenNum;
        var totalW = tokenNumInfo.width + token.width + tokenNum.width;
        tokenNumInfo.x = acDesc.x + acDesc.width / 2 - totalW / 2;
        token.x = tokenNumInfo.x + tokenNumInfo.width;
        tokenNum.x = token.x + token.width;
        var bottomBg = BaseBitmap.create("public_9_bg24");
        bottomBg.width = GameConfig.stageWidth - 10;
        bottomBg.height = GameConfig.stageHeigth - acDescBg.y - acDescBg.height - 10;
        bottomBg.x = 5;
        bottomBg.y = acDescBg.y + acDescBg.height + 5;
        this.addChildToContainer(bottomBg);
        var dataList = this.vo.getSortRechargeCfg();
        var rect = new egret.Rectangle(0, 0, bottomBg.width - 10, bottomBg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcNationalDayRechargeGroupScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(bottomBg.x + 5, bottomBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        var scrollData = this.vo.getCanRewardItemData();
        if (scrollData.index == 0 && scrollData.chargeIndex == 1) {
            return;
        }
        else {
            if (scrollData.chargeIndex == 0) {
                return;
            }
            var item = this._scrollList.getItemByIndex(scrollData.index);
            var chargeItem = item.getChargeItems()[scrollData.chargeIndex];
            var scrollY_1 = item.y + chargeItem.y;
            App.LogUtil.log("chargeitem: " + chargeItem.y);
            this._scrollList.setScrollTop(scrollY_1, 200);
        }
    };
    AcNationalDayRechargeView.prototype.getChargeCallback = function (evt) {
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    AcNationalDayRechargeView.prototype.refreshView = function () {
        App.LogUtil.log("nationalday rechargeview");
        var dataList = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
        this._tokenNum.text = "" + this.vo.getChargeNum();
        var totalW = this._tokenNumInfo.width + this._tokenIcon.width + this._tokenNum.width;
        this._tokenNumInfo.x = this._acDesc.x + this._acDesc.width / 2 - totalW / 2;
        this._tokenIcon.x = this._tokenNumInfo.x + this._tokenNumInfo.width;
        this._tokenNum.x = this._tokenIcon.x + this._tokenIcon.width;
    };
    Object.defineProperty(AcNationalDayRechargeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNationalDayRechargeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcNationalDayRechargeView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcNationalDayRechargeView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNationalDayRechargeView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    //背景图
    // protected getBgName():string{
    //     return "";
    // }
    //标题背景
    AcNationalDayRechargeView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("acnationalday_charge_titlebg-" + this.getTypeCode()) ? "acnationalday_charge_titlebg-" + this.getTypeCode() : "acnationalday_charge_titlebg-1";
    };
    //标题
    AcNationalDayRechargeView.prototype.getTitleStr = function () {
        return "";
    };
    //规则
    AcNationalDayRechargeView.prototype.getRuleInfo = function () {
        return "acNationalDayChargeRuleInfo-" + this.getTypeCode();
    };
    AcNationalDayRechargeView.prototype.getRuleInfoParam = function () {
        return [
            String(1 / this.cfg.ratio),
        ];
    };
    AcNationalDayRechargeView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    //资源
    AcNationalDayRechargeView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = [
                "acnationalday_charge_titlebg-1", "acnationalday_charge_icon-1",
                "acnationalday_infobg-1", "acnationalday_charge_item_bg-1",
                "acnationalday_charge_item_flag-1_1", "acnationalday_charge_item_flag-1_2", "acnationalday_charge_item_flag-1_3",
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "alliance_taskAttrbg1", "progress5", "progress3_bg",
            "acnationalday_charge_titlebg-" + this.getTypeCode(),
            "acnationalday_charge_icon-" + this.getTypeCode(),
            "acnationalday_infobg-" + this.getTypeCode(),
            "acnationalday_charge_item_bg-" + this.getTypeCode(),
            "acnationalday_charge_item_flag-" + this.getTypeCode() + "_1",
            "acnationalday_charge_item_flag-" + this.getTypeCode() + "_2",
            "acnationalday_charge_item_flag-" + this.getTypeCode() + "_3",
        ]).concat(list);
    };
    AcNationalDayRechargeView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETCHARGE, this.getChargeCallback, this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACNATIONALDAY_CHANGE_VIEW);
        this._scrollList = null;
        this._acDesc = null;
        this._tokenNumInfo = null;
        this._tokenIcon = null;
        this._tokenNum = null;
        _super.prototype.dispose.call(this);
    };
    return AcNationalDayRechargeView;
}(CommonView));
__reflect(AcNationalDayRechargeView.prototype, "AcNationalDayRechargeView");
//# sourceMappingURL=AcNationalDayRechargeView.js.map