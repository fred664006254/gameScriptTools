/**
 * 帮会职位管理
 * author dky
 * date 201711/10
 * @class AllianceSetPoPopupView
 */
class AllianceSetPoPopupView  extends PopupView
{   
    private _inputTextField:BaseTextField;

	private _allianceMemberVo:AllianceMemberInfoVo;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		this._allianceMemberVo = this.param.data.allianceMemberVo;
		
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
		let po1Str = "";
		let po2Str = "";
		if(this._allianceMemberVo.po == 2)
		{
			po1Str = "alliance_changePo3";
			po2Str = "alliance_changePo4";
		}
		if(this._allianceMemberVo.po == 3)
		{
			po1Str = "alliance_changePo2";
			po2Str = "alliance_changePo4";
		}
		if(this._allianceMemberVo.po == 4)
		{
			po1Str = "alliance_changePo2";
			po2Str = "alliance_changePo3";
		}
	
		let infoBtn = this.getItem(this.infoBtnClick,po1Str,TextFieldConst.COLOR_WHITE);
		this.addChildToContainer(infoBtn);
		infoBtn.x = this.viewBg.width/2 - infoBtn.width/2;
		infoBtn.y = 30;

		let applyBtn = this.getItem(this.applyBtnClick,po2Str,TextFieldConst.COLOR_WHITE);
		this.addChildToContainer(applyBtn);
		applyBtn.x = this.viewBg.width/2 - applyBtn.width/2;
		applyBtn.y = infoBtn.y + infoBtn.height + 15;

		let kickBtn = this.getItem(this.kickBtnClick,"alliance_changePo5",TextFieldConst.COLOR_WHITE);
		this.addChildToContainer(kickBtn);
		kickBtn.x = this.viewBg.width/2 - kickBtn.width/2;
		kickBtn.y = applyBtn.y + applyBtn.height + 15;
		
		

		
	}
	private infoBtnClick()
    {
		this.changePo(1);
	}

	private applyBtnClick()
    {
		
		this.changePo(2);
	}
	private kickBtnClick()
    {
		let baseVo = Api.acVoApi.checkActivityStartByAidAndType("rankActive","14");
		//有展示期 所以 - 86400
		if(Api.switchVoApi.checkOpenRankActive()&&baseVo&&baseVo.et - 86400 > GameData.serverTime)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceRankActiveTip"));
			return;
		}
		let arr = [AcConst.AID_BATTLEGROUND];
		for(let i in arr){
			let vo : any = Api.acVoApi.getActivityVoByAidAndCode(arr[i]);
			if(vo&&vo.isInActy())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceKickBattleTip"));
				return;
			}
		}

		// var vo  = <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, 1+"");
		// if(vo&&vo.isInActy())
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceKickBattleTip"));
		// 	return;
		// }
		
		let kickStr = LanguageManager.getlocal("alliance_changeKickTip",[this._allianceMemberVo.name]);
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"alliance_changePo5",
			msg:kickStr,
			callback:this.doKick,
			handler:this,
			needCancel:true
		});
	}

	private doKick()
	{
		this.request(NetRequestConst.REQUEST_ALLIANCE_KICKALLIANCE,{auid:this. _allianceMemberVo.uid});
		// App.CommonUtil.showTip(LanguageManager.getlocal(""));
	}

	private changePo(index:number)
	{
		let po = 2;
		let po1 = 0;
		let po2 = 0;
		
		if(this._allianceMemberVo.po == 2)
		{
			po1 = 3;
			po2 = 4;
		}
		if(this._allianceMemberVo.po == 3)
		{
			po1 = 2;
			po2 = 4;
		}
		if(this._allianceMemberVo.po == 4)
		{
			po1 = 2;
			po2 = 3;
		}

		if(index == 1){
			po = po1;
		}
		else{
			po = po2;
		}
		let allianceVo = Api.allianceVoApi.getAllianceVo();
		let allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(allianceVo.level.toString());
		if(po == 2 && Api.allianceVoApi.getAlliancePo2Num() >= allianceCfg.viceLeader){
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_changePoTip1"));
			return;
		}
		if(po == 3 && Api.allianceVoApi.getAlliancePo3Num() >= allianceCfg.elite){
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_changePoTip2"));
			return;
		}

		this.request(NetRequestConst.REQUEST_ALLIANCE_SETPOS,{auid:this. _allianceMemberVo.uid,pos:po});
	}
	

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(!data.ret ){
			return;
		}
		if (data.data.data.allianceFlag == 1 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
			return;
		}
		if (data.data.data.allianceFlag == 2 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg2"));
			return;
		}
		if (data.data.data.allianceFlag == 3 ) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
			return;
		}
		if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_SETPOS) {
			if(this.param.data.callback){
				this.param.data.callback.apply(this.param.data.handler,[]);
				App.CommonUtil.showTip(LanguageManager.getlocal("alliance_changePoTip3"));
				this.hide();
			}
			
		}
		if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_KICKALLIANCE) {
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_changeKickSuccess"));
			this.hide();
		}
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

	 protected getTitleStr(){
        //  this._type = this.param.data.type 
        return "allianceMemberChangePo";
    }



	public dispose():void
	{
	
		this._allianceMemberVo = null;
		this._inputTextField = null;
		super.dispose();
	}
}