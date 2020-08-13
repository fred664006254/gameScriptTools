/**
 * 皮肤
 * author yanyuling
 * @class AcOneYearoackSkinScrollItem
 */
class AcOneYearoackSkinScrollItem  extends ScrollListItem
{
    private _uiData:any = undefined;
    private _nodeContainer:BaseDisplayObjectContainer = undefined;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        this._uiData = data;
        let serSkincfg = undefined;
        let wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._uiData);

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild( this._nodeContainer);
        let bg = BaseBitmap.create("skin_boxbg");
        // bg.anchorOffsetX = bg.width/2;
        bg.x = 1;
		this._nodeContainer.addChild(bg);

        let rect = new egret.Rectangle(0,0,640,480);
        let tarScale = 0.61;
        let tarY = bg.y;
        let skinImgPath = "";
        let skinNameStr = "";
        let skinNameStr2 = "";
        let ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr2");
        let isOwn = true;

        let uiType = data["uiType"];
        uiType = uiType ? uiType : 0;
        tarY = bg.y + 15;

        bg.texture = ResourceManager.getRes("skin_boxbg2");
        let info = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeSkincfg.wifeId);
        
        skinImgPath = wifeSkincfg.body;
        skinNameStr = skinNameStr = wifeSkincfg.name  + " " + LanguageManager.getlocal("wifeName_"+wifeSkincfg.wifeId);
        tarScale = 0.45;
        rect.width = 640;
        rect.height = 655;
        tarY = bg.y + 15;
       
        let skinImg = BaseLoadBitmap.create(skinImgPath);
        skinImg.mask = rect;
        skinImg.setScale(tarScale);
		skinImg.x = bg.x + bg.width/2 - rect.width * tarScale /2;
		skinImg.y = tarY ;
		this._nodeContainer.addChild(skinImg);

        let skinNameTxt = ComponentManager.getTextField(skinNameStr,20,TextFieldConst.COLOR_LIGHT_YELLOW);
        skinNameTxt.x =  bg.x + bg.width/2 - skinNameTxt.width/2;
        skinNameTxt.y =  bg.y + bg.height - 55; 
        this._nodeContainer.addChild(skinNameTxt);

        if(info && info.skin && info.skin[this._uiData]){
            let lv = info.getLvBySkinId(this._uiData) 
            let lvtxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
            lvtxt.text = LanguageManager.getlocal("atkraceChallengeleve",[""+lv])
            lvtxt.x = bg.x + bg.width/2 - lvtxt.width/2;
            lvtxt.y = skinNameTxt.y + 25;
            this._nodeContainer.addChild(lvtxt);
        }else{
            skinNameTxt.y = bg.y + bg.height - 40;
            isOwn = false;
        }
        
        if(!isOwn){
            let flag = BaseBitmap.create("oneyearpack_flag1");
            flag.x = bg.x + 3;
            flag.y = bg.y + 3 ;
            this._nodeContainer.addChild(flag);
        }
        this.addTouch(this.touchHandler,this,null,true)
        this._nodeContainer.anchorOffsetX = this._nodeContainer.width/2;
        this._nodeContainer.anchorOffsetY = this._nodeContainer.height/2;
        this._nodeContainer.x = this._nodeContainer.width/2;
        this._nodeContainer.y = this._nodeContainer.height/2;
    }

    protected touchHandler(event:egret.TouchEvent)
    {
         let scalV = 0.97;
        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
                this._nodeContainer.setScale(scalV);
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._nodeContainer.setScale(1.0);
                break;
			case egret.TouchEvent.TOUCH_END:
                this._nodeContainer.setScale(1.0);
                let wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._uiData);
                ViewController.getInstance().openView(ViewConst.COMMON.ACONEYEARPACKSKINDETAILVIEW,{wifeskinid:this._uiData});
				break;
        }
    }
    public getSpaceX():number
	{
		return 3;
	}
	public getSpaceY():number
	{
		return 5;
	}
    public dispose():void
    {
        this._nodeContainer = null;
        this._uiData = null;

        super.dispose();
    }
}