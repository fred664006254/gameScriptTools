/**
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeView
 */

class ChallengeView extends CommonView
{
	
	private _topContiner:BaseDisplayObjectContainer=undefined;
	private _middleContiner:BaseDisplayObjectContainer=undefined;
	private _buttomContiner:BaseDisplayObjectContainer=undefined;

	private _scrollContiner:BaseDisplayObjectContainer=undefined;

	/**
	 * 六个关卡按钮
	 */
	private _attackBtnTab:ChallengeButton[] = [];
	/**
	 * 已过关图片
	 */
	private _passIconTab:BaseBitmap[] = [];
	private _lineIconTab:BaseBitmap[] = [];

	private _soldierText:BaseTextField = null;
	private _expProgress:ProgressBar = null;

	private _bigChannel:number = 0;
	private _middleChannel:number = 0;

	private _upgradeClip:CustomMovieClip;
	private _circleHead:BaseDisplayObjectContainer;
	private _officerIcon:BaseBitmapText|BaseTextField = null;
	private _clickHand:BaseBitmap;
	private _task10ClickTimes:number = 0;
	private _autoFight:BaseButton = null;
	private _mainTaskHandKey:string = null;
	private _mainTaskHandKey1:string = null;

	public constructor() {
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getBigFrame():string
	{	
		return null;
	}

	protected getTitlePic():string
	{	
		return null;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					this.getMiddlePic(),
					"challenge_pass",
					"progress4","progress7_bg",
					"promotion_officerbg1",
					"channel_bg",
					"channel_light",
					"channel_knife",
					"battle_boss",
					"challenge_icon_force",
					"challenge_arrow",
					"challenge_icon_power",
					"office_fnt",
					"challenge_story_bg",
					"challenge_top_bg",
					"btn_challenge_auto",
					"mainui_fg",
					"guide_hand",
					]);
	}

	private getMiddlePic():string
	{
		return "challenge_bg1" // + (Api.challengeVoApi.getCurBigChannelId() % 4 + 1);
	}

	protected getTitleStr():string
	{
		return "challengeTitle" + Api.challengeVoApi.getCurBigChannelId();
	}

	protected getDescStr():string
	{	
		return  "challengeDesc" + Api.challengeVoApi.getCurBigChannelId();
	}

	// 规则说明内容
	protected getRuleInfo():string
	{
		return "challengeInfo";
	}

	public initView():void
	{	
		this.titleTF.size = 24;
		this.titleTF.bold = true;
		this.titleTF.y+=3;

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.refresh,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED2,this.refreshUpgradeClip,this);
		Api.mainTaskVoApi.isKeepGuide = true;
		Api.mainTaskVoApi.checkShowGuide();
		this._bigChannel = Api.challengeVoApi.getCurBigChannelId();
		this._middleChannel = Api.challengeVoApi.getCurMiddleChannelId();

		this.container.y = this.getTitleButtomY();
		this._scrollContiner = new BaseDisplayObjectContainer();

		// let rect:egret.Rectangle = egret.Rectangle.create();
		// rect.setTo(0,0,GameConfig.stageWidth,(GameConfig.stageHeigth-this.getTitleButtomY() - 20));

		// let scrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
		// this.addChildToContainer(scrollView);

		//不拖动
		this.addChildToContainer(this._scrollContiner);

		this._topContiner=new BaseDisplayObjectContainer();
		this._scrollContiner.addChild(this._topContiner);

		
		this.initTop();
		this.initMiddle();
		this.initButtom();
		this.tick();

		if(	Api.rookieVoApi.isInGuiding)
		{
			Api.rookieVoApi.checkNextStep();
		}
		
		if (!Api.rookieVoApi.isGuiding && (!Api.rookieVoApi.isInGuiding)){
			this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
				this.container,
				this._middleContiner.x + this._attackBtnTab[this._middleChannel-1].x + this._attackBtnTab[this._middleChannel-1].width/2,
				this._middleContiner.y + this._attackBtnTab[this._middleChannel-1].y + this._attackBtnTab[this._middleChannel-1].height/2, 
				(this._autoFight?[this._attackBtnTab[this._middleChannel-1],this._autoFight]:[this._attackBtnTab[this._middleChannel-1]]), // 如果有一键推关按钮，那么一键推关点了之后，主线任务的手也要消失
				105, 
				true, 
				function() {
					let curLv = Api.playerVoApi.getPlayerLevel()
					let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
					if(!nextLvCfg)
					{
						//已升到最大官阶
						return false;
					} 
					else if (Api.playerVoApi.getPlayerExp()  <  nextLvCfg.exp)
					{
						return true;
					} 
					else 
					{
						return false;
					}
				}, 
				this
			);

			this._mainTaskHandKey1 = App.MainTaskHandUtil.addHandNode(
				this.container,
				this._middleContiner.x + this._attackBtnTab[this._middleChannel-1].x + this._attackBtnTab[this._middleChannel-1].width/2,
				this._middleContiner.y + this._attackBtnTab[this._middleChannel-1].y + this._attackBtnTab[this._middleChannel-1].height/2, 
				(this._autoFight?[this._attackBtnTab[this._middleChannel-1],this._autoFight]:[this._attackBtnTab[this._middleChannel-1]]), // 如果有一键推关按钮，那么一键推关点了之后，主线任务的手也要消失
				106, 
				true, 
				function() {
					return true;
				}, 
				this
			);
		}
	}
	
	private initTop():void
	{
		let topinfobg:BaseBitmap=BaseBitmap.create("challenge_top_bg");
		this._topContiner.addChild(topinfobg);

		// let headBg:BaseBitmap=BaseBitmap.create("mainui_headbg");
		// headBg.setPosition(60,App.CommonUtil.getCenterY(topinfobg,headBg,false)+1);
		// headBg.name = "headBg";
		// this._topContiner.addChild(headBg);

		// this._circleHead = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());	
		this._circleHead = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),Api.playerVoApi.getPlayerPtitle());	
		this._circleHead.setPosition( 2, 6);
		this._topContiner.addChild(this._circleHead);
		this._circleHead.addTouchTap(this.roleHeadClickHandler,this);

		//官职

		this._officerIcon =ComponentManager.getBitmapText( Api.playerVoApi.getPlayerOffice(), "office_fnt",0xfff000);
		this._officerIcon.setScale(0.85)
		this._officerIcon.setPosition(this._circleHead.x + this._circleHead.width/2 - this._officerIcon.width*this._officerIcon.scaleX/2 ,this._circleHead.y+63);
		this._topContiner.addChild(this._officerIcon);

		//权势
		let powerBg = BaseBitmap.create("public_9_resbg");
		powerBg.setPosition(105, this._circleHead.y + 2);
		powerBg.width = 172;
		this._topContiner.addChild(powerBg);

		let powerIcon = BaseLoadBitmap.create("challenge_icon_power");
		powerIcon.setPosition(powerBg.x - 3, powerBg.y);
		this._topContiner.addChild(powerIcon);

		let powerValueText = ComponentManager.getTextField(App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerPower()),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xfdf2e8);
		powerValueText.setPosition(powerBg.x + 50, powerBg.y+powerBg.height/2 - powerValueText.height/2+2);
		this._topContiner.addChild(powerValueText);

		//武力 
		let focreBg:BaseBitmap=BaseBitmap.create("public_9_resbg");
		focreBg.setPosition(powerBg.x+175,powerBg.y);
		focreBg.width = powerBg.width;
		this._topContiner.addChild(focreBg);
		
		let resImg1 = BaseBitmap.create("challenge_icon_force");
		resImg1.setPosition(focreBg.x - 3, focreBg.y);
		this._topContiner.addChild(resImg1);

		let attText = ComponentManager.getTextField(App.StringUtil.changeIntToText(Api.playerVoApi.getAtk()),TextFieldConst.FONTSIZE_CONTENT_COMMON,powerValueText.textColor);
		attText.setPosition(focreBg.x + 50, focreBg.y+focreBg.height/2 - attText.height/2+2);
		this._topContiner.addChild(attText);

		
		//士兵数量
		let soldierBg:BaseBitmap=BaseBitmap.create("public_9_resbg");
		soldierBg.setPosition(focreBg.x+175,focreBg.y);
		soldierBg.width = powerBg.width;
		this._topContiner.addChild(soldierBg);

		let resImg3 = BaseBitmap.create("public_icon4");
		resImg3.setPosition(soldierBg.x - 3, soldierBg.y);
		this._topContiner.addChild(resImg3);

		this._soldierText = ComponentManager.getTextField(App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier()),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		this._soldierText.setPosition(soldierBg.x + 50, soldierBg.y+soldierBg.height/2 - this._soldierText.height/2+2);
		this._topContiner.addChild(this._soldierText);


		//政绩
		let resImg2 = BaseBitmap.create("public_icon5");
		resImg2.setPosition(powerBg.x - 3, powerBg.y+49);
		this._topContiner.addChild(resImg2);

		this._expProgress = ComponentManager.getProgressBar("progress4","progress7_bg",463);
		this._expProgress.setPosition(resImg2.x+ 55,resImg2.y+resImg2.height/2 - this._expProgress.height/2);
		this._expProgress.setTextSize(TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._topContiner.addChild(this._expProgress);
		this.resetExpProgress();
		this.refreshUpgradeClip();

	}

	private roleHeadClickHandler():void
	{
		// ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
		PlayerBottomUI.getInstance().show();
	}

	private resetExpProgress():void
	{
		let exp:number = Api.playerVoApi.getPlayerExp();
		let nextExp:number = Api.playerVoApi.getNextLevelExp();
		this._expProgress.setText( LanguageManager.getlocal("playerview_exp")+ exp.toString() + "/" + nextExp.toString());
		this._expProgress.setPercentage( exp / nextExp);
		this._soldierText.text = App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier());
	}

	private attAllClickHandler():void
	{
		
		if(Api.playerVoApi.getSoldier() <= 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("challengeCannotAtt"));
			return;
		}

		if(Api.challengeVoApi.getIsBossChannel()){
			App.CommonUtil.showTip(LanguageManager.getlocal("challengeAutoFightForbidden"));
			return;
		}

		ViewController.getInstance().openView(ViewConst.POPUP.CHALLENGEAUTOPOPUPVIEW,{f:this.callbackHandler,o:this});
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
		this._mainTaskHandKey1 = null;
	}
	//一键推关回调
	private callbackHandler()
	{
		this.resetExpProgress();

		this._bigChannel = Api.challengeVoApi.getCurBigChannelId();

		this._attackBtnTab[this._middleChannel-1].hiddenKnifeAnim();

		this._middleChannel = Api.challengeVoApi.getCurMiddleChannelId();;

		for (let i:number=0; i<6; i++) {
			if (this._middleChannel -1 == i) {
				this._attackBtnTab[i].visible = true;
			}
			else {
				this._attackBtnTab[i].visible = false;
			}

			if (this._middleChannel -1 > i)
			{	
				if (this._passIconTab[i]) 
				{
					this._passIconTab[i].visible = true;
				}
				else 
				{
					let tempBtn:ChallengeButton = this._attackBtnTab[i];
					let passTip:BaseBitmap=BaseBitmap.create("challenge_pass");
					passTip.setPosition(tempBtn.x, tempBtn.y);
					this._middleContiner.addChild(passTip);
					this._passIconTab.push(passTip);
				}
			}
        }

		for (let i:number=0; i<5; i++) {
			if (this._middleChannel-1 > i) {
				this._lineIconTab[i].visible = true;
				if (this._middleChannel -2 > i) {
					App.DisplayUtil.changeToGray(this._lineIconTab[i]);
				}
			}

        }
		
		this._attackBtnTab[this._middleChannel-1].showClickable();
		
		this.refreshUpgradeClip();

	}

	private initMiddle():void
	{	
		// this._middleContiner.dispose();
		// this._attackBtnTab.length = 0;

		this._middleContiner=new BaseDisplayObjectContainer();
		this._middleContiner.y = 105;
		this._scrollContiner.addChild(this._middleContiner);

		this._scrollContiner.swapChildren(this._topContiner,this._middleContiner);

		let middleBg:BaseBitmap=BaseBitmap.create(this.getMiddlePic());
		// middleBg.setPosition((GameConfig.stageWidth-middleBg.width)/2, (GameConfig.stageHeigth - 195- this._middleContiner.y - middleBg.height)/2 - 20);
		middleBg.setPosition(0,GameConfig.stageHeigth - middleBg.height -  225);
		this._middleContiner.addChild(middleBg);

		if (Api.switchVoApi.checkAutoMopup()) 
		{
			if (Api.playerVoApi.getPlayerVipLevel() < 6) 
			{
				let reachText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("challengeAutoFightTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
				reachText.setPosition(GameConfig.stageWidth - reachText.width - 20,  GameConfig.stageHeigth - 403 - reachText.height/2);

				let blackBgRect: BaseBitmap = BaseBitmap.create("public_itemtipbg");
				blackBgRect.scaleX = -1;
				blackBgRect.width = reachText.width + 55;
				blackBgRect.height = 36;
				blackBgRect.x= GameConfig.stageWidth ;
				blackBgRect.y= reachText.y-7;
				this._middleContiner.addChild(blackBgRect);

				this._middleContiner.addChild(reachText);
			}
			else {
				let autoFight:BaseButton = ComponentManager.getButton( "btn_challenge_auto", null, this.attAllClickHandler, this);
				autoFight.setPosition(GameConfig.stageWidth - autoFight.width - 20, GameConfig.stageHeigth - 435 - autoFight.height/2);
				this._middleContiner.addChild(autoFight);
				this._autoFight = autoFight;
			}
		}


		let posTab:number[][] = [[150,0],[376,90],[154,180],[380,270],[149,360],[377,450]];

		let curChannel:number = Api.challengeVoApi.getCurChannelId();
		let curNum:number = Api.challengeVoApi.getCurMiddleChannelId() -1;

		let offsetY = GameConfig.stageHeigth/2 - 195 + 160;
		for (let i=0; i<6; i++)
		{	
			if (i<=4) {

				let arrowIcon:BaseBitmap=BaseBitmap.create("challenge_arrow");
				arrowIcon.anchorOffsetX = arrowIcon.width/2;
				arrowIcon.anchorOffsetY = arrowIcon.height/2;
				arrowIcon.x = posTab[i][0]/2 + posTab[i+1][0]/2 + 65;
				arrowIcon.y = offsetY - posTab[i][1]/2 - posTab[i+1][1]/2 + 65;
				
				if (i%2 == 1) {
					arrowIcon.scaleX = -1;
					arrowIcon.rotation = 25;
				}
				else {
					arrowIcon.rotation = -25;
				}

				if (curNum-1 < i) {
					arrowIcon.visible = false;
				}
				else if (curNum-1 > i) {
					App.DisplayUtil.changeToGray(arrowIcon);
				}
				else {

				}

				this._middleContiner.addChild(arrowIcon);
				this._lineIconTab.push(arrowIcon);
			}

			let attButtom:ChallengeButton = new ChallengeButton();
			attButtom.initButton(this.onClickAttack,this,i)
			attButtom.setPosition(posTab[i][0],offsetY-posTab[i][1]);
			this._attackBtnTab.push(attButtom);
			this._middleContiner.addChild(attButtom);

			if (curNum > i) {

				let passTip:BaseBitmap=BaseBitmap.create("challenge_pass");
				passTip.setPosition(posTab[i][0],offsetY-posTab[i][1]);
				this._middleContiner.addChild(passTip);
				this._passIconTab.push(passTip);

				attButtom.visible = false;
			}
			
		}
	}

	private initButtom():void
	{
		// this._buttomContiner.dispose();

		this._buttomContiner=new BaseDisplayObjectContainer();
		this._buttomContiner.y =  GameConfig.stageHeigth - 195 - this.getTitleButtomY();
		this._scrollContiner.addChild(this._buttomContiner);
	
		let buttomBg:BaseBitmap=BaseBitmap.create("challenge_story_bg");
		this._buttomContiner.addChild(buttomBg);

		let line1 = BaseBitmap.create("public_line3");
		line1.width = 480;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = buttomBg.y + 24;
		this._buttomContiner.addChild(line1);
		if(PlatformManager.checkIsEnLang())
		{
			line1.setVisible(false);
		}

		// let titleBg:BaseBitmap=BaseBitmap.create("promotion_officerbg1");
		// titleBg.setPosition(GameConfig.stageWidth/2 - titleBg.width/2 + 20, 10);
		// this._buttomContiner.addChild(titleBg);

		// let bg5:BaseBitmap = BaseBitmap.create("public_9_bg21");
		// bg5.width = 590;
		// bg5.height = buttomBg.height  - 110;
		// bg5.y = 67;
		// bg5.x = 25;
		// this._buttomContiner.addChild(bg5);

		// this.titleTF.text = LanguageManager.getlocal(this.getTitleStr());

		let titleText:BaseTextField = ComponentManager.getTextField(Api.challengeVoApi.getCurBigChannelId().toString() + ". "+LanguageManager.getlocal(this.getTitleStr()),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BLACK);
		titleText.setPosition(GameConfig.stageWidth/2 - titleText.width/2, 24);
		this._buttomContiner.addChild(titleText);

		this.titleTF.text = titleText.text;
		this.titleTF.x = GameConfig.stageWidth/2 - this.titleTF.width/2;

		let descText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDescStr()),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		descText.width = GameConfig.stageWidth - 100;
		descText.lineSpacing = 6;
		this._buttomContiner.addChild(descText);
		descText.setPosition(50, 56);
	}

	private onClickAttack():void
	{	
		this._task10ClickTimes++ ;
		for (var k8 in this._attackBtnTab) {
            this._attackBtnTab[k8].visible = false;
        }
		for (var k9 in this._passIconTab) {
            this._passIconTab[k9].visible = false;
        }
		for (var k10 in this._lineIconTab) {
            this._lineIconTab[k10].visible = false;
        }

		let challengeConfig:any = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
		if ( challengeConfig.dialogue ) {
			let key:string = LocalStorageConst.LOCAL_CHALLENGE_STORY+"_cId_"+Api.challengeVoApi.getCurChannelId()+"_zId_"+ServerCfg.selectServer.zid+"_pId_"+Api.playerVoApi.getPlayerID();
			let value:string = LocalStorageManager.get(key);
			// value=null;
			if (value) {
				this.realAttackChannel();
			}
			else {
				ViewController.getInstance().openView(ViewConst.BASE.CHALLENGESTORY,{f:this.realAttackChannel,o:this,dialogue:challengeConfig.dialogue});
				LocalStorageManager.set(key,"1");
			}
		}
		else {
			this.realAttackChannel();
		}
		
	}

	private realAttackChannel():void
	{
		if (Api.challengeVoApi.getIsBossChannel() == true) {
			ViewController.getInstance().openView(ViewConst.BATTLE.BOSSBATTLEVIEW,{f:this.refreshInfo,o:this});
		}
		else {
			ViewController.getInstance().openView(ViewConst.BATTLE.FIGHTVIEW,{f:this.refreshInfo,o:this});
		}
	}

	private refreshInfo():void
	{	

		if (this._expProgress == null) {
			return;
		}

		let openViewMessage:string = Api.challengeVoApi.getOpenViewMessage();
		if (openViewMessage) {
			this.hide();
			return App.CommonUtil.showTip(openViewMessage);
		}

		this.resetExpProgress();

		let newBigChannel:number = Api.challengeVoApi.getCurBigChannelId();
		let newMiddleChannel:number = Api.challengeVoApi.getCurMiddleChannelId();

		for (let i:number=0; i<6; i++) {
			if (this._middleChannel -1 == i) {
				this._attackBtnTab[i].visible = true;
			}
        }
		for (var k9 in this._passIconTab) {
            this._passIconTab[k9].visible = true;
        }

		for (let i:number=0; i<5; i++) {
			if (this._middleChannel-1 > i) {
				this._lineIconTab[i].visible = true;
			}
        }

		if (this._bigChannel != newBigChannel) {
			this._middleContiner.dispose();
			this._passIconTab.length = 0;
			this._attackBtnTab.length = 0;
			this._lineIconTab.length = 0;
			this.initMiddle();
			this._buttomContiner.dispose();
			this.initButtom();
			this._bigChannel = newBigChannel;
			this._middleChannel = newMiddleChannel;

		}
		else if (this._middleChannel != newMiddleChannel) {
			this.showPassAnim();
		}
		this.refreshUpgradeClip();
	}

	private showPassAnim():void
	{
		let tempBtn:ChallengeButton = this._attackBtnTab[this._middleChannel-1];
		tempBtn.visible = false;

		let arrowIcon:BaseBitmap = this._lineIconTab[this._middleChannel-2];
		if (arrowIcon) {
			App.DisplayUtil.changeToGray(arrowIcon);
		}
		

		let tempLight:BaseBitmap = BaseBitmap.create("channel_light");
		let passTip:BaseBitmap=BaseBitmap.create("challenge_pass");
		// let realPos:egret.Point = egret.Point.create(tempBtn.x + tempLight.width/2 - passTip.width/2 + 8, tempBtn.y+(tempLight.height - passTip.height)/2);
		let realPos:egret.Point = egret.Point.create(tempBtn.x, tempBtn.y);
		passTip.scaleX = 2;
		passTip.scaleY = 2;
		passTip.setPosition(realPos.x - passTip.width/2 , realPos.y - passTip.height/2);
		this._middleContiner.addChild(passTip);
		this._passIconTab.push(passTip);

		egret.Tween.get(passTip).to({x:realPos.x, y:realPos.y, scaleX:1, scaleY:1 } ,800 ).call(this.setButtonStatus, this);
	}

	private setButtonStatus():void
	{	
		let arrowIcon:BaseBitmap = this._lineIconTab[this._middleChannel-1];
		if (arrowIcon) {
			arrowIcon.visible = true;
		}

		let newMiddleChannel:number = Api.challengeVoApi.getCurMiddleChannelId();
		this._attackBtnTab[this._middleChannel-1].hiddenKnifeAnim();
		this._attackBtnTab[newMiddleChannel-1].showClickable();
		this._middleChannel = Api.challengeVoApi.getCurMiddleChannelId();;
	}

	protected getButtomLineBg():string
	{
		return null;
	}

	protected refreshUpgradeClip()
	{
		let curLv = Api.playerVoApi.getPlayerLevel()
		let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
		
		if (nextLvCfg && Api.playerVoApi.getPlayerExp() >=  nextLvCfg.exp || Api.practiceVoApi.isShowRedForPBottom()  || Api.prestigeVoApi.isShowRedForPBottom() )
		 {
			 if (!this._upgradeClip)
			 {
				this._upgradeClip = ComponentManager.getCustomMovieClip("mainui_fg",10,100);
				this._upgradeClip.x = -19;
				this._upgradeClip.y = -13;
				this._circleHead.addChildAt(this._upgradeClip,0);
				this._upgradeClip.playWithTime(0); 

			 }
		 }else
		 {
			 if (this._upgradeClip)
			 {
				 this._upgradeClip.stop();
				//  this._circleHead.removeChild(this._upgradeClip);
				 this._upgradeClip = null;

				 this._officerIcon.text = Api.playerVoApi.getPlayerOffice();
			 }
		 }
	}

	public refresh():void
	{
		this.refreshInfo();
	}

	private showHand()
	{
		this._clickHand = BaseBitmap.create("guide_hand");
		// if (!PlatformManager.hasSpcialCloseBtn()){
		// 	this._clickHand.skewY = 180;
		// }
		this._clickHand.x = PlatformManager.hasSpcialCloseBtn()?57:620;
		this._clickHand.y = 50;
		this.addChild(this._clickHand);
		if (Api.rookieVoApi.isInGuiding || Api.rookieVoApi.isGuiding){
			this._clickHand.visible = false;
		}
		else{
			this._clickHand.visible = true;
		}

		egret.Tween.get(this._clickHand,{loop:true})
				.to({scaleX: 0.9,scaleY:0.9}, 500)
				.to({scaleX: 1,scaleY:1}, 500)
	}

	protected tick()
	{
		let taskId = Api.mainTaskVoApi.getCurMainTaskId();
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
		if (this._clickHand){
			if (Api.rookieVoApi.isInGuiding || Api.rookieVoApi.isGuiding){
				this._clickHand.visible = false;
			}
			else{
				this._clickHand.visible = true;
			}
		}
		if(taskCfg && taskCfg.questType != 106 && Api.challengeVoApi.getCurChannelId() < 9 ){
			if(!this._clickHand){
				this.showHand();
			}
			if(this._task10ClickTimes > 0)
			{
				this._clickHand.visible = false;
				return;
			}
			this._scrollContiner.addChild(this._clickHand);
			this._clickHand.x = 210 + this._middleContiner.x;
			let tarY = GameConfig.stageHeigth/2;
			this._clickHand.y = tarY +  this._middleContiner.y +25;
		}else{
			if(!Api.rookieVoApi.isInGuiding && this._clickHand){
				this._clickHand.visible = false;
			}
		}
		return true;
	}

	public hide():void
	{	
		super.hide();
		if(	Api.rookieVoApi.isInGuiding)
		{
			Api.rookieVoApi.checkNextStep();
		}
		if (!Api.unlocklist2VoApi.checkShowOpenFunc()){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECKNPC_SHOW,{"key":"conquest"});
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.refresh,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED2,this.refreshUpgradeClip,this);
		
		Api.mainTaskVoApi.isKeepGuide = false;
		Api.mainTaskVoApi.hideGuide();
		this._middleChannel = 0;
		this._bigChannel = 0;
		for (var k5 in this._attackBtnTab) {
            this._attackBtnTab[k5].dispose();
        }
		this._attackBtnTab.length = 0;

		this._soldierText = null;
		this._expProgress = null;

		this._scrollContiner = null;
		this._topContiner = null;
		this._middleContiner = null;
		this._buttomContiner = null;
		this._passIconTab.length = 0;
		this._upgradeClip=null;
		this._circleHead= null;

		this._officerIcon = null;
		this._lineIconTab.length = 0;
		if(this._clickHand){
			egret.Tween.removeTweens(this._clickHand);
		}
		this._clickHand = null;
		this._task10ClickTimes = 0;		
		this._autoFight = null;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
		this._mainTaskHandKey1 = null;
		super.dispose();
	}

}