/**
  * 花魁活动view--花魁赛程
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteViewTab1
  */
class AcBeautyVoteViewTab1 extends AcCommonViewTab {

	private _acTimeDate: BaseTextField = null;

	private _acTime: BaseTextField = null;


	private _scrollView: ScrollView = null;
	private _svContainer: BaseDisplayObjectContainer = null;

	private _scheduleInfoList: { pointbg: BaseBitmap, point: BaseBitmap, joinInfoBtn: BaseButton, itemCfg: Config.AcCfg.BeautyVoteScheduleItemCfg }[] = [];


	private _progressBar: ProgressBar = null;

	private _btnEffect: BaseBitmap = null;

	// private _bubble: BaseBitmap = null;

	// private _bubbleTF: BaseTextField = null;

	private _itemNumTF: BaseTextField = null;

	private _playerContainer: BaseDisplayObjectContainer = null;


	private _leftPlayer: BaseLoadBitmap = null;
	private _leftItemNumTF: BaseTextField = null;
	private _leftPlayerTF: BaseTextField = null;

	private _leftItemBg: BaseBitmap = null;
	private _leftMyItemNumTF: BaseTextField = null;

	private _leftMask: BaseBitmap = null;
	private _leftWin: BaseBitmap = null;

	private _rightPlayer: BaseLoadBitmap = null;
	private _rightItemNumTF: BaseTextField = null;
	private _rightPlayerTF: BaseTextField = null;

	private _rightItemBg: BaseBitmap = null;
	private _rightMyItemNumTF: BaseTextField = null;

	private _rightMask: BaseBitmap = null;
	private _rightWin: BaseBitmap = null;




	private _nowRound: number = 0;

	private _playerInfoData: any = null;
	/**轮数data */
	private _playerRoundInfoData: any = null;
	private _joinInfoList: { left: number, right: number, win: number, round: number, leftscore: number, rightscore: number }[] = [];

	private _isStartInit: boolean = false;

	private _round: number = 0;

	private _battleBM: BaseBitmap = null;

