class AcNewOpenViewTab1 extends AcCommonViewTab
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

    private get cfg() : Config.AcCfg.NewOpenCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcNewOpenVo{
        return <AcNewOpenVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected initView():void
	{	
		let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENTASKREWARDS),this.rewardCallBack,this);
        
        let vo = this.vo;
		let taskArr = this.getArr();
		taskArr = view.updataArr(taskArr);
		
		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth-383);
		let scrollList = ComponentManager.getScrollList(AcNewOpenTaskItem,taskArr,tmpRect,view.code);
        view._scrollList = scrollList;     
		view.y=8;
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
			for(let k in unit){
				let isget = view.vo.isGetTaskReward(id,Number(k)-1);
				let tmp = unit[k];
				tmp.id1 = id;
				tmp.id2 = k;
				if(isget && k=="5")
				{
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
			let taskNum = AcMayDayVo.getTask(arr[i].id1,Number(arr[i].id2)-1); 
			if(this.vo.isGetTaskReward(arr[i].id1,Number(arr[i].id2)-1)){
				arr1.push(arr[i]);
			}
			else{
				if(taskNum>=arr[i].peopleNum)
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
		let rewardList =  GameData.formatRewardItem(rewards);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList,pos);
		this.vo.lastidx = null;
		this.vo.lastpos = null;
	}

    public dispose():void
	{	
		let view = this;
		this._scrollList =null;
		this._taskArr =null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENTASKREWARDS),this.rewardCallBack,this);
		super.dispose();
	}
}