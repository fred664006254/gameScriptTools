/**
 * author yanyuling
 */
class AcFanliReviewStoryView extends CommonView
{
	public constructor() 
	{
		super();
	}

	public initView():void
	{
        let _blackBg = BaseBitmap.create("guideGrayBg");
		_blackBg.height = GameConfig.stageHeigth;
		_blackBg.width = GameConfig.stageWidth;
        this.addChild(_blackBg);

		let bg:BaseBitmap = BaseBitmap.create("fanliReview_bg2");
		bg.x = GameConfig.stageWidth/2 - bg.width/2;
		bg.y = GameConfig.stageHeigth/2 - bg.height/2;;
		this.addChild(bg);

        let clostBtn = ComponentManager.getButton("fanliReview_close","",this.tapHandler,this);
        clostBtn.x = bg.x + bg.width - clostBtn.width -5;
        clostBtn.y = bg.y + 15;
        this.addChild(clostBtn);

		let namebg:BaseBitmap = BaseBitmap.create("fanliReview_namebg");
		namebg.x = bg.x + 70  ;
		namebg.y = bg.y + 40;
		this.addChild(namebg);

        let sid = this.param.data.sid;
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTxt.text = LanguageManager.getlocal("acFanliReviewView_story_title"+sid);
        nameTxt.x = namebg.x + 45;
        nameTxt.y = namebg.y + 25;
        this.addChild(nameTxt);

		let conNode = new  BaseDisplayObjectContainer();
		// this._bottomnodeContainer.y = GameConfig.stageHeigth - 
        let contenttxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        contenttxt.multiline = true;
        contenttxt.lineSpacing = 5;
        contenttxt.width = 510;
        contenttxt.text = LanguageManager.getlocal("acFanliReviewView_story_content"+sid);
        contenttxt.x =  10;
        contenttxt.y = 10;
        conNode.addChild(contenttxt);
		conNode.height += 30; 
		let rect = new egret.Rectangle(0,0,530,bg.height - 170);
		let scrList = ComponentManager.getScrollView(conNode,rect);
		scrList.x = namebg.x ;
		scrList.y = namebg.y + 60;
		this.addChild(scrList);

	}

	private tapHandler():void
	{
		let callBack = <Function>this.param.data.callBack;
		if(callBack)
		{
			callBack.apply(this.param.data.obj);
		}
		this.hide();

	}

	protected getBgName():string
	{
		return null;
	}

	protected getResourceList():string[]
	{
		return [
		];
	}
	protected getTitleStr():string
	{
		return null;
	}
	protected getButtomLineBg():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected getTitleBgName():string
	{
		return null;
	}

	public dispose():void
	{
		super.dispose();
	}
}