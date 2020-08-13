
class AcRabbitComingRewardPopupView extends PopupView {
    public constructor() {
      	super();
    }

    private get cfg() : Config.AcCfg.RabbitComingCfg{
      	return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
  	}

  	private get vo() : AcRabbitComingVo{
      	return <AcRabbitComingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
  	}

  	private get acTivityId() : string{
    	return `${this.aid}-${this.code}`;
  	}
  
  	private get aid() : string{
      	return `${this.param.data.aid}`;
  	}

  	private get code() : string{
      	return `${this.param.data.code}`;
  	}

	protected getUiCode():string{
		let code = '';
		switch(Number(this.code)){
			case 1:
			case 2:
				code = `1`;
				break;
			default:
				code = this.code;
				break;
		}
		return code;
	}
		
	protected getTabbarTextArr():Array<string>{
		let code = this.code;
		return [
		`acPunishRankRewardTab1`,
		`acPunishRankRewardTab2`,//-${code}
		`acLuckyDrawLuckyReward-2`,
		`acThrowArrowTab3-3`
		];
	}

	protected getOffsetY():number
	{	
		return 16;
	}

	protected getResourceList(): string[] {
	return super.getResourceList().concat([
		`countrywarrewardview_itembg`,`progress3`,`progress3_bg`
	]);
	}
	
	protected initTabbarGroup():void
	{
	let tabBarTextArr:string[]=this.getTabbarTextArr();
	if(tabBarTextArr&&tabBarTextArr.length>0)
	{
		this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr,this.clickTabbarHandler,this);
		this.addChild(this.tabbarGroup);
		this.setTabBarPosition();
		this.container.y = this.getTitleButtomY();
		this.tabbarGroup.selectedIndex=this._selectedTabIndex;
		this.tabbarGroup.x = 0;
	}
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
	let view = this;
	return {requestType:NetRequestConst.REQUEST_RABBIT_RANK,requestData:{
		activeId : view.vo.aidAndCode,
	}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
	let view = this;
	view.vo.setRankInfo(data.data.data);
	}
	
	protected setTabBarPosition():void
	{
		super.setTabBarPosition();
		this.tabbarGroup.x = 0;
	}

	public initView(): void {
		let view = this;

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);

		let tab = this.param.tab ? parseInt(this.param.tab) : 0;
		if(tab){
			view.clickTabbarHandler({index : tab - 1}); 
			view.selectedTabIndex = tab - 1;
			view.tabbarGroup.selectedIndex = tab - 1;
		}

		view.freshView();
	}
	public freshView():void{
		let view = this;

		if(view.vo.getpublicRedhot3()) {
			view.tabbarGroup.addRedPoint(2);
			// this._boxRewardImg.setRes("acwealthcomingview_box_2")
		}
		else{
			view.tabbarGroup.removeRedPoint(2);
			// this._boxRewardImg.setRes("acwealthcomingview_box_1")
		}
		// if(view.vo.getpublicRedhot3()){
		//     view.tabbarGroup.addRedPoint(0);
		// }
		// else{
		//     view.tabbarGroup.removeRedPoint(0);
		// }

		// if(view.vo.getpublicRedhot2()){
		//     view.tabbarGroup.addRedPoint(1);
		// }
		// else{
		//     view.tabbarGroup.removeRedPoint(1);
		// }
	}

	protected getShowWidth():number{
		return 580;
	}

	protected getShowHeight():number{
		return 815;
	}

	protected getTitleStr(): string {
		return `atkracecrossActivityRewardViewTitle`
	}

	public dispose():void{
		let view = this;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);

		super.dispose();
	}
}