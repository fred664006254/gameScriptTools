class AcCourierView extends AcCommonView {
    private _nodeContainer:BaseDisplayObjectContainer; 
	private _activityTimerText: BaseTextField = null;
    private _activityDesText1: BaseTextField = null; 
    private _activityDesText2: BaseTextField = null; 
    private _chineseknot:BaseBitmap =null;
    // public static AID:string=null;
    // public static CODE:string =null;
    
    private lastType:number=0; 
    private _topBg:BaseBitmap =null;
    private _topBg2:BaseBitmap =null;
 
    public static topBgHeight:number=0; 
    private curr_AcCourierVo:AcCourierVo =null;

    public constructor() {
		super();
    }
    
    /**
     * 使用的code 仅仅使用资源，cn
     */
   	public get nowCode():string
    {
        if(this.code == "6")
        {
            return "4";
        }
        else
        {
            return this.code;
        }
    }

    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
    }

    protected getTitleButtomY():number
	{
		let buttomY:number = 0;
		if(this.tabbarGroup)
		{
			buttomY=this.tabbarGroup.y+this.tabbarGroup.height+8;
		}
		else
		{
			if(this.titleBg)
			{
				buttomY=this.titleBg.y+this.titleBg.height;
			}
			else
			{
				if(this.titleTF)
				{
					buttomY=this.titleTF.y+this.titleTF.height;
				}
			}
		}
		if (this.peamBmp)
		{
			buttomY+=40;
		}

		return buttomY;
	}

	public initView():void
	{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_COURIER_LIST,this.isShowRedhot,this);  
	    App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_COURIER_REDHOT,this.isShowRedhot,this);  
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCOURIERREWARD),this.isShowRedhot,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_COURIER_ITEM,this.isShowRedhot,this);  
        
        // AcNewYearView.AID = this.aid;
        // AcNewYearView.CODE =this.code;
        
        let curr_AcCourierVo = <AcCourierVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code); 
        this.curr_AcCourierVo =curr_AcCourierVo;  
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
   
        
        let topBg:BaseBitmap = BaseBitmap.create("accourier_topbg_"+this.nowCode);
        topBg.width = GameConfig.stageWidth+18;
        topBg.y =-302;
        this.addChild(topBg);
		this._nodeContainer.addChild(topBg);
        this._topBg =topBg;

        let topBg2:BaseBitmap = BaseBitmap.create("accourier_topbg2_"+this.nowCode);
        topBg2.width = GameConfig.stageWidth+18;
        topBg2.y =-302;
		this._nodeContainer.addChild(topBg2);
        this._topBg2 =topBg2;
        this._topBg2.visible =false; 
        AcCourierView.topBgHeight =GameConfig.stageHeigth - topBg.height - topBg.y -this.container.y+5;
        

        //最底部背景
        let bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth+16;
        bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y -this.container.y+9;
        bottomBg.x = -8; 
        bottomBg.y = topBg.height + topBg.y-4; 
		this._nodeContainer.addChild(bottomBg);

    	//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._activityTimerText.x = this.nowCode == '5' ? 40 : 80;
		this._activityTimerText.y = -142; 
		this._activityTimerText.text = this.nowCode == '5' ? (LanguageManager.getlocal(`acWifeComeTimeTitle`) + '：' + curr_AcCourierVo.acTimeAndHour) : (curr_AcCourierVo.acTimeAndHour);
		this.addChildToContainer(this._activityTimerText);

        //攀升描述  1 
        this._activityDesText1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._activityDesText1.x = this.nowCode == '5' ? 40 : 80;
		this._activityDesText1.y = -102;
		this._activityDesText1.text = LanguageManager.getlocal("courieractivityDes_"+this.nowCode+"_1");
		this.addChildToContainer(this._activityDesText1);

 

        
        //中国结
        let chineseknot = BaseBitmap.create("accourier_chineseknot2_"+this.nowCode);
        chineseknot.x = this._activityDesText1.x + this._activityDesText1.width; 
        chineseknot.y = -118;
        this._chineseknot =chineseknot;
		this._nodeContainer.addChild(chineseknot);

        //攀升描述   2
        this._activityDesText2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._activityDesText2.x = chineseknot.x + chineseknot.width;
		this._activityDesText2.y = -102;
		this._activityDesText2.text = LanguageManager.getlocal("courieractivityDes_"+this.nowCode+"_2");
		this.addChildToContainer(this._activityDesText2);
        
        
        let tabName = [];
        let tabY = bottomBg.y + 24;
        let tabX = 15;  


        if(this.curr_AcCourierVo.firstRed()){
            this.tabbarGroup.addRedPoint(0);
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }

        if(this.curr_AcCourierVo.secondRed()){
            this.tabbarGroup.addRedPoint(1);
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }

        this.tabbarGroup.y = 307;
    }   

    // protected changeTab():void
    // {   
    //     super.changeTab();
    //     this.tabViewData[this.selectedTabIndex].y = 300;
    // }

    private isShowRedhot():void
    {   
        // if(AcNewYearViewTab2.isStarBoo==true)
        // { 
            if(this.curr_AcCourierVo.firstRed()){
                this.tabbarGroup.addRedPoint(0);
            }
            else{
                this.tabbarGroup.removeRedPoint(0);
            }
    
            if(this.curr_AcCourierVo.secondRed()){
                this.tabbarGroup.addRedPoint(1);
            }
            else{
                this.tabbarGroup.removeRedPoint(1);
            }
           
        // }
        // else
        // {
        //     this.public_dot2.visible = false; 
        // }
    }
    protected clickTabbarHandler(data:any):void
	{
        super.clickTabbarHandler(data);
        this.acEnd();
        if(data.index==1)
        {
           this._topBg2.visible =true;
           this._topBg.visible =true;
           this._activityTimerText.visible =false;
           this._chineseknot.visible =false;
           this._activityDesText1.visible =false;
           this._activityDesText2.visible =false;
        }
        else
        {
            this._topBg2.visible =false;
            this._topBg.visible =true;
            this._activityTimerText.visible =true;
            this._chineseknot.visible =true;
            this._activityDesText1.visible =true;
            this._activityDesText2.visible =true;
        }
        
    }
    private  acEnd():void
	{
		if(this.curr_AcCourierVo.isStart==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
	}

    protected getTabbarTextArr():Array<string>
	{
		return ["acNewYearViewTab1",
                "acCourierViewTab2_"+this.nowCode,
		];
    }
    
    protected getTitleStr():string{
        return `acCourier-${this.code}_Title`;
    }
 
    protected getTabbarGroupY():number
	{
		return 235;
	} 

    private goToRechargeHandler():void
    {
         ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    } 
    protected getRuleInfo(): string {
		return "acCourierViewRuleInfo-" + this.code;
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "acnewyear_big_package", 
            "acnewyear_bottom", 
            "acnewyear_bottom2", 
            "acnewyear_bottom3", 
            "accourier_chineseknot_" + this.nowCode,
            "acnewyear_box",  
            "accourier_chineseknot2_" + this.nowCode, 
            "acnewyear_look", 
            "acnewyear_small_package", 
            "accourier_topbg_" + this.nowCode, 
            "accourier_topbg2_" + this.nowCode,   
            "progress3",
            "progress3_bg",
            "servant_bottombg",
            "progress6_bg",
            "forpeople_bottom",
            "rechargevie_effects",
            "common_titlebg"
            
         ]);
	} 
	public dispose():void
	{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_COURIER_LIST,this.isShowRedhot,this);  
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_COURIER_REDHOT,this.isShowRedhot,this);  
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCOURIERREWARD),this.isShowRedhot,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_COURIER_ITEM,this.isShowRedhot,this);  
        this._nodeContainer = null; 
        this.lastType =0;
        this._activityTimerText =null;  
        this._activityDesText1 =null;
        this._activityDesText2 =null;
        this._chineseknot =null;
        this._topBg =null;
        this._topBg2 =null;
        AcCourierView.topBgHeight =0; 

        super.dispose();
    }
}