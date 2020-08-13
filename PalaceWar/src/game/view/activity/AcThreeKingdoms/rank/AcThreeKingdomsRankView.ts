class AcThreeKingdomsRankView extends CommonView{
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

    protected getBgName():string{
        return `public_9_bg92`;
    }

	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
            `threekingdomsrankview`,`mldetailtarbarbg-1`,`arena_bottom`,`qingyuanitemtitlebg`,`specialview_commoni_namebg`,`alliance_taskwotdbg1`,
            `collectflag`,`commonview_bigframe`,`common_titlebg`,`public_textbrownbg`,`threekingdomspranklistbg1`,`threekingdomspranklistbg2`,`threekingdomspranklistbg3`
		]);
    }
    
    protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
		return [`acBattlePassTab1-${code}`, 
                `acBattlePassTab2-${code}`,
                `acBattlePassTab3-${code}`,
                `acBattlePassTab4-${code}`
		];
    } 

    protected getRuleInfo():string{
		return `acThreeKingdomsRankRule-${this.getUiCode()}`;
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

            for(let i = 0; i < 4; ++ i){
                let unit = this.tabbarGroup.getTabBar(i);
                if(i > 0 && !this.vo.getMyKingdoms()){
                    App.DisplayUtil.changeToGray(unit);
                }
            }
			// this.changeTab();
		}
    }
    
    protected checkTabCondition(index:number):boolean{
        let view = this;
        if(index == 0){
            return true;
        }
        if(view.vo.getMyKingdoms()){
            return true;
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsTip43-${view.getUiCode()}`) );
            return false;
        }
	}

    // 页签图名称
	protected getTabbarName():string|string[]{
        let arr = [];
        for(let i = 1; i < 5; ++ i){
            arr.push(`threekingdomsrankviewtab${i}`);
        }
        return arr;
    }
    
    protected setTabBarPosition():void{
        let view = this;
		if(view.tabbarGroup){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view.titleBg, [0,view.titleBg.height]);
		}
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
    

    protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK,
            requestData:{
                activeId : this.acTivityId,
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.ret){
            let rdata = data.data.data;
			this.vo.prankseasonarr = rdata;
        }
    }
    

    
    public initView():void{
        let view = this;
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

        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        let tarbg = BaseBitmap.create(`mldetailtarbarbg-1`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tarbg, view.titleBg, [0,view.titleBg.height]);
        view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup) - 1);

        view._tabHeight = view.height - tarbg.y - tarbg.height;
        
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }

        this.bigframe.height = GameConfig.stageHeigth - this.container.y+60;
		this.bigframe.y = -60;

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
        view.tick();
    }

    public tick():void{
        let view = this;
        if(view.vo.getpublicRedhot4()){
            view.tabbarGroup.addRedPoint(1)
        }
        else{
            view.tabbarGroup.removeRedPoint(1)
        }
        if(view.vo.getpublicRedhot6()){
            view.tabbarGroup.addRedPoint(2)
        }
        else{
            view.tabbarGroup.removeRedPoint(2)
        }
        if(view.vo.getpublicRedhot8()){
            view.tabbarGroup.addRedPoint(3)
        }
        else{
            view.tabbarGroup.removeRedPoint(3)
        }
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
    protected getBigFrame():string{	
		return "commonview_bigframe";
    }
    

    public dispose():void{
        let view = this;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        view._tabHeight = 0;
        super.dispose();
    }
}