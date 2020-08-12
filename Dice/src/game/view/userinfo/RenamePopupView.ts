/*
 *@description: 用户修改名字弹窗
 *@author: hwc 
 *@date: 2020-04-15 13:30:01
 *@version 0.0.1
 */ 

class RenamePopupView extends PopupView 
{
    private confirmBtn:BaseButton;
   
    private needGem:number = 0;
    private newName:string = "";
    private _maxLen = 12;
    private _inputTextField:BaseTextField;


    public initView(){
        this.name = `RenamePopupView`;
        this.needGem = Api.SigninfoVoApi.getRenameNum() == 0 ? 0 : Config.GamebaseCfg.renameGem;
        let perstr = ``;//LangMger.getlocal("user_rename_per_input");
        let input = ComponentMgr.getInputTextField(ColorEnums.gray, TextFieldConst.SIZE_22, 320, 48, "joinwarinputbg", perstr, ColorEnums.gray);
        this.addChildToContainer(input);
        input.x = (this.getShowWidth() - 320) / 2 - 10;
        input.y = 20;
        let  inputTxt = <BaseTextField>input.getChildByName("textField");
        inputTxt.setColor(ColorEnums.gray);
        inputTxt.maxChars = this._maxLen;
        inputTxt.addEventListener(egret.TextEvent.CHANGE, this.callbackInput, this, false, 2);
        //inputTxt.restrict = "/\u4e00-\u9fa5_0-9a-zA-Z/";//"/A-Za-z0-9-\(\)\u4e00-\u9fa5/";
        this._inputTextField = inputTxt;

        let randomBtn = ComponentMgr.getButton("chooserole_dice","",this.clickRanomHandler,this);
        randomBtn.x = input.x+input.width-randomBtn.width - 6;
        randomBtn.y = input.y + input.height/2 - randomBtn.height/2;
        this.addChildToContainer(randomBtn);


        let warn = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, 0x5D8EC0);
        this.addChildToContainer(warn);
        warn.width = 534;
        warn.textAlign = egret.HorizontalAlign.CENTER;
        warn.text = LangMger.getlocal("user_rename_tip");
        warn.x = (this.getShowWidth() - warn.width) / 2;
        warn.y = input.y + input.height + 10;


        let btn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", this.confirmBtnOnClick, this);
        this.addChildToContainer(btn);
        btn.x = (this.viewBg.width - btn.width) / 2;
        btn.y = this.getShowHeight() - btn.height - 100;

        this.confirmBtn = btn;

        

        if(Api.GameinfoVoApi.checlIsInGuideId(25)){
            btn.setText(LangMger.getlocal(`confirmBtn`));
            this.clickRanomHandler();
        }
        else{
            let icon = BaseBitmap.create("ab_mainui_gem");
            btn.addChild(icon);
            icon.x = btn.width / 2 - icon.width * 1.2;
            icon.y = (btn.height - icon.height) / 2;
    
            let txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_28, ColorEnums.white);
            btn.addChild(txt);
            txt.width = btn.width / 2;
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.text = String(this.needGem);
            txt.x = icon.x + icon.width;
            txt.y = icon.y + (icon.height - txt.height) / 2;

