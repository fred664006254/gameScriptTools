class AcCrossPowerDbSub2ScrollItem extends ScrollListItem {
    private _aid:string = null;
    private _code:string = null;
    private _data:Config.AcCfg.AskGodShopItem=null;

    public constructor() {
        super();
    }

	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return this._aid;
    }
    
    protected initItem(index: number, data: any, itemParam: any) {
        this._aid = itemParam.aid;
        this._code = itemParam.code;

        //item bg
        let bg = BaseBitmap.create("public_9_bg100");
        bg.height = 69;
        bg.width = 510;
        this.addChild(bg);
 
        this.width = bg.width;
        this.height = bg.height;

        let servantCfg = Config.ServantCfg.getServantItemById(data.sid);
        if(servantCfg)
        {
            let nameTxt = ComponentManager.getTextField(servantCfg.name, 18, TextFieldConst.COLOR_BROWN);
            nameTxt.x = 20;
            nameTxt.y = bg.height/2 - nameTxt.height/2;
            this.addChild(nameTxt);

            let servant = Api.servantVoApi.getServantObj(servantCfg.id);
            if(servant)
            {
                let numStr = ""+servant.total;
                if(servant.total >= 100000000)
                {
                    numStr = App.StringUtil.changeIntToText(servant.total,4);
                }else if(servant.total >= 100000)
                {
                    numStr = App.StringUtil.changeIntToText2(servant.total);
                }
                let attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerDbItemAttrTxt",[numStr]), 18, TextFieldConst.COLOR_BROWN);
                attrTxt.x = 120;
                attrTxt.y = nameTxt.y;
                this.addChild(attrTxt);

                numStr = ""+data.score;
                if(data.score >= 100000000)
                {
                    numStr = App.StringUtil.changeIntToText(data.score,4);
                }else if(data.score >= 100000)
                {
                    numStr = App.StringUtil.changeIntToText2(data.score);
                }
                let addAttrTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerDbItemAddAttrTxt",[numStr]), 18, TextFieldConst.COLOR_BROWN);
                addAttrTxt.x = 250;
                addAttrTxt.y = nameTxt.y;
                this.addChild(addAttrTxt);                             
            }

            let goBtn:BaseButton = ComponentManager.getButton("crosspower_dbgobtn",null,()=>
            {
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, data.sid);
            },this,null,0);
            goBtn.setPosition(bg.width-goBtn.width-25,bg.height/2-goBtn.height/2);
            this.addChild(goBtn);
        }
    }

    private showDetail():void
    {
        
    }

    public getSpaceX(): number {
        return 0;
    }
	/**
	 * 不同格子Y间距
	 */
    public getSpaceY(): number {
        return 5;
    }
    
    public dispose(): void {
        this._aid = null;
        this._code = null;
        super.dispose();
    }
}