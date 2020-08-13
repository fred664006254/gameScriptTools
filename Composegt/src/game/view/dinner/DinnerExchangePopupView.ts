/**
 * 积分兑换道具板子
 * author shaoliang
 * date 2017/10/31
 * @class DinnerExchangePopupView
 */

class DinnerExchangePopupView extends PopupView
{	
	private _pointText:BaseTextField;
	private _gemRefreshText:BaseTextField;
	private _autoRefreshText:BaseTextField;

	private _scrollContainer:BaseDisplayObjectContainer=null;

	//商品显示对象
	private _itemsContainerTab:BaseDisplayObjectContainer[] = [];

	private _isLoading : boolean = false;
	private _buyClickId:number = null;

	public constructor() {
		super();
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_SHOPITEM),this.shopItemCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_FEFRESHITEM),this.gemsRefreshCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_SCOREDINNER),this.buyItemCallback,this);

		this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._pointText.y = 11;
		this.addChildToContainer(this._pointText);

		let bg11= BaseBitmap.create("public_tc_bg01");
        bg11.width = 540;
        bg11.height = 670;
        bg11.x = this.viewBg.width/2 - bg11.width/2;
        bg11.y = 40;
        this.addChildToContainer(bg11);

		// let rect = egret.Rectangle.create();
		// rect.setTo(0,0,bg1.width-20,bg1.height-20);


		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(bg11.x-10,bg11.y+10,this.viewBg.width,bg11.height-20);
		// 中部可滑动区域
		this._scrollContainer = new BaseDisplayObjectContainer();
		let scrollView = ComponentManager.getScrollView(this._scrollContainer,rect);
		this.addChildToContainer(scrollView);
		this._scrollContainer.setPosition(0, 0);

		this.resetPointText();


		//底部
		let bottomBg:BaseBitmap = BaseBitmap.create("public_alphabg");
		bottomBg.width = 528;
		bottomBg.height = 82;
		bottomBg.setPosition(this.viewBg.width/2 - bottomBg.width/2, rect.y + rect.height + 20);
		this.addChildToContainer(bottomBg);

		let gemRefresh:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("gemRefresh")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		gemRefresh.setPosition(bottomBg.x + 20, bottomBg.y + bottomBg.height/2 - 5 -gemRefresh.height);
		gemRefresh.setColor(TextFieldConst.COLOR_BROWN);
		this.addChildToContainer(gemRefresh);

		this._gemRefreshText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		this._gemRefreshText.setPosition(gemRefresh.x +gemRefresh.width + 12, gemRefresh.y);
		this.addChildToContainer(this._gemRefreshText);
		this.resetGemRefreshtText();

		let autoRefresh:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("autoRefresh")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		autoRefresh.setColor(TextFieldConst.COLOR_BROWN);
		autoRefresh.setPosition(bottomBg.x + 20, bottomBg.y + bottomBg.height/2 + 5);
		this.addChildToContainer(autoRefresh);

		this._autoRefreshText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		this._autoRefreshText.setPosition(autoRefresh.x +autoRefresh.width + 12, autoRefresh.y);
		this.addChildToContainer(this._autoRefreshText);
		

		let refreshBtn:BaseButton = ComponentManager.getButton( ButtonConst.BTN_NORMAL_YELLOW, "refresh", this.refreshHandle, this);
		refreshBtn.setPosition(this.viewBg.width - refreshBtn.width - 40, bottomBg.y + bottomBg.height/2 - refreshBtn.height/2);
		// refreshBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(refreshBtn);

		//如果刷新时间到了
		if (Api.dinnerVoApi.getShopLastTime() - GameData.serverTime + Config.DinnerCfg.getShopReTime() <= 0) {
			this.tick();
		}
		else {
			this.resetAutoRefreshtText();
			this.refreshShowItems();
		}

		

	}
	//刷新回掉
	private shopItemCallback(p:any):void
	{	
		this._isLoading = false;
		if (p.data.ret == true) {
			this.refreshShowItems();
		}
	}
	//刷新商品
	private refreshShowItems():void
	{
		if (this._itemsContainerTab.length>0) {
			for (let k in this._itemsContainerTab) 
			{
				this._scrollContainer.removeChild(this._itemsContainerTab[k]);
			}
			this._itemsContainerTab.length = 0;
		}
		let itemsInfo = Api.dinnerVoApi.getShopInfo();
		for (let k in itemsInfo) 
		{	
			let idx:number = Number(k);
			let bgContainer:BaseDisplayObjectContainer = this.getShopItemContainer(idx);
			bgContainer.setPosition( 21+ 176 * (idx%3), 250 * Math.floor(idx/3) );
			this._scrollContainer.addChild(bgContainer);
			this._itemsContainerTab.push(bgContainer);
		}
	}

	private getShopItemContainer(key:number):BaseDisplayObjectContainer
	{
		let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();

		let itemBg:BaseBitmap = BaseBitmap.create("public_listbg");
		itemBg.width = 167;
		itemBg.height = 240;
		bgContainer.addChild(itemBg);

		let itemBg2:BaseBitmap = BaseBitmap.create("public_up3");
		// itemBg2.skewX=180;
		itemBg2.width = 167 - 10;
		itemBg2.height = 30
		itemBg2.x = 5;
		itemBg2.y = 4;
		// itemBg2.height = 218;
		bgContainer.addChild(itemBg2);

		let shopId:string = Api.dinnerVoApi.getShopInfo()[key];
		let itemCfg = Config.DinnerCfg.getShopItemCfg(shopId);

		let iconModel:RewardItemVo = GameData.formatRewardItem(itemCfg.content)[0];

		let itemName:BaseTextField = ComponentManager.getTextField(iconModel.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		itemName.setPosition(itemBg.width/2 - itemName.width/2, 7);
		bgContainer.addChild(itemName);

		let itemIcon:BaseDisplayObjectContainer = GameData.getItemIcon(iconModel,true);
		itemIcon.setPosition(itemBg.width/2 - itemIcon.width/2, 40);
		itemIcon.name = "icon";
		bgContainer.addChild(itemIcon);
		itemIcon.getChildByName("numLb").visible = false;
		
		let priceName = LanguageManager.getlocal("pointNumber");
		if(itemCfg.type == 2)
		{
			priceName = LanguageManager.getlocal("gemName");
		}
		let priceText:BaseTextField = ComponentManager.getTextField(itemCfg.cost + priceName,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		priceText.setPosition(itemBg.width/2 - priceText.width/2, itemIcon.y + itemIcon.height +3);
		priceText.setColor(TextFieldConst.COLOR_BROWN);
		bgContainer.addChild(priceText);

		let exchangeBtn:BaseButton = ComponentManager.getButton( ButtonConst.BTN_SMALL_YELLOW, "exchange", this.buyItem, this,[key]);
		exchangeBtn.setPosition(itemBg.width/2 - exchangeBtn.width/2, itemBg.height-exchangeBtn.height - 18);
		// exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);
		bgContainer.addChild(exchangeBtn);

		if ( Api.dinnerVoApi.getBuyInfo()[key+1] == 1) {
			App.DisplayUtil.changeToGray(itemIcon);
			App.DisplayUtil.changeToGray(exchangeBtn);
		}

		return bgContainer;
	}

	private buyItem(idx:number):void
	{	
		if ( Api.dinnerVoApi.getBuyInfo()[idx+1] == 1) {
			App.CommonUtil.showTip(LanguageManager.getlocal("buyItemTimesOver"));
			return;
		}
		let shopId:string = Api.dinnerVoApi.getShopInfo()[idx];
		let itemCfg = Config.DinnerCfg.getShopItemCfg(shopId);
		//此处需要判断消耗什么类型的道具
		if(!itemCfg.type || itemCfg.type == 1)
		{
			if ( Api.dinnerVoApi.getTotalScore() < itemCfg.cost) {
				App.CommonUtil.showTip(LanguageManager.getlocal("pointNumberLess"));
				return;
			}
			this.exchangeDo(idx);
		}else{
			if ( Api.playerVoApi.getPlayerGem() < itemCfg.cost) {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
				return;
			}
			//展示信息
			let message:string = LanguageManager.getlocal("shopBuyUseGem",[itemCfg.cost.toString(),GameData.formatRewardItem(itemCfg.content)[0].name]);

			//玩家所持有的元宝数
			let playerGem = Api.playerVoApi.getPlayerGem();
			//ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:rewardItemVo.num,confirmCallback:this.confirmCallbackHandler,handler:this,icon:rewardItemVo.icon,iconBg: rewardItemVo.iconBg,num:playerGem,msg:message,id : 1});
			ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW,{

				useNum: itemCfg.cost,						//物品价格
				confirmCallback: this.exchangeDo.bind(this, idx),	//确认回调函数
				handler: this,									//target
				num: playerGem,									//玩家元宝数
				msg: message,									//显示消息
				id:1											//消耗物品id  1->元宝
			});	

		}
		
	}
	private exchangeDo(idx):void
	{
		this._buyClickId = idx;
		NetManager.request(NetRequestConst.REQUEST_DINNER_SCOREDINNER,{"posId":idx+1});
	}
	private refreshHandle():void
	{
		let useNum:number = Api.dinnerVoApi.getShopNum();
		let totalNum:number = Config.DinnerCfg.getShopReset();
		if ( useNum >= totalNum) {
			App.CommonUtil.showTip(LanguageManager.getlocal("gemRefreshTimesOver"));
		}
		else {
			let needGem:number = Config.DinnerCfg.getShopNeedGem()[Api.dinnerVoApi.getShopNum()];
			let message:string = LanguageManager.getlocal("dinnerGemsRefresh",[App.StringUtil.toString(needGem)]);
			let gem = Api.playerVoApi.getPlayerGem();
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{confirmCallback:this.gemsRefreshItem,handler:this,icon:"itemicon1",iconBg: "itembg_1",num:gem,msg:message, id : 1, useNum : needGem});
		}
	}

	private gemsRefreshItem():void
	{
		let needGem:number = Config.DinnerCfg.getShopNeedGem()[Api.dinnerVoApi.getShopNum()];
		if(needGem > Api.playerVoApi.getPlayerGem()){
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return ;
		}
		NetManager.request(NetRequestConst.REQUEST_DINNER_FEFRESHITEM,{});
	}
	//手动刷新
	private gemsRefreshCallback(p:any):void
	{
		if (p.data.ret == true) {
			this.refreshShowItems();
			this.resetGemRefreshtText();
		}
	}

	//购买物品
	private buyItemCallback(p:any):void
	{
		if (p.data.ret == true) {

			let shopId:string = Api.dinnerVoApi.getShopInfo()[this._buyClickId];
			let itemCfg = Config.DinnerCfg.getShopItemCfg(shopId);
			let iconModels:RewardItemVo[] = GameData.formatRewardItem(itemCfg.content);

			App.CommonUtil.playRewardFlyAction(iconModels);

			this.resetPointText();
			this.refreshShowItems();
		}
	}

	private resetPointText():void
	{
		this._pointText.text = LanguageManager.getlocal("dinnerPoint",[Api.dinnerVoApi.getTotalScore().toString()]);
		this._pointText.x = this.viewBg.width/2 - this._pointText.width/2;
		// this._pointText.text = App.DateUtil.getFormatBySecond(1,2)
	}

	private resetGemRefreshtText():void
	{	
		let num:number = Config.DinnerCfg.getShopReset() - Api.dinnerVoApi.getShopNum();
		if (num < 0) {
			num = 0;
		}
		this._gemRefreshText.text =  num +"/"+Config.DinnerCfg.getShopReset();
	}

	private resetAutoRefreshtText():void
	{	
		let time:number = Api.dinnerVoApi.getShopLastTime() - GameData.serverTime + Config.DinnerCfg.getShopReTime();
		if (time < 0) {
			time = 0;
		}
		this._autoRefreshText.text =  App.DateUtil.getFormatBySecond(time);
	}

	public tick():void
	{
		if (this._isLoading == false && (Api.dinnerVoApi.getShopLastTime() - GameData.serverTime + Config.DinnerCfg.getShopReTime() <= 0)) {
			this._isLoading = true;
			NetManager.request(NetRequestConst.REQUEST_DINNER_SHOPITEM,{});
		}
		this.resetAutoRefreshtText();
		
	}

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_SHOPITEM),this.shopItemCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_FEFRESHITEM),this.gemsRefreshCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_SCOREDINNER),this.buyItemCallback,this);

		this._pointText = null;
		this._itemsContainerTab.length = 0;
		this._isLoading = false;
		this._buyClickId = null;
		this._scrollContainer = null;

		super.dispose();
	}
}