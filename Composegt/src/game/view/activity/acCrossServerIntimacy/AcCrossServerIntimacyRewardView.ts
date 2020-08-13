/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcCrossServerIntimacyRewardView extends CommonView
{
	public constructor() {
		super();
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
			// "itemeffect",
		]);
	}

	protected initView():void
	{	
		
	}

	public dispose():void
	{
		

		super.dispose();
	}
}