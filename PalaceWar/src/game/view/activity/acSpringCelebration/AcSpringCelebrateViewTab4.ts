class AcSpringCelebrateViewTab4 extends AcCommonViewTab
{
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
		let rechargeArr  =  springVo.getArr("shop"); 
		
		rechargeArr = this.updataArr(rechargeArr);
		this._rechargeArr = rechargeArr;

 		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 430);
		let scrollList = ComponentManager.getScrollList(Celebration4ScrollItem,rechargeArr,tmpRect);
		scrollList.setPosition(20,-210); 
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
			let exchangeNum = springCelebrateVo.getExchange4Num(arr[i].key);
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
			// let rechargeArr  =	Config.AcCfg.getShopItemCfgById("shop");
			let rechargeArr = this.updataArr(this._rechargeArr);
			this._scrollList.refreshData(rechargeArr);
		}
	}

	public dispose():void
	{	 
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB,this.update,this);  
		this._scrollList = null;
		this._rechargeArr = null;
		super.dispose();
	}
}