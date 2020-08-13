
class AcMergeActiveViewTab2 extends CommonViewTab {

	private _scrollList:ScrollList = null;
	private aid:string = null;
	private code:string = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
    
    private get cfg() : Config.AcCfg.MergeActiveCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
    }

    private get vo() : AcMergeActiveVo{
        return <AcMergeActiveVo>Api.acVoApi.getActivityVoByAidAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
    }

    private get acTivityId() : string{
        return `${AcMergeActiveView.AID}-${AcMergeActiveView.CODE}`;
    }

	public constructor() 
	{
		super();
		this.initView();
	}
	public initView()
	{
        this.aid = AcMergeActiveView.AID;
        this.code = AcMergeActiveView.CODE;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMT,this.refreshData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO,this.refreshData,this);
		this._aidAndCode = {"aid":this.aid,"code":this.code};
        let cfg = <Config.AcCfg.MergeActiveCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = this.vo.getSortTask();
		taskData.sort((a:Config.AcCfg.MergeActiveTaskItemCfg,b:Config.AcCfg.MergeActiveTaskItemCfg) =>{return a.sortId - b.sortId});

		let downBg = BaseBitmap.create("recharge_diban_01");
		downBg.width = GameConfig.stageWidth;
		downBg.x = 0;
		downBg.y = GameConfig.stageHeigth - 69 - downBg.height-90 + 5;
		this.addChild(downBg);

		let bottomDesc = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveBottomDesc1"),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		bottomDesc.x = downBg.x + downBg.width/2 - bottomDesc.width/2;
		bottomDesc.y = downBg.y + downBg.height/2 - bottomDesc.height/2 - 6;
		this.addChild(bottomDesc);

		let rect = new egret.Rectangle(0,0,612,GameConfig.stageHeigth - 160 - downBg.height);
		this._scrollList = ComponentManager.getScrollList(AcMergeActiveTaskScrollItem,taskData,rect,this._aidAndCode);
		this._scrollList.y = 3;
		this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
		this.addChild(this._scrollList);

		//边框
        let borderBg = BaseBitmap.create("public_9v_bg03");
		borderBg.width=GameConfig.stageWidth;
		borderBg.height=GameConfig.stageHeigth - 153;
		borderBg.y = 0;
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
				if(cmd == NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMT)
				{
					let data = event.data.data.data;
					let rewards = data.rewards;
					let rList = GameData.formatRewardItem(rewards);
					App.CommonUtil.playRewardFlyAction(rList);
				}
				
			}
		}
		
		let vo  = <AcMergeActiveVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let taskData = vo.getSortTask();
		taskData.sort((a:Config.AcCfg.MergeActiveTaskItemCfg,b:Config.AcCfg.MergeActiveTaskItemCfg) =>{return a.sortId - b.sortId});
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
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMT,this.refreshData,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO,this.refreshData,this);
	    this._scrollList = null;
        this._aidAndCode = null;
		super.dispose();
	}
	
}