/**
 * 门客新item
 * author shaoliang
 * date 2019/7/24
 * @class ServantNewScrollItem
 */
class ServantNewScrollItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _lvTxt:BaseTextField;
    private _servantId:string;
    private _selectedBox:BaseBitmap;
    private _cardbg:BaseBitmap;
    private _nameTxt:BaseTextField;
    private _servantImg:BaseLoadBitmap;
    private _bottomBg:BaseLoadBitmap;
    private _lvBg:BaseLoadBitmap;
    private _decorateBg:BaseLoadBitmap;

    public constructor()
    {
        super(); 
    }

    protected initItem(index:number,data:any)
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshRedPoints,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT),this.refreshInfoAfterUpdate,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN),this.refreshInfoAfterUpdate,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.refreshInfoAfterAdvance,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshRedPoints,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL),this.refreshRedPoints,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST,this.refreshRedPoints,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.backFromServantSkin,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA,this.refreshRedPoints,this);

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE),this.refreshRedPoints,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN),this.refreshRedPoints,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY),this.refreshRedPoints,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL),this.refreshRedPoints,this);

        //门客配置id
        this._servantId= data;
        //门客相关信息
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        let tmpCfg = Config.ServantCfg.getServantItemById(this._servantId); 
        let servantCfg = Config.ServantCfg.getServantItemById(this._servantId);

        // this.width = 208;
        

        this._nodeContainer = new BaseDisplayObjectContainer()
        this._nodeContainer.x = 10;
		this.addChild(this._nodeContainer);
        let cardbg = BaseLoadBitmap.create( servantInfoObj.qualityCardBg );
        // cardbg.y = 5;
        cardbg.width = 198; 
        cardbg.height = 262; 
        cardbg.name = "cardbg";
        

        this._nodeContainer.addChild(cardbg);
        cardbg.touchEnabled = true;

        this._selectedBox = BaseBitmap.create("servanticon_select");
        this._selectedBox.width = cardbg.width;
        this._selectedBox.height = cardbg.height;
        this._selectedBox.x = cardbg.width/2 -  this._selectedBox.width/2;
        this._selectedBox.y = cardbg.y + cardbg.height/2 -  this._selectedBox.height/2;
        this._selectedBox.visible = false;        
		this._nodeContainer.addChild(this._selectedBox);
        this._cardbg = cardbg;
        this.addTouch(this.eventHandler,this,null,true);
        
        let serImg = servantInfoObj.cellImgPath;
        let onerect = new egret.Rectangle();
        onerect.setTo(0,0,198,262);
        let servantImg = BaseLoadBitmap.create(serImg,onerect );
        // servantImg.width = 188;
        // servantImg.height = 217;
        servantImg.x = cardbg.x + cardbg.width/2-servantImg.width/2;
        servantImg.y = cardbg.y;
        servantImg.name = "servantImg";
        this._nodeContainer.addChild(servantImg);
        this._servantImg = servantImg;

        //门客出海相关
        if (servantInfoObj.isServantExile()) {

            let exileBM = BaseBitmap.create("public_servantexilelogo");
            exileBM.setPosition(cardbg.x + cardbg.width - exileBM.width, cardbg.y);
            this._nodeContainer.addChild(exileBM);
        }

        //门客角标
        if(servantCfg.quality2 )
        {
            let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
            cornerImg.x = cardbg.x + cardbg.width - cornerImg.width - 15;
            cornerImg.y = cardbg.y + 5;
            this._nodeContainer.addChild(cornerImg);
        }

        let bottomPic:string;
        if (servantInfoObj.equip && servantInfoObj.equip != "")//Api.weaponVoApi.getWeaponInfoVoByServantId(this._servantId)
        {
            bottomPic = "servanticon_bottom1";
        }
        else
        {
            bottomPic = "servanticon_bottom0";
        }
        this._bottomBg = BaseLoadBitmap.create(bottomPic);
        this._bottomBg.x = 7;
        this._bottomBg.y = cardbg.y+ cardbg.height-50;
        this._nodeContainer.addChild(this._bottomBg);

        if (servantInfoObj.equip && servantInfoObj.equip != "")//Api.weaponVoApi.getWeaponInfoVoByServantId(this._servantId)
        {
            let clip = ComponentManager.getCustomMovieClip("servant_icon_ef",12);
            clip.x = this._bottomBg.x-7;
            clip.y = this._bottomBg.y-19;
            this._nodeContainer.addChild(clip);
            clip.playWithTime(0);
            clip.blendMode = egret.BlendMode.ADD;
        }
        
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
        nameTxt.x =cardbg.x + 90;
        nameTxt.y = this._bottomBg.y+ 18;
        this._nodeContainer.addChild( nameTxt);
        this._nameTxt = nameTxt;

        //边框装饰
        // let decorateBgStr = servantInfoObj.cardDecorateBg;
        // if (ResourceManager.hasRes(decorateBgStr)){
        //     let decorateBg = BaseLoadBitmap.create(decorateBgStr);
        //     decorateBg.width = 212;
        //     decorateBg.height = 278;
        //     decorateBg.setPosition(cardbg.x + cardbg.width/2 - decorateBg.width/2, cardbg.y + cardbg.height/2 - decorateBg.height/2);
        //     this._nodeContainer.addChild(decorateBg);
        //     this._decorateBg = decorateBg;
        // }

        let lvBg = BaseBitmap.create("servanticon_lvbg");
        lvBg.x = 8;
        lvBg.y = 8;
        this._nodeContainer.addChild(lvBg);

        if (PlatformManager.checkIsRuSp())
        {
            lvBg.width = 90;
        }

        // let lvBg = BaseLoadBitmap.create(servantInfoObj.levelBg);
        // lvBg.width = 70;
        // lvBg.height = 38;
        // lvBg.x = 2;
        // lvBg.y = cardbg.y + 2;
        // this._nodeContainer.addChild(lvBg);
        // this._lvBg = lvBg;

        this._lvTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._lvTxt.text = LanguageManager.getlocal("servant_lv",[String(servantInfoObj.level)]) ;
        // this._lvTxt.x = lvBg.x + 6;
        this._lvTxt.x = 17;
        this._lvTxt.y = lvBg.y + lvBg.height/2 -  this._lvTxt.height/2;
        this._nodeContainer.addChild( this._lvTxt);


        let starImg = BaseBitmap.create("servant_star");
        starImg.x = 33;
        starImg.y = this._bottomBg.y+ 14;
        this._nodeContainer.addChild(starImg);

        let starNum = Api.servantVoApi.getServantStarsNumWithId(this._servantId);
        let starNumTxt = ComponentManager.getTextField(starNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        starNumTxt.x =starImg.x + starImg.width;
        starNumTxt.y = starImg.y+5;
        this._nodeContainer.addChild( starNumTxt);

        let totalWidth = 12 + starImg.width + starNumTxt.width + nameTxt.width;
        starImg.x = this._bottomBg.x + 92 - totalWidth/2;
        starNumTxt.x = starImg.x+starImg.width;
        nameTxt.x = starNumTxt.x +starNumTxt.width+12;

        /** 英 俄 葡 特殊处理名字超长度 */
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()){
            let starTotalW = starImg.width + starNumTxt.width;
            starImg.x = this._bottomBg.x + 92 - starTotalW/2;
            starImg.y = this._bottomBg.y - starImg.height + 10;
            starNumTxt.x = starImg.x + starImg.width;
            starNumTxt.y = starImg.y + 5;
            nameTxt.x = this._bottomBg.x + 92 - nameTxt.width/2;
        }


        let redP = BaseBitmap.create("public_dot2");
        redP.x = cardbg.x + cardbg.width - redP.width;
        redP.y = cardbg.y ;
        redP.name = "redP";
        redP.visible = false;
        this._nodeContainer.addChild(redP);
        this.refreshRedPoints();

        this.height = 266;
    }

    protected refreshRedPoints()
    {
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        let redP = this._nodeContainer.getChildByName("redP");
        if(servantInfoObj && redP){
            redP.visible = servantInfoObj.isShowRedInServantList();
        }
    }

    protected refreshInfoAfterUpdate()
    {
         let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
         if(!servantInfoObj){
             return;
         }
         this._lvTxt.text = LanguageManager.getlocal("servant_lv",[String(servantInfoObj.level)]) 
         this.refreshRedPoints();
    }

    protected refreshInfoAfterAdvance()
    {
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        let cardbg:BaseLoadBitmap = <BaseLoadBitmap>this._nodeContainer.getChildByName("cardbg")
        cardbg.setload(servantInfoObj.qualityCardBg);  
        // this._nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        // this._lvBg.setload(servantInfoObj.levelBg);
        // if (this._decorateBg){
        //     let decorateBgStr = servantInfoObj.cardDecorateBg;
        //     if (ResourceManager.hasRes(decorateBgStr)){
        //         this._decorateBg.setload(decorateBgStr);
        //     }
        // }
        // else{
        //     let decorateBgStr = servantInfoObj.cardDecorateBg;
        //     if (ResourceManager.hasRes(decorateBgStr)){
        //         let decorateBg = BaseLoadBitmap.create(decorateBgStr);
        //         decorateBg.width = 212;
        //         decorateBg.height = 278;
        //         decorateBg.setPosition(cardbg.x + cardbg.width/2 - decorateBg.width/2, cardbg.y + cardbg.height/2 - decorateBg.height/2);
        //         this._nodeContainer.addChildAt(decorateBg, this._nodeContainer.getChildIndex(this._nameTxt)+1);
        //         this._decorateBg = decorateBg;
        //     }
        // }
        this.refreshRedPoints();
    }

    protected refreshIcon()
    {
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        if(!servantInfoObj || !servantInfoObj.halfImgPath || servantInfoObj.halfImgPath == ""){
            return;
        }
        // this._servantImg.setload(servantInfoObj.halfImgPath);

        this._servantImg.dispose();
        let serImg = servantInfoObj.fullImgPath;
        let onerect = new egret.Rectangle();
        onerect.setTo(0,0,198,262);
        let servantImg = BaseLoadBitmap.create(serImg,onerect );
        servantImg.x = this._cardbg.x + this._cardbg.width/2-servantImg.width/2;
        // servantImg.y = this._cardbg.y;
        servantImg.y = 10;
        this._nodeContainer.addChildAt(servantImg,this._nodeContainer.getChildIndex(this._cardbg)+1);
        this._servantImg = servantImg;

    }

    protected eventHandler(event:egret.TouchEvent)
    {
        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
                this._selectedBox.visible = true;
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._selectedBox.visible = false;
                break;
			case egret.TouchEvent.TOUCH_END:
                this._selectedBox.visible = false;
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTNEWUIVIEW,this._servantId);
				break;
        }
    }

    public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 4;
	}
    protected backFromServantSkin(param:any)
	{
		let _isShowAni = param.data.isShowAni;
        let _serid = param.data.servantId;
        if(_serid == this._servantId && _isShowAni){
            this.refreshIcon();
        }
    }

    public dispose():void
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshRedPoints,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA,this.refreshRedPoints,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT),this.refreshInfoAfterUpdate,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN),this.refreshInfoAfterUpdate,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.refreshInfoAfterAdvance,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshRedPoints,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL),this.refreshRedPoints,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST,this.refreshRedPoints,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.backFromServantSkin,this);

        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE),this.refreshRedPoints,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN),this.refreshRedPoints,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY),this.refreshRedPoints,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL),this.refreshRedPoints,this);

        this._nodeContainer = null;
        this._cardbg = null;
        this._lvTxt = null;
        this._servantId = null;
        this._selectedBox = null;
        this._nameTxt = null;
        this._servantImg = null;
        this._bottomBg = null;
        this._lvBg = null;
        this._decorateBg = null;

        super.dispose();
    }
}