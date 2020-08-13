/**
 * author:qianjun
 * desc:劳动活动弹窗
*/
class AcLaborDayPopupView extends PopupView{
	public constructor() {
		super();
	}
	
    private get cfg() : Config.AcCfg.LaborDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLaborDayVo{
        return <AcLaborDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }

    protected getResourceList():string[]
	{
        let view = this;
        let arr = [];
        return super.getResourceList().concat([
            `progress5`,`progress3_bg`,`accarnivalview_tab_red`,`accarnivalview_tab_green`,`collectflag`,
            `activity_charge_red`,`shopview_corner`,`shopview_line`
        ]).concat(arr);
    }
	
	protected getTabbarTextArr():Array<string>{
        let code = this.code;
        return [
			`acLaborDayTab1-${code}`,
            `acLaborDayTab2-${code}`,
            `acLaborDayTab3-${code}`,
            `acLaborDayTab4-${code}`,
		];
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
    
    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
        this.tabbarGroup.x = 0;
	}

    protected getTitleStr():string{
        return `acLaborDayPopupViewTitle-${this.code}`;
    }
    
    protected clickTabbarHandler(data):void{
        let view = this;
        super.clickTabbarHandler(data);
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_LABORRANK,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.vo.setRankInfo(data.data.data);
	}

	protected initView():void{	
        let view = this;

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LABOR_FRESH,view.freshView,view);
        view.freshView();

        if(view.param.data.index == 3){
            view.selectedTabIndex = view.param.data.index;
            view.tabbarGroup.selectedIndex = view.selectedTabIndex;
        }
    }
    protected getShowWidth():number{
		return 580;
    }

	protected getShowHeight():number{
		return 820;
    }

    public freshView():void{
        let view = this;
        if(view.vo.getpublicRedhot2()){
            view.tabbarGroup.addRedPoint(0);
        }
        else{
            view.tabbarGroup.removeRedPoint(0);
        }

        if(view.vo.getpublicRedhot3()){
            view.tabbarGroup.addRedPoint(2);
        }
        else{
            view.tabbarGroup.removeRedPoint(2);
        }
    }

	public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LABOR_FRESH,view.freshView,view);
		super.dispose();
	}
}