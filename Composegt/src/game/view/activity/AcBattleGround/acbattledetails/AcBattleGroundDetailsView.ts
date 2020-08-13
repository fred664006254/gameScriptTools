/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcBattleGroundDetailsView extends CommonView
{
	public constructor() {
		super();
	}
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
	protected getTabbarTextArr():Array<string>
	{
		return [
			"acBattleGroundDetailsViewTab1",
			"acBattleGroundDetailsViewTab2",
			"acBattleGroundDetailsViewTab3",
            "acBattleGroundDetailsViewTab4",
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
			"acwipeboss_namebg",
            "battleground_first",
			"public_9_wordbg",
			"rank_biao",
			"atkracecross_laifa",
           	"atkracecross_laifa_text",
			"skin_myskinInfobg",
			"battleground_curtime",
			"battleground_timeover"
		]);
	} 
	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_BATTLEGROUND_GETANK,requestData:{
			activeId : view.vo.aidAndCode,
            test:1
		}};
	}
	protected initTabbarGroup():void
	{	
		this.selectedTabIndex = this.param.data.index;
		super.initTabbarGroup();

	}
	// (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{	
		if(this.vo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if(index == 1 && Api.playerVoApi.getPlayerAllianceId() == 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoAlliance") );
			return false;
		}
		if(index == 1 && !this.vo.getAttendQuality()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acBattleAllDes") );
			return false;
		}

		return true;
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if(data.ret){
            let rankData = data.data.data;
            this.vo.setRankData(rankData);

        }
	}
	// protected getTitleStr():string{
	// 	return 'itemDropDesc_1011';
	// }

	protected initView():void
	{	
		let index = this.param.data.index;
	}

	public dispose():void
	{
		

		super.dispose();
	}
}