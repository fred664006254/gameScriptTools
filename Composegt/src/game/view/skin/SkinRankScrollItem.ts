/**
 * 皮肤
 * author yanyuling
 * date 2018/08/13
 * @class SkinRankScrollItem
 */
class SkinRankScrollItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        this.height = 52;
        // this.width = GameConfig.stageWidth;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);

        let tarColor = TextFieldConst.COLOR_BROWN;
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_GREEN;
        }

        let startY = 16;
        if (index > 2)
        {
            // let dinner_rankbg = BaseBitmap.create("dinner_rankbg");
            // dinner_rankbg.x = 80-dinner_rankbg.width/2;
            // dinner_rankbg.y = 5 ;
            // this.addChild(dinner_rankbg);

            let titleTxt1 = ComponentManager.getTextField("",20,tarColor);
            titleTxt1.text = String(index+1);
            titleTxt1.x = 50 - titleTxt1.width/2;
            titleTxt1.y = this.height/2 - titleTxt1.height/2;
            this.addChild(titleTxt1);
        }else
        {
            let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
            rankImg.width = 51;
            rankImg.height = 47;
            rankImg.x = 50-rankImg.width/2;
            rankImg.y = 3 ;
            this.addChild(rankImg);
        }
    
        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        titleTxt2.text = data.name;
        titleTxt2.x = 185- titleTxt2.width/2;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,tarColor);
        // if(data.qu){
        //     titleTxt3.text = LanguageManager.getlocal("mergeServer",[data.qu,""+data.zid]) ;
        // }else{
        //     titleTxt3.text = LanguageManager.getlocal("ranserver2",[""+data.zid]) ;
        // }
        titleTxt3.text =  Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        titleTxt3.x = 325- titleTxt3.width/2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);

        let titleTxt4 = ComponentManager.getTextField("",titleTxt2.size,tarColor);
        let v4= data.attr;
        if(data.intimacy)
        {
            v4 = data.intimacy;
        }
        if(v4 > 0){
            titleTxt4.text = App.StringUtil.changeIntToText(v4);
        }else{
            titleTxt4.text = "" + v4;
        }
        titleTxt4.x = 435- titleTxt4.width/2;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);

        let lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 0;
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