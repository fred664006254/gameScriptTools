class DailybossnewBattleView extends BaseBattleView
{
	private _bossData:{score:number,myrank:{uid:number|string,title:string|number,
        value:number,myrank:number|string,name:string},joinNum:number,
        rankList:{value:number,title:string|number,name:string,uid:number|string}[],damage:number,logInfo:{level:number,title:string|number,
            name:string,uid:number|string,rewards:string}[]};
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
	private _bossImg:string;
	private _heroRattle:BattleRattle = null;
	private _attackEffect:CustomMovieClip = null;//开火动画
	private _allServantInfo:any;
	private _curKey:string;
	private _leftValue:number;
	private _rightValue:number;

	private _exp:number = 0;
	private _dps:number = 0;
	private _rewards:string = null;
	private _wingRewardBox1:BaseBitmap;
	private _wingRewardBox2:BaseBitmap;
	private _winCollectPic:BaseBitmap;
	private _winGetRewardBtn:BaseButton;

	private _autoBattleBtn:BaseButton = null;
	private _autoBattleView:BattleAuto = null;

    private _timeCD:BaseTextField = null;
	private _newPower:number = 0;

	public constructor()
	{
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"promotion_officerbg1",
			"boss_start_war",
			"boss_start_war_down",
			"dailyboss_kaopao","dailybossbattleview","dailybossbattlenew_pao1","dailybossbattlenew_pao2","dailybossbattlenew_pao3"
		]);
	}

	protected initView():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWBOSS_RECOVER,this.autoSetServant,this);

		// let soldiersBg:BaseLoadBitmap=BaseLoadBitmap.create("dailyboss_battle_soldier");
		// soldiersBg.setPosition(0,GameConfig.stageHeigth - 760);
		// this.addChildToContainer(soldiersBg);
		Api.dailybossVoApi.needcheckweapon = 1;
		this.initAttackRank();

			
        this.initAttackBtn();
        this.autoSetServant();


        let imgUrl:string="dailyboss_lv_0"
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
		this._bossImg=imgUrl;

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
        
        this.initPao();

        let timeBg:BaseBitmap=BaseBitmap.create("public_9_bg15");
		timeBg.width=400;
		timeBg.setPosition(this.viewBg.width/2 - timeBg.width/2 , 13);
		this.addChildToContainer(timeBg);

        let timeTxt:BaseTextField=ComponentManager.getTextField(this.getStatusStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		
		if(PlatformManager.checkIsEnLang()){
			timeBg.width = timeTxt.width;
			timeBg.x = GameConfig.stageWidth / 2 - timeBg.width / 2;
		} else {
			timeTxt.width=timeBg.width;
		}
		timeTxt.textAlign=egret.HorizontalAlign.CENTER;
		timeTxt.setPosition(timeBg.x+(timeBg.width-timeTxt.width)/2,timeBg.y+(timeBg.height-timeTxt.height)/2);
		this.addChildToContainer(timeTxt);
		this._timeCD=timeTxt;

       
		
	}

    private getStatusStr():string
	{   
        let leftTime:number = Api.dailybossnewVoApi.getEndTimeByName("boss2");
        if (leftTime < 0)
        {
            leftTime = 0;
        }
        let timeStr:string = LanguageManager.getlocal("dailybossnewTimeCD",[App.DateUtil.getFormatBySecond(leftTime,1)]);
		return timeStr;
	}

	private getbossName():string
	{
		let nameStr:string = LanguageManager.getlocal("dailybossTitleNew");
		return nameStr;
	}

	private getBossType():number
	{
		return Api.dailybossnewVoApi.getBossType();
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
        this._pao.init(true);
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

		let damageTitle:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossDamageRankTitle2"),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_GREEN);
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
		rect.setTo(0,0,this._buttomBg.width-60,this._myRankItem.y-this._buttomBg.y-10);
			this._attackRankList=ComponentManager.getScrollList(DailybossDamageRankListItem,this._bossData.rankList,rect);
			this._attackRankList.setPosition(55,this._buttomBg.y+10);
			this._attackRankList.setContentPosY(10);

			let lookMore:BaseButton = ComponentManager.getButton("dailybossbattle_more","lookMore",this.damageRankHandler,this);
			lookMore.setPosition(GameConfig.stageWidth-lookMore.width,this._buttomBg.y-lookMore.height+95);
			this.addChild(lookMore);
            lookMore.setColor(TextFieldConst.COLOR_WHITE);

			posY= lookMore.y;

		let autoBattleNeedVipLv:number = Config.VipCfg.getUnlockLvel("dailyBoss");
		if (autoBattleNeedVipLv != null)
		{
			if (Api.playerVoApi.getPlayerVipLevel() < autoBattleNeedVipLv) 
			{
				let reachText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("autoBattleTip_DailyAc_1",[String(autoBattleNeedVipLv)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
				reachText.setPosition(GameConfig.stageWidth - reachText.width - 10,  posY-reachText.height-3);

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
				this._autoBattleBtn =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"autoBattle_DailyAc_2",this.autoBattleHandle,this);
				this._autoBattleBtn.setPosition(GameConfig.stageWidth-this._autoBattleBtn.width -6,posY-this._autoBattleBtn.height-3);
				this.addChild(this._autoBattleBtn);
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
			if(this._bossData.rankList){
                this._attackRankList.refreshData(this._bossData.rankList);
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
			this.container.addChildAt(this._downHero,0);
			this._downHero.addTouchTap(this.showSelectServantHandler,this);
			this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);

			let changePic:BaseBitmap=BaseBitmap.create("promotion_officerbg1");
			changePic.setPosition(this._downHero.x+(this._downHero.width*this._downHero.scaleX-changePic.width)/2,this._downHero.y+this._downHero.height*this._downHero.scaleY-changePic.height-10);
			this.addChildToContainer(changePic);
			this._changePic=changePic;
			let nameTxt:BaseTextField=ComponentManager.getTextField(App.StringUtil.formatStringColor(LanguageManager.getlocal("dailybossChangeServantDesc"),TextFieldConst.COLOR_WARN_YELLOW),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
			nameTxt.width=changePic.width;
			nameTxt.textAlign=egret.HorizontalAlign.CENTER;
			nameTxt.setPosition(changePic.x,changePic.y+(changePic.height-nameTxt.height)/2);
			this.addChildToContainer(nameTxt);
			changePic.addTouchTap(this.showSelectServantHandler,this);
			this._changeTxt=nameTxt;

			this._heroRattle = new BattleRattle();
			if(PlatformManager.checkIsEnLang()){
				this._heroRattle.init(this.container,350,2);
			}else if(PlatformManager.checkIsPtLang() || PlatformManager.checkIsRuLang()){
				this._heroRattle.init(this.container,350,2,100);
			} else {
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

		if (!picName && this._autoBattleBtn)
		{
			this._autoBattleBtn.setVisible(false);
		}

		if (this._selectServantId) {
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
			this.request(NetRequestConst.REQUEST_NEWBOSS_ATTACK,{servantId:this._selectServantId});
		}
	}

	private tick():void
	{
		if (Api.dailybossnewVoApi.getStatus()!=1)
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("dailybossOutTimeNew"));
			this.hide();
		}

        if(this._timeCD)
		{
			this._timeCD.text=this.getStatusStr();
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
				this._allServantInfo[key] =  Api.servantVoApi.getServantCombatWithIdContentsWeapon(key,2);
				//Api.servantVoApi.getServantCombatWithId(key);
			}
		}
		this._curKey = null;
		this._leftValue = 0;
		let allKeys:string[] = Object.keys(this._allServantInfo);
		allKeys.sort((a:string,b:string)=>
		{
			let valueA:number = Api.dailybossnewVoApi.checkServantcanStatus(a);
			let valueB:number = Api.dailybossnewVoApi.checkServantcanStatus(b);
			if (valueA == valueB)
			{
				return Number(this._allServantInfo[b] - this._allServantInfo[a]);
			}else
			{
				return Number(valueA - valueB);
			}
		});
		if (Api.dailybossnewVoApi.checkServantcanStatus(allKeys[0]) == 0) {
			this._curKey = allKeys[0];
			this._leftValue = this._allServantInfo[this._curKey];
		}
		this._rightValue;
		let showTab:any[] = [];
		for (let k in allKeys)
		{
			let key:string = allKeys[k];
			showTab.push([key,Api.dailybossnewVoApi.checkServantcanStatus(key),this._allServantInfo[key],Api.servantVoApi.getServantObj(key).banishSt]);
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
			}
			else
			{
				return Number(valueA - valueB);
			}
		});
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,{type:ServantSelectedPopupView.TYPE_BATTLE_NEWBOSS,"info":showTab,callback:this.selectServantHandler,handler:this});
	}

	private autoSetServant():void
	{
		this.setServant(Api.dailybossnewVoApi.findBestServant());
	}

	private setServant(id:number|string):void
	{
		this._selectServantId=id
		let servantCfg=Config.ServantCfg.getServantItemById(this._selectServantId);
		let pic:string= Api.servantVoApi.getFullImgPathWithId(this._selectServantId);
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
		let showeff1 = false;
		let servant:ServantInfoVo = Api.servantVoApi.getServantObj(String(this._selectServantId));
		if (servant && servant.equip && servant.equip != ""){
			showeff1 = true;
		}
		this._downHero.resetHero(Api.servantVoApi.getFullImgPathWithId(this._selectServantId),0,showeff1);
		this.setDownHero(Api.servantVoApi.getFullImgPathWithId(servantId));
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
		return "dailybossTimeTitleNew";
	}

	protected getBgName():string
	{
		return "dailybossnew_bg2";
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
		return {requestType:NetRequestConst.REQUEST_NEWBOSS_GETDETAILS,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
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
				this._bossData.myrank={uid:Api.playerVoApi.getPlayerID(),title:Api.playerVoApi.getTitleid(),value:0,myrank:"10000+",name:Api.playerVoApi.getPlayerName()};
			}
			if(this._bossData.myrank.name==null)
			{
				this._bossData.myrank.name=Api.playerVoApi.getPlayerName();
			}
			if(data.data.cmd==NetRequestConst.REQUEST_NEWBOSS_ATTACK)
			{
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
	}

	private damageRankHandler():void
	{
		// ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSDAMAGERANKPOPUPVIEW,{rankList:this._bossData.rankList,myrank:this._bossData.myrank,isnewboss:true});
		ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSNEWRANKPOPUPVIEW,{});
	}

	private refreshUIStatusByAttack():void
	{
		this.setAttackRank();
		let oo:any = null;
		let ff:Function = null;
		Api.dailybossVoApi.needcheckweapon = 1;
		this.autoSetServant();
		
		let autoClose:number = 0;
        if (this._autoBattleView)
        {
            autoClose = 1;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.DAILYBOSSATTACKEDPOPUPVIEW,{type:4,  damage:this._dps ,exp:this._exp,f:this.autoBattleCheck,o:this ,autoclose:autoClose});
	}

	public hide():void
	{
		NetManager.request(NetRequestConst.REQUEST_NEWBOSS_GET,{});
		super.hide();
	}

	protected getRuleInfo():string
	{
		return "dailybossnewRuleInfo";
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
			let rattleStr:string = LanguageManager.getlocal("dailybossServantBattleTip",[LanguageManager.getlocal("servant_name"+this._selectServantId),String(this._newPower)]);
			this._heroRattle.resetString(rattleStr,-1);
			this._downHero.showLight();
		}
		
	}


	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWBOSS_RECOVER,this.autoSetServant,this);
		this._bossData=null;
		this._buttomBg=null;
		this._attackBtn=null;
		this._pao=null;
		this._selectServantId=null;
		this._attackRankList=null;
		this._myRankItem=null;
		this._nameBg=null;
		this._nameTxt=null;
		this._bossImg=null;
		this._heroRattle = null;
		this._attackEffect = null;
		this._dps = 0;
		this._exp = 0;
		this._rewards = null;
		this._allServantInfo = null;

		this._wingRewardBox1 = null;
		this._wingRewardBox2 = null;
		this._winGetRewardBtn = null;
		this._winCollectPic = null;
		this._autoBattleBtn = null;
		this._autoBattleView = null;
        this._timeCD = null;
		this._newPower = 0;

		super.dispose();
	}
}

class DailybossnewDamageRankListItem extends ScrollListItem
{
	private _nameTxt:BaseTextField;
	private _valueTxt:BaseTextField;
	private _titleIcon:BaseLoadBitmap;
	public constructor()
	{
		super();
	}

	protected initItem(index:number,data:{value:number,title:string,uid:string|number,name:string,myrank?:number}):void
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

		if(data.title)
		{
			let titleIcon:BaseLoadBitmap = BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
			titleIcon.setScale(0.6);
			titleIcon.setPosition(220,nameTxt.y -7);
			this.addChild(titleIcon);
			this._titleIcon=titleIcon;
		}
		this.width=500;
	}

	public refresh(index:number,data:{value:number,title:string|number,uid:string|number,name:string,myrank?:number|string})
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
			if(this._titleIcon)
			{
				this._titleIcon.setload(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
			}
			else
			{
				let titleIcon:BaseLoadBitmap = BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
				titleIcon.setScale(0.6);
				titleIcon.setPosition(220,3);
				this.addChild(titleIcon);
				this._titleIcon=titleIcon;
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