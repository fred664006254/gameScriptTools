/**
 * 关卡剧情
 * date 2017/10/14
 * @class ChallengeStory
 */


class ChallengeStory extends BaseView
{

	private _callbackF:Function = null;
	private _obj:any = null;
	private _curIdx:number = 0;
	private _config:string[]= null;

	private _titleText:BaseTextField;
	private _titleBg:BaseBitmap;
	private _descText:BaseTextField;
	private _continueText:BaseTextField;
	private _showManTab:(BaseBitmap|BaseDisplayObjectContainer)[] = [];
	private _tipBB:BaseBitmap; 

	public constructor() {
		super();
	}

	protected isShowOpenAni():boolean
	{
		return false;
	}

	protected getResourceList():string[]
	{
		this._callbackF=this.param.data.f;
		this._obj=this.param.data.o;
		this._config = this.param.data.dialogue.split("_");

		let tempTab:any = {};
		let guidePic:string[] = super.getResourceList();
		for (let k in this._config)
		{	
			let v:string = this._config[k];
			let tempCfg:any = Config.ChallengestoryCfg.getChallengestoryCfgById(v);

			if (tempCfg.icon != "0" && tempCfg.icon != "1" ) {
				if (!tempTab[tempCfg.icon]) {
					tempTab[tempCfg.icon] = 1;
				}
			}
		}
		guidePic = Object.keys(tempTab);

		return guidePic.concat([
			"prisonview_1",
			"searchstoryview_bottom"
		]);
	}


	public init():void
	{
		//public_bottombg1
		let maskBmp:BaseBitmap = BaseBitmap.create("public_9_viewmask");
		maskBmp.width=GameConfig.stageWidth;
		maskBmp.height=GameConfig.stageHeigth;
		this.addChild(maskBmp);

		this.width = GameConfig.stageWidth;
		this.height = GameConfig.stageHeigth;
		maskBmp.addTouchTap(this.clickPage,this,null);

		this._tipBB = BaseBitmap.create("searchstoryview_bottom");
		this._tipBB.height = 170;
		this._tipBB.setPosition(GameConfig.stageWidth/2 - this._tipBB.width/2, GameConfig.stageHeigth - this._tipBB.height - 0);
		this.addChild(this._tipBB);

		this._continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"),20);
		this._continueText.setPosition(this._tipBB.x+ this._tipBB.width -this._continueText.width - 50 , this._tipBB.y + this._tipBB.height - this._continueText.height - 20);
		this._continueText.textColor = TextFieldConst.COLOR_WARN_GREEN;
		this.addChild(this._continueText);
		this.textAnim(this._continueText);

		this._titleBg = BaseBitmap.create("prisonview_1");
		this._titleBg.setPosition(0,this._tipBB.y-60)
		this.addChild(this._titleBg);
		this._titleBg.visible = false;

		this._titleText= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL);
		this._titleText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;

		this._titleText.x = this._titleBg.x + this._titleBg.width/2 - this._titleText.width/2 - 20;
		this._titleText.y = this._titleBg.y + this._titleBg.height/2 - this._titleText.height/2;
		this.addChild(this._titleText);

		this._descText= ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._descText.width = GameConfig.stageWidth - 60;
		this._descText.lineSpacing = 8;
		this._descText.setPosition(30,this._tipBB.y+48);
		this.addChild(this._descText);

		this.clickPage();
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
			this.callback();
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
				// userContainer.setPosition(0,GameConfig.stageHeigth-userContainer.height-157);
				if(userContainer.width > 700){
					userContainer.x = this.width/2  - 180 ;
				}else{
					userContainer.x = this.width/2 - userContainer.width/2 *userContainer.scaleX ;
				}
				userContainer.y = GameConfig.stageHeigth - userContainer.height - 10 + 50 +120;
				// userContainer.setPosition(GameConfig.stageWidth/2-userContainer.width/2, GameConfig.stageHeigth - userContainer.height - 10 + 50 +80);
				this.addChildAt(userContainer,1);
				this._showManTab.push(userContainer);

				let maskRect:egret.Rectangle = new egret.Rectangle();
				maskRect.setTo(0, 0, userContainer.width, 430);
				userContainer.mask = maskRect;
			}
			else {
				
				let npcMan:BaseBitmap = BaseBitmap.create(curCfg.icon);
				npcMan.setScale(0.8);

				let offsetY:number = 0;
				if (curCfg.icon.substring(0,4) == "wife") {
					npcMan.setScale(460/npcMan.height)
					offsetY= 20;
				}

				npcMan.setPosition(GameConfig.stageWidth/2 - npcMan.width/2*npcMan.scaleX , GameConfig.stageHeigth - npcMan.height*npcMan.scaleY - 272 - offsetY +50 +80);
				this.addChildAt(npcMan,1);
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
				this._titleText.x = this._titleBg.x + this._titleBg.width/2 - this._titleText.width/2 - 20;
				this._titleText.y = this._titleBg.y + this._titleBg.height/2 - this._titleText.height/2;
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


	public dispose():void 
	{	
		if(this._continueText)
		{
			egret.Tween.removeTweens(this._continueText);
		}
		this._continueText = null;
		this._callbackF = null;
		this._obj = null;
		this._curIdx = 0;
		this._config=null;
		this._showManTab.length = 0;

		super.dispose();
	}

}