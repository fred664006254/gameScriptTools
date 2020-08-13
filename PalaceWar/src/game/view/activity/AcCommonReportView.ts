/**
 * 通用官报 传入参数 msg 消息内容 title 标题名
 * author qianjun
 * date 2019/3/12
 * @class AcCommonReportView
 */

class AcCommonReportView extends BaseView
{



	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let arr = [`public_9_bg64`];
		return super.getResourceList().concat(arr);
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
		
		let lookBg:BaseBitmap = BaseBitmap.create("public_9_bg64");
		// lookBg.scaleX = 2;
		lookBg.height = 355;
		this.addChild(lookBg);
		let param = this.param.data;
		//名字
		let nameTf:BaseTextField = ComponentManager.getTextField(`${param.title}`, 26);
		this.addChild(nameTf);

		let descTf:BaseTextField = ComponentManager.getTextField(`${param.msg}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		descTf.lineSpacing = 8;
		descTf.width = 500;
		this.addChild(descTf);

		let nextTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("clickContinue"), 20);
		nextTf.textColor = TextFieldConst.COLOR_WARN_GREEN;
		nextTf.width = 500;
		this.addChild(nextTf);

		lookBg.height = Math.max(nameTf.textHeight + descTf.textHeight + 220, 350);
		lookBg.setPosition(GameConfig.stageWidth/2 - lookBg.width/2, GameConfig.stageHeigth/2 - lookBg.height/2);
		nameTf.setPosition(lookBg.width/2 - nameTf.width/2, lookBg.y + 70);
		descTf.setPosition(lookBg.width/2 - descTf.width/2, nameTf.y + nameTf.textHeight + 30);
		nextTf.setPosition(420, lookBg.y + lookBg.height - nextTf.textHeight - 50);
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