/**
 * 	投壶活动一键投壶结果
 * author 张朝阳
 * date 2019/4/10
 * @class AcThrowArrowResultPopupView
 */
class AcThrowArrowResultPopupView extends PopupView {
	private _agreeType: number = 0;
	private _fightName: string = null;
	private _sid: string = null;

	private _callbackF: Function = null;
	private _obj: any = null;
	private _myContiner: BaseDisplayObjectContainer = null;
	private _scrollView: ScrollView = null;

	private _scrollContainerTab: BaseDisplayObjectContainer[] = [];
	private _showedIndx: number = 0;
	private _myConfirmBtn: BaseButton = null;

	public constructor() {
		super();
	}

	private get aid(): string {
		return this.param.data.aid;
	}

	private get code(): string {
		return this.param.data.code;
	}

	protected getTitleStr(): string {
		return `acThrowArrowResultPopupViewTitle-${this.code}`;
	}

	protected initView(): void {
		let cfg = <Config.AcCfg.ThrowArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (this.param.data && this.param.data.f && this.param.data.o) {
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 620;
		bg.setPosition(this.viewBg.width / 2 - bg.width / 2, 20);
		this.addChildToContainer(bg);

		let typeBg: BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		typeBg.width = 500;
		typeBg.height = 590;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, typeBg, bg);
		this.addChildToContainer(typeBg);

		let rect2: egret.Rectangle = egret.Rectangle.create();
		rect2.setTo(0, 0, typeBg.width, typeBg.height - 15);

		this._myContiner = new BaseDisplayObjectContainer();
		this._scrollView = ComponentManager.getScrollView(this._myContiner, rect2);
		this._scrollView.setPosition(typeBg.x, typeBg.y + 10);
		this.addChildToContainer(this._scrollView);

		let index: number = 1;
		let containerY: number = 0;
		let winCount: number = 0;

		let scoreCount: number = 0;
		let data = this.param.data.batchList;
		let info = [];
		for (let i in data) {
			info.push({
				card: data[i][1],
				reward: data[i][0],
			});
		}
		let tmpY = 0;
		for (let k in info) {
			let unit: any = info[k];
			let scrollContiner: BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			scrollContiner.width = 460;
			scrollContiner.x = 20;
			scrollContiner.y = tmpY;
			// scrollContiner.y = containerY;
			if (index == 1) {
				this._myContiner.addChild(scrollContiner);
			}

			let containerBg: BaseBitmap = BaseBitmap.create("public_alphabg");
			containerBg.width = 460;
			containerBg.x = 10;
			containerBg.y = 0;
			scrollContiner.addChild(containerBg);

			let awardArr = GameData.formatRewardItem(unit.reward);
			let rewardStr = "";
			for (let i in awardArr) {
				let tmp: RewardItemVo = awardArr[i];
				rewardStr += `<font color=${tmp.nameColor}>${tmp.name}*${tmp.num}</font> `;
			}
			rewardStr = rewardStr.substring(0, rewardStr.length - 1)

			let resultStr: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`acThrowArrowGetAllItemInfo-${this.code}`, [String(index), LanguageManager.getlocal("acThrowArrowResultPopupViewArrowType_" + cfg.getLotteryType(unit.card) + "-" + this.code), rewardStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			resultStr.lineSpacing = 5;
			resultStr.width = 440;
			resultStr.setPosition(18, 15);
			scrollContiner.addChild(resultStr);

			scrollContiner.height = resultStr.y + resultStr.textHeight + 15;
			tmpY += (scrollContiner.height + 10);

			index++;

			let line: BaseBitmap = BaseBitmap.create("public_line1");
			line.width = 460;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, scrollContiner, [0, 0], true);
			// line.x = 0;
			// line.y = tmpY - 10;
			scrollContiner.addChild(line);

			this._scrollContainerTab.push(scrollContiner);
		}
		egret.Tween.get(this._myContiner).wait(200).call(this.showOneContainer, this);
		this._myConfirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
		this._myConfirmBtn.setPosition(this.viewBg.width / 2 - this._myConfirmBtn.width / 2, typeBg.y + 20 + typeBg.height);
		this.addChildToContainer(this._myConfirmBtn);
		this._myConfirmBtn.setEnable(false);
	}

	private showOneContainer(): void {
		// this._scrollContainerTab[this._showedIndx].visible = true;
		this._showedIndx++;

		if (this._scrollContainerTab.length > this._showedIndx) {
			this._scrollContainerTab[this._showedIndx].y = this._myContiner.height;
			this._myContiner.addChild(this._scrollContainerTab[this._showedIndx]);

			let moveH: number = this._myContiner.height - 450;
			moveH = moveH < 0 ? 0 : moveH;
			this._scrollView.setScrollTop(moveH, 200);

			egret.Tween.get(this._myContiner).wait(200).call(this.showOneContainer, this);
			// this._scrollContainerTab[this._showedIndx].visible = false;
		}
		else {
			this._myConfirmBtn.setEnable(true);
		}

	}

	public hide(): void {
		//ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW,{type:this._agreeType , name: this._fightName, sid:this._sid});

		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		super.hide();
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACE);
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACECROSS);
	}

	// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight(): number {

		return 15;
	}

	protected getCloseBtnName(): string {
		return null;
	}

	public dispose(): void {
		egret.Tween.removeTweens(this._myContiner);
		this._myContiner = null;
		this._agreeType = 0;
		this._fightName = null;
		this._sid = null;
		this._scrollView = null;

		this._scrollContainerTab.length = 0;
		this._showedIndx = 0;
		this._myConfirmBtn = null;

		super.dispose();
	}
}