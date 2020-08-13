/*
author : qinajun
date : 2018.4.14
desc : 世界杯竞猜活动
*/
class AcWorldCupViewTab2 extends AcCommonViewTab
{
	private _list : ScrollList = null;
	public constructor() 
	{
		super();
		this.initView();
	}
	
		
	private get cfg() : Config.AcCfg.WorldCupCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcWorldCupVo{
        return <AcWorldCupVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO), view.fresh_day, view);
		// NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO, {
		// 	activeId : view.acTivityId
		// });
		let mainview : any = ViewController.getInstance().getView('AcWorldCupView');
		view.height = mainview.tabHeight;
		view.width = mainview.tabWidth;

		let tmpRect =  new egret.Rectangle(0,0,606, view.height - 155);

		let scrollList = ComponentManager.getScrollList(AcWorldCupTab2Item, [], tmpRect, this.code);  
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, 10]);
		view.addChild(scrollList); 
		view._list = scrollList;

		view.fresh_day();
	}

	public refreshWhenSwitchBack():void{
		let view = this;
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO, {
			activeId : view.acTivityId
		});
	}

	private fresh_day():void{
		let view = this;
		view._list.refreshData(view.vo.getGuessInfo(),view.code);
		if(view.vo.getGuessInfo().length == 0){
            view._list.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
        }
	}

	public dispose():void
	{	
		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO), view.fresh_day, view);
		super.dispose();
	}
}