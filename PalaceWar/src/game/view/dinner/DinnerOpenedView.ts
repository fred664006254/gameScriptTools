/**
 * 开宴成功
 * author shaoliang
 * date 2017/11/2
 * @class DinnerOpenedView
 */

class DinnerOpenedView extends CommonView 
{

	private _callbackF:Function = null;
	private _obj:any = null;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return [
				"dinner_flower",
				"dinner_open_word",
		];
	}

	protected getBgName():string
	{
		return "public_9_bg8";
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
		return null;
	}

	protected initView():void
	{
		this._obj = this.param.data.o;
		this._callbackF = this.param.data.f;

		let flower:BaseBitmap = BaseBitmap.create("dinner_flower");
		flower.setPosition(GameConfig.stageWidth/2  - flower.width/2,GameConfig.stageHeigth/2 - flower.height);
		this.addChildToContainer(flower);

		let openWord:BaseBitmap = BaseBitmap.create("dinner_open_word");
		openWord.setPosition(GameConfig.stageWidth/2  - openWord.width/2, GameConfig.stageHeigth/2 - flower.height/2 - openWord.height/2);
		this.addChildToContainer(openWord);

		let descBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		descBg.width = GameConfig.stageWidth;
		descBg.height = 222;
		descBg.setPosition(0, GameConfig.stageHeigth/2 - 60);
		this.addChildToContainer(descBg);

		let dinnerType:string = LanguageManager.getlocal("dinnerTitle"+this.param.data.type);
		let openSuccess:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("openSuccessDesc",[dinnerType]),TextFieldConst.FONTSIZE_TITLE_SMALL);
		openSuccess.width = 585;
		openSuccess.lineSpacing = 6;
		openSuccess.setPosition(GameConfig.stageWidth/2 - openSuccess.width/2 , descBg.y+35);
		this.addChild(openSuccess);

		let playerId:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("playerId",[Api.playerVoApi.getPlayerID().toString()]),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WARN_GREEN);
		playerId.setPosition(GameConfig.stageWidth/2 - playerId.width/2 , descBg.y-52+descBg.height);
		this.addChild(playerId);

		let shareDinner:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("shareDinnerDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		shareDinner.setPosition(GameConfig.stageWidth/2 - shareDinner.width/2 , descBg.y+50+descBg.height);
		this.addChild(shareDinner);

		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
		confirmBtn.setPosition(GameConfig.stageWidth/2 - confirmBtn.width/2, descBg.y+86+descBg.height);
		this.addChildToContainer(confirmBtn);

		
	}

	public hide():void
	{
		// this._callbackF.apply(this._obj);
		super.hide();
	}


	public dispose():void
	{
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}

}