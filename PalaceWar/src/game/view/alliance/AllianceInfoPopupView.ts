/**
 * 帮会信息
 * author dky
 * date 2017/12/1
 * @class AllianceInfoPopupView
 */
class AllianceInfoPopupView  extends PopupView
{   

	private _inputWeixin:BaseTextField;
	private _inputQQ:BaseTextField;
	private _inputNotice:BaseTextField;
	private _inputMsg:BaseTextField;
	private _penIcon:BaseBitmap;
	private _nameTF:BaseTextField;
	private _newTex:string ="";
	private _userIdtxt:BaseTextField =null;
	private _infoMaxNum:number = 0;
	private _inputMaxText:BaseTextField = null;
	private _inputMaxText2:BaseTextField = null; 


	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		// 公告字数
		this._infoMaxNum= Config.AlliancebaseCfg.numofWords;

		let allianceVo = Api.allianceVoApi.getAllianceVo();
		// itemInfo.ic
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 643;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 25;
		this.addChildToContainer(bg);
		

		let nameStr = LanguageManager.getlocal("allianceInfoName",[allianceVo.name])
		this._nameTF = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._nameTF.x = 50+GameData.popupviewOffsetX;
		this._nameTF.y = 45;
		this.addChildToContainer(this._nameTF);

		//笔
		this._penIcon = BaseBitmap.create("public_pen_icon");
		this._penIcon.x = this._nameTF.x + this._nameTF.width + 10;
		this._penIcon.y = this._nameTF.y + this._nameTF.height/2 - this._penIcon.height/2;
		this.addChildToContainer(this._penIcon);
		this._penIcon.addTouchTap(this.reNameCilck, this);

