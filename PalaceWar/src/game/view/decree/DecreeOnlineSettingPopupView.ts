class DecreeOnlineSettingPopupView  extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _public_select:BaseBitmap;
    private _isSel:boolean=false;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_OTHER_INFO_BANEMMSG),this.switchCallBack,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg41");
		bg.width = 526;
		bg.height = 144;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this._nodeContainer.addChild(bg);

		let res = "public_select";
		this._isSel = Api.otherInfoVoApi.isEmpireOnlineNotice();
		if( this._isSel ){
			res = "public_select_down";
		}
        let public_select  = BaseBitmap.create(res);
		public_select.width = public_select.height = 38;
		public_select.x = bg.x + 20;
		public_select.y = bg.y + 15;
		this._nodeContainer.addChild(public_select);
        this._public_select = public_select;
        this._public_select.addTouchTap(this.switchStatus,this);
		
		let txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt1.text = LanguageManager.getlocal("decreeonline_txt");
		txt1.x = public_select.x + public_select.width + 10;
		txt1.y = public_select.y +public_select.height/2 -txt1.height/2;
		this._nodeContainer.addChild(txt1);
		
		let txt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		txt.multiline = true;
		txt.lineSpacing = 6;
		txt.width = bg.width - 40;
		txt.x = bg.x + 20;
		txt.y = public_select.y +public_select.height+ 10;
		txt.text = LanguageManager.getlocal("decreeonline_tip1");
		this._nodeContainer.addChild(txt);

		let goBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.goHandler,this);
		goBtn.x = bg.x + bg.width/2 - goBtn.width/2;
		goBtn.y = bg.y + bg.height + 25;
		goBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._nodeContainer.addChild(goBtn);
	}

	protected getBgExtraHeight():number
	{
		return 30;
	}

	protected switchStatus()
    {
        let tarRes = "public_select_down";
        if(this._isSel){
            tarRes = "public_select";
        }
        this._isSel = !this._isSel;
        this._public_select.texture = ResourceManager.getRes(tarRes);
    }

	protected switchCallBack(event:egret.Event)
    {
        if (event && event.data && event.data.ret){
			let ret = event.data.data.ret
			if (ret == 0 )
			{
				this.showNotiMsg();
			}
		}
		this.hide();
	}

	protected showNotiMsg()
	{
		if(Api.otherInfoVoApi.isEmpireOnlineNotice()){
			App.CommonUtil.showTip(LanguageManager.getlocal("decreeonline_tip_on"));
		}else{
			App.CommonUtil.showTip(LanguageManager.getlocal("decreeonline_tip_off"));
		}
	}
    protected getShowHeight():number
    {
        return 300;
    }

	//需要针对每个任务处理跳转关系
	protected goHandler()
	{
		if(Api.otherInfoVoApi.isEmpireOnlineNotice() == this._isSel){
			this.showNotiMsg();
			this.hide();
			return;
		}
		let flag = this._isSel ? 0 : 1;
		NetManager.request(NetRequestConst.REQYEST_OTHER_INFO_BANEMMSG,{banFlag:flag});
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_OTHER_INFO_BANEMMSG),this.switchCallBack,this);
		this._nodeContainer = null;

		super.dispose();
	}
}