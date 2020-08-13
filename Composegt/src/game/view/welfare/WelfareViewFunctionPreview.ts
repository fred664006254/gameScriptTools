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
	
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.refreList,this);
		this.refreshDataList();

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,492,GameConfig.stageHeigth-70);
		this._scrollList = ComponentManager.getScrollList(WelfareViewFunctionScrollltem,this.arr2,rect);
		this.addChild(this._scrollList);
		this.bottomBg.visible =false;


		let bottomBg = BaseBitmap.create("public_9v_bg03");
		bottomBg.width = 490;
		bottomBg.height = GameConfig.stageHeigth - 65;
		bottomBg.x = 0;
		bottomBg.y = 0;
		this.addChild(bottomBg); 	
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
		let arr = Api.otherInfoVoApi.getUnlockList();//领取数据 

		var arr2 = [];
		arr2 =Config.UnlocklistCfg.getUnlockItemCfgList();
		var arr3 =[]; //已经领取过的
		var arr4 =[]; //可以领取的
		var arr5 =[]; //不可以领取的
		for(var i:number=0;i<arr2.length ;i++)
		{
			if(arr&&arr[arr2[i].key]==1)
			{
				arr3.push(arr2[i]);
			}
			else
			{
				if(Api[arr2[i].gameName+"VoApi"]&&Api[arr2[i].gameName+"VoApi"].isShowNpc)
             	{
                    let isShowNpc:boolean=Api[arr2[i].gameName+"VoApi"].isShowNpc();
				  	if(isShowNpc)
					{
						arr4.push(arr2[i]);
					}
					else
					{
						arr5.push(arr2[i]);
					}
				}
				
			}
		}
	 
		arr3.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });
		arr4.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });

		arr5.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });
		
		arr2 = arr4.concat(arr5).concat(arr3);
		this.arr2  = arr2;
	}
	// private refreList():void
	// {
	// 	this.refreshDataList();
	// 	if(this._scrollList)
	// 	{
	// 		this._scrollList.refreshData(this.arr2);
	// 	}
	// } 

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
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.refreList,this);
	
	 	this._scrollList =null;
		this.arr2=[];
		super.dispose();
	}
}