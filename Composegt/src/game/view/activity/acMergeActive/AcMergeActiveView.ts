/**
 * 合服纪念活动
 * @author 赵占涛
 */
class AcMergeActiveView extends AcCommonView{
    public constructor()
    {
        super();
    }
    public static AID:string = null;
    public static CODE:string = null;

    private get cfg() : Config.AcCfg.MergeActiveCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
    }

    private get vo() : AcMergeActiveVo{
        return <AcMergeActiveVo>Api.acVoApi.getActivityVoByAidAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
    }

    private get acTivityId() : string{
        return `${AcMergeActiveView.AID}-${AcMergeActiveView.CODE}`;
    }

	protected getRequestData(){
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_GETMERGEZONETIME,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if (data.ret) {
			AcMergeActiveViewTab1.mztime = data.data.data.mztime;
		}
	}

    public initView(){
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO,this.refreshDateForRedPoint,this);
        AcMergeActiveView.AID = this.aid;
		AcMergeActiveView.CODE = this.code;
        this.width = GameConfig.stageWidth;
        this.refreshDateForRedPoint();
	}
    private refreshDateForRedPoint() {

        if(this.vo.isHaveSignRedDot()){
			this.tabbarGroup.addRedPoint(0,null,null,-15,8);
		}
		else{
			this.tabbarGroup.removeRedPoint(0);
		}
        if(this.vo.isHaveTaskRedDot()){
			this.tabbarGroup.addRedPoint(1,null,null,-15,8);
		}
		else{
			this.tabbarGroup.removeRedPoint(1);
		}
        if(this.vo.isHaveRechargeRedDot()){
			this.tabbarGroup.addRedPoint(3,null,null,-15,8);
		}
		else{
			this.tabbarGroup.removeRedPoint(3);
		}
    }

	protected getTabbarTextArr():Array<string>
	{
		return [
            "acMergeActiveTab1Name",
            "acMergeActiveTab2Name",
            "acMergeActiveTab3Name",
            "acMergeActiveTab4Name",
		];
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([ 
            "mergeactive_descbg",
            "mergeactive_signbg",
            "mergeactive_part1",
            "mergeactive_part2",
            "mergeactive_sign1",
            "mergeactive_sign2",
            "acchristmasview_1_red",
            "recharge_diban_01",
            "commonview_titlebgshadow",
            "progress_type1_yellow2",
            "progress_type3_bg",

        ]);
	}
    public dispose():void
	{   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO,this.refreshDateForRedPoint,this);
        super.dispose();
    }
}