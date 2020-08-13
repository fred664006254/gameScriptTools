/**
 * 20190401
 * 奸臣皮肤兑换
 */
class AcStargazerSingleView extends AcCommonView {

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;
	private _progress:ProgressBar;

	private _inOrderText1: BaseTextField = null;
	private _inOrderText2: BaseTextField = null;
	private _inOrderText3: BaseTextField = null;
	private _inOrderText4: BaseTextField = null;



	private _rewardLookBtn:BaseButton;
	private _aniPlaying:boolean = false;
	// private _animPlaying:boolean = false;

	private _acvo:AcStargazerSingleVo = undefined;
	private _rechargeBg:BaseBitmap = null;
	private _rewardLookBg:BaseBitmap = null;
// --------------
	private _searchtxt:BaseTextField = null;
	private _searchdesc:BaseTextField = null;

	private _searchBtn:BaseButton = null;

	private _bg1:BaseBitmap = null;
	private _bg2:BaseBitmap = null;

	private _innerCircle:BaseBitmap = null;
	private _outerCircle:BaseBitmap = null;
	

	//每个形象的角度
	private _degress:number = 30;
	private _loopTime:number = 30000;
	private _temp:any = null;

	private _centerCircle:BaseDisplayObjectContainer = null;
	private _starMap0:BaseDisplayObjectContainer = null;
	private _starMap1:BaseDisplayObjectContainer = null;
	private _starMap2:BaseDisplayObjectContainer = null;
	private _starMap3:BaseDisplayObjectContainer = null;
	private _starMap4:BaseDisplayObjectContainer = null;
	private _cfg:any = null;
	private _reward:any = null;

	private _btnidleEffect:CustomMovieClip = null;
	private _btnclickEffect:CustomMovieClip = null;
	private _lightoverEffect:CustomMovieClip = null;
	private _lightstartEffect:CustomMovieClip = null;

	private _starLine:BaseBitmap = null;

	private _topBg: BaseBitmap = null;

	private _bottomBg: BaseBitmap = null;
	private _circleEffect:BaseLoadDragonBones = null

	private _bgContent:BaseDisplayObjectContainer = null;
	private _starPos = [
		[
			{x:88,y:122,isBig:false},
			{x:126,y:94,isBig:true},
			{x:163,y:122,isBig:true},
			{x:135,y:163,isBig:false},
			{x:81,y:207,isBig:true},

			{x:26,y:218,isBig:true},
			{x:73,y:248,isBig:false},
			{x:104,y:243,isBig:true},
			{x:109,y:281,isBig:false},
			{x:69,y:300,isBig:true},

			{x:175,y:254,isBig:true},
			{x:201,y:223,isBig:true},
			{x:232,y:239,isBig:false},
			{x:236,y:288,isBig:true},
			{x:195,y:325,isBig:true},

			{x:236,y:186,isBig:true},
			{x:316,y:202,isBig:true},
			{x:355,y:202,isBig:true},
			{x:277,y:133,isBig:false},
			{x:248,y:101,isBig:false},
		],
		[
			{x:109,y:105,isBig:true},
			{x:108,y:154,isBig:false},
			{x:71,y:212,isBig:true},
			{x:83,y:275,isBig:true},
			{x:117,y:241,isBig:false},

			{x:153,y:205,isBig:true},
			{x:158,y:140,isBig:true},
			{x:193,y:179,isBig:false},
			{x:211,y:124,isBig:false},
			{x:240,y:164,isBig:true},

			{x:163,y:52,isBig:true},
			{x:264,y:105,isBig:true},
			{x:282,y:69,isBig:true},
			{x:175,y:253,isBig:true},
			{x:144,y:293,isBig:false},

			{x:222,y:275,isBig:true},
			{x:223,y:308,isBig:true},
			{x:258,y:241,isBig:false},
			{x:293,y:188,isBig:true},
			{x:310,y:124,isBig:false},
		],
		[
			{x:88,y:77,isBig:true},
			{x:157,y:132,isBig:true},
			{x:88,y:160,isBig:false},
			{x:11,y:132,isBig:true},
			{x:2,y:176,isBig:false},
			
			{x:32,y:208,isBig:true},
			{x:82,y:213,isBig:true},
			{x:110,y:197,isBig:true},
			{x:121,y:250,isBig:false},
			{x:75,y:283,isBig:true},

			{x:184,y:223,isBig:false},
			{x:215,y:272,isBig:true},
			{x:257,y:215,isBig:false},
			{x:248,y:169,isBig:true},
			{x:244,y:108,isBig:false},

			{x:281,y:61,isBig:true},
			{x:307,y:224,isBig:true},
			{x:328,y:166,isBig:false},
			{x:365,y:163,isBig:true},
			{x:359,y:208,isBig:true},
		],
		[
			{x:59,y:96,isBig:true},
			{x:109,y:106,isBig:false},
			{x:43,y:178,isBig:true},
			{x:13,y:182,isBig:false},
			{x:90,y:240,isBig:true},

			{x:129,y:264,isBig:false},
			{x:122,y:286,isBig:true},
			{x:176,y:235,isBig:true},
			{x:184,y:204,isBig:false},
			{x:167,y:183,isBig:true},

			{x:164,y:140,isBig:true},
			{x:189,y:113,isBig:true},
			{x:212,y:95,isBig:true},
			{x:252,y:133,isBig:true},
			{x:214,y:172,isBig:false},

			{x:236,y:235,isBig:false},
			{x:289,y:228,isBig:true},
			{x:298,y:275,isBig:true},
			{x:326,y:199,isBig:true},
			{x:330,y:147,isBig:false},

		]

	]

