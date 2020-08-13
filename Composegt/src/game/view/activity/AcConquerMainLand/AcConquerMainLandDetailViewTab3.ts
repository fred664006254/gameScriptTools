//
class AcConquerMainLandDetailViewTab3 extends CommonViewTab{

	public constructor(param?){
		super();
		this.param = param;
		this.initView();
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
	
	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		let code = baseview.getUiCode();
		return code;
	}

	protected getListType():number{
		return 3;
	}

	protected getTabbarTextArr():Array<string>{
		let code = this.uiCode;
		return [`acmainlanddetailtab3tar1-${code}`, `acmainlanddetailtab3tar2-${code}`];
	}

	protected setTabBarPosition():void{
		this.tabbarGroup.x = 15;
		this.tabbarGroup.y = 4;
	}


	protected initView():void{
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		let code = view.uiCode;
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;

		let tabBg = BaseBitmap.create('popupview_bg3');
		tabBg.width = view.width - 20;
		this.addChild(tabBg);
		tabBg.setPosition(10,3);

		view.initTabbarGroup();
		let tabArr:string[]=this.getTabbarTextArr();
		if(tabArr&&tabArr.length>0){
			this.changeTab();
		}

		let line = BaseBitmap.create("commonview_border2");
		line.width = tabBg.width + 10;
		line.x = tabBg.x - 5;
		line.y = tabBg.y + 30;
		this.addChild(line);

		view.update();
	}
	protected getTabbarGroupY():number{
		return this.tabbarGroup.y + this.tabbarGroup.height - this.y + 10;
	}
	private logCallback(evt : egret.Event):void{

	}

	private update():void{
		let view = this;
	}

	protected getTabbarName(): string | string[] {
		return ButtonConst.BTN_NEWTAB2;
	}	

	public dispose():void{
		let view = this;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		super.dispose();
	}

}