

class QinafuPopupView  extends PopupView
{

    private _inputTextField:BaseTextField = null;

    public constructor() 
	{
		super();
	}

	protected getTitleStr():string
	{
		return "qianfuViewTitle";
	}

	protected getCloseBtnName():string
	{
		return null;
	}

    protected initView():void
    {

        let desc = ComponentManager.getTextField(LanguageManager.getlocal("qianfuPopupViewDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		desc.width = 470;
		desc.lineSpacing = 5;
		desc.textAlign = egret.HorizontalAlign.CENTER;
		desc.setPosition(this.viewBg.width/2-desc.width/2,30);
		this.addChildToContainer(desc);

        let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,340,44,"public_9_bg5");
		inputTF.x = this.viewBg.width/2 - 250;
		inputTF.y = desc.y+desc.height + 50;
		
		this.addChildToContainer(inputTF);

		let limiisshow = this.param.data.limiisshow;
		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.text = limiisshow;
        this._inputTextField.type = egret.TextFieldType.INPUT;
        this._inputTextField.addEventListener(egret.TextEvent.CHANGE,()=>{
            this._inputTextField.text = limiisshow;
        }, this, false, 2);

		//查找按钮
		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"bureaucratGuide_copy",this.confirmClick,this);
		confirmBtn.setPosition(this.viewBg.width/2 +102, inputTF.y+inputTF.height/2-confirmBtn.height/2);
		this.addChildToContainer(confirmBtn);
    }

    private confirmClick():void
	{   
        // if(window["clipboardData"]){
        //     window["clipboardData"].setData("text", this._inputTextField.text);
        //     App.CommonUtil.showTip(LanguageManager.getlocal("qianfuCopySuccess"));
        // }
        // else
        // {
        //      App.CommonUtil.showTip(LanguageManager.getlocal("qianfuCopyFail"));
        // }

		var input = document.createElement("input");
        input.value = this._inputTextField.text;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
        document.execCommand('Copy');
        document.body.removeChild(input);
		App.CommonUtil.showTip(LanguageManager.getlocal("welfareViewQQGroup5"));

		if (PlatformManager.checkIsWanbaSp())
		{
			RSDKHelper.openUrl("https://1106558780.urlshare.cn/home?_proxy=1&_wv=2147628839&_offline=1",null,null);
		}
	}

   public dispose():void
	{	 
		this._inputTextField = null;

		super.dispose();
	}
}