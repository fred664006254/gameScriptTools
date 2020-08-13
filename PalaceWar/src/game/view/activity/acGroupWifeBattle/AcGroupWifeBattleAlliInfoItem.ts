/**
 * author:qianjun---wxz
 * desc: 帮会信息item
*/
class AcGroupWifeBattleAlliInfoItem extends ScrollListItem
{
    public constructor() {
		super();
    }

    private code;
    
    private _data : any = null;

    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_GROUPWIFEBATTLE, this.code);
    }
    private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_GROUPWIFEBATTLE,this.code);
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
        view._data = data;
        view.width = 520;
        view.height = 55;
        view.code = itemparam;

        if(data.rank <= 3)
        {
            view.height = 65;
            let rankbg = BaseBitmap.create("rankbgs_"+String(data.rank));
            rankbg.width = 520;
            rankbg.height = 65;
            view.addChild(rankbg);
        }

        let title1Text = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleAlliRank-${this.getUiCode()}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, title1Text, view, [40, 0]);

		let title2Text = ComponentManager.getTextField(LanguageManager.getlocal(`ranknickName`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title2Text, view);

		let title3Text = ComponentManager.getTextField(LanguageManager.getlocal(`acPunish_score`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, title3Text, view, [60, 0]);
 
        let serverTxt = ComponentManager.getTextField(data.rank, 20);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, serverTxt, title1Text);
        view.addChild(serverTxt);
        if(data.rank <= 3)
        {
            serverTxt.visible = false;

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(data.rank)); 
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankImg, title1Text);
            view.addChild(rankImg);            
        }

        let nameTxt = ComponentManager.getTextField(data.name, 20);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, title2Text);
        view.addChild(nameTxt);

        let scoreTxt = ComponentManager.getTextField("", 20);
        scoreTxt.text = (data.score ? data.score : (data.alive ? 0 : (LanguageManager.getlocal(`acGroupWifeBattleOut-1`))))+"";

        if(view.vo.isWaiting()){
            scoreTxt.text = LanguageManager.getlocal(`acGroupWifeBattleTip11-${view.getUiCode()}`);
        }
		if(data.score == -9999)
		{
			scoreTxt.text = LanguageManager.getlocal(`acGroupWifeBattleRankOut-1`);
		}      
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, title3Text);
        view.addChild(scoreTxt);

        let lineImg = BaseBitmap.create("rank_line");
		lineImg.width = view.width-18;
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, lineImg, view);
        this.addChild(lineImg);
        //个人是否淘汰
        let need = view.vo.getCurperiod() == 2 ? view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine : 99999;
        let color = null;
        if(view.vo.isWaiting()){
            color = TextFieldConst.COLOR_WARN_YELLOW2;
        }
        else{
            if(data.alive){
                color = Number(data.rank) <= need ? TextFieldConst.COLOR_BROWN : TextFieldConst.COLOR_WARN_RED3; 
            }
            else{
                color = TextFieldConst.COLOR_WARN_YELLOW2;
            }
        }        
        if(!data.score && !data.alive)
        {
            scoreTxt.text = LanguageManager.getlocal(`acGroupWifeBattleOut-1`);
            // color = 0xaa825e;
            color = 0x858585;
        }          
        if(data.score == -9999 && view.vo.getCurperiod() > 1)
        {
            scoreTxt.text = LanguageManager.getlocal(`acGroupWifeBattleOut-1`);
            color = 0x858585;
        }
        serverTxt.textColor = nameTxt.textColor = scoreTxt.textColor = color;
    }


	public dispose():void
    {
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}