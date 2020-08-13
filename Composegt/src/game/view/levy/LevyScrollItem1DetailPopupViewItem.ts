
class LevyScrollItem1DetailPopupViewItem  extends ScrollListItem
{
    private _data = null;
	public constructor() 
	{
		super();
	}


    protected initItem(index:number,data:any,item:any)
    {
        this._data = data;
        let rectScale = 0.75;
        let rect = new egret.Rectangle(0,0,ComposeStatus.renSize.width*rectScale,ComposeStatus.renSize.height*rectScale) ;

        this.width = 520;
        this.height = rect.height+10;

        let tarColor = TextFieldConst.COLOR_BROWN_NEW;
        let pos = data.pos[0];


        let personImg = BaseLoadBitmap.create(Config.MapinfoCfg.getPersonRes(data.level),rect);

        personImg.setPosition(pos.x - 40,-5);
        personImg.setScale(0.7);
        this.addChild(personImg);

        let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        // rankTxt.text = LanguageManager.getlocal("levy_scrollitem1detailtxt1",[Config.PersoninfoCfg.getPersonLocalNameByLv(data.level), Config.PersoninfoCfg.getPersonLocalLvByLv(data.level)]);
        rankTxt.text = Config.PersoninfoCfg.getPersonLocalNameByLv(data.level);
        rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 + 15;
        rankTxt.y = this.height/2 - rankTxt.height/2;
        this.addChild(rankTxt);
    
        pos = data.pos[1];
        let foodTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        let foodStr = this.getAddNum("gold");
        foodTxt.text = foodStr;
        foodTxt.x = pos.x + (pos.width - foodTxt.width) / 2 - 25;
        foodTxt.y = this.height/2 - foodTxt.height/2;;
        this.addChild(foodTxt);
        
        pos = data.pos[2];
        let numTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        numTxt.text =  data.num;
        numTxt.x = pos.x + (pos.width - numTxt.width) / 2 - 25;
        numTxt.y =  foodTxt.y;
        this.addChild(numTxt);  
        


        let line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 8;
        line.y  = this.height - line.height;
    }

    private getAddNum(type:"gold"|"food"|"soldier"):string{
        let level = this._data.level;
        let num = this._data.num;
        let personInfo = Config.PersoninfoCfg.getPersonCfgByLv(level);
        let interval = Config.LevyCfg.LevyItemList[0].interval;
        let AddNum = (personInfo[type] || 0);
        return String(AddNum)
        //return LanguageManager.getlocal("levy_scrollitem1detailtxt2",[AddNum.toString(),interval]) ;
    }
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 0;
	}
    public dispose():void
    {
        this._data = null;
        super.dispose();
    }
}
