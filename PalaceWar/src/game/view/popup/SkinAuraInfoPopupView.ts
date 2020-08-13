/**
 * 皮肤开启光环icon详情面板
 * author wxz
 * date 2020/7/6
 * @class SkinAuraInfoPopupView
 */
class SkinAuraInfoPopupView extends PopupView
{

	public constructor() 
	{
		super();
	}

	protected getTitleStr():string
	{
		return "itemBtn";
	}

	protected initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("popupview_itemsbg");
		bg.x = this.viewBg.x + (this.viewBg.width - bg.width) / 2;
		bg.y = 0;
		this.addChildToContainer(bg);
		
		let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.param.data);
		if(!servantSkinCfg)
		{
			return;
		}
		
		let effectDesc:string = LanguageManager.getlocal("skinAuraInfoEffect"+servantSkinCfg.specialAuraCfg.auraIcon,[String(Math.floor(servantSkinCfg.specialAuraCfg.specialAuraValue*100))]);
		let dropDesc:string = LanguageManager.getlocal("skinAuraInfoDrop"+servantSkinCfg.specialAuraCfg.auraIcon);
		let effectTitle:string = LanguageManager.getlocal("effectTitle");
		let dropTitle:string = LanguageManager.getlocal("dropTitle");

		this.titleTF.text = LanguageManager.getlocal("skinAuraInfoTitle"+servantSkinCfg.specialAuraCfg.auraIcon);
		
		let icon = BaseBitmap.create("servant_aura_Icon"+ servantSkinCfg.specialAuraCfg.auraIcon);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg, [0,23]);
		this.addChildToContainer(icon);

		let effectTitleTF:BaseTextField = ComponentManager.getTextField(effectTitle,TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		effectTitleTF.setColor(TextFieldConst.COLOR_LIGHT_BLACK);
		effectTitleTF.x = bg.x + 23;
		effectTitleTF.y = bg.y + bg.height + 20;
		this.addChildToContainer(effectTitleTF);

		let effectDescTF:BaseTextField = ComponentManager.getTextField(effectDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_BLACK);
		effectDescTF.x = effectTitleTF.x + effectTitleTF.width;
		effectDescTF.y = effectTitleTF.y;
		effectDescTF.width = 490-effectTitleTF.width;
		effectDescTF.lineSpacing = 5;
		this.addChildToContainer(effectDescTF);

		let dropTitleTF:BaseTextField = ComponentManager.getTextField(dropTitle,TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		dropTitleTF.setColor(TextFieldConst.COLOR_LIGHT_BLACK);
		dropTitleTF.x = effectTitleTF.x;
		dropTitleTF.y = effectDescTF.y + effectDescTF.textHeight + 17;
		this.addChildToContainer(dropTitleTF);

		let dropDescTF:BaseTextField = ComponentManager.getTextField(dropDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_BLACK);
		dropDescTF.x = dropTitleTF.x + dropTitleTF.width;
		dropDescTF.y = dropTitleTF.y;
		dropDescTF.width = 495-dropTitleTF.width;
		dropDescTF.lineSpacing = 5;
		this.addChildToContainer(dropDescTF);
		
	}

	protected resetBgSize():void
	{
		super.resetBgSize();

		let kuang = BaseBitmap.create(`popup_frame1`);
		kuang.width = 530;
		kuang.x = 46;
		kuang.height = this.viewBg.height - 100;
		this.container.addChildAt(kuang, 0);
	}

	// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 90;
	}

	protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([`popupview_itemsbg`,`popup_frame1`]);
	}

	public dispose():void
	{

		super.dispose();
	}
}