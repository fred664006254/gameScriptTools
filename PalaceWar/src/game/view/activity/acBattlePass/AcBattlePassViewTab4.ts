/*
author : qinajun
date : 2018.4.14
desc : 励精图治 令牌兑换
*/
class AcBattlePassViewTab4 extends AcCommonViewTab
{
	//滑动列表
	private _scrollList:ScrollList = null; 
	private _numbg : BaseBitmap = null;
	private _icon : BaseBitmap = null;
	private _numTxt : BaseTextField = null;
	private _checkBox : CheckBox = null;

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
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_SHOPBUY), view.rewardCallback, view);

		let baseview : any = ViewController.getInstance().getView('AcBattlePassView');
		let code = baseview.getUiCode();
		let newcode = baseview.getNewCode();
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		let juzhou = BaseBitmap.create(`battlepasssjzhou-${newcode}`);
		juzhou.height = 85;
		view.addChild(juzhou);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[0,0],true);

		let numbg = BaseBitmap.create(`acchristmasview_smalldescbg`);
		view.addChild(numbg);
		view._numbg = numbg;

		let icon = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassicon2`, code));
		view.addChild(icon);
		view._icon = icon;

		let numTxt = ComponentManager.getTextField(`${view.vo.getMyScore()}`, 20);
		view.addChild(numTxt);
		view._numTxt = numTxt;
		numbg.width = icon.width + numTxt.textWidth + 40;
		numbg.height = 30;

		if(this.vo.isNewUi())
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, numbg, view, [45,30]);
		}else
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, numbg, view, [30,30]);
		}
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, numbg, [10,0]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, icon, [icon.width,0]);

		let tip1Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTaskTip4`, code)), 20, TextFieldConst.COLOR_BROWN);
		tip1Txt.lineSpacing = 5;
		tip1Txt.textAlign = egret.HorizontalAlign.LEFT;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tip1Txt, numbg, [numbg.width + 30, 0]);
		view.addChild(tip1Txt);

		let listbg = BaseBitmap.create(`public_9_bg32`);
		listbg.width = 620;
		listbg.height = view.height - 59 - 25;//tip1Txt.y - tip1Txt.textHeight - 15;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listbg, view, [-3, 80]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop , listbg, view, [-3, 80]);
		view.addChild(listbg);

		let checkBox:CheckBox=ComponentManager.getCheckBox(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip5`, code), [view.cfg.remind.toString()]), null, 22);
		view.addChild(checkBox);

		let key = `BattlePass-${this.code}Remind-${Api.playerVoApi.getPlayerID()}-${this.vo.st}`;
		let storage = LocalStorageManager.get(key);
        checkBox.setSelected(storage && storage == '1');
        view._checkBox = checkBox;
        view.addChild(checkBox);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, checkBox, listbg, [10, listbg.height + 40]);

		let objList = view.cfg.getShopArr();
		let arr = view.updateArr(objList);
 		let tmpRect =  new egret.Rectangle(0,0,620,listbg.height - 10);

		if(this.vo.isNewUi())
		{
			listbg.visible = false;
			tmpRect.height = listbg.height + 10;
		}

		let scrollList = ComponentManager.getScrollList(AcBattlePassViewTab4ScrollItem, arr, tmpRect, view.code);
		view._scrollList = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0,5]);
		view.addChild(scrollList); 
		view.update();
	}

	private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
		// let code = view.uiCode;
		// let objList = view.cfg.getShopArr();
		// let arr = view.updateArr(objList);
		// view._scrollList.refreshData(arr, view.code);
		//令牌书刷新
		let numbg = view._numbg;
		let icon = view._icon;
		let numTxt = view._numTxt;
		numTxt.text = view.vo.getMyScore().toString();
		numbg.width = icon.width + numTxt.textWidth + 40;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, numbg, [10,0]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, icon, [icon.width,0]);
	}

	public tick() : void{
		let view = this;
		let key = `BattlePass-${this.code}Remind-${Api.playerVoApi.getPlayerID()}-${this.vo.st}`;
		let storage = LocalStorageManager.get(key);
		if (!storage) {
			LocalStorageManager.set(key, `0`);
		}
		LocalStorageManager.set(key, this._checkBox.checkSelected() ? `1` : `0`);
	}

	private updateArr(arr):any[]{
		let view = this;
		let vo = view.vo; 
		if(!vo)
		{
			return;
		}
		// --令牌兑换商店
        //         --limit:活动限购
        //         --cost:价格
        //         --goods:获得
		let arr1=[];
		let arr2=[];
		let arr3=[];
		for(let i = 0; i < arr.length; i++){
			let item = arr[i];
			arr2.push(item);
			// let buyLimitNum = vo.getLimitBuyNum(item.id); 
			// if(buyLimitNum >= item.limit){
			// 	arr1.push(arr[i]);
			// }
			// else{
			// 	arr2.push(arr[i]);
			// }
		}
		return arr2.concat(arr3).concat(arr1); 
	}

	private rewardCallback(evt : egret.Event) : void{
		let view = this;
		if(evt.data.ret){
			let data = evt.data.data.data;
			if(data && data.rewards){
				let rewards = data.rewards;
				let selIdx = view.vo.selIdx;
				let item = <AcBattlePassViewTab4ScrollItem>view._scrollList.getItemByIndex(selIdx);
				if(item){
					item.refreshItem(rewards);
				}
				view.vo.selIdx = -1;
			}
		}
	}

	public dispose():void{	
		let view = this;
		if(this._checkBox){
			let key = `BattlePass-${this.code}Remind-${Api.playerVoApi.getPlayerID()}-${this.vo.st}`;
			let storage = LocalStorageManager.get(key);
			if (!storage) {
				LocalStorageManager.set(key, `0`);
			}
			LocalStorageManager.set(key, this._checkBox.checkSelected() ? `1` : `0`);
		}
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_SHOPBUY), view.rewardCallback, view);
		view._scrollList = null; 
		view._numbg = null;
		view._icon = null;
		view._numTxt = null;
		view._checkBox = null;
		super.dispose();
	}
}