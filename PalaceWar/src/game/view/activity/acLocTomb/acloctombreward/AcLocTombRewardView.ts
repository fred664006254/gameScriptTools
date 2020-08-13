/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcLocTombRewardView extends CommonView
{
	public constructor() {
		super();
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
	
	protected getTabbarTextArr():Array<string>{
		return [
			"acPunishRankRewardTab1",
			"acPunishRankRewardTab2",
			"acwipeBossReward"
		];
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"atkracecross_rewatdbg1",
			"atkracecross_rewatdbg2",
			"atkracecross_rewatdbg3",
			"wifeview_bottombg",
			"wipescore1icon","wipescore2icon",
			"aobaidescnamebg"
		]);
	}

	protected getTitleStr():string{
		return 'itemDropDesc_1011';
	}

	protected initView():void{	
		
	}

	protected getRequestData():{requestType:string,requestData:any}{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRANK,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
		let view = this;
		view.vo.setRankInfo(data.data.data);
	}

	public dispose():void{
		super.dispose();
	}
}