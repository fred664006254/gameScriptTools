//
class AcLocTombRankViewTab2 extends CommonViewTab
{
	public constructor(param?) 
	{
		super();
		this.param = param;
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

	protected getListType():number
	{
		return 2;
	}

	protected initView():void
	{
		let view = this;
		let rankList = [];
		let rankInfo = view.vo.getRankInfo();
		if(rankInfo.allirankList && rankInfo.allirankList.length){
			for(let i in view.vo.getRankInfo().allirankList){
				let unit = view.vo.getRankInfo().allirankList[i];
				rankList.push({
					id : unit.aid,
					name : unit.aname,
					score : unit.score || unit[`sum(score)`],
					zid : unit.zid
				});
			}
		}
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,508,500);
        let scrollList = ComponentManager.getScrollList(AcLocTombRankScrollItem,rankList,rect2);
		scrollList.x = 21;
		scrollList.y = 90;
		view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		
	}

	public dispose():void{
		super.dispose();
	}
}