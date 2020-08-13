/**
 * 皇宫-金銮殿
 * author yanyuling
 * date 2018/05/30
 * @class PalaceKingsHouseView
 */
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
var PalaceKingsHouseView = (function (_super) {
    __extends(PalaceKingsHouseView, _super);
    function PalaceKingsHouseView() {
        var _this = _super.call(this) || this;
        _this._kingsList = null;
        _this._kingsSign = "";
        return _this;
    }
    // 标题背景名称
    PalaceKingsHouseView.prototype.getTitleStr = function () {
        return "palace_buildingName" + this.param.data.buildingId;
    };
    PalaceKingsHouseView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_INDEX), this.getPromoteList, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_INDEX),this.indexHandlerCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY), this.collectBtnClickHandlerCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETSIGN), this.showSignAfterEdit, this);
        NetManager.request(NetRequestConst.REQUEST_PROMOTE_INDEX, {}); //分封的相关数据
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._curTitleId = this.param.data.titleId;
        var palace_bg = BaseBitmap.create("palace_bg5");
        palace_bg.y = GameConfig.stageHeigth - this.container.y - palace_bg.height;
        this._nodeContainer.addChild(palace_bg);
        //npc
        var npc1Btn = ComponentManager.getButton("decree_npc1", "", this.npcBtnHandler, this, [1]);
        // npc1Btn.setScale(1.2);
        npc1Btn.name = "npc1Btn";
        npc1Btn.x = 77;
        npc1Btn.y = palace_bg.y + 527;
        this._nodeContainer.addChild(npc1Btn);
        var npc2Btn = ComponentManager.getButton("decree_npc2", "", this.npcBtnHandler, this, [2]);
        // npc2Btn.setScale(1.2);
        npc2Btn.name = "npc2Btn";
        npc2Btn.x = 472;
        npc2Btn.y = palace_bg.y + 536;
        this._nodeContainer.addChild(npc2Btn);
        this.refreshRedPoints();
        this._collectNode = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this._collectNode);
        var decree_collectbg = BaseBitmap.create("decree_collectbg");
        decree_collectbg.width = 180;
        decree_collectbg.height = 40;
        decree_collectbg.x = npc2Btn.x + npc2Btn.width / 2 - decree_collectbg.width / 2;
        decree_collectbg.y = npc2Btn.y + npc2Btn.height / 2 + 15;
        this._collectNode.addChild(decree_collectbg);
        var gem = Config.LevelCfg.getCfgByLevel(String(Api.playerVoApi.getPlayerLevel())).gem;
        var collectTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        collectTxt.text = LanguageManager.getlocal("decreeKings_collect", ["       " + gem]);
        collectTxt.x = decree_collectbg.x + 10;
        collectTxt.y = decree_collectbg.y + 10;
        this._collectNode.addChild(collectTxt);
        var goldIcon = BaseLoadBitmap.create("itemicon1");
        goldIcon.setScale(0.41);
        goldIcon.x = collectTxt.x + 80;
        goldIcon.y = collectTxt.y - 11;
        this._collectNode.addChild(goldIcon);
        if (PlatformManager.checkIsEnLang()) {
            goldIcon.x = collectTxt.x + 100;
        }
        if (Api.otherInfoVoApi.getPalaceFlag() == 1) {
            this.makeCollectFlag();
            npc2Btn.touchEnabled = false;
        }
        //国策btn
        var decree_policyBtn = ComponentManager.getButton("decree_policyBtn", "", this.policyBtnHandler, this);
        decree_policyBtn.x = 30;
        decree_policyBtn.y = GameConfig.stageHeigth - this.container.y - 260;
        this._decree_policyBtn = decree_policyBtn;
        this._nodeContainer.addChild(decree_policyBtn);
        //政令btn
        var decree_paperBtn = ComponentManager.getButton("decree_paperBtn", "", this.paperBtnHandler, this);
        decree_paperBtn.x = GameConfig.stageWidth - 130;
        decree_paperBtn.y = decree_policyBtn.y;
        this._decree_paperBtn = decree_paperBtn;
        this._nodeContainer.addChild(decree_paperBtn);
        var bseH = 0;
        this._editBtn = ComponentManager.getButton("palace_editBtn2", "", this.editBtnClickHandler, this);
        this._editBtn.x = GameConfig.stageWidth - this._editBtn.width - 30;
        this._editBtn.y = 20; //- this._editBtn.height;
        // this._editBtn.visible = false;
        this._nodeContainer.addChild(this._editBtn);
        var onlineBtn = ComponentManager.getButton("decree_onlineBtn", "", this.onlineBtnHandler, this);
        onlineBtn.x = this._editBtn.x + this._editBtn.width / 2 - onlineBtn.width / 2;
        onlineBtn.y = this._editBtn.y + this._editBtn.height + 10;
        this._nodeContainer.addChild(onlineBtn);
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var hisBtn = ComponentManager.getButton("palace_hisBtn1", "", this.hisBtnClickHandler, this);
            hisBtn.x = -10;
            hisBtn.y = bseH - 7;
            bseH += 130;
            this._nodeContainer.addChild(hisBtn);
        }
        var kingsBtn = ComponentManager.getButton("palace_kingslogBtn", "", this.kingsBtnClickHandler, this);
        kingsBtn.x = -10;
        kingsBtn.y = bseH - 25;
        this._nodeContainer.addChild(kingsBtn);
        this._topTxtBg = BaseBitmap.create("public_9_bg25");
        this._topTxtBg.x = this.width / 2 + 10;
        this._topTxtBg.height = 100;
        this._topTxtBg.width = 200;
        this._topTxtBg.y = GameConfig.stageHeigth - 480;
        this._topTxtBg.alpha = 0;
        this.addChild(this._topTxtBg);
        var tailImg = BaseBitmap.create("public_9_bg42_tail");
        tailImg.x = this._topTxtBg.x + 20;
        tailImg.y = this._topTxtBg.y + this._topTxtBg.height - 4;
        this.addChild(tailImg);
        this._tailImg = tailImg;
        this._tailImg.alpha = 0;
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        txt.multiline = true;
        txt.lineSpacing = 5;
        txt.width = this._topTxtBg.width - 40;
        txt.x = this._topTxtBg.x + 20;
        txt.y = this._topTxtBg.y + 20;
        this._signTxt = txt;
        this._signTxt.alpha = 0;
        this.addChild(txt);
        this.tick();
        if (this._kingsSign != "") {
            egret.Tween.get(this, { loop: false }).wait(500).call(this.showRoleSign, this);
        }
        //主线引导
        if (Api.otherInfoVoApi.getPalaceFlag() == 0) {
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(npc2Btn, npc2Btn.width / 2 - 10, 10, [npc2Btn], 115, true, function () {
                return true;
            }, this);
        }
    };
    PalaceKingsHouseView.prototype.onlineBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DECREEONLINESETTINGPOPUPVIEW);
    };
    PalaceKingsHouseView.prototype.policyBtnHandler = function () {
        if (Api.promoteVoApi.getSpid()) {
            var newSpid = Number(Api.promoteVoApi.getSinfo().nextinfo.spid);
            if (newSpid && newSpid > 0) {
                ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYCHANGEPOPUPVIEW);
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYDETAILPOPUPVIEW);
            }
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYLISTPOPUPVIEW);
        }
        // ViewController.getInstance().openView(ViewConst.POPUP.DECREERESCRIPTDISPLAYPOPUPVIEW);
    };
    PalaceKingsHouseView.prototype.refreshRedPoints = function () {
        var npc1Btn = this._nodeContainer.getChildByName("npc1Btn");
        var npc2Btn = this._nodeContainer.getChildByName("npc2Btn");
        if (Api.otherInfoVoApi.getPalaceFlag() == 0) {
            App.CommonUtil.addIconToBDOC(npc2Btn);
            var reddot = npc2Btn.getChildByName("reddot");
            reddot.x = 90;
            reddot.y = npc2Btn.height / 2 - 30;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(npc2Btn);
        }
        if (Api.promoteVoApi.isPositionEmpty()) {
            App.CommonUtil.addIconToBDOC(npc1Btn);
            var reddot = npc1Btn.getChildByName("reddot");
            reddot.x = 95;
            reddot.y = npc1Btn.height / 2 - 20;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(npc1Btn);
        }
    };
    PalaceKingsHouseView.prototype.npcBtnHandler = function (params) {
        if (params == 1) {
            ViewController.getInstance().openView(ViewConst.COMMON.PROMOTEVIEW);
        }
        else if (params == 2 && (Api.otherInfoVoApi.getPalaceFlag() == 0)) {
            NetManager.request(NetRequestConst.REQUEST_PALACE_GETSALARY, {});
        }
    };
    PalaceKingsHouseView.prototype.paperBtnHandler = function () {
        var gid = Number(Api.promoteVoApi.getGdinfo().gdid);
        if (gid && gid > 0) {
            ViewController.getInstance().openView(ViewConst.POPUP.DECREEPAPERDETAILPOPUPVIEW);
        }
        else {
            ViewController.getInstance().openView(ViewConst.BASE.DECREEPAPERVIEW);
        }
    };
    PalaceKingsHouseView.prototype.editBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PALACEEDITSIGNPOPUPVIEW, this._curTitleId);
    };
    PalaceKingsHouseView.prototype.kingsBtnClickHandler = function () {
        Api.emperorwarVoApi.openEmpView();
        this.hide();
    };
    PalaceKingsHouseView.prototype.makeCollectFlag = function (isShowAni) {
        if (isShowAni === void 0) { isShowAni = false; }
        var npc2Btn = this._nodeContainer.getChildByName("npc2Btn");
        npc2Btn.touchEnabled = false;
        var collectFlag = BaseBitmap.create("palace_collectflag2");
        // collectFlag.setScale(0.7);
        collectFlag.anchorOffsetX = collectFlag.width / 2;
        collectFlag.anchorOffsetY = collectFlag.height / 2;
        collectFlag.x = npc2Btn.x + npc2Btn.width / 2;
        collectFlag.y = npc2Btn.y + npc2Btn.height / 2 - 10;
        this._nodeContainer.addChild(collectFlag);
        if (isShowAni) {
            collectFlag.setScale(1.3);
            collectFlag.visible = true;
            egret.Tween.get(collectFlag, { loop: false }).to({ scaleX: 1.0, scaleY: 1.0 }, 300);
        }
    };
    //领取俸禄
    PalaceKingsHouseView.prototype.collectBtnClickHandlerCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rData = event.data.data;
            //  this._collectNode.visible = false;
            var gem = Config.LevelCfg.getCfgByLevel(String(Api.playerVoApi.getPlayerLevel())).gem;
            var rewardStr = "1_0_" + String(gem);
            var rList = GameData.formatRewardItem(rewardStr);
            App.CommonUtil.playRewardFlyAction(rList);
            this.makeCollectFlag(true);
            App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
            this._mainTaskHandKey = null;
        }
    };
    PalaceKingsHouseView.prototype.collectBtnClickHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETSALARY, {});
    };
    PalaceKingsHouseView.prototype.hisBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PALACEHISTORYPOPUPVIEW, { titleId: this._curTitleId, dataList: this._kingsList });
    };
    PalaceKingsHouseView.prototype.receiveData = function (data) {
        if (data && data.ret) {
            var rData = data.data;
            this._kingsList = rData.data.kinglist;
            this._kingsSign = rData.data.info.sign;
            // if(this._kingsSign != "")
            // {
            //     egret.Tween.get(this,{loop:false}).wait(500).call(this.showRoleSign,this);
            // }
        }
    };
    PalaceKingsHouseView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_POLICY_INDEX, requestData: {} };
    };
    PalaceKingsHouseView.prototype.getPromoteList = function (evt) {
        if (evt && evt.data && evt.data.ret) {
            var list = evt.data.data.data;
            if (list) {
                Api.promoteVoApi.initListData(list);
            }
        }
    };
    PalaceKingsHouseView.prototype.showSignAfterEdit = function (event) {
        if (event && event.data && event.data.ret) {
            var data = event.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal("palace_edit_succeed"));
            var signStr = data.data.sign;
            this.showRoleSign(signStr);
        }
    };
    PalaceKingsHouseView.prototype.showRoleSign = function (signStr) {
        if (!signStr) {
            signStr = this._kingsSign;
        }
        if (signStr && signStr != "" && this._topTxtBg) {
            egret.Tween.removeTweens(this._topTxtBg);
            egret.Tween.removeTweens(this._signTxt);
            egret.Tween.removeTweens(this._tailImg);
            this._topTxtBg.alpha = 1;
            this._signTxt.alpha = 1;
            this._tailImg.alpha = 1;
            this._signTxt.text = signStr;
            this._topTxtBg.height = this._signTxt.height + 40;
            this._tailImg.y = this._topTxtBg.y + this._topTxtBg.height - 4;
            egret.Tween.get(this._topTxtBg, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
            egret.Tween.get(this._signTxt, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
            egret.Tween.get(this._tailImg, { loop: false }).wait(3000).to({ alpha: 0 }, 1000);
        }
    };
    PalaceKingsHouseView.prototype.tick = function () {
        if (Api.promoteVoApi.getKingEndtime() == GameData.serverTime) {
            var msg = LanguageManager.getlocal("decree_kingsOutTime");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: msg,
                callback: this.hide,
                handler: this,
                needCancel: false
            });
        }
        this.refreshRedPoints();
        var spidN = Number(Api.promoteVoApi.getSpid());
        var gdidN = Number(Api.promoteVoApi.getGdinfo().gdid);
        if (spidN && spidN != 0) {
            App.CommonUtil.removeIconFromBDOC(this._decree_policyBtn);
        }
        else {
            App.CommonUtil.addIconToBDOC(this._decree_policyBtn);
            var reddot = this._decree_policyBtn.getChildByName("reddot");
            reddot.x = 70;
            reddot.y = 80;
        }
        if (gdidN && gdidN != 0) {
            App.CommonUtil.removeIconFromBDOC(this._decree_paperBtn);
        }
        else {
            App.CommonUtil.addIconToBDOC(this._decree_paperBtn);
            var reddot = this._decree_paperBtn.getChildByName("reddot");
            reddot.x = 70;
            reddot.y = 80;
        }
        return true;
    };
    PalaceKingsHouseView.prototype.kingsOutTimeHandler = function () {
        this.hide();
    };
    PalaceKingsHouseView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "palace_kingslogBtn_down", "palace_kingslogBtn", "palace_hisBtn1", "palace_hisBtn1_down",
            "palace_editBtn2_down", "palace_editBtn2", "palace_bg5",
            ,
            "palace_titlebg", "palace_role_shadow",
            "palace_role_empty", "palace_historyBtn", "palace_historyBtn_down", "wifeview_bottombg",
            "palace_rewardbg", "servant_attributemap",
            "palace_editBtn_down", "palace_editBtn", "palace_collectflag2",
            "decree_appointBtn_down", "decree_appointBtn", "decree_collectBtn_down",
            "decree_collectBtn", "decree_paperBtn_down", "decree_paperBtn", "decree_policyBtn_down", "decree_policyBtn",
            "decree_npc1", "decree_npc1_down",
            "decree_npc2", "decree_npc2_down", "decree_collectbg", "popupview_closebtn1",
            "decree_onlineBtn", "decree_onlineBtn_down",
        ]);
    };
    PalaceKingsHouseView.prototype.getRuleInfo = function () {
        return "palaceKingshouse_roleinfo";
    };
    PalaceKingsHouseView.prototype.getRuleInfoParam = function () {
        var zoneStr = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        return [zoneStr + ""];
    };
    PalaceKingsHouseView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETSIGN), this.showSignAfterEdit, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY), this.collectBtnClickHandlerCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_INDEX), this.getPromoteList, this);
        this._nodeContainer = null;
        this._collectNode = null;
        this._curRoleImg = null;
        this._editBtn = null;
        this._palace_rewardbg = null;
        this._collectBtn = null;
        this._curTitleId = null;
        this._kingsList = null;
        this._kingsSign = null;
        this._topTxtBg = null;
        this._signTxt = null;
        this._tailImg = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return PalaceKingsHouseView;
}(CommonView));
__reflect(PalaceKingsHouseView.prototype, "PalaceKingsHouseView");
//# sourceMappingURL=PalaceKingsHouseView.js.map