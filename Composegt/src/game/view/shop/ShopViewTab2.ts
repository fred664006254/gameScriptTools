class ShopViewTab2 extends CommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList;
	private _shopInfoVoList:Array<any>;
	private _index:number = 0;
	private _shopid:number = 0;
	public constructor() 
	{
		super();
		this.initView();
	}
	protected initView():void
	{

		if(Api.otherInfoVoApi.getOtherInfoVo().kvmap&&Api.otherInfoVoApi.getOtherInfoVo().kvmap["check_super_pack"])
		{

		}else{
			PlatformManager.analytics37JPPoint("custom_recharge_check","check_super_pack",1);
			if(PlatformManager.checkIsJPSp())
			{
				this.request(NetRequestConst.REQUEST_OTHERINFO_SETKV,{k:"check_super_pack",v:"1"});
			}
			
		}
		this._shopInfoVoList = Api.shopVoApi.getShopInfoListByType(3);

		let tarInfoVoList = [];
		if(Api.switchVoApi.checkOpenShopVipTab()){
			for (let index = 0; index < this._shopInfoVoList.length; index++) {
				let element = this._shopInfoVoList[index];
				
				let shopItemCfg:Config.ShopItemCfg = null;
				if(element.isSpecial){
					shopItemCfg= Api.shopVoApi.getSpecialShopItemCfgById(element.id);
				} else {
					shopItemCfg= Api.shopVoApi.getShopItemCfgById(element.id);
				}
				if(this.getSheepType() == 2){
					if(shopItemCfg.needVip  && shopItemCfg.needVip > 0 ){
						if(Api.switchVoApi.checkOpenShopVipTab2() ){
							if( Api.playerVoApi.getPlayerVipLevel() >= shopItemCfg.needVip ){
								tarInfoVoList.push(element);
							}
						}else{
							tarInfoVoList.push(element);
						}
					}
				}else if (this.getSheepType() == 3){
					if(!shopItemCfg.needVip || shopItemCfg.needVip <= 0){
						tarInfoVoList.push(element);
					}
				}
			}
			if(this.getSheepType() == 2){
				tarInfoVoList.sort((dataA:Config.ShopItemCfg,dataB:Config.ShopItemCfg)=>{
					return dataA.needVip - dataB.needVip;
				});
			}
		}else{
			tarInfoVoList = this._shopInfoVoList ;
		}
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,598,GameConfig.stageHeigth - 370 -83 + 25);
		this._scrollList = ComponentManager.getScrollList(Shop3ScrollItem,tarInfoVoList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2,87);
	}
	protected getSheepType():number
	{
		return 3;
	}

	public dispose():void
	{
		this._scrollList = null;
		this._shopInfoVoList = null;
		this._index = 0;
		this._shopid = 0;
		super.dispose();
	}

}