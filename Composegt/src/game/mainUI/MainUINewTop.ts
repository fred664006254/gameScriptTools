class MainUINewTop extends BaseLoadDisplayObjectContiner
{
	private headImg:BaseLoadBitmap;
	private headBg:BaseLoadBitmap;
	private headEffect:CustomMovieClip;
	private _headContiner:BaseDisplayObjectContainer;
	private _nickNameText:BaseTextField;
	// private _powerValueText:BaseTextField;
	private _officerText:BaseTextField | BaseBitmapText;
	private _soldierbar:ResBar;
	private _powerbar:ResBar;
	private _gembar:ResBar;
	private _goldbar:ResBar;
	private _foodbar:ResBar;
	private _isShowName:boolean;
	private _addgoldBtn:BaseButton;
	private _upgradeClip:CustomMovieClip;
	//赚速
	private _goldAddTxt:BaseTextField;
	private _foodAddTxt:BaseTextField;
	private _soldierAddTxt:BaseTextField;
	private _clickHand:BaseBitmap=null;

	public constructor(data:{showName:boolean})
	{
		super();
		this._isShowName=data?data.showName:false;
		egret.callLater(this.show,this);
	}

	protected getResourceList():string[]
	{
		return [
			// "mainui_newtopbg", 
			// PlatformManager.hasSpcialCloseBtn()?"mainui_newtopbg_wxgame":"mainui_newtopbg",
			// "office_fnt",
		];
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return null;
	}

	// protected preInit():void
	// {
	// 	this.init();
	// }

	public show(data?:any):void
	{
		super.show(data);
	}

	protected init():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.refresh,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG,this.changeImgNotify,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_UNSET,this.changeImgNotify,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR,this.changeImgNotify,this);
		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PRESTIGE,this.checkPrestigeRedDot,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkPracticeRed,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_UNLOCK,this.refreshUi,this)
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESHVO_LEVY,this.refreshAddTxt,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_SHOWUHEADHAND,this.showUnlockHand,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK,this.hideUnlockHand,this);

		let curButtomY:number=0;
		// let topinfobg:BaseBitmap = BaseBitmap.create(PlatformManager.hasSpcialCloseBtn()?"mainui_newtopbg_wxgame":"mainui_newtopbg");
		let topinfobg:BaseBitmap = BaseBitmap.create("mainui_newtopbg");
		topinfobg.touchEnabled=true;
		topinfobg.y = curButtomY;
		this.addChildAt(topinfobg,0);
		curButtomY=topinfobg.y+topinfobg.height;

		let headImg = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
		headImg.width = 112;
		headImg.height = 135;
		headImg.name = "headImg";
		headImg.setPosition(5,0);
		this.addChild(headImg); 
		headImg.addTouchTap(this.roleHeadClickHandler,this);
		this._headContiner = headImg;
		this.headImg = <BaseLoadBitmap>headImg.getChildByName("myHead");
		this.headBg = <BaseLoadBitmap>headImg.getChildByName("myBody");
		this.headEffect = <CustomMovieClip>headImg.getChildByName("myHeadEffect");
		let fontsize = 22;
		let fontcolor = TextFieldConst.COLOR_WHITE;
		// this.checkPrestigeRedDot();

		let nameBg=BaseBitmap.create("public_hb_bg03");
		nameBg.width = 150;
		nameBg.setPosition(PlatformManager.hasSpcialCloseBtn()?463:132,10);
		this.addChild(nameBg);
		this._nickNameText =  ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),fontsize,fontcolor);
		// this._nickNameText.anchorOffsetX = this._nickNameText.width/2
		this._nickNameText.setPosition(nameBg.x + 10,nameBg.y +nameBg.height/2-this._nickNameText.height/2);
		this.addChild(this._nickNameText);
		

		//官职
		this._officerText = ComponentManager.getBitmapText(Api.playerVoApi.getPlayerMinLevelStr(), "office_fnt");
		this._officerText.setScale(0.8);
		this._officerText.x =  62 - this._officerText.width*this._officerText.scaleX/2;
		this._officerText.y = 83;
		this.addChild(this._officerText);
		if(Api.switchVoApi.checkOpenWxHexiePic())
		{
			this._officerText.visible = false;
		}

		let goldBar:ResBar = ComponentManager.getResBar(ItemEnums.gold,true);
		goldBar.setPosition(132-5,65);
		this._goldbar = goldBar;
		this.addChild(goldBar);


		
		//势力 
		let powerBar:ResBar = ComponentManager.getResBar(ItemEnums.power,true);
		powerBar.setPosition(300,nameBg.y);
		this.addChild(powerBar);
		this._powerbar = powerBar

		let gemBar:ResBar = ComponentManager.getResBar(ItemEnums.gem,true);
		gemBar.setPosition(PlatformManager.hasSpcialCloseBtn()?130:463,powerBar.y);
		this.addChild(gemBar);
		this._gembar = gemBar;

		let foodBar:ResBar = ComponentManager.getResBar(ItemEnums.food,true);
		// foodBar.setPosition(PlatformManager.hasSpcialCloseBtn()?gemBar.x:powerBar.x,57);
		foodBar.setPosition(powerBar.x,goldBar.y);
		this.addChild(foodBar);
		this._foodbar = foodBar;


		//兵力
		// this._soldierValueText = ComponentManager.getTextField(Api.playerVoApi.getSoldierStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xfdf2e8);
		// this._soldierValueText.setPosition(PlatformManager.hasSpcialCloseBtn()?powerBar.x:gemBar.x,goldBar.y);
		// this.addChild(this._soldierValueText);
		this._soldierbar = ComponentManager.getResBar(ItemEnums.soldier,true);
		// soldierBar.setPosition(PlatformManager.hasSpcialCloseBtn()?powerBar.x:gemBar.x,foodBar.y);
		this._soldierbar.setPosition(463,foodBar.y);
		this.addChild(this._soldierbar);

		//赚速
		this._goldAddTxt = ComponentManager.getTextField(Api.levyVoApi.getTotalAddRateStr("gold"), 18, TextFieldConst.COLOR_BROWN_NEW);
		this._goldAddTxt.setPosition(this._goldbar.x+this._goldbar.width/2-this._goldAddTxt.width/2 + 10, this._goldbar.y + this._goldbar.height - 27);
		this.addChild(this._goldAddTxt);
		this._foodAddTxt = ComponentManager.getTextField(Api.levyVoApi.getTotalAddRateStr("food"), 18, TextFieldConst.COLOR_BROWN_NEW);
		this._foodAddTxt.setPosition(this._foodbar.x+this._foodbar.width/2-this._foodAddTxt.width/2 + 10, this._foodbar.y + this._foodbar.height - 27);
		this.addChild(this._foodAddTxt);
		this._soldierAddTxt = ComponentManager.getTextField(Api.levyVoApi.getTotalAddRateStr("soldier"), 18, TextFieldConst.COLOR_BROWN_NEW);
		this._soldierAddTxt.setPosition(this._soldierbar.x+this._soldierbar.width/2-this._soldierAddTxt.width/2 + 10, this._soldierbar.y + this._soldierbar.height - 27);
		this.addChild(this._soldierAddTxt);
		this._goldbar.changeResBgY(-10);
		this._foodbar.changeResBgY(-10);
		this._soldierbar.changeResBgY(-10);
		this._goldbar.isShowAni = true;
		this._foodbar.isShowAni = true;
		this._soldierbar.isShowAni = true;
		this._goldbar._levyRate = Api.levyVoApi.getTotalRawAddRate("gold");
		this._foodbar._levyRate = Api.levyVoApi.getTotalRawAddRate("food");
		this._soldierbar._levyRate = Api.levyVoApi.getTotalRawAddRate("soldier");


		//购买金币按钮
		// btn1
		let addGoldBtn = ComponentManager.getButton("mainui_btn1","",this.addGoldBtnClickHandler,this);
		addGoldBtn.y = 9 - 6;
		addGoldBtn.x = PlatformManager.hasSpcialCloseBtn()?250:(GameConfig.stageWidth - addGoldBtn.width );
		this.addChild(addGoldBtn);
		let addBtnBg:BaseBitmap=BaseBitmap.create("public_alphabg");
		addBtnBg.width=addGoldBtn.width*2;
		addBtnBg.height=addGoldBtn.height*2;
		addBtnBg.setPosition(-addGoldBtn.width,0);
		addGoldBtn.addChild(addBtnBg);
		this._addgoldBtn = addGoldBtn;

		
		if(Api.switchVoApi.checkClosePay()||PlatformManager.checkHideIconByIP())
		{
			addGoldBtn.visible=false;
		}
		this.refreshUpgradeClip();
		// this.height = topinfobg.height = 110;
		this.refreshUi();
	}

	//指向未解锁地块
	private showUnlockHand()
	{
		if(this._clickHand)
		{	
			return;
		}
		this._clickHand = BaseBitmap.create("guide_hand");
		this._clickHand.setScale(0.6);
		this._clickHand.x = 60;
		this._clickHand.y = 50;
		this.addChild(this._clickHand);
		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.7,scaleY:0.7}, 500)
				.to({scaleX: 0.6,scaleY:0.6}, 500)
	}
	private hideUnlockHand()
	{
		if(this._clickHand)
		{
			egret.Tween.removeTweens(this._clickHand);
			this.removeChild(this._clickHand);
			this._clickHand = null;
		}
		
	}

	private refreshUi()
	{
		let unlockCfg = MainUIUnLockCfg.getMainUIUnLockCfg();
		let unlockIndex = MainUI.getInstance().getUnlockIndex();
		this._goldbar.visible = unlockIndex >= unlockCfg["mianuiGold"];
		this._soldierbar.visible = unlockIndex >= unlockCfg["mainuiSoldierFood"];
		this._foodbar.visible = unlockIndex >= unlockCfg["mainuiSoldierFood"];
		this._addgoldBtn.visible = unlockIndex >= unlockCfg["mainuiCity"];
		this._gembar.visible = unlockIndex >= unlockCfg["mainuiCity"];

		this._goldAddTxt.visible = unlockIndex >= unlockCfg["mianuiGold"];
		this._foodAddTxt.visible = unlockIndex >= unlockCfg["mainuiSoldierFood"];
		this._soldierAddTxt.visible = unlockIndex >= unlockCfg["mainuiSoldierFood"];
		if(Api.switchVoApi.checkClosePay()||PlatformManager.checkHideIconByIP())
		{
			this._addgoldBtn.visible=false;
		}
	}
	private refreshAddTxt(){
		let typeArr = ["gold","food","soldier"];
		for (let i = 0; i < typeArr.length; i++) {
			const type = typeArr[i];
			this[`_${type}AddTxt`].text = Api.levyVoApi.getTotalAddRateStr(type);
			this[`_${type}AddTxt`].x = this[`_${type}bar`].x+this[`_${type}bar`].width/2-this[`_${type}AddTxt`].width/2 +10;
			this[`_${type}bar`].levyRate = Api.levyVoApi.getTotalRawAddRate(type);
		}
	}

	protected refreshUpgradeClip()
	{
		let curMinLv = Api.playerVoApi.getPlayerMinLevelId();
		let nextLvCfg =  Config.MinlevelCfg.getCfgByMinLevelId(curMinLv+1);
		
		if ((nextLvCfg && Api.playerVoApi.getPlayerExp() >=  nextLvCfg.exp &&Api.mainTaskVoApi.getHistoryMaxLevyRate() >= nextLvCfg.needRate) || Api.practiceVoApi.isShowRedForPBottom())
		 {
			 if (!this._upgradeClip)
			 {
				this._upgradeClip = ComponentManager.getCustomMovieClip("mainui_fg",10,100);
				this._upgradeClip.anchorOffsetX = this._upgradeClip.width/2;
				this._upgradeClip.anchorOffsetY = this._upgradeClip.height;
				this._upgradeClip.x = -2;
				this._upgradeClip.y = -8;
				let tmpIdx = this.getChildIndex(this.getChildByName("headImg"));
				this.addChildAt(this._upgradeClip,tmpIdx+2);
			 }
			 else
			 {
				this._upgradeClip.visible=true;
			 }
			this._upgradeClip.playWithTime(0); 
		 }else
		 {
			 if (this._upgradeClip)
			 {
				 this._upgradeClip.stop();
				 this._upgradeClip.visible=false;
				//  this.removeChild(this._upgradeClip);
				//  this._upgradeClip = null;
			 }
		 }
	}

	private addGoldBtnClickHandler():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		//test code
		// ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW);
	}

	private roleHeadClickHandler():void
	{
		if(Api.switchVoApi.checkOpenWxHexiePic())
		{
			return;
		}
		if(PlatformManager.checkIs37WdShenheSp())
		{
			return;
		}
		PlayerBottomUI.getInstance().show();
		// ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
	}

	public refresh():void
	{
		// this._gemValueText.text = Api.playerVoApi.getPlayerGemStr();
		// this._soldierValueText.text = Api.playerVoApi.getSoldierStr();
		this._soldierbar.setResNum(Api.playerVoApi.getSoldierStr());
		// this._foodValueText.text = Api.playerVoApi.getFoodStr();
		// this._goldValueText.text = Api.playerVoApi.getPlayerGoldStr();
		this._officerText.text = Api.playerVoApi.getPlayerMinLevelStr();
		this._officerText.x = 62 - this._officerText.width*this._officerText.scaleX/2;;
		// this._powerValueText.text = Api.playerVoApi.getPlayerPowerStr();
		if(this._isShowName)
		{
			this._nickNameText.text = Api.playerVoApi.getPlayerName();
			// this._nickNameText.anchorOffsetX = this._nickNameText.width/2;
		}
		this.refreshUpgradeClip();
	}
	protected changeImgNotify()
	{
		let res = "user_head" + Api.playerVoApi.getPlayePicId();
		this.headImg.setload(res);
		let headBg = Api.playerVoApi.getVipHeadBg() ;
		if(headBg){
			// this.headBg.texture = ResourceManager.getRes(headBg);	
			this.headBg.setload(headBg);
			

			// 头像框动画
			if (headBg == "head_circle_bg_4111") { // 显示特效
				if (!this.headEffect) {
					let headEffect = ComponentManager.getCustomMovieClip(`ryeharvestheadeffect1-`, 14, 70);
					// headEffect.width = 150;
					// headEffect.height = 145;
					headEffect.name = "myHeadEffect";
					headEffect.playWithTime(0);
					headEffect.x = this.headBg.x + this.headBg.width/2 - 150/2 +2;
					headEffect.y = this.headBg.y + this.headBg.height/2 - 145/2;
					let containerWidth = this.headBg.parent.width;
					let containerHeight = this.headBg.parent.height;
					this.headBg.parent.addChild(headEffect);
					this.headBg.parent.width = containerWidth;
					this.headBg.parent.height = containerHeight;
					this.headEffect = headEffect;
				}
			} else if (this.headEffect) { // 不显示特效
				this.headEffect.parent.removeChild(this.headEffect);
				this.headEffect = null;
			}
		}
		else{
			this.headBg.setload("head_circle_bg");
		}
	}

	private checkPrestigeRedDot()
	{
		if (Api.switchVoApi.checkOpenPrestige())
		{
			if (Api.prestigeVoApi.isShowRedDot)
			{
				App.CommonUtil.addIconToBDOC(this._headContiner);
			}
			else {
				App.CommonUtil.removeIconFromBDOC(this._headContiner);
			}
		}
	}
	public checkPracticeRed()
	{
		this.refreshUpgradeClip();
	}
	//deltaY 寻访需要的参数，表示顶部条初始的y坐标位置
	public showEnterAni(isInit:boolean = false,deltaY?:number)
	{
		let waitT =  50;
		if(!isInit){
			waitT =  0;
		}
		deltaY = deltaY || 0 ;
		this.y = -110;
		this.alpha = 0;
		egret.Tween.get(this,{loop:false}).wait(waitT).to({y:deltaY,alpha:1.0},300,egret.Ease.sineOut);
	}

	public showExitAni()
	{
		let waitT = 100;// 700;
		this.y = -0;
		this.alpha = 1.0;
		egret.Tween.get(this,{loop:false}).wait(waitT).to({y:-110,alpha:0},300,egret.Ease.sineInOut);

	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.refresh,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG,this.changeImgNotify,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_UNSET,this.changeImgNotify,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR,this.changeImgNotify,this);
		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PRESTIGE,this.checkPrestigeRedDot,this);
		/**
		 * 检测修身相关红点
		 */
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkPracticeRed,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_UNLOCK,this.refreshUi,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESHVO_LEVY,this.refreshAddTxt,this);

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_SHOWUHEADHAND,this.showUnlockHand,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK,this.hideUnlockHand,this);

		this.headImg=null;
		this._nickNameText=null;
		// this._powerValueText=null;
		this._officerText=null;
		// this._soldierValueText=null;
		// this._foodValueText=null;
		// this._goldValueText=null;
		// this._gemValueText=null;
		this._isShowName=false;
		this._upgradeClip=null;
		this.headBg = null;
		this.headEffect = null;
		this._headContiner = null;
		this._soldierbar = null;
		this._powerbar = null;
		this._gembar = null;
		this._goldbar = null;
		this._foodbar = null;
		this._addgoldBtn = null;
		this._goldAddTxt = null;
		this._foodAddTxt = null;
		this._soldierAddTxt = null;
		this._clickHand = null;
	
		super.dispose();
	}
}