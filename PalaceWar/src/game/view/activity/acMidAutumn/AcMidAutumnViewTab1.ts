/**
  * 中秋活动 Tab1
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnViewTab1
  */
class AcMidAutumnViewTab1 extends AcCommonViewTab {

	private _findNumTF: BaseTextField = null;

	private _progress: ProgressBar = null;

	private _boxInfoList: { "box": BaseBitmap; "boxLight": BaseBitmap }[] = [];

	private _oneNeedNumTF: BaseTextField = null;

	private _isSendMessage: boolean = false;
	private _activityID: string = null;

	private _maxBoxNum: number = 0;

	private _guanghuanBM: BaseBitmap = null;

	private _guanghuanContainer: BaseDisplayObjectContainer = null;

	private _bg: BaseLoadBitmap = null;

	private _type: string = null;

	private _speakStr: string = null;
	private _speakTF: BaseTextField = null;
	private _speakTail: BaseBitmap = null;
	private _speakBg: BaseBitmap = null;
	private _servantBM: BaseLoadBitmap = null;
	private _messageLength: number = 0;
	/**
	 * 记录一下奖励
	 */
	private _nowReward: string = null;

	private _timeTF: BaseTextField = null;

	private _timeBg: BaseBitmap = null;

	//英雄救美对话
	private dzTalkContainer:BaseDisplayObjectContainer;
	private dcTalkContainer:BaseDisplayObjectContainer;
	private dzIcon:BaseBitmap;
	private dzTalkIdx:number;
	private talkState:number = 0;
	//抽奖类型:单抽1/十连2
	private lotteryType:number = 0;

