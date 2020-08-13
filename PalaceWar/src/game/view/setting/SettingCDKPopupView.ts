/**
 * 设置联系我们
 * author dky
 * date 201711/10
 * @class SettingCDKPopupView
 */
class SettingCDKPopupView  extends PopupView
{   
    private _inputTextField:BaseTextField;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{


		
		//输入框
        
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,400,45,"public_9_bg5",LanguageManager.getlocal("settingCDKTip"),0xb1b1b1);

		inputTF.x = this.viewBg.x + this.viewBg.width/2 - inputTF.width/2;
		inputTF.y = 30;
		this.addChildToContainer(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		// this._inputTextField.maxChars = 8;

		let sendBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"settingCDKget",this.sentBtnClick,this);
		sendBtn.x = inputTF.x + inputTF.width/2 - sendBtn.width/2;
		sendBtn.y = inputTF.y + inputTF.height + 20;
		sendBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(sendBtn);

		
	}

	 private sentBtnClick()
    {

		// if(!this._inputTextField.bindData)
		// {

		// 	return;
		// }	
		 if(this._inputTextField.text.length <= 0)
		{

			return;
		}	

		this.request(NetRequestConst.REQUEST_USER_EXCHANGECARD, { id:this._inputTextField.text });

	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(data.data.data.flag == 1){
			App.CommonUtil.showTip(LanguageManager.getlocal("settingCDKgetMsg1") );
			return;
		}
		if(data.data.data.flag == 2){
			App.CommonUtil.showTip(LanguageManager.getlocal("settingCDKgetMsg2") );
			return;
		}
		if(data.data.data.flag == 3){
			App.CommonUtil.showTip(LanguageManager.getlocal("settingCDKgetMsg3") );
			return;
		}
		if(data.data.data.flag == 4){
			App.CommonUtil.showTip(LanguageManager.getlocal("settingCDKgetMsg4") );
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,data.data.data.rewards);
		// let rewards = "2_1_88888|6_1040_1|6_1041_1"
		// ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,rewards);
		// let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
		
		// App.CommonUtil.playRewardFlyAction(rewardList);
	}
	public dispose():void
	{
	

		super.dispose();
	}
}