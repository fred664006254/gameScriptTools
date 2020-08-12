class DiceScene extends BaseScene{

	public constructor(){
		super();
	}

	protected getResourceList():string[]{
		return [
			`progress_bg_1`,`dice_tab_btn_down`,`dice_tab_btn`,`diceinfoscene`,`card_bg_xiaoguo`,`card_group_tab_bg`,`progress24_bg`,`progress25`,`progress26`,`progress24`,`diceinuse`
		];
	}

	// protected checkTabCondition(index:number):boolean
	// {
	// 	return index == 1;
	// }

	protected init():void{
		super.init();
		let view = this;
		view.name = `DiceScene`;
        view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth - 137;
		// view.y = 72;
		this._sceneBg.addTouchTap(()=>{
			App.MsgHelper.dispEvt(MsgConst.DICE_INFOCLICK, {
				idx : -1,
				dice : ``
			});	
		}, this);
	}

	protected preInit():void{
		super.preInit();
		if(Api.GameinfoVoApi.checlIsInStepId(28) || Api.GameinfoVoApi.checlIsInGuideId(19)){
			App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
		}
	}

	protected getTabPos():{x:number,y:number}{
        return {
            x : 0, 
            y : 130
        }
    }

    // 初始化tabbarGroup
	protected initTabbarGroup():void{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0){	
			this.tabbarGroup = ComponentMgr.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this,null,``,0,false,540,95);
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;

			//暂时置灰皮肤
			this.tabbarGroup.setLocked(1, true);
		}
	}

	protected setTabBarPosition():void{
		let view = this;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view, [0,72], true);
		for(let i = 0; i < 2; ++ i){
			let tab = view.tabbarGroup.getTabBar(i);
			let txt:BaseTextField = <BaseTextField>tab.getChildByName("btnTxt");
			txt.width = tab.width;
			txt.textAlign = egret.HorizontalAlign.CENTER;
			txt.strokeColor = 0xb13c03
			txt.setPosition(0, 20);
		}
	}

	protected getTabbarTextArr():Array<string>{
		return [
            LangMger.getlocal(`dicetab1`),
            LangMger.getlocal(`dicetab2`),
        ];
    }
    
	// 页签图名称
	protected getTabbarName():string|string[]{
		return `dice_tab_btn`;
	}

	protected refreshAfterShow(bool:boolean = false):void{
		super.refreshAfterShow(bool);
		this.lastSelectedTabIndex = -1;
		this.changeTab();
		if(!bool){
			if(Api.GameinfoVoApi.checlIsInStepId(28)){
				App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
			}
		}
	}

	public dispose():void{
		let view = this;
		super.dispose();
	}
}