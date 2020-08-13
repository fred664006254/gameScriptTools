
class AtkraceBattleHero extends BaseDisplayObjectContainer
{
	private _hero:BaseLoadBitmap=null;
	private _progress:ProgressBar=null;
	private _data:AtkraceServantVo;
	private _ownType:number=0;
	private _posIdx:number=0;
	private _initAttr:number=0;
	private _sid:string=null;
	private _damageNum:number=0;
	private _skillIconContainer:BaseDisplayObjectContainer;
	public constructor()
	{
		super();
	}

	public init(data:AtkraceServantVo,ownType:number,posIdx:number):void
	{
		this.stopAllActions();
		if(!data)
		{
			this._ownType=ownType;
			this._posIdx=posIdx;
			this.visible=false;
			let cfg=Config.AtkraceCfg.servantPosCfg[ownType][posIdx];
			this.initPos(cfg);
			return;
		}
		// this.visible=true;
		this._data=data;
		this._ownType=ownType;
		this._posIdx=posIdx;
		this._sid=data.sid;
		this._initAttr=this._data.attr;
		this.visible=(!Api.atkraceVoApi.dieSidList[this._ownType][this._data.sid]);
		// console.log(this._ownType,this._data.sid,(!Api.atkraceVoApi.dieSidList[this._ownType][this._data.sid]));
		let servantCfg=Config.ServantCfg.getServantItemById(data.sid);
		let iconKey=servantCfg.fullIcon;
		if(this._hero)
		{
			this._hero.setload(iconKey);
			let nameLb = <BaseTextField>this.getChildByName("nameLb");
			nameLb.setString(servantCfg.name);
			let quiltyTxt = <BaseTextField>this.getChildByName("quiltyTxt");
			quiltyTxt.setString(data.ability+"");
		}
		else
		{
			this._hero=BaseLoadBitmap.create(iconKey);
			this._hero.anchorOffsetX=this._hero.width*0.5;
			this._hero.anchorOffsetY=this._hero.height;
			this.addChild(this._hero);
			this._hero.setScale(0.45);
			let bg=BaseBitmap.create("atkrace_heroinfobg");
			bg.anchorOffsetX=bg.width*0.5;
			bg.y=-8;
			this.addChild(bg);
			let pro=ComponentManager.getProgressBar("progress_atkhp0","progress_atkhpbg",252);
			this._progress=pro;
			pro.x=bg.x-pro.width*0.5;
			pro.y=5
			this.addChild(pro);
			let nameLb=ComponentManager.getTextField(servantCfg.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN2);
			nameLb.setPosition(pro.x+(pro.width-nameLb.width)*0.5,pro.y+pro.height+5);
			this.addChild(nameLb);
			nameLb.name="nameLb";
			
			let quiltyBg=BaseBitmap.create("atkrace_quiltybg");
			quiltyBg.x=bg.x-bg.anchorOffsetX+bg.width-quiltyBg.width;
			quiltyBg.y=bg.y-bg.anchorOffsetY-quiltyBg.height-93;
			this.addChild(quiltyBg);
			let quiltyTxt=ComponentManager.getTextField(data.ability+"",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
			quiltyTxt.setPosition(quiltyBg.x+45,quiltyBg.y+(quiltyBg.height-quiltyTxt.height)*0.5);
			this.addChild(quiltyTxt);
			quiltyTxt.name="quiltyTxt";
		}
		let percent=this._initAttr/this._data.fullattr;
		if(percent>0)
		{
			percent=Math.max(0.03,percent);
		}
		this._progress.setPercentage(percent);

		if(!this._skillIconContainer)
		{
			this._skillIconContainer=new BaseDisplayObjectContainer();
			this.addChild(this._skillIconContainer);
		}

		let cfg=Config.AtkraceCfg.servantPosCfg[ownType][posIdx];
		this.initPos(cfg);
	}

	private initPos(cfg:{x:number,y:number,scale:number}):void
	{
		this.setPosition(cfg.x,GameConfig.stageHeigth-cfg.y);
		this.setScale(cfg.scale);
	}

	public showSkillEffect(endCallback:()=>void,thisObj:any,firstRound?:boolean):void
	{
		let skillActive=Config.ServantCfg.getServantItemById(this._data.sid).skillActive;
		let skillTip:BaseLoadBitmap=BaseLoadBitmap.create("atkraceskill_"+skillActive);
		skillTip.anchorOffsetX=skillTip.width*0.5;
		skillTip.anchorOffsetY=skillTip.height*0.5;
		let skillTipy=-this._hero.height*this._hero.scaleY-skillTip.height*0.5;
		skillTip.y=skillTipy;
		skillTip.setScale(0.3);
		skillTip.alpha=0.1;
		this.addChild(skillTip);
		egret.Tween.get(skillTip).to({scaleX:1.1,scaleY:1.1,alpha:1},250,egret.Ease.quadIn).to({scaleX:1,scaleY:1},150,egret.Ease.quadOut).call(()=>{
			// if(!firstRound)
			// {
			// 	this.checkShowSkillIcon(skillActive);
			// }
		},this).wait(300).to({y:skillTipy-50,alpha:0.1},500).call(()=>{
			skillTip&&skillTip.dispose();
			if(endCallback)
			{
				endCallback.call(thisObj);
			}
		},this);
	}

	// private checkShowSkillIcon(skillId:string):void
	// {
	// 	let childName="skill"+skillId;
	// 	if(!this.getChildByName(childName))
	// 	{
	// 		let skillIconKey = Config.ServantskillCfg.getSkillIconKeyById(skillId);
	// 		let icon=BaseLoadBitmap.create(skillIconKey);
	// 		icon.width=108;
	// 		icon.height=109;
	// 		icon.alpha=0.1;
	// 		icon.setScale(32/icon.width);
	// 		let skillTipy=-this._hero.height*this._hero.scaleY-icon.height*icon.scaleY*0.5;
	// 		icon.y=skillTipy;
	// 		icon.x=-icon.width*icon.scaleX*2;
	// 		this.addChild(icon);
	// 		egret.Tween.get(icon).to({alpha:1},300).call(()=>{
	// 			icon.stopAllActions();
	// 		},this);
	// 	}
	// }

	private _damageList:{dmgNum:number,fntName:string}[]=[];
	public setDamageData(dmgNum:number,fntName:string):void
	{
		// console.log("设置伤害",this._ownType,this._posIdx);
		this._damageList.push({dmgNum:dmgNum,fntName:fntName});
	}

	public showDamage(endCallback?:()=>void,thisObj?:any):void
	{
		let dmgL=this._damageList.length;
		// console.log("播放伤害特效",this._ownType,this._posIdx,dmgL);
		if(dmgL>0)
		{
			let hasplayEnd=0;
			for (let index = 0; index < dmgL; index++) 
			{
				let dmg=this._damageList[index];
				let dmgNum=dmg.dmgNum;
				let fntName=dmg.fntName;
				this._initAttr-=dmgNum;
				this._initAttr=Math.max(0,this._initAttr);
				let percent=this._initAttr/this._data.fullattr;
				if(percent>0)
				{
					percent=Math.max(0.03,percent);
				}
				this._progress.setPercentage(percent);
				let dmgTxt=ComponentManager.getBitmapText((-dmgNum)+"",fntName);
				dmgTxt.anchorOffsetX=dmgTxt.width*0.5;
				dmgTxt.anchorOffsetY=dmgTxt.height;
				let dy=-this._hero.height*this._hero.scaleY-this._damageNum*30;
				dmgTxt.y=dy;
				this.addChild(dmgTxt);
				egret.Tween.get(dmgTxt).to({y:dy-60,alpha:0.3},800).call(()=>{
					dmgTxt.dispose();
					if(this._initAttr<=0)
					{
						let lastAlive=(!Api.atkraceVoApi.dieSidList[this._ownType][this._data.sid]);
						this.visible=false;
						Api.atkraceVoApi.dieSidList[this._ownType][this._data.sid]=1;
						lastAlive&&App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACE_SER_DIE,this._ownType);
					}
					hasplayEnd++;
					if(hasplayEnd==dmgL)
					{
						if(endCallback)
						{
							endCallback.call(thisObj);
						}

					}
					else if(hasplayEnd>dmgL)
					{
						console.error(hasplayEnd,dmgL);
					}
				},this);
				this._damageNum++;
			}
		}
		else
		{
			if(endCallback)
			{
				egret.callLater(endCallback,thisObj);
				// endCallback.call(thisObj);
			}
		}
		this._damageList.length=0;
	}

