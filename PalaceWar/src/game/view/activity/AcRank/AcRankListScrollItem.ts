/**
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcRankListScrollItem
 */
class AcRankListScrollItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _data : any;
    private _isShowAsk:boolean = false;
    private _isSkipClick:boolean = false;

    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any,itemParam:any)
    {
        // this.height = 52;
        this._data = data;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        // this.width = GameConfig.stageWidth;
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

        if (itemParam.skipClick)
        {
            this._isSkipClick= true;
        }

        let startY = 16;
        if (index > 2)
        {

            let rankbg = BaseBitmap.create("rankbgs_4");
            rankbg.width = 516;
            rankbg.height = 62;
            rankbg.x =27;
            rankbg.y = 0;//this.height/2 - rankbg.height/2;
            this._nodeContainer.addChild(rankbg);
            
            let titleTxt1 = ComponentManager.getTextField("",20,tarColor)
            titleTxt1.text = String(index+1);
            titleTxt1.x = 90 - titleTxt1.width/2;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
            this.height = 60;
        }else
        {
            this.height = 76;
            let rankbg = BaseBitmap.create("rankbgs_"+String(index+1));
            rankbg.width = 516;
            rankbg.height = 76;
            rankbg.x =27;
            rankbg.y = this.height/2 - rankbg.height/2;
            this._nodeContainer.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(index+1)); 
            rankImg.x = 90-rankImg.width/2;
            rankImg.y = (rankbg.height -rankImg.height)*0.5;
            this._nodeContainer.addChild(rankImg);
        }
    
        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        if(data.eflag && data.eflag == true)
        {
            titleTxt2.text = LanguageManager.getlocal("acRankList_allianceQuit",[data.name]);
            titleTxt2.x = 245- titleTxt2.width/2 + 30;
        }else
        {
            titleTxt2.text = data.name;
            titleTxt2.x = 245- titleTxt2.width/2;
        }
        
        if(index<3)
        {
            startY = 30;
        }

        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,tarColor);
        if(data.value > 0){
            titleTxt3.text = App.StringUtil.changeIntToText(data.value,1);

        }else{
            titleTxt3.text = "" +data.value;
            // if(itemParam.isShowFloor&&data.value <= -2000)
            // {
            //     titleTxt3.text = data.value + LanguageManager.getlocal("acRank_FloorTip");
            // }
        }
        titleTxt3.x = 460- titleTxt3.width/2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);

        let lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 30;
        lineImg.y = 60;
        this._nodeContainer.addChild(lineImg);
        if(index<3)
        {
            lineImg.visible = false;
        }

        if (Api.switchVoApi.checkOpenAtkracegChangegpoint()&&itemParam.type == 14 && data.value<-2000)
        {   
            let askIcon:BaseBitmap = BaseBitmap.create("activity_rank_ask");
            askIcon.setPosition( titleTxt3.x+titleTxt3.width+10 ,this.height/2-askIcon.height/2);
            this._nodeContainer.addChild(askIcon);
            askIcon.addTouchTap(this.askClick,this);

        }
        let t = this;
        this.addTouchTap(()=>{
            if (t._isShowAsk || t._isSkipClick)
            {
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{ruid:data.uid,rzid:Api.mergeServerVoApi.getTrueZid(data.uid)});
        },this);

    }
    private askClick():void
    {   
        this._isShowAsk = true;
       ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"itemUseConstPopupViewTitle",
            msg:LanguageManager.getlocal("allianceRankActiveMinus2000Tip"),
            callback:this.askCallback,
            handler:this,
            needCancel:false
        });
    }

    private askCallback():void
    {
        this._isShowAsk = false;
    }

    private userShotCallback(event:egret.Event)
    {
        if (!event.data.ret){
            return;
        }
        let data = event.data.data.data;
        if(String(data.ruid) == this._data.uid)
        {
            if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
            {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid();
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
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
        this._isShowAsk = false;
        this._isSkipClick = false;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        super.dispose();
    }
}