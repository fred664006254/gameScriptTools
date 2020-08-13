/**
 * 宠幸动画界面
 * author dukunayng
 * date 2017/10/10
 * @class WifeLoveAniView
 */

class WifeLoveAniView extends BaseView
{

	// id 红颜ID
	private _wifeId:number = null;

	private _wifePic:BaseLoadBitmap;

	//_type 类型 1随机宠幸 2 元宝宠幸
	private _type:number = null;

	private _taoxinParticle:particle.GravityParticleSystem;
	// private _wifeScrollItem1:WifeScrollItem1;
	private _container:BaseDisplayObjectContainer;

	private _wifeContainer:BaseDisplayObjectContainer;

	// 遮罩层
	private _wifeMaskBmp:BaseBitmap; 

	private _bg = null;
	private talkNum:number = 0;
	private _isDoubleFly:boolean = false;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();

        if (this.param.data ) {
			this._wifeId = this.param.data.id;
			this._type = this.param.data.type;
		}

		let wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		if(wifeCfg.isBule())
		{
			return rewardPic.concat(["taoxin","taoxin_json","taoxinani",
			"wifeview_lovebg_male",
			"wifeview_lovewordsbg_male",
			"wifeview_namebg",
			]);
		}

		if(this.param.data.id == 312){
				rewardPic.push(`wifelovevip14bg`);
		}
		else if (this.param.data.id == 313){
			rewardPic.push(`wifelovevip15bg`);
		}
		else if (this.param.data.id == 311){
			rewardPic.push(`wifelovevip16bg`);
		}

