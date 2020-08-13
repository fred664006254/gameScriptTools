/**
  * 花魁活动-- 使用道具
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVotePlayerInfoPopupView
  */
class AcBeautyVoteUseItemSliderPopupView extends PopupView {
	/**	购买回调 */
	private _confirmCallback: Function = null;
	/** 当前指向的函数 */
	private _handler: any = null;
	/** 买的数量 */
	private _useNum: number = 1;
	/** 显示TF */
	private _selectedNumTF: BaseTextField = null;
	/** 最大购买数量 */
	private _maxNum: number = 0;
	/** 显示的bg */
	private _numBg: BaseBitmap = null;
	/** 提示的TF */
	private _messageTF: BaseTextField = null;
	/** 取消购买的Btn */
	private _cancelBtn: BaseButton = null;
	/** 大的BG */
	private _bg: BaseBitmap = null;


	/**
	 * 滑动条
	 */
	private _dragProgressBar: DragProgressBar = null;



	public constructor() {
		super();
	}
	/**
	 * 入口函数
	 */
	protected initView(): void {


		let aid = this.param.data.aid;
		let code = this.param.data.code;

		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		//鲜花1000限制
		this._maxNum = vo.getFlowersValue() > 1000 ? 1000 : vo.getFlowersValue();

		this._bg = BaseBitmap.create("public_9_bg4");
		this._bg.width = 520;
		this._bg.height = 224;
		this._bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._bg.width / 2, 9);
		this.addChildToContainer(this._bg);


		let data = this.param.data;
		let itemCfg: any = Config.ItemCfg.getItemCfgById(Number(data.id));
		this._messageTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteUseItemSliderPopupViewMsg-" + code, [String(cfg.getScore)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._messageTF.width = 450;
		this._messageTF.textAlign = egret.HorizontalAlign.CENTER;
		this._messageTF.lineSpacing = 7;
		this._messageTF.setPosition(this._bg.x + this._bg.width / 2 - this._messageTF.width / 2, this._bg.y + this._bg.height / 2 - this._messageTF.height - 40);
		this.addChildToContainer(this._messageTF);


		this._dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", this._maxNum, this.dragCallback, this);
		this._dragProgressBar.setPosition(this._bg.x + 70, this._bg.y + this._bg.height - this._dragProgressBar.height - 70);
		this.addChildToContainer(this._dragProgressBar);


		this._numBg = BaseBitmap.create("public_9_bg5");
		this._numBg.width = 100;
		this._numBg.setPosition(this._bg.x + this._bg.width - 3 - this._numBg.width, this._dragProgressBar.y + this._dragProgressBar.height / 2 - this._numBg.height / 2 - 5);
		this.addChildToContainer(this._numBg);

		let numStr = String(cfg.getNum) + "/" + String(this._maxNum);
		this._selectedNumTF = ComponentManager.getTextField(numStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
		this._selectedNumTF.setPosition(this._numBg.x + this._numBg.width / 2 - this._selectedNumTF.width / 2, this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2);
		this.addChildToContainer(this._selectedNumTF);

		let cur_have = LanguageManager.getlocal("acBeautyVoteUseItemSliderPopupViewItemHasNum-" + code, [LanguageManager.getlocal("acBeautyVoteView_itemName-" + code), String(vo.getFlowersValue())]);
		let cur_haveTF: BaseTextField = ComponentManager.getTextField(cur_have, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		cur_haveTF.setPosition(this._bg.x + this._bg.width / 2 - cur_haveTF.width / 2, this._bg.y + this._bg.height - cur_haveTF.height - 30);
		this.addChildToContainer(cur_haveTF);

		//取消按钮
		this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.clickCancelHandler, this);
		this._cancelBtn.x = this.viewBg.x + this.viewBg.width / 2 - this._cancelBtn.width -50;
		this._cancelBtn.y = this._bg.y + this._bg.height + 15;
		this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);

	}
	/**
	 * 滑动条的监听事件
	 */
	private dragCallback(curNum: number): void {
		this._useNum = curNum;
		if (this._useNum == 0) {
			this._dragProgressBar.setDragPercent(1, this._maxNum);
			this._useNum = 1;
		} 3
		let numStr = String(this._useNum) + "/" + String(this._maxNum);
		this._selectedNumTF.text = numStr;
		this._selectedNumTF.setPosition(this._numBg.x + this._numBg.width / 2 - this._selectedNumTF.width / 2, this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2);

	}

	/**
	 * 购买的事件处理
	 */
	protected clickConfirmHandler(data: any): void {

		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let voteId = this.param.data.voteId;
		let round = this.param.data.round;
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		if (vo.checkSingleRoundAcTime(round)) {
			this.request(NetRequestConst.REQUEST_BEAUTYVOTE_VOTE, { activeId: vo.aidAndCode, voteId: voteId, num: this._useNum });
		}
		else {
			App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVotePlayerInfoPopupViewAcTimeEndTip-" + code));
		}
		this.hide();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"progress2_bg", "progress2"
		]);
	}
	/**
	 * 取消购买
	 */
	private clickCancelHandler(param: any): void {
		this.hide();
	}
	/**
	 * 设置当前高度
	 */
	protected getShowHeight(): number {
		return 400;
	}
	protected resetBgSize(): void {
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 4 * 3 - this._cancelBtn.width / 2 - 35, this._cancelBtn.y);
	}
	/**
	 * 标题
	 */
	protected getTitleStr() {

		return "itemUseConstPopupViewTitle";
	}
	/**设置按钮上文本的内容 */
	protected getConfirmBtnStr(): string {
		return "sysConfirm";
	}
	/**设置按钮的需要的图片 */
	protected getConfirmBtnName(): string {
		return ButtonConst.BTN_NORMAL_YELLOW;
	}
	public dispose(): void {
		this._confirmCallback = null;
		this._handler = null;
		this._useNum = 1;
		this._selectedNumTF = null;
		this._maxNum = 0;
		this._numBg = null;
		this._messageTF = null;
		this._cancelBtn = null;
		this._bg = null;
		this._dragProgressBar = null;

		super.dispose();
	}
}