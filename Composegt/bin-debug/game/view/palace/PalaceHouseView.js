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
        return _super.call(this) || this;
    }
    // 标题背景名称
    PalaceHouseView.prototype.getTitleStr = function () {
        return "palace_buildingName" + this.param.data.buildingId;
    };
    PalaceHouseView.prototype.initView = function () {
        Api.mainTaskVoApi.checkShowGuide("PalaceHouseView");
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY), this.collectBtnClickHandlerCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._curTitleId = this.param.data.titleId;
        var palace_bg = BaseLoadBitmap.create("palace_bg");
        palace_bg.y = GameConfig.stageHeigth - this.container.y - 1096;
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
        }
        var palace_rewardbg = BaseBitmap.create("public_lockbg");
        // palace_rewardbg.width = 300;
        palace_rewardbg.scaleX = 1.3;
        palace_rewardbg.x = GameConfig.stageWidth / 2 - palace_rewardbg.width * palace_rewardbg.scaleX / 2;
        palace_rewardbg.y = bseH;
        this._nodeContainer.addChild(palace_rewardbg);
        this._palace_rewardbg = palace_rewardbg;
        var palace_rewardTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        var gem = Config.LevelCfg.getCfgByLevel(String(Api.playerVoApi.getPlayerLevel())).gem;
        palace_rewardTxt.text = LanguageManager.getlocal("palace_reward", [String(gem)]);
        palace_rewardTxt.x = GameConfig.stageWidth / 2 - palace_rewardTxt.width / 2;
        palace_rewardTxt.y = palace_rewardbg.y + palace_rewardbg.height / 2 - palace_rewardTxt.height / 2;
        this._nodeContainer.addChild(palace_rewardTxt);
        if (Api.otherInfoVoApi.getPalaceFlag() == 0) {
            var collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.collectBtnClickHandler, this);
            collectBtn.x = GameConfig.stageWidth / 2 - collectBtn.width / 2;
            collectBtn.y = palace_rewardbg.y - collectBtn.height / 2 - 40;
            this._nodeContainer.addChild(collectBtn);
            this._collectBtn = collectBtn;
        }
        else {
            var collectFlag = BaseBitmap.create("achievement_state3");
            collectFlag.setScale(0.9);
            collectFlag.anchorOffsetX = collectFlag.width / 2;
            collectFlag.x = GameConfig.stageWidth / 2;
            collectFlag.y = palace_rewardbg.y - collectFlag.height / 2 - 40;
            this._nodeContainer.addChild(collectFlag);
        }
        this._editBtn = ComponentManager.getButton("palace_editBtn", "", this.editBtnClickHandler, this);
        this._editBtn.x = GameConfig.stageWidth - this._editBtn.width - 20;
        this._editBtn.y = bseH - 15; //- this._editBtn.height;
        this._editBtn.visible = false;
        this._nodeContainer.addChild(this._editBtn);
        this.palaceInfoHandlerCallback();
    };
    PalaceHouseView.prototype.getHisBtnPath = function () {
        var titleId = Number(this._curTitleId);
        var titlecfg = Config.TitleCfg.getTitleCfgById(titleId);
        if (titlecfg.isCross == 1) {
            return "palace_hisBtn1";
        }
        else {
            return "palace_hisBtn2";
        }
    };
    PalaceHouseView.prototype.palaceInfoHandlerCallback = function () {
        var myPkey = this._curTitleId;
        var roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(myPkey);
        this._curRoleImg.refreshUIWithData(roleinfo);
        this._curRoleImg.visible = true;
        var btnKey = "palace_collect";
        var puid = roleinfo.uid;
        var isOnly = Config.TitleCfg.getTitleCfgById(myPkey).isOnly;
        if (isOnly == 1 && puid == Api.playerVoApi.getPlayerID()) {
            this._editBtn.visible = true;
            btnKey = "palace_collect2";
        }
        else {
            this._editBtn.visible = false;
            // this._editBtn.visible = true; //test
        }
        if (this._collectBtn) {
            this._collectBtn.setText(btnKey);
        }
    };
    PalaceHouseView.prototype.editBtnClickHandler = function () {
        var name = Api.palaceVoApi.getRoleInfoByTitleId(this._curTitleId).name;
        // ViewController.getInstance().openView(ViewConst.POPUP.PALACEEDITSIGNPOPUPVIEW,name);
        ViewController.getInstance().openView(ViewConst.POPUP.PALACEEDITSIGNPOPUPVIEW, this._curTitleId);
    };
    PalaceHouseView.prototype.collectBtnClickHandlerCallback = function (event) {
        this._collectBtn.visible = false;
        var rData = event.data.data.data;
        var collectFlag = BaseBitmap.create("achievement_state3");
        collectFlag.setScale(0.7);
        collectFlag.anchorOffsetX = collectFlag.width / 2;
        collectFlag.x = GameConfig.stageWidth / 2;
        collectFlag.y = this._palace_rewardbg.y - collectFlag.height / 2 - 40;
        collectFlag.setScale(1.3);
        collectFlag.visible = true;
        this._nodeContainer.addChild(collectFlag);
        egret.Tween.get(collectFlag, { loop: false }).to({ scaleX: 0.9, scaleY: 0.9 }, 300);
        var gem = Config.LevelCfg.getCfgByLevel(String(Api.playerVoApi.getPlayerLevel())).gem;
        var rewardStr = "1_0_" + String(gem);
        var rList = GameData.formatRewardItem(rewardStr);
        var pos = collectFlag.localToGlobal(30, -50);
        pos.x = GameConfig.stageWidth / 2;
        App.CommonUtil.playRewardFlyAction(rList, pos);
    };
    PalaceHouseView.prototype.collectBtnClickHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETSALARY, {});
    };
    PalaceHouseView.prototype.hisBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.PALACEHISTORYPOPUPVIEW, { titleId: this._curTitleId });
    };
    PalaceHouseView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "palace_role_shadow",
            "palace_role_empty", "wifeview_bottombg",
            "palace_editBtn",
            // "playerview_powerbg",
            "palace_diban_01",
            "achievement_state3",
            "commonview_tipbg"
        ]);
    };
    PalaceHouseView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY), this.collectBtnClickHandlerCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETPALACEINFO), this.palaceInfoHandlerCallback, this);
        this._nodeContainer = null;
        this._curRoleImg = null;
        this._editBtn = null;
        this._palace_rewardbg = null;
        this._collectBtn = null;
        this._curTitleId = null;
        _super.prototype.dispose.call(this);
    };
    return PalaceHouseView;
}(CommonView));
__reflect(PalaceHouseView.prototype, "PalaceHouseView");
