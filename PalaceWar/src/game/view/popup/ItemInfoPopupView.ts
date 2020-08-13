/**
 * 道具详情弹板
 * author dmj
 * date 2017/9/19
 * @class ItemInfoPopupView
 */
class ItemInfoPopupView extends PopupView
{

	public constructor() 
	{
		super();
	}

	protected getTitleStr():string
	{
		return "itemBtn";
	}

	protected initView():void{
		let bg:BaseBitmap = BaseBitmap.create("popupview_itemsbg");
		bg.x = this.viewBg.x + (this.viewBg.width - bg.width) / 2;
		bg.y = 0;
		this.addChildToContainer(bg);
		
		let itemCfg:Config.ItemItemCfg|RewardItemVo = null;
		if(typeof(this.param.data)=="string"||typeof(this.param.data)=="number")
		{
			itemCfg=Config.ItemCfg.getItemCfgById(Number(this.param.data));
			if(!itemCfg)
			{
				App.LogUtil.show("调用道具详情界面清传入道具id或者传入RewardItemVo");
				return;
			}
		}
		else if(this.param.data instanceof RewardItemVo)
		{
			itemCfg=this.param.data;
		}
		else if(this.param.data.dType && this.param.data.dType == "json") 
		{
			itemCfg=this.param.data;
		}
		else
		{
			App.LogUtil.show("调用道具详情界面清传入道具id或者传入RewardItemVo");
			return;
		}
		let itemName:string = itemCfg.name;
		let iconPic:string = itemCfg.icon;
		let effectDesc:string = itemCfg.desc;
		let dropDesc:string = itemCfg.dropDesc;
		let effectTitle:string = LanguageManager.getlocal("effectTitle");
		let dropTitle:string = LanguageManager.getlocal("dropTitle");

		if (PlatformManager.checkIsRuSp() || PlatformManager.checkIsEnSp())
		{
			effectTitle = itemName + ": ";
		}
		else
		{
			this.titleTF.text = itemName;
		}
		
		let icon=GameData.getItemIcon(itemCfg,false);
		let numLb:BaseTextField=<BaseTextField>icon.getChildByName("numLb");
		if(numLb)
		{
			numLb.visible=false;
		}
		if (icon.getChildByName("numbg"))
		{
			icon.getChildByName("numbg").visible = false;
		}
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

		// if ((effectDescTF.y+effectDescTF.height)>100)
		// {
		// 	dropTitleTF.y = effectDescTF.y+effectDescTF.height+12;
		// }

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