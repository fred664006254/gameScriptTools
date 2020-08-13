/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcCrossServerWipeBossRewardView extends CommonView
{
	public constructor() {
		super();
	}
	
	protected getTabbarTextArr():Array<string>
	{
		return [
			"acCrossServerWipeBoss_rewardTabTitle1",
			"acCrossServerWipeBoss_rewardTabTitle2",
			"acwipeBossReward"
		];
	}
	protected getResourceList():string[]
	{ 
		return super.getResourceList().concat([
			"atkracecross_rewatdbg1",
			"atkracecross_rewatdbg2",
			"atkracecross_rewatdbg3",
			"wifeview_bottombg",
			"accrossserverwipeboss_scoreicon1",
			"accrossserverwipeboss_scoreicon2",
			"adult_lowbg",
			"rechargevie_db_01",
			"accrossserverwipeboss_namebg",
			"accrossserverwipeboss_first",
			"accrossserverwipeboss_rankbg",
			"accrossserverwipeboss_rank1"
		]);
	} 

	protected getTitleStr():string{
		return 'itemDropDesc_1011';
	}

	protected initView():void
	{	
		
	}

	public dispose():void
	{
		

		super.dispose();
	}
}