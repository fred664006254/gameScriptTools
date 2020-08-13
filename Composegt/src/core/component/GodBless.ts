class GodBless extends BaseDisplayObjectContainer
{

	private _config:any = null;
	private _tipBg:BaseBitmap=null;
	private _tipWord:BaseBitmap=null;
	public constructor() {
		super();
	}


	public show(key:string):void
	{
		this._config = Config.DailyluckCfg.getDailylucyCfgByName(key);

		ResourceManager.loadResources(["godbless_tip_bg","godbless_tip_bg2","godbless_tip_word","godbless_"+this._config.name],[],this.init,null,this);
	}

	private init():void
	{
		this._tipBg = BaseBitmap.create("godbless_tip_bg");
		this._tipBg.anchorOffsetX = this._tipBg.width;
		this._tipBg.setPosition(GameConfig.stageWidth/2,50);

		let tipBg2:BaseBitmap = BaseBitmap.create("godbless_tip_bg");
		tipBg2.anchorOffsetX = tipBg2.width;
		tipBg2.setPosition(GameConfig.stageWidth/2,50);

		this.addChild(this._tipBg);
		this.addChild(tipBg2);
		this._tipBg.scaleX = 0;
		tipBg2.scaleX = 0;

		egret.Tween.get(this._tipBg).to({scaleX:1},300).wait(100).call(this.showWord,this);
		egret.Tween.get(tipBg2).to({scaleX:-1},300);
	}

	private showWord():void
	{
		this._tipWord = BaseBitmap.create("godbless_tip_word");
		this._tipWord.setPosition(GameConfig.stageWidth/2 - this._tipWord.width*1.5,this._tipBg.y + this._tipBg.height/2 - this._tipWord.height);
		this._tipWord.scaleX = 2;
		this._tipWord.scaleY = 2;
		this.addChild(this._tipWord);

		let realPos:egret.Point = egret.Point.create(GameConfig.stageWidth/2 - this._tipWord.width,this._tipBg.y + this._tipBg.height/2 - this._tipWord.height/2);

		egret.Tween.get(this._tipWord).to({scaleX:1,scaleY:1,x:realPos.x,y:realPos.y},500).call(this.showName,this);
	}

	private showName():void
	{
		let name:BaseBitmap = BaseBitmap.create("godbless_"+this._config.name);
		name.setPosition(GameConfig.stageWidth,this._tipBg.y + this._tipBg.height/2 - name.height/2);
		this.addChild(name);

		egret.Tween.get(name).to({x:GameConfig.stageWidth/2},500).call(this.showDesc,this).wait(1000).call(this.hide,this);

	}

	private showDesc():void
	{	

		let descContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		descContainer.y = this._tipBg.y + 140;
		this.addChild(descContainer);

		let descBg:BaseBitmap = BaseBitmap.create("godbless_tip_bg2");
		descBg.setPosition(GameConfig.stageWidth/2 - descBg.width, 0);
		descContainer.addChild(descBg);

		let descBg2:BaseBitmap = BaseBitmap.create("godbless_tip_bg2");
		descBg2.scaleX = -1;
		descBg2.setPosition(GameConfig.stageWidth/2+descBg2.width, descBg.y);
		descContainer.addChild(descBg2);

		let descText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("godbless_desc_"+this._config.name,[this._config.times.toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		descText.setPosition(GameConfig.stageWidth/2 - descText.width/2,descBg.y + descBg.height/2 - descText.height/2);
		descContainer.addChild(descText);

		egret.Tween.get(descContainer).to({y:descContainer.y - 50},500);
	}

	private hide():void
	{
		egret.Tween.get(this).to({alpha:0},300).call(this.remove,this);
	}

	private remove():void
	{
		LayerManager.msgLayer.removeChild(this);
	}


	public dispose():void
	{
		egret.Tween.removeTweens(this);
		this._config = null;
		this._tipBg = null;
		this._tipWord = null;

		super.dispose();
	}

}