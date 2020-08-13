class ServantExileServantBuffItem extends ScrollListItem
{

	public constructor() {
		super();
	}

    protected initItem(index:number,data:any[],itemparam)
    {

        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.width = 510;
        bg.height = 126;
        this.addChild(bg);

        let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
		titleBg.width = 510;
		titleBg.height = 35;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
		this.addChild(titleBg);

        let desc1 = ComponentManager.getTextField(data[0],22,TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,desc1,titleBg);
        this.addChild(desc1);

        let desc2 = ComponentManager.getTextField(data[1],20,TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,desc2,titleBg,[0,58]);
        this.addChild(desc2);


        // let desc3 = ComponentManager.getTextField(data[2],20,TextFieldConst.COLOR_BROWN);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,desc3,titleBg,[0,65]);
        // this.addChild(desc3);

    }

}