/**
 * 红颜册封
 * author dky
 * date 2018/4/24
 * @class WifestatusView
 */
class AtkraceFameView extends CommonView {

	// 滑动列表
	private _scrollList: ScrollList;
	private _upAllBtn: BaseButton;


	public constructor() {
		super();
	}
	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, this.fameUpHandler, this);

		let bottomBg = BaseBitmap.create("public_9_bg23");
		bottomBg.width = GameConfig.stageWidth - 10;
		bottomBg.height = GameConfig.stageHeigth - 186;
		bottomBg.x = 5;
		bottomBg.y = -7;
		this.addChildToContainer(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, GameConfig.stageWidth - 10, GameConfig.stageHeigth - 219);

		let fameLevelList = Config.AtkraceCfg.getFameList();
		let servantList = Api.atkraceVoApi.getServantListByFame();
		this._scrollList = ComponentManager.getScrollList(AtkraceFameScrollItem, fameLevelList, rect, servantList);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bottomBg.x, bottomBg.y + 10);
		if (fameLevelList.length > 0) {
			//this._scrollList.setScrollTopByIndex(fameLevelList.length - 2);
			this._scrollList.setScrollTop(this._scrollList.getItemByIndex(fameLevelList.length - 1).y -(GameConfig.stageHeigth - 580));
		}

		//总加成, 一键提升
		let bottomContainer = this.getBottomContainer();
		this.addChild(bottomContainer);

	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"atkracefameservantpopupview_bg",
			"skin_detail_namebg",
			"arena_bottom", "progress3", "progress3_bg", "wifestatus_namebg"


		])
	}

	private getBottomContainer(): BaseDisplayObjectContainer {
		let bottomContainer: BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		//let [totalAtkAdd, totalCrtAdd] = [Api.atkraceFameVoApi.getTotalAtkAdd(), Api.atkraceFameVoApi.getTotalCrtAdd()]
		let [totalAtkAdd, totalCrtAdd] = [100, 100];

		let bottom: BaseBitmap = BaseBitmap.create("arena_bottom");
		bottomContainer.addChild(bottom);

		// let addAtkText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFameAddAtk", [`+ ${totalAtkAdd}%`]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
		// addAtkText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		// addAtkText.setPosition(bottom.x + 20, bottom.y + 15);
		// bottomContainer.addChild(addAtkText);


		// let addCrtText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFameAddCrt", [`+ ${totalCrtAdd}%`]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
		// addCrtText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		// addCrtText.setPosition(addAtkText.x, addAtkText.y + addAtkText.height + 10);
		// addCrtText.x = addAtkText.x;
		// bottomContainer.addChild(addCrtText);

		let addDetailBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "atkraceFameAddDetailBtn", this.clickAddDetailBtn, this);
		bottomContainer.addChild(addDetailBtn);
		addDetailBtn.setPosition(bottom.x + 50, bottom.y + bottom.height / 2 - addDetailBtn.height / 2);


		this._upAllBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "atkraceFameBtnAllUp", this.clickUpAllBtn, this);
		bottomContainer.addChild(this._upAllBtn);
		this._upAllBtn.setPosition(bottom.x + bottom.width - this._upAllBtn.width - 50, bottom.y + bottom.height / 2 - this._upAllBtn.height / 2);
		this.refreshUpAllBtn();

		bottomContainer.x = 0;
		bottomContainer.y = GameConfig.stageHeigth - 88;
		return bottomContainer;
	}

	private refreshView() {
		this.refreshList();
		this.refreshUpAllBtn();
	}
	private refreshUpAllBtn() {
		if (Api.atkraceVoApi.checkHaveServantCanUpFame()) {
			this._upAllBtn.setGray(false);
		} else {
			this._upAllBtn.setGray(true);
		}
	}
	private refreshList() {
		let fameLevelList = Config.AtkraceCfg.getFameList();
		let servantList = Api.atkraceVoApi.getServantListByFame();
		this._scrollList.refreshData(fameLevelList, servantList);
	}
	//一键提升
	private clickUpAllBtn(param: any): void {
		this.refreshUpAllBtn();
		if (this._upAllBtn.getIsGray()) {
			App.CommonUtil.showTip(LanguageManager.getlocal('atkraceFameUpAllFameFailTip'));
			return;
		}
		this.request(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, { servantId: '', batch: 1 });
	}
	//加成详情
	private clickAddDetailBtn(param: any): void {
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEFAMEADDINFOPOPUPVIEW);
	}

	private fameUpHandler(param: egret.Event) {
		let dataList = param.data.data.data.sidList;
		if (dataList && dataList.length) {
			for (let index = 0; index < dataList.length; index++) {
				let id: any = null;
				id = {
					id: dataList[index][0],
					beforeLv: dataList[index][1],
					afterLv: dataList[index][2]
				}
				Api.specialRewardList.push({ id: id, type: "Fame" });
			}
		}
		Api.openSpecialView();
		this.refreshView();
	}

	protected getTitleStr(): string {
		return "atkraceFameTitle";
	}


	protected getRuleInfo(): string {
		return "atkraceFameRuleinfo";
	}

	public hide(): void {
		super.hide();
	}


	public dispose(): void {

		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, this.fameUpHandler, this);

		if (this._scrollList) {
			this._scrollList = null;
		}
		super.dispose();
	}
}