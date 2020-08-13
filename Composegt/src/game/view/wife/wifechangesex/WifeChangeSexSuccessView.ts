class WifeChangeSexSuccessView extends CommonView {


	private _wifeId = 0;
	private _sex = 0;
	private _wifeCfg: Config.WifeItemCfg = null;
	private _wifeInfoVo: WifeInfoVo = null;

	private alphaItem:any[] = [];

	public constructor() {
		super();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"wifeview_namebg", "wifeview_namebg_male", 'wifechangesexbg_male', 'wifechangesexbg'
		]);
	}

	protected isShowTitleBgShadow(): boolean {
		return false;
	}





	public initView(): void {
		this._wifeId = this.param.data.wid;
		this._sex = this.param.data.sex;
		this._wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);

		let storyId = this._sex ? this._wifeCfg.blueStory : this._wifeCfg.wifeStory;
		if (storyId) {
			ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW, { storyId: storyId, callback: this.playCloud, target: this });
		}

		let alphaBg = BaseBitmap.create("public_9_black");
		alphaBg.width = GameConfig.stageWidth;
		alphaBg.height = GameConfig.stageHeigth;
		alphaBg.alpha = 0.5;
		this.addChildToContainer(alphaBg);

		this.addTouchTap(() => {
			this.hide();
		}, this);

		// //红颜名字背景


		let nameBg1 = BaseBitmap.create(`wifechangesex_namebg${this._wifeInfoVo.sexflag ? '_male' : ''}`);
		this.addChildToContainer(nameBg1);
		let maletext:BaseTextField = null;

		if(PlatformManager.checkIsTextHorizontal()){
			nameBg1.rotation = 0;
			nameBg1.setPosition(30, 250);
			maletext = ComponentManager.getTextField(LanguageManager.getlocal(`changewife${this._wifeInfoVo.sexflag ? `male` : `female`}`, [this._wifeInfoVo.name]), 24, TextFieldConst.COLOR_LIGHT_YELLOW)
			this.addChildToContainer(maletext);
			//maletext.textAlign = egret.HorizontalAlign.CENTER;
			maletext.x = nameBg1.x + 20;
			maletext.y = nameBg1.y + 15;
		}else{
			nameBg1.rotation = 90;
			nameBg1.setPosition(120, 250);
			maletext = ComponentManager.getTextField(LanguageManager.getlocal(`changewife${this._wifeInfoVo.sexflag ? `male` : `female`}`, [this._wifeInfoVo.name]), 24, TextFieldConst.COLOR_LIGHT_YELLOW)
			this.addChildToContainer(maletext);
			maletext.width = 27;
			maletext.textAlign = egret.HorizontalAlign.CENTER;
			maletext.x = 75;
			maletext.y = 270;
		}

		this.alphaItem.push(nameBg1,maletext)

		//骨骼
		let wifePicStr = this._wifeInfoVo.body;

		if (App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(this._wifeInfoVo.bone + "_ske")) {
			let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(this._wifeInfoVo.bone);
			droWifeIcon.x = GameConfig.stageWidth / 2;
			droWifeIcon.y = GameConfig.stageHeigth - 140;
			this.addChildToContainer(droWifeIcon);
			this.alphaItem.push(droWifeIcon);
		}
		else {
			// wife 的 图片
			let wifeBM = BaseLoadBitmap.create(wifePicStr);
			wifeBM.width = 640;
			wifeBM.height = 840;
			wifeBM.setScale(0.75);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, wifeBM, this.viewBg, [0, 150]);
			this.addChildToContainer(wifeBM);
			this.alphaItem.push(wifeBM);
		}

		let bottomBg = BaseLoadBitmap.create("wifechangesex_success_bottom");
		bottomBg.width = 640;
		bottomBg.height = 184;
		this.addChildToContainer(bottomBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, this.viewBg);
		this.alphaItem.push(bottomBg);
		// let descTxt: BaseTextField = ComponentManager.getTextField(this._wifeInfoVo.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// descTxt.width = bottomBg.width - 60;
		// descTxt.setPosition(bottomBg.x + 30, bottomBg.y + 20);
		// this.addChildToContainer(descTxt);
		let searchPersonCfg = Config.SearchCfg.getPersonItemCfgByWifeId(String(this._wifeId));
		if (searchPersonCfg) {
			let ofx = 10;
			let ofy = 10;
			let identityTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("identityDesc") + LanguageManager.getlocal("syscolonDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
			identityTxt.setPosition(40, bottomBg.y + 40);
			this.addChildToContainer(identityTxt);

			let identityDescTxt: BaseTextField = ComponentManager.getTextField(searchPersonCfg.shortDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
			identityDescTxt.setPosition(identityTxt.x + identityTxt.width + ofx, identityTxt.y);
			this.addChildToContainer(identityDescTxt);

			let meiliTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality4") + LanguageManager.getlocal("syscolonDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
			meiliTxt.setPosition(identityTxt.x, identityTxt.y + identityTxt.height + ofy);
			this.addChildToContainer(meiliTxt);

			let meiliDescTxt: BaseTextField = ComponentManager.getTextField(Api.wifeVoApi.getWifeInfoVoById(Number(this._wifeId)).glamour.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
			meiliDescTxt.setPosition(meiliTxt.x + meiliTxt.width + ofx, meiliTxt.y);
			this.addChildToContainer(meiliDescTxt);

			let memoirTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("memoirDesc") + LanguageManager.getlocal("syscolonDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
			memoirTxt.setPosition(meiliTxt.x, meiliTxt.y + meiliTxt.height + ofy);
			this.addChildToContainer(memoirTxt);

			let memoirDescTxt: BaseTextField = ComponentManager.getTextField(searchPersonCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
			memoirDescTxt.setPosition(memoirTxt.x + memoirTxt.width + ofx, memoirTxt.y);
			memoirDescTxt.width = bottomBg.width - memoirDescTxt.x - 30;
			this.addChildToContainer(memoirDescTxt);
			this.alphaItem.push(identityTxt,identityDescTxt,meiliTxt,meiliDescTxt,memoirTxt,memoirDescTxt);
		}

		//樱花
		let flower = BaseBitmap.create("wifechangesex_flower");
		flower.x = -20;
		flower.y = -30;
		this.addChild(flower);

		this.swapChildren(flower, this.titleBg);

		//樱花动效
		let randomT = 2000 + Math.floor(Math.random() * 800);
		let randomR = 2.5 + Math.random();
		egret.Tween.get(flower, { loop: true })
			.to({ rotation: 1.5 * randomR }, randomT, egret.Ease.quadOut)
			.to({ rotation: -0.5 * randomR }, randomT * 2, egret.Ease.quadInOut)
			.to({ rotation: 0 }, randomT, egret.Ease.quadIn);

		let randomTT = 5000 + Math.floor(Math.random() * 800);
		let x = flower.x;
		let y = flower.y;
		egret.Tween.get(flower, { loop: true })
			.to({ x: x + 10, y: y + 5 }, randomTT, egret.Ease.quadOut)
			.to({ x: x - 10, y: y - 5 }, randomTT * 2, egret.Ease.quadInOut)
			.to({ x: x, y: y }, randomTT, egret.Ease.quadIn);

		//花瓣骨骼
		if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {

			let flowerDragon = App.DragonBonesUtil.getLoadDragonBones("createuser_huaban");
			flowerDragon.x = 100;
			flowerDragon.y = 100;
			flowerDragon.setIdle("huaban");
			this.addChild(flowerDragon);

		}

		for (let i = 0; i < this.alphaItem.length; i++) {
			const element = this.alphaItem[i];
			element.visible = false;
		}
		

	}


	private playCloud() {
		if (App.CommonUtil.check_dragon()) {
			let cloud = App.DragonBonesUtil.getLoadDragonBones("qianshijinsheng", 1);
			this.addChild(cloud);
			cloud.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
			egret.setTimeout(()=>{
				if(!this._wifeId) return;
				for (let i = 0; i < this.alphaItem.length; i++) {
					const element = this.alphaItem[i];
					element.visible = true;
				}
				if (!Api.switchVoApi.checkCloseWifeSound()) {
					let soundRes = this._wifeInfoVo.sound;
					if (this._sex) {
						soundRes = this._wifeInfoVo.getBlueSound();
					}
					this.playEffect(soundRes, true);
		
				}
			},this,1000);
		}else{
			for (let i = 0; i < this.alphaItem.length; i++) {
				const element = this.alphaItem[i];
				element.visible = true;
			}
			if (!Api.switchVoApi.checkCloseWifeSound()) {
				let soundRes = this._wifeInfoVo.sound;
				if (this._sex) {
					soundRes = this._wifeInfoVo.getBlueSound();
				}
				this.playEffect(soundRes, true);
	
			}
		}
	}

	public hide(): void {
		super.hide();

	}

	protected getTitleStr(): string {
		return null;
	}

	protected getTitleBgName(): string {
		return `wifechangesextitle`;
	}

	protected getBgName(): string {
		let sex = this.param.data.sex;
		return `wifechangesexbg${sex ? '_male' : ''}`;
	}

	protected getCloseBtnName(): string {
		return null;
	}
	public dispose(): void {
		this._wifeId = 0;
		this._sex = 0;
		this._wifeCfg = null;
		this._wifeInfoVo = null;
		this.alphaItem = [];
		super.dispose();
	}
}