	public constructor() {
		super();
		egret.callLater(this.initView, this);
		// this.initView();
	}
	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, this.lotteryHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA, this.receiveBoxHandle, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		this._activityID = this.aid + "-" + this.code;
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		this._maxBoxNum = cfg.getBoxList()[cfg.getBoxList().length - 1].needNum;
		let bg: BaseLoadBitmap = BaseLoadBitmap.create(this.getUiResStr('bg'));
		bg.width = 611;
		bg.height = 730;
		let bgPos = this.getUiPos('bg', bg);
		bg.setPosition(bgPos.x, bgPos.y);
		this._bg = bg;
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
		if (this.checkIsSaveBeauty()) {
			maskRect = new egret.Rectangle(0, 0, bg.width, GameConfig.stageHeigth - this.y - 250);
		}
		bg.mask = maskRect;
		if (this.checkIsSaveBeauty()) {
			//英雄救美董卓貂蝉侍卫
			let middleContainer = new BaseDisplayObjectContainer();
			middleContainer.name = 'middleContainer';
			this.addChild(middleContainer);
			middleContainer.x = bg.x;
			middleContainer.y = bg.y;
			this.dzIcon = BaseBitmap.create(this.getUiResStr('dzIcon'));
			middleContainer.addChild(this.dzIcon);
			this.dzIcon.setPosition(0, 20);
			if (this.getTypeCode() == "5"){
				this.dzIcon.y = 0;
			}
			middleContainer.mask = maskRect;


		} else {
			// 光晕的动画
			this._guanghuanContainer = new BaseDisplayObjectContainer();
			this._guanghuanBM = BaseBitmap.create("acmidautumnview_guanghuan");
			this._guanghuanBM.anchorOffsetX = this._guanghuanBM.width / 2;
			this._guanghuanBM.anchorOffsetY = this._guanghuanBM.height / 2;
			// this._guanghuanBM.scaleY = 0.35;
			//草 相关的特效
			// 草 1 
			let gress1effect = ComponentManager.getCustomMovieClip("gress1_", 5, 200);
			gress1effect.setScale(1.33);

			gress1effect.setPosition(bg.x + bg.width - gress1effect.width - 95 - 100, bg.y + bg.height - gress1effect.height - 135 - 80);

			this._guanghuanContainer.setPosition(gress1effect.x + gress1effect.width / 2, gress1effect.y + gress1effect.height);
			egret.Tween.get(this._guanghuanBM, { loop: true }).to({ rotation: 360 }, 2000);

			this._guanghuanContainer.addChild(this._guanghuanBM);
			this._guanghuanContainer.scaleY = 0.35
			this._guanghuanBM.blendMode = egret.BlendMode.ADD;
			this.addChild(this._guanghuanContainer);

			this.addChild(gress1effect);
			gress1effect.playWithTime(-1);
			gress1effect.addTouchTap(this.effectClick, this, ["1"]);

			// 草 2 
			let gress2effect = ComponentManager.getCustomMovieClip("gress2_", 5, 200);
			gress2effect.setScale(1.33);
			gress2effect.setPosition(bg.x + 300 + 20, bg.y + bg.height - gress2effect.height - 130);
			this.addChild(gress2effect);
			gress2effect.playWithTime(-1);
			gress2effect.addTouchTap(this.effectClick, this, ["2"]);

			// 草 3 
			let gress3effect = ComponentManager.getCustomMovieClip("gress3_", 5, 200);
			gress3effect.setScale(1.33);
			gress3effect.setPosition(bg.x + 450 + 30, bg.y + bg.height - gress2effect.height - 160);
			this.addChild(gress3effect);
			gress3effect.playWithTime(-1);
			gress3effect.addTouchTap(this.effectClick, this, ["3"]);


			if (App.CommonUtil.check_dragon()) {
				let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones("wife_full_218");
				droWifeIcon.setScale(0.7)
				droWifeIcon.skewY = 180;
				droWifeIcon.x = bg.x + 190;
				droWifeIcon.y = bg.y + bg.height + 5;
				this.addChild(droWifeIcon);
			}
			else {
				// wife 的 图片
				let scaleNum = 0.6;
				let wifeBM = BaseLoadBitmap.create("wife_full_218");
				wifeBM.width = 640;
				wifeBM.height = 840;
				wifeBM.setScale(scaleNum);
				wifeBM.skewY = 180
				wifeBM.setPosition(bg.x + wifeBM.width * scaleNum - 30, bg.y + bg.height - wifeBM.height * scaleNum + 5);
				this.addChild(wifeBM);
			}

			//说的话相关
			let talkBg = BaseBitmap.create("public_9_bg25");
			talkBg.width = 360;
			let talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
			talkTF.width = 320;
			talkBg.height = talkTF.height + 20;
			talkBg.setPosition(bg.x + 244, bg.y + bg.height - 460);
			talkTF.setPosition(talkBg.x + 20, talkBg.y + 10);
			this.addChild(talkBg);
			this.addChild(talkTF);

			let tailBM = BaseBitmap.create("public_9_bg25_tail");
			tailBM.setPosition(talkBg.x + 30, talkBg.y + talkBg.height - 3);
			this.addChild(tailBM);

		}




		let infoBtn = ComponentManager.getButton(this.getUiResStr('infoBtn'), '', this.infoBtnClick, this);
		let infoBtnPos = this.getUiPos('infoBtn', infoBtn, bg);
		infoBtn.setPosition(infoBtnPos.x, infoBtnPos.y);
		this.addChild(infoBtn);
		// 进度相关
		let buttombg = BaseBitmap.create("public_9_bg49");
		buttombg.width = 612;
		buttombg.height = 110;
		let buttombgPos = this.getUiPos('buttombg', buttombg, bg);
		buttombg.setPosition(buttombgPos.x, buttombgPos.y);
		this.addChild(buttombg);

		let numBg = BaseBitmap.create("common_numbg");
		numBg.setPosition(buttombg.x - 2, buttombg.y + buttombg.height / 2 - numBg.height / 2);
		this.addChild(numBg);

		let numTFStr = LanguageManager.getlocal("acMidAutumnNumTitle");
		if(this.checkIsSaveBeauty()){
			numTFStr = LanguageManager.getlocal("acMidAutumnNumTitle-"+this.code);
		}
		let numTF = ComponentManager.getTextField(numTFStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
		let oneBtnPos = this.getUiPos('oneBtn', null, buttombg)
		let oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.oneBtnClick, this)
		oneBtn.setPosition(oneBtnPos.x, oneBtnPos.y);
		this.addChild(oneBtn);
		let oneBtnIcon:BaseLoadBitmap = BaseLoadBitmap.create(this.getUiResStr('oneBtnReward'));

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

