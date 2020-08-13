/**
 * 	计策选择界面
 * @author jiangly
 * date 2018/10/15
 * @class AcCrossServerHegemonySelectPlanPopupView
 */
class AcCrossServerHegemonySelectPlanPopupView extends PopupView {
	
	private _scrollList:ScrollList = null;
	private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
	public constructor() {
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM,this.refreashData,this);
		let bg = BaseBitmap.create("public_9_bg32"); //bg32
		bg.width = 525;
		bg.height = 620;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,this.viewBg.y + 15);
		this.addChildToContainer(bg);
		bg.visible = false;

		let planList = this.cfg.getItemList();//Config.AlliancewarCfg.getItemList();
		let rect = new egret.Rectangle(0,0,bg.width - 15,bg.height - 20);
		this._scrollList = ComponentManager.getScrollList(AcCrossServerHegemonySelectPlanScrollItem,planList,rect,{aid:this.param.data.aid,code:this.param.data.code,matchId:this.param.data.matchId,servantInfo:this.param.data.servantInfo});
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
	private refreashData(event?:egret.Event)
	{
		if (event && event.data && event.data.ret){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectPlanTip"));
			this.hide();
		}
		// let planList = this.cfg.getItemList();//Config.AlliancewarCfg.getItemList();
		// this._scrollList.refreshData(planList,{aid:this.param.data.aid,code:this.param.data.code,matchId:this.param.data.matchId,servantInfo:this.param.data.servantInfo});
	}
	/**
	 * 备战期结束关闭界面
	 */
	protected tick() {
		let periodType = this.vo.checkStatusByMatchId(Number(this.param.data.matchId));//Api.allianceWarVoApi.getWarPeriod();
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
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM,this.refreashData,this);
		this._scrollList = null;
		super.dispose();
	}
}