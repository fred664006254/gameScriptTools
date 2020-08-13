/*
author : qinajun
date : 2018.4.14
desc : 端午活动节日任务
*/
class AcDragonBoatDayViewTab3 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _taskArr =null;
	public constructor() 
	{
		super();
		this.initView();
	}
	
    private get cfg() : Config.AcCfg.DragonBoatDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDragonBoatDayVo{
        return <AcDragonBoatDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

	protected initView():void
	{	
		let view = this;
		let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.height = boatview.tabHeight;
		view.width = boatview.tabWidth;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
		let vo = this.vo;
		let taskArr = vo.getArr("task"); 
		taskArr = view.updataArr(taskArr);
		for(let i in taskArr){
			taskArr[i].width = view.width - 40;
		}
		view._taskArr = taskArr;
		
 		let tmpRect =  new egret.Rectangle(0,0,598,view.height - 50);
		let scrollList = ComponentManager.getScrollList(AcDragonBoatDayTab3ScrollItem,taskArr,tmpRect,view.code);
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0,5]);
		view.addChild(scrollList); 
	}

	private update() :void{
		if(!this.vo){
			return;
		}
		let taskArr = this.vo.getArr("task"); 
		taskArr = this.updataArr(taskArr);
		this._taskArr = taskArr;
		this._scrollList.refreshData(taskArr,this.code);
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
		this._taskArr =null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
		super.dispose();
	}
}