/**
  * 诸葛亮传活动阶段奖励
  * @author 张朝阳
  * date 2019/5/16
  * @class AcLiangBiographyProcessPopupView
  */
class AcLiangBiographyProcessPopupView extends PopupView {
	public constructor() {
		super();
	}

	protected initView(): void {

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLIANGREWARDS, this.liangRewardsHandle, this);

		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let id = this.param.data.id;

		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		let itemCfg = cfg.getProcessingRewardItemCfgById(id);



		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 340 - 210 + 30;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let bg2 = BaseBitmap.create("public_9_bg14");
		bg2.width = 524;
		bg2.height = 336 - 210 + 30;
		bg2.setPosition(bg.x + 3, bg.y + 3);
		this.addChildToContainer(bg2);

		let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
		titleBg.width = 508;
		titleBg.height = 35;
		titleBg.setPosition(bg2.x + bg2.width / 2 - titleBg.width / 2, bg2.y + 10);
		this.addChildToContainer(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyProcessPopupViewTitleName_" + id + "-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChildToContainer(titleTF);

		let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += titleTF.width;
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
		this.addChildToContainer(itemTopLine);

		let descTF: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyProcessPopupViewDesc_" + id + "-" + code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		descTF.width = 460;
		descTF.lineSpacing = 3;
		descTF.setPosition(titleBg.x + titleBg.width / 2 - descTF.width / 2, titleBg.y + titleBg.height + 15);
		this.addChildToContainer(descTF);

		let titleBg2 = BaseLoadBitmap.create("countrywarrewardview_itembg");
		titleBg2.width = 508;
		titleBg2.height = 35;
		titleBg2.setPosition(bg2.x + bg2.width / 2 - titleBg2.width / 2, descTF.y + descTF.height + 15);
		this.addChildToContainer(titleBg2);

		let titleTF2 = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyProcessPopupViewSucessReward-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF2.setPosition(titleBg2.x + titleBg2.width / 2 - titleTF2.width / 2, titleBg2.y + titleBg2.height / 2 - titleTF2.height / 2)
		this.addChildToContainer(titleTF2);

		let itemTopLine2: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine2.width += titleTF2.width;
		itemTopLine2.setPosition(titleBg2.x + titleBg2.width / 2 - itemTopLine2.width / 2, titleBg2.y + titleBg2.height / 2 - itemTopLine2.height / 2);
		this.addChildToContainer(itemTopLine2);

		let rewardVoList = GameData.formatRewardItem(itemCfg.getReward);
		let scale = 0.85;
		let itemHeight = 0;
		let rewardbg = BaseBitmap.create("public_9_managebg");
		rewardbg.width = 502;
		rewardbg.setPosition(titleBg2.x + titleBg2.width / 2 - rewardbg.width / 2, titleBg2.y + titleBg2.height + 15);
		this.addChildToContainer(rewardbg);
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true);
			rewardDB.setScale(scale);
			rewardDB.setPosition(rewardbg.x + 5 + ((rewardDB.width - 8) * (i % 5)), rewardbg.y + 5 + ((rewardDB.height - 8) * Math.floor(i / 5)))
			this.addChildToContainer(rewardDB);
			itemHeight = rewardDB.height;
		}
		rewardbg.height = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;



		bg.height += descTF.height + rewardbg.height;
		bg2.height += descTF.height + rewardbg.height;

		if (vo.checkRewardFlag(id)) {
			let receiveBMScale = 0.7;
			let receiveBM = BaseBitmap.create("collectflag");
			receiveBM.setScale(receiveBMScale);
			receiveBM.setPosition(bg.x + bg.width / 2 - receiveBM.width / 2 * receiveBMScale, bg.y + bg.height + 5)
			this.addChildToContainer(receiveBM);

		}
		else {
			let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acLiangBiographyProcessPopupViewReceiveReward-" + code, () => {
				if (!vo.isStart) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					return;
				}
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETLIANGREWARDS, { activeId: vo.aidAndCode, rkey: id });
			}, this);
			receiveBtn.setPosition(bg.x + bg.width / 2 - receiveBtn.width / 2, bg.y + bg.height + 10);
			this.addChildToContainer(receiveBtn);

			if (!vo.checkRewardFlag(id) && itemCfg.reviewTime <= vo.getNum()) {
				receiveBtn.setEnable(true);
			}
			else {
				receiveBtn.setEnable(false);
			}

		}



	}
	/**刷新界面 */
	private refreshView() {


	}
	private liangRewardsHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let rewardsVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardsVo);
			ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYSCROLLPOPUPVIEW, { aid: this.param.data.aid, code: this.param.data.code, id: this.param.data.id });

			this.hide();
		}
	}



	protected getTitleStr(): string {
		return "acLiangBiographyProcessPopupViewTitle_" + this.param.data.id + "-" + this.param.data.code;
	}
	public dispose(): void {

		super.dispose();
	}
}