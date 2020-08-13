class AcSingleDay2019DetailView extends CommonView{
    private _tabHeight = 0;
    public constructor(){
		super();
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
	
	private get cfg() : Config.AcCfg.SingleDay2019Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDay2019Vo{
        return <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }

	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
           `specialview_commoni_namebg`,`newsingledaytab2topbg-${code}`,`newsingledaytab2bg-${code}`,`newsingledaytab2bottombg-${code}`,`acmidautumnview_titlebg`,"progress3","progress3_bg",
           "activity_rank_rightBg",`newsingledaytab3bg-${code}`, "acsingleday_skinbg1_1",
           "acsingleday_skinbg1_2",
           "acsingleday_skinbg2_1","servant_detailBtn","servant_detailBtn_down",
           "acsingleday_skinbg2_2",
           "acsingleday_skinitemIconbg",`acarcadeview_fire1`,`acsearchproofview_common_skintxt`,`acwealthcarpview_skineffect1`,
           "acsingleday_skinnamebg",
           "acsingleday_skinnameb2","tailor_get_light","common_shopmark",`shopview_line`,`acsingledayitembg`,`shopview_corner`
		]);
    }
    
    protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
		return ['1','2','3','4','5'];
    } 

    protected getRuleInfo():string{
		return null;
    }

    protected getTitleStr() : string{
        return null;
    }

    protected getTitleBgName() : string{
        return null;
    }

    protected getBgName():string{
        return `newsingledaydetaiilbg-${this.getUiCode()}`;
    }


    public get tabHeight():number{
        let view = this;
        return  view._tabHeight;
    }

    public get tabWidth():number{
        let view = this;
        return view.width;
    }

    // 初始化tabbarGroup
	protected initTabbarGroup():void{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this,null,null,null,true);
            this.tabbarGroup.setSpace(0);
            let tabBarX:number=(this instanceof PopupView)?30:15;
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			// this.changeTab();
		}
	}

    // 页签图名称
	protected getTabbarName():string|string[]{
        let arr = [];
        for(let i = 1; i <= 5; ++ i){
            arr.push(`newsingledaytab${i}-${this.getUiCode()}`);
        }
        return arr;
    }
    
    protected setTabBarPosition():void{
        let view = this;
		if(view.tabbarGroup){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view);
		}
    }

    protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK,
            requestData:{
                activeId : this.acTivityId
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.data.data){ 
            this.vo.setRankInfo(data.data.data);
        } 
    }
    

    
    public initView():void{
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_PRANK,{
        //     activeId : view.acTivityId, 
        // });
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_ZRANK,{
        //     activeId : view.acTivityId, 
        // });

        let tarbg = BaseBitmap.create(`newsingledaytabbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tarbg, view);
        view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup) - 1);

        view._tabHeight = view.height - tarbg.y - tarbg.height;        
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
        view.freshView();
    }


    // private prankCallback(evt : egret.Event):void{
    //     let view = this;
    //     if(evt.data.data.data){
    //         view.vo.setPrankinfo(evt.data.data.data);
    //     }
    // }

    // private zrankCallback(evt : egret.Event):void{
    //     let view = this;
    //     if(evt.data.data.data){
    //         view.vo.setZrankinfo(evt.data.data.data);
    //     }
    // }

    private freshView():void{
        let view = this;
        if(view.vo.getpublicRedhot1()){
            view.tabbarGroup.addRedPoint(0);
        }
        else{
            view.tabbarGroup.removeRedPoint(0);
        }

        if(view.vo.getpublicRedhot2()){
            view.tabbarGroup.addRedPoint(1);
        }
        else{
            view.tabbarGroup.removeRedPoint(1);
        }
    }

    public hide():void{
        let view = this;
        let tabview = <AcSingleDay2019DetailViewTab1>view.tabViewData[0];
        if(tabview && tabview.getStop()){
            return;
        }
        super.hide();
    }

    protected clickTabbarHandler(data):void{
        let view = this;
        let tabview = <AcSingleDay2019DetailViewTab1>view.tabViewData[0];
        if(tabview && tabview.getStop()){
            view.selectedTabIndex = 0;
            view.tabbarGroup.selectedIndex = 0;
            return;
        }
        else{
            super.clickTabbarHandler(data);
        }
       
    }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        view._tabHeight = 0;
        super.dispose();
    }
}