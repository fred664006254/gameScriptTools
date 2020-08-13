/**
 * 港台周年庆折扣商店
 * date 2019.11.28
 * author ycg
 * @class AcAnniversaryShop2020View
 */
class AcAnniversaryShop2020View extends AcCommonView{
    private _showHeight:number = 0;
    private _timeBg:BaseBitmap = null;
    private _acTimeTf:BaseTextField = null;

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_ANNIVERSARYSHOP2020_BUY, this.shopBuyCallback, this);
        this.setEnterViewFlag();
        
        let infoBgStr = ResourceManager.hasRes("anniversaryshop_infobg-"+this.getTypeCode()) ?"anniversaryshop_infobg-"+this.getTypeCode() : "anniversaryshop_infobg-1";
        let infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.titleBg.x + this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);

        this.setBigFameCorner();
        this._showHeight = GameConfig.stageHeigth - this.tabbarGroup.y - this.tabbarGroup.height - 10;

        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height - 2;
        this.addChildToContainer(this._timeBg);
		this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020TimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 40 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth/2 - this._timeBg.width/2;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);
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
			}
			else
			{
				let tabView:ViewTab = new tabveiwClass(this.param);
				tabView.setPosition(this.container.x, this.tabbarGroup.y + this.tabbarGroup.height + 10);
				this.tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"]=this.param;
				this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
    }

    private shopBuyCallback(event:egret.Event){
        if (event && event.data && event.data.ret){
            let rData = event.data.data.data;
            let rewObj = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            }
        }
    }

    public refreshView():void{
        
    }

    public tick():void{
        this._acTimeTf.text = LanguageManager.getlocal("acAnniversaryShop2020TimeCountDown", [this.vo.getCountDown()]);
		this._timeBg.width = 40 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth/2 - this._timeBg.width/2;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    }

    private setEnterViewFlag():void{
        let vo = <AcAnniversaryShop2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let key = vo.aidAndCode + vo.et + Api.playerVoApi.getPlayerID();
        LocalStorageManager.set(key, "1");
    }

    public getTabViewHeight():number{
        return this._showHeight;
    }

    public getTypeCode():string{
        return this.code;
    }

    private get vo():AcAnniversaryShop2020Vo{
        return <AcAnniversaryShop2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
    
    protected get uiType():string
	{
		return "2";
    }

    public getTabbarName():string|string[]
	{
        return ButtonConst.BTN_BIG_TAB2;
    }

    protected getTabbarTextArr():Array<string>
	{
		return ["acAnniversaryShop2020_tabName1-"+this.getTypeCode(),
                "acAnniversaryShop2020_tabName2-"+this.getTypeCode()
        ];
	}

	protected addTabbarGroupBg():boolean{
		return true;
    }
    
    protected getTabbarGroupY():number
	{
		return 215;
    }

    protected getBigFrame():string{
		return `commonview_bigframe`;
    }
    
    protected getTitleButtomY():number{
        return 0;
    }

     protected getOffsetY():number
	{	
		return 16;
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
				tabY=this.viewBg.y+60;
			}
			else
			{
				tabX=15;
				tabY=(this.titleBg?this.titleBg.y+this.titleBg.height+8:100) - 14;
			}
			tabY+=this.getTabbarGroupY();
			this.tabbarGroup.setPosition((this.width - this.tabbarGroup.width)/2,tabY);
			if(this.tabbarGroupBg){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.tabbarGroupBg, this.tabbarGroup, [0,8]);
			}	
		}
	}

    protected getTitleBgName():string{
        return ResourceManager.hasRes("anniversaryshop_titlebg-"+this.getTypeCode()) ? "anniversaryshop_titlebg-"+this.getTypeCode() : "anniversaryshop_titlebg-1";
    }

    protected getTitleStr():string{
        return null;
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return "acAnniversaryShop2020_ruleInfo-"+this.getTypeCode();
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        if (this.getTypeCode() != "1"){
            list = [
                "anniversaryshop_infobg-1", "anniversaryshop_titlebg-1", "anniversaryshopcode1",
            ];
        }
        return super.getResourceList().concat([
            "acsingledayitembg", "common_shopmark", "shopview_corner", "shopview_line",
            "anniversaryshopcode"+this.getTypeCode(), "anniversaryshop_infobg-"+this.getTypeCode(), "anniversaryshop_titlebg-"+this.getTypeCode(),
        ]).concat(list);
    }

    public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_ANNIVERSARYSHOP2020_BUY, this.shopBuyCallback, this);
        this._showHeight = 0;
        this._timeBg = null;
        this._acTimeTf = null;

        super.dispose();
    }
}