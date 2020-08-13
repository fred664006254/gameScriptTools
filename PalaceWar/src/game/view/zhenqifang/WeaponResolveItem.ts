/**
  * 神器分解item
  * author weixiaozhe
  * date 2020.5.25
  * @class WeaponResolveItem
  */
 class WeaponResolveItem extends ScrollListItem {
	private _itemData:any= null;
	public constructor() {
		super();
    }

	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void 
	{
		this._itemData = data;
		
		let cfg:Config.ServantWeaponItemCfg = (data as WeaponInfoVo).cfg;
		let servCfg = Config.ServantCfg.getServantItemById(cfg.servantID);
		let iteminfo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(cfg.itemID);
		let str = "6_" + iteminfo.id + "_" + iteminfo.num;

		this.width = 530;

		let itemBg = BaseBitmap.create("public_popupscrollitembg");
		itemBg.x = 10;
		this.addChild(itemBg);

		let icon = GameData.getRewardItemIcons(str, true, false)[0];
		icon.setScale(0.9);
		this.setLayoutPosition(LayoutConst.leftverticalCenter,icon,itemBg,[20,0]);
		this.addChild(icon);

		let nameBg = BaseBitmap.create("public_titlebg");
		nameBg.width = 240;
		nameBg.x = icon.x + icon.width*icon.scaleX + 5;
		nameBg.y = icon.y;
		this.addChild(nameBg);

		let desc1 = ComponentManager.getTextField(LanguageManager.getlocal("weaponResolveItemDesc1",[iteminfo.name,servCfg.name]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.setLayoutPosition(LayoutConst.leftverticalCenter,desc1,nameBg,[10,0]);
		this.addChild(desc1);

		let desc2 = ComponentManager.getTextField(LanguageManager.getlocal("weaponResolveItemDesc2",[String(cfg.resolveNum)]), 18, TextFieldConst.COLOR_BROWN);
		desc2.setPosition(desc1.x, nameBg.y + nameBg.height + 10);
		this.addChild(desc2);

		let dealBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "weaponResolveBtnTxt", () => 
		{
			if(iteminfo.num > 1)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.WEAPONRESOLVEITEMUSEPOPUPVIEW,{wid:data.id,itemId:iteminfo.id,maxNum:iteminfo.num,cost:cfg.resolveNum,callback:null,handler:this});
			}else
			{
				let message: string = LanguageManager.getlocal("weaponResolveSureTxt",["1",iteminfo.name,String(cfg.resolveNum)]);
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					msg : message,
					title : "itemUseConstPopupViewTitle",
					touchMaskClose : true,
					callback : ()=>
					{
						NetManager.request(NetRequestConst.REQUEST_WEAPON_RESOLVE, {weaponId:Number(data.id),num:1});
					},
					handler : this,
					needClose : 1,
					needCancel : true
				});				
			}
		}, this);
		this.setLayoutPosition(LayoutConst.rightverticalCenter,dealBtn,itemBg,[10,0]);
		this.addChild(dealBtn);
	}
	
	public getSpaceY():number {
		return 5;
	}

	public dispose():void {
		this._itemData = null;
		super.dispose();
	}
}