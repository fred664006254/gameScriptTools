/**
 * 门客，红颜详情弹板
 * author yanyuling
 * date 2018/04/16
 * @class WifeORServantInfoPopupView
 */
class WifeORServantInfoPopupView extends PopupView
{

	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 390;
		bg.height = 200;
		bg.x = 158;
		bg.y = 70-this.getContainerY();
		this.addChildToContainer(bg);
		
		let wifeId = this.param.data.wifeId;
		let servantId = this.param.data.servantId;

		let itemName:string = "";
		let iconPic:string = "";
		let effectDesc:string = "";
		let dropDesc:string = "";
		let effectTitle:string = LanguageManager.getlocal("practice_descTxt");
		let dropTitle:string = LanguageManager.getlocal("dropTitle");
	
		if(wifeId)
		{
			 let wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
			 itemName = wifecfg.name;
			 iconPic = wifecfg.icon
			 effectDesc = wifecfg.desc
			 dropDesc = LanguageManager.getlocal("wifeDropDesc_"+wifeId);
		}else if(servantId)
		{
			let servantcfg = Config.ServantCfg.getServantItemById(servantId);
			itemName = servantcfg.name;
			iconPic = servantcfg.halfIcon
			effectDesc = servantcfg.story
			dropDesc = LanguageManager.getlocal("servantDropDesc_"+servantId);
		}

		var iconBg:BaseBitmap = BaseBitmap.create("itembg_3");
		let detalS = 1.2;
		iconBg.x= 30;
		iconBg.y = 25;
		this.addChildToContainer(iconBg); 

		let iconImg = BaseLoadBitmap.create(iconPic );
        iconImg.width = 100;
        iconImg.height = 100;
        iconImg.x = iconBg.x + iconBg.width/2 - iconImg.width/2;
        iconImg.y = iconBg.y+ iconBg.height/2 -iconImg.height/2-2;
        this.addChildToContainer(iconImg);

		this.titleTF.text = itemName;

		let effectTitleTF:BaseTextField = ComponentManager.getTextField(effectTitle,TextFieldConst.FONTSIZE_CONTENT_SMALL,0xfcf3b4);
		// effectTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		effectTitleTF.x = 171;
		effectTitleTF.y = 29 + 8;
		this.addChildToContainer(effectTitleTF);

		let effectDescTF:BaseTextField = ComponentManager.getTextField(effectDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		effectDescTF.x = effectTitleTF.x + effectTitleTF.width;
		effectDescTF.y = effectTitleTF.y;
		effectDescTF.width = 310;
		this.addChildToContainer(effectDescTF);

		bg.height = effectDescTF.y + effectDescTF.height + 80 - bg.y;
		if(bg.height < 200)
		{
			bg.height = 200;
		}

		let dropTitleTF:BaseTextField = ComponentManager.getTextField(dropTitle,TextFieldConst.FONTSIZE_CONTENT_SMALL,0xfcf3b4);
		// dropTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		dropTitleTF.x = effectTitleTF.x;
		dropTitleTF.y = bg.y + bg.height - 50;
		this.addChildToContainer(dropTitleTF);

		let dropDescTF:BaseTextField = ComponentManager.getTextField(dropDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		dropDescTF.x = dropTitleTF.x + dropTitleTF.width;
		dropDescTF.y = dropTitleTF.y;
		dropDescTF.width = 310;
		this.addChildToContainer(dropDescTF);

		
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([]);
	}

	public dispose():void
	{

		super.dispose();
	}
}