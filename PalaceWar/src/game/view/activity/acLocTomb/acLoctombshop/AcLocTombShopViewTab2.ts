//
class AcLocTombShopViewTab2 extends CommonViewTab
{
	private _list : ScrollList = null;
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}

	private get cfg() : Config.AcCfg.LocTombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLocTombVo{
        return <AcLocTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

	protected initView():void
	{
		let view = this;
		view.width = 526;
		view.height = 526;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH,view.update,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBSHOPBUY),view.collectHandlerCallBack,view);

		let tmpRect =  new egret.Rectangle(0,0,505, view.height - 20);
		let arr = view.vo.getArr('scoreMarket');
        let scrollList = ComponentManager.getScrollList(AcLocTombShopTab2ScrollItem, arr, tmpRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [22, 65]);
		view.addChild(scrollList);
		view._list = scrollList;
	}

	public update(evt : egret.Event):void{
		let view = this;
		if(view.vo.getClickType() == 'a'){
            return;
		}
		let index = view.vo.getClickIdx();
		let item : any = view._list.getItemByIndex(index);
		item.update();
	}

	private collectHandlerCallBack(evt : egret.Event):void{
		let view = this;
		let data = evt.data;
        if(data.data.ret < 0 || view.vo.getClickType() == 'a'){
            return;
		}
		let index = view.vo.getClickIdx();
		let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
		let item = view._list.getItemByIndex(index);
		let pos = item.localToGlobal(67, 195);
		App.CommonUtil.playRewardFlyAction(rewardList, pos);
	}
	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH,view.update,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBSHOPBUY),view.collectHandlerCallBack,view);
		view._list = null;
		super.dispose();
	}

}