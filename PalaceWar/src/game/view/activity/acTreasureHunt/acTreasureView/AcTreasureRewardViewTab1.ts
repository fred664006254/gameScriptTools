class AcTreasureRewardViewTab1 extends AcCommonViewTab
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
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST,this.restList,this);
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.restList,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.restList,this); 
	
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth-195-50);
		var data:any={
			aid :this.param.data.aid,
			code :this.param.data.code,
		}
		this._data =data;
		var newArr = this.getArr();
        let scrollList = ComponentManager.getScrollList(TreasureRewardScrollItem,newArr,rect,data);
		scrollList.x =25; 
		scrollList.y =20; 
        this.addChild(scrollList); 
		this._scrollList =scrollList;
	} 

	public refreshWhenSwitchBack(): void 
	{
		this.restList();
	} 
	
	private restList():void
	{
		var newarr = this.getArr(); 
		this._scrollList.refreshData(newarr,this._data);
	}
	private getArr():Array<any>
	{

		let keys = this.cfg.getTaskorReward(1,this.vo.day); 
		let arr =[];
		let arr2 =[];
		for(var i in keys)
		{
			var currRe = keys[i]; 
			var  myRechargeNum=this.vo.getAinfoV();
			if(this.vo.getReceiveType(currRe.name)==false&&myRechargeNum>=currRe.value)
			{
				arr.push(currRe);
			}else
			{
				arr2.push(currRe);
			}
		}  
		var newarr = [];
		newarr = arr2.concat(arr); 
		return newarr;
	}
	private get cfg() : Config.AcCfg.TreasureHuntCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
	}

	private get vo():AcTreasureHuntVo
	{
		 let springCelebrateVo = <AcTreasureHuntVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code); 
		 return  springCelebrateVo;
	}   
	
	// 页签类型
	protected getSheepType():number
	{
		return 1;
	} 
	public dispose():void
    {	
		this._scrollList=null;
		this._data =null;
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.restList,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST,this.restList,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.restList,this); 
		super.dispose();
	}
}