class AcBattleGroundCheerView extends CommonView{
    private _tabHeight = 0;
    public constructor(){
		super();
    }
    
      protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
	
	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
            `battletabbg`,`battle-purport`,`activity_charge_red`
		]);
    }
    
    protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
		return [`acBattleCheerTab1-${code}`, 
                `acBattleCheerTab2-${code}`,
		];
    } 

    protected getRuleInfo() : string{
        if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
			return "acBattleRoundRule-1_newRule_withOpenRefusal";
		}
        return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${this.getUiCode()}_newRule`) : (`acBattleRoundRule-${this.getUiCode()}`);
    }
    
    protected getRuleInfoParam() : string[]{
        let tmp = [];
        if(Api.switchVoApi.checkOpenAtkracegChangegpoint()){
            tmp.push(this.cfg.lowestScore.toString());
        }
        tmp.push(this.cfg.disableTime.toString());
        return tmp;
    } 

    protected getTitleStr() : string{
        return `battlegroundcheer-${this.getUiCode()}_Title`;
    }

    public get tabHeight():number{
        let view = this;
        return  view._tabHeight;
    }

    public get tabWidth():number{
        let view = this;
        return view.width;
    }

    // protected getRequestData():{requestType:string,requestData:any}{	
	// 	return {
    //         requestType:NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO,
    //         requestData:{
    //             activeId : this.acTivityId
    //         }
    //     };
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void{
    //     if(data.data.data){ 
    //         this.vo.setMyTeamInfo(data.data.data.allteam);
    //         let score = 0;
    //         if(data.data.data.myscore && data.data.data.myscore.score){
    //             score = data.data.data.myscore.score;
    //         }
    //         this.vo.setMyScore(score);
    //     } 
    // }
    
    public initView():void{
        let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
       

        let bouttom:BaseBitmap =BaseBitmap.create("battledownbg");
        bouttom.width = GameConfig.stageWidth;
        bouttom.height = GameConfig.stageHeigth- 72;
        this.addChildToContainer(bouttom); 
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_PRANK,{
        //     activeId : view.acTivityId, 
        // });
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_ZRANK,{
        //     activeId : view.acTivityId, 
        // });

        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        
        let tarbg = BaseBitmap.create(`battletabbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tarbg, view.titleBg, [0,view.titleBg.height]);
        view.addChildAt(tarbg, view.getChildIndex(view.tabbarGroup) - 1);

        view._tabHeight = view.height - tarbg.y - tarbg.height;
        if(view.vo.getCheerId()){
            view.tabbarGroup.setLocked(1, false);
        }
        else{
            view.tabbarGroup.setLocked(1, true);
        }
        
        
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    }

    protected checkTabCondition(index:number):boolean{
        let view = this;
        if(view.vo.getCheerId()){
            return true;
        }
        else{
            if (view.vo.isInActy())
            {   
                if(view.vo.getCurRound() == 1)
                {
                    if(Api.atkraceVoApi.isShowNpc()){
                        App.CommonUtil.showTip(LanguageManager.getlocal(`battlegroundcheertip62-${view.getUiCode()}`));
                    }
                    else{
                        App.CommonUtil.showTip(LanguageManager.getlocal(`battlegroundcheertip6-${view.getUiCode()}`));
                    }
                }
                else
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal(`battlegroundcheertip8-${view.getUiCode()}`) );
                }
                
            }
            else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal(`battlegroundcheertip81-${view.getUiCode()}`) );
            }
            
            return false;
        }
	}

    public tick():void{
        let view = this;
        if(view.vo.getCheerId()){
            if(view.vo.canGetTask()){
                view.tabbarGroup.addRedPoint(1);
            }
            else{
                view.tabbarGroup.removeRedPoint(1);
            }
            view.tabbarGroup.setLocked(1, false);
        }
        else{
            view.tabbarGroup.setLocked(1, true);
        }
        
        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(3)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(3)
        // }
    }

    public dispose():void{
        let view = this;
        
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        view._tabHeight = 0;
        super.dispose();
    }
}