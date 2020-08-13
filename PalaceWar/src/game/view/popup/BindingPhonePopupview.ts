class BindingPhonePopupview  extends PopupView
{

    private _phoneInput:BaseTextField = null;
    private _codeInput:BaseTextField = null;

    private _getcodeBtn:BaseButton = null;

    private _cdtime:number = 0;

    public constructor() 
	{
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
             "realnamerewards_bg","public","button",
                "realnamerewards_frame",	
        ]);
	}

	public initView():void
	{   
        this.closeBtn.visible = false;

        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 520;
		itemBg.height = 310;
        itemBg.setPosition(this.viewBg.width/2  - itemBg.width/2, 20);
		this.addChildToContainer(itemBg);

        let desc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("bindingPhoneDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		desc.width = this.viewBg.width - 100;
        desc.lineSpacing = 4;
        desc.setPosition(50 +GameData.popupviewOffsetX, 42);
		this.addChildToContainer(desc);


        let nameTF:BaseDisplayObjectContainer = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL,320,40,"realnamerewards_frame",LanguageManager.getlocal("bindingPhone_input1"),TextFieldConst.COLOR_GRAY_LIGHT);
        nameTF.x = 50+GameData.popupviewOffsetX;
        nameTF.y = desc.y+desc.height+40;
        this.addChildToContainer(nameTF);
        this._phoneInput = <BaseTextField>nameTF.getChildByName("textField");

        this._phoneInput.inputType = egret.TextFieldInputType.TEL;

        this._getcodeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"bindingPhone_send",this.sendBtnClick,this);
        this._getcodeBtn.setPosition(nameTF.x+nameTF.width+16,nameTF.y);
        this.addChildToContainer(this._getcodeBtn);



        // 身份证
        let idTF:BaseDisplayObjectContainer = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL,320,40,"realnamerewards_frame",LanguageManager.getlocal("bindingPhone_input2"),TextFieldConst.COLOR_GRAY_LIGHT);
        idTF.x = 50+GameData.popupviewOffsetX;
        idTF.y = nameTF.y+50;
        this.addChildToContainer(idTF);
        this._codeInput = <BaseTextField>idTF.getChildByName("textField");
        this._codeInput.inputType = egret.TextFieldInputType.TEL;

        let submitBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"bindingPhoneSend",this.okBtnClick,this);
        submitBtn.setPosition(this.viewBg.width/2-submitBtn.width/2,idTF.y+70);
        this.addChildToContainer(submitBtn);

    }

    private sendBtnClick():void
    {   
        if (!App.CommonUtil.isPhoneNum(this._phoneInput.text))
        {   
            App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_noid"));
            return;
        }

        PlatformManager.sendMobileCode(Number(this._phoneInput.text),null,null);

        this._cdtime = 60;
       
        this._getcodeBtn.setEnable(false);
        this.updateTime();
    }

    private updateTime():void
    {
        if (this._cdtime>0)
        {
            let text =  App.DateUtil.getFormatBySecond(this._cdtime,3);
			this._getcodeBtn.setText(text,false);
            egret.Tween.get(this._getcodeBtn).wait(1000).call(this.updateTime,this);
        }
        else
        {
            this._getcodeBtn.setEnable(true);
            this._getcodeBtn.setText("bindingPhone_send");
        }

        this._cdtime--;
    }

    private okBtnClick():void
    {   
        if (!App.CommonUtil.isPhoneNum(this._phoneInput.text))
        {   
            App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_noid"));
            return;
        }
        if (!App.CommonUtil.isCerCode(this._codeInput.text))
        {   
            App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_nocode"));
            return;
        }

        PlatformManager.checkMobileCode(Number(this._phoneInput.text),Number(this._codeInput.text),this.checkCallback,this);

    }   

    private checkCallback():void
    {   

        let reqData:any={t:"setphonenumber",pid:LoginManager.getLocalUserName(),phonenumber:this._phoneInput.text};
        let that = this;
        NetManager.http.get(ServerCfg.svrCfgUrl,reqData,(newdata:any)=>{
                that.hide();
                GameData.hasPhone = 1;
                App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_code_pass"));
            }, ()=>{
                NetLoading.hide();
                
            }, this);

        
        // let reqStr:any=ServerCfg.svrCfgUrl+"setphonenumber?pid="+LoginManager.getLocalUserName()+"&phonenumber="+this._phoneNum;
        // let that = this;
        // NetManager.http.post(reqStr,{},(newdata:any)=>{
        //         that.hide();
        //         App.CommonUtil.showTip(LanguageManager.getlocal("bindingPhone_code_pass"));
        //     }, ()=>{
        //         NetLoading.hide();
                
        //     }, this);
    }

    protected getBgExtraHeight():number
	{
		return 20;
	}

    public dispose():void
	{	 
        this._phoneInput = null;
        this._codeInput = null;
        this._getcodeBtn = null;
        this._cdtime = 0
        
		super.dispose();
	}
}