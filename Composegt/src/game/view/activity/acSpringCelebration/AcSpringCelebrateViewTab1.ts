class AcSpringCelebrateViewTab1 extends CommonViewTab
{
	
	private _scrollList:ScrollList =null; 
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

		let tmpVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE);
		let rechargeArr  =   tmpVo.getArr("recharge"); 
		let  rechargeArr2 = this.updataArr(rechargeArr);
		this._rechargeArr = rechargeArr2;
	
 		let tmpRect  =  new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 480);
		let scrollList = ComponentManager.getScrollList(Celebration1ScrollItem,rechargeArr2,tmpRect);  
	 	scrollList.setPosition(18,-290); 
		this.addChild(scrollList); 
		this._scrollList = scrollList;
	} 

	private updataArr(arr:Array<any>=[]):Array<any>
	{
		let tmpVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE); 
	
		var  newrechargeArr =arr;
		let newarr =[];
		let arr1 =[];
		let arr2 =[];
		
		for(var i:number=0;i<newrechargeArr.length;i++)
		{
			let num =Number(newrechargeArr[i].key);
			if(tmpVo.getReceiveType(num)==false)	
			{
				arr1.push(newrechargeArr[i]);
			}
			else
			{
				arr2.push(newrechargeArr[i]);
			}
		}
		newrechargeArr = [];
		newrechargeArr =arr2.concat(arr1);
		return  newrechargeArr;
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
 
	// 页签类型
	protected getSheepType():number
	{
		return 1;
	}

	public dispose():void
	{	 
		this._scrollList =null;
		this._rechargeArr=null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_TAB,this.update,this);  
		super.dispose();
	}
}