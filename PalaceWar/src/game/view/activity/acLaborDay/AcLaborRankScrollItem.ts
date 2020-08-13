/**
 * 排行列表节点
 */
class AcLaborRankScrollItem  extends ScrollListItem
{
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any)
    {
        this.width = 526;
        this.height = 76;  //rankbg_1

        let tarColor = TextFieldConst.COLOR_BROWN
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        let orderid = index + 1;
        if (index < 3)
        {    
            let rankbg = BaseBitmap.create("rankbg_"+String(index+1));
            rankbg.width = this.width;
            rankbg.height = this.height;
            rankbg.x = 0;
            rankbg.y = this.height/2 - rankbg.height/2;
            this.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(index+1))
            rankImg.x = 63-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            rankTxt.text = String(index+1);
            rankTxt.x = 60 - rankTxt.width/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       

        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        nameTxt.text =  data.name;
        nameTxt.x = 225 - nameTxt.width/2;
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);       

        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        powerTxt.text = App.StringUtil.changeIntToText(Number(data.value));
        powerTxt.x = 420 - powerTxt.width/2;
        powerTxt.y = nameTxt.y;
        this.addChild(powerTxt);
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        let lineImg = BaseBitmap.create("rank_line");
        lineImg.width = this.width;
        lineImg.x = 0;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);
    }

    public getSpaceX():number
	{
		return 10;
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
