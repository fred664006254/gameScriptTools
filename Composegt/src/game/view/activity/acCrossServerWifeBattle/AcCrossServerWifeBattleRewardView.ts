/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcCrossServerWifeBattleRewardView extends CommonView
{
	public constructor() {
		super();
	}
	
	protected getTabbarTextArr():Array<string>
	{
		return [
			"acCrossServerWifeBattle_rewardTabTitle1",
			"acCrossServerWifeBattle_rewardTabTitle2",
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
	protected isShowOpenAni():boolean
	{
		return false;
	}
	private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		// let view = this;
		// view.api.setRankInfo(data.data.data);
		console.log("receiveData--->",data,data.data.data);
		this.vo.setRankData(data.data.data);
	}
	protected getTitleStr():string{
		return 'itemDropDesc_1011';
	}

	protected initView():void
	{	
		
	}

	public hide():void
	{
		AcCrossServerWifeBattleView.isOpenWin = false;
		super.hide();
	}
	public dispose():void
	{
		

		super.dispose();
	}
}