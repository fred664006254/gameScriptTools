/**
 * 官报
 * @class AcCarnivalNightReportView
 */

class AcCarnivalNightReportView extends BaseView
{



	public constructor() {
		super();
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
		let code = this.param.data.code
		
		let lookBg:BaseBitmap = BaseBitmap.create(`carnivalnight_guanbaobg-${code}`);
		// lookBg.scaleX = 2;
		//lookBg.height = 300;
		lookBg.setPosition(GameConfig.stageWidth/2 - lookBg.width/2, GameConfig.stageHeigth/2 - lookBg.height/2);
		this.addChild(lookBg);

		//名字
		let nameBM = BaseBitmap.create('carnivalnight_title-'+code);
		nameBM.anchorOffsetX = nameBM.width/2;
		nameBM.anchorOffsetY = nameBM.height/2;
		nameBM.setPosition(lookBg.x + lookBg.width/2, lookBg.y + 60);
		nameBM.setScale(0.6);
		this.addChild(nameBM);


		// let nameTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("AcCarnivalNightReportViewTitle-"+ code),TextFieldConst.FONTSIZE_TITLE_SMALL);
		// nameTf.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		// nameTf.setPosition(lookBg.width/2 - nameTf.width/2, lookBg.y + 40);
		// this.addChild(nameTf);

		let descTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("AcCarnivalNightReportDesc-"+ code),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_INPUT);
		descTf.lineSpacing = 10;
		descTf.width = lookBg.width - 80;
		descTf.setPosition(lookBg.width/2 - descTf.width/2, lookBg.y + 120);
		this.addChild(descTf);

		// let nextTf:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("clickContinue"),TextFieldConst.FONTSIZE_TITLE_SMALL);
		// nextTf.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
		// // nextTf.width = lookBg.width - 70
		// nextTf.setPosition(470, lookBg.y + 255);
		// this.addChild(nextTf);

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

	protected getResourceList(): string[] {
        let code = this.param.data.code;
        return super.getResourceList().concat([
			`carnivalnight_guanbaobg-${code}`
        ]);
    }

}