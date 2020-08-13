class SettingHelpPopupView  extends PopupView
{

    public constructor() {
		super();
	}

    protected get uiType():string
	{
		return "2";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "wife_homechoose_btn"
		]);
	}

    protected getTitleStr():string
	{
		return "settingHelpTitle";
	}

    public initView():void
    {   
        let text1:string;
        let text2:string;
        let url1:string;
        let url2:string;

        if (PlatformManager.checkIsRuSp())
        {
            text1 = "settingHelpOpenFB";
            text2 = "settingHelpOpenVK";
            url1 = "https://www.facebook.com/com.heyyogame.gdru/";
            url2 = "https://vk.com/emperorandbeauties";
        }
        else
        {
            text1 = "settingHelpOpenFanGroup";
            text2 = "settingHelpOpenOfficialPage";
            url1 = "https://www.facebook.com/groups/1943936972334565/";
            url2 = "https://www.facebook.com/pg/com.heyyogame.gden/posts/?ref=page_internal";
        }

        let btn1 = ComponentManager.getButton("wife_homechoose_btn",text1,()=>{
            PlatformManager.loadUrl( url1,null);
            // PlatformManager.loadUrl("https://page.heyyogame.com/gd/event/20191108/");
         },this,null,1);
        btn1.setPosition(this.viewBg.width/2 - btn1.width/2,51);
        btn1.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(btn1);

        let btn2 = ComponentManager.getButton("wife_homechoose_btn",text2,()=>{
            PlatformManager.loadUrl(url2,null);
        },this,null,1);
        btn2.setPosition(btn1.x,btn1.y+85);
        btn2.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(btn2);
    }

    protected getBgExtraHeight():number
	{
		return 90;
	}
}