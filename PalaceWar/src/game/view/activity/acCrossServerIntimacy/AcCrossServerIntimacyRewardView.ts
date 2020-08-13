/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcCrossServerIntimacyRewardView extends CommonView
{
	public constructor() {
		super();
	}

	private get vo() : AcCrossServerIntimacyVo{
        return <AcCrossServerIntimacyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
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
		super.dispose();
	}
}