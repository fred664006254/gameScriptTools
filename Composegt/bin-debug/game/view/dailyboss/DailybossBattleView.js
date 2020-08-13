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
var DailybossBattleView = (function (_super) {
    __extends(DailybossBattleView, _super);
    function DailybossBattleView() {
        var _this = _super.call(this) || this;
        _this._heroRattle = null;
        _this._attackEffect = null; //开火动画
        _this._hasKill = 0; // 1--Boss已经被击杀
        _this._exp = 0;
        _this._dps = 0;
        _this._rewards = null;
        _this._autoBattleBtn = null;
        _this._autoBattleView = null;
        _this._oldType = 0;
        //
        _this._newPower = 0;
        return _this;
    }
    DailybossBattleView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER, this.autoSetServant, this);
        this.initAttackRank();
        if (Api.dailybossVoApi.getBossType() == 2 && !this._bossData.hp) {
            this.showKillBossBattleResult();
        }
        else if (Api.dailybossVoApi.getBossType() == 1 && this._bossData.bossLv > Api.dailybossVoApi.getMaxRound()) {
            this.showDefenedWinResult();
            if (this._autoBattleBtn) {
                this._autoBattleBtn.visible = false;
            }
        }
        else {
            this.setBossUIStatus();
            this.initPao();
            this.initAttackBtn();
            var nameBg = BaseBitmap.create("playerview_powerbg");
            // nameBg.setScale(0.9);
            nameBg.setPosition((GameConfig.stageWidth - nameBg.width * nameBg.scaleX) / 2, 280); // 300
            this.addChildToContainer(nameBg);
            this._nameBg = nameBg;
            var nameTxt = ComponentManager.getTextField(this.getbossName(), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
            nameTxt.width = nameBg.width * nameBg.scaleX;
            nameTxt.textAlign = egret.HorizontalAlign.CENTER;
            nameTxt.setPosition(nameBg.x, nameBg.y + (nameBg.height * nameBg.scaleY - nameTxt.height) / 2 + 2);
            this.addChildToContainer(nameTxt);
            this._nameTxt = nameTxt;
            if (this._bossData) {
                this.setTopProgress(this._bossData.hp, this._bossData.totalHp, GameConfig.stageWidth - 160, Api.dailybossVoApi.getBossType());
                this._topProgress.y = 10;
            }
            this.autoSetServant();
            this.checkShowLastRankRewardView();
        }
    };
    // protected resetTopProgressAfterDamage():void
    // {
    // 	this.setTopProgress(this._bossData.hp,this._bossData.totalHp);
    // }
    DailybossBattleView.prototype.getbossName = function () {
        var nameStr;
        if (Api.dailybossVoApi.getBossType() == 1) {
            var lv = this._bossData.bossLv;
            nameStr = LanguageManager.getlocal("dailybossNameType1", [lv.toString()]);
            // if (lv > 20) {
            // 	lv = 20;
            // }
            // if (lv > Config.DailybossCfg.boss1MaxNum) {
            // 	lv = Config.DailybossCfg.boss1MaxNum;
            // }
            var max = 0;
            for (var i in Config.DailybossCfg.boss1) {
                max++;
            }
            if (lv > max) {
                lv = max;
            }
            // if(PlatformManager.checkIsEnLang()){
            // 	nameStr = nameStr + "\n";
            // }
            nameStr = nameStr + LanguageManager.getlocal("dailybossName" + lv);
        }
        else {
            nameStr = LanguageManager.getlocal("dailybossNameType2");
        }
        return nameStr;
    };
    DailybossBattleView.prototype.getBossType = function () {
        return Api.dailybossVoApi.getBossType();
    };
    DailybossBattleView.prototype.setBossUIStatus = function () {
        var bossLv = 0;
        if (this._bossData.bossLv && Api.dailybossVoApi.getBossType() == 1) {
            bossLv = (this._bossData.bossLv - 1) % 5 + 1;
        }
        var imgUrl = "dailyboss_lv_" + bossLv;
        if (this._bossImg != imgUrl) {
            if (this._upHero) {
                this._upHero.resetHero(imgUrl);
                this.refreshSkinName();
                this.checkUpHeroSkin();
            }
            else {
                this.setUpHero(imgUrl, null, 3);
                this._upHero.y = 50 + 20 - 20;
                // if(PlatformManager.checkIsThLang()){
                // 	this._upHero.y = 50 + 20 - 20 - 20;
                // }
                this._upPositon.y = this._upHero.y + 10;
            }
            this._upHero.y = 50 + 20 - 20;
            // if(PlatformManager.checkIsThLang()){
            // 	this._upHero.y = 50 + 20 - 20 - 20;
            // }
            this._upPositon.y = this._upHero.y + 10;
            var rattle = new BattleRattle();
            rattle.init(this.container, 284, 3);
            rattle.setPosition(330, this._upHero.y + 15); // 350
            rattle.resetString(null, 3000, 2);
            if (this._nameTxt) {
                this._nameTxt.text = this.getbossName();
            }
        }
        this._bossImg = imgUrl;
    };
    DailybossBattleView.prototype.checkShowLastRankRewardView = function () {
        if (this._lastReward) {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSRANKREWARDPOPUPVIEW, this._lastReward);
            this._lastReward = null;
        }
    };
    DailybossBattleView.prototype.initAttackBtn = function () {
        this._attackBtn = ComponentManager.getButton("boss_start_war", "", this.attackHandle, this);
        this._attackBtn.setPosition((GameConfig.stageWidth - this._attackBtn.width) / 2, this._buttomBg.y - this._attackBtn.height + 5);
        this.addChildToContainer(this._attackBtn);
        this._attackBtn.visible = false;
    };
    DailybossBattleView.prototype.initPao = function () {
        this._pao = new DailybossPao();
        this._pao.setPosition(GameConfig.stageWidth / 2 - this._pao.width / 2, -this.container.y + GameConfig.stageHeigth - this._pao.height - this._buttomBg.height - 50);
        this.addChildToContainer(this._pao);
        // this._pao.kaiPao();
    };
    DailybossBattleView.prototype.initAttackRank = function () {
        var buttomBg = BaseBitmap.create("public_bottombg1");
        buttomBg.width = GameConfig.stageWidth;
        buttomBg.height = 166;
        buttomBg.setPosition(0, GameConfig.stageHeigth - this.container.y - buttomBg.height + 15);
        this.addChildToContainer(buttomBg);
        this._buttomBg = buttomBg;
        if (PlatformManager.checkIsTextHorizontal()) {
        }
        else {
            var damageTitle = ComponentManager.getTextField(LanguageManager.getlocal("dailybossDamageRankTitle" + Api.dailybossVoApi.getBossType()), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
            damageTitle.lineSpacing = 2;
            damageTitle.width = TextFieldConst.FONTSIZE_BUTTON_COMMON + 4;
            damageTitle.height = this._buttomBg.height;
            damageTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
            damageTitle.setPosition(this._buttomBg.x + 20, this._buttomBg.y);
            this.addChildToContainer(damageTitle);
        }
        if (!this._myRankItem) {
            this._myRankItem = ScrollListItem.create(DailybossDamageRankListItem, -1, this._bossData.myrank);
            // if(PlatformManager.checkIsTextHorizontal()){
            // this._myRankItem.setPosition(GameConfig.stageWidth/2 - this._myRankItem.width / 2,this._buttomBg.y+this._buttomBg.height-this._myRankItem.height-10);
            // } else {
            this._myRankItem.setPosition(55, this._buttomBg.y + this._buttomBg.height - this._myRankItem.height - 10);
            // }
            this.addChildToContainer(this._myRankItem);
        }
        var rect = egret.Rectangle.create();
        var lookMore = null;
        if (Api.dailybossVoApi.getBossType() == 1) {
            rect.setTo(0, 0, this._buttomBg.width - 60, this._myRankItem.y - this._buttomBg.y + 15);
            this._myRankItem.visible = false;
            if (PlatformManager.checkIsTextHorizontal()) {
                this._attackRankList = ComponentManager.getScrollList(DailybossRewardListItem, this._bossData.logInfo, rect);
                this._attackRankList.setPosition(GameConfig.stageWidth / 2 - this._attackRankList.width / 2, this._buttomBg.y + 14);
            }
            else {
                this._attackRankList = ComponentManager.getScrollList(DailybossRewardListItem, this._bossData.logInfo, rect);
                this._attackRankList.setPosition(65, this._buttomBg.y + 14);
            }
        }
        else {
            rect.setTo(0, 0, this._buttomBg.width - 60, this._myRankItem.y - this._buttomBg.y - 10);
            if (PlatformManager.checkIsTextHorizontal()) {
                this._attackRankList = ComponentManager.getScrollList(DailybossDamageRankListItem, this._bossData.rankList, rect);
                this._attackRankList.setPosition(GameConfig.stageWidth / 2 - this._attackRankList.width / 2, this._buttomBg.y + 10);
            }
            else {
                this._attackRankList = ComponentManager.getScrollList(DailybossDamageRankListItem, this._bossData.rankList, rect);
                this._attackRankList.setPosition(55, this._buttomBg.y + 10);
            }
            lookMore = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "dailybossDamageRankTitle2", this.damageRankHandler, this);
            lookMore.setPosition(GameConfig.stageWidth - lookMore.width, this._buttomBg.y - lookMore.height + 75);
            this.addChild(lookMore);
        }
        var autoBattleNeedVipLv;
        if (Api.dailybossVoApi.getBossType() == 1) {
            autoBattleNeedVipLv = Config.VipCfg.getVipUnlockByLevel("dailySolider");
            // autoBattleNeedVipLv = 20;
        }
        else {
            autoBattleNeedVipLv = Config.VipCfg.getVipUnlockByLevel("dailyBoss");
            // autoBattleNeedVipLv = 20;
        }
        if (autoBattleNeedVipLv != null) {
            if (Api.playerVoApi.getPlayerVipLevel() < autoBattleNeedVipLv) {
                var reachText = ComponentManager.getTextField(LanguageManager.getlocal("autoBattleTip", [String(autoBattleNeedVipLv)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
                if (lookMore) {
                    reachText.setPosition(GameConfig.stageWidth - reachText.width - 10, lookMore.y - 5 - reachText.height);
                }
                else {
                    reachText.setPosition(GameConfig.stageWidth - reachText.width - 10, this._buttomBg.y - reachText.height + 70);
                }
                this.addChild(reachText);
            }
            else {
                this._autoBattleBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "autoBattleDaily", this.autoBattleHandle, this);
                if (lookMore) {
                    this._autoBattleBtn.setPosition(GameConfig.stageWidth - this._autoBattleBtn.width, lookMore.y - 5 - this._autoBattleBtn.height);
                }
                else {
                    this._autoBattleBtn.setPosition(GameConfig.stageWidth - this._autoBattleBtn.width, this._buttomBg.y - this._autoBattleBtn.height + 75);
                }
                this.addChild(this._autoBattleBtn);
            }
        }
        this._attackRankList.setEmptyTip(LanguageManager.getlocal("dinnerMsgPopupEmptyTip"));
        this.addChildToContainer(this._attackRankList);
    };
    DailybossBattleView.prototype.autoBattleHandle = function () {
        if (!this._autoBattleView) {
            this._autoBattleBtn.visible = false;
            this._autoBattleView = new BattleAuto();
            this._autoBattleView.init(1, this.autoBattleCallback, this);
            this.addChild(this._autoBattleView);
            this.attackHandle();
            if (this._heroRattle) {
                this._heroRattle.setVisible(false);
            }
        }
    };
    DailybossBattleView.prototype.autoBattleCheck = function () {
        if (this.getBossType() == 2 && !this._bossData.hp) {
            this.autoBattleCallback();
        }
        if (this._autoBattleView) {
            if (this._selectServantId) {
                this.attackHandle();
            }
            else {
                this.autoBattleCallback();
            }
        }
        else {
            if (this._selectServantId && this._autoBattleBtn) {
                this._autoBattleBtn.visible = true;
            }
            if (this.getBossType() == 2 && !this._bossData.hp && this._autoBattleBtn) {
                this._autoBattleBtn.visible = false;
            }
        }
    };
    DailybossBattleView.prototype.autoBattleCallback = function () {
        if (this._autoBattleView) {
            this._autoBattleView.dispose();
            this._autoBattleView = null;
        }
    };
    DailybossBattleView.prototype.setAttackRank = function () {
        if (this._attackRankList) {
            if (Api.dailybossVoApi.getBossType() == 1) {
                this._attackRankList.refreshData(this._bossData.logInfo);
            }
            else {
                this._attackRankList.refreshData(this._bossData.rankList);
            }
        }
        if (this._myRankItem) {
            this._myRankItem.refresh(-1, this._bossData.myrank);
        }
    };
    DailybossBattleView.prototype.setDownHero = function (picName, info) {
        if (!this._downHero) {
            this._downHero = new BattleHero();
            this._downHero.init(picName, info, 3, 1);
            this._downHero.setPosition(-80, -this.container.y + GameConfig.stageHeigth - this._downHero.serImgHeight * this._downHero.scaleY - 100);
            // this.addChildToContainer(this._downHero);
            this.container.addChildAt(this._downHero, 0);
            this._downHero.addTouchTap(this.showSelectServantHandler, this);
            this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
            var changePic = BaseBitmap.create("playerview_powerbg");
            changePic.setPosition(this._downHero.x + (this._downHero.serImgWith * this._downHero.scaleX - changePic.width) / 2 + 5, this._downHero.y + this._downHero.serImgHeight * this._downHero.scaleY - changePic.height + 7 - 60 + 15);
            this.addChildToContainer(changePic);
            this._changePic = changePic;
            var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossChangeServantDesc"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
            nameTxt.width = changePic.width;
            nameTxt.textAlign = egret.HorizontalAlign.CENTER;
            nameTxt.setPosition(changePic.x, changePic.y + (changePic.height - nameTxt.height) / 2 + 3);
            this.addChildToContainer(nameTxt);
            changePic.addTouchTap(this.showSelectServantHandler, this);
            this._changeTxt = nameTxt;
            this._heroRattle = new BattleRattle();
            if (PlatformManager.checkIsTextHorizontal()) {
                this._heroRattle.init(this.container, 280, 4, 126);
                this._heroRattle.setPosition(-12, this._downHero.y - 65);
            }
            else {
                this._heroRattle.init(this.container, 280, 4);
                this._heroRattle.setPosition(-12, this._downHero.y - 40);
            }
        }
        else {
            this._downHero.resetHero(picName);
            this.refreshSkinName();
            // this.checkDownHeroSkin();
        }
        // this._downHero.setPosition(-80,-this.container.y+GameConfig.stageHeigth-this._downHero.serImgHeight*this._downHero.scaleY -50);
        this._downHero.setPosition(-80, -this.container.y + GameConfig.stageHeigth - this._downHero.serImgHeight * this._downHero.scaleY - 65);
        if (PlatformManager.checkIsTextHorizontal()) {
            this._heroRattle.setPosition(-12, this._downHero.y - 65);
        }
        else {
            this._heroRattle.setPosition(-12, this._downHero.y - 40);
        }
        if (this._selectServantId) {
            var power = Api.servantVoApi.getServantCombatWithId(String(this._selectServantId));
            var rattleStr = LanguageManager.getlocal("dailybossServantBattleTip", [LanguageManager.getlocal("servant_name" + this._selectServantId), App.StringUtil.changeIntToText(power)]);
            this._heroRattle.resetString(rattleStr, -1);
            this._heroRattle.visible = true;
        }
        else {
            this._heroRattle.visible = false;
        }
    };
    // protected attackHandle(area:number,damage:number,isCrit?:boolean):void
    DailybossBattleView.prototype.attackHandle = function () {
        if (this._isMoving) {
            return;
        }
        if (!this._selectServantId) {
            App.CommonUtil.showTip(LanguageManager.getlocal("dailybossNoServantCanBattleDesc"));
        }
        else {
            this.request(NetRequestConst.REQUEST_DAILYBOSS_ATTACK, { servantId: this._selectServantId });
        }
        // this.playAttackEffect();
        //test code
        // ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSDAMAGERANKPOPUPVIEW,{rankList:this._bossData.rankList,myrank:this._bossData.myrank});
    };
    DailybossBattleView.prototype.showSelectServantHandler = function () {
        var _this = this;
        if (this._allServantInfo == null) {
            this._allServantInfo = {};
            var allKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
            for (var k in allKey) {
                var key = allKey[k];
                this._allServantInfo[key] = Api.servantVoApi.getServantCombatWithId(key);
            }
        }
        this._curKey = null;
        this._leftValue = 0;
        var allKeys = Object.keys(this._allServantInfo);
        allKeys.sort(function (a, b) {
            var valueA = Api.dailybossVoApi.checkServantcanStatus(a);
            var valueB = Api.dailybossVoApi.checkServantcanStatus(b);
            if (valueA == valueB) {
                return Number(_this._allServantInfo[b] - _this._allServantInfo[a]);
            }
            else {
                return Number(valueA - valueB);
            }
        });
        if (Api.dailybossVoApi.checkServantcanStatus(allKeys[0]) == 0) {
            this._curKey = allKeys[0];
            this._leftValue = this._allServantInfo[this._curKey];
        }
        this._rightValue;
        var showTab = [];
        for (var k in allKeys) {
            var key = allKeys[k];
            showTab.push([key, Api.dailybossVoApi.checkServantcanStatus(key), this._allServantInfo[key]]);
        }
        showTab.sort(function (a, b) {
            var valueA = a[1];
            var valueB = b[1];
            if (valueA == valueB) {
                return Number(b[2] - a[2]);
            }
            else {
                return Number(valueA - valueB);
            }
        });
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW, { type: ServantSelectedPopupView.TYPE_BATTLE_REC1, "info": showTab, callback: this.selectServantHandler, handler: this });
    };
    DailybossBattleView.prototype.autoSetServant = function () {
        this.setServant(Api.dailybossVoApi.findBestServant(this._bossData.hp));
    };
    DailybossBattleView.prototype.setServant = function (id) {
        this._selectServantId = id;
        // let servantCfg=Config.ServantCfg.getServantItemById(this._selectServantId);
        // let pic:string=servantCfg?servantCfg.fullIcon:null;
        var pic = Api.servantVoApi.getFullImgPathWithId(this._selectServantId); //servantCfg?servantCfg.fullIcon:null;
        this.setDownHero(pic);
        if (pic) {
            this._attackBtn.visible = true;
        }
    };
    DailybossBattleView.prototype.refreshSkinName = function () {
        if (!this.snamebg) {
            var snamebg = BaseBitmap.create("public_servantskin_namebg2");
            var snametxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            this.snamebg = snamebg;
            this.snametxt = snametxt;
            snamebg.name = "snamebg";
            snamebg.x = this._changePic.x + this._changePic.width / 2 - snamebg.width / 2;
            snamebg.y = this._changePic.y - snamebg.height;
            this.addChildToContainer(snamebg);
            snametxt.x = snamebg.x + snamebg.width / 2;
            snametxt.y = snamebg.y + snamebg.height / 2 - 9;
            this.addChildToContainer(snametxt);
        }
        var equip = "";
        if (this._selectServantId) {
            equip = Api.servantVoApi.getServantObj("" + this._selectServantId).equip;
        }
        this.snametxt.text = LanguageManager.getlocal("servantSkinName" + equip);
        this.snametxt.anchorOffsetX = this.snametxt.width / 2;
        this.snamebg.visible = this.snametxt.visible = equip && equip != "";
    };
    DailybossBattleView.prototype.selectServantHandler = function (params) {
        var servantId = params.key;
        this._selectServantId = servantId;
        // this._downHero.resetHero(Config.ServantCfg.getServantItemById(servantId).fullIcon);
        // this.setDownHero(Config.ServantCfg.getServantItemById(servantId).fullIcon);
        this._downHero.resetHero(Api.servantVoApi.getFullImgPathWithId(this._selectServantId));
        this.refreshSkinName();
        // this.checkDownHeroSkin();
        this.setDownHero(Api.servantVoApi.getFullImgPathWithId(servantId));
    };
    DailybossBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress_type1_red",
            "progress_type1_bg2",
            "boss_start_war",
            "dailyboss_kaopao",
            // "prisonview_1",
            "playerview_powerbg",
            "childview_talkbg_2",
            "childview_talkbg",
            "dailytask_box_light",
            "dailytask_newbox2_1",
            "dailytask_newbox2_3",
            "dailyboss_defened",
            "achievement_state3"
        ]);
    };
    DailybossBattleView.prototype.getHitAnimSources = function () {
        return "dailyboss_baozha";
    };
    DailybossBattleView.prototype.getHitAnimInfo = function () {
        return ["dailyboss_baozha_", 9];
    };
    // 标题背景名称
    DailybossBattleView.prototype.getTitleBgName = function () {
        return "commonview_titlebg";
    };
    DailybossBattleView.prototype.getTitleStr = function () {
        return "dailybossTitle";
    };
    DailybossBattleView.prototype.getBgName = function () {
        return "dailyboss_battle_bg";
    };
    DailybossBattleView.prototype.playHitEffcet = function () {
        SoundManager.playEffect(SoundConst.EFFECT_DAILYBOSS_HIT);
    };
    DailybossBattleView.prototype.playFireEffcet = function () {
        SoundManager.playEffect(SoundConst.EFFECT_DAILYBOSS_FIRE);
    };
    DailybossBattleView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_DAILYBOSS_GETDETAILS, requestData: {} };
    };
    DailybossBattleView.prototype.receiveData = function (data) {
        // if(data.data.cmd==NetRequestConst.REQUEST_DAILYBOSS_ATTACK)
        // {
        // 	data={ret:true,data:{"uid":1000842,"cmd":"dailyboss.attack","ts":1512216439,"zoneid":1,"data":{"lastReward":{"rewards":"5_1_100","rewardType":1,"score":100,"joinNum":3,"myrank":1},"userinfo":{"politics":10003317,"level":7,"vip":3,"exp":7339,"usegems":3878,"mygname":"","uid":1000842,"gem":10011291,"pic":1,"todayolt":98412,"soldier":1810864767,"freeg":10002589,"lastday":0,"buyn":7,"tcost":0,"mygid":0,"food":942226428,"charm":5010506,"olt":1512216173,"buyg":2580,"vipexp":258,"atk":6799825536,"gold":542670022,"buyt":1511320592,"inte":10897,"totalolt":98412,"title":"","name":"宦清雅","power":6814850256},"dailyboss":{"shop":{},"servant":{"1002":1,"1003":1,"1033":1},"lastday":1512144000,"info":{"lastAttack":1512144000,"damage":4004741362,"lastGet":1512144000},"score":5462,"version":1512190800,"tscore":5462},"bossData":{"totalHp":3500000000,"rewards":"5_1_100","killFlag":true,"myrank":{"uid":1000842,"title":"","myrank":1,"value":4004741362},"isDead":true,"hp":0,"damage":1001045258,"killName":"宦清雅","score":1415,"joinNum":3,"rankList":[{"uid":"1000842","title":"","name":"宦清雅","value":4004741362},{"uid":"1001337","title":"","name":"弓芮","value":440184},{"uid":"1000499","title":"","name":"林蛋大","value":330138}]}},"rnum":8,"ret":0}};
        // }
        if (data.ret) {
            if (data.data.data.bossData) {
                this._bossData = data.data.data.bossData;
            }
            if (data.data.data.lastReward) {
                this._lastReward = data.data.data.lastReward;
            }
            if (this._bossData.myrank == null) {
                this._bossData.myrank = {};
            }
            if (Object.keys(this._bossData.myrank).length < 1) {
                this._bossData.myrank = { uid: Api.playerVoApi.getPlayerID(), title: Api.playerVoApi.getTitleid(), value: 0, myrank: "10000+", name: Api.playerVoApi.getPlayerName() };
            }
            if (this._bossData.myrank.name == null) {
                this._bossData.myrank.name = Api.playerVoApi.getPlayerName();
            }
            if (data.data.cmd == NetRequestConst.REQUEST_DAILYBOSS_ATTACK) {
                this._hasKill = data.data.data.hasKill;
                if (this._hasKill == 1) {
                    ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW, { type: 3, f: this.killBossCallback, o: this });
                    NetManager.request(NetRequestConst.REQUEST_DAILYBOSS_GETDETAILS, {});
                    return;
                }
                this._exp = data.data.data.bossData.score;
                this._rewards = data.data.data.bossData.rewards;
                this._dps = data.data.data.bossData.damage;
                this.playAttackEffect();
            }
            else {
                if (data.data.data.rewards) {
                    App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
                }
            }
            if (data.data.cmd == NetRequestConst.REQUEST_DAILYBOSS_GETCLEARREWARD) {
                this.refreshWinRewardInfo();
            }
        }
    };
    // 刷新通关奖励的一些状态
    DailybossBattleView.prototype.refreshWinRewardInfo = function () {
        if (this._wingRewardBox1) {
            this._wingRewardBox1.visible = !Api.dailybossVoApi.getClearFlag();
            this._wingRewardBox2.visible = Api.dailybossVoApi.getClearFlag();
            this._winGetRewardBtn.visible = !Api.dailybossVoApi.getClearFlag();
            this._winCollectPic.visible = Api.dailybossVoApi.getClearFlag();
        }
    };
    // 点击领取奖励
    DailybossBattleView.prototype.getRewardBtnHandler = function () {
        this.request(NetRequestConst.REQUEST_DAILYBOSS_GETCLEARREWARD, {});
    };
    // 点击预览奖励
    DailybossBattleView.prototype.lookRewardBtnHandler = function () {
        var data = {};
        data.reward = Config.DailybossCfg.clearReward;
        data.isShowBtnType = 2;
        ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARPOPUPVIEW, data);
    };
    DailybossBattleView.prototype.killBossCallback = function () {
        this.refreshUIStatusByAttack();
        this.autoBattleCheck();
    };
    DailybossBattleView.prototype.playAttackEffect = function () {
        this._isMoving = true;
        this._attackBtn.visible = false;
        var scaleBig = 1.06;
        var moveFirst = egret.Point.create(this._downHero.x - (scaleBig - 1) * this._downHero.serImgWith / 2, this._downHero.y - (scaleBig - 1) * this._downHero.serImgHeight / 2);
        egret.Tween.get(this._downHero).
            to({ x: moveFirst.x, y: moveFirst.y, scaleX: scaleBig, scaleY: scaleBig }, 300).
            to({ x: this._downHero.x, y: this._downHero.y, scaleX: 1, scaleY: 1 }, 300).call(this.fireEffect, this);
    };
    DailybossBattleView.prototype.fireEffect = function () {
        this._attackEffect = ComponentManager.getCustomMovieClip("dailyboss_kaopao_", 8, 30);
        this._attackEffect.setPosition(this._pao.x + this._pao.width / 2 - 238 / 2, this._pao.y + 11);
        this._attackEffect.setEndCallBack(this.fireCallback, this);
        this._attackEffect.playWithTime(1);
        this.addChildToContainer(this._attackEffect);
        this.playFireEffcet();
        this._pao.kaiPao();
        var ths = this;
        var angle = this._pao.getAngle();
        var paodan = BaseBitmap.create("dailybossbattle_paodan");
        paodan.setPosition(this._pao.x + 53 + 43 - 8, this._pao.y);
        ths.addChildToContainer(paodan);
        App.DisplayUtil.addFactorFunc(BaseBitmap);
        var endPos = egret.Point.create(this._upHero.x + this._upHero.serImgWith / 2 - paodan.width / 2, this._upHero.y + this._upHero.height / 2 - paodan.height / 2);
        paodan["tweenMoveList"] = [egret.Point.create(paodan.x, paodan.y), egret.Point.create(paodan.x, paodan.y / 2 + endPos.y / 2 - 80), endPos];
        // paodan["tweenMoveList"]=[egret.Point.create(paodan.x,paodan.y),egret.Point.create(paodan.x/2+endPos.x/2 + 80,paodan.y/2+endPos.y/2 -80),endPos];
        egret.Tween.get(paodan).to({ factor: 1 }, 300).call(function (paodan) {
            if (paodan) {
                paodan["tweenMoveList"] = undefined;
                paodan.dispose();
                ths.showBossBehit();
            }
        }, ths, [paodan]);
    };
    DailybossBattleView.prototype.fireCallback = function () {
        this._attackEffect.dispose();
    };
    DailybossBattleView.prototype.showBossBehit = function () {
        this._heroArray.length = 0;
        this._damage = this._bossData.damage;
        this._area = 1;
        var offsetY;
        var moveY;
        var scaleTo = 0.4;
        var offsetX;
        this._heroArray = [this._downHero, this._upHero];
        this.showBeAttackAnim();
    };
    DailybossBattleView.prototype.atkEndCallback = function () {
        this.refreshUIStatusByAttack();
        if (this._bossData) {
            if (!this._bossData.hp) {
                if (this._bossData.killFlag) {
                    App.MessageHelper.addEventListener(ViewConst.POPUP.DAILYBOSSLASTATTACKPOPUPVIEW, this.checkShowLastRankRewardView, this);
                    ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSLASTATTACKPOPUPVIEW, this._bossData);
                }
                else {
                    this.checkShowLastRankRewardView();
                }
            }
        }
    };
    DailybossBattleView.prototype.showKillBossBattleResult = function () {
        if (!this._killBossContainer) {
            this._killBossContainer = new BaseDisplayObjectContainer();
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 345, 401);
            var killBg = BaseLoadBitmap.create("dailybossbattle_successbg", rect);
            this._killBossContainer.addChild(killBg);
            var killerTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossKillerDesc", [this._bossData.killName]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            killerTxt.lineSpacing = 5;
            killerTxt.textAlign = egret.HorizontalAlign.CENTER;
            killerTxt.setPosition(killBg.x + (killBg.width - killerTxt.width) / 2, killBg.y + 160);
            this._killBossContainer.addChild(killerTxt);
            var personNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossPersonNumDesc", [this._bossData.joinNum.toString()]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            personNumTxt.setPosition(killBg.x + (killBg.width - personNumTxt.width) / 2, killerTxt.y + killerTxt.height + 20);
            this._killBossContainer.addChild(personNumTxt);
            if (!Api.switchVoApi.checkOpenShenhe()) {
                /*
                let rankBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_COMMON,"dailybossDamageRankTitle2",this.damageRankHandler,this);
                rankBtn.setPosition(killBg.x+(killBg.width-rankBtn.width)/2,personNumTxt.y+personNumTxt.height+25);
                this._killBossContainer.addChild(rankBtn);
                */
                this._killBossContainer.setPosition((GameConfig.stageWidth - this._killBossContainer.width) / 2, (-this.container.y + (GameConfig.stageHeigth - this._killBossContainer.height) / 2));
                this.addChildToContainer(this._killBossContainer);
            }
        }
    };
    DailybossBattleView.prototype.showDefenedWinResult = function () {
        if (!this._defenedWinContainer) {
            this._defenedWinContainer = new BaseDisplayObjectContainer();
            var rect = egret.Rectangle.create();
            // rect.setTo(0,0,345,401);
            var killBg = BaseBitmap.create("dailyboss_defened");
            this._defenedWinContainer.addChild(killBg);
            // if (!PlatformManager.checkIsRuSp())
            // {
            var rewardTxt = ComponentManager.getTextField(LanguageManager.getlocal("reward"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            rewardTxt.lineSpacing = 5;
            rewardTxt.textAlign = egret.HorizontalAlign.CENTER;
            rewardTxt.setPosition(killBg.x + (killBg.width - rewardTxt.width) / 2, killBg.y + killBg.height / 2 - 58);
            this._defenedWinContainer.addChild(rewardTxt);
            var boxBg = ComponentManager.getButton("dailytask_box_light", null, this.lookRewardBtnHandler, this);
            boxBg.x = killBg.x + (killBg.width - boxBg.width) / 2,
                boxBg.y = killBg.y + killBg.height / 2 - boxBg.height / 2;
            this._defenedWinContainer.addChild(boxBg);
            var boxIcon1 = BaseBitmap.create("dailytask_newbox2_1");
            boxIcon1.x = killBg.x + (killBg.width - boxIcon1.width) / 2;
            boxIcon1.y = killBg.y + killBg.height / 2 - boxIcon1.height / 2;
            this._defenedWinContainer.addChild(boxIcon1);
            boxIcon1.visible = false;
            this._wingRewardBox1 = boxIcon1;
            var boxIcon2 = BaseBitmap.create("dailytask_newbox2_3");
            boxIcon2.x = killBg.x + (killBg.width - boxIcon2.width) / 2;
            boxIcon2.y = killBg.y + killBg.height / 2 - boxIcon2.height / 2;
            this._defenedWinContainer.addChild(boxIcon2);
            boxIcon2.visible = false;
            this._wingRewardBox2 = boxIcon2;
            var dailybossGiftBoxName = ComponentManager.getTextField(LanguageManager.getlocal("dailybossGiftBoxName"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            dailybossGiftBoxName.setPosition(killBg.x + (killBg.width - dailybossGiftBoxName.width) / 2, killBg.y + killBg.height / 2 + 35);
            this._defenedWinContainer.addChild(dailybossGiftBoxName);
            var getRewardBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.getRewardBtnHandler, this);
            getRewardBtn.setPosition(killBg.x + (killBg.width - getRewardBtn.width) / 2, dailybossGiftBoxName.y + dailybossGiftBoxName.height + 20);
            this._defenedWinContainer.addChild(getRewardBtn);
            getRewardBtn.visible = false;
            this._winGetRewardBtn = getRewardBtn;
            var collectPic = BaseBitmap.create("achievement_state3");
            collectPic.scaleX = 0.8;
            collectPic.scaleY = 0.8;
            collectPic.x = killBg.x + (killBg.width - collectPic.width * collectPic.scaleX) / 2;
            collectPic.y = dailybossGiftBoxName.y + dailybossGiftBoxName.height + 0 + 15;
            this._defenedWinContainer.addChild(collectPic);
            collectPic.visible = false;
            this._winCollectPic = collectPic;
            this._defenedWinContainer.setPosition((GameConfig.stageWidth - this._defenedWinContainer.width) / 2, (-this.container.y + (GameConfig.stageHeigth - this._defenedWinContainer.height) / 2));
            this.addChildToContainer(this._defenedWinContainer);
            this.refreshWinRewardInfo();
            // }
        }
        this.autoBattleCallback();
    };
    DailybossBattleView.prototype.damageRankHandler = function () {
        // ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSRANKPOPUPVIEW,this._bossData);
        ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSDAMAGERANKPOPUPVIEW, { rankList: this._bossData.rankList, myrank: this._bossData.myrank });
    };
    DailybossBattleView.prototype.hide = function () {
        NetManager.request(NetRequestConst.REQUEST_DAILYBOSS_GET, {});
        _super.prototype.hide.call(this);
    };
    DailybossBattleView.prototype.refreshUIStatusByAttack = function () {
        this.setAttackRank();
        var oo = null;
        var ff = null;
        if (this.getBossType() == 2 && !this._bossData.hp) {
            if (this._upHero) {
                this._upHero.visible = false;
            }
            if (this._topProgress) {
                this._topProgress.visible = false;
            }
            if (this._nameBg) {
                this._nameBg.visible = false;
            }
            if (this._nameTxt) {
                this._nameTxt.visible = false;
            }
            if (this._attackBtn) {
                this._attackBtn.visible = false;
            }
            if (this._downHero) {
                this._downHero.visible = false;
            }
            if (this._pao) {
                this._pao.visible = false;
            }
            if (this._changePic) {
                this._changePic.visible = false;
            }
            if (this._changeTxt) {
                this._changeTxt.visible = false;
            }
            if (this._heroRattle) {
                this._heroRattle.visible = false;
            }
            this.showKillBossBattleResult();
            if (this._autoBattleBtn && this._autoBattleBtn.visible) {
                this._autoBattleBtn.visible = false;
            }
            if (this._autoBattleView) {
                this.autoBattleCallback();
            }
        }
        else {
            if (this._bossData.bossLv > Api.dailybossVoApi.getMaxRound()) {
                oo = this;
                ff = this.showDefenedWinResult;
                this._topProgress.visible = false;
                this._upHero.visible = false;
                this._attackBtn.visible = false;
                this._pao.visible = false;
                this._downHero.visible = false;
                this._changePic.visible = false;
                this._heroRattle.visible = false;
                this._changeTxt.visible = false;
                this._nameTxt.visible = false;
                this._nameBg.visible = false;
                if (this._autoBattleBtn && this._autoBattleBtn.visible) {
                    this._autoBattleBtn.visible = false;
                }
                if (this._autoBattleView) {
                    this.autoBattleCallback();
                }
            }
            else {
                this.setTopProgress(this._bossData.hp, this._bossData.totalHp);
                this.autoSetServant();
            }
        }
        this.setBossUIStatus();
        if (this.getBossType() == 1 && this._bossData.isDead) {
            if (!oo && this._autoBattleBtn) {
                oo = this;
                ff = this.autoBattleCheck;
            }
            if (this._autoBattleView) {
                ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSTYPE1BATTLERESULTPOPUPVIEW, { info: this._bossData, f: ff, o: oo, autoclose: 1 });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSTYPE1BATTLERESULTPOPUPVIEW, { info: this._bossData, f: ff, o: oo });
            }
        }
        else if (this.getBossType() == 1) {
            if (this._selectServantId) {
                if (this._autoBattleView) {
                    this.autoBattleCheck();
                }
                else if (this._autoBattleBtn && !this._autoBattleBtn.visible) {
                    this._autoBattleBtn.visible = true;
                }
            }
        }
        else if (this.getBossType() == 2) {
            if (this._bossData.killFlag) {
                // ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW,{type:1,  damage:this._dps ,exp:this._exp , rewards:this._rewards , f:this.hide, o:this });
            }
            else {
                var autoClose = 0;
                if (this._autoBattleView) {
                    autoClose = 1;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW, { type: 2, damage: this._dps, exp: this._exp, f: this.autoBattleCheck, o: this, autoclose: autoClose });
            }
        }
    };
    DailybossBattleView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER, this.autoSetServant, this);
        App.MessageHelper.removeEventListener(ViewConst.POPUP.DAILYBOSSLASTATTACKPOPUPVIEW, this.checkShowLastRankRewardView, this);
        this._bossData = null;
        this._buttomBg = null;
        this._attackBtn = null;
        this._pao = null;
        this._selectServantId = null;
        this._attackRankList = null;
        this._myRankItem = null;
        this._nameBg = null;
        this._nameTxt = null;
        this._killBossContainer = null;
        this._bossImg = null;
        this._heroRattle = null;
        this._attackEffect = null;
        this._hasKill = null;
        this._dps = 0;
        this._exp = 0;
        this._rewards = null;
        this._allServantInfo = null;
        this.snamebg = null;
        this.snametxt = null;
        this._defenedWinContainer = null;
        this._wingRewardBox1 = null;
        this._wingRewardBox2 = null;
        this._winGetRewardBtn = null;
        this._winCollectPic = null;
        this._autoBattleBtn = null;
        this._autoBattleView = null;
        this._oldType = 0;
        this._newPower = 0;
        _super.prototype.dispose.call(this);
    };
    return DailybossBattleView;
}(BaseBattleView));
__reflect(DailybossBattleView.prototype, "DailybossBattleView");
var DailybossDamageRankListItem = (function (_super) {
    __extends(DailybossDamageRankListItem, _super);
    function DailybossDamageRankListItem() {
        return _super.call(this) || this;
    }
    DailybossDamageRankListItem.prototype.initItem = function (index, data) {
        var color = (data.myrank == null ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_LIGHT_YELLOW);
        var nameTxt = ComponentManager.getTextField((data.myrank != null ? data.myrank : String(index + 1)) + "." + data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, color);
        this.addChild(nameTxt);
        this._nameTxt = nameTxt;
        nameTxt.y = 5;
        var valueTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossDamageValueDesc", [data.value.toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, color);
        valueTxt.setPosition(360, 0);
        this.addChild(valueTxt);
        this._valueTxt = valueTxt;
        valueTxt.y = 5;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            valueTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        if (data.title) {
            var titleIcon = BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
            titleIcon.setScale(0.6);
            titleIcon.setPosition(220, this.height / 2 - 38 * 0.6 / 2 + 2);
            this.addChild(titleIcon);
            this._titleIcon = titleIcon;
        }
        this.width = 500;
    };
    DailybossDamageRankListItem.prototype.refresh = function (index, data) {
        if (this._nameTxt) {
            this._nameTxt.text = (data.myrank != null ? data.myrank : String(index + 1)) + "." + data.name;
        }
        if (this._valueTxt) {
            this._valueTxt.text = LanguageManager.getlocal("dailybossDamageValueDesc", [data.value.toString()]);
        }
        if (data.title) {
            if (this._titleIcon) {
                this._titleIcon.setload(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
            }
            else {
                var titleIcon = BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
                titleIcon.setScale(0.6);
                titleIcon.setPosition(220, 3);
                this.addChild(titleIcon);
                this._titleIcon = titleIcon;
            }
        }
    };
    DailybossDamageRankListItem.prototype.dipose = function () {
        this._nameTxt = null;
        this._titleIcon = null;
        this._valueTxt = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossDamageRankListItem;
}(ScrollListItem));
__reflect(DailybossDamageRankListItem.prototype, "DailybossDamageRankListItem");