		let info2Str = LanguageManager.getlocal("allianceFindInfo2",[allianceVo.creatorname])
		let info2TF:BaseTextField = ComponentManager.getTextField(info2Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info2TF.y = this._nameTF.y + this._nameTF.height + 10;
		info2TF.x = this._nameTF.x;
		this.addChildToContainer(info2TF);

		let allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(allianceVo.level.toString());
		let info3Str = LanguageManager.getlocal("allianceInfoLevel",[allianceVo.level.toString(),allianceVo.exp.toString(), allianceCfg.exp.toString()])
		let info3TF:BaseTextField = ComponentManager.getTextField(info3Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info3TF.y = info2TF.y + info2TF.height + 10;
		info3TF.x = this._nameTF.x;
		this.addChildToContainer(info3TF);

		let info4Str = LanguageManager.getlocal("allianceFindInfo6",[allianceVo.mn + "/" + allianceVo.maxmn])
		let info4TF:BaseTextField = ComponentManager.getTextField(info4Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info4TF.y = info3TF.y + info3TF.height + 10;
		info4TF.x = this._nameTF.x;
		this.addChildToContainer(info4TF);

		let info5Str = LanguageManager.getlocal("allianceFindInfo4",[allianceVo.wealth.toString()])
		let info5TF:BaseTextField = ComponentManager.getTextField(info5Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info5TF.y = info4TF.y + info4TF.height + 10;
		info5TF.x = this._nameTF.x;
		this.addChildToContainer(info5TF);

		//联盟微信
		let isEn = PlatformManager.checkIsEnSp();
		let weixinText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateWeixinTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		weixinText.x = 50+GameData.popupviewOffsetX;
		weixinText.y = info5TF.y + info5TF.height + 10;
		this.addChildToContainer(weixinText);
		let inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,45,"public_9_bg5",LanguageManager.getlocal(isEn ? "allianceCreateWeixinholder2" : "allianceCreateWeixinholder"),0xb1b1b1,allianceVo.cweixin);
		inputTF2.x = 50+GameData.popupviewOffsetX;;
		inputTF2.y = weixinText.y + weixinText.height + 10;
		this.addChildToContainer(inputTF2);
		this._inputWeixin = <BaseTextField>inputTF2.getChildByName("textField");
		this._inputWeixin.maxChars = isEn ? 50 : 15;


		//联盟Q群
		let qqText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateQQTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		qqText.x = 50+GameData.popupviewOffsetX;;
		qqText.y = inputTF2.y + inputTF2.height + 10;
		this.addChildToContainer(qqText);
		let inputTF3 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,45,"public_9_bg5",LanguageManager.getlocal(isEn ? "allianceCreateQQholder2" : "allianceCreateQQholder"),0xb1b1b1,allianceVo.cqq);
		inputTF3.x = 50+GameData.popupviewOffsetX;
		inputTF3.y = qqText.y + qqText.height + 10;
		this.addChildToContainer(inputTF3);
		this._inputQQ = <BaseTextField>inputTF3.getChildByName("textField");
		this._inputQQ.maxChars = isEn ? 50 : 15;


		//对内公告
		let noticeText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateNoticeTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		noticeText.x = 50+GameData.popupviewOffsetX;
		noticeText.y = inputTF3.y + inputTF3.height + 10;
		this.addChildToContainer(noticeText);
	
		//剩余输入字数 
		var newfontNum = this._infoMaxNum;
		if(allianceVo.message&&allianceVo.message.length)
		{
			newfontNum = this._infoMaxNum -allianceVo.message.length
		}
		let inputMaxText = ComponentManager.getTextField(LanguageManager.getlocal("allianceSurplus",[newfontNum+""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		inputMaxText.x = 270+GameData.popupviewOffsetX;
		inputMaxText.y = inputTF3.y + inputTF3.height + 10;
		this._inputMaxText  = inputMaxText;
		this.addChildToContainer(inputMaxText); 

		var inputTF4:BaseDisplayObjectContainer=null ;
		// if(PlatformManager.checkIsEnSp||PlatformManager.checkIsThSp())
		// { 
		// 	this._newTex ="_new";
		// }
		// else
		// {
		// 	this._newTex ="";
		// }
		inputTF4= ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_COMMON,466,100,"public_9_probiginnerbg",LanguageManager.getlocal("allianceCreateMsgholder"+this._newTex,[this._infoMaxNum+""]),0xb1b1b1,allianceVo.message);
		inputTF4.x = 50+GameData.popupviewOffsetX;
		inputTF4.y = noticeText.y + noticeText.height + 15;
		this.addChildToContainer(inputTF4);
		this._inputNotice = <BaseTextField>inputTF4.getChildByName("textField");
		this._inputNotice.y = 10;
        this._inputNotice.height = 90;
        this._inputNotice.width = 456;
		this._inputNotice.maxChars = this._infoMaxNum;
		this._inputNotice.multiline = true;
		// this._inputNotice.restrict = "^\\n";
		// this._inputNotice.multiline =false;
	 
		this._inputNotice.addEventListener(egret.TextEvent.CHANGE,this.callbackInput, this, false, 2);
		// this._inputNotice.addEventListener(egret.FocusEvent.FOCUS_IN,this.foucusHandler,this);
		// if(PlatformManager.checkIsEnSp()||PlatformManager.checkIsThSp()||PlatformManager.checkIsTWBSp())
		// {
		// 	this._inputNotice.maxChars = 150; 
		// }


		
		//联盟公告
		let msgText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateMsgTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		msgText.x = 50+GameData.popupviewOffsetX;
		msgText.y = inputTF4.y + inputTF4.height + 10;
		this.addChildToContainer(msgText);


		//对外剩余输入字数 2
		var newfontNum2 = this._infoMaxNum;
		if(allianceVo.intro&&allianceVo.intro.length)
		{
			newfontNum2 = this._infoMaxNum -allianceVo.intro.length
		}
		let inputMaxText2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceSurplus",[newfontNum2+""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		inputMaxText2.x = 270+GameData.popupviewOffsetX;
		inputMaxText2.y = msgText.y;
		this._inputMaxText2  = inputMaxText2;
		this.addChildToContainer(inputMaxText2);
		


		let inputTF5 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_COMMON,466,100,"public_9_probiginnerbg",LanguageManager.getlocal("allianceCreateMsgholder",[this._infoMaxNum+""]),0xb1b1b1,allianceVo.intro);
		inputTF5.x = 50+GameData.popupviewOffsetX;
		inputTF5.y = msgText.y + msgText.height + 15;
		this.addChildToContainer(inputTF5);
		this._inputMsg = <BaseTextField>inputTF5.getChildByName("textField");
		this._inputMsg.y = 10;
        this._inputMsg.height = 90;
        this._inputMsg.width = 456;
		this._inputMsg.maxChars = this._infoMaxNum;
		this._inputMsg.multiline = true;
		// this._inputMsg.restrict = "^\\n"; 
		this._inputMsg.addEventListener(egret.TextEvent.CHANGE,this.callbackInput2, this, false, 2);
		 


        let changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceInfoSave",this.createHandler,this);
		changeBtn.x = this.viewBg.width/2 - changeBtn.width/2;
		changeBtn.y = inputTF5.y + inputTF5.height + 15+18;
		changeBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(changeBtn); 
	} 
	//对内
	private callbackInput(event:egret.TextEvent)
	{  
		// var nNum = this._inputNotice.text.split("\n").length-1;
		if(Config.ShieldCfg.checkShield(this._inputNotice.text)==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
		if(this._inputMsg.text.length > 0 && App.StringUtil.checkChar(this._inputMsg.text)){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}
		
		var _length = this._inputNotice.text.length;//+nNum;
		var newlength1:number =this._infoMaxNum -_length;
		if(newlength1<0)
		{
			newlength1=0;
		}
		this._inputMaxText.text = LanguageManager.getlocal("allianceSurplus",[newlength1+""]); 
		if(newlength1==0)
		{
			this._inputMaxText.textColor = TextFieldConst.COLOR_WARN_RED3;
		}
		else
		{
			this._inputMaxText.textColor = 0xfcf3b4;
		}
	}

	//对外
	private callbackInput2(event:egret.TextEvent)
	{  
		// var nNum = this._inputMsg.text.split("\n").length-1;
		if(Config.ShieldCfg.checkShield(this._inputMsg.text)==false)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}

		if(this._inputMsg.text.length > 0 && App.StringUtil.checkChar(this._inputMsg.text)){
			App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
			return;
		}

		var _length = this._inputMsg.text.length;//+nNum;
		var newlength1:number = this._infoMaxNum -_length; 
		if(newlength1<0)
		{
			newlength1=0;
		}
		this._inputMaxText2.text = LanguageManager.getlocal("allianceSurplus",[newlength1+""]);
		if(newlength1==0)
		{
			this._inputMaxText2.textColor = TextFieldConst.COLOR_WARN_RED3;
		}
		else
		{
			this._inputMaxText2.textColor = 0xfcf3b4;
		}
	
	}
	private reNameCilck() 
	{
		ViewController.getInstance().openView(ViewConst.POPUP.NAMEPOPUPVIEW, { type: 4,confirmCallback: this.reNameCallBack, handler: this});
	} 
	private reNameCallBack()
	{
		let allianceVo = Api.allianceVoApi.getAllianceVo();
		let nameStr = LanguageManager.getlocal("allianceInfoName",[allianceVo.name])
		this._nameTF.text = nameStr;
		this._penIcon.x = this._nameTF.x + this._nameTF.width + 10;
	}

    private createHandler(param:any):void
	{


		// //名字检测
		// let txtStr:string=this._inputName.text;
		// if(!App.StringUtil.userNameCheck(txtStr))
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
		// 	return;
		// }
		// if( txtStr.length < 2 || txtStr.length > 6)
		// {

		// 	App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
		// 	return;
		// }
		// if(Config.ShieldCfg.checkShield(txtStr)==false)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
		// 	return;
		// }
		//公告检查
		let msg:string=this._inputMsg.text;
		let weixin  = this._inputWeixin.text;
		let qq = this._inputQQ.text;
		let notice = this._inputNotice.text;

		if(!this._inputNotice.bindData){
			notice  = "";
		}
		if(!this._inputQQ.bindData){
			qq  = "";
		}
		if(!this._inputWeixin.bindData){
			weixin  = "";
		}
		if(!this._inputMsg.bindData){
			msg  = "";
		}

		let arr = [msg,weixin,qq,notice];
		for(let i in arr){
			let unit = arr[i];
			if(unit != '' && (App.StringUtil.checkChar(unit) || Config.ShieldCfg.checkOnlyShield(unit)==false || Config.ShieldCfg.checkShield(unit)==false)){
				App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
				return;
			}
		}

		let joinSwitch = 0;
		this.request(NetRequestConst.REQUEST_ALLIANCE_MODINFO, { cweixin:weixin,cqq:qq,message:notice,intro:msg });
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(!data.ret ){
			return;
		}
		if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_MODINFO) {
			if(this.param.data.callback){
				// this.param.data.callback.apply(this.param.data.handler,[]);
				// this.hide();
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceInfoSaveTip"));
		}
	}
	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"shield_cn"
					]);
	}

	
    protected getTitleStr(){
        //  this._type = this.param.data.type 
        return "allianceFindIInfo";
    }


	public dispose():void
	{

		// this.removeTouchTap();
		this._inputWeixin = null;
		this._inputQQ = null;
		this._inputNotice = null;
		this._inputMsg = null;
		this._penIcon = null;
		this._nameTF = null;
		this._infoMaxNum =0;
		this._inputMaxText = null;
		this._inputMaxText2 =null;
		super.dispose();
	}
}