/**
 * 公告编辑
 * author qianjun
 */
class CountryWarEditNoticePopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _inputTextField:BaseTextField;
    public constructor() 
	{
		super();
    }
    
    private get api():CountryWarVoApi{
        return Api.countryWarVoApi;
    }

	public initView():void
	{	
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let tarWidth = 520;
        let tarHeight = 100;
         //输入框
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_CONTENT_SMALL,tarWidth,tarHeight,"public_9_bg4",LanguageManager.getlocal("palace_editTip"),TextFieldConst.COLOR_WHITE);
        inputTF.x = this.viewBg.x + this.viewBg.width/2 -tarWidth/2;
		inputTF.y = 9 ;
        let textField = <BaseTextField>inputTF.getChildByName("textField");
        // textField.y -= 30;
		this._nodeContainer.addChild(inputTF);
		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
        this._inputTextField.height = tarHeight - 20;
        this._inputTextField.width = tarWidth-20;
        this._inputTextField.wordWrap=true;
        this._inputTextField.multiline=true;
        let inputNaxNum:number = 80;
		this._inputTextField.maxChars = inputNaxNum;

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("palace_editTip2",[String(inputNaxNum)]),20,TextFieldConst.COLOR_BROWN);
        tipTxt.x = this.viewBg.x + this.viewBg.width/2 -tipTxt.width/2;
        tipTxt.y = inputTF.y + tarHeight + 9;
        this._nodeContainer.addChild(tipTxt);

        let editBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.editBtnhandler,this);
		editBtn.x = inputTF.x + tarWidth/2 - editBtn.width/2;
		editBtn.y =tipTxt.y +tipTxt.height + 15;
		editBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._nodeContainer.addChild(editBtn);

    }

    protected getTitleStr():string{
        return 'palace_editBtn';
    }

    protected editBtnhandlerCallback(event:egret.Event)
    {
        //普通改签名
        let data = event.data.data.data;
        Api.countryWarVoApi.setAnnouce(data.announce);
        App.CommonUtil.showTip(LanguageManager.getlocal("palace_edit_succeed"));
        this.hide();
    }

    protected editBtnhandler()
    {
        if(!this._inputTextField.bindData)
		{
			this._inputTextField.bindData = "";
            this._inputTextField.text = "";
		}	
        if(Config.ShieldCfg.checkOnlyShield(this._inputTextField.text)==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }

        if(Api.countryWarVoApi.canEditNotice()){
            if(this._inputTextField.text == ''){
                App.CommonUtil.showTip(LanguageManager.getlocal("palace_editTip"));
                return;
            }
            let cost = this.api.getEditCost();
            if(cost > 0){
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    title:"itemUseConstPopupViewTitle",
                    msg:LanguageManager.getlocal('CountryWarEditTip', [cost.toString()]),
                    callback : ()=>{
                        if(Api.playerVoApi.getPlayerGem() < cost){
                            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
                            return;
                        }
                        else{
                            NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_UPDATEANNOUNCE,{
                                text : this._inputTextField.text,
                            });
                        }
                    },
                    handler : this,
                    needCancel : true
                });
            }
            else{
                NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_UPDATEANNOUNCE,{
                    text : this._inputTextField.text,
                });
            }
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
        this._nodeContainer = null;
        this._inputTextField = null;
        super.dispose();
    }
}