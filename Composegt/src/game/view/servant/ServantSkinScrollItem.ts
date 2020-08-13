/**
 * 门客皮肤头像
 * author yanyuling
 * date 2018/3/5
 * @class ServantSkinScrollItem
 */
class ServantSkinScrollItem extends BaseDisplayObjectContainer 
{
	public constructor() 
	{
		super();
	}
	private _skincfg = undefined;
    private _skinId:string = undefined;
    private _iconBg:BaseBitmap;
    private _isDown:boolean = false;
    private _bgTouched:boolean = false;
	public init(skinId:string|number,index:number,serId:string):void
	{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH,this.bgSwitchHandler,this);
        this._skinId = "" + skinId;
        this._skincfg = Config.ServantskinCfg.getServantSkinItemById(this._skinId)
		this.width = 100+ this.getSpaceX()
		this.height = 110 ;

        let iconbgStr = "wifeview_hongyantyouxiang1";
        let wearId = Api.servantVoApi.isServantSkinInWear(this._skinId) ;
		let iconStr = "";
		if(this._skincfg){
			iconStr = this._skincfg.icon;
		}else{
			iconStr = "servant_half_"+serId;
		}
        if(wearId ){
            iconbgStr = "wifeview_hongyantyouxiang3";
            this._isDown = true;
        }else{
			if(!Api.servantVoApi.getservantSkinIdInWear(serId) && index == 0){
				iconbgStr = "wifeview_hongyantyouxiang3";
				this._isDown = true;
			}
		}
		let iconBg:BaseBitmap = BaseBitmap.create(iconbgStr);
		iconBg.name = "bg2";
        iconBg.addTouchTap(this.bgTouchHandler,this);
        this._iconBg = iconBg;
		this.addChild(iconBg);
       
		let icon = BaseLoadBitmap.create(iconStr);
		icon.width=190;
		icon.height=177;
		icon.setScale(0.7);
		icon.x = -10;
		
		if(this._skincfg ){
			if( this._skincfg.id == "10341"){
				icon.x = -20;
				icon.y = -10;
			}else if( this._skincfg.id == "20011"){
				icon.x = -20;
				icon.y = -10;
			}
		}

		// icon.y = -20;
		this.cacheAsBitmap = true;
		let iconMask = BaseBitmap.create("servant_skin_mask");
		
		this.addChild(iconMask);
		icon.mask = iconMask;


		// var circle:egret.Shape = new egret.Shape();
		// circle.graphics.beginFill(0x0000ff);
		// circle.graphics.drawCircle(50,49,38);
		// circle.graphics.endFill();
		// this.addChild(circle);
		// icon.mask = circle;
		// this.cacheAsBitmap = true;
		// icon.x = 10;
		this.addChild(icon);

		if( this._skincfg && Api.servantVoApi.getSkinOneRed(this._skincfg.servantId,this._skinId))
		{
			let skillDotSp = BaseBitmap.create("public_dot2");
			skillDotSp.x = 80 ;
			skillDotSp.y = 5;
			skillDotSp.name = "skillDotSp";
			this.addChild(skillDotSp);
		}
		// if(Api.switchVoApi.checkOpenSkinLvup()){
		// 	this.refreshLv();
		// }
	}

    protected bgSwitchHandler(params:any)
    {
        let sid = params.data.skinId;
        if(sid == this._skinId)
        {
            this._iconBg.texture = ResourceManager.getRes("wifeview_hongyantyouxiang3");
            this._isDown = true;
        }else{
            this._iconBg.texture = ResourceManager.getRes("wifeview_hongyantyouxiang1");
            this._isDown = false;
        }
    }

    protected bgTouchHandler()
    {
        if(this._isDown)
        {
            return;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH,{skinId:this._skinId});
		if(this._skincfg && Api.servantVoApi.getSkinOneRed(this._skincfg.servantId,this._skinId))
		{
			NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_REDSKINRED,{servantId:this._skincfg.servantId,servantSkinId:this._skinId});
			this.getChildByName("skillDotSp").visible = false;
		}
    }

	public refreshLv()
	{
		let lvTxt = <BaseBitmapText>this.getChildByName("lvTxt");
		if(!lvTxt){
			let iconBg = <BaseBitmap>this.getChildByName("bg2");
			let lvimg = BaseLoadBitmap.create("skin_lv_img");
			lvimg.x = iconBg.x + iconBg.width/2 - 30;
			lvimg.y = iconBg.y + iconBg.height - 30;
			this.addChild(lvimg);
			
			lvTxt = <BaseBitmapText>ComponentManager.getBitmapText("","tip_fnt");
			lvTxt.setScale(0.7);
			lvTxt.name = "lvTxt";
			lvTxt.x = lvimg.x + 41;
			lvTxt.y = lvimg.y+1 ;
			this.addChild(lvTxt);
		}
		// 等级信息 
		if(this._skincfg && Api.servantVoApi.isOwnSkinOfSkinId( this._skinId)){
			lvTxt.text = "" + Api.servantVoApi.getServantSkinLV(this._skinId) ;
		}else{
			lvTxt.text = "";
		}
	}
	public getSpaceX():number
	{
		return 5;
	}

	public dispose():void
	{
         App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH,this.bgSwitchHandler,this);
        this._skincfg = null;
        this._skinId = null;
        this._iconBg = null ;
        this._isDown = false;

		super.dispose();
	}
}