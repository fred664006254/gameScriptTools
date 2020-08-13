
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
	protected isShowOpenAni():boolean
	{
		return false;
	}

	protected getBgExtraHeight():number
	{
		return 0;
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);


		
        // let public_tc_bg01:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        // this.addChildToContainer(public_tc_bg01);
        // public_tc_bg01.width = 533;
        // public_tc_bg01.height = 405;
        // public_tc_bg01.x =42;
        // public_tc_bg01.y =5;
    
		//底部
		let agreeBg:BaseBitmap = BaseBitmap.create("atkrace_popup_bg");
		agreeBg.setPosition(this.viewBg.width/2 - agreeBg.width/2, 10);
		this.addChildToContainer(agreeBg);
		this._type = this.param.data.type;

		let sid:string = this.param.data.sid;
		let servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(sid));
		servantFullImg.width = 640 * 0.8;
		servantFullImg.height = 482 * 0.8;;
		servantFullImg.x =this.viewBg.width/2 - servantFullImg.width/2;
		servantFullImg.y = agreeBg.height - servantFullImg.height;
		this.addChildToContainer(servantFullImg);

		let descTextBg = BaseBitmap.create("public_9v_bg12");
		descTextBg.width = 530;
		descTextBg.height =125;
		descTextBg.x = this.viewBg.width/2 - descTextBg.width/2;
		descTextBg.y = agreeBg.y+agreeBg.height+10;
		this.addChildToContainer(descTextBg);

		let str:string = LanguageManager.getlocal("atkraceAgreeAsk"+this._type,[this.param.data.name]);
		let descText:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		descText.width = 500;
		descText.lineSpacing = 5; 
		descText.setPosition(this.viewBg.width/2 - descText.width/2 , descTextBg.y + 15 );
		this.addChildToContainer(descText);

		let btnArray:string[] = [];
		if (this._type == 1) {
			btnArray.push("atkraceAgreeAnswer0");
		}
		btnArray.push("atkraceAgreeAnswer"+ this._type);

		for (let i:number = 0; i<btnArray.length; i++)
		{
			let btnBg:BaseBitmap = BaseBitmap.create("public_9v_bg15");
			btnBg.width = 556;
			btnBg.height = 55; 
			btnBg.setPosition(GameConfig.stageWidth/2 - btnBg.width/2,  GameConfig.stageHeigth/2 + 330 + i*70);
			this.addChild(btnBg);
			btnBg.addTouchTap( this.btnClick,this,[i]);

			let btnText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(btnArray[i]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			btnText.setPosition(btnBg.x + 38, btnBg.y + btnBg.height/2 - btnText.height/2);
			this.addChild(btnText);
		}
		if(!Api.rookieVoApi.isGuiding){
			this.touchEnabled =false;
			this.y =-200;
			this.alpha=0;
			egret.Tween.get(this).to({alpha:1,y:-100},500).call(this.remove,this);
		} 
	}	
	 protected getShowHeight():number
	{
		return 650;//580;
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
			this.request(NetRequestConst.REQUEST_ATKRACE_HANDLE,{handle:1});
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
		if (data.ret == true) {

			
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEARRESTVIEW);
			this.hide();
		}
	}

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		this._type = 0;

		super.dispose();
	}
}