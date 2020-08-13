class WifestatusShowView extends BaseView
{
	public constructor() 
	{
		super();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"wifeget_bg",
			"wifestatus_success",
			"wifestatus_success_blueType",
			// "wifeget","wifeget_json"
			"wifeview_namebg",
			"wifeview_namebg_male" ,
			]);
	}

	private getWifeid():string
	{
		// if(typeof(this.param.data.wifeIdList) == "string"){
		// 	this.param.data.wifeIdList = [this.param.data.wifeIdList];
		// }
		
		// let wifeId =  this.param.data.wifeIdList.shift();
		let wifeId =  this.param.data.wifeId;

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
		
		// let id = itemCfg.id;
		// if (id == "211" && Api.switchVoApi.checkOpenWifeVideo()) {
		// 	App.VideoUtil.play("resource/other/wifeVideo/"+id+"/001001.mp4", ()=>{this.reFreshView2(itemCfg);});
		// } else {
		// 	this.reFreshView2(itemCfg);
		// }
		this.reFreshView2(itemCfg);
	}

	private reFreshView2(itemCfg)
	{
		let wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(Number(itemCfg.id))
		if(!Api.switchVoApi.checkCloseWifeSound())
		{
			SoundManager.playEffect(wifeInfoVo.sound);
		}

		// let bg:BaseBitmap=BaseBitmap.create("wifeget_bg");
		let bg:BaseDisplayObjectContainer=App.CommonUtil.getContainerByLeftTopRes("wifeget_bg");
		bg.setScale(GameConfig.stageWidth/bg.width);
		this.addChildToContainer(bg);

		// let lizi=App.ParticleUtil.getParticle("wifeget");
		// this.addChildToContainer(lizi);
		// lizi.start();
		let changeDbone;
		let changeBitMap;
		 if(App.CommonUtil.check_dragon() ){
			 if(Api.switchVoApi.checkIsInBlueWife())
			{
				changeDbone =App.DragonBonesUtil.getLoadDragonBones("cefengchenggong_blueType",-1,"appear")
			}else{
				changeDbone =App.DragonBonesUtil.getLoadDragonBones("cefengchenggong",-1,"appear")
			}
			 
			changeDbone.playDragonMovie('appear',1);
			changeDbone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
				changeDbone.playDragonMovie('idle',0);
			}, this);
			changeDbone.x = GameConfig.stageWidth/2;
			changeDbone.y = 470;
		 }else{
			if(Api.switchVoApi.checkIsInBlueWife())
			{
				changeBitMap=BaseBitmap.create("wifestatus_success_blueType");
			}else{
				changeBitMap=BaseBitmap.create("wifestatus_success");
			}
			
			// changeBitMap.height=200;
			
			this.addChildToContainer(changeBitMap);
		 }

		
		



		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,640,840);
		let wifeIcon:BaseLoadBitmap=BaseLoadBitmap.create(itemCfg.body,rect);
		wifeIcon.width = rect.width;
		wifeIcon.height = rect.height;
		wifeIcon.setScale(0.7);
		let pos=App.CommonUtil.getCenterPos(this.viewBg,wifeIcon,false);
		wifeIcon.setPosition(pos.x,pos.y + 80*(1134-GameConfig.stageHeigth)/174);
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
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				// if(RES.hasRes(skinCfg.bone + "_ske")&&App.DeviceUtil.CheckWebglRenderMode()&&!Api.switchVoApi.checkCloseBone())
				if(Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske"))
				{

					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					droWifeIcon.setScale(1.0)
					droWifeIcon.x = wifeIcon.x + 240;
					droWifeIcon.y = wifeIcon.y + 848*0.7  +20;
					this.addChildToContainer(droWifeIcon);
					wifeIcon.visible = false;
				}
				
			}else{
				
				if(Api.wifeVoApi.isHaveBone(wifeInfoVo.bone + "_ske"))
				{

					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(wifeInfoVo.bone);
					droWifeIcon.setScale(1.0)
					droWifeIcon.x = wifeIcon.x + 240;
					droWifeIcon.y = wifeIcon.y + 848*0.7  +20;
					// this.addChildToContainer(droWifeIcon);
					this.addChildToContainer(droWifeIcon);
					// this._wifeContainer.visible = true
					wifeIcon.visible = false;
				}
			}
			
		}else{
			if(Api.wifeVoApi.isHaveBone(wifeInfoVo.bone + "_ske"))
			{

				let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(wifeInfoVo.bone);
				droWifeIcon.setScale(1.0)
				droWifeIcon.x = wifeIcon.x + 240;
				droWifeIcon.y = wifeIcon.y + 848*0.7  +20;
				// this.addChildToContainer(droWifeIcon);
				this.addChildToContainer(droWifeIcon);
				wifeIcon.visible = false;
			}
			
		}

		bg.setPosition(App.CommonUtil.getCenterX(this.viewBg,bg,false),wifeIcon.y+wifeIcon.height*wifeIcon.scaleY-bg.height*bg.scaleY);

		// lizi.y=wifeIcon.y - 100;
		// lizi.x = -350;
		let wifeInfoBg:BaseBitmap=BaseBitmap.create("public_9_wordbg");
		wifeInfoBg.height=200;
		wifeInfoBg.setPosition(0,wifeIcon.y+wifeIcon.height*wifeIcon.scaleY - 80*(1134-GameConfig.stageHeigth)/174);
		this.addChildToContainer(wifeInfoBg);
		
		// let txt1:BaseTextField=ComponentManager.getTextField();
		if(changeDbone)
		{
			changeDbone.y - wifeIcon.y;
			this.addChildToContainer(changeDbone);
		}else{
			changeBitMap.setPosition(this.width/2 - changeBitMap.width/2,wifeIcon.y-240);
			this.addChildToContainer(changeBitMap);
	}
		
		
		//红颜名字背景
		let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg"+ (wifeInfoVo.cfg.isBule() ?"_male":''));
		nameBg.x = 65;
		nameBg.y = wifeIcon.y;
		this.addChildToContainer(nameBg);
		//红颜名字
		let nameTF = ComponentManager.getTextField(itemCfg.name,TextFieldConst.FONTSIZE_TITLE_COMMON,0x3e0d01);
		nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2 - 17;
		nameTF.y = nameBg.y + 180/2 - nameTF.height/2;
		this.addChildToContainer(nameTF);

		if(PlatformManager.checkIsTextHorizontal()){
			nameBg.width = nameTF.width + 50;
			nameBg.x = GameConfig.stageWidth/2 - nameBg.width/2;
			nameBg.y = GameConfig.stageHeigth - 300;
			nameTF.x = nameBg.x + (nameBg.width - nameTF.width)*0.5;
			nameTF.y = nameBg.y + (nameBg.height - nameTF.height)/2;
		} else {
			nameBg.x = wifeIcon.x-nameBg.width + 28;
			nameBg.y = wifeIcon.y;
			nameTF.width = 27;
			nameTF.x = nameBg.x + (nameBg.width - nameTF.width)*0.5 - 15;
			nameTF.y = nameBg.y + (nameBg.height - nameTF.height)/2;
		}

		// //红颜说的话背景
		// let wordsBg:BaseBitmap = BaseBitmap.create("public_9v_bg11");
		// wordsBg.height=200;
		// wordsBg.x = 140;
		// wordsBg.y = wifeIcon.y-wordsBg.height-10;
		// this.addChildToContainer(wordsBg);
		// wordsBg.width = 330;
		// wordsBg.height = 90;
		// wordsBg.x = 280;
		// wordsBg.y = wifeIcon.y - 120;
		// this.addChildToContainer(wordsBg);

		// let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9v_bg11_tail");
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
		memoirDescTxt.x = GameConfig.stageWidth/2 - memoirDescTxt.width/2;
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
	protected isShowOpenAni():boolean
	{
		return false;
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