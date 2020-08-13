/*
    author : shaoliang
    date : 2019.10.16
    desc : 天下至尊-对战记录
*/

class LadderRankView extends CommonView
{
    public constructor(){
        super();
    }

    protected getResourceList():string[]{
        
        return super.getResourceList().concat([
            "ladder_beforerank_btn","ladder_beforerank_btn_down",
            "ladder_back_btn","ladder_back_btn_down",
            `rankinglist_rankn1`,`rankinglist_rankn2`,
            `rankinglist_rankn3`,"emparena_bottom","ladder_ranktitle_bg",
            "acchristmasview_smalldescbg","acsingledayitembg",
            "battlepasscollect3-1","ladder_itemtitlebg",
            "ladder_rank_title_bg"
        ]);
    }

    private get cfg() : Config.AcCfg.LadderTournamentCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLadderTournamentVo{
        return <AcLadderTournamentVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

    protected getTitleBgName():string
	{
		return "ladderview_title";
	}

    protected getTitleStr():string
	{
		return null;
    }

    protected getTabbarTextArr():Array<string>{
        return [
			"acArenaTab2-1",
            "acwipeBossRank",
            "acLadder_rewardtab",
		];
    }

    protected getRuleInfo():string{
		return "acLadderTournamentView_rule";
    } 

    protected getRuleInfoParam():string[]
	{   
        let itemvo = GameData.formatRewardItem(this.cfg.needItem)[0];
        let buffstr = String(this.cfg.atkBuff*100)+"%"
		return [String(this.cfg.freeNum),itemvo.name,buffstr];
	}

    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_LT_GETRANK,requestData:{activeId:this.acTivityId}};
    }
    
    protected receiveData(data: { ret: boolean, data: any }): void {
		let rData:any=data.data;
		if(data.ret==false)
		{
			return;
		}
		if(rData.data.rankArr)
		{   
            Api.laddertournamentVoApi.setRankArrya(rData.data.rankArr);
		}
		if(rData.data.myrankArr)
		{   
            Api.laddertournamentVoApi.setMyRankArrya(rData.data.myrankArr);
		}
	}

    public initView()
    {
        let view = this;   
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE,this.hide,this);

        view.freshView();
        this.titleBgShadow.visible = false;

        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    }

    public freshView():void{


    }

    public tick()
    {
        if (this.tabViewData[0])
        {
            this.tabViewData[0].tick();
        }
        if (this.tabViewData[2])
        {
            this.tabViewData[2].tick();
        }
    }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE,this.hide,this);

		super.dispose();
	}
}
