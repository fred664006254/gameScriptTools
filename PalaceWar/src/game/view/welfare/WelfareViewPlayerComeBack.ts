class WelfareViewPlayerComeBack extends WelfareViewTab{
	public constructor() {
		super();
	}

	protected getTabbarTextArr():Array<string>{
		return [
			`playercomebackTab1`,
			`playercomebackTab2`
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
		return Api.newrebackVoApi;
	}

	private get cfg(){
		return Config.PlayercomebackCfg;
	}

	// protected checkTabCondition(index:number):boolean{
    //     let view = this;
    //     if(index == 1 && !view.api.isInReturnTime()){
    //         App.CommonUtil.showTip(LanguageManager.getlocal(`playercomebackcodetip13`));
    //         return false;
    //     }
	// }

	protected init():void{
		super.init();
		let view = this;
		NetManager.request(NetRequestConst.REQUEST_REBACK_GETINFO,{
		})
		NetManager.request(NetRequestConst.REQUEST_FRIEND_GETINFO,{});
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK,this.checkWelfareState,this);
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
			// if(i == 1 && !view.api.isInReturnTime()){
			// 	App.DisplayUtil.changeToGray(unit);
			// }
		}
		view.tabbarGroupBg.x = -5;
		view.tabbarGroupBg.y = this.bottomBg.y;
		view.bottomBg.visible = false;

		TickManager.addTick(view.tick, view);
		view.tick();
	}

	private checkWelfareState():void{
		if(this.api.getInviteTaskRedPoint()){
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
			"playercomeback_btn_down","playercomeback_btn","newinvitelistbg1","newinvitelistbg2","newinvitelistbgkuang","newinviterewardbox",
			"playercomebacklistbg",`newinvitetitlebg`,`progress21_bg`,`progress21`,`shopview_itemtitle`,`dailyrechargelistnamebg`,`playercomebacknumorderbg`,`qingyuanitemtitlebg`
			]);
	}

	private tick():void{
		let view = this;

		if (view && view.tabbarGroup)
		{
			if(view.api.secondRed()){
				view.tabbarGroup.addRedPoint(1);
			}
			else{
				view.tabbarGroup.removeRedPoint(1);
			}
		}
	}


	public dispose():void{
		let view = this;
		TickManager.removeTick(view.tick, view);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK,this.checkWelfareState,this);
		super.dispose();
	}
}