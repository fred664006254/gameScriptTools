class AcSpringCelebrateViewTab2 extends CommonViewTab
{ 
	private _scrollList:ScrollList = null; 
	private _rechargeArr =null;
	public constructor() 
	{
		super();
		this.initView();
	}
	
	protected initView():void
	{

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB,this.update,this);  

		// let bottomBg = BaseBitmap.create("public_9v_bg04");
		// bottomBg.width=625;
		// bottomBg.height=GameConfig.stageHeigth-410;
		// bottomBg.x=5;
		// bottomBg.y=-220; 
		// this.addChild(bottomBg);

		let springVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE);
		let rechargeArr  =  springVo.getArr("exchange"); 
		rechargeArr = this.updataArr(rechargeArr);
		this._rechargeArr = rechargeArr;

 		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 480);
		let scrollList = ComponentManager.getScrollList(Celebration2ScrollItem,rechargeArr,tmpRect);
		scrollList.setPosition(18,-290); 
		this.addChild(scrollList);
		this._scrollList = scrollList;

	}
	private updataArr(arr:Array<any>=[]):Array<any>
	{
		let springCelebrateVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE); 
		if(!springCelebrateVo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		
		for(var i:number= 0;i<arr.length; i++)
		{
			let exchangeNum = springCelebrateVo.getExchangeNum(arr[i].key);
			if(exchangeNum==arr[i].limit)
			{
				arr1.push(arr[i]);
			}
			else
			{
				arr2.push(arr[i]);
			}
		}
		return arr2.concat(arr1); 
	}
	 
	private update():void
	{	
		if(this._scrollList)
		{	 
			let rechargeArr = this.updataArr(this._rechargeArr);
			this._scrollList.refreshData(rechargeArr);
			this._scrollList.setPosition(20,-290); 
		}
	
	}

	protected getSheepType():number
	{
		return 2;
	}

	public dispose():void
	{	 
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB,this.update,this);  
		this._scrollList =null;
		this._rechargeArr=null;
		super.dispose();
	}
}