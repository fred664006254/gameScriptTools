/**
 * 红颜操作界面
 * author dky
 * date 2017/10/9
 * @class WifeView
 */
class WifeOptView extends CommonView {

	//亲密度
	private _intimateValueText: BaseTextField;
	//子嗣
	private _childrenValueText: BaseTextField;

	//魅力值
	private _charmValueText: BaseTextField;

	//才艺
	private _artistryText: BaseTextField;

	//红颜经验
	private _expValueText: BaseTextField;

	private _wifeInfoVo: WifeInfoVo;

	private _giveDotSp:BaseBitmap = null;
	private _skillDotSp:BaseBitmap = null;
	private _skinDotSp:BaseBitmap = null;

	private _loveBtn:BaseButton;
	private _giveBtn:BaseButton;
	private _skillBtn:BaseButton;
	private _skinBtn:BaseButton;
	private _changeBtn:BaseButton;

	private _wifeIcon:BaseLoadBitmap;

	private _bottomBg:BaseBitmap;

	private _topContanier:BaseDisplayObjectContainer;

	// private _wordsCornerBg:BaseBitmap = null;
	private _wordsBg:BaseBitmap = null;
	private _wifeWordsText: BaseTextField;
	private _droWifeIcon:BaseLoadDragonBones;
	private _droWifeIcon2:BaseLoadDragonBones;

	private _isMoving = false;

	private _mainTaskHandKey:string = null;

	//是否是场景宠幸
	private _isSceneLove:boolean = false;
	//场景宠幸场景id
	private _sceneId:string = null;

	//名字
	private _nameTxt: BaseTextField = null;
	//描述
	private _wifeDescText: BaseTextField = null;

	private _bigBg:BaseLoadBitmap = null;
	private _nameBg:BaseBitmap = null;

	private _nowPlayingEffect:string = '';

	public static _taskHand:BaseBitmap;

