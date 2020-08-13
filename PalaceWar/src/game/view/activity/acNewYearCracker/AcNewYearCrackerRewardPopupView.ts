/**
 * 爆竹奖励
 * author qianjun
 */
class AcNewYearCrackerRewardPopupView extends PopupView
{
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.NewYearCrackerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNewYearCrackerVo{
        return <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			`accrackerpopdescbg-${this.code}`,`acmidautumnview_titlebg`,"progress5","progress3_bg"
		]);
	}
	
	protected getTabbarTextArr():Array<string>
	{
		return [
			`acNewYearCrackerBuild1-${this.code}`,
			`acNewYearCrackerBuild2-${this.code}`,
			`acNewYearCrackerBuild3-${this.code}`,
		];
	}

	public initView():void
	{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
		view.selectedTabIndex = view.vo.getCurBuildId() - 1;
		view.tabbarGroup.selectedIndex = view.selectedTabIndex;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD,view.crackerRewardCallback,view);
		//红点
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER,view.freshView,view);
		

		let descbg = BaseBitmap.create(`accrackerpopdescbg-${view.code}`);
		descbg.setPosition(view.viewBg.x + view.viewBg.width / 2 - descbg.width / 2,0);
		view.addChildToContainer(descbg);

		let btn = ComponentManager.getButton(`accrackerscene-${view.code}`,'',()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARCRACKERSCENEPOPUPVIEW,{
                code : view.code,
                aid : view.aid
            })
        },view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, btn, descbg, [45,0]);
        view.addChildToContainer(btn);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerRewardTip-${view.code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter,tipTxt,descbg,[btn.x + btn.width + 8, 0]);
		view.addChildToContainer(tipTxt);
		
		let bg = BaseBitmap.create(`public_9_probiginnerbg`);
		bg.width = 530;
		bg.height = 571;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, descbg, [0, descbg.height + 52]);
		view.addChildToContainer(bg);

		view.freshView();
	}

	private freshView():void{
		let view = this;
		let flag = false;
		let obj = {
			1 : [0,6],
			2 : [7,13],
			3 : [14,20]
		}
		for(let i in obj){
			if(view.judgeRed(obj[i][0], obj[i][1])){
				view.tabbarGroup.addRedPoint(Number(i) - 1);
			}
			else{
				view.tabbarGroup.removeRedPoint(Number(i) - 1);
			}
		}
	}

	private judgeRed(start : number, end : number):boolean{
		let view = this;
		let flag = false;
		for(let i = start; i <= end; ++i){
			let unit = view.cfg.recharge[i];
			if(view.vo.getCrackerNum() >= unit.needItem && !view.vo.getJinduReward(i + 1)){
				flag = true;
				break;
			}
		}
		return flag;
	}

	private crackerRewardCallback(evt:egret.Event){
		let view = this;
        if(evt && evt.data.data.ret < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal(`requestLoadErrorTip`));
            return;
		}
		
		let rData = evt.data.data.data;
		App.LogUtil.log("crackerRewardCallback: "+rData.rewards);
		let rewardVo = GameData.formatRewardItem(rData.rewards);
		App.CommonUtil.playRewardFlyAction(rewardVo);
        if (rData.replacerewards) {
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards, "message": "changeOtherRewardTip" });
		}
		view.freshView();
	}
	
	protected getShowHeight():number{
		return 820;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acNewYearCrackerRewardTitle-${this.code}`;
	}

	protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX:number=0;
			let tabY:number=0;
			if(egret.is(this,"PopupView"))
			{
				tabX=this.viewBg.x+30;
				tabY=this.viewBg.y+168;
			}
			else
			{
				tabX=15;
				tabY=this.titleBg?this.titleBg.y+this.titleBg.height+8:97;
			}
			this.tabbarGroup.setPosition(tabX,tabY);
		}
		if(this.tabViewData)
		{
			for(let tabidx in this.tabViewData)
			{
				let tabView:ViewTab = this.tabViewData[tabidx];
				tabView.setPosition(this.container.x + 20,this.container.y + 167);
			}
		}

		this.tabbarGroup.x += 30;
	}

	protected changeTab():void
	{	
		
		let tabveiwClass:any = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex+1));
		if(tabveiwClass)
		{
			let commViewTab:ViewTab=<ViewTab>this.tabViewData[this.selectedTabIndex];
			if(commViewTab)
			{
				this.addChild(commViewTab);
				commViewTab.refreshWhenSwitchBack();
				commViewTab.setPosition(this.container.x + 20+27.5,this.container.y + 170);
			}
			else
			{
				let tabView:ViewTab = new tabveiwClass(this.param);
				tabView.setPosition(this.container.x + 20+28.5,this.container.y + 170);
				this.tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"]=this.param;
				this.addChild(tabView);
				// this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
	}

	 protected resetBgSize():void
    {
        super.resetBgSize();
        this.tabViewData[this.selectedTabIndex].x = this.container.x + 20+27.5;
    }



	public dispose():void{
		let view = this;
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD,view.crackerRewardCallback,view);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER,view.freshView,view);
		super.dispose();
	}
}