
class VipTxtPopupView extends PopupView
{

	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 170;
		bg.x = 25+GameData.popupviewOffsetX;
		bg.y = 70-this.getContainerY()+35;
		this.addChildToContainer(bg); 

		let dropDescTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal('viptxtDes'),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		dropDescTF.x = bg.x+8; 
		dropDescTF.width = bg.width-20;
		dropDescTF.lineSpacing =4;
		dropDescTF.textColor =TextFieldConst.COLOR_BLACK;
		dropDescTF.textAlign =TextFieldConst.ALIGH_CENTER;
		dropDescTF.y = bg.y+bg.height/2-dropDescTF.height/2;
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