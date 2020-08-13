/**
  * 中秋活动 Tab2
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnViewTab1
  */
class AcMidAutumnViewTab2 extends AcCommonViewTab {

	private _scrollList:ScrollList = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
	public constructor() {
		super();
		// this.initView();
		egret.callLater(this.initView,this);
	}

	public initView()
	{
		App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY,this.refreshData,this);
		App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB,this.refreshData,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE,this.refreshData,this);
		this._aidAndCode = {"aid":this.aid,"code":this.code};
		let rect = new egret.Rectangle(0,0,612,GameConfig.stageHeigth -this.getViewTitleButtomY() - 40)
		this._scrollList = ComponentManager.getScrollList(AcMidAutumnTaskScrollItem,null,rect,this._aidAndCode);
		this._scrollList.setPosition(15,15);
		this.addChild(this._scrollList);
		this.refreshData(null);
	}
	private refreshData(event:egret.Event)
	{
		if(event)
		{
			if(event.data&&event.data.ret)
			{
				let cmd =  event.data.data.cmd;
				if(cmd == NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB)
				{
					let data = event.data.data.data;
					let rewards = data.rewards;
					let rList = GameData.formatRewardItem(rewards);
					App.CommonUtil.playRewardFlyAction(rList);
				}
				
			}
		}
		
		let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let taskData = vo.getSortTask();
		taskData.sort((a:Config.AcCfg.MidAutumnTaskItemCfg,b:Config.AcCfg.MidAutumnTaskItemCfg) =>{return a.sortId - b.sortId});
		this._scrollList.refreshData(taskData,this._aidAndCode)
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
		App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY,this.refreshData,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB,this.refreshData,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE,this.refreshData,this);
		this._scrollList = null;
		this._aidAndCode = null;
		super.dispose();
	}
	
}