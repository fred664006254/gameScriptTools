class NewAtkracecrossActivityRewardView extends CommonView
{
	static _merank:number = 0;
	static _mepoint:number = 0;
	static _iszonewin:number = 0;
	public constructor() {
		super();
	}

	protected addTabbarGroupBg():boolean{
		return true;
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_NEWATKRACECROSS_RANK,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret==true&&data.data&&data.data.data.atkrank)	
		{
			AtkracecrossActivityRewardView._merank = data.data.data.merank;
			AtkracecrossActivityRewardView._mepoint = data.data.data.mepoint;
			AtkracecrossActivityRewardView._iszonewin = data.data.data.iszonewin;
		}
	}
	
	protected getTitleStr():string
	{
		return "atkracecrossActivityRewardViewTitle";
	}

	protected getTabbarTextArr():Array<string>
	{
		return [
			"atkracecrossActivityRewardTab1",
			"atkracecrossActivityRewardTab2",
		];
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkracecross_rewatdbg1",
			"atkracecross_rewatdbg2",
			"atkracecross_rewatdbg3",
			"wifeview_bottombg","commonview_tabbar_bg"
		]);
	}

	protected initView():void
	{	
		let view = this;
		view.update();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY,view.update,view); 
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACEG_WINZIDREWARD),this.update,this);
	}

	protected tick():void
	{	
		if (this.tabbarGroup)
		{
			this.update();
		}
	}

	private update():void{
		let  codeStr2 =Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace").code;
		let vo = <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace",codeStr2+"");
		if(vo.getZoneRewardRed())
		{
			this.tabbarGroup.addRedPoint(0);
		}
		else
		{
			this.tabbarGroup.removeRedPoint(0);
		}
	}

	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY,view.update,view); 
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACEG_WINZIDREWARD),this.update,this);

		super.dispose();
	}
}