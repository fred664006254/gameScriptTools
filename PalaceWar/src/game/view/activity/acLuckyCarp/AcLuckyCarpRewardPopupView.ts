/**
 * 锦鲤活动奖励
 * @author 张朝阳
 * date 2019/2/13
 * @class AcLuckyCarpRewardPopupView
 */
class AcLuckyCarpRewardPopupView extends PopupView {

	private _receiveBtn: BaseButton = null;

	private _collectFlag: BaseBitmap = null;
	public constructor() {
		super();
	}
	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD, this.rewardHandle, this)

		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let cfg = <Config.AcCfg.LuckyCarpCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);

		let rewards = cfg.rechargeReward.getReward;
		let rewardVo = GameData.formatRewardItem(rewards);

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 525;
		bg.height = Math.round(rewardVo.length / 4) * 130 + 55;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let rewardbg = BaseBitmap.create("public_9_probiginnerbg");
		rewardbg.width = 510;
		rewardbg.height = Math.round(rewardVo.length / 4) * 130;
		rewardbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardbg.width / 2, bg.y + bg.height / 2 - rewardbg.height / 2);
		this.addChildToContainer(rewardbg);

		for (let i = 0; i < rewardVo.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVo[i], true, true);
			rewardDB.setPosition(rewardbg.x + 16 + ((rewardDB.width + 16) * (i % 4)), rewardbg.y + 13 + ((rewardDB.height + 18) * Math.floor(i / 4)))
			this.addChildToContainer(rewardDB)
		}

		this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "taskCollect", () => {
			let vo = <AcLuckyCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
			let cfg = <Config.AcCfg.LuckyCarpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
			if (vo.getChargeNum() < cfg.rechargeReward.needGem) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acLuckyCarpRewardPopupViewTip-" + code));
			}
			else {
				this.request(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD, { activeId: vo.aidAndCode });
			}
		}, this)
		this._receiveBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._receiveBtn.width / 2, bg.y + bg.height + 25);
		this.addChildToContainer(this._receiveBtn);
		// this.request(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD, { activeId: vo.aidAndCode })

		this._collectFlag = BaseBitmap.create("collectflag")
		this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
		this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
		this._collectFlag.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2, this._receiveBtn.y + this._receiveBtn.height / 2);
		this._collectFlag.setScale(0.8);
		this.addChildToContainer(this._collectFlag);

		this.refreshView();

	}
	private refreshView() {
		let vo = <AcLuckyCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
		let cfg = <Config.AcCfg.LuckyCarpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		if (vo.getChargeNum() < cfg.rechargeReward.needGem) {
			this._receiveBtn.setVisible(true);
			this._collectFlag.setVisible(false);
			this._receiveBtn.setGray(true);
		}
		else {
			if (vo.isReceive()) {
				this._receiveBtn.setVisible(false);
				this._collectFlag.setVisible(true);
			}
			else {
				this._receiveBtn.setVisible(true);
				this._collectFlag.setVisible(false);
				this._receiveBtn.setGray(false);
			}
		}

	}
	/**领取奖励返回 */
	private rewardHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let rewardsVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardsVo);
			this.receiveEffect();
		}
	}
	private receiveEffect() {
		this._collectFlag.setScale(2);
		this._receiveBtn.setVisible(false);
		this._collectFlag.setVisible(true);
		egret.Tween.get(this._collectFlag).to({ scaleX: 0.8, scaleY: 0.8 }, 300);
	}

	protected getTitleStr(): string {
		return "acLuckyCarpRewardPopupViewTitle-" + this.param.data.code;
	}
	protected getShowHeight() {
		return 400;
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLUCKYCARPREWARD, this.rewardHandle, this)
		this._collectFlag = null;
		this._receiveBtn = null;
		super.dispose();
	}
}