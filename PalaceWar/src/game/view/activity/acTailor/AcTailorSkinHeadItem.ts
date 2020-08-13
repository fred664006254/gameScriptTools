/**
 * 裁缝 皮肤
 * author yanyuling
 * date 2018/03/01
 * @class AcTailorSkinHeadItem
 */
class AcTailorSkinHeadItem extends BaseDisplayObjectContainer
{
    private _skinId:string;
    private _headBg:BaseBitmap;
    private _ownBg:BaseBitmap;
    private _ownTxt:BaseTextField;

    public constructor()
	{
		super();
	}
	public init(skinId:string|number):void
	{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG,this.refreshStatus,this);

        this._skinId = "" + skinId;
        // let skinCfg = GameConfig.config.wifeskinCfg[this._skinId];
        let skinCfg =  Config.WifeskinCfg.getWifeCfgById(this._skinId);
        this._headBg = BaseBitmap.create("tailor_iconBtn");
        this._headBg.addTouchTap(this.bgClickHandler,this);
        this.addChild(this._headBg);

        let headImg = BaseLoadBitmap.create("wife_skinhalf_"+this._skinId);
        headImg.width = 205;
        headImg.height = 196;
        let tailor_headmask = BaseBitmap.create("tailor_headmask");
        let container = new BaseDisplayObjectContainer();
        container.addChild(tailor_headmask);
        this.addChild(container);
        headImg.setScale(0.5);
        headImg.anchorOffsetX = headImg.width/2;
        headImg.x = this._headBg.x + this._headBg.width/2;
        headImg.y =5;
        container.x = 17;
        container.y = 12;
        headImg.mask = tailor_headmask;
        this.addChild(headImg);

        this._ownBg = BaseBitmap.create("tailor_namebg");
        this._ownBg.visible = false;
        this._ownBg.x = this._headBg.x + this._headBg.width/2 - this._ownBg.width/2;
        this._ownBg.y = this._headBg.y +this._headBg.height - 35;
        this.addChild(this._ownBg);
       
        this._ownTxt =  ComponentManager.getTextField(LanguageManager.getlocal("acTailOwn"),20,TextFieldConst.COLOR_QUALITY_GREEN);
        this._ownTxt.visible = false;
        this._ownTxt.x = this._ownBg.x + this._ownBg.width/2 - this._ownTxt.width/2;
        this._ownTxt.y = this._ownBg.y + 5;
        this.addChild(this._ownTxt);
        this.cacheAsBitmap = true;
    }

    protected bgClickHandler()
    {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG,this._skinId);
    }
    protected refreshStatus(params:any)
    {
        let tmpskinId = params.data;
        let isOwn = Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._skinId);

        if(tmpskinId == this._skinId)
        {
            this._headBg.texture = ResourceManager.getRes("tailor_iconBtn_down");
        }else{
            this._headBg.texture = ResourceManager.getRes("tailor_iconBtn");
        }
        if(isOwn)
        {
            this._ownBg.visible = true;
            this._ownTxt.visible = true;
        }else{
            this._ownBg.visible = false;
            this._ownTxt.visible = false;
        }
    }

    public dispose()
    {
         App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG,this.refreshStatus,this);
         this.cacheAsBitmap = false;
        this._skinId = "";
        this._headBg = null;
        this._ownBg = null;
        this._ownTxt = null;
        
        super.dispose();
    }
}