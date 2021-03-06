/**
 * 榜
 * author dky
 * date 2017/11/23
 * @class AcCrossServerWipeBossRankScrollItem1
 */
class AcCrossServerWipeBossRankScrollItem1  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any)
    {
        this.height = 40;
        this.width = 510;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        let startY = 16;

        if(index % 2 == 1){
            let bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            bg.y = 5;
            this._nodeContainer.addChild(bg);

        }

        if (index > 2)
        {
            let titleTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN)
            titleTxt1.text = String(index+1);
            titleTxt1.x = 90 - titleTxt1.width/2 - 13;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
            if(data.uid == Api.playerVoApi.getPlayerID()){
                titleTxt1.textColor = TextFieldConst.COLOR_WARN_GREEN;
            }
        }else
        {
            let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
            rankImg.width = 49;
            rankImg.height = 39;
            rankImg.x = 90 - rankImg.width/2 - 13;
            rankImg.y = 9 ;
            this.addChild(rankImg);
        }
    
        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        titleTxt2.text = data.name;
        titleTxt2.x = 240- titleTxt2.width/2 - 30;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);

        let server = "";
        if(data.qu > 0){
            server = LanguageManager.getlocal("mergeServer",[String(data.qu),String(data.zid)]);
        } else {
            // "ranserver2":"{1}服",
            server = LanguageManager.getlocal("ranserver2",[String(data.zid)]);
        }


        let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,TextFieldConst.COLOR_BROWN)
        titleTxt3.text = server;
        titleTxt3.x = 360- titleTxt3.width/2 - 30;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);


        let titleTxt4 = ComponentManager.getTextField("",titleTxt2.size,TextFieldConst.COLOR_BROWN)
        titleTxt4.text = String(data.v);
        titleTxt4.x = 480- titleTxt4.width/2 - 30;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);

        if(data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()){
            titleTxt2.textColor = TextFieldConst.COLOR_WARN_GREEN;
            titleTxt3.textColor = TextFieldConst.COLOR_WARN_GREEN;
            titleTxt4.textColor = TextFieldConst.COLOR_WARN_GREEN;
         }



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