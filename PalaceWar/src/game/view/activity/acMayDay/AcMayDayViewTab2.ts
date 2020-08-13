/*
author : qinajun
date : 2018.4.14
desc : 转盘活动viewtab2 累计充值
*/
class AcMayDayViewTab2 extends AcCommonViewTab
{ 
	private _scrollList:ScrollList = null; 
	private _isSpecial : boolean = false;
	private _seprateNum : number = 0;
	public constructor() 
	{
		super();
		this.initView();
	}
	
	protected initView():void
	{
		let view = this;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB),this.eventCollectHandlerCallBack,this);
		let style = Number(view.code) > 8;
		
		if(style){
			view.width = GameConfig.stageWidth;
			view.height = GameConfig.stageHeigth - 196;
		}
		else{
			let bottomBg = BaseBitmap.create("public_9_bg43");
			bottomBg.width=625;
			bottomBg.height=GameConfig.stageHeigth-410;
			bottomBg.x=5;
			bottomBg.y=-180; 
			this.addChild(bottomBg);
		}
		
		
		let aid = this.aid;
		let code = this.code;
		let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(aid);

		let objList = this.cfg.recharge;
		let terList = {};

		// for (var key in objList) {
		// 	let tmpCfg = objList[key];

			
		// 		this._seprateNum = tmpCfg.needGem;
		// 		terList[key] = tmpCfg;
			
		// }
		
		// let keys = Object.keys(objList);
		// keys.sort((a:string,b:string)=>{
		// 	return Number(a) - Number(b) ;
		// });

		let keys = this.updateArr(objList);

 		let tmpRect = null;
		let scrollList = null;
		if(style){
			tmpRect = new egret.Rectangle(0,0,GameConfig.stageWidth - 10,view.height - 30);
			scrollList = ComponentManager.getScrollList(AcMayDay2ScrollItem,keys,tmpRect, this.code);
			scrollList.setPosition(20,0); 
		}
		else{
			tmpRect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 430);
			scrollList = ComponentManager.getScrollList(AcMayDay2ScrollItem,keys,tmpRect, this.code);
			scrollList.setPosition(20,-170); 
		}
		
		this.addChild(scrollList);
		this._scrollList = scrollList;
	}

	private updateArr(arr):any[]{
		let view = this;
		let vo = view.vo; 
		if(!vo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		let rechareTotal = vo.getChargeNum();
		for(var i:number= 0;i < arr.length; i++)
		{
			if(vo.isGetRecharge(i + 1)){//
				arr1.push(i);
			}
			else{
				if(rechareTotal >= arr[i].needGem)
				{
					arr2.push(i);
				}
				else
				{
					arr3.push(i);
				} 
			}
		}
		return arr2.concat(arr3).concat(arr1); 
	}

	private update():void{
		let arr = this.updateArr(this.cfg.recharge);
		this._scrollList.refreshData(arr, this.code);
	}

	private get cfg() : Config.AcCfg.MayDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcMayDayVo{
        return <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}

	protected getSheepType():number
	{
		return 2;
	}

	protected eventCollectHandlerCallBack(event:egret.Event)
    {
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }

        let rewards = rData.rewards
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = this.vo.lastPos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
	}
	
	
	public dispose():void
	{	 
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETMAYDAYITEMB),this.eventCollectHandlerCallBack,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 
		this._scrollList =null;
		super.dispose();
	}
}