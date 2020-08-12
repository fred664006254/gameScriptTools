
class ShopBuyGoldItem extends ScrollListItem {

	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : Config.BuyGoldShopItemCfg) {
        let view = this;
        view.width = 196 + 10;
        view.height = 235 + 10;

		let bg = BaseBitmap.create(`shop_gold_bg`);
		// bg.width = 196;
		// bg.height = 235;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [0,0], true);
		view.addChild(bg);

		let txtbg = BaseBitmap.create("shop_name_bg");
		view.addChild(txtbg);
		txtbg.x = 0;
		txtbg.y = 0;

        let getGemTxt = ComponentMgr.getTextField(LangMger.getlocal(`shopbuygoldget`, [data.goldGet.toString()]), TextFieldConst.SIZE_CONTENT_NORMAL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, getGemTxt, txtbg, [0,8]);
		view.addChild(getGemTxt);
		getGemTxt.strokeColor = ColorEnums.strokeOrange;
		getGemTxt.stroke = 1.5;

        let itemGroup = new BaseDisplayObjectContainer();
        itemGroup.width = 120;
        itemGroup.height = 120;
        view.addChild(itemGroup);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemGroup, getGemTxt, [0,getGemTxt.height+10]);

		// let iconbg = BaseBitmap.create(`shopspecialboxiconbg`);
		// iconbg.width = 120;
		// iconbg.height = 120;
        // itemGroup.addChild(iconbg);

        let icon = BaseBitmap.create(`shopbuygold${data.id}`);
		itemGroup.addChild(icon);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,icon,bg);

        let costicon = BaseBitmap.create(`ab_mainui_gem`);
        view.addChild(costicon);
        // costicon.setScale(0.7);

        let costTxt = ComponentMgr.getTextField(`${data.costGem}`, TextFieldConst.SIZE_24);
        view.addChild(costTxt);

        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, costicon, bg, [(bg.width-costicon.width*costicon.scaleX-costTxt.width-10)/2,8]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width*costicon.scaleX+10,2]);
		
		App.CommonUtil.addTouchScaleEffect(view, ()=>{
			//弹出确认弹窗
			if(Api.UserinfoVoApi.getGem() < data.costGem){
				App.CommonUtil.gemNotEnough(1);
          	} else if (Api.UserinfoVoApi.getGold() >= Config.GamebaseCfg.maxGold) {
				App.CommonUtil.showTip(LangMger.getlocal("sysovermaxgold"));
			}
          	else{
				ViewController.getInstance().openView(ViewConst.BUYRESCONFIRMPOPUPVIEW, {
					title : LangMger.getlocal("sysTip"),
					msg : LangMger.getlocal(`shopbuyconfirmtip`, [data.goldGet.toString(),LangMger.getlocal(`shopitemtypegold`)]),
					handler : view,
					needCancel : false,
					callback : ()=>{
						//发消息去买
						Api.ShopVoApi.setTouchType(ShopConst.SHOP_GOLD);
						Api.ShopVoApi.setTouchId(data.id);
						Api.UserinfoVoApi.setFreshInfo(true, new egret.Point(icon.localToGlobal().x+icon.width/2, icon.localToGlobal().y+icon.height/2));
						NetManager.request(NetConst.SHOP_BUYGOLD,{
							shopId : String(data.id)
						});
					},
					needClose : 1,
					id : `2_1_${data.goldGet}`,
					costnum : data.costGem,
					costIcon : `ab_mainui_gem`,
					touchMaskClose: true
				});
          	}
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