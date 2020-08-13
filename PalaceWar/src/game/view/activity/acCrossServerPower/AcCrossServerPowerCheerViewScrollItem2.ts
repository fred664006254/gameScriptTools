/**
 * 排行列表
 * author ycg
 * date 2020.4.20
 * @class RankScrollItem
 */
class AcCrossServerPowerCheerViewScrollItem2  extends ScrollListItem
{
    private _maskImg:BaseBitmap;
    private _rowIdx = 0;
    private _uiData = undefined;
    private _aid :string = "";
    private _code:string = "";
    public constructor()
    {
        super();
     
    }

    private get aid():string{
        return this._aid;
    }

    private get code():string{
        return this._code;
    }

    protected getUiCode():string{
        let code = "";
        switch(Number(this.code)){
            default:
                code = `7`;
                break;
        }
        return code;        
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }	

	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    protected initItem(index:number,data:any,itemParam:any)
    {
        // console.log("intiitem ",data);
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._rowIdx = index
        this._uiData = data;

        this.width = 620;
        // this.height = 124;
        this.addTouch(this.eventHandler,this,null,true);
        let tarColor = TextFieldConst.COLOR_BROWN;

        if (data.uid){
            if(data.uid == Api.playerVoApi.getPlayerID())
            {
                tarColor = TextFieldConst.COLOR_WARN_GREEN4;
            }
        }
        else{
            if(data.aid == Api.playerVoApi.getPlayerAllianceId())
            {
                tarColor = TextFieldConst.COLOR_WARN_GREEN4;
            }
        }
        
        if (this._rowIdx < 3)
        {
            let guang = BaseBitmap.create("accshegemony_ranklistbg"+String(this._rowIdx+1));
            guang.width = this.width;
            guang.height = 76;
            guang.x = this.width/2 - guang.width/2;
            this.addChild(guang);

            let rankImg = BaseBitmap.create("accshegemonyprank"+String(this._rowIdx+1));
            rankImg.setScale(0.9);
            rankImg.x = 70-rankImg.width/2 * rankImg.scaleX - 20;
            rankImg.y = 15;//this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let guang = BaseBitmap.create("accshegemony_ranklistbg");
            guang.width = this.width;
            guang.height = 76;
            guang.x = this.width/2 - guang.width/2;
            // guang.y = this.height/2 - guang.height/2 - 2;
            this.addChild(guang);

            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
            rankTxt.text = String(this._rowIdx+1);
            rankTxt.x = 70 - rankTxt.width/2 -20;
            rankTxt.y = 30;
            this.addChild(rankTxt);
        }

        let nameTxt = ComponentManager.getTextField(this._uiData.name, TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor);
        nameTxt.x = 170 - nameTxt.width/2;
        nameTxt.y = 30;
        this.addChild(nameTxt);

        let power = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        power.text = App.StringUtil.changeIntToText(Number(this._uiData.point));
        power.x = 305 - power.width/2;
        power.y = nameTxt.y;
        this.addChild(power);

        let cheerTotal = ComponentManager.getTextField(""+this._uiData.flagScore,TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        cheerTotal.x = 430 - cheerTotal.width/2;
        cheerTotal.y = nameTxt.y;
        this.addChild(cheerTotal);

        let pCherrNum = this.vo.getVoteNumByUid(this._uiData.uid);
        let playerCheer = ComponentManager.getTextField(""+pCherrNum,TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        playerCheer.x = 550 - playerCheer.width/2;
        playerCheer.y = nameTxt.y;
        this.addChild(playerCheer);

        // let maskImg = BaseBitmap.create("rank_select_mask")
        let maskImg = BaseBitmap.create("public_9_bg29")
        maskImg.height = 76;
        maskImg.width = this.width + 4;
        maskImg.x = this.width /2 - maskImg.width/2 ;
        maskImg.y = 0;
        maskImg.visible = false;
        this._maskImg = maskImg;
        this.addChild(maskImg);
        this.cacheAsBitmap=true;
    }

    protected eventHandler(event:egret.TouchEvent)
    {
        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
                this._maskImg.visible = true;
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._maskImg.visible = false;
                break;
			case egret.TouchEvent.TOUCH_END:
            
				this._maskImg.visible = false;
                if (!this.vo.isInActivity()){
                    this.vo.showAcEndTip();
                    return;
                }

                if(!this.vo.isInFightFlagUseTime() || this.vo.isInAcPreTime()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerIsShowTimeNoFlag", this.getUiCode())));
                    return;
                }
                let num = this.vo.getFightFlagNum();
                if(num <= 0){
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerNoFlag", this.getUiCode())));
                    return;
                }

                let isLimit = this.vo.isLimitFightFlagNum(this._uiData.uid);
                if(isLimit){
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerAddFlagTooMuch", this.getUiCode()), [""+this.cfg.flagPeopleNum]));
                    return;        
                }

                let itemId = 1054;
                ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERPOWERUSEFLAGPOPUPVIEW,{aid:this.aid, code:this.code, itemId:itemId, fuid:this._uiData.uid, aname: this._uiData.name});
                break;
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
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);

        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap=false;

        super.dispose();
    }
}
