/**
 对战信息logitem
 * author shaoliang
 */
class AllianceWarHistoryScrollItem extends ScrollListItem
{

    public constructor() 
	{
		super();
	}

    protected initItem(index:number,data:any) 
    {	
        let view = this;

        let bg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bg.width = 520;
		bg.height = 120;
		this.addChild(bg);

        let timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data.lastday,2), 20,TextFieldConst.COLOR_WARN_GREEN2);
		timeTxt.setPosition(15,15);
		view.addChild(timeTxt);	

        let winStr:string = data.win>0 ? LanguageManager.getlocal("allianceWarHistoryWin") : LanguageManager.getlocal("allianceWarHistoryFail");
        let typeStr;
        if (data.tinfo && data.tinfo.name)
        {
            typeStr = LanguageManager.getlocal("allianceWarHistory",[data.name,winStr,data.tinfo.name,String(data.addExp)]);
        }
        else
        {
            typeStr = LanguageManager.getlocal("allianceWarHistoryDraw",[String(data.addExp)]);
        }
        let descTxt:BaseTextField = ComponentManager.getTextField(typeStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		descTxt.x = 15;
		descTxt.y = 50;
		descTxt.width = 500-4;
		descTxt.lineSpacing = 5;
		this.addChild(descTxt);

        let btn:BaseButton = ComponentManager.getButton("dinner_detail","",()=>{
            ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEWARSHOWANTIVIEW,{
				history : data,
                ishistory : true
			});
        },this);
        btn.setPosition(bg.width- btn.width -16, bg.height/2 - btn.height/2);
        this.addChild(btn);
    }
}