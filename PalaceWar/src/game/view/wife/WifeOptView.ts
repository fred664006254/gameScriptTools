/**
 * 红颜操作界面
 * author dky
 * date 2017/10/9
 * @class WifeView
 */
class WifeOptView extends CommonView {
	private _bg : BaseLoadBitmap = null;
	private _dgbone : BaseLoadDragonBones = null;
	//亲密度
	private _intimateValueText: BaseTextField;
	//子嗣
	private _childrenValueText: BaseTextField;

	//魅力值
	private _charmValueText: BaseTextField;

	//红颜经验
	private _expValueText: BaseTextField;

	//才艺
	private _artValueText: BaseTextField;

	//才情
	private _talentValueText: BaseTextField;

	private _wifeInfoVo: WifeInfoVo;

	private _giveDotSp:BaseBitmap = null;
	private _skillDotSp:BaseBitmap = null;
	private _skinDotSp:BaseBitmap = null;

	private _loveBtn:BaseButton;
	private _giveBtn:BaseButton;
	private _skillBtn:BaseButton;
	private _skinBtn:BaseButton;
	private _homeBtn:BaseButton;

	private _wifeIcon:BaseLoadBitmap;

	private _bottomBg:BaseBitmap;

	private _topContanier:BaseDisplayObjectContainer;

	private _wordsCornerBg:BaseBitmap = null;
	private _wordsBg:BaseBitmap = null;
	private _wifeWordsText: BaseTextField;
	private _droWifeIcon:BaseLoadDragonBones;
	private _droWifeIcon2:BaseLoadDragonBones;

	private _isMoving = false;
	private _decreeGoldCost:number = 0;
	private _mainTaskHandKey:string = null;

	private _banishContainer:BaseDisplayObjectContainer = null;
	private _banishTime: BaseTextField = null;

	private _wifebgParticlegroupName:string = null;
	private _bgContainer:BaseDisplayObjectContainer = null;
	private _nameTxt : BaseTextField = null;
	private _nameBg : BaseBitmap = null;

	private _wifeDescText : BaseTextField = null;
	private _dangjiaId : string = ``;
	//切换新增
	private _wifeInfoVoList:WifeInfoVo[] = [];
	private _wifeId:string = null;
	private _wifeIndex:number = 0;
	private _changesexBtn:BaseButton = null;
	private _isLeftClick:boolean = false;
	private _isSwitching:boolean = false;
	private _switchDelta:number = 0;
	private _leftAniContainer:BaseDisplayObjectContainer = null;
	private _rightAniContainer:BaseDisplayObjectContainer = null;

	//双飞
	private _isDoubleFly:boolean = false;
	private _doubleContainer:BaseDisplayObjectContainer = null;

	private _mainTaskHandLoveKey:string = null;
	private _mainTaskHandSkillKey:string = null;

