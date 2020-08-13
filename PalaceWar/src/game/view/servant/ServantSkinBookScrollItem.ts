/**
 * 门客皮肤头像
 * author yanyuling
 * date 2018/3/5
 * @class ServantSkinScrollItem
 */
class ServantSkinBookScrollItem extends BaseDisplayObjectContainer 
{
	public constructor() 
	{
		super();
	}
	private _skincfg = undefined;
    private _skinId:string = undefined;
	private _servantId:string;
	private _bookId:string;
	public init(skinId:string|number,index:number,serId:string,width?:number,isShow?:boolean):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.collectHandlerCallBack,this);

        this._skinId = ""+skinId;
		this._servantId = serId;
		let serSkincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let ability = serSkincfg.ability;
		this._bookId = ability[index];
		
		let blv = Api.servantVoApi.getSerSkinBookId(this._skinId,this._bookId);
		if (isShow) {
			blv = 1;
		}
		
		let bookcfg = GameConfig.config.abilityCfg[this._bookId];

		let bookprobg = BaseBitmap.create("public_9_managebg");
		bookprobg.width = width == null?552:width;
		bookprobg.height = 74;
		this.addChild(bookprobg);
		// bookprobg.addTouchTap(this.bookTouchHandler , this,[this._bookId]);

		let bicon =  BaseLoadBitmap.create("servant_infoPro"+bookcfg.type); 
		bicon.width = 80;
		bicon.height = 90;
		bicon.x = bookprobg.x -20;
		bicon.y = bookprobg.y +bookprobg.height/2 - bicon.height/2;
		this.addChild(bicon);

		let starsp = this.getServantBookStars(bookcfg.num);
		starsp.x = bicon.x +bicon.width/2 - starsp.width/2;
		starsp.y = bicon.y + 70;
		this.addChild(starsp);

		let bnameTxt =   ComponentManager.getTextField("",20,TextFieldConst.COLOR_BLACK);
		bnameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + this._bookId) + "Lv" + blv;
		bnameTxt.x = bicon.x + bicon.width +5;
		bnameTxt.y = bookprobg.y + 10;
		bnameTxt.name = "bnameTxt";
		this.addChild(bnameTxt);

		let bnameTypeTxt =   ComponentManager.getTextField("",18,TextFieldConst.COLOR_BLACK);
		bnameTypeTxt.text = LanguageManager.getlocal("servantInfo_attrTxt" + bookcfg.type) + " "+  (bookcfg.num * blv);
		bnameTypeTxt.x = bnameTxt.x+10 ;
		bnameTypeTxt.y = bnameTxt.y + 25;
		this.addChild(bnameTypeTxt);

	}

 	protected bookTouchHandler(obj:any,param:any)
    {
        let bid = param;
        let uidata = {
            aid:bid,
            bookId:bid,
            servantId:this._servantId,
            index:0,
            skinId:this._skinId,
            isSkin:true,
        }
         
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTBOOKLEVELUPPOPUPVIEW,uidata)
    }

	protected getServantBookStars(num:number)
	{
		let objContainer = new BaseDisplayObjectContainer;
		for (let index = 1; index <= num; index++) {
			let starImg = BaseBitmap.create("servant_star")
			starImg.setScale(0.5);
			starImg.x = (index-1) * starImg.width*0.5;
			starImg.y = 0;
			objContainer.addChild(starImg);
		}
		return objContainer;
	}
   private collectHandlerCallBack(event:egret.Event)
    {
        let rdata = event.data.data;
		if(rdata.ret != 0){
			return;
		}
        let newBlv =  Api.servantVoApi.getSerSkinBookId(this._skinId,this._bookId);
        let bnameTxt = <BaseBitmapText>this.getChildByName("bnameTxt");		
		bnameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + this._bookId) + "Lv" + newBlv;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.collectHandlerCallBack,this);
        this._skincfg = null;
        this._skinId = null;
        this._servantId = null ;
		this._bookId = null;

		super.dispose();
	}
}