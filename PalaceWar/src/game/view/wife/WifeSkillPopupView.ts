/**
 * 红颜技能
 * author dky
 * date 2017/11/18
 * @class WifeSkillPopupView
 */
class WifeSkillPopupView extends PopupView
{
	public _wifeId:string = null;
	public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{	
		let resArray = super.getResourceList();
		if (Api.switchVoApi.checkOpenWifeExSkill())
		{
			resArray = resArray.concat(["wifeexskill_bg2","wifeexskill_icon","wifeexskill_iconbg","wifeexskill_text2",
			"newinvitelistbg2","wifestatus_namebg","commonview_smalltitlebg",
			"servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4","wifeexskill_icon2"]);
		}
		return resArray;
	}

	protected getTabbarTextArr():Array<string>{

		let tabarray = ["wifeSkillPopupViewTitle"];
		let id = this.param.data.id;
		let cfg = Config.WifeCfg.getWifeCfgById(id);
		if (cfg.wifeSkill2 && Api.practiceVoApi.isPracticeUnlock())
		{
			tabarray.push("wifeMultiSkillPopupTab2Name");
		}
		if (Api.switchVoApi.checkOpenWifeExSkill())
		{
			
			if (cfg.servantId)
			{
				tabarray.push("wifeExSkill");
			}
		}
        return tabarray;
    }

	protected changeTab():void
	{	
		let tabname:string = this.getClassName() + "Tab" + (this.selectedTabIndex+1);
		let tabArray:string[] = this.getTabbarTextArr();
		if (tabArray[this.selectedTabIndex]=="wifeMultiSkillPopupTab2Name")
		{
			tabname = "WifeSkillPopupViewTab2";
		}
		else if (tabArray[this.selectedTabIndex]=="wifeExSkill")
		{
			tabname = "WifeSkillPopupViewTab3";
		}

		let tabveiwClass:any = egret.getDefinitionByName(tabname);
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
				tabView.setPosition(this.container.x,this.container.y + this.getTabbarGroupY());
				this.tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"]=this.param;
				this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
		if (this.tabViewData[this.selectedTabIndex])
		{
			this.tabViewData[this.selectedTabIndex].x = this.getOffsetX();
		}
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

	public getWifeId():string{
        return this.param.data.id;
	}

	private refreshView():void{
		let wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
		let wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		let isCanExchange:boolean = Api.switchVoApi.checkWifeExpExchangeOpen() &&  Api.wifeVoApi.hasTransformRed(this._wifeId) &&  Api.wifeVoApi.hasTransformRed2(this._wifeId);
		if (wifeVo.cfg.servantId){
			if (Api.servantVoApi.getServantObj(String(wifeVo.cfg.servantId)) && ( Api.wifeVoApi.isSkillCanLevelUp(this._wifeId) || isCanExchange)){
				this.tabbarGroup.addRedPoint(0);
			}
			else{
				this.tabbarGroup.removeRedPoint(0);
			}
		}
		else{
			if ( Api.wifeVoApi.isSkillCanLevelUp(this._wifeId) || isCanExchange){
				this.tabbarGroup.addRedPoint(0);
			}
			else{
				this.tabbarGroup.removeRedPoint(0);
			}
		}

		if (wifeCfg.wifeSkill2 && Api.practiceVoApi.isPracticeUnlock())
		{
			if ( Api.wifeVoApi.isSkill2CanLevelUp(this._wifeId) || isCanExchange)
			{
				this.tabbarGroup.addRedPoint(1);
			}
			else{
				this.tabbarGroup.removeRedPoint(1);
			}
		}
	}

	protected getShowHeight():number
	{
		return 816;
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, this.refreshView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_SKILLEXPEXCHANGE, this.refreshView, this);
		this._wifeId = null;

		super.dispose();
	}
}