/**
 * 来访消息主界面
 */

class AcBattileGroundVisitView extends PopupView
{	
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

	  protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
	
	private _mainTaskHandKey:string = null;
    public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"rankinglist_rankbg",
			"atkraceVisitbg",
			"atkracevipbg",
			"office_fnt",
			
		]);
	}

	protected getTitleStr():string{
		return `acBattileGroundVisit-${this.getUiCode()}`
	}

    protected getShowHeight():number
	{
		return 750+10;
	}
    public initView():void
	{
		let tabBar1 = this.tabbarGroup.getTabBar(1);
		let tabBar2 = this.tabbarGroup.getTabBar(2);
		egret.callLater(()=>{
			this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
				this,
				this.container.x + tabBar1.x + tabBar1.width/2,
				this.container.y + tabBar1.y + tabBar1.height/2, 
				[tabBar1,tabBar2],
				603, 
				true, 
				function() {
					return true;
				}, 
				this
			);
		},this);
	}
	
	protected resetBgSize():void{
		super.resetBgSize();
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleGroundTip14-${this.getUiCode()}`, [Config.GameprojectCfg.deleteEmail.toString()]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [GameData.popupviewOffsetX,this.viewBg.height+15]);
		this.addChild(tipTxt);
	}

	protected getOffsetX():number
	{
		return 35;
	}
	protected getOffsetY():number
	{			
		return -2;
	}

    protected getTabbarTextArr():Array<string>
	{
		return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "atkraceVisitTab3",
		];
	}

    public dispose():void
	{	
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
		super.dispose();
	}
}