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
var AcThreeKingdomsHeroAttackView = (function (_super) {
    __extends(AcThreeKingdomsHeroAttackView, _super);
    function AcThreeKingdomsHeroAttackView() {
        var _this = _super.call(this) || this;
        _this._info = null;
        _this._callbackF = null;
        _this._obj = null;
        // private _idx:number= null;
        _this._rewards = "";
        _this._rewardsarr = [];
        _this._curKey = "";
        _this._curValue = 0;
        //门客战斗力
        _this._allServantInfo = null;
        _this._dps = 0;
        _this._exp = 0;
        //总血量
        _this._bossValue = 0;
        _this._heroValue = 0;
        _this._isBattling = false;
        _this.bottomBg = null;
        _this._isRefresh = false;
        _this._bossInfoVoList = [];
        _this._chatTxt = null;
        _this._autoBattleBtn = null;
        _this._autoBattleView = null;
        _this._isPlayAni = false;
        _this._isAuto = false;
        _this._isShowReard = false;
        _this._damageTotoal = 0;
        return _this;
    }
    AcThreeKingdomsHeroAttackView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_TOMBFIGHT;
    };
    AcThreeKingdomsHeroAttackView.prototype.getResourceList = function () {
        var tempArray = _super.prototype.getResourceList.call(this);
        return tempArray.concat([
            ButtonConst.BATTLE_START_BTN_1,
            "threekingdomsheroattackview", "progress8", "progress7_bg", "mainui_chatbg", "mainui_chatIcon",
        ]);
    };
    Object.defineProperty(AcThreeKingdomsHeroAttackView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsHeroAttackView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsHeroAttackView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcThreeKingdomsHeroAttackView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsHeroAttackView.prototype.getBgName = function () {
        return "arena_bg";
    };
    AcThreeKingdomsHeroAttackView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640 * 1.3, 1136 * 1.3);
            this.viewBg = BaseLoadBitmap.create(bgName, rect);
            this.viewBg.setPosition(0 - 640 * 0.15, (GameConfig.stageHeigth - this.viewBg.height) * 0.2);
            this.addChild(this.viewBg);
        }
    };
    // 标题背景名称
    AcThreeKingdomsHeroAttackView.prototype.getTitleBgName = function () {
        return "threekingdomsheroattacktitle";
    };
    // 标题背景名称
    AcThreeKingdomsHeroAttackView.prototype.getTitleStr = function () {
        return null;
    };
    AcThreeKingdomsHeroAttackView.prototype.findBestServant = function (bossLife) {
        if (!bossLife) {
            bossLife = 0;
        }
        var servantId;
        var allKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
        var addV = 0;
        allKey.sort(function (a, b) {
            var value1 = Api.servantVoApi.getServantCombatWithId(a) * (1 + addV);
            var valueb = Api.servantVoApi.getServantCombatWithId(b) * (1 + addV);
            return value1 - valueb;
        });
        var l = allKey.length;
        for (var i = 0; i < l; i++) {
            if (this.vo.getServantFightInfo(allKey[i]) == 0) {
                servantId = allKey[i];
                if ((Api.servantVoApi.getServantCombatWithId(allKey[i]) * (1 + addV)) >= bossLife) {
                    break;
                }
            }
        }
        return servantId;
    };
    AcThreeKingdomsHeroAttackView.prototype.refresh = function () {
        var view = this;
        view.resetTopKey();
        if (this._curKey) {
            var servant = Api.servantVoApi.getServantObj(this._curKey);
            var showeff1 = false;
            if (servant && servant.equip && servant.equip != "") {
                showeff1 = true;
            }
            this._downHero.resetHero(servant.fullImgPath, this._allServantInfo[this._curKey], showeff1);
        }
        else {
            this._downHero.resetHero();
        }
        this.showGameBtn();
    };
    //重置默认选中的门客 和 当前属性
    AcThreeKingdomsHeroAttackView.prototype.resetTopKey = function () {
        //初始化门客信息 key: 门客ID，value: 门客战斗力
        if (this._allServantInfo == null) {
            this._allServantInfo = {};
            var allKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
            for (var k in allKey) {
                var key = allKey[k];
                this._allServantInfo[key] = Api.servantVoApi.getServantCombatWithId(key);
            }
        }
        this._curKey = null;
        this._heroValue = 0;
        var blood = this.getTombBlood();
        var curValue = isNaN(blood) ? (this._bossValue) : blood;
        var servantId = this.findBestServant(curValue);
        if (servantId && this.vo.getServantFightInfo(servantId) == 0) {
            this._curKey = servantId.toString();
            this._heroValue = this._allServantInfo[this._curKey];
        }
        if (this._curKey) {
            if (this._isAuto) {
                this._autoBattleView.setVisible(true);
                this._gameBtn.setVisible(false);
                this._autoBattleBtn.setVisible(false);
            }
            else {
                if (this._autoBattleView) {
                    this._autoBattleView.setVisible(false);
                    this._gameBtn.setVisible(true);
                    this._autoBattleBtn.setVisible(true);
                }
            }
        }
        else {
            if (this._isAuto) {
                this.removeTouchTap();
                if (this._rewardsarr.length) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSHEROATTACKRESULTVIEW, {
                        damage: this._dps,
                        rewards: this._rewards,
                        aid: this.aid,
                        code: this.code,
                        iskill: this._info <= 0,
                        rewardsarr: this._rewardsarr,
                        isauto: true
                    });
                }
            }
            if (this._autoBattleView) {
                this._autoBattleView.setVisible(false);
                this._gameBtn.setVisible(false);
                this._autoBattleBtn.setVisible(false);
                this._isAuto = false;
                this._isPlayAni = false;
            }
        }
    };
    AcThreeKingdomsHeroAttackView.prototype.getTombBlood = function () {
        return this._info;
    };
    AcThreeKingdomsHeroAttackView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcThreeKingdomsHeroAttackView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_THREEKINGDOMS_HEROATTACK), view.intoBossBattle, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HERORECOVERY, this.refresh, this);
        // let bottom:BaseBitmap = BaseBitmap.create("public_9_wordbg");
        // bottom.height = 170;
        //开启时第一次有引导性红点
        var key = ServerCfg.selectServer.zid + "_pId_" + Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + "tuxi" + this.vo.getCurWeek() + "_" + this.vo.getTodayWeek();
        var value = LocalStorageManager.get(key);
        if (!value) {
            LocalStorageManager.set(key, "1");
        }
        view.atk = false;
        // view._idx = view.param.data.foeId;
        view._bossValue = view.cfg.heroHp;
        var blood = view.getTombBlood();
        var curValue = isNaN(blood) ? (view._bossValue) : blood;
        this.resetTopKey();
        this.setTopProgress(curValue, view._bossValue, GameConfig.stageWidth, 2);
        this._topProgress.y = -7;
        var heroinfo = view.vo.getHeroAttackNpcPic(view.getTombBlood() == 0);
        var upHeroPic = heroinfo.pic;
        this.setUpHero(upHeroPic);
        this._upHero.setScale(0.8);
        this._upHero.x = GameConfig.stageWidth / 2 - this._upHero.width * this._upHero.scaleX / 2;
        var downHeroPic = null;
        var downInfo = null;
        var showeff1 = false;
        if (this._curKey) {
            var addV = 0;
            var addInfo = Api.allianceVoApi.getDecreePolicyAddAttrInfo();
            if (addInfo && addInfo.lastTimes > 0) {
                var addV_1 = Math.floor(Api.playerVoApi.getAtk() * addInfo.addExtent);
            }
            downHeroPic = Api.servantVoApi.getFullImgPathWithId(this._curKey); // "servant_full_"+this._curKey;
            var servant = Api.servantVoApi.getServantObj(this._curKey);
            if (servant && servant.equip && servant.equip != "") {
                showeff1 = true;
            }
            var power = this._allServantInfo[this._curKey] + addV;
            downInfo = [[LanguageManager.getlocal("fightForce") + ":" + power.toFixed(0), TextFieldConst.COLOR_LIGHT_YELLOW], [LanguageManager.getlocal("clickChooseServant")]];
        }
        else {
            downHeroPic = "servant_empty";
            downInfo = [["empty", TextFieldConst.COLOR_LIGHT_YELLOW], [LanguageManager.getlocal("clickChooseServant")]];
        }
        // let maskbg:BaseBitmap=BaseBitmap.create("upheromask");
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, maskbg, this._upHero, [0,248]);
        // this.addChildToContainer(maskbg);
        this.setDownHero(downHeroPic, downInfo, 6, showeff1);
        this._downHero.setScale(0.8);
        this._downHero.x = GameConfig.stageWidth / 2 - this._downHero.width * this._downHero.scaleX / 2;
        this._downHero.y = GameConfig.stageHeigth - this._downHero.height * this._downHero.scaleY - 100; //- this.getTitleButtomY();
        this._upPositon = egret.Point.create(this._upHero.x, this._upHero.y);
        this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
        this._downHero.addTouchTap(this.clickChangeHero, this);
        //无限boss特效
        if (this.getTombBlood() == 0) {
            //
        }
        //boss getBgName
        var tipBg = BaseBitmap.create("threekingdomsheroattackinfobg");
        this.addChildToContainer(tipBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, this._upHero, [0, 290]);
        var kingdombg = BaseBitmap.create("threekingdomsheroattacklvbg");
        this.addChildToContainer(kingdombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, kingdombg, tipBg, [-kingdombg.width / 2, 0]);
        var font = BaseBitmap.create("threekingdomsfont" + heroinfo.kingdom);
        this.addChildToContainer(font);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, font, kingdombg);
        // let id = this._eliteidx == null?this._idx:this._eliteidx;
        var servantName = ComponentManager.getTextField(heroinfo.name, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantName, tipBg, [0, 5]);
        this.addChildToContainer(servantName);
        // tipBg.setPosition(GameConfig.stageWidth/2 - tipBg.width/2,servantName.y + servantName.height/2 - 15 );
        // 开始游戏
        this._gameBtn = ComponentManager.getButton("threekingdomsheroattackvs", null, this.btnClick, this, null, 3);
        this._gameBtn.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 - 50);
        this._gameBtn.anchorOffsetX = this._gameBtn.width / 2;
        this._gameBtn.anchorOffsetY = this._gameBtn.height / 2;
        // this.container.addChildAt(this._gameBtn, this.container.getChildIndex(this._upHero) - 1);
        this.container.addChild(this._gameBtn);
        this.btnAnim();
        this._autoBattleBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceWeekEndViewAuto", this.autoBattleClick, this);
        this._autoBattleBtn.setPosition(GameConfig.stageWidth - this._autoBattleBtn.width - 6, GameConfig.stageHeigth - this._autoBattleBtn.height - 76);
        this.addChild(this._autoBattleBtn);
        if (this._curKey == null) {
            this._gameBtn.visible = false;
            this._autoBattleBtn.visible = false;
        }
        this._autoBattleView = new BattleAuto();
        this._autoBattleView.init(2, function () { }, this);
        this.addChild(this._autoBattleView);
        this._autoBattleView.setVisible(false);
        //跨服聊天
        var bottom = null;
        bottom = BaseBitmap.create("mainui_chatbg");
        bottom.width = GameConfig.stageWidth;
        bottom.height = 30;
        bottom.x = 0;
        bottom.y = GameConfig.stageHeigth - bottom.height;
        view.addChild(bottom);
        bottom.touchEnabled = true;
        bottom.addTouchTap(function () {
            if (_this._isAuto || _this._isBattling) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {
                activeID: _this.vo.aidAndCode,
                isKingdom: true,
                kingdoms: view.vo.getMyKingdoms()
            });
            // if(view.vo.isSelectedKindom()){
            // }
            // else{
            //     App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip1`, code)));
            // }
        }, view);
        var chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
        chatIcon.anchorOffsetX = chatIcon.width / 2;
        chatIcon.anchorOffsetY = chatIcon.height / 2;
        chatIcon.x = chatIcon.width / 2 + 10;
        chatIcon.y = bottom.y + bottom.height / 2;
        view.addChild(chatIcon);
        egret.Tween.get(chatIcon, {
            loop: true,
        }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1.0 }, 1000); //设置2000毫秒内 rotation 属性变为360
        var showStr = Api.chatVoApi.getLastAcCrossMessage();
        if (!showStr) {
            showStr = "";
        }
        else {
            var zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, showStr.zoneid);
            showStr = LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0, 16) + "...") : showStr.content.message);
        }
        var emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
        if (emoticonStr) {
            showStr = emoticonStr;
        }
        view._chatTxt = ComponentManager.getTextField(showStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view._chatTxt.width = 480;
        view._chatTxt.height = 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._chatTxt, bottom, [chatIcon.width + 5, 0]);
        view.addChild(view._chatTxt);
        // bottom.y = GameConfig.stageHeigth - bottom.height;
        // this.addChild(bottom);
        // this.bottomBg = bottom;
        //参加奖励
        var shopBtn = ComponentManager.getButton("threekingdomsheroattackrewardbtn", '', function () {
            if (_this._isAuto || _this._isBattling) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSHEROATTACKJOINREWARDVIEW, {
                aid: view.param.data.aid,
                code: view.param.data.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, shopBtn, bottom, [20, -shopBtn.height - 10]);
        view.addChild(shopBtn);
        //击退奖励
        var killBtn = ComponentManager.getButton("threekingdomsheroattackkillrewardbtn", '', function () {
            if (_this._isAuto || _this._isBattling) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW4, {
                code: view.code,
                aid: view.aid
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killBtn, shopBtn, [0, -killBtn.height - 15]);
        view.addChild(killBtn);
        this._isRefresh = false;
    };
    AcThreeKingdomsHeroAttackView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_THREEKINGDOMS_HEROINFO, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    /**自动战斗 */
    AcThreeKingdomsHeroAttackView.prototype.autoBattleClick = function () {
        if (this._isPlayAni) {
            return;
        }
        if (this._isAuto) {
            this._isAuto = false;
            egret.Tween.removeTweens(this);
            if (this._curKey) {
                this._gameBtn.setVisible(true);
                this._autoBattleBtn.setVisible(true);
            }
            else {
                this._gameBtn.setVisible(false);
                this._autoBattleBtn.setVisible(false);
                this._isPlayAni = false;
            }
            this._autoBattleView.setVisible(false);
            this.removeTouchTap();
            // this.touchEnabled = false;
        }
        else {
            this._damageTotoal = 0;
            this._isAuto = true;
            this._gameBtn.setVisible(false);
            this._autoBattleBtn.setVisible(false);
            this._autoBattleView.setVisible(true);
            this.btnClick();
            // this.touchEnabled = false;
        }
        // ViewController.getInstance().openView(ViewConst.BASE.ALLIANCEWEEKENDBATTLEREPORTVIEW, { damage: LanguageManager.getlocal("allianceWeekEndBattleReportViewBattleResult1"), score: LanguageManager.getlocal("allianceWeekEndBattleReportViewContribution") });
    };
    AcThreeKingdomsHeroAttackView.prototype.receiveData = function (data) {
        var view = this;
        if (data.ret) {
            view._info = data.data.data.bosshp;
        }
        // let param = view.vo.getParamMap(view.param.data.id);
        // if(tmp){
        // 	if(param.index == tmp.index && param.x == tmp.x && param.y == tmp.y){
        // 		view.vo.setBossInfo({
        // 			bosstype : view.param.data.foeId,
        // 			bosskey : view.param.data.bosskey,
        // 			bosshp : Number(tmp.bosshp),
        // 			damagelog : tmp.damagelog,
        // 			killer : tmp.killer,
        // 			joinnum : tmp.joinnum
        // 		});
        // 	}
        // }
    };
    AcThreeKingdomsHeroAttackView.prototype.clickChangeHero = function () {
        if (this._isAuto || this._isBattling) {
            return;
        }
        var allKeys = Object.keys(this._allServantInfo);
        var showTab = [];
        for (var k in allKeys) {
            var key = allKeys[k];
            showTab.push([key, this.vo.getServantFightInfo(key), this._allServantInfo[key], Api.servantVoApi.getServantObj(key).banishSt]);
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
                // return Number(b[2] - a[2]);
            }
            else {
                return Number(valueA - valueB);
            }
        });
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW, { type: ServantSelectedPopupView.TYPE_THREEKINGDOMS, "info": showTab, callback: this.sendRequest, handler: this, code: this.param.data.code });
    };
    AcThreeKingdomsHeroAttackView.prototype.sendRequest = function (params) {
        var clickKey = params.key;
        if (clickKey != this._curKey) {
            this._curKey = clickKey;
            var servant = Api.servantVoApi.getServantObj(clickKey);
            var showeff1 = false;
            if (servant && servant.equip && servant.equip != "") {
                showeff1 = true;
            }
            this._downHero.resetHero(servant.fullImgPath, this._allServantInfo[clickKey], showeff1);
            this._gameBtn.visible = true;
            this._autoBattleBtn.visible = true;
        }
    };
    AcThreeKingdomsHeroAttackView.prototype.btnClick = function () {
        // 	let bossId = this._eliteidx == null?this._idx:this._eliteidx;
        var view = this;
        if (this._isPlayAni) {
            return;
        }
        var code = view.getUiCode();
        if (!view.vo.isInTuxiTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acthreekingdomsheroattacktip2", code)));
            view.hide();
            return;
        }
        if (view._curKey) {
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_HEROATTACK, {
                activeId: view.vo.aidAndCode,
                sid: view._curKey,
            });
        }
        this._isPlayAni = true;
        this._gameBtn.setVisible(false);
    };
    AcThreeKingdomsHeroAttackView.prototype.btnAnim = function () {
        if (this._gameBtn) {
            egret.Tween.get(this._gameBtn).to({ scaleX: 0.9, scaleY: 0.9 }, 600).to({ scaleX: 1, scaleY: 1 }, 600).call(this.btnAnim, this);
        }
    };
    AcThreeKingdomsHeroAttackView.prototype.intoBossBattle = function (p) {
        var _this = this;
        if (p.data.ret == true) {
            this.atk = true;
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);
            this._info = p.data.data.data.bosshp;
            this._gameBtn.visible = false;
            this._autoBattleBtn.visible = false;
            this._isBattling = true;
            if (this._isAuto) {
                if (p.data.data.data.rewards && p.data.data.data.rewards != "") {
                    this._rewardsarr.push(p.data.data.data.rewards);
                }
                this._dps = p.data.data.data.damage;
                this._damageTotoal += p.data.data.data.damage;
                this.addTouchTap(function () {
                    if (_this._rewardsarr.length > 0) {
                        ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSHEROATTACKRESULTVIEW, {
                            damage: _this._damageTotoal,
                            rewards: _this._rewards,
                            aid: _this.aid,
                            code: _this.code,
                            iskill: _this._info <= 0,
                            rewardsarr: Api.chatVoApi.arr_clone(_this._rewardsarr),
                            isauto: true
                        });
                    }
                    _this._rewardsarr.length = 0;
                    _this.autoBattleClick();
                    _this._isAuto = false;
                    _this._damageTotoal = 0;
                    egret.Tween.removeTweens(_this);
                    if (_this._curKey) {
                        _this._gameBtn.setVisible(true);
                        _this._autoBattleBtn.setVisible(true);
                    }
                    else {
                        _this._gameBtn.setVisible(false);
                        _this._autoBattleBtn.setVisible(false);
                        _this._isPlayAni = false;
                    }
                    _this._autoBattleView.setVisible(false);
                    _this.removeTouchTap();
                }, this);
            }
            else {
                this._rewards = p.data.data.data.rewards;
                this._isAttackWin = true;
                this._dps = p.data.data.data.damage;
            }
            this.gameBegin();
        }
    };
    AcThreeKingdomsHeroAttackView.prototype.gameBegin = function () {
        this.attackHandle(1, this._dps);
    };
    AcThreeKingdomsHeroAttackView.prototype.attackHandle = function (area, damage, isCrit) {
        if (this._isMoving == true) {
            return;
        }
        this._isMoving = true;
        this._heroArray.length = 0;
        this._damage = damage;
        this._area = area;
        var offsetY;
        var moveY;
        var scaleTo = 0.75;
        var offsetX;
        if (area == 1) {
            this._heroArray = [this._downHero, this._upHero];
            offsetY = 50;
            moveY = this._upHero.y + 100;
            offsetX = offsetY * (this._downHero.x - this._upHero.x) / (this._downHero.y - this._upHero.y);
        }
        else {
            this._heroArray = [this._upHero, this._downHero];
            offsetY = -50;
            moveY = this._downHero.y - 100 + this._downHero.height * (1 - scaleTo);
            offsetX = offsetY * (this._downHero.x - this._upHero.x) / (this._downHero.y - this._upHero.y);
        }
        if (this.container.getChildIndex(this._heroArray[0]) < this.container.getChildIndex(this._heroArray[1])) {
            this.container.swapChildren(this._heroArray[0], this._heroArray[1]);
        }
        var critTime = 0;
        var moveTime1 = 60;
        var moveTime2 = 260;
        var moveTo = egret.Point.create(this._heroArray[1].x + (1 - scaleTo) * this._heroArray[0].width / 2, moveY);
        var scaleBig = 1.06;
        var moveFirst = egret.Point.create(this._heroArray[0].x - (scaleBig - 1) * this._heroArray[0].width / 2, this._heroArray[0].y - (scaleBig - 1) * this._heroArray[0].height / 2);
        //hero
        egret.Tween.get(this._heroArray[0]).wait(critTime).
            to({ y: this._heroArray[0].y + (area == 1 ? 20 : -20), }, 300).
            //to({x:moveFirst.x,y:moveFirst.y,alpha : 1,scaleX:scaleBig, scaleY:scaleBig},500).
            to({ y: moveTo.y }, moveTime1).
            //to({x:moveFirst.x+offsetX, y:moveFirst.y+offsetY},150).
            to({ y: this._heroArray[0].y }, moveTime2);
        TimerManager.doTimer(critTime + 300 + moveTime1, 1, this.showBeAttackAnim, this);
    };
    AcThreeKingdomsHeroAttackView.prototype.resetTopProgressAfterDamage = function () {
        var view = this;
        var blood = view.getTombBlood();
        this.setTopProgress(blood);
    };
    AcThreeKingdomsHeroAttackView.prototype.setTopProgress = function (value, maxValue, progressWidth, type) {
        if (type === void 0) { type = 1; }
        _super.prototype.setTopProgress.call(this, value, maxValue, progressWidth, type);
        if (this._info <= 0) {
            this._topProgress.setPercentage(1, LanguageManager.getlocal("prisonerInfinite"));
        }
        else {
            this._topProgress.setPercentage(value / this._topMaxValue, value.toString());
        }
    };
    AcThreeKingdomsHeroAttackView.prototype.showEndGame = function () {
        // 
    };
    AcThreeKingdomsHeroAttackView.prototype.atkEndCallback = function () {
        var _this = this;
        this._upHero.setScale(0.8);
        this._upHero.x = GameConfig.stageWidth / 2 - this._upHero.width * this._upHero.scaleX / 2;
        this._downHero.setScale(0.8);
        this._downHero.x = GameConfig.stageWidth / 2 - this._downHero.width * this._downHero.scaleX / 2;
        this._downHero.y = GameConfig.stageHeigth - this._downHero.height * this._downHero.scaleY - 100; //- this.getTitleButtomY();
        if (this._info <= 0) {
            //无限血神将特效
        }
        this._isBattling = false;
        this.closeBtn.setEnable(true);
        if (!this._isAuto) {
            if (this._curKey) {
                this.showGameBtn();
            }
            if (this._rewards && this._rewards != "") {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSHEROATTACKRESULTVIEW, {
                    damage: this._dps,
                    rewards: this._rewards,
                    aid: this.aid,
                    code: this.code,
                    iskill: this._info <= 0
                });
            }
        }
        this.resetTopKey();
        if (this._curKey) {
            var servant = Api.servantVoApi.getServantObj(this._curKey);
            var showeff1 = false;
            if (servant && servant.equip && servant.equip != "") {
                showeff1 = true;
            }
            this._downHero.resetHero(servant.fullImgPath, this._allServantInfo[this._curKey], showeff1);
            TimerManager.doTimer(100, 1, this.showGameBtn, this);
        }
        else {
            this._downHero.resetHero();
        }
        this._isPlayAni = false;
        if (this._isAuto) {
            egret.Tween.get(this).wait(1000).call(function () {
                _this.btnClick();
            }, this);
        }
    };
    AcThreeKingdomsHeroAttackView.prototype.showGameBtn = function () {
        if (this._gameBtn) {
            if (this._isBattling || this._isAuto) {
                this._autoBattleBtn.visible = this._gameBtn.visible = false;
            }
            else {
                this._gameBtn.visible = (this._curKey != null);
                this._autoBattleBtn.visible = this._gameBtn.visible;
            }
        }
    };
    AcThreeKingdomsHeroAttackView.prototype.hide = function () {
        if (Api.playerVoApi.getPlayerAllianceId() > 0 && this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        if (this.atk) {
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
            // 	activeId : this.vo.aidAndCode,
            // });	
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK, {
            // 	activeId : this.vo.aidAndCode,
            // });	
            this.atk = false;
        }
        _super.prototype.hide.call(this);
    };
    // private refresh():void{
    // 	let view = this;
    // 	view.resetTopKey();
    // 	if (this._curKey) {
    // 		let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this._curKey);	
    // 		let showeff1 = false;
    // 		if (servant && servant.equip && servant.equip != ""){
    // 			showeff1 = true;
    // 		}
    // 		this._downHero.resetHero(servant.fullImgPath,this._allServantInfo[this._curKey],showeff1);
    // 	}
    // 	else {
    // 		this._downHero.resetHero();
    // 	}
    // 	this.showGameBtn();
    // }
    AcThreeKingdomsHeroAttackView.prototype.update = function () {
        var view = this;
        // if(view.vo.getClickIdx() == 0){
        // }
    };
    AcThreeKingdomsHeroAttackView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_HERORECOVERY, this.refresh, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_THREEKINGDOMS_HEROATTACK), view.intoBossBattle, view);
        this._callbackF = null;
        this._obj = null;
        this._rewards = null;
        this._curKey = null;
        this._isBattling = false;
        this._gameBtn = null;
        this._isAttackWin = null;
        this._allServantInfo = null;
        this._dps = 0;
        this._exp = 0;
        this._isRefresh = false;
        this._bossInfoVoList = null;
        this.bottomBg = null;
        this._autoBattleView = null;
        this._isPlayAni = false;
        this._isAuto = false;
        this._isShowReard = false;
        this._rewardsarr.length = 0;
        this._damageTotoal = 0;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsHeroAttackView;
}(BaseBattleView));
__reflect(AcThreeKingdomsHeroAttackView.prototype, "AcThreeKingdomsHeroAttackView");
//# sourceMappingURL=AcThreeKingdomsHeroAttackView.js.map