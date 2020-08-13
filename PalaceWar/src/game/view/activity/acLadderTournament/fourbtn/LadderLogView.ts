/*
    author : shaoliang
    date : 2019.10.16
    desc : 天下至尊-对战记录
*/

class LadderLogView extends CommonView
{   

    private _scrollList:ScrollList = null;
    private _needRefresh:boolean = false;

    public constructor(){
        super();
    }

    protected getResourceList():string[]{
        
        return super.getResourceList().concat([
            "ladder_replay","countrywarrewardview_itembg"
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

    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_LT_GETLOGS,requestData:{activeId:this.acTivityId}};
	}

     protected receiveData(data: { ret: boolean, data: any }): void {
		let rData:any=data.data;
		if(data.ret==false)
		{
			return;
		}
		if(rData.data.logs)
		{   
            Api.laddertournamentVoApi.setLogs(rData.data.logs);
		}
	}

    public initView()
    {   
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_FIGHT),this.fightCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETLOGS),this.fightCallback,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERT_BATTLE_END,this.resetInfo,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETLOGDETAIL),this.fightCallback,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE,this.hide,this);
        
        this.titleBgShadow.visible = false;
        let tipBg = BaseBitmap.create("countrywarrewardview_itembg");
        this.addChildToContainer(tipBg);

        let tipstr:string = LanguageManager.getlocal("acLadderTournament_logtitle",[String(this.cfg.maxRecord)])
        let tipMsg = ComponentManager.getTextField(tipstr, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipMsg.setPosition( GameConfig.stageWidth/2 - tipMsg.width/2, 102);
        this.addChildToContainer(tipMsg);
        tipBg.width = tipMsg.width + 80;
        tipBg.setPosition(tipMsg.x - (tipBg.width/2 - tipMsg.width/2), tipMsg.y + tipMsg.height/2 - tipBg.height/2);
            
        let listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 150;
        listbg.setPosition(8,tipBg.y+tipBg.height+7);
        this.addChildToContainer(listbg);

        let tmpRect =  new egret.Rectangle(0,0,610,listbg.height-14);
        let scrollList = ComponentManager.getScrollList(LadderLogItem,Api.laddertournamentVoApi.getLogs(),tmpRect);
		scrollList.setPosition(listbg.x+7,listbg.y+7);
        this.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollList = scrollList;
    }

    private fightCallback(evt : egret.Event):void{
        
        
        let rData = evt.data.data.data;
        if(!rData){
            return;
        }
        if (rData.pklogs)
        {   
            this._needRefresh = true;
            Api.laddertournamentVoApi.setFightData(rData);
            ViewController.getInstance().openView(ViewConst.COMMON.LADDERFORMTIONVIEW);
        }
        if (rData.logdetail)
        {   
            this._needRefresh = true;
            Api.laddertournamentVoApi.setFightData(rData.logdetail);
            ViewController.getInstance().openView(ViewConst.COMMON.LADDERFORMTIONVIEW);
        }
        if(rData.logs)
		{   
            Api.laddertournamentVoApi.setLogs(rData.logs);
            if ( this._scrollList)
            {
                this.refreshList();
            }
		}
       
    }

    private refreshList():void
    {
        this._scrollList.refreshData(Api.laddertournamentVoApi.getLogs());
    }

    public resetInfo(event:egret.Event):void
    {
        NetManager.request(NetRequestConst.REQUEST_LT_GETLOGS,{activeId:this.acTivityId});
    }

    public hide():void
    {   
        if (this._needRefresh)
        {
            NetManager.request(NetRequestConst.REQUEST_LT_GETRANK,{activeId:this.acTivityId});
        }
        super.hide();   
        
    }

    public dispose():void{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_FIGHT),this.fightCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETLOGS),this.fightCallback,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERT_BATTLE_END,this.resetInfo,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETLOGDETAIL),this.fightCallback,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE,this.hide,this);

        this._scrollList= null;
        this._needRefresh = false;
        
        super.dispose();
	}
}
