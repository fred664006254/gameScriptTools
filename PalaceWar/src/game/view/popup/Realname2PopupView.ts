class Realname2PopupView  extends PopupView
{
    private _okBtn:BaseButton =null;
    private _cancelBtn:BaseButton =null;
    private _nameInput:BaseTextField = null;
    private _idInput:BaseTextField = null;
    public constructor() 
	{
		super();
	}

	public initView():void
	{	
        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 528;
		bg.height = 230; 
        bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 20
        this.addChildToContainer(bg);         
		
        // 姓名
		var nameTF:BaseTextField = new BaseTextField();
		nameTF.x = 50+GameData.popupviewOffsetX;
		nameTF.y = bg.y + bg.height/2 - nameTF.height/2 - 50;
		nameTF.text = LanguageManager.getlocal("realname_name");
		this.addChildToContainer(nameTF);

		var nameBg:egret.Shape=new egret.Shape();
		nameBg.graphics.beginFill(TextFieldConst.COLOR_LIGHT_RED,1);
		nameBg.graphics.drawRect(0,0,340,50);
		nameBg.graphics.endFill();

		nameBg.graphics.beginFill(TextFieldConst.COLOR_BLACK,1);
		nameBg.graphics.drawRect(1,1,338,48);
		nameBg.graphics.endFill();
		nameBg.x = 150+GameData.popupviewOffsetX;
		nameBg.y = nameTF.y + nameTF.height/2 - nameBg.height/2;
		this.addChildToContainer(nameBg);
		
		var nameInput:BaseTextField = new BaseTextField();
		nameInput.type = egret.TextFieldType.INPUT;
		nameInput.width = 320;
		nameInput.height = nameTF.height;
		nameInput.x = 160+GameData.popupviewOffsetX;
		nameInput.y = nameBg.y+nameBg.height/2 - nameInput.height/2;
		this.addChildToContainer(nameInput);
        this._nameInput = nameInput;

        // 身份证
		var idTF:BaseTextField = new BaseTextField();
		idTF.x = 50+GameData.popupviewOffsetX;
		idTF.y = bg.y + bg.height/2 - idTF.height/2 + 50;
		idTF.text = LanguageManager.getlocal("realname_id");
		this.addChildToContainer(idTF);

		var idBg:egret.Shape=new egret.Shape();
		idBg.graphics.beginFill(TextFieldConst.COLOR_LIGHT_RED,1);
		idBg.graphics.drawRect(0,0,340,50);
		idBg.graphics.endFill();

		idBg.graphics.beginFill(TextFieldConst.COLOR_BLACK,1);
		idBg.graphics.drawRect(1,1,338,48);
		idBg.graphics.endFill();
		idBg.x = 150+GameData.popupviewOffsetX;
		idBg.y = idTF.y + idTF.height/2 - idBg.height/2;
		this.addChildToContainer(idBg);
		
		var idInput:BaseTextField = new BaseTextField();
		idInput.type = egret.TextFieldType.INPUT;
		idInput.width = 420;
		idInput.height = idTF.height;
		idInput.x = 160+GameData.popupviewOffsetX;
		idInput.y = idBg.y + idBg.height/2 - idInput.height/2;
		this.addChildToContainer(idInput);
        this._idInput = idInput;

        this._okBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.okBtnClick,this);
        this._okBtn.x = bg.x+bg.width/2-this._okBtn.width/2;
        this._okBtn.y = bg.y+bg.height -this._okBtn.height/2+55;
        this.addChildToContainer(this._okBtn);  

        // this._cancelBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"cancelBtn",this.cancelBtnClick,this);
        // this._cancelBtn.x = bg.x+bg.width/2-this._cancelBtn.width/2 -100;
        // this._cancelBtn.y = bg.y+bg.height -this._cancelBtn.height/2+55;
        // this.addChildToContainer(this._cancelBtn);  

		if (this.param && this.param.data && this.param.data.hidecancle == true)
		{	
			if (this.closeBtn)
			{
				this.closeBtn.visible = false;
			}
		}
        
    }
    /** 点击确认 */
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
	// 点击关闭按钮的处理
	protected closeHandler()
	{
		if (LoginManager.isCreateScene) {
			// 如果是在游戏内，则关闭不处理东西
			super.closeHandler();
			return ;
		}
		if (GameData.idcardNormal === 1) {
			// 正常模式
			Realname2PopupView.showTipDialog();
			super.closeHandler();
		} else {
			// 简易模式
			Api.realnameVoApi.setIdcardInfo(null, null, RealnameConst.USERTYPE_1, (err)=>{
				if (!err) {
					App.CommonUtil.showTip(LanguageManager.getlocal("realname_enter_with_type1"));
					GameData.idcardType = RealnameConst.USERTYPE_1;
					super.closeHandler();
				} else {
					App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
				}
			});
		}
	}
	public dispose():void
	{ 	
        this._okBtn=null;
        this._cancelBtn=null;
        super.dispose();
    }
    public static showTipDialog() 
    {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"realname2TipTitle",
            msg:LanguageManager.getlocal(GameData.idcardNormal === 0?"realname_info_easy":"realname_info_normal"),
            callback:()=>{
                ViewController.getInstance().openView(ViewConst.POPUP.REAlNAME2POPUPVIEW);
            },
            cancelcallback:()=>{
                console.log("clickcancel");
				GameData.idcardType = RealnameConst.USERTYPE_1;
				App.CommonUtil.showTip(LanguageManager.getlocal("realname_enter_with_type1"));
				Api.realnameVoApi.setIdcardInfo(null, null, GameData.idcardType, (err)=>{
					if (err) {
						App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
					}
				});
            },
            closecallback:()=>{
                console.log("clickclose");
				GameData.idcardType = RealnameConst.USERTYPE_1;
				App.CommonUtil.showTip(LanguageManager.getlocal("realname_enter_with_type1"));
				Api.realnameVoApi.setIdcardInfo(null, null,GameData.idcardType, (err)=>{
					if (err) {
						App.CommonUtil.showTip(LanguageManager.getlocal("realname_neterror"));
					}
				});
            },
            handler:RSDKHelper,
            height:200,
            needClose:GameData.idcardNormal === 0?1:0,
            needCancel:1,
			canelTxt:"realname_guest_login",
			confirmTxt:"realname_goto"
        });
    }
}