class AcConquerMainLandSendFightView extends CommonView{
    private _tabHeight = 0;
    private _enermyTxt : BaseTextField = null;
    private _enermyTxtBg : BaseBitmap = null;
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

    protected getTitleStr():string{
        return `acConquerMainLandSendFightView-${this.getUiCode()}_Title`
    }

	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
            `mainlangcity${code}`, `atkracecross_rewatdbg3`,`aobaidescnamebg`,`servant_namebg`,`awservantstate1`,`alliance_taskwotdbg1`,`arena_bottom`,
		]);
    }
    
    protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
		return [`acBattlePassTab1-${code}`, 
                `acBattlePassTab2-${code}`,
                `acBattlePassTab3-${code}`,
		];
    } 

    protected getRuleInfo():string{
		return this.vo.getThisCn("AcConquerMainLandRule");
    }

    public get tabHeight():number{
        let view = this;
        return  view._tabHeight;
    }

    public get tabWidth():number{
        let view = this;
        return view.width;
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

    // 初始化tabbarGroup
	protected initTabbarGroup():void{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0){
			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this,null,null,null,true);
            this.tabbarGroup.setSpace(0);
            let tabBarX:number=(this instanceof PopupView)?30:15;
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = 215;
            this.tabbarGroup.selectedIndex=this._selectedTabIndex;
            let tab : any = this.tabbarGroup;
            for(let i = 1; i < 4; ++ i){
                tab._tbArr[i - 1].addTextIcon(`mainlandarmytitle${i}-${this.getUiCode()}`,0,108);
                if(this.vo.isArmySend(i)){
                    this.tabbarGroup.showStatusIcon(i - 1, `mlinfight-${this.getUiCode()}`, true);
                    let red = tab._tbArr[i - 1].getChildByName(`reddot`);
                    red.x = 6;
                }
            }
			// this.changeTab();
		}
	}

    // 页签图名称
	protected getTabbarName():string|string[]{
        return `mlcitytab-${this.getUiCode()}`
    }
    
    protected setTabBarPosition():void{
        let view = this;
		if(view.tabbarGroup){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view.titleBg, [0,view.titleBg.height + 65]);
		}
    }

    public initView():void{
        let view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT),this.cancelCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT),this.sendCallBack,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        let level = view.param.data.level;
        let num = view.param.data.num;
        let pos = view.param.data.pos;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        let titlebg = BaseBitmap.create('atkracecross_rewatdbg3');
        titlebg.height = 65;
        titlebg.width = view.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view.titleBg, [0,view.titleBg.height]);
        view.addChild(titlebg);

        let enermyTxtBg = BaseBitmap.create('aobaidescnamebg');
        view.addChild(enermyTxtBg);
        view._enermyTxtBg = enermyTxtBg;

        let enermyinfo = view.param.data.data;
        let enermyTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandEnermyScore-${code}`, [App.StringUtil.changeIntToText(enermyinfo.score)]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(enermyTxt);
        view._enermyTxt = enermyTxt;

        enermyTxtBg.width = enermyTxt.textWidth + 140;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enermyTxtBg, titlebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enermyTxt, titlebg);

        let line = BaseBitmap.create('public_line3');
        line.width = 570;
        view.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, titlebg);

        view._tabHeight = view.height - view.tabbarGroup.y - view.tabbarGroup.height + 12;
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    }

    private sendCallBack(evt : egret.Event):void{
		let view = this;
        let data = evt.data.data.data;
        let level = view.param.data.level;
        let num = view.param.data.num;
        let pos = view.param.data.pos;
        let code = view.getUiCode();
        let enermyinfo = view.param.data.data;
		if(evt.data.ret && data){
			//7 占领了npc，4打败玩家成功占领，8失败 9\10已被他人占领
			switch(data.conquerStat){
                case 3:
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip25-${code}`));
                    break;
				case 9:
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip39-${view.getUiCode()}`));
                    return;
                case 10:
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip24-${view.getUiCode()}`));
                    view._enermyTxt.text = LanguageManager.getlocal(`acConquerMainLandEnermyScore-${view.getUiCode()}`, [App.StringUtil.changeIntToText(enermyinfo.score)]);
                    view._enermyTxtBg.width = view._enermyTxt.textWidth + 140;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._enermyTxtBg, view);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._enermyTxt, view._enermyTxtBg);
                    return;
                case 7:
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip26-${code}`));
                case 4:
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO,{
                        activeId : view.acTivityId, 
                    });
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETCITYINFO,{
                        activeId : view.acTivityId, 
                        mainland : level,
                        building : num,
                    });
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMAPINFO,{
                        activeId : view.acTivityId, 
                    });
                    let tab : any = this.tabbarGroup;
                    for(let i = 1; i < 4; ++ i){
                        if(this.vo.isArmySend(i)){
                            this.tabbarGroup.showStatusIcon(i - 1, `mlinfight-${this.getUiCode()}`, true);
                        }
                        else{
                            this.tabbarGroup.removeStatusIcon(i - 1);
                        }
                    }
                    break;
			}
		}
    }

    private cancelCallBack(evt : egret.Event):void{
        let view = this;
        let code = view.getUiCode();
        let level = view.param.data.level;
        let num = view.param.data.num;
        let pos = view.param.data.pos;
		if(evt.data.ret && evt.data.data.data){
			switch(evt.data.data.data.conquerStat){
                case 3:
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip25-${code}`));
                    break;
				case 6:
				case 9:
                    view.vo.clearArmyInfo(evt.data.data.data.teamnum);
                    let tab : any = this.tabbarGroup;
                    for(let i = 1; i < 4; ++ i){
                        if(this.vo.isArmySend(i)){
                            this.tabbarGroup.showStatusIcon(i - 1, `mlinfight-${this.getUiCode()}`, true);
                        }
                        else{
                            this.tabbarGroup.removeStatusIcon(i - 1);
                        }
                    }
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO,{
                        activeId : view.acTivityId, 
                    });
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETCITYINFO,{
                        activeId : view.acTivityId, 
                        mainland : level,
                        building : num,
                    });
                    NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMAPINFO,{
                        activeId : view.acTivityId, 
                    });
                    break;
			}
		}
    }


    public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT),this.cancelCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_SELECTSERVANT),this.sendCallBack,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        view._tabHeight = 0;
        view._enermyTxt = null;
        view._enermyTxtBg = null;
        super.dispose();
    }
}