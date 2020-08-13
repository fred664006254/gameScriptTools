class AcConquerMainLandSendFightView extends CommonView{
    private _tabHeight = 0;
    private _enermyTxt : BaseBitmapText|BaseTextField = null;
    private _meTxt : BaseBitmapText|BaseTextField = null;
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
        `mainland_sendfight_topbg`,`mainland_sendfight_itembg`,`commonview_border2`,
        `commonview_bottom`,`commonview_border1`,`commonview_woodbg`,`mainland_servantitem_numbg`,
        `servant_cardbg_0`,`mainland_sendfight_tabbar1-${code}_down`,`mainland_sendfight_tabbar1-${code}`,
        `mainland_sendfight_tabbar2-${code}_down`,`mainland_sendfight_tabbar2-${code}`,
        `mainland_sendfight_tabbar3-${code}_down`,`mainland_sendfight_tabbar3-${code}`,
        `mlservant_selectitem_inselect-${code}`,`mainlangcity${code}`, `atkracecross_rewatdbg3`,`awservantstate1`,
        "mainland_sendfight_yournum","mainland_sendfight_mynum","recharge2_fnt"
        ]);
    }
    
    protected getTabbarTextArr():Array<string>{
        let code = this.getUiCode();
		return [`acBattlePassTab1-${code}`, 
                `acBattlePassTab2-${code}`,
                `acBattlePassTab3-${code}`,
		];
    } 

    // 页签图名称
	protected getTabbarName():string|string[]{
        let arr = [];
        for(let i = 1; i < 4; ++ i){
            arr.push(`mainland_sendfight_tabbar${i}-${this.getUiCode()}`);
        }
        return arr;
    }

    protected getRuleInfo():string{
		return `AcConquerMainLandRule-${this.getUiCode()}`;
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
		if(tabBarTextArr&&tabBarTextArr.length>0){
			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this,null,true);
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
                    red.y = 6;
                }
            }
			// this.changeTab();
		}
	}

    
    protected setTabBarPosition():void{
        let view = this;
		if(view.tabbarGroup){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view.titleBg, [0,view.titleBg.height + 80]);
		}
    }


    protected getBgName():string{
        return "commonview_woodbg";
    }

    private changeMyNum(str:string){
        this._meTxt.text = str;
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

        this.selectedTabIndex = this.vo.getIdleTeamIndex();
        this.tabbarGroup.selectedIndex=this.selectedTabIndex;
        
        view.param.data.callback = this.changeMyNum.bind(view);

        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        let titlebg = BaseBitmap.create('mainland_sendfight_topbg');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, view.titleBg, [0,view.titleBg.height]);
        view.addChild(titlebg);	

        let titlekuang = BaseBitmap.create("commonview_border2");
		titlekuang.width = view.width - 10;
		titlekuang.x = this.x + 5;
		titlekuang.y = titlebg.y + titlebg.height - 23;
		this.addChild(titlekuang);

        let enermyTxtBg = BaseBitmap.create('mainland_sendfight_yournum');
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom,enermyTxtBg,titlebg,[-10,6]);
        view.addChild(enermyTxtBg);

        let enermyinfo = view.param.data.data;
        let enermyTxt = ComponentManager.getBitmapText(App.StringUtil.changeIntToText3(enermyinfo.score), "recharge2_fnt");
        enermyTxt.textAlign = egret.HorizontalAlign.RIGHT;
        enermyTxt.anchorOffsetX = enermyTxt.width;
        enermyTxt.setPosition(enermyTxtBg.x + 10,enermyTxtBg.y + enermyTxtBg.height/2 - enermyTxt.height/2)
        view.addChild(enermyTxt);
        view._enermyTxt = enermyTxt;

        let meTxtBg = BaseBitmap.create('mainland_sendfight_mynum');
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop,meTxtBg,titlebg,[-10,6]);
        view.addChild(meTxtBg);

        let meTxt = ComponentManager.getBitmapText(0+'', "recharge2_fnt");
        meTxt.textAlign = egret.HorizontalAlign.LEFT;
        meTxt.setPosition(meTxtBg.x + meTxtBg.width - 30,meTxtBg.y + meTxtBg.height/2 - meTxt.height/2)
        view.addChild(meTxt);
        view._meTxt = meTxt;

        if(PlatformManager.checkIsViSp()){
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop,enermyTxtBg,titlebg,[-10,0]);
            enermyTxt.setPosition(enermyTxtBg.x + enermyTxtBg.width - 32,enermyTxtBg.y + enermyTxtBg.height);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop,meTxtBg,titlebg,[-10,0]);
            meTxt.setPosition(meTxtBg.x + 35,meTxtBg.y + meTxtBg.height)

        }


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
		if(data){
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
		if(evt.data.data.data){
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
        view._meTxt = null;
        super.dispose();
    }
}