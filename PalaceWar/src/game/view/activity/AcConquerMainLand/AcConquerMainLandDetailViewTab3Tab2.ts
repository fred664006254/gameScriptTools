//
class AcConquerMainLandDetailViewTab3Tab2 extends CommonViewTab{

	private _list : ScrollList = null;
	
	public constructor(param?) {
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

	protected getListType():number{
		return 1;
	}

	protected initView():void{
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_RECORDLOG), view.logCallback, view);
		
		NetManager.request(NetRequestConst.REQUEST_MAINLAND_RECORDLOG,{
            activeId : view.acTivityId, 
		});
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;

		let bottomBg = BaseBitmap.create(`arena_bottom`);
        bottomBg.height = 55;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
		view.addChild(bottomBg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acmainlandrecordtip2-${view.uiCode}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomBg);
		view.addChild(tipTxt);

		let viewbg = BaseBitmap.create("public_9_bg22");
		viewbg.height = view.height - bottomBg.height;
		view.addChild(viewbg);

		let listbg = BaseBitmap.create(`public_9_bg32`);
		listbg.width = 618;
		listbg.height = viewbg.height - 40;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, viewbg, [0,20]);
		view.addChild(listbg);

 		let tmpRect =  new egret.Rectangle(0,0,listbg.width - 10,listbg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandRecordItem, [], tmpRect, view.code);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0,5]);
		view.addChild(scrollList); 
		scrollList.bounces = false;
		let emptystr = ``;
		if(view.vo.getCurPeriod() == 1){
			emptystr = LanguageManager.getlocal('acBattleRoundNotStart-1');
		}
		else{
			if(!view.vo.isCanJoin()){
				emptystr = LanguageManager.getlocal(`acConquerMainLandTip23-${view.uiCode}`);
			}
			else{
				emptystr = LanguageManager.getlocal(`acPunishNoData`);
			}
		}
		scrollList.setEmptyTip(emptystr);
		view._list = scrollList;
	}

	private logCallback(evt : egret.Event):void{
		let view = this;
		if(evt.data.ret && evt.data.data.data){
			let arr = view.vo.getMyRecord(evt.data.data.data.log);
			view._list.refreshData(arr, view.code);
		}
	}

	public dispose():void{
		let view = this;
		view._list = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_RECORDLOG), view.logCallback, view);
		super.dispose();
	}
}