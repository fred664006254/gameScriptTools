/**
 * 排行列表节点2
 * author yanyuling
 * date 2017/10/25
 * @class RankCrossScrollItem
 */
class RankCrossScrollItem  extends ScrollListItem
{
    private _maskImg:BaseBitmap;
    private _rowIdx = 0;
    private _uiData = undefined;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this.refreshSelectStatus,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);

        this._rowIdx = index;
        this._uiData = data;

        this.width = 555;
        this.height = 116;

        let bg = BaseBitmap.create("public_line4");
        bg.width = 555;
        // bg.height = 116;
        
        bg.x = 0;
        bg.y = 0 - bg.height/2;
        this.addChild(bg);

        if(index == 0){
            bg.visible = false;
        }
    

        let tarColor = TextFieldConst.COLOR_BROWN_NEW
        if(this._uiData.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }

        if (this._rowIdx < 3)
        {
            let guang = BaseBitmap.create("rank_guang"+String(this._rowIdx+1));
            guang.height = this.height;
            guang.x = this.width/2 - guang.width/2;
            guang.y = this.height/2 - guang.height/2;
            this.addChild(guang);

            let rankImg = BaseBitmap.create("rank_"+String(this._rowIdx+1))
            rankImg.x = bg.x + 45-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            // let rankImg = BaseBitmap.create("dinner_rankbg")
            // rankImg.x = bg.x + 57-rankImg.width/2;
            // rankImg.y = bg.y + 20;
            // this.addChild(rankImg);

            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
            rankTxt.text = String(this._rowIdx+1);
            rankTxt.x =  bg.x + 45 - rankTxt.width/2;// rankImg.x + rankImg.width/2 - rankTxt.width/2;
            rankTxt.y =  this.height/2 - rankTxt.height/2;//rankImg.y + rankImg.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
    
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        nameTxt.text =  "<font u ='true'>" + this._uiData.gname  + "</font>" + "("+ LanguageManager.getlocal("servant_infoLv") + ": " +  this._uiData.level +")";
        nameTxt.x =  bg.x + 90;
        nameTxt.y =  bg.y + 20;
        this.addChild(nameTxt);

        let allianceMasterTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        allianceMasterTxt.text =  LanguageManager.getlocal("allianceRankLeaderName",  [this._uiData.creatorname] );
        allianceMasterTxt.x =  nameTxt.x ;
        allianceMasterTxt.y =  nameTxt.y + 38 ;
        this.addChild(allianceMasterTxt);

        let memCountTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        memCountTxt.text = LanguageManager.getlocal("allianceMemberTitle",[this._uiData.mn + "/" + this._uiData.maxmn]);
        memCountTxt.x =  nameTxt.x + 280;
        memCountTxt.y =  allianceMasterTxt.y ;
        this.addChild(memCountTxt);

        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        powerTxt.text =  LanguageManager.getlocal("allianceRankTotalPower",[App.StringUtil.changeIntToText(Number(this._uiData.affect))]);
        powerTxt.x =  allianceMasterTxt.x ;
        powerTxt.y =  allianceMasterTxt.y + 30 ;
        this.addChild(powerTxt);

        let zoneTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        let sidname = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,this._uiData.zid);
        zoneTxt.text = LanguageManager.getlocal("rankServer") +": " +sidname  ;
        zoneTxt.x =  memCountTxt.x ;
        zoneTxt.y =  powerTxt.y ;
        this.addChild(zoneTxt);

    }

    protected eventHandler(event:egret.TouchEvent)
    {
        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
                // this._maskImg.visible = true;
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                // this._maskImg.visible = false;
                break;
			case egret.TouchEvent.TOUCH_END:
				// this._maskImg.visible = false;
                // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this._rowIdx);
                // NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{ruid:this._uiData.creator});
                break;
        }
    }
    protected refreshSelectStatus(event: egret.Event )
    {
        let idx = event.data;
        if (this._rowIdx != idx)
        {
            this._maskImg.visible = false;
        }
    }
    
    protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        if(String(data.ruid) == this._uiData.uid)
        {
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW,data);
        }
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
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this.refreshSelectStatus,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap=false;

        super.dispose();
    }
}
