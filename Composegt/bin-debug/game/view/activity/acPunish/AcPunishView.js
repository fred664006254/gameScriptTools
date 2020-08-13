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
 * 惩戒女囚
 * author dky
 * date 2017/11/20
 * @class AcPunishView
 */
var AcPunishView = (function (_super) {
    __extends(AcPunishView, _super);
    function AcPunishView() {
        var _this = _super.call(this) || this;
        _this._punishItemVoList = {};
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._score1Text = null;
        _this._score2Text = null;
        _this._selectIndex = -1;
        // let tmpVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("dailyCharge","1");
        _this._lastTime = 0; //刷新时间
        _this._touchSwitch = true;
        _this.currIconArr = [];
        return _this;
    }
    AcPunishView.prototype.getResourceList = function () {
        var arr = [
            "punish_ex_icon", "punish_ex_name", "punish_rank_icon", "punish_rank_name",
            "progress_type1_bg2",
            "progress_type1_red",
            "wifeview_wenzibg2", "public_rotatelight",
        ];
        if (this.code == "4") {
            arr.push("punish_nian");
            arr.push("punish_nian1");
            // ["punish_boss","punish_boss1"]
            // )
        }
        if (this.code == "10") {
            arr.push("punish10_body1");
            arr.push("punish10_body2");
        }
        // if(RES.hasRes("punish" + this.code)){
        // 	arr.push("punish" + this.code)
        // }
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    AcPunishView.prototype.initView = function () {
        this._lastTime = App.DateUtil.getWeeTs(GameData.serverTime);
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
        var maskSp = BaseBitmap.create("commonview_bg1");
        maskSp.width = GameConfig.stageWidth;
        maskSp.height = 80;
        maskSp.y = 10;
        // maskSp.y = 180;
        this.addChildToContainer(maskSp);
        this._punishItemList = new Array();
        this.showText();
        this.showList();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM), this.buyCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP), this.exCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.buyCallback, this);
        //初始化 时间
        // let deltaT = this.acVo.et - GameData.serverTime;
        // if (this._acCDTxt && deltaT > 0) {
        // 	this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        // } else {
        // 	this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        // }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._acCDTxt.text = LanguageManager.getlocal("acPunishTime", [cfg.activeTime[0], cfg.activeTime[1]]);
        this._acCDTxt.x = 10;
        this._activityTimerText.x = 10;
        this.refreshState();
        this.runText();
        this.checkState();
    };
    /**
    * 获取活动配置
    */
    AcPunishView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE, requestData: { activeId: this.acVo.aidAndCode } };
    };
    AcPunishView.prototype.showText = function () {
        //背景图片
        var bgres = "punish_bigbg";
        if (this.code == "2") {
            bgres = "punish_bigbg2";
        }
        else if (this.code == "4") {
            bgres = "punish_bigbg4";
        }
        else if (this.code == "5") {
            bgres = "punish_bigbg5";
        }
        else if (this.code == "7" || this.code == "8" || this.code == "9" || this.code == "10") {
            bgres = "punish_bigbg" + this.code;
        }
        var bigBg = BaseLoadBitmap.create(bgres);
        // this.addChildToContainer(bigBg);
        this.container.addChildAt(bigBg, 0);
        bigBg.y = 20;
        //顶部背景图片
        var forpeople_top = BaseBitmap.create("punish_huodong");
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 67;
        //女囚
        if (this.code == "1") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            var bodyPic = BaseBitmap.create("punish_body2");
            this._bodyContainer.addChild(bodyPic);
            ;
            bodyPic.y = 0;
            this._headPic = BaseBitmap.create("punish_head2_1");
            this._headPic.y = 45;
            this._headPic.x = 36;
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = GameConfig.stageWidth / 2 - this._bodyContainer.width / 2;
            this._bodyContainer.y = 230;
        }
        else if (this.code == "3") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            var bodyPic = BaseBitmap.create("punish_body");
            this._bodyContainer.addChild(bodyPic);
            ;
            bodyPic.y = 0;
            this._headPic = BaseBitmap.create("punish_head1");
            this._headPic.y = 45;
            this._headPic.x = 37;
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = GameConfig.stageWidth / 2 - this._bodyContainer.width / 2;
            this._bodyContainer.y = 230;
        }
        else if (this.code == "4") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            // let bodyPic: BaseBitmap = BaseBitmap.create("punish_nian")
            // this._bodyContainer.addChild(bodyPic);;
            // bodyPic.y = 0;
            this._headPic = BaseBitmap.create("punish_nian");
            // this._headPic.y = 45;
            // this._headPic.x = 36;
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = GameConfig.stageWidth / 2 - this._bodyContainer.width / 2;
            this._bodyContainer.y = 230;
        }
        else if (this.code == "5") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            // let bodyPic: BaseBitmap = BaseBitmap.create("punish_nian")
            // this._bodyContainer.addChild(bodyPic);;
            // bodyPic.y = 0;
            this._headPic = BaseBitmap.create("punish_boss");
            // this._headPic.y = 45;
            // this._headPic.x = 36;
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = 0;
            this._bodyContainer.y = 290;
        }
        else if (this.code == "7") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._bodyContainer);
            this._bodyPic = BaseBitmap.create("punish7_body1");
            this._bodyContainer.addChild(this._bodyPic);
            ;
            this._bodyPic.y = 300;
            this._headPic = BaseBitmap.create("punish7_head1_1");
            this._headPic.y = 4;
            this._headPic.x = 79;
            var cfg_1 = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var hp = Math.floor(this._acData.hp / cfg_1.Hp * 100);
            var hpIndex = hp > 50 ? 1 : 2;
            this._headPic.texture = ResourceManager.getRes("punish7_head" + hpIndex + "_1");
            if (this._bodyPic && hpIndex == 2) {
                this._bodyPic.texture = ResourceManager.getRes("punish7_body2");
            }
            this._bodyContainer.addChild(this._headPic);
            this._bodyContainer.x = GameConfig.stageWidth / 2 - this._bodyContainer.width / 2;
            this._bodyContainer.y = GameConfig.stageHeigth - 600 - 80;
        }
        else if (this.code == "10") {
            this._bodyContainer = new BaseDisplayObjectContainer();
            this._bodyContainer.width = GameConfig.stageWidth;
            this._bodyContainer.height = GameConfig.stageHeigth;
            this.addChildToContainer(this._bodyContainer);
            this._bodyPic = BaseBitmap.create("punish10_body1");
            this._bodyPic.width = 440;
            this._bodyPic.height = 617;
            this._bodyContainer.addChild(this._bodyPic);
            this._bodyPic.x = GameConfig.stageWidth / 2 - this._bodyPic.width / 2;
            this._bodyPic.y = 300;
            // this._bodyContainer.x = GameConfig.stageWidth/2 - this._bodyContainer.width/2;
            // this._bodyContainer.y = GameConfig.stageHeigth - 600 - 80;
        }
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 30;
        this._activityTimerText.y = forpeople_top.y + 11;
        var stTxt = App.DateUtil.getFormatBySecond(this.acVo.st, 7);
        // let day = 
        var etTxt = App.DateUtil.getFormatBySecond(this.acVo.et - 86400, 7);
        // this._activityTimerText.text = LanguageManager.getlocal("acPunishDate", [stTxt, etTxt]);
        this._activityTimerText.text = this.acVo.getAcLocalTime(true);
        this.addChildToContainer(this._activityTimerText);
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
        acCDTxt.x = this._activityTimerText.x;
        acCDTxt.y = this._activityTimerText.y + 33;
        this.addChildToContainer(acCDTxt);
        this._acCDTxt = acCDTxt;
        //积分背景
        // let scoreBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
        // scoreBg.width = 190;
        // scoreBg.height = 63;
        // scoreBg.x = 440;
        // scoreBg.y = 100;
        // this.addChildToContainer(scoreBg);
        var score1Str = LanguageManager.getlocal("acPunishScore2", [this._acVo.v.toString()]);
        this._score1Text = ComponentManager.getTextField(score1Str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._score1Text.x = 440 + 20;
        this._score1Text.y = forpeople_top.y + 13;
        this.addChildToContainer(this._score1Text);
        var score2Str = LanguageManager.getlocal("acPunishScore1", [this._acVo.score.toString()]);
        this._score2Text = ComponentManager.getTextField(score2Str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._score2Text.x = this._score1Text.x;
        this._score2Text.y = this._score1Text.y + this._score1Text.height + 8;
        this.addChildToContainer(this._score2Text);
        //跑马灯背景
        var topBg = BaseBitmap.create("public_lt_bg01");
        topBg.width = GameConfig.stageWidth;
        topBg.height = 35;
        topBg.x = 0;
        topBg.y = forpeople_top.y + forpeople_top.height - 6;
        this.addChildToContainer(topBg);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        // //下面属性背景
        // let bottomBg:BaseBitmap = BaseBitmap.create("arena_bottom");
        // bottomBg.width = GameConfig.stageWidth;
        // bottomBg.height = 96;
        // bottomBg.x = 0;
        // bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        // this.addChildToContainer(bottomBg);
        if (this.code == "5") {
            // bigBg.y = bottomBg.y + bottomBg.height - bigBg.height;
        }
        var iconBg1 = BaseBitmap.create("mainui_bottombtnbg");
        iconBg1.x = 20;
        iconBg1.y = 190;
        this.addChild(iconBg1);
        var iconBg2 = BaseBitmap.create("mainui_bottombtnbg");
        iconBg2.x = iconBg1.x + iconBg1.width + 20;
        iconBg2.y = iconBg1.y;
        this.addChild(iconBg2);
        var buyBtn = ComponentManager.getButton("btn_buy_tool", "", this.butItemBtnCilck, this);
        buyBtn.x = iconBg1.x + iconBg1.width / 2 - buyBtn.width / 2;
        buyBtn.y = iconBg1.y - 5;
        this.addChild(buyBtn);
        var buyBB = BaseBitmap.create("punish_buyitem");
        buyBB.x = iconBg1.x + iconBg1.width / 2 - buyBB.width / 2;
        buyBB.y = iconBg1.y + 55;
        // buyBB.anchorOffsetX = buyBB.width/2;
        // buyBB.anchorOffsetY = buyBB.height/2;
        this.addChild(buyBB);
        var exchangeBtn = ComponentManager.getButton("punish_ex_icon", "", this.exchangeCilck, this);
        exchangeBtn.x = iconBg2.x + iconBg2.width / 2 - buyBtn.width / 2;
        exchangeBtn.y = buyBtn.y;
        this.addChild(exchangeBtn);
        var exBB = BaseBitmap.create("punish_ex_name");
        exBB.x = iconBg2.x + iconBg2.width / 2 - exBB.width / 2;
        exBB.y = buyBB.y;
        this.addChild(exBB);
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var iconBg3 = BaseBitmap.create("mainui_bottombtnbg");
            iconBg3.x = iconBg2.x + iconBg2.width + 20;
            iconBg3.y = iconBg1.y;
            this.addChild(iconBg3);
            var iconBg4 = BaseBitmap.create("mainui_bottombtnbg");
            iconBg4.x = iconBg3.x + iconBg3.width + 20;
            iconBg4.y = iconBg1.y;
            this.addChild(iconBg4);
            var rewardBtn = ComponentManager.getButton("punish_reward_icon", "", this.rankRewardBtnCilck, this);
            rewardBtn.x = iconBg3.x + iconBg2.width / 2 - rewardBtn.width / 2;
            rewardBtn.y = buyBtn.y;
            this.addChild(rewardBtn);
            // rewardBtn.setColor(TextFieldConst.COLOR_BLACK);
            var rewardIcon = BaseBitmap.create("punish_reward_name");
            rewardIcon.x = iconBg3.x + iconBg3.width / 2 - rewardIcon.width / 2;
            rewardIcon.y = buyBB.y;
            this.addChild(rewardIcon);
            // rankBtn.addTouchTap(this.rankCilck, this);
            var rankBtn = ComponentManager.getButton("punish_rank_icon", "", this.rankCilck, this);
            rankBtn.x = iconBg4.x + iconBg4.width / 2 - rankBtn.width / 2;
            rankBtn.y = buyBtn.y;
            this.addChild(rankBtn);
            var rankIcon = BaseBitmap.create("punish_rank_name");
            rankIcon.x = rankBtn.x + rankBtn.width / 2 - rankIcon.width / 2;
            rankIcon.y = buyBB.y;
            // rankBtn.addTouchTap(this.rankCilck, this);
            this.addChild(rankIcon);
        }
        //是否打死或者活动结束
        // if(this._acData.hp <= 0)
        this._progressBar = ComponentManager.getProgressBar("progress_type1_red", "progress_type1_bg2", 562);
        this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.width / 2;
        this._progressBar.y = GameConfig.stageHeigth - this.container.y - 300;
        ;
        this.addChildToContainer(this._progressBar);
        var lvStr = "";
        if (this.code == "2") {
            lvStr = (100 - this._acData.hp / cfg.Hp * 100).toFixed(3);
            this._progressBar.setPercentage(1 - this._acData.hp / cfg.Hp);
        }
        else {
            lvStr = Math.floor(this._acData.hp / cfg.Hp * 100).toString();
            this._progressBar.setPercentage(this._acData.hp / cfg.Hp);
        }
        this._levelTxt = ComponentManager.getTextField(lvStr + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._levelTxt.x = this._progressBar.x + this._progressBar.width / 2 - this._levelTxt.width / 2;
        this._levelTxt.y = this._progressBar.y + this._progressBar.height / 2 - this._levelTxt.height / 2 - 1;
        this.addChildToContainer(this._levelTxt);
        var btnKey = "acPunishBtn";
        if (this.code == "2") {
            btnKey = "useBtn";
        }
        else if (this.code == "3") {
            btnKey = "acPunishBtn2";
        }
        else if (this.code == "4") {
            btnKey = "acPunishBtn3";
        }
        else if (this.code == "5") {
            btnKey = "acPunishBtn5";
        }
        else if (this.code == "7" || this.code == "8" || this.code == "9" || this.code == "10") {
            btnKey = "acPunishBtn" + this.code;
        }
        this._chooseBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, btnKey, this.chooseBtnClick, this);
        this._chooseBtn.x = this.width / 2 - this._chooseBtn.width / 2;
        this._chooseBtn.y = GameConfig.stageHeigth - this.container.y - 80;
        this._chooseBtn.visible = false;
        this.addChildToContainer(this._chooseBtn);
        // this._chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
        //增加一键按钮
        this._chooseAllBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acPunishAllBtn" + this.code, this.chooseAllBtnClick, this);
        this._chooseAllBtn.x = this.width / 2 + 10;
        this._chooseAllBtn.y = this._chooseBtn.y;
        this._chooseAllBtn.visible = false;
        this.addChildToContainer(this._chooseAllBtn);
        if (this.code == "8") {
            var choosebg = BaseBitmap.create("wifeview_wenzibg2");
            choosebg.width = 100;
            choosebg.height = 90;
            choosebg.x = this._chooseBtn.width / 2 - choosebg.width / 2;
            choosebg.name = "choosebg";
            choosebg.y = this._chooseBtn.height / 2 - choosebg.height / 2;
            this._chooseBtn.addChildAt(choosebg, 0);
            var choosebg2 = BaseBitmap.create("wifeview_wenzibg2");
            choosebg2.width = choosebg.width;
            choosebg2.height = choosebg.height;
            choosebg2.x = choosebg.x;
            choosebg2.name = "choosebg2";
            choosebg2.y = choosebg.y;
            this._chooseAllBtn.addChildAt(choosebg2, 0);
        }
        // this._chooseAllBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._openTxtbg = BaseBitmap.create("wifeview_wenzibg2");
        this._openTxtbg.scaleX = 2;
        this._openTxtbg.x = GameConfig.stageWidth / 2 - this._openTxtbg.width * this._openTxtbg.scaleX / 2;
        this._openTxtbg.y = 350; //this._boxSp.y + this._boxSp.height + 50;
        this.addChildToContainer(this._openTxtbg);
        this._openTxtbg.alpha = 0;
        var openStr = LanguageManager.getlocal("acPunishOpenTime", ["00:00:00"]);
        this._openTxt = ComponentManager.getTextField(openStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._openTxt.x = GameConfig.stageWidth / 2 - this._openTxt.width / 2;
        this._openTxt.y = this._openTxtbg.y + this._openTxtbg.height / 2 - this._openTxt.height / 2;
        this.addChildToContainer(this._openTxt);
        if (this.code == "8" || this.code == "9" || this.code == "10") {
            this._openTxtbg.alpha = 1;
        }
        this._boxContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._boxContainer);
        this._lightSp = BaseBitmap.create("public_rotatelight");
        this._lightSp.scaleX = 1.5;
        this._lightSp.scaleY = 1.5;
        this._lightSp.anchorOffsetX = this._lightSp.width / 2;
        this._lightSp.anchorOffsetY = this._lightSp.height / 2;
        this._lightSp.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        egret.Tween.get(this._lightSp, { loop: true })
            .to({ rotation: 360 }, 3000);
        this._boxContainer.addChild(this._lightSp);
        this._boxSp = BaseBitmap.create("punish_box_close");
        this._boxSp.x = GameConfig.stageWidth / 2 - this._boxSp.width / 2;
        this._boxSp.y = GameConfig.stageHeigth / 2 - this._boxSp.height / 2;
        this._boxContainer.addChild(this._boxSp);
        this._boxSp.addTouchTap(this.getBoxClick, this);
        var descBg = BaseBitmap.create("wifeview_wenzibg2");
        descBg.scaleX = 2.5;
        descBg.x = GameConfig.stageWidth / 2 - descBg.width * descBg.scaleX / 2;
        descBg.y = this._boxSp.y + this._boxSp.height + 50;
        this._boxContainer.addChild(descBg);
        this._boxDesc = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBoxDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
        this._boxDesc.x = GameConfig.stageWidth / 2 - this._boxDesc.width / 2;
        this._boxDesc.y = descBg.y + descBg.height / 2 - this._boxDesc.height / 2 - 1;
        this._boxContainer.addChild(this._boxDesc);
        this.tick();
        this._wordsContanier = new BaseDisplayObjectContainer();
        this._wordsContanier.x = 50;
        this._wordsContanier.y = 300;
        this.addChildToContainer(this._wordsContanier);
        var wordsBg = BaseBitmap.create("public_9v_bg11");
        // wordsBg.visible = false;
        wordsBg.x = 0;
        wordsBg.y = 0;
        wordsBg.width = 200;
        wordsBg.height = 78;
        this._wordsContanier.addChild(wordsBg);
        // let wordsBgCor = BaseBitmap.create("public_9_bg25_tail");
        // wordsBgCor.x = 150;
        // wordsBgCor.y = wordsBg.y + wordsBg.height - 3;
        // wordsBgCor.skewY = 180;
        // this._wordsContanier.addChild(wordsBgCor);
        this._wordsTF = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._wordsTF.text = LanguageManager.getlocal("acPunishHitTip");
        this._wordsTF.x = wordsBg.x + 20;
        this._wordsTF.y = wordsBg.y + 20;
        this._wordsTF.width = 160;
        this._wordsTF.height = 80;
        this._wordsContanier.addChild(this._wordsTF);
        this._wordsContanier.visible = false;
        // //顶部背景图片
        // let test1: BaseBitmap = BaseBitmap.create("punish_1_3");
        // this.addChildToContainer(test1);
        // //顶部背景图片
        // let test2: BaseBitmap = BaseBitmap.create("punish_2_3");
        // this.addChildToContainer(test2);
        // //顶部背景图片
        // let test3: BaseBitmap = BaseBitmap.create("punish_3_3");
        // this.addChildToContainer(test3);
        // //顶部背景图片
        // let test4: BaseBitmap = BaseBitmap.create("punish_4_3");
        // this.addChildToContainer(test4);
    };
    //刷新活动状态
    AcPunishView.prototype.refreshState = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var num = 0;
        for (var i in this._punishItemVoList) {
            var data = this._punishItemVoList[i];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
            num += hasNum;
        }
        if (GameData.serverTime - zeroTime < 3600 * cfg.activeTime[0]) {
            //活动未开始
            this._openTxtbg.visible = this._openTxt.visible = true;
            this.setBoxVisible(false);
            this.setBossVisible(false);
            this._chooseAllBtn.visible = false;
        }
        else {
            this._openTxtbg.visible = this._openTxt.visible = false;
            //活动已经开始
            if (this._acData.hp <= 0) {
                //被打死了
                this.setBoxVisible(true);
                this.setBossVisible(false);
                this._chooseAllBtn.visible = false;
                this._boxDesc.text = LanguageManager.getlocal("acPunishGetBoxDesc-" + this.code);
                this._boxDesc.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                if (this._acVo.get) {
                    this._boxSp.texture = ResourceManager.getRes("punish_box_open");
                    this._lightSp.visible = true;
                }
                else {
                    this._boxSp.texture = ResourceManager.getRes("punish_box_close");
                    this._lightSp.visible = false;
                }
            }
            else {
                var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
                if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT < 0) {
                    // if(GameData.serverTime - zeroTime > 1){
                    //活动已经结束
                    this.setBoxVisible(true);
                    this.setBossVisible(false);
                    this._chooseAllBtn.visible = false;
                    this._boxDesc.text = LanguageManager.getlocal("acPunishBoxDesc-" + this.code);
                    this._boxDesc.textColor = 0xff0000;
                    this._lightSp.visible = false;
                    App.DisplayUtil.changeToGray(this._boxSp);
                    if (deltaT < 0) {
                        this._openTxtbg.visible = this._openTxt.visible = false;
                    }
                    else {
                        this._openTxtbg.visible = this._openTxt.visible = true;
                    }
                }
                else {
                    //没结束也没打死
                    this.setBoxVisible(false);
                    this.setBossVisible(true);
                    if (num >= cfg.itemNum) {
                        this._chooseBtn.x = GameConfig.stageWidth / 2 - this._chooseBtn.width - 10;
                        this._chooseAllBtn.visible = true;
                    }
                    else {
                        this._chooseBtn.x = GameConfig.stageWidth / 2 - this._chooseBtn.width / 2;
                        this._chooseAllBtn.visible = false;
                    }
                }
            }
        }
    };
    AcPunishView.prototype.checkState = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        if (GameData.serverTime - zeroTime < 3600 * cfg.activeTime[0]) {
            //活动未开始
        }
        else {
            this._openTxtbg.visible = this._openTxt.visible = false;
            //活动已经开始
            if (this._acData.hp <= 0) {
                //被打死了
            }
            else {
                var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
                if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT < 0) {
                    // if(GameData.serverTime - zeroTime > 1){
                    //活动已经结束
                }
                else {
                    //没结束也没打死
                    ViewController.getInstance().openView(ViewConst.BASE.ACPUNISHREPORTVIEW, { aid: this.aid, code: this.code });
                }
            }
        }
    };
    AcPunishView.prototype.getState = function () {
        var state = 0;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (GameData.serverTime - zeroTime < 3600 * cfg.activeTime[0] && deltaT > 0) {
            //活动未开始
            state = 1;
        }
        else {
            this._openTxtbg.visible = this._openTxt.visible = false;
            //活动已经开始
            if (this._acData.hp <= 0) {
                //被打死了
                state = 2;
            }
            else {
                var deltaT_1 = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
                if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT_1 < 0) {
                    // if(GameData.serverTime - zeroTime > 1){
                    //活动已经结束
                    // this.setBoxVisible(true);
                    if (deltaT_1 < 0) {
                        state = 3;
                    }
                    else {
                        state = 4;
                    }
                }
                else {
                    //没结束也没打死
                    state = 5;
                }
            }
        }
        return state;
        // return 4;
    };
    //箱子相关
    AcPunishView.prototype.setBoxVisible = function (b) {
        // this._openTxt.visible = true;
        this._boxContainer.visible = b;
    };
    //女囚相关
    AcPunishView.prototype.setBossVisible = function (b) {
        this._levelTxt.visible = b;
        this._progressBar.visible = b;
        this._chooseBtn.visible = b;
        this._chooseAllBtn.visible = b;
        if (this._bodyContainer)
            this._bodyContainer.visible = b;
        for (var index = 0; index < this._punishItemList.length; index++) {
            var element = this._punishItemList[index];
            element.visible = b;
        }
    };
    //刷新选中状态
    AcPunishView.prototype.setSelect = function (index) {
        if (this._selectItem) {
            if (this._selectItem.getChildByName("select")) {
                this._selectItem.removeChild(this._selectItem.getChildByName("select"));
                var baseBitmap = this._selectItem.getChildByName("select");
                baseBitmap = null;
            }
        }
        this._selectItem = this._punishItemList[index];
        // let bg2Index = this._selectItem.getChildIndex(this._selectItem.getChildByName("bg2"));
        var itemBg2 = BaseBitmap.create("itembg_selected");
        itemBg2.width = 114;
        itemBg2.height = 114;
        // itemBg2.width = 500;
        // itemBg2.height = 50;
        itemBg2.x = -4;
        itemBg2.y = -4;
        itemBg2.name = "select";
        this._selectItem.addChild(itemBg2);
        this._selectIndex = index;
    };
    AcPunishView.prototype.chooseAllBtnClick = function () {
        if (!this._touchSwitch) {
            return;
        }
        var num = 0;
        for (var i in this._punishItemVoList) {
            var data = this._punishItemVoList[i];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
            num += hasNum;
        }
        if (num <= 0) {
            var rewardStr = LanguageManager.getlocal("acPunishBuyTitleDesc");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "acPunishBuyTitle",
                msg: rewardStr,
                callback: this.doBuy,
                handler: this,
                needCancel: true
            });
            return;
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (num >= cfg.itemNum) {
            this._touchSwitch = false;
            var key = (this._selectIndex + 1).toString();
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH), this.chooseAllBtnClickCallback, this);
            this.request(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH, { activeId: "punish-" + this.code });
            this._touchSwitch = true;
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishAllRule", ["" + cfg.itemNum, LanguageManager.getlocal("acPunishAllBtn" + this.code)]));
        }
    };
    AcPunishView.prototype.chooseAllBtnClickCallback = function (evt) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH), this.chooseAllBtnClickCallback, this);
        var data = evt.data;
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                    this.showRewards(data.data.data);
                    // if(this.code == '1' || this.code == '3'){
                    // 	this.showRewards(data.data.data);
                    // }
                }
            }
            if (this.code == "7") {
                var index = App.MathUtil.getRandom(2, 4);
                var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
                var hp = Math.floor(this._acData.hp / cfg.Hp * 100);
                var hpIndex = hp > 50 ? 1 : 2;
                this._headPic.texture = ResourceManager.getRes("punish7_head" + hpIndex + "_" + index);
                if (this._bodyPic && hpIndex == 2) {
                    this._bodyPic.texture = ResourceManager.getRes("punish7_body2");
                }
                else {
                }
            }
            if (data.data.data.punishActive) {
                this._acData = data.data.data.punishActive;
            }
            if (data.data.data.hasKill) {
                this._acData.hp = 0;
            }
            // else{
            // 	this._acData  = data.data.data.punishActive;
            // }
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
            this.buyCallback(null);
            this.refreshState();
            /**
             * 飘起经验
             */
            var strList_1 = [];
            var scrore1 = data.data.data.score1;
            var flyStr1 = LanguageManager.getlocal("acPunishGetScoreTxt1", [String(scrore1)]);
            strList_1.push({ tipMessage: flyStr1 });
            var scrore2 = data.data.data.score2;
            if (scrore2 > 0) {
                var flyStr2 = LanguageManager.getlocal("acPunishGetScoreTxt2", [String(scrore2)]);
                strList_1.push({ tipMessage: flyStr2 });
            }
            egret.setTimeout(function () {
                App.CommonUtil.playRewardFlyAction(strList_1);
            }, this, 800);
        }
    };
    AcPunishView.prototype.showRewards = function (data) {
        this.currIconArr = [];
        var contentList = GameData.formatRewardItem(data.rewards);
        for (var i = 0; i < contentList.length; i++) {
            var icon = GameData.getItemIcon(contentList[i], true);
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            icon.scaleX = 0.5;
            icon.scaleY = 0.5;
            icon.x = 300;
            icon.y = GameConfig.stageHeigth / 2 - 70;
            this.addChild(icon);
            App.DisplayUtil.addFactorFunc(BaseDisplayObjectContainer);
            var currX = App.MathUtil.getRandom(500);
            if (this.code == '1') {
                icon.y = GameConfig.stageHeigth - 300;
                icon.x = 180;
                icon["tweenMoveList"] = [egret.Point.create(icon.x, icon.y), egret.Point.create(currX, 400), egret.Point.create(currX, 900)];
            }
            else {
                icon["tweenMoveList"] = [egret.Point.create(icon.x, icon.y), egret.Point.create(currX, 200), egret.Point.create(currX, 800)];
            }
            egret.Tween.get(icon).to({}).call(this.onComplete, this, [icon]);
            this.addChild(icon);
            this.currIconArr.push(icon);
        }
    };
    AcPunishView.prototype.onComplete = function (icon) {
        if (icon === void 0) { icon = null; }
        var l = this.currIconArr.length;
        for (var i = l - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.currIconArr[i]);
            egret.Tween.get(this.currIconArr[i]).wait(100).to({ factor: 1 }, 700).call(function (icon) {
                var _this = this;
                var timerNum = egret.setTimeout(function () {
                    if (!_this.isInit()) {
                        egret.clearTimeout(timerNum);
                        return;
                    }
                    // this.restPrisonView();
                    icon.dispose();
                    icon["tweenMoveList"] = undefined;
                    _this.currIconArr.splice(i, 1);
                }, this, 800);
            }.bind(this, this.currIconArr[i]));
        }
    };
    AcPunishView.prototype.chooseBtnClick = function () {
        if (this._selectIndex == -1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishSelectItem"));
            return;
        }
        if (!this._touchSwitch) {
            return;
        }
        var data = this._punishItemVoList[(this._selectIndex + 1).toString()];
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
        if (hasNum <= 0) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            var rewardStr = LanguageManager.getlocal("acPunishBuyTitleDesc");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "acPunishBuyTitle",
                msg: rewardStr,
                callback: this.doBuy,
                handler: this,
                needCancel: true
            });
            return;
        }
        this._touchSwitch = false;
        if (this.code == "2") {
            this.doCodeTwoLightAni();
        }
        else if (this.code == "3") {
            this.doAni1();
        }
        else if (this.code == "4") {
            // this.doNianShouAni();
            this.doYanHuaAni();
        }
        else if (this.code == "5") {
            // this.doNianShouAni();
            this.doYingJiuAni();
        }
        else if (this.code == "7") {
            this.doAni1();
        }
        else if (this.code == "8" || this.code == "9") {
            this.doCode8Ani();
        }
        else if (this.code == "10") {
            this.doCode10Ani();
        }
        else {
            this.doAni2();
        }
    };
    AcPunishView.prototype.doUseItemRequest = function () {
        var key = (this._selectIndex + 1).toString();
        this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM, { activeId: this.aid + "-" + this.code, itemKey: key });
    };
    AcPunishView.prototype.doCode8Ani = function () {
        var itemdata = this._punishItemVoList["" + (this._selectIndex + 1)];
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemdata.item));
        var posx = this._punishItemList[this._selectIndex].x;
        var posy = this._punishItemList[this._selectIndex].y;
        var tmpitemContainer = new BaseDisplayObjectContainer();
        tmpitemContainer.width = tmpitemContainer.height = 100;
        this.addChild(tmpitemContainer);
        var resPath = "itemicon" + itemCfg.id;
        var resPath2 = resPath + "_1";
        var tmpItemSp = BaseLoadBitmap.create(resPath);
        tmpitemContainer.addChild(tmpItemSp);
        tmpitemContainer.anchorOffsetX = tmpitemContainer.width / 2;
        tmpitemContainer.anchorOffsetY = tmpitemContainer.height / 2;
        tmpitemContainer.x = posx + tmpitemContainer.anchorOffsetX;
        tmpitemContainer.y = posy + tmpitemContainer.anchorOffsetY;
        var tarX = GameConfig.stageWidth / 2;
        var tarY = GameConfig.stageHeigth / 2 + 50;
        var thpThis = this;
        // egret.Tween.get(tmpitemContainer,{loop:false}).to({x:tarX ,y:tarY ,rotation:360*4,scaleX:0.05,scaleY:0.05},500).call(()=>{ //
        // 	tmpItemSp.setload( resPath2);
        // },this).to({scaleX:1.1,scaleY:1.1},100).to({scaleX:1.0,scaleY:1.0},30).wait(100).to({y:tarY - 150},800).call(()=>{
        // 	thpThis.removeChild(tmpitemContainer);
        // 	tmpitemContainer = null;
        // 	tmpItemSp = null;
        // 	thpThis._touchSwitch = true;
        // },this).call(this.doUseItemRequest,this);
        egret.Tween.get(tmpitemContainer, { loop: false }).to({ x: tarX, y: tarY, scaleX: 0.05, scaleY: 0.05 }, 500).call(function () {
            tmpItemSp.setload(resPath2);
        }, this).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1.0, scaleY: 1.0 }, 30).wait(100).to({ y: tarY - 150 }, 800).call(function () {
            thpThis.removeChild(tmpitemContainer);
            tmpitemContainer = null;
            tmpItemSp = null;
            thpThis._touchSwitch = true;
        }, this).call(this.doUseItemRequest, this);
    };
    // private doCode9Ani()
    // {
    // 	this.doUseItemRequest();
    // }
    AcPunishView.prototype.doCode10Ani = function () {
        var itemdata = this._punishItemVoList["" + (this._selectIndex + 1)];
        // let itemCfg = Config.ItemCfg.getItemCfgById(Number(itemdata.item));
        var deltaX = 0;
        var deltaY = 0;
        var aniStr = "punish_2_";
        if (itemdata.item == "1881") {
            aniStr = "punish_5_";
        }
        else if (itemdata.item == "1882") {
            aniStr = "punish_8_";
        }
        else if (itemdata.item == "1883") {
            aniStr = "punish_6_";
            deltaY = -100;
        }
        else if (itemdata.item == "1884") {
            aniStr = "punish_7_";
            deltaX = -120;
        }
        var itemClip = ComponentManager.getCustomMovieClip(aniStr, 4, 100);
        itemClip.x = this._bodyPic.x + 100 + deltaX;
        itemClip.y = this._bodyPic.y + deltaY;
        this.addChildToContainer(itemClip);
        itemClip.playWithTime(1);
        var thpThis = this;
        egret.Tween.get(this._bodyPic).set({ texture: ResourceManager.getRes("punish10_body2") }).wait(400).set({ texture: ResourceManager.getRes("punish10_body1") }).call(function () {
            thpThis._touchSwitch = true;
            thpThis.doUseItemRequest();
            thpThis.container.removeChild(itemClip);
            itemClip = null;
        }, this);
    };
    //点灯动画
    AcPunishView.prototype.doYanHuaAni = function () {
        var _this = this;
        var idx = this._selectIndex + 1 + 1812;
        var lightSp = BaseBitmap.create("itemicon" + idx);
        lightSp.rotation = -20;
        // lightSp.setScale(1.7);
        // lightSp.x = -lightSp.width/2*lightSp.scaleX;
        var lightContainer = new BaseDisplayObjectContainer();
        lightContainer.x = GameConfig.stageWidth / 2 - lightSp.width / 2 * lightSp.scaleX;
        ;
        // lightContainer.y = GameConfig.stageHeigth - 200;
        lightContainer.addChild(lightSp);
        lightContainer.y = this._chooseBtn.y - lightContainer.height - 80;
        this.container.addChildAt(lightContainer, 10);
        lightSp.alpha = 0;
        var ranX = App.MathUtil.getRandom(0, 50);
        egret.Tween.get(lightSp, { loop: false }).to({ alpha: 1 }, 500).wait(300).call(function () {
            // this._touchSwitch = true;
        }, this);
        egret.Tween.get(lightContainer, { loop: false }).
            to({
            y: this._chooseBtn.y - lightContainer.height - 230,
            x: lightContainer.x - ranX,
            scaleX: 0.5,
            scaleY: 0.5,
        }, 500).call(function () {
            _this.removeChildFromContainer(lightContainer);
            lightContainer = null;
            lightSp = null;
            _this.doNianShouAni();
        }, this);
    };
    //年兽动画
    AcPunishView.prototype.doNianShouAni = function () {
        var _this = this;
        SoundManager.playEffect("effect_punish_boom");
        var aniNum = [1, 3, 5, 7];
        var idx = this._selectIndex + 1 + 1812;
        this._headPic.texture = ResourceManager.getRes("punish_nian1");
        egret.Tween.get(this._headPic, { loop: false }).wait(500).call(function () {
            _this._headPic.texture = ResourceManager.getRes("punish_nian");
        }, this);
        var _loop_1 = function () {
            var ranIndex = App.MathUtil.getRandom(1, 3);
            var lightSp = BaseBitmap.create("punish_ani4" + ranIndex);
            lightSp.rotation = -20;
            lightSp.setScale(1.3);
            // lightSp.x = -lightSp.width/2*lightSp.scaleX;
            var lightContainer = new BaseDisplayObjectContainer();
            var ranX = App.MathUtil.getRandom(0, 100);
            var ranY = App.MathUtil.getRandom(-20, 80);
            lightContainer.x = GameConfig.stageWidth / 2 - lightSp.width / 2 * lightSp.scaleX + ranX;
            // lightContainer.y = GameConfig.stageHeigth - 200;
            lightContainer.addChild(lightSp);
            lightContainer.y = this_1._chooseBtn.y - lightContainer.height - 180 + ranY;
            this_1.container.addChildAt(lightContainer, 10);
            // lightSp.alpha = 0;
            egret.Tween.get(lightSp, { loop: false }).wait(500).call(function () {
                _this._touchSwitch = true;
            }, this_1);
            lightSp.anchorOffsetX = lightSp.width / 2;
            lightSp.anchorOffsetY = lightSp.height / 2;
            lightContainer.setScale(0.1);
            egret.Tween.get(lightContainer, { loop: false }).wait(100 * index).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                _this.removeChildFromContainer(lightContainer);
                lightContainer = null;
                lightSp = null;
            }, this_1);
        };
        var this_1 = this;
        for (var index = 0; index < aniNum[this._selectIndex]; index++) {
            _loop_1();
        }
        var key = (this._selectIndex + 1).toString();
        this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM, { activeId: this.aid + "-" + this.code, itemKey: key });
    };
    //营救动画
    AcPunishView.prototype.doYingJiuAni0 = function () {
        var _this = this;
        var idx = this._selectIndex + 1;
        var lightSp = BaseBitmap.create("punish_ani5" + idx + "_0");
        lightSp.rotation = -20;
        // lightSp.setScale(1.7);
        // lightSp.x = -lightSp.width/2*lightSp.scaleX;
        var lightContainer = new BaseDisplayObjectContainer();
        lightContainer.x = GameConfig.stageWidth / 2 - 30;
        ;
        // lightContainer.y = GameConfig.stageHeigth - 200;
        lightContainer.addChild(lightSp);
        lightContainer.y = this._chooseBtn.y - 160;
        this.container.addChildAt(lightContainer, 10);
        egret.Tween.get(lightContainer, { loop: false }).
            to({
            y: lightContainer.y + 10,
            x: lightContainer.x + 20,
            scaleX: 1.1,
            scaleY: 1.1,
        }, 300).call(function () {
            _this.removeChildFromContainer(lightContainer);
            lightContainer = null;
            lightSp = null;
            _this.doYingJiuAni();
        }, this);
    };
    //营救动画
    AcPunishView.prototype.doYingJiuAni = function () {
        var _this = this;
        var dis = ((GameConfig.stageWidth / 2 - 30) - (this._headPic.x + 240)) / ((this._chooseBtn.y - 160) - (this._headPic.y + 470));
        var angle = Math.atan(dis) * 180 / Math.PI;
        ;
        SoundManager.playEffect("effect_punish_5weapon");
        var idx = this._selectIndex + 1;
        var lightSp = BaseBitmap.create("punish_ani5" + idx);
        lightSp.rotation = -angle;
        // lightSp.setScale(1.7);
        // lightSp.x = -lightSp.width/2*lightSp.scaleX;
        var lightContainer = new BaseDisplayObjectContainer();
        lightContainer.x = GameConfig.stageWidth / 2 - 30;
        ;
        // lightContainer.y = GameConfig.stageHeigth - 200;
        lightContainer.addChild(lightSp);
        lightContainer.y = this._chooseBtn.y - 160;
        this.container.addChildAt(lightContainer, 10);
        egret.Tween.get(lightContainer, { loop: false }).
            to({
            y: this._headPic.y + 470,
            x: this._headPic.x + 240,
            scaleX: 0.5,
            scaleY: 0.5,
        }, 300).call(function () {
            _this.removeChildFromContainer(lightContainer);
            lightContainer = null;
            lightSp = null;
            _this.doYingJiuAni2();
        }, this);
    };
    //营救动画
    AcPunishView.prototype.doYingJiuAni2 = function () {
        var _this = this;
        //飘血
        var bloodSp = BaseBitmap.create("punish_ani5_hit");
        bloodSp.x = this._headPic.x + 240 - 90;
        bloodSp.y = this._headPic.y + 470 - 70;
        this.container.addChildAt(bloodSp, 10);
        var idx = this._selectIndex + 1;
        var showSp = BaseBitmap.create("punish_ani5" + idx + "_0");
        var dis = ((GameConfig.stageWidth / 2 - 30) - (this._headPic.x + 240)) / ((this._chooseBtn.y - 160) - (this._headPic.y + 470));
        var angle = Math.atan(dis) * 180 / Math.PI;
        ;
        // Math.atan2
        showSp.rotation = -angle;
        showSp.x = this._headPic.x + 240;
        showSp.y = this._headPic.y + 470;
        showSp.setScale(0.5);
        this.container.addChildAt(showSp, 11);
        egret.Tween.get(bloodSp, { loop: false }).
            wait(300).call(function () {
            _this.removeChildFromContainer(bloodSp);
            bloodSp = null;
            // this.doYingJiuAni2();
            _this.removeChildFromContainer(showSp);
            showSp = null;
        }, this);
        // SoundManager.playEffect("effect_punish_boom");
        // let aniNum = [1,3,5,7];
        // let idx = this._selectIndex+1 + 1812;
        SoundManager.playEffect("effect_punish_5boss");
        this._headPic.texture = ResourceManager.getRes("punish_boss1");
        egret.Tween.get(this._headPic, { loop: false }).wait(500).call(function () {
            _this._headPic.texture = ResourceManager.getRes("punish_boss");
            _this._touchSwitch = true;
        }, this);
        var key = (this._selectIndex + 1).toString();
        this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM, { activeId: this.aid + "-" + this.code, itemKey: key });
    };
    //点灯动画
    AcPunishView.prototype.doCodeTwoLightAni = function () {
        var _this = this;
        var idx = this._selectIndex + 1 + 1804;
        var lightSp = BaseBitmap.create("itemicon" + idx);
        // lightSp.rotation = -20;
        // lightSp.setScale(1.7);
        // lightSp.x = -lightSp.width/2*lightSp.scaleX;
        var lightContainer = new BaseDisplayObjectContainer();
        lightContainer.x = 450;
        // lightContainer.y = GameConfig.stageHeigth - 200;
        lightContainer.addChild(lightSp);
        lightContainer.y = this._chooseBtn.y - lightContainer.height - 200;
        // lightContainer.y = 400;
        var aniY = 500;
        this.container.addChildAt(lightContainer, 1);
        lightSp.alpha = 0;
        var ranX = App.MathUtil.getRandom(0, 50);
        egret.Tween.get(lightSp, { loop: false }).to({ alpha: 1 }, 500).wait(300).call(function () {
            _this._touchSwitch = true;
        }, this);
        egret.Tween.get(lightContainer, { loop: false }).to({ x: 0, y: aniY, scaleX: 0.6, scaleY: 0.6 }, 2500).call(function () {
            _this.removeChildFromContainer(lightContainer);
            lightContainer = null;
            lightSp = null;
        }, this);
        var key = (this._selectIndex + 1).toString();
        this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM, { activeId: this.aid + "-" + this.code, itemKey: key });
    };
    AcPunishView.prototype.doAni1 = function () {
        var key = (this._selectIndex + 1).toString();
        var posX = [200, 200, 220, 220];
        var posY = [300, 300, 140, 300];
        var aniStr = "punish_" + key + "_";
        var itemClip = ComponentManager.getCustomMovieClip(aniStr, 2, 100);
        itemClip.frameImages = ["punish_" + key + "_1", "punish_" + key + "_2"];
        itemClip.x = posX[this._selectIndex];
        itemClip.y = posY[this._selectIndex];
        this.addChildToContainer(itemClip);
        if (this.code == "7") {
            // itemClip.x = itemClip.x - 30;
            itemClip.y = GameConfig.stageHeigth - 960 + itemClip.y + 90;
            ;
        }
        itemClip.playWithTime(1);
        itemClip.setEndCallBack(this.nextAni, this);
    };
    AcPunishView.prototype.doAni2 = function () {
        SoundManager.playEffect(SoundConst.EFFECT_PRISON_HIT);
        this._wordsContanier.visible = true;
        var rnd = App.MathUtil.getRandom(1, 4);
        this._wordsTF.text = LanguageManager.getlocal("acPunishHitTip" + rnd);
        var key = (this._selectIndex + 1).toString();
        var container = new BaseDisplayObjectContainer();
        var aniBB = BaseBitmap.create("punish_ani" + key);
        container.setScale(2.5);
        this.addChildToContainer(container);
        container.addChild(aniBB);
        egret.Tween.get(container).to({ scaleX: 1, scaleY: 1 }, 200).call(function (m) {
            if (m) {
                // egret.Tween.removeTweens(m);
                // tmpThis.removeChild(m);
                // flytxt2.alpha=1;
                // m.dispose();
                this.nextAni2(m);
            }
        }.bind(this, container), this);
        container.anchorOffsetX = container.width / 2;
        container.anchorOffsetY = container.height / 2;
        var posX = [250, 320, 250, 300];
        var posY = [500, 500, 440, 400];
        container.x = posX[this._selectIndex];
        container.y = posY[this._selectIndex];
    };
    AcPunishView.prototype.nextAni2 = function (m) {
        var key = (this._selectIndex + 1).toString();
        this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM, { activeId: this.aid + "-" + this.code, itemKey: key });
        this._headPic.texture = ResourceManager.getRes("punish_head2_2");
        var aniBB = BaseBitmap.create("punish_light");
        m.addChildAt(aniBB, 0);
        egret.Tween.removeTweens(m);
        egret.Tween.get(m).wait(200).to({ alpha: 0 }, 500).call(function (m) {
            if (m) {
                // m.addChildAt(0)
                egret.Tween.removeTweens(m);
                // tmpThis.removeChild(m);
                // flytxt2.alpha=1;
                this._headPic.texture = ResourceManager.getRes("punish_head2_1");
                m.dispose();
                // this.nextAni2(m);
                this._touchSwitch = true;
                this._wordsContanier.visible = false;
            }
        }.bind(this, m), this);
    };
    AcPunishView.prototype.doBuy = function () {
        AcPunishBuyItemPopupView.aid = this.aid;
        AcPunishBuyItemPopupView.code = this.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHBUYITEMPOPUPVIEW, {});
    };
    AcPunishView.prototype.nextAni = function (m) {
        var key = (this._selectIndex + 1).toString();
        var rnd = App.MathUtil.getRandom(1, 5);
        SoundManager.playEffect("effect_punish_" + rnd);
        SoundManager.playEffect("effect_item_" + key);
        var posX = [200, 200, 220, 220];
        var posY = [300, 300, 140, 300];
        var aniStr = "punish_" + key + "_";
        var itemClip = ComponentManager.getCustomMovieClip(aniStr, 2, 100);
        itemClip.frameImages = ["punish_" + key + "_3", "punish_" + key + "_4"];
        itemClip.x = posX[this._selectIndex];
        itemClip.y = posY[this._selectIndex];
        if (this.code == "7") {
            // itemClip.x = itemClip.x - 30;
            itemClip.y = GameConfig.stageHeigth - 960 + itemClip.y + 90;
        }
        this.addChildToContainer(itemClip);
        this._touchSwitch = false;
        itemClip.playWithTime(1);
        if (this.code == "7") {
            var index = App.MathUtil.getRandom(2, 4);
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var hp = Math.floor(this._acData.hp / cfg.Hp * 100);
            var hpIndex = hp > 50 ? 1 : 2;
            this._headPic.texture = ResourceManager.getRes("punish7_head" + hpIndex + "_" + index);
            if (this._bodyPic && hpIndex == 2) {
                this._bodyPic.texture = ResourceManager.getRes("punish7_body2");
            }
        }
        else {
            this._headPic.texture = ResourceManager.getRes("punish_head2");
        }
        itemClip.setEndCallBack(this.setEnd, this);
        m.dispose();
    };
    AcPunishView.prototype.setEnd = function (m) {
        var key = (this._selectIndex + 1).toString();
        if (this.code == "7") {
            // let index = App.MathUtil.getRandom(1,4)
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var hp = Math.floor(this._acData.hp / cfg.Hp * 100);
            var hpIndex = hp > 50 ? 1 : 2;
            this._headPic.texture = ResourceManager.getRes("punish7_head" + hpIndex + "_1");
        }
        else {
            this._headPic.texture = ResourceManager.getRes("punish_head1");
        }
        this.request(NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM, { activeId: "punish-" + this.code, itemKey: key });
        this._touchSwitch = true;
        var tmpThis = this;
        egret.Tween.get(m).to({ alpha: 0 }, 300).call(function (m) {
            if (m) {
                egret.Tween.removeTweens(m);
                // tmpThis.removeChild(m);
                // flytxt2.alpha=1;
                m.dispose();
            }
        }.bind(this, m), this);
    };
    //领取BOSS奖励
    AcPunishView.prototype.getBoxClick = function () {
        if (this._acVo.get) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishGetBoxTip1"));
            return;
        }
        if (this._acData.hp > 0) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("acPunishGetBoxTip1"));
            return;
        }
        this.request(NetRequestConst.REQUEST_ACTIVITY_GETPUNISHREWARD, { activeId: "punish-" + this.code });
    };
    //请求回调
    AcPunishView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_USEPUNISHITEM) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            if (data.data.data.punishActive) {
                this._acData = data.data.data.punishActive;
            }
            if (data.data.data.hasKill) {
                this._acData.hp = 0;
            }
            // else{
            // 	this._acData  = data.data.data.punishActive;
            // }
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
            this.buyCallback(null);
            this.refreshState();
            /**
             * 飘起经验
             */
            var strList_2 = [];
            var scrore1 = data.data.data.score1;
            var flyStr1 = LanguageManager.getlocal("acPunishGetScoreTxt1", [String(scrore1)]);
            strList_2.push({ tipMessage: flyStr1 });
            var scrore2 = data.data.data.score2;
            if (scrore2 > 0) {
                var flyStr2 = LanguageManager.getlocal("acPunishGetScoreTxt2", [String(scrore2)]);
                strList_2.push({ tipMessage: flyStr2 });
            }
            egret.setTimeout(function () {
                App.CommonUtil.playRewardFlyAction(strList_2);
            }, this, 800);
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE) {
            // this._acData  = data.data.data.punishActive;
            if (data.data.data.punishActive) {
                this._acData = data.data.data.punishActive;
            }
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETPUNISHREWARD) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            this.refreshState();
        }
    };
    AcPunishView.prototype.butItemBtnCilck = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (GameData.serverTime - zeroTime > 3600 * cfg.activeTime[1] || deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        // if(this.getState() == 3)
        // {
        // }
        AcPunishBuyItemPopupView.aid = this.aid;
        AcPunishBuyItemPopupView.code = this.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHBUYITEMPOPUPVIEW, {});
    };
    AcPunishView.prototype.rankRewardBtnCilck = function () {
        // if(this.acVo.et - GameData.serverTime - 86400 * 1 <= 0){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        //     return;
        // }
        AcPunishRankRewardPopupView.aid = this.aid;
        AcPunishRankRewardPopupView.code = this.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHRANKREWARDPOPUPVIEW, { acData: this._acData, aid: this.aid, code: this.code });
    };
    AcPunishView.prototype.rankCilck = function () {
        // if(this.acVo.et - GameData.serverTime - 86400 * 1 <= 0){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        //     return;
        // }
        // this._acVo.et = GameData.serverTime + 10;
        AcPunishRankPopupView.aid = this.aid;
        AcPunishRankPopupView.code = this.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHRANKPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    AcPunishView.prototype.exchangeCilck = function () {
        AcPunishExPopupView.aid = this.aid;
        AcPunishExPopupView.code = this.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHEXPOPUPVIEW, { aid: this.aid, code: this.code });
    };
    AcPunishView.prototype.getRuleInfo = function () {
        return "acPunish_Rule-" + this.code;
    };
    AcPunishView.prototype.addChildToContainer = function (obj) {
        if (obj) {
            this.container.addChild(obj);
            this.container.y = 0;
        }
    };
    AcPunishView.prototype.showList = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._punishItemVoList = cfg.punishList;
        for (var index = 1; index < 5; index++) {
            var item = this.getItem(this._punishItemVoList[index.toString()]);
            this._punishItemList.push(item);
            item.setScale(0.9);
            item.x = 77 + (136 * 0.9 + 10) * (index - 1);
            item.y = GameConfig.stageHeigth - this.container.y - 250;
            this.addChild(item);
            item.addTouchTap(this.itemClick, this, [index - 1]);
        }
        for (var index = 0; index < this._punishItemList.length; index++) {
            var data = this._punishItemVoList[(index + 1).toString()];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
            if (hasNum > 0) {
                this.setSelect(index);
                return;
            }
        }
    };
    AcPunishView.prototype.getItem = function (data) {
        // let itemInfo = Api.itemVoApi.getItemInfoVoById(data.item.toString());
        var container = new BaseDisplayObjectContainer();
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(data.item));
        // let itemCfg = Config.ItemCfg.getItemCfgById(Number("1810"));
        var iconBg = BaseBitmap.create(itemCfg.iconBg);
        iconBg.name = "itembg";
        container.addChild(iconBg);
        // container.width = iconBg.width;
        // container.height = iconBg.height;
        var icon = BaseLoadBitmap.create(itemCfg.icon);
        container.addChild(icon);
        icon.name = "itemicon";
        icon.setPosition(4, 3);
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
        var numLb = ComponentManager.getTextField(hasNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        numLb.setPosition(iconBg.width - 8 - numLb.width, iconBg.height - 8 - numLb.height);
        container.addChild(numLb);
        numLb.name = "numLb";
        var nameBg = BaseBitmap.create("public_numbg");
        nameBg.x = iconBg.width / 2 - nameBg.width / 2;
        nameBg.y = iconBg.height + 5;
        container.addChild(nameBg);
        var nameLb = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameLb.x = nameBg.x + nameBg.width / 2 - nameLb.width / 2;
        nameLb.y = nameBg.y + nameBg.height / 2 - nameLb.height / 2;
        container.addChild(nameLb);
        if (hasNum <= 0) {
            App.DisplayUtil.changeToGray(icon);
            App.DisplayUtil.changeToGray(iconBg);
        }
        return container;
    };
    AcPunishView.prototype.itemClick = function (evt, index) {
        // this._selectIndex = index;
        this.setSelect(index);
    };
    AcPunishView.prototype.tick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var acstartTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var now = GameData.serverTime;
        var startTime = zeroTime + 3600 * cfg.activeTime[0];
        var endTime = zeroTime + 3600 * cfg.activeTime[1];
        var isRefresh = false;
        if (this._lastTime < startTime && now > startTime) {
            isRefresh = true;
        }
        if (this._lastTime < endTime && now > endTime) {
            isRefresh = true;
        }
        if (this.getState() == 3 || this.getState() == 4) {
            if (this._boxContainer && this._boxContainer.visible == false) {
                isRefresh = true;
            }
        }
        if (isRefresh) {
            this.refreshState();
            this._lastTime = now;
        }
        // let deltaT = this._acVo.et - GameData.serverTime - 86400*cfg.extraTime;
        if (this.getState() == 4) {
            var openTime = 86400 + App.DateUtil.getWeeTs(GameData.serverTime) - GameData.serverTime + cfg.activeTime[0] * 3600;
            var openStr = LanguageManager.getlocal("acPunishOpenTime", [App.DateUtil.getFormatBySecond(openTime, 1)]);
            this._openTxtbg.visible = this._openTxt.visible = true;
            this._openTxt.text = openStr;
        }
        if (this.getState() == 1) {
            var openTime = App.DateUtil.getWeeTs(GameData.serverTime) - GameData.serverTime + cfg.activeTime[0] * 3600;
            var openStr = LanguageManager.getlocal("acPunishOpenTime", [App.DateUtil.getFormatBySecond(openTime, 1)]);
            this._openTxtbg.visible = this._openTxt.visible = true;
            this._openTxt.text = openStr;
        }
    };
    AcPunishView.prototype.buyCallback = function (event) {
        var num = 0;
        for (var index = 0; index < this._punishItemList.length; index++) {
            var txt = this._punishItemList[index].getChildByName("numLb");
            var data = this._punishItemVoList[(index + 1).toString()];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
            txt.text = hasNum.toString();
            txt.setPosition(108 - 8 - txt.width, 106 - 8 - txt.height);
            var iconBg = this._punishItemList[index].getChildByName("itembg");
            var icon = this._punishItemList[index].getChildByName("itemicon");
            if (hasNum <= 0) {
                App.DisplayUtil.changeToGray(icon);
                App.DisplayUtil.changeToGray(iconBg);
            }
            else {
                App.DisplayUtil.changeToNormal(icon);
                App.DisplayUtil.changeToNormal(iconBg);
            }
            num += hasNum;
        }
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
        var score1Str = LanguageManager.getlocal("acPunishScore2", [this._acVo.v.toString()]);
        this._score1Text.text = score1Str;
        var score2Str = LanguageManager.getlocal("acPunishScore1", [this._acVo.score.toString()]);
        this._score2Text.text = score2Str;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!this._acData) {
            return;
        }
        var lvStr = "";
        if (this.code == "2") {
            lvStr = (100 - this._acData.hp / cfg.Hp * 100).toFixed(3);
            this._progressBar.setPercentage(1 - this._acData.hp / cfg.Hp);
        }
        else {
            lvStr = Math.floor(this._acData.hp / cfg.Hp * 100).toString();
            this._progressBar.setPercentage(this._acData.hp / cfg.Hp);
        }
        this._levelTxt.text = lvStr + "%";
        if (num >= cfg.itemNum && this.getState() == 5) {
            this._chooseBtn.x = GameConfig.stageWidth / 2 - this._chooseBtn.width - 10;
            this._chooseAllBtn.visible = true;
        }
    };
    AcPunishView.prototype.runText = function () {
        var strList = new Array();
        for (var index = 0; index < this._acData.log.length; index++) {
            var str = this.getTipText(this._acData.log[index]);
            strList.push(str);
        }
        var lampContainer = new LoopLamp(strList);
        lampContainer.y = 150;
        this.addChildToContainer(lampContainer);
    };
    AcPunishView.prototype.getTipText = function (data) {
        var tipStr = "";
        if (!data) {
            return "";
        }
        var itemcfg = Config.ItemCfg.getItemCfgById(Number(data[1]));
        if (itemcfg) {
            var rewardStr = GameData.getRewardsStr(data[2]);
            tipStr = LanguageManager.getlocal("acPunishTip", [data[0], itemcfg.name, rewardStr]);
        }
        return tipStr;
    };
    AcPunishView.prototype.exCallback = function (event) {
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode("punish", this.code);
        this._score2Text.text = LanguageManager.getlocal("acPunishScore1", [this._acVo.score.toString()]);
    };
    AcPunishView.prototype.getSheepType = function () {
        return 1;
    };
    AcPunishView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM), this.buyCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP), this.exCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.buyCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_AUTOPUNISH), this.chooseAllBtnClickCallback, this);
        this._scrollList = null;
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._score1Text = null;
        this._score2Text = null;
        this._acData = null;
        this._acVo = null;
        this._progressBar = null;
        this._selectBg = null;
        this._selectIndex = -1;
        this._openTxt = null;
        this._boxContainer = null;
        this._lightSp = null;
        this._boxDesc = null;
        this._boxSp = null;
        this._chooseBtn = null;
        this._touchSwitch = true;
        // egret.Tween.removeTweens(this._lightSp);
        this._bodyContainer = null;
        this._headPic = null;
        this._wordsContanier = null;
        this._punishItemList = null;
        this._chooseAllBtn = null;
        this.currIconArr = [];
        if (this._tw) {
            egret.Tween.removeTweens(this._tw);
            this._tw = null;
        }
        this._openTxtbg = null;
        _super.prototype.dispose.call(this);
    };
    return AcPunishView;
}(AcCommonView));
__reflect(AcPunishView.prototype, "AcPunishView");
