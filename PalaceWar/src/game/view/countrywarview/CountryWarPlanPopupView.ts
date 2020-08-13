/**
 * 	国战计策相关
 * author 张朝阳
 * date 2018/11/19
 * @class CountryWarPlanPopupView
 */
class CountryWarPlanPopupView extends PopupView
{
	private _scrollList:ScrollList =null;
	public constructor() 
	{
		super();
	}


	protected initView():void{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_BUYSTRATAGEM, this.refreashView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSTRATAGEM, this.planSuccessHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE,this.shopHandle,this);
		let bg = BaseLoadBitmap.create("countrywarplanbg");
		bg.width = 548;
		bg.height = 156;
		bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
		this.addChildToContainer(bg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarPlanPopupViewTip"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WHITE);
		tipTxt.setPosition(bg.x + 15,bg.y + 15);
		tipTxt.width = 400;
		tipTxt.lineSpacing = 3;
		this.addChildToContainer(tipTxt);


		let shopBg = BaseBitmap.create("alliance_iconbg");
		shopBg.setPosition(bg.x + bg.width - shopBg.width - 20,bg.y + bg.height / 2 - shopBg.height / 2);
		this.addChildToContainer(shopBg);

		let shopBtn = ComponentManager.getButton("alliance_exicon",null,this.shopBtnClick,this);
		shopBtn.setPosition(shopBg.x + shopBg.width / 2 - shopBtn.width / 2 - 5,shopBg.y + shopBg.height / 2 - shopBtn.height / 2)
		this.addChildToContainer(shopBtn);

		let shopName = BaseBitmap.create("alliance_ex");
		shopName.setPosition(shopBg.x + shopBg.width / 2 - shopName.width / 2,shopBg.y + shopBg.height - 10);
		this.addChildToContainer(shopName);

		let planCfg = Config.CountrywarCfg.getSecretListCfg();
		let rect = new egret.Rectangle(0,0,530,550);
		this._scrollList = ComponentManager.getScrollList(CountryWarPlanItem,planCfg,rect,{cityId:this.param.data.cityId});
		this._scrollList.setPosition(bg.x + bg.width / 2 - this._scrollList.width / 2,bg.y + bg.height + 10);
		this.addChildToContainer(this._scrollList);

	}
	private shopBtnClick()
	{
		if(Api.playerVoApi.getPlayerAllianceId()&&Api.playerVoApi.getPlayerAllianceId() != 0)
		{
			this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO,{});
			this.request(NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE,{});
			
			return;
		}
		App.CommonUtil.showTip(LanguageManager.getlocal("countryWarPlanPopupViewNotAlliance"));
	}
	private shopHandle(event:egret.Event)
	{
		if(event && event.data && event.data.ret)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEEXPOPUPVIEW);
		}
	}
	private planSuccessHandle(event:egret.Event)
	{
		if(event && event.data && event.data.ret)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("countryWarPlanSuccessTip"));
			this.hide();
		}
	}
	private refreashView(event:egret.Event)
	{
		if(event && event.data && event.data.ret)
		{
			let planCfg = Config.CountrywarCfg.getSecretListCfg();
			this._scrollList.refreshData(planCfg,{cityId:this.param.data.cityId});
		}
	}
	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"alliance_exicon","alliance_ex","alliance_iconbg","awused"
		]);
	}
	protected getShowHeight()
	{
		return 830;
	}
	protected getTitleStr()
	{
		return "countryWarPlanPopupViewTitle";
	}
	public dispose():void{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_BUYSTRATAGEM, this.refreashView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSTRATAGEM, this.planSuccessHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE,this.shopHandle,this);
		this._scrollList = null;
		super.dispose();
	}
}