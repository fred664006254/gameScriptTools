class QianfuView  extends PopupView
{

	private _inputTextField:BaseTextField = null;

    public constructor() 
	{
		super();
	}

    protected get uiType():string
	{
		return "2";
	}

    protected initView():void
    {
        let desc = ComponentManager.getTextField(LanguageManager.getlocal("qianfuViewDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		desc.width = 470;
		desc.lineSpacing = 5;
		desc.textAlign = egret.HorizontalAlign.CENTER;
		desc.setPosition(this.viewBg.width/2-desc.width/2,30);
		this.addChildToContainer(desc);

		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,350,44,"public_9_bg5",LanguageManager.getlocal("qianfuInput"),0xa4917f);
		inputTF.x = this.viewBg.width/2 - inputTF.width/2;
		inputTF.y = desc.y+desc.height + 35;
		
		this.addChildToContainer(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.restrict = "A-Z a-z 0-9";
		this._inputTextField.maxChars = 20;

		//查找按钮
		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"confirmBtn",this.confirmClick,this);
		confirmBtn.setPosition(this.viewBg.width/2 - confirmBtn.width/2, inputTF.y+inputTF.height+15);
		this.addChildToContainer(confirmBtn);
    }

	private confirmClick():void
	{
		if (this._inputTextField.text.length < 1) {
			App.CommonUtil.showTip(LanguageManager.getlocal("qianfuInput"));
			return;
		}
		this.request(NetRequestConst.REQUEST_USER_SETBIND,{limiisshow:this._inputTextField.text});

	}

	protected receiveData(data: { ret: boolean, data: any }): void 
	{
		if (data.ret == true) {

			let flag = data.data.data.flag;

			if (flag == 2)
			{	
				App.CommonUtil.showTip(LanguageManager.getlocal("qianfuSuccess"));
				this.hide();
				LoginManager.changeServer();

			}
			else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("qianfuFail"));
			}
		}
	}

	protected getBgExtraHeight():number
	{
		return 20;
	}

	public dispose():void
	{	 
		this._inputTextField = null;

		super.dispose();
	}
}