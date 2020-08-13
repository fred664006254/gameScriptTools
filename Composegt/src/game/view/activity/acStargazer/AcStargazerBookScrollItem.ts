/**
 * author yanyuling
 */

class AcStargazerBookScrollItem extends BaseDisplayObjectContainer 
{
	public constructor() 
	{
		super();
	}
	private _skincfg = undefined;
    private _skinId:string = undefined;
	private _servantId:string;
	private _bookId:string;
	public init(skinId:string|number,index:number,serId:string):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY),this.collectHandlerCallBack,this);

        this._skinId = ""+skinId;
		this._servantId = serId;
		let serSkincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let addAbility = serSkincfg.addAbility;
		this._bookId = addAbility[index];
		
		let blv = Api.servantVoApi.getSerSkinBookId(this._skinId,this._bookId);
		
		let bookcfg = GameConfig.config.abilityCfg[this._bookId];

				
		let bookprobg:BaseBitmap = BaseBitmap.create("public_9v_bg09");
		bookprobg.width = 500;
		bookprobg.height = 110;
		// bookprobg.x = this.viewBg.x + this.viewBg.width/2 - bookprobg.width/2;
		bookprobg.y = 0;
		this.addChild(bookprobg);

		let leftBg = BaseBitmap.create("public_left");
		leftBg.width = 109;
		leftBg.height = bookprobg.height - 12;
		leftBg.x = 5.5;
		leftBg.y = 5.5;
		this.addChild(leftBg);
		// let bookprobg = BaseBitmap.create("public_9_managebg");
		// bookprobg.width = 552;
		// bookprobg.height = 74;
		// this.addChild(bookprobg);
		// bookprobg.addTouchTap(this.bookTouchHandler , this,[this._bookId]);

		let bicon =  BaseLoadBitmap.create("servant_infoPro"+bookcfg.type); 
		bicon.width = 80;
		bicon.height = 90;
		bicon.x = bookprobg.x +20;
		bicon.y = bookprobg.y +bookprobg.height/2 - bicon.height/2;
		this.addChild(bicon);

		let starsp = this.getServantBookStars(bookcfg.num);
		starsp.x = leftBg.x + leftBg.width +15;
		starsp.y = bicon.y + 70;
		this.addChild(starsp);

		let bnameTxt =   ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		bnameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + this._bookId) + "Lv" + blv;
		bnameTxt.x = leftBg.x + leftBg.width +15;
		bnameTxt.y = bookprobg.y + 10;
		bnameTxt.name = "bnameTxt";
		this.addChild(bnameTxt);

		let bnameTypeTxt =   ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN);
		bnameTypeTxt.text = LanguageManager.getlocal("servantInfo_attrTxt" + bookcfg.type) + " "+  (bookcfg.num * blv);
		bnameTypeTxt.x = bnameTxt.x  ;
		bnameTypeTxt.y = bnameTxt.y + 35;
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
