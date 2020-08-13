/**
 * 皇宫
 * author yanyuling
 * date 2017/11/01
 * @class PalaceView
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
var PalaceHouseView = (function (_super) {
    __extends(PalaceHouseView, _super);
    function PalaceHouseView() {
        var _this = _super.call(this) || this;
        _this._kingsList = null;
        _this._kingsSign = "";
        _this._kingsInfo = undefined;
        _this.isGotoKingsHouse = false;
        _this._isself = false;
        _this._upgradebtn = null;
        _this._mainTaskHandKey = null;
        return _this;
    }
    // 标题背景名称
    PalaceHouseView.prototype.getTitleStr = function () {
        return "palace_buildingName" + this.param.data.buildingId;
    };
    PalaceHouseView.prototype.initView = function () {
        var _this = this;
        Api.mainTaskVoApi.checkShowGuide("PalaceHouseView");
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SERVANTBONE, this.addnewdb, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY), this.collectBtnClickHandlerCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_TITLEUPGRADE_MODEL, this.upgradeCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETPALACEINFO), this.palaceInfoHandlerCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._curTitleId = this.param.data.titleId;
        var bgPath = "palace_bg";
        var imgH = 1096;
        if (Config.TitleCfg.isTheKingTitleId(this._curTitleId)) {
            bgPath = "palace_bg4";
            imgH = 1136;
        }
        var palace_bg = BaseLoadBitmap.create(bgPath);
        palace_bg.width = 640;
        palace_bg.height = imgH;
        palace_bg.y = GameConfig.stageHeigth - this.container.y - palace_bg.height;
        this._nodeContainer.addChild(palace_bg);
        this._curRoleImg = new PalaceRoleInfoItem();
        this._curRoleImg.y = 50;
        this._curRoleImg.x = GameConfig.stageWidth / 2 - this._curRoleImg.width / 2;
        this._curRoleImg.visible = false;
        /**
         * 考虑层级问题
         */
        this._nodeContainer.addChild(this._curRoleImg);
        var bseH = GameConfig.stageHeigth - 110 - this.container.y;
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var hisBtn = ComponentManager.getButton(this.getHisBtnPath(), "", this.hisBtnClickHandler, this);
            hisBtn.x = -5;
            hisBtn.y = bseH - 30;
            this._nodeContainer.addChild(hisBtn);
            bseH -= hisBtn.height;
        }
        if (Config.TitleCfg.isTheKingTitleId(this._curTitleId) && this._kingsInfo.uid != "") {
            var kingsBtn = ComponentManager.getButton("palace_kingslogBtn", "", this.kingsBtnClickHandler, this);
            kingsBtn.x = -5;
            kingsBtn.y = bseH;
            this._nodeContainer.addChild(kingsBtn);
        }
        var palace_rewardbg = BaseBitmap.create("palace_rewardbg");
        palace_rewardbg.width = 300;
        if (PlatformManager.checkIsTextHorizontal()) {
            palace_rewardbg.setPosition(GameConfig.stageWidth / 2 - palace_rewardbg.width / 2, 2 * GameConfig.stageHeigth / 3 + 120);
        }
        else {
            palace_rewardbg.x = GameConfig.stageWidth / 2 - palace_rewardbg.width / 2;
            palace_rewardbg.y = bseH;
        }
        this._nodeContainer.addChild(palace_rewardbg);
        this._palace_rewardbg = palace_rewardbg;
        var palace_rewardTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        var gem = Config.LevelCfg.getCfgByLevel(String(Api.playerVoApi.getPlayerLevel())).gem;
        palace_rewardTxt.text = LanguageManager.getlocal("palace_reward", [String(gem)]);
        if (PlatformManager.checkIsTextHorizontal()) {
            palace_rewardTxt.setPosition(GameConfig.stageWidth / 2 - palace_rewardTxt.width / 2, palace_rewardbg.y + palace_rewardbg.height / 2 - palace_rewardTxt.height / 2);
        }
        else {
            palace_rewardTxt.x = GameConfig.stageWidth / 2 - palace_rewardTxt.width / 2;
            palace_rewardTxt.y = palace_rewardbg.y + palace_rewardbg.height / 2 - palace_rewardTxt.height / 2;
        }
        this._nodeContainer.addChild(palace_rewardTxt);
        if (Api.otherInfoVoApi.getPalaceFlag() == 0) {
            var collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.collectBtnClickHandler, this);
            if (PlatformManager.checkIsTextHorizontal()) {
                collectBtn.setPosition(GameConfig.stageWidth / 2 - collectBtn.width / 2, palace_rewardbg.y - 70);
            }
            else {
                collectBtn.x = GameConfig.stageWidth / 2 - collectBtn.width / 2;
                collectBtn.y = palace_rewardbg.y - collectBtn.height / 2 - 40;
            }
            this._nodeContainer.addChild(collectBtn);
            this._collectBtn = collectBtn;
        }
        else {
            var collectFlag = BaseBitmap.create("palace_collectflag");
            collectFlag.setScale(0.7);
            collectFlag.anchorOffsetX = collectFlag.width / 2;
            if (PlatformManager.checkIsTextHorizontal()) {
                collectFlag.setPosition(GameConfig.stageWidth / 2, palace_rewardbg.y - 87);
            }
            else {
                collectFlag.x = GameConfig.stageWidth / 2;
                collectFlag.y = palace_rewardbg.y - collectFlag.height / 2 - 30;
            }
            this._nodeContainer.addChild(collectFlag);
        }
        //主线引导
        if (Api.otherInfoVoApi.getPalaceFlag() == 0) {
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this._collectBtn, this._collectBtn.width / 2 - 10, 10, [this._collectBtn], 115, true, function () {
                return true;
            }, this);
        }
        var upgradeBtn = ComponentManager.getButton("palace_upgradeBtn", '', function () {
            _this._curRoleImg.dispose();
            _this._curRoleImg = null;
            //跳转
            ViewController.getInstance().openView(ViewConst.COMMON.TITLEUPGRADELLEVELUPVIEW, {
                titleid: _this._curTitleId
            });
        }, this);
        upgradeBtn.x = GameConfig.stageWidth - upgradeBtn.width - 20;
        upgradeBtn.y = bseH; //bseH - 15;//- this._editBtn.height;
        upgradeBtn.visible = false;
        this._upgradebtn = upgradeBtn;
        this._nodeContainer.addChild(upgradeBtn);
        if (Api.titleupgradeVoApi.canTitleLevelUp(this._curTitleId) && Api.titleupgradeVoApi.isinTitle(this._curTitleId)) {
            App.CommonUtil.addIconToBDOC(this._upgradebtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._upgradebtn);
        }
        this._editBtn = ComponentManager.getButton("palace_editBtn2", "", this.editBtnClickHandler, this);
        this._editBtn.x = GameConfig.stageWidth - this._editBtn.width - 20;
        // if(PlatformManager.checkIsKRSp()){
        //     this._editBtn.y = bseH - 15;//- this._editBtn.height;
        // }
        // else{
        this._editBtn.y = upgradeBtn.y + 140; //bseH - 15;//- this._editBtn.height;
        // }
        this._nodeContainer.addChild(this._editBtn);
        this.palaceInfoHandlerCallback();
    };
    PalaceHouseView.prototype.getHisBtnPath = function () {
        var titleId = Number(this._curTitleId);
        var titlecfg = Config.TitleCfg.getTitleCfgById(titleId);
        if (Config.TitleCfg.isTheKingTitleId(this._curTitleId)) {
            return "palace_hisBtn1";
        }
        else {
            if (titlecfg.isCross == 1) {
                if (titlecfg.titleType == 7) {
                    return "palace_historyBtn1";
                }
                return "palace_historyBtn";
            }
            else {
                return "palace_hisBtn2";
            }
        }
    };
    PalaceHouseView.prototype.kingsBtnClickHandler = function () {
        Api.emperorwarVoApi.openEmpView();
        this.hide();
    };
    PalaceHouseView.prototype.palaceInfoHandlerCallback = function () {
        if (this._curRoleImg) {
            var myPkey = this._curTitleId;
            var roleinfo = undefined;
            if (Config.TitleCfg.isTheKingTitleId(myPkey)) {
                this._kingsInfo.titleId = myPkey;
                roleinfo = this._kingsInfo;
            }
            else {
                roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(myPkey);
            }
            this._curRoleImg.refreshUIWithData(roleinfo);
            this._curRoleImg.visible = true;
            var btnKey = "palace_collect";
            var puid = roleinfo.uid;
            var isOnly = Config.TitleCfg.getTitleCfgById(myPkey).isOnly;
            this._isself = false;
            if (isOnly == 1 && puid == Api.playerVoApi.getPlayerID()) {
                App.DisplayUtil.changeToNormal(this._editBtn);
                this._isself = true;
                btnKey = "palace_collect2";
                if (Api.switchVoApi.checkTitleUpgrade()) {
                    this._upgradebtn.visible = true;
                    if (Api.titleupgradeVoApi.canTitleLevelUp(this._curTitleId) && Api.titleupgradeVoApi.isinTitle(this._curTitleId)) {
                        App.CommonUtil.addIconToBDOC(this._upgradebtn);
                    }
                    else {
                        App.CommonUtil.removeIconFromBDOC(this._upgradebtn);
                    }
                }
            }
            else {
                App.DisplayUtil.changeToGray(this._editBtn);
            }
            if (this._collectBtn) {
                this._collectBtn.setText(btnKey);
            }
        }
    };
    PalaceHouseView.prototype.editBtnClickHandler = function () {
        if (this._isself) {
            var name_1 = Api.palaceVoApi.getRoleInfoByTitleId(this._curTitleId).name;
            // ViewController.getInstance().openView(ViewConst.POPUP.PALACEEDITSIGNPOPUPVIEW,name);
            ViewController.getInstance().openView(ViewConst.POPUP.PALACEEDITSIGNPOPUPVIEW, this._curTitleId);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("palace_titleNotEdit"));
            return;
        }
    };
    PalaceHouseView.prototype.collectBtnClickHandlerCallback = function (event) {
        if (event && event.data && event.data.ret) {
            this._collectBtn.visible = false;
            var rData = event.data.data.data;
            var collectFlag = BaseBitmap.create("palace_collectflag");
            collectFlag.setScale(0.7);
            collectFlag.anchorOffsetX = collectFlag.width / 2;
            collectFlag.x = GameConfig.stageWidth / 2;
            collectFlag.y = this._palace_rewardbg.y - collectFlag.height / 2 - 30;
            collectFlag.setScale(1.3);
            collectFlag.visible = true;
            this._nodeContainer.addChild(collectFlag);
            egret.Tween.get(collectFlag, { loop: false }).to({ scaleX: 0.7, scaleY: 0.7 }, 300);
            var gem = Config.LevelCfg.getCfgByLevel(String(Api.playerVoApi.getPlayerLevel())).gem;
            var rewardStr = "1_0_" + String(gem);
            var rList = GameData.formatRewardItem(rewardStr);
            var pos = collectFlag.localToGlobal(30, -50);
            pos.x = GameConfig.stageWidth / 2;
            App.CommonUtil.playRewardFlyAction(rList, pos);
        }
    };
    PalaceHouseView.prototype.collectBtnClickHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETSALARY, {});
    };
    // protected hisBtnClickHandler()
    // {
    //     ViewController.getInstance().openView(ViewConst.POPUP.PALACEHISTORYPOPUPVIEW,{titleId:this._curTitleId});
    // }
    PalaceHouseView.prototype.hisBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PALACEHISTORYPOPUPVIEW, { titleId: this._curTitleId, dataList: this._kingsList });
    };
    PalaceHouseView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "palace_titlebg", "palace_role_shadow",
            "palace_role_empty", "palace_historyBtn", "palace_historyBtn_down", "wifeview_bottombg",
            "palace_historyBtn1", "palace_historyBtn1_down",
            "palace_kingslogBtn", "palace_kingslogBtn_down",
            "palace_rewardbg", "servant_attributemap", "palace_upgradeBtn", "palace_upgradeBtn_down",
            "palace_editBtn2_down", "palace_editBtn2", "palace_collectflag", "palace_hisBtn1", "palace_hisBtn2",
        ]);
    };
    PalaceHouseView.prototype.receiveData = function (data) {
        if (data && data.ret) {
            var rData = data.data;
            this._kingsList = rData.data.kinglist;
            this._kingsSign = rData.data.sign;
            this._kingsInfo = rData.data.info;
        }
    };
    PalaceHouseView.prototype.tick = function () {
        var titleId = this.param.data.titleId;
        if (!this.isGotoKingsHouse && titleId && Config.TitleCfg.isTheKingTitleId(titleId) && Api.promoteVoApi.isKing()) {
            this.isGotoKingsHouse = true;
            var msg = LanguageManager.getlocal("decree_tobeNewKingTip");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: msg,
                callback: this.gotoHKingsHouse,
                handler: this,
                needCancel: false
            });
        }
        return true;
    };
    PalaceHouseView.prototype.gotoHKingsHouse = function () {
        Api.palaceVoApi.enterKingsHouse();
        this.hide();
    };
    PalaceHouseView.prototype.getRequestData = function () {
        var titleId = this.param.data.titleId;
        if (titleId && Config.TitleCfg.isTheKingTitleId(titleId)) {
            return { requestType: NetRequestConst.REQUEST_POLICY_INDEX, requestData: {} };
        }
        // return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACEINFO,requestData:{}};
    };
    PalaceHouseView.prototype.getRuleInfo = function () {
        var titleId = this.param.data.titleId;
        if (titleId && Config.TitleCfg.isTheKingTitleId(titleId)) {
            return "palaceKingshouse_roleinfo";
        }
        return null;
    };
    PalaceHouseView.prototype.getRuleInfoParam = function () {
        var zoneStr = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        return [zoneStr + ""];
    };
    PalaceHouseView.prototype.upgradeCallBack = function () {
        if (Api.titleupgradeVoApi.canTitleLevelUp(this._curTitleId) && Api.titleupgradeVoApi.isinTitle(this._curTitleId)) {
            App.CommonUtil.addIconToBDOC(this._upgradebtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._upgradebtn);
        }
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETPALACEINFO, {});
        //this.palaceInfoHandlerCallback();
    };
    PalaceHouseView.prototype.addnewdb = function () {
        var view = this;
        view._curRoleImg = new PalaceRoleInfoItem();
        view._curRoleImg.y = 50;
        view._curRoleImg.x = GameConfig.stageWidth / 2 - this._curRoleImg.width / 2;
        view._curRoleImg.visible = false;
        view._nodeContainer.addChildAt(this._curRoleImg, 1);
        view.palaceInfoHandlerCallback();
    };
    PalaceHouseView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SERVANTBONE, this.addnewdb, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY), this.collectBtnClickHandlerCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETPALACEINFO), this.palaceInfoHandlerCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TITLEUPGRADE_MODEL, this.upgradeCallBack, this);
        this._nodeContainer = null;
        this._curRoleImg = null;
        this._editBtn = null;
        this._palace_rewardbg = null;
        this._collectBtn = null;
        this._curTitleId = null;
        this._kingsList = null;
        this._kingsSign = null;
        this._kingsInfo = null;
        this.isGotoKingsHouse = false;
        this._isself = false;
        _super.prototype.dispose.call(this);
    };
    return PalaceHouseView;
}(CommonView));
__reflect(PalaceHouseView.prototype, "PalaceHouseView");
//# sourceMappingURL=PalaceHouseView.js.map