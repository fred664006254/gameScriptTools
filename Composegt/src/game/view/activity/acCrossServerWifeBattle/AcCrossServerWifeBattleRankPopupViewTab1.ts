//
class AcCrossServerWifeBattleRankPopupViewTab1 extends CommonViewTab
{
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	// private get api() : CrossServerWipeBossVoApi{
    //     return Api.crossServerWipeBossVoApi;
    // }
	
	private get cfg() : Config.AcCfg.CrossServerWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		let view = this;

		let rankList = [];
		// if(view.api.getRankInfo().rankList.length){
		// 	rankList = view.api.getRankInfo().rankList;
		// }
        rankList = this.vo.rankData.zidrankarr;
        
		
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,508,485);
        let scrollList = ComponentManager.getScrollList(AcCrossServerWifeBattleRankScrollItem1,rankList,rect2,{aid:this.param.data.aid,code:this.param.data.code});
		scrollList.x = 41;
		scrollList.y = 110;
		view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"),TextFieldConst.COLOR_BROWN);
	}

	public dispose():void
	{
		super.dispose();
	}

}