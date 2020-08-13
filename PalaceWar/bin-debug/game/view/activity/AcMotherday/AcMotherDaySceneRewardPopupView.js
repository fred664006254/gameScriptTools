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
  * 缤纷拼图 场景
  * @author 张朝阳
  * date 2019/7/15
  * @class AcMotherDaySceneRewardPopupView
  */
var AcMotherDaySceneRewardPopupView = (function (_super) {
    __extends(AcMotherDaySceneRewardPopupView, _super);
    function AcMotherDaySceneRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._downNode = null;
        _this._itemNUm = null;
        _this._desc = null;
        _this._needPartsVo = null;
        _this._sceneRewardVo = null;
        return _this;
    }
    AcMotherDaySceneRewardPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOTHERDAY_EXCHANGEMOTHERDAYSCENE, this.useCallback, this);
        this._needPartsVo = GameData.formatRewardItem(this.cfg.exchangeScene.needParts)[0];
        this._sceneRewardVo = GameData.formatRewardItem(this.cfg.exchangeScene.getReward)[0];
        var scenesid = String(this._sceneRewardVo.id);
        var sceneName = "";
        if (String(scenesid)[0] == "1") {
            sceneName = "homeScene";
        }
        else if (String(scenesid)[0] == "2") {
            sceneName = "cityScene";
        }
        else if (String(scenesid)[0] == "3") {
            sceneName = "searchScene";
        }
        var bg = BaseLoadBitmap.create("acmotherdayview_scenebg-" + this.uicode);
        bg.width = 548;
        bg.height = 731;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        view.addChildToContainer(bg);
        var detailBtn = ComponentManager.getButton("servant_detailBtn", "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW, {
                scene: sceneName,
                key: scenesid,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, detailBtn, bg, [5, 35]);
        view.addChildToContainer(detailBtn);
        var servantCfg = Config.ServantCfg.getServantItemById(Config.SceneCfg.getSceneCfgBySceneName(sceneName, scenesid).personalityCfg.servant);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("changebg_servant_promote", [servantCfg.name]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0, 7]);
        var line = BaseBitmap.create("public_line3");
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_name_" + scenesid), 22, TextFieldConst.COLOR_WHITE);
        line.width += tipTxt2.width;
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0, tipTxt.textHeight + 15]);
        view.addChildToContainer(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, line);
        var tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_desc_" + scenesid), 20, TextFieldConst.COLOR_WHITE);
        view.addChildToContainer(tipTxt3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt3, tipTxt2, [0, tipTxt2.textHeight + 5]);
        var desc = ComponentManager.getTextField(" ", 17, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc.width = 510;
        desc.lineSpacing = 5;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        this._desc = desc;
        var bg2 = BaseBitmap.create("acenjoynight_exchangebb2");
        bg2.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg2.width / 2, this.getShowHeight() - bg2.height - 63 - 10);
        view.addChildToContainer(bg2);
        var bg1 = BaseBitmap.create("acenjoynight_exchangebb1");
        bg1.width = bg2.width;
        bg1.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg1.width / 2, bg2.y - bg1.height);
        view.addChildToContainer(bg1);
        bg1.name = "bg1";
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, bg2.y + 3);
        view.addChildToContainer(desc);
        if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid, sceneName)) {
            this.showExchangeItem();
        }
        else {
            this.showExchangeScene();
        }
    };
    AcMotherDaySceneRewardPopupView.prototype.showExchangeScene = function () {
        this._downNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._downNode);
        this._downNode.y = 608;
        var rectd = new egret.Rectangle(0, 0, 65, 65);
        var icon = BaseLoadBitmap.create("itemicon" + this._needPartsVo.id, rectd);
        this._downNode.addChild(icon);
        icon.setPosition(10 + GameData.popupviewOffsetX, 5);
        var progressbar2 = ComponentManager.getProgressBar("progress3", "progress3_bg", 290);
        progressbar2.setPosition(85 + GameData.popupviewOffsetX, 25);
        this._downNode.addChild(progressbar2);
        var needparts = this.cfg.exchangeScene.needParts;
        var needNum = needparts.split("_")[2];
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this._needPartsVo.id);
        progressbar2.setText(hasNum + "/" + needNum);
        progressbar2.setPercentage(hasNum / Number(needNum));
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "exchange", this.exchangeScene, this);
        exchangeBtn.setPosition(385 + GameData.popupviewOffsetX, 12);
        this._downNode.addChild(exchangeBtn);
        var scenesid = String(this._sceneRewardVo.id);
        var sceneName = "";
        if (String(scenesid)[0] == "1") {
            sceneName = "homeScene";
        }
        else if (String(scenesid)[0] == "2") {
            sceneName = "cityScene";
        }
        else if (String(scenesid)[0] == "3") {
            sceneName = "searchScene";
        }
        var str1 = LanguageManager.getlocal("itemName_" + this._needPartsVo.id);
        var str2 = LanguageManager.getlocal("changebg_name_" + String(this._sceneRewardVo.id));
        this._desc.text = LanguageManager.getlocal("acMotherDaySceneRewardPopupViewDesc-3", [String(this._needPartsVo.num), str1, str2, str1]);
    };
    AcMotherDaySceneRewardPopupView.prototype.showExchangeItem = function () {
        if (this._downNode) {
            this._downNode.dispose();
        }
        this._downNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._downNode);
        this._downNode.y = 608;
        // let rectd = new egret.Rectangle(0, 0, 65, 65);
        // let icon = BaseLoadBitmap.create("itemicon" + this._needPartsVo.id, rectd);
        // this._downNode.addChild(icon);
        // icon.setPosition(180, 5);
        // let hasNum: number = Api.itemVoApi.getItemNumInfoVoById(this._needPartsVo.id);
        // this._itemNUm = ComponentManager.getTextField(String(hasNum), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._itemNUm.setPosition(260, 30);
        // this._downNode.addChild(this._itemNUm);
        // let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acEnjoyNightExchangeItem", this.exchangeItem, this)
        // exchangeBtn.setPosition(355, 12);
        // this._downNode.addChild(exchangeBtn);
        var bg1 = this.container.getChildByName("bg1");
        if (bg1) {
            bg1.visible = false;
        }
        var graybg = BaseBitmap.create("public_9_bg8");
        graybg.width = this.viewBg.width;
        graybg.height = 120;
        graybg.setPosition(0 + GameData.popupviewOffsetX, 300);
        this.addChildToContainer(graybg);
        var gotpic = BaseBitmap.create("acenjoynight_got");
        gotpic.setPosition(this.viewBg.width / 2 - gotpic.width / 2, graybg.y + graybg.height / 2 - gotpic.height / 2);
        this.addChildToContainer(gotpic);
        var str1 = LanguageManager.getlocal("itemName_" + this._needPartsVo.id);
        var str2 = LanguageManager.getlocal("changebg_name_" + String(this._sceneRewardVo.id));
        this._desc.text = LanguageManager.getlocal("acMotherDaySceneRewardPopupViewDesc2-3", [str2, str1, str1]);
    };
    AcMotherDaySceneRewardPopupView.prototype.exchangeScene = function () {
        var needparts = this.cfg.exchangeScene.needParts;
        var needNum = needparts.split("_")[2];
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this._needPartsVo.id);
        if (Number(needNum) > hasNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_MOTHERDAY_EXCHANGEMOTHERDAYSCENE, {
            activeId: this.aidAndCode,
        });
    };
    AcMotherDaySceneRewardPopupView.prototype.useCallback = function (event) {
        var view = this;
        if (!event.data.ret) {
            return;
        }
        var data = event.data.data.data;
        if (data && data.rewards) {
            var rewards = data.rewards;
            var rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
            this.showExchangeItem();
        }
    };
    // protected receiveData(data: { ret: boolean, data: any }): void 
    // {
    //     if (data.ret)
    //     {
    //         let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
    //         App.CommonUtil.playRewardFlyAction(rewardList);
    //         this.showExchangeItem();
    //     }
    // }
    AcMotherDaySceneRewardPopupView.prototype.exchangeItem = function () {
        var view = this;
        // ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTITEMVIEW, {
        //     aid: view.aid,
        //     code: view.code,
        //     uicode: view.uicode,
        // });
    };
    AcMotherDaySceneRewardPopupView.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        if (this._itemNUm) {
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(this._needPartsVo.id);
            this._itemNUm.text = hasNum.toString();
        }
    };
    Object.defineProperty(AcMotherDaySceneRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMotherDaySceneRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMotherDaySceneRewardPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMotherDaySceneRewardPopupView.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMotherDaySceneRewardPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMotherDaySceneRewardPopupView.prototype, "aidAndCode", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcMotherDaySceneRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress3", "progress3_bg", "acenjoynight_exchangebb2", "acenjoynight_exchangebb1", "servant_detailBtn",
            "acenjoynight_got",
        ]);
    };
    AcMotherDaySceneRewardPopupView.prototype.getShowHeight = function () {
        return 795 + 10;
    };
    AcMotherDaySceneRewardPopupView.prototype.getShowWidth = function () {
        return 560;
    };
    AcMotherDaySceneRewardPopupView.prototype.getTitleStr = function () {
        return "acTreasureOfficeTitle-1";
    };
    AcMotherDaySceneRewardPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOTHERDAY_EXCHANGEMOTHERDAYSCENE, this.useCallback, this);
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        this._downNode = null;
        this._itemNUm = null;
        this._desc = null;
        _super.prototype.dispose.call(this);
    };
    return AcMotherDaySceneRewardPopupView;
}(PopupView));
__reflect(AcMotherDaySceneRewardPopupView.prototype, "AcMotherDaySceneRewardPopupView");
//# sourceMappingURL=AcMotherDaySceneRewardPopupView.js.map