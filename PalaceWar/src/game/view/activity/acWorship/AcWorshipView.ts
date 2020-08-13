/**
  * 筑阁祭天活动view
  * @author 张朝阳
  * date 2019/5/22
  * @class AcWorshipView
  */
class AcWorshipView extends AcCommonView {


	private _oneNeedNumTF: BaseTextField = null;

	private _progressBar: ProgressBar = null;

	private _startPercent: number = 0;

	private _progressBM: BaseBitmap = null;

	private _progressLight: BaseBitmap = null;

	private _numTF: BaseTextField = null;

	private _boxBM: BaseBitmap = null;

	private _boxLightBM: BaseBitmap = null;

	private _redDot: BaseBitmap = null;

	private _countDownTime: BaseTextField = null;

	private _countDownTimeBg: BaseBitmap = null;

	private _chargeBtn: BaseButton = null;

	private _hammerEffect: CustomMovieClip = null;

	private _boxInfoList: { boxBM: BaseBitmap, isPlayAni: boolean, percent: number, itemCfg: Config.AcCfg.WorshipAchievementItemCfg }[] = [];

	private _speakStr: string = null;
	private _speakTF: BaseTextField = null;
	private _speakTail: BaseBitmap = null;
	private _speakBg: BaseBitmap = null;
	private _messageLength: number = 0;

	private _progressTF: BaseTextField = null;

	private _isPlay: boolean = false;

	private _handlerData: any = null;

	private _bulding1: BaseLoadBitmap = null;

	private _bulding2: BaseLoadBitmap = null;

	private _bulding3: BaseLoadBitmap = null;

	private _worker1: CustomMovieClip = null;

	private _worker2: CustomMovieClip = null;

	private _isPlayClip: boolean = false;
	private _isPlayLiHua: boolean = false;

	private _depth: number = 0;
	private _lihuaCfg = {
		1: { color: 'hong', pos: [26, 323], scale: 1.6, wait: 0 },
		2: { color: 'huang', pos: [266, 260], scale: 1.5, wait: 200 },
		3: { color: 'lan', pos: [26, 462], scale: 1.3, wait: 400 },
		4: { color: 'lan', pos: [376, 326], scale: 1.4, wait: 650 },
		5: { color: 'hong', pos: [150, 366], scale: 1, wait: 900 },
		6: { color: 'huang', pos: [480, 382], scale: 1.7, wait: 1100 },
		7: { color: 'hong', pos: [98, 524], scale: 1.85, wait: 1300 },
		8: { color: 'huang', pos: [282, 466], scale: 1.5, wait: 1500 },
		9: { color: 'lan', pos: [450, 528], scale: 1.6, wait: 1700 },
		10: { color: 'hong', pos: [338, 672], scale: 1.4, wait: 1900 },
		11: { color: 'huang', pos: [100, 716], scale: 1.5, wait: 2100 },
	};


	public constructor() {
		super();
	}
	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, this.worshipRewardsHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPACHIEVEMENT, this.achievementHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, this.refreshView, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		this._startPercent = vo.getItemValue() / cfg.getMaxAchievementValue();


		let bg = BaseLoadBitmap.create("acworshipview_bg-" + this.getUiCode());
		bg.width = 640;
		bg.height = 1136;
		bg.setPosition(0, GameConfig.stageHeigth - bg.height);
		this.addChildToContainer(bg);
		this._depth = this.container.getChildIndex(bg);

		this._bulding1 = BaseLoadBitmap.create("acworshipview_building1-" + this.getUiCode());
		this._bulding1.width = 636 ;
		this._bulding1.height = 344;
		this._bulding1.setPosition(bg.x + 18, bg.y + 753);
		this.addChildToContainer(this._bulding1);

		this._bulding2 = BaseLoadBitmap.create("acworshipview_building2-" + this.getUiCode());
		this._bulding2.width = 584;
		this._bulding2.height = 333;
		this._bulding2.setPosition(bg.x + 44, bg.y + 592);
		this.addChildToContainer(this._bulding2);

