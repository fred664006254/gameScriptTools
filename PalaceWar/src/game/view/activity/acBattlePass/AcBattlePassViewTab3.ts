/*
author : qinajun
date : 2018.4.14
desc : 励精图治 特殊悬赏
*/
class AcBattlePassViewTab3 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 

	public constructor() 
	{
		super();
		this.initView();
	}
    private get cfg() : Config.AcCfg.BattlePassCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBattlePassVo{
        return <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcBattlePassView');
		let code = baseview.getUiCode();
		return code;
	}
	
	protected initView():void{	
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_TASKRWD), view.rewardCallback, view);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
	
		let baseview : any = ViewController.getInstance().getView('AcBattlePassView');
		let code = baseview.getUiCode();
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		let tipbg = BaseBitmap.create(`decree_wordbg`);
		tipbg.width = 600;
		tipbg.height = 66;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipbg, view, [8, 10]);
		view.addChild(tipbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop , tipbg, view, [-3, 10]);
		
		let tipimg = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepasstasktip`, code));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipimg, tipbg);
		view.addChild(tipimg);

		let listbg = BaseBitmap.create(`public_9_bg32`);
		listbg.width = 620;
		listbg.height = view.height - tipimg.y - tipimg.height - 25;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listbg, view, [-3, 80]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop , listbg, view, [-3, 80]);
		view.addChild(listbg);

		if(this.vo.isNewUi())
		{
			listbg.visible = false;
		}

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTaskTip3`, code)), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.lineSpacing = 5;
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view, [0, view.height + 35]);
		view.addChild(tipTxt);

		let objList = view.vo.getSpecialTaskArr();
		let arr = view.updateArr(objList);
 		let tmpRect =  new egret.Rectangle(0,0,610,listbg.height - 10);

		if(this.vo.isNewUi())
		{
			tmpRect.height = listbg.height + 10;
		}

		let scrollList = ComponentManager.getScrollList(AcBattlePassViewTab3ScrollItem, arr, tmpRect, view.code);
		scrollList.setEmptyTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip3`, code)));
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0,5]);
		view.addChild(scrollList); 

		view.update();
		
		// let vo = this.vo;
		
	}

	private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
		let code = view.uiCode;
		let objList = view.vo.getSpecialTaskArr();
		let arr = view.updateArr(objList);
		view._scrollList.refreshData(arr, view.code);
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
		for(var i:number= 0;i<arr.length; i++){
			let questType = arr[i].questType;
			let taskNum = vo.getSpecialTaskValue(questType); 
			if(vo.isGetSpecialTaskReward(questType)){
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

	private rewardCallback(evt : egret.Event) : void{
		let view = this;
		if(evt.data.ret){
			let data = evt.data.data.data;
			if(data && Number(data.taskType) == 2){
				let rewards = data.rewards;
				let selIdx = view.vo.selIdx;
				App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassGetExp`, view.getUiCode()), [data.expGet]));
				// let item = <AcBattlePassViewTab3ScrollItem>view._scrollList.getItemByIndex(selIdx);
				// if(item){
				// 	item.refreshItem(rewards);
				// }
				view.vo.selIdx = -1;
			}
		}
	}

	public dispose():void{	
		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_TASKRWD), view.rewardCallback, view);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		view._scrollList = null;
		super.dispose();
	}
}