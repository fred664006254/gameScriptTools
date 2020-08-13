//
class AcCrossServerWipeBossAllianceInfoViewTab1 extends CommonViewTab
{
	private _sortBtn : BaseButton = null;
	private _list : ScrollList = null;
	private _sortType : number= 1;
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	
	private get api() : CrossServerWipeBossVoApi{
        return Api.crossServerWipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerWipeBossVo{
        return <AcCrossServerWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected initView():void
	{
		let view = this;
		view.width = 526;
		view.height = 526;

		
		let tmpRect =  new egret.Rectangle(0,0,505, view.height - 20);
		let arr = view.api.getWipeBossAllianceInfo(1);
		arr.sort((a,b)=>{
			let cfga = view.cfg.getBossNpcItemCfgById(a.bosstype);
			let cfgb = view.cfg.getBossNpcItemCfgById(b.bosstype);
			if(cfga.type == cfgb.type){
				return cfgb.id - cfga.id;
			}
			else{
				return cfga.type - cfgb.type;
			}
		});
        let scrollList = ComponentManager.getScrollList(AcCrossServerWipeBossAllianceInfoScrollItem, arr, tmpRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46, 65]);
		view.addChild(scrollList);
		view._list = scrollList;
		scrollList.setEmptyTip(LanguageManager.getlocal('acPunishNoData'));

		let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "accrossserverwipeBossAllInfoSort1", view.sortHandle,view)
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, scrollList, [0,scrollList.height + 75]);
		view.addChild(btn);
		view._sortType = 1;
		view._sortBtn = btn;

	}
	private sortHandle():void{
		let view = this;
		let list : any = view._list;
		let arr : any[] = list._dataList;
		arr.sort((a,b)=>{
			return view._sortType == 1 ? (a.bosstype - b.bosstype) : (b.bosstype - a.bosstype);
		});
		list.refreshData(arr,view.param.data.code);
		view._sortType = 3 - view._sortType;
		view._sortBtn.setText(`accrossserverwipeBossAllInfoSort${view._sortType}`);
	}
	private rankClick():void{
		let view = this;

		ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        
	}

 


	public getrewardCallback(evt : egret.Event):void{
		let view = this;
		let rdata = evt.data.data
        if(rdata.ret != 0)
        {
            return;
        }


        let rewards = rdata.data.rewards ;
        let rewardList = GameData.formatRewardItem(rewards);

	}

	public dispose():void
	{
		let view = this;
		view._list = null;
		view._sortBtn = null;
		super.dispose();
	}

}