
class AllianceBossBattleView  extends BaseBattleView
{
	private _callbackF:Function = null;
	private _obj:any = null;
	private _idx:string= null;

	private _rewards:string = null;
	private _curKey:string = null;
	private _curValue:number = 0;
	private _bossConfig:any = null;

	// 开始按钮
	private _gameBtn:BaseButton;
	private _isAttackWin:boolean;

	
	//门客战斗力
	private _allServantInfo:Object = null;	
	private _dps:number = 0;
	private _exp:number = 0;

	//总血量
	private _bossValue:number = 0;
	private _heroValue:number = 0;

	private _isBattling:boolean = false;
	private _hasKill:number = 0; // 1--Boss已经被击杀



	private _moreArrow:BaseBitmap = null;
	private _isShowMore:boolean = false;
	private touchBoo:boolean =true;
	private _nameTxt:BaseTextField =null;
	private _describeTxt:BaseTextField =null;
	private moveContainer:BaseDisplayObjectContainer =null;
	private _currMaskBmp:BaseBitmap =null;
	private _touchBg:BaseBitmap =null;
	private _scrollList: ScrollList;
	private moreBg:BaseBitmap =null;
	private bottomBg:BaseBitmap =null;
	private _isRefresh:boolean  =false;
	private _bossInfoVoList:Array<any>=[];
	private _decreeAddTxt:BaseTextField;

	private _eliteidx:string = null;
	private _eliteBossCfg:Config.AllianceEliteBossItemCfg = null;

	private _autoBattleBtn:BaseButton = null;
	private _autoBattleView:BattleAuto = null;
	

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let tempArray:string[] = super.getResourceList()

