/**
 * 门客详情new 红颜部分
 * author shaoliang
 * date 2019/7/25
 * @class ServantNewUIWifeItem
 */
class ServantNewUIWifeItem extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _wifeId:string = null;
	private _scrollView:ScrollList = null;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number):void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.refreshItem,this);
		this._servantId = servantId;
		ServantInfoWifeItemScrollItem.servantId = this._servantId;
		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
		this._wifeId =  servantcfg.wifeId;
		if(!this._wifeId)
		{
			return;
		}
		let wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		let wifeSkill = wifecfg.wifeSkill;

		let wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
		let list = Config.WifeCfg.getWifeCfgById(this._wifeId).wifeSkill;
		let str2 = "";
		if (Api.wifeVoApi.getWifeInfoVoById(this._wifeId)){
			str2 = LanguageManager.getlocal("servant_wife_own");
		}else{
			str2 = LanguageManager.getlocal("servant_wife_not_own");
		}

		if(this._scrollView)
		{
			this._scrollView.refreshData(list);
			let wifeTip = <BaseTextField>this.getChildByName('wifeTip');
			wifeTip.text = LanguageManager.getlocal("servant_wifeTip",[wifecfg.name,str2]);
			return;
		}
	

		let line1 = BaseBitmap.create("servant_title_bg");
		line1.width = 440;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = 20
		this.addChild( line1);
		
		let wifeTip = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// wifeTip.textColor = TextFieldConst.COLOR_BROWN;
		wifeTip.name = "wifeTip";
		wifeTip.text = LanguageManager.getlocal("servant_wifeTip",[wifecfg.name,str2]);
		wifeTip.x = GameConfig.stageWidth/2 - wifeTip.width/2;
		wifeTip.y =  line1.y+8;
		this.addChild(wifeTip);

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-70);
		let scrollView = ComponentManager.getScrollList(ServantInfoWifeItemScrollItem,list,rect);
		scrollView.y = 60;
		scrollView.x = 24;
		this._scrollView = scrollView;
		this.addChild(scrollView);
	}

	private refreshItem():void{
		let wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		let str2 = "";
		if (Api.wifeVoApi.getWifeInfoVoById(this._wifeId)){
			str2 = LanguageManager.getlocal("servant_wife_own");
		}else{
			str2 = LanguageManager.getlocal("servant_wife_not_own");
		}


		let wifeTip = <BaseTextField>this.getChildByName(`wifeTip`);
		wifeTip.text = LanguageManager.getlocal("servant_wifeTip",[wifecfg.name,str2]);
		wifeTip.x = GameConfig.stageWidth/2 - wifeTip.width/2;
	}

    public dispose():void
	{
		this._scrollView = null;
		this._servantId =  null;
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING,this.refreshItem,this);
		super.dispose();
	}

}