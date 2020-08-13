/*
author : qinajun
date : 2018.4.14
desc : 端午活动 累积充值
*/
class PlayerReturnViewTab2 extends CommonViewTab
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
		let boatview : any = ViewController.getInstance().getView('PlayerReturnView');
		view.height = boatview.tabHeight;
		view.width = boatview.tabWidth;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM,view.update,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REBACK_GETTASKREWARD),view.taskCallBack,view);
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
		let api = view.api;
		let objList = api.getArr("taskReward");
		let arr = view.updataArr(objList);
		// let keys = Object.keys(objList);
		// keys.sort((a:string,b:string)=>{
		// 	return Number(a) - Number(b) ;
		// });
 		let tmpRect =  new egret.Rectangle(0,0,608,view.height );
		let scrollList = ComponentManager.getScrollList(PlayerReturnViewTab2ScrollItem, arr, tmpRect, '1');
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0,0]);
		view.addChild(scrollList); 
	}

	private taskCallBack(evt : egret.Event):void{
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

	private update():void{
		let view = this;
		if(!view.api){
			return;
		}
		let arr = view.updataArr(view.api.getArr("taskReward"));
		view._scrollList.refreshData(arr,'1');
	}

	private updataArr(arr:Array<any>=[]):Array<any>
	{
		let api = this.api; 
		if(!api)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		for(var i:number= 0; i < arr.length; i++)
		{
			let taskNum = api.getTask(arr[i].questType); 
			if(api.isGetTaskReward(arr[i].key)){
				arr1.push(arr[i]);
			}
			else{
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

	public dispose():void
	{	
		let view = this;
		this._scrollList =null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM,view.update,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REBACK_GETTASKREWARD),view.taskCallBack,view);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
		super.dispose();
	}
}