/**
 * 皮肤
 * author yanyuling
 * date 2018/08/13
 * @class SkinView
 */
class SkinView  extends CommonView
{
	private _skinNetData:any = undefined;
	public constructor() {
		super();
	}

	protected get uiType():string
	{
		return "2";
	}

	protected getContainerY():number
	{
		return 0;
	}

    protected getBigFrame():string
	{	
		return null;
	}

	protected init():void
	{
		
		if (Api.itemVoApi.getItemNumInfoVoById("1562")>0 && Api.switchVoApi.checkOpenExchangeSkin())
		{
			let showguide = LocalStorageManager.get(LocalStorageConst.LOCAL_GUIDE_SKIN+Api.playerVoApi.getPlayerID());
			if(!showguide || showguide == "")
			{
				Api.rookieVoApi.isInGuiding = true;
				Api.rookieVoApi.curGuideKey = "skin";
				ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,{idx:"skin_1",f:null,o:this});

				this.selectedTabIndex = this.getTabbarTextArr().length-1;
				LocalStorageManager.set(LocalStorageConst.LOCAL_GUIDE_SKIN+Api.playerVoApi.getPlayerID(),"1");
			}
		}
		super.init();
	}

	protected getTabbarTextArr():string[]{
		let view = this;
		let topTab = [];
		if(Api.switchVoApi.checkOpenServantSkin())
		{
			topTab.push("skinViewTab1");
		}
		if(!Api.switchVoApi.checkCloseWifeskin())
		{
			topTab.push("skinViewTab2");
		}
		topTab.push("skinViewTab3");
		if(Api.switchVoApi.checkOpenExchangeSkin())
		{
			topTab.push("skinViewTab4");
		}
		return topTab;
	}

	public getTabViewHeight():number
	{
		return GameConfig.stageHeigth - this.tabbarGroup.y - this.tabbarGroup.height;
	}

	public initView():void
	{
		// ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:"1011"});

		let toptabBg = BaseBitmap.create("dragonboattarbg");
		toptabBg.y = 81; 
		this.addChild(toptabBg);
		this.setChildIndex(toptabBg,3);

		let innerbg =  BaseBitmap.create("public_9_bg20");
		innerbg.width = GameConfig.stageWidth - 4;
		innerbg.height = GameConfig.stageHeigth - toptabBg.y -  toptabBg.height;
		innerbg.y = toptabBg.y + toptabBg.height;
		innerbg.x = 2;
		this.addChild(innerbg);
		this.tick();
		let index = 0;
		 // this._curTabIdx = params.index;
		if(!Api.switchVoApi.checkOpenServantSkin() ){
			index++ ;
		}
		if(Api.switchVoApi.checkCloseWifeskin() && index > 1){
			index++ ;
		}
		if (Api.rookieVoApi.curGuideKey != "skin")
		{
			this.selectedTabIndex = index;
		}
		
		//this.clickTabbarHandler({index : 0});
    }

	protected clickTabbarHandler(data:any):void
	{
		App.LogUtil.log("index: " + data.index);
		let index = Number(data.index);
		 // this._curTabIdx = params.index;
		if(!Api.switchVoApi.checkOpenServantSkin() ){
			index++ ;
		}
		if(Api.switchVoApi.checkCloseWifeskin() && index > 0){
			index++ ;
		}
		if(this.checkTabCondition(index) == false)
		{
			// 重新checkTabCondition方法处理
			this.tabbarGroup.selectedIndex=this.selectedTabIndex;
			return;
		}
		this.lastSelectedTabIndex = this.selectedTabIndex;
		this.selectedTabIndex = index;
		this.changeTab();

	}

	protected receiveData(data: { ret: boolean, data: any }): void
    {
		if(data.ret){
			let rData = data.data;
			if(rData.ret == 0)
			{
				this._skinNetData = rData.data;
			}
		}
    }

    protected getRequestData():{requestType:string,requestData:any} 
	{
		return {requestType:NetRequestConst.REQUST_CROSSSKIN_GETSKINFIRST,requestData:{}};
	}

	protected getExtraRuleInfo():string{
        let msg = ``;
		if(Api.switchVoApi.checkOpenServantSkin()){
			msg += LanguageManager.getlocal(`skinviewrule1`) + `\n\n`;
		}
		if(!Api.switchVoApi.checkCloseWifeskin()){
			msg += LanguageManager.getlocal(`skinviewrule2`) + `\n\n`;
		}
		msg += LanguageManager.getlocal(`skinviewrule3`) + `\n\n`;
		if(Api.switchVoApi.checkOpenExchangeSkin()){
			msg += LanguageManager.getlocal(`skinviewrule4`) + `\n\n`;
		}
		return msg;
	}

    protected getRuleInfo():string
	{
		return '1';
	}

	public tick():void{
		if(Api.skinVoApi.checkNpcMessage2()){
			this.tabbarGroup.addRedPoint(this.getTabbarTextArr().length - 1);
		}
		else{
			this.tabbarGroup.removeRedPoint(this.getTabbarTextArr().length - 1);
		}
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"skin_bottombg",
			"skin_box_namebg",
			"skin_boxbg","skin_boxbg2", "dragonboattarbg",
			"skin_myskinInfobg",
			"skin_myskinInfobg2",
			"skin_mytab1_down",
			"skin_mytab1",
			"skin_exchange1",
			"skin_exchange2",
			"arena_bottom"
		]);
	}

	protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX:number=0;
			let tabY:number=0;
			tabX=15;
			tabY=this.titleBg?this.titleBg.y+this.titleBg.height+8-20:100;
			tabY+=8;
			this.tabbarGroup.setPosition(tabX,tabY);
		}
	}

    public dispose()
    {
		this._skinNetData = null;
        super.dispose();
    }
}