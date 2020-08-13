class AcLanternMailPopupView  extends PopupView
{

    private _writeBtn:BaseButton;
    private _confirmBtn1:BaseButton;
    private _inputTF:BaseDisplayObjectContainer;
    private _inputNotice:BaseTextField;
    private _descText1:BaseTextField;
    private _descText2:BaseTextField;
    private _descContent:BaseTextField;


    private code:string;
    private aid:string;
    private _acvo:AcLanternVo = undefined;
    private _isWritePage = false;
    public constructor() 
	{
		super();
	}
	private get vo() : AcLanternVo{
       	if(!this._acvo){
		    this._acvo =  <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	   	}
		return this._acvo;
    }
    protected initView():void
	{
        this.code = this.param.data.code;
        this.aid = this.param.data.aid;

        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNNOTE,this.sendReward,this);


        this._descText1 = ComponentManager.getTextField(LanguageManager.getlocal("acLanternMail_descTitle1"),20,TextFieldConst.COLOR_BROWN);
        this._descText2 = ComponentManager.getTextField(LanguageManager.getlocal("acLanternMail_descTitle2"),20,TextFieldConst.COLOR_BROWN);

        this._descText1.x = 150;
        this._descText1.y = this.viewBg.y + 55;

        this._descText2.x = 150;
        this._descText2.y = this.viewBg.y + 55;
        this._descText2.visible = false;
        this.addChild(this._descText1);
        this.addChild(this._descText2);
        let regdt = Api.gameinfoVoApi.getRegdt();
        let day = Math.floor((GameData.serverTime - regdt)/(3600 * 24));

        // console.log("regdt---?",regdt);
        // console.log("GameData.serverTime-->",GameData.serverTime);
        // console.log(GameData.serverTime - regdt);

        this._descContent = ComponentManager.getTextField(LanguageManager.getlocal("acLanternMail_descContent",[String(day)]),20,TextFieldConst.COLOR_BROWN);
        this._descContent.width = 380;
        this._descContent.x = 150;
        this._descContent.y = this._descText1.y + this._descText1.height + 5;
        this.addChild(this._descContent);

        this._inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_BROWN, TextFieldConst.FONTSIZE_CONTENT_SMALL,380,270,"public_alphabg","",TextFieldConst.COLOR_BROWN);
		this._inputTF.x = 150;//GameConfig.stageWidth/2 - this._inputTF.width/2;
		this._inputTF.y = this._descText2.y + this._descText2.height + 5;
		this.addChild(this._inputTF);
        this._inputTF.visible = false;
		this._inputNotice = <BaseTextField>this._inputTF.getChildByName("textField");
		this._inputNotice.y = 10;
        this._inputNotice.height = 270;
        this._inputNotice.width = 380;
		this._inputNotice.maxChars = 100;
		this._inputNotice.multiline = true;




        let rewardTip = ComponentManager.getTextField(LanguageManager.getlocal("acLanternMail_rewardTip"),20,TextFieldConst.COLOR_BROWN);
        rewardTip.x = this.viewBg.x + 122;
        rewardTip.y = this.viewBg.y + 395;
        this.addChild(rewardTip);

        this.showReward(rewardTip.y + rewardTip.height+ 8);



		this._writeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acLanternMail_writeBtnTxt",this.writeBtnHandler,this);
		this._writeBtn.x = GameConfig.stageWidth/2 - this._writeBtn.width/2;
		this._writeBtn.y = this.viewBg.y+530;
		this.addChild(this._writeBtn);
		this._writeBtn.visible = true;

		this._confirmBtn1 = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acLanternMail_confirmBtnTxt",this.confirmBtnHandler,this);
		this._confirmBtn1.x = GameConfig.stageWidth/2 - this._confirmBtn1.width/2;
		this._confirmBtn1.y = this.viewBg.y+530;
		this.addChild(this._confirmBtn1);
		this._confirmBtn1.visible =false;


        // this.refreshView();
	
		
		// this.setChildIndex(this.closeBtn,this.numChildren-3)
		 
    }  
    private writeBtnHandler():void
	{
        this._descText1.visible = false;
        this._descText2.visible = true;
        
        this._descContent.visible = false;
        this._inputTF.visible = true;

        this._writeBtn.visible = false;
		this._confirmBtn1.visible = true;
        this._isWritePage = true;
	}
    private confirmBtnHandler():void
	{
        let notice = this._inputNotice.text;
        if(notice.trim().length > 0){
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNNOTE,{activeId:this.vo.aidAndCode,note:notice.trim()});
        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLanternMail_empty-1"));
        }
        
		
	}

    // private refreshView():void
    // {

    //     // if(this.vo.noteflag){
    //     //     //已领取

    //     // } else {

    //     // }


    // }

    private showReward(iconY:number=0):void
	{
		let temScale = 0.78;
		let spaceW = 8;
		let spaceH = 10;
		
        let config = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let rewardList = config.getRewardItemVoList();
		let totalNum = rewardList.length;
	
		for(let i = 0;i<rewardList.length;i++)
		{
			let icon = GameData.getItemIcon(rewardList[i],true,true);
			icon.scaleX = icon.scaleY = temScale;
			// icon.x = bg.x+75 + (bg.width-150)/2 + (icon.width*temScale)*(i - totalNum/2)+ spaceW*(i - (totalNum-1)/2);
            icon.x = GameConfig.stageWidth / 2 - (icon.width * temScale * totalNum + (totalNum - 1) * spaceW)/2 + i * (icon.width * temScale + spaceW);
			icon.y =iconY;
			this.addChild(icon); 
		} 
	}

    public hide(){
        if(!this._isWritePage){
            super.hide();
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            "msg": LanguageManager.getlocal("acLanternMail_closetip") ,
            "needCancel":true,
            "title":"itemUseConstPopupViewTitle",
            "callback":super.hide,
            "handler":this,
        });


    }


	private sendReward(event: egret.Event): void 
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNNOTE,this.sendReward,this);
		
		if (event.data.data.ret ==0) {
		
			let rewards = event.data.data.data.rewards;
            SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                "rewards":rewards,
                "otherRewards":null,
                "isPlayAni":true, 
                showTip:null,
                callback:super.hide,
                target:this,
            });
		


		}
	}

    private clickGetBtnHandler():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
	}
    
    protected initBg():void
	{   
		this.viewBg = BaseLoadBitmap.create("aclanternview_page-1"); 
        this.viewBg.width = 575;
        this.viewBg.height =665;
   
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg); 
	} 
    /**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
		// this.closeBtn.setPosition(480,40);
        this.closeBtn.setPosition(520,this.viewBg.y-20);
		
		// if(PlatformManager.hasSpcialCloseBtn()){
		// 	this.closeBtn.setPosition(520,100);
		// } else {
		// 	this.closeBtn.setPosition(480,40);
			
		// }
	}

    protected getTitleBgName():string
	{
		return null;
	}
    protected getCloseBtnName():string
	{
		return "aclanternview_closebtn-1";
	}
    protected getTitleStr():string
    {
        return  null;
    }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(
			[  
            // "firstchargebutton01", 
			// "firstchargebutton02", 
			// "firstchargebg",
			// "firstchargemask",
			// "firstchargefg",
			]);
	} 
	        
	public dispose(): void 
    {  
        super.dispose();
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNNOTE,this.sendReward,this);
        this._writeBtn = null;
        this._confirmBtn1 = null;
        this._inputTF = null;
        this._inputNotice = null;
        this._descText1 = null;
        this._descText2 = null;
        this._descContent = null;


        this.code = null;
        this.aid = null;
        this._acvo = undefined;
        this._isWritePage = false;
	}
}