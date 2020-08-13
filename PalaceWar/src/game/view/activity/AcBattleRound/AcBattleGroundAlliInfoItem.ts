/**
 * author:qianjun
 * desc: 帮会信息item
*/
class AcBattleGroundAlliInfoItem extends ScrollListItem
{
    public constructor() {
		super();
    }

    private code;
    
    private _data : any = null;

    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, this.code);
    }
    private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEGROUND,this.code);
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


	protected initItem(index:number,data:any,itemparam)
    {	
        let view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 530;
        this.height = 45;
        this.code = itemparam;

        let title1Text = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleGroundAlliRank-${this.getUiCode()}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, title1Text, view, [10, 0]);

		let title2Text = ComponentManager.getTextField(LanguageManager.getlocal(`ranknickName`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title2Text, view);

		let title3Text = ComponentManager.getTextField(LanguageManager.getlocal(`acPunish_score`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, title3Text, view, [25, 0]);
 
        let serverTxt = ComponentManager.getTextField(data.rank, 20);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, serverTxt, title1Text);
        view.addChild(serverTxt);

        let nameTxt = ComponentManager.getTextField(data.name, 20);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, title2Text);
        view.addChild(nameTxt);

        let scoreTxt = ComponentManager.getTextField(typeof data.score != 'undefined' ? data.score : LanguageManager.getlocal(`acBattleRoundOut-${view.getUiCode()}`), 20);
        if(view.vo.isWaiting()){
            scoreTxt.text = LanguageManager.getlocal(`acBattleGroundTip11-${view.getUiCode()}`);
        }
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, title3Text);
        view.addChild(scoreTxt);

        let lineImg = BaseBitmap.create("public_line1");
		lineImg.width = view.width;
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, lineImg, view);
        this.addChild(lineImg);
        //个人是否淘汰
        let need = view.vo.getCurperiod() == 2 ? view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine : 99999;
        let color = null;
        if(view.vo.isWaiting()){
            color = TextFieldConst.COLOR_QUALITY_WHITE;
        }
        else{
            if(data.alive){
                color = Number(data.rank) <= need ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED3; 
            }
            else{
                color = TextFieldConst.COLOR_QUALITY_GRAY;
            }
        }
        serverTxt.textColor = nameTxt.textColor = scoreTxt.textColor = color;
        // view.serverTxt = serverTxt;
        // view.nameTxt = nameTxt;
        // else if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
		// 	serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
        // }
    }


	public dispose():void
    {
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}