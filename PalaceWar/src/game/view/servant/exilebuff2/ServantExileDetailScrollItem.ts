class ServantExileDetailScrollItem extends ScrollListItem
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

        if (cfg.atkAdd1>0 && cfg.atkAdd2>0)
        {
            bgBg.height+=30;
        }
		
		let str1 = LanguageManager.getlocal("exileBuff_buffdetail_desc",[String(index+1),String(cfg.needAbility),String(cfg.servantNum)]);

        if (info.sc >= cfg.servantNum)
        {
            str1+= " "+LanguageManager.getlocal("qingyuantaskprocess3",[String(info.sc),String(cfg.servantNum)]);
        }
        else
        {
            str1+=" "+ LanguageManager.getlocal("qingyuantaskprocess1",[String(info.sc),String(cfg.servantNum)]);
        }
        let text1 = ComponentManager.getTextField(str1,22,TextFieldConst.COLOR_BROWN);
		text1.setPosition(40,35);
		this.addChild(text1);

        let text3 = null;
        if (cfg.atkAdd1>0)
        {
            let v = Math.floor(cfg.atkAdd1*10+0.5)/10;
            let str2 = LanguageManager.getlocal("exileBuff_itembuff1",[String(v)]);
            let text2 = ComponentManager.getTextField(str2,22,TextFieldConst.COLOR_WARN_GREEN2);
            text2.setPosition(text1.x,text1.y+text1.height+20);
            this.addChild(text2);
            text3 = text2;
        }
        if (cfg.atkAdd2>0)
        {
            let v = Math.floor(cfg.atkAdd2*1000+0.5)/10;
            let str2 = LanguageManager.getlocal("exileBuff_itembuff2",[String(v)]);

            let text2 = ComponentManager.getTextField(str2,22,TextFieldConst.COLOR_WARN_GREEN2);
            text2.setPosition(text1.x, text3 ? text3.y+30 : text1.y+text1.height+20);
            this.addChild(text2);
        }
      
        

        if (index+1 == info.lv)
        {
             let iconCloud:BaseBitmap = BaseBitmap.create("threekingdomstaskflag");
            iconCloud.x = bgBg.width-iconCloud.width;
            this.addChild(iconCloud);
        }

    }
}