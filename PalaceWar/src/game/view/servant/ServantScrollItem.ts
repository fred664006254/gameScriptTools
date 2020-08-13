/**
 * 门客列表节点
 * author yanyuling
 * date 2017/9/25
 * @class ServantScrollItem
 */
class ServantScrollItem  extends ScrollListItem
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
    private _servantImg:BaseLoadBitmap;
    // public constructor(index:number,data:any)
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
        //门客配置id
        this._servantId= data;
        //门客相关信息
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        let tmpCfg = GameConfig.config.servantCfg[this._servantId];
              
        this._nodeContainer = new BaseDisplayObjectContainer()
        this._nodeContainer.x = 11;
		this.addChild(this._nodeContainer);
        let cardbg = BaseLoadBitmap.create( servantInfoObj.qualityBoxImgPath );
        cardbg.width = 194; 
        cardbg.height = 192; 
        cardbg.name = "cardbg";
        
        // cardbg.setScale(200/240);
        
		this._nodeContainer.addChild(cardbg);
        cardbg.touchEnabled = true;

        this._selectedBox = BaseBitmap.create("servant_cardbg_selected");
        this._selectedBox.x = cardbg.width/2 -  this._selectedBox.width/2;
        this._selectedBox.y = cardbg.height/2 -  this._selectedBox.height/2;
        this._selectedBox.visible = false;        
		this._nodeContainer.addChild(this._selectedBox);
        this._cardbg = cardbg;
        this.addTouch(this.eventHandler,this,null,true);
        
        let serImg = servantInfoObj.halfImgPath;
        let servantImg = BaseLoadBitmap.create(serImg );
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = cardbg.x + cardbg.width/2-servantImg.width/2;
        servantImg.y = cardbg.y+ cardbg.height/2-servantImg.height/2-2;
        servantImg.name = "servantImg";
        this._nodeContainer.addChild(servantImg);
        this._servantImg = servantImg;

        //门客出海相关
        if (servantInfoObj.isServantExile()) {

            let exileBM = BaseBitmap.create("public_servantexilelogo");
            exileBM.setPosition(cardbg.x + cardbg.width - exileBM.width, cardbg.y);
            this._nodeContainer.addChild(exileBM);

        }
       

        let nameBg = BaseBitmap.create("servant_namebg");
        // nameBg.width = cardbg.width
        nameBg.x = cardbg.x + cardbg.width/2-nameBg.width/2;
        nameBg.y = cardbg.y+ cardbg.height-nameBg.height-7;
        this._nodeContainer.addChild(nameBg);
        
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = LanguageManager.getlocal("servant_name"+this._servantId);
        nameTxt.x =cardbg.x + cardbg.width/2-nameTxt.width/2;
        nameTxt.y = nameBg.y+ nameBg.height-nameTxt.height/2-15;
        this._nodeContainer.addChild( nameTxt);
        this._nameTxt = nameTxt;

        let lvBg = BaseBitmap.create("servant_lvbg");
        // lvBg.scaleX = 0.3;
        // lvBg.scaleY = 0.75;
        lvBg.x = 5;
        lvBg.y = 5;
        this._nodeContainer.addChild(lvBg);

        this._lvTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._lvTxt.text = LanguageManager.getlocal("servant_lv",[String(servantInfoObj.level)]) ;
        this._lvTxt.x = 17;
        this._lvTxt.y = lvBg.y + lvBg.height/2 -  this._lvTxt.height/2;
        this._nodeContainer.addChild( this._lvTxt);

        let starBg = BaseBitmap.create("servant_starbg");
        starBg.x = cardbg.x + cardbg.width/2- starBg.width/2;
        starBg.y = nameBg.y - starBg.height-2;
        this._nodeContainer.addChild(starBg);

        let starImg = BaseBitmap.create("servant_star");
        starImg.x = cardbg.x + cardbg.width/2-starImg.width/2-15;
        starImg.y = starBg.y+ starBg.height/2-starImg.height/2;
        this._nodeContainer.addChild(starImg);

        let starNum = Api.servantVoApi.getServantStarsNumWithId(this._servantId);
        let starNumTxt = ComponentManager.getTextField(starNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        starNumTxt.x =starImg.x + starImg.width+2;
        starNumTxt.y = starBg.y+ starBg.height/2-starNumTxt.height/2;
        this._nodeContainer.addChild( starNumTxt);

         let redP = BaseBitmap.create("public_dot2");
        redP.x = cardbg.x + cardbg.width - redP.width;
        redP.y = cardbg.y ;
        redP.name = "redP";
        redP.visible = false;
        this._nodeContainer.addChild(redP);
        this.refreshRedPoints();
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
        let cardbg:BaseLoadBitmap = <BaseLoadBitmap>this._nodeContainer.getChildByName("cardbg")
        cardbg.setload(servantInfoObj.qualityBoxImgPath);  
        this._nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        this.refreshRedPoints();
    }

    protected refreshIcon()
    {
        let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantId);
        if(!servantInfoObj || !servantInfoObj.halfImgPath || servantInfoObj.halfImgPath == ""){
            return;
        }
        // console.log("half>>>>>>> " + servantInfoObj.halfImgPath);
        this._servantImg.setload(servantInfoObj.halfImgPath); //0611
    }
    
    // protected skinkCallback(event:egret.Event)
    // {
    //     let ret = event.data.data.ret;
    //     if(ret == 0){
    //         this.refreshIcon();
    //     }
    // }

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
		return 10;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 10;
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

        this._nodeContainer = null;
        this._cardbg = null;
        this._lvTxt = null;
        this._servantId = null;
        this._selectedBox = null;
        this._nameTxt = null;
        this._servantImg = null;

        super.dispose();
    }

    static getQualityColor(quality)
	{	
		let tarColor = TextFieldConst.COLOR_QUALITY_WHITE
		switch(quality)
		{
			case 1:
				tarColor = TextFieldConst.COLOR_QUALITY_GREEN;
				break
			case 2:
				tarColor = TextFieldConst.COLOR_QUALITY_BLUE;
				break
			case 3:
				tarColor = TextFieldConst.COLOR_QUALITY_PURPLE;
				break
            case 4:
			    tarColor = TextFieldConst.COLOR_QUALITY_RED;
				break
			case 5:
				// tarColor = TextFieldConst.COLOR_QUALITY_ORANGE;
                tarColor = 0xe17b4e;
				break
			case 6: 
				// tarColor = TextFieldConst.COLOR_QUALITY_YELLOW;
                tarColor = 0xc99c01;
                break
            case 7:
                tarColor = TextFieldConst.COLOR_QUALITY_YELLOW2;
				break
			default:
                tarColor = TextFieldConst.COLOR_QUALITY_GRAY;
				break
		}
		return tarColor;
	}
}