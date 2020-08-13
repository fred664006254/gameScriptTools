/**
 * 未迎娶wifeitem
 * author dmj
 * date 2017/10/9
 * @class WifeScrollItem2
 */
class WifeScrollItem2 extends ScrollListItem 
{
	public constructor() 
	{
		super();
	}
	private _wifeId:string = undefined;
	protected initItem(index:number,wifeItemCfg:Config.WifeItemCfg,itemParam?:any):void
	{
		this.width = 640;
		this.height = 303 + this.getSpaceY();
		this._wifeId = wifeItemCfg.id;
		let isBluePreview = undefined;
		let sexflag = 0;
		if(Api.switchVoApi.checkOpenBuleWife() && Api.gameinfoVoApi.getSexswitch() && Api.gameinfoVoApi.getSexdefault() &&Api.wifeVoApi.checkWifeCanChangeSex(this._wifeId)){
			sexflag = 1;
		}

		if(itemParam && Api.wifeVoApi.checkWifeCanChangeSex(this._wifeId)){
			isBluePreview = itemParam.isBluePreview;
		}

		let nameRes = 'wifeview_itembg';
		nameRes = "wifeview_itembg" + (sexflag?"_male":'');
		if(typeof(isBluePreview) != "undefined" ){
			nameRes = isBluePreview?"wifeview_itembg_male":"wifeview_itembg";
		}

		let nameBg:BaseLoadBitmap = BaseLoadBitmap.create(nameRes);
		// nameBg.width = this.width;
		nameBg.x = 10;
		this.addChild(nameBg);

		// let wifeBg = "wifeview_bg" + (index%5 + 1);

		// let bg:BaseBitmap = BaseLoadBitmap.create(wifeBg);
		// this.addChild(bg);
		// bg.x = 66;
		// bg.y = nameBg.height/2 - 211/2
		let blueBody = wifeItemCfg.body;
		if(ResourceManager.hasRes("wife_full_" + this._wifeId+"_male")){
			blueBody = "wife_full_" + this._wifeId+"_male";
		}

		let iconRes = wifeItemCfg.body;
		if(typeof(isBluePreview) != "undefined" ){
			iconRes = isBluePreview?blueBody:("wife_full_" + this._wifeId);
		}
		let icon:BaseBitmap = BaseLoadBitmap.create(iconRes);
		icon.x = 70;
		//todo icon的宽高尺寸需要固定
		icon.y = 4;
		this.addChild(icon);
		icon.setScale(0.34);
		// let mask = new egret.Shape(0, 0, 500, 740);
		// let mask = new egret.Circle
		// icon.mask = mask;

		// let nameBg2:BaseBitmap = BaseBitmap.create("wifeview_itembg2");
		// nameBg2.width = this.width;
		// this.addChild(nameBg2);

		let nameStr = wifeItemCfg.name;
		if(typeof(isBluePreview) != "undefined" ){
			nameStr = isBluePreview?(LanguageManager.getlocal("wifeName_" +this._wifeId+"_male")):(LanguageManager.getlocal("wifeName_" +this._wifeId));
		}
		let nameTF = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);



		//横版名字变竖版名字
		if (PlatformManager.checkIsTextHorizontal())
		{
			let nameBgRes = "wifeview_namebg" + (sexflag?"_male":'');
			if(typeof(isBluePreview) != "undefined" ){
				nameBgRes = isBluePreview?"wifeview_namebg_male":"wifeview_namebg";
			}

			let nameBackground:BaseBitmap = BaseBitmap.create(nameBgRes);
			nameBackground.width = nameTF.width + 40;
			nameBackground.height = 51;

			nameBackground.x = 171;//nameBg.x + nameBg.width/2 ;
			nameBackground.y = 265;//nameBg.y + nameBg.height-50;
			nameBackground.anchorOffsetX = nameBackground.width/2;
			nameBackground.anchorOffsetY = nameBackground.height/2;
			// nameBackground.setScale(0.6);
			nameBackground.scaleY = 0.6;

			nameTF.x = nameBackground.x - nameTF.width/2;
			nameTF.y = nameBackground.y - nameTF.height/2;

			this.addChild(nameBackground);
		} else {
			nameTF.width = 27;
			nameTF.x = 34;
			nameTF.y = nameBg.y + 113 - nameTF.height/2;
		}

		this.addChild(nameTF);

		// let mask:BaseBitmap = BaseBitmap.create("wifeview_unlockmask");
		// mask.x = 0;
		// mask.y = 0;
		// this.addChild(mask);




		let unlockTFTitle = ComponentManager.getTextField(LanguageManager.getlocal("wifeUnlock_title"),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		// unlockTFTitle.width = 150;
		unlockTFTitle.x = 470 - unlockTFTitle.width/2;
		unlockTFTitle.y = 40;
		this.addChild(unlockTFTitle);

		let lockBg:BaseBitmap = BaseBitmap.create("wifeview_lockbg");
		this.addChild(lockBg);
		lockBg.x = unlockTFTitle.x + unlockTFTitle.width/2 - lockBg.width/2;
		lockBg.y = unlockTFTitle.y + unlockTFTitle.height + 15;

		let unlockTF = ComponentManager.getTextField(wifeItemCfg.wifeunlock,TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_RED3);
		// unlockTF.width = 150;
		unlockTF.x = lockBg.x + lockBg.width/2 - unlockTF.width/2; //unlockTFTitle.x ;
		unlockTF.y = lockBg.y + lockBg.height/2 - unlockTF.height/2;
		this.addChild(unlockTF);

		let descStr = wifeItemCfg.desc;
		if(typeof(isBluePreview) != "undefined"){
			descStr = isBluePreview?(LanguageManager.getlocal("wifeDesc_" + this._wifeId+"_male")):(LanguageManager.getlocal("wifeDesc_" + this._wifeId));
		}
		let descTF = ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		descTF.width = 255;
		descTF.x = lockBg.x + lockBg.width/2 - descTF.width/2; //unlockTFTitle.x;
		descTF.y = lockBg.y + lockBg.height + 10;
		this.addChild(descTF);

		if(wifeItemCfg.wifeunlock == LanguageManager.getlocal("wifeUnlock_1"))
		{
			let searchButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "searchViewTitle", this.jumpBtnClickHandler, this);
			searchButton.x = descTF.x + descTF.width/2 - searchButton.width/2;//470;
			searchButton.y = 225;
			this.addChild(searchButton);
		}
		

	}

	private jumpBtnClickHandler():void
	{
		if(Config.SearchbaseCfg.needLv > Api.composemapVoApi.getMaxLv())
		{
			App.CommonUtil.showTip(Api.searchVoApi.getLockedString());
			return;
		}
		
		if (Api.switchVoApi.checkOpenSearchGem()){
			let bid = Config.SearchCfg.getPersonItemCfgByWifeId(this._wifeId).build;
			ViewController.getInstance().openView(ViewConst.POPUP.SEARCHBUILDPOPUPVIEW,{wifeId:this._wifeId,bid:bid });
		}else{
			ViewController.getInstance().openView(ViewConst.COMMON.SEARCHVIEW);
		}
		
	}


	public getSpaceY():number
	{
		return 15;
	}

	public dispose():void
	{
		this._wifeId = null;
		super.dispose();
	}
}