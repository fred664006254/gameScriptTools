/**
 * 战斗中 玩家 或 npc 信息小板
 * author shaoliang
 * date 2017/9/21
 * @class BattleInfo
 */

class BattleInfo extends BaseDisplayObjectContainer
 {

	private _progressBar:ProgressBar;
	private _totalNum:number;
	private _curNum:number;
	private _force:BaseTextField;
	private _name:BaseTextField;
	/**
	 * 是不是玩家
	 */
	private _isHero:boolean;
	private _npcHead:BaseLoadBitmap;

	public constructor() {
		super();
	}

	/**
	 * 初始化
	 * 总的兵力
	 * @param params 信息 自己不传，npc传。
	 */
	public init(totalNum:number, params?:any , info?:any,isconquest?:boolean):void
	{
		this._totalNum = totalNum;
		if (!params) {
			this._isHero = false;
		}
		else {
			this._isHero = true;
		}

		let scale9Bg:BaseBitmap = BaseBitmap.create("battle_info_bg");
		scale9Bg.width = 400;//445;//376;
		

		this.addChild(scale9Bg);

		let forceNum:number;
		let progressBarPic:string;
		let nameStr:string;
		let officerTitleStr:string;
		
		let show:number;
		
		if (this._isHero ) {
			forceNum=Api.playerVoApi.getAtk();
			// progressBarPic="progress_type1_yellow";
			progressBarPic="progress_type1_yellow2";
			nameStr=Api.playerVoApi.getPlayerName();
			officerTitleStr=Api.playerVoApi.getPlayerOffice();
		}
		else {
			if (info) {
				show = info.show;
				let number  = 10;
				if(isconquest)
				{
					number = 5000;
				}
				forceNum=Math.ceil(this._totalNum/number);
				officerTitleStr=LanguageManager.getlocal("dailybossNameType1",[String(info.cid)]);
				nameStr=LanguageManager.getlocal("BossName"+show);
			}
			else {
				let challengeConfig:any = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
				show = challengeConfig.show;
				forceNum=challengeConfig.atk;
				officerTitleStr=LanguageManager.getlocal("nothing");
				nameStr=LanguageManager.getlocal("npcName"+show);
			}
			
			// progressBarPic="progress_type1_red";
			progressBarPic="progress_type3_red";
			
		}


		let headContainer:BaseDisplayObjectContainer ;
		let preX:number = 0;
		if (this._isHero ) {
			headContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
			preX = 105 + 5;
			// headContainer.setPosition(-7, -8);
			headContainer.setPosition(-7, -18);
			scale9Bg.scaleX = -1;
			scale9Bg.setPosition(headContainer.width/2+scale9Bg.width - 64, (headContainer.height - scale9Bg.height)/2 -3);
		}
		else {
			headContainer = new BaseDisplayObjectContainer();

			let myBody:BaseLoadBitmap = BaseLoadBitmap.create("head_circle_bg");
			headContainer.addChild(myBody);

			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,120,120);
			this._npcHead = BaseLoadBitmap.create("prison_icon"+show,rect);
			this._npcHead.scaleX = 120/this._npcHead.width;
			this._npcHead.scaleY = 109/this._npcHead.height;
			this._npcHead.x = -5;
			this._npcHead.y =  3;
			headContainer.addChild(this._npcHead);			

			preX= 14 + 64 + 5;
			scale9Bg.setPosition(0 + 64, (headContainer.height - scale9Bg.height)/2 -3);
			headContainer.x = scale9Bg.width -headContainer.width/2 + 5;
			// headContainer.y = -5;
			headContainer.y = -15;
	
		}
		this.addChild(headContainer);

 
		let soldierText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("soldier") + ":  ",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_INPUT);
		soldierText.x = preX;
		soldierText.y =62+2;
		this.addChild(soldierText);


		this._progressBar = ComponentManager.getProgressBar(progressBarPic,"progress_type3_bg",190);//245
		this._progressBar.x = preX + soldierText.width;
		this._progressBar.y = soldierText.y;
		this._progressBar.setTextColor(TextFieldConst.COLOR_WARN_YELLOW_NEW);
		this._progressBar.setTextSize(18);
		// this._progressBar.setPercentage(1);
		this.addChild(this._progressBar);

		this._name =  ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._name.textColor = TextFieldConst.COLOR_WARN_YELLOW_NEW;
		this._name.x = preX;
		this._name.y = 9+2;
		
		this.addChild(this._name);

		let nn =  App.StringUtil.changeIntToText(forceNum)
		this._force = ComponentManager.getTextField(LanguageManager.getlocal("force") + ":  " + nn,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_INPUT);
		// force.textColor = TextFieldConst.COLOR_YELLOW;
		this._force.x = preX;
		this._force.y = 35+2;

		this.addChild(this._force);
		//官职
		/*
		let officerTitle:BaseTextField = ComponentManager.getTextField(officerTitleStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		officerTitle.textColor = TextFieldConst.COLOR_WARN_GREEN;
		officerTitle.x = preX + 310  - officerTitle.width;
		officerTitle.y = this._name.y;
		this.addChild(officerTitle);
		*/
		// officerTitleStr = "正一品";
		if(this._isHero){

			


			// let officeTF:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(officerTitleStr, "office_fnt");
			let officeTF:BaseTextField = ComponentManager.getTextField(officerTitleStr,20,TextFieldConst.COLOR_WARN_YELLOW_NEW);
			officeTF.name = "officeTF";
			// officeTF.setScale(0.9);

			

			if(this._isHero ){
				officeTF.x = scale9Bg.x - scale9Bg.width + 65 - officeTF.width/2 -5;
				officeTF.y = scale9Bg.y + scale9Bg.height - officeTF.height -8;
			} else {
				officeTF.x = scale9Bg.x + scale9Bg.width - 50 - officeTF.width/2;
				officeTF.y = scale9Bg.y + scale9Bg.height - officeTF.height ;
			}



			if(PlatformManager.checkIsViSp()){

			} else {

				let officeBg = BaseBitmap.create("challenge_officebg");
				officeBg.width = officeTF.width + 40;
				officeBg.x = officeTF.x + officeTF.width/2 - officeBg.width/2;
				officeBg.y = officeTF.y + officeTF.height/2 - officeBg.height/2;
				this.addChild(officeBg);


				this.addChild(officeTF);
			}
		
		}




	}

	public set curNumber(v:number)
	{
		this._curNum = v;

		this._progressBar.setText(App.StringUtil.changeIntToText(this._curNum));
		this._progressBar.setPercentage( v / this._totalNum );
	}

	public resetInfo(v:number):void
	{	

		this._totalNum = v;
		if (this._isHero) {
			
		}
		else {

			let challengeConfig:any = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
			let nameStr:string = LanguageManager.getlocal("npcName"+challengeConfig.show);
			this._name.text = nameStr;
			let	forceNum:number = challengeConfig.atk;
			this._force.text = LanguageManager.getlocal("force") + ":  " + forceNum;

			this._npcHead.setload("prison_icon"+challengeConfig.show);
		}

		
	}

	public dispose():void
	{	
		this._totalNum = null;
		this._curNum = null;
		this._progressBar = null;
		this._force = null;
		this._name = null;
		this._npcHead = null;

		super.dispose();		
	}


}