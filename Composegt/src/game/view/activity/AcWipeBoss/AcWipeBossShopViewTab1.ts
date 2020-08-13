//
class AcWipeBossShopViewTab1 extends CommonViewTab
{
	
	private _list : ScrollList = null;
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	
	private get api() : WipeBossVoApi{
        return Api.wipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected initView():void
	{
		let view = this;
		view.width = 526;
		view.height = 610;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH,view.update,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSHOPBUY),view.collectHandlerCallBack,view);
		// let Bg = BaseBitmap.create("public_9_bg4");
		// Bg.width = 628;
		// Bg.height = 526;
		// view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, Bg, view);
		// view.addChild(Bg);
		
		let tmpRect =  new egret.Rectangle(0,0,505, view.height - 20);
		let arr = view.vo.getArr('actMarket');
        let scrollList = ComponentManager.getScrollList(AcWipeBossShopTab1ScrollItem, arr, tmpRect, view.param.data.code);
		//110.5 65
		//56.5 
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46, 125]);
		scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2 - 5;
		scrollList.y = 125;
		view.addChild(scrollList);
		view._list = scrollList;
	}

	private rankClick():void{
		let view = this;
		// if(view.api.getCurpeirod() < 8){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
		// 	return;
		// }
		ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
	}

    private rewardClick():void{
		let view = this;
		// if(view.api.getCurpeirod() < 8){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
		// 	return;
		// }
		// else{
		// 	if(view.api.getIsWinner()){
		// 		NetManager.request(NetRequestConst.REQUST_SERVANTPK_GETPREWARD,{
		// 			activeId:view.api.vo.aidAndCode,
		// 		})
		// 	}
		// 	else{
		// 		App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip7"));
		// 		return;
		// 	}
		// }
    }


	public update(evt : egret.Event):void{
		let view = this;
		let index = view.api.getClickIdx();
		if(view.api.getClickType() == 'b'){
            return;
		}
		if(index == 0){
			let item : any = view._list.getItemByIndex(index);
			item.update();
			// let arr = view.vo.getArr('actMarket');
			// view._list.refreshData(arr, view.param.data.code);
		}
	}

	private collectHandlerCallBack(evt : egret.Event):void{
		let view = this;
		let data = evt.data;
        if(data.data.ret < 0 || view.api.getClickType() == 'b'){
            return;
		}
		let index = view.api.getClickIdx();
		if(index == 0){
			let addV = view.vo.getMyAdd();
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossShopEffectSuccess",[addV.toFixed(0)]));
			return;
		}
		else{
			let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
			let item = view._list.getItemByIndex(index);
        	let pos = item.localToGlobal(390, 50);
        	App.CommonUtil.playRewardFlyAction(rewardList, pos);
		}
		
	}

	public dispose():void
	{
		let view = this;
		view._list = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH,view.update,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSHOPBUY),view.collectHandlerCallBack,view);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
		super.dispose();
	}

}