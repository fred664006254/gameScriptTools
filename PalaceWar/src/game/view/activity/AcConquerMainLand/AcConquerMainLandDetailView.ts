class AcConquerMainLandDetailView extends CommonView{
    private _tabHeight = 0;
    public constructor(){
		super();
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
	
	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
            `aobaidescnamebg`,`accrackerpopbg-1`,`tombrewardrankbg-1`,`wifeview_bottombg`,
            `mltaskmidbg-${code}`,`activity_charge_red`,`progress3`,`progress3_bg`,`collectflag`,`arena_bottom`,`dinner_detail`,
            `specialview_commoni_namebg`,`alliance_taskAttrbg2`,`alliance_taskAttrbg1`,`alliance_taskAttrbg5`,`servant_namebg`,`mainlandinfight${code}-`
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

    protected getRuleInfo():string
    {
        return this.vo.getThisCn("AcConquerMainLandRule");
    }

    protected getTitleStr() : string{
        return `acConquerMainLand-${this.getUiCode()}_Title`;
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
        for(let i = 1; i < 5; ++ i){
            arr.push(`mldetailtarbar${i}-${this.getUiCode()}`);
        }
        if(this.vo.checkIsJJL)
        {
            arr[arr.length-1] = `mldetailtarbar5-${this.getUiCode()}`;
        }
        return arr;
    }


    
    protected setTabBarPosition():void{
        let view = this;
		if(view.tabbarGroup){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view.titleBg, [0,view.titleBg.height]);
		}
    }

    protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO,
            requestData:{
                activeId : this.acTivityId
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.data.data){ 
            this.vo.setMyTeamInfo(data.data.data.allteam);
            let score = 0;
            if(data.data.data.myscore && data.data.data.myscore.score){
                score = data.data.data.myscore.score;
            }
            this.vo.setMyScore(score);
        } 
    }
    

    
    public initView():void{
        let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_PRANK,{
            activeId : view.acTivityId, 
        });
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_ZRANK,{
            activeId : view.acTivityId, 
        });

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        let tarbg = BaseBitmap.create(`mldetailtarbarbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tarbg, view.titleBg, [0,view.titleBg.height]);
        view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup) - 1);

        view._tabHeight = view.height - tarbg.y - tarbg.height;
        
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }

        if(view.vo.getpublicRedhot1()){
            view.tabbarGroup.addRedPoint(2)
        }
        else{
            view.tabbarGroup.removeRedPoint(2)
        }
        if(view.vo.getpublicRedhot3()){
            view.tabbarGroup.addRedPoint(3)
        }
        else{
            view.tabbarGroup.removeRedPoint(3)
        }
        view.tick();
    }

    public tick():void{
        let view = this;
        if(view.vo.getpublicRedhot1() || view.vo.getpublicRedhot2()){
            view.tabbarGroup.addRedPoint(2)
        }
        else{
            view.tabbarGroup.removeRedPoint(2)
        }
        if(view.vo.getpublicRedhot3()){
            view.tabbarGroup.addRedPoint(3)
        }
        else{
            view.tabbarGroup.removeRedPoint(3)
        }
    }

    private prankCallback(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret && evt.data.data.data){
            view.vo.setPrankinfo(evt.data.data.data);
        }
    }

    private zrankCallback(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret && evt.data.data.data){
            view.vo.setZrankinfo(evt.data.data.data);
        }
    }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        view._tabHeight = 0;
        super.dispose();
    }
}