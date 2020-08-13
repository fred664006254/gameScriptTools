/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcWipeBossRewardView extends CommonView
{
	public constructor() {
		super();
	}
	
	protected getTabbarTextArr():Array<string>
	{
		return [
			"acPunishRankRewardTab1",
			"acPunishRankRewardTab2",
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
			"acwipeboss_scoreicon1",
			"acwipeboss_scoreicon2",
			"adult_lowbg",
			"rechargevie_db_01",
			"acwipeboss_namebg"
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