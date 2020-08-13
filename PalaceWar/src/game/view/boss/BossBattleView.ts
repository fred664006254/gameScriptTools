class BossBattleView extends BaseBattleView
 {

	private _callbackF:Function = null;
	private _obj:any = null;
	
	private _rewards:string = null;
	private _curKey:string = null;

	private _challengeConfig:any = null;

	// 开始按钮
	private _gameBtn:BaseButton;
	private _isAttackWin:boolean;

	
	//门客战斗力
	private _allServantInfo:Object = null;	
	private _dps:number = 0;

	//总血量
	private _bossValue:number = 0;
	private _heroValue:number = 0;

	private _isBattling:boolean = false;
	private _cid:number = 0;

	private _autoBattleBtn:BaseButton = null;
	private _autoBattleView:BattleAuto = null;
	private _emptyText:BaseTextField = null;

	private _emptyInfo:BaseDisplayObjectContainer = null;
	private _emptyTime:BaseTextField = null;

	

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let tempArray:string[] = super.getResourceList()

		return tempArray.concat([
				"bossbg",
				ButtonConst.BATTLE_START_BTN_1,
				"progress7_bg","progress8",
		]);
	}

	protected getBgName():string
	{
		return "bossbg";
	}

	// 标题背景名称
	protected getTitleStr():string
	{				
		return "bossViewTitle1";
	}

	//重置默认选中的门客 和 当前属性
	private resetTopKey():void
	{
		
		//初始化门客信息 key: 门客ID，value: 门客战斗力
		if (this._allServantInfo == null) {
			this._allServantInfo = {};
			let allKey:string[] = Api.servantVoApi.getServantInfoIdListWithSort(1);
			for (let k in allKey)
			{
				let key:string = allKey[k];
				this._allServantInfo[key] = Api.servantVoApi.getServantCombatWithId(key);
			}
		}

		this._curKey = null;
		this._heroValue = 0;
		let allKeys:string[] = Object.keys(this._allServantInfo);
		allKeys.sort((a:string,b:string)=>{
				
				let valueA:number = Api.challengeVoApi.getServantInfoValue(a);
				let valueB:number = Api.challengeVoApi.getServantInfoValue(b);

				if (valueA == valueB)
				{
					return Number(this._allServantInfo[b] - this._allServantInfo[a]);
				}else
				{
					return Number(valueA - valueB);
				}
			});
		if (Api.challengeVoApi.getServantInfoValue(allKeys[0]) == 0) {
			this._curKey = allKeys[0];
			this._heroValue = this._allServantInfo[this._curKey];
		}
	}

	protected initView():void
	{	
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_CHALLENGE,this.checkMessage,this);

		Api.mainTaskVoApi.checkShowGuide("BossBattleView");

		this.titleTF.text = Api.challengeVoApi.getCurBigChannelId().toString() + ". "+LanguageManager.getlocal("challengeTitle" + Api.challengeVoApi.getCurBigChannelId());
		this.titleTF.x = this.width/2 - this.titleTF.width/2;

		this._challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
		this._cid = Api.challengeVoApi.getCurChannelId();

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK),this.intoBossBattle,this);
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		this._bossValue = this._challengeConfig.value;
		this.resetTopKey();
			
		this.setTopProgress(this._bossValue -Api.challengeVoApi.getCurKilledNum() , this._bossValue , GameConfig.stageWidth - 100);
		this._topProgress.y = 10;

		let upHeroPic:string = "story_npc_"+this._challengeConfig.showBoss;
		this.setUpHero(upHeroPic,[[LanguageManager.getlocal("BossName"+this._challengeConfig.showBoss),TextFieldConst.COLOR_WARN_RED2]],2);
		this._upHero.x = 17;

		let downHeroPic:string = null;
		let downInfo:any = null;

		this._emptyText = ComponentManager.getTextField(LanguageManager.getlocal("use_item",[LanguageManager.getlocal("itemName_1090")]),TextFieldConst.FONTSIZE_TITLE_SMALL);
		this._emptyText.setPosition(450-this._emptyText.width/2,GameConfig.stageHeigth-60);
		this.addChild(this._emptyText);
		egret.Tween.get(this._emptyText,{loop:true}).to({alpha:0},2000).to({alpha:1},2000);
		this._emptyText.visible = false;

		let showeff1 = false;
		if (this._curKey) {
			let addV = 0;
			// let addInfo = Api.conquestVoApi.getDecreePolicyAddAttrInfo();
			// if(addInfo && addInfo.lastTimes > 0){
			// 	let addV = Api.playerVoApi.getAtk() * addInfo.addExtent;
			// }
			downHeroPic = Api.servantVoApi.getFullImgPathWithId(this._curKey);//"servant_full_"+this._curKey;
			let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this._curKey);
			if (servant && servant.equip && servant.equip != ""){
				showeff1 = true;
			}

			let power:number = this._allServantInfo[this._curKey] + addV;
			downInfo = [[LanguageManager.getlocal("fightForce")+":"+power.toFixed(0),TextFieldConst.COLOR_LIGHT_YELLOW],[LanguageManager.getlocal("clickChooseServant")]];
		}
		else {
			downHeroPic = "servant_empty";
			downInfo = [["empty",TextFieldConst.COLOR_LIGHT_YELLOW],[LanguageManager.getlocal("clickChooseServant")]];

			if (Api.itemVoApi.getItemNumInfoVoById(1090)>0 && Api.challengeVoApi.getHasServantCanRelive())
			{
				this._emptyText.visible = true;
			}
			this.showEmptyInfo();
		}
		this.setDownHero(downHeroPic,downInfo,2,showeff1);
		this._downHero.x = 280;
		this._downHero.y = GameConfig.stageHeigth - this._downHero.height - 20 -10;//- this.getTitleButtomY()

		this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
		this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);

		this._downHero.addTouchTap(this.clickChangeHero,this);
		// 开始游戏
		this._gameBtn = ComponentManager.getButton(ButtonConst.BATTLE_START_BTN_1,null,this.btnClick,this);
		this._gameBtn.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2 + 20);
		this._gameBtn.anchorOffsetX = this._gameBtn.width/2;
		this._gameBtn.anchorOffsetY = this._gameBtn.height/2;
		this.addChild(this._gameBtn);	
		this.btnAnim();

		if (this._curKey == null) {
			this._gameBtn.visible = false;
		}

		let autoBattleNeedVipLv:number = Config.VipCfg.getAutoBossLevel();
		if (autoBattleNeedVipLv)
		{
			if (Api.playerVoApi.getPlayerVipLevel() < autoBattleNeedVipLv) 
			{
				let reachText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("autoBattleTip_DailyAc_1",[String(autoBattleNeedVipLv)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
				reachText.setPosition(10,  GameConfig.stageHeigth -reachText.height-12);

				let blackBgRect: BaseBitmap = BaseBitmap.create("public_itemtipbg");
				blackBgRect.width = reachText.width + 55;
				blackBgRect.height = 36;
				blackBgRect.x= 0 ;
				blackBgRect.y= reachText.y-7;
				this.addChild(blackBgRect);
				this.addChild(reachText);
			}
			else
			{
				this._autoBattleBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"autoBattle_DailyAc_1",this.autoBattleHandle,this);
				this._autoBattleBtn.setPosition(6, GameConfig.stageHeigth - this._autoBattleBtn.height-12);
				this.addChild(this._autoBattleBtn);
				if (!this._curKey)
				{
					this._autoBattleBtn.visible = false;
				}
			}
		}

		
	}

	private autoBattleHandle():void
	{
		if (!this._autoBattleView)
		{	
			this._autoBattleBtn.visible = false;
			this._autoBattleView = new BattleAuto();
			this._autoBattleView.init(1,this.autoBattleCallback,this);
			this.addChild(this._autoBattleView);

			this.btnClick();
		}
	}

	private autoBattleCheck():void
	{	

		if (this._isAttackWin)
		{
			this.autoBattleCallback();
		}
		if (this._autoBattleView)
		{
			if (this._curKey)
			{
				this.btnClick();
			}
			else
			{
				this.autoBattleCallback();
			}
		}
		else
		{
			if (this._curKey && this._autoBattleBtn)
			{
				this._autoBattleBtn.visible = true;
			}
			if (this._isAttackWin && this._autoBattleBtn)
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

	private clickChangeHero():void
	{
		if (this._isBattling == true) {
			return;
		}

		let allKeys:string[] = Object.keys(this._allServantInfo);
		let showTab:any[] = [];
		for (let k in allKeys)
		{
			let key:string = allKeys[k];
			showTab.push([key,Api.challengeVoApi.getServantInfoValue(key),this._allServantInfo[key],Api.servantVoApi.getServantObj(key).banishSt]);
		}


		showTab.sort((a:any[],b:any[])=>{
				
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
				}else
				{
					return Number(valueA - valueB);
				}
			});
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,{type:ServantSelectedPopupView.TYPE_BATTLE,"info":showTab,callback:this.sendRequest,handler:this});
	}

	private sendRequest(params:any):void
	{	
		let clickKey:any = params.key;
		if (clickKey != this._curKey) {
			this._curKey = clickKey;
			let servant:ServantInfoVo = Api.servantVoApi.getServantObj(clickKey);		
			let showeff1 = false;
			if (servant && servant.equip && servant.equip != ""){
				showeff1 = true;
			}
			this._downHero.resetHero(servant.fullImgPath,this._allServantInfo[clickKey],showeff1);
			this._gameBtn.visible = true;
		}
		if (this._curKey && this._autoBattleBtn)
		{
			this._autoBattleBtn.visible = true;
		}
		this._emptyText.visible = false;
		this.hideEmptyInfo();
	}


	private btnClick():void
	{	
		NetManager.request(NetRequestConst.REQUEST_CHALLENGE_ATTACK,{"servantId":this._curKey});
	}

	private btnAnim():void
	{
		if (this._gameBtn) {
			egret.Tween.get(this._gameBtn).to({scaleX:0.9,scaleY:0.9}, 600).to({scaleX:1,scaleY:1}, 600).call(this.btnAnim,this);
		}
	}


	private intoBossBattle(p:any):void
	{
		App.LogUtil.log(p.data);

		
		if (p.data.ret == true) {
			
			this._rewards= p.data.data.data.rewards;
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);
			this._isAttackWin = p.data.data.data.battleReport.success;
			this._dps = p.data.data.data.battleReport.dps;
			
			this._isBattling = true;
			this._gameBtn.visible = false;

			this.gameBegin();
		}
		else
		{	
			if (this._autoBattleBtn )
			{
				this._autoBattleBtn.visible = true;
				this.autoBattleCallback();
			}
		}
	}

	private gameBegin():void
	{
		this.attackHandle(1,this._dps);
	}

	private showEndGame():void
	{
		ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{award:this._rewards,f:this.hide,o:this,type:3,cid:this._cid});
	}

	protected atkEndCallback():void
	{	
		
		if (this._isAttackWin) {
			egret.Tween.get(this._upHero).to({alpha:0},800).call(this.showEndGame,this);
		}
		else {
			this._isBattling = false;
			this.closeBtn.setEnable(true);
			this.resetTopKey();
			if (this._curKey) {
				
				let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this._curKey);
				let showeff1 = false;
				if (servant && servant.equip && servant.equip != ""){
					showeff1 = true;
				}
				this._downHero.resetHero(servant.fullImgPath,this._allServantInfo[this._curKey],showeff1);

				TimerManager.doTimer(100,1,this.showGameBtn,this);
			}
			else {
				this._downHero.resetHero();
				if (this._autoBattleView)
				{
					this.autoBattleCheck();
				}
				if (this._autoBattleBtn)
				{
					this._autoBattleBtn.visible = false;
				}
				if (Api.itemVoApi.getItemNumInfoVoById(1090)>0 && Api.challengeVoApi.getHasServantCanRelive())
				{
					this._emptyText.visible = true;
				}
				this.showEmptyInfo();
			}
		}
	}

	private showGameBtn():void
	{
		if (this._gameBtn) {
			if (this._autoBattleView)
			{
				if (this._curKey)
				{
					this.btnClick();
				}
				else
				{
					this.autoBattleCheck();
				}
			}
			else
			{	
				this._gameBtn.visible = (this._curKey != null);
				if (this._curKey)
				{
					if ( this._autoBattleBtn )
					{
						this._autoBattleBtn.setVisible(true);
					}
				}
				else
				{
					if ( this._autoBattleBtn )
					{
						this._autoBattleBtn.setVisible(false);
					}
				}
			}
		}
	}

	private showEmptyInfo():void
	{
		if (!this._emptyInfo)
		{
			this._emptyInfo = new BaseDisplayObjectContainer();
			this.addChild(this._emptyInfo);

			let bg:BaseBitmap = BaseBitmap.create("public_9_viewmask");
			bg.width = GameConfig.stageWidth;
			this._emptyInfo.addChild(bg);

			let bg3:BaseBitmap = BaseBitmap.create("public_9_wordbg2");
			bg3.width = GameConfig.stageWidth;
			this._emptyInfo.addChild(bg3);

			let lastTime:number = App.DateUtil.getWeeTs(GameData.serverTime) + 86400 - GameData.serverTime;
			this._emptyTime = ComponentManager.getTextField(LanguageManager.getlocal("tommorow_come_play",[App.DateUtil.getFormatBySecond(lastTime, 1)]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			this._emptyTime.width = GameConfig.stageWidth-60;
			this._emptyTime.setPosition(30,50);
			this._emptyTime.lineSpacing = 8;
			this._emptyTime.textAlign = egret.HorizontalAlign.CENTER;
			this._emptyInfo.addChild(this._emptyTime);

			bg.height = this._emptyTime.height+100;
			bg3.height = this._emptyTime.height+100;

			this._emptyInfo.y = GameConfig.stageHeigth/2 - bg.height/2;
		}
	}

	public tick()
	{
		if (this._emptyTime)
		{
			let lastTime:number = App.DateUtil.getWeeTs(GameData.serverTime) + 86400 - GameData.serverTime;
			if (lastTime<0)
			{
				lastTime = 0;
			}
			this._emptyTime.text = LanguageManager.getlocal("tommorow_come_play",[App.DateUtil.getFormatBySecond(lastTime, 1)]);
		}
	}

	private checkMessage():void
	{
		let allKeys:string[] = Object.keys(this._allServantInfo);
		allKeys.sort((a:string,b:string)=>{
				
				let valueA:number = Api.challengeVoApi.getServantInfoValue(a);
				let valueB:number = Api.challengeVoApi.getServantInfoValue(b);

				if (valueA == valueB)
				{
					return Number(this._allServantInfo[b] - this._allServantInfo[a]);
				}else
				{
					return Number(valueA - valueB);
				}
			});
		if (Api.challengeVoApi.getServantInfoValue(allKeys[0]) == 0) {

			if (allKeys[0] != this._curKey) {
				this._curKey = allKeys[0];
				let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this._curKey);		
				let showeff1 = false;
				if (servant && servant.equip && servant.equip != ""){
					showeff1 = true;
				}
				this._downHero.resetHero(servant.fullImgPath,this._allServantInfo[this._curKey],showeff1);
				this._gameBtn.visible = true;
			}
			if (this._curKey && this._autoBattleBtn)
			{
				this._autoBattleBtn.visible = true;
			}

			this.hideEmptyInfo();
			this._emptyText.visible = false;
		}
	}

	private hideEmptyInfo():void
	{
		if (this._emptyInfo)
		{
			this._emptyInfo.dispose();
			this._emptyInfo = null;
			this._emptyTime = null;
		}
	}

	public hide():void
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		super.hide();
	}

	public dispose():void
	{
		Api.mainTaskVoApi.hideGuide();
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK),this.intoBossBattle,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_CHALLENGE,this.checkMessage,this);

		this._challengeConfig = null;
		this._callbackF = null;
		this._obj = null;
		this._rewards =null;
		this._curKey = null;
		this._isBattling = false;
		this._gameBtn = null;
		this._isAttackWin = null;
		this._allServantInfo = null;
		this._dps = 0;
		this._cid = 0;

		this._autoBattleBtn = null;
		this._autoBattleView = null;
		this._emptyText = null;
		this._emptyInfo = null;
		this._emptyTime = null;

		super.dispose();
	}
}