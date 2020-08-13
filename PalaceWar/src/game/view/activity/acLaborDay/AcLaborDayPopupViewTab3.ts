/*
author : qinajun
date : 2018.4.14
desc : 端午活动节日任务
*/
class AcLaborDayPopupViewTab3 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _taskArr =null;
	public constructor() 
	{
		super();
		this.initView();
	}
	
	private get cfg() : Config.AcCfg.LaborDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLaborDayVo{
        return <AcLaborDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

	protected initView():void
	{	
		let view = this;
		// let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.height = 620;
		view.width = 545;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LABOR_FRESH_LIST,this.update,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LABOR_FRESH,this.update,this);
		
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 540;
		Bg.height = 660;
        Bg.x = 20;
        Bg.y = 55;
		view.addChild(Bg);
		
		let vo = this.vo;
		let taskArr = vo.getArr("task"); 
		taskArr = view.updataArr(taskArr);
		
		let tmpRect =  new egret.Rectangle(0,0,510,view.height);
		let scrollList = ComponentManager.getScrollList(AcLaborDayTab3Item,taskArr,tmpRect,view.code);
        view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [35,65]);
		view.addChild(scrollList); 
		scrollList.bounces = false;
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
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LABOR_FRESH_LIST,this.update,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LABOR_FRESH,this.update,this);
		super.dispose();
	}
}