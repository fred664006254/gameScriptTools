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
var DailybossnewBattleView = (function (_super) {
    __extends(DailybossnewBattleView, _super);
    function DailybossnewBattleView() {
        var _this = _super.call(this) || this;
        _this._heroRattle = null;
        _this._attackEffect = null; //开火动画
        _this._exp = 0;
        _this._dps = 0;
        _this._rewards = null;
        _this._autoBattleBtn = null;
        _this._autoBattleView = null;
        _this._timeCD = null;
        _this._newPower = 0;
        return _this;
    }
    DailybossnewBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "promotion_officerbg1",
            "boss_start_war",
            "boss_start_war_down",
            "dailyboss_kaopao", "dailybossbattleview", "dailybossbattlenew_pao1", "dailybossbattlenew_pao2", "dailybossbattlenew_pao3"
        ]);
    };
    DailybossnewBattleView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWBOSS_RECOVER, this.autoSetServant, this);
        // let soldiersBg:BaseLoadBitmap=BaseLoadBitmap.create("dailyboss_battle_soldier");
        // soldiersBg.setPosition(0,GameConfig.stageHeigth - 760);
        // this.addChildToContainer(soldiersBg);
        Api.dailybossVoApi.needcheckweapon = 1;
        this.initAttackRank();
        this.initAttackBtn();
        this.autoSetServant();
        var imgUrl = "dailyboss_lv_0";
        if (this._upHero) {
            this._upHero.resetHero(imgUrl);
        }
        else {
            this.setUpHero(imgUrl, null, 3);
            this._upHero.y = 50;
            this._upPositon.y = this._upHero.y;
        }
        var rattle = new BattleRattle();
        rattle.init(this.container, 260, 2);
        rattle.setPosition(350, this._upHero.y);
        rattle.resetString(null, 3000, 2);
        this._bossImg = imgUrl;
        var nameBg = BaseBitmap.create("promotion_officerbg1");
        // nameBg.setScale(0.9);
        nameBg.setPosition((GameConfig.stageWidth - nameBg.width * nameBg.scaleX) / 2, 300);
        this.addChildToContainer(nameBg);
        this._nameBg = nameBg;
        var nameTxt = ComponentManager.getTextField(this.getbossName(), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        nameTxt.width = nameBg.width * nameBg.scaleX;
        nameTxt.textAlign = egret.HorizontalAlign.CENTER;
        nameTxt.setPosition(nameBg.x, nameBg.y + (nameBg.height * nameBg.scaleY - nameTxt.height) / 2);
        this.addChildToContainer(nameTxt);
        this._nameTxt = nameTxt;
        this.initPao();
        var timeBg = BaseBitmap.create("public_9_bg15");
        timeBg.width = 400;
        timeBg.setPosition(this.viewBg.width / 2 - timeBg.width / 2, 13);
        this.addChildToContainer(timeBg);
        var timeTxt = ComponentManager.getTextField(this.getStatusStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (PlatformManager.checkIsEnLang()) {
            timeBg.width = timeTxt.width;
            timeBg.x = GameConfig.stageWidth / 2 - timeBg.width / 2;
        }
        else {
            timeTxt.width = timeBg.width;
        }
        timeTxt.textAlign = egret.HorizontalAlign.CENTER;
        timeTxt.setPosition(timeBg.x + (timeBg.width - timeTxt.width) / 2, timeBg.y + (timeBg.height - timeTxt.height) / 2);
        this.addChildToContainer(timeTxt);
        this._timeCD = timeTxt;
    };
    DailybossnewBattleView.prototype.getStatusStr = function () {
        var leftTime = Api.dailybossnewVoApi.getEndTimeByName("boss2");
        if (leftTime < 0) {
            leftTime = 0;
        }
        var timeStr = LanguageManager.getlocal("dailybossnewTimeCD", [App.DateUtil.getFormatBySecond(leftTime, 1)]);
        return timeStr;
    };
    DailybossnewBattleView.prototype.getbossName = function () {
        var nameStr = LanguageManager.getlocal("dailybossTitleNew");
        return nameStr;
    };
    DailybossnewBattleView.prototype.getBossType = function () {
        return Api.dailybossnewVoApi.getBossType();
    };
    DailybossnewBattleView.prototype.initAttackBtn = function () {
        this._attackBtn = ComponentManager.getButton("boss_start_war", "", this.attackHandle, this);
        this._attackBtn.setPosition((GameConfig.stageWidth - this._attackBtn.width) / 2, this._buttomBg.y - this._attackBtn.height - 20);
        this.addChildToContainer(this._attackBtn);
        this._attackBtn.visible = false;
    };
    DailybossnewBattleView.prototype.initPao = function () {
        this._pao = new DailybossPao();
        this._pao.init(true);
        this._pao.setPosition(GameConfig.stageWidth - this._pao.width, -this.container.y + GameConfig.stageHeigth - this._pao.height - this._buttomBg.height);
        this.addChildToContainer(this._pao);
        // this._pao.kaiPao();
    };
    DailybossnewBattleView.prototype.initAttackRank = function () {
        var buttomBg = BaseBitmap.create("public_9_downbg");
        buttomBg.width = GameConfig.stageWidth;
        buttomBg.height = 172;
        buttomBg.setPosition(0, GameConfig.stageHeigth - this.container.y - buttomBg.height);
        this.addChildToContainer(buttomBg);
        this._buttomBg = buttomBg;
        buttomBg.touchEnabled = true;
        var damageTitle = ComponentManager.getTextField(LanguageManager.getlocal("dailybossDamageRankTitle2"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        damageTitle.lineSpacing = 2;
        damageTitle.width = TextFieldConst.FONTSIZE_BUTTON_COMMON + 4;
        damageTitle.height = this._buttomBg.height;
        damageTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
        damageTitle.setPosition(this._buttomBg.x + 20, this._buttomBg.y);
        this.addChildToContainer(damageTitle);
        if (!this._myRankItem) {
            this._myRankItem = ScrollListItem.create(DailybossDamageRankListItem, -1, this._bossData.myrank);
            this._myRankItem.setPosition(55, this._buttomBg.y + this._buttomBg.height - this._myRankItem.height - 10);
            this.addChildToContainer(this._myRankItem);
        }
        var rect = egret.Rectangle.create();
        var posY;
        rect.setTo(0, 0, this._buttomBg.width - 60, this._myRankItem.y - this._buttomBg.y - 10);
        this._attackRankList = ComponentManager.getScrollList(DailybossDamageRankListItem, this._bossData.rankList, rect);
        this._attackRankList.setPosition(55, this._buttomBg.y + 10);
        this._attackRankList.setContentPosY(10);
        var lookMore = ComponentManager.getButton("dailybossbattle_more", "lookMore", this.damageRankHandler, this);
        lookMore.setPosition(GameConfig.stageWidth - lookMore.width, this._buttomBg.y - lookMore.height + 95);
        this.addChild(lookMore);
        lookMore.setColor(TextFieldConst.COLOR_WHITE);
        posY = lookMore.y;
        var autoBattleNeedVipLv = Config.VipCfg.getUnlockLvel("dailyBoss");
        if (autoBattleNeedVipLv != null) {
            if (Api.playerVoApi.getPlayerVipLevel() < autoBattleNeedVipLv) {
                var reachText = ComponentManager.getTextField(LanguageManager.getlocal("autoBattleTip_DailyAc_1", [String(autoBattleNeedVipLv)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
                reachText.setPosition(GameConfig.stageWidth - reachText.width - 10, posY - reachText.height - 3);
                var blackBgRect = BaseBitmap.create("public_itemtipbg");
                blackBgRect.scaleX = -1;
                blackBgRect.width = reachText.width + 55;
                blackBgRect.height = 36;
                blackBgRect.x = GameConfig.stageWidth;
                blackBgRect.y = reachText.y - 7;
                this.addChild(blackBgRect);
                this.addChild(reachText);
            }
            else {
                this._autoBattleBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "autoBattle_DailyAc_2", this.autoBattleHandle, this);
                this._autoBattleBtn.setPosition(GameConfig.stageWidth - this._autoBattleBtn.width - 6, posY - this._autoBattleBtn.height - 3);
                this.addChild(this._autoBattleBtn);
            }
        }
        this._attackRankList.setEmptyTip(LanguageManager.getlocal("dinnerMsgPopupEmptyTip"));
        this.addChildToContainer(this._attackRankList);
    };
    DailybossnewBattleView.prototype.autoBattleHandle = function () {
        if (!this._autoBattleView) {
            this._autoBattleBtn.visible = false;
            this._autoBattleView = new BattleAuto();
            this._autoBattleView.init(1, this.autoBattleCallback, this);
            this.addChild(this._autoBattleView);
            this.attackHandle();
            this._heroRattle.setVisible(false);
        }
    };
    DailybossnewBattleView.prototype.autoBattleCheck = function () {
        if (!this || !this._bossData) {
            return;
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
        }
    };
    DailybossnewBattleView.prototype.autoBattleCallback = function () {
        if (this._autoBattleView) {
            this._autoBattleView.dispose();
            this._autoBattleView = null;
        }
    };
    DailybossnewBattleView.prototype.setAttackRank = function () {
        if (this._attackRankList) {
            if (this._bossData.rankList) {
                this._attackRankList.refreshData(this._bossData.rankList);
            }
        }
        if (this._myRankItem) {
            this._myRankItem.refresh(-1, this._bossData.myrank);
        }
    };
    DailybossnewBattleView.prototype.setDownHero = function (picName, info) {
        if (!this._downHero) {
            this._downHero = new BattleHero();
            var showeff1 = false;
            var servant = Api.servantVoApi.getServantObj(String(this._selectServantId));
            if (servant && servant.equip && servant.equip != "") {
                showeff1 = true;
            }
            this._downHero.init(picName, info, 3, 1, showeff1);
            this._downHero.setPosition(0, -this.container.y + GameConfig.stageHeigth - this._downHero.height * this._downHero.scaleY - 165);
            this.container.addChildAt(this._downHero, 0);
            this._downHero.addTouchTap(this.showSelectServantHandler, this);
            this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
            var changePic = BaseBitmap.create("promotion_officerbg1");
            changePic.setPosition(this._downHero.x + (this._downHero.width * this._downHero.scaleX - changePic.width) / 2, this._downHero.y + this._downHero.height * this._downHero.scaleY - changePic.height - 10);
            this.addChildToContainer(changePic);
            this._changePic = changePic;
            var nameTxt = ComponentManager.getTextField(App.StringUtil.formatStringColor(LanguageManager.getlocal("dailybossChangeServantDesc"), TextFieldConst.COLOR_WARN_YELLOW), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            nameTxt.width = changePic.width;
            nameTxt.textAlign = egret.HorizontalAlign.CENTER;
            nameTxt.setPosition(changePic.x, changePic.y + (changePic.height - nameTxt.height) / 2);
            this.addChildToContainer(nameTxt);
            changePic.addTouchTap(this.showSelectServantHandler, this);
            this._changeTxt = nameTxt;
            this._heroRattle = new BattleRattle();
            if (PlatformManager.checkIsEnLang()) {
                this._heroRattle.init(this.container, 350, 2);
            }
            else if (PlatformManager.checkIsPtLang() || PlatformManager.checkIsRuLang()) {
                this._heroRattle.init(this.container, 350, 2, 100);
            }
            else {
                this._heroRattle.init(this.container, 295, 2);
            }
            this._heroRattle.setPosition(140, this._downHero.y - 30);
        }
        else {
            var showeff1 = false;
            var servant = Api.servantVoApi.getServantObj(String(this._selectServantId));
            if (servant && servant.equip && servant.equip != "") {
                showeff1 = true;
            }
            this._downHero.resetHero(picName, 0, showeff1);
        }
        var power = 0;
        if (Api.dailybossVoApi.needcheckweapon == 1) {
            if (this._selectServantId) {
                power = Api.servantVoApi.getServantCombatWithId(String(this._selectServantId));
            }
            this.checkWeapon();
        }
        else {
            if (this._selectServantId) {
                power = Api.servantVoApi.getServantCombatWithIdContentsWeapon(String(this._selectServantId), 2);
            }
        }
        if (!picName && this._autoBattleBtn) {
            this._autoBattleBtn.setVisible(false);
        }
        if (this._selectServantId) {
            var rattleStr = LanguageManager.getlocal("dailybossServantBattleTip", [LanguageManager.getlocal("servant_name" + this._selectServantId), power.toString()]);
            this._heroRattle.resetString(rattleStr, -1);
            if (!this._autoBattleView) {
                this._heroRattle.visible = true;
            }
        }
        else {
            this._heroRattle.visible = false;
        }
    };
    DailybossnewBattleView.prototype.attackHandle = function () {
        if (this._isMoving) {
            return;
        }
        if (!this._selectServantId) {
            App.CommonUtil.showTip(LanguageManager.getlocal("dailybossNoServantCanBattleDesc"));
        }
        else {
            this.request(NetRequestConst.REQUEST_NEWBOSS_ATTACK, { servantId: this._selectServantId });
        }
    };
    DailybossnewBattleView.prototype.tick = function () {
        if (Api.dailybossnewVoApi.getStatus() != 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("dailybossOutTimeNew"));
            this.hide();
        }
        if (this._timeCD) {
            this._timeCD.text = this.getStatusStr();
        }
    };
    DailybossnewBattleView.prototype.showSelectServantHandler = function () {
        var _this = this;
        if (this._isMoving) {
            return;
        }
        if (this._allServantInfo == null) {
            this._allServantInfo = {};
            var allKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
            for (var k in allKey) {
                var key = allKey[k];
                this._allServantInfo[key] = Api.servantVoApi.getServantCombatWithIdContentsWeapon(key, 2);
                //Api.servantVoApi.getServantCombatWithId(key);
            }
        }
        this._curKey = null;
        this._leftValue = 0;
        var allKeys = Object.keys(this._allServantInfo);
        allKeys.sort(function (a, b) {
            var valueA = Api.dailybossnewVoApi.checkServantcanStatus(a);
            var valueB = Api.dailybossnewVoApi.checkServantcanStatus(b);
            if (valueA == valueB) {
                return Number(_this._allServantInfo[b] - _this._allServantInfo[a]);
            }
            else {
                return Number(valueA - valueB);
            }
        });
        if (Api.dailybossnewVoApi.checkServantcanStatus(allKeys[0]) == 0) {
            this._curKey = allKeys[0];
            this._leftValue = this._allServantInfo[this._curKey];
        }
        this._rightValue;
        var showTab = [];
        for (var k in allKeys) {
            var key = allKeys[k];
            showTab.push([key, Api.dailybossnewVoApi.checkServantcanStatus(key), this._allServantInfo[key], Api.servantVoApi.getServantObj(key).banishSt]);
        }
        showTab.sort(function (a, b) {
            var valueA = a[1];
            var valueB = b[1];
            if (valueA == valueB) {
                if (Api.switchVoApi.checkOpenExile()) {
                    if (a[3] && (!b[3])) {
                        return 1;
                    }
                    else if (a[3] && b[3]) {
                        return Number(b[2] - a[2]);
                    }
                    else if ((!a[3]) && b[3]) {
                        return -1;
                    }
                    else if ((!a[3]) && (!b[3])) {
                        return Number(b[2] - a[2]);
                    }
                }
                else {
                    return Number(b[2] - a[2]);
                }
            }
            else {
                return Number(valueA - valueB);
            }
        });
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW, { type: ServantSelectedPopupView.TYPE_BATTLE_NEWBOSS, "info": showTab, callback: this.selectServantHandler, handler: this });
    };
    DailybossnewBattleView.prototype.autoSetServant = function () {
        this.setServant(Api.dailybossnewVoApi.findBestServant());
    };
    DailybossnewBattleView.prototype.setServant = function (id) {
        this._selectServantId = id;
        var servantCfg = Config.ServantCfg.getServantItemById(this._selectServantId);
        var pic = Api.servantVoApi.getFullImgPathWithId(this._selectServantId);
        this.setDownHero(pic);
        if (pic) {
            if (this._autoBattleView) {
            }
            else {
                this._attackBtn.visible = true;
                this._heroRattle.setVisible(true);
            }
        }
        else {
            if (this._autoBattleView) {
                this.autoBattleCallback();
            }
            if (this._autoBattleBtn && this._autoBattleBtn.visible) {
                this._autoBattleBtn.setVisible(false);
            }
        }
    };
    DailybossnewBattleView.prototype.selectServantHandler = function (params) {
        var servantId = params.key;
        this._selectServantId = servantId;
        var showeff1 = false;
        var servant = Api.servantVoApi.getServantObj(String(this._selectServantId));
        if (servant && servant.equip && servant.equip != "") {
            showeff1 = true;
        }
        this._downHero.resetHero(Api.servantVoApi.getFullImgPathWithId(this._selectServantId), 0, showeff1);
        this.setDownHero(Api.servantVoApi.getFullImgPathWithId(servantId));
    };
    DailybossnewBattleView.prototype.getHitAnimSources = function () {
        return "dailyboss_baozha";
    };
    DailybossnewBattleView.prototype.getHitAnimInfo = function () {
        return ["dailyboss_baozha_", 9];
    };
    // 标题背景名称
    // protected getTitleBgName():string
    // {
    // 	return "commonview_titlebg";
    // }
    DailybossnewBattleView.prototype.getTitleStr = function () {
        return "dailybossTimeTitleNew";
    };
    DailybossnewBattleView.prototype.getBgName = function () {
        return "dailybossnew_bg2";
    };
    DailybossnewBattleView.prototype.playHitEffcet = function () {
        SoundManager.playEffect(SoundConst.EFFECT_DAILYBOSS_HIT);
    };
    DailybossnewBattleView.prototype.playFireEffcet = function () {
        SoundManager.playEffect(SoundConst.EFFECT_DAILYBOSS_FIRE);
    };
    DailybossnewBattleView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_NEWBOSS_GETDETAILS, requestData: {} };
    };
    DailybossnewBattleView.prototype.receiveData = function (data) {
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
            if (data.data.cmd == NetRequestConst.REQUEST_NEWBOSS_ATTACK) {
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
        }
    };
    DailybossnewBattleView.prototype.killBossCallback = function () {
        this.refreshUIStatusByAttack();
        this.autoBattleCheck();
    };
    DailybossnewBattleView.prototype.playAttackEffect = function () {
        this._isMoving = true;
        this._attackBtn.visible = false;
        var scaleBig = 1.06;
        var moveFirst = egret.Point.create(this._downHero.x - (scaleBig - 1) * this._downHero.width / 2, this._downHero.y - (scaleBig - 1) * this._downHero.height / 2);
        egret.Tween.get(this._downHero).
            to({ x: moveFirst.x, y: moveFirst.y, scaleX: scaleBig, scaleY: scaleBig }, 300).
            to({ x: this._downHero.x, y: this._downHero.y, scaleX: 1, scaleY: 1 }, 300).call(this.fireEffect, this);
    };
    DailybossnewBattleView.prototype.fireEffect = function () {
        this._attackEffect = ComponentManager.getCustomMovieClip("dailyboss_kaopao_", 8, 30);
        this._attackEffect.setPosition(this._pao.x + 48, this._pao.y + 11);
        this._attackEffect.setEndCallBack(this.fireCallback, this);
        this._attackEffect.playWithTime(1);
        this.addChildToContainer(this._attackEffect);
        this.playFireEffcet();
        this._pao.kaiPao();
        var ths = this;
        var angle = this._pao.getAngle();
        var paodan = BaseBitmap.create("dailybossbattle_paodan");
        paodan.setPosition(this._pao.x + 40, this._pao.y);
        ths.addChildToContainer(paodan);
        App.DisplayUtil.addFactorFunc(BaseBitmap);
        var endPos = egret.Point.create(this._upHero.x + this._upHero.width / 2 - paodan.width / 2, this._upHero.y + this._upHero.height / 2 - paodan.height / 2);
        paodan["tweenMoveList"] = [egret.Point.create(paodan.x, paodan.y), egret.Point.create(paodan.x / 2 + endPos.x / 2 + 80, paodan.y / 2 + endPos.y / 2 - 80), endPos];
        egret.Tween.get(paodan).to({ factor: 1 }, 300).call(function (paodan) {
            if (paodan) {
                paodan["tweenMoveList"] = undefined;
                paodan.dispose();
                ths.showBossBehit();
            }
        }, ths, [paodan]);
    };
    DailybossnewBattleView.prototype.fireCallback = function () {
        this._attackEffect.dispose();
    };
    DailybossnewBattleView.prototype.showBossBehit = function () {
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
    DailybossnewBattleView.prototype.atkEndCallback = function () {
        this.refreshUIStatusByAttack();
    };
    DailybossnewBattleView.prototype.damageRankHandler = function () {
        // ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSDAMAGERANKPOPUPVIEW,{rankList:this._bossData.rankList,myrank:this._bossData.myrank,isnewboss:true});
        ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSNEWRANKPOPUPVIEW, {});
    };
    DailybossnewBattleView.prototype.refreshUIStatusByAttack = function () {
        this.setAttackRank();
        var oo = null;
        var ff = null;
        Api.dailybossVoApi.needcheckweapon = 1;
        this.autoSetServant();
        var autoClose = 0;
        if (this._autoBattleView) {
            autoClose = 1;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW, { type: 4, damage: this._dps, exp: this._exp, f: this.autoBattleCheck, o: this, autoclose: autoClose });
    };
    DailybossnewBattleView.prototype.hide = function () {
        NetManager.request(NetRequestConst.REQUEST_NEWBOSS_GET, {});
        _super.prototype.hide.call(this);
    };
    DailybossnewBattleView.prototype.getRuleInfo = function () {
        return "dailybossnewRuleInfo";
    };
    DailybossnewBattleView.prototype.checkWeapon = function () {
        Api.dailybossVoApi.needcheckweapon = 0;
        var serId = this._selectServantId;
        // serId = "1001";
        if (!serId) {
            return;
        }
        var weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(serId);
        if (!weaponVo) {
            return;
        }
        var value = weaponVo.getSpecialityByType(2);
        this._newPower = Api.servantVoApi.getServantCombatWithId(String(serId)) + value;
        ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW, {
            sid: serId,
            type: 3,
            atype: 2,
            value: value,
            f: this.checkWeaponBack,
            o: this,
            auto: (this._autoBattleView ? true : false),
        });
    };
    DailybossnewBattleView.prototype.checkWeaponBack = function () {
        if (this && this.isShow()) {
            var rattleStr = LanguageManager.getlocal("dailybossServantBattleTip", [LanguageManager.getlocal("servant_name" + this._selectServantId), String(this._newPower)]);
            this._heroRattle.resetString(rattleStr, -1);
            this._downHero.showLight();
        }
    };
    DailybossnewBattleView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWBOSS_RECOVER, this.autoSetServant, this);
        this._bossData = null;
        this._buttomBg = null;
        this._attackBtn = null;
        this._pao = null;
        this._selectServantId = null;
        this._attackRankList = null;
        this._myRankItem = null;
        this._nameBg = null;
        this._nameTxt = null;
        this._bossImg = null;
        this._heroRattle = null;
        this._attackEffect = null;
        this._dps = 0;
        this._exp = 0;
        this._rewards = null;
        this._allServantInfo = null;
        this._wingRewardBox1 = null;
        this._wingRewardBox2 = null;
        this._winGetRewardBtn = null;
        this._winCollectPic = null;
        this._autoBattleBtn = null;
        this._autoBattleView = null;
        this._timeCD = null;
        this._newPower = 0;
        _super.prototype.dispose.call(this);
    };
    return DailybossnewBattleView;
}(BaseBattleView));
__reflect(DailybossnewBattleView.prototype, "DailybossnewBattleView");
var DailybossnewDamageRankListItem = (function (_super) {
    __extends(DailybossnewDamageRankListItem, _super);
    function DailybossnewDamageRankListItem() {
        return _super.call(this) || this;
    }
    DailybossnewDamageRankListItem.prototype.initItem = function (index, data) {
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
            titleIcon.setPosition(220, nameTxt.y - 7);
            this.addChild(titleIcon);
            this._titleIcon = titleIcon;
        }
        this.width = 500;
    };
    DailybossnewDamageRankListItem.prototype.refresh = function (index, data) {
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
    DailybossnewDamageRankListItem.prototype.dipose = function () {
        this._nameTxt = null;
        this._titleIcon = null;
        this._valueTxt = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossnewDamageRankListItem;
}(ScrollListItem));
__reflect(DailybossnewDamageRankListItem.prototype, "DailybossnewDamageRankListItem");
//# sourceMappingURL=DailybossnewBattleView.js.map