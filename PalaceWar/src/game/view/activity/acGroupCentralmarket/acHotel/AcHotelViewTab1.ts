/**
  * 中秋活动 Tab1
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnViewTab1
  */
class AcHotelViewTab1 extends AcCommonViewTab {

	private _findNumTF: BaseTextField = null;

	private _progress: ProgressBar = null;

	private _boxInfoList: { "box": BaseBitmap; "boxLight": BaseBitmap }[] = [];

	private _oneNeedNumTF: BaseTextField = null;

	private _isSendMessage: boolean = false;
	private _activityID: string = null;

	private _maxBoxNum: number = 0;


	private _bg: BaseLoadBitmap = null;

	private _type: string = null;

	private _speakStr: string = null;
	private _speakTF: BaseTextField = null;
	private _speakTail: BaseBitmap = null;
	private _speakBg: BaseBitmap = null;
	private _servantBM: BaseLoadBitmap = null;
	private _messageLength: number = 0;

	private _npcBM: BaseBitmap = null;
	private _bowlBM: BaseBitmap = null;
	private _jarsBM: BaseBitmap = null;
	/**
	 * 记录一下奖励
	 */
	private _nowReward: string = null;
	private _acCDTxt: BaseTextField = null;

	// private aid:string ="";
	// private code:string =""; 

	public constructor(param?) {
		super();
		this.param = param;
		this.initView();
	}
	public initView() {

		// this.aid = this.param.data.aid;
		// this.code =this.param.data.code;

		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELLTTTERY, this.lotteryHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMA, this.receiveBoxHandle, this);

