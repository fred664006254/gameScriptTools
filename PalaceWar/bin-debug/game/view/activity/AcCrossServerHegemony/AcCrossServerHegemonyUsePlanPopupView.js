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
 * @author jiangly
 * date 2018/10/16
 * @class AcCrossServerHegemonyUsePlanPopupView
 */
var AcCrossServerHegemonyUsePlanPopupView = (function (_super) {
    __extends(AcCrossServerHegemonyUsePlanPopupView, _super);
    function AcCrossServerHegemonyUsePlanPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossServerHegemonyUsePlanPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyUsePlanPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyUsePlanPopupView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, this.hide, this);
        var itemCfg = this.param.data.itemCfg;
        var itemNum = this.param.data.itemNum;
        var cfgId = this.param.data.cfgId;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 515;
        bg.height = 225;
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
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyUsePlanPopupViewTip", [itemCfg.name]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        if (tipTxt.width > 480) {
            tipTxt.width = 480;
        }
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.setPosition(bg.x + bg.width / 2 - tipTxt.width / 2, itemDB.y + itemDB.height + 20);
        this.addChildToContainer(tipTxt);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_RED, "cancelBtn", this.hide, this);
        cancelBtn.setPosition(bg.x + 30, bg.y + bg.height + 15);
        this.addChildToContainer(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "sysConfirm", function () {
            var servantInfo = _this.param.data.servantInfo;
            // console.log(servantInfo);
            // let info =  servantInfo[Api.playerVoApi.getPlayerID()];//this.param.data.servantInfo;Api.allianceWarVoApi.getMyInfo();
            // console.log("servant info--->",info);
            if (servantInfo) {
                var info = servantInfo[Api.playerVoApi.getPlayerID()];
                if (info && info.servant != null) {
                    if (itemNum <= 0) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarPlanTip2"));
                        return;
                    }
                    if (itemCfg.id != "2201") {
                        _this.request(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, { rid: _this.param.data.matchId, activeId: _this.param.data.aid + "-" + _this.param.data.code, straId: cfgId });
                    }
                    else {
                        var servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
                        var servantInfoList = [];
                        for (var key in servantInfoVoList) {
                            // let servantState = Api.allianceWarVoApi.getServantState(servantInfoVoList[key].servantId);
                            var myInfo = Api.crossServerHegemonyVoApi.getMyInfo();
                            var servantState = _this.vo.sinfo[servantInfoVoList[key].servantId];
                            if (servantState) {
                                continue;
                            }
                            var item = servantInfoVoList[key];
                            var fightValue = Api.servantVoApi.getServantCombatWithId(item.servantId);
                            var servantInfo_1 = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath, clv: item.clv };
                            servantInfoList.push(servantInfo_1);
                        }
                        servantInfoList.sort(function (a, b) {
                            return b.fightValue - a.fightValue;
                        });
                        // let list1 = [];
                        // let list2 = [];
                        // let myInfo = Api.crossServerHegemonyVoApi.getCurData();
                        // for (let i=0; i < servantInfoList.length; i++){
                        // 	let serId = servantInfoList[i].servantId;
                        // 	let servantState = this.vo.sinfo[serId];
                        // 	if (myInfo && myInfo.servant2 && myInfo.servant2 == serId || (servantState && servantState == 1 && (myInfo && myInfo.servant != serId ||(!myInfo)))){
                        // 		list2.push(servantInfoList[i]);
                        // 	}
                        // 	else{
                        // 		list1.push(servantInfoList[i]);
                        // 	}
                        // }
                        // let data = list1.concat(list2);
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYSELECTSERVANTPOPUPVIEW, { servantList: servantInfoList, cfgId: cfgId, matchId: _this.param.data.matchId, aid: _this.param.data.aid, code: _this.param.data.code });
                        _this.hide();
                    }
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarPlanTip"));
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
    AcCrossServerHegemonyUsePlanPopupView.prototype.tick = function () {
        var periodType = this.vo.checkStatusByMatchId(Number(this.param.data.matchId));
        if (periodType != 1) {
            this.hide();
            return;
        }
    };
    AcCrossServerHegemonyUsePlanPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsevenitemzshi", "acsevenitemtopbg",
        ]);
    };
    AcCrossServerHegemonyUsePlanPopupView.prototype.getTitleStr = function () {
        return "allianceWarUsePlanPopupViewTitle";
    };
    AcCrossServerHegemonyUsePlanPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, this.hide, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyUsePlanPopupView;
}(PopupView));
__reflect(AcCrossServerHegemonyUsePlanPopupView.prototype, "AcCrossServerHegemonyUsePlanPopupView");
//# sourceMappingURL=AcCrossServerHegemonyUsePlanPopupView.js.map