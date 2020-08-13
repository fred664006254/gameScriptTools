//
class AcConquerMainLandDetailViewTab4 extends CommonViewTab
{
	private _list : ScrollList = null;
	//private _countDownText:BaseTextField = null;
	
	public constructor(param?){
		super();
		this.param = param;
		this.initView();
	}

	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}
	
	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		let code = baseview.getUiCode();
		return code;
	}

	protected getListType():number
	{
		return 2;
	}

	protected initView():void{
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_GETTASKRWD), view.rewardCallback, view);

		let code = view.uiCode;
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		let midbg = BaseBitmap.create(`mltaskmidbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midbg, view);
		view.addChild(midbg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.vo.getThisCn("acConquerMainLandDetailDesc2")), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.lineSpacing = 5;
		tipTxt.width = 460;
		tipTxt.textAlign = egret.HorizontalAlign.LEFT;
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, midbg);

		let bottomBg = BaseBitmap.create(`arena_bottom`);
        bottomBg.height = 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
		view.addChild(bottomBg);
		
		let viewbg = BaseBitmap.create("public_9_bg22");
		viewbg.height = view.height - midbg.height - bottomBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, viewbg, midbg, [0, midbg.height]);
		view.addChild(viewbg);

		let listbg = BaseBitmap.create(`public_9_bg32`);
		listbg.width = 616;
		listbg.height = viewbg.height - 40;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, viewbg, [0,20]);
		view.addChild(listbg);

		let arr = view.updateArr(view.vo.getTask());
 		let tmpRect =  new egret.Rectangle(0,0,listbg.width - 10,listbg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandTaskItem, arr, tmpRect, view.code);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
		view.addChild(scrollList); 
		view._list = scrollList;
		scrollList.bounces = false;

		let txt1 = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		txt1.textFlow = <Array<egret.ITextElement>>[
			{ text: LanguageManager.getlocal(`acmainlandstrengthServant-${code}`), style: {"underline": true }},
		];
		txt1.addTouchTap(()=>{
			if(view.vo.getCurPeriod() == 1){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
				return
			}
			if(!view.vo.isCanJoin()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${code}`));
				return
			}
			if(!view.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
				return
			}
			App.CommonUtil.goTaskView(`servant`);
		}, view, null);
		view.addChild(txt1);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txt1, bottomBg, [120,0]);

		let txt2 = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		txt2.textFlow = <Array<egret.ITextElement>>[
			{ text: LanguageManager.getlocal(`acwipeBossShop`), style: {"underline": true }},
		];
		txt2.addTouchTap(()=>{
			if(view.vo.getCurPeriod() == 1){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
				return
			}
			//打开商店
			if(!view.vo.isCanJoin()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${code}`));
				return
			}
			if(!view.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
				return
			}
			ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB2);
		}, view, null);
		view.addChild(txt2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, txt2, bottomBg, [120,0]);
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
			let taskId = arr[i].sortId;
			let taskNum = vo.getTaskValue(arr[i].questType); 
			if(vo.getTaskLq(taskId)){
				arr1.push(arr[i]);
			}
			else{
				if(vo.getTaskLq(taskId)){
					arr2.push(arr[i]);
				}
				else{
					arr3.push(arr[i]);
				}
			}
		}
		return arr2.concat(arr3).concat(arr1); 
	}

	private update() : void{
		let view = this;
		view._list.refreshData(view.updateArr(view.vo.getTask()), view.code);
	}

	private rewardCallback(evt : egret.Event) : void{
		let view = this;
		let data = evt.data.data.data;
		let code = view.uiCode;
		if(evt.data.ret && data){
			let rewards = `1016_0_${data.specialReward}_${code}`;
			if(this.vo.checkIsJJL)
			{
				rewards = `1059_0_${data.specialGift}_${code}`;
			}
			let selIdx = view.vo.selIdx;
			let item = <AcConquerMainLandTaskItem>view._list.getItemByIndex(selIdx);
			if(item){
				item.refreshItem(rewards);
			}
			view.vo.selIdx = -1;
		}
	}

	public dispose():void{
		let view = this;
		view._list = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_GETTASKRWD), view.rewardCallback, view);
		super.dispose();
	}

}