//
class AcTombRankViewTab1 extends CommonViewTab
{
	public constructor(param?) 
	{
		super();
		this.param = param;
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
		let rankInfo = view.vo.getRankInfo();
		if(rankInfo.rankList && rankInfo.rankList.length){
			rankList = rankInfo.rankList;
			// for(let i in view.vo.getRankInfo().rankList){
			// 	let unit = view.vo.getRankInfo().rankList[i];
			// 	rankList.push({
			// 		uid : unit.uid,
			// 		name : unit.name,
			// 		score : unit.score
			// 	});
			// }
		}
		
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,508,500);
        let scrollList = ComponentManager.getScrollList(AcTombRankScrollItem,rankList,rect2);
		scrollList.x = 21;
		scrollList.y = 90;
		view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
	}

	public dispose():void
	{
		super.dispose();
	}

}