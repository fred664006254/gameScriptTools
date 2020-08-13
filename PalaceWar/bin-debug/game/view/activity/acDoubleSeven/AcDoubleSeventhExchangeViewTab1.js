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
var AcDoubleSeventhExchangeViewTab1 = (function (_super) {
    __extends(AcDoubleSeventhExchangeViewTab1, _super);
    function AcDoubleSeventhExchangeViewTab1() {
        var _this = _super.call(this) || this;
        _this._downNode = null;
        _this._itemNUm = null;
        _this._desc = null;
        _this._bg2 = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDoubleSeventhExchangeViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeViewTab1.prototype, "sceneType", {
        get: function () {
            return "searchScene";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhExchangeViewTab1.prototype, "requestStr", {
        get: function () {
            return NetRequestConst.REQUST_ACTIVITY_GETDOUBLESEVENTHEXCHANGE;
        },
        enumerable: true,
        configurable: true
    });
    AcDoubleSeventhExchangeViewTab1.prototype.detailBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW, {
            scene: this.sceneType,
            key: this.cfg.getExchangeSceneId(),
        });
    };
    AcDoubleSeventhExchangeViewTab1.prototype.initView = function () {
        var view = this;
        view.height = 677;
        view.width = 560;
        var sid = this.cfg.getExchangeSceneId();
        var bg = BaseBitmap.create("scene_preview_bg_" + sid);
        bg.setPosition(this.width / 2 - bg.width / 2 + 5, 55);
        view.addChild(bg);
        var detailBtn = ComponentManager.getButton("servant_detailBtn", "", view.detailBtnHandler, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, detailBtn, bg, [5, 35]);
        view.addChild(detailBtn);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("exchangeSceneDesc_" + sid), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bg, [0, 8]);
        var line = BaseBitmap.create("public_line3");
        line.width = 400;
        view.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0, tipTxt.textHeight + 15]);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_name_" + sid), 22, TextFieldConst.COLOR_WHITE);
        view.addChild(tipTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, line);
        var tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_desc_" + sid), 20, TextFieldConst.COLOR_WHITE);
        view.addChild(tipTxt3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt3, tipTxt2, [0, tipTxt2.textHeight + 5]);
        var desc = ComponentManager.getTextField(" ", 17, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc.width = 510;
        desc.lineSpacing = 5;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        this._desc = desc;
        var bg2 = BaseBitmap.create("acenjoynight_exchangebb2");
        bg2.height = 32;
        bg2.width = bg.width + 2;
        bg2.setPosition(bg.x - 1, bg.y + bg.height - bg2.height + 2);
        view.addChild(bg2);
        var bg1 = BaseBitmap.create("acenjoynight_exchangebb1");
        bg1.setPosition(bg.x - 1, bg2.y - bg1.height);
        view.addChild(bg1);
        bg1.width = bg.width + 2;
        desc.setPosition(this.width / 2 - desc.width / 2, bg2.y + 9);
        view.addChild(desc);
        this._bg2 = bg1;
        var scenesid = this.cfg.getExchangeSceneId();
        if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid, this.sceneType)) {
            this.showExchangeItem();
        }
        else {
            this.showExchangeScene();
        }
    };
    AcDoubleSeventhExchangeViewTab1.prototype.showExchangeScene = function () {
        this._downNode = new BaseDisplayObjectContainer();
        this.addChild(this._downNode);
        this._downNode.y = 630;
        var rectd = new egret.Rectangle(0, 0, 65, 65);
        var icon = BaseLoadBitmap.create("itemicon" + this.cfg.getExchangeNeedItemId(), rectd);
        this._downNode.addChild(icon);
        icon.setPosition(10, 5);
        var progressbar2 = ComponentManager.getProgressBar("progress3", "progress3_bg", 290);
        progressbar2.setPosition(85, 25);
        this._downNode.addChild(progressbar2);
        var needparts = this.cfg.exchange.needPart;
        var needNum = needparts.split("_")[2];
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
        progressbar2.setText(hasNum + "/" + needNum);
        progressbar2.setPercentage(hasNum / Number(needNum));
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "exchange", this.exchangeScene, this);
        exchangeBtn.setPosition(385, 12);
        this._downNode.addChild(exchangeBtn);
        var graybg2 = BaseBitmap.create("public_9_bg8");
        graybg2.width = this._bg2.width;
        graybg2.height = 35;
        graybg2.setPosition(this._bg2.x, -graybg2.height);
        this._downNode.addChild(graybg2);
        var sid = this.cfg.getExchangeSceneId();
        var tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("exchangeSceneFit_" + sid), 20, TextFieldConst.COLOR_WHITE);
        this._downNode.addChild(tipTxt3);
        tipTxt3.setPosition(graybg2.x + graybg2.width / 2 - tipTxt3.width / 2, graybg2.y + 8);
        var str1 = LanguageManager.getlocal("itemName_" + this.cfg.getExchangeNeedItemId());
        var str2 = LanguageManager.getlocal("changebg_name_" + this.cfg.getExchangeSceneId());
        this._desc.text = LanguageManager.getlocal("exchangeSceneDesc1", [str1, str2]);
    };
    AcDoubleSeventhExchangeViewTab1.prototype.showExchangeItem = function () {
        if (this._downNode) {
            this._downNode.dispose();
        }
        if (this._bg2) {
            this._bg2.visible = false;
        }
        this._downNode = new BaseDisplayObjectContainer();
        this.addChild(this._downNode);
        this._downNode.y = 608;
        var graybg = BaseBitmap.create("public_9_bg8");
        graybg.width = this._bg2.width;
        graybg.height = 120;
        graybg.setPosition(this._bg2.x, 300);
        this.addChild(graybg);
        var gotpic = BaseBitmap.create("acenjoynight_got");
        gotpic.setPosition(this.width / 2 - gotpic.width / 2, graybg.y + graybg.height / 2 - gotpic.height / 2);
        this.addChild(gotpic);
        var graybg2 = BaseBitmap.create("public_9_bg8");
        graybg2.width = this._bg2.width;
        graybg2.height = 35;
        graybg2.setPosition(this._bg2.x, this._bg2.y + this._bg2.height - graybg2.height + 1);
        this.addChild(graybg2);
        var sid = this.cfg.getExchangeSceneId();
        var tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("exchangeSceneFit_" + sid), 20, TextFieldConst.COLOR_WHITE);
        this.addChild(tipTxt3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt3, graybg2, [0, 0]);
        this._desc.text = LanguageManager.getlocal("exchangeSceneDesc2");
    };
    AcDoubleSeventhExchangeViewTab1.prototype.exchangeScene = function () {
        var needparts = this.cfg.exchange.needPart;
        var needNum = needparts.split("_")[2];
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
        if (Number(needNum) > hasNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(this.requestStr), this.useCallback, this);
        NetManager.request(this.requestStr, {
            activeId: this.acTivityId,
            isscene: 1,
        });
    };
    AcDoubleSeventhExchangeViewTab1.prototype.useCallback = function (event) {
        var view = this;
        var data = event.data.data.data;
        if (data && data.rewards) {
            var rewards = data.rewards;
            var rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
            this.showExchangeItem();
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.requestStr), this.useCallback, this);
    };
    AcDoubleSeventhExchangeViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(this.requestStr), this.useCallback, this);
        this._downNode = null;
        this._itemNUm = null;
        this._desc = null;
        this._bg2 = null;
        _super.prototype.dispose.call(this);
    };
    return AcDoubleSeventhExchangeViewTab1;
}(AcCommonViewTab));
__reflect(AcDoubleSeventhExchangeViewTab1.prototype, "AcDoubleSeventhExchangeViewTab1");
//# sourceMappingURL=AcDoubleSeventhExchangeViewTab1.js.map