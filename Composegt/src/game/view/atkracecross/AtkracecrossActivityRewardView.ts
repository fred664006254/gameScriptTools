class AtkracecrossActivityRewardView extends CommonView
{
	static _merank:number = 0;
	static _mepoint:number = 0;
	static _iszonewin:number = 0;
	public constructor() {
		super();
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
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkracecross_rewatdbg1",
			"atkracecross_rewatdbg2",
			"atkracecross_rewatdbg3",
			"wifeview_bottombg", 
		]);
	}

	protected initView():void
	{	
	
	}

	public dispose():void
	{
		

		super.dispose();
	}
}