		return rewardPic.concat(["taoxin","taoxin_json","taoxinani",
        "wifeview_lovebg","wifeview_lovewordsbg",
				"wifeview_namebg",
		]);
	}


	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}
	protected getBgName():string
	{
		let wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		if(wifeCfg.isBule())
		{
			return "wifeview_lovebg_male"; 
		}
		return "wifeview_lovebg";
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

	protected initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFELOVEANI_CLICK,this.touchTap,this);
		this.initView2();
	}
	protected initView2():void
	{
		SoundManager.pauseBg()
		SoundManager.playEffect(SoundConst.EFFECT_WIFE_LOVE);

		this._wifeMaskBmp = BaseBitmap.create("public_9_viewmask");
		this._wifeMaskBmp.width=GameConfig.stageWidth;
		this._wifeMaskBmp.height=GameConfig.stageHeigth;
		this._wifeMaskBmp.touchEnabled = true;
		this._wifeMaskBmp.alpha = 0;
		this.addChild(this._wifeMaskBmp);
		// 
		this._wifeContainer = new BaseDisplayObjectContainer();
		this.addChild(this._wifeContainer);

		if(this._type == 1){
			let id = this._wifeId


			this.viewBg.visible = false;

			let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			let wifeScrollItem1 = new WifeScrollItem1();
			wifeScrollItem1.initItem(id,wifeInfoVo);
		
			// this.addChild(wifeScrollItem1);
			this._container = new BaseDisplayObjectContainer();
			this.addChild(this._container);

			wifeScrollItem1.setPosition(-wifeScrollItem1.width/2,-wifeScrollItem1.height/2);
			this._container.addChild(wifeScrollItem1);

			// this._container.setPosition(GameConfig.stageWidth/2 , GameConfig.stageHeigth/2 );

			// egret.Tween.get( this._wifeMaskBmp ).to( { alpha:0.8 }, 1000 );

			let posX = this.param.data.x;
			let posY = this.param.data.y;

			 var targetPoint: egret.Point = this.globalToLocal(posX,posY);
			 this._container.setPosition(targetPoint.x + wifeScrollItem1.width/2 , targetPoint.y + wifeScrollItem1.height/2);

			egret.Tween.get(this._container)
			.to({scaleX: 0.8,scaleY: 0.8}, 500)
			.to({scaleX: 1,scaleY: 1}, 500)
			// .to({scaleX: 0.5,scaleY: 0.5}, 300)
			// .to({scaleX: 0.5,scaleY: 0.5}, 300)
			.wait(300)
			.call(this.showWifeAni,this);
		}else{
			this.showWifeAni();
		}
        
	}

	private showWifeAni():void
	{		
		if (this._container){
			this.removeChild(this._container);
		}




		this.viewBg.visible = true;
		this._isDoubleFly = (this._wifeId == 236);
		let id = this._wifeId
		let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		let sexflag = wifeInfoVo.sexflag;
		if(Api.switchVoApi.checkOpenBlueWife() && sexflag){
			this.talkNum = App.MathUtil.getRandom(4,6);
		}
		 //妻子图片

		 	let wifePicStr = wifeInfoVo.body;
		
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePicStr = skinCfg.body;
			}
			
		}
        this._wifePic = BaseLoadBitmap.create(wifePicStr);
		// this._wifePic.scaleX = 1.5;
		// this._wifePic.scaleY = 1.5;
		this._wifePic.setPosition(0, GameConfig.stageHeigth - 760*this._wifePic.scaleY);
		// this._wifePic.setPosition(GameConfig.stageWidth/2 - 540*this._wifePic.scaleX/2, GameConfig.stageHeigth - 760*this._wifePic.scaleY);
		// this._wifePic.alpha = 0;
		this._wifeContainer.alpha = 0;
	
		this._wifeContainer.addChild(this._wifePic);


		let showDroWifeIcon:BaseLoadDragonBones = null;
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
					droWifeIcon.setScale(1.3)
					droWifeIcon.x = this._wifePic.x + 340;
					droWifeIcon.y = this._wifePic.y + 848  - 30;
					this._wifeContainer.addChild(droWifeIcon);
					this._wifePic.visible = false;
					showDroWifeIcon = droWifeIcon;
				}
				
			}else{
				let bonename = this.checkBoneName(wifeInfoVo.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{

					let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					droWifeIcon.setScale(1.3)
					droWifeIcon.x = this._wifePic.x + 340;
					droWifeIcon.y = this._wifePic.y + 848  - 30;
					// this.addChildToContainer(droWifeIcon);
					this._wifeContainer.addChild(droWifeIcon);
					this._wifeContainer.visible = true
					this._wifePic.visible = false;
					showDroWifeIcon = droWifeIcon;
				}
			}
			
		}else{
			let bonename = this.checkBoneName(wifeInfoVo.bone);
			if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
			{

				let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
				droWifeIcon.setScale(1.3)
				droWifeIcon.x = this._wifePic.x + 340;
				droWifeIcon.y = this._wifePic.y + 848  - 30;;
				// this.addChildToContainer(droWifeIcon);
				this._wifeContainer.addChild(droWifeIcon);
				this._wifePic.visible = false;
				showDroWifeIcon = droWifeIcon;
			}
			
		}

		if(showDroWifeIcon && this._isDoubleFly)
		{
			let twoName = this.getDoubleFlyBoneByName(showDroWifeIcon.getBoneName());
			if(Api.wifeVoApi.isHaveBone(twoName + "_ske"))
			{
				let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(twoName);
				droWifeIcon.setScale(1.3)
				droWifeIcon.x = this._wifePic.x + 340;
				droWifeIcon.y = this._wifePic.y + 848  - 30;;
				this._wifeContainer.addChild(droWifeIcon);
				this._wifeContainer.removeChild(showDroWifeIcon);
				this._wifeContainer.addChild(showDroWifeIcon);
			}
		}


		// egret.Tween.get( this._wifePic ).to( { alpha:1 }, 1000 ).wait(700).call(this.changePic,this);
		// egret.Tween.get( this._wifePic ).wait(1200).call(this.changePic2,this);
		let t1 = 1000;
		let t2 = 1200;
		let t3 = 700;
		if (Api.rookieVoApi.isEnRookie() && Api.switchVoApi.checkWifeAni()==false && sexflag!=1)
		{
			t1= 0;
			t2 = 0;
			t3 = 0;
			this.changePic()
		}
		else
		{
			egret.Tween.get( this._wifeContainer ).to( { alpha:1 }, t1 ).wait(t3).call(this.changePic,this);
			egret.Tween.get( this._wifeContainer ).wait(t2).call(()=>{
				this.changePic2();
				if(this.param.data.id == 312){
					let vbg = BaseBitmap.create(`wifelovevip14bg`);
					vbg.y = GameConfig.stageHeigth - vbg.height;
					this.addChildAt(vbg, this.getChildIndex(this.viewBg));
					egret.Tween.get(this.viewBg).to({alpha : 0}, 1300);
				}
				else if (this.param.data.id == 313){
					let vbg = BaseBitmap.create(`wifelovevip15bg`);
					this.addChildAt(vbg, this.getChildIndex(this.viewBg));
					egret.Tween.get(this.viewBg).to({alpha : 0}, 1300);
					let boneName = "wife_scene_"+this.param.data.id+"_ske";
					if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
						let bgDrog = App.DragonBonesUtil.getLoadDragonBones("wife_scene_"+this.param.data.id);
						bgDrog.setScale(1.53);
						bgDrog.setPosition(0, 0);
						this.addChildAt(bgDrog, this.getChildIndex(this.viewBg));
						egret.Tween.get(this.viewBg).to({alpha : 0}, 1300);
					}
				}
				else{
					if(Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id))
					{
						let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
						if(wifeSkinVo && wifeSkinVo.equip != "")
						{
							if (wifeSkinVo.equip == "3111"){
								let vbg = BaseBitmap.create(`wifelovevip16bg`);
								vbg.y = GameConfig.stageHeigth - vbg.height;
								this.addChildAt(vbg, this.getChildIndex(this.viewBg));
								egret.Tween.get(this.viewBg).to({alpha : 0}, 1300);
							}
						}
					}
				}
			},this);
		}

		

		egret.Tween.get( this._wifeMaskBmp ).to( { alpha:0.8 }, 1000 );

		if(this.param.data.id == 312){
			this._wifeMaskBmp.visible = false;

		}
		else{
			//红颜名字背景
			let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg");
		
			this.addChild(nameBg);
			//红颜名字
			let nameTF = ComponentManager.getTextField(wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
			

			if(PlatformManager.checkIsTextHorizontal()){
				
				nameBg.width = nameTF.width + 40;
				nameBg.x = GameConfig.stageWidth/2 - nameBg.width/2;
				nameBg.y = GameConfig.stageHeigth - nameBg.height - 10;

				nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
				nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;

			} else {
				nameBg.x = 25;
				nameBg.y = 200;
				nameTF.width = 27;
				nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
				nameTF.y = nameBg.y + 190/2 - nameTF.height/2;
			}


			this.addChild(nameTF);



			if(PlatformManager.checkIsTextHorizontal())
			{
				nameTF.setVisible(false);
				nameBg.setVisible(false);
			}
			else
			{
				nameTF.setVisible(true);
				nameBg.setVisible(true);
			}
		}
		//红颜说的话背景
		let wordsBg:BaseBitmap = BaseBitmap.create("wifeview_lovewordsbg"+ (sexflag?"_male":''));
		// wordsBg.width = 430;
		// wordsBg.height = 90;
		
		this.addChild(wordsBg);

		//红颜说的话
		// wifeInfoVo.words
		let wifeWords = wifeInfoVo.words;
		if(this.talkNum){
			wifeWords = LanguageManager.getlocal("wifeWords_male_" + id + "_" + this.talkNum)
		}
		let wifeWordsText:BaseTextField = ComponentManager.getTextField(wifeWords, TextFieldConst.FONTSIZE_CONTENT_SMALL);
		wifeWordsText.setColor(0x6d2939);
		wifeWordsText.width = 320;
		this.addChild(wifeWordsText);

		wordsBg.width = wifeWordsText.width + 100;
		wordsBg.x = 140;
		wordsBg.y = this._wifePic.y - 170;

		wifeWordsText.x = 193;
		wifeWordsText.y = this._wifePic.y - 130;

		// //脱衣前桃心
		// this._taoxinParticle = App.ParticleUtil.getParticle("taoxin");
		// this._taoxinParticle.x = -450;
		// this._taoxinParticle.y = 150;
		// this._taoxinParticle.start();
		// this.addChild(this._taoxinParticle);
	
	}
	private changePic2():void
	{
		let id = this._wifeId
		let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		let wifeCfg = Config.WifeCfg.getWifeCfgById(id);
		if(!wifeCfg.isBule())
		{
			let upgradeClip = ComponentManager.getCustomMovieClip("taoxinani_",13,100);
			upgradeClip.setScale(2);
			upgradeClip.x = 0;
			upgradeClip.y = 320;
			this.addChild(upgradeClip);
			upgradeClip.playWithTime(1);
			upgradeClip.setEndCallBack(() => {
				if (Api.switchVoApi.checkWifeAni()) {
					if (Api.switchVoApi.checkCloseWifeKiss() || Api.rookieVoApi.isEnRookie()) {
						return;
					}
					ViewController.getInstance().openView(ViewConst.BASE.WIFELOVECUCOLORISVIEW);
				}
			}, this)

		}
		else{
			this._wifeContainer.anchorOffsetX = this._wifeContainer.width / 2;
			this._wifeContainer.anchorOffsetY = this._wifeContainer.height / 2;
			this._wifeContainer.x = this._wifeContainer.anchorOffsetX ;
			this._wifeContainer.y = this._wifeContainer.anchorOffsetY ;
			egret.Tween.get(this._wifeContainer, {loop : false}).to({scaleX : 1.4, scaleY : 1.4},1000).wait(500).call(()=>{
				if (Api.switchVoApi.checkWifeAni()) {
					if (Api.switchVoApi.checkCloseWifeKiss() || Api.rookieVoApi.isEnRookie()) {
						return;
					}
					ViewController.getInstance().openView(ViewConst.BASE.WIFELOVECUCOLORISVIEW);
				}
			},this);
			if(App.CommonUtil.check_dragon()){
				let starBoneNode=App.DragonBonesUtil.getLoadDragonBones("taoxin_male");
				starBoneNode.x =320;// GameConfig.stageWidth/2;
				starBoneNode.y = (1136 )/2;
				this.addChildAt(starBoneNode,5);
				starBoneNode.alpha=0;
				egret.Tween.get(starBoneNode, {loop : false}).to({alpha:1},500);
			}
		}

		
		
	}

	private changePic():void
	{
		let id = this._wifeId;
		if (this._wifePic) {

		if(this.param.data.rewards)
		{
			let rewards= GameData.formatRewardItem(this.param.data.rewards);
			if(rewards&&rewards.length>0)
			{
				App.CommonUtil.playRewardFlyAction(rewards);
			}
		}	

		if(!Api.switchVoApi.checkWifeAni() && !Api.wifeVoApi.getWifeIsBlue(id)){
				let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

				let t1 = 2000;
				let t2 = 750;
				if (Api.rookieVoApi.isEnRookie()&& Api.switchVoApi.checkWifeAni()==false )
				{
					t1 = 0;
					t2 = 200;
				}
				// egret.Tween.get( this._wifePic ).to( { alpha:0 }, 2000 );
				egret.Tween.get( this._wifeContainer ).to( { alpha:0 }, t1 ).wait(t2).call(()=>{
					if (Api.switchVoApi.checkCloseWifeKiss() || Api.rookieVoApi.isEnRookie()) {
						return;
					}
					ViewController.getInstance().openView(ViewConst.BASE.WIFELOVECUCOLORISVIEW);
				},this);
				// .call(this.changePic,this);
				let wifeShowNum = this.getWifeShowNumById(id);
				App.LogUtil.log("changePic: wifeShownum: "+wifeShowNum);
				//妻子脱衣图片
				let wifePicStr = wifeInfoVo.body2;
				if (ResourceManager.hasRes(wifePicStr+"_"+wifeShowNum)){
					this.setWifeShowNum(id, wifeShowNum);
					wifePicStr = wifePicStr+"_"+wifeShowNum;
				}
				if (!ResourceManager.hasRes(wifePicStr)){
					wifePicStr = wifeInfoVo.body;
				}
				let wifePic = BaseLoadBitmap.create(wifePicStr);
				// wifePic.scaleX = 1.5;
				// wifePic.scaleY = 1.5;
				wifePic.setPosition(0, GameConfig.stageHeigth - 760 * wifePic.scaleY);
				wifePic.alpha = 0;
				this.addChild(wifePic);
				egret.Tween.get( wifePic ).to( { alpha:1 }, t1 );
				let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
				if(!(wifeSkinVo && wifeSkinVo.equip != ""))
				{	
					let boneStr = wifeInfoVo.bone2;
					if(Api.wifeVoApi.isHaveBone(wifeInfoVo.bone2 + "_"+ wifeShowNum + "_ske"))
					{
						boneStr = wifeInfoVo.bone2 + "_"+wifeShowNum;
					}
					if(Api.wifeVoApi.isHaveBone(boneStr + "_ske"))
					{
						let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(boneStr);
						droWifeIcon.setScale(1.3)
						if(this.param.data.id == 312){
							droWifeIcon.setScale(0.9);
							this.addChildAt(droWifeIcon, 5);
						}
						else{
							this.addChild(droWifeIcon);
						}
						droWifeIcon.x = this._wifePic.x + 340;
						droWifeIcon.y = this._wifePic.y + 848  - 30;
						// this._wifeContainer.addChild(droWifeIcon);
						wifePic.visible = false;
						droWifeIcon.alpha = 0;
						egret.Tween.get( droWifeIcon ).to( { alpha:1 }, t1 );
					}
					
				}
				else{
					let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
					if(wifeSkinVo && wifeSkinVo.equip != "")
					{
						let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
						let boneStr = skinCfg.bone2;
						if(Api.wifeVoApi.isHaveBone(skinCfg.bone2 + "_" + wifeShowNum + "_ske"))
						{
							boneStr = skinCfg.bone2 + "_" + wifeShowNum;
						}
						if(Api.wifeVoApi.isHaveBone(boneStr + "_ske"))
						{

							let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(boneStr);
							droWifeIcon.setScale(1.3)
							if(this.param.data.id == 312){
								droWifeIcon.setScale(0.9)
							}
							droWifeIcon.x = this._wifePic.x + 340;
							droWifeIcon.y = this._wifePic.y + 848  - 30;
							// this._wifeContainer.addChild(droWifeIcon);
							if (wifeSkinVo.equip== "3103")
							{
								this.addChildAt(droWifeIcon,5);
							}
							else
							{
								this.addChild(droWifeIcon);
							}
							
							droWifeIcon.alpha = 0;
							egret.Tween.get( droWifeIcon ).to( { alpha:1 }, 2000 );
							wifePic.visible = false;
						}
						else{
							let bodyStr = skinCfg.body2;
							if (RES.hasRes(skinCfg.body2+"_" + wifeShowNum)){
								bodyStr = skinCfg.body2+"_" + wifeShowNum;
							}
							if (!ResourceManager.hasRes(bodyStr)){
								bodyStr = skinCfg.body;
							}
							if(RES.hasRes(bodyStr))
							{
								wifePic.setload(bodyStr);
							}
						}
						
					}
				}
		}
			

			
			// .call(this.changePic,this);

			// this.removeChild(this._taoxinParticle);

			//脱衣后桃心
			let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			let wifeCfg = Config.WifeCfg.getWifeCfgById(id);
			if(!wifeCfg.isBule()){
				let taoxinFullParticle = App.ParticleUtil.getParticle("taoxin");
				taoxinFullParticle.x = -450 ;
				taoxinFullParticle.y = GameConfig.stageHeigth - 860;
				taoxinFullParticle.start();
				// taoxinFullParticle.scaleX = 2;
				// taoxinFullParticle.scaleY = 2;
				this.addChild(taoxinFullParticle);
			}
			
			WifeView.isMoveing = false;

			let timeNum = 0;
			if(Api.rookieVoApi.isInGuiding)
			{
				timeNum = 2000;
			}
			egret.Tween.get(this._wifeContainer).wait(timeNum).call(()=>{
				this.addTouchTap(this.touchTap,this,null);
			});
		}
	}

	private touchTap():void
	{
		this.hide();
		SoundManager.resumeBg()
		if (this.param.data.childData){
			// ViewController.getInstance().openView(ViewConst.BASE.WIFEGETCHILDVIEW,this.param.data.childData);
			ViewController.getInstance().openView(ViewConst.BASE.SPECIALCHILDGETVIEW,{id:this.param.data.childData,type:"Child"});
		}

		//手动调用红颜限时礼包强弹
		// Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.ENERGY_EMPTY);
		Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap2.ENERGY);
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFE_LOVECOM);
		if(Api.rookieVoApi.isInGuiding){
			Api.rookieVoApi.checkWaitingGuide();
			// Api.rookieVoApi.checkNextStep();
		}
		
	}

	/**记录红颜脱衣 针对有两套脱衣的情况 */
	public setWifeShowNum(id:number|string, num:number){
		let data = Api.otherInfoVoApi.getWifeUndress();
		let isHave = false;
		for (let i=0; i < data.length; i++){
			if (data[i].id == String(id)){
				data[i].value = num;
				isHave = true;
				break;
			}
		}
		if (!isHave){
			let info = {id:""+id, value:num};
			data.push(info);
		}
	}

	public getWifeShowNumById(id:number|string):number{
		let data = Api.otherInfoVoApi.getWifeUndress();
		let num = 0;
		for (let i=0; i < data.length; i++){
			if (data[i].id == String(id)){
				num = data[i].value;
				break;
			}
		}
		if (num == 1){
			return 2;
		}
		return 1;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFELOVEANI_CLICK,this.touchTap,this);
		this._wifeId = null;
		egret.Tween.removeTweens(this._wifePic);
		this._container = null;
		this._wifeContainer = null;
		this._wifeId = null;
		this._wifePic = null;
		this._type = null;
		this._taoxinParticle = null;
		this._wifeMaskBmp = null;
		this.talkNum = 0;
		this._isDoubleFly = false;
		super.dispose();
	}

}