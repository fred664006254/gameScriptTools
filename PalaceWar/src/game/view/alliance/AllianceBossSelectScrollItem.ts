class AllianceBossSelectScrollItem extends BossSelectedScrollItem
{
	public constructor() {
		super();
	}
	protected recoveryHandler():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCE_RECOVER,this.refresh,this);
		NetManager.request(NetRequestConst.REQUEST_ALLIANCE_RECOVER,{servantId:this._servantInfo[0]});
	}

	protected refresh(e:egret.Event):void
	{
		let data:{ret:boolean,data:any}=e.data;
		if(data.ret)
		{
			App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_RECOVER,this.refresh,this);
			if(this._useBtn)
			{
				let {x,y}=this._useBtn;
				this._useBtn.dispose();
				let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"gotowar",this.clickBtnHandler,this);
				useBtn.setPosition(x,y);
				this.addChild(useBtn);
				this._useBtn=useBtn;
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("dailybossRecoveryBattleSuccessDesc"));
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCE_RECOVER,this.refresh,this);
		super.dispose();
	}
}