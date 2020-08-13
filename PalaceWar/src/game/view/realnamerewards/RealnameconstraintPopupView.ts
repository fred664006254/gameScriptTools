class RealnameconstraintPopupView  extends PopupView
{
    private _inputContainer:BaseDisplayObjectContainer = null;

    private _rechargeBtn:BaseButton = null;
    private _nameInput:BaseTextField = null;
    private _idInput:BaseTextField = null;

    public constructor() 
	{
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
                "realnamerewards_bg",
                "realnamerewards_frame","public",
                "btn_big_yellow","btn_big_yellow_down",
                "itembg_1","itembg_3","itembg_4","itembg_7",
        ]);
	}

	public initView():void
	{	
        let bg:BaseBitmap = BaseBitmap.create("realnamerewards_bg");
        bg.setPosition(this.viewBg.width/2-bg.width/2,0);
        this.addChildToContainer(bg);

        let desc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("realnamerewards_desc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		desc.width = this.viewBg.width - 50;
        desc.lineSpacing = 4;
        desc.setPosition(25+GameData.popupviewOffsetX , 12);
		this.addChildToContainer(desc);

        var rewardStr = "1_1_200|6_1150_1|6_1201_1|6_1001_5";//Config.GameprojectCfg.rewardRealName;
		let rewardIcons:Array<BaseDisplayObjectContainer> = GameData.getRewardItemIcons(rewardStr,true);
        let posX:number = this.viewBg.width/2 - rewardIcons.length*63 +9;
        for (let i:number = 0; i<rewardIcons.length ; i++)
        {
            let icon:BaseDisplayObjectContainer = rewardIcons[i];
            icon.setPosition(posX+i*124,226);
            this.addChildToContainer(icon);
        }

        this._inputContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._inputContainer);

        // 姓名
        let nameTF:BaseDisplayObjectContainer = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL,506,40,"realnamerewards_frame",LanguageManager.getlocal("realnamerewards_input1"),TextFieldConst.COLOR_GRAY_LIGHT);
        nameTF.x = this.viewBg.x + this.viewBg.width/2 - nameTF.width/2;
        nameTF.y = 390;
        this._inputContainer.addChild(nameTF);
        this._nameInput = <BaseTextField>nameTF.getChildByName("textField");

        // 身份证
        let idTF:BaseDisplayObjectContainer = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL,506,40,"realnamerewards_frame",LanguageManager.getlocal("realnamerewards_input2"),TextFieldConst.COLOR_GRAY_LIGHT);
        idTF.x = this.viewBg.x + this.viewBg.width/2 - idTF.width/2;
        idTF.y = 435;
        this._inputContainer.addChild(idTF);
        this._idInput = <BaseTextField>idTF.getChildByName("textField");


        let submitBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"submit",this.okBtnClick,this);
        submitBtn.setPosition(this.viewBg.width/2 - submitBtn.width/2,497);
        this._inputContainer.addChild(submitBtn);
       
       if (this.closeBtn)
       {
           this.closeBtn.visible = false;
       }
    }

    private okBtnClick():void
    {
        console.log("okBtnClick", this._nameInput.text, this._idInput.text);
		if ((!App.CommonUtil.isCardNo(this._idInput.text)) || (!App.CommonUtil.isTrueName(this._nameInput.text))) {
            App.CommonUtil.showTip(LanguageManager.getlocal("realname_noid"));
            return;
        }
		if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit && GameData.idcardNoFreeApiSwitch === 0) {
			RSDKHelper.realname_auth(this._idInput.text, this._nameInput.text, (ret, msg)=>{
				if (ret === 0) {
					console.log("验证成功");
					this.realnameCheckOk();
				} else {
					console.log("验证失败", msg.error);
					App.CommonUtil.showTip(msg.error);
				}
			});
		} else {
			this.realnameCheckOk();
		}
	}

    private realnameCheckOk() :void
	{
		// 是否成年
        var adult = App.CommonUtil.getAge(this._idInput.text) >= 18;

		Api.realnameVoApi.setIdcardInfo(this._idInput.text, this._nameInput.text, adult?"3":"2", (err)=>{
			if (!err) {
				App.CommonUtil.showTip(LanguageManager.getlocal("realname_ok"));
				GameData.idcardType = adult?RealnameConst.USERTYPE_3:RealnameConst.USERTYPE_2;
				if (LoginManager.isCreateScene) {
					// 如果在游戏内，就再发一下登录
					LoginManager.reLoginGame();
				}
				this.hide();

			} else {
				App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
			}
		});
    }

    private checkRecharge():void
    {
         if (Api.gameinfoVoApi.getRealnameRewards()==2)
         {
             this._rechargeBtn.setText("DragonBoatDayLq");
         }
    }

    protected getTitleStr():string
	{
		return "realname2PopupViewTitle";
	}

    protected getBgExtraHeight():number
	{
		return 0;
	}

    public dispose():void
	{	 
        this._inputContainer = null;
        this._nameInput = null;
        this._idInput = null;
        
		super.dispose();
	}
}