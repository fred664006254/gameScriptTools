/**
 * 门客列表节点
 * author yanyuling
 * date 2017/9/25
 * @class ServantScrollItem
 */
class ServantScrollItem extends ScrollListItem
{
    static QUALITYCFG=[
        TextFieldConst.COLOR_QUALITY_WHITE,0xffd675,0xca6cfa
    ];

    private _nodeContainer:BaseDisplayObjectContainer;
    private _lvTxt:BaseTextField;
    private _servantId:string;
    private _selectedBox:BaseBitmap;
    private _cardbg:BaseBitmap;
    private _nameTxt:BaseTextField;
    private _nameTxt2:BaseTextField;
    private _servantImg:BaseLoadBitmap;
    // public constructor(index:number,data:any)
     public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any)
    {
        let isHave = typeof data == 'string' && data !== 'line';
        let isLine = typeof data == 'string' && data === 'line';
        let unlock = typeof data == 'object';
        if(isHave){
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshRedPoints,this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT),this.refreshInfoAfterUpdate,this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN),this.refreshInfoAfterUpdate,this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.refreshInfoAfterAdvance,this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshRedPoints,this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL),this.refreshRedPoints,this);
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST,this.refreshRedPoints,this);
            // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.skinkCallback,this);
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.backFromServantSkin,this);
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP, this.refreshRedPoints,this);
            //门客配置id
            this._servantId = isHave ? data : data.sid;
            //门客相关信息
            let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
            let tmpCfg = GameConfig.config.servantCfg[this._servantId];
                
            this._nodeContainer = new BaseDisplayObjectContainer()
            // this._nodeContainer.x = 11;
            this.addChild(this._nodeContainer);
            let cardbg = BaseLoadBitmap.create(servantInfoObj.qualityBg);
            cardbg.width = 194; 
            cardbg.height = 287; 
            cardbg.name = "cardbg";  
            this._nodeContainer.addChild(cardbg);
            cardbg.touchEnabled = true;

            this._selectedBox = BaseBitmap.create("servant_bigcardbg_selected");
            this._selectedBox.x = cardbg.width/2 -  this._selectedBox.width/2;
            this._selectedBox.y = cardbg.height/2 -  this._selectedBox.height/2;
            this._selectedBox.visible = false;        
            this._selectedBox.width =this._selectedBox.width//-10;
            this._nodeContainer.addChild(this._selectedBox);
            this._cardbg = cardbg;
            isHave ? this.addTouch(this.eventHandler,this,null,true) : 0;
            
            let servantImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath); 
            servantImg.scaleX= servantImg.scaleY =0.64;
            servantImg.x = -100; 
            servantImg.y = 22;
            this._servantImg = servantImg;
            this._nodeContainer.addChild(servantImg);

            //品质标识
            if(tmpCfg.quality){
                let tag = BaseLoadBitmap.create(`servant_qualitytag${tmpCfg.quality}`);
                tag.width = 148;
                tag.height = 230;
                this._nodeContainer.addChild(tag);
                tag.setScale(0.65);
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tag, cardbg, [-30,-35]);
            }

            let widthN:number =282-8;
            let heightN:number =335 + 6;
            let mask = new egret.Rectangle(172, 0, widthN , heightN);   
            servantImg.mask =mask;

            let nameBg = BaseBitmap.create("servant_middlebg"); 
            nameBg.x = 7;
            nameBg.y =215;
            nameBg.width = 180;
            nameBg.height = 25;
            this._nodeContainer.addChild(nameBg); 
            
            let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
            nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
            nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
            nameTxt.x =cardbg.x + cardbg.width/2-nameTxt.width/2;
            nameTxt.y = 252; 
            this._nodeContainer.addChild( nameTxt);
            this._nameTxt = nameTxt;

            this._lvTxt = ComponentManager.getTextField("",18);
            this._lvTxt.text = String(servantInfoObj.level);//LanguageManager.getlocal("servant_lv",[String(servantInfoObj.level)]) ;
            this._lvTxt.x = 6; 
            this._lvTxt.width =40;
            this._lvTxt.textAlign =TextFieldConst.ALIGH_CENTER;
            this._lvTxt.y = 15; //lvBg.y + lvBg.height/2 -  this._lvTxt.height/2;
            this._nodeContainer.addChild( this._lvTxt);

            let starImg = BaseBitmap.create("servant_star");
            starImg.x = cardbg.x + cardbg.width/2-starImg.width/2-15;
            starImg.y = nameBg.y + nameBg.height/2 - starImg.height/2;//215;
            this._nodeContainer.addChild(starImg);

            let starNum = Api.servantVoApi.getServantStarsNumWithId(this._servantId);
            if(PlatformManager.checkIsKRNewSp())
            {
                starNum = servantInfoObj.getTotalBookValue();
            }
            
            let starNumTxt = ComponentManager.getTextField(starNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
            starNumTxt.x =starImg.x + starImg.width+2;
            starNumTxt.y = starImg.y+starImg.height/2 - starNumTxt.height/2; 
            this._nodeContainer.addChild( starNumTxt);

            if(PlatformManager.checkIsJPSp()){
                nameTxt.y += 4;
                let nameTxt2 = ComponentManager.getTextField("",16);
                nameTxt2.textColor = nameTxt.textColor;
                nameTxt2.text = LanguageManager.getlocal("servant_name"+this._servantId + "_jp");
                nameTxt2.x =cardbg.x + cardbg.width/2-nameTxt2.width/2;
                nameTxt2.y = nameTxt.y - 18; 
                this._nodeContainer.addChild( nameTxt2);
                this._nameTxt2 = nameTxt2;
                nameBg.y = 213;
                starImg.y = 213;
                starNumTxt.y = starImg.y+5;
            }

            let redP = BaseBitmap.create("public_dot2");
            redP.x = cardbg.x + cardbg.width - redP.width;
            redP.y = cardbg.y ;
            redP.name = "redP";
            redP.visible = false;
            this._nodeContainer.addChild(redP);
            this.refreshRedPoints(); 

            this.width = 194 + 8;
            this.height = 287 + 8;
        }
        else if(isLine){
            this.width = 606;
            this.height = 110;

            let line1 = BaseBitmap.create(`servantunlockline`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, line1, this, [0,0], true);
            this.addChild(line1);

            let line2 = BaseBitmap.create(`servantunlockline`);
            line2.scaleX = -1;
            line2.anchorOffsetX = line2.width / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, line2, this, [0,0], true);
            line2.x = this.width - line2.width + line2.anchorOffsetX;
            this.addChild(line2);

            let lockTxt = BaseBitmap.create(`servantunlocktxt`);
            this.addChild(lockTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lockTxt, this, [0,0], true);
        }
        else{
            //门客配置id
            this._servantId = data.sid;
            //门客相关信息
            //let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
            let tmpCfg = <Config.ServantItemCfg>Config.ServantCfg.getServantItemById(data.sid);
                
            this._nodeContainer = new BaseDisplayObjectContainer()
            // this._nodeContainer.x = 11;
            this.addChild(this._nodeContainer);
            let cardbg = BaseLoadBitmap.create(`servant_qualityBg_1`);
            cardbg.width = 194; 
            cardbg.height = 287; 
            cardbg.name = "cardbg";  
            this._nodeContainer.addChild(cardbg);
            cardbg.touchEnabled = true;

            this._selectedBox = BaseBitmap.create("servant_bigcardbg_selected");
            this._selectedBox.x = cardbg.width/2 -  this._selectedBox.width/2;
            this._selectedBox.y = cardbg.height/2 -  this._selectedBox.height/2;
            this._selectedBox.visible = false;        
            this._selectedBox.width =this._selectedBox.width//-10;
            this._nodeContainer.addChild(this._selectedBox);
            this._cardbg = cardbg;
            isHave ? this.addTouch(this.eventHandler,this,null,true) : 0;
            
            let servantImg = BaseLoadBitmap.create(tmpCfg.fullIcon); 
            servantImg.scaleX= servantImg.scaleY =0.64;
            servantImg.x = -100; 
            servantImg.y = 22;
            this._servantImg = servantImg;
            this._nodeContainer.addChild(servantImg);

            //品质标识
            if(tmpCfg.quality){
                let tag = BaseLoadBitmap.create(`servant_qualitytag${tmpCfg.quality}`);
                tag.width = 148;
                tag.height = 230;
                this._nodeContainer.addChild(tag);
                tag.setScale(0.65);
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tag, cardbg, [-30,-35]);
            }

            let widthN:number =282-8;
            let heightN:number =335 + 6;
            let mask = new egret.Rectangle(172, 0, widthN , heightN);   
            servantImg.mask =mask;

            let nameBg = BaseBitmap.create("servant_middlebg"); 
            nameBg.x = 7;
            nameBg.y =215;
            nameBg.width = 180;
            nameBg.height = 25;
            this._nodeContainer.addChild(nameBg); 
            
            let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
            nameTxt.textColor = ServantScrollItem.getQualityColor(0);
            nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
            nameTxt.x =cardbg.x + cardbg.width/2-nameTxt.width/2;
            nameTxt.y = 252; 
            this._nodeContainer.addChild( nameTxt);
            this._nameTxt = nameTxt;

            this._lvTxt = ComponentManager.getTextField("",18);
            this._lvTxt.text = String(1);//LanguageManager.getlocal("servant_lv",[String(servantInfoObj.level)]) ;
            this._lvTxt.x = 6; 
            this._lvTxt.width =40;
            this._lvTxt.textAlign =TextFieldConst.ALIGH_CENTER;
            this._lvTxt.y = 15; //lvBg.y + lvBg.height/2 -  this._lvTxt.height/2;
            this._nodeContainer.addChild( this._lvTxt);

            let starImg = BaseBitmap.create("servant_star");
            starImg.x = cardbg.x + cardbg.width/2-starImg.width/2-15;
            starImg.y = nameBg.y + nameBg.height/2 - starImg.height/2;//215;
            this._nodeContainer.addChild(starImg);

            let starNum = tmpCfg.getStarNums();
            let starNumTxt = ComponentManager.getTextField(starNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
            starNumTxt.x =starImg.x + starImg.width+2;
            starNumTxt.y = starImg.y+starImg.height/2 - starNumTxt.height/2; 
            this._nodeContainer.addChild( starNumTxt);

            if(PlatformManager.checkIsJPSp()){
                nameTxt.y += 4;
                let nameTxt2 = ComponentManager.getTextField("",16);
                nameTxt2.textColor = nameTxt.textColor;
                nameTxt2.text = LanguageManager.getlocal("servant_name"+this._servantId + "_jp");
                nameTxt2.x =cardbg.x + cardbg.width/2-nameTxt2.width/2;
                nameTxt2.y = nameTxt.y - 18; 
                this._nodeContainer.addChild( nameTxt2);
                this._nameTxt2 = nameTxt2;
                nameBg.y = 213;
                starImg.y = 213;
                starNumTxt.y = starImg.y+5;
            }
            
            this.width = 194 + 8;   
            this.height = 287 + 8;
            
            if(App.FrameUtil.checkLowFrameRate()){
                let mask = BaseBitmap.create(`public_9_viewmask`);
                mask.width = 194;
                mask.height = 287;
                this.addChild(mask);
            }
            else{
                App.DisplayUtil.changeToGray(this._nodeContainer);
            }
            let unlockmask = BaseBitmap.create(`servantunlockbg`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, unlockmask, this, [6,90], true);
            this.addChild(unlockmask);

            let lockTxt = ComponentManager.getTextField(tmpCfg.getUnlockStr(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            this.addChild(lockTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lockTxt, unlockmask,[7,0]);
        }
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
         this._lvTxt.text = servantInfoObj.level.toString();
         this.refreshRedPoints();
    }
    protected refreshInfoAfterAdvance()
    {
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        if(!servantInfoObj)
        {
            return;
        }
        let cardbg:BaseLoadBitmap = <BaseLoadBitmap>this._nodeContainer.getChildByName("cardbg")
        cardbg.setload(servantInfoObj.qualityBg);  
        this._nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        if(this._nameTxt2){
            this._nameTxt2.textColor = this._nameTxt.textColor;
        }
        this.refreshRedPoints();
    }

    protected refreshIcon()
    {
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        if(!servantInfoObj || !servantInfoObj.fullImgPath || servantInfoObj.fullImgPath == ""){
            return;
        }
        // console.log("half>>>>>>> " + servantInfoObj.halfImgPath);
        this._servantImg.setload(servantInfoObj.fullImgPath); //0611
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
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW,this._servantId);
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
		return 0;
	}
    protected backFromServantSkin(param:any)
	{
        if(!param || !param.data || !param.data.isShowAni){
            return;
        }
		let _isShowAni = param.data.isShowAni;
        let _serid = param.data.servantId;
        if(_serid == this._servantId && _isShowAni){
            this.refreshIcon();
        }
    }

    public dispose():void
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA),this.refreshRedPoints,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT),this.refreshInfoAfterUpdate,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN),this.refreshInfoAfterUpdate,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE),this.refreshInfoAfterAdvance,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY),this.refreshRedPoints,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL),this.refreshRedPoints,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST,this.refreshRedPoints,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.backFromServantSkin,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP, this.refreshRedPoints,this);
        this._nodeContainer = null;
        this._cardbg = null;
        this._lvTxt = null;
        this._servantId = null;
        this._selectedBox = null;
        this._nameTxt = null;
        this._nameTxt2 = null;
        this._servantImg = null;

        super.dispose();
    }

    static getQualityColor(quality)
	{	
		let tarColor =TextFieldConst.COLOR_QUALITY_WHITE;//TextFieldConst.COLOR_QUALITY_WHITE
		switch(quality)
		{
            case 0:
				tarColor = TextFieldConst.COLOR_QUALITY_WHITE_SERVANT;
				break
			case 1:
				tarColor = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
				break
			case 2:
				tarColor = TextFieldConst.COLOR_QUALITY_BLUE_NEW;
				break
            case 3:
			    tarColor = TextFieldConst.COLOR_QUALITY_PURPLE_NEW;
				break
			case 4:
				tarColor = TextFieldConst.COLOR_QUALITY_ORANGE_NEW;
				break
			case 5: 
				tarColor = TextFieldConst.COLOR_QUALITY_RED_NEW;
                break
            case 6: 
                tarColor = TextFieldConst.COLOR_QUALITY_YELLOW_NEW;
                break
            case 7: 
                tarColor = TextFieldConst.COLOR_QUALITY_GOLD_NEW;
                break

			default:
                tarColor = TextFieldConst.COLOR_QUALITY_WHITE_SERVANT;
				break

		}
		return tarColor;
	}
}