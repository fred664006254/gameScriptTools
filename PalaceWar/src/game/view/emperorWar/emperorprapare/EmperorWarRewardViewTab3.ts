//
class EmperorWarRewardViewTab3 extends CommonViewTab {
	private _collectBtn: BaseButton = null;
	private _progress: ProgressBar = null;
	private _descTxt: BaseTextField = null;
	private _man: BaseLoadDragonBones = null;
	private _bg: BaseBitmap = null;
	private _layoutNum = 0;
	public constructor() {
		super();
		this.initView();
	}

	private get cfg() {
		return Config.EmperorwarCfg;
	}

	private get api() {
		return Api.emperorwarVoApi;
	}

	protected initView(): void {
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_EXCHANGESERVANT), this.collectBtnCallback, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SERVANTBONE, this.refreashBone, this);
		let viewbg = view.getViewBg();
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth - 143;

		this._bg = BaseBitmap.create('empservantrole');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._bg, view);
		view.addChild(this._bg);

		let servantInfoObj = Config.ServantCfg.getServantItemById(view.cfg.servant);

		SoundManager.playEffect(servantInfoObj.sound);

		if (App.CommonUtil.check_dragon()) {
			// if(this._man)
			// {
			// 	this._man.dispose();
			// 	this._man = null;
			// }
			this._man = App.DragonBonesUtil.getLoadDragonBones(`servant_full2_${view.cfg.servant}`, 0);
			// man.scaleX = -0.6;
			// man.scaleY = 0.6;
			this._man.width = 388;
			this._man.height = 676;
			
			// man.setAnchorOffset(-man.width,-man.height);
			this._man.anchorOffsetX = -this._man.width / 2;
			this._man.anchorOffsetY = - this._man.height / 2;
			this._man.setScale(1.3);
			view.setLayoutPosition(LayoutConst.horizontalCentertop, this._man, view, [0,130], true);
			view.addChild(this._man);

		}
		else {
			this._bg.setRes('empservantrole2');
		}

		let bottombg = BaseBitmap.create('empservantbottom');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
		view.addChild(bottombg);
		this._layoutNum = this.getChildIndex(bottombg);

		let progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 355);
		let curNum = Api.itemVoApi.getItemNumInfoVoById(view.cfg.itemNeed);
		progress.setPercentage(curNum / view.cfg.exchangeNum, `${curNum}/${view.cfg.exchangeNum}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, bottombg, [120, 120]);
		view.addChild(progress);
		view._progress = progress;

		let desctxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarServantDesc"), 20);
		desctxt.width = 350;
		desctxt.lineSpacing = 5;
		view.setLayoutPosition(LayoutConst.lefttop, desctxt, bottombg, [125, 97]);
		view.addChild(desctxt);
		desctxt.visible = false;
		view._descTxt = desctxt;

		let collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'emperorWarCollect', view.collectBtnClick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, collectBtn, bottombg, [27, 105]);
		view.addChild(collectBtn);
		view._collectBtn = collectBtn;

		let icon = BaseLoadBitmap.create(`itemicon${view.cfg.itemNeed}`);
		icon.addTouchTap(() => {
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, view.cfg.itemNeed);
		}, view);
		icon.width = icon.height = 100;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, bottombg, [25, 80]);
		view.addChild(icon);

		if (Api.servantVoApi.getServantObj(String(view.cfg.servant))) {
			collectBtn.setText('allianceBtnCheck');
			progress.visible = false;
			desctxt.visible = true;
		}
		else {
			collectBtn.setEnable(curNum >= view.cfg.exchangeNum);
			if (curNum >= view.cfg.exchangeNum) {
				App.CommonUtil.addIconToBDOC(collectBtn);
			}
			else {
				App.CommonUtil.removeIconFromBDOC(collectBtn);
			}
		}


		let line1 = BaseBitmap.create('empblueline');
		line1.width = 400;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line1, bottombg, [0, 184]);
		view.addChild(line1);

		let txt1 = ComponentManager.getTextField(LanguageManager.getlocal('empServantDesc3'), 22, 0xfcf3b4);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt1, line1);
		view.addChild(txt1);

		let line2 = BaseBitmap.create('empblueline');
		line2.width = 400;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line2, line1, [0, line1.height + 90]);
		view.addChild(line2);

		let txt2 = ComponentManager.getTextField(LanguageManager.getlocal('practiceAbilityViewTitle'), 22, 0xfcf3b4);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt2, line2);
		view.addChild(txt2);

		//光环
		let servant = Config.ServantCfg.getServantItemById(view.cfg.servant);
		for (let i in servant.aura) {
			if (Number(i) > 2) {
				break;
			}
			let unit = servant.aura[i];
			let text: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`empServantDesc${i}`, [LanguageManager.getlocal(`servant_fourPeopleaura${unit.auraIcon}`), String(unit.growAtt * 100)]), 20);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, text, bottombg, [50, 224 + (Number(i) - 1) * (20 + 10)]);
			view.addChild(text);
		}



		let ability = servant.ability;
		let tmpY = txt2.y + txt2.textHeight + 20;
		for (let i = 0; i < ability.length; i++) {
			let aid = ability[i];
			let tmpAcfg = GameConfig.config.abilityCfg[aid];

			let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 20);
			attrTxt.x = 190 * (i % 3) + 40;
			attrTxt.y = tmpY + Math.floor(i / 3) * (20 + 10);
			view.addChild(attrTxt);

			let starsIcon: BaseBitmap = BaseBitmap.create("servant_star");
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, starsIcon, attrTxt, [attrTxt.width, 0]);
			view.addChild(starsIcon);

			let attrValueTxt = ComponentManager.getTextField("x" + tmpAcfg.num.toString(), 20);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, attrValueTxt, starsIcon, [starsIcon.width, 0]);
			view.addChild(attrValueTxt)
		}
		// if (PlatformManager.checkIsEnLang()){
		// 	//英文版每行两条属性
		// 	for (var i = 0; i < ability.length; i++) {
		// 		let aid = ability[i];
		// 		let tmpAcfg = GameConfig.config.abilityCfg[aid];

		// 		let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + aid), 20);
		// 		attrTxt.x = 315 * (i % 2) + 15;
		// 		attrTxt.y = 265 + Math.floor(i / 2) * 28;
		// 		this.addChild(attrTxt);


		// 		let starsIcon: BaseBitmap = BaseBitmap.create("servant_star");
		// 		starsIcon.x = attrTxt.x + 235//attrTxt.width;// + 125;
		// 		starsIcon.y = attrTxt.y - 4;
		// 		this.addChild(starsIcon);

		// 		let attrValueTxt = ComponentManager.getTextField("x" + tmpAcfg.num.toString(), 20);
		// 		attrValueTxt.x = starsIcon.x + 35;
		// 		attrValueTxt.y = attrTxt.y;
		// 		this.addChild(attrValueTxt)
		// 	}


		// } else {
		//}
		if(servant.quality2)
        {	
            let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servant.quality2);
            cornerImg.x = 475+70;
            cornerImg.y = 290+70;
            cornerImg.setScale(1.3);
            this.addChild(cornerImg);
        }


		// //特殊光环
		// this.speciaLaura();
	}

	private collectBtnClick(): void {
		let view = this;
		if (Api.servantVoApi.getServantObj(String(view.cfg.servant))) {
			if (this._man) {
				this._man.stop();
				this._man.dispose()
				this._man = null;
			}
			ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, view.cfg.servant);
		}
		else {
			let curNum = Api.itemVoApi.getItemNumInfoVoById(view.cfg.itemNeed);
			if (curNum < view.cfg.exchangeNum) {
				return;
			}
			else {
				NetManager.request(NetRequestConst.REQUEST_EMPEROR_EXCHANGESERVANT, {
					version: view.api.getVersion(),
				});
			}
		}
	}

	private collectBtnCallback(evt: egret.Event): void {
		let view = this;
		let data = evt.data.data.data;
		if (data) {
			ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, view.cfg.servant);
			view._collectBtn.setText(`allianceBtnCheck`);
			App.CommonUtil.removeIconFromBDOC(view._collectBtn);
			view._progress.visible = false;
			view._descTxt.visible = true;
		}

	}

	private speciaLaura(): void {

		//九宫格
		let bg1: BaseBitmap = BaseBitmap.create("fourfloor");
		bg1.y = + 70;
		bg1.x = 180;
		bg1.width = 312;
		bg1.height = 110;
		bg1.x = this.width - bg1.width - 20;
		bg1.y = 20;
		this.addChild(bg1);

		//特殊光环文字
		let lauraImg: BaseBitmap = BaseBitmap.create("fourpecialaura");
		this.addChild(lauraImg);
		lauraImg.x = bg1.x + 90;
		lauraImg.y = bg1.y + 12;

		//武力描述
		let forceText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 18);
		let message: string = LanguageManager.getlocal("acFourPeoplea_force" + AcFourPeopleScrollItem.CODE);
		forceText.x = bg1.x + 16;
		forceText.y = bg1.y + 50;
		forceText.text = message;
		forceText.width = bg1.width;
		this.addChild(forceText);

		//属性描述
		let forceText2 = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 18);
		let message2: string = LanguageManager.getlocal("acFourPeoplea_attribute" + AcFourPeopleScrollItem.CODE);
		forceText2.x = bg1.x + 16;
		forceText2.y = bg1.y + 80;
		forceText2.width = bg1.width;
		forceText2.text = message2;
		this.addChild(forceText2);
		if (PlatformManager.checkIsTextHorizontal()) {
			lauraImg.y -= 6;
			forceText.y -= 12;
			forceText2.y -= 2;
		}
		if (PlatformManager.checkIsEnLang()) {
			forceText.width = bg1.width - 32;
			forceText2.width = bg1.width - 32;
			bg1.height += 15;
		}
	}
	private refreashBone() {
		if (this._man) {
			this._man.resume();
		}
		else {
			if (App.CommonUtil.check_dragon()) {
				if (this._man) {
					this._man.dispose();
					this._man = null;
				}
				this._man = App.DragonBonesUtil.getLoadDragonBones(`servant_full2_${this.cfg.servant}`, 0);
				// man.scaleX = -0.6;
				// man.scaleY = 0.6;
				this._man.width = 388;
				this._man.height = 676;
				// man.setAnchorOffset(-man.width,-man.height);
				this._man.anchorOffsetX = -this._man.width / 2;
				this._man.anchorOffsetY = - this._man.height / 2;
				this._man.setScale(1.3);
				this.setLayoutPosition(LayoutConst.horizontalCentertop, this._man, this, [0,130], true);
				this.addChildAt(this._man, this._layoutNum - 1);
			}
			else {
				this._bg.setRes('empservantrole2');
			}
		}
	}
	public dispose(): void {
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SERVANTBONE, this.refreashBone, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_EXCHANGESERVANT), this.collectBtnCallback, this);
		view._collectBtn = null;
		view._progress = null;
		view._descTxt = null;
		this._bg = null;
		if (this._man) {
			this._man.stop();
			this._man.dispose();
			this._man = null;
		}
		this._layoutNum = 0;
		super.dispose();
	}

}