//
class AcLocTombAllianceInfoViewTab1 extends CommonViewTab
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
        return this.param.data.aid;
	}
	
	private get code() : string{
        return this.param.data.code;
	}

	protected initView():void
	{
		let view = this;
		view.width = 526;
		view.height = 526;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOCTOMB_FRESH,view.getrewardCallback,view);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		// let Bg = BaseBitmap.create("public_9_bg4");
		// Bg.width = 628;
		// Bg.height = 526;
		// view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, Bg, view);
		// view.addChild(Bg);
		
		let tmpRect =  new egret.Rectangle(0,0,505, view.height - 20);
		let arr = view.vo.getWipeBossAllianceInfo(1);
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
		view._sortType = 2;
        let scrollList = ComponentManager.getScrollList(AcLocTombAllianceInfoScrollItem, arr, tmpRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [22, 65]);
		view.addChild(scrollList);
		scrollList.setEmptyTip(LanguageManager.getlocal('acPunishNoData'));
		view._list = scrollList;

		let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acwipeBossAllInfoSort1", view.sortHandle,view)
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, scrollList, [0,scrollList.height + 50]);
		view.addChild(btn);
		view._sortType = 1;
		view._sortBtn = btn;
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

	private sortHandle():void{
		let view = this;
		let list : any = view._list;
		let arr : any[] = list._dataList;
		view._sortType = 3 - view._sortType;
		arr.sort((a,b)=>{
			let cfga = view.cfg.getBossNpcItemCfgById(a.bosstype);
			let cfgb = view.cfg.getBossNpcItemCfgById(b.bosstype);
			if(cfga.type == cfgb.type){
				return view._sortType == 1 ? (cfgb.id - cfga.id) : (cfga.id - cfgb.id);
			}
			else{
				return view._sortType == 1 ? (cfga.type - cfgb.type) : (cfgb.type - cfga.type);
			}
		});
		list.refreshData(arr,view.param.data.code);
		view._sortBtn.setText(`acwipeBossAllInfoSort${view._sortType}`);
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


	public getrewardCallback():void{
		let view = this;
		let item = <AcLocTombAllianceInfoScrollItem>view._list.getItemByIndex(view.vo.clickIdx);
		if(item){
			view.vo.clickIdx = -1;
			item.confirmCallbackHandler();
		}
	}

	public dispose():void
	{
		let view = this;
		view._list = null;
		view._sortBtn = null;
		view._sortType = 1;
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LOCTOMB_FRESH,view.getrewardCallback,view);
		super.dispose();
	}

}