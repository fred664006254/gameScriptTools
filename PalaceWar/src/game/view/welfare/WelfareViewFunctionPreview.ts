class WelfareViewFunctionPreview extends WelfareViewTab
{
	private _scrollList:ScrollList;
	private arr2:Array<any>=[];
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init();
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE),this.refreshText,this);
	
		this.refreshDataList();

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,492,GameConfig.stageHeigth-90);
		this._scrollList = ComponentManager.getScrollList(WelfareViewFunctionScrollltem,this.arr2,rect);
		this.addChild(this._scrollList);
	}

	public refreshText():void
	{
		// console.log("玩家升官了！！");
		
		//1 玩家升官
		//2 关卡》2 >80;
		//3 子嗣 1个  培养一个成年子嗣
		//4 门客15个且大于60级
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
	}

	private refreshDataList():void
	{
		this.arr2 =[];
		let arr = Api.otherInfoVoApi.getopenArr(1);//领取数据 

		// var arr2 = [];
		// arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
		// var arr3 =[]; //已经领取过的
		// var arr4 =[]; //可以领取的
		// var arr5 =[]; //不可以领取的
		// for(var i:number=0;i<arr2.length ;i++)
		// {
		// 	if(arr&&arr[arr2[i].key]==1)
		// 	{
		// 		arr3.push(arr2[i]);
		// 	}
		// 	else
		// 	{	
		// 		let currentName =arr2[i].gameName;
		// 		if(currentName=="sadun"||currentName=="council" || currentName=="servantExile"||currentName=="wifebanish")
		// 		{ 
					
		// 			let isShowNpc:boolean=Api[arr2[i].gameName+"VoApi"].isShowNpc();
		// 			// 亲家
		// 			if(Api.switchVoApi.checkopenSadun()&&arr2[i].gameName=="sadun")
		// 			{
		// 				if(isShowNpc)
		// 				{
		// 					arr4.push(arr2[i]);
		// 				}
		// 				else
		// 				{
		// 					arr5.push(arr2[i]);
		// 				}
		// 			}
		// 			// 内阁
		// 			else if(arr2[i].gameName=="council"&&Api.switchVoApi.checkOpenCouncil())
		// 			{ 
		// 				if(isShowNpc)
		// 				{
		// 					arr4.push(arr2[i]);
		// 				}
		// 				else
		// 				{
		// 					arr5.push(arr2[i]);
		// 				}
		// 			} 
		// 			 // 出海
		// 			else if(arr2[i].gameName=="servantExile"&&Api.switchVoApi.checkOpenExile())
		// 			{
		// 				if(isShowNpc)
		// 				{
		// 					arr4.push(arr2[i]);
		// 				}
		// 				else
		// 				{
		// 					arr5.push(arr2[i]);
		// 				}
		// 			}
        //             // 省亲
		// 			else if(arr2[i].gameName=="wifebanish"&&Api.switchVoApi.checkOpenBanish())
		// 			{
		// 				if(isShowNpc)
		// 				{
		// 					arr4.push(arr2[i]);
		// 				}
		// 				else
		// 				{
		// 					arr5.push(arr2[i]);
		// 				}
		// 			} 
		// 		} 
		// 		else if(Api[arr2[i].gameName+"VoApi"]&&Api[arr2[i].gameName+"VoApi"].isShowNpc)
        //      	{
        //             let isShowNpc:boolean=Api[arr2[i].gameName+"VoApi"].isShowNpc();
		// 		  	if(isShowNpc)
		// 			{
		// 				arr4.push(arr2[i]);
		// 			}
		// 			else
		// 			{
		// 				arr5.push(arr2[i]);
		// 			}
		// 		} 
		// 	}
		// }
	 
		// arr3.sort(function(a: any,b: any):number
        // {
        //     if(a.sortId > b.sortId) return 1;
        //     else if(a.sortId == b.sortId) return 0;
        //     return -1;
        // });
		// arr4.sort(function(a: any,b: any):number
        // {
        //     if(a.sortId > b.sortId) return 1;
        //     else if(a.sortId == b.sortId) return 0;
        //     return -1;
        // });

		// arr5.sort(function(a: any,b: any):number
        // {
        //     if(a.sortId > b.sortId) return 1;
        //     else if(a.sortId == b.sortId) return 0;
        //     return -1;
        // });
		
		// arr2 = arr4.concat(arr5).concat(arr3);
		this.arr2  = arr;
	} 

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
		[
			"funtionbottom"
		]);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE),this.refreshText,this);	
	 	this._scrollList =null;
		this.arr2=[];
		super.dispose();
	}
}