/**
 * author:qianjun
*/
class CouncilRewardRankItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private _data : any = null;

	protected initItem(index:number,data:any)
    {	
        let type = data.type;
        let view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 510;
        this.height = 106 + 10;
        // let desc = (570 - this.width) / 2;
        // let param = [65 - desc , 220 - desc, 373 - desc];
        let bg = BaseBitmap.create('public_tc_bg05');
        bg.width = view.width;
        bg.height = 38
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);

        let txt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_BROWN);
        if (Number(index) < 3)
        {
            txt.text = LanguageManager.getlocal("acRank_rank6",[String(index + 1)]);
            // ResourceManager.getRes("rank_1");
            let rankImg = BaseLoadBitmap.create("rank_" + String(index+1));
            rankImg.width = 49;
            rankImg.height = 39;
            // rankImg.setScale(0.75);
            view.addChild(rankImg);

            let x_dis = (bg.width - txt.textWidth - rankImg.width * rankImg.scaleX - 5) / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rankImg, bg, [x_dis,0]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txt, rankImg, [rankImg.width * rankImg.scaleX + 5,0]);
        }else{
            if(data.minRank < data.maxRank){
                txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(data.minRank),String(data.maxRank)]);
            }
            else{
                txt.text = LanguageManager.getlocal("acRank_rank6", [data.minRank.toString()]);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, bg);
        }
        this.addChild(txt);

        let serverTxt = ComponentManager.getTextField(LanguageManager.getlocal('councilRankListParam3', [data.exp]),20,TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, serverTxt, bg, [0,bg.height + 10]);
        this.addChild(serverTxt);

		let scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal('councilRankListParam4', [data.bookexp]),20,TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoreTxt, serverTxt, [0,serverTxt.textHeight + 10]);
        this.addChild(scoreTxt);
	
		// if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
		// 	serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN; 
        //     // if(rankTxt){
        //     //     rankTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        //     // }
        // }
    }

	public dispose():void
    {
        let view = this;
        view.removeTouchTap();
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}