	public setSkillStatus(skillsData:{[id:string]:{[type:string]:[number,number][]}}):void
	{
		let childNameList:string[]=[];
		if(skillsData)
		{
			for (const skillId in skillsData) 
			{
				if (Object.prototype.hasOwnProperty.call(skillsData, skillId)) 
				{
					const skillData = skillsData[skillId];
					if(skillData)
					{
						for (const skillType in skillData) 
						{
							if (Object.prototype.hasOwnProperty.call(skillData, skillType)) 
							{
								let skillTypeData=skillData[skillType];
								let childName=skillId+"_"+skillType;
								childNameList.push(childName);
								let icon=<BaseLoadBitmap>this._skillIconContainer.getChildByName(childName);
								if(!icon)
								{
									let childNum=this._skillIconContainer.numChildren;
									let skillIconKey = Config.ServantskillCfg.getSkillIconKeyById(skillId);
									icon=BaseLoadBitmap.create(skillIconKey);
									icon.name=childName;
									icon.width=108;
									icon.height=109;
									icon.alpha=0.1;
									icon.setScale(32/icon.width);
									let skillTipy=-this._hero.height*this._hero.scaleY-icon.height*icon.scaleY*0.5;
									icon.y=skillTipy;
									icon.x=-icon.width*icon.scaleX*2+childNum*(icon.width*icon.scaleX+2);
									this._skillIconContainer.addChild(icon);
									egret.Tween.get(icon).wait(400).to({alpha:1},300).call(()=>{
										icon.stopAllActions();
									},this);
								}
								// console.log(skillTypeData.length+"层");
							}
						}
					}
				}
			}
		}

		let numchild=this._skillIconContainer.numChildren;
		for (let i = numchild-1; i >= 0; i--) 
		{
			let item=<BaseLoadBitmap>this._skillIconContainer.getChildAt(i);
			if(childNameList.indexOf(item.name)<0)
			{
				BaseLoadBitmap.release(item);
			}
		}
	}

