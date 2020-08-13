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
 * 帮派阵容
 * @author jiangly
 * date 参战
 * @class AcCrossServerHegemonyWarJoinPopupView
 */
var AcCrossServerHegemonyWarJoinPopupView = (function (_super) {
    __extends(AcCrossServerHegemonyWarJoinPopupView, _super);
    function AcCrossServerHegemonyWarJoinPopupView() {
        var _this = _super.call(this) || this;
        _this._joinBattleTxt = null;
        _this._allFightTxt = null;
        _this._scrollList = null;
        _this._servantBtn = null;
        _this._curData = null;
        _this._costNode = null;
        // private _cdNode:BaseDisplayObjectContainer = null;
        _this._cdTip = null;
        // private _firstNode:BaseDisplayObjectContainer = null;
        _this._firstTip = null;
        _this._warnTip = null;
        _this._planBtn = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyWarJoinPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyWarJoinPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyWarJoinPopupView.prototype.getBgExtraHeight = function () {
        return 15;
    };
    /**
 * 刷新一下model数据
 */
    AcCrossServerHegemonyWarJoinPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLILIST, requestData: { activeId: this.param.data.aid + "-" + this.param.data.code, allianceid: this.param.data.alliId, rid: this.param.data.matchId } };
    };
    AcCrossServerHegemonyWarJoinPopupView.prototype.receiveData = function (data) {
        if (data.ret && data.data && data.data.ret == 0) {
            this._curData = data.data.data.achegemonyinfo;
            Api.crossServerHegemonyVoApi.updateCurData(this._curData);
            this.refreshData();
        }
    };
    AcCrossServerHegemonyWarJoinPopupView.prototype.refreshData = function () {
        if (this._curData == null) {
            return;
        }
        if (this._joinBattleTxt) {
            this._joinBattleTxt.text = LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewJoinNum", [String(this._curData.info.num)]);
        }
        if (this._allFightTxt) {
            this._allFightTxt.text = LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewAllFight", [App.StringUtil.changeIntToText(this._curData.info.dsp)]);
            this._allFightTxt.x = this.viewBg.x + this.viewBg.width - this._allFightTxt.width - 70;
        }
        if (this._scrollList) {
            var servantInfo = this._curData.info.info;
            var list1 = [];
            var list2 = [];
            var list3 = [];
            var list4 = [];
            var servantList = []; //[{po:1,poList:[]},{po:2,poList:[]},{po:3,poList:[]},{po:4,poList:[]}];
            for (var key in servantInfo) {
                // servantList.push(servantInfo[key]);
                var curD = servantInfo[key];
                // let po =    {id:key, servant:this.info[key].servant, stra:this.info[key].stra, st:this.info[key].st, po:this.info[key].po, name:this.info[key].name, dps:this.info[key].dps};
                var dataItem = { id: key, servant: curD.servant, stra: curD.stra, st: curD.st, po: curD.po, name: curD.name, dps: curD.dps };
                switch (curD.po) {
                    case 1:
                        list1.push(dataItem);
                        break;
                    case 2:
                        list2.push(dataItem);
                        break;
                    case 3:
                        list3.push(dataItem);
                        break;
                    case 4:
                        list4.push(dataItem);
                        break;
                }
                // servantList[curD.po - 1].poList.push(dataItem);
            }
            if (list1.length > 0) {
                var item = { po: 1, poList: list1 };
                servantList.push(item);
            }
            if (list2.length > 0) {
                var item = { po: 2, poList: list2 };
                servantList.push(item);
            }
            if (list3.length > 0) {
                var item = { po: 3, poList: list3 };
                servantList.push(item);
            }
            if (list4.length > 0) {
                var item = { po: 4, poList: list4 };
                servantList.push(item);
            }
            // console.log(this.vo.sinfo);
            this._scrollList.refreshData(servantList, { aid: this.param.data.aid, code: this.param.data.code, level: this._curData.level });
            if (servantInfo) {
                var myInfo = servantInfo[Api.playerVoApi.getPlayerID()];
                if (myInfo && myInfo.servant) {
                    this._servantBtn.setText("acCrossServerHegemonyChangeServantBtn");
                }
                else {
                    this._servantBtn.setText("allianceWarJoinBattleInfoPopupViewServantBtn");
                }
            }
        }
    };
    Object.defineProperty(AcCrossServerHegemonyWarJoinPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyWarJoinPopupView.prototype.initView = function () {
        // console.log(11111);
        //监听 model事件
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSERVANT, this.refreshUI, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_CANCELSERVANT, this.refreshUI, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, this.refreshUI, this);
        this._joinBattleTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewJoinNum", [String("0")]), 22, TextFieldConst.COLOR_BROWN);
        this._joinBattleTxt.setPosition(this.viewBg.x + 70, 40);
        this.addChildToContainer(this._joinBattleTxt);
        this._allFightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewAllFight", [String("0")]), 22, TextFieldConst.COLOR_BROWN);
        this._allFightTxt.setPosition(this.viewBg.x + this.viewBg.width - this._allFightTxt.width - 70, this._joinBattleTxt.y);
        this.addChildToContainer(this._allFightTxt);
        var listBg = BaseBitmap.create("public_9_bg93");
        listBg.width = 530;
        listBg.height = 580;
        this.addChildToContainer(listBg);
        listBg.setPosition(this.viewBg.width / 2 - listBg.width / 2, 78);
        var rect = new egret.Rectangle(0, 0, 520, 570);
        this._scrollList = ComponentManager.getScrollList(AcCrossServerHegemonyWarJoinScrollItem, null, rect, { aid: this.param.data.aid, code: this.param.data.code, level: this._curData.level });
        this._scrollList.setPosition(this.viewBg.width / 2 - this._scrollList.width / 2, 85);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewListEmpty"), TextFieldConst.COLOR_BROWN);
        this._servantBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "allianceWarJoinBattleInfoPopupViewServantBtn", this.servantBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        this._servantBtn.setPosition(this.viewBg.x + 100, this._scrollList.y + this._scrollList.height + 28);
        this.addChildToContainer(this._servantBtn);
        var planBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "allianceWarJoinBattleInfoPopupViewPlanBtn", this.planBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        planBtn.setPosition(this.viewBg.x + this.viewBg.width - planBtn.width - 100, this._servantBtn.y);
        this.addChildToContainer(planBtn);
        this._planBtn = planBtn;
        // this.allianceWarModelHandle();
        this.refreshData();
        this.refreshTip();
    };
    AcCrossServerHegemonyWarJoinPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        // this.allianceWarModelHandle();
    };
    AcCrossServerHegemonyWarJoinPopupView.prototype.refreshUI = function () {
        // console.log("refreshUI---->");
        // { requestType: NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLILIST, requestData: {activeId:this.param.data.aid+"-"+this.param.data.code, allianceid:this.param.data.alliId, rid:this.param.data.matchId} }
        this.request(NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLILIST, { activeId: this.param.data.aid + "-" + this.param.data.code, allianceid: this.param.data.alliId, rid: this.param.data.matchId });
    };
    AcCrossServerHegemonyWarJoinPopupView.prototype.refreshTip = function () {
        if (!this._servantBtn) {
            return;
        }
        var cd = this.vo.getMatchCDById(Number(this.param.data.matchId));
        if (!this._costNode) {
            this._costNode = new BaseDisplayObjectContainer();
            var costTip = ComponentManager.getTextField(String(this.cfg.cost), 18, TextFieldConst.COLOR_BROWN);
            var gemIcon = BaseBitmap.create("public_icon1");
            gemIcon.setScale(0.6);
            this._costNode.width = gemIcon.width * gemIcon.scaleX + costTip.width;
            this._costNode.height = gemIcon.height * gemIcon.scaleY;
            this._costNode.addChild(gemIcon);
            costTip.x = gemIcon.width * gemIcon.scaleX;
            costTip.y = this._costNode.height / 2 - costTip.height / 2;
            this._costNode.addChild(costTip);
            this._costNode.x = this._servantBtn.x + this._servantBtn.width / 2 - this._costNode.width / 2;
            this._costNode.y = this._servantBtn.y - this._costNode.height;
            this.addChildToContainer(this._costNode);
        }
        if (!this._cdTip) {
            this._cdTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyChangeTip2", [App.DateUtil.getFormatBySecond((cd + this.cfg.CD - GameData.serverTime), 1)]), 18, TextFieldConst.COLOR_BROWN);
            this._cdTip.x = this._servantBtn.x + this._servantBtn.width / 2 - this._cdTip.width / 2;
            this._cdTip.y = this._servantBtn.y - this._cdTip.height;
            this.addChildToContainer(this._cdTip);
        }
        this._cdTip.text = LanguageManager.getlocal("acCrossServerHegemonyChangeTip2", [App.DateUtil.getFormatBySecond((cd + this.cfg.CD - GameData.serverTime), 1)]);
        this._cdTip.x = this._servantBtn.x + this._servantBtn.width / 2 - this._cdTip.width / 2;
        if (!this._firstTip) {
            this._firstTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyChangeTip0"), 18, TextFieldConst.COLOR_BROWN);
            this._firstTip.x = this._servantBtn.x + this._servantBtn.width / 2 - this._firstTip.width / 2;
            this._firstTip.y = this._servantBtn.y - this._firstTip.height;
            this.addChildToContainer(this._firstTip);
        }
        if (!this._warnTip) {
            this._warnTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyChangeTip1"), 18, TextFieldConst.COLOR_BROWN);
            this._warnTip.x = this._servantBtn.x + this._servantBtn.width / 2 - this._warnTip.width / 2;
            this._warnTip.y = this._servantBtn.y + this._servantBtn.height + 1;
            this.addChildToContainer(this._warnTip);
        }
        if (cd == -1) {
            this._costNode.visible = false;
            this._cdTip.visible = false;
            this._firstTip.visible = true;
            this._warnTip.visible = false;
            this._servantBtn.setEnable(true);
        }
        else if (cd + this.cfg.CD - GameData.serverTime > 0) {
            this._costNode.visible = false;
            this._cdTip.visible = true;
            this._firstTip.visible = false;
            this._warnTip.visible = false;
            this._servantBtn.setEnable(false);
        }
        else if (cd + this.cfg.CD - GameData.serverTime <= 0) {
            this._costNode.visible = true;
            this._cdTip.visible = false;
            this._firstTip.visible = false;
            this._warnTip.visible = true;
            this._servantBtn.setEnable(true);
        }
        var status = this.vo.checkStatusByMatchId(Number(this.param.data.matchId));
        if (status == 1) {
        }
        else if (status == 2 || status == 3) {
            this._servantBtn.visible = false;
            this._planBtn.visible = false;
            this._costNode.visible = false;
            this._cdTip.visible = false;
            this._firstTip.visible = false;
            this._warnTip.visible = false;
        }
        else {
            this.hide();
        }
    };
    /**
     * 监听modle 的刷新
     */
    AcCrossServerHegemonyWarJoinPopupView.prototype.allianceWarModelHandle = function () {
        this._joinBattleTxt.text = LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewJoinNum", [""]);
        this._joinBattleTxt.setPosition(this.viewBg.x + 70, 20);
        this._allFightTxt.text = LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewAllFight", [App.StringUtil.changeIntToText(111)]);
        this._allFightTxt.setPosition(this.viewBg.x + this.viewBg.width - this._allFightTxt.width - 70, this._joinBattleTxt.y);
        var list = []; //Api.allianceWarVoApi.getMyAllianceInfoList();
        this._scrollList.refreshData(list, { aid: this.param.data.aid, code: this.param.data.code, level: this._curData.level });
        var myInfo = null; //Api.allianceWarVoApi.getMyInfo();
        if (myInfo && myInfo.servant) {
            this._servantBtn.setText("allianceWarJoinBattleInfoPopupViewServantBtn2");
        }
        else {
            this._servantBtn.setText("allianceWarJoinBattleInfoPopupViewServantBtn");
        }
    };
    /**	门客选择界面 */
    AcCrossServerHegemonyWarJoinPopupView.prototype.servantBtnClick = function () {
        var cd = this.vo.getMatchCDById(Number(this.param.data.matchId));
        App.LogUtil.log("servantBtnClick " + (GameData.serverTime - cd));
        if (cd != -1 && GameData.serverTime - cd - this.cfg.CD >= 0) {
            if (this.cfg.cost > Api.playerVoApi.getPlayerGem()) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acCrossServerHegemonyChangeTip3'));
                return;
            }
        }
        var servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
        var servantInfoList = [];
        for (var key in servantInfoVoList) {
            var item = servantInfoVoList[key];
            var fightValue = Api.servantVoApi.getServantCombatWithId(item.servantId);
            var servantInfo = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath, clv: item.clv };
            servantInfoList.push(servantInfo);
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
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYSELECTSERVANTPOPUPVIEW, { servantList: servantInfoList, aid: this.param.data.aid, code: this.param.data.code, matchId: this.param.data.matchId });
    };
    /** 计策选择界面 */
    AcCrossServerHegemonyWarJoinPopupView.prototype.planBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYSELECTPLANPOPUPVIEW, { aid: this.param.data.aid, code: this.param.data.code, matchId: this.param.data.matchId, servantInfo: this._curData.info.info });
    };
    /**
     * 备战期结束关闭界面
     */
    AcCrossServerHegemonyWarJoinPopupView.prototype.tick = function () {
        var periodType = this.vo.checkStatusByMatchId(Number(this.param.data.matchId));
        if (periodType != 1 && periodType != 2 && periodType != 3) {
            this.hide();
            return;
        }
        this.refreshTip();
    };
    AcCrossServerHegemonyWarJoinPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsevenitemzshi", "acsevenitemtopbg",
            "accshegemony_battlembg",
            "accshegemony_battlembg1",
            "accshegemony_battlembg2",
            "public_popupscrollitembg",
        ]);
    };
    // protected getTitleStr() {
    // 	// return "allianceWarJoinBattleInfoPopupViewTitle";
    // }
    AcCrossServerHegemonyWarJoinPopupView.prototype.dispose = function () {
        // App.MessageHelper.removeNetMessage("myalliancewar",this.allianceWarModelHandle,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM,this.allianceWarModelHandle,this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH,this.allianceWarModelHandle,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSERVANT, this.refreshUI, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_CANCELSERVANT, this.refreshUI, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, this.refreshUI, this);
        this._joinBattleTxt = null;
        this._allFightTxt = null;
        this._scrollList = null;
        this._servantBtn = null;
        this._curData = null;
        this._costNode = null;
        // this._cdNode = null;
        this._cdTip = null;
        // this._firstNode = null;
        this._firstTip = null;
        this._warnTip = null;
        this._planBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyWarJoinPopupView;
}(PopupView));
__reflect(AcCrossServerHegemonyWarJoinPopupView.prototype, "AcCrossServerHegemonyWarJoinPopupView");
//# sourceMappingURL=AcCrossServerHegemonyWarJoinPopupView.js.map