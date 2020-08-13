/**
 * 皇宫编辑签名历史
 * author yanyuling
 * date 2017/11/02
 * @class PalaceEditSignPopupView
 */
class PalaceEditSignPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _inputTextField:BaseTextField;
    public constructor() 
	{
		super();
	}

	public initView():void
	{	
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_CROSS_SIGN),this.editBtnhandlerCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_SIGN),this.editBtnhandlerCallback,this);
        let uiData =  this.param.data;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let tarWidth = 520;
        let tarHeight = 100;
         //输入框
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_CONTENT_SMALL,tarWidth,tarHeight,"public_9_bg4",LanguageManager.getlocal("palace_editTip"),TextFieldConst.COLOR_WHITE);
        inputTF.x = this.viewBg.x + this.viewBg.width/2 -tarWidth/2;
		inputTF.y = 9 ;
        let textField = inputTF.getChildByName("textField");
        // textField.y -= 30;
		this._nodeContainer.addChild(inputTF);
		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
        // this._inputTextField.height = tarHeight;
        // this._inputTextField.width = tarWidth;
		this._inputTextField.maxChars = 20;

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("palace_editTip2"),20,TextFieldConst.COLOR_BROWN);
        tipTxt.x = this.viewBg.x + this.viewBg.width/2 -tipTxt.width/2;
        tipTxt.y = inputTF.y + tarHeight + 9;
        this._nodeContainer.addChild(tipTxt);

        let editBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.editBtnhandler,this);
		editBtn.x = inputTF.x + tarWidth/2 - editBtn.width/2;
		editBtn.y =tipTxt.y +tipTxt.height + 15;
		// editBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._nodeContainer.addChild(editBtn);

    }
    protected editBtnhandlerCallback(event:egret.Event)
    {
        let titleId = this.param.data
        Api.palaceVoApi.updateRoleSign(titleId,this._inputTextField.text);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_REFRESHSIGN_AFTER_EDIT,titleId);
        App.CommonUtil.showTip(LanguageManager.getlocal("palace_edit_succeed"));
        this.hide();
    }
    protected editBtnhandler()
    {
        if(!this._inputTextField.bindData )
		{
			this._inputTextField.bindData = "";
            this._inputTextField.text = "";
		}	
        if(Config.ShieldCfg.checkOnlyShield(this._inputTextField.text)==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }

        // titleId 对应的称号
        let titleId = this.param.data
        let cfg = Config.TitleCfg.getTitleCfgById(titleId);
        // if(Config.TitleCfg.isTheKingTitleId(titleId)){
        //      NetManager.request(NetRequestConst.REQUEST_POLICY_SETSIGN,{sign:this._inputTextField.text,titleId : this.param.data});
        //      this.hide();
        //      return;
        // }
        if(cfg.isCross == 1){
            NetManager.request(NetRequestConst.REQUEST_PALACE_CROSS_SIGN,{sign:(this._inputTextField.text).replace(/\s+/g,""),titleId : this.param.data})
        }else{
            NetManager.request(NetRequestConst.REQUEST_PALACE_SIGN,{sign:this._inputTextField.text,titleId : this.param.data})
        }

    }

     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "shield_cn",
		]);
	}

	public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_CROSS_SIGN),this.editBtnhandlerCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_SIGN),this.editBtnhandlerCallback,this);
        this._nodeContainer = null;
        this._inputTextField = null;

        super.dispose();
    }
}