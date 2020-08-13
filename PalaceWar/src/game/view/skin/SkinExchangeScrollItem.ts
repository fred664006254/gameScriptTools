/**
 * 碎片兑换
 * author qianjun
 * date 2018/08/13
 * @class SkinScrollItem
 */
class SkinExchangeScrollItem  extends ScrollListItem
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
        this.height = 393;
        let serSkincfg = undefined;
        let wifeSkincfg = undefined;

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild( this._nodeContainer);
        let bg = BaseBitmap.create("skin_boxbg");
        // bg.anchorOffsetX = bg.width/2;
        bg.x = 1;
		this._nodeContainer.addChild(bg);

        let rect = new egret.Rectangle(0,0,405,440);
        let tarScale = 0.61;
        let tarY = bg.y;
        let skinImgPath = "";
        let skinNameStr = "";
        let ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr2");
        let isGray = true;

        let uiType = data["uiType"];
        uiType = uiType ? uiType : 0;

        if(data.wifeId){ //红颜皮肤
            bg.texture = ResourceManager.getRes("skin_boxbg2");
            wifeSkincfg = data;
            if(uiType == 2){
                if(Api.wifeSkinVoApi.isOwnSkinOfSkinId(wifeSkincfg.id) ){
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn1");
                    isGray = false;
                }else{
                    isGray = true;
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn2");
                }
            }
            skinImgPath = wifeSkincfg.body;
            skinNameStr = wifeSkincfg.name  + " " + LanguageManager.getlocal("wifeName_"+wifeSkincfg.wifeId);
            tarScale = 0.45;
            tarY = bg.y + 15;
            rect.width = 640;
            rect.height = 550;
        }else if(data.servantId ){ //门客皮肤
            serSkincfg = data;
            if(uiType == 1){
                // let sLv = Api.servantVoApi.getServantSkinLV(data.id);
                // if(sLv){
                if(!serSkincfg.canExchangeItem()){
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn1");
                    isGray = false;
                }else{
                    ownerNameStr = LanguageManager.getlocal("skin_notOwnTip");
                    isGray = true;
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn2");
                }
            }
            let serCfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
            skinImgPath = serSkincfg.body;
            skinNameStr = serSkincfg.getSkinName() + " " + serCfg.name;
        }

        let skinImg = BaseLoadBitmap.create(skinImgPath);
        skinImg.mask = rect;
        skinImg.setScale(tarScale);
		skinImg.x = bg.x + bg.width/2 - rect.width * tarScale /2;
		skinImg.y = tarY ;
		this._nodeContainer.addChild(skinImg);

        let namebg = BaseBitmap.create("skin_bottombg");
        namebg.x = bg.x + bg.width/2 - namebg.width/2;
        namebg.y = bg.y + bg.height - namebg.height-18;
		this._nodeContainer.addChild(namebg);

        let skinNameTxt = ComponentManager.getTextField(skinNameStr,20,TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.x = namebg.x + namebg.width/2 - skinNameTxt.width/2;
        skinNameTxt.y = namebg.y + 7;
        this._nodeContainer.addChild(skinNameTxt);

        let cfg : any = null;
        let exchange = '';
        if(data.servantId){
            exchange = data.exchangeItem;
        }
        else{
            exchange = data.claim;
        }
        let itemvo = GameData.formatRewardItem(exchange);
        let needNum = itemvo[0].num;
        let have = Api.itemVoApi.getItemNumInfoVoById(itemvo[0].id);
        if(!isGray){
            //已有
            let ownerNameTxt = ComponentManager.getTextField(ownerNameStr,20,TextFieldConst.COLOR_QUALITY_GRAY);
            ownerNameTxt.x = namebg.x + namebg.width/2 - ownerNameTxt.width/2;
            ownerNameTxt.y = skinNameTxt.y + 25;
            this._nodeContainer.addChild(ownerNameTxt);
        }
        else{
            //
            let icon = BaseLoadBitmap.create(itemvo[0].icon);
            icon.setScale(0.25);
            this._nodeContainer.addChild(icon);
            let text = ComponentManager.getTextField(`${have}/${needNum}`, 20, have < needNum ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_WARN_GREEN);
            let tmpX = (skinNameTxt.textWidth - text.textWidth - 5 - 25) / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, skinNameTxt, [tmpX, skinNameTxt.textHeight+2]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, text, skinNameTxt, [tmpX + 25 + 5, skinNameTxt.textHeight + 5]);
            this._nodeContainer.addChild(text);
        }

        this._isGray = isGray;
        this._nodeContainer.addTouch(this.touchHandler,this,null,true);
        let bottomBg = BaseBitmap.create(`skin_exchange${data.servantId ? 1 : 2}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, this, [0,0], true);
        this._nodeContainer.addChild(bottomBg);


        let flag = false;
        if(data.servantId){
            flag = Api.servantVoApi.getServantObj(data.servantId) ? true : false;
        }
        else{
            flag = Api.wifeVoApi.getWifeInfoVoById(data.wifeId) ? true : false;
        }

        if(!flag){
            let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`skin_tip${data.servantId ? 1 : 2}`), 20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomBg, [0,-10]);
            this._nodeContainer.addChild(tipTxt);
        }
        else{
            let makeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `skinViewMake`, ()=>{
                //制作消息
                let exchange = '';
                if(data.servantId){
                    exchange = data.exchangeItem;
                }
                else{
                    exchange = data.claim;
                }
                let itemvo = GameData.formatRewardItem(exchange);
                let needNum = itemvo[0].num;
                let have = Api.itemVoApi.getItemNumInfoVoById(itemvo[0].id);
                if(!this._isGray){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`skin_myOwn1`));
                    return;
                }
                if(needNum > have){
                    let str = '';
                    if(data.servantId){
                        str = `skin_tip4`;
                    }
                    else if (itemvo[0].id == 1562)
                    {
                        str = `skin_tip6`;
                    }
                    else{
                        str = `skin_tip5`;
                    }
                    App.CommonUtil.showTip(LanguageManager.getlocal(str));
                    return;
                }
                let itemid = itemvo[0].id;
                let itemUseCount = itemvo[0].num;
                let itemCount = Api.itemVoApi.getItemNumInfoVoById(itemid);
                let itemCfg = Config.ItemCfg.getItemCfgById(itemid);
                let message: string = LanguageManager.getlocal("skinViewMakeTip", [itemCfg.name + "x" +itemUseCount, skinNameStr]);
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {	
                    confirmCallback:()=>{
                        //消息
                        NetManager.request(NetRequestConst.REQUEST_SKIN_MAKE, {
                            skinId : data.id,
                            skinType : data.servantId ? 2 : 1
                        });
                        // ViewController.getInstance().openView(ViewConst.POPUP.SKINGETVIEW, {
                        //     rewards : data,
                        // })
                    }, 
                    handler: this, 
                    icon: itemCfg.icon,
                    iconBg:itemCfg.iconBg, 
                    num: itemCount, 
                    useNum:itemUseCount,
                    msg: message, 
                    id : itemid
                });
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, makeBtn, bottomBg, [0,-4]);
            this.addChild(makeBtn);
            if(!this._isGray){
                App.DisplayUtil.changeToGray(makeBtn);
                makeBtn.visible = false;
            }
            else{
                if(needNum > have){
                    App.DisplayUtil.changeToGray(makeBtn);
                }
                else{
                    App.DisplayUtil.changeToNormal(makeBtn);
                    App.CommonUtil.addIconToBDOC(makeBtn);
                }
            }
        }
        this._nodeContainer.anchorOffsetX = this._nodeContainer.width/2;
        this._nodeContainer.anchorOffsetY = this._nodeContainer.height/2;
        this._nodeContainer.x = this._nodeContainer.width/2;
        this._nodeContainer.y = this._nodeContainer.height/2;
        //

        if(Api.rookieVoApi.curGuideKey == "skin" && data.id == "2211"){//
			let light = BaseBitmap.create("public_9_bg63")
			light.width = this.width;
			light.height = this.height;
			light.setPosition(0,0);
			this.addChild(light);
			egret.Tween.get(light,{loop:true}).to({alpha:0},500).to({alpha:1},500);
		}
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
        this._nodeContainer.removeTouchTap()
        this._nodeContainer = null;
        this._uiData = null;
        this._isGray = false;
        super.dispose();
    }
}