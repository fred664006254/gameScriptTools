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
 * 政务
 * author yanyuling
 * date 2017/10/09
 * @class AffairView
 */
var AffairView = (function (_super) {
    __extends(AffairView, _super);
    function AffairView() {
        var _this = _super.call(this) || this;
        _this._lastUseTime = 0;
        _this._dialogueBg = null;
        _this._dialogueBg2 = null;
        _this._prisonDesTxt = null;
        _this._bubbleContainer = null;
        _this._bottomInfoY = 0;
        _this._nameType = "";
        // private _manageImag:BaseBitmap=null;
        _this._affair_rewardbg1 = null;
        _this._affair_rewardbg2 = null;
        _this._pubTextbg = null;
        _this._affairview_table = null;
        _this._vipDesBg = null;
        _this._vipDes = null;
        _this._onekeyBtn = null;
        _this._affNum = 0;
        _this._useButton = null;
        _this._mainTaskHandKey1 = null;
        _this._mainTaskHandKey2 = null;
        _this._mainTaskHandKey3 = null;
        _this.toucBoo = true;
        _this._collectFlag = null;
        return _this;
    }
    Object.defineProperty(AffairView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AffairView.prototype.initView = function () {
        this.initTop();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDAFFAIR), this.clickUseBtnCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALAFFAIR), this.affairTouchImgClickCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BATCHDEALAFFAIR), this.onRefresh, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.clickUseBtnCallback, this);
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        Api.mainTaskVoApi.checkShowGuide();
    };
    AffairView.prototype.getBgName = function () {
        return "affairview_bg";
    };
    AffairView.prototype.initTop = function () {
        this.toucBoo = true;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -20;
        this.addChildToContainer(this._nodeContainer);
        //管理下部可点击政务
        this._bottomnodeContainer1 = new BaseDisplayObjectContainer();
        //管理政务令信息
        this._bottomnodeContainer2 = new BaseDisplayObjectContainer();
        this._bottomnodeContainer2.y = GameConfig.stageHeigth - 460;
        var topbg = new MainUITop({ showName: false });
        this._nodeContainer.addChild(topbg);
        this._curoptId = Api.manageVoApi.getCurAffairOpt();
        var gov_icon = BaseBitmap.create("public_icon5");
        gov_icon.x = 15;
        gov_icon.y = 105;
        this._nodeContainer.addChild(gov_icon);
        this._progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 562);
        this._progressBar.x = 65;
        this._progressBar.y = 117;
        this._nodeContainer.addChild(this._progressBar);
        this._progressBar.setPercentage(0.5);
        var timesBg = BaseBitmap.create("promotion_officerbg1");
        timesBg.x = GameConfig.stageWidth - timesBg.width;
        timesBg.y = topbg.y + 107 + 40;
        this._bottomnodeContainer1.addChild(timesBg);
        this._timesText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timesText.x = timesBg.x + 40;
        this._timesText.y = timesBg.y + 15;
        this._bottomnodeContainer1.addChild(this._timesText);
        // 元芳
        // let manageImag:BaseBitmap = BaseBitmap.create("homenpcmanage");
        var manageImag = BaseLoadBitmap.create("servant_full_1001");
        manageImag.x = 10;
        manageImag.y = GameConfig.stageHeigth - 785;
        this._bottomnodeContainer1.addChild(manageImag);
        //下部背景
        this._bottomInfoY = topbg.y + 107;
        var bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.x = 0;
        bottomBg.height = 300;
        bottomBg.y = GameConfig.stageHeigth - 360;
        this._nodeContainer.addChild(bottomBg);
        this._bottomBg = bottomBg;
        this._nodeContainer.addChild(this._bottomnodeContainer1);
        this._nodeContainer.addChild(this._bottomnodeContainer2);
        //桌子
        var affairview_table = BaseBitmap.create("affairview_zhuozi");
        affairview_table.x = 0;
        affairview_table.y = GameConfig.stageHeigth - 320;
        this._bottomnodeContainer1.addChild(affairview_table);
        this._affairview_table = affairview_table;
        if (Api.switchVoApi.checkOpenOfficialbusiness()) {
            this.showOneKeyAffair();
        }
        var affairTouchImg1 = BaseBitmap.create("affairview_zibg");
        affairTouchImg1.x = 23; //50
        affairTouchImg1.y = GameConfig.stageHeigth - 290;
        this._bottomnodeContainer1.addChild(affairTouchImg1);
        affairTouchImg1.touchEnabled = true;
        affairTouchImg1.name = "1";
        affairTouchImg1.addTouch(this.eventHandler, this);
        this._affairTouchImg1 = affairTouchImg1;
        this._affairImgText1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._affairImgText1.width = 190;
        this._affairImgText1.x = affairTouchImg1.x + 30;
        this._affairImgText1.y = GameConfig.stageHeigth - 250;
        this._bottomnodeContainer1.addChild(this._affairImgText1);
        var affairTouchImg2 = BaseBitmap.create("affairview_zibg");
        affairTouchImg2.x = 360;
        affairTouchImg2.y = affairTouchImg1.y;
        affairTouchImg2.name = "2";
        affairTouchImg2.touchEnabled = true;
        this._bottomnodeContainer1.addChild(affairTouchImg2);
        affairTouchImg2.addTouch(this.eventHandler, this);
        this._affairTouchImg2 = affairTouchImg2;
        var affair_rewardbg1 = BaseBitmap.create("public_9_bg30");
        affair_rewardbg1.width = 200;
        affair_rewardbg1.x = 5;
        affair_rewardbg1.y = affairTouchImg2.y + 100;
        affair_rewardbg1.visible = false;
        this._bottomnodeContainer1.addChild(affair_rewardbg1);
        this._affair_rewardbg1 = affair_rewardbg1;
        this._rewardText1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._rewardText1.width = 200;
        this._rewardText1.textAlign = "center";
        this._rewardText1.x = affair_rewardbg1.x + 45; //+73;
        this._rewardText1.y = affair_rewardbg1.y + 22;
        this._bottomnodeContainer1.addChild(this._rewardText1);
        var affair_rewardbg2 = BaseBitmap.create("public_9_bg30");
        affair_rewardbg2.width = affair_rewardbg1.width;
        affair_rewardbg2.x = 440; //affair_rewardbg1.x;
        affair_rewardbg2.y = affair_rewardbg1.y;
        affair_rewardbg2.visible = false;
        this._bottomnodeContainer1.addChild(affair_rewardbg2);
        this._affair_rewardbg2 = affair_rewardbg2;
        this._rewardText2 = ComponentManager.getTextField("", this._rewardText1.size);
        this._rewardText2.x = 425; // affair_rewardbg2.x;
        this._rewardText2.y = affair_rewardbg2.y + 22;
        this._bottomnodeContainer1.addChild(this._rewardText2);
        this._affairImgText2 = ComponentManager.getTextField("", this._affairImgText1.size, this._affairImgText1.textColor);
        this._affairImgText2.width = this._affairImgText1.width - 5;
        this._affairImgText2.x = 390; //this._affairImgText1.x;
        this._affairImgText2.y = this._affairImgText1.y;
        this._bottomnodeContainer1.addChild(this._affairImgText2);
        this.showDialogue();
        this.initButtomContainer();
        //检测可用的真实次数
        this.checkAffairNum();
        this._mainTaskHandKey1 = App.MainTaskHandUtil.addHandNode(this._bottomnodeContainer1, this._affairImgText2.x + this._affairImgText2.width * 0.6, this._affairImgText2.y + this._affairImgText2.height / 2, [this._affairTouchImg2], 108, false, function () {
            return true;
        }, this);
        this._mainTaskHandKey2 = App.MainTaskHandUtil.addHandNode(this._useButton, this._useButton.width / 2, 0, [this._useButton], 108, true, function () {
            return true;
        }, this);
        //主线处理公务
        if (Api.manageVoApi.getCurAffairNums() > 0) {
            this._mainTaskHandKey3 = App.MainTaskHandUtil.addHandNode(this._bottomnodeContainer1, this._affairImgText2.x + this._affairImgText2.width / 2 + 50, this._affairImgText2.y, [this._affairTouchImg2], 104, true, function () {
                return true;
            }, this);
        }
        else {
            this._mainTaskHandKey3 = App.MainTaskHandUtil.addHandNode(this._bottomnodeContainer2, this._useButton.x + this._useButton.width / 2 - 10, this._useButton.y, [this._useButton], 104, true, function () {
                return true;
            }, this);
        }
    };
    //	求饶气泡
    AffairView.prototype.showDialogue = function () {
        this._bubbleContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this._bubbleContainer);
        this._bubbleContainer.y = GameConfig.stageHeigth - 960;
        //底图
        this._dialogueBg = BaseBitmap.create("public_9_bg42");
        this._bubbleContainer.addChild(this._dialogueBg);
        this._dialogueBg.width = 300;
        this._dialogueBg.height = 100;
        this._dialogueBg.x = 290;
        this._dialogueBg.y = 200;
        this._dialogueBg2 = BaseBitmap.create("public_9_bg42_tail");
        this._bubbleContainer.addChild(this._dialogueBg2);
        this._dialogueBg2.x = this._dialogueBg.x + 50; //this._dialogueBg.width;
        this._dialogueBg2.y = this._dialogueBg.y + this._dialogueBg.height - 5;
        // 求饶文字
        this._prisonDesTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._prisonDesTxt.width = this._dialogueBg.width - 18;
        this._prisonDesTxt.setPosition(this._dialogueBg.x + 10, this._dialogueBg.y + 20);
        this._bubbleContainer.addChild(this._prisonDesTxt);
    };
    AffairView.prototype.checkAffairNum = function () {
        if (this._onekeyBtn) {
            this._onekeyBtn.touchEnabled = true;
        }
        this.refreshUIInfo();
        if (Api.manageVoApi.getCurAffairNums() > 0) {
            this._bottomnodeContainer1.visible = true;
            this._bottomnodeContainer2.visible = false;
            // this._arrairImg.texture =  ResourceManager.getRes("affairview_bg");
            this._noAffairTipText.text = "";
            this._bubbleContainer.visible = true;
            this._bottomBg.visible = false;
            this._pubTextbg.visible = false;
            if (Api.switchVoApi.checkOpenOfficialbusiness()) {
                var needVip = GameConfig.config.affairCfg['needVip'];
                if (Api.playerVoApi.getPlayerVipLevel() >= needVip && this._onekeyBtn) {
                    this._onekeyBtn.visible = true;
                }
                else {
                    this._onekeyBtn.visible = false;
                }
            }
        }
        else {
            if (Api.switchVoApi.checkOpenOfficialbusiness()) {
                if (this._onekeyBtn) {
                    this._onekeyBtn.visible = false;
                }
            }
            if (this.toucBoo == true) {
                this._bottomBg.visible = true;
                this._bottomnodeContainer1.visible = false;
                this._bottomnodeContainer2.visible = true;
                this._timesText.text = "";
                this._noAffairTipText.visible = true;
                this._bubbleContainer.visible = false;
                this._pubTextbg.visible = true;
            }
        }
    };
    AffairView.prototype.initButtomContainer = function () {
        var pubTextbg = BaseBitmap.create("public_tipbg");
        pubTextbg.x = 0;
        pubTextbg.y = 360;
        pubTextbg.height = 160;
        this._pubTextbg = pubTextbg;
        this._nodeContainer.addChild(pubTextbg);
        //下部信息部分
        this._noAffairTipText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._noAffairTipText.textAlign = egret.HorizontalAlign.CENTER;
        this._noAffairTipText.text = "";
        this._noAffairTipText.x = GameConfig.stageWidth / 2 - this._noAffairTipText.width / 2;
        this._noAffairTipText.y = 400; //this._arrairImg.y + this._arrairImg.height / 2 - this._noAffairTipText.height/2 - 30;
        this._nodeContainer.addChild(this._noAffairTipText);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 450;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = this._bottomInfoY + 30;
        this._bottomnodeContainer2.addChild(line1);
        var titleText1 = new BaseTextField();
        titleText1.size = TextFieldConst.FONTSIZE_TITLE_SMALL;
        titleText1.textColor = TextFieldConst.COLOR_BLACK;
        titleText1.text = LanguageManager.getlocal("itemName_" + AffairView.ITEMID);
        titleText1.x = GameConfig.stageWidth / 2 - titleText1.width / 2;
        titleText1.y = line1.y + line1.height / 2 - titleText1.height / 2;
        this._bottomnodeContainer2.addChild(titleText1);
        var itemCfg = Config.ItemCfg.getItemCfgById(AffairView.ITEMID);
        if (!itemCfg) {
            itemCfg = GameData.getRewardItemVoByIdAndType(AffairView.ITEMID);
        }
        var selectedIcon = GameData.getItemIcon(itemCfg, true);
        selectedIcon.width = selectedIcon.height = 100;
        selectedIcon.x = 50;
        selectedIcon.y = line1.y + line1.height + 10;
        this._bottomnodeContainer2.addChild(selectedIcon);
        this._numTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._numTextF.text = LanguageManager.getlocal("numTitle") + Api.itemVoApi.getItemNumInfoVoById(AffairView.ITEMID);
        this._numTextF.x = selectedIcon.x + 50 - this._numTextF.width / 2;
        this._numTextF.y = selectedIcon.y + 110;
        this._bottomnodeContainer2.addChild(this._numTextF);
        var bg5 = BaseBitmap.create("public_9_bg21");
        bg5.width = 420;
        bg5.height = 124;
        bg5.y = line1.y + line1.height + 10;
        bg5.x = GameConfig.stageWidth - 450;
        this._bottomnodeContainer2.addChild(bg5);
        var selectedDescTextF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        selectedDescTextF.text = LanguageManager.getlocal("itemDesc_" + AffairView.ITEMID);
        selectedDescTextF.x = bg5.x + 10;
        selectedDescTextF.width = bg5.width - 20;
        selectedDescTextF.y = bg5.y + 10;
        this._bottomnodeContainer2.addChild(selectedDescTextF);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "useBtn", this.clickUseBtnHandler, this);
        useBtn.x = GameConfig.stageWidth / 2 - useBtn.width / 2;
        useBtn.y = 310; //this._bottomBg.y;//GameConfig.stageHeigth-650;//this._bottomBg.y +  this._bottomBg.height - useBtn.height - 30 ;
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._bottomnodeContainer2.addChild(useBtn);
        // this.updateItem(this._selectedIndex);
        this._useButton = useBtn;
    };
    AffairView.prototype.onRefresh = function (event) {
        // console.log(event.data.data.data.rewards);
        if (event && event.data && event.data.ret) {
            var oknum = event.data.data.data.oknum;
            ViewController.getInstance().openView(ViewConst.POPUP.AFFAIRVIEWWORDREWARDPOPUPVIEW, { rewards: event.data.data.data.rewards, affNum: oknum, callback: this.doUseRequest2, handler: this });
        }
    };
    AffairView.prototype.doUseRequest2 = function () {
    };
    AffairView.prototype.clickOneKeyBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.AFFAIRVIEWCHOICEPOPUPVIEW, { itemId: AffairView.ITEMID, maxNum: 100, callback: this.oneKeydoUseRequest, handler: this });
    };
    AffairView.prototype.receivePushData = function () {
        if (Api.playerVoApi.getPlayerVipLevel() >= GameConfig.config.affairCfg['needVip']) {
            if (this._vipDes && this._vipDes.parent) {
                this._vipDes.parent.removeChild(this._vipDes);
            }
            if (this._vipDesBg && this._vipDesBg.parent) {
                this._vipDesBg.parent.removeChild(this._vipDesBg);
            }
            if (this._onekeyBtn && Api.switchVoApi.checkOpenOfficialbusiness()) {
                this._onekeyBtn.visible = true;
            }
        }
        else {
            return;
        }
    };
    AffairView.prototype.showOneKeyAffair = function () {
        var vipDesBg = null;
        var vipDes = null;
        var onekeyBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "onekeyAffair", this.clickOneKeyBtnHandler, this);
        onekeyBtn.x = 450;
        onekeyBtn.y = this._affairview_table.y - 65;
        this._bottomnodeContainer1.addChild(onekeyBtn);
        onekeyBtn.visible = false;
        this._onekeyBtn = onekeyBtn;
        var needVip = GameConfig.config.affairCfg['needVip'];
        //一键公务
        if (Api.playerVoApi.getPlayerVipLevel() < needVip) {
            vipDesBg = BaseBitmap.create("public_itemtipbg");
            vipDesBg.width = 200;
            this._bottomnodeContainer1.addChild(vipDesBg);
            vipDesBg.x = 430;
            vipDesBg.y = this._affairview_table.y - 35;
            this._vipDesBg = vipDesBg;
            vipDes = ComponentManager.getTextField(LanguageManager.getlocal("affairUnlock", [needVip + ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, vipDes, vipDesBg);
            this._bottomnodeContainer1.addChild(vipDes);
            this._vipDes = vipDes;
        }
        else {
            this._onekeyBtn.visible = true;
        }
    };
    //刷新页面上的动态信息,每次执行政务成功之后需要刷新
    AffairView.prototype.refreshUIInfo = function () {
        var nextExp = 0;
        var nextLvCfg = Config.LevelCfg.getCfgByLevel((Api.playerVoApi.getPlayerLevel() + 1).toString());
        if (nextLvCfg) {
            nextExp = nextLvCfg.exp;
        }
        else {
            nextExp = Config.LevelCfg.getCfgByLevel((Api.playerVoApi.getPlayerLevel()).toString()).exp;
        }
        this._progressBar.setText(LanguageManager.getlocal("affairtxt") + Api.playerVoApi.getPlayerExp() + "/" + nextExp);
        var perc = Api.playerVoApi.getPlayerExp() / nextExp;
        this._progressBar.setPercentage(perc > 1 ? 1 : perc);
        if (perc >= 1) {
            //播放特效 TODO
        }
        var tmpCfg = GameConfig.config.affairCfg.affairList[this._curoptId.toString()];
        var addExp = GameConfig.config.affairCfg.getExp[Api.playerVoApi.getPlayerLevel() - 1];
        // this._affairDescText.text = LanguageManager.getlocal("affairDesc" + this._curoptId,[String(addExp)]);
        this._prisonDesTxt.text = LanguageManager.getlocal("affairDesc" + this._curoptId, [String(addExp)]);
        //超出范围的文本  背景拉伸，并调整位置
        console.log("this._prisonDesTxt.height->" + this._prisonDesTxt.height);
        if (this._prisonDesTxt.height > 100 - 40) {
            this._dialogueBg.height = this._prisonDesTxt.height + 40;
            this._dialogueBg.y = 200 - this._prisonDesTxt.height + 60;
            this._prisonDesTxt.y = this._dialogueBg.y + 20;
        }
        // this._affairDescText.anchorOffsetY = this._affairDescText.height/2;
        this._affairImgText1.text = LanguageManager.getlocal("affairOptDesc" + this._curoptId + "_1");
        this._affairImgText2.text = LanguageManager.getlocal("affairOptDesc" + this._curoptId + "_2");
        var totalNum = Config.LevelCfg.getCfgByLevel(Api.playerVoApi.getPlayerLevel().toString()).affair;
        this._timesText.text = LanguageManager.getlocal("affairEvent") + (Api.manageVoApi.getCurAffairNums()) + "/" + totalNum;
        if (tmpCfg.reward1) {
            this._rewardText1.text = this.getRewardTxt(tmpCfg.reward1, tmpCfg);
        }
        else {
            this._rewardText1.text = this.getRewardTxt(tmpCfg.reward3, tmpCfg);
        }
        this._rewardText1.x = this._affairTouchImg1.x + this._affairTouchImg1.width / 2 - this._rewardText1.width / 2;
        var addAff = GameConfig.config.affairCfg.getExp[Api.playerVoApi.getPlayerLevel() - 1];
        this._rewardText2.text = LanguageManager.getlocal("affairtxt3", [String(addAff)]);
        this._rewardText2.x = this._affairTouchImg2.x + this._affairTouchImg2.width / 2 - this._rewardText2.width / 2;
    };
    //处理奖励信息
    AffairView.prototype.getRewardTxt = function (rewardInfo, tmpCfg) {
        if (typeof (rewardInfo) == "string") {
            var rewardItemVo = new RewardItemVo();
            rewardItemVo.initData(rewardInfo);
            return LanguageManager.getlocal("affair_reward_txt", [rewardItemVo.name + "+" + rewardItemVo.num]);
        }
        else {
            var base = tmpCfg.base;
            var rewardtype = rewardInfo;
            var parameter = tmpCfg.parameter;
            var len = Object.keys(parameter).length;
            var lv = Api.playerVoApi.getPlayerLevel();
            var rate = parameter[lv - 1];
            if (lv >= len)
                rate = parameter[len - 1];
            if (rewardtype == 2)
                return LanguageManager.getlocal("affair_reward_txt", [LanguageManager.getlocal("affair_rewardType1") + "+" + App.StringUtil.changeIntToText(Math.floor(Api.playerVoApi.getInte() * rate + base))]);
            else if (rewardtype == 3)
                return LanguageManager.getlocal("affair_reward_txt", [LanguageManager.getlocal("affair_rewardType2") + "+" + App.StringUtil.changeIntToText(Math.floor(Api.playerVoApi.getPolitics() * rate + base))]);
            else if (rewardtype == 4)
                return LanguageManager.getlocal("affair_reward_txt", [LanguageManager.getlocal("affair_rewardType3") + "+" + App.StringUtil.changeIntToText(Math.floor(Api.playerVoApi.getCharm() * rate + base))]);
        }
    };
    //刷新文本的action
    AffairView.prototype.uiTextDoRefreshAction = function (tmpText) {
        egret.Tween.get(tmpText, { loop: false }).to({ alpha: 0 }, 300).set({ alpha: 0 }).to({ alpha: 1 }, 300);
    };
    //图片的渐隐，渐现
    AffairView.prototype.uiBitMapDoRefreshAction = function (tmpBitmap) {
        egret.Tween.get(tmpBitmap, { loop: false }).to({ alpha: 0 }, 300).to({ alpha: 1 }, 300);
    };
    AffairView.prototype.affairTouchImgClickCallBack = function (event) {
        if (event && event.data && event.data.ret) {
            //印章
            this.createCollectFlag();
            egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 300).call(function () {
                this.toucBoo = true;
            }, this);
            //需要处理奖励信息
            var lastAffaircfg = GameConfig.config.affairCfg.affairList[this._curoptId.toString()];
            var rList = [];
            if (this._lastOpt == 2) {
                rList = GameData.formatRewardItem("5_0_" + GameConfig.config.affairCfg.getExp[Api.playerVoApi.getPlayerLevel() - 1]);
            }
            else {
                var rewardStr = "";
                var reward = lastAffaircfg["reward3"];
                if (lastAffaircfg["reward1"]) {
                    reward = lastAffaircfg["reward1"];
                    var parameter = lastAffaircfg.parameter;
                    var len = Object.keys(parameter).length;
                    var lv = Api.playerVoApi.getPlayerLevel();
                    var rate = parameter[lv - 1];
                    if (lv >= len)
                        rate = parameter[len - 1];
                    var rewardtype = reward;
                    if (rewardtype == 2)
                        rewardStr += "2_0_" + Math.floor(Api.playerVoApi.getInte() * rate + lastAffaircfg.base);
                    else if (rewardtype == 3)
                        rewardStr += "3_0_" + Math.floor(Api.playerVoApi.getPolitics() * rate + lastAffaircfg.base);
                    else if (rewardtype == 4)
                        rewardStr += "4_0_" + Math.floor(Api.playerVoApi.getCharm() * rate + lastAffaircfg.base);
                }
                else {
                    rewardStr = lastAffaircfg["reward3"];
                }
                rList = GameData.formatRewardItem(rewardStr);
            }
            var runPos = new egret.Point(GameConfig.stageWidth / 2, this._selectedBox.y + 50);
            App.CommonUtil.playRewardFlyAction(rList, runPos);
            this._curoptId = Api.manageVoApi.getCurAffairOpt();
            //立即切换到无政务状态
            if (Api.manageVoApi.getCurAffairNums() == 0) {
                this._noAffairTipText.visible = false;
                this._pubTextbg.visible = false;
            }
            var tmpthis_1 = this;
            egret.Tween.get(this, { loop: false }).wait(800).call(function () {
                tmpthis_1.uiTextDoRefreshAction(tmpthis_1._affairImgText1);
                tmpthis_1.uiTextDoRefreshAction(tmpthis_1._affairImgText2);
                tmpthis_1.uiTextDoRefreshAction(tmpthis_1._rewardText1);
                tmpthis_1.uiTextDoRefreshAction(tmpthis_1._rewardText2);
                tmpthis_1.uiTextDoRefreshAction(this._bubbleContainer);
                tmpthis_1.uiBitMapDoRefreshAction(tmpthis_1._affairTouchImg1);
                tmpthis_1.uiBitMapDoRefreshAction(tmpthis_1._affairTouchImg2);
                tmpthis_1.uiBitMapDoRefreshAction(tmpthis_1._affair_rewardbg1);
                tmpthis_1.uiBitMapDoRefreshAction(tmpthis_1._affair_rewardbg2);
                if (tmpthis_1._collectFlag && tmpthis_1._collectFlag.parent) {
                    tmpthis_1._collectFlag.parent.removeChild(tmpthis_1._collectFlag);
                    tmpthis_1._collectFlag = null;
                }
            }).wait(100).call(function () {
                tmpthis_1.checkAffairNum();
            });
        }
        else {
            this.toucBoo = true;
            this.checkAffairNum();
        }
    };
    AffairView.prototype.clickUseBtnCallback = function () {
        var num = Api.itemVoApi.getItemNumInfoVoById(AffairView.ITEMID);
        //刷新政务令数量
        this._numTextF.text = LanguageManager.getlocal("numTitle") + num.toString();
        this.checkAffairNum();
    };
    //请求网络,使用政务令
    AffairView.prototype.doUseRequest = function (params) {
        App.CommonUtil.showTip(LanguageManager.getlocal("affair_useTip1", [String(params)]));
        NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDAFFAIR, { num: params });
    };
    AffairView.prototype.clickUseBtnHandler = function () {
        var tmpNum = Api.itemVoApi.getItemNumInfoVoById(AffairView.ITEMID);
        if (tmpNum == 0) {
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMJUMPPOPUPVIEW, { itemId: 1102, callback: null, handler: this });
            return;
        }
        if (tmpNum >= 5) {
            var totalNum = Config.LevelCfg.getCfgByLevel(Api.playerVoApi.getPlayerLevel().toString()).affair;
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW, { itemId: AffairView.ITEMID, maxNum: totalNum, callback: this.doUseRequest, handler: this });
        }
        else {
            this.doUseRequest(1);
        }
        // 点击过一次使用后，不能再显示引导的手了
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
        this._mainTaskHandKey1 = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey3);
        this._mainTaskHandKey3 = null;
    };
    //处理政务
    AffairView.prototype.affairTouchImgClick = function (obj, params) {
        var tmpOpt = params;
        if (params == 1 && GameConfig.config.affairCfg.affairList[this._curoptId.toString()]["reward3"]) {
            tmpOpt = 3;
        }
        this._lastOpt = tmpOpt;
        //无需等待
        NetManager.request(NetRequestConst.REQUEST_MANAGE_DEALAFFAIR, { optid: tmpOpt });
    };
    AffairView.prototype.roleHeadClickHandler = function () {
        PlayerBottomUI.getInstance().show();
        // ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
    };
    AffairView.prototype.oneKeydoUseRequest = function (params) {
        var data = {};
        data = params;
        this._affNum = data.totalnum;
        NetManager.request(NetRequestConst.REQUEST_MANAGE_BATCHDEALAFFAIR, { useitemnum: data.useitemnum, totalnum: data.totalnum, opt: data.opt });
    };
    AffairView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "gov_icon", "gov_img1", , "promotion_officerbg1",
            "progress3", "progress3_bg",
            "affairview_bg",
            "affairview_mark",
            "affairview_zibg",
            "affairview_zibg2",
            "affairview_zhuozi",
            "guide_hand"
        ]);
    };
    AffairView.prototype.tick = function () {
        if (Api.manageVoApi.getCurAffairNums() == 0) {
            var deltaT = GameData.serverTime;
            var leftTimt = Api.manageVoApi.getAffairST() + GameConfig.config.affairCfg['needTime'] - deltaT;
            if (leftTimt >= 0) {
                this._noAffairTipText.text = LanguageManager.getlocal("affair_cdTip", [App.DateUtil.getFormatBySecond(leftTimt).toString()]);
                this._noAffairTipText.x = GameConfig.stageWidth / 2 - this._noAffairTipText.width / 2;
                return true;
            }
            else {
                Api.manageVoApi.setCurAffairNums(1);
                this.checkAffairNum();
                return false;
            }
        }
        else if (this._noAffairTipText.text != "") {
            this.checkAffairNum();
            return false;
        }
        return false;
    };
    AffairView.prototype.eventHandler = function (event) {
        var deltT = egret.getTimer() - this._lastUseTime;
        // new Date().getTime()
        if (this._lastUseTime > 0 && deltT < 1500) {
            return;
        }
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                event.target.texture = ResourceManager.getRes("affairview_zibg2");
                this._selectedBox = event.target;
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                // this._selectedBox.texture = ResourceManager.getRes("affairview_zibg2");
                // this._lastUseTime = egret.getTimer();
                this._selectedBox.texture = ResourceManager.getRes("affairview_zibg");
                this._lastUseTime = 0;
                break;
            case egret.TouchEvent.TOUCH_END:
                if (this._onekeyBtn) {
                    this._onekeyBtn.touchEnabled = false;
                }
                this.toucBoo = false;
                this._lastUseTime = egret.getTimer();
                this._nameType = event.target.name;
                event.target.texture = ResourceManager.getRes("affairview_zibg");
                this.affairTouchImgClick(event.target, Number(event.target.name));
                break;
        }
    };
    AffairView.prototype.createCollectFlag = function () {
        if (!this._collectFlag) {
            this._collectFlag = BaseBitmap.create("affairview_mark");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            if (this._nameType == "1") {
                this._collectFlag.x = 130;
            }
            else {
                this._collectFlag.x = 500;
            }
            this._collectFlag.scaleX = 1.2;
            this._collectFlag.scaleY = 1.2;
            this._collectFlag.y = GameConfig.stageHeigth - 220;
            this._nodeContainer.addChild(this._collectFlag);
        }
    };
    AffairView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BATCHDEALAFFAIR), this.onRefresh, this);
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDAFFAIR), this.clickUseBtnCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALAFFAIR), this.affairTouchImgClickCallBack, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.clickUseBtnCallback, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        this._timesText = null;
        // this._affairDescText = null;
        this._affairImgText1 = null;
        this._affairImgText2 = null;
        this._rewardText1 = null;
        this._rewardText2 = null;
        this.headImg = null;
        this._progressBar = null;
        // this._arrairImg = null;
        this._numTextF = null;
        this._noAffairTipText = null;
        this._curoptId = null;
        this._affairTouchImg1 = null;
        this._affairTouchImg2 = null;
        this._nodeContainer = null;
        this._bottomnodeContainer1 = null;
        this._bottomnodeContainer2 = null;
        this._prisonDesTxt = null;
        this._dialogueBg = null;
        this._dialogueBg2 = null;
        this._bubbleContainer = null;
        this._nameType = null;
        this._affair_rewardbg1 = null;
        this._affair_rewardbg2 = null;
        this._lastUseTime = 0;
        this._affairview_table = null;
        this._vipDesBg = null;
        this._vipDes = null;
        this._onekeyBtn = null;
        this._useButton = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
        this._mainTaskHandKey1 = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey2);
        this._mainTaskHandKey2 = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey3);
        this._mainTaskHandKey3 = null;
        this.toucBoo = true;
        _super.prototype.dispose.call(this);
    };
    AffairView.ITEMID = 1102;
    return AffairView;
}(CommonView));
__reflect(AffairView.prototype, "AffairView");
//# sourceMappingURL=AffairView.js.map