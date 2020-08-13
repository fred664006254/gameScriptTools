/**
  * 比武招亲活动
  * @author 张朝阳
  * date 2018/12/10
  * @class AcMarryView
  */
class AcMarryView extends AcCommonView {
	public constructor() {
		super();
	}
	// private aid: string = "";
	// private code: string = "";
	/**次数文本 */
	private _findNumTF: BaseTextField = null;
	/**滑动条 */
	private _progress: ProgressBar = null;
	/**宝箱相关 */
	private _boxInfoList: { "box": BaseBitmap; "boxLight": BaseBitmap }[] = [];
	/**图片 剑 */
	private _swordBM: BaseLoadBitmap = null;
	/**图片 刀 */
	private _knifeBM: BaseLoadBitmap = null;
	/**npc 相关 */
	private _npcContainer: BaseDisplayObjectContainer = null;
	/**是否发送详细 */
	private _isSendMessage: boolean = false;
	/**npc 下面包含的info */
	private _containerInfo: { npcBM: BaseLoadBitmap, npcNameBg: BaseBitmap, npcNameTxt: BaseTextField, npcTalkTail: BaseBitmap, npcTalkBg: BaseBitmap, npcTalkTxt: BaseTextField } = null;
	/**npcID */
	private _npcId: string = null;
	/**下部bg */
	private _buttombg: BaseLoadBitmap = null;
	/**剑 按钮*/
	private _swordBtn: BaseButton = null;
	/**剑 文本 */
	private _swordTxt: BaseTextField = null;
	/**刀 按钮 */
	private _knifeBtn: BaseButton = null;
	/**刀文本 */
	private _knifeTxt: BaseTextField = null;
	/**奖励领取完成 */
	private _maskbg: BaseLoadBitmap = null;
	/**龙姑娘 BM */
	private _longNpc: BaseLoadBitmap = null;
	/**我的形象 */
	private _mybody: BaseDisplayObjectContainer = null;
	/**npc是否受伤 */
	private _isNpcHurt: boolean = false;
	/**是否在播放动画 */
	private _isPlayAni: boolean = false;
	/**是否使用刀 */
	private _isKnife: boolean = false;
	/**计时器 */
	private _timer: number = 0;
	/** 获得的奖励 */
	private _handleRewars = null;
	/**说话的类型 */
	private _talkType: number = 0
	/**npc受伤的龙骨，没有网格 */
	private _npcHurtDragonBones: BaseLoadDragonBones = null;

	private _myselfBM: BaseLoadBitmap = null;

	private _topTipBg: BaseBitmap = null;

	private _topTipTF: BaseTextField = null;

	private _acCDTxt: BaseTextField = null;

	private _speakStr: string = null;
	private _speakTF: BaseTextField = null;
	private _speakTail: BaseBitmap = null;
	private _speakBg: BaseBitmap = null;
	private _wifeBM: BaseLoadBitmap = null;
	private _messageLength: number = 0;
	private _isPlayWifeSpeak = false;
	/**武器龙骨动画 适用于code */
	private _dragonBones_water: BaseLoadDragonBones = null;

	protected getContainerY():number
	{
		return 10;
	}

