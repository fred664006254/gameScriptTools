
class AtkraceAgreePopupDialog extends PopupView
{
	private _type:number = 0;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		
		return super.getResourceList().concat(["atkrace_popup_bg"]);
	}

	protected getTitleStr():string
	{
		return "atkraceViewTitle";
	}

	protected getBgExtraHeight():number
	{
		return 0;
	}

	protected initView():void
	{	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		//底部
		let agreeBg:BaseBitmap = BaseBitmap.create("atkrace_popup_bg");
		agreeBg.setPosition(this.viewBg.width/2 - agreeBg.width/2, 0);
		this.addChildToContainer(agreeBg);

		this._type = this.param.data.type;

		let sid:string = this.param.data.sid;
		let servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(sid));
		servantFullImg.width = 405 * 0.8;
		servantFullImg.height = 467 * 0.8;;
		servantFullImg.x =this.viewBg.width/2 - servantFullImg.width/2;
		servantFullImg.y = agreeBg.height - servantFullImg.height;
		this.addChildToContainer(servantFullImg);


		let str:string = LanguageManager.getlocal("atkraceAgreeAsk"+this._type,[this.param.data.name]);

		let descText:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		descText.width = 500;
		descText.lineSpacing = 5;

		let descBg:BaseBitmap = BaseBitmap.create("public_9_bg11");
		descBg.width = agreeBg.width;
		descBg.height = descText.height+40;
		descBg.setPosition(this.viewBg.width/2 - descBg.width/2, agreeBg.height - descBg.height);
		this.addChildToContainer(descBg);

		descText.setPosition(this.viewBg.width/2 - descText.width/2 , agreeBg.height - descText.height - 20);
		this.addChildToContainer(descText);

		let btnArray:string[] = [];
		if (this._type == 1) {
			btnArray.push("atkraceAgreeAnswer0");
		}
		btnArray.push("atkraceAgreeAnswer"+ this._type);

		for (let i:number = 0; i<btnArray.length; i++)
		{
			let btnBg:BaseBitmap = BaseBitmap.create("public_9_bg28");
			btnBg.width = 556;
			btnBg.height = 55;
			btnBg.setPosition(GameConfig.stageWidth/2 - btnBg.width/2,  GameConfig.stageHeigth/2 + 260 + i*65+12);
			this.addChild(btnBg);
			btnBg.addTouchTap( this.btnClick,this,[i]);

			let btnStr = LanguageManager.getlocal(btnArray[i]);
			if(btnArray[i] == "atkraceAgreeAnswer0"){
				if(this.param.data.allianceId && Api.playerVoApi.getPlayerAllianceId() && this.param.data.allianceId && this.param.data.allianceId == Api.playerVoApi.getPlayerAllianceId()){
					btnStr = LanguageManager.getlocal(btnArray[i]) + LanguageManager.getlocal("atkrace_log_sameAlliance");
				}
			}
			let btnText:BaseTextField = ComponentManager.getTextField(btnStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
			btnText.setPosition(btnBg.x + 38, btnBg.y + btnBg.height/2 - btnText.height/2);
			this.addChild(btnText);
		}
		if(!Api.rookieVoApi.isGuiding){
			this.touchEnabled =false;
			this.y =-200;
			this.alpha=0;
			egret.Tween.get(this).to({alpha:1,y:0},500).call(this.remove,this);
		}
	

	}	

	 private remove():void
	{
         this.drawblackMask();
         this.touchEnabled =true;
	}

	protected isShowMask():boolean
	{
		return false;
	}

	 private drawblackMask():void
    {
        let _maskBmp = BaseBitmap.create("public_9_viewmask");
		_maskBmp.width=GameConfig.stageWidth;
		_maskBmp.height=GameConfig.stageHeigth;
		_maskBmp.touchEnabled = true;
		this.addChild(_maskBmp);
        this.setChildIndex(_maskBmp,0);
    }

	private btnClick(event:egret.Event, idx:number):void
	{
		if (this._type ==1 && idx==0) {
			this.request(NetRequestConst.REQUEST_ATKRACE_HANDLE,{handle:1,uid:this.param.data.uid});
		}
		else {
			
			this.hide();
		}
	}
	private doGuide()
    {
      this.request(NetRequestConst.REQUEST_ATKRACE_HANDLE,{handle:1});
    }

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		if (data.ret == true && data.data.data && data.data.data.fightExpired != 1) {
			if (Api.rookieVoApi.curStep == "atkrace_7")
			{
				Api.rookieVoApi.checkNextStep();
			}
			
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEARRESTVIEW);
			this.hide();
		}
		else
		{
			Api.atkraceVoApi.dateErrorHandle();
		}
	}

	protected isShowOpenAni():boolean{
		return false;
	}

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		this._type = 0;

		super.dispose();
	}
}