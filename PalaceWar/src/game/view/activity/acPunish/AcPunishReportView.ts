/**
 * 官报
 * author dukunayng
 * date 2017/11/20
 * @class AcPunishReportView
 */

class AcPunishReportView extends BaseView
{



	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["adult_updtitle",
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


		
		let lookBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		// lookBg.scaleX = 2;
		lookBg.height = 300;
		lookBg.setPosition(GameConfig.stageWidth/2 - lookBg.width/2, GameConfig.stageHeigth/2 - lookBg.height/2);
		this.addChild(lookBg);

		//名字
		let nameTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("acPunishReportView-"+ this.param.data.code),TextFieldConst.FONTSIZE_TITLE_SMALL);
		nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		nameTf.setPosition(lookBg.width/2 - nameTf.width/2, lookBg.y + 40);
		this.addChild(nameTf);

		let descTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("acPunishReportDesc-"+ this.param.data.code),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		descTf.textColor = TextFieldConst.COLOR_WHITE;
		descTf.lineSpacing = 20;
		descTf.width = lookBg.width - 60
		descTf.setPosition(lookBg.width/2 - descTf.width/2, lookBg.y + 80);
		this.addChild(descTf);

		let nextTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("clickContinue"),TextFieldConst.FONTSIZE_TITLE_SMALL);
		nextTf.textColor = TextFieldConst.COLOR_WARN_GREEN;
		nextTf.width = lookBg.width - 60
		nextTf.setPosition(470, lookBg.y + 260);
		this.addChild(nextTf);

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