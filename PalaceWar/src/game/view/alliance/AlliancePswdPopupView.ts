/**
 * 帮会密码
 * author dky
 * date 2017/12/2
 * @class AlliancePswdPopupView
 */
class AlliancePswdPopupView  extends PopupView
{   
    private _type:number;
	private _useCallback:Function;
	private _handler:any;

	private _inputTextField:BaseTextField;

    private _cancelBtn:BaseButton;
	private _errorText:string;
	private _initName = "";

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

        let curName = this.param.data.name
		let disAdd = 0;
        if(curName){

        }else{
            curName = "测试测试";
        }
       
		if(this._type == 2){
			disAdd = 20;
		}

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 224;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

        let changeName1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		changeName1.text = LanguageManager.getlocal("alliance_pswd");
		changeName1.x = 105+GameData.popupviewOffsetX;
		changeName1.y = 55;
		this.addChildToContainer(changeName1);

		
        //输入框
        
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,369,45,"public_9_bg5",LanguageManager.getlocal("alliance_pswdHolder"),0xb1b1b1);

		inputTF.x = this.viewBg.x + this.viewBg.width/2 - inputTF.width/2;
		inputTF.y = bg.y + bg.height/2 - inputTF.height/2 - disAdd;
		this.addChildToContainer(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.maxChars = 6;
		this._inputTextField.restrict="0-9";



	
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"cancelBtn",this.clickCancelHandler,this);
		this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._cancelBtn.x = this.viewBg.x + this.viewBg.width/4 - this._cancelBtn.width/2;
		this._cancelBtn.y = bg.y + bg.height + 15;
		this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);

		
	}


	protected clickConfirmHandler(data:any):void
	{
		let allianceVo = Api.allianceVoApi.getAllianceVo();
		let txtStr:string=this._inputTextField.text;
		if(!this._inputTextField.bindData){
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_pswdHolder"));
			return;
		}

		if(txtStr != allianceVo.pswd.toString())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_pswdError"));
			return;
		}
		
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW,{type:2,pswd:txtStr,title:"allianceManageBtn4"});
		
		this.hide();
	}

    private clickCancelHandler(param:any):void
	{
		// if(this._cancelCallback)
		// {
		// 	this._cancelCallback.apply(this._handler,[]);
		// }


		this.hide();
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }
    protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
	}

    protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}
    protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}
    protected getTitleStr(){
        return "allianceManageBtn4";
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["shield_cn"]);
	}
	
	public dispose():void
	{
		this._type = null;
		this._useCallback = null;
		this._handler = null;

		this._inputTextField = null;

		this._cancelBtn = null;
		this._errorText = null;
		this._initName = "";
		super.dispose();
	}
}