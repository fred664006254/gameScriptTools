class AcEnjoyNightRewardView extends CommonView
{
    

    public constructor() {
		super();
	}

    

    protected getTitleStr():string
	{
		return "acLaborDayPopupViewTitle-1";
	}


    protected getResourceList():string[]
	{
		return super.getResourceList().concat([ 
			"accarnivalview_tab_red",
			 "progress5","progress3_bg",
			 "servant_bottombg",
			 "arena_bottom",
         ]);
	}  

    private get vo():AcEnjoyNightVo
	{
		 let springCelebrateVo = <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code); 
		 return  springCelebrateVo;
	} 

    private get cfg() : Config.AcCfg.EnjoyNightCfg
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

		return ["acRechargeViewTitle",
                "acMaChaoViewTab2-1",
		];
    } 

    public initView():void
	{
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        let bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth -this.container.y+69;
        bottomBg.x = 0; 
        bottomBg.y = -68; 
		this.addChildToContainer(bottomBg);

		this.freshView();
    }

	public freshView():void{
        let view = this;
        if(view.vo.checkRechargeRedDot()){
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