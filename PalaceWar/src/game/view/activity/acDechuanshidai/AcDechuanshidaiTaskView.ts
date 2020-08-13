/**
 * author:qianjun
 * desc:活动弹窗
*/
class AcDechuanshidaiTaskView extends PopupView{
	public constructor() {
		super();
	}
	
    private get cfg() : Config.AcCfg.DechuanshidaiCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDechuanshidaiVo{
        return <AcDechuanshidaiVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    protected getResourceList():string[]
	{
        let view = this;
        let arr = [];
        return super.getResourceList().concat([
            `progress5`,`progress3_bg`,`accarnivalview_tab_red`,`accarnivalview_tab_green`,`collectflag`,`wife_btnbg`,
            `activity_charge_red`,`shopview_corner`,`shopview_line`,`skin_detail_namebg`,`countrywarrewardview_itembg`
        ]).concat(arr);
    }
	
	protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
        return [
			`dechuanshidaiTaskTab1-${code}`,
            `dechuanshidaiTaskTab2-${code}`,
            `dechuanshidaiTaskTab3-${code}`,
            `dechuanshidaiTaskTab4-${code}`,
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
			this.tabbarGroup.x = 0+GameData.popupviewOffsetX;
		}
    }
    
    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
        this.tabbarGroup.x = 0;
	}

    protected getTitleStr():string{
        return `achuntingRewardTitle`;
    }
    
    protected clickTabbarHandler(data):void{
        let view = this;
        super.clickTabbarHandler(data);
    }

    // protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	// let view = this;
	// 	// return {requestType:NetRequestConst.REQUEST_ACTIVITY_ARENARANK,requestData:{
	// 	// 	activeId : view.vo.aidAndCode,
	// 	// }};
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void
	// {
	// 	let view = this;
	// 	//view.vo.setRankInfo(data.data.data);
	// }

	protected initView():void{	
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        view.freshView();
    }
    
    protected getShowWidth():number{
		return 600;
    }

	protected getShowHeight():number{
		return 840;
    }

    public freshView():void{
        let view = this;
        for(let i = 1; i <= 4; ++ i){
            if(view.vo.getDayTaskReward(i)){
                view.tabbarGroup.addRedPoint(i-1);
            }
            else{
                view.tabbarGroup.removeRedPoint(i-1);
            }
        }
    }

     protected changeTab():void
    {
        super.changeTab();
        this.tabViewData[this.selectedTabIndex].x = 23;
    }

     protected resetBgSize():void{
        super.resetBgSize();
        this.tabViewData[this.selectedTabIndex].x = 23;
     }

	public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
		super.dispose();
	}
}