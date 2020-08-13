class TitleScrollItem extends ItemScrollItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,itemInfoVo:TitleInfoVo):void
	{
		if (!itemInfoVo || !itemInfoVo.id)
		{	
			let itembg:BaseLoadBitmap = BaseLoadBitmap.create("itembg_0");
			itembg.x = itembg.y = 5;
			itembg.width =itembg.height = 108;
			this.addChild(itembg); 
			return;
		}

		super.initItem(index,itemInfoVo);
		let cfg = Config.TitleCfg.getTitleCfgById(itemInfoVo.id);
		if(cfg && cfg.isChangePic()){
			let idx = this.getChildIndex(this._item);
			let lv = itemInfoVo.lv;
			if (Api.switchVoApi.checkOpenChangeTitle()){
				if (cfg.isTitle == 2){
					let pTitle = Api.playerVoApi.getPlayerPtitle();
					if (pTitle.ptitle && pTitle.ptitle == String(itemInfoVo.id)){
						lv = pTitle.plv;
					}
				}
				else if (cfg.isTitle == 1 || cfg.isTitle == 4){
					let titleData = Api.playerVoApi.getTitleInfo();
					if (titleData.title && titleData.title == String(itemInfoVo.id)){
						lv = titleData.tlv;
					}
				}
			}
			let icon = App.CommonUtil.getHeadPic(itemInfoVo.id,lv,itemInfoVo);
			icon.x = this._itembg.x + this._itembg.width/2 - 100/2;
			icon.y = this._itembg.y + this._itembg.height/2 - 100/2;
			this.addChildAt(icon, idx + 1);
		}
		if (Api.switchVoApi.checkOpenTitleLv() &&  itemInfoVo.isLvUp == 1)
		{
			let lvbg:BaseBitmap = BaseBitmap.create("public_itemlvbg");
			lvbg.setPosition(this._itembg.width-lvbg.width+2,8);
			this.addChild(lvbg);

			let levelTf:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_lv",[String(itemInfoVo.lv)]),"titlelv_fnt");
			levelTf.x = this._itembg.x + this._itembg.width - 4 - levelTf.width;
			levelTf.y = this._itembg.y;
			this.addChild(levelTf);
		}

		if(Api.switchVoApi.checkTitleUpgrade() && itemInfoVo.isTitle == 1 && (itemInfoVo.titleType < 3 || itemInfoVo.titleType==7)){
			let info = Api.titleupgradeVoApi.getTitleInfo(itemInfoVo.id);
			if(info && info.level){
				let lvbg:BaseBitmap = BaseBitmap.create("public_itemlvbg");
				lvbg.setPosition(this._itembg.width-lvbg.width+2,8);
				this.addChild(lvbg);

				let levelTf:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_lv",[String(info.level)]),"titlelv_fnt");
				levelTf.x = this._itembg.x + this._itembg.width - 4 - levelTf.width;
				levelTf.y = this._itembg.y;
				this.addChild(levelTf);
			}
		}
	}
}