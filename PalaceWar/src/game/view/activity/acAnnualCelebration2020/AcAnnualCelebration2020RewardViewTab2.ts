class AcAnnualCelebration2020RewardViewTab2 extends AcCommonViewTab
{

    private _scrollList:ScrollList = null; 
    public constructor() 
	{
		super();
		this.initView();
	}

    private get cfg() : Config.AcCfg.AnnualCelebration2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcAnnualCelebration2020Vo{
        return <AcAnnualCelebration2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcAnnualCelebration2020View');
		let code = baseview.getUiCode();
		return code;
	}

	private get uicode():string{

		return this.uiCode;
	}

    protected initView():void
    {	
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020GETTASK),this.useCallback,this);  
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.restList, this);


        let bottomBg2 = BaseBitmap.create("public_9_bg32");
        bottomBg2.height = GameConfig.stageHeigth - 169;
        bottomBg2.width = GameConfig.stageWidth - 32;
        bottomBg2.x = GameConfig.stageWidth/2 - bottomBg2.width/2;
        bottomBg2.y = 10;
		// this.addChild(bottomBg2);

        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg2.height-10);

		var newArr = this.getArr();
        let scrollList = ComponentManager.getScrollList(AcAnnualCelebration2020TaskScrollItem,newArr,rect,{aid:this.aid,code:this.code,uicode:this.uicode});
		scrollList.x =5; 
		scrollList.y =5+bottomBg2.y; 
        this.addChild(scrollList); 
		this._scrollList =scrollList;
    }

    private restList():void
	{
		var newarr = this.getArr(); 
		this._scrollList.refreshData(newarr,{aid:this.aid,code:this.code,uicode:this.uicode});
	}

	// private getArr():Array<any>
	// {
	// 	let taskTab = this.cfg.task[0];
    //     let keys = Object.keys(taskTab); 
	// 	let arr1 =[];
	// 	let arr2 =[];
    //     let arr3=[];
	// 	for(var i in keys)
	// 	{
    //         var currTask = taskTab[keys[i]]; 
	// 		var  taskNum=this.vo.getTaskNum(currTask.id);

	// 		if(!this.vo.getTaskFlag(currTask.id) )
	// 		{
	// 			arr1.push(currTask);
	// 		}
    //         else
	// 		{
	// 			if(taskNum>=currTask.value)
	// 			{
	// 				arr2.push(currTask);
	// 			}
	// 			else
	// 			{
	// 				arr3.push(currTask);
	// 			} 
	// 		}
	// 	}  
	// 	return arr2.concat(arr3).concat(arr1); 
	// }

	private getArr():any[]{
		let view = this;
		let arr = [];
		let task = view.cfg.task;
		for(let i in task){
			let unit = task[i];
			let id = Number(i);
			let keys = Object.keys(unit);
			let length = keys.length;
			if (id == 2)//登录
			{
				if (length > this.vo.getAcContinueDays())
				{
					length = this.vo.getAcContinueDays();
				}
			}
			for(let j = 0; j < length;j++){
				let tmp = unit[keys[j]];
				let tasknum = view.vo.getTaskNum(j+1,id+1);
				let canget = view.vo.getTaskFlag(j+1,id+1);
				tmp.id1 = id+1;
				tmp.id2 = j+1;
				if(!canget && Number(j) == (length-1)){
					arr.push(tmp);
					break;
				}
				if(canget){
					arr.push(tmp);
					break;
				}
			}
		}
		return arr;
	}

    public useCallback(event:egret.Event):void
	{
		if(event.data.ret)
		{  
			let rewards:string ="";
			rewards = this.vo.tmpReward;
			App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(rewards));
		} 
	}

    public dispose():void
	{ 

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020GETTASK),this.useCallback,this);  
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.restList, this);

        this._scrollList = null;

        super.dispose();
    }

}