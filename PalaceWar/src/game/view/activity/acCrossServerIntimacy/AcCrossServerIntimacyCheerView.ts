/**
 * 跨服亲密助威
 * date 2020.6.5
 * author wxz
 * @class AcCrossServerIntimacyCheerView
 */
class AcCrossServerIntimacyCheerView extends CommonView{
    private _tabHeight:number = 0;

    public constructor(){
        super();
    }

    protected getUiCode():string{
        let code = "";
        switch(Number(this.code)){
            default:
                code = `7`;
                break;
        }
        return code;        
    }

    private get api() : CrossImacyVoApi{
        return Api.crossImacyVoApi;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get vo() : AcCrossServerIntimacyVo{
        return <AcCrossServerIntimacyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.param.data.code);
    }	
	private get cfg() : Config.AcCfg.CrossServerIntimacyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    protected get uiType():string
	{
		return "2";
	}

	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

	protected getTitleBgName():string{
		return App.CommonUtil.getResByCode("crossserverintititle", this.getUiCode());
	}

	protected getTitleStr():string{
		return "";
	}

	protected isHideTitleBgShadow():boolean{
		return true;
	}

	// protected getCloseBtnName():string{
    //     return ButtonConst.COMMON_CLOSE_1;
    // }

    protected getTabbarName():string[]{
        return [
            App.CommonUtil.getResByCode("accrosspower_cheertabbtn1", this.getUiCode()),
            App.CommonUtil.getResByCode("accrossintimacy_cheertabbtn2", this.getUiCode()),
            App.CommonUtil.getResByCode("accrosspower_cheertabbtn3", this.getUiCode()),
            App.CommonUtil.getResByCode("accrosspower_cheertabbtn4", this.getUiCode()),
        ];
    }

    protected getResourceList():string[]{
        let needId = this.cfg.change.needNum.split("_")[1];
        return super.getResourceList().concat([
            `mldetailtarbarbg-1`, `accshegemony_shopitembg`, `ackite_tasktitlebg-1`, `accshegemony_ranktitlebg`, `arena_bottom`, `accrosspower_cheertabbtn1-`+this.getUiCode(), `accrosspower_cheertabbtn2-`+this.getUiCode(), `accrosspower_cheertabbtn3-`+this.getUiCode(), `accrosspower_cheertabbtn4-`+this.getUiCode(),"crossserverintititle-"+this.getUiCode(),"commonview_tabbar_bg",
            `accshegemony_rulebtn`, `accrosspower_juanzhou-`+this.getUiCode(), `accrosspower_tasklock-`+this.getUiCode(), `accrosspower_skindetailbg-`+this.getUiCode(), `accrosspower_skindetailarrow-`+this.getUiCode(), `accrosspower_skindetailtitle-`+this.getUiCode(), `accrosspower_skininfobg-`+this.getUiCode(),"accrossintimacy_cheertabbtn2-"+this.getUiCode(),"itemicon"+needId,
            "accrosspower_flagicon-"+this.getUiCode(), "accrosspower_skinflag-"+this.code,
            "accshegemony_ranklistbg", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "accshegemonyprank1", "accshegemonyprank2", "accshegemonyprank3", `servant_star`, "progress21", "progress21_bg", "accrosspower_tasktitlebg"
        ])
    }

    public dipose():void{
        this._tabHeight = null;
        this.tabbarGroup = null;
        this._selectedTabIndex = 0;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        super.dispose();
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_FLAGRANK, requestData:{activeId: this.vo.aidAndCode}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (data.ret){
            if (data.data.data && data.data.data.atkranks)
            this.api.setFlagRankInfo(data.data.data.atkranks);
        }
	}

    // 初始化tabbarGroup
	protected initTabbarGroup():void{
		let tabbarName:string[]=this.getTabbarName();
		if(tabbarName&&tabbarName.length>0)
		{
			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),["", "", "", ""],this.clickTabbarHandler,this,null,null,null,true);
            this.tabbarGroup.setSpace(0);
            let tabBarX:number=(this instanceof PopupView)?30:6;
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			// this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex=this._selectedTabIndex;
		}
    }

    protected setTabBarPosition():void{
        let view = this;
		if(view.tabbarGroup){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view.titleBg, [0,view.titleBg.height - 7]);
		}
    }

    public get tabHeight():number{
        return this._tabHeight;
    }

    public initView():void{
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        
        let tarbg = BaseBitmap.create(`mldetailtarbarbg-1`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tarbg, view.titleBg, [0, view.titleBg.height - 7]);
        view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup) - 1);

        view._tabHeight = view.height - tarbg.y - tarbg.height + 2;
        this.bigframe.height = GameConfig.stageHeigth - tarbg.y - tarbg.height + 2;
        this.bigframe.y = 0;
        this.container.y = tarbg.y + tarbg.height - 2;

        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        this.changeTab();

        this.refreshView();
    }

    private refreshView():void{
        if (this.tabbarGroup){
            if (this.vo.checkExchangeRedDot()){
                this.tabbarGroup.addRedPoint(0);
            }
            else{
                this.tabbarGroup.removeRedPoint(0);
            }
            if (this.vo.checkCheerUpRedDot()){
                this.tabbarGroup.addRedPoint(1);
            }
            else{
                this.tabbarGroup.removeRedPoint(1);
            }
            if (this.vo.checkTaskRedDot()){
                this.tabbarGroup.addRedPoint(2);
            }
            else{
                this.tabbarGroup.removeRedPoint(2);
            }
            if (this.vo.checkShopRedDot()){
                this.tabbarGroup.addRedPoint(3);
            }
            else{
                this.tabbarGroup.removeRedPoint(3);
            }
        }
    }
}