	public constructor() {
		super();
		
	}
	public initView(): void {


		 if(Api.switchVoApi.checkOpenBuleWife())
		 {
			NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:this.param.data.id, kid:"wifeclick"});
		 }
		


		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshInfoAfterLove,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshInfoAfterLove,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.checkRedPoint,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_WIFESKIN,this.checkRedPoint,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.moveUiUp,this);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFE_LOVECOM,this.checkDro2,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING, this.setWifeCallback, this);

		Api.mainTaskVoApi.checkShowGuide("wifeoptview");


		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);

		//蓝颜说的话和语音要对应
		let blueSoundIndex = 0
		if(Api.switchVoApi.checkOpenBuleWife()&& Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id) && this._wifeInfoVo.sexflag){
			blueSoundIndex = App.MathUtil.getRandom(1,4);
		}
		if(!Api.switchVoApi.checkCloseWifeSound())
		{
			let soundRes = '';
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				// wifePic = skinCfg.body;
				soundRes = skinCfg.sound;
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
			this._nowPlayingEffect = soundRes;
		}
		

		// this.playEffect(this._wifeInfoVo.sound,true);
		//大背景
		let bigBg:BaseLoadBitmap = BaseLoadBitmap.create("wifeview_optbg" + (this._wifeInfoVo.sexflag?"_male":''));
		bigBg.y = -15;
		this.addChildToContainer(bigBg);
		this._bigBg = bigBg;

		this._topContanier = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._topContanier);
		//描述背景
		let titleBg:BaseBitmap = BaseBitmap.create("public_9v_bg10");
		titleBg.width = GameConfig.stageWidth;
		titleBg.height = 70;
		titleBg.y = -21;
		this._topContanier.addChild(titleBg);
	
		//红颜描述文字
		let wifeDescText:BaseTextField = ComponentManager.getTextField(this._wifeInfoVo.desc ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		wifeDescText.setColor(TextFieldConst.COLOR_WHITE);
		wifeDescText.x = 20;
		wifeDescText.width = GameConfig.stageWidth - wifeDescText.x*2;
		this._topContanier.addChild(wifeDescText);
		this._wifeDescText = wifeDescText;







		let wifePicStr = this._wifeInfoVo.body;
		
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePicStr = skinCfg.body;
				if(Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = 0;
					// this._droWifeIcon.y = 0;
					this.addChildToContainer(this._droWifeIcon);

				}
			}
			else{
				if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = this._wifeIcon.x;
					// this._droWifeIcon.y = this._wifeIcon.y;
					this.addChildToContainer(this._droWifeIcon);
				}
			}
			
		}else{
			if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske"))
			{

				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
				// this._droWifeIcon.setScale(0.7)
				// this._droWifeIcon.x = this._wifeIcon.x;
				// this._droWifeIcon.y = this._wifeIcon.y;
				this.addChildToContainer(this._droWifeIcon);
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
			this._droWifeIcon2 = this._droWifeIcon;
		}

		let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg"+ (this._wifeInfoVo.sexflag?"_male":''));
		this._nameBg = nameBg;
		//横版名字变竖版名字
		if (PlatformManager.checkIsTextHorizontal())
		{


			//红颜名字
			let nameTF = ComponentManager.getTextField(this._wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,0x3e0d01);
			nameTF.name = "nameTF"
			nameBg.width = nameTF.width + 40;
			nameBg.scaleX = 1.2
			nameBg.x = GameConfig.stageWidth/2 - nameBg.width/2;
			nameBg.y = GameConfig.stageHeigth - 380;
			nameBg.name = "nameBg"
			
			this.addChildToContainer(nameBg);
			nameTF.x = nameBg.x + nameBg.width/2*nameBg.scaleX  - nameTF.width/2 + 2;
			nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;
			this.addChildToContainer(nameTF);
			this._nameTxt = nameTF;
		} else {
			//红颜名字背景
		
			nameBg.x = 25;
			nameBg.y = 200;
			this.addChildToContainer(nameBg);
			//红颜名字
			let nameTF = ComponentManager.getTextField(this._wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,0x3e0d01);
			nameTF.width = 27;
			nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2 - 15;
			nameTF.y = nameBg.y + 180/2 - nameTF.height/2;
			this.addChildToContainer(nameTF);
			this._nameTxt = nameTF;

		}


		

							//红颜说的话背景
		this._wordsBg = BaseBitmap.create("wifebathscene_lovewordsbg"+ (this._wifeInfoVo.sexflag?"_male":''));
		this._wordsBg.width = 440;
		this._wordsBg.height = 100;
		this._wordsBg.x = 180;
		
		this.addChildToContainer(this._wordsBg);

		// this._wordsCornerBg = BaseBitmap.create("public_9v_bg11");
		// this._wordsCornerBg.x = 390;
		
		// this.addChildToContainer(this._wordsCornerBg);

		//红颜说的话
		let wifeWords = this._wifeInfoVo.words;
		if(blueSoundIndex){
			wifeWords = LanguageManager.getlocal("wifeWords_male_" + id + "_" + blueSoundIndex)
		}
		this._wifeWordsText = ComponentManager.getTextField(wifeWords ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._wifeWordsText.setColor(TextFieldConst.COLOR_BROWN);
		this._wifeWordsText.width = 390;

		this._wifeWordsText.x = this._wordsBg.x + this._wordsBg.width/2 - this._wifeWordsText.width/2 + 5 ;

	
		this.addChildToContainer(this._wifeWordsText);

				//下面属性背景
		this._bottomBg = BaseBitmap.create("wifeview_bottombg2");
		// bottomBg.width = GameConfig.stageWidth;
		// bottomBg.height = 96;
		this._bottomBg.x = 0;
		this._bottomBg.y = GameConfig.stageHeigth - this.container.y - this._bottomBg.height;
		App.LogUtil.log(this._bottomBg.y)
		this.addChildToContainer(this._bottomBg);
		// this._wifeIcon.y = this._bottomBg.y - 840*wifeScale + 120;

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
		this._wordsBg.y = this._wifeIcon.y - 90;
		this._wifeWordsText.y = this._wordsBg.y + 20;
		// this._wordsCornerBg.y = this._wordsBg.y + 87;
		
		if(Api.switchVoApi.checkOpenWifeBattle()){
			let icon1Bg = BaseBitmap.create("public_hb_bg01");
			icon1Bg.x = 10;
			icon1Bg.y = this._bottomBg.y + 75 - 5;
			icon1Bg.height = 31;
			icon1Bg.width = 200;
			this.addChildToContainer(icon1Bg);

			let intIcon:BaseBitmap = BaseBitmap.create("wifeview_vigoricon");
			intIcon.x = 11;
			intIcon.y = icon1Bg.y-5;
			this.addChildToContainer(intIcon);
			//亲密度
			let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
			this._intimateValueText = ComponentManager.getTextField( IntimacyValue,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._intimateValueText.setColor(TextFieldConst.COLOR_WHITE);
			this._intimateValueText.x = intIcon.x + intIcon.width + 5;
			this._intimateValueText.y = intIcon.y + intIcon.height/2 - this._intimateValueText.height/2;
			this.addChildToContainer(this._intimateValueText);

			////////////子嗣
			let icon2Bg = BaseBitmap.create("public_hb_bg01");
			icon2Bg.x = 45;
			icon2Bg.y = intIcon.y + intIcon.width + 5;
			icon2Bg.width = 250;
			icon2Bg.height = icon1Bg.height;
			this.addChildToContainer(icon2Bg);
			//子嗣
			let childIcon:BaseBitmap = BaseBitmap.create("wifeview_childicon");
			childIcon.x = 45;
			childIcon.y = intIcon.y + intIcon.width ;
			this.addChildToContainer(childIcon);

			let childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
			this._childrenValueText = ComponentManager.getTextField(childValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._childrenValueText.setColor(TextFieldConst.COLOR_WHITE);
			this._childrenValueText.x = childIcon.x + childIcon.width + 5;
			this._childrenValueText.y = childIcon.y + childIcon.height/2 - this._intimateValueText.height/2;
			this.addChildToContainer(this._childrenValueText);

			////////
			let icon3Bg = BaseBitmap.create("public_hb_bg01");
			icon3Bg.x = 220;
			icon3Bg.y = this._bottomBg.y + 75 - 5;//icon1Bg.y;
			icon3Bg.width = 200;
			icon3Bg.height = icon1Bg.height;
			this.addChildToContainer(icon3Bg);
			//魅力
			let charmIcon:BaseBitmap = BaseBitmap.create("wifeview_charmicon");
			charmIcon.x = 220;
			charmIcon.y = intIcon.y ;
			this.addChildToContainer(charmIcon);

			let charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
			this._charmValueText = ComponentManager.getTextField(charmValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._charmValueText.setColor(TextFieldConst.COLOR_WHITE);
			this._charmValueText.x = charmIcon.x + charmIcon.width + 10;
			this._charmValueText.y = charmIcon.y + charmIcon.height/2 - this._intimateValueText.height/2;
			this.addChildToContainer(this._charmValueText);


			//////// 才艺
			let icon5Bg = BaseBitmap.create("public_hb_bg01");
			icon5Bg.x = 430;
			icon5Bg.y = this._bottomBg.y + 75 - 5;//icon1Bg.y;
			icon5Bg.width = 200;
			icon5Bg.height = icon1Bg.height;
			this.addChildToContainer(icon5Bg);
			
			let artistryIcon:BaseBitmap = BaseBitmap.create("wifeview_artistryicon");
			artistryIcon.x = 430;
			artistryIcon.y = intIcon.y ;
			this.addChildToContainer(artistryIcon);

			let artistryValue = LanguageManager.getlocal("wifeArtistry") + " " + this._wifeInfoVo.artistry;
			this._artistryText = ComponentManager.getTextField(artistryValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._artistryText.setColor(TextFieldConst.COLOR_WHITE);
			this._artistryText.x = artistryIcon.x + artistryIcon.width + 10;
			this._artistryText.y = artistryIcon.y + artistryIcon.height/2 - this._intimateValueText.height/2;
			this.addChildToContainer(this._artistryText);

			//////
			let icon4Bg = BaseBitmap.create("public_hb_bg01");
			icon4Bg.x = 345;
			icon4Bg.y = childIcon.y + 5;
			icon4Bg.width = 250;
			icon4Bg.height = icon1Bg.height;
			this.addChildToContainer(icon4Bg);
			//经验
			let expIcon:BaseBitmap = BaseBitmap.create("wifeview_vexpicon");
			expIcon.x = 345;
			expIcon.y = childIcon.y ;
			this.addChildToContainer(expIcon);

			let expValue = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp;
			this._expValueText = ComponentManager.getTextField(expValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._expValueText.setColor(TextFieldConst.COLOR_WHITE);
			this._expValueText.x = expIcon.x + expIcon.width + 10;
			this._expValueText.y = this._childrenValueText.y;
			this.addChildToContainer(this._expValueText);
		} else {
			let icon1Bg = BaseBitmap.create("public_hb_bg01");
			icon1Bg.x = 45;
			icon1Bg.y = this._bottomBg.y + 75 - 5;
			icon1Bg.height = 31;
			icon1Bg.width = 250;
			this.addChildToContainer(icon1Bg);

			let intIcon:BaseBitmap = BaseBitmap.create("wifeview_vigoricon");
			intIcon.x = 46;
			intIcon.y = icon1Bg.y-5;
			this.addChildToContainer(intIcon);
			//亲密度
			let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
			this._intimateValueText = ComponentManager.getTextField( IntimacyValue,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._intimateValueText.setColor(TextFieldConst.COLOR_WHITE);
			this._intimateValueText.x = intIcon.x + intIcon.width + 5;
			this._intimateValueText.y = intIcon.y + intIcon.height/2 - this._intimateValueText.height/2;
			this.addChildToContainer(this._intimateValueText);

			let icon2Bg = BaseBitmap.create("public_hb_bg01");
			icon2Bg.x = 45;
			icon2Bg.y = intIcon.y + intIcon.width + 5;
			icon2Bg.width = icon1Bg.width;
			icon2Bg.height = icon1Bg.height;
			this.addChildToContainer(icon2Bg);
			//子嗣
			let childIcon:BaseBitmap = BaseBitmap.create("wifeview_childicon");
			childIcon.x = intIcon.x;
			childIcon.y = intIcon.y + intIcon.width ;
			this.addChildToContainer(childIcon);

			let childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
			this._childrenValueText = ComponentManager.getTextField(childValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._childrenValueText.setColor(TextFieldConst.COLOR_WHITE);
			this._childrenValueText.x = this._intimateValueText.x;
			this._childrenValueText.y = childIcon.y + childIcon.height/2 - this._intimateValueText.height/2;
			this.addChildToContainer(this._childrenValueText);

			let icon3Bg = BaseBitmap.create("public_hb_bg01");
			icon3Bg.x = 345;
			icon3Bg.y = icon1Bg.y;
			icon3Bg.width = icon1Bg.width;
			icon3Bg.height = icon1Bg.height;
			this.addChildToContainer(icon3Bg);
			//魅力
			let charmIcon:BaseBitmap = BaseBitmap.create("wifeview_charmicon");
			charmIcon.x = 345;
			charmIcon.y = intIcon.y ;
			this.addChildToContainer(charmIcon);

			let charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
			this._charmValueText = ComponentManager.getTextField(charmValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._charmValueText.setColor(TextFieldConst.COLOR_WHITE);
			this._charmValueText.x = charmIcon.x + charmIcon.width + 10;
			this._charmValueText.y = charmIcon.y + charmIcon.height/2 - this._intimateValueText.height/2;
			this.addChildToContainer(this._charmValueText);

			let icon4Bg = BaseBitmap.create("public_hb_bg01");
			icon4Bg.x = 345;
			icon4Bg.y = childIcon.y + 5;
			icon4Bg.width = icon1Bg.width;
			icon4Bg.height = icon1Bg.height;
			this.addChildToContainer(icon4Bg);
			//经验
			let expIcon:BaseBitmap = BaseBitmap.create("wifeview_vexpicon");
			expIcon.x = charmIcon.x;
			expIcon.y = childIcon.y ;
			this.addChildToContainer(expIcon);

			let expValue = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp;
			this._expValueText = ComponentManager.getTextField(expValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._expValueText.setColor(TextFieldConst.COLOR_WHITE);
			this._expValueText.x = charmIcon.x + charmIcon.width + 10;
			this._expValueText.y = this._childrenValueText.y;
			this.addChildToContainer(this._expValueText);
		}


		// ar照相
		if (this.checkIsCanAR()) {

			let wifeArBtnBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
			wifeArBtnBg.x = 30;
			wifeArBtnBg.y = this._bottomBg.y - 150;
			this.addChildToContainer(wifeArBtnBg);

			let wifeArBtn = ComponentManager.getButton("wifeArButton",null,this.wifeArBtnClick,this,null,0);
			wifeArBtn.x = 30 - 3;
			wifeArBtn.y = this._bottomBg.y - 150;
			this.addChildToContainer(wifeArBtn);
			let wifeArBtnLabel = BaseBitmap.create("wifeArButtonLabel");
			wifeArBtnLabel.x = wifeArBtn.x + wifeArBtn.width/2 - wifeArBtnLabel.width/2;
			wifeArBtnLabel.y = wifeArBtn.y + wifeArBtn.height - wifeArBtnLabel.height;
			this.addChildToContainer(wifeArBtnLabel);
			
		}

		let yy = this._bottomBg.y - 50

		let loveBg:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg.x = 60;
		loveBg.y = yy;
		this.addChildToContainer(loveBg);

		let loveBg2:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg2.x = 190;
		loveBg2.y = yy;
		this.addChildToContainer(loveBg2);

		let loveBg3:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg3.x = 323;
		loveBg3.y = yy;
		this.addChildToContainer(loveBg3);

		let loveBg4:BaseBitmap = BaseBitmap.create("wifeview_btnbg");
		loveBg4.x = 457;
		loveBg4.y = yy;
		this.addChildToContainer(loveBg4);

		//宠幸按钮

		this._loveBtn = ComponentManager.getButton("wife_love",null,this.loveHander,this,null,0);
		this._loveBtn.x = 70;
		this._loveBtn.y = yy;
		// this._loveBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._loveBtn);

		let loveName = "wife_love_name"
		if(Api.switchVoApi.checkCloseText()||Api.switchVoApi.checkIsInBlueWife())
		{
			loveName = "wife_hello_name"
		}
		let loveNameBg:BaseBitmap = BaseBitmap.create(loveName);
		loveNameBg.x = loveBg.x  + loveBg.width/2 - loveNameBg.width/2;
		loveNameBg.y = this._loveBtn.y + 70 ;
		this.addChildToContainer(loveNameBg);

		if(!Api.rookieVoApi.isInGuiding
			&&Api.mainTaskVoApi.getCurMainTaskId()
			&&(Config.MaintaskCfg.getTaskCfgByTaskId(Api.mainTaskVoApi.getCurMainTaskId()).questType == 302)
			&&!Api.mainTaskVoApi.isCurTaskReach()){
			WifeOptView._taskHand = BaseBitmap.create("guide_hand");
			// clickHand.skewY = 180;
			WifeOptView._taskHand.x = this._loveBtn.x + 70;
			WifeOptView._taskHand.y = this._loveBtn.y + 70;
			this.addChildToContainer(WifeOptView._taskHand);

			egret.Tween.get(WifeOptView._taskHand,{loop:true})
				.to({y:WifeOptView._taskHand.y +35,scaleX:1.3,scaleY:1.3}, 500)
				.to({y:WifeOptView._taskHand.y ,scaleX:1.0,scaleY:1.0}, 500)
		}
		
		// let loveNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeLoveBtn") ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// loveNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		// loveNameTF.x = loveNameBg.x + loveNameBg.width/2 - loveNameTF.width/2;
		// loveNameTF.y = loveNameBg.y + loveNameBg.height/2 - loveNameTF.height/2;
		// this.addChildToContainer(loveNameTF);

		//赏赐按钮
		this._giveBtn = ComponentManager.getButton("wife_give",null,this.giveHander,this,null,0);
		this._giveBtn.x = 200;
		this._giveBtn.y = yy;
		// this._giveBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._giveBtn);

		let giveNameBg:BaseBitmap = BaseBitmap.create("wife_give_name");
		giveNameBg.x = loveBg2.x  + loveBg2.width/2 - giveNameBg.width/2;
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
				return Api.wifeVoApi.getIdOfIntimacyMax() === String(this.param.data.id);
			}, 
			this
		);
		
		
		// let giveNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeGiveBtn") ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// giveNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		// giveNameTF.x = giveNameBg.x + giveNameBg.width/2 - giveNameTF.width/2;
		// giveNameTF.y = giveNameBg.y + giveNameBg.height/2 - giveNameTF.height/2;
		// this.addChildToContainer(giveNameTF);

		//技能按钮
		this._skillBtn = ComponentManager.getButton("wife_skill",null,this.skillHander,this,null,0);
		this._skillBtn.x = 333;
		this._skillBtn.y = yy;
		// this._skillBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._skillBtn);

		let skillNameBg:BaseBitmap = BaseBitmap.create("wife_skill_name");
		skillNameBg.x =  loveBg3.x  + loveBg3.width/2 - skillNameBg.width/2;
		skillNameBg.y = this._skillBtn.y + 70 ;
		this.addChildToContainer(skillNameBg);
		
		// let skillNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillBtn")  ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// skillNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		// skillNameTF.x = skillNameBg.x + skillNameBg.width/2 - skillNameTF.width/2;
		// skillNameTF.y = skillNameBg.y + skillNameBg.height/2 - skillNameTF.height/2;
		// this.addChildToContainer(skillNameTF);

		//换装按钮
		this._skinBtn = ComponentManager.getButton("wifeview_skin",null,this.skinHander,this,null,0);
		this._skinBtn.x = 467;
		this._skinBtn.y = yy;
		// this._skinBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._skinBtn);

		let skinNameBg:BaseBitmap = BaseBitmap.create("wifeview_skin_name");
		skinNameBg.x = loveBg4.x  + loveBg4.width/2 - skinNameBg.width/2;;
		skinNameBg.y = this._skinBtn.y + 70 ;
		this.addChildToContainer(skinNameBg);

		
		// let skinNameTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeskinViewTitle")  ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// skinNameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		// skinNameTF.x = skinNameBg.x + skinNameBg.width/2 - skinNameTF.width/2;
		// skinNameTF.y = skinNameBg.y + skinNameBg.height/2 - skinNameTF.height/2;
		// this.addChildToContainer(skinNameTF);

		//转世按钮
		if(Api.switchVoApi.checkOpenBuleWife() && Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id)){
			let changeBtnBg:BaseBitmap = BaseBitmap.create("mainui_bottombtnbg");
			changeBtnBg.x = GameConfig.stageWidth - 120;
			changeBtnBg.y = GameConfig.stageHeigth - 400;
			this.addChildToContainer(changeBtnBg);
	
			this._changeBtn = ComponentManager.getButton("wifeview_change",null,this.changeHander,this,null,0);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._changeBtn,changeBtnBg,[3,5]);
			// this._changeBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(this._changeBtn);
	
			let changeNameBg:BaseBitmap = BaseBitmap.create("wifeview_change_name");
			changeNameBg.width = 110;
			changeNameBg.height = 35;
			changeNameBg.x = changeBtnBg.x  + changeBtnBg.width/2 - changeNameBg.width/2 - 2;
			changeNameBg.y = this._changeBtn.y + 55 ;
			this.addChildToContainer(changeNameBg);
		}

		this.checkRedPoint();

		// this.moveUiUp();
	}

	private checkIsCanAR():boolean{
		return Api.switchVoApi.checkOpenWifeArCamera()
		&& PlatformManager.checkIsJPSp()
		&& App.CommonUtil.check_dragon()
		&&(App.DeviceUtil.isAndroid() || App.DeviceUtil.isIOS())
		&& Boolean(RSDKHelper.checkClientHasARCameraFunction());
	}

	private checkRedPoint(){
		//赏赐红点
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
		if(Api.wifeSkinVoApi.getSkinRed(this.param.data.id))
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

	private loveHander(){
		if(this._isMoving)
		{
			return;
		}
		if(WifeOptView._taskHand){
			WifeOptView._taskHand.stopAllActions();
			this.container.removeChild(WifeOptView._taskHand);
			WifeOptView._taskHand = null;
		}
		let gem = Api.playerVoApi.getPlayerGem();
		let needGem = Api.wifeVoApi.getLoveNeedGem(this._wifeInfoVo.intimacy);
		let message:string = LanguageManager.getlocal("wifeLoveUseGem",[App.StringUtil.toString(needGem),this._wifeInfoVo.name]);
		// ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:needGem,confirmCallback:this.confirmCallbackHandler,handler:this,icon:"itemicon1",iconBg: "itembg_1",num:gem,msg:message,id : 1});

		//红颜共浴
		
		if(Api.switchVoApi.checkOpenWifeBathScene()&&!this._wifeInfoVo.cfg.isBule()){
			let mark = 0;
			
			
			if(this._wifeInfoVo.scene){
				mark = 1;
			}
			
			
			


			//判断红颜有没有宠幸场景
			if(mark == 1){
				//打开宠幸场景界面
				ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATHSCENECONFIRMPOPUPVIEW,{useNum:needGem,baseLoveCallback:this.confirmCallbackHandler,sceneLoveCallback:this.sceneLoveHandler,handler:this,num:gem,wifename:this._wifeInfoVo.name,wifeInfoVo : this._wifeInfoVo});


				// this._wifeInfoVo.name

			} else {
				
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:needGem,confirmCallback:this.confirmCallbackHandler,handler:this,icon:"itemicon1",iconBg: "itembg_1",num:gem,msg:message,id : 1});

			}
		} else {
			//消耗元宝提示框
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:needGem,confirmCallback:this.confirmCallbackHandler,handler:this,icon:"itemicon1",iconBg: "itembg_1",num:gem,msg:message,id : 1});
		}


		// ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,this.param.data.id);
	}

	private giveHander(){
		if(this._isMoving)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.WIFEGIVEPOPUPVIEW,{id:this.param.data.id,confirmCallback:this.confirmCallbackHandler,handler:this});

		// ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,this.param.data.id);
	}

	private skillHander(){
		if(this._isMoving)
		{
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.WIFESKILLPOPUPVIEW,{id:this.param.data.id,confirmCallback:this.confirmCallbackHandler,handler:this});
		// ViewController.getInstance().openView(ViewConst.POPUP.WIFESKINVIEW,{id:this.param.data.id,confirmCallback:this.confirmCallbackHandler,handler:this});
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
		let id = this.param.data.id
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
	
		ViewController.getInstance().openView(ViewConst.POPUP.WIFESKINVIEW,{id:this.param.data.id,confirmCallback:this.confirmCallbackHandler,handler:this});
	}
	private changeHander(){
		if(!Api.switchVoApi.checkOpenBuleWife())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
			return;
		}
		if(this._isMoving)
		{
			return;
		}
		this.stopWifeNowSound();
		ViewController.getInstance().openView(ViewConst.COMMON.WIFECHANGESEXVIEW,{wid:this.param.data.id});
	}
	
	//场景宠幸
	private sceneLoveHandler(sceneId:any):void{
		// console.log("场景宠幸－－－－－－",sceneId);
		this._isSceneLove = true;
		this._sceneId = sceneId;
		let id = this.param.data.id

		if (Api.playerVoApi.getPlayerGem() < Api.wifeVoApi.getLoveNeedGem(this._wifeInfoVo.intimacy) )
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeLoveTip1"));
			return
		}
		let idStr = App.StringUtil.toString(id);
		this.request(NetRequestConst.REQUEST_WIFE_LOVE,{wifeId:idStr});
		if(this._droWifeIcon)
		{
			this._droWifeIcon.stop();	
		}		
	}

	private confirmCallbackHandler():void
	{
		this._isSceneLove = false;
		this._sceneId = null;
		let id = this.param.data.id
		// if(!Api.wifeSkinVoApi.isHaveSkin(id))
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinNoSkin"));
		// 	return;
		// }
	
		// let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		if (Api.playerVoApi.getPlayerGem() < Api.wifeVoApi.getLoveNeedGem(this._wifeInfoVo.intimacy) )
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
			
		}
	}
	//宠幸之后刷新数据
	protected receiveData(data:{ret:boolean,data:any}):void
	{	
		if(data.data.ret < 0){
			return;
		}
		if(data.data.cmd == NetRequestConst.REQUEST_WIFE_LOVE){

			let id = this.param.data.id
			this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			//亲密度
			let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
			this._intimateValueText.text = IntimacyValue;
			//子嗣
			let childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
			this._childrenValueText.text = childValue;

			let charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
			this._charmValueText.text = charmValue;

			if(this._artistryText){
				let artistryValue = LanguageManager.getlocal("wifeArtistry") + " " + this._wifeInfoVo.artistry;
				this._artistryText.text = artistryValue;
			}


			let expValue = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp;
			this._expValueText.text = expValue;

			let childData:any = null;
			if(data.data.data.childArr.length > 0){
				childData = data.data.data.childArr[0]
			} 


			// if(this._droWifeIcon)
			// {
			// 	this._droWifeIcon.dispose();
			// 	this._droWifeIcon = null;
			// }
			if(this._wifeInfoVo.cfg.isBule()){
				this.stopWifeNowSound();
			}

			if(this._isSceneLove&&!Api.wifeVoApi.checkOpenHexieTuoyi()){
				ViewController.getInstance().openView(ViewConst.BASE.WIFEBATHSCENEVIEW,{id:this.param.data.id,childData:childData,rewards:data.data.data.rewards,sceneId:this._sceneId});

			} else {
				ViewController.getInstance().openView(ViewConst.BASE.WIFELOVEANIVIEW,{id:this.param.data.id,type:2,childData:childData,rewards:data.data.data.rewards});

			}
			

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
			let id = this.param.data.id
			this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			//亲密度
			let IntimacyValue = LanguageManager.getlocal("wifeIntimacy") + " " + this._wifeInfoVo.intimacy;
			this._intimateValueText.text = IntimacyValue;
			//子嗣
			let childValue = LanguageManager.getlocal("wifeChildren") + " " + this._wifeInfoVo.child;
			this._childrenValueText.text = childValue;


			let charmValue = LanguageManager.getlocal("wifeCharm") + " " + this._wifeInfoVo.glamour;
			this._charmValueText.text = charmValue;

			if(this._artistryText){
				let artistryValue = LanguageManager.getlocal("wifeArtistry") + " " + this._wifeInfoVo.artistry;
				this._artistryText.text = artistryValue;
			}


			let expValue = LanguageManager.getlocal("wifeExp") + " " + this._wifeInfoVo.exp;
			this._expValueText.text = expValue;
		
	}

	protected refreshInfoAfterSkin()
	{
		let id = this.param.data.id

		this._nameBg.setRes("wifeview_namebg"+ (this._wifeInfoVo.sexflag?"_male":''));

		this._bigBg.setload("wifeview_optbg" + (this._wifeInfoVo.sexflag?"_male":''));

		this._wordsBg.setRes("wifebathscene_lovewordsbg" + (this._wifeInfoVo.sexflag?"_male":''));
		this._wordsBg.width = 440;
		this._wordsBg.height = 100;

		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifePic = wifeInfo.body;
		
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePic = skinCfg.body;
			}
			
		}
		this._wifeIcon.setload(wifePic);

		this.checkDro();
	}

	protected refreshInfoAfterChange()
	{
		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifePic = wifeInfo.body;
		
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePic = skinCfg.body;
			}
			
		}
		this._wifeIcon.setload(wifePic);

		this.checkDro();
	}

	private checkDro()
	{

		if(this._droWifeIcon)
		{
			this._droWifeIcon.dispose()
			this._droWifeIcon = null;
		}
		let bg2Index = this.container.getChildIndex(this._wifeIcon);
		if(Api.wifeSkinVoApi.isHaveSkin(this._wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				if(Api.wifeVoApi.isHaveBone(skinCfg.bone + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					// this._droWifeIcon.setScale(0.7) 
					// this._droWifeIcon.x = 0;
					// this._droWifeIcon.y = 0;
					this.container.addChildAt(this._droWifeIcon,bg2Index);
					this._wifeIcon.visible = false;
				}
			}
			else{
				if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske"))
				{

					this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
					// this._droWifeIcon.setScale(0.7)
					// this._droWifeIcon.x = this._wifeIcon.x;
					// this._droWifeIcon.y = this._wifeIcon.y;
					this.container.addChildAt(this._droWifeIcon,bg2Index);
				}
			}
			
		}else{
			if(Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske"))
			{

				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
				// this._droWifeIcon.setScale(0.7)
				// this._droWifeIcon.x = this._wifeIcon.x;
				// this._droWifeIcon.y = this._wifeIcon.y;
				this.container.addChildAt(this._droWifeIcon,bg2Index);
				this._wifeIcon.visible = false;
			}
		}
		if(this._droWifeIcon)
		{
			this._droWifeIcon.setScale(1.1)
			this._droWifeIcon.x = this._wifeIcon.x + 230;
			this._droWifeIcon.y = this._wifeIcon.y + 760*0.7 + 140;
			this._wifeIcon.visible = false;
		}
		else{
			this._wifeIcon.visible = true;
		}
		this._droWifeIcon2 = this._droWifeIcon;
	}

	private checkDro2()
	{
		if(this._droWifeIcon){
			// let bg2Index = this.container.getChildIndex(this._wifeIcon);
			// // this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
			// // this.container.addChildAt(this._droWifeIcon,bg2Index)
			// this._droWifeIcon = this._droWifeIcon2;
			// this.container.addChildAt(this._droWifeIcon,bg2Index)
			// this._droWifeIcon.x = this._wifeIcon.x + 230;
			// this._droWifeIcon.y = this._wifeIcon.y + 760*0.7 + 40;
			// return;
			this._droWifeIcon.resume();
			this._wifeIcon.visible = false;
		}
		else{
			this._wifeIcon.visible = true;
		}
		// this.checkDro();
	}
	protected getResourceList(): string[] {
		let res = super.getResourceList().concat([
			//  "wifeview_namebg","wifeview_optbg","wifeview_namebg","wifeview_bottombg2",
			//  "wifeview_charmicon","wifeview_childicon","wifeview_vexpicon","wifeview_vigoricon",
			//   "wifeview_mask","wife_give","wife_love","wife_skill",
			//   "wifeview_btnbg","wifeview_skin",
			//   "wifeview_skinstar","wifeview_baidi",
			//   "wife_skill_name","wife_give_name","wife_love_name","wifeview_skin_name",
			"wifeview_namebg","wifeview_namebg_male" ,"wifeget_bg","wifeview_bottombg","wifeview_hongyantyouxiangbg",
			"wifeview_mask","wifeview_skingetbg","wifeview_wenzibg2","wifeview_xinxibanbg",
			"wifeview_skinmask","wifeview_skingray","wifeview_bottombg2",
			"wifeview_charmicon",
			"wifeview_vigoricon", 
			"wifeview_artistryicon",
			"guide_hand",
			"wifeArButton","wifeArButtonLabel",
			"wifeview_change","wifeview_change_name",
			"wifebathscene_lovewordsbg","wifebathscene_lovewordsbg_male"
		]);
		if(PlatformManager.checkIsJPSp() && Api.switchVoApi.checkOpenWifeArCamera()){
			res = res.concat([
				"wifearview_erweima","wifearview_back", "wifearview_switch", "wifearview_takephoto",
			])
		}
		return res;
	}

	private moveUiUp()
	{
		let ths=this;
		this._isMoving = true;
		egret.Tween.get(this.container).wait(200)
		.call(function(){
				this._wordsBg.visible = false;
				this._wifeWordsText.visible = false;
				// this._wordsCornerBg.visible = false;
				
			},this)
		
		
		egret.Tween.get(this._topContanier).to({y:-600}, 400)
		.call(this.showSkinAni,this)
		.wait(2300)
		.to({y:10}, 500)
		.to({y:0}, 100)
		.call(function(){
				ths._wordsBg.visible = true;
				ths._wifeWordsText.visible = true;
				// ths._wordsCornerBg.visible = true;
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


		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);

		let wifePic = wifeInfo.body;
		
		//蓝颜说的话和语音要对应
		let blueSoundIndex = 0
		if(Api.switchVoApi.checkOpenBuleWife()&& Api.gameinfoVoApi.getSexswitch() && Api.wifeVoApi.checkWifeCanChangeSex(id) && this._wifeInfoVo.sexflag){
			blueSoundIndex = App.MathUtil.getRandom(1,4);
		}
		if(!Api.switchVoApi.checkCloseWifeSound())
		{
			let soundRes = '';
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				// wifePic = skinCfg.body;
				soundRes = skinCfg.sound;
			}
			else{
				soundRes = this._wifeInfoVo.sound
				if(blueSoundIndex){
					soundRes = this._wifeInfoVo.getBlueSound(blueSoundIndex)
				}
			}
			this.playEffect(soundRes, true);
			this._nowPlayingEffect = soundRes;
		}
		
		
	}

	private showSkinAni()
	{
		let ths=this;
		let bg2Index = this.container.getChildIndex(this._bottomBg);
		let mask1:BaseBitmap = BaseBitmap.create("wifeview_skinmask");
		mask1.x = -640;
		mask1.y = -20;
		this.container.addChildAt(mask1,bg2Index)

		egret.Tween.get(mask1).to({x:-10}, 500).to({x:-13}, 100).to({x:-10}, 100).wait(200).call(function(){
				// egret.Tween.removeTweens(ths);
				// ths._tweenTo=null;
				
			},this)
		.wait(1100).to({x:-640}, 600);

		let mask2:BaseBitmap = BaseBitmap.create("wifeview_skinmask");
		mask2.$setSkewY(180);
		mask2.x = GameConfig.stageWidth*2;
		mask2.y = -20;
		this.container.addChildAt(mask2,bg2Index)

		egret.Tween.get(mask2).to({x:650}, 500).to({x:653}, 100).to({x:650}, 100).wait(200).call(this.addMask,this)
		.wait(1100).to({x:GameConfig.stageWidth*2}, 600)
	
	}
	private addMask()
	{

		

		let mask1:BaseBitmap = BaseBitmap.create("wifeview_baidi");
		mask1.width = GameConfig.stageWidth;
		mask1.height = GameConfig.stageHeigth;
		// mask2.$setSkewY(180);
		mask1.alpha = 0;
		mask1.x = 0;
		mask1.y = -10;
		let bg2Index2 = this.container.getChildIndex(this._bottomBg);
		this.container.addChildAt(mask1,bg2Index2-2)

		egret.Tween.get(mask1)
		.to({alpha:1}, 150)
		.wait(500).to({alpha:0}, 500)
		.call(function()
		{
			mask1.dispose();
		},this)

		let mask2:BaseBitmap = BaseBitmap.create("wifeview_skingray");
		// mask2.$setSkewY(180);
		mask2.alpha = 0;
		mask2.x = GameConfig.stageWidth/2 - mask2.width/2 + 90;
		mask2.y = this._wifeIcon.y;
		let bg2Index = this.container.getChildIndex(this._bottomBg);
		this.container.addChildAt(mask2,bg2Index-2)
		egret.Tween.get(mask2)
		.to({alpha:0.7}, 150)
		.wait(500).to({alpha:0}, 500)
		.call(function()
		{
			mask2.dispose();
		},this)
		this.refreshInfoAfterSkin();
	}

	protected getRuleInfo(): string {
		if(Api.switchVoApi.checkOpenWifeBattle()){
			return "wife_description2";
		} else {
			return "wife_description";
		}
		
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
	/** 点击ar照相 */
	private wifeArBtnClick() {
		setTimeout(() => {
			App.CommonUtil.showTip(LanguageManager.getlocal("arwifecameratipopencamera"));
			if(GameConfig.stage.getChildByName("WifeARView")){
				return;
			}
			App.LogUtil.log("wifeArBtnClick");
			LayerManager.hideLayer();
			let wifeARView = new WifeARView(this._wifeInfoVo.id);
			wifeARView.name = "WifeARView";
			GameConfig.stage.addChild(wifeARView);
		}, 200);
	}

	private stopWifeNowSound(){
		if(this._nowPlayingEffect){
			SoundManager.stopEffect(this._nowPlayingEffect);
		}
	}

	private setWifeCallback():void{
		let info = Api.wifeVoApi.getWifeInfoVoById(this.param.data.id);
		this.refreshInfoAfterSkin();
		this._nameTxt.text = info.name;
		if (PlatformManager.checkIsTextHorizontal())
		{
			this._nameBg.width = this._nameTxt.width + 40;
			this._nameBg.x = GameConfig.stageWidth/2 - this._nameBg.width/2;
			this._nameTxt.x = this._nameBg.x + this._nameBg.width/2*this._nameBg.scaleX  - this._nameTxt.width/2 + 2;
			this._nameTxt.y = this._nameBg.y + this._nameBg.height/2 - this._nameTxt.height/2;

		} else {
			this._nameTxt.x = this._nameBg.x + this._nameBg.width/2 - this._nameTxt.width/2 - 15;
			this._nameTxt.y = this._nameBg.y + 180/2 - this._nameTxt.height/2;
		}
		this._wifeDescText.text = info.desc;
		this._wifeWordsText.text  =  this._wifeInfoVo.words;
	}

	public dispose(): void {
		super.dispose();
		Api.mainTaskVoApi.hideGuide();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHILD_GUIDE,this.doGuide,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_AWARD),this.refreshInfoAfterLove,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_UPGRADESKILL),this.refreshInfoAfterLove,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFE,this.checkRedPoint,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_WIFESKIN,this.checkRedPoint,this);
		App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_WIFE_EQUIP),this.moveUiUp,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_WIFE_LOVECOM,this.checkDro2,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING, this.setWifeCallback, this);

		this._intimateValueText = null;
		//子嗣
		this._childrenValueText = null;

		//魅力值
		this._charmValueText = null;

		this._artistryText = null;

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
		this._changeBtn = null;

		this._topContanier = null;

		// this._wordsCornerBg = null;
		this._wordsBg = null;
		this._wifeWordsText = null;
		this._isMoving =false;
		this._droWifeIcon = null;
		this._droWifeIcon2 = null;

		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
		this._isSceneLove = false;
		this._sceneId = null;
		this._nameTxt = null;
		this._wifeDescText = null;
		this._bigBg = null;
		this._nowPlayingEffect = '';
		WifeOptView._taskHand = null;
	}
}