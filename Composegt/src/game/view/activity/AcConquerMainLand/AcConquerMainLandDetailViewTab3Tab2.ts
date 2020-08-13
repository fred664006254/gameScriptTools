//
class AcConquerMainLandDetailViewTab3Tab2 extends CommonViewTab {

	private _list: ScrollList = null;
	private _perScoreTxt: BaseTextField = null;
	public constructor(param?) {
		super();
		this.param = param;
		this.initView();
	}

	private get cfg(): Config.AcCfg.ConquerMainLandCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	private get vo(): AcConquerMainLandVo {
		return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}

	private get code(): string {
		return this.param.data.code;
	}

	private get aid(): string {
		return this.param.data.aid;
	}

	private get acTivityId(): string {
		return `${this.param.data.aid}-${this.code}`;
	}

	private get uiCode(): string {
		let baseview: any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		let code = baseview.getUiCode();
		return code;
	}

	protected getListType(): number {
		return 1;
	}

	protected initView(): void {
		let view = this;
		let code = view.uiCode;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
		let baseview: any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;

		let tipBg = BaseBitmap.create(`mainland_armystate_redtitle`);
		tipBg.setPosition(20, -15)
		view.addChild(tipBg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip1-${view.uiCode}`, [String(view.cfg.settleTime / 60)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, tipBg, [0, 35]);
		view.addChild(tipTxt);

		let tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip2-${view.uiCode}`, [App.StringUtil.changeIntToText(view.vo.getMyPScore()), App.StringUtil.changeIntToText(view.vo.getMyScorePerMin()),]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(tip2Txt);
		tip2Txt.setPosition(tipTxt.x + 15, tipTxt.y + tipTxt.height + 15)
		view._perScoreTxt = tip2Txt;

		let arr = [1, 2, 3];
		let tmpRect = new egret.Rectangle(0, 0, this.width, this.height - 10 - tipBg.height - 15);
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandArmyItem, arr, tmpRect, view.code);
		scrollList.setPosition(0, tipBg.y + tipBg.height);
		view.addChild(scrollList);
		scrollList.bounces = false;
		view._list = scrollList;
	}

	private useItemCallback(evt: egret.Event): void {
		let view = this;
		let code = view.uiCode;
		if (evt.data.data) {
			if (evt.data.data.data.allteam) {
				this.vo.setMyTeamInfo(evt.data.data.data.allteam);
			}

			App.CommonUtil.showTip(LanguageManager.getlocal(`recoverLeftSuccess`));
			let list: any = view._list;
			for (let i in list._scrollListItemArr) {
				let unit = <AcConquerMainLandArmyItem>list._scrollListItemArr[i];
				unit.refresh();
			}
		}
	}

	private update(): void {
		let view = this;
		let list: any = view._list;
		if(list){
			for (let i in list._scrollListItemArr) {
				let unit = <AcConquerMainLandArmyItem>list._scrollListItemArr[i];
				unit.refresh();
			}
		}

	}

	private cancelCallBack(evt: egret.Event): void {
		let view = this;
		let code = view.uiCode;
		if (evt.data.data.data) {
			switch (evt.data.data.data.conquerStat) {
				case 3:
					App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip25-${code}`));
					break;
				case 6:
				case 9:
					view.vo.clearArmyInfo(evt.data.data.data.teamnum);
					App.CommonUtil.showTip(LanguageManager.getlocal(`allianceWarCancelServantTip`));
					view._list.refreshData([1, 2, 3], view.code);
					view._perScoreTxt.text = LanguageManager.getlocal(`acConquerMainLandTip2-${view.uiCode}`, [view.vo.getMyPScore().toString(), view.vo.getMyScorePerMin().toString(),]);
					NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMAPINFO, {
						activeId: view.acTivityId,
					});
					break;
			}

		}
	}

	public dispose(): void {
		let view = this;
		view._list = null;
		view._perScoreTxt = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_CANCELSERVANT), this.cancelCallBack, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		super.dispose();
	}
}