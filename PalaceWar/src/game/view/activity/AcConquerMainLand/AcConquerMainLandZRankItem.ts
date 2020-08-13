/**
 * 排行列表节点
 */
class AcConquerMainLandZRankItem  extends ScrollListItem
{
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any)
    {
        this.width = 545;
        this.height = 80;  //rankbg_1

        let tarColor = TextFieldConst.COLOR_BROWN
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        let orderid = index + 1;
        let pos = data.pos[0];
        if (index < 3)
        {    
            let rankbg = BaseBitmap.create("rankbg_"+String(index+1));
            rankbg.width = this.width;
            rankbg.height = this.height;
            rankbg.x = this.width/2 - rankbg.width/2;
            rankbg.y = this.height/2 - rankbg.height/2;
            this.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(index+1))
            rankImg.x = pos.x + (pos.width - rankImg.width) / 2 - 25;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            rankTxt.text = String(index+1);
            rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 - 25;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       
        pos = data.pos[1];
        let serverTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        serverTxt.text = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 25;
        serverTxt.y =  this.height/2 - serverTxt.height/2;;
        this.addChild(serverTxt);  

        pos = data.pos[2];
        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        powerTxt.text = App.StringUtil.changeIntToText(Number(data.zscore), 4);
        powerTxt.x = pos.x + (pos.width - powerTxt.width) / 2 - 25;
        powerTxt.y = serverTxt.y;
        this.addChild(powerTxt);
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        let lineImg = BaseBitmap.create("public_line1");
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
