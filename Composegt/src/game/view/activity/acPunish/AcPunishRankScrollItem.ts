/**
 * 榜
 * author dky
 * date 2017/11/23
 * @class AcPunishRankScrollItem
 */
class AcPunishRankScrollItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any)
    {
        this.height = 52;
        // this.width = 508;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        let startY = 16;
        if (index > 2)
        {
            let titleTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN)
            titleTxt1.text = String(index+1);
            titleTxt1.x = 90 - titleTxt1.width/2;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
            if(data.uid == Api.playerVoApi.getPlayerID()){
                titleTxt1.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }else
        {
            let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
            rankImg.width = 51;
            rankImg.height = 47;
            rankImg.x = 90-rankImg.width/2;
            rankImg.y = 3 ;
            this.addChild(rankImg);
        }
    
        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        titleTxt2.text = data.name;
        titleTxt2.x = 245- titleTxt2.width/2;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);



        let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,TextFieldConst.COLOR_BROWN)
        titleTxt3.text = String(data.value);
        titleTxt3.x = 460- titleTxt3.width/2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);

        if(data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()){
            titleTxt2.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            titleTxt3.textColor = TextFieldConst.COLOR_WARN_YELLOW;
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
        super.dispose();
    }
}