/**
 * 榜
 * author jiangliuyang
 * date 2020/1/8
 * @class AcCrossServerHegemonyMainScrollList
 */
class AcCrossServerHegemonyMainScrollList  extends ScrollListItem
{
    // private _nodeContainer:BaseDisplayObjectContainer;
    // private _maskImg:BaseBitmap;
    private _rowIdx = 0;
    private _uiData = undefined;
    private _aid = "";
    private _code = "";
    public constructor()
    {
        super();
     
    }
    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
    }
    protected initItem(index:number,data:any,param:any)
    {
        // console.log(index,data,param);
        this._rowIdx = index;
        this._uiData = data;
    
        this._aid = param.aid;
        this._code = param.code;
        

        this.width = 620;
        
        let tarColor = TextFieldConst.COLOR_BROWN;
        this.addTouch(this.eventHandler,this,null,true);
        if(String(this._uiData.aid) == String(Api.playerVoApi.getPlayerAllianceId()))
        {
            tarColor = TextFieldConst.COLOR_WARN_GREEN4;
        }
        // if(index > 0 && String(this._uiData.endflag) == "1"){
        //     tarColor = TextFieldConst.COLOR_BROWN;
        // }

        if (this._rowIdx < 3)
        {
            this.height = 80;
            // let guang = BaseBitmap.create("rank_guang"+String(this._rowIdx+1));
            let guang = BaseBitmap.create("accshegemony_ranklistbg"+(this._rowIdx+1));
            guang.width = this.width;
            guang.height = this.height;
            this.addChild(guang);

            let rankImg = BaseBitmap.create("accshegemonyprank"+String(this._rowIdx+1))
            rankImg.x = 50 - rankImg.width/2 + 10;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            this.height = 66;
            let guang = BaseBitmap.create("accshegemony_ranklistbg");
            guang.width = this.width;
            guang.height = this.height;
            this.addChild(guang);
            
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
            rankTxt.text = String(this._rowIdx+1);
            rankTxt.x = 50 - rankTxt.width/2 + 10;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
        // if(index != 0){
        //     let bg = BaseBitmap.create("public_line4");
        //     bg.width = this.width-20;
           
        //     bg.x = this.width /2 - bg.width/2;
        //     bg.y = -bg.height/2;
        //     this.addChild(bg);
        // }

        let nameTxt = ComponentManager.getTextField(this._uiData.name,20,tarColor);
        nameTxt.x = 50 + 113 + 25 - nameTxt.width/2;
        nameTxt.y = this.height/2 - nameTxt.height/2;
        this.addChild(nameTxt);

        let quStr = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(this._uiData.zid));
        

        let quTxt = ComponentManager.getTextField(quStr,20,tarColor);
        quTxt.x = 50 + 113 + 131 + 25 - quTxt.width/2;
        quTxt.y = this.height/2 - quTxt.height/2;
        this.addChild(quTxt);

        let winNumTxt = ComponentManager.getTextField(this._uiData.win,20,tarColor);
        winNumTxt.x = 50 + 113 + 131 + 100 + 35 - winNumTxt.width/2;
        winNumTxt.y = this.height/2 - winNumTxt.height/2;
        this.addChild(winNumTxt);

        let powerUpTxt = ComponentManager.getTextField(String(this._uiData.allpoweradd),20,tarColor);
        powerUpTxt.x = 50 + 113 + 131 + 100 + 110  + 35 - powerUpTxt.width/2;
        powerUpTxt.y = this.height/2 - powerUpTxt.height/2;
        this.addChild(powerUpTxt);

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
               
                
               
                // if(this._uiData.endflag == "1"){
                    
                //     App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyBattleMatchNameLose"));
                //     return;
                // }
                if (!this.vo.isInActivity()){
                    this.vo.showAcEndTip();
                    return;
                }
                if (!this.vo.isOpenActivity()){
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyRoundTip0"));
                    return ;
                }

				// this._maskImg.visible = false;
                Api.crossServerHegemonyVoApi.setMainSelectData(this._uiData);
                Api.crossServerHegemonyVoApi.setMainSearchDetail(true);
                // console.log(this._uiData);
                NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLIANCEINFO,{allianceid:Number(this._uiData.aid),activeId:this.vo.aidAndCode});
                break;
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
        // this._nodeContainer = null;
        // this._maskImg = null;
        this._rowIdx = 0;
        this._uiData = undefined;
        this._aid = "";
        this._code = "";
        super.dispose();
    }
}