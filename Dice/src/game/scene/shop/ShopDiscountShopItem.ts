
class ShopDiscountShopItem extends ScrollListItem {
	private _tipTxt : BaseTextField = null;
    private _costGroup : BaseDisplayObjectContainer = null;
	private _data : any = null;
	
	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : Config.DiscountShopItemCfg){
		let view = this;
		view._data = data;
        view.width = 612;
		view.height = 323;
		
		let isfree = index == 0;

        let bg = BaseBitmap.create(`shop_discount_item_bg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [10,10], true);
		view.addChild(bg);

		let maskGroup = new BaseDisplayObjectContainer();
		maskGroup.width = bg.width;
		maskGroup.height = bg.height;
		view.addChild(maskGroup);
		maskGroup.mask = new egret.Rectangle(10,10,maskGroup.width,maskGroup.height);


		if(App.CommonUtil.check_dragon()){
			let lb2 = App.DragonBonesUtil.getLoadDragonBones(`royalpass_lb_2`);
			maskGroup.addChild(lb2);
			// lb2.anchorOffsetX = 250;
			// lb2.anchorOffsetY = 114;
			// lb2.setPosition(view.width/2, view.height/2);
			lb2.scaleX = 1;
			lb2.scaleY = 1.35;
			lb2.setPosition(120,160);
			lb2.blendMode = egret.BlendMode.ADD;
		}

		let nameBg = BaseBitmap.create("shop_discount_item_bg2");
		view.addChild(nameBg);
		

		//礼包名字
		let nameTxt = ComponentMgr.getTextField(LangMger.getlocal(`shopdiscountItemName${data.id}`), TextFieldConst.SIZE_30);
		view.addChild(nameTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, nameBg, [30,0]);
		nameTxt.touchEnabled = false;
		nameTxt.strokeColor = ColorEnums.strokeRed;
		nameTxt.stroke = 1.5;

		let ruleBtn = ComponentMgr.getButton(`dicecardext`, ``, ()=>{
			//如果有宝箱就弹宝箱说明
			//宝箱
			App.MsgHelper.dispEvt(MsgConst.END_TOUCH_LIST, {});
			if(data.boxId){
				let boxcfg = Config.BoxCfg.getBoxCfgById(data.boxId);
				ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
					title : boxcfg.name,
					needCancel : false,
					needClose : 1,
					boxId : data.boxId,
				});
			}
        }, view)
		ruleBtn.width = ruleBtn.height = 46;
		ruleBtn.forbidClickBubble = true;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, ruleBtn, nameBg, [20,0]);
		view.addChild(ruleBtn);
		ruleBtn.visible = data.boxId && data.boxId != ``;
		
		//礼包价值
		if(data.value){
			let valuebg = BaseBitmap.create(`shopdiscountvaluebg`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, valuebg, bg, [-9,-9]);
			view.addChild(valuebg);
			valuebg.touchEnabled = false;

			let valueTxt = ComponentMgr.getTextField(LangMger.getlocal(`shopdiscountvalue`, [data.value.toString()]), TextFieldConst.SIZE_CONTENT_COMMON);
			view.addChild(valueTxt);
			valueTxt.stroke = 2;
			valueTxt.strokeColor = 0x8e3200;
			valueTxt.touchEnabled = false;
			valueTxt.anchorOffsetX = valueTxt.width / 2;
			valueTxt.anchorOffsetY = valueTxt.height / 2;
			valueTxt.rotation = 45;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, valueTxt, valuebg, [25,-25]);
		}

		let group = view.dealReward();
		view.addChild(group);
		group.touchEnabled = false;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, bg, [0,-13]);

		//购买消耗
		let costGroup = new BaseDisplayObjectContainer();
		view.addChild(costGroup);
		view._costGroup = costGroup;
		costGroup.visible = false;
		costGroup.touchEnabled = false;

		let rechargecfg = Config.RechargeCfg.getRechargeItemCfgByKey(data.cost);

		let costTxt = ComponentMgr.getTextField(`<font size=38>${rechargecfg.cost} </font><font size=26>${PlatMgr.getMoneySign()}</font>`, TextFieldConst.SIZE_30);
		costGroup.addChild(costTxt);
		costTxt.strokeColor = ColorEnums.strokeRed;
		costTxt.stroke = 1.5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, costGroup, bg, [0,12]);

		let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`shopdailyshophavebuy`), TextFieldConst.SIZE_30);
		view.addChild(tipTxt);
		view._tipTxt = tipTxt;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, bg, [0,12]);

		tipTxt.visible = Api.ShopVoApi.getTodayDiscountShopHasBuy();
		costGroup.visible = !tipTxt.visible;
		if(Api.ShopVoApi.getTodayDiscountShopHasBuy()){
			App.DisplayUtil.changeToGray(view);
		}
		else{
			App.DisplayUtil.changeToNormal(view);
		}

		let discounttag = BaseBitmap.create(`shopdiscounttag`);
		view.addChild(discounttag);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, discounttag, bg, [125,-5]);

		//折扣计算
		let discountGroup = new BaseDisplayObjectContainer();
		view.addChild(discountGroup);
		discountGroup.width = 85;
		discountGroup.height = 91;
		discountGroup.touchEnabled = false;

		let totalPrice = (data.value * rechargecfg.cost).toFixed(0);
		let priceTxt = ComponentMgr.getTextField(totalPrice, TextFieldConst.SIZE_CONTENT_COMMON, 0xFFD766);
		view.addChild(priceTxt);
		priceTxt.stroke = 2;
		priceTxt.strokeColor = 0x7E1201;
		priceTxt.anchorOffsetX = priceTxt.width / 2;
		priceTxt.anchorOffsetY = priceTxt.height / 2;

		priceTxt.rotation = -20;
		priceTxt.setPosition(37,31);
		discountGroup.addChild(priceTxt);

		let line = BaseBitmap.create(`shopdiscountline`);
		line.setPosition(8,15);
		discountGroup.addChild(line);

		let arrow = BaseBitmap.create(`shopdiscountarrow`);
		arrow.setPosition(13,45);
		discountGroup.addChild(arrow);
	
		let downTxt =  ComponentMgr.getTextField(`${((1 - 1/data.value)*100).toFixed(0)}%`, 26, 0xFFF6F5);
		discountGroup.addChild(downTxt);
		downTxt.strokeColor = 0x810101;
		downTxt.stroke = 2;
		downTxt.anchorOffsetX = priceTxt.width / 2;
		downTxt.anchorOffsetY = priceTxt.height / 2;
		downTxt.rotation = -20;
		downTxt.setPosition(50,55);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, downTxt, priceTxt, [priceTxt.textWidth+15,0]);

		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, discountGroup, discounttag);

        // bg.addTouchTap(()=>{
			
		// },view);
		
		App.CommonUtil.addTouchScaleEffect(view, ()=>{
			if(Api.ShopVoApi.getTodayDiscountShopHasBuy()){
				// ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
				// 	title : LangMger.getlocal("sysTip"),
				// 	msg : LangMger.getlocal(`sysHaveBuy`),
				// 	needCancel : false,
				// });
				return;
			}
			Api.ShopVoApi.setTouchType(ShopConst.SHOP_DISCOUNTSHOP);
			if(data.boxId){
				Api.ShopVoApi.setIsBox(true, data.boxId);
			}
			Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
			PlatMgr.pay(data.cost);
		},view);
	}

	private dealReward():BaseDisplayObjectContainer{
		let view = this;
		let data = view._data;
		let group = new BaseDisplayObjectContainer();

		//奖励类型解析
		let rewardData = [];
		//{
		// 	type : `dice`,
		// 	id : `104_411_1`
		// }
		//金币
		let goldnum = 0;
		if(data.gold){
			goldnum = data.gold;
			rewardData.push({
				type : `gold`,
				num : goldnum
			});
		}
		//钻石
		let gemnum = 0;
		if(data.gem){
			gemnum = data.gem;
			rewardData.push({
				type : `gem`,
				num : gemnum
			});
		}
		//宝箱
		if(data.boxId){
			rewardData.push({
				type : `box`,
				id : data.boxId
			});
		}
		//卡片
		if(data.card){
			rewardData.push({
				type : `dice`,
				id : data.card
			});
		}
		// rewardData = [
		// 	// {type : `gold`,num : 20000},
		// 	// {type : `gem`,num : 1000},
		// 	{type : `box`,id : `1004`},
		// 	// {type : `dice`,id : `100_401_1`}
		// ];
		if(rewardData.length == 1){
			let iconGroup = null;
			if(rewardData[0].type == `gold` || rewardData[0].type == `gem`){
				iconGroup = view.getCoinGroup(rewardData[0]);
			}
			else{
				iconGroup = view.getCardGroup(rewardData[0]);
			}
			group.addChild(iconGroup);
			group.width = iconGroup.width * iconGroup.scaleX;
			group.height = iconGroup.height * iconGroup.scaleY;
		}
		//双份奖励
		else if(rewardData.length == 2){
			let iconGroup1 = null;
			if(rewardData[0].type == `gold` || rewardData[0].type == `gem`){
				iconGroup1 = view.getCoinGroup(rewardData[0]);
			}
			else{
				iconGroup1 = view.getCardGroup(rewardData[0]);
			}
			group.addChild(iconGroup1);

			let add = BaseBitmap.create(`public_add`);
			group.addChild(add);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, add, iconGroup1, [iconGroup1.width*iconGroup1.scaleX+30,0]);

			let iconGroup2 = null;
			if(rewardData[1].type == `gold` || rewardData[1].type == `gem`){
				iconGroup2 = view.getCoinGroup(rewardData[1]);
			}
			else{
				iconGroup2 = view.getCardGroup(rewardData[1]);
			}
			group.addChild(iconGroup2);

			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, iconGroup2, add, [add.width*add.scaleX+30,0]);

			group.width = iconGroup1.width*iconGroup1.scaleX + iconGroup2.width*iconGroup2.scaleX + add.width + 40;
			group.height = iconGroup1.height*iconGroup1.scaleY;
		}
		return group;
	}
	
	public refreshView():void{
		let view = this;
		let tipTxt = view._tipTxt;
		tipTxt.visible = Api.ShopVoApi.getTodayDiscountShopHasBuy();
		view._costGroup.visible = !tipTxt.visible;
		if(Api.ShopVoApi.getTodayDiscountShopHasBuy()){
			App.DisplayUtil.changeToGray(view);
		}
		else{
			App.DisplayUtil.changeToNormal(view);
		}
	}

	private getCardGroup(unit : any):BaseDisplayObjectContainer{
		let view = this;
		let group = new BaseDisplayObjectContainer();
		group.width = 196;
		group.height = 235;

		let num = unit.num;
		let icon = null;

		if(unit.type == `box`){
			let boxcfg = Config.BoxCfg.getBoxCfgById(unit.id);
			icon = BaseLoadBitmap.create(boxcfg.icon);
			icon.width = 266;
			icon.height = 266;
			icon.anchorOffsetX = icon.width / 2;
			icon.anchorOffsetY = icon.height / 2;
			// icon.setScale(0.763/0.55);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, group, [0,15], true);
			egret.Tween.get(icon, {loop : true}).to({scaleX : 1.2, scaleY : 1.2}, 1000).to({scaleX : 1, scaleY : 1}, 1000);
		}
		else if(unit.type == `dice`){
			let rewardvo = GameData.formatRewardItem(unit.id)[0];
			icon = App.CommonUtil.getDiceIconById(rewardvo.id.toString(),1);
			icon.setScale(2.0);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, group, [0,0], true);

			let bg = BaseBitmap.create("shop_dice_light");
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, icon, [-180,-150], true);
			bg.setScale(2.0);
			egret.Tween.get(bg,{loop:true}).to({alpha:0.2},800).to({alpha:1},800);
			group.addChild(bg);
		}
		group.setScale(0.55);
		group.addChild(icon);

		if(App.CommonUtil.check_dragon() && unit.type == `box`){
			let lb3 = App.DragonBonesUtil.getLoadDragonBones(`royalpass_lb_3`);
			lb3.blendMode = egret.BlendMode.ADD;
			group.addChild(lb3);
			lb3.setPosition(icon.width/2, icon.height/2);
		}
		return group;
	}

	private getCoinGroup(unit : any):BaseDisplayObjectContainer{
		let view = this;
		let group = new BaseDisplayObjectContainer();

		let bg = BaseBitmap.create(`gold` ? `shopdailyshopbg2` : `shopdailyshopbg5`);
		group.addChild(bg);
		bg.width = 196;
		bg.height = 235;

		let num = unit.num;
		let iconstr = ``;
		if(unit.type == `gem`){
			let rechargecfg = Config.RechargeCfg.getNormalRechargeCfg();
			for(let i in rechargecfg){
				let cfg : Config.RechargeItemCfg = rechargecfg[i];
				if(num >= cfg.gemCost){
					iconstr = `shopbuygem${cfg.sortId}`;
					break;
				}
			}
		}
		else if(unit.type == `gold`){
			let buygold = Config.ShopCfg.getBuyGoldShopList();
			for(let i in buygold){
				let cfg : Config.BuyGoldShopItemCfg = buygold[i];
				if(num >= cfg.goldGet){
					iconstr = `shopbuygold${cfg.id}`;
				}
			}
		}

		let iconbg = BaseBitmap.create(unit.type == `gold` ? `shopspecialboxiconbg` : `shopgemiconbg`);
		group.addChild(iconbg);
		iconbg.width = 120;
		iconbg.height = 120;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, iconbg, bg, [0,27]);

		let icon = BaseBitmap.create(iconstr);
		group.addChild(icon);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, iconbg);

		let numTxt = ComponentMgr.getTextField(`${num}`, TextFieldConst.SIZE_24);
		group.addChild(numTxt);
		numTxt.setScale(1/0.63);
		numTxt.lineSpacing = -1;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, iconbg, [0,iconbg.height + 4]);

		let getTxt = ComponentMgr.getTextField(`${LangMger.getlocal(`shopitemtype${unit.type}`)}`, TextFieldConst.SIZE_20);
		group.addChild(getTxt);
		getTxt.strokeColor = unit.type == `gold` ? ColorEnums.strokeOrange : ColorEnums.strokeBlue;
		getTxt.setScale(1/0.63);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, getTxt, numTxt, [0,numTxt.height+20]);

		group.setScale(0.63);
		return group;
	}
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
		let view = this;
		view._tipTxt = null;
        view._costGroup.dispose();
        view._costGroup = null;
		view._data = null;
		super.dispose();
	}
}