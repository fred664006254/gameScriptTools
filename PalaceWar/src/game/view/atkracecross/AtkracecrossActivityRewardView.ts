class AtkracecrossActivityRewardView extends CommonView
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
		return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_RANK,requestData:{}};
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

	protected getTabbarTextArr():Array<string>
	{
		return [
			"atkracecrossActivityRewardTab1",
			"atkracecrossActivityRewardTab2",
		];
	}
	protected initTabbarGroup():void
	{
		let  codeStr2 =Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code;
		let vo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace",codeStr2+"");
		if(vo.checkIsFengyun())
		{
			let tabbg = BaseBitmap.create("commonview_tabbar_bg");
			tabbg.x = 10;
			tabbg.y = 145;
			this.addChild(tabbg);
		}		
		super.initTabbarGroup();
	}


	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkracecross_rewatdbg1",
			"atkracecross_rewatdbg2",
			"atkracecross_rewatdbg3",
			"wifeview_bottombg",
			"commonview_tabbar_bg"
		]);
	}

	protected initView():void
	{	
		let view = this;

		let  codeStr2 =Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code;
		let vo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace",codeStr2+"");
		if(vo.checkIsFengyun())
		{
			view.bigframe.height = GameConfig.stageHeigth - view.container.y+60;
			view.bigframe.y = -60;
		}else
		{
			view.bigframe.visible = false;
		}

		view.update();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY,view.update,view); 
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACEG_WINZIDREWARD),this.update,this);
	}

	private update():void{
		let  codeStr2 =Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code;
		let vo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace",codeStr2+"");
		if(vo.showZonerward())
		{
			this.tabbarGroup.addRedPoint(0);
		}
		else
		{
			this.tabbarGroup.removeRedPoint(0);
		}
	}
	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}
	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY,view.update,view); 
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACEG_WINZIDREWARD),this.update,this);
		super.dispose();
	}
}