            this.newName = this._inputTextField.text = Api.UserinfoVoApi.getName();
        }


    }

    protected preInit():void{
        super.preInit();
        if(Api.GameinfoVoApi.checlIsInGuideId(25)){
            App.CommonUtil.sendNewGuideId(25);
            Api.GameinfoVoApi.setCurGudingId(26);
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
        }
    }

    private confirmBtnOnClick(){
        let curname = Api.UserinfoVoApi.getName();
        if(Api.GameinfoVoApi.checlIsInGuideId(26)){
        }
        else{
            if(this.needGem > Api.UserinfoVoApi.getGem()){
                // App.CommonUtil.showTip("钻石不足，走钻石不足的通用逻辑");
                App.CommonUtil.gemNotEnough(1);
                // ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                //     title : LangMger.getlocal("sysTip"),
                //     msg : LangMger.getlocal(`sysgemNotEnough`),
                //     needCancel : false,
                // });
                return
            }
            else{
                if(this.needGem > Api.UserinfoVoApi.getGem()){
                    App.CommonUtil.showTip("钻石不足，走钻石不足的通用逻辑");
                    return
                }
            }
        }

        if(this.newName === ""){
            App.CommonUtil.showTip(LangMger.getlocal("user_name_cannot_empty"));
            return;
        }

        if(curname == this.newName){
            App.CommonUtil.showTip(LangMger.getlocal("userinfo_reneme_nochange"));
            return;
        }

        if(App.StringUtil.getEnLength(this.newName) > 12 || App.StringUtil.getEnLength(this.newName) < 4){
            App.CommonUtil.showTip(LangMger.getlocal("userinfo_rename_flag_2"));
            return;
        }

        if( !App.StringUtil.userNameCheck(this.newName)){
            App.CommonUtil.showTip(LangMger.getlocal("user_name_have_illegal_char"));
            return;
        }

        if(!Config.ShieldCfg.checkShield(this.newName)){
            App.CommonUtil.showTip(LangMger.getlocal("user_name_have_illegal_char"));
            return;
        }
        
        if(Api.GameinfoVoApi.checlIsInGuideId(26)){
            this.request(NetConst.REQUEST_USER_CREATENAME, {name: this.newName});
        }else{
            this.request(NetConst.USER_RENAME, {name: this.newName});
            this.closeHandler();
        }
    }

    protected isTouchMaskClose(){
        return false;
    }

    private clickRanomHandler():void
	{
		this.randomName();
	}
	private randomName()
	{
		this.newName = Config.NamesCfg.getRandomName();
        this._inputTextField.text = this.newName;
	}

    protected resetBgSize(){
        super.resetBgSize();
        this.container.x = this.viewBg.x;
    }

    private callbackInput(event){
        let txt = <String>event.target.text;
        this.newName = txt.trim();
        // let view = this;
        // let inputTF2 = <BaseDisplayObjectContainer>view.getChildByName(`inputTF2`);
        // let inputtxt = <BaseTextField>inputTF2.getChildByName("textField");
        // let inputMaxText = <BaseTextField>inputTF2.getChildByName("inputMaxText");
        // let _length = inputtxt.text.length;//+nNum;
        // let newlength1:number = this._maxLen -_length;
        // if(newlength1<0)
        // {
        //     newlength1=0;
        // }
        // // inputMaxText.text = LangMger.getlocal(`acQuestionAnswerWord-${view.code}`,[newlength1+""]); 
        // if(newlength1==0)
        // {
        //     inputMaxText.textColor = ColorEnums.red;
        // }
        // else
        // {
        // inputMaxText.textColor = 0xc2b89e;
        //     }
        //     if(inputtxt.text === ''){
        //         return;
        //     }
        // if(Config.ShieldCfg.checkShield(inputtxt.text)==false)
        // {
        //     App.CommonUtil.showTip(LangMger.getlocal("chatShieldTip"));
        //     return;
        // }

        // if(App.StringUtil.checkChar(inputtxt.text))
        // {
        //     App.CommonUtil.showTip(LangMger.getlocal("chatShieldTip"));
        //     return;
        // }
    }

    protected netEventCallBack(evt:egret.Event){
        let data = evt.data;
        if(data && data.ret){
			switch (data.data.cmd) {
				case NetConst.USER_RENAME:
                    this.renameResponse(data.data.data);
                    break;
                case NetConst.REQUEST_USER_CREATENAME:
                    this.renameResponse(data.data.data);
                    break;
				default:
					break;
			}
		}
    }

    private renameResponse(data){
        if(data){
            switch (data.nameFlag) {
                case 0:
                    App.CommonUtil.showTip(LangMger.getlocal("userinfo_rename_flag_0"));
                    if(Api.GameinfoVoApi.checlIsInGuideId(26)){
                        App.CommonUtil.sendNewGuideId(26);
                        Api.GameinfoVoApi.setCurGudingId(27);
                        App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                        this.hide();
                    }
                    break;
                case 1:
                    App.CommonUtil.showTip(LangMger.getlocal("userinfo_rename_flag_1"));
                    break;
                case 2:
                    App.CommonUtil.showTip(LangMger.getlocal("userinfo_rename_flag_2"));
                    break;
                case 3:
                    App.CommonUtil.showTip(LangMger.getlocal("userinfo_rename_flag_3"));
                    break;
                default:
                    break;
            }
        } else {
            App.LogUtil.log(">>>完犊子了<<<");
        }
    }


    // 关闭按钮回调
    protected closeHandler(){
        if(Api.GameinfoVoApi.checlIsInGuideId(26)){
            return;
        }
        super.closeHandler();
        ViewController.getInstance().openView(ViewConst.USERINFO_POPUPVIEW);
    }

    public show(data?:any):void
    {
        super.show(data);
    }

    // 需要加载的资源
    protected getResourceList():string[]
    {
        return super.getResourceList().concat(["joinwarinputbg",]);
    }

    // 标题文字内容
    protected getTitleStr():string{
        return  Api.GameinfoVoApi.checlIsInGuideId(25) ? LangMger.getlocal("user_createname_title") : LangMger.getlocal("user_rename_title");
    }

    // 弹框面板宽度，高度动态计算
    protected getShowWidth():number
    {
        return super.getShowWidth();
    }

    // 弹框面板高度，重新该方法后，不会动态计算高度
    protected getShowHeight():number
    {
        return 350;
    }

    // 计算背景高度时使用，在container高度的基础上添加该高度
    protected getBgExtraHeight():number
    {
        return super.getBgExtraHeight();
    }

    public dispose():void
    {
        this.confirmBtn = null;

        super.dispose();
    }
}