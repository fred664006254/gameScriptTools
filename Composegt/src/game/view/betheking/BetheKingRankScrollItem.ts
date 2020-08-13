class BetheKingRankScrollItem  extends ScrollListItem
{
    private _maskImg:BaseBitmap;
    private _rowIdx = 0;
    private _uiData = undefined;
    static _ACVO:AcBeTheKingVo;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        this._rowIdx = index
        this._uiData = data;
        this.width = 602;
        this.height = 40;
        let tarColor = TextFieldConst.COLOR_BROWN

        if(index % 2 == 1){
            let bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = GameConfig.stageWidth /2 - bg.width/2;;
            bg.y = this.height / 2 - bg.height/2;
            this.addChild(bg);

        }

        if(this._uiData.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_GREEN;
        }

        if (this._rowIdx < 3)
        {
            let rankImg = BaseBitmap.create("rank_"+String(this._rowIdx+1))
            rankImg.x = 80-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
            rankTxt.text = String(this._rowIdx+1);
            rankTxt.x = 80 - rankTxt.width/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor);
        if(!BetheKingRankScrollItem._ACVO.zidgroup){
            nameTxt.text =  this._uiData.name;
        }else{ 
            nameTxt.text =  this._uiData.name + "<font color=0x13851e>("+ Api.mergeServerVoApi.getAfterMergeSeverName(this._uiData.uid,true,this._uiData.zid) + ")</font>"
            // LanguageManager.getlocal("atkraceCrossServeDes",[this._uiData.zid]);
        }
        
        nameTxt.y =  this.height/2 - nameTxt.height/2;
        nameTxt.x =  215-nameTxt.width/2;
        this.addChild(nameTxt);

        let voteTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        voteTxt.text =  this._uiData.cheer_num;
        voteTxt.y =  nameTxt.y;
        voteTxt.x =  410-voteTxt.width/2;
        this.addChild(voteTxt);

        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        powerTxt.text = App.StringUtil.changeIntToText(Number(this._uiData.v));
        powerTxt.x = 545 - powerTxt.width/2;
        powerTxt.y = nameTxt.y;
        this.addChild(powerTxt);
        this.touchEnabled = true;
        this.addTouch(this.eventHandler,this,null,true);

    }

    protected eventHandler(event:egret.TouchEvent)
    {
        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_END:
                if(this._uiData.zid){
                    App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
                    NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{ruid:this._uiData.uid,rzid:this._uiData.zid});
                }else{
                    App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
                    NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._uiData.uid});
                }
        }
    }
    
    protected userShotCallback(event:egret.Event)
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        let rdata = event.data.data;
        let ret = rdata.ret;
        if(rdata.ret != 0){
            App.CommonUtil.showTip("requestLoadErrorTip");
            return;
        }
        if(String(rdata.data.ruid) == this._uiData.uid)
        {
            if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
            {
                rdata.data['zid'] = this._uiData.zid;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW,rdata.data);
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

        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);

        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap=false;

        super.dispose();
    }
}
