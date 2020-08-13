/**
 * 充值转盘
 * @author 赵占涛
 */
class AcMayDayRechargeView extends AcCommonView{
    public constructor(){
        super();
    }

    private _nodeContainer:BaseDisplayObjectContainer;

    public static AID:string=null;
    public static CODE:string =null;

    public static _isCircleRun:boolean = false;

    private get cfg() : Config.AcCfg.MayDayRechargeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayRechargeView.AID, AcMayDayRechargeView.CODE);
    }

    private get vo() : AcMayDayRechargeVo{
        return <AcMayDayRechargeVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayRechargeView.AID, AcMayDayRechargeView.CODE);
    }

    public initView(){
        let view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAYRECHARGE_FRESH_ITEM,this.update,this); 
        AcMayDayRechargeView.AID = view.aid;
        AcMayDayRechargeView.CODE = view.code; 
        view._nodeContainer = new BaseDisplayObjectContainer(); 
        view.addChildToContainer(view._nodeContainer);  
        this.update();
     if(PlatformManager.checkHideIconByIP())
        {
            this.tabbarGroup.setLocked(1,true);
        }
    }

     // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{
        if(index==1&&PlatformManager.checkHideIconByIP())
        {
            return false;
        }
		return true;
	}

    protected clickTabbarHandler(data:any):void
	{    
        let view = this;
        super.clickTabbarHandler(data);
    } 
    
    protected getTabbarTextArr():Array<string>
	{
		return [`AcTurnTableViewTab1_${this.code}`
		];
	}
    public hide():void 
    {
        // let curTab = this.getSelectedTab();
        if(!AcMayDayRechargeView._isCircleRun)
        {
            super.hide();
        }
        // 	if (!this._isCircleRun){
    //         super.hide();
    //     }
    }
    protected getTabbarGroupY():number
	{
		return 0;//232
    }
    
    protected getTitleButtomY():number
	{
		return 148;
	}
	protected getTitleBgName():string
	{
		return "commonview_db_04"
	}
    protected getRuleInfo():string
	{
		return "acmaydayrechargeRuleInfo" + this.code;
    } 
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "activity_charge_red",
            "itemeffect",
            "collectflag",
            
            "dailytask_box1_1","dailytask_box1_2","dailytask_box1_3",
            "dailytask_box2_1","dailytask_box2_2","dailytask_box2_3",
            "dailytask_box_light","acturntable_bg","acturntable_point",
            "acturntable_rankicon_2",
            "progress_type1_yellow","progress_type1_bg",
            "rank_biao","acnewyear_middlebg",
            "acturntable_bg2","acturntable_on","acturntable_pointcircle",
            "acturntable_7zhe","dailytask_dt_02","dailytask_dt_01","dailytask_dt_03",
            "prisonview_1",
            "common_numbg"
        ]);
    } 


    private update(): void{
         //第一页 红点
        let vo = this.vo;
        if(!vo)
        {
            return;
        }	
    }
    
    public dispose():void
	{   
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAYRECHARGE_FRESH_ITEM,this.update,this); 
        this._nodeContainer = null;
        super.dispose();
    }
}