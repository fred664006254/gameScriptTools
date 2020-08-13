//
class AcConquerMainLandDetailViewTab3Tab1 extends CommonViewTab{
	
	private _list : ScrollList = null;
	private _perScoreTxt : BaseTextField = null;
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
		let code = view.uiCode;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT),this.cancelCallBack,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USEITEM),this.useItemCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USESPECIALGIFT),this.useJJLItemCallback,this);
		let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;

		let viewbg = BaseBitmap.create("public_9_bg22");
		viewbg.height = view.height;
		view.addChild(viewbg);

		let listbg = BaseBitmap.create(`public_9_bg32`);
		listbg.width = 618;
		listbg.height = viewbg.height - 40;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, viewbg, [0,20]);
		view.addChild(listbg);

		let getBg = BaseBitmap.create(`mainlandjzhou-${code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, getBg, listbg, [0,10]);
		view.addChild(getBg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip1-${view.uiCode}`, [String(view.cfg.settleTime / 60)]), 18, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, getBg, [0,13]);
		view.addChild(tipTxt);
		
		let tipBg = BaseBitmap.create(`specialview_commoni_namebg`);
		
		view.addChild(tipBg);

		// let myscore = view.vo.getMyPScore();
		let myscore = view.vo.getMyScore();
		let tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip2-${view.uiCode}`, [ App.StringUtil.changeIntToText(myscore,4),  App.StringUtil.changeIntToText(view.vo.getMyScorePerMin(), 4), ]), 18);
		tipBg.width = tip2Txt.textWidth + 100;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, tipTxt, [0,tipTxt.textHeight + 2]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tip2Txt, tipBg);
		view.addChild(tip2Txt);
		view._perScoreTxt = tip2Txt;

		let arr = [1,2,3];
 		let tmpRect =  new egret.Rectangle(0,0,listbg.width - 10,listbg.height - 10 - getBg.height - 15);
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandArmyItem, arr, tmpRect, view.code);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, getBg, [5, getBg.height + 5]);
		view.addChild(scrollList); 
		scrollList.bounces = false;
		view._list = scrollList;
	}

	private useJJLItemCallback(evt : egret.Event):void{
		let view = this;
		let code = view.uiCode;
		if(evt.data.ret && evt.data.data)
		{
			if(evt.data.data.data.conquerStat && evt.data.data.data.conquerStat==12)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal(this.vo.getThisCn("acConquerMainLandTip47")));
				return;
			}
			if(evt.data.data.data.allteam)
			{
				this.vo.setMyTeamInfo(evt.data.data.data.allteam);
			}
			if(evt.data.data.data.getScore)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip46-${code}`,[String(evt.data.data.data.getScore)]));
			}
			if(evt.data.data.data.myscore && evt.data.data.data.myscore.score)
			{
				this.vo.setMyScore(evt.data.data.data.myscore.score);
			}
			view._perScoreTxt.text = LanguageManager.getlocal(`acConquerMainLandTip2-${view.uiCode}`, [view.vo.getMyScore().toString(), view.vo.getMyScorePerMin().toString(), ]);
			let list : any = view._list;
			for(let i in list._scrollListItemArr){
				let unit = <AcConquerMainLandArmyItem>list._scrollListItemArr[i];
				unit.refresh();
			} 
		}
	}
	private useItemCallback(evt : egret.Event):void{
		let view = this;
		let code = view.uiCode;
		if(evt.data.ret && evt.data.data){
			if(evt.data.data.data.allteam){
				this.vo.setMyTeamInfo(evt.data.data.data.allteam);
			}
			view._perScoreTxt.text = LanguageManager.getlocal(`acConquerMainLandTip2-${view.uiCode}`, [view.vo.getMyScore().toString(), view.vo.getMyScorePerMin().toString(), ]);
			App.CommonUtil.showTip(LanguageManager.getlocal(`recoverLeftSuccess`));
			let list : any = view._list;
			for(let i in list._scrollListItemArr){
				let unit = <AcConquerMainLandArmyItem>list._scrollListItemArr[i];
				unit.refresh();
			} 
		}
	}
	private update():void{
		let view = this;
		let list : any = view._list;
		for(let i in list._scrollListItemArr){
			let unit = <AcConquerMainLandArmyItem>list._scrollListItemArr[i];
			unit.refresh();
		} 
	}

	private cancelCallBack(evt : egret.Event):void{
		let view = this;
		let code = view.uiCode;
		if(evt.data.ret && evt.data.data.data){
			switch(evt.data.data.data.conquerStat){
				case 3:
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip25-${code}`));
					break;
				case 6:
				case 9:
					view.vo.clearArmyInfo(evt.data.data.data.teamnum);
					App.CommonUtil.showTip(LanguageManager.getlocal(`allianceWarCancelServantTip`));
					view._list.refreshData([1,2,3], view.code);
					view._perScoreTxt.text = LanguageManager.getlocal(`acConquerMainLandTip2-${view.uiCode}`, [view.vo.getMyScore().toString(), view.vo.getMyScorePerMin().toString(), ]);
					NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMAPINFO,{
                        activeId : view.acTivityId, 
                    });
					break;
			}

		}
	}

	public dispose():void{
		let view = this;
		view._list = null;
		view._perScoreTxt = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT),this.cancelCallBack,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USEITEM),this.useItemCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USESPECIALGIFT),this.useJJLItemCallback,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		super.dispose();
	}
}