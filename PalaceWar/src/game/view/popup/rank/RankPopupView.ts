/**
 * 排行榜基类
 * author 陈可
 * date 2017/11/28
 * @class RankPopupView
 */
class RankPopupView extends PopupView
{

	/**
	 * 滑动列表
	 */
	protected tabList:Object={};

	protected _curShowTab:ScrollList;

	protected _title3Txt:BaseTextField;

	protected _scrollListBgRect:egret.Rectangle;

	protected buttomContainer:BaseDisplayObjectContainer;
	
	public constructor() 
	{
		super();
		this._scrollListBgRect=egret.Rectangle.create();
		this._scrollListBgRect.setTo(0,0,520,600);
	}

	protected initView():void
	{
		this.initListBg();
	}

	protected changeTab():void
	{
		if(!this.tabList[this._selectedTabIndex])
		{
			let rect = egret.Rectangle.create();
			rect.setTo(0,0,this._scrollListBgRect.width-10,this._scrollListBgRect.height - 70);
			let scrollList = ComponentManager.getScrollList(this.getListItemClass(),this.getScrollDataList(),rect);
			this.addChildToContainer(scrollList);
			scrollList.setPosition(this._scrollListBgRect.x+5,this._scrollListBgRect.y+50);
			scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
			this.tabList[this._selectedTabIndex]=scrollList;
		}
		else
		{
			let scrollList:ScrollList=this.tabList[this._selectedTabIndex];
			if(scrollList)
			{
				this.addChildToContainer(scrollList);
			}
		}
		if(this._curShowTab)
		{
			if(this._curShowTab.parent)
			{
				this._curShowTab.parent.removeChild(this._curShowTab);
			}
			this._curShowTab=null;
		}
		this._curShowTab=this.tabList[this._selectedTabIndex];
		if(this._title3Txt)
		{
			this._title3Txt.text=this.getTitleValueStr();
		}
		if(this.buttomContainer)
		{
			App.DisplayUtil.destory(this.buttomContainer);
			this.initButtomInfo();
		}
	}

	private initListBg():void
	{
		let bg1= BaseBitmap.create("public_9_bg32");
        bg1.width = this._scrollListBgRect.width;
        bg1.height = this._scrollListBgRect.height;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 58;
		this._scrollListBgRect.x=bg1.x;
		this._scrollListBgRect.y=bg1.y;
        this.addChildToContainer(bg1);

        let bg2= BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this.addChildToContainer(bg2);

		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+40;
        titleTxt1.y = bg2.y + 8;
        this.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.x = bg2.x+175;
        titleTxt2.y = titleTxt1.y;
        this.addChildToContainer(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField(this.getTitleValueStr(),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt3.textAlign=egret.HorizontalAlign.CENTER;
		titleTxt3.width=200;
        titleTxt3.x = bg2.x+bg2.width-titleTxt3.width;
        titleTxt3.y = titleTxt1.y;
        this.addChildToContainer(titleTxt3);
		this._title3Txt=titleTxt3;

		let bg3= BaseBitmap.create("public_9_bg1");
		bg3.name="buttomBg";
		bg3.width = bg1.width;
		bg3.height = 100;
		bg3.setPosition(bg1.x,bg1.y + bg1.height + 9);
		this.addChildToContainer(bg3);


		if(!this.buttomContainer)
		{
			this.buttomContainer=new BaseDisplayObjectContainer();
			this.buttomContainer.width=bg3.width;
			this.buttomContainer.height=bg3.height;
			this.buttomContainer.setPosition(bg3.x,bg3.y);
			this.addChildToContainer(this.buttomContainer);
		}
	}

	protected getTitleValueStr():string
	{
		return LanguageManager.getlocal("pointNumber");
	}

	protected getScrollDataList():any[]
	{
		return [];
	}

	protected getListItemClass():any
	{
		return RankPopupListItem;
	}

	protected initButtomInfo():void
	{
		
	}

	protected getTitleStr():string
	{
		return "dinnerRankPopupViewTitle";
	}

	public dispose():void
	{
		this._title3Txt=null;
		this.buttomContainer=null;
		this._curShowTab=null;
		this.tabList={};
		super.dispose();
	}
}