class DailybossBattleView extends BaseBattleView
{
	private _bossData:{killName:string,score:number,killFlag:boolean,myrank:{level:number,uid:number|string,title:string|number,value:number,myrank:number|string,name:string},joinNum:number,hp:number,totalHp:number,bossLv?:number,isDead:boolean,rankList:{value:number,title:string|number,name:string,uid:number|string}[],damage:number,logInfo:{level:number,title:string|number,name:string,uid:number|string,rewards:string}[]};
	private _lastReward:{score:number,myrank:number,rewardType:number,joinNum:number,rewards:string};

	private _buttomBg:BaseBitmap;
	private _attackBtn:BaseButton;
	private _pao:DailybossPao;
	private _selectServantId:string|number;
	private _attackRankList:ScrollList;
	private _myRankItem:DailybossDamageRankListItem;
	private _nameBg:BaseBitmap;
	private _nameTxt:BaseTextField;
	private _changePic:BaseBitmap;
	private _changeTxt:BaseTextField;
	private _killBossContainer:BaseDisplayObjectContainer;
	private _defenedWinContainer:BaseDisplayObjectContainer;
	private _bossImg:string;
	private _heroRattle:BattleRattle = null;
	private _attackEffect:CustomMovieClip = null;//开火动画
	private _allServantInfo:any;
	private _curKey:string;
	private _leftValue:number;
	private _rightValue:number;

	private _hasKill:number = 0; // 1--Boss已经被击杀
	private _exp:number = 0;
	private _dps:number = 0;
	private _rewards:string = null;
	private _wingRewardBox1:BaseBitmap;
	private _wingRewardBox2:BaseBitmap;
	private _winCollectPic:BaseBitmap;
	private _winGetRewardBtn:BaseButton;

	private _autoBattleBtn:BaseButton = null;
	private _autoBattleView:BattleAuto = null;

	private _oldType:number = 0;
	//
	private _newPower:number = 0;

	public constructor()
	{
		super();
	}

