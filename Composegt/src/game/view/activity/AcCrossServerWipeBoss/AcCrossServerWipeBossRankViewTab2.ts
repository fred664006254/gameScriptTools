//
class AcCrossServerWipeBossRankViewTab2 extends CommonViewTab
{
	public constructor(param?) 
	{
		super();
		this.param = param;
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
		if(view.api.getRankInfo().serverrankList.length){
			rankList = view.api.getRankInfo().serverrankList;
		}
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,508,485);
        let scrollList = ComponentManager.getScrollList(AcCrossServerWipeBossRankScrollItem2,rankList,rect2);
		scrollList.x = 41;
		scrollList.y = 110;
		view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"),TextFieldConst.COLOR_BROWN);
		
	}

	public dispose():void{
		super.dispose();
	}
}