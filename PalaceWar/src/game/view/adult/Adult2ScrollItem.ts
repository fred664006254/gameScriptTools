/**
 * 成年成亲子嗣栏位
 * author dky
 * date 2017/10/31
 * @class Adult2ScrollItem
 */
class Adult2ScrollItem extends ScrollListItem
{

	private _adultInfo:AdultInfoVo;
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,adultInfoVo:AdultMarryInfoVo):void
	{	

		// this._childIndex = posIndex;

		this.width = 604;
		this.height = 128 + this.getSpaceY();

		//1孩子 2空闲 3扩展
		let itemType = 1

		let itemBg = BaseBitmap.create("public_9_bg27");
		itemBg.width = this.width;
		itemBg.height = this.height-5;
		itemBg.x =  this.width/2 - itemBg.width/2;
		itemBg.y = this.height/2 - itemBg.height/2;
		this.addChild(itemBg);

		let itemBg2:BaseBitmap = BaseBitmap.create("public_9_bg26");
		itemBg2.width = this.width-40;
		itemBg2.height = this.height-45;
		itemBg2.x =  20;
		itemBg2.y = 10;
		itemBg2.name = "bg2";
		this.addChild(itemBg2);

		let childSexPic1 = "childview_boyicon";
		let childSexPic2 = "childview_girlicon";
		if(adultInfoVo.sex == 2){
			childSexPic1 = "childview_girlicon";	
			childSexPic2 = "childview_boyicon";
		}

		let childIcon:BaseBitmap = BaseBitmap.create(childSexPic1);
		childIcon.x =  40;
		childIcon.y = itemBg2.y +  itemBg2.height/2 - childIcon.height/2;
		this.addChild(childIcon);


		
		let childName = adultInfoVo.name;
		let nameColor = TextFieldConst.COLOR_WHITE;

		let nameTF = ComponentManager.getTextField( childName,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		nameTF.textColor = nameColor;
		nameTF.x = 90;
		nameTF.y = 20;
		this.addChild(nameTF);


		let qualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + adultInfoVo.aquality);
		let qualityTF = ComponentManager.getTextField( qualityStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		qualityTF.textColor = nameColor;
		qualityTF.x = nameTF.x;
		qualityTF.y = nameTF.y + nameTF.height + 7;
		this.addChild(qualityTF);


		let attrStr = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.attrVo.attTotal;

		let attrTF = ComponentManager.getTextField( attrStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		attrTF.textColor = nameColor;
		attrTF.x = nameTF.x;
		attrTF.y = qualityTF.y + qualityTF.height + 7;
		this.addChild(attrTF);


		//对面的小孩
		let childIcon2:BaseBitmap = BaseBitmap.create(childSexPic2);
		childIcon2.x =  330;
		childIcon2.y = itemBg2.y +  itemBg2.height/2 - childIcon.height/2;
		this.addChild(childIcon2);
		
		let childName2 = adultInfoVo.fname;
	
		let nameTF2 = ComponentManager.getTextField( childName2,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		nameTF2.textColor = nameColor;
		nameTF2.x = 380;
		nameTF2.y = nameTF.y;
		this.addChild(nameTF2);


		let qualityTF2 = ComponentManager.getTextField( qualityStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		qualityTF2.textColor = nameColor;
		qualityTF2.x = nameTF2.x;
		qualityTF2.y = nameTF2.y + nameTF2.height + 7;
		this.addChild(qualityTF2);


		let attrStr2 = LanguageManager.getlocal("servant_infoAttr") + adultInfoVo.ftotal;

		let attrTF2 = ComponentManager.getTextField( attrStr2,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		attrTF2.textColor = nameColor;
		attrTF2.x = nameTF2.x;
		attrTF2.y = qualityTF2.y + qualityTF2.height + 7;
		this.addChild(attrTF2);

		//结婚时间
		let timeStr = App.DateUtil.getFormatBySecond(adultInfoVo.mts,2)
		let timeTF = ComponentManager.getTextField( timeStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		timeTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		timeTF.x = 100;
		timeTF.y = itemBg2.y + itemBg2.height + 6;
		this.addChild(timeTF);

		//亲家
		let nameStr = LanguageManager.getlocal("adultOtherName") + adultInfoVo.funame;
		let otherNameTF = ComponentManager.getTextField( nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		otherNameTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		otherNameTF.x = 400;
		otherNameTF.y = timeTF.y;
		this.addChild(otherNameTF);

		if(PlatformManager.checkIsEnLang())
		{
			timeTF.x = 50;
			otherNameTF.x =itemBg.x + itemBg.width - 50 - otherNameTF.width;
		}

		
		
	}

	public refreshData(index:number)
	{	

	}


	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{
		this._adultInfo = null;
		super.dispose();
	}
}