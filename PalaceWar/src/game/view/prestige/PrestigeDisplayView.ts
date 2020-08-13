/**
 * 人望总览
 * 20180518
 * yanyuling
 */
class PrestigeDisplayView extends BaseView 
{
	public constructor() 
	{
		super();
	} 

    protected initView():void
	{
        let maskBg:BaseBitmap = BaseBitmap.create("public_rule_bg");
		// maskBg.x = GameConfig.stageWidth/2 - maskBg.width/2;
        maskBg.y =  GameConfig.stageHeigth/2 - maskBg.height/2;
		this.addChildToContainer(maskBg);

		let maskBg2:BaseBitmap = BaseBitmap.create("public_rule_bg");
		maskBg.x = GameConfig.stageWidth;
		maskBg.scaleX = -1;
        maskBg2.y =  maskBg.y;
		this.addChildToContainer(maskBg2);

		let wordSp = BaseBitmap.create("prestige_word3");
		wordSp.x = GameConfig.stageWidth/2  - wordSp.width/2;
		wordSp.y = maskBg.y+5;
		this.addChildToContainer(wordSp);
		
		let line = BaseBitmap.create("public_line3");
		if(!PlatformManager.checkIsEnLang())
		{
			line.width = 360;
		}
		line.x = GameConfig.stageWidth/2  - line.width/2;
		line.y = maskBg.y + 70;
		this.addChildToContainer(line);

		let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("prestige_pemDisTxt1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
        titleTxt.x = GameConfig.stageWidth/2  - titleTxt.width/2;
		titleTxt.y = line.y + line.height/2  - titleTxt.height/2;
		this.addChildToContainer(titleTxt);

		
		let pemTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        pemTxt1.text = LanguageManager.getlocal("prestige_pemDisTxt2",[""+Api.prestigeVoApi.getPValue()]);
		pemTxt1.x = GameConfig.stageWidth/2  -150;
		pemTxt1.y = line.y + 30;
		this.addChildToContainer(pemTxt1);

		let pemV = "" + Api.prestigeVoApi.getPem();
		let pemTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        pemTxt2.text = LanguageManager.getlocal("prestige_pemTxt",[pemV ]);
		pemTxt2.x = pemTxt1.x; 
		pemTxt2.y = pemTxt1.y + 30;
		this.addChildToContainer(pemTxt2);

        let line1 = BaseBitmap.create("public_line3");
		if(!PlatformManager.checkIsEnLang())
		{
			line1.width = 360;
		}
		line1.x =line.x;
		line1.y = line.y + 115;
		this.addChildToContainer(line1);

        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("prestige_pemDisTxt3"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
        titleTxt1.x = line1.x + line1.width/2  - titleTxt1.width/2;
		titleTxt1.y = line1.y + line1.height/2  - titleTxt1.height/2;
		this.addChildToContainer(titleTxt1);

		if(PlatformManager.checkIsEnLang())
		{
			line1.width += titleTxt1.width + 10;
			line.width += titleTxt.width + 10;
			line1.x = titleTxt1.x + titleTxt1.width/2  - line1.width/2;
			line.x = titleTxt.x + titleTxt.width/2  - line.width/2;
		}
        let ainfo = Api.prestigeVoApi.getAinfo();
        let attrAddTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        attrAddTxt1.text = LanguageManager.getlocal("servantInfo_speciality1") + "+" + ainfo[0];
        attrAddTxt1.x = GameConfig.stageWidth/2  -150;
		attrAddTxt1.y = line1.y + 35;
		this.addChildToContainer(attrAddTxt1);

        let attrAddTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        attrAddTxt2.text = LanguageManager.getlocal("servantInfo_speciality2") + "+" +  ainfo[1];
        attrAddTxt2.x = GameConfig.stageWidth/2   + 60;
		attrAddTxt2.y = attrAddTxt1.y 
		this.addChildToContainer(attrAddTxt2);

        let attrAddTxt3 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        attrAddTxt3.text = LanguageManager.getlocal("servantInfo_speciality3") + "+" +  ainfo[2];
        attrAddTxt3.x = attrAddTxt1.x;
		attrAddTxt3.y = attrAddTxt1.y + 30;
		this.addChildToContainer(attrAddTxt3);

        let attrAddTxt4 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        attrAddTxt4.text = LanguageManager.getlocal("servantInfo_speciality4") +  "+" + ainfo[3];
        attrAddTxt4.x = attrAddTxt2.x;
		attrAddTxt4.y = attrAddTxt3.y ;
		this.addChildToContainer(attrAddTxt4);

        this.addTouchTap(this.hide,this);
	}

    protected getResourceList():string[]
	{
		return ["prestige_displaybg","prestige_word3"];
	}
	protected getTitleStr():string
	{
		return "";
	}
    public dispose():void
	{
		super.dispose();
	}

}
