//
class AcWipeBossShopViewTab2 extends CommonViewTab
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
		view.height = 526;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH,view.update,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSHOPBUY),view.collectHandlerCallBack,view);
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		// let Bg = BaseBitmap.create("public_9_bg4");
		// Bg.width = 628;
		// Bg.height = 526;
		// view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, Bg, view);
		// view.addChild(Bg);
		
		let tmpRect =  new egret.Rectangle(0,0,505, view.height - 20);
		let arr = view.vo.getArr('scoreMarket');
        let scrollList = ComponentManager.getScrollList(AcWipeBossShopTab2ScrollItem, arr, tmpRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [22, 65]);
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
		if(view.api.getClickType() == 'a'){
            return;
		}
		// let arr = view.vo.getArr('scoreMarket');
		// view._list.refreshData(arr, view.param.data.code);
		let index = view.api.getClickIdx();
		let item : any = view._list.getItemByIndex(index);
		item.update();
	}

	private collectHandlerCallBack(evt : egret.Event):void{
		let view = this;
		let data = evt.data;
        if(data.data.ret < 0 || view.api.getClickType() == 'a'){
            return;
		}
		let index = view.api.getClickIdx();
		let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
		let item = view._list.getItemByIndex(index);
		let pos = item.localToGlobal(67, 195);
		App.CommonUtil.playRewardFlyAction(rewardList, pos);
	}
	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH,view.update,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSHOPBUY),view.collectHandlerCallBack,view);
		view._list = null;
		super.dispose();
	}

}