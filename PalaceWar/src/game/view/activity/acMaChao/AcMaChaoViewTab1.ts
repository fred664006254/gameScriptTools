/**
  * 马超活动Tab1
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoViewTab1
  */
class AcMaChaoViewTab1 extends AcCommonViewTab {


	private _buttomBg: BaseLoadBitmap = null;
	private _oneNeedNumTF: BaseTextField = null;
	private _isPlayAni: boolean = false;
	/**是否十连抽 */
	private _isTen: boolean = false;

	private _isShake: boolean = false;

	private _enemyList: BaseLoadBitmap[] = [];
	/**士兵1 */
	private _assaultList1: CustomMovieClip[] = [];
	/**士兵2 */
	private _assaultList2: CustomMovieClip[] = [];
	/**士兵1 */
	private _assaultList3: CustomMovieClip[] = [];

	private rewards: any = null;
	private otherRewards: any = null;

	private _npcBM: BaseLoadBitmap = null;

	private _enemyContainer: BaseDisplayObjectContainer = null;

	private _npcClip1: CustomMovieClip = null;

	private _npcClip2: CustomMovieClip = null;

	private _timeTF: BaseTextField = null;

	private _timeBg: BaseBitmap = null;

	private _textbg: BaseBitmap = null;
	private _textBM: BaseBitmap = null;
	private _killText: BaseBitmapText | BaseTextField = null;

	private _enemyPosCfg: { x: number, y: number, width: number, height: number }[] = [
		{ x: 404, y: 509, width: 126, height: 97 },
		{ x: 297, y: 540, width: 126, height: 97 },
		{ x: 170, y: 578, width: 144, height: 79 },
		{ x: 512, y: 553, width: 128, height: 78 },
		{ x: 413, y: 604, width: 123, height: 72 },
		{ x: 297, y: 641, width: 143, height: 76 },
	];
	/**特效配置1 */
	private _assaultCfg1: { x: number, y: number, alpha: number, scale: number }[] = [
		{ x: -217, y: 313, alpha: 0, scale: 1 },
		{ x: -137, y: 295, alpha: 0, scale: 1 },
		{ x: -39, y: 294, alpha: 0, scale: 1 },
		{ x: 11, y: 246, alpha: 0, scale: 1 },
		{ x: 103, y: 238, alpha: 0, scale: 1 },
	];
	/**特效配置2 */
	private _assaultCfg2: { x: number, y: number, alpha: number, scale: number }[] = [
		{ x: -180, y: 345, alpha: 1, scale: 0.985 },
		{ x: -101, y: 327, alpha: 1, scale: 0.985 },
		{ x: -3, y: 326, alpha: 1, scale: 0.985 },
		{ x: 47, y: 278, alpha: 1, scale: 0.985 },
		{ x: 139, y: 270, alpha: 1, scale: 0.985 },
	];

	/**特效配置3 */
	private _assaultCfg3: { x: number, y: number, alpha: number, scale: number }[] = [
		{ x: 184, y: 605, alpha: 1, scale: 0.87 },
		{ x: 264, y: 587, alpha: 1, scale: 0.87 },
		{ x: 362, y: 586, alpha: 1, scale: 0.87 },
		{ x: 412, y: 538, alpha: 1, scale: 0.87 },
		{ x: 504, y: 530, alpha: 1, scale: 0.87 },
	];

	/**特效配置4 */
	private _assaultCfg4: { x: number, y: number, alpha: number, scale: number }[] = [
		{ x: 298, y: 689, alpha: 1, scale: 0.84 },
		{ x: 378, y: 671, alpha: 1, scale: 0.84 },
		{ x: 476, y: 670, alpha: 1, scale: 0.84 },
		{ x: 526, y: 622, alpha: 1, scale: 0.84 },
		{ x: 618, y: 614, alpha: 1, scale: 0.84 },
	];

