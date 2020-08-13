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
 * 充值奖励
 * author yanyuling
 * date 2017/11/08
 * @class AcRechargeView
 */
var AcRechargeView = (function (_super) {
    __extends(AcRechargeView, _super);
    function AcRechargeView() {
        var _this = _super.call(this) || this;
        _this._rechargeItemList = [];
        _this._redImgList = [];
        _this.restTxt = null;
        _this.restTxt2 = null;
        _this._topBg = null;
        return _this;
    }
    AcRechargeView.prototype.initView = function () {
        if (PlatformManager.checkNeedCheckPurchase()) {
            PlatformManager.client.checkPurchase(ServerCfg.selectServer.zid);
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALDAILYREWARD), this.checkRedpoints, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V, this.checkRedpoints, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETDAILYREWARD), this.checkRedpoints, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD), this.checkRedpoints, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var topBg = BaseBitmap.create("activity_charge_topbg");
        topBg.width = GameConfig.stageWidth + 18;
        topBg.y = -13;
        this._nodeContainer.addChild(topBg);
        this._topBg = topBg;
        this._wordTipImg = BaseBitmap.create("activity_charge_word1");
        this._wordTipImg.anchorOffsetY = this._wordTipImg.height / 2;
        this._wordTipImg.y = 40;
        this._wordTipImg.x = 20;
        this._nodeContainer.addChild(this._wordTipImg);
        var timeBg = BaseBitmap.create("public_9_bg38");
        timeBg.width = 400;
        timeBg.x = 0;
        timeBg.y = 70;
        this._nodeContainer.addChild(timeBg);
        this._activityDurTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._activityDurTxt.x = 30;
        this._activityDurTxt.y = timeBg.y + timeBg.height / 2 - 10;
        this._nodeContainer.addChild(this._activityDurTxt);
        this._cdTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._cdTxt.x = this._activityDurTxt.x;
        this._cdTxt.y = this._activityDurTxt.y + 40;
        this._nodeContainer.addChild(this._cdTxt);
        //累天充值字段 
        var restTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        restTxt.x = 30;
        restTxt.y = this._cdTxt.y + this._cdTxt.height + 32;
        var zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(24).hour;
        restTxt.text = LanguageManager.getlocal("acrecharge_txt1", [zoneStr + ""]);
        this.restTxt = restTxt;
        this._nodeContainer.addChild(restTxt);
        this.restTxt.visible = false;
        //累天充值字段 2
        var restTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        restTxt2.x = restTxt.x + restTxt.width + 30;
        restTxt2.y = restTxt.y;
        var day = 0;
        this.restTxt2 = restTxt2;
        restTxt2.text = LanguageManager.getlocal("acrecharge_txt2", [day + "", day + "", day + "",]);
        this._nodeContainer.addChild(restTxt2);
        this.restTxt2.visible = false;
        this._rechargeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rechargeTxt.x = this._activityDurTxt.x;
        this._rechargeTxt.y = this._cdTxt.y + 30;
        this._rechargeTxt.visible = false;
        this._nodeContainer.addChild(this._rechargeTxt);
        if (PlatformManager.checkIsTWBSp() || PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsKRSp()) {
            var rechargeNotFree = ComponentManager.getTextField(LanguageManager.getlocal("rechargeNotContainPresent"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
            rechargeNotFree.x = this._activityDurTxt.x;
            rechargeNotFree.y = this._cdTxt.y + 60;
            this._nodeContainer.addChild(rechargeNotFree);
        }
        //最底部背景
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth + 16;
        bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y - this.container.y + 5;
        bottomBg.x = -8;
        bottomBg.y = topBg.height + topBg.y;
        this._nodeContainer.addChild(bottomBg);
        var bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = bottomBg.height - 110;
        bottomBg2.width = bottomBg.width - 40;
        bottomBg2.x = bottomBg.x + 20;
        bottomBg2.y = bottomBg.y + 85;
        this._nodeContainer.addChild(bottomBg2);
        var tabName = [];
        var tmpRect = new egret.Rectangle(0, 0, bottomBg2.width, bottomBg2.height - 10);
        // let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg2.height);
        var tabY = bottomBg.y + 24;
        var tabX = 15;
        var dailyVo = Api.acVoApi.getActivityVoByAidAndCode("dailyCharge");
        if (dailyVo) {
            this.restTxt.visible = false;
            this.restTxt2.visible = false;
            var redPoint = BaseBitmap.create("public_dot2");
            redPoint.name = "dailyCharge_" + dailyVo.code;
            redPoint.y = tabY;
            redPoint.x = tabX + 125;
            this._redImgList.push(redPoint);
            this._nodeContainer.addChild(redPoint);
            tabName.push("acCharge_tab1");
            var rechargeItem = new AcRechargeItem();
            rechargeItem.name = redPoint.name;
            // rechargeItem.x = bottomBg2.x+5;
            rechargeItem.x = 21;
            rechargeItem.y = bottomBg2.y + 5;
            rechargeItem.init("dailyCharge", dailyVo.code, tmpRect);
            this._nodeContainer.addChild(rechargeItem);
            this._rechargeItemList.push(rechargeItem);
        }
        var totalVo = Api.acVoApi.getActivityVoByAidAndCode("totalRecharge");
        if (totalVo) {
            this.restTxt.visible = false;
            this.restTxt2.visible = false;
            var redPoint = BaseBitmap.create("public_dot2");
            redPoint.name = "totalRecharge_" + totalVo.code;
            this._redImgList.push(redPoint);
            redPoint.y = tabY;
            redPoint.x = tabX + 280;
            this._nodeContainer.addChild(redPoint);
            tabName.push("acCharge_tab2");
            var rechargeItem = new AcRechargeItem();
            rechargeItem.name = redPoint.name;
            rechargeItem.init("totalRecharge", totalVo.code, tmpRect);
            // rechargeItem.x = bottomBg2.x+5;
            rechargeItem.x = 21;
            rechargeItem.y = bottomBg2.y + 5;
            rechargeItem.visible = false;
            this._nodeContainer.addChild(rechargeItem);
            this._rechargeItemList.push(rechargeItem);
        }
        var totalDVo = Api.acVoApi.getActivityVoByAidAndCode("totalDayRecharge");
        if (totalDVo) {
            var day = Math.ceil((GameData.serverTime - totalDVo.st) / 86400);
            var maxday = Math.ceil((totalDVo.et - totalDVo.st) / 86400);
            this.restTxt.visible = true;
            this.restTxt2.visible = true;
            this.restTxt2.text = LanguageManager.getlocal("acrecharge_txt2", [day + "", day + "", maxday + ""]);
            var redPoint = BaseBitmap.create("public_dot2");
            redPoint.name = "totalDayRecharge_" + totalDVo.code;
            this._redImgList.push(redPoint);
            redPoint.y = tabY;
            redPoint.x = tabX + 455;
            this._nodeContainer.addChild(redPoint);
            tabName.push("acCharge_tab3");
            var rechargeItem = new AcRechargeItem();
            rechargeItem.name = redPoint.name;
            rechargeItem.init("totalDayRecharge", totalDVo.code, tmpRect);
            // rechargeItem.x = bottomBg2.x+5;
            rechargeItem.x = 21;
            rechargeItem.y = bottomBg2.y + 5;
            rechargeItem.visible = false;
            this._nodeContainer.addChild(rechargeItem);
            this._rechargeItemList.push(rechargeItem);
        }
        //  
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = tabX;
        tabbarGroup.y = tabY;
        this._nodeContainer.addChild(tabbarGroup);
        for (var key in this._redImgList) {
            var red = this._redImgList[key];
            red.visible = false;
            if (key == "0")
                red.x = tabX + 122;
            if (key == "1")
                red.x = tabX + 280;
            if (key == "2")
                red.x = tabX + 437;
            this._nodeContainer.addChild(red);
        }
        this.tabBtnClickHandler({ index: 0 });
        this.checkRedpoints();
    };
    AcRechargeView.prototype.tabBtnClickHandler = function (params) {
        var idx = params.index;
        for (var index = 0; index < this._rechargeItemList.length; index++) {
            this._rechargeItemList[index].visible = false;
        }
        this._rechargeItemList[idx].visible = true;
        var nameStr = this._rechargeItemList[idx].name;
        var nameTab = App.StringUtil.splitString(nameStr, "_");
        this._wordTipImg.texture = ResourceManager.getRes("activity_charge_" + nameTab[0]);
        this._wordTipImg.anchorOffsetY = this._wordTipImg.height / 2;
        this._wordTipImg.y = 40;
        var tmpVo = undefined;
        this._rechargeTxt.visible = false;
        if (nameStr.indexOf("totalDayRecharge") > -1) {
            this.restTxt.visible = true;
            this.restTxt2.visible = true;
        }
        else {
            this.restTxt.visible = false;
            this.restTxt2.visible = false;
        }
        tmpVo = Api.acVoApi.getActivityVoByAidAndCode(nameTab[0]);
        if (nameTab[0] == "dailyCharge") {
            this._rechargeTxt.visible = true;
        }
        if (idx == 0 && nameTab[0] == "dailyCharge" && tmpVo.code > 100) {
            this._wordTipImg.visible = false;
            if (tmpVo.code > 200) {
                this._topBg.setRes("activity_charge_topbg-201");
            }
            else if (tmpVo.code > 100) {
                this._topBg.setRes("activity_charge_topbg-101");
            }
        }
        else {
            this._wordTipImg.visible = true;
            this._topBg.setRes("activity_charge_topbg");
        }
        this._tmpVo = tmpVo;
        var zoneStr1 = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        this._rechargeTxt.text = LanguageManager.getlocal("acrecharge_todayRecharge", [String(this._tmpVo.v), zoneStr1 + "", App.DateUtil.formatSvrHourByLocalTimeZone(0).hour.toString()]);
        if (PlatformManager.checkIsEnSp()) {
            var zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
            this._rechargeTxt.text = LanguageManager.getlocal("acrecharge_todayRechargeen", [String(this._tmpVo.v), zoneStr + "", App.DateUtil.formatSvrHourByLocalTimeZone(0).hour.toString()]);
        }
        var timeStr = App.DateUtil.getOpenLocalTime(tmpVo.st, tmpVo.et, true);
        this._activityDurTxt.text = this._tmpVo.getAcLocalTime(true);
        this.tick();
    };
    AcRechargeView.prototype.tick = function () {
        var deltaT = this._tmpVo.et - GameData.serverTime;
        if (this._cdTxt && deltaT > 0) {
            this._cdTxt.text = LanguageManager.getlocal("acrecharge_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._cdTxt.text = LanguageManager.getlocal("acrecharge_acCD", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
        return false;
    };
    AcRechargeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "activity_charge_topbg", "activity_charge_red",
            "activity_charge_dailyCharge", "activity_charge_totalDayRecharge", "activity_charge_totalRecharge", "activity_charge_word4",
            "activity_charge_word5", "servant_bottombg", "activity_charge_topbg-101", "activity_charge_topbg-201",
            "progress3_bg", "progress5", "recharge_fnt",
        ]);
    };
    AcRechargeView.prototype.checkRedpoints = function () {
        for (var index = 0; index < this._redImgList.length; index++) {
            var redImg = this._redImgList[index];
            var name_1 = redImg.name; //= "totalDayRecharge_1";
            var tmpStr = name_1.split("_");
            var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(tmpStr[0], tmpStr[1]);
            if (tmpVo.isShowRedDot) {
                redImg.visible = true;
            }
            else {
                redImg.visible = false;
            }
        }
    };
    AcRechargeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALDAILYREWARD), this.checkRedpoints, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETDAILYREWARD), this.checkRedpoints, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD), this.checkRedpoints, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V, this.checkRedpoints, this);
        this._nodeContainer = null;
        this._rechargeItemList = [];
        this._wordTipImg = null;
        this._cdTxt = null;
        this._activityDurTxt = null;
        this._rechargeTxt = null;
        this._tmpVo = null;
        this._redImgList = [];
        this.restTxt = null;
        this.restTxt2 = null;
        this._topBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeView;
}(CommonView));
__reflect(AcRechargeView.prototype, "AcRechargeView");
//# sourceMappingURL=AcRechargeView.js.map