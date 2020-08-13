//排行榜攻城奖励
class AcThreeKingdomsRankViewTab2 extends CommonViewTab{
	private _tabHeight = 0;
	
	public constructor(data){
		super();
		this.param = data;
		this.initView();
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

	protected getTabbarTextArr():Array<string>{
		let arr = [];
		for(let i = 1; i < 6; ++ i){
			arr.push(App.CommonUtil.getCnByCode(`acThreeKingdomsRank2Tab${i}`, this.getUiCode()));
		}
		return arr;
	}
	

	// 页签图名称
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_TAB;
	}

	// protected addTabbarGroupBg():boolean{
	// 	return true;
	// }
	// protected setTabBarPosition():void
	// {
	// 	if(this.tabbarGroup)
	// 	{
	// 		let tabX:number=0;
	// 		let tabY:number=0;
	// 		if(egret.is(this,"PopupView"))
	// 		{
	// 			tabX=this.viewBg.x+30;
	// 			tabY=this.viewBg.y+60;
	// 		}
	// 		else
	// 		{
	// 			tabX=15;
	// 			tabY=this.titleBg?this.titleBg.y+this.titleBg.height+8:100;
	// 		}
	// 		tabY+=(this.getTabbarGroupY()+3-16);
	// 		this.tabbarGroup.setPosition((this.width - this.tabbarGroup.width)/2,tabY);

	// 		if(this.tabbarGroupBg){
	// 			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.tabbarGroupBg, this.tabbarGroup, [-0,-8 + 16]);
	// 		}
			
	// 	}
	// }

	protected getBigFrame():string{
		return `commonview_bigframe`;
	}

	protected initTabbarGroup():void{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		let tabbg = BaseBitmap.create("commonview_tabbar_bg");
		tabbg.x = 10;
		tabbg.y = 0;
		this.addChild(tabbg);
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{

			//this.getTabbarName()
			this.tabbarGroup = ComponentManager.getTabBarChatGroup("btn_tab_small",tabBarTextArr,this.clickTabbarHandler,this);
			// this.tabbarGroup = ComponentManager.getTabBarScrollBtnGroup(tabBarTextArr,this.clickTabbarHandler,this,null,'',3,5);
			let tabBarX:number=(this instanceof PopupView)?30:15;
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;

			if (this.uiType == "2")
			{
				this.tabbarGroup.setSpace(0);
				this.tabbarGroup.x+=5;
				this.tabbarGroup.setColor(0xe1ba86,0x472c26);
				this.setBigFameY(0);
			}
			
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			this.tabbarGroup.setColor(0xe1ba86,0x472c26);
		}
	}
	
	protected initView():void{	
		let view = this;
		let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		view.initTabbarGroup();
		let tabArr:string[]=this.getTabbarTextArr();
		if(tabArr&&tabArr.length>0){
			this.changeTab();
		}
		// if(this.getTabbarTextArr().length > 3){
        //     let leftbtn = ComponentManager.getButton(`btn_leftpage`, ``, ()=>{
        //         let idx = view.selectedTabIndex - 1;
        //         if(idx < 0){
    
        //         }
        //         else{
        //             view.clickTabbarHandler({index : idx}); 
        //             view.selectedTabIndex = idx;
        //             view.tabbarGroup.selectedIndex = idx;
        //             // view.tabbarGroup.setTarBarScrollLeft(idx * 145);
        //         }
    
        //         leftbtn.visible = idx > 0;
        //         rightbtn.visible = idx < (view.getTabbarTextArr().length - 1);
        //     }, view);
        //     leftbtn.setScale(0.7);
        //     view.addChild(leftbtn);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftbtn, view.tabbarGroup, [-leftbtn.width*leftbtn.scaleX-10, 0]);
        //     leftbtn.x = 45;
    
        //     let rightbtn = ComponentManager.getButton(`btn_leftpage`, ``, ()=>{
        //         let idx = view.selectedTabIndex + 1;
        //         if(idx >= view.getTabbarTextArr().length){
    
        //         }
        //         else{
        //             view.clickTabbarHandler({index : idx}); 
        //             view.selectedTabIndex = idx;
        //             view.tabbarGroup.selectedIndex = idx;
        //             // view.tabbarGroup.setTarBarScrollLeft(idx * 145);
        //         }
        //         leftbtn.visible = idx > 0;
        //         rightbtn.visible = idx < (view.getTabbarTextArr().length - 1);
        //     }, view);
        //     rightbtn.anchorOffsetX = rightbtn.width / 2;
        //     rightbtn.scaleX = -0.7;
        //     rightbtn.scaleY = 0.7;
        //     view.addChild(rightbtn);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rightbtn, view.tabbarGroup, [view.tabbarGroup.width+10, 0]);
        //     rightbtn.x = 570;
    
        //     view._leftbtn = leftbtn;
        //     view._rightbtn = rightbtn;
        //     leftbtn.visible = view.selectedTabIndex > 0;
        //     rightbtn.visible = view.selectedTabIndex < (view.getTabbarTextArr().length - 1);
		// }
		for(let i = 0; i < 5; ++ i){
			let unit = view.tabbarGroup.getTabBar(i);
			unit.x = 115  * i;
		}
		if(this.tabbarGroupBg){
			this.tabbarGroupBg.x = 10;
			this.tabbarGroupBg.y = 0;
		}
		TickManager.addTick(this.tick,this);

	}

	protected addTabbarGroupBg():boolean{
		return true;
	}


	protected clickTabbarHandler(data):void{
        super.clickTabbarHandler(data);
        let view = this;
        // if(view._leftbtn){
        //     view._leftbtn.visible = view.selectedTabIndex > 0;
        //     view._rightbtn.visible = view.selectedTabIndex < (view.getTabbarTextArr().length - 1);
        // }
	}
	
	public tick():void{
		let view = this;
		//激战期
		if(view.vo.canGetCenterCityWarReward(1) || view.vo.canGetCenterCityWarReward(2)){
			view.tabbarGroup.addRedPoint(0);
		}
		else{
			view.tabbarGroup.removeRedPoint(0);
		}
		//第一攻城战
		for(let i = 1; i <= 4; ++ i){
			let flag = false;
			for(let j = 1; j <= 6; ++ j){
				if(view.vo.canGetCityWarReward(j,i)){
					flag = true;
					break;
				}
			}
			if(flag){
				view.tabbarGroup.addRedPoint(i);
			}
			else{
				view.tabbarGroup.removeRedPoint(i);
			}
		}
    }

	protected setTabBarPosition():void{
		this.tabbarGroup.x = 35;
		this.tabbarGroup.y = 10;
	}

	protected getTabbarGroupY():number{
		return this.tabbarGroup.y + this.tabbarGroup.height - this.y;
	}

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		// let rData = evt.data.data.data;
        // if(!rData){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        //     return;
        // }
		// let rewards = rData.rewards;
		// let cfg = view.cfg.recharge[view.vo.lastidx];
        // let str = `1011_0_${cfg.specialItem}_${this.code}|` + rewards;
		// let rewardList =  GameData.formatRewardItem(str);
		// let pos = this.vo.lastpos;
		// App.CommonUtil.playRewardFlyAction(rewardList,pos);
		// this.vo.lastidx = null;
	}


	private update():void{
		// let view = this;
		// if(!view.vo){
		// 	return;
		// }
		// let arr = view.updateArr(view.vo.getArr("recharge"));
		// view._scrollList.refreshData(arr,view.code);
	}

	public dispose():void{	
		let view = this;
		view._tabHeight = 0;
		TickManager.removeTick(this.tick,this);
		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE),this.rewardCallBack,this);
		super.dispose();
	}
}