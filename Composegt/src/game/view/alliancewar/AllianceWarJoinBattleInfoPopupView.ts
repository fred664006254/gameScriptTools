/**
 * 帮派阵容
 * @author 张朝阳
 * date 2018/10/15
 * @class AllianceWarJoinBattleInfoPopupView
 */
class AllianceWarJoinBattleInfoPopupView extends PopupView {
	private _joinBattleTxt: BaseTextField = null;

	private _allFightTxt: BaseTextField = null;

	private _scrollList: ScrollList = null;

	private _servantBtn: BaseButton = null;

	public constructor() {
		super();
	}
	public initView(): void {
		//监听 model事件
		App.MessageHelper.addNetMessage("myalliancewar",this.allianceWarModelHandle,this);

		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM,this.allianceWarModelHandle,this);

		this._joinBattleTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewJoinNum", [String(Api.allianceWarVoApi.getJoinNum())]), 22, TextFieldConst.COLOR_BROWN);
		this._joinBattleTxt.setPosition(this.viewBg.x + 110, 20);
		this.addChildToContainer(this._joinBattleTxt);

		this._allFightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewAllFight", [String(Api.allianceWarVoApi.getAllFight())]), 22, TextFieldConst.COLOR_BROWN);
		this._allFightTxt.setPosition(this.viewBg.x + this.viewBg.width - this._allFightTxt.width - 110, this._joinBattleTxt.y);
		this.addChildToContainer(this._allFightTxt);

		let bg = BaseBitmap.create("public_tc_bg01");
		bg.width = 520;
		bg.height = 600;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._joinBattleTxt.y + this._joinBattleTxt.height + 10);
		this.addChildToContainer(bg);

		let rect = new egret.Rectangle(0, 0, bg.width - 20, bg.height - 20);
		this._scrollList = ComponentManager.getScrollList(AllianceWarJoinBattleInfoScrollItem, null, rect);
		this._scrollList.setPosition(bg.x + 10, bg.y + 10);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewListEmpty"));

		this._servantBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceWarJoinBattleInfoPopupViewServantBtn", this.servantBtnClick, this);
		this._servantBtn.setPosition(this.viewBg.x + 55, bg.y + bg.height + 15);
		this.addChildToContainer(this._servantBtn);

		let planBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceWarJoinBattleInfoPopupViewPlanBtn", this.planBtnClick, this);
		planBtn.setPosition(this.viewBg.x + this.viewBg.width - planBtn.width - 55, this._servantBtn.y);
		this.addChildToContainer(planBtn);

		// this.allianceWarModelHandle();


	}
	protected resetBgSize()
	{
		super.resetBgSize();
		this.allianceWarModelHandle();
	}
	/**
	 * 监听modle 的刷新
	 */
	private allianceWarModelHandle() {
		this._joinBattleTxt.text = LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewJoinNum", [String(Api.allianceWarVoApi.getJoinNum())]);
		this._joinBattleTxt.setPosition(this.viewBg.x+110, 20);

		this._allFightTxt.text = LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewAllFight", [App.StringUtil.changeIntToText(Api.allianceWarVoApi.getAllFight())]);
		this._allFightTxt.setPosition(this.viewBg.x + this.viewBg.width - this._allFightTxt.width - 110, this._joinBattleTxt.y);
		let list = Api.allianceWarVoApi.getMyAllianceInfoList();
		this._scrollList.refreshData(list);
		let myInfo = Api.allianceWarVoApi.getMyInfo();
		if (myInfo && myInfo.servant) {
			this._servantBtn.setText("allianceWarJoinBattleInfoPopupViewServantBtn2");
		}else{
			this._servantBtn.setText("allianceWarJoinBattleInfoPopupViewServantBtn");
		}
	}
	/**	门客选择界面 */
	private servantBtnClick() {
		let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
		let servantInfoList:{servantId:string,servantName:string,level:number,fightValue:number,qualityBoxImgPath:string,halfImgPath:string}[] = [];
		for(let key in servantInfoVoList)
		{
			let item = servantInfoVoList[key];
			let fightValue = Api.servantVoApi.getServantCombatWithId(item.servantId)
			let servantInfo = {servantId:item.servantId,servantName:item.servantName,level:item.level,fightValue:fightValue,qualityBoxImgPath:item.qualityBoxImgPath,halfImgPath:item.halfImgPath};
			servantInfoList.push(servantInfo);
		}
		servantInfoList.sort((a,b)=>{
			return b.fightValue - a.fightValue;
		})
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARSELECTSERVANTPOPUPVIEW,{servantList:servantInfoList});
	}
	/** 计策选择界面 */
	private planBtnClick() {
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARSELECTPLANPOPUPVIEW);
	}
	/**
	 * 备战期结束关闭界面
	 */
	protected tick() {
		let periodType = Api.allianceWarVoApi.getWarPeriod();
		if(periodType != 1)
		{
			this.hide();
			return;
		}
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"acsevenitemzshi", "acsevenitemtopbg",
		]);
	}
	protected getTitleStr() {

		return "allianceWarJoinBattleInfoPopupViewTitle";
	}
	/**
	 * 刷新一下model数据
	 */
	protected getRequestData(): { requestType: string, requestData: any } {
		return { requestType: NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, requestData: null };
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage("myalliancewar",this.allianceWarModelHandle,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM,this.allianceWarModelHandle,this);
		this._joinBattleTxt = null;
		this._allFightTxt = null;
		this._scrollList = null;
		this._servantBtn = null;
		super.dispose();
	}
}