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
			"acCrossServerWifeBattleRankTabTitle1",
			"acCrossServerWifeBattleRankTabTitle2",
		];
	}
	protected getResourceList():string[]
	{ 
		return super.getResourceList().concat([
			"atkracecross_rewatdbg1",
			"atkracecross_rewatdbg2",
			"atkracecross_rewatdbg3",
			"wifeview_bottombg",
			"tombrewardrankbg-1",
			"accrossserverwipeboss_rankbg",
			"accrossserverwipeboss_rank1",
			"emparena_bottom",`ladder_itemtitlebg`,
			"rankinglist_rankn1","rankinglist_rankn2","rankinglist_rankn3"
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
		return this.vo.test ? null : {requestType:NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK,requestData:{
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
		return null;
	}

	protected getTitleBgName():string{
		return `accrossserverwifebattle_rewardtitle`;
	}

	protected initView():void
	{	
		this.checkRed();
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkRed,this);
	}

	private checkRed():void{
		if(this.vo.canLqAaward()){
			this.tabbarGroup.addRedPoint(0);
		}
		else{
			this.tabbarGroup.removeRedPoint(0);
		}
	}

	public hide():void
	{
		AcCrossServerWifeBattleView.isOpenWin = false;
		super.hide();
	}
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkRed,this);

		super.dispose();
	}
}