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
var AcWipeBossBattleView = (function (_super) {
    __extends(AcWipeBossBattleView, _super);
    function AcWipeBossBattleView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._idx = null;
        _this._rewards = null;
        _this._curKey = null;
        _this._curValue = 0;
        _this._bossConfig = null;
        //门客战斗力
        _this._allServantInfo = null;
        _this._dps = 0;
        _this._exp = 0;
        //总血量
        _this._bossValue = 0;
        _this._heroValue = 0;
        _this._isBattling = false;
        _this._hasKill = 0; // 1--Boss已经被击杀
        _this._moreArrow = null;
        _this._isShowMore = false;
        _this.touchBoo = true;
        _this._nameTxt = null;
        _this._describeTxt = null;
        _this.moveContainer = null;
        _this._infoGroup = null;
        _this._currMaskBmp = null;
        _this._touchBg = null;
        _this.moreBg = null;
        _this.bottomBg = null;
        _this._isRefresh = false;
        _this._bossInfoVoList = [];
        _this._eliteidx = null;
        _this._eliteBossCfg = null;
        _this._upBf = null;
        _this.studyatk_upbg = null;
        _this.studyatk_uparrow = null;
        return _this;
    }
    AcWipeBossBattleView.prototype.getResourceList = function () {
        var tempArray = _super.prototype.getResourceList.call(this);
        return tempArray.concat([
            ButtonConst.BATTLE_START_BTN_1,
            "allianceboss_down", "progress8", "progress7_bg",
            "studyatk_upfnt", "studyatk_upbg", "studyatk_uparrow",
            "wipeboss" + this.param.data.foeId
        ]);
    };
    Object.defineProperty(AcWipeBossBattleView.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossBattleView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossBattleView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossBattleView.prototype.getBgName = function () {
        return "aobaibg2";
    };
    // 标题背景名称
    AcWipeBossBattleView.prototype.initTitle = function () {
        return null;
    };
    // 标题背景名称
    AcWipeBossBattleView.prototype.getTitleStr = function () {
        return null;
    };
    AcWipeBossBattleView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = 0;
        }
    };
    AcWipeBossBattleView.prototype.findBestServant = function (bossLife) {
        if (!bossLife) {
            bossLife = 0;
        }
        var servantId;
        var allKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
        var addV = this.vo.getMyAdd() / 100;
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
    //重置默认选中的门客 和 当前属性
    AcWipeBossBattleView.prototype.resetTopKey = function () {
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
        var blood = this.api.getWipeBlood(this._idx, this.param.data.bosskey);
        var curValue = blood == undefined ? (this._bossValue) : blood;
        var servantId = this.findBestServant(curValue);
        if (servantId && this.vo.getServantFightInfo(servantId) == 0) {
            this._curKey = servantId.toString();
            this._heroValue = this._allServantInfo[this._curKey];
        }
        //allKeys:string[] = Object.keys(this._allServantInfo);
        // allKeys.sort((a:string,b:string)=>{
        // 		let valueA:number = this.vo.getServantFightInfo(a);
        // 		let valueB:number = this.vo.getServantFightInfo(b);
        // 		if (valueA == valueB)
        // 		{
        // 			return Number(this._allServantInfo[b] - this._allServantInfo[a]);
        // 		}else
        // 		{
        // 			return Number(valueA - valueB);
        // 		}
        // 	});
        // if (this.vo.getServantFightInfo(allKeys[0]) == 0) {
        // 	this._curKey = allKeys[0];
        // 	this._heroValue = this._allServantInfo[this._curKey];
        // }
    };
    AcWipeBossBattleView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK), view.intoBossBattle, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH, view.update, view);
        var bottom = BaseBitmap.create("public_9_wordbg");
        bottom.height = 170;
        view.atk = false;
        // if (this.param.data && this.param.data.f && this.param.data.o)
        // {
        // 	this._obj = this.param.data.o;
        // 	this._callbackF = this.param.data.f;
        // }
        // if(this.param.data.eliteidx != null)
        // {
        // 	this._eliteidx = this.param.data.eliteidx;
        // 	this._eliteBossCfg = Config.AllianceelitebossCfg.getAllianceCfgByLv(this._eliteidx);
        // }
        // let downBg:BaseBitmap = BaseBitmap.create("allianceboss_down");
        // downBg.y = GameConfig.stageHeigth - this.getTitleButtomY() - downBg.height - 75;
        // this.addChildToContainer(downBg);
        view._idx = view.param.data.foeId;
        view._bossConfig = view.cfg.getBossNpcItemCfgById(view._idx);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
        // if (this.param.data && this.param.data.f && this.param.data.o)
        // {
        // 	this._obj = this.param.data.o;
        // 	this._callbackF = this.param.data.f;
        // }
        view._bossValue = view.vo.getWipeBossMaxHp(view._bossConfig.id);
        ;
        var blood = view.api.getWipeBlood(view._idx, view.param.data.bosskey);
        var curValue = blood == undefined ? (view._bossValue) : blood;
        this.resetTopKey();
        this.setTopProgress(curValue, view._bossValue, GameConfig.stageWidth, 2);
        this._topProgress.y = 0;
        var upHeroPic = view._bossConfig.npcPic;
        this.setUpHero(upHeroPic, null, 2);
        this._upHero.setScale(0.8);
        this._upHero.x = GameConfig.stageWidth / 2 - this._upHero.width * this._upHero.scaleX / 2;
        var downHeroPic = null;
        var downInfo = null;
        var showeff1 = false;
        if (this._curKey) {
            var addV_1 = 0;
            var addInfo = Api.allianceVoApi.getDecreePolicyAddAttrInfo();
            if (addInfo && addInfo.lastTimes > 0) {
                var addV_2 = Math.floor(Api.playerVoApi.getAtk() * addInfo.addExtent);
            }
            downHeroPic = Api.servantVoApi.getFullImgPathWithId(this._curKey); // "servant_full_"+this._curKey;
            var servant = Api.servantVoApi.getServantObj(this._curKey);
            if (servant && servant.equip && servant.equip != "") {
                showeff1 = true;
            }
            var power = this._allServantInfo[this._curKey] + addV_1;
            downInfo = [[LanguageManager.getlocal("fightForce") + ":" + power.toFixed(0), TextFieldConst.COLOR_LIGHT_YELLOW], [LanguageManager.getlocal("clickChooseServant")]];
        }
        else {
            downHeroPic = "servant_empty";
            downInfo = [["empty", TextFieldConst.COLOR_LIGHT_YELLOW], [LanguageManager.getlocal("clickChooseServant")]];
        }
        var maskbg = BaseBitmap.create("upheromask");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, maskbg, this._upHero, [0, 248]);
        this.addChildToContainer(maskbg);
        this.setDownHero(downHeroPic, downInfo, 2, showeff1);
        this._downHero.setScale(0.8);
        this._downHero.x = GameConfig.stageWidth / 2 - this._downHero.width * this._downHero.scaleX / 2;
        this._downHero.y = GameConfig.stageHeigth - this._downHero.height * this._downHero.scaleY - 100; //- this.getTitleButtomY();
        this._upPositon = egret.Point.create(this._upHero.x, this._upHero.y);
        this._downPositon = egret.Point.create(this._downHero.x, this._downHero.y);
        this._downHero.addTouchTap(this.clickChangeHero, this);
        //boss getBgName
        var tipBg = BaseBitmap.create("aobaibottom");
        tipBg.width = 200;
        this.addChildToContainer(tipBg);
        var id = this._eliteidx == null ? this._idx : this._eliteidx;
        var servantName = ComponentManager.getTextField(view._bossConfig.npcName, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        servantName.setPosition(GameConfig.stageWidth / 2 - servantName.width / 2, this._topProgress.y + 40);
        this.addChildToContainer(servantName);
        tipBg.setPosition(GameConfig.stageWidth / 2 - tipBg.width / 2, servantName.y + servantName.height / 2 - 15);
        // 开始游戏
        this._gameBtn = ComponentManager.getButton(ButtonConst.BATTLE_START_BTN_1, null, this.btnClick, this);
        this._gameBtn.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2 - 50);
        this._gameBtn.anchorOffsetX = this._gameBtn.width / 2;
        this._gameBtn.anchorOffsetY = this._gameBtn.height / 2;
        this.addChild(this._gameBtn);
        this.btnAnim();
        if (this._curKey == null) {
            this._gameBtn.visible = false;
        }
        bottom.y = GameConfig.stageHeigth - bottom.height;
        this.addChild(bottom);
        this.bottomBg = bottom;
        var shopBtn = ComponentManager.getButton('aobaishop', '', function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSSHOPVIEW, {
                aid: view.param.data.aid,
                code: view.param.data.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, shopBtn, bottom, [20, -shopBtn.height - 10]);
        view.addChild(shopBtn);
        var studyatk_upbg = BaseBitmap.create("studyatk_upbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, studyatk_upbg, shopBtn);
        view.addChild(studyatk_upbg);
        view.studyatk_upbg = studyatk_upbg;
        var studyatk_uparrow = BaseBitmap.create("studyatk_uparrow");
        studyatk_uparrow.x = studyatk_upbg.x + studyatk_upbg.width / 2 + 20;
        studyatk_uparrow.y = studyatk_upbg.y + studyatk_upbg.height / 2 - studyatk_uparrow.height / 2;
        view.addChild(studyatk_uparrow);
        view.studyatk_uparrow = studyatk_uparrow;
        var addV = view.vo.getMyAdd();
        var addvStr = addV.toFixed(0) + "%";
        var upBF = ComponentManager.getBitmapText(addvStr, "studyatk_upfnt");
        upBF.x = studyatk_uparrow.x - upBF.width - 5;
        upBF.y = studyatk_upbg.y + studyatk_upbg.height / 2 - upBF.height / 2;
        view._upBf = upBF;
        view.addChild(upBF);
        studyatk_upbg.touchEnabled = studyatk_uparrow.touchEnabled = upBF.touchEnabled = false;
        //this.requestGetBossLog();
        this._isRefresh = false;
        //App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE,this.requestGetBossLog,this);
        // let showMore:BaseButton = ComponentManager.getButton("arena_more",null,this.showMoreHandle,this);
        // showMore.setPosition(515,GameConfig.stageHeigth-52);
        // this.addChild(showMore);
        this._moreArrow = BaseBitmap.create("arena_arrow");
        this._moreArrow.alpha = 0;
        this._moreArrow.setPosition(480, 911);
        this.addChild(this._moreArrow);
        // this.refreshDecreeAtrr();
        var infoGroup = new BaseDisplayObjectContainer();
        infoGroup.width = 640;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoGroup, bottomBg, [0,45]);
        view.addChild(infoGroup);
        view._infoGroup = infoGroup;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, 140);
        infoGroup.y = 0;
        var scrollView = ComponentManager.getScrollView(infoGroup, rect);
        scrollView.y = bottom.y + 20;
        scrollView.horizontalScrollPolicy = "off";
        scrollView.bounces = false;
        view.addChild(scrollView);
        view.freshTxt();
        // let maskBmp = BaseBitmap.create("public_9_viewmask");
        // maskBmp.width = GameConfig.stageWidth;
        // maskBmp.height = scrollView.measuredHeight
        // infoGroup.addChild(maskBmp);
    };
    AcWipeBossBattleView.prototype.freshTxt = function () {
        var view = this;
        var scrollStart = 10;
        var arr = view.api.getWipeDamageInfo(view._idx, this.param.data.bosskey);
        view._infoGroup.removeChildren();
        if (arr.length) {
            for (var i in arr) {
                var unit = arr[i];
                var nameTxt = view._infoGroup.getChildByName("name" + unit.uid + i);
                var namestr = Number(i) + 1 + "." + unit.name;
                if (nameTxt) {
                    if (PlatformManager.checkIsEnLang()) {
                        nameTxt.text = namestr.length > 12 ? (namestr.substring(0, 12) + '...') : namestr;
                    }
                    else {
                        nameTxt.text = namestr.length > 6 ? (namestr.substring(0, 6) + '...') : namestr;
                    }
                }
                else {
                    var nameTxtStr = "";
                    if (PlatformManager.checkIsEnLang()) {
                        nameTxtStr = namestr.length > 12 ? (namestr.substring(0, 12) + '...') : namestr;
                    }
                    else {
                        nameTxtStr = namestr.length > 6 ? (namestr.substring(0, 6) + '...') : namestr;
                    }
                    nameTxt = ComponentManager.getTextField(nameTxtStr, 20);
                    nameTxt.width = 150;
                    nameTxt.name = "name" + unit.uid + i;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, view._infoGroup, [20, scrollStart], true);
                    view._infoGroup.addChild(nameTxt);
                }
                var scoreTxt = view._infoGroup.getChildByName("score" + unit.uid + i);
                if (scoreTxt) {
                    scoreTxt.text = LanguageManager.getlocal("acwipeBossAllDamgeDesc", [view._bossConfig.npcName, unit.score]);
                }
                else {
                    scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossAllDamgeDesc", [view._bossConfig.npcName, unit.score]), 20);
                    scoreTxt.name = "score" + unit.uid + i;
                    scoreTxt.textAlign = egret.HorizontalAlign.LEFT;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, nameTxt, [nameTxt.width + 100, 0]);
                    view._infoGroup.addChild(scoreTxt);
                }
                scrollStart += 30;
                if (unit.uid == Api.playerVoApi.getPlayerID()) {
                    nameTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
                }
            }
        }
        else {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNoData"), 20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view._infoGroup, [0, scrollStart + 20], true);
            view._infoGroup.addChild(tipTxt);
        }
        var maskBmp = BaseBitmap.create("public_9_viewmask");
        maskBmp.width = GameConfig.stageWidth;
        maskBmp.height = scrollStart;
        maskBmp.name = 'mask';
        maskBmp.alpha = 0;
        view._infoGroup.addChild(maskBmp);
    };
    // protected refreshDecreeAtrr()
    // {
    // 	let addInfo = Api.allianceVoApi.getDecreePolicyAddAttrInfo();
    //     if(addInfo)
    //     {
    //         if(!this._decreeAddTxt)
    //         {
    //             this._decreeAddTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_YELLOW2);
    //             this._decreeAddTxt.setPosition(GameConfig.stageWidth/2 ,this._moreArrow.y - 20 );
    //             this.addChild( this._decreeAddTxt);
    //         }
    //         if(addInfo.lastTimes > 0){
    // 			// let addV = ""+ Math.floor((addInfo.addExtent *100)+0.5);
    // 			let addV = (addInfo.addExtent *100).toFixed(1) + "%";
    //             this._decreeAddTxt.text = LanguageManager.getlocal(addInfo.strKey,[addInfo.strKey2,addV]);
    // 			this._decreeAddTxt.anchorOffsetX = this._decreeAddTxt.width/2;
    //         }else{
    //             this._decreeAddTxt.text = "";
    //         }
    //     }
    // }
    AcWipeBossBattleView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSHP, requestData: {
                activeId: view.vo.aidAndCode,
                bosstype: view.param.data.foeId,
                bosskey: view.param.data.bosskey,
            } };
    };
    AcWipeBossBattleView.prototype.receiveData = function (data) {
        var view = this;
        view.api.setBossInfo({
            bosstype: view.param.data.foeId,
            bosskey: view.param.data.bosskey,
            bosshp: Number(data.data.data.BossHp),
            damagelog: data.data.data.damagelog
        });
    };
    AcWipeBossBattleView.prototype.requestGetBossLog = function () {
        this._isRefresh = true;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG), this.showBossLog, this);
        if (this._eliteidx == null) {
            if (this._idx != null) {
                NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG, { "bossId": this._idx });
            }
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG, { "bossId": this._eliteidx });
        }
    };
    AcWipeBossBattleView.prototype.showBossLog = function (event) {
        if (!event.data.ret) {
            return;
        }
        var rdata = event.data.data;
        if (rdata.ret == 0) {
            this._bossInfoVoList = rdata.data.allianceBossLog;
            if (this._isRefresh) {
            }
            else {
                this.showText();
            }
        }
    };
    AcWipeBossBattleView.prototype.showMoreHandle = function () {
        if (this.touchBoo) {
            this._isShowMore = !this._isShowMore;
            if (this._isShowMore == true) {
                this._moreArrow.scaleY = -1;
                this._moreArrow.y += this._moreArrow.height;
                this.showList();
            }
            else {
                this._moreArrow.scaleY = 1;
                this._moreArrow.y -= this._moreArrow.height;
                this.closeList();
            }
        }
    };
    AcWipeBossBattleView.prototype.closeList = function () {
        this.touchBoo = false;
        if (this.moveContainer) {
            egret.Tween.get(this.moveContainer).to({ y: 1150 }, 500).call(function () {
                this.touchBoo = true;
                egret.Tween.removeTweens(this.moveContainer);
            }, this);
        }
        if (this._currMaskBmp && this._currMaskBmp.parent) {
            this._currMaskBmp.parent.removeChild(this._currMaskBmp);
            this._currMaskBmp.dispose();
            this._currMaskBmp = null;
        }
        if (this._touchBg && this._touchBg.parent) {
            this._touchBg.parent.removeChild(this._touchBg);
            this._touchBg.dispose();
            this._touchBg = null;
        }
    };
    AcWipeBossBattleView.prototype.clickChangeHero = function () {
        if (this._isBattling == true) {
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
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW, { type: ServantSelectedPopupView.TYPE_WIPEBOSS, "info": showTab, callback: this.sendRequest, handler: this, code: this.param.data.code });
    };
    AcWipeBossBattleView.prototype.sendRequest = function (params) {
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
        }
    };
    AcWipeBossBattleView.prototype.btnClick = function () {
        var bossId = this._eliteidx == null ? this._idx : this._eliteidx;
        // if( this._eliteidx == null)
        // {
        // 	NetManager.request(NetRequestConst.REQUEST_ALLIANCE_ATTACK,{"servantId":this._curKey,"bossId":this._idx});
        // }
        // else
        // {
        // 	NetManager.request(NetRequestConst.REQUEST_ALLIANCE_ATTACK,{"servantId":this._curKey,"bossId":this._eliteidx,elite:1});
        // }
        var view = this;
        if (!view.vo.isInTansuoTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            view.hide();
            return;
        }
        if (!view.vo.isInFightTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc6"));
            view.hide();
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK, {
            activeId: this.vo.aidAndCode,
            bosstype: this.param.data.foeId,
            bosskey: this.param.data.bosskey,
            servantId: this._curKey
        });
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK, {
        // 	activeId : view.vo.aidAndCode,
        // 	bosstype : resultInfo.type,
        // 	bosskey : view.param.data.bosskey
        // });
        //test code
    };
    AcWipeBossBattleView.prototype.btnAnim = function () {
        if (this._gameBtn) {
            egret.Tween.get(this._gameBtn).to({ scaleX: 0.9, scaleY: 0.9 }, 600).to({ scaleX: 1, scaleY: 1 }, 600).call(this.btnAnim, this);
        }
    };
    AcWipeBossBattleView.prototype.intoBossBattle = function (p) {
        if (p.data.ret == true) {
            this.atk = true;
            this.api.setBossInfo({
                bosstype: this.param.data.foeId,
                bosskey: this.param.data.bosskey,
                bosshp: p.data.data.data.bosshp,
                damagelog: p.data.data.data.damagelog
            });
            this.freshTxt();
            //this.refreshDecreeAtrr();
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);
            this._hasKill = p.data.data.data.hasKill;
            if (this._hasKill == 1) {
                ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSATTACKEDPOPUPVIEW, { type: 3, index: this._idx, damage: this._dps, exp: this._exp, rewards: this._rewards, f: this.hide, o: this, aid: this.param.data.aid, code: this.param.data.code });
                return;
            }
            this._rewards = p.data.data.data.rewards;
            this._isAttackWin = p.data.data.data.killFlag;
            this._dps = p.data.data.data.damage;
            this._exp = p.data.data.data.score;
            this._isBattling = true;
            this._gameBtn.visible = false;
            this.gameBegin();
        }
    };
    AcWipeBossBattleView.prototype.gameBegin = function () {
        this.attackHandle(1, this._dps);
    };
    AcWipeBossBattleView.prototype.attackHandle = function (area, damage, isCrit) {
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
    AcWipeBossBattleView.prototype.setTopProgress = function (value, maxValue, progressWidth, type) {
        if (type === void 0) { type = 1; }
        _super.prototype.setTopProgress.call(this, value, maxValue, progressWidth, type);
        this._topProgress.setPercentage(this._topCurValue / this._topMaxValue, this._topCurValue.toString());
    };
    AcWipeBossBattleView.prototype.showEndGame = function () {
        // 
    };
    AcWipeBossBattleView.prototype.atkEndCallback = function () {
        this._upHero.setScale(0.8);
        this._upHero.x = GameConfig.stageWidth / 2 - this._upHero.width * this._upHero.scaleX / 2;
        this._downHero.setScale(0.8);
        this._downHero.x = GameConfig.stageWidth / 2 - this._downHero.width * this._downHero.scaleX / 2;
        this._downHero.y = GameConfig.stageHeigth - this._downHero.height * this._downHero.scaleY - 100; //- this.getTitleButtomY();
        if (this._isAttackWin) {
            var index = null;
            if (this._eliteidx == null) {
                index = this._idx;
            }
            else {
                index = this._eliteidx;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSATTACKEDPOPUPVIEW, { type: 1, index: index, damage: this._dps, exp: this._exp, rewards: this._rewards, f: this.hide, o: this, aid: this.param.data.aid, code: this.param.data.code });
        }
        else {
            var index = null;
            if (this._eliteidx == null) {
                index = this._idx;
            }
            else {
                index = this._eliteidx;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSATTACKEDPOPUPVIEW, { type: 2, index: index, damage: this._dps, exp: this._exp, aid: this.param.data.aid, code: this.param.data.code });
            this._isBattling = false;
            this.closeBtn.setEnable(true);
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
        }
        //刷新boss攻打纪录
        if (this._isRefresh) {
            this.refreshText();
        }
    };
    AcWipeBossBattleView.prototype.showGameBtn = function () {
        if (this._gameBtn) {
            this._gameBtn.visible = (this._curKey != null);
        }
    };
    AcWipeBossBattleView.prototype.hide = function () {
        if (Api.playerVoApi.getPlayerAllianceId() > 0 && this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        if (this.atk) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
                activeId: this.vo.aidAndCode,
            });
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK, {
                activeId: this.vo.aidAndCode,
            });
            this.atk = false;
        }
        _super.prototype.hide.call(this);
    };
    AcWipeBossBattleView.prototype.showList = function () {
        this.moveContainer = new BaseDisplayObjectContainer();
        this.addChild(this.moveContainer);
        this.moreBg = BaseBitmap.create("arena_bottom_bg");
        this.moreBg.width = 640;
        this.moreBg.height = GameConfig.stageHeigth - 330;
        this.moveContainer.addChild(this.moreBg);
        this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
        this._currMaskBmp.width = GameConfig.stageWidth;
        this._currMaskBmp.height = GameConfig.stageHeigth;
        this._currMaskBmp.touchEnabled = true;
        this.addChild(this._currMaskBmp);
        this.setChildIndex(this._currMaskBmp, this.getChildIndex(this._gameBtn));
        // 增加 点击区域
        this._touchBg = BaseBitmap.create("public_9_bg25");
        this._touchBg.width = 640;
        this._touchBg.height = 260;
        this._touchBg.x = 0;
        this._touchBg.y = -240;
        this._touchBg.alpha = 0;
        this._touchBg.addTouchTap(this.showMoreHandle, this);
        this.moveContainer.addChild(this._touchBg);
        if (this._bossInfoVoList && this._bossInfoVoList.length > 0) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 10, 640, GameConfig.stageHeigth - 340);
            this._scrollList = ComponentManager.getScrollList(AllianceBossMoreItem, this._bossInfoVoList, rect);
            this.moveContainer.addChild(this._scrollList);
            this._scrollList.y = 5;
        }
        else {
            var atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
            atkracedes3.x = 250;
            atkracedes3.y = 300;
            this.moveContainer.addChild(atkracedes3);
        }
        this.moveContainer.y = 1150;
        this.touchBoo = false;
        egret.Tween.get(this.moveContainer).to({ y: 260 }, 500).call(function () {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo = true;
        }, this);
    };
    AcWipeBossBattleView.prototype.showText = function () {
        if (this._bossInfoVoList && this._bossInfoVoList.length >= 1) {
            //名称  
            var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            nameTxt.text = this._bossInfoVoList[0].name;
            nameTxt.x = 20;
            nameTxt.y = GameConfig.stageHeigth - 67;
            this.addChild(nameTxt);
            this._nameTxt = nameTxt;
            var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            var _name = Config.ServantCfg.getServantItemById(this._bossInfoVoList[0].servantId).name;
            var str = LanguageManager.getlocal("alliancelogdes13", [_name, this._bossInfoVoList[0].dps]);
            describeTxt.x = 20;
            describeTxt.y = GameConfig.stageHeigth - 40;
            describeTxt.height = 16;
            describeTxt.text = str;
            this._describeTxt = describeTxt;
            this.addChild(describeTxt);
        }
    };
    AcWipeBossBattleView.prototype.refreshText = function () {
        if (this._nameTxt && this._bossInfoVoList.length > 1 && this._describeTxt) {
            this._nameTxt.text = this._bossInfoVoList[0].name;
            var _name = Config.ServantCfg.getServantItemById(this._bossInfoVoList[0].servantId).name;
            this._describeTxt.text = LanguageManager.getlocal("alliancelogdes13", [_name, this._bossInfoVoList[0].dps]);
        }
        else {
            this.showText();
        }
    };
    AcWipeBossBattleView.prototype.update = function () {
        var view = this;
        if (view.api.getClickType() == 'b') {
            return;
        }
        if (view.api.getClickIdx() == 0) {
            var addV = view.vo.getMyAdd();
            var addvStr = addV.toFixed(0) + "%";
            view._upBf.text = addvStr;
            view._upBf.x = view.studyatk_uparrow.x - view._upBf.width - 5;
            view._upBf.y = view.studyatk_upbg.y + view.studyatk_upbg.height / 2 - view._upBf.height / 2;
            // view.resetTopKey();
            // if (this._curKey) {
            // 	let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this._curKey);
            // 	this._downHero.resetHero(servant.fullImgPath,this._allServantInfo[this._curKey]);
            // }
            // else {
            // 	this._downHero.resetHero();
            // }
        }
    };
    AcWipeBossBattleView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH, view.update, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK), view.intoBossBattle, view);
        this._bossConfig = null;
        this._callbackF = null;
        this._obj = null;
        this._rewards = null;
        this._curKey = null;
        this._isBattling = false;
        this._gameBtn = null;
        this._isAttackWin = null;
        this._allServantInfo = null;
        this._dps = 0;
        this._idx = null;
        this._exp = 0;
        this._hasKill = 0;
        this._isRefresh = false;
        this._bossInfoVoList = null;
        this.bottomBg = null;
        this._moreArrow = null;
        this._isShowMore = false;
        this.touchBoo = true;
        this._nameTxt = null;
        this._describeTxt = null;
        this.moveContainer = null;
        this._currMaskBmp = null;
        this._scrollList = null;
        this.moreBg = null;
        this._eliteidx = null;
        this._eliteBossCfg = null;
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossBattleView;
}(BaseBattleView));
__reflect(AcWipeBossBattleView.prototype, "AcWipeBossBattleView");
//# sourceMappingURL=AcWipeBossBattleView.js.map