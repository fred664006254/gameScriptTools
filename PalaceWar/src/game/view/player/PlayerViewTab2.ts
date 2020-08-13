class PlayerViewTab2 extends CommonViewTab
{
	public constructor() 
	{
		super();	
	}

	protected initView():void
	{
		let str1 = "hello world";
		let str2 = "Jack 2";
		let textTF:BaseTextField = new BaseTextField();
		textTF.text = App.StringUtil.firstCharToUper(str1);
		textTF.x = 10;
		textTF.y = 20;
		this.addChild(textTF);

		let textTF2:BaseTextField = new BaseTextField();
		textTF2.text = App.StringUtil.firstCharToLower(str2);
		textTF2.x = 10;
		textTF2.y = 120;
		this.addChild(textTF2);
	}
	public dispose():void
	{
		super.dispose();
	}
}