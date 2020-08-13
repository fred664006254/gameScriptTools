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
	protected initItem(index:number,wifeItemCfg:Config.WifeItemCfg,param:any):void
	{
		this.width = 640;
		this.height = 321 + this.getSpaceY();

		let nameBg:BaseBitmap = BaseBitmap.create("wifeview_itembg");
		let isblue = param;
		// if(isblue){
		// 	nameBg.setRes(`wifeview_itembg_${isblue == 0 ? "female" : "male"}`);
		// }
		nameBg.width = this.width;
		this.addChild(nameBg);

		// let wifeBg = "wifeview_bg" + (index%5 + 1);

		// let bg:BaseBitmap = BaseLoadBitmap.create(wifeBg);
		// this.addChild(bg);
		// bg.x = 66;
		// bg.y = nameBg.height/2 - 211/2
 
		let iconstr = ``;
		let namestr = ``;
		let descstr = ``;
		if(isblue && wifeItemCfg.canBlueWife){
			iconstr = `wife_full_${wifeItemCfg.id}_male`;
			namestr = `wifeName_${wifeItemCfg.id}_male`;
			descstr = `wifeDesc_${wifeItemCfg.id}_male`;
		}
		else{
			iconstr = `wife_full_${wifeItemCfg.id}`;
			namestr = `wifeName_${wifeItemCfg.id}`;
			descstr = `wifeDesc_${wifeItemCfg.id}`;
		}
		let icon:BaseBitmap = BaseLoadBitmap.create(iconstr);
		icon.x = 60;
		//todo icon的宽高尺寸需要固定
		icon.y = 0;
		this.addChild(icon);
		icon.setScale(0.35);
		// let mask = new egret.Shape(0, 0, 500, 740);
		// let mask = new egret.Circle
		// icon.mask = mask;

		let nameBg2:BaseBitmap = BaseBitmap.create("wifeview_itembg2");
		nameBg2.width = this.width;
		this.addChild(nameBg2);

		let name = LanguageManager.getlocal(namestr);
		let nameTF = ComponentManager.getTextField(name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);



		//横版名字变竖版名字
		if (PlatformManager.checkIsTextHorizontal())
		{
			let nameBackground:BaseBitmap = BaseBitmap.create("wifeview_namebg");
			nameBackground.width = nameTF.width + 40;
			nameBackground.height = 51;

			nameBackground.x = 171;//nameBg.x + nameBg.width/2 ;
			nameBackground.y = 275;//nameBg.y + nameBg.height-50;
			nameBackground.anchorOffsetX = nameBackground.width/2;
			nameBackground.anchorOffsetY = nameBackground.height/2;

			nameTF.x = nameBackground.x - nameTF.width/2;
			nameTF.y = nameBackground.y - nameTF.height/2;

			this.addChild(nameBackground);
		} else {
			nameTF.width = 27;
			nameTF.x = 29;
			nameTF.y = nameBg.y + 282/2 - nameTF.height/2;
		}

		this.addChild(nameTF);

		// let mask:BaseBitmap = BaseBitmap.create("wifeview_unlockmask");
		// mask.x = 0;
		// mask.y = 0;
		// this.addChild(mask);




		let unlockTFTitle = ComponentManager.getTextField(LanguageManager.getlocal("wifeUnlock_title"),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		// unlockTFTitle.width = 150;
		unlockTFTitle.x = 350;
		unlockTFTitle.y = 50;
		this.addChild(unlockTFTitle);

		let lockBg:BaseBitmap = BaseBitmap.create("wifeview_lockbg");
		this.addChild(lockBg);
		lockBg.x = unlockTFTitle.x - 30;
		lockBg.y = unlockTFTitle.y + unlockTFTitle.height + 5;

		let unlockTF = ComponentManager.getTextField(wifeItemCfg.wifeunlock,TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_RED3);
		// unlockTF.width = 150;
		unlockTF.x = unlockTFTitle.x ;
		unlockTF.y = lockBg.y + lockBg.height/2 - unlockTF.height/2;
		this.addChild(unlockTF);

		let desc = LanguageManager.getlocal(descstr);
		let descTF = ComponentManager.getTextField(desc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		descTF.width = 255;
		descTF.x = unlockTFTitle.x;
		descTF.y = lockBg.y + lockBg.height + 10;
		this.addChild(descTF);

	}

	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{

		super.dispose();
	}
}