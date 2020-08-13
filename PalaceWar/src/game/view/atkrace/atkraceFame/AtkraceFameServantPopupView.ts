/**
 * 册封选择列表
 * author dky
 * date 2018/4/26
 * @class WifestatusWifePopupView
 */
class AtkraceFameServantPopupView extends PopupView {

	// public static itemId: string;

	private _servantId: string;
	private _servantIcon: BaseLoadBitmap;
	private _droServantIcon: BaseLoadDragonBones;
	private _servantInfoObj: ServantInfoVo;
	private _progressBar1: ProgressBar;
	private _upFameBtn: BaseButton;


	public constructor() {
		super();
	}
	public initView(): void {

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, this.onUpFameRevHandle, this);

		let bgBB: BaseBitmap = BaseBitmap.create("atkracefameservantpopupview_bg");
		bgBB.x = 20+GameData.popupviewOffsetX;
		bgBB.y = 10;
		this.addChildToContainer(bgBB);


		let servantId = this.param.data.servantId
		this._servantId = servantId;
		this._servantInfoObj = Api.servantVoApi.getServantObj(servantId);
		let maxFameLevel = Config.AtkraceCfg.getMaxFamelevel();
		
		let serImg = this._servantInfoObj.fullImgPath;
		let wear = Api.servantVoApi.getservantSkinIdInWear(servantId);
		this._servantIcon = BaseLoadBitmap.create(serImg);
		this._servantIcon.width = 405;
		this._servantIcon.height = 467;
		this._servantIcon.x = 85+GameData.popupviewOffsetX;
		this._servantIcon.y = 50;
		this.addChildToContainer(this._servantIcon);

		let skincfg = null;
		if (!Api.switchVoApi.checkCloseBone()) {
			let boneName = undefined;

			let dagonBonesName = null;
			if (wear && wear != "") {
				skincfg = Config.ServantskinCfg.getServantSkinItemById(wear);
				serImg = skincfg.body;
				if (skincfg && skincfg.bone) {
					boneName = skincfg.bone + "_ske";
					dagonBonesName = skincfg.bone;
				}
			}
			else {
				dagonBonesName = Api.servantVoApi.getServantBoneId(servantId);
				boneName = dagonBonesName + "_ske";
			}

			if (boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				if (this._servantIcon) {
					this._servantIcon.visible = false;
				}
				if (this._droServantIcon) {
					this._droServantIcon.stop();
					this._droServantIcon.dispose();
					this._droServantIcon = null;
				}
				this._droServantIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
				this._droServantIcon.visible = true;
				this._droServantIcon.x = this._servantIcon.x + 200;
				this._droServantIcon.y = this._servantIcon.y + 450;
				this.addChildToContainer(this._droServantIcon);

				if(servantId == "1063")
				{
					if(this._droServantIcon)
					{
						this._droServantIcon.setScale(0.9);
						this._droServantIcon.y = this._servantIcon.y + 460;
					}
				}				

				let mask = egret.Rectangle.create();
				let offX = Math.abs(bgBB.x - this._droServantIcon.x);
				mask.setTo(bgBB.x - this._droServantIcon.x, bgBB.y - this._droServantIcon.y, bgBB.width, bgBB.height);
				this._servantIcon.visible = false;
				this._droServantIcon.mask = mask;
			} else {
				if (this._droServantIcon) {
					this._droServantIcon.stop();
					this._droServantIcon.dispose();
					this._droServantIcon = null;
				}
				this._servantIcon.setload(serImg); //0611
				this._servantIcon.visible = true;
			}
		} else {
			if (this._droServantIcon) {
				this._droServantIcon.stop();
				this._droServantIcon.dispose();
				this._droServantIcon = null;
			}
			this._servantIcon.setload(serImg); //0611
			this._servantIcon.visible = true;
		}
		//红颜名字背景
		let namebg = BaseBitmap.create("skin_detail_namebg");
		namebg.setPosition(bgBB.x, bgBB.y + 20);
		namebg.setScale(0.9);
		this.addChildToContainer(namebg);

