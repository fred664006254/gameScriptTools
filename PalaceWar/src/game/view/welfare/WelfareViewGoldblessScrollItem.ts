
class WelfareViewGoldblessScrollItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		let temW:number = 491;
		let temH:number = 115;
		let line1:BaseBitmap = BaseBitmap.create("public_line3");
		line1.width = temW - 50;
		line1.x = temW/2 - line1.width/2;
		line1.y =  14;
		this.addChild(line1);

		let bg:BaseBitmap = BaseBitmap.create("public_9_managebg");
		bg.width = temW - 40;
		bg.height = 75;
		bg.x = temW/2 - bg.width/2;
		bg.y =  line1.y + 27;
		this.addChild(bg);

		let res = "godbless_"+data.name;
		if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`${res}_blueType`)){
			res = `${res}_blueType`;
		}
		let word:BaseBitmap = BaseBitmap.create(res);
		word.setScale(0.7)
		word.setPosition(temW/2-word.width/2*word.scaleX,2);
		this.addChild(word);
		
		let num:number = Api.vipVoApi.getDailyLuckNum();

		let timesText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("godBlessTimes",[num.toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		timesText.setPosition(30,55);
		this.addChild(timesText);

		let times:number = data.times;
		let rate:number = data.rate * 100;
		let descText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("godBlessEffect")+LanguageManager.getlocal("godbless_"+data.name,[rate.toString(),times.toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		descText.setPosition(timesText.x,timesText.y+29);
		this.addChild(descText);
	}

	public dispose():void
	{
		super.dispose();
	}
}