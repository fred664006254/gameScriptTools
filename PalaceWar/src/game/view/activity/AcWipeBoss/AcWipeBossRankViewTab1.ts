//
class AcWipeBossRankViewTab1 extends CommonViewTab
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
		return 1;
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
        // if(this._acData.rankArr)
        // {
        //     for(let i in this._acData.rankArr){
        //         rankList.push(this._acData.rankArr[i]);
        //     }
		// }
		let rankList = [];
		if(view.api.getRankInfo().rankList.length){
			rankList = view.api.getRankInfo().rankList;
		}
		
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,508,500);
        let scrollList = ComponentManager.getScrollList(AcMayDayRankScrollItem,rankList,rect2);
		scrollList.x = 31;
		scrollList.y = 90;
		view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
	}

	public dispose():void
	{
		super.dispose();
	}

}