/**
  * 彩蛋活动
  * author 张朝阳
  * date 2019/2/11
  * @class AcWealthCarpView
  */
class AcWealthCarpView extends AcCommonView {

	private _buttomtxtbg: BaseBitmap = null;

	private _buttomtxt: BaseTextField = null;

	private _bg: BaseLoadBitmap = null;

	private _effect: CustomMovieClip = null;

	private _effectReward: BaseBitmap = null;

	private _countDownTime: BaseTextField = null;
	private _countDownTimeBg: BaseBitmap = null;

	private _sceneContainer: BaseDisplayObjectContainer = null;

	private _isPlay: boolean = null;

	private _isRequest: boolean = false;
	public constructor() {
		super();
	}

	protected getContainerY():number
	{
		return 0;
	}

	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, this.rewardsNameHandle, this);
		let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.WealthCarpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

		if (Number(this.code) >= 5) {
			this._sceneContainer = new BaseDisplayObjectContainer();
			this._sceneContainer.width = 640;
			this._sceneContainer.height = 1136;
			this._sceneContainer.anchorOffsetX = 320;
			this._sceneContainer.anchorOffsetY = 960;
			this._sceneContainer.setPosition(320, GameConfig.stageHeigth - this._sceneContainer.height - this.getContainerY() + 960);
			this.addChildToContainer(this._sceneContainer);

			this._bg = BaseLoadBitmap.create("acwealthcarpview_bg-" + this.getUiCode());
			this._bg.width = 640;
			this._bg.height = 1136;
			// this._bg.y = GameConfig.stageHeigth - this._bg.height - this.getContainerY();
			this._sceneContainer.addChild(this._bg);

			let titlebg = BaseLoadBitmap.create("acwealthcarpview_titlebg-" + this.getUiCode());
			titlebg.width = 640;
			titlebg.height = 92;

			let topbg = BaseLoadBitmap.create("acwealthcarpview_topbg-" + this.getUiCode());
			topbg.width = 640;
			topbg.height = 162;
			topbg.setPosition(titlebg.x, titlebg.y + titlebg.height - 7);
			this.addChildToContainer(topbg);
			this.addChildToContainer(titlebg);



			let acTime = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpView_acTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			acTime.setPosition(topbg.x + 25, topbg.y + 15);
			this.addChildToContainer(acTime);

			let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewToptip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			descTF.width = 585;
			descTF.lineSpacing = 3;
			descTF.setPosition(acTime.x, acTime.y + acTime.height + 5);
			this.addChildToContainer(descTF);

			this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
			this._countDownTimeBg.y = topbg.y + topbg.height - this._countDownTimeBg.height / 2 - 20;
			this.addChildToContainer(this._countDownTimeBg);

			this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewCountDown-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
			this._countDownTimeBg.width = 60 + this._countDownTime.width;
			this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
			this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
			this.addChildToContainer(this._countDownTime);
			if (Number(this.code) == 5  || Number(this.code) == 9 ||this.code == "8" ||this.code == "12") {
				let skinCfg = Config.ServantskinCfg.getServantSkinItemById(cfg.corePrize);
				// let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
				let boneName = undefined;
				if (skinCfg && skinCfg.bone) {
					boneName = skinCfg.bone + "_ske";
				}

				if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
					let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					droWifeIcon.setScale(0.9);
					droWifeIcon.anchorOffsetY = droWifeIcon.height;
					droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
					droWifeIcon.setPosition(this._bg.x + 150, this._bg.y + 1000);
					this._sceneContainer.addChild(droWifeIcon);
					if(this.code == "8" || this.code == "12"){
						droWifeIcon.setPosition(this._bg.x + 150, this._bg.y + 1060);
					}
				} else {

					let personBM = BaseLoadBitmap.create("acwealthcarpview_person-" + this.code);
					personBM.setPosition(this._bg.x + 0, this._bg.y + 537);
					this._sceneContainer.addChild(personBM);
				}

			}
			else if ( Number(this.code) == 6 || Number(this.code) == 10 || this.code == "7" || this.code == "11" ) {
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(cfg.corePrize);
				// let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
				let boneName = undefined;
				if (skinCfg && skinCfg.bone) {
					boneName = skinCfg.bone + "_ske";
				}

				if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
					let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
					droWifeIcon.setScale(0.9);
					droWifeIcon.anchorOffsetY = droWifeIcon.height;
					droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
					droWifeIcon.setPosition(this._bg.x + 150, this._bg.y + 1020);
					this._sceneContainer.addChild(droWifeIcon);
				} else {

					let personBM = BaseLoadBitmap.create("acwealthcarpview_person-" + this.code);
					personBM.setPosition(this._bg.x + 0, this._bg.y + 537);
					this._sceneContainer.addChild(personBM);
				}
			}
			// let personBM = BaseLoadBitmap.create("acwealthcarpview_person-" + this.code);
			// personBM.setPosition(this._bg.x + 0, this._bg.y + 537);
			// this._sceneContainer.addChild(personBM);
			// personBM.setVisible(false);




			let buttombg = BaseLoadBitmap.create("acwealthcarpview_buttombg-" + this.getUiCode());
			buttombg.width = 640;
			buttombg.height = 225;
			buttombg.setPosition(0, this._bg.y + this._bg.height - buttombg.height);
			this._sceneContainer.addChild(buttombg);


			let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
			let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
			skinTxtEffect.anchorOffsetX = skinTxtEffectBM.width / 2;
			skinTxtEffect.anchorOffsetY = skinTxtEffectBM.height / 2;
			skinTxtEffect.setPosition(this._bg.x + 162 - 20, topbg.y + 924 - 50);
			skinTxtEffect.blendMode = egret.BlendMode.ADD;
			this._sceneContainer.addChild(skinTxtEffect);
			skinTxtEffect.playWithTime(-1);


			let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
			skinTxt.anchorOffsetX = skinTxt.width / 2;
			skinTxt.anchorOffsetY = skinTxt.height / 2;
			skinTxt.setPosition(skinTxtEffect.x, skinTxtEffect.y);
			this._sceneContainer.addChild(skinTxt);
			egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

			skinTxt.addTouchTap(() => {
				if (this.code == "5" || this.code == "9" ||this.code == "8" || this.code == "12") {
					let topMsg = LanguageManager.getlocal("acWealthCarpViewServantSkinTopMsg-" + this.code)
					ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSERVANTSKINPOPUPVIEW, { aid: this.aid, code: this.code, skin: cfg.corePrize, topMsg: topMsg });
				}
				else if (this.code == "6" || this.code == "10" || this.code == "7"  || this.code == "11" ){
					// let topMsg = LanguageManager.getlocal("acWealthCarpViewServantSkinTopMsg-" + this.code);
					// ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONWIFESKINREWARDPOPUPVIEW, { skinId: cfg.corePrize, topMsg: topMsg });
					ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPWIFESKINREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
				}
			}, this);


			let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
			skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
			skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
			skinTxteffect.setPosition(skinTxtEffect.x, skinTxtEffect.y);
			this._sceneContainer.addChild(skinTxteffect);
			skinTxteffect.blendMode = egret.BlendMode.ADD;
			skinTxteffect.alpha = 0;
			egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);



			let boxbtn = ComponentManager.getButton("acwealthcarpview_boxbtn-" + this.getUiCode(), null, () => {
				if (this._isPlay) {
					return;
				}
				this._isPlay = true;
				egret.Tween.removeTweens(this._sceneContainer);
				egret.Tween.get(this._sceneContainer).to({ scaleX: 1.7, scaleY: 1.7 }, 1000).call(() => {
					this.boxbtnClick()
				}, this).wait(100).call(() => {
					egret.Tween.removeTweens(this._sceneContainer);
					this._sceneContainer.setScale(1);
					this._isPlay = false;
				}, this);
			}, this);
			boxbtn.setPosition(buttombg.x + buttombg.width / 2 - boxbtn.width / 2, buttombg.y + buttombg.height - boxbtn.height - 55);
			this._sceneContainer.addChild(boxbtn);

			this._effect = ComponentManager.getCustomMovieClip("acwealthcarpview_idleeffect", 16, 100);
			let effectBM = BaseBitmap.create("acwealthcarpview_idleeffect1");
			this._effect.setPosition(GameConfig.stageWidth/ 2 - 105.5, boxbtn.y - 45);
			this._effect.blendMode = egret.BlendMode.ADD;
			this._sceneContainer.addChild(this._effect);
			this._effect.playWithTime(-1);

			let lookreward = BaseBitmap.create("acwealthcarpview_lookreward-" + this.getUiCode());
			lookreward.setPosition(boxbtn.x + boxbtn.width / 2 - lookreward.width / 2, boxbtn.y + boxbtn.height - lookreward.height / 2);
			this._sceneContainer.addChild(lookreward);
			lookreward.addTouchTap(() => {
				if (this._isPlay) {
					return;
				}
				this._isPlay = true;
				egret.Tween.removeTweens(this._sceneContainer);
				egret.Tween.get(this._sceneContainer).to({ scaleX: 1.7, scaleY: 1.7 }, 1000).call(() => {
					this.boxbtnClick()
				}, this).wait(100).call(() => {
					egret.Tween.removeTweens(this._sceneContainer);
					this._sceneContainer.setScale(1);
					this._isPlay = false;
				}, this);
			}, this)

			this._effectReward = BaseBitmap.create("acwealthcarpview_lookreward-" + this.getUiCode());
			this._effectReward.setPosition(lookreward.x, lookreward.y);
			this._sceneContainer.addChild(this._effectReward);
			this._effectReward.blendMode = egret.BlendMode.ADD;
			this._effectReward.alpha = 0.26;
			egret.Tween.get(this._effectReward, { loop: true }).to({ alpha: 0.05 }, 330).to({ alpha: 0.26 }, 330);

			if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && (Api.switchVoApi.checkOpenQingYuan("wonderLand") || Api.switchVoApi.checkOpenQingYuan("wonderLand2"))) {
				let openOtherBtn = ComponentManager.getButton("acwealthcarpview_openotherbtn-" + this.getUiCode(), "", () => {
					if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
						ViewController.getInstance().openViewByFunName("qingyuan");
					}
					else {
						App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip", [LanguageManager.getlocal("officialTitle" + Config.CareerCfg.getStoryNeedLv())]));
					}

				}, this);
				openOtherBtn.setPosition(this._bg.x + this._bg.width - 10 - openOtherBtn.width, this._bg.y + this._bg.height - 90 - openOtherBtn.height);
				this._sceneContainer.addChild(openOtherBtn);
			}
			this.tick();
			return;
		}

		let bgStr = "acwealthcarpview_bg";
		if (this.code != "1" && this.code != "2") {
			bgStr = "acwealthcarpview_bg-" + this.getUiCode();
		}
		let bg = BaseLoadBitmap.create(bgStr);
		bg.width = 640;
		bg.height = 1136;
		bg.y = GameConfig.stageHeigth - bg.height - this.getContainerY();
		this.addChildToContainer(bg);

		let titlebgStr = "acwealthcarpview_titlebg";
		if (this.code != "1" && this.code != "2") {
			titlebgStr = "acwealthcarpview_titlebg-" + this.getUiCode();
		}
		let titlebg = BaseLoadBitmap.create(titlebgStr);
		titlebg.width = 640;
		titlebg.height = 91;

		let topBgStr = "acwealthcarpview_topbg";
		if (this.code != "1") {
			topBgStr = "acwealthcarpview_topbg-" + this.getUiCode();
		}
		let topbg = BaseLoadBitmap.create(topBgStr);
		topbg.width = 640;
		topbg.height = 233;
		topbg.setPosition(titlebg.x, titlebg.y + titlebg.height - 7);
		this.addChildToContainer(topbg);
		this.addChildToContainer(titlebg);

		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		// this._effect.setScale(2);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(topbg.x + 103 - skinTxtEffectBM.width / 2, topbg.y + 160 - skinTxtEffectBM.height / 2);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(topbg.x + 103, topbg.y + 160);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


		let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(topbg.x + 103, topbg.y + 160);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);


		//透明点击区域
		let touchPos = BaseBitmap.create("public_alphabg");
		touchPos.width = 180;
		touchPos.height = 176;
		touchPos.setPosition(topbg.x, topbg.y);
		this.addChildToContainer(touchPos);
		touchPos.addTouchTap(() => {
			// ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPSERVANTSKINREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
			ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCARPWIFESKINREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
		}, this);

		let topTip = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewToptip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		topTip.setPosition(topbg.x + 225, topbg.y + 90);
		topTip.width = 320;
		this.addChildToContainer(topTip);

		let buttombg = BaseLoadBitmap.create("acwealthcarpview_buttombg");
		buttombg.width = 640;
		buttombg.height = 164;
		buttombg.setPosition(bg.x, bg.y + bg.height - buttombg.height);
		this.addChildToContainer(buttombg);

		let boxbtnStr = "acwealthcarpview_boxbtn";
		if (this.code != "1" && this.code != "2") {
			boxbtnStr = "acwealthcarpview_boxbtn-" + this.getUiCode();
		}
		let boxbtn = ComponentManager.getButton(boxbtnStr, null, this.boxbtnClick, this);
		boxbtn.setPosition(bg.x + bg.width / 2 - boxbtn.width / 2, bg.y + bg.height - boxbtn.height - 30);
		this.addChildToContainer(boxbtn);

		this._effect = ComponentManager.getCustomMovieClip("acwealthcarpview_effect", 20, 70);
		this._effect.setScale(2);
		this._effect.setPosition(boxbtn.x + boxbtn.width / 2 - 120, boxbtn.y + boxbtn.height / 2 - 114 - 10);
		this._effect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(this._effect);
		this._effect.playWithTime(-1);


		this._buttomtxtbg = BaseBitmap.create("acwealthcarpview_txtbg");
		this.addChildToContainer(this._buttomtxtbg);

		this._buttomtxt = ComponentManager.getTextField(LanguageManager.getlocal("acWealthCarpViewCountDown-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._buttomtxtbg.width = this._buttomtxt.width + 60;
		this._buttomtxtbg.setPosition(bg.x + bg.width / 2 - this._buttomtxtbg.width / 2, bg.y + bg.height - this._buttomtxtbg.height - 10);
		this._buttomtxt.setPosition(this._buttomtxtbg.x + this._buttomtxtbg.width / 2 - this._buttomtxt.width / 2, this._buttomtxtbg.y + this._buttomtxtbg.height / 2 - this._buttomtxt.height / 2);
		this.addChildToContainer(this._buttomtxt);

		let lookreward = BaseBitmap.create("acwealthcarpview_lookreward");
		lookreward.setPosition(this._buttomtxtbg.x + this._buttomtxtbg.width / 2 - lookreward.width / 2, this._buttomtxtbg.y - lookreward.height - 5);
		this.addChildToContainer(lookreward);

		this._effectReward = BaseBitmap.create("acwealthcarpview_lookreward");
		this._effectReward.setPosition(this._buttomtxtbg.x + this._buttomtxtbg.width / 2 - this._effectReward.width / 2, this._buttomtxtbg.y - this._effectReward.height - 5);
		this.addChildToContainer(this._effectReward);
		this._effectReward.blendMode = egret.BlendMode.ADD;
		this._effectReward.alpha = 0.26;
		egret.Tween.get(this._effectReward, { loop: true }).to({ alpha: 0.05 }, 330).to({ alpha: 0.26 }, 330);

		this._bg = bg;
		this.tick();
	}

	private boxbtnClick() {
		// ViewController.getInstance().openView(ViewConst.COMMON.ACWEALTHCARPREWARDVIEW, { aid: this.aid, code: this.code });
		let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		if (vo.checkIsInEndShowTime()) {
			this._isRequest = true;
			this.request(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, { activeId: vo.aidAndCode });
		}
		else {
			ViewController.getInstance().openView(ViewConst.COMMON.ACWEALTHCARPREWARDVIEW, { aid: this.aid, code: this.code });
		}

	}
	public tick() {
		let vo = <AcWealthCarpVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		if (Number(this.code) >= 5) {

			if (vo.checkIsInEndShowTime()) {
				this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
			}
			else {
				this._countDownTime.text = LanguageManager.getlocal("acWealthCarpViewCountDown-" + this.code, [vo.acCountDown]);
			}
			this._countDownTimeBg.width = 60 + this._countDownTime.width;
			this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
			this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
			if (vo.isShowRedDot) {
				this._effectReward.setVisible(true);
				this._effect.setVisible(true);
			}
			else {
				this._effectReward.setVisible(false);
				this._effect.setVisible(false);
			}
			return;
		}

		if (vo.checkIsInEndShowTime()) {
			this._buttomtxt.text = LanguageManager.getlocal("acWealthCarpViewAcTimeEnd-" + this.code);
		}
		else {
			this._buttomtxt.text = LanguageManager.getlocal("acWealthCarpViewCountDown-" + this.code, [vo.acCountDown]);
		}
		this._buttomtxtbg.width = this._buttomtxt.width + 60;
		this._buttomtxtbg.setPosition(this._bg.x + this._bg.width / 2 - this._buttomtxtbg.width / 2, this._bg.y + this._bg.height - this._buttomtxtbg.height - 10);
		this._buttomtxt.setPosition(this._buttomtxtbg.x + this._buttomtxtbg.width / 2 - this._buttomtxt.width / 2, this._buttomtxtbg.y + this._buttomtxtbg.height / 2 - this._buttomtxt.height / 2);



		if (vo.isShowRedDot) {
			this._effectReward.setVisible(true);
			this._effect.setVisible(true);
		}
		else {
			this._effectReward.setVisible(false);
			this._effect.setVisible(false);
		}

	}


	private rewardsNameHandle(event: egret.Event) {
		if (event.data.ret) {
			if (this._isRequest) {
				this._isRequest = false;
				let luckyinfo = event.data.data.data.luckyinfo;
				ViewController.getInstance().openView(ViewConst.COMMON.ACWEALTHCARPREWARDVIEW, { aid: this.aid, code: this.code, luckyinfo: luckyinfo });
			}
		}

	}
	protected getUiCode() {
		if (this.code == "4") {
			return "3";
		}
		return super.getUiCode();
	}

	protected getRuleInfo(): string {
		return "acWealthCarpViewRule-" + this.code;
	}
	protected getTitleBgName(): string {
		return null;
	}
	protected getTitleStr(): string {
		return null;
	}
	protected getResourceList(): string[] {
		let arr: string[] = [];
		if (this.code != "1" && this.code != "2") {
			arr = [
				"acwealthcarpview_boxbtn-" + this.getUiCode(),
				"acwealthcarpview_boxbtn-" + this.getUiCode() + "_down",
			]
			if (Number(this.code) >= 5) {
				arr = [
					"acwealthcarpview_boxbtn-" + this.getUiCode(),
					"acwealthcarpview_boxbtn-" + this.getUiCode() + "_down",
					"acwealthcarpview_lookreward-" + this.getUiCode(),
					"acwealthcarpview_openrewardbtn-" + this.getUiCode() + "_down",
					"acwealthcarpview_openrewardbtn-" + this.getUiCode(),
					"acwealthcarpview_openotherbtn-" + this.getUiCode() + "_down",
					"acwealthcarpview_openotherbtn-" + this.getUiCode(),
					Number(this.code) == 5 ? "acwealthcarpview_idleeffect" : "",
				];
			}
		}
		return super.getResourceList().concat([
			"acwealthcarpview_boxbtn_down", "acwealthcarpview_boxbtn", "progress7_bg", "progress7", "acwealthcarpview_effect", "acwealthcarpview_skineffect",
			"acwealthcarpview_common_add", "acwealthcarpview_common_frame"
		]).concat(arr);
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWEALTHCRAPLUCKYINFO, this.rewardsNameHandle, this);
		egret.Tween.removeTweens(this._effectReward);
		this._buttomtxtbg = null;
		this._buttomtxt = null;
		this._bg = null;
		this._effectReward = null;
		this._effect = null;
		this._countDownTime = null;
		this._countDownTimeBg = null;
		this._isPlay = false;
		this._isRequest = false;
		super.dispose();
	}

}