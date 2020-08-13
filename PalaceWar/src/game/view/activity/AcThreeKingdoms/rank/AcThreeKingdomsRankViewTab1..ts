class AcThreeKingdomsRankViewTab1 extends CommonViewTab{
	private _tabHeight = 0;

	public constructor(data){
		super();
		this.param = data;
		this.initView();
	}

	protected getui

	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get acTivityId():string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	protected getTabbarTextArr():Array<string>{
		let arr = [];
		for(let i = 1; i < 5; ++ i){
			arr.push(App.CommonUtil.getCnByCode(`acThreeKingdomsRank1Tab${i}`, this.getUiCode()));
		}
		return arr;
	}

	protected get uiType():string
	{
		return "2";
	}


	
	protected checkTabCondition(index:number):boolean{
        let view = this;
        if(index < 3){
            return true;
        }
        if(view.vo.getMyKingdoms()){
            return true;
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsTip43-${view.getUiCode()}`) );
            return false;
        }
	}
    

	// 页签图名称
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_TAB2;
	}

	protected addTabbarGroupBg():boolean{
		return true;
	}

	// protected setTabBarPosition():void
	// {
	// 	if(this.tabbarGroup)
	// 	{
	// 		let tabX:number=0;
	// 		let tabY:number=0;
	// 		if(egret.is(this,"PopupView"))
	// 		{
	// 			tabX=this.viewBg.x+30;
	// 			tabY=this.viewBg.y+60;
	// 		}
	// 		else
	// 		{
	// 			tabX=15;
	// 			tabY=this.titleBg?this.titleBg.y+this.titleBg.height+8:100;
	// 		}
	// 		tabY+=(this.getTabbarGroupY()+3-16);
	// 		this.tabbarGroup.setPosition((this.width - this.tabbarGroup.width)/2,tabY);

	// 		if(this.tabbarGroupBg){
	// 			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.tabbarGroupBg, this.tabbarGroup, [-0,-8 + 16]);
	// 		}
			
	// 	}
	// }

	protected getBigFrame():string{
		return `commonview_bigframe`;
	}
	
	protected initView():void{	
		let view = this;
		let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		view.initTabbarGroup();
		let tabArr:string[]=this.getTabbarTextArr();
		if(tabArr&&tabArr.length>0){
			this.changeTab();	
		}
		for(let i = 0; i < 4; ++ i){
			let unit = view.tabbarGroup.getTabBar(i);
			unit.x = 150  * i;
			if(i > 2 && !this.vo.getMyKingdoms()){
				App.DisplayUtil.changeToGray(unit);
			}
		}
		this.tabbarGroupBg.x = 10;
		this.tabbarGroupBg.y = 4;
		this.tabbarGroup.setColor(0xe1ba86,0x472c26);
	}

	protected setTabBarPosition():void{
		this.tabbarGroup.x = 20;
		this.tabbarGroup.y = -5;
	}

	protected getTabbarGroupY():number{
		return this.tabbarGroup.y + this.tabbarGroup.height - this.y;
	}

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		// let rData = evt.data.data.data;
        // if(!rData){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        //     return;
        // }
		// let rewards = rData.rewards;
		// let cfg = view.cfg.recharge[view.vo.lastidx];
        // let str = `1011_0_${cfg.specialItem}_${this.code}|` + rewards;
		// let rewardList =  GameData.formatRewardItem(str);
		// let pos = this.vo.lastpos;
		// App.CommonUtil.playRewardFlyAction(rewardList,pos);
		// this.vo.lastidx = null;
	}


	private update():void{
		// let view = this;
		// if(!view.vo){
		// 	return;
		// }
		// let arr = view.updateArr(view.vo.getArr("recharge"));
		// view._scrollList.refreshData(arr,view.code);
	}

	public dispose():void{	
		let view = this;
		view._tabHeight = 0;
		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE),this.rewardCallBack,this);
		super.dispose();
	}
}