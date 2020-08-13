/*
    author : shaoliang
    date : 2019.5.22
    desc : 粽叶飘香-端午节活动 
*/

class AcDuanWuPopupViewTab3 extends AcCommonViewTab
{   
    //滑动列表
	private _scrollList:ScrollList = null; 
	private _taskArr =null;

    public constructor() 
	{
		super();
		this.initView();
	}

    private get cfg() : Config.AcCfg.DuanWuCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDuanWuVo{
        return <AcDuanWuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

	protected initView():void
	{	
		let view = this;
		view.height = 620;
		view.width = 545;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUITEMC),this.rewardCallBack,this);
		
		let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 540;
		Bg.height = 660;
        Bg.x = 20;
        Bg.y = 55;
		view.addChild(Bg);
		
		let vo = this.vo;
		let taskArr = vo.getArr("task"); 
		taskArr = view.updataArr(taskArr);
		
		let tmpRect =  new egret.Rectangle(0,0,520,view.height+30);
		let scrollList = ComponentManager.getScrollList(AcDuanWuTab2Item,taskArr,tmpRect,[view.code,view.getUiCode()]);
        view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [30,60]);
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
		this._scrollList.refreshData(taskArr,[this.code,this.getUiCode()]);
	}

	private updataArr(arr:Array<any>=[]):Array<any>
	{
		let acDuanWuVo = this.vo; 
		if(!acDuanWuVo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		for(var i:number= 0;i<arr.length; i++)
		{
			let taskNum = acDuanWuVo.getTask(arr[i].questType); 
			if(this.vo.isGetTaskReward(arr[i].taskId)){
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
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
		let cfg = view.cfg.task[view.vo.lastidx];
        let str = `1015_0_${cfg.xiongHuangGet}_${this.getUiCode()}|` + rewards;
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
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUITEMC),this.rewardCallBack,this);
		super.dispose();
	}
}