class RankBiographyScrollItem extends ScrollListItem
{

    public constructor() 
	{
		super();
	}

	protected initItem(index:number,info:any)
	{	

		let posy = 0;
		if (info.t)
		{
			let toppic = BaseBitmap.create("biographyview_bg"+info.t);
			this.addChild(toppic);
			posy = toppic.height;
		}

		let bg1 = BaseBitmap.create("biographyview_bg5");
		bg1.y = posy;
        this.addChild(bg1);

        let bg = BaseBitmap.create("biography_shelf");
		bg.y = posy;
        this.addChild(bg);

		bg1.height = bg.height;

		let data = info.data;



		let leftContainer = Api.biographyVoApi.getBookInfoContainerByInfo(data[0]);
        leftContainer.setPosition(43,posy+10);
        this.addChild(leftContainer);
		leftContainer.addTouchTap(this.showInfo,this,data[0]);

		if (data[1])
		{
			let rightContainer = Api.biographyVoApi.getBookInfoContainerByInfo(data[1]);
			rightContainer.setPosition(328,posy+10);
			this.addChild(rightContainer);

			rightContainer.addTouchTap(this.showInfo,this,data[1]);
		}
        
        this.height =bg.y+ bg.height;
    }

	private showInfo(event:egret.Event,data:any):void
	{
		Api.biographyVoApi.showInfo = data;
		ViewController.getInstance().openView(ViewConst.COMMON.BIOGRAPHYSHOWVIEW,{});
	}

    public dispose():void
	{

		super.dispose();
	}
}