
class ShopBuyGemItem extends ScrollListItem {

	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : Config.RechargeItemCfg) {
        let view = this;
        view.width = 196 + 10;
        view.height = 235 + 10;

        let bg = BaseBitmap.create(`shop_gem_bg`);
        // bg.width = 196;
		// bg.height = 235;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [0,0], true);
        view.addChild(bg);
        let txtbg = BaseBitmap.create("shop_name_bg");
		view.addChild(txtbg);
		txtbg.x = 0;
		txtbg.y = 0;

        let getGemTxt  = ComponentMgr.getTextField(LangMger.getlocal(`shopbuygemget`, [data.gemCost.toString()]), TextFieldConst.SIZE_CONTENT_NORMAL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, getGemTxt, txtbg, [0,8]);
        view.addChild(getGemTxt);
        getGemTxt.strokeColor = ColorEnums.strokeBlue;
        getGemTxt.stroke = 1.5;

        let itemGroup = new BaseDisplayObjectContainer();
        itemGroup.width = 120;
        itemGroup.height = 120;
        view.addChild(itemGroup);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemGroup, getGemTxt, [0,getGemTxt.height+10]);

        // let iconbg = BaseBitmap.create(`shopgemiconbg`);
        // iconbg.width = 120;
		// iconbg.height = 120;
        // itemGroup.addChild(iconbg);

        let icon = BaseBitmap.create(`shopbuygem${data.sortId}`);
        itemGroup.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,icon,bg);

        let costTxt = ComponentMgr.getTextField(`${data.cost} <font size=20>${PlatMgr.getMoneySign()}</font>`, TextFieldConst.SIZE_24);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, costTxt, bg, [0,20]);
        view.addChild(costTxt);

        App.CommonUtil.addTouchScaleEffect(view, ()=>{
            Api.ShopVoApi.setTouchType(ShopConst.SHOP_GEM);
            Api.ShopVoApi.setTouchId(data.id);
            Api.UserinfoVoApi.setFreshInfo(true, new egret.Point(icon.localToGlobal().x+icon.width/2, icon.localToGlobal().y+icon.height/2));
            PlatMgr.pay(data.id); 
        }, view);
    }
    
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
        let view = this;
		super.dispose();
	}
}