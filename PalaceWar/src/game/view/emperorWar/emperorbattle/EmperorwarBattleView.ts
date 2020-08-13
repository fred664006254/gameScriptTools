class EmperorwarBattleView extends BaseBattleView
{	

	
	private _reportVoApi:EmperorwarReportVoApi = null;
	//1 上  2 下
	private _headTab1:BaseDisplayObjectContainer[] = [];
	private _headTab2:BaseDisplayObjectContainer[] = [];
	private _roundText:BaseBitmapText|BaseTextField = null;
	private _maskTab1:BaseBitmap[] = [];
	private _maskTab2:BaseBitmap[] = [];

	private _roundBg:BaseBitmap = null;
	private _roundBitmap:BaseBitmap = null;
	private _skipBtn:BaseButton = null;
	private _skip = false;
	//数据
	private _curRound:number = 0;
	private _curIdex:number = 0;
	private _curRoundFirst:number = 0;
	private _isEnd:boolean = false;
	private _winTab:number[] = [0,0];
	private _isPause:boolean = false;


	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"emperor_battle_round","emperor_battle_top_bg","emperor_hero_bg",
			"emperor_hero_empty","emperor_round_1","emperor_round_2","emperor_round_3","emperor_round_4","emperor_round_5","servant_empty","atkracecross_win","atkracecross_loss",
			"atkrace_battle_info","atkrace_skip","progress7_bg","progress8","emperor_round_bg","specialview_commoni_namebg"
		]);
	}

	protected getBgName():string
	{
		return "emperorwarbg3";
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,640,1136);
			this.viewBg = BaseLoadBitmap.create(bgName,rect);
			this.viewBg.setPosition(0,0);
			this.addChild(this.viewBg); 
		}
	}

	protected getSoundBgName():string
	{
		return SoundConst.MUSIC_CHALLENGE;
	}

	protected getCloseBtnName():string
	{
		return null;
	}
	protected getTitleStr():string
	{
		return null;
	}
	protected getTitleBgName():string
	{
		return null;
	}


	protected initView():void
	{	

		if (this.param.data.test)
		{
			let info:any[] = [
					[1,1,{},{"quality":4,"cheer":0,"attr":40,name:"dsfsdfsdfs","pic":1,"level":1,"fullattr":414},{"quality":4,"cheer":0,"attr":-360,name:"23123123","pic":2,"level":1,"fullattr":414}],
					[1,1,[[0,0]],
						{weaponDps:999,level:100,"sid":"1001","quality":10019786439,"lv":400,"attr":49,"fullattr":49,"s1lv":1,"s2lv":1,"clv":6},
						{}],
					[2,2,[[0,20222730]],
						{weaponDps:999,level:100,"sid":"1001","quality":224697,"lv":400,"attr":14,"fullattr":14,"s1lv":1,"s2lv":1,"clv":0},
						{weaponDps:999,level:100,"sid":"1001","quality":19505168,"lv":350,"attr":-20221408,"fullattr":1322,"s1lv":29,"s2lv":11,"clv":5}],
					[2,2,[[0,600],[0,20222730],[0,20222730]],
						{weaponDps:999,level:100,"sid":"1001","quality":6,"lv":190,"attr":-69698,"fullattr":21832,"s1lv":1,"s2lv":1,"clv":2},
						{weaponDps:999,level:100,"sid":"1001","quality":1017,"lv":350,"attr":14114392,"fullattr":14114992,"s1lv":24,"s2lv":12,"clv":5}],
					[1,1,[[0,20222730],[0,20222730],[0,20222730]],
							{weaponDps:999,level:100,"sid":"1001","quality":1650,"lv":51,"attr":6,"fullattr":6,"s1lv":1,"s2lv":1,"clv":0},
							{weaponDps:999,level:100,"sid":"1001","quality":13963520,"lv":350,"attr":-147446,"fullattr":1054,"s1lv":28,"s2lv":12,"clv":5}]
				];
			
			this._reportVoApi = new EmperorwarReportVoApi();
			this._reportVoApi.formatData(info);
		}
		else
		{
			this._reportVoApi = this.param.data.voApi;
		}

		this.initTopInfo();
		this._skip = false;
		this._skipBtn = ComponentManager.getButton("atkrace_skip",null,this.skipBattle,this);
		this._skipBtn.setPosition(GameConfig.stageWidth-this._skipBtn.width-12,145);
		this.addChild(this._skipBtn);
		this._skipBtn.visible = false;

		this.roundBeginAnim();


	}

	private initTopInfo():void
	{
		let topBg:BaseBitmap = BaseBitmap.create("emperor_battle_top_bg");
		this.addChild(topBg);

		let info:any[] = this._reportVoApi.getCompetitorInfo(1);

		// let playerHead1 = Api.playerVoApi.getPlayerCircleHead(info[0].pic,info[0].phototitle);
		let playerHead1 = Api.playerVoApi.getPlayerCircleHead(info[0].pic,info[0].phototitle);
		playerHead1.setPosition(3 ,8);
		this.addChild(playerHead1);

		// let playerHead2 = Api.playerVoApi.getPlayerCircleHead(info[1].pic,info[1].phototitle);
		let playerHead2 = Api.playerVoApi.getPlayerCircleHead(info[1].pic,info[1].phototitle);
		playerHead2.setPosition(GameConfig.stageWidth-playerHead1.x - playerHead2.width,playerHead1.y);
		this.addChild(playerHead2);

		this._headTab1.push(playerHead1);
		this._headTab2.push(playerHead2);

		let maskHead1:BaseBitmap = BaseBitmap.create("public_9_bg11");
		maskHead1.width = playerHead1.width;
		maskHead1.height = playerHead1.height;
		maskHead1.x = playerHead1.x;
		maskHead1.y = 0;
		this.addChild(maskHead1);
		maskHead1.visible = false;

		let maskHead2:BaseBitmap = BaseBitmap.create("public_9_bg11");
		maskHead2.width = GameConfig.stageWidth - playerHead2.x;
		maskHead2.height = playerHead2.height;
		maskHead2.x = GameConfig.stageWidth - maskHead2.width;
		maskHead2.y = 0;
		this.addChild(maskHead2);
		maskHead2.visible = false;

		this._maskTab1.push(maskHead1);
		this._maskTab2.push(maskHead2);

		for (let i = 0; i<4; i++)
		{	
			let playerInfo:any[] = this._reportVoApi.getCompetitorInfo(i+2);

			let leftHeroContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			leftHeroContainer.setPosition(107 + i*45 ,8);
			this.addChild(leftHeroContainer);

			let heroBg:BaseBitmap = BaseBitmap.create("emperor_hero_bg");
			leftHeroContainer.addChild(heroBg);

			
			let servantPic:string 
			if (playerInfo[0].sid)
			{				
				if (this._reportVoApi.getIsMeJoin())
				{
					servantPic = Api.servantVoApi.getServantObj(playerInfo[0].sid).halfImgPath;
				}
				else
				{
					if(playerInfo[0].equip){
						servantPic = `skin_half_${playerInfo[0].equip}`
					}
					else{
						servantPic = Config.ServantCfg.getServantItemById(playerInfo[0].sid).halfIcon;
					}
					
				}
			}
			else
			{
				servantPic = "emperor_hero_empty";
			}
			let servantIcon;
			
			if (playerInfo[0].sid)
			{	
				let rect = egret.Rectangle.create();
				rect.setTo(0,0,180,177);
				servantIcon = BaseLoadBitmap.create(servantPic,rect);
				servantIcon.setScale((heroBg.height-4)/servantIcon.height);
				let mask = egret.Rectangle.create();
				mask.setTo(90-heroBg.width/2,0,(heroBg.width-4)/servantIcon.scaleX,(heroBg.height-5)/servantIcon.scaleY);
				servantIcon.mask = mask;
				servantIcon.setPosition(-64*servantIcon.scaleX,2);
			}
			else
			{
				servantIcon = BaseBitmap.create(servantPic);
				servantIcon.setPosition(0,2);
			}
			
			leftHeroContainer.addChild(servantIcon);
			this._headTab1.push(leftHeroContainer);
			
			let maskHero1:BaseBitmap = BaseBitmap.create("public_9_bg11");
			maskHero1.width = heroBg.width;
			maskHero1.height = heroBg.height;
			maskHero1.x = leftHeroContainer.x;
			maskHero1.y = leftHeroContainer.y;
			this.addChild(maskHero1);
			this._maskTab1.push(maskHero1);
			maskHero1.visible = false;

			//右边
			let leftHeroContainer2:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			leftHeroContainer2.setPosition(GameConfig.stageWidth- 152 - i*45 ,8);
			this.addChild(leftHeroContainer2);

			let heroBg2:BaseBitmap = BaseBitmap.create("emperor_hero_bg");
			leftHeroContainer2.addChild(heroBg2);

			
			let servantPic2:string 
			if (playerInfo[1].sid)
			{
				if(playerInfo[1].equip){
					servantPic2 = `skin_half_${playerInfo[1].equip}`
				}
				else{
					servantPic2 = Config.ServantCfg.getServantItemById(playerInfo[1].sid).halfIcon;
				}
			}
			else
			{
				servantPic2 = "emperor_hero_empty";
			}
			let servantIcon2 ;
			if (playerInfo[1].sid)
			{	
				let rect2 = egret.Rectangle.create();
				rect2.setTo(0,0,180,177);
				servantIcon2 = BaseLoadBitmap.create(servantPic2,rect2);
				servantIcon2.setScale((heroBg2.height-4)/servantIcon2.height);
				let mask2 = egret.Rectangle.create();
				mask2.setTo(90-heroBg2.width/2,0,(heroBg2.width-4)/servantIcon2.scaleX,(heroBg2.height-5)/servantIcon2.scaleY);
				servantIcon2.mask = mask2;
				servantIcon2.setPosition(-64*servantIcon2.scaleX,2);
			}
			else
			{
				servantIcon2 = BaseBitmap.create(servantPic2);
				servantIcon2.setPosition(0,2);
			}
			
			
			
			leftHeroContainer2.addChild(servantIcon2);
			this._headTab2.push(leftHeroContainer2);
			
			let maskHero2:BaseBitmap = BaseBitmap.create("public_9_bg11");
			maskHero2.width = heroBg.width;
			maskHero2.height = heroBg.height;
			maskHero2.x = leftHeroContainer2.x;
			maskHero2.y = leftHeroContainer2.y;
			this.addChild(maskHero2);
			this._maskTab2.push(maskHero2);
			maskHero2.visible = false;
		}

		let roundBg:BaseBitmap = BaseBitmap.create("emperor_battle_round");
		roundBg.setPosition(GameConfig.stageWidth/2 - roundBg.width/2 ,0);
		this.addChild(roundBg);

		this._roundText = ComponentManager.getBitmapText("1",TextFieldConst.FONTNAME_BOSS_SCORE);
		this._roundText.setPosition(GameConfig.stageWidth/2 - this._roundText.width/2 ,45);
		this.addChild(this._roundText);
		if(PlatformManager.checkIsEnSp())
		{
			this._roundText.setPosition(GameConfig.stageWidth/2 - this._roundText.width/2 ,54);
		}

 
	}

	private roundBeginAnim():void
	{	
		this._curRound++;
		this._roundText.text = String(this._curRound);
		if (this._upHero)
		{
			this._upHero.visible = false;
		}
		if (this._downHero)
		{
			this._downHero.visible = false;
		}
		if (this._bottomProgress)
		{
			this._bottomProgress.visible = false;
		}
		if (this._topProgress)
		{
			this._topProgress.visible = false;
		}
		this._skipBtn.visible = false;

		this.removeRoundAnim();

		this._roundBg = BaseBitmap.create("emperor_round_bg");
		this._roundBg.setPosition(-this._roundBg.width ,GameConfig.stageHeigth/2 - 50);
		this.addChild(this._roundBg);

		this._roundBitmap = BaseBitmap.create("emperor_round_"+this._curRound);
		this._roundBitmap.setPosition(GameConfig.stageWidth ,this._roundBg.y + this._roundBg.height/2 - this._roundBitmap.height/2);
		this.addChild(this._roundBitmap);

		egret.Tween.get(this._roundBg).to({x:GameConfig.stageWidth/2-this._roundBg.width/2},600);
		egret.Tween.get(this._roundBitmap).to({x:GameConfig.stageWidth/2-this._roundBitmap.width/2},500).wait(600).call(this.roundBegin,this);
	}

	private removeRoundAnim():void
	{
		if (this._roundBg)
		{
			egret.Tween.removeTweens(this._roundBg);
			this.removeChild(this._roundBg);
			this._roundBg=null;
		}
		if (this._roundBitmap)
		{
			egret.Tween.removeTweens(this._roundBitmap);
			this.removeChild(this._roundBitmap);
			this._roundBitmap=null;
		}
	}

	private roundBegin():void	{	

		this._skipBtn.visible = true;
		this._isPause= false;
		this.removeRoundAnim();
		this._curIdex = 1;
		this._curRoundFirst = this._reportVoApi.getFirstHandByRound(this._curRound)%2;

		let bloods:number[] = this._reportVoApi.getBattleBloodByRound(this._curRound);
		this._topMaxValue= bloods[1]==null?0:bloods[1];
		this._bottomMaxValue=bloods[0]==null?0:bloods[0];
		this.setTopProgress(bloods[1],bloods[1]);
		this._topProgress.y = 117;
		this.setBottomProgress(bloods[0],bloods[0]);
		

		let playerInfo:any[] = this._reportVoApi.getCompetitorInfo(this._curRound);
		if (this._curRound == 1)
		{
			this.setUpHero(null,playerInfo[1],4);
			this.setDownHero(null,playerInfo[0],4);
		}
		else 
		{	
			if (playerInfo[1].sid)
			{
				let flag = false;
				let upHeroPic:string = ``;
				if(playerInfo[1].equip){
					upHeroPic = `skin_full_${playerInfo[1].equip}`;
					flag = true;
				}
				else{
					upHeroPic = Config.ServantCfg.getServantItemById(playerInfo[1].sid).fullIcon;
				}
				this.setUpHero(upHeroPic,{level:playerInfo[1].lv,name:LanguageManager.getlocal("servant_name"+playerInfo[1].sid),quality:playerInfo[1].quality,pos:this._curRound-1},0,flag);
			}
			else
			{
				this.setUpHero(null);
			}
			if (playerInfo[0].sid)
			{
				let downPic:string ;
				let flag = false;
				if (this._reportVoApi.getIsMeJoin())
				{
					downPic = Api.servantVoApi.getFullImgPathWithId(playerInfo[0].sid);
				}
				else
				{
					if(playerInfo[0].equip){
						flag = true;
						downPic = `skin_full_${playerInfo[0].equip}`
					}
					else{
						downPic = Config.ServantCfg.getServantItemById(playerInfo[0].sid).fullIcon;
					}
					
				}
				this.setDownHero(downPic,{level:playerInfo[0].lv,name:LanguageManager.getlocal("servant_name"+playerInfo[0].sid),quality:playerInfo[0].quality,pos:this._curRound-1},0,flag);
			}
			else
			{
				this.setDownHero(null);
			}
			
		
		}		
		this._upHero.x = 17;
		this._downHero.x = 280;
		this._upHero.y = 140;
		this._downHero.y = GameConfig.stageHeigth - 420;
		this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
		this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);

		this._upHero.visible = true;
		this._downHero.visible = true;
		this._topProgress.visible = true;
		this._bottomProgress.visible = true;


		egret.Tween.get(this._upHero).wait(600).call(this.checkWeapon,this);
	}

	private checkWeapon():void
	{	
		if (this._curRound == 1)
		{	
			this.checkWeaponBack();
			return;
		}

		let playerInfo:any[] = this._reportVoApi.getCompetitorInfo(this._curRound);

		let serId = playerInfo[0].sid;
		let serId2 = playerInfo[1].sid;


		let value1 = playerInfo[0].weaponDps;
		let value2 = playerInfo[1].weaponDps;
		
		if (!value1 && !value2)
		{	
			this.checkWeaponBack();
			return;
		}		

		ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW,{
			sid:serId,
			type:1,
			atype:4,
			value:value1,
			sid2:serId2,
			type2:4,
			atype2:4,
			value2:value2,
			f:this.checkWeaponBack,
			o:this,
			auto: false,
		});
	}

	private checkWeaponBack(skip:number = 0):void
	{	
		if (this && this.isShow())
		{
			if (skip == 0)
			{
				this.showRound();
			}
			else if (skip == 1)
			{
				this._downHero.showLight(this.showRound,this);
			}
			else if (skip == 2)
			{
				this._upHero.showLight(this.showRound,this);
			}
			else if (skip == 3)
			{	
				this._upHero.showLight();
				this._downHero.showLight(this.showRound,this);
			}
			else
			{
				this.showRound();
			}
		}
		
	}

	/**
	 * 开始一回合战斗
	 */
	private showRound():void
	{	
		if (this._topCurValue >0 && this._bottomCurValue >0) {

			let area:number = 1;
			if (this._curRoundFirst != this._curIdex%2)
			{
				area = 2;
			}
			let reportInfo:number[];
			if (this._curRound == 1)
			{	
				// let pos:number = this._curIdex%2 == 1 ? 1:2;
				reportInfo =  this._reportVoApi.getReportByRoundAndIndex(this._curRound, this._curIdex,area);
			}
			else
			{
				reportInfo =  this._reportVoApi.getReportByRoundAndIndex(this._curRound, this._curIdex);
			}

			let round = 5;
			if(this._curRound > 0 && this._curIdex > 1 && ((this._curIdex-1) % (2*round) == 0))
			{
				this.showWinBattle(LanguageManager.getlocal(`acThreeKingdomsbattletip7`, [String(Math.floor(this._curIdex/2))]), false, true);
				egret.Tween.get(this).wait(1300).call(()=>{
					this.attackHandle(area,reportInfo[1],reportInfo[0]==1);
					this._curIdex++;
				});
			}
			else
			{
				this.attackHandle(area,reportInfo[1],reportInfo[0]==1);
				this._curIdex++;
			}
		}
		else {
			this.showEndGameBefore();
		}
	}

	private showWinBattle(str : string, isup : boolean, ismiddle = false):void{
        let view = this;
        let descbg = BaseBitmap.create(`specialview_commoni_namebg`);
        let tipTxt = ComponentManager.getTextField(str, 22);
        tipTxt.lineSpacing = 6;
        descbg.height = 92;
        descbg.width = 392;

        if(ismiddle){
           descbg.setPosition(GameConfig.stageWidth/2-descbg.width/2,GameConfig.stageHeigth/2-descbg.height/2);
        }
        else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, isup ? this._upHero : this._downHero, [0,150]);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
        this.addChild(descbg);
        this.addChild(tipTxt);
        descbg.alpha = 0;
        tipTxt.alpha = 0;

        egret.Tween.get(descbg).to({alpha : 1}, 200).wait(800).to({alpha : 0}, 200).call(()=>{
            descbg.dispose();
            descbg = null;
        },this);

        egret.Tween.get(tipTxt).to({alpha : 1}, 200).wait(800).to({alpha : 0}, 200).call(()=>{
            tipTxt.dispose();
            tipTxt = null;
        },this);
    }

	private showEndGameBefore():void
	{	
		let failMan:BattleHero;


		if (this._reportVoApi.getBattleResultByRound(this._curRound) == 1) {
			failMan = this._upHero;
		}
		else {
			
			failMan = this._downHero;
		}
		egret.Tween.get(failMan).to({alpha:0},800).call(this.showEndGame,this);


	}


	private skipBattle():void
	{
		if (this._isEnd != true) {
			if(!this._skip){
				this.showLoadingMask();
				this._skip = true;
				this._isPause = true;
			}
		}
	}

	protected atkEndCallback():void
	{	
		if(this._isPause && this._skip){
			this.hideLoadingMask();
			this.showEndGame();
			this._skip = false;
		}
		if (this._isEnd != true && this._isPause!=true) {
			this.showRound();
		}
	}

	private showEndGame():void
	{	
		if (this._isEnd )
		{
			return;
		}

		this.removeRoundAnim();
		this._upHero.clearHero();
		this._downHero.clearHero();
		this.showMaskAndWin(this._curRound);

		if (this._curRound>=5) 
		{
			this.showGameOver();
		}
		else {
			let curRoundResult:number = this._reportVoApi.getBattleResultByRound(this._curRound);
			ViewController.getInstance().openView(ViewConst.BASE.EMPERORWARROUNDRESULTVIEW,{f:this.endCallBack,o:this,result:curRoundResult});
		}
	}

	private showGameOver():void
	{	
		this._isEnd = true;
		for (let i = 1; i<=5; i++)
		{
			let curRoundResult:number = this._reportVoApi.getBattleResultByRound(i);
			this._winTab[curRoundResult-1]++;
		}
		
		if (this._winTab[0]>=3)
		{
			let info:any[] = this._reportVoApi.getCompetitorInfo(1);
			let nameTab:string[] = [];
			nameTab.push(info[0].name,info[1].name);
			ViewController.getInstance().openView(ViewConst.BASE.EMPERORWARBATTLERESULTVIEW,{f:this.endCallBack,o:this,result:1,names:nameTab});
		}
		else if (this._winTab[1]>=3)
		{
			let info:any[] = this._reportVoApi.getCompetitorInfo(1);
			let nameTab:string[] = [];
			nameTab.push(info[1].name,info[0].name);
			ViewController.getInstance().openView(ViewConst.BASE.EMPERORWARBATTLERESULTVIEW,{f:this.endCallBack,o:this,result:2,names:nameTab});
		}
	}

	private endCallBack():void
	{	
		if (this._isEnd == true) {
			this.hide();
		}
		else
		{
			this.roundBeginAnim();
		}
	}

	private showMaskAndWin(round:number):void
	{	
		let mask1:BaseBitmap = this._maskTab1[round-1];
		let mask2:BaseBitmap = this._maskTab2[round-1];

		mask1.visible = true;
		mask2.visible = true;

		let resultIcon1:string ;
		let resultIcon2:string ;
		if ( this._reportVoApi.getBattleResultByRound(round)==1)
		{
			resultIcon1 = "atkracecross_win";
			resultIcon2 = "atkracecross_loss";
		}
		else 
		{
			resultIcon2 = "atkracecross_win";
			resultIcon1 = "atkracecross_loss";
		}
		let result1:BaseBitmap = BaseBitmap.create(resultIcon1);
		result1.setPosition(mask1.x + mask1.width/2 - result1.width/2, mask1.y + mask1.height/2 - result1.height/2);
		this.addChild(result1);

		let result2:BaseBitmap = BaseBitmap.create(resultIcon2);
		result2.setPosition(mask2.x +mask2.width/2 - result2.width/2, mask2.y  + mask2.height/2 - result2.height/2);
		this.addChild(result2);
	}

	public dispose():void
	{	
		this._isEnd = false;

		this._headTab1.length = 0;
		this._headTab2.length = 0;
		this._maskTab1.length = 0;
		this._maskTab2.length = 0;
		this._roundText = null;
		this._curRound = 0;
		this._curIdex = 0;
		this._curRoundFirst = 0;
		this._reportVoApi = null;
		this._winTab = [0,0];
		this._roundBg = null;
		this._roundBitmap = null;
		this._isPause = false;
		this._skipBtn = null;
		this._skip = false;

		super.dispose();
	}
}