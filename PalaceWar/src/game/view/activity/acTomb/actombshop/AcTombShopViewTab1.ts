//
class AcTombShopViewTab1 extends CommonViewTab
{
	
	private _list : ScrollList = null;
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	
	private get cfg() : Config.AcCfg.TombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcTombVo{
        return <AcTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

	private getUicode():string{
		let baseview : any = ViewController.getInstance().getView('AcTombView');
		return baseview.getUiCode();
	}

	protected initView():void
	{
		let view = this;
		view.width = 526;
		view.height = 526;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_TOMB_REFRESH,view.update,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY),view.collectHandlerCallBack,view);
		
		let tmpRect =  new egret.Rectangle(0,0,505, view.height - 20);
		let arr = view.vo.getArr('actMarket');
        let scrollList = ComponentManager.getScrollList(AcTombShopTab1ScrollItem, arr, tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [22+6, 65]);
		view.addChild(scrollList);
		view._list = scrollList;
	}

	public update(evt : egret.Event):void{
		let view = this;
		let index = view.vo.getClickIdx();
		if(view.vo.getClickType() == 'b'){
            return;
		}
		let item : any = view._list.getItemByIndex(index);
		item.update();
	}

	private collectHandlerCallBack(evt : egret.Event):void{
		let view = this;
		let code = view.getUicode();
		let data = evt.data;
        if(data.data.ret < 0 || view.vo.getClickType() == 'b'){
            return;
		}
		if(data.data.data.killAllBoss){
			App.CommonUtil.showTip(LanguageManager.getlocal(`loctombkillalltip-${code}`));
			return;
		}
		let index = view.vo.getClickIdx();
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
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TOMB_REFRESH,view.update,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY),view.collectHandlerCallBack,view);
		super.dispose();
	}

}