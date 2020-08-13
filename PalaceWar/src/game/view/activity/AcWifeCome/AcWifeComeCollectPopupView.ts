class AcWifeComeCollectPopupView extends PopupView
{

	private _bgHeight:number = 0;
    private _callback = null;
	public constructor() 
	{
		super();
	}
	
	public initView():void
	{
		let vo = <AcWifeComeVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 200;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);


        let deltaScale = 1.0;
        let cardbg = BaseBitmap.create("itembg_1");
        cardbg.width = 100; 
        cardbg.height = 100; 
        cardbg.x = this.viewBg.x + this.viewBg.width/2 - cardbg.width/2;
        cardbg.y = bg.y + 15;
        cardbg.name = "cardbg";
        this.addChildToContainer(cardbg);

        //  let isOwn = Api.servantVoApi.getServantObj("1053");
		 let isOwn = vo.get == 1?true:false;
         let tarWidth = 205;
         let tarHeight = 196;
         let iconPath = "servant_half_1053";
         let tarScale = 0.5;
         let nameStr = LanguageManager.getlocal("servant_name1053");
         
         if(isOwn){
            iconPath = "wife_half_219";
            tarWidth = 180;
            tarHeight = 177;
            tarScale = 0.5;
            nameStr = LanguageManager.getlocal("wifeName_219");
        }
        let wifeImg = BaseLoadBitmap.create(iconPath);
        wifeImg.width = tarWidth* tarScale;
        wifeImg.height = tarHeight* tarScale;
        wifeImg.x = cardbg.x + cardbg.width/2-wifeImg.width/2;
        wifeImg.y = cardbg.y+ cardbg.height/2-wifeImg.height/2-2;
        this.addChildToContainer(wifeImg); 

		this._bgHeight = bg.height;
		let messageStr:string = LanguageManager.getlocal("acWifeCome_3_collectTip",[nameStr]);

		let msgTF:BaseTextField = ComponentManager.getTextField(messageStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgTF.width = 480;
		msgTF.setColor(this.param.data.txtcolor ? this.param.data.txtcolor : TextFieldConst.COLOR_BLACK);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.lineSpacing = 10;
		msgTF.y = cardbg.y + cardbg.height*deltaScale +15;
		this.addChildToContainer(msgTF);

		let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,this.param.data.confirmTxt?this.param.data.confirmTxt:"confirmBtn",this.clickConHandler,this);
		conBtn.setColor(TextFieldConst.COLOR_BLACK);
		conBtn.x = this.getShowWidth()/2 - conBtn.width/2;
		conBtn.y = bg.y + bg.height + 20;
		this.addChildToContainer(conBtn);
		

		if(this.param.data.needCancel)
		{
			let canelStr = "cancelBtn";
			if(this.param.data.canelTxt)
			{
				canelStr = this.param.data.canelTxt;
			}
			let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,canelStr,this.clickCancelHandler,this);	
			cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
			cancelBtn.x = 80;
			cancelBtn.y = bg.y + bg.height + 20;
			this.addChildToContainer(cancelBtn);
			conBtn.x = 330;
		}
	}

	protected clickConHandler(data:any):void
	{
		let param=this.param;
		if (!param.data.clickNotAutoHide) {
			this.hide();
		}
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
	}

	protected clickCancelHandler(data:any):void
	{
		this.hide();
	}

    protected getTitleStr(){
        return "itemUseConstPopupViewTitle";
    }

	protected closeHandler()
	{
		let param = this.param;
		if(param.data.closecallback){
			param.data.closecallback.apply(param.data.handler,[this]);
		}
		super.closeHandler();
	}

	public dispose():void
	{
		this._callback = null;
		super.dispose();
	}
}