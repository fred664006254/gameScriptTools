/*
author : qianjun
date : 2018.4.14
desc : 转盘活动
*/
class AcMayDayView extends AcCommonView{
    public constructor(){
        super();
    }

    private _nodeContainer:BaseDisplayObjectContainer;

    private public_dot1:BaseBitmap =null;
    private public_dot2:BaseBitmap =null;
    private public_dot3:BaseBitmap =null;

    public static AID:string=null;
    public static CODE:string =null;

    public static _isCircleRun:boolean = false;

    private get cfg() : Config.AcCfg.MayDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }

    private get vo() : AcMayDayVo{
        return <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }

    public initView(){
        let view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 
        AcMayDayView.AID = view.aid;
        AcMayDayView.CODE = view.code; 
        view._nodeContainer = new BaseDisplayObjectContainer(); 
        view.addChildToContainer(view._nodeContainer);

        //红点1
        let public_dot1 =BaseBitmap.create("public_dot2");
        this.addChild(public_dot1); ;
        public_dot1.x = 135;
        public_dot1.y = this.tabbarGroup.y; 
		this.public_dot1 = public_dot1;

        //红点2
        let public_dot2 =BaseBitmap.create("public_dot2");
        this.addChild(public_dot2); ;
        public_dot2.x = 135 + 149;//295;
        public_dot2.y = this.tabbarGroup.y; 
		this.public_dot2 = public_dot2;

         //红点3
        let public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3); ;
        public_dot3.x = public_dot2.x + 149;//455;
        public_dot3.y = this.tabbarGroup.y; 
        this.public_dot3 = public_dot3; 
      
    

        public_dot1 = public_dot2 = public_dot3 = null;
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
        // let picNmae = Number(data.index) + 1;
        // view._topName.visible = false;
        // view._descBg.visible = view._topMan.visible = (picNmae == 1);
        // if(ResourceManager.getRes(`acturntable_top_bg${picNmae}_${this.code}`)){
        //     view._topBg.setload(`acturntable_top_bg${picNmae}_${this.code}`);
        // }
        // else{
        //     view._topBg.setload(`acturntable_top_bg${picNmae}_1`);
        // }
        
        // view._activityDescText.text =  LanguageManager.getlocal(`AcTurnTableViewTabDesc${picNmae}_${this.code}`);
        // if(ResourceManager.getRes(`acturntable_tab${picNmae}_${this.code}text`)){
        //     view._topName.setload(`acturntable_tab${picNmae}_${this.code}text`, null, {callback : ()=>{
        //         view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 440) : (GameConfig.stageWidth - 351 - 19);
        //         if(Number(view.code) == 1){
        //             view._topName.y = picNmae == 1 ? -245 : -210;
        //         }
        //         else{
        //             view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 340) : (GameConfig.stageWidth - 351 - 19);
        //             view._topName.y = picNmae == 3 ? -230 : -210;
        //         }
                
        //         view._topName.visible = true;
        //     },callbackThisObj : this});
        // }
        // else{
        //     view._topName.setload(`acturntable_tab${picNmae}_1text`, null, {callback : ()=>{
        //         view._topName.x = picNmae == 3 ? (GameConfig.stageWidth - 440) : (GameConfig.stageWidth - 351 - 19);
        //         view._topName.y = picNmae == 1 ? -245 : -210;
        //         view._topName.visible = true;
        //     },callbackThisObj : this});
        // }
        // view._activityTimerText.y = picNmae == 1 ? -140 : -150;
        // view._activityDescText.y = picNmae == 1 ? -110 : -120;
    } 
    
    protected getTabbarTextArr():Array<string>
	{
		return [`AcTurnTableViewTab1_${this.code}`, 
                `AcTurnTableViewTab2_${this.code}`,
                `AcTurnTableViewTab3_${this.code}`
		];
	}
    public hide():void 
    {
        // let curTab = this.getSelectedTab();
        if(!AcMayDayView._isCircleRun)
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
		return "acMatDatRule" + this.code;
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
            "prisonview_1"
        ]);
    } 


    private update(): void{
         //第一页 红点
        let vo = this.vo;
        if(!vo)
        {
            return;
        }	
         if(this.public_dot1)
         {
             this.public_dot1.visible = vo.getpublicRedhot1();
         }
         //第二页 红点
         if(this.public_dot2)
         {
              this.public_dot2.visible =  vo.getpublicRedhot2();
         }    
 
         //第三页 红点
         if(this.public_dot3)
         {
              this.public_dot3.visible =  vo.getpublicRedhot3();
         }    
    }
    
    public dispose():void
	{   
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 


        this._nodeContainer = null;
        this.public_dot1 = null;
        this.public_dot2 = null;
        this.public_dot3 = null;

        super.dispose();
    }
}