		if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
			namebg.scaleX = 1.5;
			namebg.setPosition(bgBB.x + bgBB.width/2 - namebg.width/2 * namebg.scaleX, bgBB.y + bgBB.height - namebg.height * namebg.scaleY);
		}

		let nameTitleStr = LanguageManager.getlocal('servant');
		if (skincfg != null) {
			nameTitleStr = skincfg.getSkinName();
		}
		let nameTitle = ComponentManager.getTextField(nameTitleStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
		nameTitle.textAlign = egret.HorizontalAlign.CENTER;
		if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
			nameTitle.setPosition(namebg.x + namebg.width/2 * namebg.scaleX - nameTitle.width/2, namebg.y + 30);
		}
		else{
			nameTitle.width = 120;
			nameTitle.setPosition(namebg.x + 45, namebg.y + 30);
		}
		this.addChildToContainer(nameTitle);

		let nameTxt = ComponentManager.getTextField(this._servantInfoObj.servantName, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		nameTxt.textAlign = egret.HorizontalAlign.CENTER;
		if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
			nameTxt.setPosition(namebg.x + namebg.width/2 * namebg.scaleX - nameTxt.width/2, namebg.y + 52);
		}
		else{
			nameTxt.width = 120;
			nameTxt.setPosition(namebg.x + 45, namebg.y + 52);
		}
		this.addChildToContainer(nameTxt);

		let fameTxt = ComponentManager.getTextField(LanguageManager.getlocal('atkraceFame2'), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		fameTxt.setPosition(bgBB.x + 30, bgBB.y + bgBB.height + 35);
		this.addChildToContainer(fameTxt);

		this._progressBar1 = ComponentManager.getProgressBar("progress3", "progress3_bg", 400);
		this._progressBar1.x = fameTxt.x + fameTxt.width + 20;
		this._progressBar1.y = fameTxt.y - 3;
		this.addChildToContainer(this._progressBar1);

		//提升品阶按钮
		if(this._servantInfoObj.fameLv < maxFameLevel){
			this._upFameBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "atkraceFameBtnUpFame", this.onClickUpFameBtn, this);
			this._upFameBtn.x = bgBB.x + bgBB.width / 2 - this._upFameBtn.width / 2;
			this._upFameBtn.y = fameTxt.y + 50;
			this.addChildToContainer(this._upFameBtn);
			this._upFameBtn.setGray(true);
	
			App.CommonUtil.addIconToBDOC(this._upFameBtn);
		}


		//刷新进度条和红点
		this.refreshView();
	}

	private refreshView() {
		this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);

		//刷新标题
		if(this.titleTF)
		{
			this.titleTF.text = LanguageManager.getlocal("atkraceFameLevel" + this._servantInfoObj.fameLv);
			this.titleTF.x = this.viewBg.x + this.viewBg.width/2 - this.titleTF.width/2;
			// this.titleTF.y = this.viewBg.y + 15;
		}

		//刷新进度条
		let percent = this._servantInfoObj.fame / Config.AtkraceCfg.getNeedFameBylevel(this._servantInfoObj.fameLv);
		let percentStr = `${this._servantInfoObj.fame}/${Config.AtkraceCfg.getNeedFameBylevel(this._servantInfoObj.fameLv)}`
		this._progressBar1.setPercentage(percent, percentStr);

		//刷新红点
		if(this._upFameBtn){
			if ( Api.atkraceVoApi.checkServantCanUpFame(this._servantId)) {
				App.CommonUtil.addIconToBDOC(this._upFameBtn);
				this._upFameBtn.setGray(false);
			} else {
				App.CommonUtil.removeIconFromBDOC(this._upFameBtn);
				this._upFameBtn.setGray(true);
			}
		}


	}
	private onClickUpFameBtn() {
		if(this._upFameBtn.getIsGray()){
			App.CommonUtil.showTip(LanguageManager.getlocal('atkraceFameUpFameFailTip'));
			return;
		} 
		this.request(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, { servantId: this._servantId });
	}

	private onUpFameRevHandle() {
		this.refreshView();
	}



	protected getTitleStr(): string {
		return "atkraceFameLevel" + Api.servantVoApi.getServantObj(this.param.data.servantId).fameLv;
	}


	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, this.onUpFameRevHandle, this);
		this._servantId = '';
		this._servantIcon = null;
		this._droServantIcon = null;
		this._progressBar1 = null;
		this._upFameBtn = null;
		super.dispose();
	}
}