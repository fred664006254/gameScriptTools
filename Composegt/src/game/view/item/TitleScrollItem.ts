class TitleScrollItem extends ItemScrollItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,itemInfoVo:TitleInfoVo):void
	{
		super.initItem(index,itemInfoVo);

		if (Api.switchVoApi.checkOpenTitleLv() &&  itemInfoVo.isLvUp == 1)
		{
			let bgres = "public_lvupbg";
			let textcolor = TextFieldConst.COLOR_BROWN;
			let itemCfg = itemInfoVo.itemCfg;
			let lv = itemInfoVo.lv;
			if( itemCfg.emperorLvUpNeed && itemCfg.emperorLvUpNeed.length > 0){
				bgres = "public_lvupbg2";
				textcolor = TextFieldConst.COLOR_WHITE;
				if(itemInfoVo.tnum == 0 ){
					lv  = undefined;
				}
			}
			if( lv ){
				let lvbg:BaseBitmap = BaseBitmap.create(bgres);
				lvbg.setPosition(this._itembg.width-lvbg.width+2,5);
				this.addChild(lvbg);

				let levelTf:BaseTextField = ComponentManager.getTextField("Lv."+String(itemInfoVo.lv),16,textcolor);
				levelTf.x = lvbg.x + lvbg.width/2 - levelTf.width/2;
				levelTf.y = lvbg.y ;
				this.addChild(levelTf);
			}
			
		}
	}
}