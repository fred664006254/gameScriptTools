/**
 * author:qianjun
 * desc:活动弹窗
*/
class AcLanternPopupView extends PopupView{
	public constructor() {
		super();
	}
	
    private get cfg() : Config.AcCfg.LanternCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcLanternVo{
        return <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
			case 3:
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
            `progress5`,`progress3`,`progress3_bg`,`accarnivalview_tab_red`,`accarnivalview_tab_green`,`collectflag`,`wife_btnbg`,`luckdrawshowbg-1`,`skin_detail_namebg`,
            `activity_charge_red`,`shopview_corner`,`shopview_line`,`skin_detail_namebg`,`countrywarrewardview_itembg`,`dechuanchangearrow-1`,`acchristmasview_rewardtopbg`,
        ]).concat(arr);
    }
	
	protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
        return [
			App.CommonUtil.getCnByCode(`acLanternTab1`, this.getUiCode()),
            App.CommonUtil.getCnByCode(`acLanternTab2`, this.getUiCode()),
            App.CommonUtil.getCnByCode(`acLanternTab3`, this.getUiCode()),
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
    protected getOffsetY():number
	{	
		return 16;
	}

    protected getTitleStr():string{
        return `atkracecrossDetailTitle`;
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
    }
    
    protected getShowWidth():number{
		return 600;
    }

	protected getShowHeight():number{
		return 830+10;
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
            view.tabbarGroup.addRedPoint(1);
        }
        else{
            view.tabbarGroup.removeRedPoint(1);
        }
    }
     protected changeTab():void
    {
        super.changeTab();
        this.tabViewData[this.selectedTabIndex].x = 21;
    }

    protected resetBgSize():void{
        super.resetBgSize();
        this.freshView();
        this.tabViewData[this.selectedTabIndex].x = 21;
    }

	public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
		super.dispose();
	}
}