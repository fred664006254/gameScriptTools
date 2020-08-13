/**
 * 用于赵氏姐妹选择一人当家
 * author shaoliang
 * date 2020/1/10
 * @class WifeDangjiaChoosePopupView
 */

class WifeDangjiaChoosePopupView  extends PopupView
{
    public constructor() 
	{
		super();
	}

    protected get uiType():string
	{
		return "2";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "public_textbrownbg","wife_homechoose_btn"
		]);
	}

    protected getTitleStr():string
	{
		return "dangjia";
	}

    public initView():void
    {
        let topBg = BaseBitmap.create("public_textbrownbg");
        topBg.x =  this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
        topBg.y = 12;
        this.addChildToContainer(topBg);

        let toptext = ComponentManager.getTextField(LanguageManager.getlocal("chooseDangjia"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,toptext,topBg);
        this.addChildToContainer(toptext);

        let btn1 = ComponentManager.getButton("wife_homechoose_btn","wifeName_236_1",this.dangjiaHandle,this,["236_1"],1);
        btn1.setPosition(this.viewBg.width/2 - btn1.width/2,topBg.y+85);
        btn1.setTextSize(20);
        btn1.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(btn1);

        let btn2 = ComponentManager.getButton("wife_homechoose_btn","wifeName_236_2",this.dangjiaHandle,this,["236_2"],1);
        btn2.setPosition(btn1.x,btn1.y+85);
        btn2.setTextSize(20);
        btn2.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(btn2);

        let str = Api.otherInfoVoApi.getDangjiaNpc();
        let strArray:string[] = str.split("_");
        if (strArray[0] == "236")
        {   
            let dangjiazhong = BaseBitmap.create("wifeinihomebtn");
            dangjiazhong.setPosition(200,-20);

            if (strArray[1] == "1")
            {
                btn1.addChild(dangjiazhong);
            }
            else
            {
                btn2.addChild(dangjiazhong);
            }
        }

    }

    private dangjiaHandle(key:string):void
    {
        NetManager.request(NetRequestConst.OTHERINFO_SETDANGJIA, {
            dangjia : key
        });
        this.hide();
    }

}