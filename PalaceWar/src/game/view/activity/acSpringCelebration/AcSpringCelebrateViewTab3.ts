class AcSpringCelebrateViewTab3 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _rechargeArr =null;
	public constructor() 
	{
		super();
		this.initView();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB,this.update,this);  

	}
	protected initView():void
	{
		let bottomBg = BaseBitmap.create("public_9_bg43");
		bottomBg.width=625;
		bottomBg.height=GameConfig.stageHeigth-410;
		bottomBg.x=5;
		bottomBg.y=-220; 
		this.addChild(bottomBg);
		
		let springVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE);
		let rechargeArr  =  springVo.getArr("task"); 
		rechargeArr = this.updataArr(rechargeArr);
		this._rechargeArr = rechargeArr;
		
 		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 430);
		let scrollList = ComponentManager.getScrollList(Celebration3ScrollItem,rechargeArr,tmpRect);
		this._scrollList = scrollList;     
		this._scrollList.setPosition(20,-210); 
		this.addChild(scrollList); 

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
		let arr3=[];
		
		for(var i:number= 0;i<arr.length; i++)
		{
			if(springCelebrateVo.isGetRecharge(arr[i].key))
			{
				arr1.push(arr[i]);
			} 
			else
			{	 
				let taskNum = springCelebrateVo.getTask(arr[i].questType); 
				if(taskNum>=arr[i].value)
				{
					arr2.push(arr[i]);
				}
				else
				{
					arr3.push(arr[i]);
				} 
			}
		}
		return arr2.concat(arr3).concat(arr1); 
	} 

	private update():void
	{
		if(this._scrollList)
		{	
		 
			let rechargeArr = this.updataArr(this._rechargeArr);
			this._scrollList.refreshData(rechargeArr);
		}
	}

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB,this.update,this);  
		this._scrollList =null;
		this._rechargeArr =null;
		super.dispose();
	}
}