	public constructor() {
		super();
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

	private checkShowDoubleName():void
	{
		if (this._isDoubleFly)
		{
			if (this._doubleContainer)
			{
				// this._doubleContainer.visible = true;
			}
			else
			{	
				
				this._doubleContainer= new BaseDisplayObjectContainer();
				this.addChildToContainer(this._doubleContainer);

				if (PlatformManager.checkIsTextHorizontal())
				{
					let nameBg1:BaseBitmap = BaseBitmap.create("wife_doublefly_namebg");
					nameBg1.setPosition( GameConfig.stageWidth/2-30-nameBg1.width ,this._bottomBg.y - 110);
					this._doubleContainer.addChild(nameBg1);

					let nameBg2:BaseBitmap = BaseBitmap.create("wife_doublefly_namebg");
					nameBg2.setPosition( GameConfig.stageWidth/2+40,nameBg1.y);
					this._doubleContainer.addChild(nameBg2);

					let nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF1, nameBg1);
					this._doubleContainer.addChild(nameTF1);

					let nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTF2, nameBg2);
					this._doubleContainer.addChild(nameTF2);
				}
				else
				{
					
					let nameBg1:BaseBitmap = BaseBitmap.create("public_infobg2");
					nameBg1.setPosition( 35,200);
					this._doubleContainer.addChild(nameBg1);

					let nameBg2:BaseBitmap = BaseBitmap.create("public_infobg2");
					nameBg2.setPosition( GameConfig.stageWidth-nameBg1.x-nameBg2.width,nameBg1.y);
					this._doubleContainer.addChild(nameBg2);

					let nameTF1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_1"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
					nameTF1.width = 27;
					nameTF1.x = nameBg1.x + nameBg1.width/2 - nameTF1.width/2+2;
					nameTF1.y = nameBg1.y + 64 - nameTF1.height/2;
					this._doubleContainer.addChild(nameTF1);

					let nameTF2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_236_2"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
					nameTF2.width = 27;
					nameTF2.x = nameBg2.x + nameBg2.width/2 - nameTF2.width/2+2;
					nameTF2.y = nameBg2.y + 64 - nameTF2.height/2;
					this._doubleContainer.addChild(nameTF2);
				}

				
			}
			// if (this._nameBg)
			// {
			// 	this._nameBg.visible = false;
			// }
			// if (this._nameTxt)
			// {
			// 	this._nameTxt.visible = false;
			// }
		}
		else
		{
			// if (this._doubleContainer)
			// {
			// 	this._doubleContainer.visible = false;
			// }
			// if (this._nameBg)
			// {
			// 	this._nameBg.visible = true;
			// }
			// if (this._nameTxt)
			// {
			// 	this._nameTxt.visible = true;
			// }
		}
	}
	private _randomid = 0;
	public initView(): void {
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SERVANTBONE, this.refreashBone, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFESKIN_SELECTBG),this.moveBgUp,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshInfoAfterLove,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshInfoAfterLove,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.checkRedPoint,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFESKIN,this.checkRedPoint,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.moveUiUp,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.setWifeCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFE_LOVECOM,this.checkDro2,this);
		App.MessageHelper.addNetMessage(NetRequestConst.OTHERINFO_SETDANGJIA,this.refreshNpc,this);
		Api.mainTaskVoApi.checkShowGuide("wifeoptview");

		this._wifeId = String(this.param.data.id);
		this._isDoubleFly = (this._wifeId == "236");
		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
		let wifecfg = Config.WifeCfg.getWifeCfgById(id);

		let sound = '';
		let words = '';

		let canHomeBtn = ComponentManager.getButton(`wifehomebtn`, ``, ()=>{

			if (this._isDoubleFly)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.WIFEDANGJIACHOOSEPOPUPVIEW);
			}	
			else
			{
				NetManager.request(NetRequestConst.OTHERINFO_SETDANGJIA, {
					dangjia : this._dangjiaId
				});
			}

			
			
		}, this);
		this.addChild(canHomeBtn);
		this._homeBtn = canHomeBtn;

		canHomeBtn.visible = false;
		
		
		if(wifeSkinVo && wifeSkinVo.equip != "")
		{
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
			if((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())){
				sound = skinCfg.sound;
				words = skinCfg.words;
			}
			else{
				sound = this._wifeInfoVo.sound;
				words = this._wifeInfoVo.words;
				if(wifecfg.canAtHome){
					this._dangjiaId = id;
					canHomeBtn.visible = true;
					let str = Api.otherInfoVoApi.getDangjiaWifeId();
					if((str != "" && (Number(str)==Number(id)) || (Number(id) == 101 && str == ``))){
						canHomeBtn.setBtnBitMap(`wifeinihomebtn`);
					}
				}
			}
			// wifePic = skinCfg.body;
			
		}
		else{
			sound = this._wifeInfoVo.sound;
			words = this._wifeInfoVo.words;
			if(wifecfg.canAtHome){
				this._dangjiaId = id;
				canHomeBtn.visible = true;
				let str = Api.otherInfoVoApi.getDangjiaWifeId();
				if((str != "" && (Number(str)==Number(id)) || (Number(id) == 101 && str == ``))){
					canHomeBtn.setBtnBitMap(`wifeinihomebtn`);
				}
			}
		}
		//蓝颜说的话和语音要对应
		let blueSoundIndex = 0
		if(Api.switchVoApi.checkOpenBlueWife()&& Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id) && this._wifeInfoVo.sexflag){
			blueSoundIndex = App.MathUtil.getRandom(1,4);
		}
		if(1)
		{
			let soundRes = '';
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				if((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())){
					soundRes = skinCfg.sound;
				}
				else{
					soundRes = this._wifeInfoVo.sound;
					if(blueSoundIndex){
						soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex)
					}
				}
			}
			else{
				soundRes = this._wifeInfoVo.sound
				if(blueSoundIndex){
					soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex)
				}
			}
			// if(this._sex){
			// 	soundRes = this._wifeInfoVo.getBlueSound();
			// }
			this.playEffect(soundRes, true);
		}

		//this.playEffect(sound,true);
		

		//大背景
		let bigBg:BaseLoadBitmap = BaseLoadBitmap.create("wifeview_optbg");
		bigBg.y = -100;
		this.addChildToContainer(bigBg);
		this._bg = bigBg;
	
		this._topContanier = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._topContanier);
		//描述背景
		let titleBg:BaseBitmap = BaseBitmap.create("public_9_bg11");
		titleBg.width = GameConfig.stageWidth;
		titleBg.height = 70;
		titleBg.y = -21;
		this._topContanier.addChild(titleBg);
	
		//红颜描述文字
		let wifeDescText:BaseTextField = ComponentManager.getTextField(this._wifeInfoVo.desc ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		wifeDescText.setColor(TextFieldConst.COLOR_WHITE);
		wifeDescText.x = 20;
		wifeDescText.width = GameConfig.stageWidth - wifeDescText.x*2;
		this._wifeDescText = wifeDescText;
		this._topContanier.addChild(wifeDescText);

		//转生按钮
		if(Api.switchVoApi.checkIsInBlueWife() && wifecfg.canBlueWife){
			let changesexBtn = ComponentManager.getButton(`wifechangesexbtn`,``,()=>{
				ViewController.getInstance().openView(ViewConst.COMMON.WIFECHANGESEXVIEW, {
					wid : this._wifeInfoVo.id,
					sex : this._wifeInfoVo.sexflag
				})
			}, this);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, changesexBtn, this, [7,227]);
			this.addChild(changesexBtn);

			bigBg.setload(this._wifeInfoVo.sexflag == 0 ? `wifeview_optbg` : `malewifebg`);
			this._changesexBtn = changesexBtn;
		}
		

		let wifePicStr = this._wifeInfoVo.body;
		
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePicStr = skinCfg.body;
				let bonename = this.checkBoneName(skinCfg.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{
					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = 0;
					// this._droWifeIcon.y = 0;
					this.addChildToContainer(this._droWifeIcon);

				}
				if(skinCfg.canAtHome){
					this._dangjiaId = wifeSkinVo.equip;
					canHomeBtn.visible = true;
					let str = Api.otherInfoVoApi.getDangjiaWifeId();
					if((str != "" && (Number(str)==Number(this._dangjiaId)) || (Number(id) == 101 && str == ``))){
						canHomeBtn.setBtnBitMap(`wifeinihomebtn`);
					}
				}
			}
			else{
				let bonename = this.checkBoneName(this._wifeInfoVo.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = this._wifeIcon.x;
					// this._droWifeIcon.y = this._wifeIcon.y;
					this.addChildToContainer(this._droWifeIcon);
					
				}
				if(wifecfg.canAtHome){
					this._dangjiaId = id;
					canHomeBtn.visible = true;
					let str = Api.otherInfoVoApi.getDangjiaWifeId();
					if((str != "" && (Number(str)==Number(id)) || (Number(id) == 101 && str == ``))){
						canHomeBtn.setBtnBitMap(`wifeinihomebtn`);
					}
				}
			}
			
		}else{
			let bonename = this.checkBoneName(this._wifeInfoVo.bone);
			if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
			{

				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
				// this._droWifeIcon.setScale(0.7)
				// this._droWifeIcon.x = this._wifeIcon.x;
				// this._droWifeIcon.y = this._wifeIcon.y;
				this.addChildToContainer(this._droWifeIcon);
			}
			if(wifecfg.canAtHome){
				this._dangjiaId = id;
				canHomeBtn.visible = true;
				let str = Api.otherInfoVoApi.getDangjiaWifeId();
				if((str != "" && (Number(str)==Number(id)) || (Number(id) == 101 && str == ``))){
					canHomeBtn.setBtnBitMap(`wifeinihomebtn`);
				}
			}
		}

		let wifeScale = 0.8;
		//红颜图像
		this._wifeIcon = BaseLoadBitmap.create(wifePicStr);
		this._wifeIcon.x = 80;
		
		this._wifeIcon.setScale(wifeScale);
		this.addChildToContainer(this._wifeIcon);

		if(this._droWifeIcon)
		{
			this._wifeIcon.visible = false;
			if (this._isDoubleFly)
			{
				let twoName = this.getDoubleFlyBoneByName(this._droWifeIcon.getBoneName());
				if(Api.wifeVoApi.isHaveBone(twoName + "_ske"))
				{
					this._droWifeIcon2=App.DragonBonesUtil.getLoadDragonBones(twoName);
					this.container.addChildAt(this._droWifeIcon2, this.container.getChildIndex(this._droWifeIcon));
					this.removeChildFromContainer(this._droWifeIcon);
					this.addChildToContainer(this._droWifeIcon);
				}
			}
		}

							//红颜说的话背景
		this._wordsBg = BaseBitmap.create("public_9_bg25");
		this._wordsBg.width = 430;
		this._wordsBg.height = 90;
		this._wordsBg.x = 180;
		if (PlatformManager.checkIsRuLang()){
			this._wordsBg.height = 100;
		}
		
		this.addChildToContainer(this._wordsBg);

		this._wordsCornerBg = BaseBitmap.create("public_9_bg25_tail");
		this._wordsCornerBg.x = 390;
		
		this.addChildToContainer(this._wordsCornerBg);

		//红颜说的话
		this._wifeWordsText = ComponentManager.getTextField(words ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._wifeWordsText.setColor(TextFieldConst.COLOR_BLACK);
		this._wifeWordsText.x = 200;

		this._wifeWordsText.width = 390;
		this.addChildToContainer(this._wifeWordsText);

		let wifebattle = Api.switchVoApi.checkOpenWifeBattle();
				//下面属性背景
		this._bottomBg = BaseBitmap.create(wifebattle ? "wifeview_bottombg3":"wifeview_bottombg2");
		// bottomBg.width = GameConfig.stageWidth;
		// bottomBg.height = 96;
		this._bottomBg.x = 0;
		this._bottomBg.y = GameConfig.stageHeigth - this.container.y - this._bottomBg.height;
		App.LogUtil.log(this._bottomBg.y)
		this.addChildToContainer(this._bottomBg);
		// this._wifeIcon.y = this._bottomBg.y - 840*wifeScale + 120;


		let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg");
		nameBg.name = `nameBg`;
		this._nameBg = nameBg;
		//横版名字变竖版名字
		if (PlatformManager.checkIsTextHorizontal())
		{


			//红颜名字
			let nameTF = ComponentManager.getTextField(this._wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
			
			nameBg.width = nameTF.width + 40;
			nameBg.x = GameConfig.stageWidth/2 - nameBg.width/2;
			nameBg.y = this._bottomBg.y - 100;
			this.addChildToContainer(nameBg);
			nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
			nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;
			this._nameTxt = nameTF;
			this.addChildToContainer(nameTF);
		} else {
			//红颜名字背景
		
			nameBg.x = 25;
			nameBg.y = 200;
			this.addChildToContainer(nameBg);
			//红颜名字
			let nameTF = ComponentManager.getTextField(this._wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
			nameTF.width = 27;
			nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
			nameTF.y = nameBg.y + 190/2 - nameTF.height/2;
			this._nameTxt = nameTF;
			this.addChildToContainer(nameTF);


		}
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, canHomeBtn, this, [7,227]);
		this.checkShowDoubleName();

		if (this._isDoubleFly)
		{
			this._nameTxt.alpha = 0;
			this._nameBg.alpha = 0;
		}

		this._wifeIcon.y = 158;
		if(this._wifeIcon.y + 840*wifeScale <  this._bottomBg.y + 50){
			this._wifeIcon.y = this._bottomBg.y + 50 - 840*wifeScale;
			
		}
		if(this._droWifeIcon)
		{
			this._droWifeIcon.setScale(1.1)
			this._droWifeIcon.x = this._wifeIcon.x + 230;
			this._droWifeIcon.y = this._wifeIcon.y + 760*0.7 + 140;
		}
		if(this._droWifeIcon2)
		{
			this._droWifeIcon2.setScale(1.1)
			this._droWifeIcon2.x = this._wifeIcon.x + 230;
			this._droWifeIcon2.y = this._wifeIcon.y + 760*0.7 + 140;
		}
		this._wordsBg.y = this._wifeIcon.y - 90;
		if (PlatformManager.checkIsRuLang()){
			this._wordsBg.y = this._wifeIcon.y - 100;
		}
		this._wifeWordsText.y = this._wordsBg.y + 20;
		this._wordsCornerBg.y = this._wordsBg.y + 87;
		
	

		let intIcon:BaseBitmap = BaseBitmap.create("wifeview_vigoricon");
		intIcon.x = wifebattle ? 15 : 50;
		intIcon.y = this._bottomBg.y + 75;
		this.addChildToContainer(intIcon);
		//亲密度
		let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.intimacy);
		this._intimateValueText = ComponentManager.getTextField( IntimacyValue,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._intimateValueText.setColor(TextFieldConst.COLOR_WHITE);
		this._intimateValueText.x = intIcon.x + intIcon.width + 5;
		this._intimateValueText.y = intIcon.y + intIcon.height/2 - this._intimateValueText.height/2;
		this.addChildToContainer(this._intimateValueText);

		//子嗣
		let childIcon:BaseBitmap = BaseBitmap.create("wifeview_childicon");
		childIcon.x = intIcon.x;
		childIcon.y = intIcon.y + intIcon.width ;
		this.addChildToContainer(childIcon);

		let childValue = LanguageManager.getlocal("wifeChildren") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.child);
		this._childrenValueText = ComponentManager.getTextField(childValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._childrenValueText.setColor(TextFieldConst.COLOR_WHITE);
		this._childrenValueText.x = this._intimateValueText.x;
		this._childrenValueText.y = childIcon.y + childIcon.height/2 - this._intimateValueText.height/2;
		this.addChildToContainer(this._childrenValueText);

		//魅力
		let charmIcon:BaseBitmap = BaseBitmap.create("wifeview_charmicon");
		charmIcon.x = wifebattle ? 225 : 345;
		charmIcon.y = intIcon.y ;
		this.addChildToContainer(charmIcon);

		let charmValue = LanguageManager.getlocal("wifeCharm") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.glamour);
		this._charmValueText = ComponentManager.getTextField(charmValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._charmValueText.setColor(TextFieldConst.COLOR_WHITE);
		this._charmValueText.x = charmIcon.x + charmIcon.width + 5;
		this._charmValueText.y = charmIcon.y + charmIcon.height/2 - this._intimateValueText.height/2;
		this.addChildToContainer(this._charmValueText);

		//经验
		let expIcon:BaseBitmap = BaseBitmap.create("wifeview_vexpicon");
		expIcon.x = charmIcon.x;
		expIcon.y = childIcon.y ;
		this.addChildToContainer(expIcon);

		let expValue = LanguageManager.getlocal("wifeExp2") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.exp);
		this._expValueText = ComponentManager.getTextField(expValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._expValueText.setColor(TextFieldConst.COLOR_WHITE);
		this._expValueText.x = charmIcon.x + charmIcon.width + 5;
		this._expValueText.y = this._childrenValueText.y;
		this.addChildToContainer(this._expValueText);

		if(wifebattle){
			//才艺
			let artIcon:BaseBitmap = BaseBitmap.create("wifeview_artistryicon");
			artIcon.x = 435;
			artIcon.y = intIcon.y ;
			this.addChildToContainer(artIcon);

			let artValue = LanguageManager.getlocal("wifeArt") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.artistry);
			this._artValueText = ComponentManager.getTextField(artValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._artValueText.setColor(TextFieldConst.COLOR_WHITE);
			this._artValueText.x = artIcon.x + artIcon.width + 5;
			this._artValueText.y = artIcon.y + artIcon.height/2 - this._artValueText.height/2;
			this.addChildToContainer(this._artValueText);

			//才情
			let talentIcon:BaseBitmap = BaseBitmap.create("wifeview_talenticon");
			talentIcon.x = artIcon.x;
			talentIcon.y = childIcon.y ;
			this.addChildToContainer(talentIcon);

			let add:number = 0;
			if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd){
				add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
			}
			let statusadd:number = add?add:0;
			let talentValue = LanguageManager.getlocal("wifeTalent") + " " + App.StringUtil.changeIntToText(Math.floor(this._wifeInfoVo.talent * (1 + statusadd/100)));
			this._talentValueText = ComponentManager.getTextField(talentValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._talentValueText.setColor(TextFieldConst.COLOR_WHITE);
			this._talentValueText.x = talentIcon.x + talentIcon.width + 5;
			this._talentValueText.y = this._childrenValueText.y;
			this.addChildToContainer(this._talentValueText);
		}
		
		// //按钮背景
		// let btnBg:BaseBitmap = BaseBitmap.create("public_9_bg9");
		// btnBg.width = 190;
		// btnBg.height = 260;
		// btnBg.x = 430;
		// btnBg.y = this._bottomBg.y - bottomBg.height - 230;
		// this.addChildToContainer(btnBg);

		let yy = this._bottomBg.y - 50

		let loveBg:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg.x = 50;
		loveBg.y = yy;
		this.addChildToContainer(loveBg);

		let loveBg2:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg2.x = 180;
		loveBg2.y = yy;
		this.addChildToContainer(loveBg2);

		let loveBg3:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg3.x = 310;
		loveBg3.y = yy;
		this.addChildToContainer(loveBg3);

		let loveBg4:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg4.x = 450;
		loveBg4.y = yy;
		this.addChildToContainer(loveBg4);

		//宠幸按钮
		this._loveBtn = ComponentManager.getButton("wife_love",null,this.loveHander,this,null,0);
		this._loveBtn.x = 70;
		this._loveBtn.y = yy;
		// this._loveBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._loveBtn);
		
		let loveNameBg:BaseBitmap = BaseBitmap.create("wife_btnbg");
		loveNameBg.x = this._loveBtn.x + 10;
		loveNameBg.y = this._loveBtn.y + 70 ;
		this.addChildToContainer(loveNameBg);
		
		let loveNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeLoveBtn") ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		loveNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		loveNameTF.x = loveNameBg.x + loveNameBg.width/2 - loveNameTF.width/2;
		loveNameTF.y = loveNameBg.y + loveNameBg.height/2 - loveNameTF.height/2;
		this.addChildToContainer(loveNameTF);

		this._mainTaskHandLoveKey = App.MainTaskHandUtil.addHandNode(
			this._loveBtn.parent,
			this._loveBtn.x + this._loveBtn.width/2,
			this._loveBtn.y + this._loveBtn.height/2, 
			[this._loveBtn],
			302, 
			true, 
			function() {
				return Api.wifeVoApi.getIdOfIntimacyMax() == String(this._wifeId) && (!Api.rookieVoApi.isGuiding);
			}, 
			this
		);

		//赏赐按钮
		this._giveBtn = ComponentManager.getButton("wife_give",null,this.giveHander,this,null,0);
		this._giveBtn.x = 200;
		this._giveBtn.y = yy;
		// this._giveBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._giveBtn);

		let giveNameBg:BaseBitmap = BaseBitmap.create("wife_btnbg");
		giveNameBg.x = this._giveBtn.x+ 10;
		giveNameBg.y = this._giveBtn.y + 70 ;
		this.addChildToContainer(giveNameBg);
		
		this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
			this._giveBtn.parent,
			this._giveBtn.x + this._giveBtn.width/2,
			this._giveBtn.y + this._giveBtn.height/2, 
			[this._giveBtn],
			306, 
			true, 
			function() {
				return Api.wifeVoApi.getIdOfIntimacyMax() == String(this._wifeId);
			}, 
			this
		);
		let giveNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeGiveBtn") ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		giveNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		giveNameTF.x = giveNameBg.x + giveNameBg.width/2 - giveNameTF.width/2;
		giveNameTF.y = giveNameBg.y + giveNameBg.height/2 - giveNameTF.height/2;
		this.addChildToContainer(giveNameTF);

		//技能按钮
		this._skillBtn = ComponentManager.getButton("wife_skill",null,this.skillHander,this,null,0);
		this._skillBtn.x = 333;
		this._skillBtn.y = yy;
		// this._skillBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._skillBtn);

		let skillNameBg:BaseBitmap = BaseBitmap.create("wife_btnbg");
		skillNameBg.x = this._skillBtn.x+ 10;
		skillNameBg.y = this._skillBtn.y + 70 ;
		this.addChildToContainer(skillNameBg);
		
		let skillNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillBtn")  ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		skillNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		skillNameTF.x = skillNameBg.x + skillNameBg.width/2 - skillNameTF.width/2;
		skillNameTF.y = skillNameBg.y + skillNameBg.height/2 - skillNameTF.height/2;
		this.addChildToContainer(skillNameTF);

		this._mainTaskHandSkillKey = App.MainTaskHandUtil.addHandNode(
			this.container,
			this._skillBtn.x + this._skillBtn.width/2,
			this._skillBtn.y + this._skillBtn.height/2, 
			[this._skillBtn],
			305, 
			true, 
			function() {
				return Api.wifeVoApi.getMainTaskIntimacyMax() == String(this._wifeId) && (!Api.rookieVoApi.isInGuiding && !Api.rookieVoApi.isGuiding);
			}, 
			this
		);

		//换装按钮
		this._skinBtn = ComponentManager.getButton("wifeview_skin",null,this.skinHander,this,null,0);
		this._skinBtn.x = 470;
		this._skinBtn.y = yy;
		// this._skinBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._skinBtn);

		let skinNameBg:BaseBitmap = BaseBitmap.create("wife_btnbg");
		skinNameBg.x = this._skinBtn.x+ 10;
		skinNameBg.y = this._skinBtn.y + 70 ;
		this.addChildToContainer(skinNameBg);
		
		let skinNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinViewTitle")  ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		skinNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		skinNameTF.x = skinNameBg.x + skinNameBg.width/2 - skinNameTF.width/2;
		skinNameTF.y = skinNameBg.y + skinNameBg.height/2 - skinNameTF.height/2;
		this.addChildToContainer(skinNameTF);

		this.checkRedPoint();

		if (Api.switchVoApi.checkOpenBanish() && Api.wifebanishVoApi.getIsWifeBanishing(String(this._wifeInfoVo.id)))
		{
			this._banishContainer = new BaseDisplayObjectContainer();
			//this._banishContainer.setPosition(20,GameConfig.stageHeigth-360);
			this.addChildToContainer(this._banishContainer);

			let banishing:BaseBitmap = BaseBitmap.create("wife_banishing_icon");
			this._banishContainer.addChild(banishing);

			let banishingbg:BaseBitmap = BaseBitmap.create("public_numbg");
			banishingbg.y= 62;
			this._banishContainer.addChild(banishingbg);
			banishing.x = banishingbg.width/2 - banishing.width/2;

			// let banishingText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banishing")  ,TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
			// banishingText.setColor(TextFieldConst.COLOR_WARN_GREEN3);
			// banishingText.setPosition(banishingbg.width/2-banishingText.width/2,64);
			// this._banishContainer.addChild(banishingText);

			let banishingText:BaseBitmap = BaseBitmap.create("wife_banishing_text");
			banishingText.setPosition(banishingbg.width/2-banishingText.width/2,64);
			this._banishContainer.addChild(banishingText);

			this._banishTime = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			this._banishTime.width = banishingbg.width;
			this._banishTime.setPosition(0,banishingText.y+banishingText.height+3);
			this._banishTime.textAlign = egret.HorizontalAlign.CENTER;
			this._banishContainer.addChild(this._banishTime);

			banishingbg.height = 48;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._banishContainer, nameBg, [0,-this._banishContainer.height-3]);
			this.tick();
		}
		if(this.param.data.wifeSkinId)
		{
			this.skinHander();
		}
		if(this._dgbone){
			this._dgbone.dispose();
			this._dgbone = null;
		}
		let info = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
		this._bg.setload(info.bgRes);
		if(App.CommonUtil.check_dragon() && info.bgRes != `` && info.bgRes != `wifeview_optbg` && info.bgRes != `malewifebg`){
			let arr = info.bgRes.split(`_`);
			let dgbone = App.DragonBonesUtil.getLoadDragonBones(`scene_wifeskin_${arr[1]}`);
			dgbone.x = 0;
			dgbone.y = this._pos[`scene_wifeskin_${arr[1]}`].y;
			dgbone.setAnchorOffset(0,0-this._pos[`scene_wifeskin_${arr[1]}`].height);
			this.container.addChildAt(dgbone, this.container.getChildIndex(this._bg) + 1);
			this._dgbone = dgbone;
		}
		// this.moveUiUp();
		//红颜切换
		this.showWifeSwitchBtn();
	}

	//红颜切换按钮
	private showWifeSwitchBtn():void{
		let wifeInfoVoList:WifeInfoVo[] = Api.wifeVoApi.getWifeInfoVoList();
		App.LogUtil.log("showWifeSwitchBtn00 : "+wifeInfoVoList.length);
		if(wifeInfoVoList.length <= 1)
		{
			return;
		}
		App.LogUtil.log("showWifeSwitchBtn0: "+wifeInfoVoList.length);
		let lastDropIdx = Api.otherInfoVoApi.getWifeSortId();
		this._wifeInfoVoList = new Array<WifeInfoVo>();
		// this._wifeInfoVoList.push(null);
		this._wifeInfoVoList = this._wifeInfoVoList.concat(wifeInfoVoList);
		let key = ``;
		switch(Number(lastDropIdx)){
			case 1:
				break;
			case 2:
				key = `intimacy`;
				break;
			case 3:
				key = `glamour`;
				break;
			case 4:
				key = `artistry`;
				break;
		}
		if(key != ""){
			this._wifeInfoVoList.sort((a,b)=>{
				if(a && b){
					let isexcilea = Api.wifebanishVoApi.getIsWifeBanishing(a.id.toString());
					let isexcileb = Api.wifebanishVoApi.getIsWifeBanishing(b.id.toString());
					if(isexcilea && isexcileb){
						if(key != ``){
							return b[key] - a[key];
						}
						return -1;
					}
					else if(isexcilea){
						return 1;
					}
					else if(isexcileb){
						return -1;
					}
					else{
						if(key != ``){
							return b[key] - a[key];
						}
						return -1;
					}
				}
			});
		}
		App.LogUtil.log("showWifeSwitchBtn0: "+this.container.height);
		// this._wifeInfoVoList.push(null);
		App.LogUtil.log("showWifeSwitchBtn0: "+this._wifeInfoVoList.length);
		//179 187
		let leftAniContainer = new BaseDisplayObjectContainer();
		leftAniContainer.setPosition(0, this.container.height/2 - 120);
		this.addChildToContainer(leftAniContainer);
		this._leftAniContainer = leftAniContainer;
		let leftAni = ComponentManager.getCustomMovieClip("wifeswitch_btneffect", 15, 70);
		leftAni.skewY = 180;
		leftAni.setPosition(115, 0);
		// this.addChildToContainer(leftAni);
		leftAniContainer.addChild(leftAni);
		leftAni.playWithTime(0);
		let leftAlphaBg = BaseBitmap.create("public_alphabg");
        leftAlphaBg.width = 179;
		leftAlphaBg.height = 187;
		leftAlphaBg.setPosition(0, leftAni.y);
		leftAniContainer.addChild(leftAlphaBg);
		leftAlphaBg.addTouchTap(this.wifeSwitchHandler, this, ["left"]);
		
		let rightAniContainer = new BaseDisplayObjectContainer();
		rightAniContainer.setPosition(GameConfig.stageWidth - 115, this.container.height/2 - 120);
		this.addChildToContainer(rightAniContainer);
		this._rightAniContainer = rightAniContainer;
		let rightAni = ComponentManager.getCustomMovieClip("wifeswitch_btneffect", 15, 70);
		rightAni.setPosition(0, 0);
		rightAniContainer.addChild(rightAni);
		rightAni.playWithTime(0);
		let rightAlphaBg = BaseBitmap.create("public_alphabg");
        rightAlphaBg.width = 179;
		rightAlphaBg.height = 187;
		rightAlphaBg.setPosition(rightAni.x, rightAni.y);
		rightAniContainer.addChild(rightAlphaBg);
		rightAlphaBg.addTouchTap(this.wifeSwitchHandler, this, ["right"]);

		for (let i = 0; i < this._wifeInfoVoList.length; i++){
			if (String(this._wifeInfoVoList[i].id) == this._wifeId){
				this._wifeIndex = i;
				break;
			}
		}
		App.LogUtil.log("wifeIndex: "+this._wifeIndex);
	}

	private wifeSwitchHandler(evt:any, type:any){
		App.LogUtil.log("wifeSwitchHandler: "+type);
		let curS = egret.getTimer();
		if(curS - this._switchDelta < 400)
		{
			return;	
		}
		this._switchDelta = curS;
		if (this._isSwitching){
			return;
		}
		if (type == "left"){
			this._wifeIndex -= 1;
			this._isLeftClick = true;
			if (this._wifeIndex < 0){
				this._wifeIndex = this._wifeInfoVoList.length - 1;
			}
		}
		else{
			this._wifeIndex += 1;
			this._isLeftClick = false;
			if (this._wifeIndex >= this._wifeInfoVoList.length){
				this._wifeIndex = 0;
			}
		}
		this._isSwitching = true;
		App.LogUtil.log("wifeIndex: "+this._wifeIndex);
		this.refreshSwitchWifeView();
	}

	private refreshSwitchWifeView():void{
		let id = String(this._wifeInfoVoList[this._wifeIndex].id);
		this._wifeId = id;
		this._isDoubleFly = (this._wifeId == "236");
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
		let wifecfg = Config.WifeCfg.getWifeCfgById(id);
		this._homeBtn.visible = false;
		this._homeBtn.setBtnBitMap("wifehomebtn");
		let sound = '';
		let words = '';
		WifeView.wifeId = id;
		if(wifeSkinVo && wifeSkinVo.equip != "")
		{
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
			if((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())){
				sound = skinCfg.sound;
				words = skinCfg.words;
			}
			else{
				sound = this._wifeInfoVo.sound;
				words = this._wifeInfoVo.words;
				if(wifecfg.canAtHome){
					this._dangjiaId = id;
					this._homeBtn.visible = true;
					let str = Api.otherInfoVoApi.getDangjiaWifeId();
					if((str != "" && (Number(str)==Number(id)) || (Number(id) == 101 && str == ``))){
						this._homeBtn.setBtnBitMap(`wifeinihomebtn`);
					}
				}
			}			
		}
		else{
			sound = this._wifeInfoVo.sound;
			words = this._wifeInfoVo.words;
			if(wifecfg.canAtHome){
				this._dangjiaId = id;
				this._homeBtn.visible = true;
				let str = Api.otherInfoVoApi.getDangjiaWifeId();
				if((str != "" && (Number(str)==Number(id)) || (Number(id) == 101 && str == ``))){
					this._homeBtn.setBtnBitMap(`wifeinihomebtn`);
				}
			}
		}
		//蓝颜说的话和语音要对应
		let blueSoundIndex = 0;
		if(Api.switchVoApi.checkOpenBlueWife()&& Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id) && this._wifeInfoVo.sexflag){
			blueSoundIndex = App.MathUtil.getRandom(1,4);
		}
		if(1)
		{
			let soundRes = '';
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				if((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())){
					soundRes = skinCfg.sound;
				}
				else{
					soundRes = this._wifeInfoVo.sound;
					if(blueSoundIndex){
						soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex)
					}
				}
			}
			else{
				soundRes = this._wifeInfoVo.sound
				if(blueSoundIndex){
					soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex)
				}
			}
			this.playEffect(soundRes, true);
		}

		//顶部文字
		this._wifeDescText.text = this._wifeInfoVo.desc;
		//转生按钮
		App.LogUtil.log("wifecfg.canBlueWife: "+wifecfg.canBlueWife);
		if(Api.switchVoApi.checkIsInBlueWife() && wifecfg.canBlueWife){
			if (this._changesexBtn){
				App.LogUtil.log("wifecfg.canBlueWife 0: ");
				this._changesexBtn.visible = true;
			}
			else{
				App.LogUtil.log("wifecfg.canBlueWife 1: ");
				let changesexBtn = ComponentManager.getButton(`wifechangesexbtn`,``,()=>{
					ViewController.getInstance().openView(ViewConst.COMMON.WIFECHANGESEXVIEW, {
						wid : this._wifeInfoVo.id,
						sex : this._wifeInfoVo.sexflag
					})
				}, this);
				changesexBtn.setPosition(GameConfig.stageWidth - 7 - changesexBtn.width, GameConfig.stageHeigth - 227 - changesexBtn.height);
				// App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, changesexBtn, this, [7,227]);
				this.addChild(changesexBtn);

				this._bg.setload(this._wifeInfoVo.sexflag == 0 ? `wifeview_optbg` : `malewifebg`);
				this._changesexBtn = changesexBtn;
			}
		}
		else{
			App.LogUtil.log("wifecfg.canBlueWife 2: ");
			if (this._changesexBtn){
				this._changesexBtn.visible = false;
				App.LogUtil.log("wifecfg.canBlueWife 3: ");
			}
		}
		//红颜
		if (this._droWifeIcon){
			this._droWifeIcon.dispose();
			this._droWifeIcon = null;
		}
		if (this._droWifeIcon2){
			this._droWifeIcon2.dispose();
			this._droWifeIcon2 = null;
		}
		let wifePicStr = this._wifeInfoVo.body;
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePicStr = skinCfg.body;
				let bonename = this.checkBoneName(skinCfg.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{
					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					// this.addChildToContainer(this._droWifeIcon);
					this.container.addChildAt(this._droWifeIcon, this.container.getChildIndex(this._bg) + 1);

				}
				if(skinCfg.canAtHome){
					this._dangjiaId = wifeSkinVo.equip;
					this._homeBtn.visible = true;
					let str = Api.otherInfoVoApi.getDangjiaWifeId();
					if((str != "" && (Number(str)==Number(this._dangjiaId)) || (Number(id) == 101 && str == ``))){
						this._homeBtn.setBtnBitMap(`wifeinihomebtn`);
					}
				}
			}
			else{
				let bonename = this.checkBoneName(this._wifeInfoVo.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{
					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					// this.addChildToContainer(this._droWifeIcon);
					this.container.addChildAt(this._droWifeIcon, this.container.getChildIndex(this._bg) + 1);	
				}
				if(wifecfg.canAtHome){
					this._dangjiaId = id;
					this._homeBtn.visible = true;
					let str = Api.otherInfoVoApi.getDangjiaWifeId();
					if((str != "" && (Number(str)==Number(id)) || (Number(id) == 101 && str == ``))){
						this._homeBtn.setBtnBitMap(`wifeinihomebtn`);
					}
				}
			}
			
		}else{
			let bonename = this.checkBoneName(this._wifeInfoVo.bone);
			if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
			{
				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
				// this.addChildToContainer(this._droWifeIcon);
				this.container.addChildAt(this._droWifeIcon, this.container.getChildIndex(this._bg) + 1);
			}
			if(wifecfg.canAtHome){
				this._dangjiaId = id;
				this._homeBtn.visible = true;
				let str = Api.otherInfoVoApi.getDangjiaWifeId();
				if((str != "" && (Number(str)==Number(id)) || (Number(id) == 101 && str == ``))){
					this._homeBtn.setBtnBitMap(`wifeinihomebtn`);
				}
			}
		}
		this._wifeIcon.visible = false;
		this._wifeIcon.setload(wifePicStr);
		if(this._droWifeIcon)
		{
			this._wifeIcon.visible = false;
			if (this._isDoubleFly)
			{
				let twoName = this.getDoubleFlyBoneByName(this._droWifeIcon.getBoneName());
				if(Api.wifeVoApi.isHaveBone(twoName + "_ske"))
				{
					this._droWifeIcon2=App.DragonBonesUtil.getLoadDragonBones(twoName);
					this.container.addChildAt(this._droWifeIcon2, this.container.getChildIndex(this._droWifeIcon));
				}

			}
		}
		else{
			this._wifeIcon.visible = true;
		}
		//红颜说的话
		this._wifeWordsText.text = words;
		//属性背景
		let wifebattle = Api.switchVoApi.checkOpenWifeBattle();
		this._bottomBg.setRes(wifebattle ? "wifeview_bottombg3":"wifeview_bottombg2");

		//红颜名字
		this._nameTxt.text = this._wifeInfoVo.name;
		this.checkShowDoubleName();
		let nameBg = this.container.getChildByName("nameBg");
		if (PlatformManager.checkIsTextHorizontal())
		{
			nameBg.width = this._nameTxt.width + 40;
			nameBg.x = GameConfig.stageWidth/2 - nameBg.width/2;
			this._nameTxt.x = nameBg.x + nameBg.width/2 - this._nameTxt.width/2;
		}
		else{
			this._nameTxt.y = nameBg.y + 190/2 - this._nameTxt.height/2;
		}

		let wifeScale = 0.8;
		this._wifeIcon.y = 158;
		if(this._wifeIcon.y + 840*wifeScale <  this._bottomBg.y + 50){
			this._wifeIcon.y = this._bottomBg.y + 50 - 840*wifeScale;
			
		}
		if(this._droWifeIcon)
		{
			this._droWifeIcon.setScale(1.1)
			this._droWifeIcon.x = this._wifeIcon.x + 230;
			this._droWifeIcon.y = this._wifeIcon.y + 760*0.7 + 140;
		}
		if(this._droWifeIcon2)
		{
			this._droWifeIcon2.setScale(1.1)
			this._droWifeIcon2.x = this._wifeIcon.x + 230;
			this._droWifeIcon2.y = this._wifeIcon.y + 760*0.7 + 140;
		}
		this._wordsBg.y = this._wifeIcon.y - 90;
		if (PlatformManager.checkIsRuLang()){
			this._wordsBg.y = this._wifeIcon.y - 100;
		}
		this._wifeWordsText.y = this._wordsBg.y + 20;
		this._wordsCornerBg.y = this._wordsBg.y + 87;

		//动画
		let waitT = 250;

		if (this._isDoubleFly)
		{
			egret.Tween.get(nameBg).to({alpha: 0}, 50);
			egret.Tween.get(this._nameTxt).to({alpha: 0}, 50);
			this._doubleContainer.alpha = 0;
			egret.Tween.get(this._doubleContainer).wait(waitT+50).to({alpha: 1}, 100);
		}
		else
		{	
			if (this._doubleContainer)
			{
				egret.Tween.get(this._doubleContainer).to({alpha: 0}, 50);
			}
			egret.Tween.get(nameBg).to({alpha: 0}, 50).wait(waitT).to({alpha: 1}, 100);
			egret.Tween.get(this._nameTxt).to({alpha: 0}, 50).wait(waitT).to({alpha: 1}, 100);
		}

		


		egret.Tween.get(this._wordsBg).to({alpha: 0}, 50).wait(waitT).to({alpha: 1}, 100);
		egret.Tween.get(this._wifeWordsText).to({alpha: 0}, 50).wait(waitT).to({alpha: 1}, 100);
		egret.Tween.get(this._wordsCornerBg).to({alpha: 0}, 50).wait(waitT).to({alpha: 1}, 100);

		let moveOffX = 200;
		if (this._isLeftClick){
			moveOffX = -200;
		}
		if (this._droWifeIcon && this._droWifeIcon.visible == true){
			egret.Tween.get(this._droWifeIcon).to({alpha: 0}).set({x: this._droWifeIcon.x + moveOffX}).wait(150).to({alpha:1, x: this._droWifeIcon.x}, 250).call(()=>{
				this._isSwitching = false;
			});

			if (this._droWifeIcon2 && this._droWifeIcon2.visible == true)
			{
				egret.Tween.get(this._droWifeIcon2).to({alpha: 0}).set({x: this._droWifeIcon2.x + moveOffX}).wait(150).to({alpha:1, x: this._droWifeIcon2.x}, 250);
			}

		}
		else if (this._wifeIcon && this._wifeIcon.visible == true){
			egret.Tween.get(this._wifeIcon).to({alpha: 0}).set({x: 80 + moveOffX}).wait(150).to({alpha:1, x: 80}, 250).call(()=>{
				this._isSwitching = false;
			});
		}
		
		this.checkRedPoint();
		if (Api.switchVoApi.checkOpenBanish() && Api.wifebanishVoApi.getIsWifeBanishing(String(this._wifeInfoVo.id)))
		{
			if (this._banishContainer){
				this._banishContainer.visible = true;
			}
			else{
				this._banishContainer = new BaseDisplayObjectContainer();
				//this._banishContainer.setPosition(20,GameConfig.stageHeigth-360);
				this.addChildToContainer(this._banishContainer);

				let banishing:BaseBitmap = BaseBitmap.create("wife_banishing_icon");
				this._banishContainer.addChild(banishing);

				let banishingbg:BaseBitmap = BaseBitmap.create("public_numbg");
				banishingbg.y= 62;
				this._banishContainer.addChild(banishingbg);
				banishing.x = banishingbg.width/2 - banishing.width/2;

				let banishingText:BaseBitmap = BaseBitmap.create("wife_banishing_text");
				banishingText.setPosition(banishingbg.width/2-banishingText.width/2,64);
				this._banishContainer.addChild(banishingText);

				this._banishTime = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
				this._banishTime.width = banishingbg.width;
				this._banishTime.setPosition(0,banishingText.y+banishingText.height+3);
				this._banishTime.textAlign = egret.HorizontalAlign.CENTER;
				this._banishContainer.addChild(this._banishTime);

				banishingbg.height = 48;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._banishContainer, nameBg, [0,-this._banishContainer.height-3]);
			}
			this.tick();
		}
		else{
			if (this._banishContainer){
				this._banishContainer.visible = false;
			}
		}

		if(this._dgbone){
			this._dgbone.dispose();
			this._dgbone = null;
		}
		let info = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
		this._bg.setload(info.bgRes);
		if(App.CommonUtil.check_dragon() && info.bgRes != `` && info.bgRes != `wifeview_optbg` && info.bgRes != `malewifebg`){
			let arr = info.bgRes.split(`_`);
			let dgbone = App.DragonBonesUtil.getLoadDragonBones(`scene_wifeskin_${arr[1]}`);
			dgbone.x = 0;
			dgbone.y = this._pos[`scene_wifeskin_${arr[1]}`].y;
			dgbone.setAnchorOffset(0,0-this._pos[`scene_wifeskin_${arr[1]}`].height);
			this.container.addChildAt(dgbone, this.container.getChildIndex(this._bg) + 1);
			this._dgbone = dgbone;
		}
	}

	protected tick():void
	{	
		let banishInfo:WifeBanishInfoVo = Api.wifebanishVoApi.getBanishInfoVoByWife(this._wifeInfoVo.id);
		if ( this._banishTime && banishInfo  && banishInfo.et >= GameData.serverTime)
		{   
			let lastStr = App.DateUtil.getFormatBySecondIntoTime(banishInfo.et - GameData.serverTime);
			this._banishTime.text = LanguageManager.getlocal("friends_collectLastTime",[lastStr]);
		}
		else
		{
			if (this._banishContainer)
			{
				this._banishContainer.dispose();
				this._banishContainer = null;
			}
		}
	}

	private checkRedPoint(){
		this.refreshInfoAfterLove();
		//赏赐红点
		if (Api.switchVoApi.checkOpenBanish() && Api.wifebanishVoApi.getIsWifeBanishing(String(this._wifeInfoVo.id)))
		{
			return;
		}

		if(Api.wifeVoApi.getGiveRed())
		{
			if(this._giveDotSp == null)
			{
				this._giveDotSp = BaseBitmap.create("public_dot2");
				this._giveDotSp.x = this._giveBtn.x + this._giveBtn.width - this._giveDotSp.width ;
				this._giveDotSp.y = this._giveBtn.y;
				this.addChildToContainer(this._giveDotSp);
			}
			else
			{
				if(this._giveDotSp)
				{
					this._giveDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._giveDotSp)
			{
				this._giveDotSp.visible = false;
			}
		}
		//技能红点
		if(Api.wifeVoApi.getSkillRed(this._wifeInfoVo.id))
		{
			if(this._skillDotSp == null)
			{
				this._skillDotSp = BaseBitmap.create("public_dot2");
				this._skillDotSp.x = this._skillBtn.x + this._skillBtn.width - this._skillDotSp.width ;
				this._skillDotSp.y = this._skillBtn.y;
				this.addChildToContainer(this._skillDotSp);
			}
			else
			{
				if(this._skillDotSp)
				{
					this._skillDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._skillDotSp)
			{
				this._skillDotSp.visible = false;
			}
		}

		//皮肤红点
		if(Api.wifeSkinVoApi.getSkinRed(this._wifeId))
		{
			if(this._skinDotSp == null)
			{
				this._skinDotSp = BaseBitmap.create("public_dot2");
				this._skinDotSp.x = this._skinBtn.x + this._skinBtn.width - this._skinDotSp.width ;
				this._skinDotSp.y = this._skinBtn.y;
				this.addChildToContainer(this._skinDotSp);
			}
			else
			{
				if(this._skinDotSp)
				{
					this._skinDotSp.visible = true;
				}
			}
		}
		else
		{
			if(this._skinDotSp)
			{
				this._skinDotSp.visible = false;
			}
		}
	}

	private _pos = {
		"scene_wifeskin_1" : {y : 120, height : 970},
		"scene_wifeskin_2" : {y : 50, height : 1010},
	};

	private loveHander(){
		if(this._isMoving)
		{
			return;
		}
		let gem = Api.playerVoApi.getPlayerGem();
		let needGem = Api.wifeVoApi.getLoveNeedGem(this._wifeInfoVo.intimacy);
		let addInfo = Api.wifeVoApi.getDecreePolicyAddAttrInfo2();
		let decreeStr = "";
		let costV = 0;
		if(addInfo){
			if (addInfo.lastTimes > 0)
			{ 
				costV = Math.floor(addInfo.addExtent * needGem)
				decreeStr = LanguageManager.getlocal("decreeAttrAddTxt7_1",[addInfo.strKey2,""+costV])
			}
		}
		this._decreeGoldCost = costV;
		let message:string = LanguageManager.getlocal("wifeLoveUseGem",[App.StringUtil.toString(needGem)+decreeStr,this._wifeInfoVo.name]);
		
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:needGem-costV,confirmCallback:this.confirmCallbackHandler,handler:this,icon:"itemicon1",iconBg: "itembg_1",num:gem,msg:message,id : 1, isMainTask: 1});
	}

	private giveHander(){
		if(this._isMoving)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.WIFEGIVEPOPUPVIEW,{id:this._wifeId,confirmCallback:this.confirmCallbackHandler,handler:this});
	}

	private skillHander(){
		if(this._isMoving)
		{
			return;
		}
		let id = this._wifeId;
		// let wifeCfg = Config.WifeCfg.getWifeCfgById(id);
		// if (wifeCfg.wifeSkill2 && Api.practiceVoApi.isPracticeUnlock()){
		// 	ViewController.getInstance().openView(ViewConst.POPUP.WIFEMULTISKILLPOPUPVIEW,{id:id, confirmCallback:this.confirmCallbackHandler,handler:this});
		// }
		// else{
			ViewController.getInstance().openView(ViewConst.POPUP.WIFESKILLPOPUPVIEW,{id:id,confirmCallback:this.confirmCallbackHandler,handler:this});
		// }
	}

	private skinHander(){
		if(Api.switchVoApi.checkCloseWifeskin())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
			return;
		}
		if(this._isMoving)
		{
			return;
		}
		let id = this._wifeId;
		if(!Api.wifeSkinVoApi.isHaveSkin(id))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinNoSkin"));
			return;
		}
		if(this._droWifeIcon)
		{
			// if(this.container&&this.container.contains(this._droWifeIcon))
			// {
				
			// }
			// this.container.removeChild(this._droWifeIcon)
			// this._droWifeIcon.dispose();
			// this._droWifeIcon = null;
			this._droWifeIcon.stop();
			
		}
		if(this._droWifeIcon2)
		{
			this._droWifeIcon2.stop();	
		}
		
		if(Api.switchVoApi.checkWifeSkinLevelUp()){
			if(this._dgbone){
				this._dgbone.dispose();
				this._dgbone = null;
			}
				//App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SERVANTBONE);
			ViewController.getInstance().openView(ViewConst.POPUP.WIFESKINNEWVIEW,{id:this._wifeId,wifeSkinId: this.param.data.wifeSkinId,confirmCallback:this.confirmCallbackHandler,handler:this});
		}
		else{
			ViewController.getInstance().openView(ViewConst.POPUP.WIFESKINVIEW,{id:this._wifeId,wifeSkinId: this.param.data.wifeSkinId,confirmCallback:this.confirmCallbackHandler,handler:this});
		}
	}


	private confirmCallbackHandler():void
	{
		let id = this._wifeId
		// if(!Api.wifeSkinVoApi.isHaveSkin(id))
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinNoSkin"));
		// 	return;
		// }
	
		// let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		if (Api.playerVoApi.getPlayerGem() < Api.wifeVoApi.getLoveNeedGem(this._wifeInfoVo.intimacy) - this._decreeGoldCost )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeLoveTip1"));
			return
		}
		let idStr = App.StringUtil.toString(id);
		this.request(NetRequestConst.REQUEST_WIFE_LOVE,{wifeId:idStr});
		if(this._droWifeIcon)
		{
			// if(this.container&&this.container.contains(this._droWifeIcon))
			// {
				
			// }
			// this.container.removeChild(this._droWifeIcon)
			// this._droWifeIcon.dispose();
			// this._droWifeIcon = null;
			this._droWifeIcon.stop();
			if (this._droWifeIcon2)
			{
				this._droWifeIcon2.stop();
			}
			
		}
	}
	//宠幸之后刷新数据
	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if(!data.ret){
			return;
		}
		if(data.data.ret < 0){
			return;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_WIFE_LOVE){

			let id = this._wifeId
			this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			//亲密度
			let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
			this._intimateValueText.text = IntimacyValue;
			//子嗣
			let childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
			this._childrenValueText.text = childValue;

			let charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
			this._charmValueText.text = charmValue;

			let expValue = LanguageManager.getlocal("wifeExp2") + " " + this._wifeInfoVo.exp;
			this._expValueText.text = expValue;

			if(this._artValueText)
			{
				this._artValueText.text =  LanguageManager.getlocal("wifeArt") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.artistry);
			}
			if(this._talentValueText)
			{
				let add:number = 0;
				if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd){
					add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
				}
				let statusadd:number = add?add:0;
				this._talentValueText.text = LanguageManager.getlocal("wifeTalent") + " " + App.StringUtil.changeIntToText(Math.floor(this._wifeInfoVo.talent * (1 + statusadd/100)));
			}
			let childData:any = null;
			if(data.data.data.childArr.length > 0){
				childData = data.data.data.childArr[0]
			} 


			// if(this._droWifeIcon)
			// {
			// 	this._droWifeIcon.dispose();
			// 	this._droWifeIcon = null;
			// }

			ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW,{id:this._wifeId,type:2,childData:childData,rewards:data.data.data.rewards});
			

			// if(data.data.data.rewards)
			// {
			// 	let rewards= GameData.formatRewardItem(data.data.data.rewards);
			// 	if(rewards&&rewards.length>0)
			// 	{
			// 		App.CommonUtil.playRewardFlyAction(rewards);
			// 	}
			// }


		}

		
	}
	protected refreshInfoAfterLove()
	{
		let id = this._wifeId
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		//亲密度
		let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
		this._intimateValueText.text = IntimacyValue;
		//子嗣
		let childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
		this._childrenValueText.text = childValue;

		let charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
		this._charmValueText.text = charmValue;

		let expValue = LanguageManager.getlocal("wifeExp2") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.exp);
		this._expValueText.text = expValue;

		if(this._artValueText)
		{
			this._artValueText.text =  LanguageManager.getlocal("wifeArt") + " " + App.StringUtil.changeIntToText(this._wifeInfoVo.artistry);
		}
		if(this._talentValueText)
		{
			
			let add:number = 0;
			if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd){
				add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
			}
			let statusadd:number = add?add:0;
			this._talentValueText.text = LanguageManager.getlocal("wifeTalent") + " " + App.StringUtil.changeIntToText(Math.floor(this._wifeInfoVo.talent * (1 + statusadd/100)));
		}
	}

	protected refreshInfoAfterSkin()
	{
		let id = this._wifeId
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifePic = wifeInfo.body;
		let wifecfg = Config.WifeCfg.getWifeCfgById(id);

		this._homeBtn.visible = false;
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePic = skinCfg.body;
				if(skinCfg.canAtHome){
					this._dangjiaId = wifeSkinVo.equip;
					this._homeBtn.visible = true;
				}
			}
			else{
				if(wifecfg.canAtHome){
					this._dangjiaId = id;
					this._homeBtn.visible = true;
				}
			}
			
		}
		else{
			if(wifecfg.canAtHome){
				this._dangjiaId = id;
				this._homeBtn.visible = true;
			}
		}
		let str = Api.otherInfoVoApi.getDangjiaWifeId();
		if((str != "" && (Number(str)==Number(this._dangjiaId)) || (Number(this._wifeId) == 101 && str == ``))){
			this._homeBtn.setBtnBitMap(`wifeinihomebtn`);
		}
		this._wifeIcon.setload(wifePic);

	

		this.checkDro();
	}

	private checkDro()
	{
		let id = this._wifeId;
		let wifecfg = Config.WifeCfg.getWifeCfgById(id);

		if(this._droWifeIcon)
		{
			this._droWifeIcon.dispose()
			this._droWifeIcon = null;
		}
		if(this._droWifeIcon2)
		{
			this._droWifeIcon2.dispose()
			this._droWifeIcon2 = null;
		}
		let bg2Index = this.container.getChildIndex(this._wifeIcon);
		this._homeBtn.visible = false;
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				let bonename = this.checkBoneName(skinCfg.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					// this._droWifeIcon.setScale(0.7) 
					// this._droWifeIcon.x = 0;
					// this._droWifeIcon.y = 0;
					this.container.addChildAt(this._droWifeIcon,bg2Index);
					this._wifeIcon.visible = false;
				}
				if(skinCfg.canAtHome){
					this._dangjiaId = wifeSkinVo.equip;
					this._homeBtn.visible = true;
				}
			}
			else{
				if(wifecfg.canAtHome){
					this._dangjiaId = id;
					this._homeBtn.visible = true;
				}
				let bonename = this.checkBoneName(this._wifeInfoVo.bone);
				if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = this._wifeIcon.x;
					// this._droWifeIcon.y = this._wifeIcon.y;
					this.container.addChildAt(this._droWifeIcon,bg2Index);
				}
			}
			
		}else{
			let bonename = this.checkBoneName(this._wifeInfoVo.bone);
			if(Api.wifeVoApi.isHaveBone(bonename + "_ske"))
			{

				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bonename);
				// this._droWifeIcon.setScale(0.7)
				// this._droWifeIcon.x = this._wifeIcon.x;
				// this._droWifeIcon.y = this._wifeIcon.y;
				this.container.addChildAt(this._droWifeIcon,bg2Index);
				this._wifeIcon.visible = false;
			}
			if(wifecfg.canAtHome){
				this._dangjiaId = id;
				this._homeBtn.visible = true;
			}
		}
		if(this._droWifeIcon)
		{
			this._droWifeIcon.setScale(1.1)
			this._droWifeIcon.x = this._wifeIcon.x + 230;
			this._droWifeIcon.y = this._wifeIcon.y + 760*0.7 + 140;
			this._wifeIcon.visible = false;

			if(this._droWifeIcon2)
			{
				this._droWifeIcon2.setScale(1.1)
				this._droWifeIcon2.x = this._wifeIcon.x + 230;
				this._droWifeIcon2.y = this._wifeIcon.y + 760*0.7 + 140;
			}
		}
		else{
			this._wifeIcon.visible = true;
		}
		// this._droWifeIcon2 = this._droWifeIcon;
	}

	private checkDro2()
	{
		if(this._droWifeIcon){
			this._droWifeIcon.resume();
			if (this._droWifeIcon2)
			{
				this._droWifeIcon2.resume();
			}
		}
		else{
			this._wifeIcon.visible = true;
		}
		// this.checkDro();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			 "wifeview_namebg","wifeview_namebg","wifeview_bottombg2","wifeview_bottombg3",
			 "wifeview_charmicon","wifeview_childicon","wifeview_vexpicon","wifeview_vigoricon",
			  "wifeview_mask","wife_btnbg","wife_give","wife_love","wife_skill",
			  "wifeview_btnbg","wifeview_skin","wifeview_skinmask","wifeview_skingray",
			  "wifeview_skinstar",`wifechangesexbtn`,`wifechangesexbtn_down`,`wife_banishing_icon`,`wife_banishing_text`,
			  "guide_hand","wifeview_artistryicon","wifeview_talenticon",`wifehome3`,`wifehome1`,`wifehomebtn`,`wifehomebtn_down`,`wifehome1`,`wifeinihomebtn`,`wifeinihomebtn_down`,
			  "wife_doublefly_namebg",
		]);
	}

	private moveBgUp(event : egret.Event):void{
		if(!event.data.ret){
			return;
		}
		let ths=this;
		this._isMoving = true;
		egret.Tween.get(this.container).wait(200)
		.call(function(){
				this._wordsBg.visible = false;
				this._wifeWordsText.visible = false;
				this._wordsCornerBg.visible = false;
				this._leftAniContainer.visible = false;
				this._rightAniContainer.visible = false;
			},this)
		
		
		egret.Tween.get(this._topContanier).to({y:-600}, 400)
		.call(this.showSkinAni2,this)
		.wait(2700)
		.to({y:10}, 500)
		.to({y:0}, 100)
		.call(function(){
				ths._wordsBg.visible = true;
				ths._wifeWordsText.visible = true;
				ths._wordsCornerBg.visible = true;
				ths._leftAniContainer.visible = true;
				ths._rightAniContainer.visible = true;
				ths._isMoving = false;
			},this)
		.call(this.showStar,this)
	}

	private moveUiUp(event : egret.Event)
	{
		if(!event.data.ret){
			return;
		}
		let ths=this;
		this._isMoving = true;
		egret.Tween.get(this.container).wait(200)
		.call(function(){
				this._wordsBg.visible = false;
				this._wifeWordsText.visible = false;
				this._wordsCornerBg.visible = false;
				this._leftAniContainer.visible = false;
				this._rightAniContainer.visible = false;
				
			},this)
		
		
		egret.Tween.get(this._topContanier).to({y:-600}, 400)
		.call(this.showSkinAni,this)
		.wait(2700)
		.to({y:10}, 500)
		.to({y:0}, 100)
		.call(function(){
				ths._wordsBg.visible = true;
				ths._wifeWordsText.visible = true;
				ths._wordsCornerBg.visible = true;
				ths._leftAniContainer.visible = true;
				ths._rightAniContainer.visible = true;
				ths._isMoving = false;
			},this)
		.call(this.showStar,this)
	}
	private showStar()
	{
		for (var index = 0; index < 10; index++) {

			let ranIndex = App.MathUtil.getRandom(1,3);
			let lightSp = BaseBitmap.create("wifeview_skinstar");
			lightSp.rotation = -20;
			lightSp.setScale(3);
			// lightSp.x = -lightSp.width/2*lightSp.scaleX;
			let lightContainer = new BaseDisplayObjectContainer();
			let ranX = App.MathUtil.getRandom(-200,300);
			let ranY = App.MathUtil.getRandom(-200,180);
			lightContainer.x = GameConfig.stageWidth/2-lightSp.width/2*lightSp.scaleX + ranX;
			// lightContainer.y = GameConfig.stageHeigth - 200;
			lightContainer.addChild(lightSp);
			// lightContainer.y = this._wifeIcon.y - lightContainer.height-180 + ranY;
			lightContainer.y = this.container.height/2 + ranY;
			this.container.addChildAt(lightContainer,10);
			// lightSp.alpha = 0;
			
			// egret.Tween.get(lightSp,{loop:false}).wait(500).call(()=>{
			// 	this._touchSwitch = true;
			// },this);
			lightSp.anchorOffsetX = lightSp.width/2;
			lightSp.anchorOffsetY = lightSp.height/2;
			lightContainer.setScale(0.1);

			egret.Tween.get(lightContainer,{loop:false}).wait(100*index).to({scaleX:1,scaleY:1},500).call(()=>{
				this.removeChildFromContainer(lightContainer);
				lightContainer = null;
				lightSp = null;
			},this);
			
		}


		let id = this._wifeId
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);
		let wifecfg = Config.WifeCfg.getWifeCfgById(id);
		let wifePic = wifeInfo.body;
		

		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
		let sound = '';
		let words = '';
		this._homeBtn.visible = false;
		if(wifeSkinVo && wifeSkinVo.equip != "")
		{
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
			if((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())){
				sound = skinCfg.sound;
				words = skinCfg.words;
				if(skinCfg.canAtHome){
					this._dangjiaId = wifeSkinVo.equip;
					this._homeBtn.visible = true;
				}
			}
			else{
				sound = this._wifeInfoVo.sound;
				words = this._wifeInfoVo.words;
				if(wifecfg.canAtHome){
					this._dangjiaId = id;
					this._homeBtn.visible = true;
				}
			}
			// wifePic = skinCfg.body;
		}
		else{
			sound = this._wifeInfoVo.sound;
			words = this._wifeInfoVo.words;
			if(wifecfg.canAtHome){
				this._dangjiaId = id;
				this._homeBtn.visible = true;
			}
		}
		let str = Api.otherInfoVoApi.getDangjiaWifeId();
		if((str != "" && (Number(str)==Number(this._dangjiaId)) || (Number(this._wifeId) == 101 && str == ``))){
			this._homeBtn.setBtnBitMap(`wifeinihomebtn`);
		}
		//蓝颜说的话和语音要对应
		let blueSoundIndex = 0;
		if(Api.switchVoApi.checkOpenBlueWife()&& Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id) && this._wifeInfoVo.sexflag){
			blueSoundIndex = App.MathUtil.getRandom(1,4);
		}
		if(1)
		{
			let soundRes = '';
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				if((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())){
					soundRes = skinCfg.sound;
				}
				else{
					soundRes = this._wifeInfoVo.sound;
				}
				// wifePic = skinCfg.body;
				
			}
			else{
				soundRes = this._wifeInfoVo.sound
				if(blueSoundIndex){
					soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex)
				}
			}
			this.playEffect(soundRes, true);
		}
		this._wifeWordsText.text = words;
	}

	private showSkinAni()
	{
		let ths=this;
		let bg2Index = this.container.getChildIndex(this._bottomBg);
		let mask1:BaseBitmap = BaseBitmap.create("wifeview_skinmask");
		mask1.x = -640;
		mask1.y = -20;
		this.container.addChildAt(mask1,bg2Index)

		egret.Tween.get(mask1).to({x:0}, 800).to({x:-30}, 100).wait(200).call(function(){
				// egret.Tween.removeTweens(ths);
				// ths._tweenTo=null;
				
			},this)
		.wait(1700).to({x:0}, 100).to({x:-640}, 600);

		let mask2:BaseBitmap = BaseBitmap.create("wifeview_skinmask");
		mask2.$setSkewY(180);
		mask2.x = GameConfig.stageWidth*2;
		mask2.y = -20;
		this.container.addChildAt(mask2,bg2Index)

		egret.Tween.get(mask2).to({x:640}, 800).to({x:670}, 100).wait(200).call(this.addMask,this)
		.wait(1700).to({x:640}, 100).to({x:GameConfig.stageWidth*2}, 600)
	
	}

	private showSkinAni2()
	{
		let ths=this;
		let bg2Index = this.container.getChildIndex(this._bottomBg);
		let mask1:BaseBitmap = BaseBitmap.create("wifeview_skinmask");
		mask1.x = -640;
		mask1.y = -20;
		this.container.addChildAt(mask1,bg2Index)

		egret.Tween.get(mask1).to({x:0}, 800).to({x:-30}, 100).wait(200).call(function(){
				// egret.Tween.removeTweens(ths);
				// ths._tweenTo=null;
				
			},this)
		.wait(1700).to({x:0}, 100).to({x:-640}, 600);

		let mask2:BaseBitmap = BaseBitmap.create("wifeview_skinmask");
		mask2.$setSkewY(180);
		mask2.x = GameConfig.stageWidth*2;
		mask2.y = -20;
		this.container.addChildAt(mask2,bg2Index)

		egret.Tween.get(mask2).to({x:640}, 800).to({x:670}, 100).wait(200).call(()=>{
			//背景切换
			let info = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
			this._bg.setload(info.bgRes);
			if(this._dgbone){
				this._dgbone.dispose();
				this._dgbone = null;
			}
		if(App.CommonUtil.check_dragon() && info.bgRes != `` && info.bgRes != `wifeview_optbg` && info.bgRes != `malewifebg`){
				let arr = info.bgRes.split(`_`);
				let dgbone = App.DragonBonesUtil.getLoadDragonBones(`scene_wifeskin_${arr[1]}`);
				dgbone.x = 0;
				dgbone.y = this._pos[`scene_wifeskin_${arr[1]}`].y;
				dgbone.setAnchorOffset(0,0-this._pos[`scene_wifeskin_${arr[1]}`].height);
				this.container.addChildAt(dgbone, this.container.getChildIndex(this._bg) + 1);
				this._dgbone = dgbone;
			}
		}, this)
		.wait(1700).to({x:640}, 100).to({x:GameConfig.stageWidth*2}, 600)
	
	}

	private addMask()
	{
		let mask2:BaseBitmap = BaseBitmap.create("wifeview_skingray");
		// mask2.$setSkewY(180);
		mask2.alpha = 0;
		mask2.x = GameConfig.stageWidth/2 - mask2.width/2;
		mask2.y = this._wifeIcon.y;
		let bg2Index = this.container.getChildIndex(this._bottomBg);
		this.container.addChildAt(mask2,bg2Index)
		egret.Tween.get(mask2)
		.to({alpha:0.4}, 300)
		.wait(1000).to({alpha:0}, 500)
		.call(function()
		{
			mask2.dispose();
		},this)
		this.refreshInfoAfterSkin();
	}

	protected getRuleInfo(): string {
		return "wife_description";
	}

	protected getExtraRuleInfo():string
    {   
        let params:string[] = [];
		if ( Api.switchVoApi.checkOpenBanish())
        {
           params.push(LanguageManager.getlocal("wife_descriptionPart1"));
        }
        else
        {
            params.push("");
        }
		if ( Api.switchVoApi.checkWifeExpExchangeOpen())
        {
           params.push(LanguageManager.getlocal("wife_descriptionPart2"));
        }
        else
        {
            params.push("");
        }
		if ( Api.switchVoApi.checkOpenBlueWife())
        {
           params.push(LanguageManager.getlocal("wife_descriptionPart3"));
        }
        else
        {
            params.push("");
        }
		if ( Api.switchVoApi.checkOpenWifeBattle())
        {
           params.push(LanguageManager.getlocal("wife_descriptionPart4"));
		   params.push(LanguageManager.getlocal("wife_descriptionPart5"));
        }
        else
        {
			params.push("");
			params.push("");
        }

		if ( Api.switchVoApi.checkOpenWifeExSkill())
        {
           params.push(LanguageManager.getlocal("wife_descriptionPart6"));
        }
        else
        {
            params.push("");
        }

        return LanguageManager.getlocal("wife_descriptionSpell2",params);
    }


	private doGuide()
	{
		this.hide();
	}

	private touchTap():void
	{
		this.hide();
		// SoundManager.resumeBg()

		// if(Api.rookieVoApi.isInGuiding){
		// 	// Api.rookieVoApi.checkWaitingGuide();
		// 	Api.rookieVoApi.checkNextStep();
		// }
		
	}

	private refreashBone():void{
		let info = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
		if(this._dgbone){
			this._dgbone.dispose();
			this._dgbone = null;
		}
		if(App.CommonUtil.check_dragon() && info.bgRes != `` && info.bgRes != `wifeview_optbg` && info.bgRes != `malewifebg`){
			let arr = info.bgRes.split(`_`);
			let dgbone = App.DragonBonesUtil.getLoadDragonBones(`scene_wifeskin_${arr[1]}`);
			dgbone.x = 0;
			dgbone.y = this._pos[`scene_wifeskin_${arr[1]}`].y;
			dgbone.setAnchorOffset(0,0-this._pos[`scene_wifeskin_${arr[1]}`].height);
			this.container.addChildAt(dgbone, this.container.getChildIndex(this._bg) + 1);
			this._dgbone = dgbone;
		}
	}

	private setWifeCallback(event : egret.Event):void{
		if(!event.data.ret){
			return;
		}
		let info = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
		this.refreshInfoAfterSkin();
		this._nameTxt.text = info.name;
		// this.checkShowDoubleName();
		let nameBg = this.container.getChildByName(`nameBg`);
		if (PlatformManager.checkIsTextHorizontal())
		{
			nameBg.width = this._nameTxt.width + 40;
			nameBg.x = GameConfig.stageWidth/2 - nameBg.width/2;
			nameBg.y = this._bottomBg.y - 100;
			this._nameTxt.x = nameBg.x + nameBg.width/2 - this._nameTxt.width/2;
			this._nameTxt.y = nameBg.y + nameBg.height/2 - this._nameTxt.height/2;
		} else {
			//红颜名字背景
			nameBg.x = 25;
			nameBg.y = 200;
			//红颜名字
			this._nameTxt.width = 27;
			this._nameTxt.x = nameBg.x + nameBg.width/2 - this._nameTxt.width/2;
			this._nameTxt.y = nameBg.y + 190/2 - this._nameTxt.height/2;
		}
		this._wifeDescText.text = info.desc;
		this._bg.setload(info.sexflag == 0 ? `wifeview_optbg` : `malewifebg`);
		this.freshWords();
	}

	private freshWords():void{
		let id = this._wifeId
		let wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);
		let wifecfg = Config.WifeCfg.getWifeCfgById(id);
		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
		let sound = '';
		let words = '';

		if(wifeSkinVo && wifeSkinVo.equip != "")
		{
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
			if((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())){
				sound = skinCfg.sound;
				words = skinCfg.words;
				if(skinCfg.canAtHome){
					this._dangjiaId = wifeSkinVo.equip;
					this._homeBtn.visible = true;
				}
			}
			else{
				sound = this._wifeInfoVo.sound;
				words = this._wifeInfoVo.words;
				if(wifecfg.canAtHome){
					this._dangjiaId = id;
					this._homeBtn.visible = true;
				}
			}
			// wifePic = skinCfg.body;
		}
		else{
			sound = this._wifeInfoVo.sound;
			words = this._wifeInfoVo.words;
			if(wifecfg.canAtHome){
				this._dangjiaId = id;
				this._homeBtn.visible = true;
			}
		}

		//蓝颜说的话和语音要对应
		let blueSoundIndex = 0;
		if(Api.switchVoApi.checkOpenBlueWife()&& Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id) && this._wifeInfoVo.sexflag){
			blueSoundIndex = App.MathUtil.getRandom(1,4);
		}
		if(1)
		{
			let soundRes = '';
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				if((skinCfg.isBlueSkin && wifecfg.isBule()) || (!skinCfg.isBlueSkin && !wifecfg.isBule())){
					soundRes = skinCfg.sound;
				}
				else{
					soundRes = this._wifeInfoVo.sound;
				}
				// wifePic = skinCfg.body;
				
			}
			else{
				soundRes = this._wifeInfoVo.sound
				if(blueSoundIndex){
					soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex)
				}
			}
			this.playEffect(soundRes, true);
		}
		this._wifeWordsText.text = words;
	}

	private refreshNpc(evt : egret.Event):void{
		if(!evt.data.ret){
			return;
		}
		if(evt.data.data.data){
			App.CommonUtil.showTip(LanguageManager.getlocal("settingsucced"));
			let str = Api.otherInfoVoApi.getDangjiaWifeId();
			if((str != "" && (Number(str)==Number(this._dangjiaId)) || (Number(this._wifeId) == 101 && str == ``))){
				this._homeBtn.setBtnBitMap(`wifeinihomebtn`);
			}
		}
	}

	public dispose(): void {
		
		Api.mainTaskVoApi.hideGuide();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SERVANTBONE, this.refreashBone, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshInfoAfterLove,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshInfoAfterLove,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.checkRedPoint,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFESKIN,this.checkRedPoint,this);
		App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.moveUiUp,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_WIFE_LOVECOM,this.checkDro2,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFESKIN_SELECTBG),this.moveBgUp,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.setWifeCallback,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.OTHERINFO_SETDANGJIA,this.refreshNpc,this);
		this._intimateValueText = null;
		//子嗣
		this._childrenValueText = null;

		//魅力值
		this._charmValueText = null;

		//红颜经验
		this._expValueText = null;

		this._wifeInfoVo = null;

		this._giveDotSp = null;
		this._skillDotSp = null;
		this._skinDotSp = null;
		this._loveBtn = null;
		this._giveBtn = null;
		this._skinBtn = null;
		this._skinBtn = null;

		this._topContanier = null;

		this._wordsCornerBg = null;
		this._wordsBg = null;
		this._wifeWordsText = null;
		this._isMoving =false;
		this._droWifeIcon = null;
		this._droWifeIcon2 = null;
		this._decreeGoldCost = null;
		this._banishContainer = null;
		this._banishTime = null;
		this._artValueText = null;
		this._talentValueText = null;

		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandLoveKey);
        this._mainTaskHandLoveKey = null;
		if (this._wifebgParticlegroupName) {
			ResourceManager.destroyRes(this._wifebgParticlegroupName);
			this._wifebgParticlegroupName = null;
		}
		this._bgContainer = null;
		this._bg = null;
		if(this._dgbone){
			this._dgbone = null;
		}
		this._nameTxt = null;
		this._wifeDescText = null;
		this._dangjiaId = '';
		this._homeBtn = null;
		//
		this._wifeInfoVoList = [];
		this._wifeId = null;
		this._wifeIndex = 0;
		this._changesexBtn = null;
		this._isLeftClick = false;
		this._isSwitching = false;
		this._switchDelta = 0;
		this._leftAniContainer = null;
		this._rightAniContainer = null;
		this._nameBg = null;
		this._isDoubleFly = false;
		this._doubleContainer = null;

		super.dispose();
	}
}