	public initView() {

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWMARRYITEM, this.playNpcHandle, this);
		// this.aid = this.param.data.aid;
		// this.code = this.param.data.code;
		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		//剧情
		if (vo.isFriestLogin()) {
			let idx = "acMarry_1";
			if (this.code != "1") {
				idx = "acMarry_1-" + this.code;
			}
			ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: idx, f: this.startView, o: this });
		}
		else {
			this._npcId = vo.getNpcId();
		}
		let cfg = <Config.AcCfg.MarryCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

		let bgStr = "";
		if (this.code == "1") {
			bgStr = "story_bg10";
		}
		else if (this.code == "2") {
			bgStr = "story_bg11";
		}
		let bg = BaseLoadBitmap.create(bgStr);
		bg.width = 640;
		bg.height = 1136;
		bg.setPosition(0, GameConfig.stageHeigth - bg.height - 104);
		this.addChildToContainer(bg);

		this._longNpc = BaseLoadBitmap.create("acmarryview_npc");
		this._longNpc.width = 439;
		this._longNpc.height = 613;
		this._longNpc.setPosition(bg.x + 201, bg.y + bg.height - 98 - this._longNpc.height);
		this.addChildToContainer(this._longNpc);

		let playerLv = Api.playerVoApi.getPlayerLevel();
		this._mybody = Api.playerVoApi.getPlayerPortrait(playerLv, Api.playerVoApi.getPlayePicId());
		this._mybody.setScale(1.2);
		this._mybody.setPosition(bg.x + 13, bg.y + bg.height - this._mybody.height)
		this.addChildToContainer(this._mybody);

		this._maskbg = BaseLoadBitmap.create("acmarryview_maskbg");
		this._maskbg.width = 640;
		this._maskbg.height = 282;
		this._maskbg.setPosition(bg.x, bg.y + bg.height - 98 - this._maskbg.height);
		this.addChildToContainer(this._maskbg);

		let topbg = BaseLoadBitmap.create("forpeople_top");
		topbg.width = 640;
		topbg.height = 160;
		topbg.setPosition(0, this.getContainerY() - 135);
		this.addChildToContainer(topbg);

		let topTxtStr = "acMarryViewTop";
		if (this.code != "1") {
			topTxtStr = "acMarryViewTop-" + this.code;
		}
		let topTxt = ComponentManager.getTextField(LanguageManager.getlocal(topTxtStr, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		topTxt.setPosition(topbg.x + topbg.width / 2 - topTxt.width / 2, topbg.y + topbg.height - topTxt.height - 9);
		this.addChildToContainer(topTxt);

		// 倒计时
		let countDownBg = BaseBitmap.create("public_searchdescbg");
		countDownBg.setPosition(GameConfig.stageWidth / 2 - countDownBg.width / 2, topTxt.y + topTxt.height + 8);
		this.addChildToContainer(countDownBg);

		let acCDTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;
		let deltaT = vo.getAcResidueTime();
		if (deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
		}
		else {
			this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
		}
		acCDTxt.setPosition(GameConfig.stageWidth / 2 - acCDTxt.width / 2, countDownBg.y + countDownBg.height / 2 - acCDTxt.height / 2);

		this._myselfBM = BaseLoadBitmap.create("acmarryview_myself");
		this._myselfBM.width = 309;
		this._myselfBM.height = 400;
		this._myselfBM.setPosition(bg.x + bg.width / 2 - this._myselfBM.width / 2, bg.y + bg.height - this._myselfBM.height);
		this.addChildToContainer(this._myselfBM);

		this._buttombg = BaseLoadBitmap.create("wifeview_bottombg");
		this._buttombg.width = 640;
		this._buttombg.height = 98;
		this._buttombg.setPosition(bg.x + bg.width / 2 - this._buttombg.width / 2, bg.y + bg.height - this._buttombg.height);
		this.addChildToContainer(this._buttombg);

		let numBg = BaseBitmap.create("common_numbg");
		numBg.setPosition(this._buttombg.x - 2, this._buttombg.y + this._buttombg.height / 2 - numBg.height / 2);
		this.addChildToContainer(numBg);

		let numTFStr = "acMarryViewScoreTitle";
		if (this.code != "1") {
			numTFStr = "acMarryViewScoreTitle-" + this.code;
		}
		let numTF = ComponentManager.getTextField(LanguageManager.getlocal(numTFStr), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2, numBg.y + numBg.height - numTF.height - 5);
		this.addChildToContainer(numTF);

		this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._findNumTF.width = 50;
		this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
		this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2, numBg.y + 12);
		this.addChildToContainer(this._findNumTF);

		this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 500);
		this._progress.setPosition(this._buttombg.x + 103, this._buttombg.y + this._buttombg.height - this._progress.height - 40)
		this.addChildToContainer(this._progress);



		this._npcContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._npcContainer)

		let npcBMScale = 0.85;
		let npcBM = BaseLoadBitmap.create("searchnpc_full32");
		npcBM.width = 405;
		npcBM.height = 467;
		npcBM.anchorOffsetX = npcBM.width / 2;
		npcBM.anchorOffsetY = npcBM.height;
		npcBM.setScale(npcBMScale);
		npcBM.setPosition(bg.x + bg.width / 2, this._buttombg.y - 300);
		this._npcContainer.addChild(npcBM);

		let npcNameBg = BaseBitmap.create("countrywarbtndescbg");
		npcNameBg.width = 226;
		npcNameBg.height = 30;
		npcNameBg.anchorOffsetX = npcNameBg.width / 2;
		npcNameBg.anchorOffsetY = npcNameBg.height / 2;
		npcNameBg.setPosition(npcBM.x, npcBM.y - npcNameBg.height / 2);
		this._npcContainer.addChild(npcNameBg);

		let npcNameTxtStr = "acMarryViewNpcName1";
		if (this.code != "1") {
			npcNameTxtStr = "acMarryViewNpcName1-" + this.code;
		}
		let npcNameTxt = ComponentManager.getTextField(LanguageManager.getlocal(npcNameTxtStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		npcNameTxt.anchorOffsetX = npcNameTxt.width / 2;
		npcNameTxt.anchorOffsetY = npcNameTxt.height / 2;
		npcNameTxt.setPosition(npcNameBg.x, npcNameBg.y);
		this._npcContainer.addChild(npcNameTxt);

		let npcTalkTail = BaseBitmap.create("public_9_bg13_tail");
		npcTalkTail.setPosition(npcBM.x + npcBM.width * npcBMScale / 2 - 100, npcBM.y - npcBM.height * npcBMScale + 50);
		this._npcContainer.addChild(npcTalkTail);

		let npcTalkBg = BaseBitmap.create("public_9_bg13");
		npcTalkBg.width = 280;

		let npcTalkTxtStr = "acMarryViewNpcLoginTalk1";
		if (this.code != "1") {
			npcTalkTxtStr = "acMarryViewNpcLoginTalk1-" + this.code;
		}
		let npcTalkTxt = ComponentManager.getTextField(LanguageManager.getlocal(npcTalkTxtStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		npcTalkTxt.width = 260;

		npcTalkBg.height = 35 + npcTalkTxt.height;
		npcTalkBg.setPosition(npcTalkTail.x - 40, npcTalkTail.y - npcTalkBg.height + 3);
		npcTalkTxt.setPosition(npcTalkBg.x + npcTalkBg.width / 2 - npcTalkTxt.width / 2, npcTalkBg.y + npcTalkBg.height / 2 - npcTalkTxt.height / 2);
		this._npcContainer.addChild(npcTalkBg);
		this._npcContainer.addChild(npcTalkTxt);
		npcTalkBg.setVisible(false);
		npcTalkTxt.setVisible(false);
		npcTalkTail.setVisible(false);
		this._containerInfo = { npcBM: npcBM, npcNameBg: npcNameBg, npcNameTxt: npcNameTxt, npcTalkTail: npcTalkTail, npcTalkBg: npcTalkBg, npcTalkTxt: npcTalkTxt }



		let swordCfg = cfg.getBattleUseItemCfgList()[0];
		this._swordBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, null, this.swordBtnClick, this);
		this._swordBtn.setPosition(this._buttombg.x + 45, this._buttombg.y - this._swordBtn.height - 10);
		this._swordBtn.setText(String(swordCfg.gemCost), false);
		this._swordBtn.addTextIcon("public_icon1");
		this.addChildToContainer(this._swordBtn);

		let swordTxtStr = "acMarryViewSwordAddScore";
		if (this.code != "1") {
			swordTxtStr = "acMarryViewSwordAddScore-" + this.code;
		}
		this._swordTxt = ComponentManager.getTextField(LanguageManager.getlocal(swordTxtStr, [String(swordCfg.getScore)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._swordTxt.setPosition(this._swordBtn.x + this._swordBtn.width / 2 - this._swordTxt.width / 2, this._swordBtn.y - this._swordTxt.height - 5);
		this.addChildToContainer(this._swordTxt);

		let swordBMStr = "acmarryview_sword";
		if (this.code != "1") {
			swordBMStr = "acmarryview_sword-" + this.code;
		}
		this._swordBM = BaseLoadBitmap.create(swordBMStr);
		this._swordBM.width = 190;
		this._swordBM.height = 285;
		if (this.code == "2") {
			this._swordBM.width = 120;
			this._swordBM.height = 112;
		}
		this._swordBM.setPosition(this._swordBtn.x + this._swordBtn.width / 2 - this._swordBM.width / 2, this._swordTxt.y - this._swordBM.height);
		this.addChildToContainer(this._swordBM)

		let knifeCfg = cfg.getBattleUseItemCfgList()[1];
		this._knifeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, null, this.knifeBtnClick, this);
		this._knifeBtn.setPosition(this._buttombg.x + this._buttombg.width - this._knifeBtn.width - 45, this._swordBtn.y);
		this._knifeBtn.setText(String(knifeCfg.gemCost), false);
		this._knifeBtn.addTextIcon("public_icon1");
		this.addChildToContainer(this._knifeBtn);

		let knifeTxtStr = "acMarryViewKnifeAddScore";
		if (this.code != "1") {
			knifeTxtStr = "acMarryViewKnifeAddScore-" + this.code;
		}
		this._knifeTxt = ComponentManager.getTextField(LanguageManager.getlocal(knifeTxtStr, [String(knifeCfg.getScore)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._knifeTxt.setPosition(this._knifeBtn.x + this._knifeBtn.width / 2 - this._knifeTxt.width / 2, this._swordTxt.y);
		this.addChildToContainer(this._knifeTxt);

		let knifeBMStr = "acmarryview_knife";
		if (this.code != "1") {
			knifeBMStr = "acmarryview_knife-" + this.code;
		}
		this._knifeBM = BaseLoadBitmap.create(knifeBMStr);
		this._knifeBM.width = 190;
		this._knifeBM.height = 285;
		if (this.code == "2") {
			this._knifeBM.width = 123;
			this._knifeBM.height = 136;
		}
		this._knifeBM.setPosition(this._knifeBtn.x + this._knifeBtn.width / 2 - this._knifeBM.width / 2, this._knifeTxt.y - this._knifeBM.height);
		this.addChildToContainer(this._knifeBM)

		this._topTipBg = BaseBitmap.create("public_searchdescbg");

		let topTipTFStr = "acHMarryViewTopTip";
		if (this.code != "1") {
			topTipTFStr = "acHMarryViewTopTip-" + this.code;
		}
		this._topTipTF = ComponentManager.getTextField(LanguageManager.getlocal(topTipTFStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._topTipBg.width = this._topTipTF.width + 50;
		this._topTipBg.setPosition(topbg.x + topbg.width / 2 - this._topTipBg.width / 2, bg.y + bg.height - 240);
		this.addChildToContainer(this._topTipBg);
		this._topTipTF.setPosition(this._topTipBg.x + this._topTipBg.width / 2 - this._topTipTF.width / 2, this._topTipBg.y + this._topTipBg.height / 2 - this._topTipTF.height / 2);
		this.addChildToContainer(this._topTipTF);

		let rewardInfoBtn = ComponentManager.getButton("acmarryview_common_btn", null, () => {
			ViewController.getInstance().openView(ViewConst.POPUP.ACMARRYREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
		}, this);
		rewardInfoBtn.setPosition(topbg.x + 15, topbg.y + topbg.height + 15);
		this.addChildToContainer(rewardInfoBtn)



		this.initBox();
		this.refreshBox()
		if (!vo.isFriestLogin()) {
			if (vo.getNpcId()) {
				this.startView();
			}
			else {
				this.endView();
			}
		}

	}
	/**
 	* 初始化宝箱
 	*/
	private initBox() {
		this._boxInfoList.length = 0;
		let cfg = <Config.AcCfg.MarryCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let boxCfg = cfg.getBattleItemCfgList();
		let maxNum = boxCfg[boxCfg.length - 1].killPoint;
		for (let i = 0; i < boxCfg.length; i++) {
			let offestX = 0;

			if (i == boxCfg.length - 1) {
				offestX = -10;
			}
			let posX = this._progress.x + (boxCfg[i].killPoint / maxNum) * this._progress.width;

			let boxLight = BaseBitmap.create("acturantable_taskbox_light");
			boxLight.anchorOffsetX = boxLight.width / 2;
			boxLight.anchorOffsetY = boxLight.height / 2;
			boxLight.setPosition(posX + offestX, this._progress.y + this._progress.height / 2);
			this.addChildToContainer(boxLight);

			let box = BaseBitmap.create("common_box_1");
			box.anchorOffsetX = box.width / 2;
			box.anchorOffsetY = box.height / 2;
			box.setScale(0.75);
			box.setPosition(boxLight.x, boxLight.y);
			this.addChildToContainer(box);
			box.addTouchTap((even: egret.TouchEvent) => {
				ViewController.getInstance().openView(ViewConst.POPUP.ACMARRYBOXINFOPOPUPVIEW, { "code": this.code, "aid": this.aid, boxCfg: boxCfg[i] });
			}, this);

			let boxDescStr = "acMarryViewScore";
			if (this.code != "1") {
				boxDescStr = "acMarryViewScore-" + this.code;
			}
			let boxDesc = ComponentManager.getTextField(LanguageManager.getlocal(boxDescStr, [String(boxCfg[i].killPoint)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			boxDesc.setPosition(posX - boxDesc.width / 2 + offestX, this._progress.y + this._progress.height + 10);
			this.addChildToContainer(boxDesc);

			if (i == boxCfg.length - 1) {
				let speakStrKey = "acMarrySpeakTip";
				if (this.code != "1") {
					speakStrKey = "acMarrySpeakTip-" + this.code;
				}
				this._speakStr = LanguageManager.getlocal(speakStrKey, [String(boxCfg[i].killPoint)]);
				this._speakTF = ComponentManager.getTextField(this._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
				this._speakTail = BaseBitmap.create("public_9_bg25_tail");

				this._speakBg = BaseBitmap.create("public_9_bg25");
				this._speakBg.width = this._speakTF.width + 40;
				let posX = box.x;
				if (posX + this._speakBg.width + 5 > GameConfig.stageWidth) {
					posX = GameConfig.stageWidth - this._speakBg.width - 15;
				}

				this._speakBg.setPosition(posX, box.y - box.height / 2 - this._speakBg.height - this._speakTail.height + 5);
				//  this._speakBg.setPosition(posX,box.y);
				this.addChildToContainer(this._speakBg);

				this._speakTF.setPosition(this._speakBg.x + this._speakBg.width / 2 - this._speakTF.width / 2, this._speakBg.y + this._speakBg.height / 2 - this._speakTF.height / 2);
				this.addChildToContainer(this._speakTF);

				this._speakTail.skewY = 180
				this._speakTail.setPosition(box.x, this._speakBg.y + this._speakBg.height - 3);
				this.addChildToContainer(this._speakTail);

				this._wifeBM = BaseLoadBitmap.create("wife_half_220");
				let scale = 0.30;
				this._wifeBM.height = 205;
				this._wifeBM.width = 196;
				this._wifeBM.setScale(scale);
				this._wifeBM.setPosition(this._speakBg.x - this._wifeBM.width * scale / 2, this._speakBg.y + this._speakBg.height - this._wifeBM.height * scale);
				this.addChildToContainer(this._wifeBM);

				// egret.Tween.get(this._speakBg, { loop: true }).call(() => {
				// 	this._speakTF.text = "";
				// 	this._speakTail.setVisible(true);
				// 	this._wifeBM.setVisible(true);
				// 	this._speakTF.setVisible(true);
				// 	this._speakBg.setVisible(true);
				// 	this._messageLength = 0;
				// 	egret.Tween.get(this._speakTF, { loop: true }).wait(150).call(() => {
				// 		this._speakTF.text = this._speakStr.substr(0, this._messageLength);
				// 		this._messageLength++;
				// 	}, this);
				// }, this).wait(this._speakStr.length * 150 + 2000).call(() => {
				// 	this._speakTail.setVisible(false);
				// 	this._wifeBM.setVisible(false);
				// 	this._speakTF.setVisible(false);
				// 	this._speakBg.setVisible(false);
				// 	this._messageLength = 0;
				// 	egret.Tween.removeTweens(this._speakTF);
				// }, this).wait(10000);

			}

			let boxInfo = { "box": box, "boxLight": boxLight };
			this._boxInfoList.push(boxInfo);

		}

	}

	/**登场动画 */
	private playLoginAni() {
		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		this._containerInfo.npcBM.setload(vo.getNpcBM(vo.getNpcId()))
		if (vo.getNpcId() == "5") {
			this._containerInfo.npcBM.width = 640;
			this._containerInfo.npcBM.height = 840;
			this._containerInfo.npcBM.anchorOffsetX = this._containerInfo.npcBM.width / 2;
			this._containerInfo.npcBM.anchorOffsetY = this._containerInfo.npcBM.height;
			this._containerInfo.npcBM.setScale(0.47);
		}
		else {
			this._containerInfo.npcBM.width = 405;
			this._containerInfo.npcBM.height = 467;
			this._containerInfo.npcBM.anchorOffsetX = this._containerInfo.npcBM.width / 2;
			this._containerInfo.npcBM.anchorOffsetY = this._containerInfo.npcBM.height;
			this._containerInfo.npcBM.setScale(0.85);
		}
		this._containerInfo.npcBM.setPosition(GameConfig.stageWidth / 2, this._buttombg.y - 300);
		this._containerInfo.npcNameTxt.text = vo.getNpcName(vo.getNpcId());
		this._containerInfo.npcNameTxt.setPosition(this._containerInfo.npcNameBg.x, this._containerInfo.npcNameBg.y);

		egret.Tween.get(this._npcContainer).to({ x: 0 }, 500).call(() => {
			egret.Tween.removeTweens(this._npcContainer);
			this._isPlayAni = false;
			this._timer = 10;
			this.tick()
		}, this);
	}
	/**退场动画 */
	private playCancelAni() {
		egret.Tween.get(this._npcContainer).call(() => {
			this._npcContainer.x = 0;
			this._npcContainer.y = 0;
			this._npcContainer.setScale(1);

		}, this).wait(100).to({ x: 640, y: -640, scaleX: 0.2, scaleY: 0.2 }, 1000).wait(100).call(() => {
			egret.Tween.removeTweens(this._npcContainer);
			this.startView();
		}, this);
	}
	/**
	 * 武器动画
	 */
	private playWeaponAni(isKnife) {
		this._isKnife = isKnife;
		this._isNpcHurt = true;
		this._isPlayAni = true;
		this._containerInfo.npcTalkTail.setVisible(false);
		this._containerInfo.npcTalkBg.setVisible(false);
		this._containerInfo.npcTalkTxt.setVisible(false);

		if (this._isKnife) {
			let posX = this._knifeBM.x;
			let posY = this._knifeBM.y;
			let moveX = this._knifeBM.x + 45;
			let moveY = this._knifeBM.y + 45;
			this._knifeBM.alpha = 1;
			this._knifeBM.setScale(1);
			egret.Tween.get(this._knifeBM).to({
				x: moveX,
				y: moveY,
				scaleX: 1.3,
				scaleY: 1.3,
			}, 200).to({
				x: this._containerInfo.npcBM.x - this._knifeBM.width / 2,
				y: this._containerInfo.npcBM.y - this._containerInfo.npcBM.height * 0.85 / 2 - this._knifeBM.height / 2,
				alpha: 0,
				scaleX: 0.8,
				scaleY: 0.8,
			}, 200).call(() => {
				egret.Tween.removeTweens(this._knifeBM);
				this._knifeBM.setPosition(posX, posY);
				this._knifeBM.setScale(1);
				this.request(NetRequestConst.REQUST_ACTIVITY_GETTWMARRYITEM, { activeId: this.aid + "-" + this.code, mType: 2 });
			}, this);

		}
		else {
			let posX = this._swordBM.x;
			let posY = this._swordBM.y;
			let moveX = this._swordBM.x - 45;
			let moveY = this._swordBM.y + 45;
			this._swordBM.alpha = 1;
			this._swordBM.setScale(1);
			egret.Tween.get(this._swordBM).to({
				x: moveX,
				y: moveY,
				scaleX: 1.3,
				scaleY: 1.3,
			}, 200).to({
				x: this._containerInfo.npcBM.x - this._swordBM.width / 2,
				y: this._containerInfo.npcBM.y - this._containerInfo.npcBM.height * 0.85 / 2 - this._swordBM.height / 2,
				alpha: 0,
				scaleX: 0.8,
				scaleY: 0.8,
			}, 200).call(() => {
				egret.Tween.removeTweens(this._swordBM);
				this._swordBM.setPosition(posX, posY);
				this._swordBM.setScale(1);
				this.request(NetRequestConst.REQUST_ACTIVITY_GETTWMARRYITEM, { activeId: this.aid + "-" + this.code, mType: 1 });
			}, this);
		}
	}
	/**npc受伤动画 */
	private playNpcHurtAni() {
		if (this._npcHurtDragonBones) {
			this.container.removeChild(this._npcHurtDragonBones);
			this._npcHurtDragonBones.dispose();
			this._npcHurtDragonBones = null;
		}
		if (this._isKnife) {
			this._npcHurtDragonBones = App.DragonBonesUtil.getLoadDragonBones('acmarryview_knife', 1);
			this._npcHurtDragonBones.setPosition(this._containerInfo.npcBM.x, this._containerInfo.npcBM.y - this._containerInfo.npcBM.height * 0.85 / 2 + 70);
			this.addChildToContainer(this._npcHurtDragonBones);
		}
		else {
			this._npcHurtDragonBones = App.DragonBonesUtil.getLoadDragonBones('acmarryview_sword', 1);
			this._npcHurtDragonBones.setPosition(this._containerInfo.npcBM.x, this._containerInfo.npcBM.y - this._containerInfo.npcBM.height * 0.85 / 2 + 70);
			this.addChildToContainer(this._npcHurtDragonBones);
		}
		let scaleTimer = 0
		let aniTime = 150;
		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let startScale = 1;
		let endScale = 0.85;
		if ((vo.getNpcId() == "5" && this._npcId == vo.getNpcId()) || vo.getNpcId() == null) {
			startScale = 0.55;
			endScale = 0.47;
		}
		else {
			startScale = 1;
			endScale = 0.85;
		}
		egret.Tween.get(this._containerInfo.npcBM, { loop: true }).to({ scaleX: startScale, scaleY: startScale }, aniTime).to({ scaleX: endScale, scaleY: endScale }, aniTime).call(
			() => {
				scaleTimer++;
				if (scaleTimer > 6) {
					egret.Tween.removeTweens(this._containerInfo.npcBM);
					let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
					if (vo.getNpcId()) {
						if (this._npcId != vo.getNpcId()) {
							this.playCancelAni();
							this._isNpcHurt = false;
						}
						else {
							this._isPlayAni = false;
						}
					}
					else {
						this.endView();
					}
					this._swordBM.alpha = 1;
					this._knifeBM.alpha = 1;
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: this._handleRewars, isPlayAni: true });
					this.refreshView();
					this._talkType = Math.random() > 0.5 ? 2 : 1;
					this._timer = 0;
					this.tick()
				}
			}, this);
		egret.Tween.get(this._containerInfo.npcNameBg, { loop: true }).to({ scaleX: 1.17, scaleY: 1.17 }, aniTime).to({ scaleX: 1, scaleY: 1 }, aniTime).call(
			() => {
				scaleTimer++;
				if (scaleTimer > 6) {
					egret.Tween.removeTweens(this._containerInfo.npcNameBg);
				}
			}, this);
		egret.Tween.get(this._containerInfo.npcNameTxt, { loop: true }).to({ scaleX: 1.17, scaleY: 1.17 }, aniTime).to({ scaleX: 1, scaleY: 1 }, aniTime).call(
			() => {
				scaleTimer++;
				if (scaleTimer > 6) {
					egret.Tween.removeTweens(this._containerInfo.npcNameTxt);
				}
			}, this);
	}
	/**
	 * 播放code2 水桶的动画
	 * */
	private playWaterAni(isKnife) {
		this._isKnife = isKnife;
		this._isNpcHurt = true;
		this._isPlayAni = true;
		this._containerInfo.npcTalkTail.setVisible(false);
		this._containerInfo.npcTalkBg.setVisible(false);
		this._containerInfo.npcTalkTxt.setVisible(false);
		let waitTime = 0;
		if (this._dragonBones_water) {
			this.container.removeChild(this._dragonBones_water);
			this._dragonBones_water.dispose();
			this._dragonBones_water = null;
		}
		if (isKnife) {
			this._dragonBones_water = App.DragonBonesUtil.getLoadDragonBones('acmarryview_barrel', 1);
			this._dragonBones_water.setPosition(this._knifeBM.x + 30, this._knifeBM.y + 20);
			waitTime = 1330;
		}
		else {
			this._dragonBones_water = App.DragonBonesUtil.getLoadDragonBones('acmarryview_bowl', 1);
			this._dragonBones_water.setPosition(this._swordBM.x + 40, this._swordBM.y + 50);
			waitTime = 910;
		}
		egret.Tween.get(this).wait(waitTime).call(() => {
			egret.Tween.removeTweens(this);
			if (isKnife) {
				this.request(NetRequestConst.REQUST_ACTIVITY_GETTWMARRYITEM, { activeId: this.aid + "-" + this.code, mType: 2 });
			}
			else {
				this.request(NetRequestConst.REQUST_ACTIVITY_GETTWMARRYITEM, { activeId: this.aid + "-" + this.code, mType: 1 });
			}
		}, this);
		this.addChildToContainer(this._dragonBones_water);
		this._isPlayAni = true;
	}
	/**code 2 返回相关 */
	private refreashCode2Handle() {
		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.getNpcId()) {
			if (this._npcId != vo.getNpcId()) {
				this.playCancelAni();
				this._isNpcHurt = false;
			}
			else {
				this._isPlayAni = false;
			}
		}
		else {
			this.endView();
		}
		// this._swordBM.alpha = 1;
		// this._knifeBM.alpha = 1;
		ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { rewards: this._handleRewars, isPlayAni: true });
		this.refreshView();
		this._talkType = Math.random() > 0.5 ? 2 : 1;
		this._timer = 0;
		this.tick()
	}
	/**
	 * 最后的UI
	 */
	private endView() {
		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (this._npcId && (!vo.getNpcId())) {
			let idx = "acMarry_2_1";
			if (this.code != "1") {
				idx = "acMarry_2_1-" + this.code;
			}
			ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: idx });
		}

		this._npcContainer.setVisible(false);
		this._swordBM.setVisible(false);
		this._knifeBM.setVisible(false);
		this._swordBtn.setVisible(false);
		this._swordTxt.setVisible(false);
		this._knifeBtn.setVisible(false);
		this._knifeTxt.setVisible(false);
		this._myselfBM.setVisible(false);
		this._maskbg.setVisible(true);
		this._longNpc.setVisible(true);
		this._mybody.setVisible(true);
		this._topTipBg.setVisible(true);
		this._topTipTF.setVisible(true);

	}
	/**
	 * 初始化ui
	 */
	private startView() {
		this._npcContainer.setVisible(true);
		this._swordBM.setVisible(true);
		this._knifeBM.setVisible(true);
		this._swordBtn.setVisible(true);
		this._swordTxt.setVisible(true);
		this._knifeBtn.setVisible(true);
		this._knifeTxt.setVisible(true);
		this._myselfBM.setVisible(true);
		this._maskbg.setVisible(false);
		this._longNpc.setVisible(false);
		this._mybody.setVisible(false);
		this._topTipBg.setVisible(false);
		this._topTipTF.setVisible(false);



		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		this._npcContainer.x = 640;
		this._npcContainer.y = 0;
		this._npcContainer.setScale(1);

		if (this._npcId != vo.getNpcId()) {
			if (vo.isFriestLogin()) {
				this.request(NetRequestConst.REQUST_ACTIVITY_GETTWINITMARRYFLAG, { activeId: this.aid + "-" + this.code });
			}
			this._npcId = vo.getNpcId();
			this.playLoginAni();

		}
		else {
			this._npcContainer.x = 0;
			this._npcContainer.y = 0;
			this._npcContainer.setScale(1);
			this._containerInfo.npcBM.setload(vo.getNpcBM(vo.getNpcId()));
			if (vo.getNpcId() == "5") {
				this._containerInfo.npcBM.width = 640;
				this._containerInfo.npcBM.height = 840;
				this._containerInfo.npcBM.anchorOffsetX = this._containerInfo.npcBM.width / 2;
				this._containerInfo.npcBM.anchorOffsetY = this._containerInfo.npcBM.height;
				this._containerInfo.npcBM.setScale(0.47);
			}
			else {
				this._containerInfo.npcBM.width = 405;
				this._containerInfo.npcBM.height = 467;
				this._containerInfo.npcBM.anchorOffsetX = this._containerInfo.npcBM.width / 2;
				this._containerInfo.npcBM.anchorOffsetY = this._containerInfo.npcBM.height;
				this._containerInfo.npcBM.setScale(0.85);
			}
			this._containerInfo.npcBM.setPosition(GameConfig.stageWidth / 2, this._buttombg.y - 300);
			this._containerInfo.npcNameTxt.text = vo.getNpcName(vo.getNpcId());
			this._containerInfo.npcNameTxt.setPosition(this._containerInfo.npcNameBg.x, this._containerInfo.npcNameBg.y);

			this._timer = 10;
			this.tick();
		}
	}

	/**
	 * 刷新宝箱
	 */
	private refreshBox() {
		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MarryCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let boxCfg = cfg.getBattleItemCfgList();
		let maxNum = boxCfg[boxCfg.length - 1].killPoint;
		for (let i = 0; i < this._boxInfoList.length; i++) {
			let boxItemCfg = boxCfg[i];
			if (vo.getScore() >= boxItemCfg.killPoint) {
				if (vo.getBoxFlag(boxItemCfg.id)) {
					this._boxInfoList[i].box.setRes("common_box_3");
					this._boxInfoList[i].boxLight.setVisible(false);
					if (i == this._boxInfoList.length - 1) {
						egret.Tween.removeTweens(this._speakBg);
						egret.Tween.removeTweens(this._speakTF);
						this._speakTF.setVisible(false);
						this._speakTail.setVisible(false);
						this._speakBg.setVisible(false);
						this._wifeBM.setVisible(false);
					}

					egret.Tween.removeTweens(this._boxInfoList[i].box);
					egret.Tween.removeTweens(this._boxInfoList[i].boxLight);


				}
				else {

					this._boxInfoList[i].box.setRes("common_box_2");
					this._boxInfoList[i].boxLight.setVisible(true);
					egret.Tween.get(this._boxInfoList[i].boxLight, { loop: true }).to({ rotation: this._boxInfoList[i].boxLight.rotation + 360 }, 10000);
					egret.Tween.get(this._boxInfoList[i].box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
					if (i == this._boxInfoList.length - 1 && this._isPlayWifeSpeak == false) {
						this._isPlayWifeSpeak = true;
						egret.Tween.removeTweens(this._speakBg);
						egret.Tween.removeTweens(this._speakTF);
						egret.Tween.get(this._speakBg, { loop: true }).call(() => {
							this._speakTF.text = "";
							this._speakTail.setVisible(true);
							this._wifeBM.setVisible(true);
							this._speakTF.setVisible(true);
							this._speakBg.setVisible(true);
							this._messageLength = 0;
							egret.Tween.get(this._speakTF, { loop: true }).wait(150).call(() => {
								this._speakTF.text = this._speakStr.substr(0, this._messageLength);
								this._messageLength++;
							}, this);
						}, this).wait(this._speakStr.length * 150 + 2000).call(() => {
							this._speakTail.setVisible(false);
							this._wifeBM.setVisible(false);
							this._speakTF.setVisible(false);
							this._speakBg.setVisible(false);
							this._messageLength = 0;
							egret.Tween.removeTweens(this._speakTF);
						}, this).wait(10000);
					}

				}
			}
			else {
				this._boxInfoList[i].box.setRes("common_box_1");
				this._boxInfoList[i].boxLight.setVisible(false);
				egret.Tween.removeTweens(this._boxInfoList[i].box);
				egret.Tween.removeTweens(this._boxInfoList[i].boxLight);

				if (i == this._boxInfoList.length - 1) {
					egret.Tween.removeTweens(this._speakBg);
					egret.Tween.removeTweens(this._speakTF);
					this._speakTF.setVisible(false);
					this._speakTail.setVisible(false);
					this._speakBg.setVisible(false);
					this._wifeBM.setVisible(false);
				}
			}
		}
		this._progress.setPercentage(vo.getScore() / maxNum);
		this._findNumTF.text = String(vo.getScore());
	}
	/**
	 * 剑相关
	 */
	private swordBtnClick() {
		if (this._isPlayAni) {
			return;
		}
		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MarryCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
		if (deltaT < 0) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		let cost = cfg.getBattleUseItemCfgList()[0].gemCost;
		if (Api.playerVoApi.getPlayerGem() < cost) {
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		if (this.code == "2") {
			this.playWaterAni(false);
			return;
		}
		this.playWeaponAni(false);

	}
	/**
	 * 刀相关
	 */
	private knifeBtnClick() {
		if (this._isPlayAni) {
			return;
		}
		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MarryCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
		if (deltaT < 0) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		let cost = cfg.getBattleUseItemCfgList()[1].gemCost;
		if (Api.playerVoApi.getPlayerGem() < cost) {
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		if (this.code == "2") {
			this.playWaterAni(true);
			return;
		}
		this.playWeaponAni(true);

	}
	/**刷新ui */
	private refreshView() {

		this.refreshBox();

	}
	/**击打npc 回调 */
	private playNpcHandle(event: egret.Event) {
		if (event.data.ret) {
			this._handleRewars = event.data.data.data.rewards;
			if (this.code == "2") {
				this.refreashCode2Handle();
				return;
			}
			this.playNpcHurtAni();
		}
	}
	public tick() {
		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		let deltaT = vo.getAcResidueTime();
		if (this._acCDTxt) {
			if (deltaT > 0) {
				this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			}
			else {
				this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
			}
		}

		if (vo.getNpcId()) {
			if (this._isNpcHurt) {
				if (!this._isPlayAni) {
					this._timer++;
					if (this._timer > 5) {
						this._isNpcHurt = false;
						this._timer = 0;
					}
					else {
						this._containerInfo.npcTalkTail.setVisible(true);
						this._containerInfo.npcTalkBg.setVisible(true);
						this._containerInfo.npcTalkTxt.setVisible(true);
						let npcTalkTxtStr = "acMarryViewNpcHurtTalk" + vo.getNpcId() + "_" + this._talkType;
						if (this.code != "1") {
							npcTalkTxtStr = "acMarryViewNpcHurtTalk" + vo.getNpcId() + "_" + this._talkType + "-" + this.code;
						}
						this._containerInfo.npcTalkTxt.text = LanguageManager.getlocal(npcTalkTxtStr);
						this._containerInfo.npcTalkBg.height = 35 + this._containerInfo.npcTalkTxt.height;
						this._containerInfo.npcTalkBg.setPosition(this._containerInfo.npcTalkTail.x - 40, this._containerInfo.npcTalkTail.y - this._containerInfo.npcTalkBg.height + 3);
						this._containerInfo.npcTalkTxt.setPosition(this._containerInfo.npcTalkBg.x + this._containerInfo.npcTalkBg.width / 2 - this._containerInfo.npcTalkTxt.width / 2, this._containerInfo.npcTalkBg.y + this._containerInfo.npcTalkBg.height / 2 - this._containerInfo.npcTalkTxt.height / 2)
					}
				}
			}
			else {
				if (!this._isPlayAni) {
					this._timer++;
					if (this._timer <= 10) {
						this._containerInfo.npcTalkTail.setVisible(false);
						this._containerInfo.npcTalkBg.setVisible(false);
						this._containerInfo.npcTalkTxt.setVisible(false);
					}
					else if (this._timer > 10 && this._timer <= 15) {
						this._containerInfo.npcTalkTail.setVisible(true);
						this._containerInfo.npcTalkBg.setVisible(true);
						this._containerInfo.npcTalkTxt.setVisible(true);
						let npcTalkTxtStr = "acMarryViewNpcLoginTalk" + vo.getNpcId();
						if (this.code != "1") {
							npcTalkTxtStr = "acMarryViewNpcLoginTalk" + vo.getNpcId() + "-" + this.code;
						}
						this._containerInfo.npcTalkTxt.text = LanguageManager.getlocal(npcTalkTxtStr);
						this._containerInfo.npcTalkBg.height = 35 + this._containerInfo.npcTalkTxt.height;
						this._containerInfo.npcTalkBg.setPosition(this._containerInfo.npcTalkTail.x - 40, this._containerInfo.npcTalkTail.y - this._containerInfo.npcTalkBg.height + 3);
						this._containerInfo.npcTalkTxt.setPosition(this._containerInfo.npcTalkBg.x + this._containerInfo.npcTalkBg.width / 2 - this._containerInfo.npcTalkTxt.width / 2, this._containerInfo.npcTalkBg.y + this._containerInfo.npcTalkBg.height / 2 - this._containerInfo.npcTalkTxt.height / 2)
					}
					else if (this._timer > 15) {
						this._containerInfo.npcTalkTail.setVisible(false);
						this._containerInfo.npcTalkBg.setVisible(false);
						this._containerInfo.npcTalkTxt.setVisible(false);
						this._timer = 0;
					}
				}

			}
		}

	}
	protected getRuleInfo(): string {
		if (this.code == "1") {
			return "acMarryRuleInfo";
		}
		return "acMarryRuleInfo-" + this.code;

	}
	protected getTitleStr(): string {
		return "acMarryView-" + this.code + "_Title";
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"progress7", "progress7_bg", "common_numbg", "common_box_1", "common_box_2", "common_box_3", "common_boxbg",
			"acturantable_taskbox_light", "countrywarbtndescbg", "acmarryview_common_btn_down", "acmarryview_common_btn"
		]);
	}

	protected getProbablyInfo(): string {
		let ruleStr = this.getClassName().toLowerCase().replace("view", "") + "ProbablyInfo" + this.code;
		if (LanguageManager.checkHasKey(ruleStr)) {
			return ruleStr;
		}
		else {

		}
		return "";
	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWMARRYITEM, this.playNpcHandle, this);
		egret.Tween.removeTweens(this._npcContainer);
		egret.Tween.removeTweens(this._knifeBM);
		egret.Tween.removeTweens(this._swordBM);
		egret.Tween.removeTweens(this._containerInfo.npcBM);
		egret.Tween.removeTweens(this._containerInfo.npcNameBg);
		egret.Tween.removeTweens(this._containerInfo.npcNameTxt);
		egret.Tween.removeTweens(this._speakBg);
		egret.Tween.removeTweens(this._speakTF);
		// this.aid = "";
		// this.code = "";
		this._findNumTF = null;
		this._progress = null;
		this._boxInfoList = [];
		this._swordBM = null;
		this._knifeBM = null;
		this._npcContainer = null;
		this._isSendMessage = false;
		this._containerInfo = null;
		this._npcId = null;
		this._buttombg = null;
		this._swordBtn = null;
		this._swordTxt = null;
		this._knifeBtn = null;
		this._knifeTxt = null;
		this._maskbg = null;
		this._longNpc = null;
		this._mybody = null;
		this._timer = 0;
		this._isNpcHurt = false;
		this._isPlayAni = false;
		this._isKnife = false;
		this._handleRewars = null;
		this._talkType = 0;
		this._npcHurtDragonBones = null;
		this._topTipBg = null;
		this._topTipTF = null;
		this._acCDTxt = null;
		this._speakStr = null;
		this._speakTF = null;
		this._speakTail = null;
		this._speakBg = null;
		this._wifeBM = null;
		this._messageLength = 0;
		this._isPlayWifeSpeak = false;
		this._dragonBones_water = null;
		super.dispose();
	}
}
