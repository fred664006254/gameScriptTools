/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcCrossServerPowerRewardView extends CommonView
{
	public constructor() {
		super();
	}

	private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected addTabbarGroupBg():boolean{
		return true;
	}
	
	protected getTabbarTextArr():Array<string>
	{
		return [
			"atkracecrossActivityRewardTab1",
			"atkracecrossActivityRewardTab2",
		];
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkracecross_rewatdbg1",
			"atkracecross_rewatdbg2",
			"atkracecross_rewatdbg3",
			"wifeview_bottombg",
		]);
	}

	protected initView():void
	{	
		let view = this;
		view.update();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY,view.update,view); 
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_AWARD),view.update,view); 
	}

	private update():void{
		
		if(this.vo.checkZoneRewardDeddot())
		{
			this.tabbarGroup.addRedPoint(0);
		}
		else
		{
			this.tabbarGroup.removeRedPoint(0);
		}
	}

	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY,view.update,view); 
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_AWARD),view.update,view); 
		super.dispose();
	}
}