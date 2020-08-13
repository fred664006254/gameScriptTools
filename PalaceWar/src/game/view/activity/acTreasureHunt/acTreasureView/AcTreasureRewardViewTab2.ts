class AcTreasureRewardViewTab2 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList; 
	private _data:any =null;
	
	public constructor(param?) 
	{
		super();
		this.param =param
		egret.callLater(this.initView,this);
	}
 
	protected initView():void
	{  
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST,this.restList,this);
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.restList,this);
		
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth-195-50); 
		var newarr = this.getArr(); 
		var data:any={
			aid :this.param.data.aid,
			code :this.param.data.code,
		}
		this._data =data;
        let scrollList = ComponentManager.getScrollList(TreasureTaskScrollItem,newarr,rect,data);
		scrollList.x =25; 
		scrollList.y =20; 
        this.addChild(scrollList); 
		this._scrollList =scrollList;
	} 

	private getArr():any
	{
		let keys =  this.cfg.getTaskorReward(2,this.vo.day);  
		if(!this.vo.isInActy()) 
		{
			return keys;
		} 
		
		let arr =[];
		let arr2 =[];
		let arr3 =[]; 
		var newarr = [];
		for(var i in keys)
		{
			var currRe = keys[i]; 
			var  myRechargeNum=this.vo.getTypeNum(currRe.questType);
			if(this.vo.getReceiveType(currRe.name)==false&&myRechargeNum>=currRe.value)
			{
				arr.push(currRe);

			}else if(myRechargeNum>=currRe.value)
			{
				arr2.push(currRe);
			}
			else{
				arr3.push(currRe);
			}
		}   
		newarr = arr2.concat(arr3).concat(arr); 
		return newarr;
	}

	private restList():void
	{
		var newarr = this.getArr(); 
		this._scrollList.refreshData(newarr,this._data);
	}
	public refreshWhenSwitchBack(): void 
	{
		this.restList();
	} 

	private get vo():AcTreasureHuntVo
	{
		 let springCelebrateVo = <AcTreasureHuntVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code); 
		 return  springCelebrateVo;
	} 

	private get cfg() : Config.AcCfg.TreasureHuntCfg
	{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
	} 
	// 页签类型
	protected getSheepType():number
	{
		return 2;
	} 

	public dispose():void
    {	
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.restList,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST,this.restList,this);
		super.dispose();
	}
}