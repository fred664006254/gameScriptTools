class SixSection1BattleAddDetailScrollItem extends ScrollListItem
{
    public constructor() 
	{
		super();
	}

	public initItem(index:number,cfg:any,info:any):void
    {
        //"threekingdomstaskflag","public_popupscrollitembg",

        let bgBg:BaseBitmap = BaseBitmap.create("public_popupscrollitembg");
		this.addChild(bgBg);
		
		let str1 = LanguageManager.getlocal("sixSection1BattleDetail_buffdetail_desc",[String(index+1),String(cfg.needAbility),String(cfg.servantNum)]);

        if (info.sc >= cfg.servantNum)
        {
            str1+= " "+LanguageManager.getlocal("sixSection1BattleDetailServantInfo1",[String(info.sc),String(cfg.servantNum)]);
        }
        else
        {
            str1+=" "+ LanguageManager.getlocal("sixSection1BattleDetailServantInfo2",[String(info.sc),String(cfg.servantNum)]);
        }
        let str2 = ""
        if (cfg.addAtk>0)
        {
            let v = Math.floor(cfg.addAtk*1000+0.5)/10;
            str2 = LanguageManager.getlocal("sixSection1BattleDetail_itembuff1",[String(v)]);
        }
        else
        {
            let v = Math.floor(cfg.addCrit*1000+0.5)/10;
            str2 = LanguageManager.getlocal("sixSection1BattleDetail_itembuff2",[String(v)]);
        }
        let text1 = ComponentManager.getTextField(str1,22,TextFieldConst.COLOR_BROWN);
		text1.setPosition(40,35);
		this.addChild(text1);

         let text2 = ComponentManager.getTextField(str2,22,TextFieldConst.COLOR_WARN_GREEN2);
		text2.setPosition(text1.x,text1.y+text1.height+20);
        this.addChild(text2);
        
        if (index + 1 > info.lv){
            text2.setColor(TextFieldConst.COLOR_BROWN3);
        }

        if (index+1 == info.lv)
        {
            let iconCloud:BaseBitmap = BaseBitmap.create("threekingdomstaskflag");
            iconCloud.x = bgBg.width-iconCloud.width;
            this.addChild(iconCloud);
        }

    }
}