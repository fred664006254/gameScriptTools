class ServantExileBuffServantView extends PopupView
{   
    private _list:ScrollList = null;
    public constructor() 
	{
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
           "public_popupscrollitembg","exile_buff_arrow","exile_buff_plus","exile_servant_barbg1","exile_servant_barbg2",
           "exile_servant_buffbg1","exile_servant_buffbg2",
		]);
	}

    protected getTitleStr():string
    {
        return "newatkracecross_buff";
    }
    public initView():void
    {
        let topbg = BaseBitmap.create("exile_servant_barbg1");
        topbg.setPosition(this.viewBg.width/2-topbg.width/2, 12);
        this.addChildToContainer(topbg);

        let toptext = ComponentManager.getTextField(LanguageManager.getlocal("exileBuff_choose_desc2"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		toptext.width = topbg.width-40;
        toptext.lineSpacing = 4;
        toptext.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,toptext,topbg);
		this.addChildToContainer(toptext);


        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 530;
		itemBg.height = 606;
        itemBg.setPosition(this.viewBg.x+this.viewBg.width/2-itemBg.width/2,topbg.y+topbg.height + 10);
		this.addChildToContainer(itemBg);

        let rect = egret.Rectangle.create();
		rect.setTo(0,0,522,itemBg.height-10);

        let list = Api.servantExileVoApi.getServantsExiled();
		let scrollList = ComponentManager.getScrollList(ServantExileBuffServantItem,list,rect,{f:this.resetView,o:this});
		this.addChildToContainer(scrollList);
        this._list = scrollList;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,scrollList,itemBg,[6,0]);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    }

    private resetView():void
    {
         let list = Api.servantExileVoApi.getServantsExiled();
         this._list.refreshData(list,{f:this.resetView,o:this})
         App.CommonUtil.showTip(LanguageManager.getlocal("exileBuff_timeout"));
    }

    protected getBgExtraHeight():number
	{
		return 15;
    }
    
    public dispose():void
	{   
        this._list = null;

		super.dispose();
	}
}