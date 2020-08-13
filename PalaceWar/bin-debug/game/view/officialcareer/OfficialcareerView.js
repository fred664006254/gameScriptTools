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
 * 仕途回忆
 * author shaoliang
 * date 2019/4/12
 * @class OfficialcareerView
 */
var OfficialcareerView = (function (_super) {
    __extends(OfficialcareerView, _super);
    function OfficialcareerView() {
        var _this = _super.call(this) || this;
        _this._clickNpc = null;
        _this._npcList = [];
        _this._partTab = null;
        _this._openKey = null;
        _this._cloudEffect = null;
        return _this;
    }
    OfficialcareerView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "officialcareer_bg", "acliangbiographyeffect_cloudeffect1",
        ]);
    };
    OfficialcareerView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create("officialcareer_bg");
        this.viewBg.y = GameConfig.stageHeigth - this.viewBg.height;
        this.addChild(this.viewBg);
    };
    OfficialcareerView.prototype.getRuleInfo = function () {
        var str = "officialcareerRuleInfo";
        return str;
    };
    OfficialcareerView.prototype.clickRuleBtnHandler = function (param) {
        var keyParam = this.getRuleInfoParam();
        var msg = '';
        var extra = this.getExtraRuleInfo();
        if (extra && extra !== '') {
            msg = extra;
        }
        else {
            var str = "officialcareerRuleInfo";
            msg = LanguageManager.getlocal(str);
            if (Api.switchVoApi.checkOpenQingYuanHuiJuan()) {
                msg += "\n" + LanguageManager.getlocal("officialcareerRuleInfo_qingyuan");
            }
            if (Api.switchVoApi.checkTitleUpgrade()) {
                msg += "\n" + LanguageManager.getlocal("officialcareerRuleInfo_diwang");
            }
            if (Api.switchVoApi.checkOpenBiography()) {
                msg += "\n" + LanguageManager.getlocal("officialcareerRuleInfo_liezhuanbenji");
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW, msg);
    };
    OfficialcareerView.prototype.getTitleStr = function () {
        return "officialcareer";
    };
    OfficialcareerView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_ROOKIE_STORY;
    };
    OfficialcareerView.prototype.initView = function () {
        this._sceneLayer = new BaseDisplayObjectContainer();
        this.addChild(this._sceneLayer);
        this._partTab = {
            storyrecall: {
                x: 274,
                bottom: 301,
                open: Api.switchVoApi.checkOpenStoryRecall()
            },
            titleupgrade: {
                x: 215,
                bottom: 645,
                open: Api.switchVoApi.checkTitleUpgrade(),
            },
            func2: {
                x: 72,
                bottom: 386
            },
            qingyuan: {
                x: 490,
                bottom: 713,
                open: Api.switchVoApi.checkOpenQingYuanHuiJuan(),
            },
            func4: {
                x: 80,
                bottom: 751,
                open: Api.switchVoApi.checkOpenBiography(),
            },
        };
        var allkeys = Object.keys(this._partTab);
        var _loop_1 = function (i) {
            var key = allkeys[i];
            this_1._npcList.push(key);
            var container = new BaseDisplayObjectContainer();
            container.name = key;
            var npc = BaseBitmap.create("officialcareer_" + key);
            container.addChild(npc);
            var nameStr = "officialcareer_waitingopen";
            if (this_1._partTab[key].open == true) {
                nameStr = "officialcareer_" + key + "_name";
            }
            var namePic = BaseBitmap.create(nameStr);
            namePic.name = nameStr;
            var alpha = BaseBitmap.create("public_9_viewmask");
            alpha.width = namePic.width;
            alpha.height = namePic.height + 20;
            alpha.y = npc.height;
            alpha.alpha = 0.1;
            container.addChild(alpha);
            if (npc.width > alpha.width) {
                alpha.x = npc.width / 2 - alpha.width / 2;
            }
            else {
                npc.x = alpha.width / 2 - npc.width / 2;
            }
            container.anchorOffsetX = container.width / 2;
            container.anchorOffsetY = container.height / 2;
            container.setPosition(this_1._partTab[key].x + container.width / 2, GameConfig.stageHeigth - this_1._partTab[key].bottom + container.height / 2);
            namePic.setPosition(container.x - namePic.width / 2, container.y + npc.height / 2 - namePic.height / 2);
            this_1._sceneLayer.addChild(namePic);
            this_1._sceneLayer.addChild(container);
            // if(key == `titleupgrade` && this._partTab[key].open == true){
            // 	this._cloudEffect = ComponentManager.getCustomMovieClip("acliangbiographyeffect_cloudeffect", 10, 70);
            // 	let cloudBM = BaseBitmap.create("acliangbiographyeffect_cloudeffect1");
            // 	this._cloudEffect.anchorOffsetX = cloudBM.width / 2;
            // 	this._cloudEffect.anchorOffsetY = cloudBM.height / 2;
            // 	this._cloudEffect.setPosition(container.x, container.y);
            // 	this._cloudEffect.touchEnabled = false;
            // 	container.name = `titleupgrade`;
            // }
            var view = this_1;
            container.addTouch(function (event, iconContainer, hitKey) {
                switch (event.type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        iconContainer.setScale(0.9);
                        break;
                    case egret.TouchEvent.TOUCH_CANCEL:
                        iconContainer.setScale(1);
                        break;
                    case egret.TouchEvent.TOUCH_END:
                        iconContainer.setScale(1);
                        if (view._partTab[hitKey].open == true) {
                            if (hitKey == "storyrecall") {
                                if (Api.challengeVoApi.getCurBigChannelId() <= 1) {
                                    App.CommonUtil.showTip(LanguageManager.getlocal("storyrecall_noRecord"));
                                }
                                else {
                                    view._openKey = hitKey;
                                    view.openViewHandle();
                                }
                            }
                            else if (hitKey == "qingyuan") {
                                view._openKey = hitKey;
                                view.openViewHandle();
                            }
                            else if (hitKey == "titleupgrade") {
                                view._openKey = hitKey;
                                view.openViewHandle();
                            }
                            else if (hitKey == "func4") {
                                view._openKey = "biography";
                                view.openViewHandle();
                            }
                        }
                        else {
                            App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
                        }
                        break;
                }
            }, this_1, [container, key]);
        };
        var this_1 = this;
        for (var i = 0; i < allkeys.length; i++) {
            _loop_1(i);
        }
        if (this._cloudEffect) {
            this.addChild(this._cloudEffect);
        }
        // this._sceneLayer.touchEnabled=true;
        // this._sceneLayer.addTouch(this.onNPCTouchHandler,this,null);	
        this.tick();
        this.anchorOffsetX = GameConfig.stageWidth / 2;
        this.anchorOffsetY = GameConfig.stageHeigth / 2;
        this.x = GameConfig.stageWidth / 2;
        this.y = GameConfig.stageHeigth / 2;
    };
    // private onNPCTouchHandler(e:egret.TouchEvent):void
    // {
    // 	if(e.type!=egret.TouchEvent.TOUCH_BEGIN&&e.type!=egret.TouchEvent.TOUCH_CANCEL&&e.type!=egret.TouchEvent.TOUCH_END)
    // 	{
    // 		return;
    // 	}
    // 	if(e.type==egret.TouchEvent.TOUCH_BEGIN)
    // 	{
    // 		let hitKey:string=null;
    // 		for(var key in this._npcList)
    // 		{
    // 			let b=this._sceneLayer.getChildByName(this._npcList[key]);
    // 			let checkRect:egret.Rectangle=egret.Rectangle.create();
    // 			checkRect.setTo(b.x-b.width/2,b.y-b.height/2,b.width,b.height);
    // 			if (checkRect.contains(e.stageX,e.stageY))
    // 			{
    // 				hitKey=this._npcList[key];
    // 			}
    // 			// let p = this._sceneLayer.globalToLocal(e.stageX,e.stageY);
    // 			// let hitMaxY:number=-9999;
    // 			// let ofp = this._sceneLayer.localToGlobal(0,0);
    // 			// if(b.hitTestPoint(Math.floor(e.localX+ofp.x*this.scaleX),Math.floor(e.localY+(ofp.y+GameData.layerPosY)*this.scaleY),GameData.isSupportHitTestPoint))
    // 			// {
    // 			// 	if(b.y>hitMaxY)
    // 			// 	{
    // 			// 		hitMaxY=b.y;
    // 			// 		hitKey=this._npcList[key];
    // 			// 	}
    // 			// }
    // 		}
    // 		if(hitKey)
    // 		{
    // 			if(hitKey.indexOf("name")>-1)
    // 			{
    // 				hitKey=hitKey.substring(0,hitKey.indexOf("name"));
    // 			}
    // 			this._clickNpc=<BaseBitmap>this._sceneLayer.getChildByName(hitKey);
    // 			if(this._clickNpc&&this._clickNpc.visible==false)
    // 			{
    // 				this._clickNpc=null;
    // 				return;
    // 			}
    // 		}
    // 	}
    // 	if(e.type==egret.TouchEvent.TOUCH_BEGIN)
    // 	{
    // 		if(this._clickNpc)
    // 		{
    // 			this._clickNpc.setScale(0.9);
    // 		}
    // 	}
    // 	else if(e.type==egret.TouchEvent.TOUCH_CANCEL)
    // 	{
    // 		if(this._clickNpc)
    // 		{
    // 			this._clickNpc.setScale(1);
    // 			this._clickNpc=null;
    // 		}
    // 	}
    // 	if(e.type==egret.TouchEvent.TOUCH_END)
    // 	{
    // 		if(this._clickNpc)
    // 		{
    // 			if(this._clickNpc)
    // 			{
    // 				this._clickNpc.setScale(1);
    // 			}
    // 			let hitKey=this._clickNpc.name;
    // 			if(hitKey)
    // 			{	
    // 				if (this._partTab[hitKey].open == true)
    // 				{	
    // 					if (hitKey == "storyrecall")
    // 					{
    // 						if (Api.challengeVoApi.getCurBigChannelId() <= 1)
    // 						{
    // 							App.CommonUtil.showTip(LanguageManager.getlocal("storyrecall_noRecord"));
    // 						}
    // 						else
    // 						{	
    // 							this._openKey = hitKey;
    // 							this.openViewHandle();
    // 							// let effect = new StoryShowEffect();
    // 							// LayerManager.maskLayer.addChild(effect);
    // 							// effect.init(this.openViewHandle,this.openViewHandle2,this);
    // 							// let b=this._sceneLayer.getChildByName(hitKey);
    // 							// b.visible = false;
    // 						}
    // 					}
    // 					//情缘绘卷
    // 					else if(hitKey == "qingyuan"){
    // 						this._openKey = hitKey;
    // 						this.openViewHandle();
    // 					}
    // 					else if(hitKey == `titleupgrade`){
    // 						this._openKey = hitKey;
    // 						this.openViewHandle();
    // 						//播放下特效
    // 						// this._cloudEffect.setScale(1);
    // 						// egret.Tween.removeTweens(this._cloudEffect);
    // 						// egret.Tween.get(this).to({scaleX : 1.5, scaleY : 1.5}, 1000);
    // 						// egret.Tween.get(this._cloudEffect).wait(1000).call(() => {
    // 						// 	this._cloudEffect.setScale(8);
    // 						// 	this._cloudEffect.playWithTime(1);
    // 						// 	egret.Tween.removeTweens(this._cloudEffect);
    // 						// 	this._cloudEffect.setEndCallBack(() => {
    // 						// 		this.openViewHandle();
    // 						// 		this.setScale(1);
    // 						// 		this._cloudEffect.setScale(1);
    // 						// 	}, this)
    // 						// }, this)
    // 					}
    // 				}
    // 				else
    // 				{
    // 					App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
    // 				}
    // 			}
    // 			this._clickNpc=null;
    // 		}
    // 	}
    // }
    OfficialcareerView.prototype.tick = function () {
        var view = this;
        var allkeys = Object.keys(this._partTab);
        for (var i = 0; i < allkeys.length; i++) {
            var key = allkeys[i];
            var group = this._sceneLayer.getChildByName(key);
            if (group) {
                var showred = false;
                switch (key) {
                    case "qingyuan":
                        showred = this._partTab[key].open && Api.encounterVoApi.isShowNpc();
                        break;
                    case "titleupgrade":
                        showred = this._partTab[key].open && (Api.titleupgradeVoApi.checkNpcMessage() || (Api.switchVoApi.checkTitleUpgrade() && Api.switchVoApi.checkOpenEmperorsAchievement() && Api.emperorAchieveVoApi.isShowKingAchieveRedDot()));
                        break;
                }
                if (showred) {
                    App.CommonUtil.addIconToBDOC(group);
                    if (key == "qingyuan") {
                        var reddot = group.getChildByName("reddot");
                        reddot.x = 90;
                        reddot.y = 0;
                    }
                }
                else {
                    App.CommonUtil.removeIconFromBDOC(group);
                }
            }
        }
    };
    OfficialcareerView.prototype.openViewHandle = function () {
        ViewController.getInstance().openViewByFunName(this._openKey);
    };
    OfficialcareerView.prototype.openViewHandle2 = function () {
        var b = this._sceneLayer.getChildByName(this._openKey);
        b.visible = true;
    };
    OfficialcareerView.prototype.closeHandler = function () {
        PlayerBottomUI.getInstance().hide(true);
        _super.prototype.hide.call(this);
    };
    OfficialcareerView.prototype.dispose = function () {
        this._clickNpc = null;
        this._npcList.length = 0;
        this._sceneLayer = null;
        this._partTab = null;
        this._openKey = null;
        this._cloudEffect = null;
        _super.prototype.dispose.call(this);
    };
    return OfficialcareerView;
}(CommonView));
__reflect(OfficialcareerView.prototype, "OfficialcareerView");
//# sourceMappingURL=OfficialcareerView.js.map