    private decode():string{
        if(this.code == "1" || this.code == "5"){
            return "1";
        } else if(this.code == "2" || this.code == "6"){
            return "2";
        } else if(this.code == "3" || this.code == "7"){
            return "3";
        } else if(this.code == "4" || this.code == "8"){
            return "4";
        }
    }
    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode || "1";
        if(ResourceManager.hasRes(resName+"-"+this.decode())){
            return resName+"-"+this.decode();
        } else {
            return resName+"-"+defaultCode;
        }
    }
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode ||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.decode())){
            return cnName + "-" + this.decode();
        } else {
            return cnName + "-" + defaultCode;
        }
    }


	private get cfg() : Config.AcCfg.StargazerSingleCfg{
		if(!this._cfg){
			this._cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		}	
		return this._cfg;
        
    }
	public constructor() {
		super();
	}

	protected getBgName():string
	{
		return this.getDefaultRes("acstargazer_bg");
	}
	protected initBg():void{

		

		let bgName:string=this.getBgName();

		let bgContent = new BaseDisplayObjectContainer();
		bgContent.height = 1136;
		bgContent.x = 640;
		bgContent.y = GameConfig.stageHeigth/2 - 1136/2;
		this.addChild(bgContent);

		this._bg1 = BaseBitmap.create(bgName);
		this._bg2 = BaseBitmap.create(bgName);
		bgContent.addChild(this._bg1);
		bgContent.addChild(this._bg2);

		this._bg1.x = -this._bg1.width;
		this._bg1.y = 0;

		this._bg2.x = -this._bg1.width * 2;
		this._bg2.y = 0; 
		this._temp = {t:0};
		egret.Tween.get(this._temp,{onChange:()=>{
			bgContent.x += 0.2;
			if(this._bg1.x + bgContent.x > 640){
				this._bg1.x = this._bg2.x - this._bg1.width;
			}
			if(this._bg2.x + bgContent.x > 640){
				this._bg2.x = this._bg1.x - this._bg2.width;
			}


		},onChangeObj:this,loop:true})
		.to({t:1},1000);
	}

	protected initView(): void {
	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_STARGAZERSINGLEVO_REFRESH,this.refreshUIInfos,this);
		this._acvo = <AcStargazerSingleVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);

		let titleFont = BaseBitmap.create(this.getDefaultRes("acstargazersingle_titletxt"));
		titleFont.x = GameConfig.stageWidth / 2 - titleFont.width/2;
		titleFont.y = 0;
		this.addChild(titleFont);
		this.initCircle();
		this.showText();








		//下面属性背景
		let bottomBg:BaseBitmap = BaseBitmap.create(this.getDefaultRes("acstargazer_bottom"));
		bottomBg.width = GameConfig.stageWidth;
		// bottomBg.height = 160;
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
		this.addChildToContainer(bottomBg);
		this._bottomBg = bottomBg;
 	

		let searchtxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		searchtxt.text = LanguageManager.getlocal("acStargazerSingle_count",["0"]);
		searchtxt.x = GameConfig.stageWidth/2 - searchtxt.width/2;
		searchtxt.y = bottomBg.y + 73;
		// searchtxt.visible = false;
		this.addChildToContainer(searchtxt);
		this._searchtxt = searchtxt;


		this._searchdesc = ComponentManager.getTextField(LanguageManager.getlocal("acStargazerSingle_countdesc"),18,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._searchdesc.x = GameConfig.stageWidth/2 - this._searchdesc.width/2;
		this._searchdesc.y = searchtxt.y - this._searchdesc.height-1;
		this.addChildToContainer(this._searchdesc);


		let searchBtn = ComponentManager.getButton(this.getDefaultRes("acstargazer_centerbtn"),null,this.searchHandler,this,[1]);
		searchBtn.x = GameConfig.stageWidth / 2 - searchBtn.width/2;
		searchBtn.y = bottomBg.y - 80 + 8;
		searchBtn.name = "searchBtn";
		this.addChildToContainer(searchBtn);
		this._searchBtn = searchBtn;

		this._btnidleEffect = ComponentManager.getCustomMovieClip("acstargazer_btnidle",13,70);
		this._btnidleEffect.x = searchBtn.x + searchBtn.width/2 - 126/2;
		this._btnidleEffect.y = searchBtn.y + searchBtn.height/2 - 127/2;
		this.addChildToContainer(this._btnidleEffect);
		this._btnidleEffect.playWithTime(-1)




	   // 兑换
		let rewardLookBtn:BaseButton = ComponentManager.getButton(this.getDefaultRes("acstargazer_changebtn"),"",this.rewardLookClick,this);
		rewardLookBtn.x = 125 - rewardLookBtn.width/2;
		rewardLookBtn.y = bottomBg.y + 15 - rewardLookBtn.height/2;
		rewardLookBtn.name = "rewardLookBtn";
		this.addChildToContainer(rewardLookBtn);

		let rewardLookTxt:BaseBitmap=BaseBitmap.create("ransackTraitorSP_exchangetxt");
		rewardLookTxt.x = rewardLookBtn.x + rewardLookBtn.width/2 - rewardLookTxt.width/2;
		rewardLookTxt.y = rewardLookBtn.y + rewardLookBtn.height;
		this.addChildToContainer(rewardLookTxt);
		this._rewardLookBtn = rewardLookBtn;

		

		// 充值
		let rechargeBtn:BaseButton = ComponentManager.getButton(this.getDefaultRes("acstargazer_rechargebtn"),"",this.rechargeClick,this);
		rechargeBtn.x = 515 - rechargeBtn.width/2;
		rechargeBtn.y = bottomBg.y + 15 - rechargeBtn.height/2;
		this.addChildToContainer(rechargeBtn);  

		
		let rechargeTxt = BaseBitmap.create("ransackTraitorSP_rechargetxt");
		rechargeTxt.x = rechargeBtn.x + rechargeBtn.width/2 - rechargeTxt.width/2;
		rechargeTxt.y = rechargeBtn.y + rechargeBtn.height;
		this.addChildToContainer(rechargeTxt); 

		

		this.refreshUIInfos();
		ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZERSINGLESTORYVIEW,{aid:this.aid,code:this.code});
	}
	private initCircle():void{
		this._innerCircle = BaseBitmap.create(this.getDefaultRes("acstargazer_innercircle"));
		this._outerCircle = BaseBitmap.create(this.getDefaultRes("acstargazer_outercircle"));

		this._innerCircle.anchorOffsetX = this._innerCircle.width/2;
		this._innerCircle.anchorOffsetY = this._innerCircle.height/2;
		this._innerCircle.x = GameConfig.stageWidth/2;
		this._innerCircle.y = GameConfig.stageHeigth/2 + 52;

		this._outerCircle.anchorOffsetX = this._outerCircle.width/2;
		this._outerCircle.anchorOffsetY = this._outerCircle.height/2;
		this._outerCircle.x = GameConfig.stageWidth/2;
		this._outerCircle.y = GameConfig.stageHeigth/2 + 52;




		this.addChildToContainer(this._innerCircle); 
		this.addChildToContainer(this._outerCircle);

		if(App.CommonUtil.check_dragon() && RES.hasRes("acstargazer_zhuan_ske"))
		{	
			
			this._circleEffect = App.DragonBonesUtil.getLoadDragonBones("acstargazer_zhuan");
			this._circleEffect.x = this._innerCircle.x;
			this._circleEffect.y = this._innerCircle.y;
			this.addChildToContainer(this._circleEffect);
			this._circleEffect.visible = false;

			
		}

		egret.Tween.get(this._innerCircle,{loop:true})
		.to({rotation:-360},60000)
		egret.Tween.get(this._outerCircle,{loop:true})
		.to({rotation:360},60000)

		// let mask = BaseBitmap.create(this.getDefaultRes("acstargazer_circlemask"));
		// mask.x = this._innerCircle.x - mask.width/2;
		// mask.y = this._innerCircle.y - mask.height/2;
		// this.addChildToContainer(mask);

		this._centerCircle = new BaseDisplayObjectContainer();
		this._centerCircle.width = 100;
		this._centerCircle.height = 100;
		this._centerCircle.anchorOffsetX = this._centerCircle.width/2;
		this._centerCircle.anchorOffsetY = this._centerCircle.height/2;
		this.addChildToContainer(this._centerCircle);

		// this._centerCircle.mask = mask;
		let radius = 900;// this._centerCircle.y - this._innerCircle.y;
		//角度
		let degress = this._degress;
		//弧度
		let rad = degress * (Math.PI / 180);


		this._centerCircle.x = GameConfig.stageWidth/2;
		this._centerCircle.y = this._innerCircle.y + radius;//GameConfig.stageHeigth;
		this.addChildToContainer(this._centerCircle);

		
		let i = Number(this.decode())-1;
		// for(let i = 0;i < 5; i ++){
			// if(i == 4){
			// 	let starMap = new BaseDisplayObjectContainer();
			// 	let starIcon = BaseBitmap.create(this.getDefaultRes("acstargazer_starimg_"+(0+1)));
			// 	starMap.width = starIcon.width;
			// 	starMap.height = starIcon.height;
			// 	starMap.addChild(starIcon);
			// 	starMap.anchorOffsetX = starMap.width/2;
			// 	starMap.anchorOffsetY = starMap.height/2;
			// 	let temp1 = Math.sin(i * rad) * radius;
			// 	let temp2 = Math.cos(i * rad) * radius;
			// 	let temp3 = this._centerCircle.width / 2;
			// 	let temp4 = this._centerCircle.height / 2

			// 	starMap.x = this._centerCircle.width / 2 - Math.sin(i * rad) * radius;
			// 	starMap.y = this._centerCircle.height / 2 - Math.cos(i * rad) * radius;
			// 	starMap.rotation = -i *degress;
			// 	this._centerCircle.addChild(starMap);
			// 	this["_starMap"+i] = starMap;
			// 	let cfg = this.acVo.config;//.exchangeShop[0];
			// 	let skincfg = Config.ServantskinCfg.getServantSkinItemById(cfg.TraitorSkinId);

			// 	let nameTF = ComponentManager.getTextField(LanguageManager.getlocal("acStargazer_name",[LanguageManager.getlocal("servant_name"+ skincfg.servantId)]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
			// 	nameTF.x = starMap.width / 2 - nameTF.width/2;
			// 	nameTF.y = starMap.height - nameTF.height-25;
			// 	starMap.addChild(nameTF);

			// 	// this._starMap
				
			// 	let allCount = cfg.RansackItemNum;//shopItem["proofNum"];
			// 	let itemCount = this._acvo.getItemNumByIndex(String(cfg.RansackItemID));
			// 	let isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(cfg.TraitorSkinId));

			// 	let starPos = this._starPos[0];
			// 	for(let j = 0; j < starPos.length; j++){


			// 		if(!isOwn && j >= itemCount){
			// 			break;
			// 		}

			// 		let pos = starPos[j];
			// 		let star = null;
			// 		if(pos.isBig){
			// 			star = BaseBitmap.create(this.getDefaultRes("acstargazer_star1_"+(0+1)));
			// 		} else {
			// 			star = BaseBitmap.create(this.getDefaultRes("acstargazer_star2_"+(0+1)));
			// 		}
			// 		star.x = pos.x;
			// 		star.y = pos.y;
			// 		starMap.addChild(star);
			// 	}
			// } else {
				let starMap = new BaseDisplayObjectContainer();
				let starIcon = BaseBitmap.create(this.getDefaultRes("acstargazer_starimg_"+(i+1)));
				starMap.width = starIcon.width;
				starMap.height = starIcon.height;
				starMap.addChild(starIcon);
				starMap.anchorOffsetX = starMap.width/2;
				starMap.anchorOffsetY = starMap.height/2;
				let temp1 = Math.sin(i * rad) * radius;
				let temp2 = Math.cos(i * rad) * radius;
				let temp3 = this._centerCircle.width / 2;
				let temp4 = this._centerCircle.height / 2

				starMap.x = this._centerCircle.width / 2 - Math.sin(i * rad) * radius;
				starMap.y = this._centerCircle.height / 2 - Math.cos(i * rad) * radius;
				starMap.rotation = -i *degress;
				this._centerCircle.addChild(starMap);
				this["_starMap"+i] = starMap;
				// let shopItem = this.acVo.config.exchangeShop[i];
                let cfg = this.acVo.config;
				let skincfg = Config.ServantskinCfg.getServantSkinItemById(cfg.TraitorSkinId);

				let nameTF = ComponentManager.getTextField(LanguageManager.getlocal("acStargazer_name",[LanguageManager.getlocal("servant_name"+ skincfg.servantId)]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
				nameTF.x = starMap.width / 2 - nameTF.width/2;
				nameTF.y = starMap.height - nameTF.height-25;
				starMap.addChild(nameTF);

				// this._starMap
				
				let allCount = cfg.RansackItemNum;//shopItem["proofNum"];
				let itemCount = this._acvo.getItemNumByIndex(String(cfg.RansackItemID));
				let isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(cfg.TraitorSkinId));

				let starPos = this._starPos[i];
				for(let j = 0; j < starPos.length; j++){


					if(!isOwn && j >= itemCount){
						break;
					}

					let pos = starPos[j];
					let star = null;
					if(pos.isBig){
						star = BaseBitmap.create(this.getDefaultRes("acstargazer_star1_"+(i+1)));
					} else {
						star = BaseBitmap.create(this.getDefaultRes("acstargazer_star2_"+(i+1)));
					}
					star.x = pos.x;
					star.y = pos.y;
					starMap.addChild(star);
				}
			// }

		// }
		let baseRad = 30;
		let turnRad = i * baseRad;
		this._centerCircle.rotation = turnRad;
		// egret.Tween.get(this._centerCircle,{loop:true})
		// .to({rotation : degress * 4},this._loopTime)
		// .set({rotation:0});


	}

	private resetCircle():void{


		egret.Tween.removeTweens(this._centerCircle);
		
		let curRad = this._centerCircle.rotation;
		let time = (this._degress * 4 - curRad)/(this._degress * 4) *this._loopTime;

		egret.Tween.get(this._centerCircle)
		.to({rotation : this._degress * 4},time)
		.set({rotation:0})
		.call(()=>{
			egret.Tween.removeTweens(this._centerCircle);
			egret.Tween.get(this._centerCircle,{loop:true})
			.to({rotation : this._degress * 4},this._loopTime)
			.set({rotation:0});
		});
		
	}
	

   	private rechargeClick():void{
		if(!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

	private refreshUIInfos()
	{
	
		this._searchtxt.text  = LanguageManager.getlocal("acStargazerSingle_count",[this.acVo["attacknum"]]);
		
		let cfg = this.acVo.config;
		let exchangeShop = cfg.exchangeShop;

		let deltaY = 3;

        let skincfg = Config.ServantskinCfg.getServantSkinItemById(cfg.TraitorSkinId);
        let isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(cfg.TraitorSkinId));
        let txt = null;//ransackTraitorSP_txt6
        if(isOwn){
            txt = LanguageManager.getlocal("acStargazerSingle_starNumOver",[LanguageManager.getlocal("servant_name"+ skincfg.servantId)]);
        } else {
            txt = LanguageManager.getlocal("acStargazerSingle_starNum",[LanguageManager.getlocal("servant_name"+ skincfg.servantId),this._acvo.getItemNumByIndex(String(cfg.RansackItemID)),cfg.RansackItemNum]);
        }
        this._inOrderText1.text = txt;

		// for(let i = 0; i < exchangeShop.length; i++){
		// 	let shopItem = exchangeShop[i];
		// 	let skincfg = Config.ServantskinCfg.getServantSkinItemById(shopItem.skinID);
		// 	let isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(shopItem.skinID));
		// 	let txt = null;//ransackTraitorSP_txt6
		// 	if(isOwn){
		// 		txt = LanguageManager.getlocal("acStargazerSingle_starNumOver",[LanguageManager.getlocal("servant_name"+ skincfg.servantId)]);
		// 	} else {
		// 		txt = LanguageManager.getlocal("acStargazerSingle_starNum",[LanguageManager.getlocal("servant_name"+ skincfg.servantId),this._acvo.getItemNumByIndex(String(shopItem.itemID)),shopItem["proofNum"]]);
		// 	}
			
		// 	//罪证

		// 	if(!this["_inOrderText"+(i + 1)]){
		// 		break;
		// 	}
		// 	this["_inOrderText"+(i + 1)].text = txt;
		// 	if(i == 0){
		// 		this["_inOrderText"+(i + 1)].x = this._ruleText.x;
		// 		this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY; 
		// 	} else if(i == 1){
		// 		this["_inOrderText"+(i + 1)].x = this._ruleText.x + 400;//this._ruleText.width - this["_inOrderText"+(i + 1)].width;
		// 		this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY; 
		// 	} else if(i == 2){
		// 		this["_inOrderText"+(i + 1)].x = this._activityTimerText.x;
		// 		this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText"+(i + 1)].height + deltaY; 
		// 	} else if(i == 3){
		// 		this["_inOrderText"+(i + 1)].x = this._ruleText.x + 400;//this._ruleText.width - this["_inOrderText"+(i + 1)].width;
		// 		this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText"+(i + 1)].height + deltaY; 
		// 	}

		// 	this.addChildToContainer(this._inOrderText1);
		// }


		let idfall = (this.acVo as AcStargazerSingleVo ).isExchangeEnable();
		let searchAll = this._acvo.isFineAll();
		if(searchAll)
		{
			App.DisplayUtil.changeToGray(this.container.getChildByName("searchBtn"));

			if(this._searchtxt){
				this._searchtxt.visible = false;
				this._searchdesc.visible = false;
			} 

		} else {
			if(this.acVo["cannum"] >= 10){
				this._searchdesc.visible = true;
			} else {
				this._searchdesc.visible = false;
			}
		}
		
		if(idfall){
			App.CommonUtil.addIconToBDOC(this._rewardLookBtn);
		}else{
			App.CommonUtil.removeIconFromBDOC(this._rewardLookBtn);
		}
	}
	
    private rewardLookClick(){
        if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZERSINGLEEXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
    }
	private searchHandler(param:any)
	{
		// if(1==1){
		// 	this.showStarLine();
		// 	return;
		// }
		if(this._aniPlaying){
			return;
		}
		if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }


		if(this.acVo["attacknum"] >= 10){
			param = 10;
		}

		if(this._acvo.isFineAll()){
			
			ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZERSINGLEEXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
			return;
		}

		if(this.acVo["attacknum"] < param){
			let rewardStr = LanguageManager.getlocal("acStargazer_notEnough",[this.acVo["attacknum"]]);
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:rewardStr,
				callback:this.rechargeClick,
				handler:this,
				needCancel:true
			});
			return;
		}


		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_STARGAZERSINGLEATTACK,this.searchHandlerNetBack,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_STARGAZERSINGLEATTACK,{activeId:this.acVo.aidAndCode,attack:param})
	}

	private searchHandlerNetBack(event:egret.Event)
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_STARGAZERSINGLEATTACK,this.searchHandlerNetBack,this);
		 if (event.data.data.ret === 0) {
			let rdata = event.data.data.data;
			let rewards = rdata.rewards;

			this._reward = rewards;
			
			//序列帧
			// this._aniPlaying = true;
			this._aniPlaying = true;
			if(!this._btnclickEffect){
				this._btnclickEffect = ComponentManager.getCustomMovieClip("acstargazer_btnclick",12,70);
				this._btnclickEffect.x = this._searchBtn.x + this._searchBtn.width/2 - 126/2;
				this._btnclickEffect.y = this._searchBtn.y + this._searchBtn.height/2 - 127/2;
				this.addChildToContainer(this._btnclickEffect);
				this._btnclickEffect.setEndCallBack(()=>{
					this._btnclickEffect.visible = false;
				},this)
			}
			this._btnclickEffect.visible = true;
			this._btnclickEffect.playWithTime(1);
				

			let isFind = false;
			let RansackItemID = this.acVo.config.RansackItemID;


			let findItemIndex = -1;
			// for(let i = 0;i<RansackItemID.length;i++){
			// 	let id = RansackItemID[i];
				let itemStr = "6_"+RansackItemID+"_1";
				if(rewards.indexOf(itemStr) > -1)
				{
					findItemIndex = Number(this.decode())-1;
					isFind = true;
				}
			// }

			if(isFind){
				// let itemId = RansackItemID;
				// let zzNum = this._acvo.getItemNumByIndex(String(itemId));
				
				// let baseRad = 30;
				// let rad = findItemIndex * baseRad;
				// let curRad = this._centerCircle.rotation;

				// egret.Tween.removeTweens(this._centerCircle);


				
				if(this._circleEffect){
					this._circleEffect.visible = true;
					this._circleEffect.playDragonMovie("zhuan",1);
					this._circleEffect.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
						this._circleEffect.visible = false;
       				 }, this);
				}

				egret.Tween.get(this._centerCircle)
				.wait(600)
				.call(this.showStarLine,this,[findItemIndex,isFind]);
				/*
				if(rad >= curRad){
					egret.Tween.get(this._centerCircle)
					// .to({rotation:rad},(rad - curRad) / 360 * 1800)
					.to({rotation:rad},600)
					.call(this.showStarLine,this,[findItemIndex,isFind]);
				} else {
					// egret.Tween.get(this._centerCircle)
					// .to({rotation:30 * 4},(30 * 4 - curRad)/360 * 1800)//,egret.Ease.sineOut
					// .set({rotation : 0})
					// .to({rotation: rad},rad / 360 *1800)
					// .call(this.showStarLine,this,[findItemIndex,isFind]);

					egret.Tween.get(this._centerCircle)
					.to({rotation:30 * 4},(30 * 4 - curRad)/(30 * 4 - curRad + rad) * 600)//,egret.Ease.sineOut
					.set({rotation : 0})
					.to({rotation: rad},rad / (30 * 4 - curRad + rad) *600)
					.call(this.showStarLine,this,[findItemIndex,isFind]);	
				}
				*/
			} else {
				egret.Tween.get(this)
				.wait(600)
				.call(this.showStarLine,this,[findItemIndex,isFind]);

			}
		} 
	}
	private showStarLine(findItemIndex,isFind):void {
	// private showStarLine():void {
		let pos = null;
		if(findItemIndex > -1){
			let RansackItemID = this.acVo.config.RansackItemID;
			let itemId = RansackItemID;
			let zzNum = this._acvo.getItemNumByIndex(String(itemId));
			pos = this._starPos[findItemIndex][zzNum-1];
		} else {
			// pos = {x: 0,y: 0,isBig:false};
			let partList = [
					{x:0,y:this._topBg.y+this._topBg.height,width:640/2 - 520/2, height:this._bottomBg.y - this._topBg.y - this._topBg.height},
					{x:640 - 320 + 520/2,y:this._topBg.y+this._topBg.height,width:640/2 - 520/2, height:this._bottomBg.y - this._topBg.y - this._topBg.height},
				];
	
			let part = partList[Math.floor(Math.random() * partList.length)];

			pos = {x: part.x + part.width * Math.random(), y: part.y + part.height * Math.random(),isBig:false};

		}

		// let pos = {x:88,y:122,isBig:false};//88,y:122

		if(!this._lightstartEffect){
			this._lightstartEffect = ComponentManager.getCustomMovieClip("acstargazer_lightstart",9,70);

			this.addChildToContainer(this._lightstartEffect);
			this._lightstartEffect.setEndCallBack(()=>{
				this._lightstartEffect.visible = false;
			},this)
		}
		this._lightstartEffect.x = this._searchBtn.x + this._searchBtn.width/2 - 150/2;
		this._lightstartEffect.y = this._searchBtn.y + this._searchBtn.height/2 - 145;
		this._lightstartEffect.visible = true;
		this._lightstartEffect.playWithTime(1);
		let startPosX = this._searchBtn.x +this._searchBtn.width/2;
		let startPosY = this._searchBtn.y + this._searchBtn.height/2;

		let off = 0;
		if(pos.isBig){
			off = 23/2;
		} else {
			off = 19/2;
		}
		let overPosX = 0;
		let overPosY = 0;
		if(findItemIndex > -1){
			overPosX = this._innerCircle.x - 200 + pos.x + off;
			overPosY = this._innerCircle.y - 200 + pos.y + off;
		} else {
			overPosX = pos.x;
			overPosY = pos.y;
		}

		
		if(!this._starLine){
			this._starLine = BaseBitmap.create("acstargazer_starline");
			this.addChildToContainer(this._starLine);
		}
		this._starLine.alpha = 1;
		this._starLine.visible = true;
		this._starLine.anchorOffsetX = 94;
		this._starLine.anchorOffsetY = 293;
		this._starLine.x = startPosX;
		this._starLine.y = startPosY;
		let bet = -180/Math.PI * Math.atan((startPosX - overPosX)/(startPosY - overPosY));
		this._starLine.rotation = bet;
		//94 57  ---- 94 293

		let len = Math.sqrt(Math.pow(startPosX - overPosX,2) + Math.pow(startPosY - overPosY,2));
		// this._starLine.scaleY = len /(300 -70);
		let baseScaleY = 0.3;
		let lineA = 1;
		if(findItemIndex > -1){
			lineA = 1;
		} else {
			lineA = 0.5;
		}
		let maxScaleY = len / (293 - 57);
		this._starLine.scaleY = baseScaleY;
		egret.Tween.get(this._starLine)
		.to({scaleY:maxScaleY},150)
		.set({anchorOffsetX: 94,anchorOffsetY : 57,x:overPosX,y:overPosY})
		.call(()=>{

			if(findItemIndex > -1){
				let star = null;
				if(pos.isBig){
					star = BaseBitmap.create(this.getDefaultRes("acstargazer_star1_"+(findItemIndex+1)));
				} else {
					star = BaseBitmap.create(this.getDefaultRes("acstargazer_star2_"+(findItemIndex+1)));
				}
				star.x = pos.x;
				star.y = pos.y;
				this["_starMap"+findItemIndex].addChild(star);

				// if(findItemIndex == 0){
				// 	let star2 = null;
				// 	if(pos.isBig){
				// 		star2 = BaseBitmap.create(this.getDefaultRes("acstargazer_star1_"+(findItemIndex+1)));
				// 	} else {
				// 		star2 = BaseBitmap.create(this.getDefaultRes("acstargazer_star2_"+(findItemIndex+1)));
				// 	}
				// 	star2.x = pos.x;
				// 	star2.y = pos.y;
				// 	this["_starMap4"].addChild(star2);
				// }
			}
			if(!this._lightoverEffect){
				this._lightoverEffect = ComponentManager.getCustomMovieClip("acstargazer_lightover",7,70);

				this.addChildToContainer(this._lightoverEffect);
				this._lightoverEffect.setEndCallBack(()=>{
					this._lightoverEffect.visible = false;
				},this)
			}
			if(findItemIndex > -1){
				this._lightoverEffect.alpha = 1;
			} else {
				this._lightoverEffect.alpha = 0.5;
			}
			this._lightoverEffect.x = overPosX - 217/2;
			this._lightoverEffect.y = overPosY - 219/2;
			this._lightoverEffect.visible = true;
			this._lightoverEffect.playWithTime(1);



		})
		.to({scaleY:baseScaleY,alpha:lineA},150)
		.to({alpha:0},40)
		.call(()=>{
			this._starLine.visible = false;
			// egret.Tween.get(this)
			// .wait(1000)
			// .call(this.showReward,this,[findItemIndex,isFind]);
		})
		.wait(500)
		.call(this.checkReward,this,[findItemIndex,isFind]);

	}
	private checkReward(findItemIndex,isFind):void {
		this._aniPlaying = false;
		if(findItemIndex > -1){
					
			this.showReward(findItemIndex,isFind);
		} else {
			let popdata = {aid:this.aid,code:this.code,rewards:this._reward,isFind:isFind,findItemIndex:findItemIndex};
			ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZERPOPUPVIEW,popdata);
		}
	}


	private showReward(findItemIndex,isFind):void {
		this._aniPlaying = false;
		// this.resetCircle();
		// let isFind = false;
		let RansackItemID = this.cfg.RansackItemID;


		this._aniPlaying = false;
		let popdata = {aid:this.aid,code:this.code,rewards:this._reward,isFind:isFind,findItemIndex:findItemIndex};
		ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZERPOPUPVIEW,popdata);

		// if(findItemIndex > -1){
		// 	let itemId = RansackItemID[findItemIndex];
		// 	let zzNum = this._acvo.getItemNumByIndex(String(itemId));
		// 	if(zzNum == this.cfg.RansackItemNum || zzNum % 3 == 0){
		// 		ViewController.getInstance().openView(ViewConst.POPUP.ACSTARGAZERGUIDSTORYVIEW,{aid:this.aid,code:this.code,zzNum:zzNum,findItemIndex:findItemIndex});
		// 	}
		// }
	}

	private showText(): void {
		//顶部背景图片
		let forpeople_top = BaseBitmap.create(this.getDefaultRes("acstargazer_topbg"));
		forpeople_top.y = 69;//-15;
		this.addChildToContainer(forpeople_top);

        let people = BaseBitmap.create(this.getDefaultRes("acstargazersingle_show"));
        people.x = forpeople_top.x + forpeople_top.width - people.width;
        people.y = forpeople_top.y ;
        this.addChildToContainer(people);
		this._topBg = forpeople_top;


		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 20;
		this._activityTimerText.y = forpeople_top.y + 12;
		this._activityTimerText.text  = this.acVo.getAcLocalTime(true,"0x00ff00");
		this.addChildToContainer(this._activityTimerText);

		let deltaY = 3;
		// if(PlatformManager.checkIsViSp()){
		// 	deltaY = 5;
		// }

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
		// acCDTxt.text = LanguageManager.getlocal("acStargazerSingle_acCD", [""]);
		
		// acCDTxt.x = this._activityTimerText.y;
		// acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
		// this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

		let deltaT = this.acVo.et - GameData.serverTime;
		let cdStrK = "acStargazerSingle_acCD";

		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 8)]);
			this._acCDTxt.x = this._activityTimerText.x;
			this._acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 3;
			
		} else {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acStargazerSingle_acCDEnd")]);
		}
		this._acCDTxt.x = this._activityTimerText.x;
		this._acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 3;
		this.addChildToContainer(acCDTxt);



		let cfg = this.acVo.config;
		let skincfg = Config.ServantskinCfg.getServantSkinItemById(cfg.TraitorSkinId);
		let servantCfg = Config.ServantCfg.getServantItemById(cfg.TraitorId);
		//规则
		this._ruleText = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._ruleText.multiline = true;
		this._ruleText.width = 437;//475;//GameConfig.stageWidth - this._activityTimerText.x - 10;
		this._ruleText.lineSpacing = 2;
		this._ruleText.x = this._activityTimerText.x;
		this._ruleText.y = this._acCDTxt.y + this._acCDTxt.height + deltaY;
		this._ruleText.text = LanguageManager.getlocal(this.getDefaultCn("acStargazerSingle_desc"),[cfg.cost,servantCfg.name,cfg.RansackItemNum,skincfg.getSkinName()]);
		this.addChildToContainer(this._ruleText);

        
	
        let isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(cfg.TraitorSkinId));
        let txt = null;//ransackTraitorSP_txt6
        if(isOwn){
            txt = LanguageManager.getlocal("acStargazerSingle_starNumOver",[LanguageManager.getlocal("servant_name"+ skincfg.servantId)]);
        } else {
            txt = LanguageManager.getlocal("acStargazerSingle_starNum",[LanguageManager.getlocal("servant_name"+ skincfg.servantId),this._acvo.getItemNumByIndex(String(cfg.RansackItemID)),cfg.RansackItemNum]);
        }
        this._inOrderText1 = ComponentManager.getTextField(txt, 19, 0xfedb39);
		this._inOrderText1.x = this._ruleText.x;
		this._inOrderText1.y = this._ruleText.y + this._ruleText.height + 5; 
        this.addChildToContainer(this._inOrderText1);


	


		// let exchangeShop = cfg.exchangeShop;
		// for(let i = 0; i < exchangeShop.length; i++){
		// 	let shopItem = exchangeShop[i];
		// 	let skincfg = Config.ServantskinCfg.getServantSkinItemById(shopItem.skinID);

		// 	let isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(shopItem.skinID));
		// 	let txt = null;//ransackTraitorSP_txt6
		// 	if(isOwn){
		// 		txt = LanguageManager.getlocal("acStargazerSingle_starNumOver",[LanguageManager.getlocal("servant_name"+ skincfg.servantId)]);
		// 	} else {
		// 		txt = LanguageManager.getlocal("acStargazerSingle_starNum",[LanguageManager.getlocal("servant_name"+ skincfg.servantId),this._acvo.getItemNumByIndex(String(shopItem.itemID)),shopItem["proofNum"]]);
		// 	}
			
		// 	//罪证
		// 	// this._inOrderText1 = ComponentManager.getTextField("", 19, 0xfedb39);
		// 	this["_inOrderText"+(i + 1)] = ComponentManager.getTextField("", 19, 0xfedb39);
		// 	this["_inOrderText"+(i + 1)].text = txt;
		// 	if(i == 0){
		// 		this["_inOrderText"+(i + 1)].x = this._ruleText.x;
		// 		this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY; 
		// 	} else if(i == 1){
		// 		this["_inOrderText"+(i + 1)].x = this._ruleText.x + 400;//this._ruleText.width - this["_inOrderText"+(i + 1)].width;
		// 		this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY; 
		// 	} else if(i == 2){
		// 		this["_inOrderText"+(i + 1)].x = this._activityTimerText.x;
		// 		this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText"+(i + 1)].height + deltaY; 
		// 	} else if(i == 3){
		// 		this["_inOrderText"+(i + 1)].x = this._ruleText.x + 400;//this._ruleText.width - this["_inOrderText"+(i + 1)].width;
		// 		this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText"+(i + 1)].height + deltaY; 
		// 	}

		// 	this.addChildToContainer(this["_inOrderText"+(i + 1)]);
		// }


	}

	private rewardBoxHandler()
	{

	}
	public tick(): boolean {
		let deltaT = this.acVo.et - GameData.serverTime;
		let cdStrK = "acStargazerSingle_acCD";

		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 8)]);
			this._acCDTxt.x = this._activityTimerText.x;
			this._acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 3;
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acStargazerSingle_acCDEnd")]);
		}
		this._acCDTxt.x = this._activityTimerText.x;
		this._acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 3;
		return false;
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([

			this.getDefaultRes("acstargazer_bg"),
			this.getDefaultRes("acstargazer_bottom"),
			this.getDefaultRes("acstargazer_centerbtn"),
			this.getDefaultRes("acstargazer_changebtn"),
			// this.getDefaultRes("acstargazer_circlemask"),
			this.getDefaultRes("acstargazer_innercircle"),
			this.getDefaultRes("acstargazer_namebg"),
			this.getDefaultRes("acstargazer_outercircle"),
			this.getDefaultRes("acstargazer_rechargebtn"),
			this.getDefaultRes("acstargazer_star1_1"),
			this.getDefaultRes("acstargazer_star1_2"),
			this.getDefaultRes("acstargazer_star1_3"),
			this.getDefaultRes("acstargazer_star1_4"),
			this.getDefaultRes("acstargazer_star2_1"),
			this.getDefaultRes("acstargazer_star2_2"),
			this.getDefaultRes("acstargazer_star2_3"),
			this.getDefaultRes("acstargazer_star2_4"),
			this.getDefaultRes("acstargazer_starimg_1"),
			this.getDefaultRes("acstargazer_starimg_2"),
			this.getDefaultRes("acstargazer_starimg_3"),
			this.getDefaultRes("acstargazer_starimg_4"),

			this.getDefaultRes("acstargazer_changebg"),
			this.getDefaultRes("acstargazer_changefb"),

			this.getDefaultRes("acstargazersingle_firstbg"),
            
            this.getDefaultRes("acstargazersingle_titletxt"),

			this.getDefaultRes("acstargazer_topbg"),
			// this.getDefaultRes("acstargazersingle_topbg"),
            // this.getDefaultRes("acstargazersingle_box1"),
            // this.getDefaultRes("acstargazersingle_box2"),
            // this.getDefaultRes("acstargazersingle_box3"),
            // this.getDefaultRes("acstargazersingle_progressbar"),
            // this.getDefaultRes("acstargazersingle_progressbg"),
            // this.getDefaultRes("acstargazersingle_progressmark"),
            this.getDefaultRes("acstargazersingle_show"),



			"acrechargeboxspview_title_bg7",
			"ransackTraitorSP_exchangetxt",
			"ransackTraitorSP_rechargetxt",
			// "ransackTraitorSP_leftbtn",
			// "oneyear_flag",
			"ransackTraitor_txt3",
			"itemeffect",
			"ransackTraitor_leftimg",
			"wifeview_xinxibanbg",
			"servant_star",
			"acstargazer_starline"
	
		]);
	}
    protected getTitleBgName():string
	{
		return "acrechargeboxspview_title_bg7";
    }
	protected getTitleStr():string
	{
		return "";
	}
	// protected getRuleInfo():string
	// {
	// 	return "ransackTraitorSPRuleInfo" + this.code;
	// }
	protected getRuleParam():string[]{
		let cfg = this.acVo.config;
		return [cfg.cost,cfg.RansackItemNum,cfg.RansackItemNum];
	}
	public dispose(): void {
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN,this.refreshUIInfos,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_STARGAZERSINGLEVO_REFRESH,this.refreshUIInfos,this);
			
		egret.Tween.removeTweens(this);
		
		this._activityTimerText = null;
		this._acCDTxt = null;
		this._ruleText = null;


		this._inOrderText1 = null;
		this._inOrderText2 = null;
		this._inOrderText3 = null;
		this._inOrderText4 = null;


		this._rewardLookBtn = null;
		this._aniPlaying = false;

		this._acvo = undefined;

		this._rechargeBg = null;
		this._rewardLookBg = null;

		this._searchtxt = null;
		this._searchdesc = null;

		this._searchBtn = null;

		if(this._bg1){
			egret.Tween.removeTweens(this._bg1);
		}
		if(this._bg2){
			egret.Tween.removeTweens(this._bg2);
		}
		if(this._innerCircle){
			egret.Tween.removeTweens(this._innerCircle);
		}
		if(this._outerCircle){
			egret.Tween.removeTweens(this._outerCircle);
		}
		if(this._centerCircle){
			egret.Tween.removeTweens(this._centerCircle);
		}
		if(this._temp){
			egret.Tween.removeTweens(this._temp);
		}
		this._bg1 = null;
		this._bg2 = null;

		this._innerCircle = null;
		this._outerCircle = null;
		this._centerCircle = null;
		this._starMap0 = null;
		this._starMap1 = null;
		this._starMap2 = null;
		this._starMap3 = null;
		this._starMap4 = null;
		this._cfg = null;
		this._reward = null;

		if(this._starLine){
			egret.Tween.removeTweens(this._starLine);
		}
		this._btnidleEffect = null;
		this._btnclickEffect = null;
		this._lightoverEffect = null;
		this._lightstartEffect = null;

		this._starLine = null;
		this._topBg = null;
		this._bottomBg = null;
		this._circleEffect = null;
		this._progress = null;
		
		this._temp = null;
		super.dispose();
	}

}