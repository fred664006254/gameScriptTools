/**
 * 已迎娶wifeitem
 * author dmj
 * date 2017/10/9
 * @class WifeScrollItem1
 */
class WifeScrollItem1 extends ScrollListItem
{
	// 亲密度文本
	private _intimacyTF:BaseTextField;
	// 魅力文本
	private _glamourTF:BaseTextField;
	public _wifeInfoVo:WifeInfoVo;
	private _wifeIcon:BaseLoadBitmap;
	private _artistryTF:BaseTextField;
	private _homeimg:BaseBitmap;
	// this.
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,wifeInfoVo:WifeInfoVo):void
	{

		if(!wifeInfoVo){
			this.width = 622;
			if(index == 0)
			{
				this.height =100 + this.getSpaceY();
			}
			else{
				this.height =30 + this.getSpaceY();
			}
			
			return;
		}

		this.width = 622;
		this.height = 500 + this.getSpaceY();


		this._wifeInfoVo = wifeInfoVo;
		

		let wifebattle = Api.switchVoApi.checkOpenWifeBattle();
		let nameBg:BaseBitmap = BaseBitmap.create(wifebattle ? "wifehalfbg2" : "wifehalfbg");
		nameBg.name = `nameBg`;
		nameBg.x = this.width/2 - nameBg.width/2;
		// nameBg.y = 40;
		this.addChild(nameBg);

		let homeImg = BaseBitmap.create(`wifehome2`);
		this.addChild(homeImg);
		this._homeimg = homeImg;
		let wifecfg = Config.WifeCfg.getWifeCfgById(wifeInfoVo.id);
		let skincanhome = false;
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.skin)
			{
				for(let i in wifeSkinVo.skin){
					let skinCfg = Config.WifeskinCfg.getWifeCfgById(i);
					if(skinCfg.canAtHome){
						skincanhome = true;
						break;
					}
				}
			}
		}
		homeImg.visible = wifecfg.canAtHome || skincanhome;
		homeImg.x = 71;
		homeImg.y = 75;
		// let wifeBg = "wifeview_bg" + (index%5 + 1);

		// let bg:BaseBitmap = BaseLoadBitmap.create(wifeBg);
		// this.addChild(bg);
		// bg.x = 66;
		// bg.y = nameBg.height/2 - 211/2

		let wifePic = wifeInfoVo.body;
		
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfoVo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfoVo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePic = skinCfg.body;
			}
			
		}

		this._wifeIcon = BaseLoadBitmap.create(wifePic);
		this._wifeIcon.x = nameBg.x + 60; 
		//todo this._wifeIcon的宽高尺寸需要固定
		this._wifeIcon.y = 20;
		this._wifeIcon.setScale(0.6)
		this.addChild(this._wifeIcon);

		nameBg.addTouchTap(this.clickItemHandler,this);



		let mask = new egret.Rectangle(0, 0, 640, 692);
		this._wifeIcon.mask = mask;

		let nameTF = ComponentManager.getTextField(wifeInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WHITE);
		nameTF.name = `nameTF`;

		
		//横版名字变竖版名字
		if (PlatformManager.checkIsTextHorizontal())
		{
			let nameBackground:BaseBitmap = BaseBitmap.create("wifeview_namebg");
			nameBackground.width = nameTF.width + 40;
			nameBackground.height = 51;

			nameBackground.x = nameBg.x + nameBg.width/2;
			nameBackground.y = nameBg.y + nameBg.height-87;
			nameBackground.anchorOffsetX = nameBackground.width/2;
			nameBackground.anchorOffsetY = nameBackground.height/2;

			nameTF.x = nameBackground.x - nameTF.width/2;
			nameTF.y = nameBackground.y - nameTF.height/2;

			this.addChild(nameBackground);
		} else {
			nameTF.width = 27;
			nameTF.x = nameBg.x + 38;
			nameTF.y = nameBg.y + 446/2 - nameTF.height/2;
		}

		this.addChild(nameTF);




		let intimacyBg:BaseBitmap = BaseBitmap.create("public_itemtipbg2");
		intimacyBg.width = 100;
		intimacyBg.x = wifebattle ? 140 : 220;
		intimacyBg.y = this.height - intimacyBg.height - 80;
		this.addChild(intimacyBg);


		let intimacyIcon:BaseBitmap = BaseBitmap.create("wifeview_vigoricon");
		intimacyIcon.x = intimacyBg.x - intimacyIcon.width/2+10;
		intimacyIcon.y = intimacyBg.y + intimacyBg.height/2 - intimacyIcon.height/2;
		this.addChild(intimacyIcon);

		this._intimacyTF = ComponentManager.getTextField(App.StringUtil.changeIntToText(wifeInfoVo.intimacy),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._intimacyTF.x = intimacyIcon.x + intimacyIcon.width + 0;
		this._intimacyTF.y = intimacyBg.y + intimacyBg.height/2 - this._intimacyTF.height/2;
		this.addChild(this._intimacyTF);

		let meiliBg:BaseBitmap = BaseBitmap.create("public_itemtipbg2");
		meiliBg.width = intimacyBg.width;
		meiliBg.x = intimacyBg.x + 145;
		meiliBg.y = intimacyBg.y ;
		this.addChild(meiliBg);

		let meiliIcon:BaseBitmap = BaseBitmap.create("wifeview_charmicon");
		meiliIcon.x = meiliBg.x - meiliIcon.width/2;
		meiliIcon.y = meiliBg.y + meiliBg.height/2 - meiliIcon.height/2;
		this.addChild(meiliIcon);

		this._glamourTF = ComponentManager.getTextField(App.StringUtil.changeIntToText(wifeInfoVo.glamour),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._glamourTF.x = meiliIcon.x + meiliIcon.width + 5;
		this._glamourTF.y = meiliBg.y + meiliBg.height/2 - this._glamourTF.height/2;
		this.addChild(this._glamourTF);

		if(wifebattle){
			let artistryBg:BaseBitmap = BaseBitmap.create("public_itemtipbg2");
			artistryBg.width = meiliBg.width;
			artistryBg.x = meiliBg.x + 140;
			artistryBg.y = meiliBg.y ;
			this.addChild(artistryBg);

			let artistryIcon:BaseBitmap = BaseBitmap.create("wifeview_artistryicon");
			artistryIcon.x = artistryBg.x - artistryIcon.width/2;
			artistryIcon.y = artistryBg.y + artistryBg.height/2 - artistryIcon.height/2;
			this.addChild(artistryIcon);

			this._artistryTF = ComponentManager.getTextField(App.StringUtil.changeIntToText(wifeInfoVo.artistry),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			this._artistryTF.x =  artistryIcon.x + artistryIcon.width + 5;
			this._artistryTF.y = artistryBg.y + artistryBg.height/2 - this._artistryTF.height/2;
			this.addChild(this._artistryTF);
		}

		if (Api.switchVoApi.checkOpenBanish() && Api.wifebanishVoApi.getIsWifeBanishing(String(this._wifeInfoVo.id)))
		{
			let banishContainer = new BaseDisplayObjectContainer();
			banishContainer.setPosition(420,23);
			this.addChild(banishContainer);

			let banishing:BaseBitmap = BaseBitmap.create("wife_banishing_icon");
			banishContainer.addChild(banishing);

			let banishingbg:BaseBitmap = BaseBitmap.create("public_9_bg60");
			banishingbg.y= 65;
			banishingbg.height = 22;
			banishingbg.width = 50;
			banishContainer.addChild(banishingbg);

			let banishingbg2:BaseBitmap = BaseBitmap.create("public_9_bg60");
			banishingbg2.y= 65;
			banishingbg2.height = 22;
			banishingbg2.width = 50;
			banishingbg2.scaleX = -1;
			banishingbg2.x = banishingbg.width+banishingbg2.width;
			banishContainer.addChild(banishingbg2);

			banishing.x = banishingbg.width - banishing.width/2;

			// let banishingText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banishing")  ,TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
			// banishingText.setColor(TextFieldConst.COLOR_WARN_GREEN3);
			// banishingText.setPosition(banishingbg.width-banishingText.width/2,67);
			// banishContainer.addChild(banishingText);
			
			let banishingText:BaseBitmap = BaseBitmap.create("wife_banishing_text");
			banishingText.setPosition(banishingbg.width-banishingText.width/2,65);
			banishContainer.addChild(banishingText);

			let banishInfo:WifeBanishInfoVo = Api.wifebanishVoApi.getBanishInfoVoByWife(this._wifeInfoVo.id);
			if ( banishInfo  && banishInfo.et >= GameData.serverTime)
			{
				egret.Tween.get(banishContainer).wait((banishInfo.et - GameData.serverTime)*1000).call(function () {
					banishContainer.dispose();
				});
			} 
		}
	}

	private clickItemHandler(event:egret.TouchEvent):void
	{
		if(WifeView.isMoveing){
			return;
		}
		
		//打点统计
		NetManager.trackEvent(TrackEventConst.TRACKEVENT_FEMALESTAT, `${TrackEventConst.TRACKEVENT_FEMALESTAT_WIFECLICK}${this._wifeInfoVo.id}`);

		ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{
			id:this._wifeInfoVo.id,
			handler:this
		});

		SoundManager.stopEffect(SoundConst.EFFECT_WIFE);

		WifeView.wifeId = this._wifeInfoVo.id;

	}

	public refreshData(id:number)
	{	
		let wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);
		this._intimacyTF.text = App.StringUtil.changeIntToText(wifeInfo.intimacy);
		this._glamourTF.text = App.StringUtil.changeIntToText(wifeInfo.glamour);

		let wifePic = wifeInfo.body;
		
		if(Api.wifeSkinVoApi.isHaveSkin(wifeInfo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeInfo.id);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePic = skinCfg.body;
			}
			
		}
		this._wifeIcon.setload(wifePic);
		let nameTxt = <BaseTextField>this.getChildByName(`nameTF`);
		nameTxt.text = wifeInfo.name;
	}


	public getSpaceY():number
	{
		return 60;
	}

	public dispose():void
	{
		this._intimacyTF = null;
		this._glamourTF = null;
		this._wifeInfoVo = null;
		this._wifeIcon = null;
		this._artistryTF = null;
		this._homeimg = null;
		super.dispose();
	}
}