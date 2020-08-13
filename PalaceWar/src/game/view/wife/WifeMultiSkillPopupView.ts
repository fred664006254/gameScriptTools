/**
 * 红颜技能两个
 * author ycg
 * date 2019.10.23
 * @class WifeMultiSkillPopupView
 */
class WifeMultiSkillPopupView extends PopupView
{
    public _wifeId:string = null;

	public constructor() 
	{
		super();
    }
    
    public initView():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE, this.refreshView, this);

		this._wifeId = this.param.data.id;
		this.tabbarGroup.setSpace(0);
		let topBg = BaseBitmap.create("wifeview_skilltabbtn_bg");
		topBg.setPosition(this.viewBg.x + this.viewBg.width/2 - topBg.width/2, 0);
		this.addChildToContainer(topBg);

		this.refreshView();
	}
	
	private refreshView():void{
		let wifeApi = Api.wifeVoApi;
		let wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);

		let isCanExchange:boolean = Api.switchVoApi.checkWifeExpExchangeOpen() && wifeApi.hasTransformRed(this._wifeId) && wifeApi.hasTransformRed2(this._wifeId);

		if (wifeVo.cfg.servantId){
			if (Api.servantVoApi.getServantObj(String(wifeVo.cfg.servantId)) && (wifeApi.isSkillCanLevelUp(this._wifeId) || isCanExchange)){
				this.tabbarGroup.addRedPoint(0);
			}
			else{
				this.tabbarGroup.removeRedPoint(0);
			}
		}
		else{
			if (wifeApi.isSkillCanLevelUp(this._wifeId) || isCanExchange){
				this.tabbarGroup.addRedPoint(0);
			}
			else{
				this.tabbarGroup.removeRedPoint(0);
			}
		}
		
		if (wifeApi.isSkill2CanLevelUp(this._wifeId) || isCanExchange){
			this.tabbarGroup.addRedPoint(1);
		}
		else{
			this.tabbarGroup.removeRedPoint(1);
		}
	}
    
    public getWifeId():string{
        return this.param.data.id;
	}
	
	protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX=this.viewBg.x + 11;
			let tabY=this.viewBg.y + 57;
			this.tabbarGroup.setPosition(tabX,tabY);
		}
	}

	protected getShowHeight():number
	{
		if (Api.switchVoApi.checkWifeExpExchangeOpen())
		{
			return 870;
		}
		return 810;
	}

	protected getShowWidth():number{
		return 572;
	}

	public hide():void
	{
		super.hide();
    }
    
	protected getTabbarTextArr():Array<string>
	{
		return ["wifeMultiSkillPopupTab1Name",
				"wifeMultiSkillPopupTab2Name"
		];
	}
	
	protected getTabbarName():string[]{
		return [
			"wifeview_skilltabbtn",
			"wifeview_skilltabbtn"
		];
	}
    
    protected getTitleStr():string{
        return "wifeSkillPopupViewTitle";
	}
	
	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"wifeview_skilltabbtn_bg",
			"wifeview_skilltabbtn_down",
			"wifeview_skilltabbtn",
			"skin_head_bg"
		]);
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, this.refreshView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE, this.refreshView, this);

		super.dispose();
	}
}