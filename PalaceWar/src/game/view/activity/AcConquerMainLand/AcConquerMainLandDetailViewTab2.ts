/*
author : qinajun
*/
class AcConquerMainLandDetailViewTab2 extends CommonViewTab{
	private _tabHeight = 0;

	public constructor(data){
		super();
		this.param = data;
		this.initView();
	}

	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}
	
	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		let code = baseview.getUiCode();
		return code;
	}

	protected getTabbarTextArr():Array<string>{
		return [`skinRankPopupViewTitle`,`crossImacyOpenDesc3-2`];
	}
	
	protected initView():void{	
		let view = this;
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		view.initTabbarGroup();
		let tabArr:string[]=this.getTabbarTextArr();
		if(tabArr&&tabArr.length>0){
			this.changeTab();
		}
	}

	protected setTabBarPosition():void{
		this.tabbarGroup.x = 15;
		this.tabbarGroup.y = 10;
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