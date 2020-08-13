class AcSingleDay2019SkinItem  extends ScrollListItem
{
    private _uiData:Config.AcCfg.SingleDayNewShop1Item = undefined;
    private _isGray:boolean = false;
    private _nodeContainer:BaseDisplayObjectContainer = undefined;
    private _isOwn:boolean = false;
    private _rewardVo:RewardItemVo = undefined;
    private _ownerTxt2:BaseTextField = undefined;
    private _ownerTxt:BaseTextField = undefined;
    private _ownerBg:BaseBitmap = undefined;
    private _code:string = undefined;
    private _buyBtn:BaseButton = undefined;
    private _limitNum:BaseTextField = undefined;
    public constructor()
    {
        super();
    }


    private get cfg() : Config.AcCfg.SingleDay2019Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDay2019Vo{
        return <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_SINGLEDAY2019;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    

    protected initItem(index:number,data:Config.AcCfg.SingleDayNewShop1Item,itemparam)
    {
        this.width = 305;
        this.height = 425;
        this._uiData = data;
        let serSkincfg = undefined;
        let wifeSkincfg = undefined;
        this._code = itemparam;

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild( this._nodeContainer);
        let bg = BaseBitmap.create("acsingleday_skinbg1_1");
        bg.width = 302;
        bg.height = 425;
        // bg.anchorOffsetX = bg.width/2;
        bg.x = (this.width - bg.width)/2;
        bg.name = "bg";
		this._nodeContainer.addChild(bg);

        let rect = new egret.Rectangle(0,0,405,440);
        let tarScale = 0.61;
        let tarY = bg.y;
        let skinImgPath = "";
        let skinNameStr = "";
        let ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr2");
        let isGray = true;

        this._buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.buyBtnHandler,this);
        this._rewardVo = new RewardItemVo();
        this._rewardVo.initData(this._uiData.item);
        this._isOwn = false;
        if(this._rewardVo.type == 16 ){ //红颜皮肤
            bg.texture = ResourceManager.getRes("acsingleday_skinbg2_1");
            wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._rewardVo.id );
            let info = Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._rewardVo.id);
            if(info){
                this._isOwn = true;
                isGray = false;
                // App.DisplayUtil.changeToGray(this._buyBtn);
                // bg.texture = ResourceManager.getRes("acsingleday_skinbg2_1");
            }else{
                this._isOwn = false;
                isGray = true;
                // App.DisplayUtil.changeToNormal(this._buyBtn);
                // bg.texture = ResourceManager.getRes("acsingleday_skinbg2_2");
            }

            skinImgPath = wifeSkincfg.body;
            skinNameStr = LanguageManager.getlocal("wifeName_"+wifeSkincfg.wifeId) + " " + wifeSkincfg.name;  
            tarScale = 0.53;
            rect.width = 640;
            rect.height = 600;
            tarY = bg.y + 32;
            let skinImg = BaseLoadBitmap.create(skinImgPath);
            skinImg.mask = rect;
            skinImg.setScale(tarScale);
            skinImg.x = bg.x + bg.width/2 - rect.width * tarScale /2;
            skinImg.y = tarY ;
            this._nodeContainer.addChild(skinImg);

            let namebg = BaseBitmap.create("acsingleday_skinnamebg");
            namebg.x = bg.x + bg.width/2 - namebg.width/2;
            namebg.y = bg.y + 30-2;
            this._nodeContainer.addChild(namebg);

            let skinNameTxt = ComponentManager.getTextField(skinNameStr,20,TextFieldConst.COLOR_LIGHT_YELLOW);
            skinNameTxt.x = namebg.x + namebg.width/2 - skinNameTxt.width/2;
            skinNameTxt.y = namebg.y + namebg.height * namebg.scaleY/2 - skinNameTxt.height/2;
            this._nodeContainer.addChild(skinNameTxt);
            
        }else if( this._rewardVo.type == 11 ){ //头像框
            bg.texture = ResourceManager.getRes("acsingleday_skinbg1_1");
            let _name = LanguageManager.getlocal("itemName_" + this._rewardVo.id);
			let _icon = "itemicon"+this._rewardVo.id;
			let itemCfg = Config.TitleCfg.getTitleCfgById( this._rewardVo.id );

            let light =  BaseBitmap.create("tailor_get_light");
            light.setScale(0.5);
            light.anchorOffsetX =  light.width/2 ;
            light.anchorOffsetY =  light.height/2;
            light.x = bg.x + bg.width/2;
            light.y = bg.y + bg.height/2-40;
            egret.Tween.get(light,{loop:true}).to({rotation:360},5000);
            this._nodeContainer.addChild(light)

            let deltaS = 1.2;
            let avatarImg = BaseLoadBitmap.create(_icon);
            avatarImg.width = avatarImg.height = 100 * deltaS;
            avatarImg.x = bg.x + bg.width/2 - 50*1.3 + 5;
            avatarImg.y = bg.y + bg.height/2 - 105;
            this._nodeContainer.addChild(avatarImg);

             let namebg = BaseBitmap.create("acsingleday_skinnamebg");
            namebg.x = bg.x + bg.width/2 - namebg.width/2;
            namebg.y = bg.y + 30-2;
            this._nodeContainer.addChild(namebg);

            let itemNameTxt = ComponentManager.getTextField(_name,18,TextFieldConst.COLOR_LIGHT_YELLOW);
            itemNameTxt.x = namebg.x + namebg.width/2 - itemNameTxt.width/2;
            itemNameTxt.y = namebg.y + namebg.height * namebg.scaleY/2 - itemNameTxt.height/2;
            this._nodeContainer.addChild(itemNameTxt);
            if (Api.itemVoApi.getTitleInfoVoById(this._rewardVo.id).num > 0 ){
                this._isOwn = true;
                if( !Api.switchVoApi.checkOpenTitleLv()){
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }else{
                    if(this._uiData.limit > 0 && this.vo.getBuyShopList1(this._uiData.id) >= this._uiData.limit){
                        App.DisplayUtil.changeToGray(this._buyBtn);
                    }else{
                        App.DisplayUtil.changeToNormal(this._buyBtn);
                    }
                }
            }else{
                 this._isOwn = false;
                 App.DisplayUtil.changeToNormal(this._buyBtn);
            }

        }

        let btmask =  BaseBitmap.create("acsingleday_skinnameb2");
        btmask.x = bg.x + bg.width/2 - btmask.width/2;
        btmask.y = bg.y + bg.height - btmask.height - 75;
        this._nodeContainer.addChild(btmask);

        let strKey = "acSineleDaySkin_own";
        if(this._isOwn == false){
            strKey = "acSineleDaySkin_notown";
        }

        if(this._rewardVo.type == 16){
            let _ownerTxt2 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_GREEN);
            let strKey2 = "acSingleDaySkin_getWife2";
            if(Api.wifeVoApi.getWifeInfoVoById(wifeSkincfg.wifeId)){
                strKey2 = "acSingleDaySkin_getWife1";
            }
            _ownerTxt2.text = LanguageManager.getlocal(strKey2) 
            _ownerTxt2.x = bg.x + bg.width/2 - _ownerTxt2.width/2;
            _ownerTxt2.y = bg.y +  bg.height - 97;
            this._nodeContainer.addChild(_ownerTxt2);
            this._ownerTxt2 = _ownerTxt2;
        }else if(this._rewardVo.type == 11){
            let bgres = BaseBitmap.create(`public_9_bg80`);
            this._ownerBg = bgres;
            let _ownerTxt = ComponentManager.getTextField(LanguageManager.getlocal(strKey),20,TextFieldConst.COLOR_WARN_GREEN);
            _ownerTxt.x = bg.x + bg.width/2 - _ownerTxt.width/2;
            _ownerTxt.y = btmask.y + btmask.height/2 - _ownerTxt.height/2;
            
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bgres, _ownerTxt);
            this._nodeContainer.addChild(bgres);
            this._nodeContainer.addChild(_ownerTxt);
            this._ownerTxt = _ownerTxt;

            if(this._uiData.limit > 0){
                let bnum = this.vo.getBuyShopList1(data.id) || 0;
                let limitNum = this._uiData.limit - bnum;
                let limitTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]),18,TextFieldConst.COLOR_LIGHT_YELLOW);
                limitTxt.x =   bg.x + bg.width/2 - limitTxt.width/2;
                limitTxt.y = btmask.y + btmask.height/2 - limitTxt.height/2;
                this._nodeContainer.addChild(limitTxt);
                this._limitNum = limitTxt;
            }
        }



        
        this._buyBtn.setText("" + (this._uiData.price * this._uiData.rebate ) ,false);
        this._buyBtn.addTextIcon("public_icon1",2);

        this._buyBtn.x = bg.x + bg.width/2 - this._buyBtn.width/2;
        this._buyBtn.y = bg.y + bg.height - this._buyBtn.height - 14;
        this._buyBtn.name = "buyBtn";
        this._nodeContainer.addChild(this._buyBtn);
        // if(this._isOwn){
        //    App.DisplayUtil.changeToGray(this._buyBtn);
        // }
        let detailBtn = ComponentManager.getButton("servant_detailBtn","",this.detailBtnHandler,this);
        detailBtn.x = bg.x + bg.width - detailBtn.width -13;
        detailBtn.y = bg.y + 56 ;
        this._nodeContainer.addChild(detailBtn);
        let vo = <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.getUiCode());
        if(this._rewardVo.type == 16&&vo.getBuyShopList1(this._uiData.id))
        {
             App.DisplayUtil.changeToGray(this._buyBtn);
        }
        this.refreshUI();
    }

    protected refreshUI()
    {
        let bg = <BaseBitmap>this._nodeContainer.getChildByName("bg");
        if(this._rewardVo.type == 16 ){ //红颜皮肤
            let info = Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._rewardVo.id);
            if(info){
                this._isOwn = true;
            }else{
                this._isOwn = false;
            }
        }else if( this._rewardVo.type == 11 ){ //头像框
            if (Api.itemVoApi.getTitleInfoVoById(this._rewardVo.id).num > 0 ){
                this._isOwn = true;
                if( !Api.switchVoApi.checkOpenTitleLv()){
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }else{
                    if(this._uiData.limit > 0 && this.vo.getBuyShopList1(this._uiData.id) >= this._uiData.limit){
                        App.DisplayUtil.changeToGray(this._buyBtn);
                    }else{
                         App.DisplayUtil.changeToNormal(this._buyBtn);
                    }
                }
            }else{
                this._isOwn = false;
                App.DisplayUtil.changeToNormal(this._buyBtn);
            }

            if(this._limitNum){
                let bnum = this.vo.getBuyShopList1(this._uiData.id) || 0;
                let limitNum = this._uiData.limit - bnum;
                this._limitNum.text = LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
                this._ownerTxt.y = this._limitNum.y  - this._ownerTxt.height - 10;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._ownerBg, this._ownerTxt);
            }
        }

        let strKey = "acSineleDaySkin_own";
        if(this._isOwn == false){
            this._ownerTxt.textColor = TextFieldConst.COLOR_WARN_RED;
            strKey = "acSineleDaySkin_notown";
        }
        else{
            this._ownerTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        if(this._ownerTxt){
            this._ownerTxt.text = LanguageManager.getlocal(strKey);
            this._ownerTxt.x = bg.x + bg.width/2 - this._ownerTxt.width/2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._ownerBg, this._ownerTxt);
        }
        if(this._rewardVo.type == 16){
            let wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._rewardVo.id );
            let strKey2 = "acSingleDaySkin_getWife2";
            if(Api.wifeVoApi.getWifeInfoVoById(wifeSkincfg.wifeId)){
                strKey2 = "acSingleDaySkin_getWife1";
            }
            this._ownerTxt2.text = LanguageManager.getlocal(strKey2);
        }
    }

    protected detailBtnHandler()
    {
        let param = {}
        if(this._rewardVo.type == 16){
            param["skinId"] = this._rewardVo.id
        }else if(this._rewardVo.type == 11){
            param["titleId"] = this._rewardVo.id
        }
        else if (this._rewardVo.type == 6){
            param["itemId"] = this._rewardVo.id;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAYSKINPROPERTYPOPUPVIEW,param)
    }

    protected buyBtnCallbackHandler(event:egret.Event):void
	{
        if(this.vo.lasttype == 1){
            App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY,this.buyBtnCallbackHandler,this);
            let data:{ret:boolean,data:any}=event.data;
            if(data.data.ret == 0 )
            {
                 this.refreshUI();
                 let rewards = data.data.data.rewards;
                 let replacerewards = data.data.data.replacerewards;
                 let rvo = GameData.formatRewardItem(rewards);
                 App.CommonUtil.playRewardFlyAction(rvo);
                 let buyBtn = this._nodeContainer.getChildByName("buyBtn");
                 if(buyBtn){
                     App.DisplayUtil.changeToGray(buyBtn);
                 }
                 if(replacerewards)
                 {
                     ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, {
                     "replacerewards": replacerewards, "message": "changeOtherRewardTip"});
                 }
            }else{
                App.CommonUtil.showTip(LanguageManager.getlocal("manageTrader_buy_fail"));
            }
        }
    }

    protected buyBtnHandler()
    {
        let vo = <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.getUiCode());
        if(! this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        // if(this._isOwn && this._rewardVo.type == 16){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acSineleDaySkin_ownTip1"));
        //     return;
        // }
        if(this._rewardVo.type == 16&&vo.getBuyShopList1(this._uiData.id))
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acSineleDaySkin_ownTip3"));
            return;
        }

        if( this._rewardVo.type == 11 && Api.itemVoApi.getTitleInfoVoById(this._rewardVo.id).num > 0 ){
             if( !Api.switchVoApi.checkOpenTitleLv() ){
                App.CommonUtil.showTip(LanguageManager.getlocal("acSineleDaySkin_ownTip2"));
                return;
            }else{

                if(this._uiData.limit > 0 && this.vo.getBuyShopList1(this._uiData.id) >= this._uiData.limit){
                    App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
                    return;
                }
            }
        }

        if(Api.playerVoApi.getPlayerGem() < (this._uiData.price * this._uiData.rebate)){
            App.CommonUtil.showTip(LanguageManager.getlocal(`practice_batchBuyNotenoughdes`));
        }
        else{
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : LanguageManager.getlocal(`acSingleDayCouponUseTip1`, [`${this._uiData.rebate * this._uiData.price}`, `${this._rewardVo.name}`]),
                title : `itemUseConstPopupViewTitle`,
                touchMaskClose : true,
                callback : this._doRequest,
                handler : this,
                needClose : 1,
                needCancel : true
            });  
        }
    }


    private _doRequest(param?:any)
    {
        let itemType = 1;
        let itemId = this._uiData.id;
        this.vo.lasttype = 1;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY,this.buyBtnCallbackHandler,this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY,{
            mType:itemType,
            itemKey:itemId,
            activeId:this.aid + "-" + this._code
        })
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
                // ViewController.getInstance().openView(ViewConst.COMMON.SKINDETAILVIEW,this._uiData);
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
        this._isOwn = false;
        this._rewardVo = null;
        this._ownerTxt2 = null;
        this._ownerTxt = null;
        this._code = null;
        this._buyBtn = null;
        this._limitNum = null;
        this._ownerBg = null;
        super.dispose();
    }
}