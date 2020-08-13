/*
author : qinajun
date : 2018.4.14
desc : 端午活动节日任务
*/
class PlayerReturnViewTab3 extends CommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _taskArr =null;
	public constructor() 
	{
		super();
		this.initView();
	}

	private get cfg(){
        return Config.PlayerreturnCfg;
    }

    private get api(){
        return Api.playerReturnVoApi;
    }

	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM,view.update,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REBACK_GETRECHARGEREWARD),view.rechargeCallBack,view);
		let boatview : any = ViewController.getInstance().getView('PlayerReturnView');
		view.height = boatview.tabHeight;
		view.width = boatview.tabWidth;
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
		let api = view.api;
		let arr = api.getArr("rechargeReward"); 
		arr = view.updateArr(arr);
		
 		let tmpRect =  new egret.Rectangle(0,0,608,view.height - 20);
		let scrollList = ComponentManager.getScrollList(PlayerReturnViewTab3ScrollItem, arr, tmpRect, '1');
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0,5]);
		view.addChild(scrollList); 
	}

	private update() :void{
		if(!this.api){
			return;
		}
		let taskArr = this.api.getArr("rechargeReward"); 
		taskArr = this.updateArr(taskArr);
		this._taskArr = taskArr;
		this._scrollList.refreshData(taskArr,'1');
	}

	private updateArr(arr):any[]{
		let view = this;
		let api = view.api; 
		if(!api)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		let rechareTotal = api.getChargeNum();
		for(let i = 0;i < arr.length; i++)
		{
			if(api.isGetRecharge(arr[i].key)){
				arr1.push(arr[i]);
			}
			else{
				if(rechareTotal >= arr[i].needGem)
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

	private rechargeCallBack(evt : egret.Event):void{
		let view = this;
		let data = evt.data;
        if(data.data.ret < 0){
            return;
        }
        // if (data.data.data.myemperor){
        //     Api.emperorwarVoApi.setDataInfo(data.data.data.myemperor);
        // }
		let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
		let item = view._scrollList.getItemByIndex(view.api.getClickIdx());
        let pos = item.localToGlobal(520, 95);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
	}
	
	public dispose():void
	{	
		let view = this;
		this._scrollList =null;
		this._taskArr =null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM,view.update,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REBACK_GETRECHARGEREWARD),view.rechargeCallBack,view);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
		super.dispose();
	}
}