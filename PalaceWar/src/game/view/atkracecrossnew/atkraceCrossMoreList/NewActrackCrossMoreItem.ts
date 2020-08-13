
class NewActrackCrossMoreItem extends AtkLogScrollItem 
{

	private zid:number =0;
	private _info:any = null;

	public constructor() 
	{
		super();
	}

	protected initItem(index: number, data: any,itemParam?:any) 
    {
		this.zid =data.info.zid;
		super.initItem(index,data,itemParam);
	}
	/**
	 * 是否是跨服
	 */
	protected checkIsCross():boolean
	{
		return true;
	}
	//挑战
	protected challengBtnHandler(evt:egret.TouchEvent):void
	{
		let crossVo:AcNewCrossServerAtkRaceVo = <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");		
		if(GameData.serverTime>crossVo.et-86400)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return
		}
 		if(Api.atkracecrossVoApi.isCanJoin==false)
        {
            
			App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(`newatkraceNoDes`,crossVo.isCrossLeague())));
            return 
        }
		if (crossVo.getSids().length == 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(`newatkraceServantLess30Tip`,crossVo.isCrossLeague())));
            return 
		}

		var data:any =[];
		data.type=1;//挑战
		data.uid=this.data.uid;
		data.zid =this.zid;
		AtkraceCrossChallengeItem.data =data;
		

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
		NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO, {"fuid":this.data.uid});
			
	}

	private useCallback(data:any):void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
		if (data.data.ret == true)
		{
			let atkraceinfo =data.data.data.data.atkraceinfo; 
			this._info = atkraceinfo;

			let acCfg = Api.atkracecrossVoApi.getNewCrossCfg();
			let pointDiff = Api.atkracecrossVoApi.getPoint() - this._info.point;
			if (this._info.rank>acCfg.lowerLimit3 && this._info.point<=acCfg.lowerLimit1)
			{
				let tipstr = LanguageManager.getlocal("newatkraceServantChallengeTp2",[String(acCfg.lowerLimit1)]);
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"acthrowstoneTipTitle",
					msg:tipstr,
					callback:this.realAttack,
					handler:this,
					needCancel:true,
				}); 
			}
			else if (this._info.rank>acCfg.lowerLimit3 &&  pointDiff>=acCfg.lowerLimit2)
			{
				let tipstr = LanguageManager.getlocal("newatkraceServantChallengeTp1",[String(acCfg.lowerLimit2)]);
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"acthrowstoneTipTitle",
					msg:tipstr,
					callback:this.realAttack,
					handler:this,
					needCancel:true,
				}); 
			}
			else
			{
				this.realAttack();
			}
		}
	}

	private realAttack():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSCHALLENGEVIEW,{info:this._info});
	}

	public dispose(): void {

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
		this.zid =0;
		this._info = null;
		super.dispose();
	}
}