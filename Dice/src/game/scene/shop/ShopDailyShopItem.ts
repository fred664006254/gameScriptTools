
class ShopDailyShopItem extends ScrollListItem {
	private _tipTxt : BaseTextField = null;
    private _costGroup : BaseDisplayObjectContainer = null;
	private _data : any = null;
	private _bg : BaseBitmap = null;
	private _isBegin : boolean = false;
	private _itemGroup : BaseDisplayObjectContainer = null;
	private _hadbuybg: BaseBitmap = null;
	
	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : Config.DailyShopItemCfg){
		let view = this;
		view._data = data;
        view.width = 196 + 10;
		view.height = 235 + 10;
		
		let isfree = index == 0;

		ComponentMgr.getButton(`public_alpha`, ``, ()=>{}, view);

		let bg = BaseBitmap.create(`bird_item_bg_1`);
		// bg.width = view.width - 10;
		// bg.height = view.height - 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [7,0], true);
		view.addChild(bg);
		view._bg = bg;

		let txtbg = BaseBitmap.create("shop_name_bg");
		view.addChild(txtbg);
		txtbg.x = 7;
		txtbg.y = 0;

		//商品类型 1宝箱 2金币 3钻石 4-7卡片
		let namestr = ``;
		let buynum = 1;
		let rewardData = Config.ShopCfg.getDailyShopFreeRewardById(data.id, index+1, data.diceId);
		let isBox = data.id == 1;
		let isGold = data.id == 2;
		let isGem = data.id == 3;
		let isDice = data.id > 3;

		if(isBox){
			let boxcfg = Config.BoxCfg.getBoxCfgById(rewardData.boxId);
			if(boxcfg){
				namestr = boxcfg.name;
			}			
		}
		else if(isGold || isGem){
			namestr = LangMger.getlocal(isGold ? `shopitemtypegold` : `shopitemtypegem`);
			buynum = rewardData.num;
		}
		else{
			let dicecfg = Config.DiceCfg.getCfgById(data.diceId);
			namestr = dicecfg.name;
			buynum = data.num;
			// bg.setRes(`shopdailyshopbg${dicecfg.quality}`);
			bg.setRes(`bird_item_bg_${dicecfg.quality}`);
		}

		let getTxt = ComponentMgr.getTextField(namestr, TextFieldConst.SIZE_CONTENT_NORMAL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, getTxt, txtbg, [0,2]);
		view.addChild(getTxt);
		getTxt.strokeColor = ColorEnums.strokeBlack;
		
		let itemGroup = new BaseDisplayObjectContainer();
		view.addChild(itemGroup);
		view._itemGroup = itemGroup;

		if(isBox){//
			let boxcfg = Config.BoxCfg.getBoxCfgById(rewardData.boxId);//
		
			bg.texture = ResMgr.getRes(`bird_item_bg_${Math.min(4,boxcfg.quality)}`);
			let icon = BaseLoadBitmap.create(boxcfg.icon,null,{
				callback : ()=>{
					icon.setScale(0.5);
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemGroup, bg, [0,(185 - icon.height*icon.scaleY) / 2]);
				},
				callbackThisObj : view
			});
			itemGroup.addChild(icon);
		}
		else if(isGold || isGem){
			// let rewardData = GameData.formatRewardItem(isGem ? `1_1_1` : `2_1_1`)[0];
			// let icon = GameData.getItemIcon(rewardData);
			let icon = BaseBitmap.create(isGold ? `shopbuygold1` : `shopbuygem2`);
			bg.texture = ResMgr.getRes(isGold ? `shop_gold_bg` : `shop_gem_bg`);
			// itemGroup.addChild(icon);
			itemGroup.addChild(icon);
			icon.y = -10;
			// icon.width = 100;
			// icon.height = 100;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemGroup, getTxt, [0,getTxt.height]);
		}
		else{
			let diceicon = App.CommonUtil.getDiceIconById(data.diceId,1);
			itemGroup.width = diceicon.width * diceicon.scaleX;
			itemGroup.height =diceicon.height * diceicon.scaleY;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemGroup, bg, [0,(185 - diceicon.height*diceicon.scaleX) / 2]);
			itemGroup.addChild(diceicon);	
		}

		if(isfree){
			bg.texture = ResMgr.getRes(`bird_item_bg_1`);		
		}
       
        let buyNumTxt = ComponentMgr.getTextField(`x${buynum}`, TextFieldConst.SIZE_32);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buyNumTxt, bg, [0,185 - 10 - buyNumTxt.height]);
		view.addChild(buyNumTxt);

		let costGroup = new BaseDisplayObjectContainer();
		view.addChild(costGroup);
		view._costGroup = costGroup;
		costGroup.visible = false;

		let costicon = BaseBitmap.create(`ab_mainui_${rewardData.costType == `gem` ? "gem" : "gold"}`);
		costGroup.addChild(costicon);
		// costicon.setScale(0.7);

		let costTxt = ComponentMgr.getTextField(`${rewardData.costNum * data.num}`, TextFieldConst.SIZE_24, ColorEnums.white);
		costGroup.addChild(costTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width*costicon.scaleX+10,1]);

		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, costGroup, bg, [0,8]);

		let hadBuybg = BaseBitmap.create("shop_had_buy1");
		view.addChild(hadBuybg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, hadBuybg, bg, [-7,0]);
		this._hadbuybg = hadBuybg;
		hadBuybg.visible = false;

		let tipTxt = ComponentMgr.getTextField(``, TextFieldConst.SIZE_24);
		view.addChild(tipTxt);
		view._tipTxt = tipTxt;
		view.addTouch(view.eventHandler, view);
		view.refreshView();
	}

	private scaleState():void{
		let lastScaleX:number=this.scaleX;
		let lastScaleY:number=this.scaleY;
		if(this._isBegin == true)
		{
			this.scaleX*=0.9;
			this.scaleY*=0.9;

		}
		else
		{
			this.scaleX /=0.9;
			this.scaleY /=0.9;
		}
		this.x+=(this.width*lastScaleX-this.width*this.scaleX)/2;
		this.y+=(this.height*lastScaleY-this.height*this.scaleY)/2;
	}

	private buyDaily():void{
		let view = this;
		if(Api.ShopVoApi.getTodayDailyShopHasBuyById(view._index+1)){
			/*ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
				title : LangMger.getlocal("sysTip"),
				msg : LangMger.getlocal(`sysHaveBuy`),
				needCancel : false,
			});*/
			return;
		}
		let data = view._data;
		let isBox = data.id == 1;
		let isGold = data.id == 2;
		let isGem = data.id == 3;
		let isDice = data.id > 3;
		let isfree = view._index == 0;
		let itemGroup = view._itemGroup;
		let rewardData = Config.ShopCfg.getDailyShopFreeRewardById(data.id, view._index+1, data.diceId);
		if(isfree){
			//直接买
			if(isGold || isGem){
				Api.UserinfoVoApi.setFreshInfo(true, new egret.Point(itemGroup.localToGlobal().x+itemGroup.width/2, itemGroup.localToGlobal().y+itemGroup.height/2));
			}
			else if(isBox){
				Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
			}
			Api.ShopVoApi.setTouchType(ShopConst.SHOP_DAILYSHOP);
			NetManager.request(NetConst.SHOP_BUYDAILY,{
				shopId : String(view._index + 1),
			});
		}
		else{
			let neednum = rewardData.costNum * data.num;
			let havenum = rewardData.costType == `gem` ? Api.UserinfoVoApi.getGem() : Api.UserinfoVoApi.getGold();
			if(isBox){
				let boxcfg = Config.BoxCfg.getBoxCfgById(rewardData.boxId);//
				ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
					title : boxcfg.name,
					handler : view,
					needCancel : false,
					callback : ()=>{
						let havenum = rewardData.costType == `gem` ? Api.UserinfoVoApi.getGem() : Api.UserinfoVoApi.getGold();
						if(neednum > havenum){
							ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
								title : LangMger.getlocal("sysTip"),
								msg : LangMger.getlocal(`sys${rewardData.costType}NotEnough`),
								needCancel : false,
							});
							return;
						}
						//发消息去买
						Api.ShopVoApi.setIsBox(true, rewardData.boxId);
						Api.ShopVoApi.setTouchType(ShopConst.SHOP_DAILYSHOP);
						Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
						NetManager.request(NetConst.SHOP_BUYDAILY,{
							shopId : String(view._index + 1),
						});
					},
					needClose : 1,
					boxId : rewardData.boxId,
					isbuy : true,
					costIcon : `public_icon${rewardData.costType == `gem` ? 1 : 2}`,
					costNum : neednum
				});
			}
			else if(isGold || isGem){
				//一般就是免费 直接买
				Api.UserinfoVoApi.setFreshInfo(true, new egret.Point(itemGroup.localToGlobal().x+itemGroup.width/2, itemGroup.localToGlobal().y+itemGroup.height/2));
			}
			else{
				let dicecfg = Config.DiceCfg.getCfgById(data.diceId);
				ViewController.getInstance().openView(ViewConst.BUYDICECONFIRMPOPUPVIEW, {
					title : dicecfg.name,
					handler : view,
					needCancel : false,
					callback : ()=>{
						let havenum = rewardData.costType == `gem` ? Api.UserinfoVoApi.getGem() : Api.UserinfoVoApi.getGold();
						if(neednum > havenum){
							ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
								title : LangMger.getlocal("sysTip"),
								msg : LangMger.getlocal(`sys${rewardData.costType}NotEnough`),
								needCancel : false,
							});
							return;
						}
						//发消息去买
						Api.ShopVoApi.setTouchType(ShopConst.SHOP_DAILYSHOP);
						NetManager.request(NetConst.SHOP_BUYDAILY,{
							shopId : String(view._index + 1),
						});
					},
					needClose : 1,
					id : `100_${dicecfg.id}_${data.num}`,
					costnum : rewardData.costNum * data.num,
					costIcon : `ab_mainui_${rewardData.costType == `gem` ? "gem" : "gold"}`,
					touchMaskClose:true
				});
			}
		}
	}

	private eventHandler(event:egret.TouchEvent):void{
		let view = this;
		switch(event.type){
			case egret.TouchEvent.TOUCH_BEGIN:
				this._isBegin = true;
				this.scaleState();
				break;
			case egret.TouchEvent.TOUCH_END:
				if(this._isBegin){
					this._isBegin = false;
					this.scaleState();
					this.buyDaily();
				}
				break;
			case egret.TouchEvent.TOUCH_CANCEL:
				this._isBegin = false;
				this.scaleState();
				break;
		}
	}
	
	public refreshView():void{
		let view = this;
		let tipTxt = view._tipTxt;
		let isfree = view._index == 0;

		view._costGroup.visible = false;
		if(Api.ShopVoApi.getTodayDailyShopHasBuyById(view._index+1)){
			// App.DisplayUtil.changeToGray(view);
			// App.DisplayUtil.changeToGray(view._bg);
			this._hadbuybg.visible = true;
			tipTxt.rotation = -5;
			tipTxt.strokeColor = ColorEnums.shoporedstroke;
			if(isfree){
				tipTxt.text = LangMger.getlocal(`sysget`);  
			}
			else{
				tipTxt.text = LangMger.getlocal(`shopdailyshophavebuy`);  
			}
		}
		else{
			// App.DisplayUtil.changeToNormal(view);
			// App.DisplayUtil.changeToNormal(view._bg);
			this._hadbuybg.visible = false;
			//免费
			tipTxt.rotation = 0;
			if(isfree){
				tipTxt.text = LangMger.getlocal(`sysfree`);  
			}
			else{
				view._costGroup.visible = true;
			}
		}
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, view._bg, [0,20]);
	}
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
		let view = this;
		view._hadbuybg = null;
		view._tipTxt = null;
        view._costGroup.dispose();
        view._costGroup = null;
		view._data = null;
		view._bg = null;
		view._isBegin = false;
		view._itemGroup = null;
		super.dispose();
	}
}