class AcConquerMainLandDetailView extends CommonView{
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
    protected getBgName():string
	{
	
		return "commonview_woodbg";
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
            'commonview_border2','popupview_bg3','commonview_bottom','commonview_border1',"commonview_woodbg",
            'mainland_detailtab1_topbg','mainland_detailtab1_itembg','mainland_detailtab1_itemtitle',
            "mainland_detailtab1_itemround",'mainland_detailtab1_itemtop',"mainland_detail_shengzi",
            "rechargevie_db_01","public_v_huawen01","acarrowfirsttop","commonview_border3",
            "accrossserverwipeboss_rankbg","accrossserverwipeboss_rank1",
            "servant_cardbg_0","progress_type3_bg","progress_type1_yellow2","btn_lookdetail",
            `wifeview_bottombg`,`mltaskmidbg-${code}`,`activity_charge_red`,`collectflag`,`arena_bottom`,
            `alliance_taskAttrbg2`,`alliance_taskAttrbg1`,`mainlandinfight${code}-`,
            `mainland_armystate_redtitle`
         
        ]);
    }
    
    protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
        let arr = [
            `acConquerMainDetailTab1-${code}`, 
            `acConquerMainDetailTab2-${code}`,
        ];
        if(this.vo.isCanJoin()){
            arr = arr.concat([
                `acConquerMainDetailTab3-${code}`,
                `acConquerMainDetailTab4-${code}`
            ])
        }
        return arr;

    } 
    protected getTabbarGroupY(): number {
		return 10;
	}

    protected getRuleInfo():string{
		return `AcConquerMainLandRule-${this.getUiCode()}`;
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
        //先初始化边界
        let border = BaseBitmap.create("commonview_border1");
        let bottom = BaseBitmap.create("commonview_bottom");

        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - 69;
        border.x = 0;
        border.y = GameConfig.stageHeigth - border.height;
        this.addChild(border);

        bottom.x = 0;
        bottom.y = GameConfig.stageHeigth - bottom.height;
        this.addChild(bottom);

		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
            //有问题
            this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this,null,true);
            this.tabbarGroup.setSpace(10);
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
        return arr;
    }
    
    protected setTabBarPosition():void{
        let view = this;
		if(view.tabbarGroup){
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view.tabbarGroup, view.titleBg, [8,view.titleBg.height+12]);
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

        view.tick();
    }

    public tick():void{
        let view = this;
    }

    private prankCallback(evt : egret.Event):void{
        let view = this;
        if(evt.data.data.data){
            view.vo.setPrankinfo(evt.data.data.data);
        }
    }

    private zrankCallback(evt : egret.Event):void{
        let view = this;
        if(evt.data.data.data){
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