	public checkIsDie():boolean
	{
		return Api.atkraceVoApi.dieSidList[this._ownType][this._posIdx]==1||this.visible==false;;
	}

	public playAtkAction(endCallback:()=>void,thisObj:any):void
	{
		this._damageNum=0;
		let atkCfg=Config.AtkraceCfg.servantAtkPosCfg;
		let cfg=Config.AtkraceCfg.servantPosCfg[this._ownType][this._posIdx];
		let y=GameConfig.stageHeigth-cfg.y;
		if(this._posIdx<3)
		{
			egret.Tween.get(this).to({
				y:y+atkCfg.atkb1[this._ownType].y,scaleX:atkCfg.atkb1[this._ownType].scale,scaleY:atkCfg.atkb1[this._ownType].scale
			},300).to({
				y:this.y+atkCfg.atk1[this._ownType].y,scaleX:atkCfg.atk1[this._ownType].scale,scaleY:atkCfg.atk1[this._ownType].scale
			},100,egret.Ease.quadIn).call(()=>{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACE_SER_HIT,this._posIdx);
			},this).to({
				y:y,scaleX:cfg.scale,scaleY:cfg.scale
			},200).call(()=>{
				egret.Tween.removeTweens(this);
				if(endCallback)
				{
					endCallback.call(thisObj);
				}
			},this);
		}
		else
		{
			egret.Tween.get(this).wait(600).to({
				y:this.y+atkCfg.atkb2[this._ownType].y,scaleX:atkCfg.atkb2[this._ownType].scale,scaleY:atkCfg.atkb2[this._ownType].scale
			},300).call(()=>{
				if(this._ownType==1)
				{
					this.parent&&this.parent.setChildIndex(this,4);
				}
			},this).to({
				y:this.y+atkCfg.atk2[this._ownType].y,scaleX:atkCfg.atk2[this._ownType].scale,scaleY:atkCfg.atk2[this._ownType].scale
			},100,egret.Ease.quadIn).call(()=>{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACE_SER_HIT,this._posIdx);
			},this).to({y:y,scaleX:cfg.scale,scaleY:cfg.scale},100).call(()=>{
				if(this._ownType==1)
				{
					this.parent&&this.parent.setChildIndex(this,0);
				}
				egret.Tween.removeTweens(this);
				if(endCallback)
				{
					endCallback.call(thisObj);
				}
			},this);
		}
		// egret.Tween.get(this).to({
		// 	y:y+atkCfg.atkb1[this._ownType].y,scaleX:atkCfg.atkb1[this._ownType].scale,scaleY:atkCfg.atkb1[this._ownType].scale
		// },300).to({
		// 	y:this.y+atkCfg.atk1[this._ownType].y,scaleX:atkCfg.atk1[this._ownType].scale,scaleY:atkCfg.atk1[this._ownType].scale
		// },100).to({
		// 	y:y,scaleX:cfg.scale,scaleY:cfg.scale
		// },200).to({
		// 	y:this.y+atkCfg.atkb2[this._ownType].y,scaleX:atkCfg.atkb2[this._ownType].scale,scaleY:atkCfg.atkb2[this._ownType].scale
		// },300).to({
		// 	y:this.y+atkCfg.atk2[this._ownType].y,scaleX:atkCfg.atk2[this._ownType].scale,scaleY:atkCfg.atk2[this._ownType].scale
		// },100).wait(200).to({y:y,scaleX:cfg.scale,scaleY:cfg.scale},100).call(()=>{
		// 	egret.Tween.removeTweens(this);
		// 	if(endCallback)
		// 	{
		// 		endCallback.call(thisObj);
		// 	}
		// },this);
	}

	public dispose():void
	{
		this._data=null;
		this._ownType=0;
		this._posIdx=0;
		this._initAttr=0;
		this._sid=null;
		this._skillIconContainer=null;
		super.dispose();
	}
}