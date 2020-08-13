
class AcMoonNightTaskView extends CommonView {

	private _scrollList:ScrollList = null;
	private aid:string = null;
	private code:string = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
    private _fettersList:any = [];
    private _fettersBaseList:any = [];
    private _maskPanel:BaseDisplayObjectContainer = null;
    private _lockPeople: BaseLoadBitmap = null;
    private _lockDialog: BaseDisplayObjectContainer = null;
    
    public get vo ()
    {
       return <AcMoonNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
    }
	protected isShowOpenAni():boolean
	{
		return false;
	}
	public initView()
	{


        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONNIGHTTASKREWARD,this.refreshData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MOONNIGHT_FRESH,this.refreshData,this);
        
        this.aid = this.param.data["aid"];
        this.code = this.param.data["code"];

		this._aidAndCode = {"aid":this.aid,"code":this.code};
		let rect = new egret.Rectangle(0,0,612,GameConfig.stageHeigth - this.container.y - 10);
        let cfg = <Config.AcCfg.MoonNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = this.vo.getSortTask();
		taskData.sort((a:Config.AcCfg.MoonNightTaskItemCfg,b:Config.AcCfg.MoonNightTaskItemCfg) =>{return a.sortId - b.sortId});

		this._scrollList = ComponentManager.getScrollList(AcMoonNightTaskScrollItem,taskData,rect,this._aidAndCode);
		this._scrollList.y = 3;
		this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
		this.addChildToContainer(this._scrollList);

		//边框
        let borderBg = BaseBitmap.create("public_9v_bg03");
		borderBg.width=GameConfig.stageWidth;
		borderBg.height=GameConfig.stageHeigth - 69;
		borderBg.y = 69;
		this.addChild(borderBg);
	}
    private rechargeHandler(event:egret.Event)
    {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }
	private refreshData(event:egret.Event)
	{
		if(event)
		{
			if(event.data&&event.data.ret)
			{
				let cmd =  event.data.data.cmd;
				if(cmd == NetRequestConst.REQUEST_ACTIVITY2S_GETMOONNIGHTTASKREWARD)
				{
					let data = event.data.data.data;
					let rewards = data.rewards;
					let rList = GameData.formatRewardItem(rewards);
					App.CommonUtil.playRewardFlyAction(rList);
				}
				
			}
		}
		
		let vo  = <AcMoonNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let taskData = vo.getSortTask();
		taskData.sort((a:Config.AcCfg.MoonNightTaskItemCfg,b:Config.AcCfg.MoonNightTaskItemCfg) =>{return a.sortId - b.sortId});
		this._scrollList.refreshData(taskData,this._aidAndCode)
        
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([ 
			"acchristmasview_1_red"
        ]);
	}
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONNIGHTTASKREWARD,this.refreshData,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MOONNIGHT_FRESH,this.refreshData,this);
	    this._scrollList = null;
        this._aidAndCode = null;
        this._fettersList = [];
        this._fettersBaseList= [];
        this._maskPanel = null;
        this._lockPeople = null;
        this._lockDialog = null;
		super.dispose();
	}
	
}