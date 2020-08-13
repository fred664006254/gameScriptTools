/*
author : qinajun
date : 2018.4.14
desc : 转盘活动viewtab3 节日任务
*/
class AcMayDayViewTab3 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _rechargeArr =null;
	public constructor() 
	{
		super();
		this.initView();
	}
	private get cfg() : Config.AcCfg.MayDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcMayDayVo{
        return <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}

	protected initView():void
	{	
		let view = this;
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
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);
		
		
		let mayDayVo = this.vo;
		let rechargeArr = mayDayVo.getArr("task"); 
		rechargeArr = this.updataArr(rechargeArr);
		this._rechargeArr = rechargeArr;
		
		let tmpRect = null;
		let scrollList = null
		if(style){
			tmpRect = new egret.Rectangle(0,0,GameConfig.stageWidth - 10,view.height - 30);
			scrollList = ComponentManager.getScrollList( AcMayDay3ScrollItem,rechargeArr,tmpRect,this.code);
			scrollList.setPosition(20,0); 
		}
		else{
			tmpRect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 430);
			scrollList = ComponentManager.getScrollList( AcMayDay3ScrollItem,rechargeArr,tmpRect,this.code);
			scrollList.setPosition(20,-170); 
		}

		this._scrollList = scrollList;     
		this.addChild(scrollList); 

	}

	private update() :void{
		if(!this.vo){
			return;
		}
		let rechargeArr = this.vo.getArr("task"); 
		rechargeArr = this.updataArr(rechargeArr);
		this._rechargeArr = rechargeArr;
		this._scrollList.refreshData(rechargeArr,this.code);
	}

	private updataArr(arr:Array<any>=[]):Array<any>
	{
		let AcMayDayVo = this.vo; 
		if(!AcMayDayVo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		for(var i:number= 0;i<arr.length; i++)
		{
			let taskNum = AcMayDayVo.getTask(arr[i].questType); 
			if(this.vo.isGetTaskReward(arr[i].key)){
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
		this._scrollList =null;
		this._rechargeArr =null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);
		super.dispose();
	}
}