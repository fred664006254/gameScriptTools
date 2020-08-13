class AcRedPackResultView  extends PopupView
{
	private _aid = null;
	private _code = null;
    private _parentNode = null;
	private _isLvbu = false;
	private _isFour = false;
	private _isTwo = false;

	public constructor() 
	{
		super();
	}
    private get cfg() : Config.AcCfg.RedPackCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
    }
    protected get acVo():AcRedPackVo
	{
		return <AcRedPackVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);
	}
	protected initView():void
	{

		this._aid = this.param.data.aid;
		this._code = this.param.data.code;
        this._parentNode = this.param.data.parentNode;
		
		//是否还有吕布
		let isHasFirstRecharge:boolean=false//Api.rechargeVoApi.checkFirstRechargeNoLvbu(); 
		
		
		//是否打开吕布开关
		let isNewRecharge:Boolean = Api.switchVoApi.checknewRecharge(); 
		if(isNewRecharge && isHasFirstRecharge){
			this._isLvbu = true;
		}

		//是否有4倍
		this._isFour =Api.shopVoApi.getfourRateCharge();

		//充值列表
		let rechargelistCfg=Config.RechargeCfg.getNormalRechargeCfg();
		let l:number=rechargelistCfg.length;
		let rData = null;
		
		for(let i = 0;i<l;i++){
			rData = rechargelistCfg[i];
			if(!Api.shopVoApi.getPayInfoById(rData.id)){
				this._isTwo = true;
				break;
			} 
		}

		let descStr = LanguageManager.getlocal("acRedPackWinDesc1",[this.acVo.getAddgem().toString()]);

        let descText = ComponentManager.getTextField(descStr,22,TextFieldConst.COLOR_BROWN);
        descText.lineSpacing = 5;
        descText.textAlign = egret.HorizontalAlign.CENTER;
        descText.x = this.viewBg.x + this.viewBg.width/2 - descText.width/2;
        descText.y = this.viewBg.y + 20 + 50 - descText.height/2;
        this.addChild(descText);


        let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acRedPackWinRecharge",this.chargeBtnListener.bind(this),this,null,null,24);
		chargeBtn.x = this.viewBg.x + this.viewBg.width/2 - chargeBtn.width/2;
        chargeBtn.y = this.viewBg.y + 120;
        this.addChild(chargeBtn);

        let bottomText = ComponentManager.getTextField("*"+LanguageManager.getlocal("acRedPackDesc"),18,0x167b2e);
        bottomText.lineSpacing = 3;
        bottomText.textAlign = egret.HorizontalAlign.CENTER;
        bottomText.x = this.viewBg.x + this.viewBg.width / 2 - bottomText.width/2;
        bottomText.y = this.viewBg.y + this.viewBg.height - 40 - bottomText.height;
        this.addChild(bottomText);
 
        // this.container.addTouchTap(this.hide,this);
	}
	protected resetBgSize():void
	{
		super.resetBgSize();
		this.closeBtn.x = this.viewBg.x + this.viewBg.width - this.closeBtn.width/2;
		this.closeBtn.y = this.viewBg.y - this.closeBtn.width/2+10;
	}
	protected isTouchMaskClose():boolean
	{
		return true;
	}
    private chargeBtnListener():void
    {
        let t = this.acVo.et - GameData.serverTime;
        if(t<0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }   		
		if(this._isLvbu){
			ViewController.getInstance().openView(ViewConst.POPUP.FIRSTRECHARGEVIEW);
		} else {
			let viewName = App.StringUtil.firstCharToUper("recharge") ;
			ViewController.getInstance().openView(viewName+"Vip"+ "View");
		}
       
        // if(this._parentNode){
        //     this._parentNode.hide();
        // }
		this.hide();

    }
	protected getCloseBtnName():string
	{
		return ButtonConst.POPUP_CLOSE_BTN_2;
	}

	protected getTitleStr():string
	{
		return null;
	}



	/**
	 * 重写 初始化viewbg
	 */
	protected initBg(): void {
		this.viewBg = BaseLoadBitmap.create("redpack_resultbg");
		this.viewBg.width = 572;
		this.viewBg.height = 284;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
        this.viewBg.addTouchTap(()=>{},this);

        let wordBM = BaseBitmap.create("tailor_get_word");
        wordBM.x = GameConfig.stageWidth/2 - wordBM.width/2;
        wordBM.y = this.viewBg.y - 200;

        this.addChild(wordBM);
	}


	public dispose():void
	{
		this._aid = null;
		this._code = null;

        this._parentNode = null;
		this._isLvbu = false;
		this._isFour = false;
		this._isTwo = false;
		super.dispose();
	}
}