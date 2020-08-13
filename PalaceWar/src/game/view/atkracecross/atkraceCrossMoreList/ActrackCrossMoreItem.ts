
class ActrackCrossMoreItem extends AtkLogScrollItem 
{

	private zid:number =0;
	public constructor() 
	{
		super();
	}

	protected initItem(index: number, data: any,itemParam?:any) 
    {
		this.zid =data.info.zid;
		super.initItem(index,data,itemParam);
	}
	/**
	 * 是否是跨服
	 */
	protected checkIsCross():boolean
	{
		return true;
	}

    private get vo() : AcCrossServerAtkRaceVo{
        return <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
    }	
	//挑战
	protected challengBtnHandler(evt:egret.TouchEvent):void
	{
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");		
		if(GameData.serverTime>crossVo.et-86400)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
 		if(Api.atkracecrossVoApi.isCanJoin==false)
        {
            let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
            let key = App.CommonUtil.getCrossLeagueCn(`atkraceNoDes`,crossVo.isCrossLeague());
            if(this.vo.checkIsFengyun())
            {
                key = "atkraceNoDes_fengyun";
            }			
			App.CommonUtil.showTip(LanguageManager.getlocal(key));
            return 
        }

		var data:any =[];
		data.type=1;//挑战
		data.uid=this.data.uid;
		data.zid =this.zid;
		AtkraceCrossChallengeItem.data =data;
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSCHALLENGEVIEW);
	}

	public dispose(): void {

		this.zid =0;
		super.dispose();
	}
}