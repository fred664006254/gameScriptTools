/**
 * 帮会充值列表节点 (累计)
 * author yanyuling
 * date 2017/11/06
 * @class AcRankListScrollItem
 */
class AcAlliaceTotalListScrollItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _data : any;
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any)
    {
        this.height = 52;
        this._data = data;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);

        let tarColor = TextFieldConst.COLOR_BROWN
        if(data.uid){
            if( data.uid == Api.playerVoApi.getPlayerID())
            {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }else{
            if( data.id == Api.playerVoApi.getPlayerAllianceId())
            {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }

        let startY = 16; 
        let titleTxt1 = ComponentManager.getTextField("",20,tarColor)
        titleTxt1.text = String(index+1);
        titleTxt1.x = 90 - titleTxt1.width/2;
        titleTxt1.y = startY;
        this._nodeContainer.addChild(titleTxt1);
       
    
        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        if(data[0])
        {
            titleTxt2.text =data[0]+""; //LanguageManager.getlocal("acRankList_allianceQuit",[data.name]);
            titleTxt2.x = 245- titleTxt2.width/2 + 30;
        } 
        
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,tarColor); 
        titleTxt3.text = LanguageManager.getlocal("allianceMemberPo"+data[1]); 

        titleTxt3.x = 460- titleTxt3.width/2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);

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