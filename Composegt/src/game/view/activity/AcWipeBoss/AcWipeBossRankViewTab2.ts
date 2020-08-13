//
class AcWipeBossRankViewTab2 extends CommonViewTab
{
	public constructor(param?) 
	{
		super();
		this.param = param;
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

	protected getListType():number
	{
		return 2;
	}

	protected initView():void
	{
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		let view = this;
		// let rankList = [{
		// 	uid : 1,
		// 	name : "aad",
		// 	value : 12
		// }];
		let rankList = [];
		if(view.api.getRankInfo().allirankList.length){
			rankList = view.api.getRankInfo().allirankList;
		}
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,508,485);
        let scrollList = ComponentManager.getScrollList(AcMayDayRankScrollItem,rankList,rect2);
		scrollList.x = 41;
		scrollList.y = 110;
		view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"),TextFieldConst.COLOR_BROWN);
		
	}

	public dispose():void{
		super.dispose();
	}
}