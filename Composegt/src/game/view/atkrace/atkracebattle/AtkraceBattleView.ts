class AtkraceBattleView extends CommonView
{
	private _battleLayer:BaseDisplayObjectContainer;

	private _battleInfo:{atkreports:any,win:number,addPoint?:number,foeNum?:number};
	private _roundIdx:number=0;
	private _bigRoundIdx:number=0;

	private _servantList0:AtkraceBattleHero[]=[];
	private _servantList1:AtkraceBattleHero[]=[];
	private _totalSNum:number=0;
	private _playEndSNum:number=0
	private _dmgData:number[][]=[[0,0,0,0,0],[0,0,0,0,0]];
	private _addPoint:number=NaN;
	private _shockCount=-1;
	private _shockIdx=0;
	private isRequestNexting:boolean=false;
	private _skipBtn:BaseButton=null;
	private _hitEffectList:CustomMovieClip[]=[];
	private _downSerLb:BaseTextField;
	private _upSerLb:BaseTextField;
	private _heroData:[{all:number,live:number},{all:number,live:number}]=[{all:0,live:0},{all:0,live:0}];


	public constructor() {
		super();
	}

	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		// let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();
		// let myInfo:AtkraceServantVo = myAtkInfo.mesid;

		// this._winNumber = myAtkInfo.fightnum;
		// this._totalNumber = myAtkInfo.total;

		return {requestType:NetRequestConst.REQUEST_ATKRACE_FIGHT,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		this.isRequestNexting=false;
		if (data.ret == true) {
			this._battleInfo = data.data.data;
			this._dmgData=[[0,0,0,0,0],[0,0,0,0,0]];
			this._addPoint=this._battleInfo.hasOwnProperty("addPoint")?this._battleInfo.addPoint:this._addPoint;
			if(this.checkBattleEnd())
			{
				let ainfo=Api.atkraceVoApi.getMyFightInfo();
				ainfo.fightnum+=this._battleInfo.foeNum;
			}
			this._totalSNum=0;
			this._playEndSNum=0;
			this._roundIdx=0;
			if(this._bigRoundIdx>0)
			{
				this.initServantForBattle();
				egret.setTimeout(this.checkBattleRoundData,this,1000);
			}
			else
			{
				let ainfo=Api.atkraceVoApi.getMyFightInfo();
				this._heroData=[{all:ainfo.meslist.length,live:ainfo.meslist.length},{all:ainfo.total,live:ainfo.total}];
			}
			this._bigRoundIdx++;
		}
		else {
			super.receiveData(data);
			if(this._bigRoundIdx>0)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
				this.hide();
			}
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkrace_skip","atkbattlebg0","atkbattlebg1","atkrace_heroinfobg","atkrace_quiltybg","btn_atkrace_skip","progress_atkhp0","progress_atkhpbg","atkraceatkhit",
			"atkrace_fnt",
			"atkraceskill_fnt",
			"atkracebj_fnt"
		]);
	}

	protected getBgName():string
	{
		return "atkracebattlebg";
	}

	protected initBg():void
	{
		let scale=1.034;
		super.initBg();
		if(this.viewBg)
		{
			this.viewBg.setScale(scale);
			this.viewBg.setPosition((GameConfig.stageWidth-this.viewBg.width*scale)*0.5,(GameConfig.stageHeigth-this.viewBg.height*(scale+(scale-1)*0.5)));
		}
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected initView():void
	{
		Api.atkraceVoApi.dieSidList=[{},{}];
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACE_SER_HIT,this.showHitEffect,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACE_SER_DIE,this.refreshSerInfo,this);

		let maskDown:BaseBitmap = BaseBitmap.create("atkbattlebg0");
        // maskDown.width = GameConfig.stageWidth;
        maskDown.y = GameConfig.stageHeigth - maskDown.height;
        this.addChildToContainer(maskDown);

		let maskUp:BaseBitmap = BaseBitmap.create("atkbattlebg1");
        // maskUp.width = GameConfig.stageWidth;
		// maskUp.scaleY = -1;
        // maskUp.y = maskUp.height-maskUp.height;
		this.addChildToContainer(maskUp);
		let info=Api.atkraceVoApi.getMyFightInfo();
		let upNameLb=ComponentManager.getTextField(info.getFName(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		upNameLb.setPosition(150,10);
		this.addChildToContainer(upNameLb);
		let upServantLb=ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName",["5/5"]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		upServantLb.setPosition(GameConfig.stageWidth-150-upServantLb.width,upNameLb.y);
		this.addChildToContainer(upServantLb);
		this._upSerLb=upServantLb;

		let downNameLb=ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		downNameLb.setPosition(150,GameConfig.stageHeigth-10-downNameLb.height);
		this.addChildToContainer(downNameLb);
		let downServantLb=ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName",["5/5"]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		downServantLb.setPosition(GameConfig.stageWidth-150-downServantLb.width,downNameLb.y);
		this.addChildToContainer(downServantLb);
		this._downSerLb=downServantLb;

		// duizhanpifu_
		let skipBtn:BaseButton = ComponentManager.getButton("btn_atkrace_skip",null,()=>{
			if(this.checkBattleEnd())
			{
				this.showBattleResultPanel();
			}
			else
			{
				this.requestNextRoundData();
			}
		},this);
		this._skipBtn=skipBtn;
		skipBtn.setPosition(GameConfig.stageWidth-skipBtn.width-2,51);
		this.addChildToContainer(skipBtn);
		this.initServantForBattle();
		egret.setTimeout(this.checkBattleRoundData,this,1000);
		// this.startPlayBattle();
	}

	private refreshSerInfo(e:egret.Event):void
	{
		let ownType=e.data;
		this._heroData[ownType].live--;
		this._upSerLb.setString(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName",[this._heroData[1].live+"/"+this._heroData[1].all]));
		this._downSerLb.setString(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName",[this._heroData[0].live+"/"+this._heroData[0].all]));
	}

	private initServantForBattle():void
	{
		if(!this._battleLayer)
		{
			this._battleLayer=new BaseDisplayObjectContainer();
			this.addChildToContainer(this._battleLayer);
		}
		// this._heroData[0].all=this._heroData[0].live=this._heroData[1].all=this._heroData[1].all=0;
		let ainfo=Api.atkraceVoApi.getMyFightInfo();
		let nextInfo=Api.atkraceVoApi.getNextInfo();
		this._heroData[0].live=0;
		let tmpFightNum=this.checkBattleEnd()?ainfo.fightnum:nextInfo.fightnum;
		this._heroData[1].live=this._heroData[1].all-tmpFightNum+this._battleInfo.foeNum;
		let targetList = [ainfo.meslist,ainfo.fids];
		let l=5;
		for(let ii=0;ii<2;ii++)
		{
			let serverList:AtkraceBattleHero[]=this["_servantList"+ii];
			let dataList:AtkraceServantVo[]=targetList[ii];
			for (let i = 0; i < l; i++) 
			{
				const sVo = dataList[i];
				let hero=(serverList[i]||new AtkraceBattleHero());
				// console.log(ii,i,hero.visible,sVo?sVo.sid:0);
				hero.init(sVo,ii,i);
				if(ii==0&&(!hero.checkIsDie()))
				{
					this._heroData[ii].live++;
				}
				this._battleLayer.addChild(hero);
				serverList.push(hero);
			}
			// this._heroData[ii].live=this._heroData[ii].all;
		}

		let tmpArr=this._servantList0.concat(this._servantList1);
		tmpArr.sort((a,b)=>{
			if(a.y==b.y)
			{
				return a.x-b.x;
			}
			else
			{
				return a.y-b.y;
			}
		});
		l=tmpArr.length;
		for (let i = 0; i < l; i++) 
		{
			const item = tmpArr[i];
			this._battleLayer.setChildIndex(item,i);
		}

		this._upSerLb.setString(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName",[this._heroData[1].live+"/"+this._heroData[1].all]));
		this._downSerLb.setString(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName",[this._heroData[0].live+"/"+this._heroData[0].all]));

	}

	private showHitEffect(e:egret.Event):void
	{
		let posIdx=e.data;
		let effect=this._hitEffectList[posIdx];
		if(!effect)
		{
			effect=ComponentManager.getCustomMovieClip("atkraceatkhit",12,34);
			effect.anchorOffsetX=effect.anchorOffsetY=100;
			this._hitEffectList[posIdx]=effect;
			effect.setEndCallBack(()=>{
				effect.visible=false;
			},this);
			effect.rotation=180-Math.random()*360;
			let atkCfg=Config.AtkraceCfg.servantAtkPosCfg;
			let xcfg=Config.AtkraceCfg.servantPosCfg[0][posIdx];
			let ycfg=Config.AtkraceCfg.servantPosCfg[0][0];
			effect.setPosition(xcfg.x,GameConfig.stageHeigth-ycfg.y+atkCfg.atkb1[0].y+atkCfg.atk1[0].y-50);
			effect.setScale(2.5);
			this.addChild(effect);
		}
		else
		{
			effect.visible=true;
		}
		effect.playWithTime(1);
		if(this._shockCount!=-1)
		{
			return;
		}
		this._shockCount=egret.setInterval(()=>{
			this._shockIdx++;
			let random=Math.random();
			let disX=random*10*(random>0.5?1:-1);
			let disY=random*10*(random>0.5?1:-1);
			this.x=disX;
			this.y=disY;
			if(this._shockIdx>=3)
			{
				egret.clearInterval(this._shockCount);
				this._shockCount=-1;
				this._shockIdx=0;
				this.x=this.y=0;
			}
		},this,50);
	}

	private playAtkAction():void
	{
		// console.log("atk",egret.getTimer());
		this._totalSNum=0;
		this._playEndSNum=0;
		for (let i = 0; i < 5; i++) {
			let mServant:AtkraceBattleHero=this._servantList0[i];
			let targetServant:AtkraceBattleHero=this._servantList1[i];
			if(mServant&&(!mServant.checkIsDie()))
			{
				if(mServant.visible==false)
				{
					console.error(mServant.name);
				}
				this._totalSNum++;
				mServant.playAtkAction(this.playAllAtkEnd,this);
			}
			if(targetServant&&(!targetServant.checkIsDie()))
			{
				if(targetServant.visible==false)
				{
					console.error(targetServant.name);
				}
				this._totalSNum++;
				targetServant.playAtkAction(this.playAllAtkEnd,this);
			}
		}
	}

	private playAllAtkEnd():void
	{
		this._playEndSNum++;
		if(this._playEndSNum>=this._totalSNum)
		{
			this._playEndSNum=0;
			let totalDmgNum=0;
			let hasPlayDmgNum=0;
			for (let i = 0; i < 5; i++) {
				let mServant:AtkraceBattleHero=this._servantList0[i];
				let targetServant:AtkraceBattleHero=this._servantList1[i];
				if(mServant&&(!mServant.checkIsDie()))
				{
					totalDmgNum++;
					mServant.showDamage(()=>{
						hasPlayDmgNum++;
						if(hasPlayDmgNum==totalDmgNum)
						{
							hasPlayDmgNum=0;
							this.checkNextRoundOrEnd();
						}
					},this);
				}
				if(targetServant&&(!targetServant.checkIsDie()))
				{
					totalDmgNum++;
					targetServant.showDamage(()=>{
						hasPlayDmgNum++;
						if(hasPlayDmgNum==totalDmgNum)
						{
							hasPlayDmgNum=0;
							this.checkNextRoundOrEnd();
						}
					},this);
				}
			}
			
			// this.checkBattleRoundData();
		}
	}

	private checkNextRoundOrEnd():void
	{
		if(this.checkRoundEnd())
		{
			if(this.checkBattleEnd())
			{
				console.log("战斗结束");
				this.showBattleResultPanel();
			}
			else
			{
				console.log("本回合结束");
				this.requestNextRoundData();
			}
		}
		else
		{
			// this.playAtkAction();
			this.checkBattleRoundData();
		}
	}

	private checkBattleEnd():boolean
	{
		return !isNaN(this._addPoint);
	}

	private checkRoundEnd():boolean
	{
		if(!this._battleInfo.atkreports[this._roundIdx])
		{
			return true;
		}
	}

	private checkBattleRoundData():void
	{
		let roundData = this._battleInfo.atkreports[this._roundIdx];
		if(roundData)
		{
			this._roundIdx++;
			// console.log("checkBattleRoundData",this._roundIdx);
			let totalStartSkillNum=0;
			let startSkillPlayEndNum=0;

			let l=roundData.length;
			for (let i = 0; i < l; i++) 
			{
				const dataList = roundData[i];
				if(this._roundIdx>1)
				{
					let sl=dataList.length;
					for (let si = 0; si < sl; si++) 
					{//si 位置
						let servantItem:AtkraceBattleHero=this["_servantList"+i][si];
						const sDataList:any[] = dataList[si];
						let sdl=sDataList.length;//[1释放技能，1暴击，伤害{}，buff{}]
						//释放技能了
						let useSkill = sDataList[0];
						if(Number(useSkill)>0)
						{
							totalStartSkillNum++;
							servantItem.showSkillEffect(()=>{
								startSkillPlayEndNum++;
								if(startSkillPlayEndNum>=totalStartSkillNum)
								{
									startSkillPlayEndNum=0;
									this.playAtkAction();
								}
							},this);
						}
						//暴击了
						let isbaoji=sDataList[1];
						let allDmgData=sDataList[2];
						//[目标位置(1,2,3,4,5),造成伤害，类型:0普攻，否则技能]
						if(allDmgData instanceof Array)
						{
							let sdvl=allDmgData.length;
							for (let sdvi = 0; sdvi < sdvl; sdvi++) {
								const dmgData = allDmgData[sdvi];
								if(dmgData instanceof Array)
								{
									if(dmgData.length>0)
									{
										let posIdx=dmgData[0]-1;
										let dmgNum=dmgData[1];
										let dmgType=Number(dmgData[2]);

										let beAtkServantOwnType=i==0?1:0;
										let beAtkServant:AtkraceBattleHero=this["_servantList"+beAtkServantOwnType][posIdx];
										this._dmgData[beAtkServantOwnType][posIdx]+=dmgNum;
										if(beAtkServant)
										{
											let fntName="atkrace_fnt";
											if(isbaoji)
											{
												fntName="atkracebj_fnt";
											}
											else if(dmgType)
											{
												fntName="atkraceskill_fnt";
											}
											// if(beAtkServantOwnType==1)
											// {
											// 	console.log("设置对手伤害",posIdx,dmgNum);
											// }
											beAtkServant.setDamageData(dmgNum,fntName);
										}
									}
								}
							}
						}

						servantItem.setSkillStatus(sDataList[3]);
					}
				}
				else
				{
					for (const key in dataList) 
					{
						if (Object.prototype.hasOwnProperty.call(dataList, key)) 
						{
							let idx=Number(key)-1;
							let servantitem:AtkraceBattleHero = this["_servantList"+i][idx];
							if(servantitem)
							{
								totalStartSkillNum++;
								servantitem.showSkillEffect(()=>{
									startSkillPlayEndNum++;
									if(startSkillPlayEndNum>=totalStartSkillNum)
									{
										startSkillPlayEndNum=0;
										// this.playAtkAction();
										this.checkNextRoundOrEnd();
									}
								},this,true);
							}
						}
					}
				}
			}
			
			if(totalStartSkillNum==0)
			{
				if(this._roundIdx==1)
				{
					this.checkNextRoundOrEnd();
				}
				else
				{
					this.playAtkAction();
				}
					
			}
		}
	}

	private requestNextRoundData():void
	{
		if(this.isRequestNexting==false)
		{
			this.isRequestNexting=true;
			let requestData=this.getRequestData();
			this.request(requestData.requestType,requestData.requestData);
		}
	}

	private showBattleResultPanel():void
	{
		this._battleLayer.visible=false;
		// let aInfo = Api.atkraceVoApi.getMyFightInfo();
		// aInfo.fightnum=(this._heroData[1].all-this._heroData[1].live);
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESETTLEPOPUPVIEW,this._battleInfo);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACE_SER_HIT,this.showHitEffect,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACE_SER_DIE,this.refreshSerInfo,this);
		this._skipBtn=null;
		this._battleLayer=null;
		this._roundIdx=0;
		this._totalSNum=0;
		this._playEndSNum=0;
		this._dmgData=[[0,0,0,0,0],[0,0,0,0,0]];
		this._addPoint=NaN;
		this._servantList0.length=this._servantList1.length=0;
		Api.atkraceVoApi.dieSidList=[{},{}];
		this._battleInfo=null;
		this._bigRoundIdx=0;
		this.isRequestNexting=false;
		this._hitEffectList.length=0;
		this._downSerLb=null;
		this._upSerLb=null;
		this._heroData==[{all:0,live:0},{all:0,live:0}];
		super.dispose();
	}
}
