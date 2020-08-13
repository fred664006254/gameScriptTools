/**
 * 官报
 * author zhaozhantao
 */

class AcFiveTigersReportView extends BaseView
{

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"fivetigers_reportbg-"+this.param.data.code
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
		return "public_9_bg8";
	}

	protected initView():void
	{
		this.addTouchTap(this.touchTap,this,null);
		this.viewBg.touchEnabled = true;

		let lookBg:BaseBitmap = BaseBitmap.create("fivetigers_reportbg-"+this.param.data.code);
		lookBg.setPosition(GameConfig.stageWidth/2 - lookBg.width/2, GameConfig.stageHeigth/2 - lookBg.height/2);
		this.addChild(lookBg);

		//名字
		let nameTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("acFiveTigersReportView-"+ this.param.data.code),TextFieldConst.FONTSIZE_TITLE_SMALL);
		nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		nameTf.setPosition(lookBg.width/2 - nameTf.width/2, lookBg.y + 163);
		this.addChild(nameTf);

		let descTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("acFiveTigersReportDesc-"+ this.param.data.code),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		//descTf.textColor = TextFieldConst.COLOR_BROWN_NEW;
		descTf.lineSpacing = 10;
		descTf.width = lookBg.width - 80;
		descTf.setPosition(lookBg.width/2 - descTf.width/2, lookBg.y + 210);
		this.addChild(descTf);

	}


	private touchTap():void
	{
		this.hide();
	}

	public dispose():void
	{
		// this._childId = null;
		super.dispose();
	}

}