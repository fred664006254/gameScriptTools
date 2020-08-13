/**
  * 诸葛亮传活动view
  * @author 张朝阳
  * date 2019/5/15
  * @class AcLiangBiographyView
  */
class AcLiangBiographyView extends AcCommonView {

	private _countDownTime: BaseTextField = null;
	private _countDownTimeBg: BaseBitmap = null;


	private _painting1: BaseLoadBitmap = null;
	private _painting2: BaseLoadBitmap = null;

	private _scrollView: ScrollView = null;
	private _svContainer: BaseDisplayObjectContainer = null;

	private _paintingMask: BaseLoadBitmap = null;

	private _boat: BaseBitmap = null;

	private _chargeBtn: BaseButton = null;

	private _lampholder: BaseBitmap = null;

	private _lampholderLight: BaseBitmap = null;

	private _flameseffect: CustomMovieClip = null;

	private _vortexeffect: CustomMovieClip = null;

	private _reviewTF: BaseTextField = null;

	private _scrollInfoList: { pgbg: BaseBitmap, scrollTF: BaseTextField, scroll: BaseBitmap, boxLight: BaseBitmap, itemcfg: Config.AcCfg.LiangBiographyProcessingRewardItemCfg }[] = [];

	private _beginContainer: BaseDisplayObjectContainer = null;

	private _beginMask: BaseBitmap = null;

	private _beginReview: BaseLoadBitmap = null;

	private _beginServant: BaseLoadBitmap = null;

	private _isBeginPlay: boolean = false;

	private _beginLeftYun: BaseLoadBitmap = null;

	private _beginRightYun: BaseLoadBitmap = null;

	private _whiteEffect: BaseBitmap = null;

	private _orangeEffect: BaseBitmap = null;

	private _cloudEffect: CustomMovieClip = null;

	/**灯座 闪 */
	private _lampholderbrightEffect: BaseBitmap = null;

	/**灯座 单图 */
	private _lampholderEffect: BaseBitmap = null;

	/**灯座亮 */
	private _lampholderLightEffect: BaseBitmap = null;

	private _rewards: any = null;

	private _isPlayAni: boolean = false;

	private _leftArrow: BaseButton = null;

	private _rightArrow: BaseButton = null;

	private _oldProgressValue: number = 0;

	private _isFree: boolean = false;

	private _redDot: BaseBitmap = null;

	private _scheduleTF: BaseTextField = null;

	private _scheduleLine: BaseBitmap = null;

	private _useNum: number = 0;

