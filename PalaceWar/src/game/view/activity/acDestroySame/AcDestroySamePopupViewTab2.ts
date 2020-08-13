/*
author : qinajun
date : 2018.4.14
desc : 活动节日任务
*/
class AcDestroySamePopupViewTab2 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _taskArr =null;
	public constructor(data) 
	{
		super();
		this.param = data;
		this.initView();
	}
	
	private get cfg() : Config.AcCfg.DestroySameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDestroySameVo{
        return <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

	protected initView():void
	{	
		let view = this;
		// let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.height = 660;
		view.width = 545;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_TASK),this.rewardCallBack,this);
		
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 545-10;
		Bg.height = 660;
        Bg.x = 27+5;
        Bg.y = 55;
		view.addChild(Bg);
		
		let vo = this.vo;
		let taskArr = this.getArr();
		taskArr = view.updataArr(taskArr);
		
		let tmpRect =  new egret.Rectangle(0,0,530,view.height - 10);
		let scrollList = ComponentManager.getScrollList(AcDestroySameTaskItem,taskArr,tmpRect,view.code);
        view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0,5]);
		view.addChild(scrollList); 
		scrollList.bounces = false;
	}

	private update() :void{
		if(!this.vo){
			return;
		}
		let taskArr = this.getArr(); 
		taskArr = this.updataArr(taskArr);
		this._taskArr = taskArr;
		this._scrollList.refreshData(taskArr,this.code);
	}

	private getArr():any[]{
		let view = this;
		let arr = [];
		let task = view.cfg.task;
		for(let i in task){
			let unit = task[i];
			let id = Number(i);
			for(let j = 0; j < unit.length; ++ j){
				let tasknum = view.vo.getTask(id+1,j+1);
				let isget = view.vo.isGetTaskReward(id+1,j+1);
				let tmp = unit[j];
				tmp.id1 = id+1;
				tmp.id2 = j+1;
				if(isget && Number(j) == 2){
					arr.push(tmp);
					break;
				}
				if(!isget){
					arr.push(tmp);
					break;
				}
			}
		}
		return arr;
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
			let taskNum = AcMayDayVo.getTask(arr[i].id1,arr[i].id2); 
			if(this.vo.isGetTaskReward(arr[i].id1,arr[i].id2)){
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

	private rewardCallBack(evt : egret.Event):void{
		let view = this;
		if(!evt.data.ret){
            return;
        }
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
		let taskid = view.vo.taskid.split(`_`);
		let cfg = view.cfg.task[Number(taskid[0]) - 1][Number(taskid[1]) - 1];
		let str = rewards;
		if(cfg.specialReward){
			str = `1029_0_${cfg.specialReward}_${this.getUiCode()}|` + rewards;
		}
		let rewardList =  GameData.formatRewardItem(str);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		this.vo.lastidx = null;
	}
	
	public dispose():void
	{	
		let view = this;
		this._scrollList =null;
		this._taskArr =null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_TASK),this.rewardCallBack,this);
		super.dispose();
	}
}