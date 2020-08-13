/**
 * 排行列表节点
 * author yanyuling
 * date 2017/10/25
 * @class RankScrollItem
 */
class AcCrossServerHegemonyFlagScrollList3  extends ScrollListItem
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
    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
    }
    private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
    }
    protected initItem(index:number,data:any,itemParam: any)
    {
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this.refreshSelectStatus,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);

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
            guang.height = 120;
            guang.x = this.width/2 - guang.width/2;
            // guang.y = this.height/2 - guang.height/2 - 2;
            this.addChild(guang);

            let rankImg = BaseBitmap.create("accshegemonyprank"+String(this._rowIdx+1));
            rankImg.setScale(0.8);
            rankImg.x = 70-rankImg.width/2 * rankImg.scaleX - 20;
            rankImg.y = 10;//this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let guang = BaseBitmap.create("accshegemony_ranklistbg");
            guang.width = this.width;
            guang.height = 120;
            guang.x = this.width/2 - guang.width/2;
            // guang.y = this.height/2 - guang.height/2 - 2;
            this.addChild(guang);

            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
            rankTxt.text = String(this._rowIdx+1);
            rankTxt.x = 70 - rankTxt.width/2 -20;
            rankTxt.y = 23;
            this.addChild(rankTxt);
        }
        // if(index != 0){
        //     let bg = BaseBitmap.create("public_line1");
        //     bg.width = 570;//this.width-20;
           
        //     bg.x = this.width /2 - bg.width/2;
        //     bg.y = -bg.height/2;
        //     this.addChild(bg);
        // }

        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        nameTxt.text =  this._uiData.name;
        nameTxt.x = 90;
        nameTxt.y = 20;
        this.addChild(nameTxt);

        let creatorName = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        creatorName.text =  LanguageManager.getlocal("acCrossServerHegemonyFlagCreatorName",[this._uiData.creatorname]) ;
        creatorName.x = 30;
        creatorName.y = 57;
        this.addChild(creatorName);



        let mn = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        mn.text = LanguageManager.getlocal("acCrossServerHegemonyFlagMn",[String(this._uiData.mn),String(this._uiData.maxmn)]) ;
        mn.x = 220;
        mn.y = 57;//qu.y;
        this.addChild(mn);


        let score = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        score.text = ""+(Number(this._uiData.score) * this.cfg.flagScoreNum);
        score.x = 428 - score.width/2 + 7;
        score.y = 57;
        this.addChild(score);

        let pscore = this.vo.getFlagNumByAid(this._uiData.aid);
        let plusScore = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        plusScore.text =  ""+(pscore * this.cfg.flagScoreNum);
        plusScore.x = 530 - plusScore.width/2 + 10;
        plusScore.y = 57;
        this.addChild(plusScore);

        let qu = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        // console.log("qu-->",this._uiData.zid,this._uiData)
        // console.log("quStr->",Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(this._uiData.zid)));
        qu.text = LanguageManager.getlocal("acCrossServerHegemonyFlagQu",[Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(this._uiData.zid))]) ;  //String(this._uiData.score);
        qu.x = creatorName.x;
        qu.y = creatorName.y + creatorName.height + 5;
        this.addChild(qu);

        let power = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        power.text =  LanguageManager.getlocal("acCrossServerHegemonyFlagPower",[App.StringUtil.changeIntToText(Number(this._uiData.allpower))]) ;
        power.x = 220;
        power.y = qu.y;
        this.addChild(power);
 

        
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        // let lineImg = BaseBitmap.create("rank_line");
        // lineImg.x = GameConfig.stageWidth /2 - lineImg.width/2;
        // lineImg.y = this.height;
        // this.addChild(lineImg);

        // let maskImg = BaseBitmap.create("rank_select_mask")
        let maskImg = BaseBitmap.create("public_9_bg29")

        // maskImg.height = 42;
        maskImg.height = 120;
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
                // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICR_REFRESH_RANKITEM,this._rowIdx);
                // // NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._uiData.uid});
                // if(this._uiData.zid){
                //     NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{ruid:this._uiData.uid,rzid:this._uiData.zid});
                // }else{
                //     NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._uiData.uid});
                // }
                if (!this.vo.isInActivity()){
                    this.vo.showAcEndTip();
                    return;
                }

                if(this.vo.isShowTime()){

                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyIsShowTimeNoFlag"));
                    return;
                }
                let itemId = this.vo.getToolItemId();
                let num = this.vo.getSpecailToolNum();
                if(num <= 0){
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyNoFlag"));
                    return;
                }

                let canAddFlag = this.vo.checkCanAddFlagNum(this._uiData.aid);
                
                // let addFlagNum = this.vo.getAddFlagNum();
                if(!canAddFlag){
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyAddFlagTooMuch"));
                    return;        
                }

                let status = this.vo.getCurStatus();
                if(status >= 11){
                    App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyAddFlagTooLast"));
                    return;          
                }

                ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYUSEFLAGPOPUPVIEW,{aid:this._aid,code:this._code,itemId:itemId, allid:this._uiData.aid, aname:this._uiData.name});
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
    
    // protected userShotCallback(event:egret.Event)
    // {
    //     let rdata = event.data.data;
    //     let ret = rdata.ret;
    //     if(rdata.ret != 0){
    //         App.CommonUtil.showTip("requestLoadErrorTip");
    //         return;
    //     }
    //     if(String(rdata.data.ruid) == this._uiData.uid)
    //     {
    //         if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
    //         {
    //             // rdata.data["crossZone"] = 1;
    //             rdata.data['zid'] = this._uiData.zid;
    //         }
    //         ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW,rdata.data);
    //     }
    // }
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
