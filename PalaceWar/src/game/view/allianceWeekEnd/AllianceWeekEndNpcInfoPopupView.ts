/**
  * 勤王除恶npcinfo
  * @author 张朝阳
  * date 2019/4/15
  * @class AllianceWeekEndNpcInfoPopupView
  */

class AllianceWeekEndNpcInfoPopupView extends PopupView {

	private _itemCfg: Config.AllianceweekendCfg.FoeItemCfg

	private _receiveBtn: BaseButton = null;

	private _receiveBM: BaseBitmap = null;

	private _npc: BaseLoadBitmap = null;

	private _npckill: BaseBitmap = null;
	public constructor() {
		super();
	}

	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCEWEEK_GETBOSSRANK, this.bossRankHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETKILLREWARD, this.killHandle, this);


		this._itemCfg = this.param.data.itemCfg;
		let npcCfg = this.param.data.npcCfg;

		let bossScore = Api.myAllianceWeekVoApi.getBossScore(this._itemCfg.id);


		let bg = BaseLoadBitmap.create("allianceweekendview_bossinfobg");
		bg.width = 544;
		bg.height = 290;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y);
		this.addChildToContainer(bg);

		let scaleNpc: number = 0.6;
		this._npc = BaseLoadBitmap.create(npcCfg);
		this._npc.width = 405
		this._npc.height = 467;
		this._npc.setScale(scaleNpc);
		this._npc.setPosition(bg.x + 65, bg.y + bg.height - this._npc.height * scaleNpc - 6);
		this.addChildToContainer(this._npc);



		let npcNameBg = BaseBitmap.create("specialview_commoni_namebg");
		this.addChildToContainer(npcNameBg);

		let npcName = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndViewNpcName" + this._itemCfg.id), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.addChildToContainer(npcName);

		npcNameBg.width = npcName.width + 60;
		npcNameBg.setPosition(this._npc.x + this._npc.width / 2 * scaleNpc - npcNameBg.width / 2, this._npc.y + this._npc.height * scaleNpc - npcNameBg.height - 10);
		npcName.setPosition(npcNameBg.x + npcNameBg.width / 2 - npcName.width / 2, npcNameBg.y + npcNameBg.height / 2 - npcName.height / 2);

		this._npckill = BaseBitmap.create("allianceweekendview_killed");
		this._npckill.setPosition(this._npc.x + this._npc.width / 2 * scaleNpc - this._npckill.width / 2, this._npc.x + this._npc.height / 2 * scaleNpc - this._npckill.height / 2 - 20);
		this.addChildToContainer(this._npckill);

		let npcInfobg = BaseBitmap.create("public_9_bg1");
		npcInfobg.width = 210;
		npcInfobg.height = 250;
		npcInfobg.setPosition(bg.x + bg.width - npcInfobg.width - 15, bg.y + 25);
		this.addChildToContainer(npcInfobg);

		let hpTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndNpcInfoPopupViewHpTitle", [String(this._itemCfg.bossHP)]), TextFieldConst.FONTSIZE_CONTENT_SMALL)
		hpTF.setPosition(npcInfobg.x + 20, npcInfobg.y + 20);
		this.addChildToContainer(hpTF);

		let hrutScoreTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndNpcInfoPopupViewHrutTitle", [String(this._itemCfg.unitScore)]), TextFieldConst.FONTSIZE_CONTENT_SMALL)
		hrutScoreTF.setPosition(hpTF.x, hpTF.y + hpTF.height + 20);
		this.addChildToContainer(hrutScoreTF);

		let killScoreTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndNpcInfoPopupViewKillTitle", [String(this._itemCfg.killScore)]), TextFieldConst.FONTSIZE_CONTENT_SMALL)
		killScoreTF.setPosition(hrutScoreTF.x, hrutScoreTF.y + hrutScoreTF.height + 20);
		this.addChildToContainer(killScoreTF);

		let contributionbtn = ComponentManager.getButton("allianceweekendview_contributionbtn", null, () => {
			this.request(NetRequestConst.REQUEST_ALLIANCEWEEK_GETBOSSRANK, { bossId: this._itemCfg.id });
		}, this);
		contributionbtn.setPosition(bg.x + 5, bg.y + 20);
		this.addChildToContainer(contributionbtn);
		if (this._itemCfg.id == Config.AllianceweekendCfg.lastFoeItemCfg().id) {
			this._npckill.setVisible(false);
			hpTF.text = LanguageManager.getlocal("allianceWeekEndNpcInfoPopupViewHpTitle", [LanguageManager.getlocal("allianceWeekEndViewNpcBlood")])

			let bossDesc = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndNpcInfoPopupViewLastBossDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);

			bossDesc.width = 520;
			bossDesc.setPosition(bg.x + bg.width / 2 - bossDesc.width / 2, bg.y + bg.height + 5);
			this.addChildToContainer(bossDesc);

			let closeButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", () => { this.hide(); }, this)
			closeButton.setPosition(bg.x + bg.width / 2 - closeButton.width / 2, bossDesc.y + bossDesc.height + 5);
			this.addChildToContainer(closeButton);
			return;
		}


		let rewardBg = BaseBitmap.create("public_9_probiginnerbg")
		rewardBg.width = 536;
		rewardBg.setPosition(bg.x + bg.width / 2 - rewardBg.width / 2, bg.y + bg.height + 10);
		this.addChildToContainer(rewardBg);

		let titlebg = BaseBitmap.create("public_9_bg37");
		titlebg.width = rewardBg.width;
		titlebg.height = 35;
		titlebg.setPosition(rewardBg.x, rewardBg.y);
		this.addChildToContainer(titlebg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("allianceWeekEndNpcInfoPopupViewRewardTitle"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titlebg.x + titlebg.width / 2 - titleTF.width / 2, titlebg.y + titlebg.height / 2 - titleTF.height / 2)
		this.addChildToContainer(titleTF);

		if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang() || PlatformManager.checkIsKRSp()){
			
		}
		else{
			let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
			itemTopLine.width += titleTF.width;
			itemTopLine.setPosition(titlebg.x + titlebg.width / 2 - itemTopLine.width / 2, titlebg.y + titlebg.height / 2 - itemTopLine.height / 2);
			this.addChildToContainer(itemTopLine);
		}
		


		let rewardsVoList = GameData.formatRewardItem(this._itemCfg.getReward);
		let rewardScale = 0.85;
		let itemHeight: number = 0;
		for (let i = 0; i < rewardsVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardsVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(rewardBg.x + (i % 5) * (rewardDB.width * rewardScale + 11) + 15, rewardBg.y + Math.floor(i / 5) * (rewardDB.height * rewardScale + 10) + 50);
			this.addChildToContainer(rewardDB);
			itemHeight = rewardDB.height * rewardScale;
		}
		let offsetHeight = rewardsVoList.length % 5 == 0 ? rewardsVoList.length / 5 * itemHeight : (Math.floor(rewardsVoList.length / 5) + 1) * itemHeight;
		rewardBg.height += offsetHeight + 30;

		this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", () => {
			if (!Api.allianceWeekVoApi.checkActivityStart()) {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndViewAcTimeEndTip"));
				return;
			}
			if (Api.myAllianceWeekVoApi.getScore() > 0) {
				this.request(NetRequestConst.REQYEST_ALLIANCEWEEK_GETKILLREWARD, { bossId: this._itemCfg.id });
			}
			else {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndNpcInfoPopupViewTip"));
			}

		}, this);
		this._receiveBtn.setPosition(rewardBg.x + rewardBg.width / 2 - this._receiveBtn.width / 2, rewardBg.y + rewardBg.height + 10);
		this.addChildToContainer(this._receiveBtn);

		let receiveBMScale = 0.75;
		this._receiveBM = BaseBitmap.create("collectflag");
		this._receiveBM.setScale(receiveBMScale);
		this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width * receiveBMScale / 2, rewardBg.y + rewardBg.height + 3);
		this.addChildToContainer(this._receiveBM);

		this.refreshView();
	}
	private refreshView() {
		let boss = Api.allianceWeekVoApi.getNowBoss();
		let bossId = boss ? boss.id : Config.AllianceweekendCfg.lastFoeItemCfg().id;
		// if (boss) {
		if (bossId > this._itemCfg.id) {
			if (Api.myAllianceWeekVoApi.checkNpcReceive(this._itemCfg.id)) {
				this._receiveBtn.setVisible(false);
				this._receiveBM.setVisible(true);
			}
			else {
				this._receiveBtn.setVisible(true);
				this._receiveBtn.setEnable(true);
				this._receiveBM.setVisible(false);

			}
			App.DisplayUtil.changeToGray(this._npc);
			this._npckill.setVisible(true);
		}
		else {
			this._receiveBtn.setVisible(true);
			this._receiveBtn.setEnable(false);
			this._receiveBM.setVisible(false);
			App.DisplayUtil.changeToNormal(this._npc);
			this._npckill.setVisible(false);
		}
		// }

	}

	private killHandle(event: egret.Event) {
		if (event.data.ret) {
			let reward = GameData.formatRewardItem(event.data.data.data.rewards);
			App.CommonUtil.playRewardFlyAction(reward);
			this.refreshView();

			let replacerewards = event.data.data.data.replacerewards;
			if (replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
			}
		}
	}
	/**boss Rank回调 */
	private bossRankHandle(event: egret.Event) {
		if (event.data.ret) {
			ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWEEKENDRANKPOPUPVIEW, event.data.data.data);
		}
	}
	protected getShowHeight() {
		if (this.param.data.itemCfg.id == Config.AllianceweekendCfg.lastFoeItemCfg().id) {
			return super.getShowHeight();
		}
		return 633;
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"specialview_commoni_namebg"
		]);
	}
	protected getTitleStr(): string {
		return "allianceWeekEndNpcInfoPopupViewTitle";
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCEWEEK_GETBOSSRANK, this.bossRankHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETKILLREWARD, this.killHandle, this);
		this._itemCfg = null;
		this._receiveBtn = null;
		this._receiveBM = null;
		super.dispose();
	}

}