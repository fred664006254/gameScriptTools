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
 * 	计策使用界面
 * @author 张朝阳
 * date 2018/10/16
 * @class AllianceWarUsePlanPopupView
 */
var AllianceWarUsePlanPopupView = (function (_super) {
    __extends(AllianceWarUsePlanPopupView, _super);
    function AllianceWarUsePlanPopupView() {
        return _super.call(this) || this;
    }
    AllianceWarUsePlanPopupView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, this.hide, this);
        var itemCfg = this.param.data.itemCfg;
        var itemNum = this.param.data.itemNum;
        var cfgId = this.param.data.cfgId;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 515;
        bg.height = 300;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);
        var itemDB = GameData.getItemIcon(itemCfg);
        itemDB.setPosition(bg.x + bg.width / 2 - itemDB.width / 2, bg.y + 25);
        this.addChildToContainer(itemDB);
        if (itemNum && itemNum > 1) {
            var itemNumTxt = ComponentManager.getTextField(String(itemNum), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            itemNumTxt.setPosition(itemDB.x + itemDB.width - 6 - itemNumTxt.width, itemDB.y + itemDB.height - 6 - itemNumTxt.height);
            this.addChildToContainer(itemNumTxt);
        }
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarUsePlanPopupViewTip", [itemCfg.name]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        if (tipTxt.width > 480) {
            tipTxt.width = 480;
        }
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.setPosition(bg.x + bg.width / 2 - tipTxt.width / 2, itemDB.y + itemDB.height + 20);
        this.addChildToContainer(tipTxt);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
        cancelBtn.setPosition(bg.x + 30, bg.y + bg.height - cancelBtn.height - 15);
        this.addChildToContainer(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", function () {
            var info = Api.allianceWarVoApi.getMyInfo();
            if (info && info.servant != null) {
                if (itemNum <= 0) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarPlanTip2"));
                    return;
                }
                if (itemCfg.id != "2201") {
                    _this.request(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, { straId: cfgId });
                }
                else {
                    var servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
                    var servantInfoList = [];
                    for (var key in servantInfoVoList) {
                        var servantState = Api.allianceWarVoApi.getServantState(servantInfoVoList[key].servantId);
                        if (servantState) {
                            continue;
                        }
                        var item = servantInfoVoList[key];
                        var fightValue = Api.servantVoApi.getServantCombatWithIdContentsWeapon(item.servantId, 3); //Api.servantVoApi.getServantCombatWithId(item.servantId)
                        var servantInfo = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath, banishSt: item.banishSt };
                        servantInfoList.push(servantInfo);
                    }
                    servantInfoList.sort(function (a, b) {
                        return b.fightValue - a.fightValue;
                    });
                    ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARSELECTSERVANTPOPUPVIEW, { servantList: servantInfoList, cfgId: cfgId });
                    _this.hide();
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarPlanTip"));
            }
        }, this);
        confirmBtn.setPosition(bg.x + bg.width - confirmBtn.width - 30, cancelBtn.y);
        this.addChildToContainer(confirmBtn);
    };
    /**
     * 备战期结束关闭界面
     */
    AllianceWarUsePlanPopupView.prototype.tick = function () {
        var periodType = Api.allianceWarVoApi.getWarPeriod();
        if (periodType != 1) {
            this.hide();
            return;
        }
    };
    AllianceWarUsePlanPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsevenitemzshi", "acsevenitemtopbg",
        ]);
    };
    AllianceWarUsePlanPopupView.prototype.getTitleStr = function () {
        return "allianceWarUsePlanPopupViewTitle";
    };
    AllianceWarUsePlanPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, this.hide, this);
        _super.prototype.dispose.call(this);
    };
    return AllianceWarUsePlanPopupView;
}(PopupView));
__reflect(AllianceWarUsePlanPopupView.prototype, "AllianceWarUsePlanPopupView");
//# sourceMappingURL=AllianceWarUsePlanPopupView.js.map