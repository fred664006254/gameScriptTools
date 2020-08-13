
class WelfareViewGoldblessScrollItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		let temW:number = 491;
		let temH:number = 115;
		  

		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bg.width = 434//temW - 40;
		bg.height = 123;
		bg.x = temW/2 - bg.width/2;
		bg.y =5;
		this.addChild(bg);

		let word:BaseBitmap = BaseBitmap.create("godbless_"+data.name);
		word.setScale(0.7)
		word.setPosition(temW/2-word.width/2*word.scaleX,bg.y+10);
		this.addChild(word);
		
		let num:number = Api.vipVoApi.getDailyLuckNum();
		let fntSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
		if(PlatformManager.checkIsViSp()){
			fntSize = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
		}
		let timesText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("godBlessTimes",[num.toString()]),fntSize,TextFieldConst.COLOR_BROWN);
		timesText.setPosition(35,55);
		this.addChild(timesText);

		let times:number = data.times;
		let rate:number = data.rate * 100;
		let descText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("godBlessEffect")+LanguageManager.getlocal("godbless_"+data.name,[rate.toString(),times.toString()]),fntSize,TextFieldConst.COLOR_BROWN);
		descText.setPosition(timesText.x,timesText.y+29);
		descText.size =19;
		this.addChild(descText);
	}

	public dispose():void
	{
		super.dispose();
	}
}