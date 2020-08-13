/**
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcRankListScrollItem
 */
class AcRankListScrollItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        this.width = 530;
        if(index != 0)
        {
            let bg = BaseBitmap.create("public_line4");
            bg.width = 500;
            // bg.height = 40;
            bg.x = this.width/2 - bg.width/2;  
            bg.y = -bg.height/2;
            this.addChild(bg); 
         }

        this.height = 50; 
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        this._nodeContainer.x=0; 
  
        let tarColor = TextFieldConst.COLOR_BROWN_NEW;
        if(data.uid){
            if( data.uid == Api.playerVoApi.getPlayerID())
            {
                tarColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
            }
        }else{
            if( data.id == Api.playerVoApi.getPlayerAllianceId())
            {
                tarColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
            }
        }

        let startY = 16;
        if (index > 2)
        {
            let titleTxt1 = ComponentManager.getTextField("",20,tarColor)
            titleTxt1.text = String(index+1);
            titleTxt1.x = 70 - titleTxt1.width/2;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
        }else
        {
            let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
            rankImg.width = 51;
            rankImg.height = 47;
            rankImg.x = 70-rankImg.width/2;
            rankImg.y = 3 ;
            this.addChild(rankImg);
        }
    
        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        if(data.eflag && data.eflag == true)
        {
            titleTxt2.text = LanguageManager.getlocal("acRankList_allianceQuit",[data.name]);
            titleTxt2.x = 225- titleTxt2.width/2;
        }else
        {
            titleTxt2.text = data.name;
            titleTxt2.x = 225- titleTxt2.width/2;
        }
        
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,tarColor)
        titleTxt3.text = String(data.value);
        titleTxt3.x = 440- titleTxt3.width/2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3); 

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
        this._nodeContainer =null;
        super.dispose();
    }
}