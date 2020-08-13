/*
author : qinajun
date : 2018.4.14
desc : 励精图治 活动任务
*/
class AcBattlePassViewTab2 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _curPage = 1;
	private _curPageTxt : BaseTextField = null;
	private _leftBtn : BaseButton = null;
	private _rightBtn : BaseButton = null;
	private _curRoundExpTxt : BaseTextField = null;

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
	
		view._curPage = view.vo.getCurRound();
		let baseview : any = ViewController.getInstance().getView('AcBattlePassView');
		let code = baseview.getUiCode();
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		if(this.vo.isNewUi())
		{
			let tipbg = BaseBitmap.create(`countrywarrewardview_itembg`);
			tipbg.width = 590;
			tipbg.height = 70;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipbg,view,[0,8], true);
			view.addChild(tipbg);
		}

		let arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", view.freshPage, view, ["left"]);
		arrow_leftBtn.setScale(0.78);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrow_leftBtn, view, [20, 20]);
		view.addChild(arrow_leftBtn);
		view._leftBtn = arrow_leftBtn;

		let curPageTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassRound`, code), [view._curPage.toString()]), 28, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, curPageTxt, arrow_leftBtn, [arrow_leftBtn.width * arrow_leftBtn.scaleX + 10, 0]);
		view.addChild(curPageTxt);
		view._curPageTxt = curPageTxt;

		let arrow_rightBtn = ComponentManager.getButton("btn_leftpage", "", view.freshPage, view, ["right"]);
		arrow_rightBtn.anchorOffsetX = arrow_rightBtn.width / 2;
		arrow_rightBtn.scaleX = -0.78;
		arrow_rightBtn.scaleY = 0.78;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, arrow_rightBtn, curPageTxt, [curPageTxt.textWidth + 10, 0]);
		view.addChild(arrow_rightBtn);
		view._rightBtn = arrow_rightBtn;

		// let timeTxt =  ComponentManager.getTextField(`${App.DateUtil.getFormatBySecond(view.vo.st, 11)}-${App.DateUtil.getFormatBySecond(view.vo.et, 11)}`, 20, TextFieldConst.COLOR_BLACK);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, arrow_rightBtn, [arrow_rightBtn.width * arrow_rightBtn.scaleY + 23, 0]);
		// view.addChild(timeTxt);

		let str = '';
		let start = view.vo.st + (view.vo.getCurRound() - 1) * 86400 * view.cfg.refresh;
		let end = view.vo.getCurRound() == view.vo.getMaxRound() ? (view.vo.et - 86400 * view.cfg.extraTime) : (view.vo.st + (view.vo.getCurRound()) * 86400 * view.cfg.refresh);
		let curExpTxt = ComponentManager.getTextField(`${App.DateUtil.getFormatBySecond(start, 11)}-${App.DateUtil.getFormatBySecond(end, 11)}\n${LanguageManager.getlocal(`acBattlePassRoundExp-${code}`), [view.vo.getCurRoundExp().toString()]}`, 20, TextFieldConst.COLOR_BLACK);
		//App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, curExpTxt, timeTxt, [0, timeTxt.textHeight + 9]);
		view.addChild(curExpTxt);
		curExpTxt.lineSpacing = 5;
		curExpTxt.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, curExpTxt, arrow_rightBtn, [arrow_rightBtn.width * arrow_rightBtn.scaleY + 23, 0]);
		view._curRoundExpTxt = curExpTxt;


		let listbg = BaseBitmap.create(`public_9_bg32`);
		listbg.width = 620;
		listbg.height = view.height - 59 - 25;//curExpTxt.y - curExpTxt.textHeight - 15;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listbg, view, [-3, 80]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop , listbg, view, [-3, 80]);
		view.addChild(listbg);
		if(this.vo.isNewUi())
		{
			curPageTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
			curExpTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
			listbg.visible = false;
		}

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip1`, code)), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view, [0, view.height + 50]);
		view.addChild(tipTxt);

		let objList = view.vo.getTaskArr();
		let arr = view.updateArr(objList);
 		let tmpRect =  new egret.Rectangle(0,0,610,listbg.height - 10);

		if(this.vo.isNewUi())
		{
			tmpRect.height = listbg.height + 10;
		}

		let scrollList = ComponentManager.getScrollList(AcBattlePassViewTab2ScrollItem, arr, tmpRect, view.code);
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0,5]);
		view.addChild(scrollList); 

		view.update();
		
		// let vo = this.vo;
		
	}

	private freshPage(type : string):void{
		let view = this;
		let page = view._curPage;
		let code = view.uiCode;

		if(type == 'left'){
			page = Math.max(page - 1, 1);
		}
		else{
			page = page + 1;
		}
		if(page > view.vo.getMaxRound()){
			App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip4`, code)));
			return;
		}
		if(page > view.vo.getCurRound()){
			App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip3`, code)));
			return;
		}
		if(page !== view._curPage){
			view._curPage = page;
			view._curPageTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassRound`, code), [view._curPage.toString()]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._rightBtn, view._curPageTxt, [view._curPageTxt.textWidth + 10, 0]);
			view.update();
		}
	}

	private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
		let code = view.uiCode;
		let curRound = view.vo.getCurRound();
		let str = '';
		let emptystr = '';
		if(curRound == view._curPage){
			str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassRoundExp`, code), [view.vo.getCurRoundExp().toString()]);
		}
		else if(curRound > view._curPage){
			str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip2`, code));
		}
		else if(curRound < view._curPage){
			str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip3`, code));
		}
		view._scrollList.setEmptyTip(str);
		let start = view.vo.st + (view._curPage - 1) * 86400 * view.cfg.refresh;
		let end = view._curPage == view.vo.getMaxRound() ? (view.vo.et - 86400 * view.cfg.extraTime) : (view.vo.st + (view._curPage) * 86400 * view.cfg.refresh);
		view._curRoundExpTxt.text = `${App.DateUtil.getFormatBySecond(start, 11)}-${App.DateUtil.getFormatBySecond(end, 11)}\n${str}`;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._curRoundExpTxt, view._rightBtn, [view._rightBtn.width * view._rightBtn.scaleY + 23, 0]);
		
		let objList = view.vo.getTaskArr(view._curPage);
		let arr = view.updateArr(objList);
		view._scrollList.refreshData(arr,view.code);
		view._scrollList.verticalScrollPolicy = arr.length == 0 ? 'off' : 'on';

		if(view._curPage > 1){
			App.DisplayUtil.changeToNormal(view._leftBtn)
		}
		else{
			App.DisplayUtil.changeToGray(view._leftBtn)
		}

		if(view._curPage < view.vo.getCurRound()){
			App.DisplayUtil.changeToNormal(view._rightBtn)
		}
		else{
			App.DisplayUtil.changeToGray(view._rightBtn)
		}

		App.CommonUtil.removeIconFromBDOC(view._leftBtn);
		for(let i = 1; i < view._curPage; ++ i){
			if(view.vo.getRoundReward(i)){
				App.CommonUtil.addIconToBDOC(view._leftBtn);
				break;
			}
		}

		App.CommonUtil.removeIconFromBDOC(view._rightBtn);
		for(let i = view._curPage + 1; i < view.vo.getMaxRound(); ++ i){
			if(view.vo.getRoundReward(i)){
				App.CommonUtil.addIconToBDOC(view._rightBtn);
				break;
			}
		}
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
			arr[i].round = view._curPage;
			let questType = arr[i].questType;
			let taskNum = vo.getTaskValue(questType, view._curPage); 
			if(vo.isGetTaskReward(questType, view._curPage)){
				arr1.push(arr[i]);
			}
			else{
				if(vo.canLqTaskReward(questType, view._curPage)){
					arr2.push(arr[i]);
				}
				else{
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
			if(data &&  Number(data.taskType) == 1){
				let rewards = data.rewards;
				let selIdx = view.vo.selIdx;
				App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassGetExp`, view.getUiCode()), [data.expGet]));
				// let item = <AcBattlePassViewTab2ScrollItem>view._scrollList.getItemByIndex(selIdx);
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
		view._curPageTxt = null;
		view._curPage = 1;
		view._scrollList =null;
		view._rightBtn = null;
		view._curRoundExpTxt = null;
		view._leftBtn = null;
		super.dispose();
	}
}