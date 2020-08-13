/*
author : qinajun
date : 2018.4.14
desc : 转盘活动viewtab3 节日任务
*/
class AcMayDayViewTab3 extends CommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _rechargeArr = null;
	private _timerText = null;
	public constructor() 
	{
		super();
		this.initView();
	}
	private get cfg() : Config.AcCfg.MayDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMayDayView.AID, AcMayDayView.CODE);
    }

    private get vo() : AcMayDayVo{
        return <AcMayDayVo>Api.acVoApi.getActivityVoByAidAndCode(AcMayDayView.AID, AcMayDayView.CODE);
	}

	protected initView():void
	{	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);
		let bottomBg = BaseBitmap.create("public_9v_bg03");
		bottomBg.width=GameConfig.stageWidth;
		bottomBg.height=GameConfig.stageHeigth - 69 - 94 + 15;
		bottomBg.y = 0;
		this.addChild(bottomBg);

		let timeBg = BaseBitmap.create("acnewyear_middlebg");
		timeBg.x = GameConfig.stageWidth/2 - timeBg.width/2;
		timeBg.y = 0;
		this.addChild(timeBg);

        let vo = this.vo;
        let stTxt = App.DateUtil.getFormatBySecond(vo.st, 7);
		let etTxt = App.DateUtil.getFormatBySecond(vo.et - 86400 * 1, 7);
        this._timerText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime`,[vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
	 	this._timerText.x = timeBg.x + timeBg.width / 2 - this._timerText.width / 2;
		this._timerText.y = timeBg.y + timeBg.height / 2 - this._timerText.height / 2;
        this.addChild(this._timerText);


		
		let mayDayVo = this.vo;
		let rechargeArr = mayDayVo.getArr("task"); 
		rechargeArr = this.updataArr(rechargeArr);
		this._rechargeArr = rechargeArr;
		
 		let tmpRect =  new egret.Rectangle(0,0,610,bottomBg.height - 75);
		let scrollList = ComponentManager.getScrollList( AcMayDay3ScrollItem,rechargeArr,tmpRect);
		this._scrollList = scrollList;     
		this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2,timeBg.y + timeBg.height); 
		this.addChild(scrollList); 

	}

	private update() :void{
		if(!this.vo){
			return;
		}
		let rechargeArr = this.vo.getArr("task"); 
		rechargeArr = this.updataArr(rechargeArr);
		this._rechargeArr = rechargeArr;
		this._scrollList.refreshData(rechargeArr);
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
		this._timerText = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);
		super.dispose();
	}
}