class WifestatusShowView extends BaseView
{	

	private _isDoubleFly:boolean = false;

	public constructor() 
	{
		super();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"wifeget_bg",
			// "wifeget","wifeget_json"
			"wifeview_namebg","wife_doublefly_namebg"
			]);
	}

	private checkBoneName(name:string):string
	{	
		if (this._isDoubleFly)
		{
			return name+"_1";
		}
		return name;
	}

	private getDoubleFlyBoneByName(name:string):string
	{	
		if (this._isDoubleFly)
		{
			let doubleName = name.substr(0,name.length-1)+"2";
			return doubleName;
		}
		return name;
	}

	private getWifeid():string
	{
		// if(typeof(this.param.data.wifeIdList) == "string"){
		// 	this.param.data.wifeIdList = [this.param.data.wifeIdList];
		// }
		
		// let wifeId =  this.param.data.wifeIdList.shift();
		let wifeId =  this.param.data.wifeId;
		this._isDoubleFly = (wifeId == "236");
		// //触发分阶段引导
		// if(wifeId == "101"){
		// 	Api.rookieVoApi.curGuideKey = "wife";
		// 	Api.rookieVoApi.insertWaitingGuide({"idx":"wife_1"},true);
		// }
		return wifeId;
	}

	private getWaitServantId():string
	{
		if(typeof(this.param.data)=="object")
		{
			return this.param.data.servantId;
		}
		return null;
	}
	

	protected initView():void
	{
		SoundManager.pauseBg()
		// SoundManager.playEffect(SoundConst.EFFECT_WIFE_LOVE);
		
		this.reFreshView();
	}

	private reFreshView()
	{
		App.DisplayUtil.destory(this.container)
		let itemCfg=Config.WifeCfg.getWifeCfgById(this.getWifeid());
		this.reFreshView2(itemCfg);
	}

	private reFreshView2(itemCfg)
	{
		let wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(Number(itemCfg.id))
		SoundManager.playEffect(wifeInfoVo.sound);

		// let bg:BaseBitmap=BaseBitmap.create("wifeget_bg");
		let bg:BaseDisplayObjectContainer=App.CommonUtil.getContainerByLeftTopRes("wifeget_bg");
		bg.setScale(GameConfig.stageWidth/bg.width);
		this.addChildToContainer(bg);

		// let lizi=App.ParticleUtil.getParticle("wifeget");
		// this.addChildToContainer(lizi);
		// lizi.start();

		let wifePicStr = itemCfg.body;
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePicStr = skinCfg.body;
			}
			
		}
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,640,840);
		let wifeIcon:BaseLoadBitmap=BaseLoadBitmap.create(wifePicStr,rect);
		wifeIcon.setScale(0.7);
		let pos=App.CommonUtil.getCenterPos(this.viewBg,wifeIcon,false);
		wifeIcon.setPosition(pos.x,pos.y);
		this.addChildToContainer(wifeIcon);

		// if(Api.wifeVoApi.isHaveBone(itemCfg.bone + "_ske"))
		// {

		// 	let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(itemCfg.bone);
		// 	// droWifeIcon.setScale(0.7)
		// 	droWifeIcon.x = wifeIcon.x + 210;
		// 	droWifeIcon.y = wifeIcon.y + 760*0.7 + 70;
		// 	this.addChildToContainer(droWifeIcon);
		// 	wifeIcon.visible = false;
		// }
		let wifebone:BaseLoadDragonBones = null;
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				// if(RES.hasRes(skinCfg.bone + "_ske")&&App.DeviceUtil.CheckWebglRenderMode()&&!Api.switchVoApi.checkCloseBone())
				
				let bonename = this.checkBoneName(skinCfg.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{

					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					droWifeIcon.setScale(1.0)
					droWifeIcon.x = wifeIcon.x + 240;
					droWifeIcon.y = wifeIcon.y + 848*0.7  +20;
					this.addChildToContainer(droWifeIcon);
					wifeIcon.visible = false;
					wifebone = droWifeIcon;
				}

				
			}else{
				let bonename = this.checkBoneName(wifeInfoVo.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{

					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					droWifeIcon.setScale(1.0)
					droWifeIcon.x = wifeIcon.x + 240;
					droWifeIcon.y = wifeIcon.y + 848*0.7  +20;
					// this.addChildToContainer(droWifeIcon);
					this.addChildToContainer(droWifeIcon);
					// this._wifeContainer.visible = true
					wifeIcon.visible = false;
					wifebone = droWifeIcon;
				}
			}
			
		}else{
			let bonename = this.checkBoneName(wifeInfoVo.bone);
			if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
			{

				let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
				droWifeIcon.setScale(1.0)
				droWifeIcon.x = wifeIcon.x + 240;
				droWifeIcon.y = wifeIcon.y + 848*0.7  +20;
				// this.addChildToContainer(droWifeIcon);
				this.addChildToContainer(droWifeIcon);
				wifeIcon.visible = false;
				wifebone = droWifeIcon;
			}
			
		}
		if(wifebone)
		{
			if (this._isDoubleFly)
			{
				let twoName = this.getDoubleFlyBoneByName(wifebone.getBoneName());
				if(Api.wifeVoApi.isHaveBone(twoName + "_ske"))
				{
					let droWifeIcon2=App.DragonBonesUtil.getLoadDragonBones(twoName);
					droWifeIcon2.x = wifebone.x;
					droWifeIcon2.y = wifebone.y;
					this.addChildToContainer(droWifeIcon2);
					this.removeChildFromContainer(wifebone);
					this.addChildToContainer(wifebone);
				}
			}
		}


		bg.setPosition(App.CommonUtil.getCenterX(this.viewBg,bg,false),wifeIcon.y+wifeIcon.height*wifeIcon.scaleY-bg.height*bg.scaleY);

		// lizi.y=wifeIcon.y - 100;
		// lizi.x = -350;
		let wifeInfoBg:BaseBitmap=BaseBitmap.create("public_9_wordbg");
		wifeInfoBg.height=200;
		wifeInfoBg.setPosition(0,wifeIcon.y+wifeIcon.height*wifeIcon.scaleY);
		this.addChildToContainer(wifeInfoBg);
		
		// let txt1:BaseTextField=ComponentManager.getTextField();
		
		//红颜名字背景
		let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg");
		nameBg.x = wifeIcon.x-nameBg.width + 10;
		nameBg.y = wifeIcon.y;
		this.addChildToContainer(nameBg);
		//红颜名字
		let nameTF = ComponentManager.getTextField(itemCfg.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		if(PlatformManager.checkIsTextHorizontal())
		{
			nameTF.setPosition(wifeInfoBg.x  + wifeInfoBg.width / 2 - nameTF.width / 2,wifeInfoBg.y - nameTF.height - 20);
			nameBg.width = nameTF.width + 20;
			nameBg.setPosition(nameTF.x + nameTF.width / 2 - nameBg.width / 2, nameTF.y + nameTF.height / 2 - nameBg.height / 2 );

		}
		else
		{
			nameTF.width = 27;
			nameTF.x = nameBg.x + (nameBg.width - nameTF.width)*0.5;
			nameTF.y = nameBg.y + (nameBg.height - nameTF.height)/2-40;
		}

		this.addChildToContainer(nameTF);

		if (this._isDoubleFly)
		{
			nameTF.visible = false;
			nameBg.visible =false;

			let doubleContainer= new BaseDisplayObjectContainer();
			this.addChildToContainer(doubleContainer);

			if (PlatformManager.checkIsTextHorizontal())
			{
				let nameBg1:BaseBitmap = BaseBitmap.create("wife_doublefly_namebg");
				nameBg1.setPosition( GameConfig.stageWidth/2-30-nameBg1.width ,wifeInfoBg.y - nameBg1.height - 20);
				doubleContainer.addChild(nameBg1);

				let nameBg2:BaseBitmap = BaseBitmap.create("wife_doublefly_namebg");
				nameBg2.setPosition( GameConfig.stageWidth/2+40,nameBg1.y);
				doubleContainer.addChild(nameBg2);

				let nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1);
				doubleContainer.addChild(nameTF1);

				let nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2);
				doubleContainer.addChild(nameTF2);
			}
			else
			{
				let nameBg1:BaseBitmap = BaseBitmap.create("public_infobg2");
				nameBg1.setPosition(50 ,wifeInfoBg.y-550);
				doubleContainer.addChild(nameBg1);

				let nameBg2:BaseBitmap = BaseBitmap.create("public_infobg2");
				nameBg2.setPosition( GameConfig.stageWidth-nameBg2.width-nameBg1.x ,nameBg1.y);
				doubleContainer.addChild(nameBg2);

				let nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
				doubleContainer.addChild(nameTF1);

				let nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
				doubleContainer.addChild(nameTF2);

				nameTF1.width = 27;
				nameTF2.width = 27;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1, [5,-5]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2, [5,-5]);
			}

			
		}


		// //红颜说的话背景
		// let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
		// wordsBg.height=200;
		// wordsBg.x = 140;
		// wordsBg.y = wifeIcon.y-wordsBg.height-10;
		// this.addChildToContainer(wordsBg);
		// wordsBg.width = 330;
		// wordsBg.height = 90;
		// wordsBg.x = 280;
		// wordsBg.y = wifeIcon.y - 120;
		// this.addChildToContainer(wordsBg);

		// let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
		// wordsCornerBg.x = wordsBg.x+wordsBg.width/2;
		// wordsCornerBg.y = wifeIcon.y - 120 + 87;
		// this.addChildToContainer(wordsCornerBg);

		// //红颜说的话
		// let wifeWordsText:BaseTextField = ComponentManager.getTextField(itemCfg.words ,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		// wifeWordsText.width=wordsBg.width-40;
		// wifeWordsText.x = wordsBg.x+20;
		// wifeWordsText.y = wordsBg.y+(wordsBg.height-wifeWordsText.height)/2;
		// this.addChildToContainer(wifeWordsText);

		let rnd = App.MathUtil.getRandom(1,6)+"";
		if(Api.switchVoApi.checkIsInBlueWife()&&wifeInfoVo.cfg.isBule())
		{
			rnd = rnd + "_male"
		}
		let str = LanguageManager.getlocal("wifeStatusUp" + rnd)
		if(this.param.data.type == 1)
		{
			str = LanguageManager.getlocal("wifeStatusDown" + rnd)
		}
		
		
		let memoirDescTxt:BaseTextField=ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		memoirDescTxt.lineSpacing = 5;
		memoirDescTxt.width=wifeInfoBg.width-memoirDescTxt.x-30;
		memoirDescTxt.x = this.width/2 - memoirDescTxt.width/2;
		memoirDescTxt.y = wifeInfoBg.y + 40;
		this.addChildToContainer(memoirDescTxt);
		
		this.addTouchTap(this.removeTween,this);
		this.container.alpha=0;
		let ths=this;
		egret.Tween.get(this.container).to({alpha:1},500).call(function(){
			ths.removeTouchTap();
			ths.addTouchTap(ths.checkView,ths);
		});
		
	}

	private removeTween():void
	{
		if(this.container)
		{
			egret.Tween.removeTweens(this.container);
			this.container.alpha=1;
		}
		this.removeTouchTap();
		this.addTouchTap(this.checkView,this);
	}

	private checkView()
	{
		// if(this.param.data.wifeIdList.length <= 0){
		// 	this.hide()
		// }
		// else{
		// 	this.reFreshView();
		// }
		this.hide()
	}

	public hide():void
	{
		// let servantId:string=this.getWaitServantId();
		super.hide();
		// if(servantId)
		// {
		// 	ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,servantId);
		// }
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFESTATUS_SHOWCLOSE);
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "wifeview_lovebg";
	}
}