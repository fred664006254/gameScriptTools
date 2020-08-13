class AcTombSelectScrollItem extends BossSelectedScrollItem
{
	public constructor() {
		super();
	}


	private get cfg() : Config.AcCfg.TombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_TOMB, this._code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_TOMB, this._code);
	}

    private get acTivityId() : string{
        return `${AcConst.AID_TOMB}-${this._code}`;
	}
	
	
	protected recoveryHandler():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_TOMBRECOVERSERVANT,this.refresh,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBRECOVERSERVANT,{servantId:this._servantInfo[0],activeId : this.vo.aidAndCode});
	}

	protected refresh(e:egret.Event):void
	{
		let data:{ret:boolean,data:any}=e.data;
		if(data.ret)
		{
			App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TOMBRECOVERSERVANT,this.refresh,this);
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
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TOMBRECOVERSERVANT,this.refresh,this);
		super.dispose();
	}
}