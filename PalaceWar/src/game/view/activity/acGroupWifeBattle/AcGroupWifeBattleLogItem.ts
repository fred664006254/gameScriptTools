/**
 对战信息logitem
 * author qianjun
 */
class AcGroupWifeBattleLogItem extends AtkLogScrollItem
{
	private _code : string = '';
	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return AcConst.AID_BATTLEGROUND;
	}

	  protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	public initItem(index:number,data:any,itemparam?):void
	{
		this._code = itemparam;
		super.initItem(index,data,itemparam);
	}

	//挑战
	protected challengBtnHandler(evt:egret.TouchEvent):void
	{
		if(!this.vo.getAttendQuality()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNoAttend-${this.getUiCode()}`));
			return;
		}
		if(this.vo.isActyEnd()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
			return;
		}
		if(this.vo.getCurperiod() == 3){
			App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
			return;
		}
		if(!this.vo.getJoinIn()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip4-${this.getUiCode()}`));
			return;
		}
		let tmp:any =[];
		tmp.type=1;//挑战
		tmp.battleground = true;
		tmp.uid = this.data.uid;
		tmp.code = this._code;
		AtkraceChallengeItem.data = tmp;
		ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
	}

	// public getSpaceY():number
	// {
	// 	return 0;
	// }

	public dispose():void
	{
		this._code='';
		super.dispose();
	}
}