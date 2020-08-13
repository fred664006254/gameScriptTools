/**
 * 皮肤
 * author yanyuling
 * date 2018/08/13
 * @class SkinScrollItem
 */
class SkinScrollItem  extends ScrollListItem
{
    private _uiData:any = undefined;
    public _isGray:boolean = false;
    private _nodeContainer:BaseDisplayObjectContainer = undefined;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        this._uiData = data;
        let serSkincfg = undefined;
        let wifeSkincfg = undefined;

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
        let isGray = true;

        let uiType = data["uiType"];
        uiType = uiType ? uiType : 0;
        tarY = bg.y + 15;
        if(data.wifeId ){ //红颜皮肤
            bg.texture = ResourceManager.getRes("skin_boxbg2");
            wifeSkincfg = data;
            if(uiType == 2){
                if( Api.wifeSkinVoApi.isOwnSkinOfSkinId(wifeSkincfg.id) ){
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn1");
                    isGray = false;
                }else{
                    isGray = true;
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn2");
                }
            }else{
                let info = Api.skinVoApi.getWifeSkinFirstInfo(wifeSkincfg.id);
                if(info){
                    isGray = false;
                    if(info.qu){
                         ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr3",[info.name,info.qu,info.zid]);
                    }else{
                         ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr",[info.name,info.zid]);
                    }
                }
            }
            skinImgPath = wifeSkincfg.body;
            skinNameStr = skinNameStr = wifeSkincfg.name  + " " + LanguageManager.getlocal("wifeName_"+wifeSkincfg.wifeId);
            tarScale = 0.45;
            rect.width = 640;
            rect.height = 655;
            tarY = bg.y + 15;
        }else if(data.servantId ){ //门客皮肤
            serSkincfg = data;
            if(uiType == 1){
                let sLv = Api.servantVoApi.getServantSkinLV(data.id);
                if(sLv){
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn1");
                    isGray = false;
                }else{
                    ownerNameStr = LanguageManager.getlocal("skin_notOwnTip");
                    isGray = true;
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn2");
                }
            }else{
                let info = Api.skinVoApi.getServantSkinFirstInfo(serSkincfg.id);
                if(info){
                    isGray = false;
                    if(info.qu){
                         ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr3",[info.name,info.qu,info.zid]);
                    }else{
                         ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr",[info.name,info.zid]);
                    }
                }
            }
            let serCfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
            skinImgPath = serSkincfg.body;
            skinNameStr = skinNameStr = serSkincfg.getSkinName() + " " + serCfg.name;
            tarY = bg.y + 15;
        }

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

        let ownerNameTxt = ComponentManager.getTextField(ownerNameStr,20,0x999999);
        ownerNameTxt.x = bg.x + bg.width/2 - ownerNameTxt.width/2;
        ownerNameTxt.y = skinNameTxt.y + 25;
        this._nodeContainer.addChild(ownerNameTxt);

        this._isGray = isGray;
        
        if(this._isGray){
            App.DisplayUtil.changeToGray(this);
            if(!data["myown"]  ){
                this.addTouch(this.touchHandler,this,null,true);
            }
        }else{
            App.DisplayUtil.changeToNormal(this);
            this.addTouch(this.touchHandler,this,null,true);
        }

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
                ViewController.getInstance().openView(ViewConst.COMMON.SKINDETAILVIEW,this._uiData);
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
        this._isGray = false;

        super.dispose();
    }
}