	public constructor() {
		super();
	}
	public initView() {

		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		let key: string = Api.playerVoApi.getPlayerID() + String(vo.st);
		let storage = LocalStorageManager.get(key);
		if (!storage) {
			ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, {
				idx: "acLiangBiography_1-" + this.getUiCode(), f: () => {
					this.initBeginView();
				}, o: this
			});
			LocalStorageManager.set(key, vo.aidAndCode);
		}
		else {
			this.initBeginView();
		}

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, this.useLampHandle, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLIANGREWARDS, this.refreshProcessInfo, this);

		let bg = BaseLoadBitmap.create("acliangbiographyview_bg-" + this.getUiCode());
		bg.width = 640;
		bg.height = 1136;
		bg.setPosition(0, GameConfig.stageHeigth - bg.height);
		this.addChildToContainer(bg);


		let dragonBone = "acliangbiography_dragon";
		let dragonBoneName = "acliangbiography_dragon_ske";

		if (this.getUiCode() == "3") {
			dragonBone = "acliangbiography_phoenix";
			dragonBoneName = "acliangbiography_phoenix_ske";
		}

		if (this.getUiCode() == "5") {
			dragonBone = "acliangbiography_horse";
			dragonBoneName = "acliangbiography_horse_ske";
		}

		if (this.getUiCode() == "7") {
			dragonBone = "acliangbiography_tiger";
			dragonBoneName = "acliangbiography_tiger_ske";
		}


		let servantBone = "servant_full2_" + cfg.show;
		let servantBoneName = "servant_full2_" + cfg.show + "_ske";

		if (App.CommonUtil.check_dragon() && ResourceManager.hasRes(dragonBoneName) && ResourceManager.hasRes(servantBoneName)) {

			let dragonDB = App.DragonBonesUtil.getLoadDragonBones(dragonBone);
			this.addChildToContainer(dragonDB);


			let servantDB = App.DragonBonesUtil.getLoadDragonBones(servantBone);
			servantDB.setPosition(bg.x + bg.width / 2, bg.y + bg.height - 170);
			servantDB.setScale(1.3);
			if (this.getUiCode() == "7"){
				servantDB.x = bg.x + bg.width / 2 - 40;
			}
			dragonDB.setPosition(servantDB.x, servantDB.y + 200);
			this.addChildToContainer(servantDB);

			let atmospherebg = BaseLoadBitmap.create("acliangbiographyview_atmospherebg");
			atmospherebg.width = 640;
			atmospherebg.height = 733;
			atmospherebg.blendMode = egret.BlendMode.ADD;
			atmospherebg.setPosition(GameConfig.stageWidth / 2 - atmospherebg.width / 2, GameConfig.stageHeigth - atmospherebg.height);
			this.addChildToContainer(atmospherebg);
			if(this.getUiCode() == "7"){
				atmospherebg.visible = false;
			}

			if(this.getUiCode() != '5'){
				let fireDB = App.DragonBonesUtil.getLoadDragonBones("servantskinauraman_bg_1")
				fireDB.setPosition(bg.x + bg.width / 2, bg.y + bg.height - 220)
				this.addChildToContainer(fireDB);
			}

		//郭嘉传合作方要求不显示天马
		if(this.getUiCode() == '5'){
			dragonDB.visible = false;
		}
		}
		else {
			let dragonBM = BaseLoadBitmap.create("acliangbiographyview_dragoneffect");
			dragonBM.width = 586
			dragonBM.height = 897;
			dragonBM.setPosition(bg.x + bg.width / 2 - dragonBM.width / 2, bg.y + bg.height - dragonBM.height);
			this.addChildToContainer(dragonBM);

			let servantBM = BaseLoadBitmap.create("skin_full_" + cfg.show);
			servantBM.width = 405 ;
			servantBM.height = 467;
			servantBM.setScale(1.3);
			servantBM.setPosition(bg.x + bg.width / 2 - servantBM.width * 1.3 / 2, bg.y + bg.height - servantBM.height * 1.3 - 170);
			dragonBM.setPosition(bg.x + bg.width / 2 - dragonBM.width / 2, servantBM.y + servantBM.height * 1.3 / 2 - dragonBM.height / 2);

			this.addChildToContainer(servantBM);

			if (this.getUiCode() == "3") {
				dragonBM.setload("acliangbiographyview_phoenixeffect");
				dragonBM.width = 640;
				dragonBM.height = 836;
				dragonBM.setPosition(0, 206);

			}
			if (this.getUiCode() == "5") {
				dragonBM.setload("acliangbiographyview_pegasuseffect");
				dragonBM.width = 640;
				dragonBM.height = 836;
				dragonBM.setPosition(0, 206);

			}
			if (this.getUiCode() == "7") {
				dragonBM.setload("acliangbiographyview_tigereffect");
				dragonBM.width = 640;
				dragonBM.height = 572;
				dragonBM.setPosition(0, 206);

			}

			let atmospherebg = BaseLoadBitmap.create("acliangbiographyview_atmospherebg");
			atmospherebg.width = 640;
			atmospherebg.height = 733;
			atmospherebg.blendMode = egret.BlendMode.ADD;
			atmospherebg.setPosition(GameConfig.stageWidth / 2 - atmospherebg.width / 2, GameConfig.stageHeigth - atmospherebg.height);
			this.addChildToContainer(atmospherebg);
			if(this.getUiCode() == "7"){
				atmospherebg.visible = false;
			}

			let firebg = BaseLoadBitmap.create("acliangbiographyview_fire");
			firebg.width = 629;
			firebg.height = 708;
			firebg.setPosition(GameConfig.stageWidth / 2 - firebg.width / 2, GameConfig.stageHeigth - firebg.height - 170);
			this.addChildToContainer(firebg);

			//郭嘉传合作方要求不显示天马
			if(this.getUiCode() == '5'){
				dragonBM.visible = false;
			}
		}


		let titleBg = BaseLoadBitmap.create("acliangbiographyview_titlebg-" + this.getUiCode());
		titleBg.width = 640;
		titleBg.height = 92;
		titleBg.setPosition(0, 0);

		let acDescBg = BaseBitmap.create("acliangbiographyview_common_acbg")
		acDescBg.width = 640;
		acDescBg.height = 155;
		acDescBg.setPosition(titleBg.x, titleBg.y + titleBg.height - 7);

		this.addChildToContainer(acDescBg);
		this.addChildToContainer(titleBg);

		let acTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyView_acTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		acTimeDesc.setPosition(titleBg.x + 20, acDescBg.y + 15);
		this.addChildToContainer(acTimeDesc);

		let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyView_acDesc-" + this.code, [String(cfg.addValue)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		descTF.width = 600;
		descTF.lineSpacing = 3;
		descTF.setPosition(acTimeDesc.x, acTimeDesc.y + acTimeDesc.height + 10);
		this.addChildToContainer(descTF);

		this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
		this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height / 2;
		this.addChildToContainer(this._countDownTimeBg);

		this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyView_acCountTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
		this.addChildToContainer(this._countDownTime);

		this._chargeBtn = ComponentManager.getButton("acliangbiographyview_chargebtn-" + this.getUiCode(), null, () => {
			if (this._isPlayAni) {
				return;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYCHARGEPOPUPVIEW, { aid: this.aid, code: this.code });
		}, this)
		this._chargeBtn.setPosition(acDescBg.x + 15, acDescBg.y + acDescBg.height + 22);
		this.addChildToContainer(this._chargeBtn);

		let rewardbtn = ComponentManager.getButton("acliangbiographyview_rewardbtn-" + this.getUiCode(), null, () => {
			if (this._isPlayAni) {
				return;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
		}, this)
		rewardbtn.setPosition(this._chargeBtn.x, this._chargeBtn.y + this._chargeBtn.height + 15);
		this.addChildToContainer(rewardbtn);

		let buttomBg = BaseLoadBitmap.create("acliangbiographyview_buttombg-" + this.getUiCode())
		buttomBg.width = 640;
		buttomBg.height = 309;
		buttomBg.setPosition(0, GameConfig.stageHeigth - buttomBg.height);
		this.addChildToContainer(buttomBg);

		this._scheduleTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyViewSchedule-" + this.code, ["20"]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._scheduleTF.setPosition(buttomBg.x + 17, buttomBg.y + 100);
		this.addChildToContainer(this._scheduleTF);



		this._svContainer = new BaseDisplayObjectContainer();
		this._svContainer.width = 1280;
		this._svContainer.height = 190;
		let rect = new egret.Rectangle(0, 0, 640, 198);
		this._scrollView = ComponentManager.getScrollView(this._svContainer, rect);
		this._scrollView.setPosition(buttomBg.x, buttomBg.y + buttomBg.height - this._scrollView.height);
		this._scrollView.bounces = false;
		this.addChildToContainer(this._scrollView);
		this._scrollView.bindMoveCompleteCallback(() => {
			if (this._scrollView.scrollLeft <= 2) {
				this._leftArrow.setVisible(false);
				this._rightArrow.setVisible(true);
			}
			else if (this._scrollView.scrollLeft >= 638) {
				this._leftArrow.setVisible(true);
				this._rightArrow.setVisible(false);
			}
			else {
				this._leftArrow.setVisible(true);
				this._rightArrow.setVisible(true);
			}
		}, this)

		this._painting1 = BaseLoadBitmap.create("acliangbiographyview_painting1-" + this.getUiCode());
		this._painting1.width = 640;
		this._painting1.height = 198;
		this._painting1.setPosition(0, 0);
		this._svContainer.addChild(this._painting1);

		this._painting2 = BaseLoadBitmap.create("acliangbiographyview_painting2-" + this.getUiCode());
		this._painting2.width = 640;
		this._painting2.height = 198;
		this._painting2.setPosition(640, 0);
		this._svContainer.addChild(this._painting2);

		this._boat = BaseBitmap.create("acliangbiographyview_boat-" + this.getUiCode());
		this._boat.setPosition(23, this._svContainer.height / 2 + 70 - this._boat.height);
		this._svContainer.addChild(this._boat);

		this._paintingMask = BaseLoadBitmap.create("acliangbiographyview_paintingmask");//46
		this._paintingMask.width = 1234;
		this._paintingMask.height = 140;
		// this._paintingMask.anchorOffsetX = this._paintingMask.width;
		// this._paintingMask.alpha = 0.6;
		this._paintingMask.setPosition(23, this._svContainer.height / 2 - this._paintingMask.height / 2 + 1);
		this._svContainer.addChild(this._paintingMask);
		this._paintingMask.mask = new egret.Rectangle(0, 0, 1234, 140);

		this._scheduleLine = BaseBitmap.create("acliangbiographyview_common_jindu");
		this._scheduleLine.setPosition(this._paintingMask.mask.x - this._scheduleLine.width / 2 + 23, this._paintingMask.y + this._paintingMask.height / 2 - this._scheduleLine.height / 2);
		this._svContainer.addChild(this._scheduleLine);
		this._scheduleLine.setVisible(false);

		this._leftArrow = ComponentManager.getButton("palace_arrow_left", null, () => {
			this._scrollView.setScrollLeft(0);
		}, this)
		this._leftArrow.setPosition(0, GameConfig.stageHeigth - 95 - this._leftArrow.height / 2);
		this.addChildToContainer(this._leftArrow);
		this._leftArrow.setVisible(false);

		this._rightArrow = ComponentManager.getButton("palace_arrow_right", null, () => {
			this._scrollView.setScrollLeft(640);
		}, this)
		this._rightArrow.setPosition(GameConfig.stageWidth - this._rightArrow.width, this._leftArrow.y);
		this.addChildToContainer(this._rightArrow);
		this._rightArrow.setVisible(true);



		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(bg.x + bg.width / 2 - skinTxtEffectBM.width / 2, bg.y + bg.height - 208 - skinTxtEffectBM.height / 2);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(bg.x + bg.width / 2, bg.y + bg.height - 208);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
		skinTxt.addTouchTap(() => {
			ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYSERVANTSKINPOPUPVIEW, { aid: this.aid, code: this.code });
		}, this);

		let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(bg.x + bg.width / 2, bg.y + bg.height - 208);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

		this.initProcessInfo()

		this.initEffect();

		this.tick();
		this.refreshView();
		this.refreshScheduleTF();
		let v = vo.getNum() / cfg.maxProcessValue();
		this.refreshProcessView(v);
	}
	/**特效情况 */
	private initEffect() {

		this._whiteEffect = BaseBitmap.create("acliangbiographyview_effect_white");
		this._whiteEffect.anchorOffsetX = this._whiteEffect.width / 2;
		this._whiteEffect.anchorOffsetY = this._whiteEffect.height / 2;
		this._whiteEffect.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
		this.addChildToContainer(this._whiteEffect);
		this._whiteEffect.alpha = 0;

		this._orangeEffect = BaseBitmap.create("acliangbiographyview_effect_orange");
		this._orangeEffect.anchorOffsetX = this._orangeEffect.width / 2;
		this._orangeEffect.anchorOffsetY = this._orangeEffect.height / 2;
		this._orangeEffect.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
		this.addChildToContainer(this._orangeEffect);
		this._orangeEffect.alpha = 0;


		this._lampholder = BaseBitmap.create("acliangbiographyview_lampholder-" + this.getUiCode());
		this._lampholder.anchorOffsetX = this._lampholder.width / 2;
		this._lampholder.anchorOffsetY = this._lampholder.height / 2
		this._lampholder.setPosition(GameConfig.stageWidth - this._lampholder.width / 2 - 40, GameConfig.stageHeigth - this._lampholder.height / 2 - 220);
		if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
			this._lampholder.setPosition(GameConfig.stageWidth - this._lampholder.width / 2 - 40, GameConfig.stageHeigth - this._lampholder.height / 2 - 200);
		}
		this._lampholder.addTouchTap(() => {
			if (this._isPlayAni) {
				return;
			}
			let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
			let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
			if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
				if (vo.isFree()) {
					this._isPlayAni = true;
					this._isFree = true;
					this._oldProgressValue = vo.getNum() / cfg.maxProcessValue();
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, { activeId: vo.aidAndCode, isFree: 1 });
				}
				else {
					if (vo.getItemValue() > 0) {
						this._isPlayAni = true;
						this._isFree = false;
						this._oldProgressValue = vo.getNum() / cfg.maxProcessValue();
						NetManager.request(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, { activeId: vo.aidAndCode, isFree: 0 });
					}
					else {
						let msg = LanguageManager.getlocal("acLiangBiographyViewTipMsg-" + this.code);
						let title = "itemUseConstPopupViewTitle";
						ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
							msg: msg, title: title, needCancel: true, confirmTxt: "acLiangBiographyViewGoCharge-" + this.code, handler: this, callback: () => {
								ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYCHARGEPOPUPVIEW, { aid: this.aid, code: this.code });
							}
						});
						// App.CommonUtil.showTip(LanguageManager.getlocal("acLiangBiographyView_NoreviewTip-" + this.code));
						return;
					}
				}
			}
			else {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}

		}, this);


		this._vortexeffect = ComponentManager.getCustomMovieClip("acliangbiographyeffect_vortexeffect", 18, 70);
		let vortexBM = BaseBitmap.create("acliangbiographyeffect_vortexeffect1");
		this._vortexeffect.setPosition(this._lampholder.x - vortexBM.width / 2, this._lampholder.y - vortexBM.height / 2 + 15);
		this.addChildToContainer(this._vortexeffect);
		this._vortexeffect.playWithTime(-1);

		if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
			this._lampholderLight = BaseBitmap.create("acliangbiographyview_lampholder-" + this.getUiCode());
		}
		else {
			this._lampholderLight = BaseBitmap.create("acliangbiographyview_effect_lampholderlight");
		}
		this._lampholderLight.anchorOffsetX = this._lampholderLight.width / 2;
		this._lampholderLight.anchorOffsetY = this._lampholderLight.height / 2
		this._lampholderLight.setPosition(this._lampholder.x, this._lampholder.y);
		this._lampholderLight.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(this._lampholderLight);
		this.addChildToContainer(this._lampholder);

		this._redDot = BaseBitmap.create("public_dot2");
		this._redDot.setPosition(this._lampholder.x + this._lampholder.width / 2, this._lampholder.y - this._lampholder.height / 2);
		this.addChildToContainer(this._redDot);

		let lampholderbrightEffectStr = "acliangbiographyview_effect_lampholderbright";
		if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
			lampholderbrightEffectStr = "acliangbiographyview_effect_bookbright";
		}
		this._lampholderbrightEffect = BaseBitmap.create(lampholderbrightEffectStr);
		this._lampholderbrightEffect.name = '_lampholderbrightEffect';
		this._lampholderbrightEffect.anchorOffsetX = this._lampholderbrightEffect.width / 2;
		this._lampholderbrightEffect.anchorOffsetY = this._lampholderbrightEffect.height / 2;
		this._lampholderbrightEffect.setPosition(this._lampholder.x, this._lampholder.y);
		this._lampholderbrightEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(this._lampholderbrightEffect);
		this._lampholderbrightEffect.alpha = 0;

		this._lampholderEffect = BaseBitmap.create("acliangbiographyview_lampholder-" + this.getUiCode());
		this._lampholderEffect.anchorOffsetX = this._lampholderEffect.width / 2;
		this._lampholderEffect.anchorOffsetY = this._lampholderEffect.height / 2
		this._lampholderEffect.blendMode = egret.BlendMode.ADD;
		this._lampholderEffect.setPosition(this._lampholder.x, this._lampholder.y);
		this.addChildToContainer(this._lampholderEffect);
		this._lampholderEffect.alpha = 0;


		if (this.getUiCode() == "3" ||this.getUiCode() == "5" || this.getUiCode() == "7") {
			this._flameseffect = ComponentManager.getCustomMovieClip("acliangbiographyeffect_bookeffect", 11, 70);
			let flameseBM = BaseBitmap.create("acliangbiographyeffect_bookeffect1");
			this._flameseffect.anchorOffsetX = flameseBM.width / 2;
			this._flameseffect.anchorOffsetY = flameseBM.height / 2;
			this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y);
			this._flameseffect.blendMode = egret.BlendMode.ADD;
			this.addChildToContainer(this._flameseffect);
			this._flameseffect.playWithTime(-1);
		}
		else {
			this._flameseffect = ComponentManager.getCustomMovieClip("acliangbiographyeffect_flameseffect", 6, 70);
			let flameseBM = BaseBitmap.create("acliangbiographyeffect_flameseffect1");
			this._flameseffect.anchorOffsetX = flameseBM.width / 2;
			this._flameseffect.anchorOffsetY = flameseBM.height / 2;
			this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y - this._lampholder.height / 2);
			this._flameseffect.blendMode = egret.BlendMode.ADD;
			this.addChildToContainer(this._flameseffect);
			this._flameseffect.playWithTime(-1);
		}


		let lampholderLightEffectStr = "acliangbiographyview_effect_lampholderflash";
		if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
			lampholderLightEffectStr = "acliangbiographyview_effect_bookflash";
		}
		this._lampholderLightEffect = BaseBitmap.create(lampholderLightEffectStr);
		this._lampholderLightEffect.name = '_lampholderLightEffect';
		this._lampholderLightEffect.anchorOffsetX = this._lampholderLightEffect.width / 2;
		this._lampholderLightEffect.anchorOffsetY = this._lampholderLightEffect.height / 2;
		this._lampholderLightEffect.setPosition(this._lampholder.x, this._lampholder.y);
		this.addChildToContainer(this._lampholderLightEffect);
		this._lampholderLightEffect.alpha = 0;

		this._cloudEffect = ComponentManager.getCustomMovieClip("acliangbiographyeffect_cloudeffect", 10, 70);
		let cloudBM = BaseBitmap.create("acliangbiographyeffect_cloudeffect1");
		this._cloudEffect.anchorOffsetX = cloudBM.width / 2;
		this._cloudEffect.anchorOffsetY = cloudBM.height / 2;
		this._cloudEffect.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
		this.addChildToContainer(this._cloudEffect);



		let review = BaseBitmap.create("acliangbiographyview_review-" + this.getUiCode());
		review.setPosition(GameConfig.stageWidth - review.width, this._lampholder.y - this._lampholder.height / 2 + 30);
		this.addChildToContainer(review);
		review.addTouchTap(() => {
			if (this._isPlayAni) {
				return;
			}
			let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
			let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
			if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
				if (vo.isFree()) {
					this._isPlayAni = true;
					this._isFree = true;
					this._oldProgressValue = vo.getNum() / cfg.maxProcessValue();
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, { activeId: vo.aidAndCode, isFree: 1 });
				}
				else {
					if (vo.getItemValue() > 0) {
						this._isPlayAni = true;
						this._isFree = false;
						this._oldProgressValue = vo.getNum() / cfg.maxProcessValue();
						NetManager.request(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, { activeId: vo.aidAndCode, isFree: 0 });
					}
					else {
						let msg = LanguageManager.getlocal("acLiangBiographyViewTipMsg-" + this.code);
						let title = "itemUseConstPopupViewTitle";
						ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
							msg: msg, title: title, needCancel: true, confirmTxt: "acLiangBiographyViewGoCharge-" + this.code, handler: this, callback: () => {
								ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYCHARGEPOPUPVIEW, { aid: this.aid, code: this.code });
							}
						});
						// App.CommonUtil.showTip(LanguageManager.getlocal("acLiangBiographyView_NoreviewTip-" + this.code));
						return;
					}
				}
			}
			else {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}

		}, this);

		this._reviewTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyView_reviewFree-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._reviewTF.setPosition(this._lampholder.x - this._reviewTF.width / 2, review.y + review.height - 3);
		this.addChildToContainer(this._reviewTF);



	}
	private initProcessInfo() {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		this._scrollInfoList = [];
		let maxValue = cfg.maxProcessValue();
		let maxL = 1234;
		for (let i = 0; i < cfg.liangBiographyProcessingRewardItemCfgList.length; i++) {
			let itemcfg = cfg.liangBiographyProcessingRewardItemCfgList[i];
			let pgValue = itemcfg.reviewTime / maxValue;
			let pgbg = BaseBitmap.create("acliangbiographyview_progressbuttom-" + this.getUiCode());
			pgbg.setPosition(23 + maxL * pgValue - pgbg.width / 2, this._svContainer.height / 2 + 85 - pgbg.height / 2);
			if (i == (cfg.liangBiographyProcessingRewardItemCfgList.length - 1)) {
				pgbg.setPosition(23 + maxL * pgValue - pgbg.width, this._svContainer.height / 2 + 85 - pgbg.height / 2);
			}
			this._svContainer.addChild(pgbg);
			pgbg.addTouchTap(() => {
				let voo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
				if (voo.checkRewardFlag(itemcfg.id)) {
					ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYSCROLLPOPUPVIEW, { aid: this.aid, code: this.code, id: itemcfg.id });

				}
				else {
					ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYPROCESSPOPUPVIEW, { aid: this.aid, code: this.code, id: itemcfg.id });
				}
			}, this);

			let scrollTF = ComponentManager.getTextField(Math.round(pgValue * 100) + "%", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
			scrollTF.setPosition(pgbg.x + 10, pgbg.y + pgbg.height / 2 - scrollTF.height / 2);

			let scroll = BaseBitmap.create("acliangbiographyview_scroll1-" + this.getUiCode());
			scroll.anchorOffsetX = scroll.width / 2;
			scroll.anchorOffsetY = scroll.height / 2;
			scroll.setPosition(scrollTF.x + scrollTF.width + scroll.width / 2, pgbg.y + pgbg.height / 2);

			let boxLight = BaseBitmap.create("acturantable_taskbox_light");
			boxLight.anchorOffsetX = boxLight.width / 2;
			boxLight.anchorOffsetY = boxLight.height / 2;
			boxLight.setPosition(scroll.x, scroll.y);

			this._svContainer.addChild(boxLight);
			this._svContainer.addChild(scrollTF);
			this._svContainer.addChild(scroll);

			let scrollInfo = { pgbg: pgbg, scrollTF: scrollTF, scroll: scroll, boxLight: boxLight, itemcfg: itemcfg };

			this._scrollInfoList.push(scrollInfo);
		}

		this.refreshProcessInfo();

	}
	/**云UI */
	private initBeginView() {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let servantSkin = Config.ServantskinCfg.getServantSkinItemById(cfg.show);
		let servantCfg = Config.ServantCfg.getServantItemById(servantSkin.servantId);


		this._beginContainer = new BaseDisplayObjectContainer();
		this.addChild(this._beginContainer);

		this._beginMask = BaseBitmap.create("public_9_viewmask");
		this._beginMask.width = GameConfig.stageWidth;
		this._beginMask.height = GameConfig.stageHeigth;
		this._beginMask.addTouchTap(() => {
			if (this._isBeginPlay) {
				return;
			}
			this._isBeginPlay = true;

			egret.Tween.get(this._beginLeftYun).to({ x: this._beginMask.x - 235 }, 700).call(() => {
				egret.Tween.removeTweens(this._beginLeftYun);
				egret.Tween.get(this._beginContainer).to({ alpha: 0 }, 400).call(() => {
					egret.Tween.removeTweens(this._beginContainer);
					this._beginContainer.setVisible(false);
				});

			}, this);

			egret.Tween.get(this._beginRightYun).to({ x: this._beginMask.x + this._beginMask.width + 153 }, 700).call(() => {
				egret.Tween.removeTweens(this._beginRightYun);
			}, this);



		}, this);
		this._beginContainer.addChild(this._beginMask);
		
		this._beginServant = BaseLoadBitmap.create("skin_full_" + cfg.show);
		//BaseLoadBitmap.create(servantCfg.fullIcon);
		this._beginServant.width = 405;
		this._beginServant.height = 467
		this._beginServant.setPosition(this._beginMask.x + this._beginMask.width / 2 - this._beginServant.width / 2, this._beginMask.y + this._beginMask.height / 2 - this._beginServant.height / 2);
		this._beginContainer.addChild(this._beginServant)

		this._beginReview = BaseLoadBitmap.create("acliangbiographyview_reviewbg-" + this.getUiCode());
		this._beginReview.width = 563;
		this._beginReview.height = 181;
		this._beginReview.setPosition(this._beginServant.x + this._beginServant.width / 2 - this._beginReview.width / 2, this._beginServant.y + this._beginServant.height - 115);
		this._beginContainer.addChild(this._beginReview);

		this._beginLeftYun = BaseLoadBitmap.create("acliangbiographyview_leftyun", null, {
			callback: () => {
				this._beginLeftYun.setPosition(this._beginMask.x, this._beginServant.y + this._beginServant.height - 140);
			}, callbackThisObj: this, callbackParams: null
		});
		this._beginContainer.addChild(this._beginLeftYun);

		this._beginRightYun = BaseLoadBitmap.create("acliangbiographyview_rightyun", null, {
			callback: () => {
				this._beginRightYun.setPosition(this._beginMask.x + this._beginMask.width - this._beginRightYun.width, this._beginServant.y + this._beginServant.height - 180);
			}, callbackThisObj: this, callbackParams: null
		});
		this._beginContainer.addChild(this._beginRightYun);

	}
	public tick() {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.checkIsInEndShowTime()) {
			this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
		}
		else {
			this._countDownTime.text = LanguageManager.getlocal("acLiangBiographyView_acCountTime-" + this.code, [vo.acCountDown]);
		}
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);

	}


	private refreshView() {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		if (vo.isFree()) {
			this._reviewTF.text = LanguageManager.getlocal("acLiangBiographyView_reviewFree-" + this.code)
		}
		else {
			this._reviewTF.text = LanguageManager.getlocal("acLiangBiographyView_reviewValue-" + this.code, [String(vo.getItemValue())]);
		}
		this.refreshViewLampholder();
		this._reviewTF.x = this._lampholder.x - this._reviewTF.width / 2;

		if (vo.checkRechargeRedDot()) {
			App.CommonUtil.addIconToBDOC(this._chargeBtn);
		}
		else {
			App.CommonUtil.removeIconFromBDOC(this._chargeBtn);
		}
	}

	private refreshScheduleTF() {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		let num = vo.getNum() / cfg.maxProcessValue() >= 1 ? 1 : vo.getNum() / cfg.maxProcessValue();
		let v = Math.round(num * 100);
		this._scheduleTF.text = LanguageManager.getlocal("acLiangBiographyViewSchedule-" + this.code, [String(v)]);
	}

	private refreshViewLampholder() {
		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		this._lampholder.setScale(1);
		this._lampholder.alpha = 1;
		this._lampholder.setPosition(GameConfig.stageWidth - this._lampholder.width / 2 - 40, GameConfig.stageHeigth - this._lampholder.height / 2 - 220);
		if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
			this._lampholder.setPosition(GameConfig.stageWidth - this._lampholder.width / 2 - 40, GameConfig.stageHeigth - this._lampholder.height / 2 - 200);
		}
		if (vo.isFree() || vo.getItemValue() > 0) {
			this._lampholderLight.alpha = 1;
			this._flameseffect.alpha = 1;
			this._vortexeffect.alpha = 1;
			this._redDot.setVisible(true);
		}
		else {
			this._lampholderLight.alpha = 0;
			this._flameseffect.alpha = 0;
			this._vortexeffect.alpha = 0;
			this._redDot.setVisible(false);
		}
		this._lampholderLight.setScale(1);
		this._flameseffect.setScale(1);
		this._lampholderLight.setPosition(this._lampholder.x, this._lampholder.y);
		this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y - this._lampholder.height / 2);
		if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
			this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y);
		}

	}

	private refreshProcessInfo() {
		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		for (let i = 0; i < this._scrollInfoList.length; i++) {
			let scrollInfo = this._scrollInfoList[i];
			if (vo.checkRewardFlag(scrollInfo.itemcfg.id)) {
				egret.Tween.removeTweens(scrollInfo.scroll);
				egret.Tween.removeTweens(scrollInfo.boxLight);

				scrollInfo.scroll.setRes("acliangbiographyview_scroll2-" + this.getUiCode());
				scrollInfo.boxLight.setVisible(false);
			}
			else {
				if (vo.getNum() >= scrollInfo.itemcfg.reviewTime) {
					scrollInfo.scroll.setRes("acliangbiographyview_scroll1-" + this.getUiCode());
					scrollInfo.boxLight.setVisible(true);
					egret.Tween.get(scrollInfo.boxLight, { loop: true }).to({ rotation: scrollInfo.boxLight.rotation + 360 }, 10000);
					egret.Tween.get(scrollInfo.scroll, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);

				}
				else {
					egret.Tween.removeTweens(scrollInfo.scroll);
					egret.Tween.removeTweens(scrollInfo.boxLight);
					scrollInfo.scroll.setRes("acliangbiographyview_scroll1-" + this.getUiCode());
					scrollInfo.boxLight.setVisible(false);
				}
			}
		}
	}

	//位置动画
	private refreshProcessView(v: number) {

		v = v >= 1 ? 1 : v;
		let n = 1 - v;
		let s = 1234 * v;
		let rect=this._paintingMask.mask;
		rect.x=s;
		rect.width=1234 * n;
		this._paintingMask.mask=rect;
		// this._paintingMask.mask.x = 1234 * v;
		// this._paintingMask.mask.width = 1234 * n;

		if (s >= this._boat.width) {
			this._boat.x = 23 + s - this._boat.width;
			if (this._boat.x >= 320) {
				let m = this._boat.x - 320;
				m = m >= 640 ? 640 : m;
				if (m <= 640) {
					this._scrollView.setScrollLeft(m);
				}
			}
		}
		else {
			this._boat.x = 23;
		}
		this._scheduleLine.setPosition(this._paintingMask.mask.x - this._scheduleLine.width / 2 + 23, this._paintingMask.y + this._paintingMask.height / 2 - this._scheduleLine.height / 2);
		if (v >= 1) {
			this._scheduleLine.setVisible(false);
		}
		else {
			this._scheduleLine.setVisible(true);
		}

	}

	private useLampHandle(event: egret.Event) {
		if (event.data.ret) {
			this._rewards = event.data.data.data.rewards;
			this._useNum = event.data.data.data.useNum;
			this.playReviewAni();
		}
	}

	/**回顾动画 */
	private playReviewAni() {
		//白色
		this._whiteEffect.alpha = 0;
		this._whiteEffect.setScale(1);
		egret.Tween.removeTweens(this._whiteEffect);
		egret.Tween.get(this._whiteEffect).wait(670).to({ alpha: 1, scaleX: 568, scaleY: 568 }, 330).to({ alpha: 0, scaleX: 1136, scaleY: 1136 }, 330).call(() => { egret.Tween.removeTweens(this._whiteEffect); }, this);
		//橙色
		this._orangeEffect.alpha = 0;
		this._orangeEffect.setScale(1);
		egret.Tween.removeTweens(this._orangeEffect);
		egret.Tween.get(this._orangeEffect).wait(530).to({ scaleX: 1136, scaleY: 1136 }, 200).call(() => { egret.Tween.removeTweens(this._orangeEffect); }, this);
		//漩涡
		this._vortexeffect.alpha = 1;
		egret.Tween.removeTweens(this._vortexeffect);
		egret.Tween.get(this._vortexeffect).to({ alpha: 0 }, 130).call(() => { egret.Tween.removeTweens(this._vortexeffect); }, this);
		//云序列帧
		this._cloudEffect.setScale(1);
		egret.Tween.removeTweens(this._cloudEffect);
		egret.Tween.get(this._cloudEffect).wait(1000).call(() => {
			this._cloudEffect.setScale(16);
			this._cloudEffect.playWithTime(1);
			egret.Tween.removeTweens(this._cloudEffect);
			this._cloudEffect.setEndCallBack(() => {
				ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYREWARDSHOWVIEW, {
					code: this.code,
					aid: this.aid,
					useNum: this._useNum,
					rewards: this._rewards, callback: () => {
						this.refreshView();
						this._isPlayAni = false;
						this.playBoatAni();
					}, callobj: this
				});
			}, this)
		}, this)
		//灯闪
		this._lampholderbrightEffect.alpha = 1;
		egret.Tween.removeTweens(this._lampholderbrightEffect);
		egret.Tween.get(this._lampholderbrightEffect).to({ alpha: 0 }, 270).call(() => { egret.Tween.removeTweens(this._lampholderbrightEffect); }, this);

		//灯座特效
		this._lampholderEffect.setScale(1.2);
		this._lampholderEffect.alpha = 1;
		egret.Tween.removeTweens(this._lampholderEffect);
		egret.Tween.get(this._lampholderEffect).to({ scaleX: 1, scaleY: 1 }, 130).to({ scaleX: 1.28, scaleY: 1.28, alpha: 0 }, 70).to({ scaleX: 1.56, scaleY: 1.56, alpha: 1 }, 70).to({ scaleX: 2.6, scaleY: 2.6, alpha: 0 }, 2.6).call(() => { egret.Tween.removeTweens(this._lampholderEffect); }, this);

		//灯座
		this._lampholder.setScale(1);
		this._lampholder.alpha = 1;
		this._lampholder.setPosition(GameConfig.stageWidth - this._lampholder.width / 2 - 40, GameConfig.stageHeigth - this._lampholder.height / 2 - 220);
		egret.Tween.removeTweens(this._lampholder);
		egret.Tween.get(this._lampholder).wait(330).to({ scaleX: 6, scaleY: 6, alpha: 0, x: GameConfig.stageWidth / 2, y: GameConfig.stageHeigth / 2 }, 340).to({ scaleX: 20, scaleY: 20 }, 260).call(() => { egret.Tween.removeTweens(this._lampholder); }, this);

		//灯光
		this._lampholderLight.setScale(1);
		this._lampholderLight.alpha = 1;
		this._lampholderLight.setPosition(this._lampholder.x, this._lampholder.y);
		egret.Tween.removeTweens(this._lampholderLight);
		egret.Tween.get(this._lampholderLight).wait(330).to({ scaleX: 6, scaleY: 6, alpha: 0, x: GameConfig.stageWidth / 2, y: GameConfig.stageHeigth / 2 }, 340).to({ scaleX: 20, scaleY: 20 }, 260).call(() => { egret.Tween.removeTweens(this._lampholderLight); }, this);
		//火苗
		this._flameseffect.setScale(1);
		this._flameseffect.alpha = 1;
		this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y - this._lampholder.height / 2);
		if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
			this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y);
		}
		egret.Tween.removeTweens(this._flameseffect);
		egret.Tween.get(this._flameseffect).wait(330).to({ scaleX: 6, scaleY: 6, alpha: 0, x: GameConfig.stageWidth / 2, y: GameConfig.stageHeigth / 2 - this._lampholderLight.height / 2 * 6 }, 340).to({ scaleX: 20, scaleY: 20 }, 260).call(() => { egret.Tween.removeTweens(this._flameseffect); }, this);
		//灯座亮
		this._lampholderLightEffect.setScale(1)
		this._lampholderLightEffect.alpha = 0;
		this._lampholderLightEffect.setPosition(this._lampholder.x, this._lampholder.y);
		egret.Tween.removeTweens(this._lampholderLightEffect);
		egret.Tween.get(this._lampholderLightEffect).wait(330).to({ x: GameConfig.stageWidth / 2, y: GameConfig.stageHeigth / 2 }, 340);
		egret.Tween.get(this._lampholderLightEffect).wait(330).to({ alpha: 0.5 }, 540).to({ alpha: 0 }, 200);
		egret.Tween.get(this._lampholderLightEffect).wait(330).to({ scaleX: 20, scaleY: 20 }, 740).call(() => { egret.Tween.removeTweens(this._lampholderLightEffect); }, this);


	}

	/**小船动画 */
	private playBoatAni() {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		egret.Tween.removeTweens(this);
		let sumTime = 5000;
		let oldv = this._oldProgressValue;
		let v = vo.getNum() / cfg.maxProcessValue();

		if (oldv >= 1) {
			this._scheduleLine.setVisible(false);
			return;
		}
		let sum = 1234;
		let bw = this._boat.width / sum;
		v = v >= 1 ? 1 : v;
		if (v >= 1) {
			this._scheduleLine.setVisible(false);
		}
		else {
			this._scheduleLine.setVisible(true);
		}

		let boatTime = 0;
		let boatV = 0;
		if (bw >= oldv && v >= bw) {
			boatV = bw - oldv;
			boatTime = sumTime * boatV;
		}

		let offsetV = v - oldv;
		let offsetTime = sumTime * offsetV;


		let n = 1 - v;
		let ms = sum * v;
		let s = 23 + ms - this._boat.width;
		// this._scheduleLine.setVisible(true);
		egret.Tween.get(this._paintingMask.mask, {
			loop: false, onChange: () => {
				if(this._paintingMask)
				{
					this._paintingMask.mask=this._paintingMask.mask;
				}
				if (this._scheduleLine) {
					this._scheduleLine.setPosition(this._paintingMask.mask.x - this._scheduleLine.width / 2 + 23, this._paintingMask.y + this._paintingMask.height / 2 - this._scheduleLine.height / 2);
				}
			}, onChangeObj: this
		}).to({ x: sum * v, width: sum * n }, offsetTime).call(() => {
			if(this._paintingMask)
			{
				this._paintingMask.mask=this._paintingMask.mask;
			}
			egret.Tween.removeTweens(this._paintingMask.mask);
			this.refreshProcessInfo();
			this.refreshScheduleTF();
			if (v >= 1) {
				this._scheduleLine.setVisible(false);
			}
			else {
				this._scheduleLine.setVisible(true);
			}
			// this._scheduleLine.setVisible(false);
		}, this);
		if (ms >= this._boat.width) {
			egret.Tween.get(this._boat, {
				loop: false, onChange: () => {
					if (this._boat) {
						if (this._boat.x >= 320) {
							let m = this._boat.x - 320;
							if (m <= 640) {
								this._scrollView.setScrollLeft(m);
							}
						}
					}

				}, onChangeObj: this
			}).wait(boatTime).to({ x: s }, offsetTime - boatTime).call(() => {
				egret.Tween.removeTweens(this._boat);
			}, this);


		}

	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"acliangbiographyview_common_acbg", "acbeautyvoteview_black", "acliangbiographyview-" + this.getUiCode(), "accarnivalview_tab_green",
			"accarnivalview_tab_red", "progress5", "progress3_bg", "acliangbiographyeffect_flameseffect", "acliangbiographyeffect_vortexeffect",
			"acliangbiographyview_effect_lampholderbright", "acliangbiographyview_effect_lampholderflash", "acliangbiographyview_effect_lampholderlight",
			"acliangbiographyview_effect_orange", "acliangbiographyview_effect_white", "acwealthcarpview_servantskintxt", "acwealthcarpview_skineffect",
			"acturantable_taskbox_light", "common_box_2", "sharepopupview_closebtn", "palace_arrow_left", "palace_arrow_right", "acliangbiographyeffect_cloudeffect",
			"acliangbiographyview_common_jindu", "acliangbiographyview_effect_bookbright", "acliangbiographyview_effect_bookflash", "acliangbiographyeffect_bookeffect"
		]);
	}
	protected getBgName(): string {
		return null;
	}

	protected getTitleBgName(): string {
		return null;
	}
	protected getRuleInfo(): string {
		return "acLiangBiographyViewRuleInfo-" + this.code;
	}
	protected getRuleInfoParam(): string[] {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		return [String(cfg.addValue)];
	}
	protected getProbablyInfo(): string {
		return "acLiangBiographyViewProbablyInfo-" + this.code;
	}
	protected getUiCode(): string {
		if (this.code == "2") {
			return "1";
		}
		if (this.code == "4") {
			return "3";
		}
		if (this.code == "6") {
			return "5";
		}
		if (this.code == "8"){
			return "7";
		}
		return super.getUiCode();
	}
	protected getTitleStr(): string {
		return null;
	}
	public dispose() {
		egret.Tween.removeTweens(this._paintingMask.mask);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, this.useLampHandle, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLIANGREWARDS, this.refreshProcessInfo, this);
		this._countDownTime = null;
		this._countDownTimeBg = null;
		this._painting1 = null;
		this._painting2 = null;
		this._scrollView = null;
		this._svContainer = null;
		this._paintingMask = null;
		this._boat = null;
		this._chargeBtn = null;
		this._lampholder = null;
		this._lampholderLight = null;
		this._flameseffect = null;
		this._vortexeffect = null;
		this._reviewTF = null;
		this._scrollInfoList = [];
		this._beginContainer = null;
		this._beginMask = null;
		this._beginReview = null;
		this._beginServant = null;
		this._isBeginPlay = false;
		this._beginLeftYun = null;
		this._beginRightYun = null;
		this._whiteEffect = null;
		this._orangeEffect = null;
		this._cloudEffect = null;
		this._lampholderbrightEffect = null;
		this._lampholderEffect = null;
		this._lampholderLightEffect = null;
		this._rewards = null;
		this._isPlayAni = false;
		this._leftArrow = null;
		this._rightArrow = null;
		this._oldProgressValue = 0;
		this._isFree = false;
		this._redDot = null;
		this._scheduleTF = null;
		this._scheduleLine = null;
		this._useNum = 0;
		super.dispose();
	}

}