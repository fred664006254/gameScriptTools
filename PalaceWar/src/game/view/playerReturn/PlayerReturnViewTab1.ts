/*
author : qinajun
date : 2018.4.14
desc : 端午活动 累积充值
*/
class PlayerReturnViewTab1 extends CommonViewTab
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
		//提示
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`PlayerReturnTip1`), 22, TextFieldConst.COLOR_BLACK);
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, view, [0, 25]);
		view.addChild(tipTxt);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM,view.update,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REBACK_GETSIGNREWARD),view.signCallBack,view);
		
		let api = view.api;
		let objList = api.getArr("signReward");
		let arr = view.updateArr(objList);
		// let keys = Object.keys(objList);
		// keys.sort((a:string,b:string)=>{
		// 	return Number(a) - Number(b) ;
		// });
 		let tmpRect =  new egret.Rectangle(0,0,608,view.height - 70);
		let scrollList = ComponentManager.getScrollList(PlayerReturnViewTab1ScrollItem, arr, tmpRect, '1');
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0,5]);
		view.addChild(scrollList); 
	}

	private update():void{
		let view = this;
		let arr = view.updateArr(view.api.getArr("signReward"));
		view._scrollList.refreshData(arr,'1');
	}

	private updateArr(arr):any[]{
		let view = this;
		let api = view.api; 
		if(!api){
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];

		let curDay = api.getSignDay();
		for(var i:number= 0;i < arr.length; i++)
		{
			if(api.isGetSignAllReward(arr[i].key)){
				arr1.push(arr[i]);
			}
			else{
				if(curDay >= arr[i].days)
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

	private signCallBack(evt : egret.Event):void{
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
		view._scrollList =null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM,view.update,view);//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REBACK_GETSIGNREWARD),view.signCallBack,view);
		super.dispose();
	}
}