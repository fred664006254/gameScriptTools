/*
author : qinajun
date : 2018.4.14
desc : 世界杯活动
*/
class AcWorldCupViewTab3 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _taskArr =null;
	public constructor() 
	{
		super();
		this.initView();
	}
	
	
	private get cfg() : Config.AcCfg.WorldCupCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcWorldCupVo{
        return <AcWorldCupVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
	
	protected initView():void
	{	
		let view = this;
		let mainview : any = ViewController.getInstance().getView('AcWorldCupView');
		view.height = mainview.tabHeight;
		view.width = mainview.tabWidth;

		 //top背景图
		let listBg : BaseBitmap = BaseBitmap.create(`public_9_bg32`);
		listBg.height = view.height - 100;
		listBg.width = 610;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, listBg, view);
		view.addChild(listBg);
		
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM,this.update,this);
		let vo = this.vo;
		let objList = vo.getArr("actMarket");
		let arr = view.updataArr(objList);

 		let tmpRect =  new egret.Rectangle(0,0,600,view.height - 155);
		let scrollList = ComponentManager.getScrollList(AcWorldCupTab3Item,arr,tmpRect,this.code);
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0,5]);
		view.addChild(scrollList); 

		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupShopDesc'), 22, TextFieldConst.COLOR_QUALITY_YELLOW);
		view.setLayoutPosition(LayoutConst.rightbottom, descTxt, listBg, [10,15]);
		view.addChild(descTxt);
	}

	private update() :void{
		if(!this.vo){
			return;
		}
		let taskArr = this.vo.getArr("actMarket"); 
		taskArr = this.updataArr(taskArr);
		this._taskArr = taskArr;
		this._scrollList.refreshData(taskArr,this.code);
	}

	private updataArr(arr:Array<any>=[]):Array<any>
	{
		let view = this;
		let vo = view.vo; 
		if(!vo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		for(var i:number= 0;i < arr.length; i++)
		{ 
			let curNum = arr[i].limit - view.vo.getBuyLimitnum(arr[i].sortId + 1);
			if(curNum <= 0){
				arr1.push(arr[i]);
			}
			else{
				if(curNum > 0)
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
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM,this.update,this);
		super.dispose();
	}
}