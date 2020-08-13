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
var SearchView = (function (_super) {
    __extends(SearchView, _super);
    function SearchView() {
        var _this = _super.call(this) || this;
        _this._npcList = [];
        _this._isbgResLoaded = false;
        _this._isCfgInit = false;
        _this.buildBgCfg = {};
        _this.cheCfg = [];
        _this.posCfg = {};
        _this.namePosCfg = {};
        _this._oneKeySearchStatus = false; //这个不需要关闭清除
        _this._mainTaskHandKey1 = null;
        _this._mainTaskHandKey2 = null;
        _this._tipTipTimeOut = -1;
        return _this;
    }
    SearchView.prototype.initCfg = function () {
        if (this._isCfgInit == false) {
            var curCfg = Config.SceneCfg.getSceneCfgBySceneName("searchScene");
            this._isCfgInit = true;
            if (curCfg) {
                if (curCfg.posCfg) {
                    this.posCfg = curCfg.posCfg;
                }
                if (curCfg.namePosCfg) {
                    this.namePosCfg = curCfg.namePosCfg;
                }
                if (curCfg.cheCfg) {
                    this.cheCfg = curCfg.cheCfg;
                }
                if (curCfg.buildBgCfg) {
                    this.buildBgCfg = curCfg.buildBgCfg;
                }
            }
        }
    };
    SearchView.prototype.showTopEnterAni = function (aniNode, startY, endY) {
        if (startY === void 0) { startY = 0; }
        if (endY === void 0) { endY = 0; }
        if (!Api.switchVoApi.checkOpenGooutAni()) {
            return;
        }
        var waitT = 50;
        aniNode.y = startY;
        aniNode.alpha = 0;
        egret.Tween.get(aniNode, { loop: false }).wait(waitT).to({ y: endY, alpha: 1.0 }, 300, egret.Ease.sineOut);
    };
    SearchView.prototype.initView = function () {
        this.initCfg();
        Api.rookieVoApi.checkNextStep();
        Api.mainTaskVoApi.checkShowGuide();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SEARCH, this.refreshByModel, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        this.container.y = 0;
        var sceneTopSpaceY = 105;
        this._sceneLayer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._sceneLayer);
        this.initScrollBgs();
        var playerInfo = new MainUINewTop({ showName: false });
        playerInfo.y = this.getTitleButtomY();
        this.addChildToContainer(playerInfo);
        var deltaY = playerInfo.y;
        // playerInfo.showEnterAni(true,deltaY);
        this._btmcontaimer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._btmcontaimer);
        var buttomBg = BaseBitmap.create("public_bottombg1");
        // buttomBg.width=GameConfig.stageWidth;
        buttomBg.height = 120;
        buttomBg.touchEnabled = true;
        buttomBg.setPosition(0, GameConfig.stageHeigth - this.container.y - buttomBg.height);
        this._btmcontaimer.addChild(buttomBg);
        var luckText = ComponentManager.getTextField(LanguageManager.getlocal("searchLuck") + LanguageManager.getlocal("syscolonDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        luckText.setPosition(20, buttomBg.y + 75);
        this._btmcontaimer.addChild(luckText);
        var luckProgress = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 300);
        luckProgress.setPosition(luckText.x + luckText.width, luckText.y + (luckText.height - luckProgress.height) / 2);
        this._btmcontaimer.addChild(luckProgress);
        luckProgress.setTextColor(TextFieldConst.COLOR_WARN_YELLOW_NEW);
        var value = Api.searchVoApi.getCurLuckNum() / Api.searchVoApi.getMaxLuckNum();
        luckProgress.setPercentage(value, Api.searchVoApi.getCurLuckNum() + "/" + Api.searchVoApi.getMaxLuckNum());
        this._luckProgress = luckProgress;
        var addLuckBtn = ComponentManager.getButton("btn_jia", "", this.openLuckView, this);
        addLuckBtn.setPosition(luckProgress.x + luckProgress.width + 5, luckProgress.y + (luckProgress.height - addLuckBtn.height) / 2);
        this._btmcontaimer.addChild(addLuckBtn);
        var leftText = ComponentManager.getTextField(Api.searchVoApi.getSearchNumLocalStr(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        leftText.setPosition(luckText.x, buttomBg.y + 25);
        this._btmcontaimer.addChild(leftText);
        this._leftText = leftText;
        if (!Api.searchVoApi.checkOneKey()) {
            var oneKeyTxt = ComponentManager.getTextField(LanguageManager.getlocal("searchLuckUnlockDesc", [Api.searchVoApi.getOneKeyNeedVipLevel().toString()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
            oneKeyTxt.setPosition(luckProgress.x + luckProgress.width / 2 + 100, leftText.y);
            oneKeyTxt.name = "onekeyTxt";
            this._btmcontaimer.addChild(oneKeyTxt);
            if (PlatformManager.checkIsWxCfg()) {
                var needVip = Api.vipVoApi.getNeedVip("searchUnlock");
                oneKeyTxt.text = LanguageManager.getlocal("searchLuckUnlockDesc", [needVip + ""]);
            }
            App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkOnekeySearchHandler, this);
        }
        else {
            var checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("searchOneKeyDesc"));
            checkBox.setPosition(250 + luckProgress.x + luckProgress.width / 2, leftText.y + (leftText.height - checkBox.height) / 2);
            checkBox.name = "onekeyCheckBox";
            this._btmcontaimer.addChild(checkBox);
            checkBox.setSelected(this._oneKeySearchStatus);
            this._checkBox = checkBox;
        }
        var searchBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, this.getTitleStr(), this.lookforHandler, this);
        searchBtn.setPosition(GameConfig.stageWidth - searchBtn.width - 32, App.CommonUtil.getCenterY(buttomBg, searchBtn, false) + 25);
        this._btmcontaimer.addChild(searchBtn);
        this._searchBtn = searchBtn;
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_ORANGE, "recoverLeftBtn", this.recoverLeftHandler, this);
        buyBtn.setPosition(searchBtn.x, searchBtn.y);
        this._btmcontaimer.addChild(buyBtn);
        this._buyBtn = buyBtn;
        if (Api.searchVoApi.getSearchNum() > 0) {
            searchBtn.visible = true;
            buyBtn.visible = false;
        }
        else {
            searchBtn.visible = false;
            buyBtn.visible = true;
        }
        this._mainTaskHandKey1 = App.MainTaskHandUtil.addHandNode(searchBtn, searchBtn.width / 2, 0, [searchBtn], 109, false, function () {
            return true;
        }, this);
        this._mainTaskHandKey2 = App.MainTaskHandUtil.addHandNode(buyBtn, buyBtn.width / 2, 0, [buyBtn], 109, true, function () {
            return true;
        }, this);
        var sceneButtomSpaceY = buttomBg.height;
        if (!this._sceneLayer) {
            this._sceneLayer = new BaseDisplayObjectContainer();
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - this.container.y - sceneTopSpaceY - sceneButtomSpaceY);
        /*	寻访场景下雪
        if(App.CommonUtil.check_dragon())
        {
            if(!this._snowBoneNode){
                this._snowBoneNode=App.DragonBonesUtil.getLoadDragonBones("xuehuapiaopiao");//xuehua_piaopiao actigertrappass
                
                this._snowBoneNode.x = GameConfig.stageWidth/2 + 40;
                this._snowBoneNode.y = 260;
            
                this._sceneLayer.addChild(this._snowBoneNode);
            }

        }
        */
        // this._sceneLayer.y=GameConfig.stageHeigth-this._sceneLayer.height-this.container.y;
        this.initNPC();
        this._sceneLayer.addTouch(this.onNPCTouchHandler, this, null, true);
        // this._bgResGroupName = ResourceManager.loadResources(["search_che","searchbuildbg1","searchbuildbg2","searchbuildbg3"],[],this.cheLoadCompleteHandler,null,this);
        this.showTopEnterAni(this.titleBg, -this.titleBg.height, this.titleBg.y);
        this.showTopEnterAni(this.titleTF, this.titleTF.y - this.titleBg.height, this.titleTF.y);
        this.showTopEnterAni(playerInfo, playerInfo.y - this.titleBg.height, playerInfo.y);
        this.showTopEnterAni(this.closeBtn, this.closeBtn.y - this.titleBg.height, this.closeBtn.y);
        // this._btmcontaimer.y = buttomBg.height;// + 110;
        // egret.Tween.get(this._btmcontaimer,{loop:false}).wait(150).to({y:0,alpha:1.0},300,egret.Ease.sineOut);
    };
    SearchView.prototype.isShowTitleBgShadow = function () {
        return false;
    };
    SearchView.prototype.initScrollBgs = function () {
        // if(!this._skyLayer)
        // {
        // 	this._skyLayer=BaseBitmap.create(thisClassName+"sky");
        // 	this._skyLayer.name="sky";
        // 	this._sceneLayer.addChild(this._skyLayer);
        // }
        var _this = this;
        this._mapLayer1 = BaseBitmap.create("search_bg_1");
        this._mapLayer1.y = GameConfig.stageHeigth - this._mapLayer1.height;
        this._mapLayer2 = BaseBitmap.create("search_bg_2");
        // this._mapLayer2.y = GameConfig.stageHeigth-this._mapLayer2.height;
        this._mapLayer3 = BaseBitmap.create("search_bg_3");
        // this._mapLayer3.y = GameConfig.stageHeigth -this._mapLayer3.height;
        this._mapLayer4 = BaseBitmap.create("search_bg_4");
        // this._mapLayer4.y = GameConfig.stageHeigth -this._mapLayer4.height;
        this._mapCloudNode = new BaseDisplayObjectContainer();
        this._mapCloudNode.width = this._mapLayer1.width;
        this._mapClooud = BaseBitmap.create("searchnpc_cloud");
        this._mapClooud.x = -this._mapClooud.width; //this._mapLayer1.width;
        this._mapClooud.y = 200;
        this._mapCloudNode.addChild(this._mapClooud);
        egret.Tween.get(this._mapClooud, { loop: true }).to({ x: this._mapLayer1.width }, 120000).wait(500).set({ x: -this._mapClooud.width });
        if (this._mapLayer4) {
            this._sceneLayer.addChild(this._mapLayer4);
        }
        if (this._mapLayer3) {
            this._sceneLayer.addChild(this._mapLayer3);
        }
        if (this._mapLayer2) {
            this._sceneLayer.addChild(this._mapLayer2);
        }
        if (this._mapCloudNode) {
            this._sceneLayer.addChild(this._mapCloudNode);
        }
        if (this._mapLayer1) {
            this._sceneLayer.addChild(this._mapLayer1);
        }
        this._sceneLayer.width = this._mapLayer1.width;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 1136);
        var scrollView = ComponentManager.getScrollView(this._sceneLayer, rect);
        scrollView.horizontalScrollPolicy = "on";
        scrollView.verticalScrollPolicy = "off";
        scrollView.bounces = false;
        scrollView.addEventListener(egret.Event.CHANGE, function () {
            // this._mapLayer1.x = (this._mapLayer1.width - this._mapLayer1.width) * (scrollView.scrollLeft / (this._mapLayer1.width - GameConfig.stageWidth));
            _this._mapLayer2.x = (_this._mapLayer1.width - _this._mapLayer2.width) * (scrollView.scrollLeft / (_this._mapLayer1.width - GameConfig.stageWidth));
            _this._mapLayer3.x = (_this._mapLayer1.width - _this._mapLayer3.width) * (scrollView.scrollLeft / (_this._mapLayer1.width - GameConfig.stageWidth));
            _this._mapLayer4.x = (_this._mapLayer1.width - _this._mapLayer4.width) * (scrollView.scrollLeft / (_this._mapLayer1.width - GameConfig.stageWidth));
            _this._mapCloudNode.x = (_this._mapLayer1.width - _this._mapCloudNode.width) * (scrollView.scrollLeft / (_this._mapLayer1.width - GameConfig.stageWidth));
        }, this);
        scrollView.y = -this.container.y;
        this.container.addChildAt(scrollView, 1);
        this._sceneScroll = scrollView;
    };
    SearchView.prototype.refreshByModel = function () {
        if (this._luckProgress) {
            var value = Api.searchVoApi.getCurLuckNum() / Api.searchVoApi.getMaxLuckNum();
            this._luckProgress.setPercentage(value, Api.searchVoApi.getCurLuckNum() + "/" + Api.searchVoApi.getMaxLuckNum());
        }
    };
    SearchView.prototype.checkOnekeySearchHandler = function () {
        if (Api.searchVoApi.checkOneKey()) {
            if (this.container) {
                var onekeyTxt = this.container.getChildByName("onekeyTxt");
                if (onekeyTxt) {
                    onekeyTxt.dispose();
                }
                if (!this._checkBox) {
                    var checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("searchOneKeyDesc"));
                    checkBox.setPosition(100 + this._luckProgress.x + this._luckProgress.width / 2, this._leftText.y + (this._leftText.height - checkBox.height) / 2);
                    checkBox.name = "onekeyCheckBox";
                    this.addChildToContainer(checkBox);
                    checkBox.setSelected(this._oneKeySearchStatus);
                    this._checkBox = checkBox;
                }
                App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkOnekeySearchHandler, this);
            }
        }
    };
    SearchView.prototype.cheLoadCompleteHandler = function () {
        this._isbgResLoaded = true;
        // let che:CustomMovieClip=ComponentManager.getCustomMovieClip("search_che",6,100);
        // this._sceneLayer.addChildAt(che,this._sceneLayer.getChildIndex(this._mapLayer)+1);
        // che.setPosition(this._mapLayer.x+this.cheCfg[0].x,this._mapLayer.y+this.cheCfg[0].y);
        // let time=9000;
        // egret.Tween.get(che,{loop:true}).call(function(che:CustomMovieClip){che.scaleX=1},this,[che]).to({x:this._mapLayer.x+this.cheCfg[1].x,y:this._mapLayer.y+this.cheCfg[1].y},time).call(function(che:CustomMovieClip){che.scaleX=-1},this,[che]).to({x:this._mapLayer.x+this.cheCfg[2].x,y:this._mapLayer.y+this.cheCfg[2].y},time).wait(1000);
        // che.texture=ResourceManager.getRes("search_che1");
        // che.anchorOffsetX=che.width/2;
        // che.anchorOffsetY=che.height/2;
        // che.play();
        // let cheIndex:number=this._sceneLayer.getChildIndex(che)+1;
        // for(let key in this.buildBgCfg)
        // {
        // 	let bmp:BaseLoadBitmap=BaseLoadBitmap.create("searchbuildbg"+key);
        // 	bmp.setPosition(this._mapLayer.x+this.buildBgCfg[key].x,this._mapLayer.y+this.buildBgCfg[key].y);
        // 	this._sceneLayer.addChildAt(bmp,cheIndex);
        // 	// 524,141
        // }
    };
    SearchView.prototype.initNPC = function () {
        var _this = this;
        var deltaY = this._mapLayer1.y;
        for (var key in this.posCfg) {
            var _a = this.posCfg[key], x = _a.x, y = _a.y, scale = _a.scale, close_1 = _a.close, alpha = _a.alpha;
            this._npcList.push(key);
            var npc = undefined;
            npc = BaseLoadBitmap.create("searchnpc" + key);
            npc.name = key;
            // npc.addTouch(this.touchNpcHandler,this,[key]);
            if (!isNaN(scale)) {
                npc.setScale(scale);
            }
            if (!isNaN(alpha)) {
                npc.alpha = alpha;
            }
            npc.setPosition(this._mapLayer1.x + x, this._mapLayer1.y + y);
            this._sceneLayer.addChild(npc);
            if (key == "3") {
                var changeDbone = App.DragonBonesUtil.getLoadDragonBones("xunfangpiaodai");
                var deltaS = 1.0;
                // changeDbone.setScale(deltaS);
                // changeDbone.anchorOffsetY = changeDbone.height * deltaS;
                // changeDbone.anchorOffsetX = changeDbone.width/2 * deltaS;
                // changeDbone.x = GameConfig.stageWidth/2;
                changeDbone.x = npc.x + 3;
                changeDbone.y = npc.y + 800 - 5;
                // this._sceneLayer.addChild(changeDbone);
                this._sceneLayer.addChild(changeDbone);
            }
        }
        var _loop_1 = function () {
            var _a = this_1.namePosCfg[key], x = _a.x, y = _a.y, scale = _a.scale, close_2 = _a.close;
            // this._npcList.push(key);
            var npcName = undefined;
            npcName = BaseLoadBitmap.create("searchnpcname" + key);
            npcName.name = key + "name";
            this_1._npcList.push(npcName.name);
            npcName.setPosition(this_1._mapLayer1.x + x, this_1._mapLayer1.y + y);
            if (scale) {
                npcName.setScale(scale);
            }
            this_1._sceneLayer.addChild(npcName);
            if (close_2) {
                App.DisplayUtil.changeToGray(npcName);
            }
            else {
                var nameY_1 = npcName.y;
                var moveCall_1 = function () {
                    egret.Tween.get(npcName).to({ y: nameY_1 + 5 }, 1000).to({ y: nameY_1 - 5 }, 1000).call(moveCall_1, _this);
                };
                moveCall_1();
            }
        };
        var this_1 = this;
        for (var key in this.namePosCfg) {
            _loop_1();
        }
        // this._sceneLayer.touchEnabled=true;
        var ths = this;
    };
    SearchView.prototype.recoverLeftHandler = function () {
        var itemId = Api.searchVoApi.getNeedItem();
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
        // if(hasNum>0)
        // {
        // ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{itemId:itemId,callback:this.usePropHandler,handler:this});
        var itemUseCount = 1;
        var itemCount = hasNum;
        // let itemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(Config.ChildbaseCfg.needItem));
        // let itemName = Config.ItemCfg.getItemNameById(Config.ChildbaseCfg.needItem)
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
        var message = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x" + itemUseCount, LanguageManager.getlocal("sysStrengDesc")]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.usePropHandler, handler: this, icon: itemCfg.icon, iconBg: itemCfg.iconBg, num: itemCount, useNum: itemUseCount, msg: message, id: Number(itemId) });
        // }
        // else
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
        // }
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
        this._mainTaskHandKey1 = null;
    };
    SearchView.prototype.usePropHandler = function (num) {
        var itemId = Api.searchVoApi.getNeedItem();
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
        if (hasNum > 0) {
            this.request(NetRequestConst.REQUEST_SEARCH_PILL, {});
        }
    };
    SearchView.prototype.onNPCTouchHandler = function (e) {
        if (e.type != egret.TouchEvent.TOUCH_BEGIN && e.type != egret.TouchEvent.TOUCH_CANCEL && e.type != egret.TouchEvent.TOUCH_END) {
            return;
        }
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            var hitKey = null;
            for (var key in this._npcList) {
                var b = this._sceneLayer.getChildByName(this._npcList[key]);
                var p = this._sceneLayer.globalToLocal(e.stageX, e.stageY);
                var hitMaxY = -9999;
                var ofp = this._sceneLayer.localToGlobal(0, 0);
                if (b.hitTestPoint(Math.floor(e.localX + ofp.x), Math.floor(e.localY + ofp.y + GameData.layerPosY), GameData.isSupportHitTestPoint)) {
                    //处理点击逻辑
                    // alert(this._npcList[key]);
                    if (b.y > hitMaxY) {
                        hitMaxY = b.y;
                        hitKey = this._npcList[key];
                    }
                }
            }
            var clickNpc = null;
            if (hitKey) {
                if (hitKey.indexOf("name") > -1) {
                    hitKey = hitKey.substring(0, hitKey.indexOf("name"));
                }
                this._clickNpc = this._sceneLayer.getChildByName(hitKey);
            }
        }
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            if (this._clickNpc) {
                if (this.posCfg[this._clickNpc.name].touchDown === false) { }
                else {
                    this._clickNpc.alpha = 0.5;
                }
            }
        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            if (this._clickNpc) {
                if (this.posCfg[this._clickNpc.name].touchDown === false) { }
                else {
                    this._clickNpc.alpha = 0;
                }
                this._clickNpc = null;
            }
        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            if (this._clickNpc) {
                if (this._clickNpc) {
                    if (this.posCfg[this._clickNpc.name].touchDown === false) { }
                    else {
                        this._clickNpc.alpha = 0;
                    }
                }
                var hitKey = this._clickNpc.name;
                if (hitKey) {
                    if (this.posCfg[hitKey].close) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
                    }
                    else {
                        ViewController.getInstance().openView(ViewConst.POPUP.SEARCHBUILDPOPUPVIEW, hitKey);
                    }
                }
                this._clickNpc = null;
            }
        }
    };
    SearchView.prototype.lookforHandler = function () {
        Api.rookieVoApi.checkNextStep();
        var isbatch = 0;
        if (this._checkBox) {
            this._oneKeySearchStatus = this._checkBox.checkSelected();
        }
        if (Api.searchVoApi.checkOneKey() && this._oneKeySearchStatus) {
            isbatch = 1;
        }
        this.request(NetRequestConst.REQUEST_SEARCH_PLAY, { isbatch: isbatch });
    };
    SearchView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (rData.cmd == NetRequestConst.REQUEST_SEARCH_PLAY) {
            var personIds = rData.data.personId;
            if (personIds.length > 1) {
                this._rewards = rData.data.rewards;
                var rewardStrArr = this._rewards ? this._rewards.split("|") : [];
                if (rewardStrArr.length < 1) {
                    for (var ii = 0; ii < personIds.length; ii++) {
                        rewardStrArr.push("");
                    }
                }
                var l = rewardStrArr.length;
                var rewardsShowArr = [];
                for (var i = 0; i < l; i++) {
                    if (rewardStrArr[i] == "") {
                        var localStr = Api.searchVoApi.getPersonValueLocalStr(personIds[i]);
                        if (localStr) {
                            rewardsShowArr.push(App.StringUtil.formatStringColor(localStr, TextFieldConst.COLOR_WARN_YELLOW));
                        }
                    }
                    else {
                        if (rewardStrArr[i].indexOf(RewardItemConst.TYPE_INTIMACY.toString()) == 0) {
                            var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(personIds[i]);
                            if (itemCfg && itemCfg.wifeId) {
                                rewardsShowArr.push(App.StringUtil.formatStringColor(Config.WifeCfg.getWifeCfgById(itemCfg.wifeId).name + GameData.formatRewardItem(rewardStrArr[i])[0].message, TextFieldConst.COLOR_WARN_GREEN));
                            }
                        }
                        else {
                            var rewardItem = GameData.formatRewardItem(rewardStrArr[i])[0];
                            if (!rewardItem.num) {
                                var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(personIds[i]);
                                rewardsShowArr.push(LanguageManager.getlocal("searchBuildTalk" + itemCfg.build));
                            }
                            else {
                                rewardsShowArr.push(rewardItem.message);
                            }
                        }
                    }
                }
                this.playRewardTip(rewardsShowArr);
                //手动调用体力限时礼包强弹  一键寻访
                Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.POWER_EMPTY);
                Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.POWER_EMPTY2);
            }
            else {
                this._personId = rData.data.personId[0];
                this._rewards = rData.data.rewards;
                // this._scrollView.addEventListener(egret.Event.COMPLETE,this.moveCompleteHandler,this);
                this.container.touchChildren = false;
                var buildId = Config.SearchCfg.getPersonItemCfgByPersonId(this._personId).build;
                var build = this._sceneLayer.getChildByName(String(buildId));
                var _a = this.posCfg[buildId], x = _a.x, y = _a.y, scale = _a.scale, close_3 = _a.close, alpha = _a.alpha;
                x += this._mapLayer1.x; //建筑在_sceneScroll中的x，
                var diffx = x - this._sceneScroll.scrollLeft; // Math.abs(this._sceneScroll.scrollLeft - x);
                if (diffx >= 0) {
                    diffx += 120;
                }
                else {
                    diffx -= 120;
                }
                var deltaT = Math.abs(diffx) / 1400 * 2200;
                // this._sceneScroll.setScrollLeft(this._sceneScroll.scrollLeft+diffx,deltaT);
                this._sceneScroll.setScrollLeft(build.x + build.width / 2 - 320, deltaT);
                egret.Tween.get(this, { loop: false }).wait(deltaT).call(this.refresh, this).call(this.moveCompleteHandler, this);
                // this.moveCompleteHandler();
                return;
            }
        }
        else if (rData.cmd == NetRequestConst.REQUEST_SEARCH_PILL) {
            App.CommonUtil.showTip(LanguageManager.getlocal("recoverLeftSuccess"));
        }
        this.refresh();
    };
    SearchView.prototype.playRewardTip = function (str) {
        if (!this._tipMask) {
            this._tipMask = BaseBitmap.create("public_9_bg8");
            this._tipMask.width = GameConfig.stageWidth;
            this._tipMask.height = GameConfig.stageHeigth;
            this._tipMask.touchEnabled = true;
            LayerManager.msgLayer.addChild(this._tipMask);
        }
        //一键寻访奖励飘字
        var strArr = str;
        var offY = 200;
        var tipContainer = new BaseDisplayObjectContainer();
        var tipBg = BaseBitmap.create("public_itemtipbg2");
        tipContainer.addChild(tipBg);
        var tipTxt = ComponentManager.getTextField(strArr.shift(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        tipBg.width = tipBg.width + tipTxt.width;
        tipTxt.setPosition((tipBg.width - tipTxt.width) / 2, (tipBg.height - tipTxt.height) / 2);
        tipContainer.addChild(tipTxt);
        tipContainer.setPosition((GameConfig.stageWidth - tipContainer.width) / 2, (GameConfig.stageHeigth - tipContainer.height) / 2 + offY);
        LayerManager.msgLayer.addChild(tipContainer);
        if (this._tipMask["count"] == null) {
            this._tipMask["count"] = 0;
        }
        this._tipMask["count"]++;
        var ths = this;
        egret.Tween.get(tipContainer).to({ y: tipContainer.y - offY * 2 }, 3000).call(function (tipContainer) {
            if (tipContainer) {
                tipContainer.dispose();
            }
            if (ths._tipMask) {
                ths._tipMask["count"]--;
                if (!ths._tipMask["count"]) {
                    BaseBitmap.release(ths._tipMask);
                    ths._tipMask = null;
                    var rData = Api.wifeVoApi.getWaitShowWife();
                    if (rData) {
                        ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW, { wifeIdList: rData.unlockWife, servantId: rData.unlockServant });
                    }
                    var rData2 = Api.servantVoApi.getWaitShowData();
                    if (rData2) {
                        var servantCfg = GameConfig.config.servantCfg[rData2.unlockServant];
                        if (servantCfg && servantCfg.getStoryID) {
                            ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW, { storyId: servantCfg.getStoryID, callback: function (unlockServant) {
                                    ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, unlockServant);
                                }, target: this, params: rData2.unlockServant });
                        }
                        else {
                            ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, rData2.unlockServant);
                        }
                    }
                }
            }
        }, this, [tipContainer]);
        if (this._tipTipTimeOut < 0) {
            this._tipTipTimeOut = egret.setInterval(this.playRewardTip, this, 300, strArr);
        }
        if (strArr.length < 1) {
            if (this._tipTipTimeOut > -1) {
                egret.clearInterval(this._tipTipTimeOut);
                this._tipTipTimeOut = -1;
            }
        }
    };
    SearchView.prototype.moveCompleteHandler = function () {
        // this._scrollView.removeEventListener(egret.Event.COMPLETE,this.moveCompleteHandler,this);
        var build = Config.SearchCfg.getPersonItemCfgByPersonId(this._personId).build;
        var npc = this._sceneLayer.getChildByName(String(build));
        if (npc) {
            // if(1==1){
            // 	ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW,{callback: this.showResult, target:this, storyId:"104008"});
            // 	return;
            // }
            //检测是否打开寻访剧情开关
            if (Api.switchVoApi.checkOpenNewStory()) {
                egret.Tween.get(npc).to({ alpha: 0.3 }, 100).to({ alpha: 0 }, 200).to({ alpha: 0.3 }, 100).to({ alpha: 0 }, 200).call(this.checkHaveStory, this);
            }
            else {
                egret.Tween.get(npc).to({ alpha: 0.3 }, 100).to({ alpha: 0 }, 200).to({ alpha: 0.3 }, 100).to({ alpha: 0 }, 200).call(this.showResult, this, [this._personId]);
            }
        }
    };
    SearchView.prototype.showResult = function (personId) {
        var pid = null;
        if (personId) {
            pid = personId;
        }
        else {
            pid = this._personId;
        }
        this.container.touchChildren = true;
        ViewController.getInstance().openView(ViewConst.POPUP.SEARCHRESULTPOPUPVIEW, { personId: pid, rewards: this._rewards });
    };
    //检测是否有故事剧情
    SearchView.prototype.checkHaveStory = function () {
        var search = Config.SearchCfg.getPersonItemCfgByPersonId(this._personId);
        var storyList = [];
        var valueStory = null;
        //判断是红颜 还是蓝颜，此处还需要修改
        if (search.wifeId) {
            var wifeId = search.wifeId;
            var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
            if (wifeCfg.isBule()) {
                if (search.blueValueStory) {
                    valueStory = search.blueValueStory;
                }
            }
            else {
                if (search.valueStory) {
                    valueStory = search.valueStory;
                }
            }
        }
        //test----
        // if(1==1){
        // 	ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW,{callback: this.showResult, target:this, storyId:"101001"});
        // 	return;
        // }
        if (!valueStory) {
            this.showResult(Number(this._personId));
            return;
        }
        storyList = valueStory.split(",");
        var mainList = [];
        var normalList = [];
        for (var i = 0; i < storyList.length; i++) {
            var indexItemCfg = Config.IndexstoryCfg.getIndexItemCfgById(storyList[i]);
            if (indexItemCfg.eventType == 1) {
                mainList.push(indexItemCfg);
            }
            else {
                normalList.push(indexItemCfg);
            }
        }
        var storyId = null;
        var value = Api.searchVoApi.getWifeValueById(this._personId);
        //判断主线剧情
        for (var j = 0; j < mainList.length; j++) {
            var main = mainList[j];
            //判断触发类型是寻访次数
            if (main.triggerType == 1) {
                //判断符合条件
                if (main.lower <= value && main.upper >= value) {
                    //判断概率
                    if (Math.random() < main.rate) {
                        //选择剧情id
                        var storyIDS = main.storyID.split(",");
                        var storyIndex = Math.floor(Math.random() * storyIDS.length);
                        storyId = storyIDS[storyIndex];
                        break;
                    }
                }
            }
        }
        //判断其他剧情
        if (storyId == null) {
            for (var j = 0; j < normalList.length; j++) {
                var normal = normalList[j];
                //判断触发类型是寻访次数
                if (normal.triggerType == 1) {
                    //判断符合条件
                    if (normal.lower <= value && normal.upper >= value) {
                        //判断概率
                        if (Math.random() < normal.rate) {
                            //选择剧情id
                            var storyIDS = normal.storyID.split(",");
                            var storyIndex = Math.floor(Math.random() * storyIDS.length);
                            storyId = storyIDS[storyIndex];
                            break;
                        }
                    }
                }
            }
        }
        if (storyId == null) {
            this.showResult(Number(this._personId));
        }
        else {
            //调用剧情界面
            ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW, { callback: this.showResult, target: this, storyId: storyId });
        }
    };
    SearchView.prototype.refresh = function () {
        if (this._leftText) {
            this._leftText.text = Api.searchVoApi.getSearchNumLocalStr();
            if (Api.searchVoApi.getSearchNum() > 0) {
                this._searchBtn.visible = true;
                this._buyBtn.visible = false;
            }
            else {
                this._searchBtn.visible = false;
                this._buyBtn.visible = true;
            }
        }
        this.refreshByModel();
    };
    SearchView.prototype.doGuide = function () {
        this.openLuckView();
    };
    SearchView.prototype.openLuckView = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.SEARCHLUCKPOPUPVIEW);
    };
    SearchView.prototype.tick = function () {
        if (Api.searchVoApi.getSearchNum() < Api.searchVoApi.getMaxSearchNum()) {
            // if(Api.searchVoApi.getSearchNum()<1)
            // {
            this.refresh();
            // }
        }
        if (this._luckProgress) {
            var value = Api.searchVoApi.getCurLuckNum() / Api.searchVoApi.getMaxLuckNum();
            this._luckProgress.setPercentage(value, Api.searchVoApi.getCurLuckNum() + "/" + Api.searchVoApi.getMaxLuckNum());
        }
    };
    SearchView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "searchbg1",
            "common_buttombigbg",
            "progress_type1_yellow", "progress_type1_bg",
            "progress_type1_yellow2", "progress_type3_bg",
            "progress_type1_yellow_top", "progress_type1_yellow_toplight",
            "guide_hand",
            "search_bg_1", "search_bg_2", "search_bg_3", "search_bg_4", "searchnpc_cloud"
        ]);
    };
    // protected getBgName():string
    // {
    // 	return null;
    // }
    SearchView.prototype.getButtomLineBg = function () {
        return null;
    };
    SearchView.prototype.getRuleInfo = function () {
        return "searchViewRuleInfo";
    };
    SearchView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        if (this._checkBox) {
            this._oneKeySearchStatus = this._checkBox.checkSelected();
        }
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SEARCH, this.refreshByModel, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkOnekeySearchHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        this.container.touchChildren = true;
        this._sceneLayer = null;
        this._npcList.length = 0;
        this._leftText = null;
        this._searchBtn = null;
        this._buyBtn = null;
        this._personId = null;
        this._rewards = null;
        this._clickNpc = null;
        this._luckProgress = null;
        this._checkBox = null;
        this._isCfgInit = false;
        if (this._isbgResLoaded) {
            if (this._bgResGroupName) {
                ResourceManager.destroyRes(this._bgResGroupName);
                this._bgResGroupName = null;
            }
            this._isbgResLoaded = false;
        }
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
        this._mainTaskHandKey1 = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey2);
        this._mainTaskHandKey2 = null;
        this._snowBoneNode = null;
        this._mapLayer1 = null;
        this._mapLayer2 = null;
        this._mapLayer3 = null;
        this._mapLayer4 = null;
        this._mapClooud = null;
        this._sceneScroll = null;
        this._mapCloudNode = null;
        this._mapClooud = null;
        this._btmcontaimer = null;
        _super.prototype.dispose.call(this);
    };
    return SearchView;
}(CommonView));
__reflect(SearchView.prototype, "SearchView");
