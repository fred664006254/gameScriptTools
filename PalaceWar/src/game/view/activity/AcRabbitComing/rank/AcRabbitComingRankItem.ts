/**
 * 榜
 * qianjun
 */
class AcRabbitComingRankItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any)
    {
        this.width = 508;
        this.height = 58;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        let startY = 16;
        if (index > 2)
        {
            let titleTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN)
            titleTxt1.text = String(index+1);
            titleTxt1.x = 90 - titleTxt1.width/2 - 30;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
            if(data.uid == Api.playerVoApi.getPlayerID()){
                titleTxt1.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }else
        {
            // let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
            // rankImg.width = 51;
            // rankImg.height = 47;
            // rankImg.x = 90 - rankImg.width/2 - 30;
            // rankImg.y = 3 ;
            // this.addChild(rankImg);

            let rankbg = BaseBitmap.create("rankbg_"+String(index+1));
            rankbg.width = this.width;
            rankbg.height = this.height;
            rankbg.x = this.width/2 - rankbg.width/2;
            rankbg.y = this.height/2 - rankbg.height/2;
            this._nodeContainer.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(index+1))
            rankImg.x = 70-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this._nodeContainer.addChild(rankImg);
        }
    
        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        
        if(data.eflag && data.eflag == true)
        {
            titleTxt2.text = LanguageManager.getlocal("acRankList_allianceQuit",[data.name]);
        }
        else{
            titleTxt2.text = data.name;
        }

        titleTxt2.x = 245- titleTxt2.width/2 - 17;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,TextFieldConst.COLOR_BROWN)
        let score = 0;
        if(data.score || data.value){
            score = data.score || data.value;
        }
        titleTxt3.text = String(score);
        titleTxt3.x = 460 - titleTxt3.width/2 - 30 + 5;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);

        if(data.zid){
            let zid = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(null,true,data.zid),titleTxt2.size,TextFieldConst.COLOR_BROWN)
            zid.x = 345 - zid.width/2 - 30;
            zid.y = startY;
            this._nodeContainer.addChild(zid);
            zid.textColor = (data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()) ? TextFieldConst.COLOR_WARN_YELLOW : TextFieldConst.COLOR_BROWN;
        }

        if(data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()){
            titleTxt2.textColor = titleTxt3.textColor  = TextFieldConst.COLOR_WARN_YELLOW;
        }

        let lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 30;
        lineImg.y = 50;
        this._nodeContainer.addChild(lineImg);

    }

    public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}
    public dispose():void
    {
        this._nodeContainer = null;
        super.dispose();
    }
}