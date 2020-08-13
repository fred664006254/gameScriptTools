class WelfareViewNewInvite extends WelfareViewTab{
	public constructor() {
		super();
	}

	protected getTabbarTextArr():Array<string>{
		return [
			`newinviteTab1`,
			`newinviteTab2`
		];
	}
	// 页签图名称
	protected getTabbarName():string|string[]{
		return ButtonConst.BTN_TAB2;
	}
	protected addTabbarGroupBg():boolean{
		return true;
	}
	
	protected get uiType():string{
		return "2";
	}

	protected getBigFrame():string{
		return `commonview_bigframe`;
	}

	protected getTabbarGroupY():number{
		return this.tabbarGroup.y + this.tabbarGroup.height;
	}
	
	private get api(){
		return Api.newinviteVoApi;
	}

	private get cfg(){
		return Config.Invitefriend2Cfg;
	}

	protected init():void{
		super.init();
		let view = this;
		NetManager.request(NetRequestConst.REQUEST_NEWINVITE_GETINFO,{
		})
		NetManager.request(NetRequestConst.REQUEST_FRIEND_GETINFO,{});
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWINVITE,this.checkWelfareState,this);
		let temW = 491;
		let temH = this.bottomBg.height + this.bottomBg.y;
		// let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
		// view.height = baseview.tabHeight;
		// view.width = baseview.tabWidth;
		view.initTabbarGroup();
		let tabArr:string[]=view.getTabbarTextArr();
		if(tabArr&&tabArr.length>0){
			view.changeTab();	
		}
		view.tabbarGroup.setColor(0xe1ba86,0x472c26);
		for(let i = 0; i < 2; ++ i){
			let unit = view.tabbarGroup.getTabBar(i);
			if(unit){
				unit.x = 150  * i;
			}
		}
		view.tabbarGroupBg.x = -5;
		view.tabbarGroupBg.y = this.bottomBg.y;
		view.bottomBg.visible = false;
	}

	private checkWelfareState():void{
		if(this.api.getInviteTaskRedPoint() || this.api.getInvitePowerRedPoint()){
			this.tabbarGroup.addRedPoint(0)
		}
		else{
			this.tabbarGroup.removeRedPoint(0)
		}
	}

	protected setTabBarPosition():void{
		let view = this;
		view.tabbarGroup.x = 0;
		view.tabbarGroup.y = this.bottomBg.y - 7;
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"newinvite_btn_down","newinvite_btn","newinvitelistbg1","newinvitelistbg2","newinvitelistbgkuang","newinviterewardbox",
			"newinvitestate1",`newinvitetitlebg`,`progress21_bg`,`progress21`,`shopview_itemtitle`,`dailyrechargelistnamebg`
			]);
	}

	public dispose():void{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWINVITE,this.checkWelfareState,this);
		super.dispose();
	}
}