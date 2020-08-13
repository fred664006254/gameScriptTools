class AcSingleDaySkinScrollItem  extends ScrollListItem
{
    private _uiData:any = undefined;
    public _isGray:boolean = false;
    private _nodeContainer:BaseDisplayObjectContainer = undefined;
    private _isOwn:boolean = false;
    private _rewardVo:RewardItemVo = undefined;
    private _ownerTxt2:BaseTextField = undefined;
    private _ownerTxt:BaseTextField = undefined;
    private _aid:string = undefined;
    private _code:string = undefined;
    private _buyBtn:BaseButton = undefined;
    private _limitNum:BaseTextField = undefined;
    public constructor()
    {
        super();
    }

     private get cfg() : Config.AcCfg.SingleDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
    }

    private get vo() : AcSingleDayVo{
        return <AcSingleDayVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
    }
    protected initItem(index:number,data:any)
    {
        this.width = 310;
        this.height = 393;
        this._uiData = data;
        let serSkincfg = undefined;
        let wifeSkincfg = undefined;
        this._aid = this._uiData[2];
        this._code = this._uiData[3];

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild( this._nodeContainer);
        let bg = BaseBitmap.create("acsingleday_skinbg1_1");
        bg.width = 301;
        bg.height = 384;
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


        this._rewardVo = new RewardItemVo();
        this._rewardVo.initData(this._uiData[0].itemID);
        let buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.buyBtnHandler,this);
        this._buyBtn = buyBtn;
        if(this._rewardVo.type == 16 ){ //红颜皮肤
            wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._rewardVo.id );
            let info = Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._rewardVo.id);
            if(info){
                this._isOwn = true;
            }else{
                this._isOwn = false;
            }
            if(!Api.switchVoApi.checkOpenWifeskinLvup()){
                let info = Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._rewardVo.id);
                bg.texture = ResourceManager.getRes("acsingleday_skinbg2_1");
                if(info){
                    // this._isOwn = true;
                    isGray = false;
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }else{
                    // this._isOwn = false;
                    isGray = true;
                    App.DisplayUtil.changeToNormal(this._buyBtn);
                }
            }else{
                if(this.vo.skin[this._uiData[1]] && this.vo.skin[this._uiData[1]] >= this._uiData[0].limit){
                    // this._isOwn = true;
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }else{
                    // this._isOwn = false;
                    App.DisplayUtil.changeToNormal(this._buyBtn);
                }
            }

            skinImgPath = wifeSkincfg.body;
            skinNameStr = wifeSkincfg.name  + " " + LanguageManager.getlocal("wifeName_"+wifeSkincfg.wifeId);
            tarScale = 0.53;
            rect.width = 640;
            rect.height = 600;
            tarY = bg.y + 14;
            let skinImg = BaseLoadBitmap.create(skinImgPath);
            skinImg.mask = rect;
            skinImg.setScale(tarScale);
            skinImg.x = bg.x + bg.width/2 - rect.width * tarScale /2;
            skinImg.y = tarY ;
            this._nodeContainer.addChild(skinImg);

            let namebg = BaseBitmap.create("acsingleday_skinnamebg");
            // namebg.width = 280;
            namebg.x = bg.x + bg.width/2 - namebg.width/2+5;
            namebg.y = bg.y + 13;
            this._nodeContainer.addChild(namebg);

            // let wifeName = LanguageManager.getlocal("wifeName_" + wifeSkincfg.wifeId) 
            let skinNameTxt = ComponentManager.getTextField(skinNameStr,20,TextFieldConst.COLOR_LIGHT_YELLOW);
            skinNameTxt.x = namebg.x + namebg.width/2 - skinNameTxt.width/2;
            skinNameTxt.y = namebg.y + namebg.height * namebg.scaleY/2 - skinNameTxt.height/2;
            this._nodeContainer.addChild(skinNameTxt);
            if(skinNameTxt.width + 50 > namebg.width){
                namebg.width = skinNameTxt.width + 50;
                namebg.x = bg.x + bg.width/2 - namebg.width/2+5;
            }else{
                namebg.x = bg.x + bg.width/2 - namebg.width/2+5;
            }
            skinNameTxt.x = namebg.x + namebg.width/2 - skinNameTxt.width/2;
        }else if( this._rewardVo.type == 11 ){ //头像框
            bg.texture = ResourceManager.getRes("acsingleday_skinbg1_1");
            let iconBg = BaseBitmap.create("acsingleday_skinitemIconbg");
            iconBg.x = bg.x + bg.width/2 - iconBg.width/2;
            iconBg.y = bg.y + 60;
            this._nodeContainer.addChild(iconBg);
            // rewardVo.id = 4001;
            let _name = LanguageManager.getlocal("itemName_" + this._rewardVo.id);
			let _icon = "itemicon"+this._rewardVo.id;
			let itemCfg = Config.TitleCfg.getTitleCfgById( this._rewardVo.id );

            let deltaS = 1.3 ;
            let avatarImg = BaseLoadBitmap.create(_icon);
            avatarImg.width = avatarImg.height = 100 * deltaS;
            avatarImg.x = iconBg.x + iconBg.width/2 - 50*deltaS;
            avatarImg.y = iconBg.y + iconBg.height/2 - 50*deltaS - 10;
            this._nodeContainer.addChild(avatarImg);

             let itemNameTxt = ComponentManager.getTextField(_name,18,TextFieldConst.COLOR_LIGHT_YELLOW);
            itemNameTxt.x = iconBg.x + iconBg.width/2 - itemNameTxt.width/2;
            itemNameTxt.y = iconBg.y + iconBg.height - 38;
            this._nodeContainer.addChild(itemNameTxt);

           


            if (Api.itemVoApi.getTitleInfoVoById(this._rewardVo.id).num > 0 ){
                let limitNum = this._uiData[0].limit ;
                this._isOwn = true;
                if( !Api.switchVoApi.checkOpenTitleLv()){
                    // this._isOwn = true;
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }else{
                    if(this.vo.skin[this._uiData[1]] && this.vo.skin[this._uiData[1]] >= this._uiData[0].limit){
                        // this._isOwn = true;
                        App.DisplayUtil.changeToGray(this._buyBtn);
                    }else{
                        // this._isOwn = false;
                        App.DisplayUtil.changeToNormal(this._buyBtn);
                    }
                }
            }else{
                 this._isOwn = false;
                 App.DisplayUtil.changeToNormal(this._buyBtn);
            }
        }

         if(this._uiData[0].limit > 0 ){
            let limitbg = BaseBitmap.create("servant_middlebg"); 
            limitbg.width = 220;
            limitbg.height = 25;
            limitbg.x = bg.x + bg.width/2 - limitbg.width/2;
            limitbg.y =  bg.y + bg.height - 48 - 25;
            this._nodeContainer.addChild(limitbg);

            let bnum = this.vo.skin[this._uiData[1]] || 0;
            let limitNum = this._uiData[0].limit - bnum ;
            // if(this.vo.skin[this._uiData[1]]){
            //     limitNum = this._uiData[0].limit - this.vo.skin[this._uiData[1]];
            // }
            let limitTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]),18,TextFieldConst.COLOR_LIGHT_YELLOW);
            limitTxt.x =   bg.x + bg.width/2 - limitTxt.width/2;
            limitTxt.y = limitbg.y + limitbg.height/2 - limitTxt.height/2;
            this._nodeContainer.addChild(limitTxt);
            this._limitNum = limitTxt;
            // this._limitNum.text = LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
        }

        let strKey = "acSineleDaySkin_own";
        let colorKey = TextFieldConst.COLOR_WARN_GREEN2;
        if(!this._isOwn){
            strKey = "acSineleDaySkin_notown";
            colorKey = TextFieldConst.COLOR_QUALITY_GRAY;
        }

        let ownerTxt = ComponentManager.getTextField(LanguageManager.getlocal(strKey),20,colorKey);
        ownerTxt.x = bg.x + bg.width/2 - ownerTxt.width/2;
        ownerTxt.y = bg.y + bg.height - 48;
        this._nodeContainer.addChild(ownerTxt);
        this._ownerTxt = ownerTxt;

        if(this._rewardVo.type == 16 ){ //红颜皮肤
            let wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._rewardVo.id );
            let strKey2 = "acSingleDaySkin_getWife2";
            if(Api.wifeVoApi.getWifeInfoVoById(wifeSkincfg.wifeId)){
                strKey2 = "acSingleDaySkin_getWife1";
            }

            let nameBg = BaseBitmap.create("servant_middlebg"); 
            nameBg.width = 220;
            nameBg.height = 25;
            nameBg.x = bg.x + bg.width/2 - nameBg.width/2;
            nameBg.y =  ownerTxt.y - 110;
            
            this._nodeContainer.addChild(nameBg);

            let ownerTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(strKey2),20,TextFieldConst.COLOR_QUALITY_YELLOW);
            ownerTxt2.x = bg.x + bg.width/2 - ownerTxt2.width/2;
            ownerTxt2.y = nameBg.y + nameBg.height/2 - ownerTxt2.height/2;
            this._nodeContainer.addChild(ownerTxt2);
            this._ownerTxt2 = ownerTxt2;

            // this._ownerTxt2.visible = this._isOwn;
        }

         if(this._uiData[0].rebate < 1.0){
            let offImg =  BaseBitmap.create("acsingleday_skin_off");
            offImg.x = bg.x + 5;
            offImg.y = bg.y + 25;
            this._nodeContainer.addChild(offImg);

            let offTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_WARN_RED2);
            if(PlatformManager.checkIsKRSp() || PlatformManager.checkIsJPSp() || PlatformManager.checkIsViSp()||PlatformManager.checkIsKRNewSp()){
                offTxt.text = LanguageManager.getlocal("discountTitle",[""+( (10 - this._uiData[0].rebate * 10).toFixed(0))]);
            }else{
                offTxt.text = LanguageManager.getlocal("discountTitle",[""+(this._uiData[0].rebate * 10)]);
            }
            offTxt.x = offImg.x + offImg.width/2 - offTxt.width/2;
            offTxt.y = offImg.y + offImg.height /2 - offTxt.height/2 + 5;
            this._nodeContainer.addChild(offTxt);
        }
        
        
        this._buyBtn.setText("" +( this._uiData[0].price * this._uiData[0].rebate ),false);
        this._buyBtn.addTextIcon("public_icon1",2);
        this._buyBtn.name = "buyBtn";
        this._buyBtn.x = bg.x + bg.width/2 - this._buyBtn.width/2;
        this._buyBtn.y = ownerTxt.y - this._buyBtn.height - 30;
        this._nodeContainer.addChild(this._buyBtn);

        let detailBtn = ComponentManager.getButton("servant_detailBtn","",this.detailBtnHandler,this);
        detailBtn.x = buyBtn.x + buyBtn.width + 8;
        detailBtn.y = buyBtn.y + buyBtn.height/2 - detailBtn.height/2 ;
        this._nodeContainer.addChild(detailBtn);

        // this.refreshUI();
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

            if(!Api.switchVoApi.checkOpenWifeskinLvup()){
                if(info){
                    // this._isOwn = true;
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }else{
                    // this._isOwn = false;
                    App.DisplayUtil.changeToNormal(this._buyBtn);
                }
            }else{
                if(this.vo.skin[this._uiData[1]] && this.vo.skin[this._uiData[1]] >= this._uiData[0].limit){
                    // this._isOwn = true;
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }else{
                    // this._isOwn = false;
                    App.DisplayUtil.changeToNormal(this._buyBtn);
                }
            }
        }else if( this._rewardVo.type == 11 ){ //头像框
            if (Api.itemVoApi.getTitleInfoVoById(this._rewardVo.id).num > 0 ){
                 this._isOwn = true;
                if( !Api.switchVoApi.checkOpenTitleLv()){
                    // this._isOwn = true;
                    App.DisplayUtil.changeToGray(this._buyBtn);
                }else{
                    if(this.vo.skin[this._uiData[1]] && this.vo.skin[this._uiData[1]] >= this._uiData[0].limit){
                        // this._isOwn = true;
                        App.DisplayUtil.changeToGray(this._buyBtn);
                    }else{
                        // this._isOwn = false;
                         App.DisplayUtil.changeToNormal(this._buyBtn);
                    }
                }
            }else{
                 this._isOwn = false;
                  App.DisplayUtil.changeToNormal(this._buyBtn);
            }
        }
         if(this._limitNum){
            let bnum = this.vo.skin[this._uiData[1]] || 0;
            let limitNum = this._uiData[0].limit - bnum;
            this._limitNum.text = LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
        }

        let strKey = "acSineleDaySkin_own";
        if(this._isOwn == false){
            strKey = "acSineleDaySkin_notown";
        }

        if(this._ownerTxt){
            this._ownerTxt.text = LanguageManager.getlocal(strKey);
            this._ownerTxt.x = bg.x + bg.width/2 - this._ownerTxt.width/2;
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
            param["itemId"] = this._rewardVo.id
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAYSKINPROPERTYPOPUPVIEW,param)
    }

    protected buyBtnCallbackHandler(event:egret.Event):void
	{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ACTIVITY_BUYSINGLEDAYSHOP,this.buyBtnCallbackHandler,this);
        let data:{ret:boolean,data:any}=event.data;
		if(data.data.ret == 0 )
		{
             this.refreshUI();
             let rewards = data.data.data.rewards;
             let rvo = GameData.formatRewardItem(rewards);
             App.CommonUtil.playRewardFlyAction(rvo);

             let buyBtn = this._nodeContainer.getChildByName("buyBtn");
             if(buyBtn){
                //  App.DisplayUtil.changeToGray(buyBtn);
             }
        }else{
            App.CommonUtil.showTip(LanguageManager.getlocal("manageTrader_buy_fail"));
        }
    }

    protected buyBtnHandler()
    {
        if(! this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        // if(this._isOwn && this._rewardVo.type == 16 &&  !Api.switchVoApi.checkOpenWifeskinLvup() ){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acSineleDaySkin_ownTip1"));
        //     return;
        // }

        if(this.vo.skin[this._uiData[1]] && this.vo.skin[this._uiData[1]] >= this._uiData[0].limit){
            App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
            return;
        }

        if( this._rewardVo.type == 11 && Api.itemVoApi.getTitleInfoVoById(this._rewardVo.id).num > 0 ){
             if( !Api.switchVoApi.checkOpenTitleLv() ){
                App.CommonUtil.showTip(LanguageManager.getlocal("acSineleDaySkin_ownTip2"));
                return;
            }
        }

         if( this._rewardVo.type == 16 && Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._rewardVo.id)){
             if( !Api.switchVoApi.checkOpenWifeskinLvup() ){
                App.CommonUtil.showTip(LanguageManager.getlocal("acSineleDaySkin_ownTip1"));
                return;
            }
        }

        

        this.composeHandler();
    }

    private composeHandler():void{
        let view = this;
        let itemcfg = this._uiData[0];
        let coupon = view.vo.getMyRedpt();
        let arr = [];
        for(let i in coupon){
            let unit = coupon[i];
            if(unit.value <= Math.ceil(itemcfg.rebate * itemcfg.price * 0.5)){
                arr.push(unit);
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAYBUYCONFIRMPOPUPVIEW,{
            id : itemcfg.id,
            price : itemcfg.rebate * itemcfg.price,
            itemid : this._uiData[0].itemID,
            coupon : arr,
            confirmCallback : this._doRequest,
            handler : this,
        });
	}

    private _doRequest(param?:any)
    {
        let itemType = 1;
        let itemId = this._uiData[1];
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ACTIVITY_BUYSINGLEDAYSHOP,this.buyBtnCallbackHandler,this);
        let couponId = 0;
        if(param && Number(param) > 0){
            couponId = param;
            NetManager.request(NetRequestConst.REQYEST_ACTIVITY_BUYSINGLEDAYSHOP,{mType:itemType,itemKey:itemId,activeId:this._aid + "-" + this._code,couponId : couponId})
        }else{
             NetManager.request(NetRequestConst.REQYEST_ACTIVITY_BUYSINGLEDAYSHOP,{mType:itemType,itemKey:itemId,activeId:this._aid + "-" + this._code})
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
        this._aid = null;
        this._code = null;
        this._buyBtn = null;
        this._limitNum = null;

        super.dispose();
    }
}