		this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.cost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2);
		this.addChild(this._oneNeedNumTF);

		let findOneTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnFindOne" + this.getLangCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		findOneTF.setPosition(oneBtn.x + oneBtn.width / 2 - findOneTF.width / 2, oneBtn.y + oneBtn.height + 2);
		this.addChild(findOneTF);

		//十次相关
		let tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.tenBtnClick, this);
		let tenBtnPos = this.getUiPos('tenBtn', tenBtn, buttombg)
		tenBtn.setPosition(tenBtnPos.x, tenBtnPos.y);
		this.addChild(tenBtn);

		let tenBtnIcon = BaseLoadBitmap.create(this.getUiResStr('oneBtnReward'));
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

		let tenNeedGemTF = ComponentManager.getTextField(String(cfg.cost * 10 * cfg.discount), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2);
		this.addChild(tenNeedGemTF);

		let findTenTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnFindTen" + this.getLangCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		findTenTF.setPosition(tenBtn.x + tenBtn.width / 2 - findTenTF.width / 2, tenBtn.y + tenBtn.height + 2);
		this.addChild(findTenTF);

		//英雄救美单抽和十连左边有武器图标,有奖池展示icon,有倒计时bg
		if (this.checkIsSaveBeauty()) {
			let findOneSword = BaseLoadBitmap.create(this.getUiResStr('findOneSword'));
			let findTenSword = BaseLoadBitmap.create(this.getUiResStr('findTenSword'));
			this.addChild(findOneSword);
			this.addChild(findTenSword);
			findOneSword.setScale(0.5);
			findTenSword.scaleX = -0.5;
			findTenSword.scaleY = 0.5;
			findOneSword.setPosition(oneGemBM.x - 125, oneGemBM.y - 25);
			findTenSword.setPosition(tenGemBM.x - 25, tenGemBM.y - 15);

			//奖池展示icon
			let rewardShowBtn = ComponentManager.getButton(this.getUiResStr('rewardShowBtn'), '', () => {
				ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNREWARDPOPUPVIEW, { "code": this.code, "aid": this.aid })
			}, this)
			rewardShowBtn.setPosition(infoBtn.x, infoBtn.y - 100);
			this.addChild(rewardShowBtn);

			let timeBg = BaseBitmap.create('public_9_downbg');
			timeBg.width = bg.width;
			timeBg.height = 120;
			timeBg.setPosition(bg.x + bg.width / 2 - timeBg.width / 2,buttombg.y - 120);
			this.addChild(timeBg);

			let acTime = ComponentManager.getTextField(LanguageManager.getlocal('acMidAutumnTime',[vo.acTimeAndHour]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
			acTime.width = bg.width- 100;
			acTime.textAlign = egret.HorizontalAlign.CENTER;
			acTime.setPosition(bg.x + bg.width / 2 - acTime.width / 2,timeBg.y + timeBg.height - acTime.height -10);
			this.addChild(acTime);
		}


		this._timeBg = BaseBitmap.create("public_9_bg61");
		let timeBgPos = this.getUiPos('timeBg',this._timeBg,buttombg);
		this._timeBg.y = timeBgPos.y;
		this.addChild(this._timeBg);

		this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTopTip2-1", [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._timeTF.width;
		this._timeBg.x = timeBgPos.x;
		this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);
		this.addChild(this._timeTF);

		let tipTFStr = '';
		if(this.checkIsSaveBeauty() && Api.switchVoApi.checkServantRefuseBattle()){
			tipTFStr = LanguageManager.getlocal("acmidAutumnTip" + this.getLangCode() +'_with_OpenRefusal');
		}else{
			tipTFStr = LanguageManager.getlocal("acmidAutumnTip" + this.getLangCode());
		}
		let tipTF = ComponentManager.getTextField(tipTFStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
		tipTF.textAlign = egret.HorizontalAlign.CENTER;
		tipTF.setPosition(bg.x + bg.width / 2 - tipTF.width / 2, this._timeBg.y+35);
		if(this.checkIsSaveBeauty()){
			tipTF.lineSpacing = 5;
			tipTF.width = bg.width - 100;
			tipTF.setPosition(bg.x + bg.width / 2 - tipTF.width / 2, this._timeBg.y+ 45);
		}
		this.addChild(tipTF);
		if (this.checkIsSaveBeauty()) {
			this.initSaveBeautyTalk();
		} else {
			this.effectClick(null, "2");

		}
		this.initBox();
		this.refreshView();
		TickManager.addTick(this.tick, this);
		this.tick();
	}

	private getTypeCode():string{
		if (this.code == "6"){
			return "5";
		}
		return this.code;
	}

	private getUiResStr(resKey: string): string {
		let resStr: string;
		if (this.checkIsSaveBeauty()) {
			switch (resKey) {
				case 'bg': resStr = ResourceManager.hasRes('herosavebeauty_middlebg-'+this.getTypeCode()) ? 'herosavebeauty_middlebg-'+this.getTypeCode() : 'herosavebeauty_middlebg'; break;
				case 'infoBtn': resStr = ResourceManager.hasRes('herosavebeauty_introbtn-'+this.getTypeCode()) ? 'herosavebeauty_introbtn-'+this.getTypeCode() : 'herosavebeauty_introbtn'; break;
				case 'rewardShowBtn': resStr = ResourceManager.hasRes('herosavebeauty_rewordshowbtn-'+this.getTypeCode()) ? 'herosavebeauty_rewordshowbtn-'+this.getTypeCode() : 'herosavebeauty_rewordshowbtn'; break;
				case 'dzIcon': resStr = ResourceManager.hasRes('herosavebeauty_dongzhuo_1-'+this.getTypeCode()) ? 'herosavebeauty_dongzhuo_1-'+this.getTypeCode() : 'herosavebeauty_dongzhuo_1'; break;
				case 'findOneSword': resStr = ResourceManager.hasRes('herosavebeauty_findonesword-'+this.getTypeCode()) ? 'herosavebeauty_findonesword-'+this.getTypeCode() : 'herosavebeauty_findonesword'; break;
				case 'findTenSword': resStr = ResourceManager.hasRes('herosavebeauty_findtensword-'+this.getTypeCode()) ? 'herosavebeauty_findtensword-'+this.getTypeCode() : 'herosavebeauty_findtensword'; break;
				case 'oneBtnReward': resStr = 'itemicon1061'; break;
				default: resStr = ''; break;
			}

		} else {
			switch (resKey) {
				case 'bg': resStr = 'acmidautumnview_bg'; break;
				case 'infoBtn': resStr = 'acmidautumnview_infobtn'; break;
				case 'oneBtnReward': resStr = 'itemicon1001'; break;
				default: resStr = ''; break;
			}
		}
		return resStr
	}


	private getUiPos(resKey: string, self?: any, other?: any): { x: number, y: number } {
		let resPos = { x: 0, y: 0 };
		if (this.checkIsSaveBeauty()) {
			switch (resKey) {
				case 'bg':
					resPos = { x: GameConfig.stageWidth / 2 - self.width / 2, y: 14.5 };
					break;
				case 'oneBtn':
					resPos = { x: 120, y: other.y + other.height + 35 };
					break;
				case 'tenBtn':
					resPos = { x: GameConfig.stageWidth - self.width - 80, y: other.y + other.height + 35 };
					break;
				case 'buttombg':
					resPos = { x: this._bg.x + other.width / 2 - self.width / 2, y: GameConfig.stageHeigth - this.y - 250 };
					break;
				case 'infoBtn':
					resPos = { x: other.x + 10, y: other.y + 120 };
					break;
				case 'timeBg':
					resPos = { x: this._bg.x + this._bg.width / 2 - self.width / 2, y: other.y - 145};
					break;

				default: resPos = { x: 0, y: 0 }; break;
			}

		} else {
			switch (resKey) {
				case 'bg':
					resPos = { x: GameConfig.stageWidth / 2 - self.width / 2, y: GameConfig.stageHeigth - this.getViewTitleButtomY() - self.height - 250 };
					break;
				case 'oneBtn':
					resPos = { x: 85, y: other.y + other.height + 35 };
					break;
				case 'tenBtn':
					resPos = { x: GameConfig.stageWidth - self.width - 90, y: other.y + other.height + 35 };
					break;
				case 'buttombg':
					resPos = { x: other.x + other.width / 2 - self.width / 2, y: other.y + other.height };
					break;
				case 'infoBtn':
					resPos = { x: other.x + 10, y: other.y + other.height - self.height - 10 };
					break;
				case 'timeBg':
					resPos = { x: this._bg.x + this._bg.width / 2 - self.width / 2, y: 15};
					break;

				default: resPos = { x: 0, y: 0 }; break;
			}
		}
		return resPos
	}

	private getLangCode(): string {
		let code = '';
		if (this.checkIsSaveBeauty()) {
			code = '-' + this.code;
		}
		return code;
	}

	public tick() {
		let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if (vo.checkIsInEndShowTime()) {
			this._timeTF.text = LanguageManager.getlocal("acPunishEnd");
		}
		else {
			this._timeTF.text = LanguageManager.getlocal("acLuckyDrawTopTip2-1", [vo.acCountDown]);
		}
		this._timeBg.width = 60 + this._timeTF.width;
		this._timeBg.x = this._bg.x + this._bg.width / 2 - this._timeBg.width / 2;
		this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);

	}

	/**
	 * 抽奖的返回数据
	 */
	private lotteryHandle(event: egret.Event) {
		let ret = event.data.ret
		if (ret) {
			let data = event.data.data.data;
			if(this.checkIsSaveBeauty()){
				let dzStr = ResourceManager.hasRes("herosavebeauty_dongzhuo_2-"+this.getTypeCode()) ? "herosavebeauty_dongzhuo_2-"+this.getTypeCode() :"herosavebeauty_dongzhuo_2";
				this.dzIcon.setRes(dzStr);
				if(App.CommonUtil.check_dragon()){
					let lotteryEffectRes:string = '';
					let lotterySoundRes:string = '';
					if(this.lotteryType == 1){
						lotteryEffectRes = 'acmidautumnview_dao';
						lotterySoundRes = 'effect_acmaze_attack1';
					}else if(this.lotteryType == 2){
						lotteryEffectRes = 'acmidautumnview_mao';
						lotterySoundRes = 'effect_acmaze_attack2';
					}
					this.lotteryType = 0;

					let lottery = App.DragonBonesUtil.getLoadDragonBones(lotteryEffectRes,1,'idle',()=>{
						SoundManager.playEffect(lotterySoundRes);
					});
					let middleContainer = this.getChildByName('middleContainer');
					lottery.setPosition(middleContainer.x + 266,middleContainer.y + 356);
					if (this.getTypeCode() == "5"){
						lottery.setPosition(middleContainer.x + 450,middleContainer.y + 400);
					}
					this.addChild(lottery);
					lottery.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE,()=>{
						let dz1Str = ResourceManager.hasRes("herosavebeauty_dongzhuo_1-"+this.getTypeCode()) ? "herosavebeauty_dongzhuo_1-"+this.getTypeCode() :"herosavebeauty_dongzhuo_1";
						this.dzIcon.setRes(dz1Str);
						let rewards = data.otherrewards;
						let otherReward = data.noterewards;
						ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
						this.refreshView();
						this._isSendMessage = false;
						this.removeChild(lottery);
						lottery.dispose();
						lottery = null;
					},this)
				}else{
					let lottery = ComponentManager.getCustomMovieClip("atkrace_reward_anim",7,80);
					lottery.name = 'lottery'
					let middleContainer = this.getChildByName('middleContainer');
					lottery.setPosition(middleContainer.x+70,middleContainer.y+20);
					if (this.getTypeCode() == "5"){
						lottery.setPosition(middleContainer.x + 220,middleContainer.y + 20);
					}
					this.addChild(lottery);
					lottery.playWithTime(1);
					// let a:BaseLoadDragonBones;
					// a.setPosition(this.dzIcon.x,this.dzIcon.y);
					// a.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE,()=>{
	
					// },this)
					lottery.setEndCallBack(() => {
						let dz1Str = ResourceManager.hasRes("herosavebeauty_dongzhuo_1-"+this.getTypeCode()) ? "herosavebeauty_dongzhuo_1-"+this.getTypeCode() :"herosavebeauty_dongzhuo_1";
						this.dzIcon.setRes(dz1Str);
						let rewards = data.otherrewards;
						let otherReward = data.noterewards;
						ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
						this.refreshView();
						this._isSendMessage = false;
						//this.removeChild(lottery);
						lottery.dispose();
						lottery = null;
					}, this);
				}


			}else{
				let lottery = ComponentManager.getCustomMovieClip("lottery_", 10, 150);
				lottery.blendMode = egret.BlendMode.ADD;
				if (this._type == "1") {
					lottery.setScale(0.6);
					lottery.x = this._bg.x + 380;
					lottery.y = this._bg.y + this._bg.height - 270;
	
				}
				else if (this._type == "2") {
					lottery.setScale(0.8);
					lottery.x = this._bg.x + 280;
					lottery.y = this._bg.y + this._bg.height - 195;
				}
				else if (this._type == "3") {
					lottery.setScale(0.7);
					lottery.x = this._bg.x + 440;
					lottery.y = this._bg.y + this._bg.height - 210;
				}
				this.addChild(lottery);
				lottery.playWithTime(1);
				lottery.setEndCallBack(() => {
					let rewards = data.otherrewards;
					let otherReward = data.noterewards;
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
					this.refreshView();
					this._isSendMessage = false;
					this.removeChild(lottery);
					lottery.dispose();
					lottery = null;
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
		
		if (ret) {
			let data = event.data.data.data;
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
		let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let percent = vo.lotteryNum() / this._maxBoxNum;
		this._progress.setPercentage(percent);
	}
	private refreshTF() {
		let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (vo.isFree) {
			this._oneNeedNumTF.text = LanguageManager.getlocal("sysFreeDesc");
		}
		else {
			this._oneNeedNumTF.text = String(cfg.cost);
		}

		this._findNumTF.text = String(vo.lotteryNum());



	}
	/**
	 * 刷新宝箱
	 */
	private refreshBox() {
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
				let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
				let voNum = vo.lotteryNum();
				let isRevice = vo.boxStatus(boxCfg[i].id);
				let needNum = boxCfg[i].needNum;
				if (vo.isStart){
					if (needNum <= voNum) {
						if (!isRevice) {
							this._nowReward = boxCfg[i].getReward;

							NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA, { "activeId": this._activityID, "lotteryId": boxCfg[i].id });
							return;
						}
					}
					ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNREWARDINFOPOPUPVIEW, { "code": this.code, "aid": this.aid, "itemCfg": boxCfg[i] })
				}
				else{
					vo.showAcEndTip();
				}
			}, this);

			let boxDesc = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnBoxNum"+this.getLangCode(), [String(boxCfg[i].needNum)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			boxDesc.setPosition(posX - boxDesc.width / 2 + offestX, this._progress.y + this._progress.height + 3);
			this.addChild(boxDesc);

			if (i == boxCfg.length - 1) {
				if (!this.checkIsSaveBeauty()) {
					this._speakStr = LanguageManager.getlocal("acmidAutumnSpeakTip");
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

					this._servantBM = BaseLoadBitmap.create("servant_half_1052");
					let scale = 0.33;
					this._servantBM.height = 177;
					this._servantBM.width = 180;
					this._servantBM.setScale(scale);
					this._servantBM.setPosition(this._speakBg.x - this._servantBM.width * scale / 2, this._speakBg.y + this._speakBg.height - this._servantBM.height * scale);
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
			}

			let boxInfo = { "box": box, "boxLight": boxLight };
			this._boxInfoList.push(boxInfo);

		}
	}

	private initSaveBeautyTalk() {
		this.talkState = 1;
		this.initNpcTalk('dz');
	}

	private initNpcTalk(npc: string) {
		let dzTalkContainer:BaseDisplayObjectContainer = null;
		let dzStr = '';
		let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		if(!vo || !this.talkState) return;
		if (npc == 'dz') {
			dzTalkContainer = this.dzTalkContainer;
		} else if (npc == 'dc') {
			dzTalkContainer = this.dcTalkContainer;
		}
		if(vo.lotteryNum()<100){
			if(!this.dzTalkIdx || this.dzTalkIdx<1){
				this.dzTalkIdx = 1;
			}else{
				if(npc == 'dz'){
					this.dzTalkIdx = 3 - this.dzTalkIdx;
				}
			}
			if (this.getTypeCode() == "5"){
				dzStr = LanguageManager.getlocal('acmidAutumnTalk'+npc+this.dzTalkIdx+"-"+this.code);
			}
			else{
				dzStr = LanguageManager.getlocal('acmidAutumnTalk'+npc+this.dzTalkIdx);
			}
			
		}else{
			if(!this.dzTalkIdx || this.dzTalkIdx<3){
				this.dzTalkIdx = 3;
			}else{
				if(npc == 'dz'){
					this.dzTalkIdx = 7 - this.dzTalkIdx;
				}
			}
			if (this.getTypeCode() == "5"){
				dzStr = LanguageManager.getlocal('acmidAutumnTalk'+npc+this.dzTalkIdx+"-"+this.code);
			}
			else{
				dzStr = LanguageManager.getlocal('acmidAutumnTalk'+npc+this.dzTalkIdx);
			}

		}

		if(dzTalkContainer){
			dzTalkContainer.removeChildren();
		}else{
			dzTalkContainer = new BaseDisplayObjectContainer();
			if (npc == 'dz') {
				this.dzTalkContainer = dzTalkContainer;
			} else if (npc == 'dc') {
				this.dcTalkContainer = dzTalkContainer;
			}
			this.addChild(dzTalkContainer);
		} 
		let dzTalkLength = 0;

		let dzTF = ComponentManager.getTextField(dzStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
		let dzTail = BaseBitmap.create("public_9_bg25_tail");
		let dzTFBg = BaseBitmap.create("public_9_bg25");
		dzTFBg.name = 'dzTFBg';
		dzTF.name = 'dzTF';
		dzTFBg.width = dzTF.width + 40;
		if (npc == 'dz') {
			if (this.getTypeCode() == "5"){
				dzTFBg.setPosition(this._bg.x + 280, this._bg.y+15);
			}
			else{
				dzTFBg.setPosition(this._bg.x + 180,  this._bg.y+15);
			}
		} else if (npc == 'dc') {
			if (this.getTypeCode() == "5"){
				dzTFBg.setPosition(this._bg.x + 180, this._bg.y+170);
			}
			else{
				dzTFBg.setPosition(this._bg.x + 280, this._bg.y+120);
			}
		}
		dzTalkContainer.addChild(dzTFBg);
		dzTF.setPosition(dzTFBg.x + dzTFBg.width / 2 - dzTF.width / 2, dzTFBg.y + dzTFBg.height / 2 - dzTF.height / 2);
		dzTalkContainer.addChild(dzTF);
		dzTail.setPosition(dzTFBg.x+40, dzTFBg.y + dzTFBg.height-3.3);
		dzTalkContainer.addChild(dzTail);
		egret.Tween.get(dzTFBg, { loop: false }).call(() => {
			dzTF.text = "";
			dzTail.setVisible(true);
			dzTF.setVisible(true);
			dzTFBg.setVisible(true);
			dzTalkLength = 0;
			egret.Tween.get(dzTF, { loop: true }).wait(150).call(() => {
				dzTF.text = dzStr.substr(0, dzTalkLength);
				dzTalkLength++;
			}, this);
		}, this).wait(dzStr.length * 150 + 2000).call(() => {
			dzTail.setVisible(false);
			dzTF.setVisible(false);
			dzTFBg.setVisible(false);
			dzTalkLength = 0;
			egret.Tween.removeTweens(dzTF);
			if (npc == 'dz') {
				egret.setTimeout(() => {
					this.initNpcTalk('dc');
				}, this, 5000);
			} else if (npc == 'dc') {
				egret.setTimeout(() => {
					this.initNpcTalk('dz');
				}, this, 5000);
			}
		}, this);
	}



	/**
	 * 查看信息
	 */
	private infoBtnClick() {
		if(this.checkIsSaveBeauty()){
			ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNPREVIEWPOPUPVIEW, { "code": this.code, "aid": this.aid });

		}else{
			ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNACINFOPOPUPVIEW, { "code": this.code, "aid": this.aid });
		}


	}
	/**
	 * 买一次
	 */
	private oneBtnClick() {
		let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
		if (deltaT < 0) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if (this._isSendMessage) {
			return;
		}
		let cost = cfg.cost;
		if (vo.isFree) {
			cost = 0;
		}
		if (Api.playerVoApi.getPlayerGem() < cost) {
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, { "activeId": this._activityID, "isTenPlay": 0 });
		this._isSendMessage = true;
		
		this.lotteryType = 1;

	}
	/**
	 * 买十次
	 */
	private tenBtnClick() {
		let vo = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
		if (deltaT < 0) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if (this._isSendMessage) {
			return;
		}
		let cost = cfg.cost * 10 * cfg.discount;
		if (Api.playerVoApi.getPlayerGem() < cost) {
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, { "activeId": this._activityID, "isTenPlay": 1 });
		this._isSendMessage = true;
		
		this.lotteryType = 2;

	}
	/**
	 * 特效的监听时间
	 */
	private effectClick(event: egret.Event, type: string) {
		this._type = type;
		if (type == "1") {
			this._guanghuanBM.setScale(0.6);
			this._guanghuanContainer.setPosition(this._bg.x + 480, this._bg.y + this._bg.height - 140);
		}
		else if (type == "2") {
			this._guanghuanBM.setScale(0.8);
			this._guanghuanContainer.setPosition(this._bg.x + 405, this._bg.y + this._bg.height - 30);
		}
		else if (type == "3") {
			this._guanghuanBM.setScale(0.7);
			this._guanghuanContainer.setPosition(this._bg.x + 550, this._bg.y + this._bg.height - 60);


		}
	}

	//是否是英雄救美
	private checkIsSaveBeauty(): boolean {
		if (this.code == '3' || this.code == '4' || this.getTypeCode() == '5') {
			return true;
		} else {
			return false;
		}
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, this.lotteryHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA, this.receiveBoxHandle, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		if(this.checkIsSaveBeauty()){
			this.talkState = 0;
			if(this.dcTalkContainer){
				egret.Tween.removeTweens(this.dcTalkContainer.getChildByName('dzTFBg')); 
				egret.Tween.removeTweens(this.dcTalkContainer.getChildByName('dzTF')); 
			}
			if(this.dzTalkContainer){
				egret.Tween.removeTweens(this.dzTalkContainer.getChildByName('dzTFBg')); 
				egret.Tween.removeTweens(this.dzTalkContainer.getChildByName('dzTF')); 
			}
		}else{
			egret.Tween.removeTweens(this._speakTF);
			egret.Tween.removeTweens(this._speakBg);
		}

		TickManager.removeTick(this.tick, this);
		this._findNumTF = null;
		this._progress = null;
		this._oneNeedNumTF = null;
		this._isSendMessage = false;
		this._boxInfoList = [];
		this._maxBoxNum = null;
		this._guanghuanBM = null;
		this._speakStr = null;
		this._speakTF = null;
		this._speakTail = null;
		this._speakBg = null;
		this._servantBM = null;
		this._messageLength = 0;
		this._nowReward = null;
		this._timeTF = null;
		this._timeBg = null;
		this.dzTalkContainer = null;
		this.dcTalkContainer = null;
		this.dzIcon = null;
		this.dzTalkIdx = 0;
		this.talkState = 0;
		this.lotteryType = 0;
		super.dispose();
	}

}