		this._bulding3 = BaseLoadBitmap.create("acworshipview_building3-" + this.getUiCode());
		this._bulding3.width = 594;
		this._bulding3.height = 294;
		this._bulding3.setPosition(bg.x + 44, bg.y + 375);
		this.addChildToContainer(this._bulding3);

		this._worker1 = ComponentManager.getCustomMovieClip("alliancetask_frame3", 6, 300);
		this._worker1.setPosition(bg.x + 92, bg.y + 810);
		this.addChildToContainer(this._worker1);
		this._worker1.playWithTime(-1);

		this._worker2 = ComponentManager.getCustomMovieClip("alliancetask_frame3", 6, 300);
		this._worker2.setPosition(bg.x + 334, bg.y + 668);
		this.addChildToContainer(this._worker2);
		this._worker2.playWithTime(-1);

		let titleBg = BaseLoadBitmap.create("acworshipview_titlebg-" + this.getUiCode());
		titleBg.width = 640;
		titleBg.height = 92;
		titleBg.setPosition(0, 0);

		let acDescBg = BaseLoadBitmap.create("acworshipview_common_acbg")
		acDescBg.width = 640;
		acDescBg.height = 130;
		acDescBg.setPosition(titleBg.x, titleBg.y + titleBg.height - 7);

		this.addChildToContainer(acDescBg);
		this.addChildToContainer(titleBg);

		let skinPreviewBtn = ComponentManager.getButton("acworshipview_rewardbtn-" + this.getUiCode(), null, this.skinPreviewBtnClick, this)
		skinPreviewBtn.setPosition(acDescBg.x + 8, acDescBg.y + acDescBg.height / 2 - skinPreviewBtn.height / 2);
		this.addChildToContainer(skinPreviewBtn);

		//活动时间
		let timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewAcTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeTF.width = 540;
		timeTF.setPosition(skinPreviewBtn.x + skinPreviewBtn.width + 6, acDescBg.y + 15);
		this.addChildToContainer(timeTF);

		let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		descTF.width = 540;
		descTF.lineSpacing = 5;
		descTF.setPosition(timeTF.x, timeTF.y + timeTF.height + 10);
		this.addChildToContainer(descTF)

		this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
		this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height / 2;
		this.addChildToContainer(this._countDownTimeBg);

		this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewCountDownTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
		this.addChildToContainer(this._countDownTime);



		this._chargeBtn = ComponentManager.getButton("acworshipview_common_chargebtn", null, () => {
			if (this._isPlay) {
				return;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPCHARGEPOPUPVIEW, { aid: this.aid, code: this.code });
		}, this)
		this._chargeBtn.setPosition(acDescBg.x + 15, acDescBg.y + acDescBg.height + 22);
		this.addChildToContainer(this._chargeBtn);

		let rewardbtn = ComponentManager.getButton("acworshipview_rewardbtn", null, () => {
			if (this._isPlay) {
				return;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
		}, this)
		rewardbtn.setPosition(this._chargeBtn.x, this._chargeBtn.y + this._chargeBtn.height + 15);
		this.addChildToContainer(rewardbtn);

		this._hammerEffect = ComponentManager.getCustomMovieClip("acworshipeffect_hammer", 5, 200);
		let hammerEffectBM = BaseBitmap.create("acworshipeffect_hammer1");
		this._hammerEffect.setPosition(GameConfig.stageWidth / 2 - hammerEffectBM.width / 2, GameConfig.stageHeigth / 2 - hammerEffectBM.height / 2);
		this.addChild(this._hammerEffect)
		this._hammerEffect.setVisible(false);

		this.initButtom();


		this.refreshView();
		this.refreshBulding();
		this.tick();
	}

