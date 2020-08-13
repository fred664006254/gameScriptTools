/**
 * 关卡剧情
 * date 2017/10/14
 * @class ChallengeStory
 */


class ChallengeStory extends CommonView
{

	private _callbackF:Function = null;
	private _obj:any = null;
	private _curIdx:number = 0;
	private _config:string[]= null;

	private _titleText:BaseTextField = null;
	private _titleBg:BaseBitmap;
	private _descText:BaseTextField;
	private _continueText:BaseTextField;
	private _showManTab:(BaseBitmap|BaseDisplayObjectContainer)[] = [];
	private _tipBB:BaseBitmap; 
	private _isRecall:boolean = false;

	private _chapterText:BaseTextField = null;
	private _chapterBg:BaseBitmap = null;
	private _cid:number = 0;
	private _maxCid:number = 0;

	public constructor() {
		super();
	}


	protected getResourceList():string[]
	{	
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._callbackF=this.param.data.f;
			this._obj=this.param.data.o;
		}
		
		this._config = this.param.data.dialogue.split("_");

		let tempTab:any = {};
		let guidePic:string[] = super.getResourceList();
		// for (let k in this._config)
		// {	
		// 	let v:string = this._config[k];
		// 	let tempCfg:any = Config.ChallengestoryCfg.getChallengestoryCfgById(v);

		// 	if (tempCfg.icon != "0" && tempCfg.icon != "1" ) {
		// 		if (!tempTab[tempCfg.icon]) {
		// 			tempTab[tempCfg.icon] = 1;
		// 		}
		// 	}
		// }
		// guidePic = Object.keys(tempTab);

