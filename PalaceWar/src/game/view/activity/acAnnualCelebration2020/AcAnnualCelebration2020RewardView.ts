class AcAnnualCelebration2020RewardView extends CommonView
{
    

    public constructor() {
		super();
	}

  	protected initTabbarGroup():void
	{	
		
		
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{	
			// let tabbg = BaseBitmap.create("commonview_tabbar_bg");
			// tabbg.x = 10;
			// tabbg.y = 94;
			// this.addChild(tabbg);


			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this);
			this.tabbarGroup.setSpace(0);
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			this.tabbarGroup.y+=3;
			this.tabbarGroup.x=(this.width - this.tabbarGroup.width)/2;
			this.tabbarGroup.setColor(0xe1ba86,0x472c26);

			// this.tabbarGroup.addZshi();
		}
	}

    protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_BIG_TAB2;
	}

    protected getTitleStr():string
	{
		return "acLaborDayPopupViewTitle-1";
	}


    protected getResourceList():string[]
	{
		return super.getResourceList().concat([ 
			 "progress5","progress3_bg",
			 "newsingledaytab2bg-1",
			 "arena_bottom",
            "acmidautumnview_titlebg",
            "activity_charge_red",
            "destroysametaskbg",
            "newsingledaytab2bottombg-1",
        ]);
	}  

    private get vo():AcAnnualCelebration2020Vo
	{
		 let springCelebrateVo = <AcAnnualCelebration2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code); 
		 return  springCelebrateVo;
	} 

    private get cfg() : Config.AcCfg.AnnualCelebration2020Cfg
    {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
	}

	private get code():string{
        return this.param.data.code;
    }

	private get aid():string{
        return this.param.data.aid;
    }

	protected getTabbarTextArr():Array<string>{

		return ["acAC2020_circle_reward",
                "acAC2020_celebration_task",
		];
    } 

    public initView():void
	{
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        let bottomBg = BaseBitmap.create("newsingledaytab2bg-1");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth -this.container.y;
        bottomBg.x = 0; 
        bottomBg.y = 0; 
		this.addChildToContainer(bottomBg);

		this.freshView();
    }

	public freshView():void{
        let view = this;
        if(view.vo.checkCircleRedDot()){
            view.tabbarGroup.addRedPoint(0);
        }
        else{
            view.tabbarGroup.removeRedPoint(0);
        }

        if(view.vo.checkTaskRedDot()){
            view.tabbarGroup.addRedPoint(1);
        }
        else{
            view.tabbarGroup.removeRedPoint(1);
        }


	}


    public dispose():void
	{ 
		let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        super.dispose();
    }
}