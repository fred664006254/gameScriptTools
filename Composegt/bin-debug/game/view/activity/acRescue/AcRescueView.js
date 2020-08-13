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
 * 营救红颜
 * author dky
 * date 2018/12/25
 * @class AcRescueView
 */
var AcRescueView = (function (_super) {
    __extends(AcRescueView, _super);
    // private _wordsTF:BaseTextField;
    function AcRescueView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._score1Text = null;
        _this._score2Text = null;
        _this._selectIndex = -1;
        // let tmpVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("dailyCharge","1");
        _this._lastTime = 0; //刷新时间
        _this._touchSwitch = true;
        return _this;
    }
    AcRescueView.prototype.getResourceList = function () {
        var arr = [
            "punish_ex_icon", "punish_ex_name", "punish_rank_icon", "punish_rank_name",
            "progress_type1_bg2",
            "progress_type1_red",
            "wifeview_wenzibg2", "public_rotatelight",
            // "tigertrappass_topbg",
            "recharge_diban_01",
            "arena_bottom",
            "progress_blood",
            "progress_bloodbg",
            "manage_boomtext",
        ];
        // if(RES.hasRes("resuce" + this.code)){
        // 	arr.push("resuce" + this.code)
        // }
        if (this.code == "1") {
            arr.push("rescueboss1");
            arr.push("rescueboss1_1");
            arr.push("rescueboss1_2");
            arr.push("rescueboss1_3");
        }
        arr.push("acpunishview");
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    AcRescueView.prototype.initView = function () {
        // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:1, kid:NetRequestConst.KID_RESCUEAC});
        this._lastTime = App.DateUtil.getWeeTs(GameData.serverTime);
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var maskSp = BaseBitmap.create("commonview_bg1");
        maskSp.width = GameConfig.stageWidth;
        maskSp.height = 80;
        maskSp.y = 10;
        // maskSp.y = 180;
        this.addChildToContainer(maskSp);
        this._uiContainer = new BaseDisplayObjectContainer();
        this._uiContainer.width = GameConfig.stageWidth;
        this.addChildToContainer(this._uiContainer);
        this._skillIconList = new Array();
        this.showText();
        this.showList();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshState, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM), this.buyCallback, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP), this.exCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.buyCallback, this);
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
    AcRescueView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETRESCUEACTIVE, requestData: { activeId: this.acVo.aidAndCode } };
    };
    Object.defineProperty(AcRescueView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRescueView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcRescueView.prototype.showText = function () {
        //背景图片
        var bgres = "rescuebg" + this.code;
        var bigBg = BaseLoadBitmap.create(bgres);
        // this.addChildToContainer(bigBg);
        this.container.addChildAt(bigBg, 0);
        bigBg.y = 20;
        //顶部背景图片
        var forpeople_top = BaseBitmap.create("punish_huodong");
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 67;
        //顶部背景图片2
        var forpeople_top2 = BaseBitmap.create("recharge_diban_01");
        forpeople_top2.width = GameConfig.stageWidth;
        this.addChildToContainer(forpeople_top2);
        forpeople_top2.y = forpeople_top.y + forpeople_top.height - 4;
        //tip   
        var tip1Txt = ComponentManager.getTextField(LanguageManager.getlocal("rescueTip1"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip1Txt.width = 620;
        tip1Txt.lineSpacing = 3;
        tip1Txt.x = 10;
        tip1Txt.y = forpeople_top2.y + 5;
        this.addChildToContainer(tip1Txt);
        // let tip2Txt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rescueTip2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        // tip2Txt.x = GameConfig.stageWidth/2 - tip2Txt.width/2;
        // tip2Txt.y = tip1Txt.y + tip1Txt.height + 5;
        forpeople_top2.height = tip1Txt.height + 20;
        // this.addChildToContainer(tip2Txt);
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
        var score1Str = LanguageManager.getlocal("acPunishScore2", [this._acVo.v.toString()]);
        this._score1Text = ComponentManager.getTextField(score1Str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._score1Text.x = 440 + 20;
        this._score1Text.y = forpeople_top.y + 15;
        this.addChildToContainer(this._score1Text);
        var score2Str = LanguageManager.getlocal("acPunishScore1", [this._acVo.score.toString()]);
        this._score2Text = ComponentManager.getTextField(score2Str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._score2Text.x = this._score1Text.x;
        this._score2Text.y = this._score1Text.y + this._score1Text.height + 8;
        this.addChildToContainer(this._score2Text);
        //跑马灯背景
        this._topBg = BaseBitmap.create("public_lt_bg01");
        this._topBg.width = GameConfig.stageWidth;
        this._topBg.height = 35;
        this._topBg.x = 0;
        this._topBg.y = forpeople_top2.y + forpeople_top2.height;
        this.addChildToContainer(this._topBg);
        //营救红颜
        // if (this.code == "1"){
        // 	this._bodyContainer = new BaseDisplayObjectContainer();
        // 	this.addChildToContainer(this._bodyContainer);
        // 	let bodyPic: BaseBitmap = BaseBitmap.create("recusewife" + this.code)
        // 	this._bodyContainer.addChild(bodyPic);
        // 	bodyPic.y = 0;
        // 	this._bossPic = BaseBitmap.create("rescueboss" + this.code);
        // 	this._bossPic.y = 45;
        // 	this._bossPic.x = 36;
        // 	this._bodyContainer.addChild(this._bossPic);
        // 	this._bodyContainer.x = GameConfig.stageWidth/2 - this._bodyContainer.width/2;
        // 	this._bodyContainer.y = 230;
        // }
        if (this.code == "1") {
            var wifePic = BaseBitmap.create("recusewife" + this.code);
            this._uiContainer.addChild(wifePic);
            wifePic.x = 400;
            wifePic.y = 470;
            this._bossPic = BaseBitmap.create("rescueboss" + this.code);
            this._bossPic.x = 170;
            this._bossPic.y = 450;
            this._uiContainer.addChild(this._bossPic);
            // this._uiContainer.x = GameConfig.stageWidth/2 - this._uiContainer.width/2
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        //下面属性背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = 110;
        bottomBg.x = 0;
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);
        var power = BaseBitmap.create("rescuepowerbg");
        power.x = GameConfig.stageWidth / 2 - power.width / 2;
        power.y = bottomBg.y + 20;
        this.addChildToContainer(power);
        var powerTxt = ComponentManager.getTextField(LanguageManager.getlocal("rescuePower"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        powerTxt.x = GameConfig.stageWidth / 2 - powerTxt.width / 2;
        powerTxt.y = bottomBg.y + 30;
        this.addChildToContainer(powerTxt);
        this._powerTxt = ComponentManager.getTextField(this.vo.power.toString(), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._powerTxt.x = GameConfig.stageWidth / 2 - this._powerTxt.width / 2;
        this._powerTxt.y = bottomBg.y + 80;
        this.addChildToContainer(this._powerTxt);
        var iconBg1 = BaseBitmap.create("mainui_bottombtnbg");
        iconBg1.x = 30;
        iconBg1.y = bottomBg.y + 20;
        this.addChild(iconBg1);
        var buyBtn = ComponentManager.getButton("btn_buy_tool", "", this.butItemBtnCilck, this);
        buyBtn.x = iconBg1.x + iconBg1.width / 2 - buyBtn.width / 2;
        buyBtn.y = iconBg1.y - 5;
        this.addChild(buyBtn);
        var buyBB = BaseBitmap.create("rescueshopname");
        buyBB.x = iconBg1.x + iconBg1.width / 2 - buyBB.width / 2;
        buyBB.y = iconBg1.y + 55;
        this.addChild(buyBB);
        if (!Api.switchVoApi.checkOpenShenhe()) {
            var iconBg2 = BaseBitmap.create("mainui_bottombtnbg");
            iconBg2.x = GameConfig.stageWidth - iconBg2.height - 30;
            iconBg2.y = iconBg1.y;
            this.addChild(iconBg2);
            var rankBtn = ComponentManager.getButton("punish_rank_icon", "", this.rankCilck, this);
            rankBtn.x = iconBg2.x + iconBg2.width / 2 - rankBtn.width / 2;
            rankBtn.y = buyBtn.y;
            this.addChild(rankBtn);
            // rewardBtn.setColor(TextFieldConst.COLOR_BLACK);
            var rewardIcon = BaseBitmap.create("punish_reward_name");
            rewardIcon.x = iconBg2.x + iconBg2.width / 2 - rewardIcon.width / 2;
            rewardIcon.y = buyBB.y;
            this.addChild(rewardIcon);
            // rankBtn.addTouchTap(this.rankCilck, this);
        }
        this._progressBar = ComponentManager.getProgressBar("progress_blood", "progress_bloodbg", 430);
        this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.width / 2;
        this._progressBar.y = this._topBg.y + this._topBg.height + 37;
        // this.addChildToContainer(this._progressBar);
        this._uiContainer.addChild(this._progressBar);
        var headSp = BaseBitmap.create("recusebosshead1");
        headSp.x = 50;
        headSp.y = this._progressBar.y - 37;
        this._uiContainer.addChild(headSp);
        var bossNameStr = LanguageManager.getlocal("acBossName-" + this.code);
        var bossNameTxt = ComponentManager.getTextField(bossNameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        bossNameTxt.x = headSp.x + headSp.width / 2 + 10 - bossNameTxt.width / 2;
        bossNameTxt.y = headSp.y + 15;
        this._uiContainer.addChild(bossNameTxt);
        // 宝箱
        for (var i = 0; i < this.cfg.interimReward.length; i++) {
            var bloodSplite = BaseBitmap.create("public_splite");
            bloodSplite.x = 24 / 2 + (this.cfg.interimReward.length - i) * (this._progressBar.width - 24) / (this.cfg.interimReward.length + 1);
            this._progressBar.addChild(bloodSplite);
            var tmprcfg = this.cfg.interimReward[i];
            var rStatus = 1;
            if (this.vo.interim[i + 1]) {
                rStatus = 3; // 已领取
            }
            else if (this._acData.hp <= tmprcfg.interim) {
                rStatus = 2;
            }
            var imgres = "dailytask_box1_";
            // if (i >2){
            // 	imgres = "dailytask_box2_";
            // }
            var boxImg = BaseLoadBitmap.create(imgres + String(rStatus));
            boxImg.setScale(0.8);
            boxImg.anchorOffsetX = 60 / 2;
            boxImg.anchorOffsetY = 64 / 2;
            boxImg.name = "boxImg" + i;
            boxImg.x = bloodSplite.x + bloodSplite.width / 2 - boxImg.width / 2 + this._progressBar.x;
            boxImg.y = this._progressBar.y + 40;
            var lightImg = BaseLoadBitmap.create("dailytask_box_light");
            lightImg.anchorOffsetX = 80 / 2;
            lightImg.anchorOffsetY = 80 / 2;
            lightImg.x = boxImg.x + 5;
            lightImg.name = "lightImg" + i;
            lightImg.y = boxImg.y;
            lightImg.visible = false;
            this._uiContainer.addChild(lightImg);
            this._uiContainer.addChild(boxImg);
            boxImg.addTouchTap(this.boxClick, this, [i]);
        }
        var lvStr = "";
        // if(this.code == "2")
        // {
        // 	lvStr = (100- this._acData.hp/cfg.Hp*100).toFixed(3);
        // 	this._progressBar.setPercentage( 1 - this._acData.hp/cfg.Hp)
        // }else {
        lvStr = (this._acData.hp / cfg.Hp * 100).toFixed(2);
        this._progressBar.setPercentage(this._acData.hp / cfg.Hp);
        // }
        this._levelTxt = ComponentManager.getTextField(lvStr + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._levelTxt.x = this._progressBar.x + this._progressBar.width / 2 - this._levelTxt.width / 2;
        this._levelTxt.y = this._progressBar.y + this._progressBar.height / 2 - this._levelTxt.height / 2 - 1;
        this.addChildToContainer(this._levelTxt);
        var openStr = LanguageManager.getlocal("acRescueTimeTip");
        this._openTxt = ComponentManager.getTextField(openStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._openTxt.x = GameConfig.stageWidth / 2 - this._openTxt.width / 2;
        this._openTxt.y = 350;
        this.addChildToContainer(this._openTxt);
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
        descBg.scaleX = 2;
        descBg.x = GameConfig.stageWidth / 2 - descBg.width * descBg.scaleX / 2;
        descBg.y = this._boxSp.y + this._boxSp.height + 50;
        this._boxContainer.addChild(descBg);
        this._boxDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRescueBoxDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
        this._boxDesc.x = GameConfig.stageWidth / 2 - this._boxDesc.width / 2;
        this._boxDesc.y = descBg.y + descBg.height / 2 - this._boxDesc.height / 2 - 1;
        this._boxContainer.addChild(this._boxDesc);
        this.tick();
        this._wordsContanier1 = new BaseDisplayObjectContainer();
        this._uiContainer.addChild(this._wordsContanier1);
        this._wordsContanier1.visible = false;
        this._wordsContanier2 = new BaseDisplayObjectContainer();
        this._uiContainer.addChild(this._wordsContanier2);
        this._wordsContanier2.visible = false;
        var wordsBg = BaseBitmap.create("public_9v_bg11");
        wordsBg.x = 45;
        wordsBg.y = 400;
        wordsBg.width = 200;
        wordsBg.height = 78;
        this._wordsContanier1.addChild(wordsBg);
        this._bossTxt = ComponentManager.getTextField(LanguageManager.getlocal("rescueWordBossTip1"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        this._bossTxt.x = wordsBg.x + 20;
        this._bossTxt.y = wordsBg.y + 20;
        this._bossTxt.width = 160;
        this._bossTxt.height = 80;
        this._wordsContanier1.addChild(this._bossTxt);
        // this._wordsContanier.visible = false;
        var wordsBg2 = BaseBitmap.create("public_9v_bg11");
        wordsBg2.width = 200;
        wordsBg2.height = 78;
        wordsBg2.x = 345;
        wordsBg2.y = 370;
        this._wordsContanier2.addChild(wordsBg2);
        this._wifeTxt = ComponentManager.getTextField(LanguageManager.getlocal("rescueWordWifeTip1"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        this._wifeTxt.x = wordsBg2.x + 20;
        this._wifeTxt.y = wordsBg2.y + 20;
        this._wifeTxt.width = 160;
        this._wifeTxt.height = 80;
        this._wordsContanier2.addChild(this._wifeTxt);
        // TimerManager.doTimer(5000,0,this.refreshWord,this);
        this.refreshWord();
    };
    AcRescueView.prototype.boxClick = function (event, index) {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if ((!this.vo.interim[index + 1]) && this._acData.hp <= this.cfg.interimReward[index].interim) {
            // let gid = this.cfg.interimReward.length-index
            this.request(NetRequestConst.REQUEST_ACTIVITY_GETRESCUEREWARD, { "activeId": this.aid + "-" + this.code, "gtype": 1, "gid": index + 1 });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW, { type: this.aid, activeCode: this.code, id: index });
        }
    };
    //刷新活动状态
    AcRescueView.prototype.refreshState = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var num = 0;
        this._powerTxt.text = this.vo.power.toString();
        this.setSelect(this.vo.criticalIndex);
        // 宝箱状态
        for (var i = 0; i < this.cfg.interimReward.length; i++) {
            var tmprcfg = this.cfg.interimReward[i];
            // let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(tmpK);
            var boxImg = this._uiContainer.getChildByName("boxImg" + i);
            var lightImg = this._uiContainer.getChildByName("lightImg" + i);
            var rStatus = 1;
            if (this.vo.interim[i + 1]) {
                rStatus = 3; // 已领取
            }
            else if (this._acData.hp <= tmprcfg.interim) {
                rStatus = 2;
            }
            var imgres = "dailytask_box1_";
            // if (i >2){
            // 	imgres = "dailytask_box2_";
            // }
            // if (boxImg instanceof(BaseBitmap))
            // {
            // 	boxImg.texture = ResourceManager.getRes(imgres + rStatus);
            // }
            boxImg.setload(imgres + rStatus);
            // if (rStatus == 2) //可领取状态需要添加背景光
            // {	
            // 	lightImg.visible = true;
            // 	egret.Tween.get(lightImg,{loop:true}).to({rotation:lightImg.rotation+360},10000);
            // 	egret.Tween.get(boxImg,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
            // }else
            // {
            // 	lightImg.visible = false;
            // 	egret.Tween.removeTweens(lightImg);
            // 	egret.Tween.removeTweens(boxImg);
            // }
        }
        // for(let i in this._punishItemVoList){
        // 	let data = this._punishItemVoList[i];
        // 	let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
        // 	num += hasNum;
        // }
        this._openTxt.visible = false;
        if (GameData.serverTime - zeroTime < 3600 * cfg.activeTime[0]) {
            //活动未开始
            this._openTxt.visible = true;
            this.setBoxVisible(false);
            this.setBossVisible(false);
            // this.setSkillEnable(false);
        }
        else {
            // this._openTxt.visible = false;
            //活动已经开始
            if (this._acData.hp <= 0) {
                //被打死了
                this.setBoxVisible(true);
                this.setBossVisible(false);
                this._boxDesc.text = LanguageManager.getlocal("acRescueGetBoxDesc-" + this.code);
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
                    if (deltaT < 0) {
                        this.setBoxVisible(true);
                        this.setBossVisible(false);
                        this._boxDesc.text = LanguageManager.getlocal("acRescueBoxDesc-" + this.code);
                        this._boxDesc.textColor = 0xff0000;
                        this._lightSp.visible = false;
                        App.DisplayUtil.changeToGray(this._boxSp);
                    }
                    else {
                        this._lightSp.visible = false;
                        this.setBoxVisible(false);
                        this.setBossVisible(false);
                        // this.setSkillEnable(false);
                        this._openTxt.visible = true;
                    }
                }
                else {
                    //没结束也没打死
                    this.setBoxVisible(false);
                    this.setBossVisible(true);
                    this.setSkillEnable(true);
                }
            }
        }
    };
    AcRescueView.prototype.checkState = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        if (GameData.serverTime - zeroTime < 3600 * cfg.activeTime[0]) {
            //活动未开始
        }
        else {
            // this._openTxt.visible = false;
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
                    ViewController.getInstance().openView(ViewConst.BASE.ACRESCUEREPORTVIEW, { aid: this.aid, code: this.code });
                }
            }
        }
    };
    AcRescueView.prototype.getState = function () {
        if (!this._acData) {
            return 1;
        }
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
            // this._openTxt.visible = false;
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
    AcRescueView.prototype.setBoxVisible = function (b) {
        // this._openTxt.visible = true;
        this._boxContainer.visible = b;
    };
    //女囚相关
    AcRescueView.prototype.setBossVisible = function (b) {
        this._levelTxt.visible = b;
        this._progressBar.visible = b;
        if (this._bodyContainer)
            this._bodyContainer.visible = b;
        for (var index = 0; index < this._skillIconList.length; index++) {
            var element = this._skillIconList[index];
            element.visible = b;
        }
        this._uiContainer.visible = b;
    };
    AcRescueView.prototype.setSkillEnable = function (b) {
        for (var index = 0; index < this._skillIconList.length; index++) {
            var element = this._skillIconList[index];
            // element.visible = b;
            var btn = element.getChildByName("skillBtn");
            btn.setEnable(b);
            if (b) {
                App.DisplayUtil.changeToNormal(element);
            }
            else {
                App.DisplayUtil.changeToGray(element);
            }
        }
        // if(this._wordsContanier1)
        // {
        // 	this._wordsContanier1.visible=b;
        // 	this._wordsContanier2.visible=b;
        // }
    };
    //刷新选中状态
    AcRescueView.prototype.setSelect = function (index) {
        if (index < 1 || index > 3) {
            return;
        }
        if (this._selectItem) {
            if (this._selectItem.getChildByName("effect")) {
                this._selectItem.removeChild(this._selectItem.getChildByName("effect"));
                var effect = this._selectItem.getChildByName("effect");
                effect = null;
            }
        }
        this._selectItem = this._skillIconList[index - 1];
        if (!this._selectItem) {
            return;
        }
        var eClip = ComponentManager.getCustomMovieClip("acrescue_fire_", 6, 100);
        eClip.x = 96 / 2 - 180 / 2 - 1;
        eClip.y = -78 + 1;
        eClip.name = "effect";
        eClip.playWithTime(0);
        this._selectItem.addChildAt(eClip, 0);
        this._selectIndex = index;
    };
    AcRescueView.prototype.doBuy = function () {
        AcRescueBuyItemPopupView.aid = this.aid;
        AcRescueBuyItemPopupView.code = this.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACRESCUEBUYITEMPOPUPVIEW, {});
    };
    //领取BOSS奖励
    AcRescueView.prototype.getBoxClick = function () {
        if (this._acVo.get) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishGetBoxTip1"));
            return;
        }
        if (this._acData.hp > 0) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("acPunishGetBoxTip1"));
            return;
        }
        this.request(NetRequestConst.REQUEST_ACTIVITY_GETRESCUEREWARD, { gtype: 2, activeId: this.aid + "-" + this.code });
    };
    //请求回调
    AcRescueView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_ATTACKRESCUEBOSS) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            if (data.data.data && data.data.data.isLucky) {
                var boomPic = BaseBitmap.create("manage_boomtext");
                boomPic.anchorOffsetX = boomPic.width / 2;
                boomPic.anchorOffsetY = boomPic.height / 2;
                boomPic.setPosition(320, 550);
                LayerManager.msgLayer.addChild(boomPic);
                egret.Tween.get(boomPic).to({ scaleX: 1.1, scaleY: 1.1 }, 50).to({ scaleX: 1, scaleY: 1 }, 70).to({ y: 550 - 50, alpha: 0.7 }, 600).call(function (boomPic) {
                    boomPic.dispose();
                }.bind(this, boomPic), this);
            }
            if (data.data.data.hasKill) {
                this._acData.hp = 0;
            }
            else {
                this._acData = data.data.data.rescueActive;
            }
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
        else if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETRESCUEACTIVE) {
            this._acData = data.data.data.rescueActive;
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETRESCUEREWARD) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            this.refreshState();
        }
    };
    AcRescueView.prototype.butItemBtnCilck = function () {
        // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:2, kid:NetRequestConst.KID_RESCUEAC});
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var startTime = this._acVo.st;
        var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
        // if(GameData.serverTime - zeroTime > 3600*cfg.activeTime[1] || deltaT < 0){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        // 	return;
        // }
        // if(this.getState() == 3)
        // {
        // }
        AcRescueBuyItemPopupView.aid = this.aid;
        AcRescueBuyItemPopupView.code = this.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACRESCUEBUYITEMPOPUPVIEW, {});
    };
    // private rankRewardBtnCilck()
    // {
    // 	AcPunishRankRewardPopupView.aid = this.aid;
    // 	AcPunishRankRewardPopupView.code = this.code;
    // 	ViewController.getInstance().openView(ViewConst.POPUP.ACPUNISHRANKREWARDPOPUPVIEW,{acData:this._acData,aid:this.aid,code:this.code});
    // }
    AcRescueView.prototype.rankCilck = function () {
        // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:3, kid:NetRequestConst.KID_RESCUEAC});
        // this._acVo.et = GameData.serverTime + 10;
        AcRescueRankRewardPopupView.aid = this.aid;
        AcRescueRankRewardPopupView.code = this.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACRESCUERANKREWARDPOPUPVIEW, { acData: this._acData, aid: this.aid, code: this.code });
    };
    AcRescueView.prototype.getRuleInfo = function () {
        return "acRescue_Rule-" + this.code;
    };
    AcRescueView.prototype.addChildToContainer = function (obj) {
        if (obj) {
            this.container.addChild(obj);
            this.container.y = 0;
        }
    };
    AcRescueView.prototype.showList = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        for (var index = 1; index < 4; index++) {
            var item = this.getItem(index);
            this._skillIconList.push(item);
            // item.setScale(0.9);
            if (index == 1) {
                item.x = 30;
                item.y = GameConfig.stageHeigth - this.container.y - 350;
            }
            else if (index == 2) {
                item.x = GameConfig.stageWidth / 2 - item.width / 2;
                item.y = GameConfig.stageHeigth - this.container.y - 220;
            }
            else if (index == 3) {
                item.x = 520;
                item.y = GameConfig.stageHeigth - this.container.y - 350;
            }
            this.addChild(item);
            // item.addTouchTap(this.itemClick,this,[index-1]);
        }
        this.setSelect(this.vo.criticalIndex);
        // for (var index = 0; index < this._skillIconList.length; index++) {
        // 	let data = this._punishItemVoList[(index+1).toString()];
        // 	let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
        // 	if(hasNum > 0){
        // 		this.setSelect(index);
        // 		return;
        // 	}	
        // }
    };
    AcRescueView.prototype.getItem = function (index) {
        // let itemInfo = Api.itemVoApi.getItemInfoVoById(data.item.toString());
        var container = new BaseDisplayObjectContainer();
        var skillBtn = ComponentManager.getButton("recuseicon1_" + index, "", this.useSkill, this, [index]);
        // buyBtn.x = iconBg1.x + iconBg1.width/2 - buyBtn.width/2;
        // buyBtn.y = iconBg1.y - 5;
        skillBtn.name = "skillBtn";
        container.addChild(skillBtn);
        var nameBg = BaseBitmap.create("rescueskillnamebg");
        nameBg.x = container.width / 2 - nameBg.width / 2;
        nameBg.y = 70;
        container.addChild(nameBg);
        var nameLb = ComponentManager.getTextField(LanguageManager.getlocal("rescueSkill1_" + index), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameLb.x = nameBg.x + nameBg.width / 2 - nameLb.width / 2;
        nameLb.y = nameBg.y + nameBg.height / 2 - nameLb.height / 2;
        container.addChild(nameLb);
        // if(hasNum <= 0)
        // {
        // 	App.DisplayUtil.changeToGray(icon);
        // 	App.DisplayUtil.changeToGray(iconBg);
        // }
        return container;
    };
    AcRescueView.prototype.useSkill = function (index) {
        if (!this._touchSwitch) {
            return;
        }
        if (this.vo.power < 3) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("rescueNoPower"));
            AcRescueBuyItemPopupView.aid = this.aid;
            AcRescueBuyItemPopupView.code = this.code;
            ViewController.getInstance().openView(ViewConst.POPUP.ACRESCUEBUYITEMPOPUPVIEW, {});
            return;
        }
        egret.setTimeout(function () {
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_HIT);
        }, this, 200);
        egret.setTimeout(function () {
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_HIT);
        }, this, 400);
        if (index == 2) {
            var droIcon = App.DragonBonesUtil.getLoadDragonBones("zhengqian_quan", 1);
            // droIcon.setPlayTime(1);
            // droIcon.setScale(1.3)
            droIcon.x = 300;
            droIcon.y = 500;
            this.addChildToContainer(droIcon);
        }
        else if (index == 3) {
            var droIcon = App.DragonBonesUtil.getLoadDragonBones("zuoyou_quan", 1);
            // droIcon.setPlayTime(1);
            // droIcon.setScale(1.3)
            droIcon.x = 300;
            droIcon.y = 500;
            this.addChildToContainer(droIcon);
        }
        else if (index == 1) {
            var droIcon = App.DragonBonesUtil.getLoadDragonBones("zuoyou_quan", 1);
            // droIcon.setPlayTime(1);
            // droIcon.setScale(1.3)
            // droIcon.anchorOffsetX = droIcon.width/2;
            // droIcon.anchorOffsetY = droIcon.height/2;
            droIcon.skewY = 180;
            droIcon.x = 300;
            droIcon.y = 500;
            this.addChildToContainer(droIcon);
        }
        this._selectIndex = index;
        // this.doAni()
        this._touchSwitch = false;
        egret.Tween.get(this).wait(300).call(function () {
            this._bossPic.texture = ResourceManager.getRes("rescueboss1_" + this._selectIndex);
            this.request(NetRequestConst.REQUEST_ACTIVITY_ATTACKRESCUEBOSS, { activeId: this.aid + "-" + this.code, attackIndex: index });
        }.bind(this), this)
            .wait(600)
            .call(function () {
            this._bossPic.texture = ResourceManager.getRes("rescueboss1");
            this._touchSwitch = true;
        }.bind(this), this);
    };
    AcRescueView.prototype.doAni = function () {
        // this._bossPic.texture = ResourceManager.getRes("rescueboss1_" + this._selectIndex)
    };
    AcRescueView.prototype.itemClick = function (evt, index) {
        // this._selectIndex = index;
        this.setSelect(index);
    };
    AcRescueView.prototype.refreshWord = function () {
        if (this._wordsContanier1 && this.getState() == 5) {
            // let time = GameData.serverTime
            // this._wordsContanier1.visible = !this._wordsContanier1.visible;
            // this._wordsContanier2.visible = !this._wordsContanier1.visible;
            egret.Tween.get(this._wordsContanier1, { loop: true })
                .call(function () {
                var index = App.MathUtil.getRandom(1, 3);
                this._bossTxt.text = LanguageManager.getlocal("rescueWordBossTip" + index);
            }, this)
                .set({ visible: true }).wait(3000).set({ visible: false }).wait(4500).wait(1500);
            egret.Tween.get(this._wordsContanier2, { loop: true })
                .call(function () {
                var index = App.MathUtil.getRandom(1, 3);
                this._wifeTxt.text = LanguageManager.getlocal("rescueWordWifeTip" + index);
            }, this)
                .set({ visible: false }).wait(4500).set({ visible: true }).wait(3000).set({ visible: false }).wait(1500);
        }
    };
    AcRescueView.prototype.tick = function () {
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
            // this._openTxt.visible = true;
            // this._openTxt.text = openStr;
        }
        if (this.getState() == 1) {
            var openTime = App.DateUtil.getWeeTs(GameData.serverTime) - GameData.serverTime + cfg.activeTime[0] * 3600;
            var openStr = LanguageManager.getlocal("acPunishOpenTime", [App.DateUtil.getFormatBySecond(openTime, 1)]);
            // this._openTxt.visible = true;
            // this._openTxt.text = openStr;
        }
    };
    AcRescueView.prototype.buyCallback = function (event) {
        var num = 0;
        for (var index = 0; index < this._skillIconList.length; index++) {
            var txt = this._skillIconList[index].getChildByName("numLb");
            // let data = this._punishItemVoList[(index+1).toString()];
            // let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.item));
            // txt.text = hasNum.toString();
            // txt.setPosition(108 - 8 - txt.width, 106 - 8 - txt.height );
            // let iconBg = <BaseBitmap>this._skillIconList[index].getChildByName("itembg")
            // let icon = <BaseLoadBitmap>this._skillIconList[index].getChildByName("itemicon")
            // if(hasNum <= 0){
            // 	App.DisplayUtil.changeToGray(icon);
            // 	App.DisplayUtil.changeToGray(iconBg);
            // }else{
            // 	App.DisplayUtil.changeToNormal(icon);
            // 	App.DisplayUtil.changeToNormal(iconBg);
            // }
            // num += hasNum;
        }
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var score1Str = LanguageManager.getlocal("acPunishScore2", [this._acVo.v.toString()]);
        this._score1Text.text = score1Str;
        var score2Str = LanguageManager.getlocal("acPunishScore1", [this._acVo.score.toString()]);
        this._score2Text.text = score2Str;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!this._acData) {
            return;
        }
        var lvStr = "";
        // if(this.code == "2"){
        // 	lvStr = (100- this._acData.hp/cfg.Hp*100).toFixed(3);
        // 	this._progressBar.setPercentage( 1 - this._acData.hp/cfg.Hp)
        // }else{
        lvStr = (this._acData.hp / cfg.Hp * 100).toFixed(2);
        this._progressBar.setPercentage(this._acData.hp / cfg.Hp);
        // }
        this._levelTxt.text = lvStr + "%";
    };
    AcRescueView.prototype.runText = function () {
        var strList = new Array();
        for (var index = 0; index < this._acData.log.length; index++) {
            var str = this.getTipText(this._acData.log[index]);
            strList.push(str);
        }
        var lampContainer = new LoopLamp(strList);
        lampContainer.y = this._topBg.y + 7;
        this.addChildToContainer(lampContainer);
    };
    AcRescueView.prototype.getTipText = function (data) {
        var tipStr = "";
        if (!data) {
            return "";
        }
        // let itemcfg = Config.ItemCfg.getItemCfgById(Number(data[2]));
        // if(itemcfg){
        var rewardStr = GameData.getRewardsStr(data[2]);
        tipStr = LanguageManager.getlocal("rescueRunTip", [data[0], rewardStr]);
        // }
        return tipStr;
    };
    AcRescueView.prototype.exCallback = function (event) {
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._score2Text.text = LanguageManager.getlocal("acPunishScore1", [this._acVo.score.toString()]);
    };
    AcRescueView.prototype.getSheepType = function () {
        return 1;
    };
    AcRescueView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshState, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM), this.buyCallback, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP), this.exCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ITEM, this.buyCallback, this);
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
        // this._openTxt = null;
        this._boxContainer = null;
        this._lightSp = null;
        this._boxDesc = null;
        this._boxSp = null;
        this._touchSwitch = true;
        // egret.Tween.removeTweens(this._lightSp);
        this._bodyContainer = null;
        this._bossPic = null;
        this._wordsContanier1 = null;
        this._wordsContanier2 = null;
        this._skillIconList = null;
        this._topBg = null;
        this._powerTxt = null;
        this._bossTxt = null;
        this._wifeTxt = null;
        if (this._tw) {
            egret.Tween.removeTweens(this._tw);
            this._tw = null;
        }
        _super.prototype.dispose.call(this);
    };
    return AcRescueView;
}(AcCommonView));
__reflect(AcRescueView.prototype, "AcRescueView");
