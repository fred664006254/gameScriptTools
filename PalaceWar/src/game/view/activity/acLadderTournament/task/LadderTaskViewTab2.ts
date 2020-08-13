class LadderTaskViewTab2 extends AcCommonViewTab
{
    private _scrollList:ScrollList = null; 

    public constructor() 
	{
		super();
		this.initView();
    }

    private get type():number
    {
        return 2;
    }

    private get voApi():LaddertournamentVoApi
    {
        return Api.laddertournamentVoApi;
    }

    private get cfg() : Config.AcCfg.LadderTournamentCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLadderTournamentVo{
        return <AcLadderTournamentVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    
    protected initView():void
	{   
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        

        let bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 618;
        bg2.height = GameConfig.stageHeigth - 420+15;
        bg2.setPosition(11,255-15);
        this.addChild(bg2);

        let arr = view.updateArr(this.cfg.getTaskCfg(this.type));
        let tmpRect =  new egret.Rectangle(0,0,608,bg2.height-10);
		let scrollList = ComponentManager.getScrollList(LadderTaskViewItem1, arr, tmpRect ,this.type);
		view._scrollList = scrollList;     
		scrollList.setPosition(17,bg2.y+5);
        view.addChild(scrollList); 
        

    }

    private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
		let arr = view.updateArr(this.cfg.getTaskCfg(this.type));
		view._scrollList.refreshData(arr,this.type);
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
		
		let totalValue = this.vo.getValue(this.type);
		for(var i:number= 0;i < arr.length; i++)
		{
			if(vo.isReward(this.type,arr[i].id)){
				arr1.push(arr[i]);
			}
			else{
				if(totalValue >= arr[i].value)
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
		let view = this;
		this._scrollList =null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		super.dispose();
	}
}