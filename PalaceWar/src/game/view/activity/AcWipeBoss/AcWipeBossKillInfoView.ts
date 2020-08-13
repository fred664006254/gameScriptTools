/**
 * 活动排名
 * author qianjun
 */
class AcWipeBossKillInfoView extends PopupView
{
	// 滑动列表
	public constructor() 
	{
		super();
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

	public initView():void{		
		let view = this;
		let contentBg = BaseBitmap.create("public_9_bg44");
		contentBg.width = 528;
		contentBg.height = 586;
		contentBg.x = view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 30;
        view.addChildToContainer(contentBg);
        
		let rankList = [];
		for(let i in this._log){
			let unit = this._log[i];
			rankList.push({
				uid : 1,
				name : unit.name,
				time : unit.ts,
				reward : unit.rewards,
				servantId :unit.servantId,
				bosstype : unit.bosstype
			})
		}
		// "ts":1537341139,"name":"宇文玥任天野","bosstype":1,"rewards":"6_1208_1","servantId":"1039"
        // if(this._acData.rankArr)
        // {
        //     for(let i in this._acData.rankArr){
        //         rankList.push(this._acData.rankArr[i]);
        //     }
        // }
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,514,566);
        let scrollList = ComponentManager.getScrollList(AcWipeBossKillInfoScrollItem,rankList,rect2,view.param.data.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, contentBg);
		view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    }

	// protected getRequestData():{requestType:string,requestData:any}
	// {
	// 	// ["activity.getdragonrank"] = "划龙舟活动排行榜",
	// 	// --返回 data.rankArr 所有人排行信息
	// 	// --返回 data.myrankArr 我的排行信息
	// 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_DBRANK,requestData:{activeId : this.acTivityId}};
	// }
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"rankinglist_line","rankinglist_rankbg"
		]);
	}

	protected getShowHeight():number{
		return 752;
	}
	
	protected getTitleStr():string{
		return 'acwipeBossAllKillInfo';
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	private _log : any[];
	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		// if(data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_DBRANK)
		// {
		// 	this._acData  = data.data.data;
		// 	//this._acVo = <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayRankPopupView.aid,AcMayDayRankPopupView.code);
		// }
		this._log = [];
		if(data.data.data.killlog && data.data.data.killlog.length){
			this._log = data.data.data.killlog;
			this.api.setKillLog(this._log);
		}
	}

	public hide():void{
		super.hide();
	}


	public dispose():void{
		let view = this;
		super.dispose();
	}
}