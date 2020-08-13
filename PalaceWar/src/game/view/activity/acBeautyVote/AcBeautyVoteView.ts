/**
  * 花魁活动view
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteView
  */
class AcBeautyVoteView extends AcCommonView {

	private _acTimeTF: BaseTextField = null;

	private _timebg: BaseBitmap = null;

	private _titlebg: BaseLoadBitmap = null;


	public constructor() {
		super();
	}
	public initView() {
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACBEAUTYVOTE_CHECKTASK, this.checkTaskHandel, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_BUYFLOWERS, this.buyFlowersHandle, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		let key: string = Api.playerVoApi.getPlayerID() + String(vo.st);
		let storage = LocalStorageManager.get(key);
		if (!storage) {
			ViewController.getInstance().openView(ViewConst.BASE.ACCOMMONREPORTVIEW, { msg: LanguageManager.getlocal("acBeautyVoteReportMsg-"+this.code), title:  LanguageManager.getlocal("acBeautyVoteReportTitle-"+this.code) });
			LocalStorageManager.set(key, vo.aidAndCode);

		}


		this._titlebg = BaseLoadBitmap.create("acbeautyvoteview_titlebg-" + this.code);
		this._titlebg.width = 640 ;
		this._titlebg.height = 200;
		this._titlebg.setPosition(0, -15 - this.getTabbarGroupY() - 38);
		this.addChildToContainer(this._titlebg);

		let acTimeDate = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewAcTimeDate-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		acTimeDate.setPosition(this._titlebg.x + 220, this._titlebg.y + 43);
		acTimeDate.width = 395;
		this.addChildToContainer(acTimeDate);

		let acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewAcDesc-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		acDesc.setPosition(acTimeDate.x, acTimeDate.y + acTimeDate.height + 5);
		acDesc.width = 395;
		acDesc.lineSpacing = 5;
		this.addChildToContainer(acDesc);

		//倒计时位置 
		this._timebg = BaseBitmap.create("public_9_bg61");
		this._timebg.y = this._titlebg.y + this._titlebg.height - this._timebg.height / 2 - 23;
		this.addChildToContainer(this._timebg);

		this._acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewAcTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timebg.width = 60 + this._acTimeTF.width;
		this._timebg.x = this._titlebg.x + 417 - this._timebg.width / 2;
		this._acTimeTF.setPosition(this._timebg.x + this._timebg.width / 2 - this._acTimeTF.width / 2, this._timebg.y + this._timebg.height / 2 - this._acTimeTF.height / 2);
		this.addChildToContainer(this._acTimeTF);

		let buttombg = BaseLoadBitmap.create("servant_bottombg");
		buttombg.width = 640;
		buttombg.height = GameConfig.stageHeigth - this._titlebg.height - 85;
		buttombg.setPosition(this._titlebg.x, this._titlebg.y + this._titlebg.height - 2);
		this.addChildToContainer(buttombg);
		this.tick();
		this.refreshView();

	}

	public tick() {
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.checkIsInEndShowTime()) {
			this._acTimeTF.text = LanguageManager.getlocal("acPunishEnd");
		}
		else {
			this._acTimeTF.text = LanguageManager.getlocal("acBeautyVoteViewAcTime-" + this.code, [vo.acCountDown]);
		}
		this._timebg.width = 60 + this._acTimeTF.width;
		this._timebg.x = this._titlebg.x + 417 - this._timebg.width / 2;
		this._acTimeTF.setPosition(this._timebg.x + this._timebg.width / 2 - this._acTimeTF.width / 2, this._timebg.y + this._timebg.height / 2 - this._acTimeTF.height / 2);

	}
	private refreshView() {
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.checkFlowers()) {
			this.tabbarGroup.addRedPoint(0);
		}
		else {
			this.tabbarGroup.removeRedPoint(0);
		}
		if (vo.checkRechargeRedDot()) {
			this.tabbarGroup.addRedPoint(1);
		}
		else {
			this.tabbarGroup.removeRedPoint(1);
		}
		if (vo.checkScore()) {
			this.tabbarGroup.addRedPoint(2);
		}
		else {
			this.tabbarGroup.removeRedPoint(2);
		}

	}

	private checkTaskHandel() {
		this.tabbarGroup.selectedIndex = 1;
		this.clickTabbarHandler({ index: 1 });
	}

	private buyFlowersHandle(event: egret.Event) {
		if (event.data.ret) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteGetNotFlowesBuyFlowesSuccessTip-" + this.code));
		}
	}


	protected getTabbarTextArr(): Array<string> {
		return [
			"acBeautyVoteViewTab1-" + this.code,
			"acBeautyVoteViewTab2-" + this.code,
			"acBeautyVoteViewTab3-" + this.code,
			"acBeautyVoteViewTab4-" + this.code,
		];
	}
	protected getTabbarGroupY(): number {
		return 213;
	}
	protected getRuleInfo(): string {
		return "acBeautyVoteViewRuleInfo-" + this.code;
	}
	protected getRuleInfoParam(): string[] {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		return [LanguageManager.getlocal("officialTitle" + String(cfg.lvLimit))];
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"acbeautyvoteview-" + this.code, "acbeautyvoteview_btneffect", "acbeautyvoteview_common_bubble", "acbeautyvoteview_garypoint", "acbeautyvoteview_joinflag",
			"acbeautyvoteview_normalpoint", "acbeautyvoteview_pointbg", "progress14_bg", "progress14", "acbeautyvoteview_joininfobtn_down", "acbeautyvoteview_joininfobtn",
			"accarnivalview_tab_red", "accarnivalview_tab_green", "progress5", "progress3_bg", "shopview_line", "rankbg_1", "rankbg_3", "rankbg_2", "rankbg_4",
			"rankinglist_rankn1", "rankinglist_rankn2", "rankinglist_rankn3", "shopview_corner", "acbeautyvoteview_fanrankbg", "acbeautyvoteview_blue", "acbeautyvoteview_black",
			"acbeautyvoteview_red", "acbeautyvoteview_yellow", "acbeautyvoteview_vertical", "acbeautyvoteview_horizontal", "rank_select_mask"

		]);
	}
	// protected getSoundBgName() {
	// 	return "music_acahrowarrow";
	// }
	public dispose() {
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACBEAUTYVOTE_CHECKTASK, this.checkTaskHandel, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_BUYFLOWERS, this.buyFlowersHandle, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		this._acTimeTF = null;
		this._timebg = null;
		this._titlebg = null;
		super.dispose();
	}

}