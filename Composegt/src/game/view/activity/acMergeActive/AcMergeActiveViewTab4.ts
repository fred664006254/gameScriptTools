
class AcMergeActiveViewTab4 extends CommonViewTab {

	private _scrollList:ScrollList = null;
	private aid:string = null;
	private code:string = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
	//今日充值赠送剩余时间
	private _rechargeTimeText: BaseTextField = null;
    
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
        TickManager.addTick(this.tick,this);
	}
	public initView()
	{
        this.aid = AcMergeActiveView.AID;
        this.code = AcMergeActiveView.CODE;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMC,this.refreshData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO,this.refreshData,this);
		this._aidAndCode = {"aid":this.aid,"code":this.code};
		
		let taskData = this.vo.getSortRecharge();



		let upBg = BaseBitmap.create("recharge_diban_01");
		upBg.width = GameConfig.stageWidth;
		upBg.x = 0;
		upBg.y = -5;
		this.addChild(upBg);

		this._rechargeTimeText = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveRechargeTime",[App.DateUtil.getFormatBySecond(
			Math.max(0, Math.min(this.vo.et, App.DateUtil.getWeeTs(GameData.serverTime) + 24*60*60) - GameData.serverTime)
			,1)]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rechargeTimeText.x = upBg.x + upBg.width/2 - this._rechargeTimeText.width/2;
		this._rechargeTimeText.y = upBg.y + upBg.height/2 - this._rechargeTimeText.height/2;
		this.addChild(this._rechargeTimeText);

		let shadow = BaseBitmap.create("commonview_titlebgshadow");
		shadow.width = GameConfig.stageWidth - 6;
		shadow.x = GameConfig.stageWidth/2 - shadow.width/2;
		shadow.y = 0;
		this.addChild(shadow);

		let downBg = BaseBitmap.create("recharge_diban_01");
		downBg.width = GameConfig.stageWidth;
		downBg.x = 0;
		downBg.y = GameConfig.stageHeigth - 69 - downBg.height-90 + 5;
		this.addChild(downBg);

		let bottomDesc = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveBottomDesc1"),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		bottomDesc.x = downBg.x + downBg.width/2 - bottomDesc.width/2;
		bottomDesc.y = downBg.y + downBg.height/2 - bottomDesc.height/2 - 6;
		this.addChild(bottomDesc);

		let rect = new egret.Rectangle(0,0,612,GameConfig.stageHeigth - 160 - upBg.height-downBg.height +2);

		// this._scrollList = ComponentManager.getScrollList(AcMergeActiveTaskScrollItem,taskData,rect,this._aidAndCode);

		this._scrollList = ComponentManager.getScrollList(AcMergeActiveRechargeScrollItem,taskData,rect,this._aidAndCode);

		this._scrollList.y = upBg.y + upBg.height + 3;
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
				if(cmd == NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMC)
				{
					let data = event.data.data.data;
					let rewards = data.rewards;
					let rList = GameData.formatRewardItem(rewards);
					App.CommonUtil.playRewardFlyAction(rList);
				}
				
			}
		}
		
		let taskData = this.vo.getSortRecharge();
		this._scrollList.refreshData(taskData,this._aidAndCode)
        
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([ 
			"acchristmasview_1_red"
        ]);
	}

	private tick():void
	{
        this._rechargeTimeText.text = LanguageManager.getlocal("acMergeActiveRechargeTime",[App.DateUtil.getFormatBySecond(
			Math.max(0, Math.min(this.vo.et, App.DateUtil.getWeeTs(GameData.serverTime) + 24*60*60) - GameData.serverTime)
			,1)]);
		
	}

	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMC,this.refreshData,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO,this.refreshData,this);
	    this._scrollList = null;
        this._aidAndCode = null;
		this._rechargeTimeText = null;
        TickManager.removeTick(this.tick,this);	
		super.dispose();
	}
	
}