//
class AcConquerMainLandDetailViewTab2Tab1 extends CommonViewTab {
	private _nodeContainer: BaseDisplayObjectContainer = null;
	//private _countDownText:BaseTextField = null;

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
		let baseview: any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight - 46;
		view.width = baseview.tabWidth;

		view._nodeContainer = new BaseDisplayObjectContainer();
		view._nodeContainer.width = view.width;

		// 膜拜背景
		let bottomBg = BaseBitmap.create("public_9v_bg14");
		bottomBg.width = 620
		bottomBg.height = 93;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, 45]);
		view.addChild(bottomBg);

		let line = BaseBitmap.create('commonview_border3');
		line.width = 620;
		line.setPosition(bottomBg.x, bottomBg.y - 5);
		view.addChild(line);

		let innerKuang = BaseBitmap.create("public_9v_bg12");
		innerKuang.width = bottomBg.width - 20;
		innerKuang.height = bottomBg.height - 10;
		this.addChild(innerKuang);
		innerKuang.setPosition(bottomBg.x + 10, bottomBg.y + 5);


		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceBtnRank', view.rankCLick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35, 0]);
		view.addChild(rankBtn);

		let txt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN_NEW);
		let rankstr = '';
		let rankV = view.vo.getMyPrank();
		if (rankV == 0) {
			rankstr = LanguageManager.getlocal('atkracedes4');
		}
		else {
			rankstr = rankV.toString();
		}
		let color = String(TextFieldConst.COLOR_QUALITY_GREEN_NEW);
		if (view.vo.getCurPeriod() == 1) {
			rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
		}
		else {
			if (!view.vo.isCanJoin()) {
				rankstr = LanguageManager.getlocal('crossImacyNoAccess');
				color = String(0xff3c3c);
			}
		}
		txt3.text = LanguageManager.getlocal(`acConquerMainLandrank1-${view.uiCode}`, [color, rankstr]);
		txt3.x = bottomBg.x + 30;
		txt3.y = bottomBg.y + 25;
		this.addChild(txt3);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandrank3-${view.uiCode}`, [String(view.cfg.settleTime / 60)]), 20, TextFieldConst.COLOR_BROWN_NEW);
		tipTxt.x = txt3.x;
		tipTxt.y = txt3.y + 35;
		this.addChild(tipTxt);

		let rList = this.cfg.prankList;
		let scrollrect = new egret.Rectangle(0, 0, 620, this.height - bottomBg.height - 55);
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandDetailViewTab2Tab1ScrollItem, rList, scrollrect, { aid: this.aid, code: this.code });
		scrollList.x = 10;
		scrollList.y = 0;
		this.addChild(scrollList);

	}

	protected getRequestData(): { requestType: string, requestData: any } {
		return {
			requestType: NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO,
			requestData: {
				activeId: this.acTivityId
			}
		};
	}

	private rankCLick(): void {
		let view = this;
		if (view.vo.isEnd) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
			return;
		}
		if (view.vo.getCurPeriod() == 1) {
			App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
			return
		}
		if (view.vo.isInJudge()) {
			App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip11-1`));
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDPRANKVIEW, {
			aid: view.param.data.aid,
			code: view.param.data.code,
		});
	}

	public dispose(): void {
		this._nodeContainer = null;
		super.dispose();
	}

}