/*
    author : shaoliang
    date : 2020.2.20
    desc : 投壶活动 奖励
*/
class AcThrowArrowRewardPopupView extends PopupView
{
    
    
    public constructor() {
		super();
	}

    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }

    private get uicode() : string{
        return `${this.param.data.uicode}`;
    }

     protected getTitleStr():string{
        return `acthrowstoneRewardTitle-1`;
    }

    protected getUiCode():string
	{
		return this.uicode;
	}

    protected getResourceList(): string[] {
		return super.getResourceList().concat(["progress3_bg", "progress3",
            "skin_detail_namebg",
		]);
	}

    protected getTabbarTextArr():Array<string>{
        let code = this.uicode;
        return [
			`acThrowArrowTab1-${code}`,
            `acThrowArrowTab2-${code}`,
            `acThrowArrowTab3-${code}`,
            `acThrowArrowTab4-${code}`,
		];
    }

    private get vo() : AcThrowArrowVo{
        return <AcThrowArrowVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected initView():void
    {
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);


        view.freshView();
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    }

    protected initTabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
			this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr,this.clickTabbarHandler,this);
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			this.tabbarGroup.x = 0;
		}
    }

    protected getOffsetY():number
	{	
		return 16;
	}

    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
        this.tabbarGroup.x = 0;
	}

    protected getShowWidth():number{
		return 580;
    }

	protected getShowHeight():number{
		return 800;
    }

    public freshView():void{
        let view = this;
        if(view.vo.checkRechargeRedDot()){
            view.tabbarGroup.addRedPoint(0);
        }
        else{
            view.tabbarGroup.removeRedPoint(0);
        }

        if(view.vo.checkLotteryRedDot()){
            view.tabbarGroup.addRedPoint(1);
        }
        else{
            view.tabbarGroup.removeRedPoint(1);
        }

        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(2);
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(2);
        // }

        // if(view.vo.getpublicRedhot4()){
        //     view.tabbarGroup.addRedPoint(3);
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(3);
        // }
    }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);

		super.dispose();
	}
}