	private initButtom() {
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let itemRewardVo = GameData.formatRewardItem(cfg.freeGet)[0];


		let buttombg = BaseLoadBitmap.create("arena_bottom");
		buttombg.width = 640;
		buttombg.height = 140;
		buttombg.setPosition(0, GameConfig.stageHeigth - buttombg.height);
		this.addChildToContainer(buttombg);


		//一次相关
		//按钮
		let oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.oneBtnClick, this)
		oneBtn.setPosition(85, buttombg.y + buttombg.height - oneBtn.height - 60);
		this.addChildToContainer(oneBtn);
		//按钮icon
		let oneBtnIcon = BaseLoadBitmap.create("itemicon" + itemRewardVo.id);
		oneBtnIcon.width = 35;
		oneBtnIcon.height = 35;
		oneBtnIcon.setPosition(oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 5, oneBtn.y + oneBtn.height / 2 - oneBtnIcon.height / 2);
		this.addChildToContainer(oneBtnIcon);
		//按钮文字
		let oneBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewBuyBtn-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		oneBtnIconTF.setPosition(oneBtnIcon.x - oneBtnIconTF.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconTF.height / 2);
		this.addChildToContainer(oneBtnIconTF);
		//按钮次数
		let oneBtnIconNum = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		oneBtnIconNum.setPosition(oneBtnIcon.x + oneBtnIcon.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconNum.height / 2);
		this.addChildToContainer(oneBtnIconNum);
		//元宝
		let oneGemBM = BaseBitmap.create("public_icon1")
		oneGemBM.width = 42;
		oneGemBM.height = 42;
		oneGemBM.setPosition(oneBtn.x + oneBtn.width / 2 - oneGemBM.width - 8, oneBtn.y + oneBtn.height - 3 + 10);
		this.addChildToContainer(oneGemBM);
		//需要元宝数量
		this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.gemCost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2 - 2);
		this.addChildToContainer(this._oneNeedNumTF);


		//十次相关
		//按钮
		let tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.tenBtnClick, this);
		tenBtn.setPosition(buttombg.x + buttombg.width - tenBtn.width - 90, buttombg.y + buttombg.height - tenBtn.height - 60);
		this.addChildToContainer(tenBtn);
		//按钮图片
		let tenBtnIcon = BaseLoadBitmap.create("itemicon" + itemRewardVo.id);
		tenBtnIcon.width = 35;
		tenBtnIcon.height = 35;
		tenBtnIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 5, tenBtn.y + tenBtn.height / 2 - tenBtnIcon.height / 2);
		this.addChildToContainer(tenBtnIcon);
		//按钮文字
		let tenBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewBuyBtn-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		tenBtnIconTF.setPosition(tenBtnIcon.x - tenBtnIconTF.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconTF.height / 2);
		this.addChildToContainer(tenBtnIconTF);
		//按钮次数
		let tenBtnIconNum = ComponentManager.getTextField("X10", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		tenBtnIconNum.setPosition(tenBtnIcon.x + tenBtnIcon.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconNum.height / 2);
		this.addChildToContainer(tenBtnIconNum);
		//元宝
		let tenGemBM = BaseBitmap.create("public_icon1")
		tenGemBM.width = 42;
		tenGemBM.height = 42;
		tenGemBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenGemBM.width - 8, tenBtn.y + tenBtn.height - 3 + 10);
		this.addChildToContainer(tenGemBM);
		//需要元宝数量
		let tenNeedGemTF = ComponentManager.getTextField(String(Math.round(cfg.gemCost * 10 * cfg.discount)), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2 - 2);
		this.addChildToContainer(tenNeedGemTF);

		let progressbg = BaseLoadBitmap.create("luckdrawprogressbg-1");
		progressbg.width = 640;
		progressbg.height = 107;
		progressbg.setPosition(0, buttombg.y - progressbg.height);
		this.addChildToContainer(progressbg);

		//进度条
		this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 435);
		this._progressBar.setPosition(progressbg.x + progressbg.width / 2 - this._progressBar.width / 2 - 10, progressbg.y + progressbg.height / 2 - this._progressBar.height / 2);
		this.addChildToContainer(this._progressBar);
		this._progressBar.setPercentage(this._startPercent);

		let progressNumber = cfg.getMaxAchievementValue();
		this._progressTF = ComponentManager.getTextField(vo.getItemValue() + "/" + progressNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 12);
		this.addChildToContainer(this._progressTF);

		this._progressBM = BaseBitmap.create("acworshipview_slider");
		this._progressBM.anchorOffsetX = this._progressBM.width / 2;
		this._progressBM.anchorOffsetY = this._progressBM.height;
		let posWidthValue: number = this._startPercent >= 1 ? 1 : this._startPercent;
		this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
		this.addChildToContainer(this._progressBM);



		this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
		this._progressLight.anchorOffsetX = this._progressLight.width;
		this._progressLight.anchorOffsetY = this._progressLight.height / 2;
		this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y + this._progressBar.height / 2);
		this.addChildToContainer(this._progressLight);
		this._progressLight.setVisible(false);

		//次数this._bg
		let numbg = BaseBitmap.create("acwealthcomingview_numbg");
		numbg.setPosition(this._progressBar.x + 12 - numbg.width, this._progressBar.y + this._progressBar.height / 2 - numbg.height / 2);
		this.addChildToContainer(numbg);


		//数量TF
		let numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewNumDesc-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
		numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 28);
		this.addChildToContainer(numDescTF);

		//数量TF
		this._numTF = ComponentManager.getTextField("9999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
		this._numTF.width = 60;
		this._numTF.textAlign = egret.HorizontalAlign.CENTER;
		this._numTF.setPosition(numDescTF.x + numDescTF.width / 2 - this._numTF.width / 2, numDescTF.y + numDescTF.height + 2);
		this.addChildToContainer(this._numTF);

		//奖励宝箱
		this._boxBM = BaseBitmap.create("acwealthcomingview_box_1");
		this._boxBM.anchorOffsetX = this._boxBM.width / 2;
		this._boxBM.anchorOffsetY = this._boxBM.height;
		this._boxBM.setPosition(this._progressBar.x + this._progressBar.width + this._boxBM.width / 2 + 22, this._progressBar.y + this._progressBar.height / 2 + this._boxBM.height / 2 - 3);
		this.addChildToContainer(this._boxBM);
		this._boxBM.addTouchTap(() => {
			ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPACHIEVEMENTPOPUPVIEW, { aid: this.aid, code: this.code });
		}, this);
		//宝箱光 584 816  582.5 810
		this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
		this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
		this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxBM.width / 2 + 3;
		this._boxLightBM.setPosition(this._boxBM.x, this._boxBM.y);
		this.addChildToContainer(this._boxLightBM);
		this._boxLightBM.alpha = 0;

		//红点	
		this._redDot = BaseBitmap.create("public_dot2");
		this._redDot.setPosition(this._boxBM.x + this._boxBM.width / 2 - this._redDot.width / 2, this._boxBM.y - this._boxBM.height + this._redDot.height / 2)
		this.addChildToContainer(this._redDot);
		if (vo.checkAchievementRedDot()) {
			this._boxBM.setRes("acwealthcomingview_box_2")
			this._redDot.setVisible(true);
		}
		else {
			this._boxBM.setRes("acwealthcomingview_box_1")
			this._redDot.setVisible(false);
		}

		//文字
		let boxWordBM = BaseBitmap.create("acworshipview_word")
		boxWordBM.setPosition(this._boxBM.x - boxWordBM.width / 2, this._boxBM.y - boxWordBM.height / 2 - 3);
		this.addChildToContainer(boxWordBM);

		this.initBox();
	}

	/**初始化宝箱相关 */
	private initBox() {
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		this._boxInfoList = [];
		let procsscfg = cfg.worshipAchievementItemCfgList;
		procsscfg.sort((a, b) => {
			return a.needNum - b.needNum;
		})
		for (let i = 0; i < procsscfg.length; i++) {
			let itemCfg = procsscfg[i];
			let value = itemCfg.needNum;
			let v = procsscfg[procsscfg.length - 1].needNum;
			let p = value / v;
			let boxBM = BaseBitmap.create("acworshipview_box3");
			boxBM.anchorOffsetX = boxBM.width / 2;
			boxBM.anchorOffsetY = boxBM.height / 2;
			boxBM.setPosition(this._progressBar.x + this._progressBar.width * p, this._progressBar.y + this._progressBar.height / 2 - 7);
			this.addChildToContainer(boxBM);
			boxBM.addTouchTap(() => {
				ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPACHIEVEMENTPOPUPVIEW, { aid: this.aid, code: this.code, id: itemCfg.id });
			}, this);
			let isPlayAni: boolean = vo.getItemValue() >= value ? false : true;
			let percent = Math.round(p * 1000);
			let boxInfo = { boxBM: boxBM, isPlayAni: isPlayAni, percent: percent, itemCfg: itemCfg }
			this._boxInfoList.push(boxInfo);


			if (procsscfg.length - 1 == i) {

				this._speakStr = LanguageManager.getlocal("acWorshipViewSpeakTip-" + this.code);
				this._speakTF = ComponentManager.getTextField(this._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
				this._speakTail = BaseBitmap.create("public_9_bg25_tail");

				this._speakBg = BaseBitmap.create("public_9_bg25");
				this._speakBg.width = this._speakTF.width + 40;
				let posX = boxBM.x;
				if (posX + this._speakBg.width + 5 > GameConfig.stageWidth) {
					posX = GameConfig.stageWidth - this._speakBg.width - 15;
				}

				this._speakBg.setPosition(posX, boxBM.y - boxBM.height / 2 - this._speakBg.height - this._speakTail.height + 5);
				this.addChildToContainer(this._speakBg);

				this._speakTF.setPosition(this._speakBg.x + this._speakBg.width / 2 - this._speakTF.width / 2, this._speakBg.y + this._speakBg.height / 2 - this._speakTF.height / 2);
				this.addChildToContainer(this._speakTF);

				this._speakTail.skewY = 180
				this._speakTail.setPosition(boxBM.x, boxBM.y - boxBM.height / 2 - this._speakTail.height);
				this.addChildToContainer(this._speakTail);


				egret.Tween.get(this._speakBg, { loop: true }).call(() => {
					this._speakTF.text = "";
					this._speakTail.setVisible(true);
					this._speakTF.setVisible(true);
					this._speakBg.setVisible(true);
					this._messageLength = 0;
					egret.Tween.get(this._speakTF, { loop: true }).wait(75).call(() => {
						this._speakTF.text = this._speakStr.substr(0, this._messageLength);
						this._messageLength++;
					}, this);
				}, this).wait(this._speakStr.length * 75 + 3000).call(() => {
					this._speakTail.setVisible(false);
					this._speakTF.setVisible(false);
					this._speakBg.setVisible(false);
					this._messageLength = 0;
					egret.Tween.removeTweens(this._speakTF);
				}, this).wait(10000);
			}
		}

		this.refreshBanger(this._startPercent)
	}

	/**刷新 宝箱 */
	private refreshBanger(percent: number) {
		let percentTmp = Math.round(percent * 1000)
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		for (let i = 0; i < this._boxInfoList.length; i++) {
			let boxInfo = this._boxInfoList[i];
			if (percentTmp >= boxInfo.percent) {
				if (vo.checkRewardFlag(Number(boxInfo.itemCfg.id))) {
					boxInfo.boxBM.setRes("acworshipview_box3");
				}
				else {
					boxInfo.boxBM.setRes("acworshipview_box1");
				}

				if (boxInfo.isPlayAni) {
					boxInfo.isPlayAni = false;
					//播放动画
					this.playBangerAni(boxInfo.boxBM, boxInfo.boxBM.x, boxInfo.boxBM.y, this._boxBM.x, this._boxBM.y - this._boxBM.height / 2, );
				}
			}
			else {
				boxInfo.boxBM.setRes("acworshipview_box2");
			}
			if (this._boxInfoList.length - 1 == i) {
				if (vo.checkRewardFlag(Number(boxInfo.itemCfg.id))) {
					this._speakTail.alpha = 0;
					this._speakTF.alpha = 0;
					this._speakBg.alpha = 0;
				}
			}
		}
	}

	/**刷新ui */
	private refreshView() {
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		this._numTF.text = String(vo.getItemValue());
		let progressNumber = cfg.getMaxAchievementValue();


		if (vo.getItemValue() <= progressNumber) {
			this._progressTF.text = vo.getItemValue() + "/" + progressNumber;
		}
		else {
			this._progressTF.text = LanguageManager.getlocal("acWorshipViewLotteryEndTip-" + this.code);
		}
		this._progressTF.x = this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2;

		if (vo.isFree() && (!vo.checkIsInEndShowTime())) {
			this._oneNeedNumTF.text = LanguageManager.getlocal("acWorshipViewFree-" + this.code);
		}
		else {
			this._oneNeedNumTF.text = String(cfg.gemCost);
		}
		if (!vo.checkAchievementRedDot()) {
			this._boxBM.setRes("acwealthcomingview_box_1");
			this._redDot.setVisible(false);
		}
		if (vo.checkRechargeRedDot()) {
			App.CommonUtil.addIconToBDOC(this._chargeBtn);
		}
		else {
			App.CommonUtil.removeIconFromBDOC(this._chargeBtn);
		}
	}

	private refreshBulding() {
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.getItemValue() < 33) {
			this._bulding1.setVisible(true);
			this._bulding2.setVisible(true);
			this._bulding3.setVisible(true);
			this._worker1.setVisible(true);
			this._worker2.setVisible(true);
		}
		else if (vo.getItemValue() < 66) {
			this._bulding1.setVisible(true);
			this._bulding2.setVisible(true);
			this._bulding3.setVisible(false);
			this._worker1.setVisible(true);
			this._worker2.setVisible(true);
		}
		else if (vo.getItemValue() < 99) {
			this._bulding1.setVisible(true);
			this._bulding2.setVisible(false);
			this._bulding3.setVisible(false);
			this._worker1.setVisible(true);
			this._worker2.setVisible(false);
		}
		else {
			this._bulding1.setVisible(false);
			this._bulding2.setVisible(false);
			this._bulding3.setVisible(false);
			this._worker1.setVisible(false);
			this._worker2.setVisible(false);
		}
		if (vo.getItemValue() >= cfg.getMaxAchievementValue() && this._isPlayLiHua == false) {
			this._isPlayLiHua = true;
			this.showLihua();
		}
	}
	/**tick */
	private tick() {
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.checkIsInEndShowTime()) {
			this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
		}
		else {
			this._countDownTime.text = LanguageManager.getlocal("acWorshipViewCountDownTime-" + this.code, [vo.acCountDown]);
		}
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);

	}
	/**一次抽奖 */
	private oneBtnClick() {
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (this._isPlay) {
			return;
		}
		if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
			if (vo.isFree()) {
				this._isPlay = true;
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, { activeId: vo.aidAndCode, isFree: 1, isTenPlay: 0 });

			}
			else {
				let cost = cfg.gemCost;
				if (Api.playerVoApi.getPlayerGem() < cost) {
					App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
					return;
				}
				this._isPlay = true;
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, { activeId: vo.aidAndCode, isFree: 0, isTenPlay: 0 });

			}
		}
		else {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
	}
	/**十次抽奖 */
	private tenBtnClick() {
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (this._isPlay) {
			return;
		}
		if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
			let cost = Math.round(cfg.gemCost * 10 * cfg.discount);
			if (Api.playerVoApi.getPlayerGem() < cost) {
				App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
				return;
			}
			this._isPlay = true;
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, { activeId: vo.aidAndCode, isFree: 0, isTenPlay: 1 });
		}
		else {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
	}
	/**皮肤奖励 */
	private skinPreviewBtnClick() {
		// ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPSKINREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let topMsg = LanguageManager.getlocal("acWorshipreporTopMsg");
		ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, {titleIds: [cfg.show[0]], bgType:3, topMsg:topMsg});
	}
	/**抽奖回调 */
	private worshipRewardsHandle(event: egret.Event) {
		if (event.data.ret) {

			this._handlerData = event.data.data.data;
			this._hammerEffect.setVisible(true);
			this._hammerEffect.playWithTime(1);
			this._hammerEffect.setEndCallBack(() => {
				this._hammerEffect.setVisible(false);
				ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPGETREWARDPOPUPVIEW, {
					rewards: this._handlerData.rewards, otherRewards: this._handlerData.otherrewards, criArr: this._handlerData.criArr, code: this.code, aid: this.aid, isPlayAni: true, callback: () => {
						let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
						let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
						this._isPlay = false;
						this.refreshBulding();
						if (this._startPercent < 1) {
							let endPercent = vo.getItemValue() / cfg.getMaxAchievementValue();
							this.playProgressBarAni(this._startPercent, endPercent, 0.005);
						}
					}, handler: this
				});

			}, this);

		}
	}

	private achievementHandle(event: egret.Event) {
		this.refreshBanger(this._startPercent);
	}
	/**
	 * 进度条的动画
	 */
	private playProgressBarAni(startPercent: number, endPercent: number, speed: number) {

		//每次初始化
		this._progressBar.setPercentage(startPercent);
		egret.Tween.removeTweens(this._progressBar);
		let posWidthValue: number = this._startPercent >= 1 ? 1 : this._startPercent;
		this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
		this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y + this._progressBar.height / 2);

		let startTemp = Math.round(startPercent * 1000);
		let endTemp = Math.round(endPercent * 1000);
		let maxTemp = Math.round(1 * 1000);
		let everyTimeValue = speed;

		egret.Tween.get(this._progressBar, { loop: true }).wait(0.1).call(() => {
			this._progressLight.setVisible(true);
			//增量动画
			startPercent += everyTimeValue;
			// this.refreshBanger(startPercent);
			startTemp = Math.round(startPercent * 1000);
			if (startTemp > endTemp) {
				egret.Tween.removeTweens(this._progressBar);
				this._progressLight.setVisible(false);
				if (startTemp > maxTemp) {
					egret.Tween.removeTweens(this._progressBar);
					this._progressLight.setVisible(false);
					return;
				}
				else {
					this._isPlay = false;
				}
				return;
			}
			this.refreshBanger(startPercent);
			this._progressBar.setPercentage(startPercent);
			let posWidthValue: number = this._startPercent >= 1 ? 1 : this._startPercent;
			this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
			this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y + this._progressBar.height / 2);
			this._startPercent = startPercent;

		}, this)

	}

	/**鞭炮的动画 */
	private playBangerAni(bangerBM: BaseBitmap, startPosX: number, startPosY: number, endPosX: number, endPosY: number) {
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		// bangerBM.setVisible(false);
		let boomEffect = ComponentManager.getCustomMovieClip("boxboomeffect", 8, 70);
		let boom = BaseBitmap.create("boxboomeffect1");
		boomEffect.setScale(1.25);
		boom.setScale(1.25);
		boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2);
		this.addChildToContainer(boomEffect);
		boomEffect.playWithTime(1);
		boomEffect.setEndCallBack(() => {
			this.container.removeChild(boomEffect);
			boomEffect.dispose();
			let lightBall = BaseBitmap.create("acwealthcomingview_lightball")
			lightBall.anchorOffsetX = lightBall.width / 2;
			lightBall.anchorOffsetY = lightBall.height / 2;
			//oneone模式
			lightBall.blendMode = egret.BlendMode.ADD;
			this.addChildToContainer(lightBall);
			lightBall.alpha = 0;
			lightBall.setPosition(startPosX, startPosY);
			lightBall.alpha = 1;
			lightBall.setScale(0.1);
			lightBall.rotation = 0;
			let distanceX = endPosX - startPosX;
			let distanceY = endPosY - startPosY;
			egret.Tween.get(lightBall).to({
				rotation: 360 * 0.14,
				scaleX: 0.8,
				scaleY: 0.8,
				x: startPosX + distanceX * 0.3,
				y: startPosY + distanceY * 0.3
			}, 140).to({
				rotation: 360 * 0.54,
				scaleX: 1,
				scaleY: 1,
				x: startPosX + distanceX * 1,
				y: startPosY + distanceY * 1
			}, 400).call(() => {
				if (vo.checkAchievementRedDot()) {
					this._boxBM.setRes("acwealthcomingview_box_2");
				}
				else {
					this._boxBM.setRes("acwealthcomingview_box_1");
				}
				this._redDot.setVisible(false);
				this._boxBM.setScale(1.1);
				this._boxLightBM.setScale(1.1);
				this._boxLightBM.alpha = 1;
				egret.Tween.get(this._boxBM).to({
					scaleX: 1,
					scaleY: 1,
				}, 750).call(() => {
					if (vo.checkAchievementRedDot()) {
						this._redDot.setVisible(true);
					}
					else {
						this._redDot.setVisible(false);
					}
					// egret.Tween.removeTweens(this._boxBM);
					bangerBM.setVisible(true);
				}, this);
				egret.Tween.get(this._boxLightBM).to({
					scaleX: 1,
					scaleY: 1,
					alpha: 0,
				}, 750).call(() => {
					// egret.Tween.removeTweens(this._boxLightBM);
				}, this);
			}, this).to({
				scaleX: 1.3,
				scaleY: 1,
				rotation: 360 * 1,
				alpha: 0,
			}, 460).call(() => {
				egret.Tween.removeTweens(lightBall);
				this.container.removeChild(lightBall);
				lightBall.dispose();
			}, this);

		}, this);
	}


	private showLihua(): void {

		let index = Math.floor(Math.random() * 11);
		let item = this._lihuaCfg[index];
		if (item) {
			let lihuaclip = ComponentManager.getCustomMovieClip(`lihua_${item.color}000`, 9, 115);
			lihuaclip.setScale(item.scale);
			lihuaclip.x = item.pos[0];
			lihuaclip.y = GameConfig.stageHeigth - 1136 + item.pos[1];

			this.container.addChildAt(lihuaclip, this._depth + 1);
			lihuaclip.playWithTime(1);
			lihuaclip.setEndCallBack(() => {
				this.showLihua();
				this.container.removeChild(lihuaclip);
			}, this);
		}
		else {
			this.showLihua();
		}
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"acworshipview-" + this.getUiCode(), "progress12", "progress12_bg", "acworshipview_slider", "acwealthcomingview_progresslight", "acwealthcomingview_numbg", "acworshipview_box1", "acworshipview_box2",
			"acworshipview_box3", "acworshipview_word", "acwealthcomingview_box_light", "acworshipview_rewardbtn", "acworshipview_common_chargebtn", "progress5", "progress3_bg", "accarnivalview_tab_green", "accarnivalview_tab_red",
			"acwealthcomingview_box_1", "acwealthcomingview_box_2", "acworshipeffect_hammer", "alliancetask_frame3", "boxboomeffect"

		]);
	}
	protected getBgName(): string {
		return null;
	}

	protected getTitleBgName(): string {
		return null;
	}
	protected getRuleInfo(): string {
		return "acWorshipViewRuleInfo-" + this.code;
	}
	protected getProbablyInfo(): string {
		return "acWorshipViewProbablyInfo-" + this.code;
	}
	protected getUiCode(): string {
		super.getUiCode
		if (this.code == "2") {
			return "1";
		}
		return super.getUiCode();
	}
	/**
	* 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	*/
	protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
		return { title: { key: `acWorshipreporttitle-${this.code}` }, msg: { key: `acWorshipreportkey-${this.code}` } };
	}
	protected getTitleStr(): string {
		return null;
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, this.worshipRewardsHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPACHIEVEMENT, this.achievementHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, this.refreshView, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		this._oneNeedNumTF = null;
		this._progressBar = null;
		this._startPercent = 0;
		this._progressBM = null;
		this._progressLight = null;
		this._numTF = null;
		this._boxBM = null;
		this._boxLightBM = null;
		this._redDot = null;
		this._countDownTime = null;
		this._countDownTimeBg = null;
		this._chargeBtn = null;
		this._hammerEffect = null;
		this._boxInfoList = [];
		this._speakStr = null;
		this._speakTF = null;
		this._speakTail = null;
		this._speakBg = null;
		this._messageLength = 0;
		this._progressTF = null;
		this._isPlay = false;
		this._handlerData = null;
		this._bulding1 = null;
		this._bulding2 = null;
		this._bulding3 = null;
		this._worker1 = null;
		this._worker2 = null;
		this._isPlayClip = false;
		this._isPlayLiHua = false;
		this._depth = 0;
		super.dispose();
	}

}