	protected initView():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER,this.autoSetServant,this);
		 Api.dailybossVoApi.needcheckweapon = 1;
		let soldiersBg:BaseLoadBitmap=BaseLoadBitmap.create("dailyboss_battle_soldier");
		soldiersBg.setPosition(0,GameConfig.stageHeigth - 760);
		this.addChildToContainer(soldiersBg);

		this._oldType = Api.dailybossVoApi.getBossType();

		this.initAttackRank();

		if(Api.dailybossVoApi.getBossType()==2&&!this._bossData.hp)
		{
			this.showKillBossBattleResult();
			if (this._autoBattleBtn)
			{
				this._autoBattleBtn.visible = false;
			}
		}
		else if(Api.dailybossVoApi.getBossType()==1&& this._bossData.bossLv>Api.dailybossVoApi.getMaxRound())
		{
			this.showDefenedWinResult();
			if (this._autoBattleBtn)
			{
				this._autoBattleBtn.visible = false;
			}
		}
		else
		{
			

			this.initAttackBtn();
			this.autoSetServant();
			this.setBossUIStatus();

			let nameBg:BaseBitmap=BaseBitmap.create("promotion_officerbg1");
			// nameBg.setScale(0.9);
			nameBg.setPosition((GameConfig.stageWidth-nameBg.width*nameBg.scaleX)/2,300);
			this.addChildToContainer(nameBg);
			this._nameBg=nameBg;

			
			let nameTxt:BaseTextField=ComponentManager.getTextField(this.getbossName(),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
			nameTxt.width=nameBg.width*nameBg.scaleX;
			nameTxt.textAlign=egret.HorizontalAlign.CENTER;
			nameTxt.setPosition(nameBg.x,nameBg.y+(nameBg.height*nameBg.scaleY-nameTxt.height)/2);
			this.addChildToContainer(nameTxt);
			this._nameTxt=nameTxt;
			if(this._bossData)
			{
				this.setTopProgress(this._bossData.hp,this._bossData.totalHp, GameConfig.stageWidth - 160,Api.dailybossVoApi.getBossType());
				this._topProgress.y = 10;
			}
			
			this.initPao();
			this.checkShowLastRankRewardView();
		}
	}


	// protected resetTopProgressAfterDamage():void
	// {
	// 	this.setTopProgress(this._bossData.hp,this._bossData.totalHp);
	// }

	private getbossName():string
	{
		let nameStr:string;
		if (Api.dailybossVoApi.getBossType() == 1) {
			let lv:number = this._bossData.bossLv;
			nameStr = LanguageManager.getlocal("dailybossNameType1",[lv.toString()]);
			if (lv > Api.dailybossVoApi.getMaxRound()) {
				lv = Api.dailybossVoApi.getMaxRound();
			}
			nameStr = nameStr + LanguageManager.getlocal("dailybossName"+lv);
		}
		else {
			nameStr = LanguageManager.getlocal("dailybossNameType2");
		}
		return nameStr;
	}

	private getBossType():number
	{
		return Api.dailybossVoApi.getBossType();
	}

	private setBossUIStatus():void
	{
		let bossLv:number=0;
		if(this._bossData.bossLv && Api.dailybossVoApi.getBossType() == 1)
		{
			bossLv=(this._bossData.bossLv-1)%5 +1;
		}
		let imgUrl:string="dailyboss_lv_"+bossLv;
		if(this._bossImg!=imgUrl)
		{	

			if (this._upHero) {
				this._upHero.resetHero(imgUrl);
			}
			else {
				this.setUpHero(imgUrl,null,3);
				this._upHero.y = 50;
				this._upPositon.y = this._upHero.y;
			}
			

			let rattle:BattleRattle = new BattleRattle();
			rattle.init(this.container,260,2);
			rattle.setPosition(350,this._upHero.y);
			rattle.resetString(null,3000,2);

			if (this._nameTxt) {
				this._nameTxt.text = this.getbossName();
			}
		}
		this._bossImg=imgUrl;
	}

	private checkShowLastRankRewardView():void
	{
		if(this._lastReward)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSRANKREWARDPOPUPVIEW,this._lastReward);
			this._lastReward=null;
			this.autoBattleCallback();
			if ( this._autoBattleBtn && this._autoBattleBtn.visible)
			{
				this._autoBattleBtn.setVisible(false);
			}
		}
	}

	private initAttackBtn():void
	{
		this._attackBtn=ComponentManager.getButton("boss_start_war","",this.attackHandle,this);
		this._attackBtn.setPosition((GameConfig.stageWidth-this._attackBtn.width)/2,this._buttomBg.y-this._attackBtn.height-20);
		this.addChildToContainer(this._attackBtn);
		this._attackBtn.visible = false;
	}

	private initPao():void
	{
		this._pao=new DailybossPao();
		this._pao.init(false);
		this._pao.setPosition(GameConfig.stageWidth-this._pao.width,-this.container.y+GameConfig.stageHeigth-this._pao.height-this._buttomBg.height);
		this.addChildToContainer(this._pao);
		// this._pao.kaiPao();
	}

	private initAttackRank():void
	{
		let buttomBg:BaseBitmap=BaseBitmap.create("public_9_downbg");
		buttomBg.width=GameConfig.stageWidth;
		buttomBg.height=172;
		buttomBg.setPosition(0,GameConfig.stageHeigth-this.container.y-buttomBg.height);
		this.addChildToContainer(buttomBg);
		this._buttomBg=buttomBg;
		buttomBg.touchEnabled=true;

		let damageTitle:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossDamageRankTitle"+Api.dailybossVoApi.getBossType()),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		damageTitle.lineSpacing=2;
		damageTitle.width=TextFieldConst.FONTSIZE_BUTTON_COMMON+4;
		damageTitle.height=this._buttomBg.height;
		damageTitle.verticalAlign=egret.VerticalAlign.MIDDLE;
		damageTitle.setPosition(this._buttomBg.x+20,this._buttomBg.y);
		this.addChildToContainer(damageTitle);
		if(!this._myRankItem)
		{
			this._myRankItem=ScrollListItem.create(DailybossDamageRankListItem,-1,this._bossData.myrank);
			this._myRankItem.setPosition(55,this._buttomBg.y+this._buttomBg.height-this._myRankItem.height-10);
			this.addChildToContainer(this._myRankItem);
		}
		let rect:egret.Rectangle=egret.Rectangle.create();
		
		let posY:number;
		if (Api.dailybossVoApi.getBossType() == 1) {
			rect.setTo(0,0,this._buttomBg.width-60,this._myRankItem.y-this._buttomBg.y+15);
			this._myRankItem.visible = false;
			this._attackRankList=ComponentManager.getScrollList(DailybossRewardListItem,this._bossData.logInfo,rect);
			this._attackRankList.setPosition(55,this._buttomBg.y+10);
			this._attackRankList.setContentPosY(10);

			posY= GameConfig.stageHeigth - 185;
		}
		else {
			rect.setTo(0,0,this._buttomBg.width-60,this._myRankItem.y-this._buttomBg.y-10);
			this._attackRankList=ComponentManager.getScrollList(DailybossDamageRankListItem,this._bossData.rankList,rect);
			this._attackRankList.setPosition(55,this._buttomBg.y+10);
			this._attackRankList.setContentPosY(10);

			let lookMore:BaseButton = ComponentManager.getButton("dailybossbattle_more","lookMore",this.damageRankHandler,this);
			lookMore.setPosition(GameConfig.stageWidth-lookMore.width,this._buttomBg.y-lookMore.height+95);
			this.addChild(lookMore);

			posY= lookMore.y;
		}

		let autoBattleNeedVipLv:number;
		if (Api.dailybossVoApi.getBossType() == 1)
		{
			autoBattleNeedVipLv = Config.VipCfg.getUnlockLvel("dailySolider");
		}
		else
		{
			autoBattleNeedVipLv = Config.VipCfg.getUnlockLvel("dailyBoss");
		}
		if (autoBattleNeedVipLv != null)
		{
			if (Api.playerVoApi.getPlayerVipLevel() < autoBattleNeedVipLv) 
			{
				let reachText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("autoBattleTip_DailyAc_1",[String(autoBattleNeedVipLv)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
				reachText.setPosition(GameConfig.stageWidth - reachText.width - 10,  posY-reachText.height-6);

				let blackBgRect: BaseBitmap = BaseBitmap.create("public_itemtipbg");
				blackBgRect.scaleX = -1;
				blackBgRect.width = reachText.width + 55;
				blackBgRect.height = 36;
				blackBgRect.x= GameConfig.stageWidth ;
				blackBgRect.y= reachText.y-7;
				this.addChild(blackBgRect);
				this.addChild(reachText);
			}
			else
			{
				this._autoBattleBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"autoBattle_DailyAc_"+this.getBossType(),this.autoBattleHandle,this);
				this._autoBattleBtn.setPosition(GameConfig.stageWidth-this._autoBattleBtn.width -6,posY-this._autoBattleBtn.height-6);
				this.addChild(this._autoBattleBtn);
				// if (Api.dailybossVoApi.getBossType() == 1)
				// {
				// 	this._autoBattleBtn.y -= 20;
				// }
			}
		}

		 this._attackRankList.setEmptyTip(LanguageManager.getlocal("dinnerMsgPopupEmptyTip"));
		
		this.addChildToContainer(this._attackRankList);
	}

	private autoBattleHandle():void
	{
		if (!this._autoBattleView)
		{	
			this._autoBattleBtn.visible = false;
			this._autoBattleView = new BattleAuto();
			this._autoBattleView.init(1,this.autoBattleCallback,this);
			this.addChild(this._autoBattleView);

			this.attackHandle();
			this._heroRattle.setVisible(false);
		}
	}

	private autoBattleCheck():void
	{	
		if (!this || !this._bossData)
		{
			return;
		}
		if (this.getBossType()==2&&!this._bossData.hp)
		{
			this.autoBattleCallback();
		}
		if (this._autoBattleView)
		{
			if (this._selectServantId)
			{
				this.attackHandle();
			}
			else
			{
				this.autoBattleCallback();
			}
		}
		else
		{
			if (this._selectServantId && this._autoBattleBtn)
			{
				this._autoBattleBtn.visible = true;
			}
			if (this.getBossType()==2 && !this._bossData.hp && this._autoBattleBtn)
			{
				this._autoBattleBtn.visible = false;
			}
		}

	}

	private autoBattleCallback():void
	{
		if (this._autoBattleView)
		{
			this._autoBattleView.dispose();
			this._autoBattleView= null;
		}
	}

	private setAttackRank():void
	{
		if(this._attackRankList)
		{	
			if (Api.dailybossVoApi.getBossType()==1) {
				if(this._bossData.logInfo){
					this._attackRankList.refreshData(this._bossData.logInfo);
				}
			}
			else {
				if(this._bossData.rankList){
					this._attackRankList.refreshData(this._bossData.rankList);
				}
			}
			
		}
		if(this._myRankItem)
		{
			this._myRankItem.refresh(-1,this._bossData.myrank);
		}
	}

	protected setDownHero(picName:string,info?:any):void
	{
		if(!this._downHero)
		{	
			this._downHero = new BattleHero();
			let showeff1 = false;

			let servant:ServantInfoVo = Api.servantVoApi.getServantObj(String(this._selectServantId));
			if (servant && servant.equip && servant.equip != ""){
				showeff1 = true;
			}
			this._downHero.init(picName, info ,3, 1, showeff1);

			this._downHero.setPosition(0,-this.container.y+GameConfig.stageHeigth-this._downHero.height*this._downHero.scaleY-165);
			// this.addChildToContainer(this._downHero);
			this.container.addChildAt(this._downHero,0);
			this._downHero.addTouchTap(this.showSelectServantHandler,this);
			this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);

		
			let changePic:BaseBitmap=BaseBitmap.create("promotion_officerbg1");
			changePic.setPosition(this._downHero.x+(this._downHero.width*this._downHero.scaleX-changePic.width)/2,this._downHero.y+this._downHero.height*this._downHero.scaleY-changePic.height-10);
			this.addChildToContainer(changePic);
			this._changePic=changePic;
			let nameTxt:BaseTextField=ComponentManager.getTextField(App.StringUtil.formatStringColor(LanguageManager.getlocal("dailybossChangeServantDesc"),TextFieldConst.COLOR_WARN_YELLOW),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
			nameTxt.width=changePic.width;
			nameTxt.textAlign=egret.HorizontalAlign.CENTER;
			nameTxt.setPosition(changePic.x,changePic.y+(changePic.height-nameTxt.height)/2);
			this.addChildToContainer(nameTxt);
			changePic.addTouchTap(this.showSelectServantHandler,this);
			this._changeTxt=nameTxt;

			this._heroRattle = new BattleRattle();
			if(PlatformManager.checkIsEnLang() ){
				this._heroRattle.init(this.container,350,2);
			} else if(PlatformManager.checkIsPtLang() || PlatformManager.checkIsRuLang()){
				this._heroRattle.init(this.container,350,2,100);
			}
			else {
				this._heroRattle.init(this.container,295,2);
			}
			
			this._heroRattle.setPosition(140,this._downHero.y -30);

		}
		else
		{
			let showeff1 = false;
			let servant:ServantInfoVo = Api.servantVoApi.getServantObj(String(this._selectServantId));
			if (servant && servant.equip && servant.equip != ""){
				showeff1 = true;
			}
			this._downHero.resetHero(picName,0,showeff1);
		}
		

		if (!picName && this._autoBattleBtn)
		{
			this._autoBattleBtn.setVisible(false);
		}

		let power:number = 0;
		if (Api.dailybossVoApi.needcheckweapon ==1)
		{
			if (this._selectServantId) 
			{
				power = Api.servantVoApi.getServantCombatWithId(String(this._selectServantId));
			}
			this.checkWeapon();
		}
		else
		{
			if (this._selectServantId) 
			{
				power = Api.servantVoApi.getServantCombatWithIdContentsWeapon(String(this._selectServantId),2);
			}
		}
		
		if (this._selectServantId) 
		{
			let qingyuanAdd = Api.encounterVoApi.getSpecialAddAttr(this._selectServantId, 2);
			power += qingyuanAdd;

			//神器
			let rattleStr:string = LanguageManager.getlocal("dailybossServantBattleTip",[LanguageManager.getlocal("servant_name"+this._selectServantId),power.toString()]);
			this._heroRattle.resetString(rattleStr,-1);
			if (!this._autoBattleView)
			{
				this._heroRattle.visible = true;
			}
		}
		else {
			
			this._heroRattle.visible = false;
		}
		
	}

	protected attackHandle():void
	{	


		if (this._isMoving) {
			return ;
		}
		

		if(!this._selectServantId)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("dailybossNoServantCanBattleDesc"));

		}
		else
		{	
			this._isMoving=true;
			this.request(NetRequestConst.REQUEST_DAILYBOSS_ATTACK,{servantId:this._selectServantId});
		}

		// this.playAttackEffect();


		//test code
		// ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSDAMAGERANKPOPUPVIEW,{rankList:this._bossData.rankList,myrank:this._bossData.myrank});
	}

	private tick():void
	{
		if (Api.dailybossVoApi.getStatus()!=1)
		{	
			if (this._oldType == 1)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("dailybossOutTime1"));
			}
			else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("dailybossOutTime2"));
			}
			this.hide();

			 let view = ViewController.getInstance().getView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,);
			 if (view&&view.isShow)
			 {
				 view.hide();
			 }
		}
	}

	private showSelectServantHandler():void
	{
		if(this._isMoving)
		{
			return;
		}
		if (this._allServantInfo == null) 
		{
			this._allServantInfo = {};
			let allKey:string[] = Api.servantVoApi.getServantInfoIdListWithSort(1);
			for (let k in allKey)
			{
				let key:string = allKey[k];
				this._allServantInfo[key] = Api.servantVoApi.getServantCombatWithIdContentsWeapon(key,2);
				let qingyuanAdd = Api.encounterVoApi.getSpecialAddAttr(key, 2);
				this._allServantInfo[key] += qingyuanAdd;
				//Api.servantVoApi.getServantCombatWithId(key);
			}
		}
		this._curKey = null;
		this._leftValue = 0;
		let allKeys:string[] = Object.keys(this._allServantInfo);
		allKeys.sort((a:string,b:string)=>
		{
			let valueA:number = Api.dailybossVoApi.checkServantcanStatus(a);
			let valueB:number = Api.dailybossVoApi.checkServantcanStatus(b);
			if (valueA == valueB)
			{
				return Number(this._allServantInfo[b] - this._allServantInfo[a]);
			}else
			{
				return Number(valueA - valueB);
			}
		});
		if (Api.dailybossVoApi.checkServantcanStatus(allKeys[0]) == 0) {
			this._curKey = allKeys[0];
			this._leftValue = this._allServantInfo[this._curKey];
		}
		this._rightValue;
		let showTab:any[] = [];
		for (let k in allKeys)
		{
			let key:string = allKeys[k];
			showTab.push([key,Api.dailybossVoApi.checkServantcanStatus(key),this._allServantInfo[key],Api.servantVoApi.getServantObj(key).banishSt]);
		}
		showTab.sort((a:any[],b:any[])=>
		{
			let valueA:number = a[1];
			let valueB:number = b[1];
			if (valueA == valueB)
			{
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
			else
			{
				return Number(valueA - valueB);
			}
		});
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,{type:ServantSelectedPopupView.TYPE_BATTLE_REC1,"info":showTab,callback:this.selectServantHandler,handler:this});
	}

	private autoSetServant():void
	{	
		this.setServant(Api.dailybossVoApi.findBestServant(this._bossData.hp));
	}

	private setServant(id:number|string):void
	{
		this._selectServantId=id
		let servantCfg=Config.ServantCfg.getServantItemById(this._selectServantId);
		let pic:string= Api.servantVoApi.getFullImgPathWithId(this._selectServantId);//servantCfg?servantCfg.fullIcon:null;
		this.setDownHero(pic);

		if (pic) {
			
			if (this._autoBattleView)
			{
			}
			else
			{
				this._attackBtn.visible = true;
				this._heroRattle.setVisible(true);
			}
		}
		else 
		{
			if (this._autoBattleView)
			{
				this.autoBattleCallback();
			}
			if ( this._autoBattleBtn && this._autoBattleBtn.visible)
			{
				this._autoBattleBtn.setVisible(false);
			}
		}
	}

	private selectServantHandler(params:{key:string}):void
	{
		let servantId:string|number=params.key;
		this._selectServantId=servantId;
		// this._downHero.resetHero(Api.servantVoApi.getFullImgPathWithId(this._selectServantId));
		this.setDownHero(Api.servantVoApi.getFullImgPathWithId(servantId));

		
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"promotion_officerbg1","progress8","progress7_bg",
			"boss_start_war",
			"boss_start_war_down",
			"dailyboss_kaopao",
			"acturantable_task_box2_1","acturantable_task_box2_3","acturantable_taskbox_light"
		]);
	}
	protected getHitAnimSources():string
	{
		return "dailyboss_baozha";
	}

	protected getHitAnimInfo():any[]
	{
		return ["dailyboss_baozha_",9];
	}

	// 标题背景名称
	// protected getTitleBgName():string
	// {
	// 	return "commonview_titlebg";
	// }

	protected getTitleStr():string
	{
		return "dailybossTimeTitle"+Api.dailybossVoApi.getBossType();
	}

	protected getBgName():string
	{
		return "dailyboss_battle_bg";
	}

	protected playHitEffcet():void
	{
		SoundManager.playEffect(SoundConst.EFFECT_DAILYBOSS_HIT);
	}

	protected playFireEffcet():void
	{
		SoundManager.playEffect(SoundConst.EFFECT_DAILYBOSS_FIRE);
	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_DAILYBOSS_GETDETAILS,requestData:{}};
	}

	// protected requestLoadError():void
	// {
	// 	super.requestLoadError();
	
	// 	if(this.getBossType()==1)
	// 	{	
	// 		if (this._selectServantId)
	// 		{
	// 			if (this._autoBattleView )
	// 			{
	// 				this.autoBattleCallback();
	// 			}
	// 			if (this._autoBattleBtn && !this._autoBattleBtn.visible)
	// 			{
	// 				this._autoBattleBtn.visible = true;
	// 			}
	// 		}	
	// 	}
	// }

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		// if(data.data.cmd==NetRequestConst.REQUEST_DAILYBOSS_ATTACK)
		// {
		// 	data={ret:true,data:{"uid":1000842,"cmd":"dailyboss.attack","ts":1512216439,"zoneid":1,"data":{"lastReward":{"rewards":"5_1_100","rewardType":1,"score":100,"joinNum":3,"myrank":1},"userinfo":{"politics":10003317,"level":7,"vip":3,"exp":7339,"usegems":3878,"mygname":"","uid":1000842,"gem":10011291,"pic":1,"todayolt":98412,"soldier":1810864767,"freeg":10002589,"lastday":0,"buyn":7,"tcost":0,"mygid":0,"food":942226428,"charm":5010506,"olt":1512216173,"buyg":2580,"vipexp":258,"atk":6799825536,"gold":542670022,"buyt":1511320592,"inte":10897,"totalolt":98412,"title":"","name":"宦清雅","power":6814850256},"dailyboss":{"shop":{},"servant":{"1002":1,"1003":1,"1033":1},"lastday":1512144000,"info":{"lastAttack":1512144000,"damage":4004741362,"lastGet":1512144000},"score":5462,"version":1512190800,"tscore":5462},"bossData":{"totalHp":3500000000,"rewards":"5_1_100","killFlag":true,"myrank":{"uid":1000842,"title":"","myrank":1,"value":4004741362},"isDead":true,"hp":0,"damage":1001045258,"killName":"宦清雅","score":1415,"joinNum":3,"rankList":[{"uid":"1000842","title":"","name":"宦清雅","value":4004741362},{"uid":"1001337","title":"","name":"弓芮","value":440184},{"uid":"1000499","title":"","name":"林蛋大","value":330138}]}},"rnum":8,"ret":0}};
		// }
		if(data.ret)
		{	

			if(data.data.data.bossData)
			{
				this._bossData=data.data.data.bossData;
			}
			if(data.data.data.lastReward)
			{
				this._lastReward=data.data.data.lastReward;
			}
			if(this._bossData.myrank==null)
			{
				this._bossData.myrank=<any>{};
			}
			if(Object.keys(this._bossData.myrank).length<1)
			{
				this._bossData.myrank={uid:Api.playerVoApi.getPlayerID(),title:Api.playerVoApi.getTitleInfo(),value:0,myrank:"10000+",name:Api.playerVoApi.getPlayerName(),level:Api.playerVoApi.getPlayerLevel()};
			}
			if(this._bossData.myrank.name==null)
			{
				this._bossData.myrank.name=Api.playerVoApi.getPlayerName();
			}
			if(data.data.cmd==NetRequestConst.REQUEST_DAILYBOSS_ATTACK)
			{
				this._hasKill = data.data.data.hasKill;
				if (this._hasKill == 1) {
					ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW,{type:3, f:this.killBossCallback, o:this });
					NetManager.request(NetRequestConst.REQUEST_DAILYBOSS_GETDETAILS,{});
					return;
				}
				this._exp = data.data.data.bossData.score;
				this._rewards= data.data.data.bossData.rewards;
				this._dps = data.data.data.bossData.damage;

				this.playAttackEffect();
			}
			else
			{
				if(data.data.data.rewards)
				{
					App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
				}
			}
			if (data.data.cmd == NetRequestConst.REQUEST_DAILYBOSS_GETCLEARREWARD) {
				this.refreshWinRewardInfo();
			}
		}
		else
		{
			this._isMoving = false;
			if(data.data.cmd==NetRequestConst.REQUEST_DAILYBOSS_ATTACK)
			{
				if (this._autoBattleBtn && 	!this._autoBattleBtn.visible)
				{
					this._autoBattleBtn.visible = true;
				}
				if (this._autoBattleView)
				{
					this.autoBattleCallback();
				}
			}
		}
	}

	private killBossCallback():void
	{
		this.refreshUIStatusByAttack();
		this.autoBattleCheck();
	}

	private playAttackEffect():void
	{		
		this._isMoving = true;
		this._attackBtn.visible = false;

		let scaleBig:number = 1.06;
		let moveFirst:egret.Point = egret.Point.create( this._downHero.x - (scaleBig-1)*this._downHero.width/2 ,this._downHero.y - (scaleBig-1)*this._downHero.height/2);

		egret.Tween.get(this._downHero).
		to({x:moveFirst.x,y:moveFirst.y,scaleX:scaleBig,scaleY:scaleBig},300).
		to({x:this._downHero.x, y:this._downHero.y, scaleX:1,scaleY:1},300).call(this.fireEffect,this);
	}

	private fireEffect():void
	{
		this._attackEffect=ComponentManager.getCustomMovieClip("dailyboss_kaopao_",8,30);
		this._attackEffect.setPosition(this._pao.x+48,this._pao.y+11);
		this._attackEffect.setEndCallBack(this.fireCallback,this);
		this._attackEffect.playWithTime(1);
		this.addChildToContainer(this._attackEffect);
		this.playFireEffcet();
		this._pao.kaiPao();

		let ths=this;
		let angle:number = this._pao.getAngle();
		let paodan:BaseBitmap=BaseBitmap.create("dailybossbattle_paodan");
			paodan.setPosition(this._pao.x+40, this._pao.y);
			ths.addChildToContainer(paodan);
			App.DisplayUtil.addFactorFunc(BaseBitmap);
			let endPos:egret.Point = egret.Point.create(this._upHero.x+this._upHero.width/2 - paodan.width/2,this._upHero.y+this._upHero.height/2 - paodan.height/2);
			paodan["tweenMoveList"]=[egret.Point.create(paodan.x,paodan.y),egret.Point.create(paodan.x/2+endPos.x/2 + 80,paodan.y/2+endPos.y/2 -80),endPos];
			
			egret.Tween.get(paodan).to({factor:1},300).call(function(paodan:BaseBitmap){
				if(paodan)
				{
					paodan["tweenMoveList"]=undefined;
					paodan.dispose();
					ths.showBossBehit();
				}
		},ths,[paodan]);

			
		
	}

	private fireCallback():void
	{
		this._attackEffect.dispose();

	}

	protected showBossBehit():void
	{
			
		
		this._heroArray.length = 0;
		this._damage = this._bossData.damage;
		this._area = 1;
		let offsetY:number; 
		let moveY:number;
		let scaleTo:number = 0.4;
		let offsetX:number;
		
		this._heroArray=[this._downHero,this._upHero];
		
		this.showBeAttackAnim();
	}

	protected atkEndCallback():void
	{
		this.refreshUIStatusByAttack();
		

		if(this._bossData) //killFlag真说明是我打死的
		{
			if(!this._bossData.hp)
			{
				if(this._bossData.killFlag)
				{
					App.MessageHelper.addEventListener(ViewConst.POPUP.DAILYBOSSLASTATTACKPOPUPVIEW,this.checkShowLastRankRewardView,this);
					ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSLASTATTACKPOPUPVIEW,this._bossData);
				}
				else
				{
					this.checkShowLastRankRewardView();
				}
			}
		}
	}

	private showKillBossBattleResult():void
	{
		if(!this._killBossContainer)
		{
			this._killBossContainer=new BaseDisplayObjectContainer();
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,345,401);
			let killBg:BaseLoadBitmap=BaseLoadBitmap.create("dailybossbattle_successbg",rect);
			this._killBossContainer.addChild(killBg);

			let killerTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossKillerDesc",[this._bossData.killName]),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			killerTxt.lineSpacing=5;
			killerTxt.textAlign = egret.HorizontalAlign.CENTER;
			killerTxt.setPosition(killBg.x+(killBg.width-killerTxt.width)/2,killBg.y+150);
			this._killBossContainer.addChild(killerTxt);

			let personNumTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossPersonNumDesc",[this._bossData.joinNum.toString()]),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			personNumTxt.setPosition(killBg.x+(killBg.width-personNumTxt.width)/2,killerTxt.y+killerTxt.height+20);
			this._killBossContainer.addChild(personNumTxt)
			
			if(!Api.switchVoApi.checkOpenShenhe())
			{	
				let rankBtnText = "dailybossDamageRankTitle2";
				if (PlatformManager.checkIsEnLang()){
					rankBtnText = "acCrossServerPowerRankListViewTitle";
				}
				let rankBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,rankBtnText,this.damageRankHandler,this);
				rankBtn.setPosition(killBg.x+(killBg.width-rankBtn.width)/2,personNumTxt.y+personNumTxt.height+25);
				this._killBossContainer.addChild(rankBtn);
				this._killBossContainer.setPosition((GameConfig.stageWidth-this._killBossContainer.width)/2,(-this.container.y+(GameConfig.stageHeigth-this._killBossContainer.height)/2));
				this.addChildToContainer(this._killBossContainer);
			}
		}
	}

	private showDefenedWinResult():void
	{
		if(!this._defenedWinContainer)
		{
			this._defenedWinContainer=new BaseDisplayObjectContainer();
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,345,401);
			let killBg:BaseLoadBitmap=BaseLoadBitmap.create("dailyboss_defened",rect);
			this._defenedWinContainer.addChild(killBg);

			if (!PlatformManager.checkIsRuSp())
			{
				let rewardTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("reward"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
				rewardTxt.lineSpacing=5;
				rewardTxt.textAlign = egret.HorizontalAlign.CENTER;
				rewardTxt.setPosition(killBg.x+(killBg.width-rewardTxt.width)/2,killBg.y+killBg.height/2-58);
				this._defenedWinContainer.addChild(rewardTxt);

				let boxBg:BaseButton=ComponentManager.getButton("acturantable_taskbox_light",null,this.lookRewardBtnHandler,this);
				boxBg.x = killBg.x+(killBg.width-boxBg.width)/2,
				boxBg.y = killBg.y+killBg.height/2- boxBg.height/2;
				this._defenedWinContainer.addChild(boxBg);
				let boxIcon1:BaseBitmap=BaseBitmap.create("acturantable_task_box2_1");
				boxIcon1.x = killBg.x+(killBg.width-boxIcon1.width)/2;
				boxIcon1.y = killBg.y+killBg.height/2- boxIcon1.height/2;
				this._defenedWinContainer.addChild(boxIcon1);
				boxIcon1.visible = false;
				this._wingRewardBox1 = boxIcon1;
				let boxIcon2:BaseBitmap=BaseBitmap.create("acturantable_task_box2_3");
				boxIcon2.x = killBg.x+(killBg.width-boxIcon2.width)/2;
				boxIcon2.y = killBg.y+killBg.height/2- boxIcon2.height/2;
				this._defenedWinContainer.addChild(boxIcon2);
				boxIcon2.visible = false;
				this._wingRewardBox2 = boxIcon2;

				let dailybossGiftBoxName:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossGiftBoxName"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
				dailybossGiftBoxName.setPosition(killBg.x+(killBg.width-dailybossGiftBoxName.width)/2,killBg.y+killBg.height/2+35);
				this._defenedWinContainer.addChild(dailybossGiftBoxName)
				
				let getRewardBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.getRewardBtnHandler,this);
				getRewardBtn.setPosition(killBg.x+(killBg.width-getRewardBtn.width)/2,dailybossGiftBoxName.y+dailybossGiftBoxName.height+20);
				this._defenedWinContainer.addChild(getRewardBtn);
				getRewardBtn.visible = false;
				this._winGetRewardBtn = getRewardBtn;
				let collectPic:BaseBitmap=BaseBitmap.create("collectflag");
				collectPic.scaleX = 0.8;
				collectPic.scaleY = 0.8;
				collectPic.x = killBg.x+(killBg.width-collectPic.width*collectPic.scaleX)/2;
				collectPic.y = dailybossGiftBoxName.y+dailybossGiftBoxName.height+0;
				this._defenedWinContainer.addChild(collectPic);
				collectPic.visible = false;
				this._winCollectPic = collectPic;

				this._defenedWinContainer.setPosition((GameConfig.stageWidth-this._defenedWinContainer.width)/2,(-this.container.y+(GameConfig.stageHeigth-this._defenedWinContainer.height)/2));
				this.addChildToContainer(this._defenedWinContainer);
				this.refreshWinRewardInfo();
			}
		}
		this.autoBattleCallback();
	}
	// 刷新通关奖励的一些状态
	private refreshWinRewardInfo():void
	{
		if (this._wingRewardBox1) {
			this._wingRewardBox1.visible = !Api.dailybossVoApi.getClearFlag();
			this._wingRewardBox2.visible = Api.dailybossVoApi.getClearFlag();
			this._winGetRewardBtn.visible = !Api.dailybossVoApi.getClearFlag();
			this._winCollectPic.visible = Api.dailybossVoApi.getClearFlag();
		}
	}
	// 点击领取奖励
	private getRewardBtnHandler():void
	{
		this.request(NetRequestConst.REQUEST_DAILYBOSS_GETCLEARREWARD, {});
	}
	// 点击预览奖励
	private lookRewardBtnHandler():void
	{
		var data:any ={};
		data.reward =Config.DailybossCfg.clearReward;
		data.isShowBtnType = 2; 
		ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARPOPUPVIEW,data);
	}

	private damageRankHandler():void
	{
		// ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSRANKPOPUPVIEW,this._bossData);
		ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSDAMAGERANKPOPUPVIEW,{rankList:this._bossData.rankList,myrank:this._bossData.myrank});
	}

	private refreshUIStatusByAttack():void
	{
		this.setAttackRank();
		let oo:any = null;
		let ff:Function = null;
		if(this.getBossType()==2&&!this._bossData.hp)
		{
			if(this._upHero)
			{
				this._upHero.visible=false;
			}
			if(this._topProgress)
			{
				this._topProgress.visible=false;
			}
			if(this._nameBg)
			{
				this._nameBg.visible=false;
			}
			if(this._nameTxt)
			{
				this._nameTxt.visible=false;
			}
			if(this._attackBtn)
			{
				this._attackBtn.visible=false;
			}
			if(this._downHero)
			{
				this._downHero.visible=false;
			}
			if(this._pao)
			{
				this._pao.visible=false;
			}
			if(this._changePic)
			{
				this._changePic.visible=false;
			}
			if(this._changeTxt)
			{
				this._changeTxt.visible=false;
			}
			if(this._heroRattle)
			{
				this._heroRattle.visible=false;
			}
			this.showKillBossBattleResult();
			if (this._autoBattleBtn && this._autoBattleBtn.visible)
			{
				this._autoBattleBtn.visible = false;
			}
			if (this._autoBattleView)
			{
				this.autoBattleCallback();
			}
		}
		else
		{	
			if (this._bossData.bossLv>Api.dailybossVoApi.getMaxRound())
			{
				oo = this;
				ff = this.showDefenedWinResult;
				this._topProgress.visible = false;
				this._upHero.visible = false;
				this._attackBtn.visible =false;
				this._pao.visible = false;
				this._downHero.visible = false;
				this._changePic.visible = false;
				this._heroRattle.visible = false;
				this._changeTxt.visible = false;
				this._nameTxt.visible = false;
				this._nameBg.visible = false;

				if (this._autoBattleBtn && this._autoBattleBtn.visible)
				{
					this._autoBattleBtn.visible = false;
				}
				if (this._autoBattleView)
				{
					this.autoBattleCallback();
				}
			}
			else 
			{
				this.setTopProgress(this._bossData.hp,this._bossData.totalHp);
				Api.dailybossVoApi.needcheckweapon = 1;
				this.autoSetServant();
				
			}

			
		}
		this.setBossUIStatus();
		if(this.getBossType()==1&&this._bossData.isDead)
		{	
			if (!oo &&  this._autoBattleBtn)
			{
				oo = this;
				ff = this.autoBattleCheck;
			}


			if (this._autoBattleView)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSTYPE1BATTLERESULTPOPUPVIEW,{info:this._bossData,f:ff,o:oo,autoclose:1});
			}
			else
			{
				ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSTYPE1BATTLERESULTPOPUPVIEW,{info:this._bossData,f:ff,o:oo});
			}
			
		}
		else if(this.getBossType()==1)
		{	
			if (this._selectServantId)
			{
				if (this._autoBattleView )
				{
					this.autoBattleCheck();
				}
				else if (this._autoBattleBtn && !this._autoBattleBtn.visible)
				{
					this._autoBattleBtn.visible = true;
				}
			}
			
		}
		else if(this.getBossType()==2){
			if (this._bossData.killFlag) {
				// ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW,{type:1,  damage:this._dps ,exp:this._exp , rewards:this._rewards , f:this.hide, o:this });
			}
			else {
				let autoClose:number = 0;
				if (this._autoBattleView)
				{
					autoClose = 1;
				}
				ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW,{type:2,  damage:this._dps ,exp:this._exp,f:this.autoBattleCheck,o:this ,autoclose:autoClose});
			}
		}
	}

	public hide():void
	{
		NetManager.request(NetRequestConst.REQUEST_DAILYBOSS_GET,{});
		super.hide();
	}

	protected getRuleInfo():string
	{
		return "DailyAbyssRuleInfo_"+this.getBossType();
    } 

	private checkWeapon():void
	{	
		Api.dailybossVoApi.needcheckweapon = 0;
		let serId = this._selectServantId;
		// serId = "1001";
		if (!serId)
		{
			return;
		}
		let weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(serId);
		if (!weaponVo)
		{
			return;
		}
		let value = weaponVo.getSpecialityByType(2);
		this._newPower =  Api.servantVoApi.getServantCombatWithId(String(serId)) + value;

		ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW,{
			sid:serId,
			type:3,
			atype:2,
			value:value,
			f:this.checkWeaponBack,
			o:this,
			auto: (this._autoBattleView ? true:false),
		});
	}

	private checkWeaponBack():void
	{	
		if (this && this.isShow())
		{
			let power = this._newPower;
			let qingyuanAdd = Api.encounterVoApi.getSpecialAddAttr(this._selectServantId, 2);
			power += qingyuanAdd;
			let rattleStr:string = LanguageManager.getlocal("dailybossServantBattleTip",[LanguageManager.getlocal("servant_name"+this._selectServantId),String(power)]);
			this._heroRattle.resetString(rattleStr,-1);
			this._downHero.showLight();
		}
		
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYBOSS_RECOVER,this.autoSetServant,this);
		App.MessageHelper.removeEventListener(ViewConst.POPUP.DAILYBOSSLASTATTACKPOPUPVIEW,this.checkShowLastRankRewardView,this);
		this._bossData=null;
		this._buttomBg=null;
		this._attackBtn=null;
		this._pao=null;
		this._selectServantId=null;
		this._attackRankList=null;
		this._myRankItem=null;
		this._nameBg=null;
		this._nameTxt=null;
		this._killBossContainer=null;
		this._bossImg=null;
		this._heroRattle = null;
		this._attackEffect = null;
		this._hasKill = null;
		this._dps = 0;
		this._exp = 0;
		this._rewards = null;
		this._allServantInfo = null;
		this._defenedWinContainer = null;

		this._wingRewardBox1 = null;
		this._wingRewardBox2 = null;
		this._winGetRewardBtn = null;
		this._winCollectPic = null;
		this._autoBattleBtn = null;
		this._autoBattleView = null;
		this._oldType = 0;
		this._newPower = 0;


		super.dispose();
	}
}



