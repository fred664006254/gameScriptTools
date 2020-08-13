/**
 * author:qianjun
 * desc:斗场活动弹窗
*/
class AcArenaPopupView extends PopupView{
	public constructor() {
		super();
	}
	
    private get cfg() : Config.AcCfg.ArenaCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcArenaVo{
        return <AcArenaVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

    protected getOffsetY():number
	{
		return 17;
	}


    protected getResourceList():string[]
	{
        let view = this;
        let arr = [];
        return super.getResourceList().concat([
            `progress5`,`progress3_bg`,`accarnivalview_tab_red`,`accarnivalview_tab_green`,`collectflag`,
            `activity_charge_red`,`shopview_corner`,`shopview_line`,
        ]).concat(arr);
    }
	
	protected getTabbarTextArr():Array<string>{
        let code = this.code;
        return [
			`acArenaTab1-${code}`,
            `acArenaTab2-${code}`,
            `acArenaTab3-${code}`,
            `acArenaTab4-${code}`,
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
        return `acArena-1_Title`;
    }
    
    protected clickTabbarHandler(data):void{
        let view = this;
        super.clickTabbarHandler(data);
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_ARENARANK,requestData:{
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

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        view.freshView();

        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
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
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
		super.dispose();
	}
}