	/**特效配置5 */
	private _assaultCfg5: { x: number, y: number, alpha: number, scale: number }[] = [
		{ x: 413, y: 762, alpha: 0, scale: 0.8 },
		{ x: 493, y: 754, alpha: 0, scale: 0.8 },
		{ x: 591, y: 753, alpha: 0, scale: 0.8 },
		{ x: 641, y: 705, alpha: 0, scale: 0.8 },
		{ x: 733, y: 733, alpha: 0, scale: 0.8 },
	];

	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}
	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOLOTTERY, this.lotteryHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOGETRANK, this.rankClickHandler, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, this.playEnemyShakeAni, this);
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let timebg = BaseBitmap.create("public_9_bg8");
		timebg.width = GameConfig.stageWidth;
		this.addChild(timebg);

		let timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeTF.setPosition(GameConfig.stageWidth / 2 - timeTF.width / 2, timebg.y + timebg.height / 2 - timeTF.height / 2);
		this.addChild(timeTF);

		let rewardBtn = ComponentManager.getButton("acmachaoviewrewardbtn-" + this.getUiCode(), null, () => {
			ViewController.getInstance().openView(ViewConst.POPUP.ACMACHAOREWARDPOOLPOPUPVIEW, { code: this.code, aid: this.aid });
		}, this);
		rewardBtn.setPosition(timebg.x + 10, timebg.y + timebg.height + 15);
		this.addChild(rewardBtn);

		let rankBtn = ComponentManager.getButton("dragonboatrank", null, () => {
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_MACHAOGETRANK, { "activeId": vo.aidAndCode });
		}, this);
		rankBtn.setPosition(rewardBtn.x + rewardBtn.width / 2 - rankBtn.width / 2, rewardBtn.y + rewardBtn.height + 20);
		this.addChild(rankBtn);

		this._buttomBg = BaseLoadBitmap.create("acmachaoview_common_buttombg");
		this._buttomBg.width = 640;
		this._buttomBg.height = 139;
		this._buttomBg.setPosition(0, GameConfig.stageHeigth - this.getViewTitleButtomY() - this._buttomBg.height);
		this.addChild(this._buttomBg);

		this._textbg = BaseBitmap.create("acmazeview_textbg");
		this._textbg.setPosition(this._buttomBg.x + 160, this._buttomBg.y - this._textbg.height - 50);
		this.addChild(this._textbg);

		this._textBM = BaseBitmap.create("acmachaoview_common_text");
		this._textBM.anchorOffsetX = this._textBM.width / 2;
		this._textBM.anchorOffsetY = this._textBM.height / 2;
		this._textBM.setPosition(this._textbg.x + this._textbg.width / 2 - 15, this._textbg.y + this._textbg.height / 2 - 20);
		this.addChild(this._textBM);
		//
		this._killText = ComponentManager.getBitmapText(String(vo.getMaChaoValue()), TextFieldConst.FONTNAME_ITEMTIP);
		this._killText.anchorOffsetX = this._killText.width / 2;
		this._killText.anchorOffsetY = this._killText.height / 2;
		this._killText.rotation = -24;
		this._killText.setPosition(this._textBM.x + 10, this._textBM.y + this._textBM.height / 2 - 6);
		this.addChild(this._killText);

		this.initBtn();
		this.initEnemy()
		this.initAssault();




		this._npcBM = BaseLoadBitmap.create("acmachaoview_npc-" + this.getUiCode());
		this._npcBM.width = 493;
		this._npcBM.height = 417;
		this._npcBM.setPosition(this._buttomBg.x + this._buttomBg.width - this._npcBM.width, this._buttomBg.y - this._npcBM.height);
		this.addChild(this._npcBM);

		this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = 41;
		this.addChild(this._timeBg);

		this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTopTip2-1", [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._timeTF.width;
		this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
		this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);
		this.addChild(this._timeTF);


		let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById("2017");
            if(servantCfg.quality2)
			{	
				let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
				cornerImg.x = 555;
				cornerImg.y = GameConfig.stageHeigth - 445;
				cornerImg.setScale(1.3);
				this.addChild(cornerImg);
			}

		TickManager.addTick(this.tick, this);
		this.tick();

		this.refreshView();
	}
	private tick() {
		let vo = <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.checkIsInEndShowTime()) {
			this._timeTF.text = LanguageManager.getlocal("acPunishEnd");
		}
		else {
			this._timeTF.text = LanguageManager.getlocal("acLuckyDrawTopTip2-1", [vo.acCountDown]);
		}
		this._timeBg.width = 60 + this._timeTF.width;
		this._timeBg.x = GameConfig.stageWidth / 2 - this._timeBg.width / 2;
		this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);

	}
	/**初始化btn */
	private initBtn() {
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let rewardId = GameData.formatRewardItem(cfg.getReward)[0].id;
		//一次相关
		let oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", () => {
			if (vo.checkIsInEndShowTime()) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			if (Api.playerVoApi.getPlayerGem() < cfg.cost && (!vo.isFree())) {
				App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
				return;
			}
			if (this._isPlayAni) {
				return;
			}
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_MACHAOLOTTERY, { "activeId": vo.aidAndCode, "isTenPlay": 0 });
			this._isPlayAni = true;
			this._isTen = false;
		}, this)
		oneBtn.setPosition(85, this._buttomBg.y + this._buttomBg.height / 2 - oneBtn.height / 2);
		this.addChild(oneBtn);

		let oneBtnIcon = BaseLoadBitmap.create("itemicon" + rewardId);
		oneBtnIcon.width = 35;
		oneBtnIcon.height = 35;
		oneBtnIcon.setPosition(oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 5, oneBtn.y + oneBtn.height / 2 - oneBtnIcon.height / 2);
		this.addChild(oneBtnIcon);

		let oneBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewBuy-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
		oneBtnIconTF.setPosition(oneBtnIcon.x - oneBtnIconTF.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconTF.height / 2);
		this.addChild(oneBtnIconTF);

		let oneBtnIconNum = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
		oneBtnIconNum.setPosition(oneBtnIcon.x + oneBtnIcon.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconNum.height / 2);
		this.addChild(oneBtnIconNum);

		let oneGemBM = BaseBitmap.create("public_icon1")
		oneGemBM.width = 42;
		oneGemBM.height = 42;
		oneGemBM.setPosition(oneBtn.x + oneBtn.width / 2 - oneGemBM.width, oneBtn.y - oneGemBM.height + 5);
		this.addChild(oneGemBM);

		this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.cost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2);
		this.addChild(this._oneNeedNumTF);

		let useOneTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewUseOne-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		useOneTF.setPosition(oneBtn.x + oneBtn.width / 2 - useOneTF.width / 2, oneBtn.y + oneBtn.height + 5);
		this.addChild(useOneTF);

		//十次相关
		let tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", () => {
			if (vo.checkIsInEndShowTime()) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			if (Api.playerVoApi.getPlayerGem() < cfg.cost * 10 * cfg.discount) {
				App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
				return;
			}
			if (this._isPlayAni) {
				return;
			}
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_MACHAOLOTTERY, { "activeId": vo.aidAndCode, "isTenPlay": 1 })
			this._isPlayAni = true;
			this._isTen = true;
		}, this);
		tenBtn.setPosition(GameConfig.stageWidth - tenBtn.width - 90, oneBtn.y);
		this.addChild(tenBtn);


		let tenBtnIcon = BaseLoadBitmap.create("itemicon" + rewardId);
		tenBtnIcon.width = 35;
		tenBtnIcon.height = 35;
		tenBtnIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 5, tenBtn.y + tenBtn.height / 2 - tenBtnIcon.height / 2);
		this.addChild(tenBtnIcon);

		let tenBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewBuy-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
		tenBtnIconTF.setPosition(tenBtnIcon.x - tenBtnIconTF.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconTF.height / 2);
		this.addChild(tenBtnIconTF);

		let tenBtnIconNum = ComponentManager.getTextField("X10", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
		tenBtnIconNum.setPosition(tenBtnIcon.x + tenBtnIcon.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconNum.height / 2);
		this.addChild(tenBtnIconNum);

		let tenGemBM = BaseBitmap.create("public_icon1")
		tenGemBM.width = 42;
		tenGemBM.height = 42;
		tenGemBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenGemBM.width, tenBtn.y - tenGemBM.height + 5);
		this.addChild(tenGemBM);

		let tenNeedGemTF = ComponentManager.getTextField(String(cfg.cost * 10 * cfg.discount), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2);
		this.addChild(tenNeedGemTF);

		let useTenTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewUseTen-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		useTenTF.setPosition(tenBtn.x + tenBtn.width / 2 - useTenTF.width / 2, tenBtn.y + tenBtn.height + 5);
		this.addChild(useTenTF);
	}
	/**初始化敌兵 */
	private initEnemy() {

		this._enemyContainer = new BaseDisplayObjectContainer();
		this.addChild(this._enemyContainer);

		this._npcClip1 = ComponentManager.getCustomMovieClip("acmachaoviewidle", 5, 300);
		this._npcClip1.setPosition(156, GameConfig.stageHeigth - this.getViewTitleButtomY() - 472);
		this._enemyContainer.addChild(this._npcClip1);
		this._npcClip1.playWithTime(-1);

		this._npcClip2 = ComponentManager.getCustomMovieClip("acmachaoviewatk", 2, 100);
		this._npcClip2.setPosition(156, GameConfig.stageHeigth - this.getViewTitleButtomY() - 482);
		this._enemyContainer.addChild(this._npcClip2);
		this._npcClip2.playWithTime(1);
		this._npcClip2.setVisible(false);


		for (let i = 0; i < this._enemyPosCfg.length; i++) {
			let posCfg = this._enemyPosCfg[i];
			let enemy = BaseLoadBitmap.create("acmachaoview_enemy" + String(i + 1) + "-" + this.getUiCode());
			enemy.setPosition(posCfg.x, GameConfig.stageHeigth - this.getViewTitleButtomY() - posCfg.height - posCfg.y);
			this._enemyContainer.addChild(enemy);
			enemy.name = String(i);
			this._enemyList.push(enemy);

		}
	}
	/**初始化骑兵 */
	private initAssault() {
		this._assaultList1.length = 0;
		this._assaultList2.length = 0;
		this._assaultList3.length = 0;
		for (let j = 0; j < 3; j++) {
			for (let i = 0; i < this._assaultCfg1.length; i++) {
				let assaultCfg = this._assaultCfg1[i];
				let assault = ComponentManager.getCustomMovieClip("acmachaoassaulteffect", 5, 70);
				assault.anchorOffsetX = 227;
				assault.anchorOffsetY = 40;
				assault.rotation = -35;
				assault.alpha = assaultCfg.alpha;
				assault.setPosition(assaultCfg.x, GameConfig.stageHeigth - this.getViewTitleButtomY() - assaultCfg.y);
				this.addChild(assault);
				assault.playWithTime(-1);
				let key = "_assaultList" + String(Number(j) + 1);
				this[key].push(assault);
			}
		}

	}
	/**刷新UI */
	private refreshView() {
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.isFree()) {
			this._oneNeedNumTF.text = LanguageManager.getlocal("acMaChaoViewFree-" + this.code);
		}
		else {
			this._oneNeedNumTF.text = String(cfg.cost);
		}
		if (vo.getMaChaoValue() > 0) {
			this._textbg.setVisible(true);
			this._textBM.setVisible(true);
			this._killText.setVisible(true);
			this._killText.text = String(vo.getMaChaoValue());
			this._killText.setPosition(this._textBM.x + 10, this._textBM.y + this._textBM.height / 2 - 6);
		}
		else {
			this._textbg.setVisible(false);
			this._textBM.setVisible(false);
			this._killText.setVisible(false);
		}


	}
	/**抽奖 */
	private lotteryHandle(event: egret.Event) {
		if (event.data.ret) {
			this.rewards = event.data.data.data.rewards;
			this.otherRewards = event.data.data.data.otherRewards;
			this.playAssaultAni();
		}
	}
	/**排行榜 */
	private rankClickHandler(event: egret.Event) {
		let rankData = event.data.data.data;
		ViewController.getInstance().openView(ViewConst.POPUP.ACMACHAORANKPOPUPVIEW, { code: this.code, aid: this.aid, rankData: rankData });
	}
	/**一抽动画 */
	private playOnceAssaultAni() {
		this.playOneAssaultAni("_assaultList1", 2);
	}
	/**	
	 * 十连抽动画
	 */
	private playEachAssaultAni(key: string) {
		for (let i = 0; i < this[key].length; i++) {
			this.playOneAssaultAni(key, i);
		}
	}
	/**动画 */
	private playAssaultAni() {
		if (this._isTen) {
			//320   180
			let index = this.getChildIndex(this._npcBM);
			let flash_eff = ComponentManager.getCustomMovieClip("critmyflash", 3, 30);
			// flash_eff.scaleX = flash_eff.scaleY = 2;
			flash_eff.x = 160;
			flash_eff.y = this._buttomBg.y - 226 + 40;
			this.addChildAt(flash_eff, index - 1);
			flash_eff.playWithTime(1);
			flash_eff.setEndCallBack(() => {
				this.removeChild(flash_eff);
				flash_eff.dispose();
				flash_eff = null;
				//背景光 320 × 226
				let speed_eff = ComponentManager.getCustomMovieClip("critmyspeed", 5, 50);
				speed_eff.width = GameConfig.stageWidth;
				speed_eff.setPosition(0, this._buttomBg.y - 226 + 15);
				this.addChildAt(speed_eff, index - 2);
				speed_eff.playWithTime(5);
				speed_eff.setEndCallBack(() => {
					this.removeChild(speed_eff);
					speed_eff.dispose();
					speed_eff = null;
					//小幅度震动
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 1 });
					this._isShake = true;

					this._npcClip2.setVisible(true);
					this._npcClip1.setVisible(false);
					this._npcClip2.playWithTime(1);
					egret.Tween.removeTweens(this);
					egret.Tween.get(this).call(
						this.playEachAssaultAni,
						this,
						["_assaultList1"]).wait(330).call(
						this.playEachAssaultAni,
						this,
						["_assaultList2"]).wait(330).call(
						this.playEachAssaultAni,
						this,
						["_assaultList3"]).call(
						() => {
							egret.Tween.removeTweens(this);
						}, this);
				}, this);

				let wordTxt = BaseBitmap.create("acmachaoview_text-" + this.getUiCode());
				wordTxt.anchorOffsetX = wordTxt.width / 2;
				wordTxt.anchorOffsetY = wordTxt.height / 2;
				wordTxt.setPosition(wordTxt.width / 2 + 50, this._buttomBg.y - 105);
				wordTxt.setScale(3);
				wordTxt.alpha = 0;
				this.addChildAt(wordTxt, index - 1);
				egret.Tween.get(wordTxt).wait(200).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 150).wait(400).to({ x: - wordTxt.width }, 250).call(() => {
					egret.Tween.removeTweens(wordTxt);
					this.removeChild(wordTxt);
					wordTxt.dispose();
					wordTxt = null;
				}, this);
			}, this);
		}
		else {
			this._npcClip2.setVisible(true);
			this._npcClip1.setVisible(false);
			this._npcClip2.playWithTime(1);
			this.playOnceAssaultAni();
		}

	}
	/**一个士兵的动画 */
	private playOneAssaultAni(key: string, index: number) {
		this[key][index].x = this._assaultCfg1[index].x;
		this[key][index].y = GameConfig.stageHeigth - this.getViewTitleButtomY() - this._assaultCfg1[index].y;
		this[key][index].alpha = this._assaultCfg1[index].alpha;
		this[key][index].scaleX = this._assaultCfg1[index].scale;
		this[key][index].scaleY = this._assaultCfg1[index].scale;
		egret.Tween.removeTweens(this[key][index]);
		egret.Tween.get(this[key][index]).to({
			x: this._assaultCfg2[index].x,
			y: GameConfig.stageHeigth - this.getViewTitleButtomY() - this._assaultCfg2[index].y,
			alpha: this._assaultCfg2[index].alpha,
			scaleX: this._assaultCfg2[index].scale,
			scaleY: this._assaultCfg2[index].scale,
		}, 50).to({
			x: this._assaultCfg3[index].x,
			y: GameConfig.stageHeigth - this.getViewTitleButtomY() - this._assaultCfg3[index].y,
			alpha: this._assaultCfg3[index].alpha,
			scaleX: this._assaultCfg3[index].scale,
			scaleY: this._assaultCfg3[index].scale,
		}, 400).call(() => {
			if (this._isTen) {
				//大幅度震动
				if (this._isShake) {
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 2 });
					this._isShake = false;
				}

				for (let i = 0; i < 3; i++) {
					this.playOneEmenyAni(i);
				}
			}
			else {
				this.playOneEmenyAni(1);
			}
		}, this).to({
			x: this._assaultCfg4[index].x,
			y: GameConfig.stageHeigth - this.getViewTitleButtomY() - this._assaultCfg4[index].y,
			alpha: this._assaultCfg4[index].alpha,
			scaleX: this._assaultCfg4[index].scale,
			scaleY: this._assaultCfg4[index].scale,
		}, 150).call(() => {
			if (this._isTen) {
				if (this._isTen && index == this._assaultList3.length - 1 && key == "_assaultList3") {
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 3 });
				}
				for (let i = 3; i < 6; i++) {
					this.playOneEmenyAni(i);
				}
			}
			else {
				this.playOneEmenyAni(4);
			}
		}, this).to({
			x: this._assaultCfg5[index].x,
			y: GameConfig.stageHeigth - this.getViewTitleButtomY() - this._assaultCfg5[index].y,
			alpha: this._assaultCfg5[index].alpha,
			scaleX: this._assaultCfg5[index].scale,
			scaleY: this._assaultCfg5[index].scale,
		}, 150).call(() => {
			egret.Tween.removeTweens(this[key][index]);
			if ((!this._isTen) || (this._isTen && index == this._assaultList3.length - 1 && key == "_assaultList3")) {

				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_MACHAOANI, { type: 4 });
				this._npcClip1.setVisible(true);
				this._npcClip2.setVisible(false);


				ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
					rewards: this.rewards, otherRewards: this.otherRewards, isPlayAni: true, callback: () => {
						this._isPlayAni = false;
						this.refreshView();
					}, handler: this
				});
			}
		}, this);
	}
	/**一个敌人的动画 */
	private playOneEmenyAni(index: number) {
		let posX = this._enemyList[index].x;
		let posY = this._enemyList[index].y;
		egret.Tween.removeTweens(this._enemyList[index]);
		egret.Tween.get(this._enemyList[index]).call(() => {
			let hurtEffect = ComponentManager.getCustomMovieClip("acmachaohurteffect", 8, 70);
			hurtEffect.anchorOffsetX = 125;
			hurtEffect.anchorOffsetY = 120;
			hurtEffect.rotation = 360 * Math.random();
			hurtEffect.setPosition(posX + this._enemyList[index].width / 2, posY + this._enemyList[index].height / 2);
			this.addChild(hurtEffect);
			hurtEffect.playWithTime(1);
			hurtEffect.setEndCallBack(() => {
				this.removeChild(hurtEffect);
				hurtEffect.dispose();
				hurtEffect = null;
			}, this)
		}, this).to({
			x: posX + 15,
			y: posY - 12,
		}, 30).to({
			x: posX,
			y: posY,
		}, 300).call(() => {
			egret.Tween.removeTweens(this._enemyList[index]);
		}, this);
	}
	private playEnemyShakeAni(event: egret.Event) {
		let offest = event.data.offest;
		let type = event.data.type;
		let posX = 0;
		let posY = 0;
		this._enemyContainer.setPosition(posX + offest, posY + offest);


	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOGETRANK, this.rankClickHandler, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOLOTTERY, this.lotteryHandle, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_MACHAOTAbANI, this.playEnemyShakeAni, this);
		egret.Tween.removeTweens(this);
		TickManager.removeTick(this.tick, this);
		this.rewards = null;
		this.otherRewards = null;
		this._buttomBg = null;
		this._oneNeedNumTF = null;
		this._isPlayAni = false;
		this._enemyList.length = 0;
		this._assaultList1.length = 0;
		this._npcBM = null;
		this._enemyContainer = null;
		this._npcClip1 = null;
		this._npcClip2 = null;
		this._timeTF = null;
		this._timeBg = null;
		this._textbg = null;
		this._textBM = null;
		this._killText = null;
		super.dispose();
	}
}