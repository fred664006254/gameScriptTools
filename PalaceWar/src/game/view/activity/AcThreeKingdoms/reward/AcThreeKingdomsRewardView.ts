class AcThreeKingdomsRewardView extends CommonView{
    private _tabHeight = 0;
    public constructor(){
		super();
    }
	
	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get acTivityId():string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

    protected get uiType():string
	{
		return "2";
    }
    
       // 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		if(Api.switchVoApi.checkOpenShenheGame()&&PlatformCfg.shenheFunctionName==this.getClassName().toLowerCase().replace("view",""))
		{
			return "";
		}
		return ButtonConst.COMMON_CLOSE_1;
    }


	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
            `tombrewardrankbg-1`,`arena_bottom`
		]);
    }

    protected getTabbarTextArr():Array<string>{
		let arr = [];
		for(let i = 1; i < 5; ++ i){
			arr.push(App.CommonUtil.getCnByCode(`acThreeKingdomsRank1Tab${i}`, this.getUiCode()));
		}
		return arr;
    }

    protected getRuleInfo():string{
		return `acThreeKingdomsRewardRule-${this.getUiCode()}`;
    }

    protected getTitleBgName():string{
		return App.CommonUtil.getResByCode(`threekingdomsrankviewtitle`, this.getUiCode());
    }

    protected getTitleStr() : string{
        return null;
    }

    public get tabHeight():number{
        let view = this;
        return  view._tabHeight;
    }

    public get tabWidth():number{
        let view = this;
        return view.width;
    }

    // 页签图名称
	protected getTabbarName():string|string[]{
		return ButtonConst.BTN_TAB2;
	}

	protected addTabbarGroupBg():boolean{
		return true;
	}

    protected getBigFrame():string{
		return `commonview_bigframe`;
    }

    protected getBgName():string{
        return `public_9_bg92`;
    }

    
    protected setTabBarPosition():void{
        super.setTabBarPosition();
        this.tabbarGroupBg.x = 5;
        this.tabbarGroupBg.y = 95;
	}

	protected getContainerY():number{
		return 152;
	}
    
      protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK,
            requestData:{
                activeId : this.acTivityId,
                round : this.vo.getCurWeek()
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.ret){
            let rdata = data.data.data;
            this.vo.prankroundarr = rdata;
        }
    }

    
    public initView():void{
        let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view._tabHeight = view.height - view.tabbarGroup.y - view.tabbarGroup.height;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_PRANK,{
        //     activeId : view.acTivityId, 
        // });
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_ZRANK,{
        //     activeId : view.acTivityId, 
        // });

        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        for(let i = 0; i < 4; ++ i){
			let unit = view.tabbarGroup.getTabBar(i);
			unit.x = 150  * i;
        }
        
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }

        // if(view.vo.getpublicRedhot1()){
        //     view.tabbarGroup.addRedPoint(2)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(2)
        // }
        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(3)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(3)
        // }
        // view.tick();
    }
    
    protected closeHandler():void{
        let baseview : any = ViewController.getInstance().getView('AcThreeKingdomsRankView');
        if(baseview){
            baseview.hide();
        }
		this.hide();
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

    public dispose():void{
        let view = this;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        view._tabHeight = 0;
        super.dispose();
    }
}