	private _buttomDescTF: BaseTextField = null;
	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}
	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETINFO, this.getInfoHandle, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_VOTE, this.voteHandle, this);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		this.request(NetRequestConst.REQUEST_BEAUTYVOTE_GETINFO, { activeId: vo.aidAndCode });
	}
	/**初始化界面 */
	public initShowUI() {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		this._nowRound = this._playerInfoData.nowround;
		this._round = this._playerInfoData.nowround;


		let topBg = BaseBitmap.create("public_9_bg32");
		topBg.width = 620;
		topBg.height = 145;
		topBg.setPosition(GameConfig.stageWidth / 2 - topBg.width / 2, -213 + 15);
		this.addChild(topBg);


		this._svContainer = new BaseDisplayObjectContainer();
		this._svContainer.width = 150 * cfg.beautyVoteScheduleItemCfgList.length + 100;
		this._svContainer.height = topBg.height;

		let rect = new egret.Rectangle(0, 0, topBg.width - 2, topBg.height)
		this._scrollView = ComponentManager.getScrollView(this._svContainer, rect);
		this._scrollView.setPosition(topBg.x + 2, topBg.y);
		this._scrollView.bounces = false;
		let offset = Number(this._playerInfoData.nowround / cfg.beautyVoteScheduleItemCfgList.length * this._svContainer.width) - this._scrollView.width / 2;
		this._scrollView.setScrollLeft(offset);
		this.addChild(this._scrollView);

		this._progressBar = ComponentManager.getProgressBar("progress14", "progress14_bg", 150 * cfg.beautyVoteScheduleItemCfgList.length);
		this._progressBar.setPosition(15, 50);
		this._progressBar.setPercentage(1 / 7);
		this._svContainer.addChild(this._progressBar);

		// this._bubble = BaseBitmap.create("acbeautyvoteview_common_bubble");
		// this._svContainer.addChild(this._bubble);

		// this._bubbleTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1Bubble-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
		// this._bubbleTF.setPosition(this._bubble.x + this._bubble.width / 2 - this._bubbleTF.width / 2, this._bubble.y + this._bubble.height / 2 - this._bubbleTF.height / 2);
		// this._svContainer.addChild(this._bubbleTF);

		this.initSchedule();

		let battleInfoBtn = ComponentManager.getButton("acbeautyvoteview_battleinfobtn-" + this.code, null, () => {
			ViewController.getInstance().openView(ViewConst.POPUP.ACBEAUTYVOTEPLAYERBATTLEINFOPOPUPVIEW, { aid: this.aid, code: this.code, joinInfoList: this._joinInfoList, nowround: this._playerInfoData.nowround });

		}, this);
		battleInfoBtn.setPosition(topBg.x + topBg.width / 2 - battleInfoBtn.width / 2, -213);
		this.addChild(battleInfoBtn);

		this._acTimeDate = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1AcTimeDate-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		this._acTimeDate.setPosition(topBg.x + 30, topBg.y + topBg.height + 8);
		this.addChild(this._acTimeDate);

		this._acTime = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1AcTime-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		this._acTime.setPosition(this._acTimeDate.x, this._acTimeDate.y + this._acTimeDate.height + 8);
		this.addChild(this._acTime);


		let itembg = BaseBitmap.create("public_9_resbg");
		itembg.setPosition(topBg.x + topBg.width - 200, this._acTimeDate.y);
		this.addChild(itembg);



		let itemBM = BaseBitmap.create("acbeautyvoteview_acitemsmall-" + this.code);
		itemBM.anchorOffsetX = itemBM.width / 2;
		itemBM.anchorOffsetY = itemBM.height / 2;
		itemBM.setScale(0.8);
		itemBM.setPosition(itembg.x + 20, itembg.y + itembg.height / 2);
		this.addChild(itemBM);

		this._itemNumTF = ComponentManager.getTextField("1111", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._itemNumTF.setPosition(itemBM.x + itemBM.width / 2 + 5, itembg.y + itembg.height / 2 - this._itemNumTF.height / 2);
		this.addChild(this._itemNumTF);

		let addItembtn = ComponentManager.getButton("mainui_btn1", null, this.addItembtnClick, this)
		addItembtn.setPosition(itembg.x + itembg.width - 20, itembg.y + itembg.height / 2 - addItembtn.height / 2);
		this.addChild(addItembtn);


		this._playerContainer = new BaseDisplayObjectContainer();
		// this._playerContainer.y = this._acTime.y + this._acTime.height;
		this.addChild(this._playerContainer);

		this.initPlayer();

		this._buttomDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1ButtomDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
		this._buttomDescTF.lineSpacing = 3;
		this._buttomDescTF.width = topBg.width;
		this._buttomDescTF.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(this._buttomDescTF);

		let h = ((GameConfig.stageHeigth - this.getViewTitleButtomY() - 230) - this._playerContainer.height - this._buttomDescTF.height) / 3;

		this._playerContainer.setPosition(0, this._acTime.y + this._acTime.height + h);
		this._buttomDescTF.setPosition(topBg.x + topBg.width / 2 - this._buttomDescTF.width / 2, this._playerContainer.y + this._playerContainer.height + h);

		TickManager.addTick(this.tick, this);
	}
	private initPlayer() {
		let leftPlayerScale = 0.59;
		let itemScale = 0.8;

		let leftPlayerBg = BaseLoadBitmap.create("acbeautyvoteview_npcbg-" + this.code);
		leftPlayerBg.width = 204;
		leftPlayerBg.height = 286;
		leftPlayerBg.setPosition(65, 0);
		leftPlayerBg.addTouchTap(this.playerInfoClick, this, [0])


		this._leftPlayer = BaseLoadBitmap.create("acbeautyvoteview_player1-" + this.code);
		this._leftPlayer.width = 300 ;
		this._leftPlayer.height = 385;
		this._leftPlayer.setScale(leftPlayerScale);
		this._leftPlayer.setPosition(leftPlayerBg.x + leftPlayerBg.width / 2 - this._leftPlayer.width / 2 * leftPlayerScale, leftPlayerBg.y + 30);
		this._playerContainer.addChild(this._leftPlayer);
		this._playerContainer.addChild(leftPlayerBg);

		this._leftPlayerTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + "1" + "-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		this._leftPlayerTF.setPosition(this._leftPlayer.x + this._leftPlayer.width / 2 * 0.59 - this._leftPlayerTF.width / 2, leftPlayerBg.y + leftPlayerBg.height - this._leftPlayerTF.height - 20);
		this._playerContainer.addChild(this._leftPlayerTF);

		this._leftMask = BaseBitmap.create("acbeautyvoteview_black");
		this._leftMask.width = 186;
		this._leftMask.height = 261;
		this._leftMask.setPosition(leftPlayerBg.x + leftPlayerBg.width / 2 - this._leftMask.width / 2, leftPlayerBg.y + leftPlayerBg.height / 2 - this._leftMask.height / 2)
		this._playerContainer.addChild(this._leftMask);
		this._leftMask.alpha = 0.4;

		this._leftWin = BaseBitmap.create("acbeautyvoteview_win-" + this.code);
		// this._leftWin.setPosition(leftPlayerBg.x + leftPlayerBg.width / 2 - this._leftWin.width / 2, leftPlayerBg.y + leftPlayerBg.height / 2 - this._leftWin.height / 2);
		this._leftWin.setPosition(leftPlayerBg.x, leftPlayerBg.y);
		this._playerContainer.addChild(this._leftWin);

		this._leftItemBg = BaseBitmap.create("acbeautyvoteview_joinflag");
		this._leftItemBg.setPosition(leftPlayerBg.x + leftPlayerBg.width - this._leftItemBg.width - 9, leftPlayerBg.y + 13)
		this._playerContainer.addChild(this._leftItemBg);

		this._leftMyItemNumTF = ComponentManager.getTextField("99999", 16, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._leftMyItemNumTF.setPosition(this._leftItemBg.x + this._leftItemBg.width - this._leftMyItemNumTF.width - 30, this._leftItemBg.y + 14 - this._leftMyItemNumTF.height / 2);
		this._playerContainer.addChild(this._leftMyItemNumTF);


		let leftItemContainer = new BaseDisplayObjectContainer();
		this._playerContainer.addChild(leftItemContainer);



		let leftItemBg = BaseBitmap.create("public_9_resbg");
		leftItemBg.setPosition(0, 0);
		leftItemContainer.addChild(leftItemBg);



		let leftitemBM = BaseBitmap.create("acbeautyvoteview_acitemsmall-" + this.code);
		leftitemBM.anchorOffsetX = leftitemBM.width / 2;
		leftitemBM.anchorOffsetY = leftitemBM.height / 2;
		leftitemBM.setScale(0.8);
		leftitemBM.setPosition(leftItemBg.x + 20, leftItemBg.y + leftItemBg.height / 2);
		leftItemContainer.addChild(leftitemBM);

		this._leftItemNumTF = ComponentManager.getTextField("1111", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._leftItemNumTF.setPosition(leftitemBM.x + leftitemBM.width / 2 + 5, leftitemBM.y - this._leftItemNumTF.height / 2);
		leftItemContainer.addChild(this._leftItemNumTF);

		leftItemContainer.setScale(itemScale);
		leftItemContainer.setPosition(leftPlayerBg.x + leftPlayerBg.width / 2 - leftItemContainer.width / 2 * itemScale, leftPlayerBg.y + leftPlayerBg.height);

		//对战
		this._battleBM = BaseBitmap.create("acbeautyvoteview_battle-" + this.code);
		this._battleBM.setPosition(GameConfig.stageWidth / 2 - this._battleBM.width / 2, leftPlayerBg.y + leftPlayerBg.height / 2 - this._battleBM.height / 2);
		this._playerContainer.addChild(this._battleBM);

		let rightPlayerBg = BaseLoadBitmap.create("acbeautyvoteview_npcbg-" + this.code);
		rightPlayerBg.width = 204;
		rightPlayerBg.height = 286;
		rightPlayerBg.setPosition(GameConfig.stageWidth - leftPlayerBg.width - 65, 0);
		rightPlayerBg.addTouchTap(this.playerInfoClick, this, [1])


		this._rightPlayer = BaseLoadBitmap.create("acbeautyvoteview_player2-" + this.code);
		this._rightPlayer.width = 300 ;
		this._rightPlayer.height = 385;
		this._rightPlayer.setScale(leftPlayerScale);
		this._rightPlayer.setPosition(rightPlayerBg.x + rightPlayerBg.width / 2 - this._rightPlayer.width / 2 * leftPlayerScale, rightPlayerBg.y + 30);
		this._playerContainer.addChild(this._rightPlayer);
		this._playerContainer.addChild(rightPlayerBg);

		this._rightPlayerTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + "2" + "-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		this._rightPlayerTF.setPosition(this._rightPlayer.x + this._rightPlayer.width / 2 * leftPlayerScale - this._rightPlayerTF.width / 2, rightPlayerBg.y + rightPlayerBg.height - this._rightPlayerTF.height - 20);
		this._playerContainer.addChild(this._rightPlayerTF);

		this._rightItemBg = BaseBitmap.create("acbeautyvoteview_joinflag");
		this._rightItemBg.setPosition(rightPlayerBg.x + rightPlayerBg.width - this._rightItemBg.width - 9, rightPlayerBg.y + 13)
		this._playerContainer.addChild(this._rightItemBg);

		this._rightMyItemNumTF = ComponentManager.getTextField("99999", 16, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rightMyItemNumTF.setPosition(this._rightItemBg.x + this._rightItemBg.width - this._rightMyItemNumTF.width - 30, this._rightItemBg.y + 14 - this._rightMyItemNumTF.height / 2);
		this._playerContainer.addChild(this._rightMyItemNumTF);


		this._rightMask = BaseBitmap.create("acbeautyvoteview_black");
		this._rightMask.width = 186;
		this._rightMask.height = 261;
		this._rightMask.setPosition(rightPlayerBg.x + rightPlayerBg.width / 2 - this._rightMask.width / 2, rightPlayerBg.y + rightPlayerBg.height / 2 - this._rightMask.height / 2)
		this._playerContainer.addChild(this._rightMask);
		this._rightMask.alpha = 0.4;

		this._rightWin = BaseBitmap.create("acbeautyvoteview_win-" + this.code);
		// this._rightWin.setPosition(rightPlayerBg.x + rightPlayerBg.width / 2 - this._rightWin.width / 2, rightPlayerBg.y + rightPlayerBg.height / 2 - this._rightWin.height / 2);
		this._rightWin.setPosition(rightPlayerBg.x, rightPlayerBg.y);
		this._playerContainer.addChild(this._rightWin);

		let rightItemContainer = new BaseDisplayObjectContainer();
		this._playerContainer.addChild(rightItemContainer);



		let rightItemBg = BaseBitmap.create("public_9_resbg");
		rightItemBg.setPosition(0, 0);
		rightItemContainer.addChild(rightItemBg);



		let rightitemBM = BaseBitmap.create("acbeautyvoteview_acitemsmall-" + this.code);
		rightitemBM.anchorOffsetX = rightitemBM.width / 2;
		rightitemBM.anchorOffsetY = rightitemBM.height / 2;
		rightitemBM.setScale(0.8);
		rightitemBM.setPosition(rightItemBg.x + 20, rightItemBg.y + rightItemBg.height / 2);
		rightItemContainer.addChild(rightitemBM);

		this._rightItemNumTF = ComponentManager.getTextField("1111", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._rightItemNumTF.setPosition(rightitemBM.x + rightitemBM.width / 2 + 5, rightitemBM.y - this._rightItemNumTF.height / 2);
		rightItemContainer.addChild(this._rightItemNumTF);

		rightItemContainer.setScale(itemScale);
		rightItemContainer.setPosition(rightPlayerBg.x + rightPlayerBg.width / 2 - rightItemContainer.width / 2 * itemScale, rightPlayerBg.y + rightPlayerBg.height);

	}

	private initSchedule() {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		for (let i = 0; i < cfg.beautyVoteScheduleItemCfgList.length; i++) {
			let value = (i + 1) / cfg.beautyVoteScheduleItemCfgList.length;
			let itemCfg = cfg.beautyVoteScheduleItemCfgList[i];

			let pointbg = BaseBitmap.create("acbeautyvoteview_pointbg");
			pointbg.anchorOffsetX = pointbg.width / 2;
			pointbg.anchorOffsetY = pointbg.height / 2;
			pointbg.setPosition(this._progressBar.x + this._progressBar.width * value, this._progressBar.y + this._progressBar.height / 2);
			this._svContainer.addChild(pointbg);

			let point = BaseBitmap.create("acbeautyvoteview_normalpoint");
			point.anchorOffsetX = point.width / 2;
			point.anchorOffsetY = point.height / 2;
			point.setPosition(pointbg.x, pointbg.y);
			this._svContainer.addChild(point);

			let joinInfoBtn = ComponentManager.getButton("acbeautyvoteview_joininfobtn", null, this.joinInfoBtnClick, this, [itemCfg]);
			joinInfoBtn.setPosition(pointbg.x - joinInfoBtn.width / 2, pointbg.y + pointbg.height / 2 + 2);
			this._svContainer.addChild(joinInfoBtn);
			joinInfoBtn.setTextSize(TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
			joinInfoBtn.setText(LanguageManager.getlocal("acBeautyVoteViewTab1GameTime" + itemCfg.id + "-" + this.code, [App.DateUtil.getFormatBySecond(vo.st + itemCfg.startTime, 7)]), false);
			this._scheduleInfoList.push({ pointbg: pointbg, point: point, joinInfoBtn: joinInfoBtn, itemCfg: itemCfg })
		}
		this._btnEffect = BaseBitmap.create("acbeautyvoteview_btneffect");
		this._svContainer.addChild(this._btnEffect);
		this.refreshSchedule();
	}


	private refreshSchedule(btnId?: number) {

		if (btnId) {
			this._nowRound = btnId;
		}
		for (let i = 0; i < this._scheduleInfoList.length; i++) {
			let scheduleInfo = this._scheduleInfoList[i];
			if (scheduleInfo.itemCfg.id == this._nowRound) {
				scheduleInfo.joinInfoBtn.updateButtonImage(BaseButton.BTN_STATE2);
				scheduleInfo.joinInfoBtn.touchEnabled = false;
				this._btnEffect.setPosition(scheduleInfo.joinInfoBtn.x + scheduleInfo.joinInfoBtn.width / 2 - this._btnEffect.width / 2, scheduleInfo.joinInfoBtn.y + scheduleInfo.joinInfoBtn.height / 2 - this._btnEffect.height / 2);
			}
			else {
				scheduleInfo.joinInfoBtn.updateButtonImage(BaseButton.BTN_STATE1);
				scheduleInfo.joinInfoBtn.touchEnabled = true;
			}
			if (scheduleInfo.itemCfg.id == this._playerInfoData.nowround) {
				this._progressBar.setPercentage((i + 1) / this._scheduleInfoList.length);
				scheduleInfo.point.setRes("acbeautyvoteview_normalpoint");
				// this._bubble.setPosition(scheduleInfo.pointbg.x - this._bubble.width / 2, scheduleInfo.pointbg.y - scheduleInfo.pointbg.height / 2 - this._bubble.height - 2);
				// this._bubbleTF.setPosition(this._bubble.x + this._bubble.width / 2 - this._bubbleTF.width / 2, this._bubble.y + this._bubble.height / 2 - this._bubbleTF.height / 2);
			}
			else {
				scheduleInfo.point.setRes("acbeautyvoteview_garypoint");
			}
			// if (scheduleInfo.itemCfg.id <= this._playerInfoData.nowround) {
			// 	scheduleInfo.point.setRes("acbeautyvoteview_normalpoint");
			// }
			// else {
			// 	scheduleInfo.point.setRes("acbeautyvoteview_garypoint");
			// }
		}

	}

	/**刷新界面 */
	private refreshView() {
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (this._itemNumTF) {
			this._itemNumTF.text = String(vo.getFlowersValue());
		}


	}
	/**参赛选手信息 */
	private refreshPlayerInfo() {
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let flowersinfo = vo.getSingleRoundFlowers(this._round);
		this._acTimeDate.text = LanguageManager.getlocal("acBeautyVoteViewTab1AcTimeDate-" + this.code, [vo.getSingleRoundAcTimeAndHour(this._round)]);
		this._leftPlayer.setload("acbeautyvoteview_player" + this._playerRoundInfoData.left.id + "-" + this.code);
		this._leftPlayerTF.text = LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + this._playerRoundInfoData.left.id + "-" + this.code);
		this._leftPlayerTF.x = this._leftPlayer.x + this._leftPlayer.width / 2 * 0.59 - this._leftPlayerTF.width / 2;
		this._leftItemNumTF.text = String(this._playerRoundInfoData.left.score);
		if (flowersinfo.letfValue > 0) {
			this._leftItemBg.setVisible(true);
			this._leftMyItemNumTF.setVisible(true);
			this._leftMyItemNumTF.text = String(flowersinfo.letfValue);
			this._leftMyItemNumTF.setPosition(this._leftItemBg.x + this._leftItemBg.width - this._leftMyItemNumTF.width - 30, this._leftItemBg.y + 14 - this._leftMyItemNumTF.height / 2);
		}
		else {
			this._leftItemBg.setVisible(false);
			this._leftMyItemNumTF.setVisible(false);
		}

		if (this._round == this._playerInfoData.nowround) {
			if (!vo.checkIsInEndShowTime()) {
				this._battleBM.setVisible(true);
			}
			else {
				this._battleBM.setVisible(false);
			}
			this._buttomDescTF.text = LanguageManager.getlocal("acBeautyVoteViewTab1ButtomDesc-" + this.code);
		}
		else {
			this._battleBM.setVisible(false);
			this._buttomDescTF.text = LanguageManager.getlocal("acBeautyVoteViewTab1ButtomDesc-" + this.code);
		}
		if (this._joinInfoList[this._round - 1].win) {
			if (this._round == 7) {
				this._buttomDescTF.text = LanguageManager.getlocal("acBeautyVoteViewTab1ButtomDesc3-" + this.code, [LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + this._joinInfoList[this._round - 1].win + "-" + this.code)]);
			}
			else {
				this._buttomDescTF.text = LanguageManager.getlocal("acBeautyVoteViewTab1ButtomDesc2-" + this.code, [LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + this._joinInfoList[this._round - 1].win + "-" + this.code)]);
			}
		}
		else {
			this._buttomDescTF.text = LanguageManager.getlocal("acBeautyVoteViewTab1ButtomDesc-" + this.code);
		}
		this._rightPlayer.setload("acbeautyvoteview_player" + this._playerRoundInfoData.right.id + "-" + this.code);
		this._rightPlayerTF.text = LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + this._playerRoundInfoData.right.id + "-" + this.code);
		this._rightPlayerTF.x = this._rightPlayer.x + this._rightPlayer.width / 2 * 0.59 - this._rightPlayerTF.width / 2;
		this._rightItemNumTF.text = String(this._playerRoundInfoData.right.score);
		if (flowersinfo.rightValue > 0) {
			this._rightItemBg.setVisible(true);
			this._rightMyItemNumTF.setVisible(true);
			this._rightMyItemNumTF.text = String(flowersinfo.rightValue);
			this._rightMyItemNumTF.setPosition(this._rightItemBg.x + this._rightItemBg.width - this._rightMyItemNumTF.width - 30, this._rightItemBg.y + 14 - this._rightMyItemNumTF.height / 2);

		}
		else {
			this._rightItemBg.setVisible(false);
			this._rightMyItemNumTF.setVisible(false);
		}

		if (this._joinInfoList[this._round - 1] && this._joinInfoList[this._round - 1].win) {
			if (this._joinInfoList[this._round - 1].win == this._playerRoundInfoData.left.id) {
				this._leftMask.setVisible(false);
				this._leftWin.setVisible(true);
				this._rightMask.setVisible(true);
				this._rightWin.setVisible(false);
			}
			else {
				this._leftMask.setVisible(true);
				this._leftWin.setVisible(false);
				this._rightMask.setVisible(false);
				this._rightWin.setVisible(true);
			}
		}
		else {
			this._leftMask.setVisible(false);
			this._leftWin.setVisible(false);
			this._rightMask.setVisible(false);
			this._rightWin.setVisible(false);
		}


	}
	private playerInfoClick(event: egret.Event, args: any) {
		let playerId: number = 0;
		let voteId: number = 0;
		if (args == 0) {
			playerId = this._playerRoundInfoData.left.id;
			voteId = 1;
		}
		else {
			playerId = this._playerRoundInfoData.right.id;
			voteId = 2;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ACBEAUTYVOTEPLAYERINFOPOPUPVIEW, { playerId: playerId, voteId: voteId, round: this._round, aid: this.aid, code: this.code });
	}
	/**加鲜花数量 */
	private addItembtnClick() {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		// let msg = LanguageManager.getlocal("acBeautyVoteGetNotFlowesMsg-" + this.code);
		// let title = "acBeautyVoteGetNotFlowesTitle-" + this.code;
		// ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
		// 	msg: msg, title: title, needCancel: true, canelTxt: "acBeautyVoteGetNotFlowesCanel-" + this.code, confirmTxt: "acBeautyVoteGetNotFlowesBuyFlowes-" + this.code, handler: this, callback: () => {
		// 		if (vo.getBuyTimes() >= cfg.limit) {
		// 			App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteNotBuyFlowesTip-" + this.code))
		// 			return;
		// 		}
		// 		ViewController.getInstance().openView(ViewConst.POPUP.ACBEAUTYVOTEBUYITEMSLIDERPOPUPVIEW, { aid: this.aid, code: this.code });
		// 	}, cancelcallback: () => {
		// 		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACBEAUTYVOTE_CHECKTASK);
		// 	}
		// })
		if (Api.playerVoApi.getPlayerLevel() < cfg.lvLimit) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acBeautybuyLvUnfullTip-" + this.code, [LanguageManager.getlocal("officialTitle" + String(cfg.lvLimit))]));
			return;
		}
		if (vo.getBuyTimes() >= cfg.limit) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteNotBuyFlowesTip-" + this.code))
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ACBEAUTYVOTEBUYITEMSLIDERPOPUPVIEW, { aid: this.aid, code: this.code });

	}

	private joinInfoBtnClick(param: Config.AcCfg.BeautyVoteScheduleItemCfg) {
		if (param.id > this._playerInfoData.nowround) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteViewTab1NoGameTip-" + this.code));
			return
		}
		if (this._round == param.id) {
			return;
		}
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		this._round = param.id;
		this.request(NetRequestConst.REQUEST_BEAUTYVOTE_GETINFO, { activeId: vo.aidAndCode, round: param.id });
		this.refreshSchedule(param.id);
	}

	public tick() {
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (this._playerRoundInfoData) {
			this._acTime.text = vo.getSingleRoundAcCountDown(this._round);
		}

		// this._timebg.width = 60 + this._acTimeTF.width;
		// this._timebg.x = this._titlebg.x + 417 - this._timebg.width / 2;
		// this._acTimeTF.setPosition(this._timebg.x + this._timebg.width / 2 - this._acTimeTF.width / 2, this._timebg.y + this._timebg.height / 2 - this._acTimeTF.height / 2);

	}

	private getInfoHandle(event: egret.Event) {
		// 		left: {id: 1}
		// nowround: 1
		// right: {id: 2}
		// allinfo
		if (event.data.ret) {

			this._playerRoundInfoData = event.data.data.data;
			this.initjoinInfo(this._playerRoundInfoData.allinfo, this._playerRoundInfoData.allScore);
			if (!this._isStartInit) {
				this._isStartInit = true;
				this._playerInfoData = event.data.data.data;
				this.initShowUI();
			}
			this.refreshView();
			this.refreshPlayerInfo();
			this.tick();


		}
	}
	private rechargeRewardHandle(event: egret.Event) {
		if (event.data.ret) {
			this.refreshView();
		}
	}
	/**献花 */
	private voteHandle(event: egret.Event) {
		if (event.data.ret) {
			this._playerRoundInfoData = event.data.data.data;
			this.refreshView();
			this.refreshPlayerInfo();
			this.changeNewScore(this._playerRoundInfoData.left, this._playerRoundInfoData.right, this._playerRoundInfoData.nowround);
		}
	}

	private changeNewScore(left: any, right: any, round: number) {
		// 		getScore: 1
		// left:
		// id: 3
		// score: 1510
		// __proto__: Object
		// nowround: 7
		// right: {score: 2017, id: 6}
		for (let i = 0; i < this._joinInfoList.length; i++) {
			let joinInfo = this._joinInfoList[i];
			if (joinInfo.round == round) {
				joinInfo.leftscore = left.score;
				joinInfo.rightscore = right.score;
			}
		}
	}






	/** 转换数据*/
	private initjoinInfo(allinfo: any, allScore: any) {
		if (!allinfo) {
			return;
		}
		this._joinInfoList = [];
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		for (let i = 0; i <= cfg.beautyVoteScheduleItemCfgList.length; i++) {
			let joinInfo: { left: number, right: number, win: number, round: number, leftscore: number, rightscore: number } = { left: allinfo[i * 2], right: allinfo[i * 2 + 1], win: allinfo[i + 8], round: i + 1, leftscore: allScore[i * 2], rightscore: allScore[i * 2 + 1] };
			this._joinInfoList.push(joinInfo);
		}
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_GETINFO, this.getInfoHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_VOTE, this.voteHandle, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		TickManager.removeTick(this.tick, this);
		this._acTimeDate = null;
		this._acTime = null;
		this._scrollView = null;
		this._svContainer = null;
		this._scheduleInfoList = [];
		this._progressBar = null;
		this._btnEffect = null;
		// this._bubble = null;
		// this._bubbleTF = null;
		this._itemNumTF = null;
		this._playerContainer = null;
		this._leftPlayer = null;
		this._leftItemNumTF = null;
		this._leftPlayerTF = null;
		this._rightPlayer = null;
		this._rightItemNumTF = null;
		this._rightPlayerTF = null;
		this._nowRound = 0;
		this._playerInfoData = null;
		this._isStartInit = false;
		this._round = 0;
		this._playerRoundInfoData = null;
		this._joinInfoList = [];
		this._leftItemBg = null;
		this._leftMyItemNumTF = null;
		this._rightItemBg = null;
		this._rightMyItemNumTF = null;
		this._leftMask = null;
		this._leftWin = null;
		this._rightMask = null;
		this._rightWin = null;
		this._battleBM = null;
		this._buttomDescTF = null;
		super.dispose();
	}

}