class DailybossDamageRankListItem extends ScrollListItem
{
	private _nameTxt:BaseTextField;
	private _valueTxt:BaseTextField;
	private _titleIcon:BaseDisplayObjectContainer;
	public constructor()
	{
		super();
	}

	protected initItem(index:number,data:{level:number,value:number,title:any,uid:string|number,name:string,myrank?:number}):void
	{
		let color:number=(data.myrank==null?TextFieldConst.COLOR_WHITE:TextFieldConst.COLOR_LIGHT_YELLOW);
		let nameTxt:BaseTextField=ComponentManager.getTextField((data.myrank!=null?data.myrank:String(index+1))+"."+data.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,color);
		this.addChild(nameTxt);
		this._nameTxt=nameTxt;
		nameTxt.y=5;

		let valueTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossDamageValueDesc",[data.value.toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,color);
		valueTxt.setPosition(360,0);
		this.addChild(valueTxt);
		this._valueTxt=valueTxt;
		valueTxt.y=5;

		if (data.uid == Api.playerVoApi.getPlayerID()) {
            
            nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            valueTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }

		if(data.title && data.title.title)
		{	
			let titleinfo = null;
			if(index == -1){
				titleinfo = Api.playerVoApi.getTitleInfo();
			}
			else{
				titleinfo = App.CommonUtil.getTitleData(data.title);
			}
			if(titleinfo.title != ``){
				let titleIcon = App.CommonUtil.getTitlePic(titleinfo);
				titleIcon.setScale(0.6);
				titleIcon.setPosition(220,nameTxt.y -7);
				this.addChild(titleIcon);
				this._titleIcon=titleIcon;
			}
		}
		else
		{
			if (data.level)
			{
				let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,color)
                officerTxt.text = LanguageManager.getlocal("officialTitle"+ data.level);
                
                officerTxt.x = 265-officerTxt.width/2;
                officerTxt.y = nameTxt.y;
                this.addChild(officerTxt);
			}
		}

		this.height = 36;
		this.width=500;
	}

	public refresh(index:number,data:{value:number,title:any,uid:string|number,name:string,myrank?:number|string})
	{
		if(this._nameTxt)
		{
			this._nameTxt.text=(data.myrank!=null?data.myrank:String(index+1))+"."+data.name
		}
		if(this._valueTxt)
		{
			this._valueTxt.text=LanguageManager.getlocal("dailybossDamageValueDesc",[data.value.toString()]);
		}
		if(data.title)
		{
			if(this._titleIcon){
				this._titleIcon.dispose();
				this._titleIcon = null;
			}

			let titleinfo = App.CommonUtil.getTitleData(data.title);
			if(titleinfo.title != ``){	
				let titleIcon = App.CommonUtil.getTitlePic(Api.playerVoApi.getTitleInfo());
				titleIcon.setScale(0.6);
				this.addChild(titleIcon);
				this._titleIcon=titleIcon;
				
				this._titleIcon = titleIcon;
				titleIcon.setPosition(220,3);
			}
		}
	}

	public dipose():void
	{
		this._nameTxt=null;
		this._titleIcon=null;
		this._valueTxt=null;

		super.dispose();
	}
}