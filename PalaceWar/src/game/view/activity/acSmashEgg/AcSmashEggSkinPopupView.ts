/**
 * 金蛋赠礼 皮肤兑换
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggSkinPopupView
 */
class AcSmashEggSkinPopupView extends PopupView {
	public constructor() {
		super();
	}
	private aid: any;
	private code: any;
	private _progress: ProgressBar = null;
	private _desc: BaseTextField = null;

	protected initView(): void {
		this.aid = this.param.data.aid;
		this.code = this.param.data.code;

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_EXCHANGE, this.claimRewardsHandle, this);

		let acCfg = <Config.AcCfg.SmashEggCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let skinCfg = Config.ServantskinCfg.getServantSkinItemById(acCfg.show);
		let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);

		let rewardsVo = GameData.formatRewardItem(acCfg.itemExchange[0].costProof)[0];
		let rewardsVo2 = GameData.formatRewardItem(acCfg.itemExchange[0].getReward)[0];

		let rewardsVo3 = GameData.formatRewardItem(acCfg.itemExchange[1].costProof)[0];
		let rewardsVo4 = GameData.formatRewardItem(acCfg.itemExchange[1].getReward)[0];

		let proofNum = Api.itemVoApi.getItemNumInfoVoById(rewardsVo.id);

		let bg = BaseLoadBitmap.create("acchristmasview_rewardmidbg");
		bg.width = 544;
		bg.height = 400;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
		this.addChildToContainer(bg);


		let rect = new egret.Rectangle(0, 0, 544, 364);
		let maskContan = new BaseDisplayObjectContainer();
		maskContan.width = 544;
		maskContan.height = 364;
		maskContan.mask = rect;
		maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
		this.addChildToContainer(maskContan);

		let boneName = undefined;
		if (skinCfg && skinCfg.bone) {
			boneName = skinCfg.bone + "_ske";
		}
		if (Api.switchVoApi.checkIsServantSkinState(skinCfg.id)) {
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				droWifeIcon.setScale(0.8);
				droWifeIcon.anchorOffsetY = droWifeIcon.height;
				droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
				droWifeIcon.x = maskContan.width / 2;
				droWifeIcon.y = maskContan.y + maskContan.height - 5;
				maskContan.addChild(droWifeIcon);
			}
			else {
				let skinImg = BaseLoadBitmap.create(skinCfg.body);
				skinImg.width = 405;
				skinImg.height = 467;
				skinImg.anchorOffsetY = skinImg.height;
				skinImg.anchorOffsetX = skinImg.width / 2;
				skinImg.setScale(0.87);
				skinImg.x = maskContan.width / 2;
				skinImg.y = maskContan.y + maskContan.height - 5;
				maskContan.addChild(skinImg);
			}
		}

		let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		topbg.width = 544;
		topbg.height = 36;
		topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
		this.addChildToContainer(topbg);

		let topDesc = ComponentManager.getTextField(LanguageManager.getlocal("acSmashEggClothesTip-" + this.code, [String(rewardsVo.num)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
		this.addChildToContainer(topDesc);

		let skinnamebg = BaseBitmap.create("skin_detail_namebg");
		skinnamebg.setPosition(bg.x, bg.y + 20);
		this.addChildToContainer(skinnamebg);

		let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
		skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
		this.addChildToContainer(skinNameTxt);

		let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
		servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
		this.addChildToContainer(servantNameTxt);


		let itemicon = BaseLoadBitmap.create("itemicon" + rewardsVo.id);
		itemicon.width = 90;
		itemicon.height = 90;
		itemicon.setPosition(bg.x + 10, bg.y + bg.height);
		this.addChildToContainer(itemicon);

		this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 300);
		this._progress.setPosition(itemicon.x + itemicon.width, itemicon.y + 15);
		this.addChildToContainer(this._progress);

		this._desc = ComponentManager.getTextField(LanguageManager.getlocal("acSmashEggClothesTip-" + this.code, [String(rewardsVo.num)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
		this._desc.width = 300;
		this._desc.setPosition(this._progress.x, this._progress.y + this._progress.height + 2);
		this.addChildToContainer(this._desc);

		let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acSearchProofSkinPopupViewExchange-" + this.code, () => {
			let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
			if (!vo.isStart) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			if (this._progress.getPercent() < 1) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acSmashEggNotEnoughProof-" + this.code));
				return;
			}
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_EXCHANGE, { activeId: vo.aidAndCode });
		}, this);
		btn.setScale(0.95);
		btn.setPosition(this._progress.x + this._progress.width +3, this._progress.y);
		this.addChildToContainer(btn);

		let cfg = Config.ServantskinCfg.getServantSkinItemById(String(acCfg.show));
		if (!cfg.canExchangeItem()) {
			this._progress.setPercentage(proofNum / rewardsVo3.num, String(proofNum) + "/" + String(rewardsVo3.num));
			this._desc.text = LanguageManager.getlocal("acSmashEggAlreadyHave-" + this.code);
		}
		else {
			this._progress.setPercentage(proofNum / rewardsVo.num, String(proofNum) + "/" + String(rewardsVo.num));
			this._desc.text = LanguageManager.getlocal("acSmashEggClothesTip-" + this.code, [String(rewardsVo.num)]);
		}


		let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		buttomBg.width = 530;
		buttomBg.height = 275+20;
		buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5 + 95);
		this.addChildToContainer(buttomBg);

		let buttomBg2 = BaseBitmap.create("public_9_bg14");
		buttomBg2.width = 525;
		buttomBg2.height = 269+20;
		buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
		this.addChildToContainer(buttomBg2);

		let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		skinTipTxt.width = 480;
		skinTipTxt.lineSpacing = 3;
		skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
		this.addChildToContainer(skinTipTxt);

		let addAbility = skinCfg.addAbility;
		for (let index = 0; index < addAbility.length; index++) {
			let bnode = new ServantChangeSkinBookItem();
			bnode.initItem(index,addAbility[index], [skinCfg.id]);
			bnode.setPosition(skinTipTxt.x -5 + index%2*245, skinTipTxt.y + skinTipTxt.height + 15+ Math.floor(index/2)*92);
			this.addChildToContainer(bnode);
		}

		// let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasBigRewardPopupViewButtomDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		// buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
		// this.addChildToContainer(buttomTipTxt);

	}

	private claimRewardsHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let rewardsVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardsVo);

			let acCfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
			let rewardsVo1 = GameData.formatRewardItem(acCfg.itemExchange[0].costProof)[0];
			let rewardsVo2 = GameData.formatRewardItem(acCfg.itemExchange[0].getReward)[0];

			let rewardsVo3 = GameData.formatRewardItem(acCfg.itemExchange[1].costProof)[0];

			let proofNum = Api.itemVoApi.getItemNumInfoVoById(rewardsVo1.id);
			let cfg = Config.ServantskinCfg.getServantSkinItemById(String(acCfg.show));
			if (!cfg.canExchangeItem()) {
				this._progress.setPercentage(proofNum / rewardsVo3.num, String(proofNum) + "/" + String(rewardsVo3.num));
				this._desc.text = LanguageManager.getlocal("acSmashEggAlreadyHave-" + this.code);
			}
			else {
				this._progress.setPercentage(proofNum / rewardsVo1.num, String(proofNum) + "/" + String(rewardsVo1.num));
				this._desc.text = LanguageManager.getlocal("acSmashEggClothesTip-" + this.code, [String(rewardsVo1.num)])
			}
		}
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"skin_detail_namebg", "progress3_bg", "progress5", "servant_star",
			"servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
		]);
	}
	protected getTitleStr(): string {
		return "acSmashEggSkinPopupViewTitle-" + this.param.data.code;
	}
	// protected getShowHeight() {
	// 	return 815+40;
	// }

	protected getBgExtraHeight():number
	{
		return 20;
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_EXCHANGE, this.claimRewardsHandle, this);
		this.aid = null;
		this.code = null;
		this._progress = null;
		this._desc = null;
		super.dispose();
	}
}