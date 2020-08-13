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
var AcEnjoyNightExchangeView = (function (_super) {
    __extends(AcEnjoyNightExchangeView, _super);
    function AcEnjoyNightExchangeView() {
        var _this = _super.call(this) || this;
        _this._downNode = null;
        _this._itemNUm = null;
        _this._desc = null;
        return _this;
    }
    Object.defineProperty(AcEnjoyNightExchangeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightExchangeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightExchangeView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightExchangeView.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightExchangeView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightExchangeView.prototype, "aidAndCode", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    // protected getRuleInfo() : string
    // {
    //     return `acEnjoyNightExchangeRule-` + this.uicode;
    // }
    AcEnjoyNightExchangeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acenjoynight_prebg-" + this.uicode, "progress3", "progress3_bg", "acenjoynight_exchangebb2", "acenjoynight_exchangebb1", "servant_detailBtn",
            "acenjoynight_got",
        ]);
    };
    AcEnjoyNightExchangeView.prototype.getShowHeight = function () {
        return 795 + 10;
    };
    AcEnjoyNightExchangeView.prototype.getShowWidth = function () {
        return 560;
    };
    AcEnjoyNightExchangeView.prototype.getTitleStr = function () {
        return "acTreasureOfficeTitle-1";
    };
    AcEnjoyNightExchangeView.prototype.detailBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW, {
            scene: 'cityScene',
            key: '204',
        });
    };
    AcEnjoyNightExchangeView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        var bg = BaseBitmap.create("acenjoynight_prebg-" + this.uicode);
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        view.addChildToContainer(bg);
        var detailBtn = ComponentManager.getButton("servant_detailBtn", "", view.detailBtnHandler, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, detailBtn, bg, [5, 35]);
        view.addChildToContainer(detailBtn);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightOfficeTip1-" + view.uicode), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0, 5]);
        var line = BaseBitmap.create("public_line3");
        line.width = 400;
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0, tipTxt.textHeight + 15]);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_name_204"), 22, TextFieldConst.COLOR_WHITE);
        view.addChildToContainer(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, line);
        var tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_desc_204"), 20, TextFieldConst.COLOR_WHITE);
        view.addChildToContainer(tipTxt3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt3, tipTxt2, [0, tipTxt2.textHeight + 5]);
        // let tipTxt4 = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightOfficeTip4-${view.uicode}`), 20, TextFieldConst.COLOR_WHITE);
        // view.addChildToContainer(tipTxt4);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt4, bg, [0,130]);
        var desc = ComponentManager.getTextField(" ", 17, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc.width = 510;
        desc.lineSpacing = 5;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        this._desc = desc;
        var bg2 = BaseBitmap.create("acenjoynight_exchangebb2");
        bg2.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg2.width / 2, this.getShowHeight() - bg2.height - 63 - 10);
        view.addChildToContainer(bg2);
        var bg1 = BaseBitmap.create("acenjoynight_exchangebb1");
        bg1.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg1.width / 2, bg2.y - bg1.height);
        view.addChildToContainer(bg1);
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, bg2.y + 3);
        view.addChildToContainer(desc);
        var scenesid = this.cfg.getExchangeSceneId();
        if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid, "cityScene")) {
            this.showExchangeItem();
        }
        else {
            this.showExchangeScene();
        }
    };
    AcEnjoyNightExchangeView.prototype.showExchangeScene = function () {
        this._downNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._downNode);
        this._downNode.y = 608;
        var rectd = new egret.Rectangle(0, 0, 65, 65);
        var icon = BaseLoadBitmap.create("itemicon2009", rectd);
        this._downNode.addChild(icon);
        icon.setPosition(10 + GameData.popupviewOffsetX, 5);
        var progressbar2 = ComponentManager.getProgressBar("progress3", "progress3_bg", 290);
        progressbar2.setPosition(85 + GameData.popupviewOffsetX, 25);
        this._downNode.addChild(progressbar2);
        var needparts = this.cfg.exchangeScene.needParts;
        var needNum = needparts.split("_")[2];
        var hasNum = Api.itemVoApi.getItemNumInfoVoById("2009");
        progressbar2.setText(hasNum + "/" + needNum);
        progressbar2.setPercentage(hasNum / Number(needNum));
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "exchange", this.exchangeScene, this);
        exchangeBtn.setPosition(385 + GameData.popupviewOffsetX, 12);
        this._downNode.addChild(exchangeBtn);
        var str1 = LanguageManager.getlocal("itemName_2009");
        var str2 = LanguageManager.getlocal("changebg_name_" + this.cfg.getExchangeSceneId());
        this._desc.text = LanguageManager.getlocal("acEnjoyNightExchangeDesc-" + this.uicode, [str1, str2, str1]);
    };
    AcEnjoyNightExchangeView.prototype.showExchangeItem = function () {
        if (this._downNode) {
            this._downNode.dispose();
        }
        this._downNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._downNode);
        this._downNode.y = 608;
        var rectd = new egret.Rectangle(0, 0, 65, 65);
        var icon = BaseLoadBitmap.create("itemicon2009", rectd);
        this._downNode.addChild(icon);
        icon.setPosition(180 + GameData.popupviewOffsetX, 5);
        var hasNum = Api.itemVoApi.getItemNumInfoVoById("2009");
        this._itemNUm = ComponentManager.getTextField(String(hasNum), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._itemNUm.setPosition(260 + GameData.popupviewOffsetX, 30);
        this._downNode.addChild(this._itemNUm);
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acEnjoyNightExchangeItem", this.exchangeItem, this);
        exchangeBtn.setPosition(355 + GameData.popupviewOffsetX, 12);
        this._downNode.addChild(exchangeBtn);
        var graybg = BaseBitmap.create("public_9_bg8");
        graybg.width = this.viewBg.width;
        graybg.height = 120;
        graybg.setPosition(0 + GameData.popupviewOffsetX, 300);
        this.addChildToContainer(graybg);
        var gotpic = BaseBitmap.create("acenjoynight_got");
        gotpic.setPosition(this.viewBg.width / 2 - gotpic.width / 2, graybg.y + graybg.height / 2 - gotpic.height / 2);
        this.addChildToContainer(gotpic);
        var str1 = LanguageManager.getlocal("itemName_2009");
        var str2 = LanguageManager.getlocal("changebg_name_" + this.cfg.getExchangeSceneId());
        this._desc.text = LanguageManager.getlocal("acEnjoyNightExchangeDesc2-" + this.uicode, [str2, str1, str1]);
    };
    AcEnjoyNightExchangeView.prototype.exchangeScene = function () {
        var needparts = this.cfg.exchangeScene.needParts;
        var needNum = needparts.split("_")[2];
        var hasNum = Api.itemVoApi.getItemNumInfoVoById("2009");
        if (Number(needNum) > hasNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE), this.useCallback, this);
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE, {
            activeId: this.aidAndCode,
            isscene: 1,
        });
        // this.request(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE, { activeId: this.aidAndCode, isscene: 1 })
    };
    AcEnjoyNightExchangeView.prototype.useCallback = function (event) {
        var view = this;
        var data = event.data.data.data;
        if (data && data.rewards) {
            var rewards = data.rewards;
            var rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
            this.showExchangeItem();
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTEXCHANGE), this.useCallback, this);
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
    AcEnjoyNightExchangeView.prototype.exchangeItem = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTITEMVIEW, {
            aid: view.aid,
            code: view.code,
            uicode: view.uicode,
        });
    };
    AcEnjoyNightExchangeView.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        if (this._itemNUm) {
            var hasNum = Api.itemVoApi.getItemNumInfoVoById("2009");
            this._itemNUm.text = hasNum.toString();
        }
    };
    AcEnjoyNightExchangeView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        this._downNode = null;
        this._itemNUm = null;
        this._desc = null;
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightExchangeView;
}(PopupView));
__reflect(AcEnjoyNightExchangeView.prototype, "AcEnjoyNightExchangeView");
//# sourceMappingURL=AcEnjoyNightExchangeView.js.map