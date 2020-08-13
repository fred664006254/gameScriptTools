/**
 * 帮会管理
 * author dky
 * date 201711/10
 * @class AllianceManagePopupView
 */
class AllianceManagePopupView  extends PopupView
{   
    private _inputTextField:BaseTextField;


	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
		if(myAllianceVo.po == 1)
		{
			let infoBtn = this.getItem(this.infoBtnClick,"allianceManageBtn1",TextFieldConst.COLOR_WHITE);
			this.addChildToContainer(infoBtn);
			infoBtn.x = this.viewBg.width/2 - infoBtn.width/2;
			infoBtn.y = 30;

			let applyBtn = this.getItem(this.applyBtnClick,"allianceManageBtn2",TextFieldConst.COLOR_WHITE);
			this.addChildToContainer(applyBtn);
			applyBtn.x = this.viewBg.width/2 - applyBtn.width/2;
			applyBtn.y = infoBtn.y + infoBtn.height + 15;

			let turnBtn = this.getItem(this.turnBtnClick,"allianceManageBtn3",TextFieldConst.COLOR_QUALITY_ORANGE);
			this.addChildToContainer(turnBtn);
			turnBtn.x = this.viewBg.width/2 - turnBtn.width/2;	
			turnBtn.y = applyBtn.y + applyBtn.height + 15;

			let disBtn = this.getItem(this.disBtnClick,"allianceManageBtn4",TextFieldConst.COLOR_QUALITY_ORANGE);
			this.addChildToContainer(disBtn);
			disBtn.x = this.viewBg.width/2 - disBtn.width/2;
			disBtn.y = turnBtn.y + turnBtn.height + 15;
			let allianceVo = Api.allianceVoApi.getAllianceVo();
			if(allianceVo.apply[0])
			{
				let applyRedDotSp = BaseBitmap.create("public_dot2");

				applyRedDotSp.x = applyBtn.x + applyBtn.width - applyRedDotSp.width + 5 ;
				applyRedDotSp.y = applyBtn.y - 5;
				this.addChildToContainer(applyRedDotSp);
			}
		}
		else{
			let applyBtn = this.getItem(this.applyBtnClick,"allianceManageBtn2",TextFieldConst.COLOR_WHITE);
			this.addChildToContainer(applyBtn);
			applyBtn.x = this.viewBg.width/2 - applyBtn.width/2;
			applyBtn.y = 30;
			
			let allianceVo = Api.allianceVoApi.getAllianceVo();
			if(allianceVo.apply[0])
			{
				let applyRedDotSp = BaseBitmap.create("public_dot2");

				applyRedDotSp.x = applyBtn.x + applyBtn.width - applyRedDotSp.width + 5 ;
				applyRedDotSp.y = applyBtn.y + 10;
				this.addChildToContainer(applyRedDotSp);
			}
		}

		

		
	}
	private infoBtnClick()
    {
		// this.visible = false;
		
		this.hide();
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEINFOPOPUPVIEW,{});
	}

	private applyBtnClick()
    {
		this.hide();
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEAPPLYPOPUPVIEW,{});
	}
	private turnBtnClick()
    {
		this.hide();
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETURNPOPUPVIEW,{});
	}
	private disBtnClick()
	{	
		let baseVo = Api.acVoApi.checkActivityStartByAidAndType("rankActive","14");
		//有展示期 所以 - 86400
		if(Api.switchVoApi.checkOpenRankActive()&&baseVo&&baseVo.et - 86400 > GameData.serverTime)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceRankActiveTip"));
			return;
		}
		//风云擂台不可以踢人
		let arr = [AcConst.AID_BATTLEGROUND];
		for(let i in arr){
			let vo : any = Api.acVoApi.getActivityVoByAidAndCode(arr[i]);
			if(vo&&vo.isInActy())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceKickBattleTip"));
				return;
			}
		}
		let dis = Config.AlliancebaseCfg.reduceContribution*100 + "%"
		let rewardStr = LanguageManager.getlocal("alliance_disTip",[dis]);
		// let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"allianceManageBtn4",
			msg:rewardStr,
			callback:this.doDis,
			handler:this,
			needCancel:true
		});
		
	}

	private doDis()
	{	
		// this.hide();
		// ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEPSWDPOPUPVIEW,{});
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW,{type:2,pswd:"",title:"allianceManageBtn4"});
		this.hide();
		
	}

	private getItem(callback:Function,text:string,textColor:number):BaseDisplayObjectContainer
	{
		let container = new BaseDisplayObjectContainer();
		let itemBg = BaseBitmap.create("public_9_bg28");
		itemBg.width = 500;
		// // itemBg.height = this.height-10;
		// itemBg.x =  this.width/2 - itemBg.width/2;
		// itemBg.y = this.height/2 - itemBg.height/2;
		container.addChild(itemBg);

		let extendTf  = ComponentManager.getTextField(LanguageManager.getlocal(text),TextFieldConst.FONTSIZE_TITLE_SMALL);
		extendTf.textColor = textColor;
		extendTf.x = container.width/2 - extendTf.width/2;
		extendTf.y = container.height/2 - extendTf.height/2;
		container.addChild(extendTf);

		itemBg.addTouch(this.eventHandler,this,[callback,itemBg,this]);	
		
		return container;
	}

	protected eventHandler(event:egret.TouchEvent,callback,itemBg,handler)
    {

        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				itemBg.texture = ResourceManager.getRes("public_9_bg28_down");
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
			case egret.TouchEvent.TOUCH_END:
				itemBg.texture = ResourceManager.getRes("public_9_bg28");
				callback.apply(handler);
				break;
        }
    }




	public dispose():void
	{
	
		this._inputTextField = null;
		super.dispose();
	}
}