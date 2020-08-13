/**
  * 中秋活动 Tab3
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnViewTab3
  */
class AcMidAutumnViewTab3 extends AcCommonViewTab {
	private _scrollList:ScrollList = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
	public constructor() {
		super();
		this.initView();
	}

	public initView()
	{
		App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMC,this.refreshData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE,this.refreshData,this);
		this._aidAndCode = {"aid":this.aid,"code":this.code};
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rect = new egret.Rectangle(0,0,612,GameConfig.stageHeigth -this.getViewTitleButtomY() - 40)
		this._scrollList = ComponentManager.getScrollList(AcMidAutumnRechargeScrollItem,cfg.rechargeList(),rect,this._aidAndCode);
		this._scrollList.setPosition(15,15);
		this.addChild(this._scrollList);
		this.refreshData(null);

		let bottomBg = BaseBitmap.create("public_9v_bg03");
		bottomBg.width = 640;
		bottomBg.height = GameConfig.stageHeigth - 205+54;
		bottomBg.x = 0;
		bottomBg.y = 0;
		this.addChild(bottomBg);
	}
	/**
	 * 刷新数据
	 */
	private refreshData(event:egret.Event)
	{
		if(event)
		{
			if(event.data&&event.data.ret)
			{
				let cmd =  event.data.data.cmd;
				if(cmd == NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMC)
				{
					let data = event.data.data.data;
					let rewards = data.rewards;
					let oldRewards = data.cfrewards;
					let rList = GameData.formatRewardItem(rewards);
					App.CommonUtil.playRewardFlyAction(rList);
					if(rewards != oldRewards)
					{
						let rewardvo = GameData.formatRewardItem(oldRewards)[0];
						let wife = Config.WifeCfg.getWifeCfgById(rewardvo.id);
						ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":wife.name,"touch":wife.exchange,"message":"changeOtherRewardTip"});

					}
				}
				
			}

		let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let rechargeData = vo.getSortRecharge();
		rechargeData.sort((a:Config.AcCfg.MidAutumnRechargeItemCfg,b:Config.AcCfg.MidAutumnRechargeItemCfg) =>{return a.sortId - b.sortId});
		this._scrollList.refreshData(rechargeData,this._aidAndCode);
    	}
	}
	/**
	 * 切换标签
	 */
	public refreshWhenSwitchBack()
	{
		this.refreshData(null);
	}
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMC,this.refreshData,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE,this.refreshData,this);
		this._aidAndCode = null;
		this._scrollList = null;
		super.dispose();
	}
	
}