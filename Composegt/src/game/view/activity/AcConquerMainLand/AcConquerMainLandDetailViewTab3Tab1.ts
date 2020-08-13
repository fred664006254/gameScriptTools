//
class AcConquerMainLandDetailViewTab3Tab1 extends CommonViewTab{

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

        let innerbg = BaseBitmap.create("public_listbg3");
        innerbg.width = 620;
        innerbg.height = this.height - 50;
        innerbg.x = 10;
        innerbg.y = 0;
        this.addChild(innerbg);
        
        let innerKuang = BaseBitmap.create("public_9v_bg12"); 
        innerKuang.width = innerbg.width - 30;
        innerKuang.height = innerbg.height - 50;
        this.addChild(innerKuang);
        innerKuang.setPosition(innerbg.x + 15,innerbg.y +10);


		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acmainlandrecordtip2-${view.uiCode}`), 20, TextFieldConst.COLOR_QUALITY_RED_NEW);
		tipTxt.setPosition(innerKuang.x + innerKuang.width/2 - tipTxt.width/2 ,innerKuang.y + innerKuang.height + 5);
		view.addChild(tipTxt);

 		let tmpRect =  new egret.Rectangle(0,0,innerKuang.width - 10,innerKuang.height - 10);
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandRecordItem, [], tmpRect, view.code);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, innerKuang, [0,5]);
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
		scrollList.setEmptyTip(emptystr,TextFieldConst.COLOR_BROWN_NEW);
		view._list = scrollList;
	}

	private logCallback(evt : egret.Event):void{
		let view = this;
		if(evt.data.data.data){
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