		this._activityID = this.aid + "-" + this.code;
		let cfg = <Config.AcCfg.HotelCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		this._maxBoxNum = cfg.getBoxList()[cfg.getBoxList().length - 1].needNum;
		let bgStr = "achotelview_bg-" + this.getUiCode();
		if (this.code == "1") {
			bgStr = "achotelview_bg";
		}
		let bg = BaseLoadBitmap.create(bgStr);
		// let bg = BaseLoadBitmap.create("achotelview_bg");
		bg.width = 611 ;
		bg.height = 750 ;
		bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - bg.height - 250);
		this.addChild(bg);

		//遮照
		let bgY = bg.y;
		let bglazyHeght = bg.y
		if (bgY >= 10) {
			bgY = 0;
			bglazyHeght = 0;
		}
		else {
			bgY = Math.abs(bg.y) + 10
		}
		let maskRect = new egret.Rectangle(0, bgY, bg.width, bg.height - Math.abs(bglazyHeght));
		bg.mask = maskRect;

		let npcBMStr = "achotelview_idle-" + this.getUiCode();
		if (this.code == "1") {
			npcBMStr = "achotelview_idle";
		}
		this._npcBM = BaseBitmap.create(npcBMStr);
		this._npcBM.setPosition(bg.x + bg.width / 2 - this._npcBM.width / 2, bg.y + bg.height - this._npcBM.height - 100);
		this.addChild(this._npcBM);

		let jarsBMStr = "achotelview_jars-" + this.getUiCode();
		if (this.code == "1") {
			jarsBMStr = "achotelview_jars";
		}
		this._jarsBM = BaseBitmap.create(jarsBMStr);
		this._jarsBM.setPosition(bg.x + bg.width - this._jarsBM.width - 90, bg.y + bg.height - this._jarsBM.height / 2 - 90)
		this.addChild(this._jarsBM);

		let bowlBMStr = "achotelview_bowl-" + this.getUiCode();
		if (this.code == "1") {
			bowlBMStr = "achotelview_bowl";
		}
		this._bowlBM = BaseBitmap.create(bowlBMStr);
		this._bowlBM.setPosition(bg.x + 120, bg.y + bg.height - this._bowlBM.height / 2 - 50);

		this.addChild(this._bowlBM);

		if (this.getUiCode() == "2") {
			this._npcBM.setPosition(bg.x + 0, bg.y + bg.height - this._npcBM.height - 78);
			this._jarsBM.setPosition(bg.x + 394, bg.y + bg.height - this._jarsBM.height / 2 - 93)
			this._bowlBM.setPosition(bg.x + 141, bg.y + bg.height - this._bowlBM.height / 2 - 80); //酒杯
			// this._npcBM.setPosition(bg.x + 0, bg.y + 343);
			// this._jarsBM.setPosition(bg.x + 394, bg.y + 729);
			// this._bowlBM.setPosition(bg.x + 141, bg.y + 764);
		}
		if (this.getUiCode() == "3") {
			this._jarsBM.setPosition(bg.x + 394, bg.y + bg.height - this._jarsBM.height / 2 - 93)
			this._bowlBM.setPosition(bg.x + 141, bg.y + bg.height - this._bowlBM.height / 2 - 80); //酒杯
		}

		// 说的话相关
		let talkBg = BaseBitmap.create("public_9_bg25");
		talkBg.width = 240;
		let talkTFKey = this.code == "1" ? "acHotelViewTalk" : "acHotelViewTalk-" + this.code;
		let talkTF = ComponentManager.getTextField(LanguageManager.getlocal(talkTFKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		talkTF.width = 200;
		talkBg.height = talkTF.height + 20;
		talkBg.setPosition(bg.x + 374, bg.y + bg.height - 510);
		talkTF.setPosition(talkBg.x + 20, talkBg.y + 10);
		this.addChild(talkBg);
		this.addChild(talkTF);

		let tailBM = BaseBitmap.create("public_9_bg25_tail");
		tailBM.setPosition(talkBg.x + 30, talkBg.y + talkBg.height - 3);
		this.addChild(tailBM);

		let infoStr = this.code == "1" ? "achotelview_infobtn" : "achotelview_infobtn-" + this.getUiCode();
		let infoBtn = ComponentManager.getButton(infoStr, "", this.infoBtnClick, this);
		infoBtn.setPosition(bg.x + 10, bg.y + bg.height - infoBtn.height - 10);
		this.addChild(infoBtn);
		// 进度相关
		let buttombg = BaseBitmap.create("public_9_bg49");
		buttombg.width = 612;
		buttombg.height = 110;
		buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2, bg.y + bg.height);
		this.addChild(buttombg);

		let numBg = BaseBitmap.create("common_numbg");
		numBg.setPosition(buttombg.x - 2, buttombg.y + buttombg.height / 2 - numBg.height / 2);
		this.addChild(numBg);

		let numTFkey = this.code == "1" ? "acHotelNumTitle" : "acHotelNumTitle-" + this.code;
		let numTF = ComponentManager.getTextField(LanguageManager.getlocal(numTFkey), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2, numBg.y + numBg.height - numTF.height - 5);
		this.addChild(numTF);

		this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._findNumTF.width = 50;
		this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
		this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2, numBg.y + 12);
		this.addChild(this._findNumTF);

		this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 482);
		this._progress.setPosition(buttombg.x + 103, buttombg.y + buttombg.height - this._progress.height - 25)
		this.addChild(this._progress);

		//一次相关
		let oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.oneBtnClick, this)
		oneBtn.setPosition(85, buttombg.y + buttombg.height + 33);
		this.addChild(oneBtn);

		let btniconid = GameData.formatRewardItem(cfg.hotelGetReward)[0].id;
		let oneBtnIcon = BaseLoadBitmap.create("itemicon" + btniconid);
		oneBtnIcon.width = 35;
		oneBtnIcon.height = 35;
		oneBtnIcon.setPosition(oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 12, oneBtn.y + oneBtn.height / 2 - oneBtnIcon.height / 2);
		this.addChild(oneBtnIcon);

		let oneBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
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

		this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.hotelCost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2);
		this.addChild(this._oneNeedNumTF);

		let findOneTFKey = this.code == "1" ? "acHotelDrinkOne" : "acHotelDrinkOne-" + this.code;
		let findOneTF = ComponentManager.getTextField(LanguageManager.getlocal(findOneTFKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		findOneTF.setPosition(oneBtn.x + oneBtn.width / 2 - findOneTF.width / 2, oneBtn.y + oneBtn.height -3);
		this.addChild(findOneTF);

		//十次相关
		let tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.tenBtnClick, this);
		tenBtn.setPosition(GameConfig.stageWidth - tenBtn.width - 90, buttombg.y + buttombg.height + 33);
		this.addChild(tenBtn);

		let tenBtnIcon = BaseLoadBitmap.create("itemicon" + btniconid);
		tenBtnIcon.width = 35;
		tenBtnIcon.height = 35;
		tenBtnIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 12, tenBtn.y + tenBtn.height / 2 - tenBtnIcon.height / 2);
		this.addChild(tenBtnIcon);

		let tenBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
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

		let tenNeedGemTF = ComponentManager.getTextField(String(cfg.hotelCost * 10 * cfg.hotelDiscount), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2);
		this.addChild(tenNeedGemTF);

		let findTenTFKey = this.code == "1" ? "acHotelDrinkTen" : "acHotelDrinkTen-" + this.code;
		let findTenTF = ComponentManager.getTextField(LanguageManager.getlocal(findTenTFKey), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		findTenTF.setPosition(tenBtn.x + tenBtn.width / 2 - findTenTF.width / 2, tenBtn.y + tenBtn.height -3);
		this.addChild(findTenTF);

		let tipTFKey = this.code == "1" ? "acHotelTip" : "acHotelTip-" + this.code;
		let tipTF = ComponentManager.getTextField(LanguageManager.getlocal(tipTFKey), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
		tipTF.textAlign = egret.HorizontalAlign.CENTER;
		tipTF.setPosition(bg.x + bg.width / 2 - tipTF.width / 2, 14);
		this.addChild(tipTF);

		// 倒计时
		let countDownBg: BaseBitmap = BaseBitmap.create("public_searchdescbg");
		countDownBg.setPosition(GameConfig.stageWidth / 2 - countDownBg.width / 2, bg.y + bg.height - countDownBg.height);
		this.addChild(countDownBg);

		let acCDTxt: BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this.addChild(acCDTxt);
		this._acCDTxt = acCDTxt;
		let vo = <AcMarryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let deltaT = vo.getAcResidueTime();
		if (deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
		}
		else {
			this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
		}
		acCDTxt.setPosition(GameConfig.stageWidth / 2 - acCDTxt.width / 2, countDownBg.y + countDownBg.height / 2 - acCDTxt.height / 2);

		this._bg = bg;
		this.initBox();
		this.refreshView();
		SoundManager.playEffect("effect_servant_" + this.getServantId());
	}
	/**
	 * 抽奖的返回数据
	 */
	private lotteryHandle(event: egret.Event) {
		let ret = event.data.ret
		let data = event.data.data.data;
		if (ret) {

			let rewards = data.otherrewards;
			let otherReward = data.noterewards;
			let timer = 700;
			if (this._type == "1") {

				egret.Tween.get(this._npcBM).call(() => {
					egret.Tween.get(this._bowlBM).to({ alpha: 0 }, timer).call(() => {
						egret.Tween.removeTweens(this._bowlBM);
					}, this);
				}, this).wait(timer).call(() => {
					let npcBMStr = this.code == "1" ? "achotelview_bowlani1" : "achotelview_bowlani1-" + this.getUiCode();
					this._npcBM.setRes(npcBMStr);
				}, this).wait(timer).call(() => {
					let npcBMStr = this.code == "1" ? "achotelview_bowlani2" : "achotelview_bowlani2-" + this.getUiCode();
					this._npcBM.setRes(npcBMStr);
				}, this).wait(timer).call(() => {
					egret.Tween.removeTweens(this._npcBM);
					let npcBMStr = this.code == "1" ? "achotelview_idle" : "achotelview_idle-" + this.getUiCode();
					this._npcBM.setRes(npcBMStr);
					this._bowlBM.alpha = 1;
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
					this.refreshView();
					this._isSendMessage = false;
				}, this);
			}
			else if (this._type == "2") {
				egret.Tween.get(this._npcBM).call(() => {
					egret.Tween.get(this._jarsBM).to({ alpha: 0 }, timer).call(() => {
						egret.Tween.removeTweens(this._jarsBM);
					}, this);
				}, this).wait(timer).call(() => {
					let npcBMStr = this.code == "1" ? "achotelview_jarsani1" : "achotelview_jarsani1-" + this.getUiCode();
					this._npcBM.setRes(npcBMStr);
				}, this).wait(timer).call(() => {
					let npcBMStr = this.code == "1" ? "achotelview_jarsani2" : "achotelview_jarsani2-" + this.getUiCode();
					this._npcBM.setRes(npcBMStr);
				}, this).wait(timer).call(() => {
					egret.Tween.removeTweens(this._npcBM);
					let npcBMStr = this.code == "1" ? "achotelview_idle" : "achotelview_idle-" + this.getUiCode();
					this._npcBM.setRes(npcBMStr);
					this._jarsBM.alpha = 1;
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
					this.refreshView();
					this._isSendMessage = false;
				}, this);
			}


			// let rewards = data.otherrewards;
			// let otherReward = data.noterewards;
			// ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"otherRewards":otherReward,"isPlayAni":true});
			// this.refreshView();
		}
	}
	/**
	 * 宝箱的返回数据
	 */
	private receiveBoxHandle(event: egret.Event) {
		let ret = event.data.ret
		let data = event.data.data.data;
		if (ret) {
			let rewards = data.rewards;

			if (rewards != this._nowReward) {
				let rewardItemvo: RewardItemVo = GameData.formatRewardItem(this._nowReward)[0];
				let servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, {
					"name": servantReward.name, "touch": servantReward.exchange, "message": "changeOtherRewardTip", "callback": () => {
						ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
					}, "handler": this
				});
			}
			else {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "isPlayAni": true });
			}
			this.refreshView();
		}
		// console.log("1");

	}
	/**
	 * 刷新UI
	 */
	private refreshView() {
		this.refreshTF();
		this.refreshBox();
		this.refreshProgress();
	}
	private refreshProgress() {
		let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.HotelCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let percent = vo.lotteryNum() / this._maxBoxNum;
		this._progress.setPercentage(percent);
	}
	private refreshTF() {
		let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.HotelCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (vo.isFree) {
			this._oneNeedNumTF.text = LanguageManager.getlocal("sysFreeDesc");
		}
		else {
			this._oneNeedNumTF.text = String(cfg.hotelCost);
		}

		this._findNumTF.text = String(vo.lotteryNum());



	}
	/**
	 * 刷新宝箱
	 */
	private refreshBox() {
		let cfg = <Config.AcCfg.HotelCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let boxCfg = cfg.getBoxList();
		for (let i = 0; i < this._boxInfoList.length; i++) {
			let needNum = boxCfg[i].needNum;
			let voNum = vo.lotteryNum();
			let isRevice = vo.boxStatus(boxCfg[i].id);
			if (needNum <= voNum) {
				if (isRevice) {
					this._boxInfoList[i].box.setRes("common_box_3");
					this._boxInfoList[i].boxLight.setVisible(false);
					egret.Tween.removeTweens(this._boxInfoList[i].box);
					egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
				}
				else {
					this._boxInfoList[i].box.setRes("common_box_2");
					this._boxInfoList[i].boxLight.setVisible(true);
					egret.Tween.get(this._boxInfoList[i].boxLight, { loop: true }).to({ rotation: this._boxInfoList[i].boxLight.rotation + 360 }, 10000);
					egret.Tween.get(this._boxInfoList[i].box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
				}
			}
			else {
				this._boxInfoList[i].box.setRes("common_box_1");
				this._boxInfoList[i].boxLight.setVisible(false);
				egret.Tween.removeTweens(this._boxInfoList[i].box);
				egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
			}
		}
	}
	/**
	 * 初始化宝箱
	 */
	private initBox() {
		let cfg = <Config.AcCfg.HotelCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let boxCfg = cfg.getBoxList();
		let maxNum = boxCfg[boxCfg.length - 1].needNum;
		for (let i = 0; i < boxCfg.length; i++) {
			let offestX = 0;
			if (i == 1) {
				offestX = 7;
			}
			else if (i == boxCfg.length - 1) {
				offestX = -10;
			}

			let boxbg = BaseBitmap.create("common_boxbg");
			let posX = this._progress.x + (boxCfg[i].needNum / maxNum) * this._progress.width;
			boxbg.setPosition(posX - boxbg.width / 2 + offestX, this._progress.y - boxbg.height);
			boxbg.name = "1";
			this.addChild(boxbg);


			let boxLight = BaseBitmap.create("acturantable_taskbox_light");
			boxLight.anchorOffsetX = boxLight.width / 2;
			boxLight.anchorOffsetY = boxLight.height / 2;
			boxLight.setPosition(boxbg.x + boxbg.width / 2, boxbg.y + boxbg.height / 2);
			this.addChild(boxLight);

			let box = BaseBitmap.create("common_box_1");
			box.anchorOffsetX = box.width / 2;
			box.anchorOffsetY = box.height / 2;
			box.setScale(0.75);
			box.setPosition(boxLight.x, boxLight.y);
			this.addChild(box);
			box.addTouchTap((even: egret.TouchEvent) => {
				let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
				let voNum = vo.lotteryNum();
				let isRevice = vo.boxStatus(boxCfg[i].id);
				let needNum = boxCfg[i].needNum;
				if (needNum <= voNum) {
					if (!isRevice) {
						this._nowReward = boxCfg[i].getReward
						NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMA, { "activeId": this._activityID, "lotteryId": boxCfg[i].id });
						return;
					}
				}
				let ishasCode = true;
				if (this.code == "1") {
					ishasCode = false;
				}
				ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNREWARDINFOPOPUPVIEW, { "code": this.code, "aid": this.aid, "itemCfg": boxCfg[i], ishasCode: ishasCode });
			}, this);

			let boxDescKey = this.code == "1" ? "acHotelBoxNum" : "acHotelBoxNum-" + this.code;
			let boxDesc = ComponentManager.getTextField(LanguageManager.getlocal(boxDescKey, [String(boxCfg[i].needNum)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			boxDesc.setPosition(posX - boxDesc.width / 2 + offestX, this._progress.y + this._progress.height + 3);
			this.addChild(boxDesc);

			if (i == boxCfg.length - 1) {
				let speakStr = this.code == "1" ? "acHotelSpeakTip" : "acHotelSpeakTip-" + this.code;
				this._speakStr = LanguageManager.getlocal(speakStr, [String(boxCfg[i].needNum)]);
				this._speakTF = ComponentManager.getTextField(this._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
				this._speakTail = BaseBitmap.create("public_9_bg25_tail");

				this._speakBg = BaseBitmap.create("public_9_bg25");
				this._speakBg.width = this._speakTF.width + 40;
				let posX = box.x;
				if (posX + this._speakBg.width + 5 > GameConfig.stageWidth) {
					posX = GameConfig.stageWidth - this._speakBg.width - 15;
				}

				this._speakBg.setPosition(posX, box.y - box.height / 2 - this._speakBg.height - this._speakTail.height + 5);
				this.addChild(this._speakBg);

				this._speakTF.setPosition(this._speakBg.x + this._speakBg.width / 2 - this._speakTF.width / 2, this._speakBg.y + this._speakBg.height / 2 - this._speakTF.height / 2);
				this.addChild(this._speakTF);

				this._speakTail.skewY = 180
				this._speakTail.setPosition(box.x, box.y - box.height / 2 - this._speakTail.height);
				this.addChild(this._speakTail);

				this._servantBM = BaseLoadBitmap.create("servant_half_" + this.getServantId());
				let scale = 0.33;
				this._servantBM.height = 177;
				this._servantBM.width = 180;
				this._servantBM.setScale(scale);
				// this._servantBM.setPosition(this._speakBg.x - this._servantBM.width * scale / 2, this._speakBg.y + this._speakBg.height - this._servantBM.height * scale);
				this._servantBM.setPosition(this._speakBg.x - this._servantBM.width * scale + 17, this._speakBg.y + this._speakBg.height - this._servantBM.height * scale);
				this.addChild(this._servantBM);

				egret.Tween.get(this._speakBg, { loop: true }).call(() => {
					this._speakTF.text = "";
					this._speakTail.setVisible(true);
					this._servantBM.setVisible(true);
					this._speakTF.setVisible(true);
					this._speakBg.setVisible(true);
					this._messageLength = 0;
					egret.Tween.get(this._speakTF, { loop: true }).wait(150).call(() => {
						this._speakTF.text = this._speakStr.substr(0, this._messageLength);
						this._messageLength++;
					}, this);
				}, this).wait(this._speakStr.length * 150 + 2000).call(() => {
					this._speakTail.setVisible(false);
					this._servantBM.setVisible(false);
					this._speakTF.setVisible(false);
					this._speakBg.setVisible(false);
					this._messageLength = 0;
					egret.Tween.removeTweens(this._speakTF);
				}, this).wait(10000);

			}

			let boxInfo = { "box": box, "boxLight": boxLight };
			this._boxInfoList.push(boxInfo);

		}

	}

	/**
	 * 查看信息
	 */
	private infoBtnClick() {
		ViewController.getInstance().openView(ViewConst.POPUP.ACHOTELACINFOPOPUPVIEW, { "code": this.code, "aid": this.aid });
	}
	/**
	 * 买一次
	 */
	private oneBtnClick() {
		let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.HotelCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
		if (deltaT < 0) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if (this._isSendMessage) {
			return;
		}
		let cost = cfg.hotelCost;
		if (vo.isFree) {
			cost = 0;
		}
		if (Api.playerVoApi.getPlayerGem() < cost) {
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELLTTTERY, { "activeId": this._activityID, "isTenPlay": 0 });
		this._type = "1";
		this._isSendMessage = true;

	}
	/**
	 * 买十次
	 */
	private tenBtnClick() {
		let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.HotelCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
		if (deltaT < 0) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if (this._isSendMessage) {
			return;
		}
		let cost = cfg.hotelCost * 10 * cfg.hotelDiscount;
		if (Api.playerVoApi.getPlayerGem() < cost) {
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELLTTTERY, { "activeId": this._activityID, "isTenPlay": 1 });
		this._type = "2";
		this._isSendMessage = true;


	}

	public tick(): void {
		let vo = <AcBankBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let deltaT: number = vo.getAcResidueTime();
		if (this._acCDTxt) {
			if (deltaT > 0) {
				this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			}
			else {
				this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
			}
		}
	}
	protected getUiCode() {
		// if (this.code == "3") {
		// 	return "2"
		// }
		return this.code;
	}
	/**servantId */
	protected getServantId() {
		let servantId: string = "1055";
		if (this.code == "1") {
			servantId = "1054";
		}
		else if (this.code == "2" || this.code == "3") {
			servantId = "1055"
		}
		return servantId;
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELLTTTERY, this.lotteryHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMA, this.receiveBoxHandle, this);
		egret.Tween.removeTweens(this._speakTF);
		egret.Tween.removeTweens(this._speakBg);
		egret.Tween.removeTweens(this._bowlBM);
		egret.Tween.removeTweens(this._npcBM);
		egret.Tween.removeTweens(this._jarsBM);
		this._findNumTF = null;
		this._progress = null;
		this._oneNeedNumTF = null;
		this._isSendMessage = false;
		this._boxInfoList = [];
		this._maxBoxNum = null;
		this._speakStr = null;
		this._speakTF = null;
		this._speakTail = null;
		this._speakBg = null;
		this._servantBM = null;
		this._messageLength = 0;
		this._nowReward = null;
		this._type = null;
		this._npcBM = null;
		this._bowlBM = null;
		this._jarsBM = null;
		this._acCDTxt = null;
		// this.aid = null;
		// this.code = null;
		super.dispose();
	}

}