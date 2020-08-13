/**
 * 升官成功
 * author dmj
 * date 2017/9/29
 * @class PromotionSuccessView
 **/
class PromotionSuccessView extends CommonView
{

	private _titleTween:egret.Tween;
	private _levelTween:egret.Tween;
	private _scrollContainer:BaseDisplayObjectContainer;
	private _scrollRight:BaseBitmap;
	private _temW = 45;
	private _num:number = 1;
	private _totalTime = 600;
	private _repeatCount = 20;
	private _levelTF:BaseTextField;
	private _bgTween:egret.Tween;
	public constructor() 
	{
		super();
	}

	public initView():void
	{

		let textColor = TextFieldConst.COLOR_WHITE;

		let bg:BaseBitmap = BaseBitmap.create("promotion_bg1");
		bg.scaleX = bg.scaleY = 1.2;
		bg.anchorOffsetX = bg.width/2;
		bg.anchorOffsetY = bg.height/2;
		bg.x = GameConfig.stageWidth/2;
		bg.y = 420;
		this.addChildToContainer(bg);

		this._bgTween = egret.Tween.get(bg,{loop:true});
		this._bgTween.to({rotation:360},16000);

		let titleImage:BaseBitmap = BaseBitmap.create("promotion_sucess");
		titleImage.anchorOffsetX = titleImage.width/2;
		titleImage.anchorOffsetY = titleImage.height/2;
		// titleImage.x = GameConfig.stageWidth/2 - titleImage.width/2 ;
		// titleImage.y = 20;
		titleImage.x = GameConfig.stageWidth/2  ;
		titleImage.y = titleImage.height/2+20;
		titleImage.setScale(1.3);
		this.addChildToContainer(titleImage);
		this._titleTween = egret.Tween.get(titleImage);
		this._titleTween.to({scaleX:1,scaleY:1},100).call(this.onChange,this);



		let roleImage =	 Api.playerVoApi.getPlayerPortrait(Api.playerVoApi.getPlayerLevel(),Api.playerVoApi.getPlayePicId());
		// roleImage.scaleX = roleImage.scaleY = 1.4;
		roleImage.x = this.viewBg.width/2 - roleImage.width/2;
		roleImage.y = 180;
		this.addChildToContainer(roleImage);

		let scrollContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		let scrollBg:BaseDisplayObjectContainer=App.CommonUtil.getContainerByLeftHalfRes("public_rule_bg");

		scrollContainer.y = GameConfig.stageHeigth - scrollBg.height;
		this.addChildToContainer(scrollContainer);
		scrollContainer.addChild(scrollBg);

		let titleTFBg = BaseBitmap.create("promotion_officerbg1");
		titleTFBg.x = GameConfig.stageWidth/2 - titleTFBg.width/2;
		titleTFBg.y = scrollContainer.y - 30;
		this.addChildToContainer(titleTFBg);



		let titleTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("officeUpgradeTitle",[Api.playerVoApi.getPlayerOffice()]),TextFieldConst.FONTSIZE_BUTTON_COMMON);
		titleTF.x = scrollBg.width/2 - titleTF.width/2;
		titleTF.y = titleTFBg.y + titleTFBg.height/2 -titleTF.height/2
		titleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		this.addChildToContainer(titleTF);

