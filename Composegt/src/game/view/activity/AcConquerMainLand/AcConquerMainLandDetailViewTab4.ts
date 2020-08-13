//
class AcConquerMainLandDetailViewTab4 extends CommonViewTab {
	private _list: ScrollList = null;
	private pos = [];
	private _progressBar:ProgressBar = null;
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
		return 2;
	}

	protected initView(): void {
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.update,this);

		let code = view.uiCode;
		let baseview: any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;

		let viewbg = BaseBitmap.create("public_listbg3");
		viewbg.width = this.width - 20;
		viewbg.height = view.height - 10;
		viewbg.setPosition(10, 0);
		view.addChild(viewbg);


		let listbg = BaseBitmap.create(`public_9v_bg12`);
		listbg.width = viewbg.width - 30;
		listbg.height = viewbg.height - 300;
		listbg.setPosition(viewbg.x + 15, viewbg.y + 10);
		view.addChild(listbg);

		let officeBg = BaseBitmap.create("public_ts_bg01");
		officeBg.width = listbg.width - 20;
		officeBg.x = listbg.x + listbg.width / 2 - officeBg.width / 2;
		officeBg.y = listbg.y + 15;
		this.addChild(officeBg)

		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("servantViewTitle"), 22, TextFieldConst.COLOR_BROWN_NEW);
		titleTxt1.x = this.x + 120;
		titleTxt1.y = this.y + 30;
		view.addChild(titleTxt1);

		let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandPowerAdd-${code}`), 22, TextFieldConst.COLOR_BROWN_NEW)
		titleTxt2.x = this.x + 240;
		titleTxt2.y = titleTxt1.y;
		view.addChild(titleTxt2);

		let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainServantNum-${code}`), 22, TextFieldConst.COLOR_BROWN_NEW)
		titleTxt3.x = this.x + 440;
		titleTxt3.y = titleTxt1.y;
		view.addChild(titleTxt3);
		this.pos = [
			{ width: titleTxt1.textWidth, x: titleTxt1.x - 5 },
			{ width: titleTxt2.textWidth, x: titleTxt2.x - 5 },
			{ width: titleTxt3.textWidth, x: titleTxt3.x - 5 },
		];

		let tmpRect = new egret.Rectangle(0, 0, listbg.width - 10, listbg.height - officeBg.height - 20);
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandServantInfoListItem, this.getServantIdList(), tmpRect, { code: view.code, pos: this.pos });
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, officeBg.height + 10]);
		view.addChild(scrollList);
		view._list = scrollList;
		scrollList.bounces = false;

		let bottomBg = BaseBitmap.create(`public_9v_bg12`);
		bottomBg.width = listbg.width;
		bottomBg.height = 265;
		bottomBg.setPosition(listbg.x, listbg.y + listbg.height + 5);
		view.addChild(bottomBg);

		let tip1 = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_BROWN_NEW);
		tip1.width = bottomBg.width;
		tip1.textAlign = egret.HorizontalAlign.CENTER;
		tip1.text = LanguageManager.getlocal(`acConquerMainAddLevel-${code}`, [this.vo.getBuffLevel() + '']);
		tip1.setPosition(bottomBg.x + bottomBg.width / 2 - tip1.width / 2, bottomBg.y + 20);
		this.addChild(tip1);

		let tip2 = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_BROWN_NEW);
		tip2.width = bottomBg.width;
		tip2.textAlign = egret.HorizontalAlign.CENTER;
		tip2.text = LanguageManager.getlocal(`acConquerMainNextAddLevelTip-${code}`, [this.vo.getPowerAddBuff(this.vo.getBuffLevel() + 1) + '']);
		tip2.setPosition(bottomBg.x + bottomBg.width / 2 - tip2.width / 2, tip1.y + tip1.height + 8);
		this.addChild(tip2);

		let progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", bottomBg.width - 120)
		let precent = this.vo.getNextAddCurNum() / this.vo.getNextAddNeedNum();
		let prgstr = LanguageManager.getlocal(`acConquerMainAddLevelNum-${code}`, [this.vo.getBuffLevel() + '']) + `(${this.vo.getNextAddCurNum()}/${this.vo.getNextAddNeedNum()})`
		if(this.vo.getBuffLevel() == this.cfg.maxBuffLevel){
			precent = 1;
			prgstr = LanguageManager.getlocal("wifeSkillMaxShow");
		}
		progressBar.setPercentage(precent, prgstr, TextFieldConst.COLOR_LIGHT_YELLOW);
		progressBar.setPosition(bottomBg.x + bottomBg.width / 2 - progressBar.width / 2, tip2.y + tip2.height + 15);
		this.addChild(progressBar);
		this._progressBar = progressBar;

		let previewBtn = ComponentManager.getButton("btn_lookdetail", '', () => {
			ViewController.getInstance().openView("AcConquerMainLandAddPreviewView", {
				aid: view.param.data.aid,
				code: view.param.data.code,
			});
		}, this)
		previewBtn.setPosition(progressBar.x + progressBar.width - previewBtn.width - 10, progressBar.y - previewBtn.height - 15);
		this.addChild(previewBtn);
		
		let tip3 = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_BROWN_NEW);
		tip3.width = bottomBg.width;
		tip3.textAlign = egret.HorizontalAlign.LEFT;
		tip3.lineSpacing = 5;
		tip3.text = LanguageManager.getlocal(`acConquerMainAddLevelTip-${code}`, [this.vo.getPowerAddBuff() + '']);
		tip3.setPosition(progressBar.x + 8, progressBar.y + progressBar.height + 15);
		this.addChild(tip3);

		let txt1 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acConquerMainLandServantStrength', () => {
			if (view.vo.getCurPeriod() == 1) {
				App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
				return
			}
			if (!view.vo.isCanJoin()) {
				App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${code}`));
				return
			}
			if (!view.vo.isInActivity()) {
				App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
				return
			}
			ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
		}, this);
		view.addChild(txt1);
		txt1.setPosition(this.x + this.width - txt1.width - 80, this.y + this.height - txt1.height - 50);

		let txt2 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'shopViewTitle', () => {
			if (view.vo.getCurPeriod() == 1) {
				App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-1`));
				return
			}
			//打开商店
			if (!view.vo.isCanJoin()) {
				App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${code}`));
				return
			}
			if (!view.vo.isInActivity()) {
				App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
				return
			}
			ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB2);
		}, view, null);
		view.addChild(txt2);
		txt2.setPosition(this.x + 80, this.y + this.height - txt2.height - 50);
	}

	private update(): void {
		let view = this;
		let precent = this.vo.getNextAddCurNum() / this.vo.getNextAddNeedNum();
		let prgstr = LanguageManager.getlocal(`acConquerMainAddLevelNum-${this.code}`, [this.vo.getBuffLevel() + '']) + `(${this.vo.getNextAddCurNum()}/${this.vo.getNextAddNeedNum()})`
		if(this.vo.getBuffLevel() == this.cfg.maxBuffLevel){
			precent = 1;
			prgstr = LanguageManager.getlocal("wifeSkillMaxShow");
		}
		this._progressBar.setPercentage(precent, prgstr, TextFieldConst.COLOR_LIGHT_YELLOW);

		view._list.refreshData(this.getServantIdList(), { code: this.code, pos: this.pos });
	}

	private getServantIdList(): string[] {
		let servantIdList: string[] = Api.servantVoApi.getServantInfoIdListWithSort(1);
		servantIdList.sort((a: string, b: string) => {
			let aPrp = this.vo.getServantAcPower(a);
			let bPrp = this.vo.getServantAcPower(b);
			if (aPrp > bPrp) {
				return -1;
			} else {
				return 1;
			}
		})
		return servantIdList;
	}

	private rewardCallback(evt: egret.Event): void {
		let view = this;
		let data = evt.data.data.data;
	}

	public dispose(): void {
		let view = this;
		view._list = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.update,this);

		super.dispose();
	}

}