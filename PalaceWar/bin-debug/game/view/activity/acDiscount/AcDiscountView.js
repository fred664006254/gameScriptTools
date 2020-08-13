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
 * Vip折扣
 * author 赵占涛
 * date 2018/1/31
 * @class AcDiscountView
 */
var AcDiscountView = (function (_super) {
    __extends(AcDiscountView, _super);
    function AcDiscountView() {
        var _this = _super.call(this) || this;
        _this._activeCfgList = [];
        return _this;
    }
    AcDiscountView.prototype.initView = function () {
        //顶部背景图片
        var forpeople_top = BaseBitmap.create("forpeople_top");
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = -50;
        //描述 
        var desckey = null;
        desckey = Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && App.DeviceUtil.isWXgame() ? "acDiscount_newdesc" : "acDiscount_desc";
        var acDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(desckey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(acDescTxt);
        acDescTxt.x = 30;
        acDescTxt.y = 20;
        acDescTxt.width = 550;
        var startY = 115;
        // vip折扣
        var acBasevo = Api.acVoApi.checkIsVipDiscount();
        if (acBasevo) {
            //vip背景图片
            var vipBg = BaseBitmap.create("acdiscountviewbg1");
            this.addChildToContainer(vipBg);
            vipBg.y = startY;
            //倒计时文本 
            var acCDTxtStr = Api.acVoApi.getActivityVoByAidAndCode(this.aid, "1") ? Api.acVoApi.getActivityVoByAidAndCode(this.aid, "1").getAcLocalTime(false) : Api.acVoApi.getActivityVoByAidAndCode(this.aid, "4").getAcLocalTime(false);
            var acCDTxt = ComponentManager.getTextField(acCDTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
            this.addChildToContainer(acCDTxt);
            acCDTxt.x = 30;
            acCDTxt.y = vipBg.y + 227;
            //vip描述 
            var acVipDescTxtKey = "";
            if (acBasevo.code == 1) {
                acVipDescTxtKey = "acDiscount_vipDesc";
            }
            else {
                acVipDescTxtKey = "acDiscount_vipDesc-" + acBasevo.code;
            }
            var acVipDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(acVipDescTxtKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this.addChildToContainer(acVipDescTxt);
            acVipDescTxt.x = 30;
            acVipDescTxt.y = vipBg.y + 270;
            acVipDescTxt.width = 420;
            // 前往vip
            var goVipBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, "acDiscount_goVip", this.goVipHandler, this);
            goVipBtn.x = 473;
            goVipBtn.y = vipBg.y + 265;
            goVipBtn.name = "goVipBtn";
            this.addChildToContainer(goVipBtn);
            //vip 1折
            var vip1zheBg = BaseBitmap.create(PlatformManager.checkIsZjlySp() ? "acdiscount4zhe" : "acdiscount1zhe");
            this.addChildToContainer(vip1zheBg);
            vip1zheBg.x = 563;
            vip1zheBg.y = vipBg.y + 213;
            if (acBasevo.code == 4) {
                vip1zheBg.setRes("acdiscount5zhe");
                vip1zheBg.x = 560;
            }
            startY = vipBg.y + vipBg.height;
        }
        //------------------------------------------------
        var divo3 = Api.acVoApi.getActivityVoByAidAndCode("discount", "3");
        var divo2 = Api.acVoApi.getActivityVoByAidAndCode("discount", "2");
        // 终身卡打折
        if (divo2 && divo2.isStart || divo3 && divo3.isStart) {
            //终身卡背景图片
            var yearCardBg = BaseBitmap.create("acdiscountviewbg2");
            this.addChildToContainer(yearCardBg);
            yearCardBg.y = startY;
            //倒计时文本 
            var acCDTxt = null;
            if (divo3) {
                acCDTxt = ComponentManager.getTextField(divo3.getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
            }
            else {
                acCDTxt = ComponentManager.getTextField(divo2.getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
            }
            this.addChildToContainer(acCDTxt);
            acCDTxt.x = 30;
            acCDTxt.y = yearCardBg.y + 227;
            //终身卡描述 
            var yearkey = null;
            yearkey = Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && App.DeviceUtil.isWXgame() ? "acDiscount_newyearcardDesc" : "acDiscount_yearcardDesc";
            var param = [];
            // 终身卡配置
            var gStr = "";
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, "2");
            var cfg2 = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, "3");
            if (cfg) {
                gStr = cfg.getRecharge();
            }
            if (cfg2) {
                gStr = cfg2.getRecharge();
            }
            Api.rechargeVoApi.formatThHwMoneyInfo(param, gStr);
            var acYearCardDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(yearkey, param), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this.addChildToContainer(acYearCardDescTxt);
            acYearCardDescTxt.x = 30;
            acYearCardDescTxt.y = yearCardBg.y + 270;
            acYearCardDescTxt.width = 420;
            // 前往福利
            var goYearCardBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, "acDiscount_goYearCard", this.goYearCardHandler, this);
            goYearCardBtn.x = 473;
            goYearCardBtn.y = yearCardBg.y + 265;
            goYearCardBtn.name = "goYearCardBtn";
            this.addChildToContainer(goYearCardBtn);
            //终身卡价格
            var yearStr = null;
            if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && App.DeviceUtil.isWXgame()) {
                yearStr = "acdiscount_zhongshenkajiage_newdiscount";
            }
            else {
                yearStr = PlatformManager.checkIsXlSp() ? "acdiscount_zhongshenkajiage_xianlaiType" : "acdiscount_zhongshenkajiage";
            }
            // 享乐园
            if (PlatformManager.checkIsXlSp()) {
                yearStr = "acdiscount_zhongshenkajiage";
                if (divo3) {
                    yearStr = "acdiscount_zhongshenkajiage3";
                }
                acYearCardDescTxt.text = LanguageManager.getlocal("acDiscount_newyearcardDesc3");
                //享乐园特色提示
                var xlyTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("buyyeardesvip1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
                this.addChildToContainer(xlyTipTxt);
                xlyTipTxt.x = 30;
                xlyTipTxt.y = acYearCardDescTxt.y + acYearCardDescTxt.height + 5;
            }
            var yearcardJiage = BaseBitmap.create(yearStr);
            this.addChildToContainer(yearcardJiage);
            yearcardJiage.x = 553;
            yearcardJiage.y = yearCardBg.y + 204;
            startY = yearCardBg.y + yearCardBg.height;
        }
        //月卡打折活动 -- 这种写法真坑
        var acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
        if (acMouthBasevo) {
            var mouthCfg = Config.AcCfg.getCfgByActivityIdAndCode(acMouthBasevo.aid, acMouthBasevo.code);
            var rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(mouthCfg.recharge);
            var mouthCardBg = BaseBitmap.create("acdiscountview_mouthbg-" + acMouthBasevo.code);
            this.addChildToContainer(mouthCardBg);
            mouthCardBg.y = startY;
            var mouthCost = BaseBitmap.create("acdiscount_mouthcost-" + acMouthBasevo.code);
            mouthCost.setPosition(mouthCardBg.x + 585 - mouthCost.width / 2, mouthCardBg.y + 185 + mouthCost.height / 2);
            this.addChildToContainer(mouthCost);
            var acCDTxt = ComponentManager.getTextField(acMouthBasevo.getAcLocalTime(false), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
            this.addChildToContainer(acCDTxt);
            acCDTxt.x = 30;
            acCDTxt.y = mouthCardBg.y + 227;
            var acMouthCardDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_mouthCardDesc-" + acMouthBasevo.code, [String(rechargeCfg.cost)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this.addChildToContainer(acMouthCardDescTxt);
            acMouthCardDescTxt.x = 30;
            acMouthCardDescTxt.y = mouthCardBg.y + 270;
            acMouthCardDescTxt.width = 420;
            var goMouthCardBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, "acDiscount_goMouthCard-" + acMouthBasevo.code, this.goMouthCardHandler, this);
            goMouthCardBtn.x = 473;
            goMouthCardBtn.y = mouthCardBg.y + 265;
            this.addChildToContainer(goMouthCardBtn);
            startY = mouthCardBg.y + mouthCardBg.height;
        }
    };
    AcDiscountView.prototype.goVipHandler = function () {
        if (!Api.acVoApi.checkIsVipDiscount()) {
            //活动已结束
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
    };
    AcDiscountView.prototype.goYearCardHandler = function () {
        var disVo2 = Api.acVoApi.getActivityVoByAidAndCode(this.aid, "2");
        var disVo3 = Api.acVoApi.getActivityVoByAidAndCode(this.aid, "3");
        if (disVo2 && disVo2.isStart == false || disVo3 && disVo3.isStart == false) {
            //活动已结束
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD);
    };
    /**月卡相关 */
    AcDiscountView.prototype.goMouthCardHandler = function () {
        var acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
        if (acMouthBasevo && acMouthBasevo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD);
    };
    AcDiscountView.prototype.getTitleStr = function () {
        return "ac" + App.StringUtil.firstCharToUper(this.aid) + "_Title";
    };
    AcDiscountView.prototype.getResourceList = function () {
        var diconut = null;
        if (Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && App.DeviceUtil.isWXgame()) {
            diconut = "acdiscount_zhongshenkajiage_newdiscount";
        }
        else {
            diconut = (PlatformManager.checkIsXlSp() ? "acdiscount_zhongshenkajiage_xianlaiType" : "acdiscount_zhongshenkajiage");
        }
        var resArr = [];
        var acMouthBasevo = Api.acVoApi.checkIsMonthDiscount();
        if (acMouthBasevo) {
            resArr = [
                "acdiscountview_mouthbg-" + acMouthBasevo.code,
                "acdiscount_mouthcost-" + acMouthBasevo.code,
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "acdiscount_zhongshenkajiage3", "acdiscount5zhe",
            "forpeople_top", "acdiscountviewbg1", (PlatformManager.checkIsZjlySp() ? "acdiscount4zhe" : "acdiscount1zhe"), "acdiscountviewbg2", diconut
        ]).concat(resArr);
    };
    AcDiscountView.prototype.useCallback = function (event) {
        for (var i = 0; i < this._activeCfgList.length; i++) {
            var acLimitedRewardScrollItem = this._scrollList.getItemByIndex(i);
            if (acLimitedRewardScrollItem) {
                acLimitedRewardScrollItem.checkBtnState();
            }
        }
    };
    AcDiscountView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETLIMITEDREWARD), this.useCallback, this);
        this._scrollList = null;
        this._activeCfgList = null;
        _super.prototype.dispose.call(this);
    };
    return AcDiscountView;
}(AcCommonView));
__reflect(AcDiscountView.prototype, "AcDiscountView");
//# sourceMappingURL=AcDiscountView.js.map