/**
 * 	计策选择界面
 * @author 张朝阳
 * date 2018/10/15
 * @class AllianceWarSelectServantPopupView
 */
class AllianceWarSelectPlanPopupView extends PopupView {
	
	private _scrollList:ScrollList = null;

	public constructor() {
		super();
	}
	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM,this.refreashData,this);
		let bg = BaseBitmap.create("public_tc_bg01");
		bg.width = 525;
		bg.height = 620;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,this.viewBg.y + 15);
		this.addChildToContainer(bg);

		let planList = Config.AlliancewarCfg.getItemList();
		let rect = new egret.Rectangle(0,0,bg.width - 15,bg.height - 20);
		this._scrollList = ComponentManager.getScrollList(AllianceWarSelectPlanScrollItem,planList,rect);
		this._scrollList.setPosition(bg.x + 8,bg.y + 10);
		this.addChildToContainer(this._scrollList);

		let buttomTip = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarSelectPlanPopupViewButtomTip"),20,TextFieldConst.COLOR_WARN_RED);
		buttomTip.setPosition(this.viewBg.x + this.viewBg.width/2 - buttomTip.width/2,bg.y + bg.height + 25);
		this.addChildToContainer(buttomTip);

	}
	// protected resetBgSize()
	// {
	// 	super.resetBgSize();
		
	// }
	private refreashData()
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectPlanTip"));
		let planList = Config.AlliancewarCfg.getItemList();
		this._scrollList.refreshData(planList);
	}
	/**
	 * 备战期结束关闭界面
	 */
	protected tick() {
		let periodType = Api.allianceWarVoApi.getWarPeriod();
		if(periodType != 1)
		{
			this.hide();
			return;
		}
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"acsevenitemzshi", "acsevenitemtopbg","awused",
		]);
	}
	protected getTitleStr() {

		return "allianceWarSelectPlanPopupViewTitle";
	}
	public dispose(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM,this.refreashData,this);
		this._scrollList = null;
		super.dispose();
	}
}