		return guidePic.concat([
			"guideNameBg"
		]);
	}

	public init():void
	{
		super.init();

		if (this.param.data.recall)
		{
			this._isRecall=this.param.data.recall;
			this._cid = this.param.data.cid;

			let maxBigStory:number = ChallengeCfg.getMaxStoryBigId();
			let maxChapter = Api.challengeVoApi.getCurBigChannelId() < maxBigStory ? Api.challengeVoApi.getCurBigChannelId() : maxBigStory;
			this._maxCid = (maxChapter-1)*41;
		}

		let maskBmp:BaseBitmap = BaseBitmap.create("public_9_viewmask");
		maskBmp.width=GameConfig.stageWidth;
		maskBmp.height=GameConfig.stageHeigth;
		this.addChild(maskBmp);

		this.width = GameConfig.stageWidth;
		this.height = GameConfig.stageHeigth;
		maskBmp.addTouchTap(this.clickPage,this,null);

		this._tipBB = BaseBitmap.create("public_9_wordbg");
		this._tipBB.height = 170;
		this._tipBB.setPosition(GameConfig.stageWidth/2 - this._tipBB.width/2, GameConfig.stageHeigth - this._tipBB.height - 0);
		this.addChild(this._tipBB);

		this._continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"),20);
		this._continueText.setPosition(this._tipBB.x+ this._tipBB.width -this._continueText.width - 50 , this._tipBB.y + this._tipBB.height - this._continueText.height - 20);
		this._continueText.textColor = TextFieldConst.COLOR_WARN_GREEN;
		this.addChild(this._continueText);
		this.textAnim(this._continueText);

		this._titleBg = BaseBitmap.create("guideNameBg");
		this._titleBg.setPosition(25,this._tipBB.y-50)
		this.addChild(this._titleBg);
		this._titleBg.visible = false;

		this._titleText= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._titleText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		this._titleText.setPosition(30,this._tipBB.y-42);
		this.addChild(this._titleText);

		this._descText= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._descText.width = GameConfig.stageWidth - 60;
		this._descText.lineSpacing = 8;
		this._descText.setPosition(30,this._tipBB.y+38);
		this.addChild(this._descText);

		

		if (this._isRecall)
		{	
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()?20:(GameConfig.stageWidth - this.closeBtn.width - 20);
			this.closeBtn.y = 10;
			this.swapChildren(maskBmp,this.closeBtn);

			this._chapterBg = BaseBitmap.create("storyrecall_title_bg");
			this.addChild(this._chapterBg);

			this.swapChildren(this._chapterBg,this.closeBtn);
			
			this._chapterText = ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_BLACK);
			this._chapterText.setPosition(0,this._chapterBg.height/2-this._chapterText.height/2);
			this.addChild(this._chapterText);

			this.setChapterText();
		}

		this.clickPage();
	}

	private setChapterText():void
	{
		let bigId:number = Api.challengeVoApi.getBigChannelIdByCid(this._cid-1);
		let middleId:number = Math.floor((this._cid-1)%41/8)+1;
		this._chapterText.text = String(bigId) + ".     "+LanguageManager.getlocal("challengeTitle"+bigId)+"     ( "+middleId+" )";
		this._chapterText.x = GameConfig.stageWidth/2 - this._chapterText.width/2;
	}

	private textAnim(t):void
	{
		egret.Tween.removeTweens(t);

		let oldx:number = t.x;
		let oldy:number = t.y;
		let newx:number = t.x - t.width*0.1;
		let newy:number = t.y - t.height*0.1;

		egret.Tween.get(t).to({scaleX:1.2,scaleY:1.2,x:newx,y:newy},600).to({scaleX:1,scaleY:1,x:oldx,y:oldy},600).to({scaleX:1.2,scaleY:1.2,x:newx,y:newy},600).to({scaleX:1,scaleY:1,x:oldx,y:oldy},600).call(this.textAnim,this,[t]);
	}

	private clickPage():void
	{
		if (this._curIdx >= this._config.length) {
			if (this._isRecall )
			{	
				let iscontinue:boolean = false;
				for (let i:number = this._cid+1; i<=this._maxCid; i++)
				{
					let challengeConfig:any = ChallengeCfg.getChallengeCfgById(i);
					if ( challengeConfig.dialogue ) 
					{	
						this._curIdx = 0;
						this._config.length = 0;
						this._config = challengeConfig.dialogue.split("_");
						this._cid = i;
						iscontinue = true;
						break;
					}
				}
				if (iscontinue)
				{
					this.setChapterText();
					this.clickPage();
					let f2:Function = this.param.data.f2;
					let o2:any = this.param.data.o2;
					f2.apply(o2,[Api.challengeVoApi.getBigChannelIdByCid(this._cid-1)]);
				}
				else
				{
					this.callback();
				}
			}
			else
			{
				this.callback();
			}
		}
		else {

			let curKey:string = this._config[this._curIdx];
			let curCfg:any = Config.ChallengestoryCfg.getChallengestoryCfgById(curKey);
			this._descText.text = LanguageManager.getlocal("challengeStoryDesc"+curKey);

			for (let k in this._showManTab) {
				this.removeChild(this._showManTab[k]);
			}
			this._showManTab.length = 0;

			if (curCfg.icon == "0") {
				
			}
			else if (curCfg.icon == "1" ) {

				let userContainer:BaseDisplayObjectContainer = Api.playerVoApi.getMyPortrait();
				let lv = Api.playerVoApi.getPlayerLevel();
				if(Api.playerVoApi.getTitleid(2)>0){	
					lv = Api.playerVoApi.getTitleid(2);
				}
				let isnew = Api.playerVoApi.getNewPalaceRole(Number(lv));
				// userContainer.setPosition(0,GameConfig.stageHeigth-userContainer.height-157);
				userContainer.setPosition(GameConfig.stageWidth/2-userContainer.width/2, GameConfig.stageHeigth - userContainer.height + 120 + (isnew ? 82 : 0));
				this.addChildAt(userContainer,2);
				this._showManTab.push(userContainer);

				let maskRect:egret.Rectangle = new egret.Rectangle();
				maskRect.setTo(0, 0, userContainer.width, 440);
				userContainer.mask = maskRect;
			}
			else {
				let rect:egret.Rectangle = new egret.Rectangle();
				rect.setTo(0, 0, 405, 467);
				

				let offsetY:number = 0;
				if (curCfg.icon.substring(0,4) == "wife") {
					rect.setTo(0, 0, 355, 467);
					offsetY= 20;
				}

				let npcMan:BaseLoadBitmap = BaseLoadBitmap.create(curCfg.icon,rect);
				npcMan.setScale(0.8);

				npcMan.setPosition(GameConfig.stageWidth/2 - npcMan.width/2*npcMan.scaleX , GameConfig.stageHeigth - npcMan.height*npcMan.scaleY - 272 - offsetY +50 +80);
				this.addChildAt(npcMan,2);
				this._showManTab.push(npcMan);
			}


			if (curCfg.name == "0") {
				// this._descText.y = this._tipBB.y+45;
				this._titleText.text = "";
				this._titleBg.visible = false;
			}
			else {
				// this._descText.y = this._tipBB.y+88;
				this._titleText.text = LanguageManager.getlocal(curCfg.name);
				this._titleText.x = this._titleBg.x + this._titleBg.width/2 - this._titleText.width/2;
				this._titleBg.visible = true;
			}

			this._curIdx++;
		}
	}

	private callback():void
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		this.hide();
	}

	protected initView():void
	{
        
	}


	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{	
		if (this.param.data.recall)
		{
			return "storyrecall_close";
		}
		return null;
	}

	protected getBgName():string
	{
		return null;
	}

	protected isShowMask():boolean
	{
		return false;
	}

	public dispose():void 
	{	
		egret.Tween.removeTweens(this._continueText);
		this._continueText = null;
		this._callbackF = null;
		this._obj = null;
		this._curIdx = 0;
		this._config=null;
		this._showManTab.length = 0;
		this._isRecall = false;
		this._chapterText = null;
		this._cid = 0;
		this._maxCid = 0;
		this._chapterBg = null;

		super.dispose();
	}

}