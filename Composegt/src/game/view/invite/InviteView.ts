/**
 * 邀请有礼
 * author 赵占涛
 * date 2018/3/6
 * @class InviteView
 */
class InviteView extends CommonView
{
	private _handContainer:BaseDisplayObjectContainer;

	public constructor() 
	{
		super();
	}
	
	public initView():void
	{
		Api.inviteVoApi.processDataOnOpenDialog();
		let bg = BaseBitmap.create("invite_bg");
		bg.x = 0;
		bg.y = -10;
		this.addChildToContainer(bg);
		
		// 描述
		let descLabel:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("inviteDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		descLabel.x = 30;
		descLabel.y = bg.y + bg.height - 35 - descLabel.height/2;
		this.addChildToContainer(descLabel);

		// 邀请按钮
		let goInviteBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE,"inviteButton",this.inviteButtonHandler ,this);        
		goInviteBtn.x = 477;
		goInviteBtn.y = 233;
		goInviteBtn.name = "goInviteBtn";
		this.addChildToContainer(goInviteBtn);

	}

	private inviteButtonHandler():void
	{
		PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_INVITE,(code,data)=>{},this);
		// if(shareType === 1 || shareType === 3)
		// {
		// 	RSDKHelper.share((code,data)=>{});
		// } else {
		// 	this.showHand();
		// }
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([					
					"invite_bg","nobodyIcon","rank_1","rank_2","rank_3","rank_line","guide_hand","activity_db_01","activity_db_02","rank_biao","public_tc_bg05"
					]);
	}
	protected getContainerY():number
	{
		return 260;
	}

	protected getTitleButtomY():number
	{
		
		let buttonY:number;
		if(this.titleBg)
		{
			buttonY=this.titleBg.y+this.titleBg.height;
		}
		else
		{
			if(this.titleTF)
			{
				buttonY=this.titleTF.y+this.titleTF.height;
			}
		}
		return buttonY;
	}

	protected getTabbarGroupY():number
	{
		return 302;
	}

	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType: NetRequestConst.REQUEST_INVITE_GETINFO,requestData:{}};
	}
	protected getTabbarTextArr():Array<string>
	{
		return [
			"inviteViewTab1Title","inviteViewTab2Title","inviteViewTab3Title","inviteViewTab4Title"
		];
	}


	private showHand()
	{
		if(!this._handContainer){
			this._handContainer = new BaseDisplayObjectContainer();
			this.addChild(this._handContainer)

			let maskBmp = BaseBitmap.create("public_9_viewmask");
			maskBmp.width=GameConfig.stageWidth;
			maskBmp.height=GameConfig.stageHeigth;
			maskBmp.touchEnabled = true;
			this._handContainer.addChild(maskBmp);
			maskBmp.addTouchTap(this.hideMask,this);

			let clickHand = BaseBitmap.create("guide_hand");
			clickHand.skewY = 180;
			clickHand.x = 590;
			clickHand.y = 10;
			this._handContainer.addChild(clickHand);
			egret.Tween.get(clickHand,{loop:true})
				.to({y:60}, 500)
				.to({y:10}, 500)
			let getTxt = ComponentManager.getTextField(LanguageManager.getlocal("fkylcGetMsgTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
			getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
			getTxt.x = GameConfig.stageWidth/2 - getTxt.width/2;
			getTxt.y = GameConfig.stageHeigth/2- getTxt.height/2;
			getTxt.lineSpacing = 10;
			this._handContainer.addChild(getTxt);
		}
	}

	private hideMask()
	{
		if(this._handContainer){
			this.removeChild(this._handContainer);
			this._handContainer.dispose();
			this._handContainer = null;
		}
	}

	public dispose():void
	{
		if(this._handContainer){
			this._handContainer.dispose();
			this._handContainer = null;
		}
		super.dispose();
	}
}