		return tempArray.concat([
				"alliancebossbg",
				ButtonConst.BATTLE_START_BTN_1,
				"allianceboss_down","progress8","progress7_bg",
		]);
	}

	protected getBgName():string
	{
		return "alliancebossbg";
	}

	// 标题背景名称
	protected getTitleStr():string
	{				
		return "allianceBossPopupViewTitle";
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
				
				let valueA:number = Api.allianceVoApi.getServantInfoValue(a);
				let valueB:number = Api.allianceVoApi.getServantInfoValue(b);

				if (valueA == valueB)
				{
					return Number(this._allServantInfo[b] - this._allServantInfo[a]);
				}else
				{
					return Number(valueA - valueB);
				}
			});
		if (Api.allianceVoApi.getServantInfoValue(allKeys[0]) == 0) {
			this._curKey = allKeys[0];
			this._heroValue = this._allServantInfo[this._curKey];
			if (this._curKey && this._autoBattleBtn && !this._autoBattleBtn.visible && !this._autoBattleView)
			{
				this._autoBattleBtn.visible = true;
			}
		}
	}

	protected initView():void
	{	
		let bottom:BaseBitmap = BaseBitmap.create("arena_bottom");
		
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		if(this.param.data.eliteidx != null)
		{
			this._eliteidx = this.param.data.eliteidx;
			this._eliteBossCfg = Config.AllianceelitebossCfg.getAllianceCfgByLv(this._eliteidx);
		}

		let downBg:BaseBitmap = BaseBitmap.create("allianceboss_down");
		downBg.y = GameConfig.stageHeigth - this.getTitleButtomY() - downBg.height - 75;
		this.addChildToContainer(downBg);

		this._idx = this.param.data.idx;
		this._bossConfig = Config.AlliancebossCfg.getAllianceCfgByLv(this._idx);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		let limitlessBossId = Api.allianceVoApi.getLimitlessBossId();
		if (limitlessBossId && limitlessBossId == this._idx){
			this._bossValue = 1;
		}
		else{
			this._bossValue = this._eliteidx == null?this._bossConfig.bossHp:this._eliteBossCfg.eliteBossHp;
		}
		
		let curValue:number = Api.allianceVoApi.getBossHp(this._eliteidx == null?this._idx:this._eliteidx);
		this.resetTopKey();
		let proType = 2;
		if (limitlessBossId && limitlessBossId == this._idx){
			proType = 3;
		}
		this.setTopProgress(curValue , this._bossValue , GameConfig.stageWidth - 100, proType);
		this._topProgress.y = 0;

		let upHeroPic:string = "alliance_monster"+this._bossConfig.bossPic;
		this.setUpHero(upHeroPic,null,2);
		this._upHero.x = GameConfig.stageWidth/2 - this._upHero.width/2;

		let downHeroPic:string = null;
		let downInfo:any = null;
		let showeff1 = false;
		if (this._curKey) {
			let addV = 0;
			let addInfo = Api.allianceVoApi.getDecreePolicyAddAttrInfo();
			if(addInfo && addInfo.lastTimes > 0){
				let addV = Math.floor(Api.playerVoApi.getAtk() * addInfo.addExtent);
			}
			downHeroPic = Api.servantVoApi.getFullImgPathWithId(this._curKey);// "servant_full_"+this._curKey;
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
		}
		this.setDownHero(downHeroPic,downInfo,2,showeff1);
		this._downHero.x = GameConfig.stageWidth/2 - this._downHero.width/2;
		this._downHero.y = GameConfig.stageHeigth - this._downHero.height - 100;//- this.getTitleButtomY();

		this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
		this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);

		this._downHero.addTouchTap(this.clickChangeHero,this);
		//boss getBgName
		let tipBg:BaseBitmap=BaseBitmap.create("public_itemtipbg2");
		this.addChildToContainer(tipBg);
		let id = this._eliteidx == null?this._idx:this._eliteidx;
		let servantName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_monsterName"+id),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		servantName.setPosition(GameConfig.stageWidth/2 - servantName.width/2, this._topProgress.y+ 33);
		this.addChildToContainer(servantName);
		tipBg.width = servantName.width + 30;
		tipBg.setPosition(GameConfig.stageWidth/2 - tipBg.width/2,servantName.y + servantName.height/2 - 15 );
	
		// 开始游戏
		this._gameBtn = ComponentManager.getButton(ButtonConst.BATTLE_START_BTN_1,null,this.btnClick,this);
		this._gameBtn.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2 - 20);
		this._gameBtn.anchorOffsetX = this._gameBtn.width/2;
		this._gameBtn.anchorOffsetY = this._gameBtn.height/2;
		this.addChild(this._gameBtn);	
		this.btnAnim();

		if (this._curKey == null) {
			this._gameBtn.visible = false;
		}



		bottom.y = GameConfig.stageHeigth - bottom.height;
		this.addChild(bottom);
		this.bottomBg = bottom;

		this.requestGetBossLog();
		this._isRefresh =false;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE,this.requestGetBossLog,this);


		let showMore:BaseButton = ComponentManager.getButton("arena_more",null,this.showMoreHandle,this);
		showMore.setPosition(515,GameConfig.stageHeigth-52);
		this.addChild(showMore);

		this._moreArrow = BaseBitmap.create("arena_arrow");
		this._moreArrow.setPosition(480,GameConfig.stageHeigth-49);
		this.addChild(this._moreArrow);

		this.refreshDecreeAtrr();

		let autoBattleNeedVipLv:number = Config.VipCfg.getUnlockLvel("allianceBoss");
		if (autoBattleNeedVipLv != null)
		{
			if (Api.playerVoApi.getPlayerVipLevel() < autoBattleNeedVipLv) 
			{
				let reachText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("autoBattleTip_AllianceDungeon",[String(autoBattleNeedVipLv)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
				reachText.setPosition(GameConfig.stageWidth - reachText.width - 10,  bottom.y-reachText.height-6);

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
				this._autoBattleBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"autoBattle_AllianceDungeon",this.autoBattleHandle,this);
				this._autoBattleBtn.setPosition(GameConfig.stageWidth-this._autoBattleBtn.width -6,bottom.y-this._autoBattleBtn.height-6);
				this.addChild(this._autoBattleBtn);

				if (this._curKey == null) {
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
			this._autoBattleView.init(2,this.autoBattleCallback,this);
			this.addChild(this._autoBattleView);

			this._gameBtn.visible = false;
			this.btnClick();
		}
	}

	private autoBattleCheck():void
	{
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
		else if (this._hasKill == 1)
		{
			this.autoBattleCallback();
		}
		else
		{
			if (this._curKey && this._autoBattleBtn)
			{
				this._autoBattleBtn.setEnable(true);
				this._autoBattleBtn.visible = true;
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

	protected refreshDecreeAtrr()
	{
		let addInfo = Api.allianceVoApi.getDecreePolicyAddAttrInfo();
        
        if(addInfo)
        {
            if(!this._decreeAddTxt)
            {
                this._decreeAddTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_YELLOW2);
                this._decreeAddTxt.setPosition(GameConfig.stageWidth/2 ,this._moreArrow.y - 20 );
                this.addChild( this._decreeAddTxt);
            }
            if(addInfo.lastTimes > 0){
				// let addV = ""+ Math.floor((addInfo.addExtent *100)+0.5);
				let addV = (addInfo.addExtent *100).toFixed(1) + "%";
                this._decreeAddTxt.text = LanguageManager.getlocal(addInfo.strKey,[addInfo.strKey2,addV]);
				this._decreeAddTxt.x =  GameConfig.stageWidth/2 -this._decreeAddTxt.width/2;
            }else{
                this._decreeAddTxt.text = "";
            }
        }
	}
	private requestGetBossLog():void
	{
		this._isRefresh =true;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);
		if(this._eliteidx == null)
		{
			if(this._idx!=null)
			{
				NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG, {"bossId":this._idx});
			}
		}
		else
		{
			NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG, {"bossId":this._eliteidx});
		}

	
	}
	private showBossLog(event:egret.Event):void
	{
		if (!event.data.ret){
			return;
		}
		let rdata = event.data.data;
		if(rdata.ret == 0)
		{
			this._bossInfoVoList=rdata.data.allianceBossLog;
			if(this._isRefresh)
			{
			
			}
			else
			{
				this.showText();
			}
		
		}
		
	}
	private showMoreHandle():void
	{
		
		if(this.touchBoo)
		{
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
		
	}
	private closeList():void
	{
		this.touchBoo=false;
		if(this.moveContainer)
		{	
			egret.Tween.get(this.moveContainer).to({y:1150},500).call(function(){
			this.touchBoo=true;
			egret.Tween.removeTweens(this.moveContainer);
		
		},this);
		}
		if(this._currMaskBmp&&this._currMaskBmp.parent)
		{
			this._currMaskBmp.parent.removeChild(this._currMaskBmp);
			this._currMaskBmp.dispose();
			this._currMaskBmp =null;
		}
		
		if(this._touchBg&&this._touchBg.parent)
		{
			this._touchBg.parent.removeChild(this._touchBg);
			this._touchBg.dispose();
			this._touchBg =null;
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
			showTab.push([key,Api.allianceVoApi.getServantInfoValue(key),this._allServantInfo[key],Api.servantVoApi.getServantObj(key).banishSt]);
		}


		showTab.sort((a:any[],b:any[])=>{
				
				let valueA:number = a[1];
				let valueB:number = b[1];
				
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

				} else {
					// if (Api.switchVoApi.checkOpenExile()) {
					// 	if (a[3] && (!b[3])) {
					// 		return 1;
					// 	}
					// 	else if (a[3] && b[3]) {
					// 		return Number(valueA - valueB);
					// 	}
					// 	else if ((!a[3]) && b[3]) {
					// 		return -1;
					// 	}
					// 	else if ((!a[3]) && (!b[3])) {
					// 		return Number(valueA - valueB);
					// 	}

					// }
					// else {
						return Number(valueA - valueB);
					// }
				}
				
				
			});
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,{type:ServantSelectedPopupView.TYPE_ALLIANCE,"info":showTab,callback:this.sendRequest,handler:this});
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
			if (this._curKey && this._autoBattleBtn && !this._autoBattleBtn.visible && !this._autoBattleView)
			{
				this._autoBattleBtn.visible = true;
			}
		}
	}


	private btnClick():void
	{
		let bossId = this._eliteidx == null?this._idx:this._eliteidx;
		if( this._eliteidx == null)
		{
			let limitlessBossId = Api.allianceVoApi.getLimitlessBossId();
			if (limitlessBossId && limitlessBossId == this._idx && (!Api.allianceVoApi.checkOpenLimitlessBoss() || Api.allianceVoApi.checkLimitlessBossIsEnd())){
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBoss_limitlessTip"));
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_LIMITLESSBOSS_REFRESH);
				this.hide();
				return ;
			}
			NetManager.request(NetRequestConst.REQUEST_ALLIANCE_ATTACK,{"servantId":this._curKey,"bossId":this._idx});
		}
		else
		{
			NetManager.request(NetRequestConst.REQUEST_ALLIANCE_ATTACK,{"servantId":this._curKey,"bossId":this._eliteidx,elite:1});
		}

		//test code
	}

	private btnAnim():void
	{
		if (this._gameBtn) {
			egret.Tween.get(this._gameBtn).to({scaleX:0.9,scaleY:0.9}, 600).to({scaleX:1,scaleY:1}, 600).call(this.btnAnim,this);
		}
	}


	private intoBossBattle(p:any):void
	{
		
		if (p.data.ret == true) {
			if (this._autoBattleBtn){
				this._autoBattleBtn.setEnable(false);
			}
			this.refreshDecreeAtrr();
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);

			this._hasKill = p.data.data.data.hasKill;
			if (this._hasKill == 1) {
				if (this._autoBattleBtn){
					this._autoBattleBtn.setEnable(true);
				}
				ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSATTACKEDPOPUPVIEW,{type:3, f:this.hide, o:this});
				return ;
			}
			
			this._rewards= p.data.data.data.bossInfo.rewards;
			this._isAttackWin = p.data.data.data.bossInfo.killFlag;
			this._dps = p.data.data.data.bossInfo.damage;
			this._exp = p.data.data.data.bossInfo.ctv;
			
			this._isBattling = true;
			this._gameBtn.visible = false;

			this.gameBegin();
			
		}
	}

	private gameBegin():void
	{
		this.attackHandle(1,this._dps);
	}

	protected attackHandle(area:number,damage:number,isCrit?:boolean):void
	{
		if (this._isMoving == true) {
			return;
		}
		this._isMoving = true;
		this._heroArray.length = 0;
		this._damage = damage;
		this._area = area;
		let offsetY:number; 
		let moveY:number;
		let scaleTo:number = 0.75;
		let offsetX:number;
		if (area == 1) {
			this._heroArray=[this._downHero,this._upHero];
			offsetY = 50;
			moveY = this._upHero.y+100;
			offsetX= offsetY*(this._downHero.x - this._upHero.x)/(this._downHero.y - this._upHero.y);
		}
		else {
			this._heroArray=[this._upHero,this._downHero];
			offsetY = -50;
			moveY = this._downHero.y-100 + this._downHero.height*(1-scaleTo);
			offsetX = offsetY*(this._downHero.x - this._upHero.x)/(this._downHero.y - this._upHero.y);
		}

		if (this.container.getChildIndex(this._heroArray[0])< this.container.getChildIndex(this._heroArray[1])) {
			this.container.swapChildren(this._heroArray[0],this._heroArray[1]);
		}

		let critTime:number = 0;
		let moveTime1:number = 60;
		let moveTime2:number = 260;
		
		let moveTo:egret.Point = egret.Point.create( this._heroArray[1].x + (1-scaleTo)*this._heroArray[0].width/2 ,moveY);

		let scaleBig:number = 1.06;
		let moveFirst:egret.Point = egret.Point.create( this._heroArray[0].x - (scaleBig-1)*this._heroArray[0].width/2 ,this._heroArray[0].y - (scaleBig-1)*this._heroArray[0].height/2);
		//hero
		egret.Tween.get(this._heroArray[0]).wait(critTime).
		to({y : this._heroArray[0].y + (area == 1 ? 20 : -20), },300).//后移
		//to({x:moveFirst.x,y:moveFirst.y,alpha : 1,scaleX:scaleBig, scaleY:scaleBig},500).
		to({y:moveTo.y}, moveTime1).
		//to({x:moveFirst.x+offsetX, y:moveFirst.y+offsetY},150).
		to({y:this._heroArray[0].y},moveTime2);
		TimerManager.doTimer(critTime + 300 + moveTime1,1,this.showBeAttackAnim,this);
	}

	private showEndGame():void
	{
			// 
			
	}

	protected atkEndCallback():void
	{	
		if (this._isAttackWin) {
			let index = null;
			if(this._eliteidx == null)
			{
				index = this._idx;
			}
			else
			{
				index = this._eliteidx;
			}

			ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSATTACKEDPOPUPVIEW,{type:1, index:index, damage:this._dps ,exp:this._exp , rewards:this._rewards , f:this.hide, o:this });
		}
		else {
			let index = null;
			if(this._eliteidx == null)
			{
				index = this._idx;
			}
			else
			{
				index = this._eliteidx;
			}
			if (this._autoBattleView)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSATTACKEDPOPUPVIEW,{type:2, index:index, damage:this._dps ,exp:this._exp, f:this.autoBattleCheck, o:this,autoclose:1});
			}
			else
			{
				ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSATTACKEDPOPUPVIEW,{type:2, index:index, damage:this._dps ,exp:this._exp,f:this.autoBattleCheck, o:this });
			}
			
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
			}
		}
		//刷新boss攻打纪录
		if(this._isRefresh)
		{
			this.refreshText();
		}

	}

	private showGameBtn():void
	{
		if (this._gameBtn) {
			this._gameBtn.visible = (this._curKey != null);
		}
	}

	public hide():void
	{	
		if (this._autoBattleView)
		{
			this.autoBattleCallback();
		}

		if (Api.playerVoApi.getPlayerAllianceId()>0 && this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		super.hide();
	}
	private showList():void
	{
	
			this.moveContainer= new BaseDisplayObjectContainer();
			this.addChild(this.moveContainer);

			this.moreBg = BaseBitmap.create("arena_bottom_bg");
			this.moreBg.width = 640;
			this.moreBg.height =GameConfig.stageHeigth - 330;
			this.moveContainer.addChild(this.moreBg);

			this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
			this._currMaskBmp.width=GameConfig.stageWidth;
			this._currMaskBmp.height=GameConfig.stageHeigth;
			this._currMaskBmp.touchEnabled = true;
			this.addChild(this._currMaskBmp);
			this.setChildIndex(this._currMaskBmp,this.getChildIndex(this._gameBtn));
			
			// 增加 点击区域
			this._touchBg = BaseBitmap.create("public_9_bg25");  
			this._touchBg.width = 640;
			this._touchBg.height =260;
			this._touchBg.x=0;
			this._touchBg.y=-240;
			this._touchBg.alpha =0;
			this._touchBg.addTouchTap(this.showMoreHandle,this);
			this.moveContainer.addChild(this._touchBg);

		
			if(this._bossInfoVoList&&this._bossInfoVoList.length>0)
			{
				let rect = egret.Rectangle.create();
				rect.setTo(0, 10, 640, GameConfig.stageHeigth - 340);
				this._scrollList = ComponentManager.getScrollList(AllianceBossMoreItem, this._bossInfoVoList, rect);
				this.moveContainer.addChild(this._scrollList);
				this._scrollList.y=5;
			}
			else
			{
				let atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
				atkracedes3.x =250;
				atkracedes3.y =300;
				this.moveContainer.addChild(atkracedes3);
			}	

			this.moveContainer.y =1150;
			this.touchBoo=false;
			egret.Tween.get(this.moveContainer).to({y:260},500).call(function()
			{
				egret.Tween.removeTweens(this.moveContainer);
				this.touchBoo =true;
			},this);
	}
	private showText():void
	{
		if(this._bossInfoVoList&&this._bossInfoVoList.length>=1)
		{
			//名称  
			let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
			nameTxt.text = this._bossInfoVoList[0].name;
			nameTxt.x = 20;
			nameTxt.y =GameConfig.stageHeigth-67;
			this.addChild(nameTxt);
			this._nameTxt =nameTxt;
			
			let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			var _name =Config.ServantCfg.getServantItemById(this._bossInfoVoList[0].servantId).name;
			let str = LanguageManager.getlocal("alliancelogdes13",[_name,this._bossInfoVoList[0].dps]);	 
			describeTxt.x = 20;
			describeTxt.y = GameConfig.stageHeigth-40;
			describeTxt.height=16;
			describeTxt.text =str;
			this._describeTxt = describeTxt;
			this.addChild(describeTxt);
		}
		
	}
	private refreshText():void
	{	
		
		if(this._nameTxt&&this._bossInfoVoList.length>1&&this._describeTxt)
		{
			this._nameTxt.text = this._bossInfoVoList[0].name;
			var _name =Config.ServantCfg.getServantItemById(this._bossInfoVoList[0].servantId).name;
			 
			this._describeTxt.text =LanguageManager.getlocal("alliancelogdes13",[_name,this._bossInfoVoList[0].dps]);	 
		}
		else
		{
			this.showText();
		}
		
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);

		this._bossConfig = null;
		this._callbackF = null;
		this._obj = null;
		this._rewards =null;
		this._curKey = null;
		this._isBattling = false;
		this._gameBtn = null;
		this._isAttackWin = null;
		this._allServantInfo = null;
		this._dps = 0;
		this._idx = null;
		this._exp = 0;
		this._hasKill = 0;
		this._isRefresh =false;
		this._bossInfoVoList =null;
		this.bottomBg =null;
		this._moreArrow =null;
		this._isShowMore =false;
		this.touchBoo=true;
		this._nameTxt =null;
		this._describeTxt =null;
		this.moveContainer =null;
		this._currMaskBmp =null;
		this._scrollList= null;
		this.moreBg =null;
		this._decreeAddTxt = null;

		this._eliteidx = null;
		this._eliteBossCfg = null;

		this._autoBattleBtn = null;
		this._autoBattleView = null;

		super.dispose();
	}
}