		let nameBg =  BaseBitmap.create("public_get_namebg");
        nameBg.x = 50
        nameBg.y = 180;
        this.addChildToContainer(nameBg);

        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_COMMON);
		nameTxt.text = Api.playerVoApi.getPlayerOffice()
		if(PlatformManager.checkIsTextHorizontal())
		{
			nameTxt.setPosition(titleTF.x + titleTF.width / 2 - nameTxt.width / 2 , titleTF.y - 50);
			// nameTxt.setPosition(GameConfig.stageWidth / 2 , GameConfig.stageHeigth / 2);
			nameBg.width = nameTxt.width + 30;
			nameBg.setPosition(nameTxt.x + nameTxt.width / 2 - nameBg.width / 2 , nameTxt.y + nameTxt.height / 2 - nameBg.height / 2);
		}
		else
		{
       	 	nameTxt.multiline = true;
			nameTxt.width = 26;
        	nameTxt.x =nameBg.x + nameBg.width/2-nameTxt.width/2;
        	nameTxt.y = nameBg.y+ 80 - nameTxt.height/2;
		}

        this.addChildToContainer( nameTxt);


		let subTitleTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("promotion_privilege"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		subTitleTF.x =GameConfig.stageWidth/2 - subTitleTF.width/2;
		subTitleTF.y = 60;
		scrollContainer.addChild(subTitleTF);

		let playerLevel:number = Api.playerVoApi.getPlayerLevel();
		let contentTF:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getCurLevelPrivilegeTxtStr(playerLevel),TextFieldConst.FONTSIZE_CONTENT_SMALL,textColor);
		contentTF.x = GameConfig.stageWidth/2 - contentTF.width/2;
		contentTF.y = subTitleTF.y + 30;
		contentTF.lineSpacing = 5;
		scrollContainer.addChild(contentTF);

		this._scrollRight = BaseBitmap.create("promotion_scroll");
		this._scrollRight.y = scrollContainer.y + 2;
		this.addChildToContainer(this._scrollRight);

		scrollContainer.x = this.viewBg.width/2 - this._temW;// - scrollContainer.width/2;
		this._scrollRight.x = this.viewBg.width/2;
		let rect = egret.Rectangle.create();
		rect.setTo(-scrollContainer.width/2 + this._scrollRight.width,0,scrollBg.width/2,scrollBg.height);
		scrollContainer.mask = rect;
		this._scrollContainer = scrollContainer;

		this.addTouchTap(this.checkShare,this,null);


		// 如果不满足强弹条件，则显示以前的分享按钮(此处会判断平台和开关和官品的条件)
		if(!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_GRADE,playerLevel.toString())){
			// 分享按钮
			App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_PROMOTION);
		}

	}
	//判断是否有强弹分享
	private checkShare():void
	{
		let playerLevel:number = Api.playerVoApi.getPlayerLevel();
		Api.shareVoApi.showShare(ShareVoApi.TYPE_GRADE,playerLevel.toString(),this.tapHandler,this);
	}

	private tapHandler():void
	{
		this.hide();
		if (Api.unlocklist2VoApi.checkShowOpenFunc()){
			if (Api.unlocklist2VoApi.checkNeedShowByName("practice") || Api.unlocklist2VoApi.checkNeedShowByName("officialCareer")){
				Api.unlocklist2VoApi.checkWaitingShowInFunc("player");
			}
			else{
				this.showSpecialView();
			}
		}
		else{
			this.showSpecialView();
		}
	}

	private showSpecialView():void{
		let rData = Api.wifeVoApi.getWaitShowWife();
		if(rData){
			
			// ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
			Api.verifySpecialReward(rData.unlockServant,true);
			Api.verifySpecialReward(rData.unlockWife,false);
		}

		let rData2 = Api.servantVoApi.getWaitShowData();
		if(rData2){
			
			// ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,rData2.unlockServant);
			Api.verifySpecialReward(rData2.unlockServant,true);
		}

		let rData22 = Api.servantVoApi.getWaitShowDat2();
		if(rData22){
			
			Api.verifySpecialSkinReward(rData22.unlockServantSkin,true);
		}

		Api.openSpecialView();
	}

	public hide()
	{
		// PlayerBottomUI.getInstance().hide(true);
		// ViewController.getInstance().hideView(ViewConst.COMMON.PLAYERVIEW);
		// PlayerBottomUI.getInstance().show();
		super.hide();
	}
	protected getBgName():string
	{
		return "public_9_black";
	}

	
	private doTimerHandler():void
	{
		let rect = <egret.Rectangle>this._scrollContainer.mask;
		let moveW = (this._scrollContainer.width/2 - this._temW)/this._repeatCount*this._num;
		this._scrollContainer.x = this.viewBg.width/2   - this._temW - moveW;
		rect.setTo(-this._scrollContainer.width/2 + this._scrollRight.width + moveW,0,594/2 + moveW,449);
		this._scrollContainer.mask = rect;
		this._scrollRight.x = this.viewBg.width/2 + moveW - this._temW;
		this._num += 1;
		// App.LogUtil.show("num:",this._num,rect.x,rect.y,rect.width,rect.height);
	}

	private complateHandler():void
	{
		let rect = <egret.Rectangle>this._scrollContainer.mask;
		egret.Rectangle.release(rect);
		this._scrollContainer.mask = null;
		this.removeChildFromContainer(this._scrollRight);
		this._scrollRight.dispose();
		this._scrollRight = null;
		TimerManager.removeAll(this);
	}

	private onChange():void
	{
		if(this._titleTween)
		{
			egret.Tween.removeTweens(this._titleTween);
			this._titleTween = null;

			TimerManager.doTimer(this._totalTime/this._repeatCount, this._repeatCount, this.doTimerHandler, this,this.complateHandler,this);
		}
		if(this._levelTween)
		{
			egret.Tween.removeTweens(this._levelTween);
			this._levelTween = null;
		}
	}
	// protected getParent():egret.DisplayObjectContainer
	// {
	// 	// return LayerManager.panelLayer;
    //     return PlayerBottomUI.getInstance().parent;
	// }
	protected getResourceList():string[]
	{
		return [
			"promotion_bg1",
			"promotion_sucess","promotion_scroll","shareBtn","shareRewardPop"
		];
	}
	protected getTitleStr():string
	{
		return null;
	}
	protected getButtomLineBg():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected getTitleBgName():string
	{
		return null;
	}

	public dispose():void
	{
		this.onChange();
		if(this._bgTween)
		{
			egret.Tween.removeTweens(this._bgTween);
			this._bgTween = null;
		}
		if(TimerManager.isExists(this.doTimerHandler,this))
		{
			// App.LogUtil.show("TimerManager.removeAll");
			TimerManager.removeAll(this);
		}
		this._levelTF = null;
		this._scrollContainer = null;
		this._scrollRight = null;
		this._temW = 45;
		this._num = 1;

		super.dispose();
	}
}