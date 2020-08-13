var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//衣装预览
var AcCrossServerIntimacyCheerViewTab1 = /** @class */ (function (_super) {
    __extends(AcCrossServerIntimacyCheerViewTab1, _super);
    function AcCrossServerIntimacyCheerViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._progress = null;
        _this._exchangeBtn = null;
        _this._isUp = false;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcCrossServerIntimacyCheerViewTab1.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "7";
                break;
        }
        return code;
    };
    Object.defineProperty(AcCrossServerIntimacyCheerViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyCheerViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyCheerViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyCheerViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyCheerViewTab1.prototype.initView = function () {
        var baseView = ViewController.getInstance().getView("AcCrossServerIntimacyCheerView");
        this.height = baseView.tabHeight;
        this.width = GameConfig.stageWidth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_EXCHANGE, this.exchangeCallback, this);
        var bg = BaseLoadBitmap.create(App.CommonUtil.getResByCode("crossserverintibg", this.getUiCode()));
        this.addChild(bg);
        var bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_skininfobg", this.getUiCode(), "7"));
        bottomBg.setPosition(this.width / 2 - bottomBg.width / 2, this.height - bottomBg.height);
        var exchangeContainer = new BaseDisplayObjectContainer();
        var exchangeBg = BaseLoadBitmap.create("luckdrawprogressbg-1");
        exchangeBg.width = 640;
        exchangeBg.height = 107;
        exchangeContainer.addChild(exchangeBg);
        exchangeContainer.width = exchangeBg.width;
        exchangeContainer.height = exchangeBg.height;
        exchangeContainer.setPosition(this.width / 2 - exchangeBg.width / 2, bottomBg.y - exchangeBg.height - 32);
        //skin
        //门客衣装
        var skinId = this.vo.getShowSkinId();
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var skinBoneName = skinCfg.bone + "_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && skinBoneName && RES.hasRes(skinBoneName) && App.CommonUtil.check_dragon()) {
            var skin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            skin.anchorOffsetY = skin.height;
            skin.setScale(1);
            skin.setPosition(GameConfig.stageWidth / 2, exchangeContainer.y - 40 + (1136 - GameConfig.stageHeigth) / 3 * 2);
            this.addChild(skin);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.setScale(1.1);
            skinImg.x = GameConfig.stageWidth / 2 - skinImg.width / 2;
            skinImg.y = exchangeContainer.y + (1136 - GameConfig.stageHeigth) / 3;
            this.addChild(skinImg);
        }
        var skinEff = App.CommonUtil.getWifeSkinFlagById(skinId);
        if (skinEff) {
            skinEff.setPosition(this.width / 2 - skinEff.width / 2, exchangeContainer.y - skinEff.height - 30);
            this.addChild(skinEff);
        }
        this.addChild(exchangeContainer);
        //skinFlag
        // let skinFlag = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_skinflag", this.code));
        // skinFlag.setPosition(20, 50);
        // this.addChild(skinFlag);
        //skin detail
        this.showSkinDetailInfo();
        this.addChild(bottomBg);
        //skin info
        var skinGetInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerImacySkinGet", this.getUiCode(), "7")), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        skinGetInfo.setPosition(bottomBg.x + bottomBg.width / 2 - skinGetInfo.width / 2, bottomBg.y + 81);
        this.addChild(skinGetInfo);
        //兑换相关
        var toolItemVo = GameData.formatRewardItem(this.cfg.change.needNum)[0];
        var toolIcon = BaseLoadBitmap.create(toolItemVo.icon);
        toolIcon.width = 100;
        toolIcon.height = 100;
        toolIcon.setScale(1);
        toolIcon.setPosition(10, exchangeContainer.height / 2 - toolIcon.height * toolIcon.scaleY / 2 - 5);
        var progress = ComponentManager.getProgressBar("progress21", "progress21_bg", 360);
        progress.setPosition(toolIcon.x + toolIcon.width * toolIcon.scaleX + 10, exchangeContainer.height / 2 - progress.height / 2 - 10);
        exchangeContainer.addChild(progress);
        exchangeContainer.addChild(toolIcon);
        this._progress = progress;
        var exchangeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerImacySkinChangeInfo", this.getUiCode(), "7"), ["" + toolItemVo.num, toolItemVo.name]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        exchangeTip.setPosition(toolIcon.x + toolIcon.width * toolIcon.scaleX + 5, progress.y + progress.height + 20);
        exchangeContainer.addChild(exchangeTip);
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "acCrossserverPowerCheerScoreShopExchange", this.exchangeBtnClick, this);
        exchangeBtn.setPosition(exchangeContainer.width - exchangeBtn.width - 5, exchangeContainer.height / 2 - exchangeBtn.height / 2 - 10);
        exchangeContainer.addChild(exchangeBtn);
        exchangeBtn.name = "exchangeBtn";
        this._exchangeBtn = exchangeBtn;
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        if (currNum < toolItemVo.num) {
            exchangeBtn.setEnable(false);
        }
        progress.setPercentage(currNum / toolItemVo.num);
        progress.setText("" + currNum + "/" + toolItemVo.num);
        progress.setTextColor(TextFieldConst.COLOR_WHITE);
    };
    AcCrossServerIntimacyCheerViewTab1.prototype.exchangeBtnClick = function () {
        if (!this.vo.isStart) {
            this.vo.showAcEndTip();
            return;
        }
        var toolItemVo = GameData.formatRewardItem(this.cfg.change.needNum)[0];
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        if (currNum >= toolItemVo.num) {
            //兑换
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_EXCHANGE, { activeId: this.vo.aidAndCode });
        }
    };
    AcCrossServerIntimacyCheerViewTab1.prototype.showSkinDetailInfo = function () {
        var _this = this;
        var container = new BaseDisplayObjectContainer();
        this.addChild(container);
        container.width = this.width;
        var skinId = this.vo.getShowSkinId();
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_skindetailbg", this.getUiCode(), "7"));
        bottomBg.width = GameConfig.stageWidth; //525
        bottomBg.height = 300; //289
        container.height = bottomBg.height;
        bottomBg.setPosition(container.width / 2 - bottomBg.width / 2, 60); // +5
        container.addChild(bottomBg);
        //top
        var skinUp = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_skindetailtitle", this.getUiCode(), "7"));
        container.addChild(skinUp);
        container.setPosition(this.width / 2 - container.width / 2, this.height - 184);
        container.height = bottomBg.height + skinUp.height - 4;
        var upFlag = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_skindetailarrow", this.getUiCode(), "7"));
        upFlag.setPosition(skinUp.x + skinUp.width / 2 - upFlag.width / 2, skinUp.y - 5);
        container.addChild(upFlag);
        var upTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossServerPowerSkinDetail1", this.getUiCode(), "7")), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        upTip.anchorOffsetX = upTip.width / 2;
        upTip.setPosition(skinUp.x + skinUp.width / 2, skinUp.y + 39);
        container.addChild(upTip);
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 580;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(bottomBg.x + bottomBg.width / 2 - skinTipTxt.width / 2, bottomBg.y + 15);
        container.addChild(skinTipTxt);
        var addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinCfg.id, true);
        var txt = [
            {
                txtKey: "wifeSkinAddServantAttr1",
                value: addValues[0]
            },
            {
                txtKey: "wifeSkinAddServantAttr2",
                value: addValues[1]
            },
            {
                txtKey: "wifeSkinAddServantAttr3",
                value: addValues[2]
            },
            {
                txtKey: "wifeSkinAddServantAttr4",
                value: addValues[3]
            },
            {
                txtKey: "skinLvuptxt6",
                value: addValues[4]
            },
            {
                txtKey: "skinLvuptxt7",
                value: addValues[5]
            },
        ];
        for (var i in txt) {
            var tmp = txt[i];
            var str = String(tmp.value);
            if (Number(i) < 4 && tmp.value == 0) {
                str = addValues[Number(i) + 6] * 100 + "%";
            }
            var tipTxt = void 0;
            if (parseInt(i) < 4) {
                tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("" + tmp.txtKey, [LanguageManager.getlocal("servant_name1037"), str]), 20, TextFieldConst.COLOR_BLACK);
            }
            else {
                tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("" + tmp.txtKey) + ("\uFF1A<font color=0x3e9b00>+" + str + "</font>"), 20, TextFieldConst.COLOR_BLACK);
            }
            tipTxt.x = skinTipTxt.x + (Number(i) % 2 == 0 ? 70 : 315);
            tipTxt.y = skinTipTxt.y + 70 + Math.floor(Number(i) / 2) * 18 + (Math.floor(Number(i) / 2) + 1) * 10;
            container.addChild(tipTxt);
        }
        var buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        buttomTipTxt.setPosition(bottomBg.x + bottomBg.width / 2 - buttomTipTxt.width / 2, bottomBg.y + bottomBg.height - buttomTipTxt.height - 25);
        container.addChild(buttomTipTxt);
        // let addAbility = skinCfg.addAbility;
        // for (let index = 0; index < addAbility.length; index++) {
        //     let bnode = new ServantChangeSkinBookItem();
        //     bnode.initItem(index,addAbility[index], [skinCfg.id, null, "public_scrolllistbg"]);
        //     bnode.setPosition(skinTipTxt.x -5 + 30 + index%2*(245+40), skinTipTxt.y + skinTipTxt.height + 20+ Math.floor(index/2)*(92+8));
        //     container.addChild(bnode);
        // }
        var isMove = false;
        skinUp.addTouchTap(function () {
            if (isMove) {
                return;
            }
            upFlag.scaleY = _this._isUp ? 1 : -1;
            upFlag.y = _this._isUp ? skinUp.y - 5 : skinUp.y - 5 + upFlag.height;
            upTip.text = LanguageManager.getlocal(_this._isUp ? App.CommonUtil.getCnByCode("acCrossServerPowerSkinDetail1", _this.getUiCode(), "7") : App.CommonUtil.getCnByCode("acCrossServerPowerSkinDetail2", _this.getUiCode(), "7"));
            upTip.anchorOffsetX = upTip.width / 2;
            if (!_this._isUp) {
                isMove = true;
                egret.Tween.get(container, { loop: false }).to({ y: _this.height - 184 - container.height + 65 }, 200).call(function () {
                    isMove = false;
                    _this._isUp = true;
                }, _this);
            }
            else {
                isMove = true;
                egret.Tween.get(container, { loop: false }).to({ y: _this.height - 184 }, 200).call(function () {
                    isMove = false;
                    _this._isUp = false;
                }, _this);
            }
        }, this, null);
    };
    AcCrossServerIntimacyCheerViewTab1.prototype.exchangeCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var data = event.data.data.data;
        var rewards = data.rewards;
        var rList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rList);
        if (data.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": data.replacerewards });
        }
    };
    AcCrossServerIntimacyCheerViewTab1.prototype.refreshView = function () {
        var toolItemVo = GameData.formatRewardItem(this.cfg.change.needNum)[0];
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        if (currNum < toolItemVo.num) {
            this._exchangeBtn.setEnable(false);
        }
        this._progress.setPercentage(currNum / toolItemVo.num);
        this._progress.setText("" + currNum + "/" + toolItemVo.num);
    };
    AcCrossServerIntimacyCheerViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_EXCHANGE, this.exchangeCallback, this);
        this._progress = null;
        this._exchangeBtn = null;
        this._isUp = false;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerIntimacyCheerViewTab1;
}(CommonViewTab));
//# sourceMappingURL=AcCrossServerIntimacyCheerViewTab1.js.map