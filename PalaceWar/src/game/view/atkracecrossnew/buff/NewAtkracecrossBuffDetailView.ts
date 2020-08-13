class NewAtkracecrossBuffDetailView extends PopupView
{
    public constructor() 
	{
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "threekingdomstaskflag","public_popupscrollitembg",
		]);
	}

    protected getTitleStr():string
    {
        return "newatkracecross_buffdetail";
    }
    public initView():void
    {

        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 530;
		itemBg.height = 763;
        itemBg.setPosition(this.viewBg.x+this.viewBg.width/2-itemBg.width/2,10);
		this.addChildToContainer(itemBg);

        let rect = egret.Rectangle.create();
		rect.setTo(0,0,522,itemBg.height-10);

        let info = this.param.data.info;
        let list = Api.atkracecrossVoApi.getNewCrossCfg().getBaseBuffListById(info.id)
		let scrollList = ComponentManager.getScrollList(NewAtkracecrossDetailScrollItem,list,rect,info);
		this.addChildToContainer(scrollList);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,scrollList,itemBg,[6,0]);
    }
}