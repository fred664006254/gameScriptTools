/**
 * 剧情回忆选择章节
 * author shaoliang
 * date 2019/4/12
 * @class StoryrecallChooosePopupView
 */

class StoryrecallChooosePopupView  extends PopupView
{
    private _useCallback:Function;
	private _handler:any;
	private _useNum:number = 1;
	private _selectedNumTF:BaseTextField;

	private _maxNum:number = 0;

    public constructor() 
	{
		super();
	}

    protected getTitleStr():string
	{
		return "loctombjump-1";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress2_bg","progress2","aclotteryview_bar_1"
		]);
	}

    protected initView():void
	{
        
		this._useCallback = this.param.data.f;
		this._handler = this.param.data.o;
		this._maxNum = this.param.data.maxNum;
		this._useNum = this.param.data.num;

		if (this._maxNum == 0)
		{
			this._maxNum = 1;
		}

		let titleBg:BaseBitmap = BaseBitmap.create("aclotteryview_bar_1");
		titleBg.scaleX = (this.viewBg.width-28-GameData.popupviewOffsetX*2)/titleBg.width;
		titleBg.setPosition(14+GameData.popupviewOffsetX,10);
		this.addChildToContainer(titleBg);


		let chooseTip:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_choose"),TextFieldConst.FONTSIZE_TITLE_SMALL);
		chooseTip.setPosition(30+GameData.popupviewOffsetX,titleBg.y+titleBg.height/2-chooseTip.height/2);
		this.addChildToContainer(chooseTip);
		

        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 173;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = chooseTip.y+chooseTip.height+28;
		this.addChildToContainer(bg);

		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg",this._maxNum,this.dragCallback,this,null,1,365,this.param.data.num);
		dragProgressBar.x = this.viewBg.width/2 - dragProgressBar.width/2 +54;
		dragProgressBar.y = bg.y+98;
		this.addChildToContainer(dragProgressBar);

		let firstChapter:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_page2",["1"]),TextFieldConst.FONTSIZE_TITLE_SMALL);
		firstChapter.setPosition(45+GameData.popupviewOffsetX,bg.y+65);
		this.addChildToContainer(firstChapter);

		let lastChapter:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_page2",[String(this._maxNum)]),TextFieldConst.FONTSIZE_TITLE_SMALL);
		lastChapter.setPosition(this.viewBg.width-47-lastChapter.width-GameData.popupviewOffsetX,bg.y+65);
		this.addChildToContainer(lastChapter);


		let numBg:BaseBitmap = BaseBitmap.create("public_9_bg5");
		numBg.width = 240;
		numBg.setPosition(this.viewBg.width/2-numBg.width/2,bg.y+28);
		this.addChildToContainer(numBg);

		this._selectedNumTF = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_page1",[String(this._useNum),LanguageManager.getlocal("challengeTitle" + this._useNum)]),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_QUALITY_YELLOW);
		this._selectedNumTF.setPosition( this.viewBg.width/2 - this._selectedNumTF.width/2, numBg.y+numBg.height/2-this._selectedNumTF.height/2);
		this.addChildToContainer(this._selectedNumTF);

        let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"confirmBtn",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width/2;
		useBtn.y = bg.y + bg.height + 15;
		useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);
    }

    private useHandler(param:any):void
	{
		this._useCallback.apply(this._handler,[this._useNum]);
		this.hide();
	}

    private dragCallback(curNum:number):void
	{
		this._useNum = curNum;
		this._selectedNumTF.text = LanguageManager.getlocal("storyRecall_page1",[String(this._useNum),LanguageManager.getlocal("challengeTitle" + curNum)]);
		this._selectedNumTF.x = this.viewBg.width/2 - this._selectedNumTF.width/2;

	}

	protected getBgExtraHeight():number
	{
		return 10;
	}


    public dispose():void
	{
		this._useCallback = null;
		this._useNum = 1;
		if(this._selectedNumTF)
		{
			this.removeChildFromContainer(this._selectedNumTF);
			this._selectedNumTF.dispose();
			this._selectedNumTF = null;
		}

		this._maxNum = 0;
		this._handler = null;
		super.dispose();
	}
}