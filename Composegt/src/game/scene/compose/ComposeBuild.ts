class ComposeBuild extends BaseDisplayObjectContainer
{
	private _group:string;
	private _atkBtn:BaseLoadDragonBones;
	private _tipBg:BaseBitmap;
	private _tipTxt:BaseTextField;
	// private _ryun:BaseLoadBitmap;
	// private _lyun:BaseLoadBitmap;
	private _build:BaseLoadBitmap;
	private _effect:CustomMovieClip;
	constructor(group:string)
	{
		super();
		this._group=group;
		this.init();
	}

	private init():void
	{
		// this.flyYun(null,null)
		let cfg=Config.MapinfoCfg.getStartPosCfgByGroup(this._group);
		if(cfg)
		{
			let rect=egret.Rectangle.create();
			if(cfg.building)
			{
				rect.setTo(0,0,368,252);
			}
			else
			{
				rect.setTo(0,0,ComposeStatus.cellBgSize.w,ComposeStatus.cellBgSize.h);
			}
			let build=BaseLoadBitmap.create(cfg.buildRes,rect);
			this._build=build;
			build.setPosition(-build.width/2,-build.height/2);
			this.addChild(build);
			build.addTouchTap(this.goChallenge,this);
		}
		if(Api.composemapVoApi.checkUnlock(this._group)==false||(!cfg.building))
		{
			let nextUnlockGroup = Api.composemapVoApi.getNextUnlockGroup();
			if(nextUnlockGroup==this._group&&Api.composemapVoApi.checkOpenUnlock())
			{
				if(!cfg.building)
				{
					// this.initYun();
					this.initTip();
				}
				this.initAtk(!!cfg.building);
			}
			else
			{
				// this.initYun();
			}
		}
	}

	// private initYun():void
	// {
	// 	let yun1=BaseLoadBitmap.create("composeyun1");
	// 	let yun2=BaseLoadBitmap.create("composeyun2");
	// 	this._lyun=yun1;
	// 	this._ryun=yun2;
	// 	yun2.setPosition(-135,-15);
	// 	yun1.setPosition(yun2.x-43,yun2.y+56);
	// 	this.addChild(yun1);
	// 	this.addChild(yun2);
	// }

	private initTip():void
	{
		if(!this._tipBg)
		{
			let unlockStr=Api.composemapVoApi.getUnlockStrByGroup(this._group);
			if(unlockStr)
			{
				let textContainer = new BaseDisplayObjectContainer()
				this.addChild(textContainer);
				let bg=BaseLoadBitmap.create("composelocktipbg",new egret.Rectangle(0,0,151,70));
				this._tipBg=bg;
				textContainer.addChild(bg);
				let txt=ComponentManager.getTextField(unlockStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON-1,TextFieldConst.COLOR_BROWN_NEW);
				txt.lineSpacing=3;
				txt.textAlign = egret.HorizontalAlign.CENTER;
				this._tipTxt=txt;
				txt.width=bg.width-16;
	
				bg.setPosition(-bg.width/2,-90-22);//ComposeStatus.cellCfg.h-bg.height/2);
	
				txt.setPosition(bg.x+8,bg.y+8);
				textContainer.addChild(txt);
				textContainer.width = 151;
				textContainer.height = 70;
				// textContainer.anchorOffsetX = textContainer.width/2;
				// textContainer.anchorOffsetY = textContainer.height/2;
				// textContainer.x =  textContainer.width/2;
				// textContainer.y = textContainer.height/2;
				egret.Tween.get(textContainer, {
					loop: true,//设置循环播放
				}).to({scaleX:0.9,scaleY:0.9},1000).to({scaleX:1,scaleY:1.0},1000);

			}
		}
	}

	private initAtk(isbuild?:boolean):void
	{
		// if(isbuild)
		// {
		// 	if(!this._effect)
		// 	{
		// 		this._effect=ComponentManager.getCustomMovieClip("compose_b",7);
		// 		this._effect.setScale(3.8);
		// 		this._effect.setPosition(-140,ComposeStatus.cellBgSize.h*2-380-35);
		// 		this._effect.playWithTime(0);
		// 		this.addChild(this._effect);
		// 	}
		// }
		// else
		// {
			this.initTip();
		// }
		if(!this._atkBtn)
		{
			// let atkBtn=ComponentManager.getButton("btn_composeatk","",()=>{
			// 	ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
			// },this);
			let atkBtn=App.DragonBonesUtil.getLoadDragonBones("gongjianniu")
			this._atkBtn=atkBtn;
			atkBtn.setPosition(-atkBtn.width/2,ComposeStatus.cellBgSize.h*2-atkBtn.height-55-50-22);
			this.addChild(atkBtn);
			atkBtn.addTouchTap(this.goChallenge,this);
		}
		else
		{
			this._atkBtn.visible=true;
		}
	}

	private goChallenge():void
	{
		if(!Api.challengeVoApi.getChannelIslock())
		{
			App.CommonUtil.showTip(Api.challengeVoApi.getChannelLockStr())
			return;
		}
		Api.rookieVoApi.checkNextStep();
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK);
		ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
	}

	public isUnlocked():boolean
	{
		return Api.composemapVoApi.checkUnlock(this._group);
	}

	public setAttackStatus():void
	{
		let cfg=Config.MapinfoCfg.getStartPosCfgByGroup(this._group);
		// if(cfg.building)
		// {
		// 	this.flyYun(()=>{
		// 		this.initAtk(true);
		// 	},this);
		// }
		// else
		// {
			this.initAtk(false);
			this._atkBtn.alpha=0;
			this._tipBg.visible=false;
			this._tipTxt.visible=false;
			egret.Tween.get(this._atkBtn).to({alpha:1},1000).call(()=>{
				this._atkBtn&&egret.Tween.removeTweens(this._atkBtn);
				this._tipBg.visible=true;
				this._tipTxt.visible=true;
			},this);
		// }
	}

	private unlockEffect(callback:Function,thisObj:any):void
	{
		let effect=ComponentManager.getCustomMovieClip("compose_unlock",10,200);
		effect.setScale(2);
		effect.blendMode = egret.BlendMode.ADD;
		effect.setPosition(-91,-215);
		this.addChild(effect);
		let playing=true;
		let t=-1;
		let clear=()=>{
			playing=false;
			effect&&effect.dispose();
			if(callback)
			{
				callback.apply(thisObj);
			}
			if(t!=-1)
			{
				egret.clearTimeout(t);
				t=-1;
			}
		}
		t = egret.setTimeout(()=>{
			if(playing)
			{
				clear();
			}
		},this,3000);
		effect.setEndCallBack(()=>{
			clear();
		},this);
		effect.playWithTime(1);
		let unlockbmp=BaseLoadBitmap.create("composeunlock");
		unlockbmp.width=223;
		unlockbmp.height=40;
		unlockbmp.anchorOffsetX=unlockbmp.width*0.5;
		unlockbmp.anchorOffsetY=unlockbmp.height*0.5;
		unlockbmp.setScale(0.1);
		unlockbmp.alpha=0;
		let initX=0;
		let initY=0;
		egret.Tween.get(unlockbmp).wait(800).to({scaleX:1.1,scaleY:1.1,alpha:1},100).to({scaleX:1,scaleY:1},50).to({y:initX-50},500).to({y:initX-75,alpha:0},250).call(()=>{
			unlockbmp&&unlockbmp.dispose();
		},this);
		this.addChild(unlockbmp);

	}

	// public setUnlockStatus(callback:Function,thisObj:any):void
	// {
	// 	let cfg=Config.MapinfoCfg.getStartPosCfgByGroup(this._group);
	// 	this.touchChildren=false;
	// 	this.name=null;
	// 	// if(!cfg.building)
	// 	// {
	// 		// this._build&&(this._build.visible=false);
	// 		this._atkBtn&&(this._atkBtn.touchChildren=false);
	// 		// this._tipBg.visible = false;
	// 		// this._tipTxt.visible = false;
	// 		this.unlockEffect(()=>{
	// 			if(!cfg.building)
	// 			{
	// 				this.dispose();
	// 			}
	// 			if(callback)
	// 			{
	// 				callback.apply(thisObj);
	// 			}
	// 			Api.composemapVoApi.setunlockedStatusById(cfg.id);
	// 		},this);
	// 	// }
	// 	// else
	// 	// {
	// 	// 	this._atkBtn&&this._atkBtn.dispose();
	// 	// 	this._tipBg&&this._tipBg.dispose();
	// 	// 	this._tipTxt&&this._tipTxt.dispose();
	// 	// 	this._effect&&this._effect.dispose();
	// 	// 	this._effect=null;
	// 	// 	this._atkBtn=null;
	// 	// 	this._tipBg=null;
	// 	// 	this._tipTxt=null;
	// 	// 	let effect=ComponentManager.getCustomMovieClip("compose_bulk",9,200);
	// 	// 	effect.setPosition(0,0);
	// 	// 	effect.setScale(4.5);
	// 	// 	effect.setPosition(-220,-190);
	// 	// 	effect.blendMode=egret.BlendMode.ADD;
	// 	// 	this.addChild(effect);
	// 	// 	effect.setEndCallBack(()=>{
	// 	// 		effect&&effect.dispose();
	// 	// 		if(callback)
	// 	// 		{
	// 	// 			callback.apply(thisObj);
	// 	// 		}
	// 	// 	},this);
	// 	// 	effect.playWithTime(1);
	// 	// }
	// }

	public dispose():void
	{
		this._atkBtn=this._tipBg=this._tipTxt=this._build=this._effect=null;
		super.dispose();
	}
}