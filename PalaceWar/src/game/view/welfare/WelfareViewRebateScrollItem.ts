
class WelfareViewRebateScrollItem extends ScrollListItem
{
	private suffixStr:string ="";
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		let temW:number = 491;
		let temH:number = 115;

	 
		let line1:BaseBitmap = BaseBitmap.create("public_line3");
		line1.width = temW - 100;
		line1.x = temW/2 - line1.width/2;
		line1.y = 10;
		this.addChild(line1);
	
		let bg:BaseBitmap = BaseBitmap.create("public_9_managebg");
		bg.width = temW - 40;
		bg.height = 75;
		bg.x = temW/2 - bg.width/2;
		bg.y =  line1.y + 27;
		this.addChild(bg);
		if(Api.switchVoApi.checkOpenRechargeRebate2())
		{
			this.suffixStr ="_2"
		}
		 
 
		if(index!=0)
		{
			let titleText:BaseTextField =  ComponentManager.getTextField(LanguageManager.getlocal("rebateTitle"+index+this.suffixStr),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
			titleText.setPosition(temW/2-titleText.width/2*titleText.scaleX,line1.y);
			this.addChild(titleText); 
		}
		 
		let  desText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rebateDes"+index+this.suffixStr),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		desText.setPosition(30,bg.y+8);
		desText.width= bg.width-15;
		this.addChild(desText); 
		desText.lineSpacing=3;
		if(desText.textHeight>bg.height)
		{
			bg.height = desText.textHeight+30;
		}

		if(index==0)
		{
			line1.visible =false; 
			desText.y=5;
			desText.lineSpacing=5;
			this.removeChild(bg);
		}
	}

	public dispose():void
	{
		super.dispose();
	}
}