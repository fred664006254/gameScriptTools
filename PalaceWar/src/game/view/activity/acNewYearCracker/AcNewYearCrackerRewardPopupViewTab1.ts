/*
author : qinajun
desc : 庭院奖励
*/
class AcNewYearCrackerRewardPopupViewTab1 extends CommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _taskArr =null;
	public constructor(data?) 
	{
        super();
        this.param = data;
		this.initView();
	}
    private get cfg() : Config.AcCfg.NewYearCrackerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcNewYearCrackerVo{
        return <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
	}
	
	protected initView():void
	{	
		let view = this;
		view.height = 571;
        view.width = 530;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER,view.update,view);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD,view.update,view);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
		// let vo = this.vo;
		// let objList = vo.getArr("recharge");
		// let arr = view.updateArr(objList);
		// let keys = Object.keys(objList);
		// keys.sort((a:string,b:string)=>{
		// 	return Number(a) - Number(b) ;
		// });
 		let tmpRect =  new egret.Rectangle(0,0,528,view.height - 20);
		let scrollList = ComponentManager.getScrollList(AcNewYearCrackerRewardItem,[],tmpRect,view.param.data.code);
        scrollList.bounces = false;
        view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0,9]);
        view.addChild(scrollList); 
        
        view.update();
	}

	private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
		let arr = view.updateArr(view.cfg.recharge);
		view._scrollList.refreshData(arr,view.param.data.code);
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
		
        let rechareTotal = vo.getCrackerNum();
        let start = 0;
        let end = 6;
		for(let i:number= start;i <= end; i++)
		{
			arr[i].id = i + 1;
			if(vo.getJinduReward(i + 1)){
				arr1.push(arr[i]);
			}
			else{
				if(rechareTotal >= arr[i].needItem)
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
        view._scrollList = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER,view.update,view);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD,view.update,view);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
		super.dispose();
	}
}