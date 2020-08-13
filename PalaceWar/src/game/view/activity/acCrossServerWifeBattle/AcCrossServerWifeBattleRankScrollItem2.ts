/**
 * 榜
 * author dky
 * date 2017/11/23
 * @class AcCrossServerWifeBattleRankScrollItem2
 */
class AcCrossServerWifeBattleRankScrollItem2  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _maskImg:BaseBitmap;
    private _data:any;
    private aid:string;
    private code:string;
    public constructor()
    {
        super();
     
    }
    private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
    }
    protected initItem(index:number,data:any,itemParam:any)
    {   
        this.aid = itemParam.aid;
        this.code = itemParam.code;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this.height = 40;
        this.width = 610;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        let startY = 16;
        this._data = data;
        this._data = data;
        let tarColor = TextFieldConst.COLOR_BROWN
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW2;
        }
        let rankbg:BaseBitmap;
        if (index < 3)
        {   
            let bgpic = ""
            if (index == 0)
            {
                bgpic = "public_9_bg66";
            }
            else if (index == 1)
            {
                bgpic = "public_9_bg69";
            }
            else
            {
                bgpic = "public_9_bg68";
            }

            this.height =  88; 
            rankbg = BaseBitmap.create(bgpic);
            rankbg.width = 610;
            rankbg.scaleY = 88/rankbg.height;
            rankbg.x =0;
            rankbg.y = 0;
            this.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(index+1));
            rankImg.x = 68-rankImg.width/2;
            rankImg.y = 44 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {   
            this.height =  70; 
            rankbg = BaseBitmap.create("public_9_bg70");
            rankbg.width = 610;
            rankbg.scaleY = 70/rankbg.height;
            rankbg.x =0;
            rankbg.y = 0;
            this.addChild(rankbg);

            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            rankTxt.text = String(index+1);
            rankTxt.x = 68 - rankTxt.width/2;
            rankTxt.y = 25;
            this.addChild(rankTxt);
        }

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        nameTxt.x = 176 - nameTxt.width/2;
        nameTxt.y = this.height/2-nameTxt.height/2;
        this.addChild(nameTxt);

        let server = "";
        if(this.vo.getQuByZid(data.zid) > 0){
            // server = LanguageManager.getlocal("mergeServer",[String(data.qu),String(data.zid)]);
             server = LanguageManager.getlocal("mergeServerOnlyqu",[String(this.vo.getQuByZid(data.zid))]);
        } else {
            // "ranserver2":"{1}服",
            server = LanguageManager.getlocal("ranserver2",[String(data.zid)]);
        }

        let serverTxt = ComponentManager.getTextField(server,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        serverTxt.x = 438 - serverTxt.width/2;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);

        let scoreTxt = ComponentManager.getTextField(data.point,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        scoreTxt.x = 538 - scoreTxt.width/2;
        scoreTxt.y = nameTxt.y;
        this.addChild(scoreTxt);

        if (data.info &&  data.info.title && data.info.title.title)
        {   
            let officerImg = App.CommonUtil.getTitlePic(data.info.title);
            let deltaV = 0.8;
            officerImg.setScale(deltaV);
            officerImg.x = 260; 
            officerImg.y = nameTxt.y + nameTxt.height/2 - officerImg.height*officerImg.scaleY/2;
            this.addChild(officerImg);
        }
        else
        {
            let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            officerTxt.text = LanguageManager.getlocal("officialTitle"+ data.info.level);
            officerTxt.x = 320-officerTxt.width/2;
            officerTxt.y = nameTxt.y;
            this.addChild(officerTxt);
            if(data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()){
                officerTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
            }
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this.addTouchTap(()=>{
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{
                ruid:data.uid,
                rzid:Api.mergeServerVoApi.getTrueZid(data.uid)
            });
        },this);

        if(data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()){
            nameTxt.textColor = serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
        }
        // this.addTouch(this.eventHandler,this,null,true);
        // let maskImg = BaseBitmap.create("public_9_bg29")

        // // maskImg.height = 42;
        // maskImg.height = 54;
        // maskImg.width = 500;
        // maskImg.x = 15//this.width / 2 - maskImg.width/2;
        // maskImg.y = -2//this.height/2 - maskImg.height/2 + 5;
        // maskImg.visible = false;
        // this._maskImg = maskImg;
        // this.addChild(maskImg);

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
  
                // NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._uiData.uid});
                if(this._data.zid){
                    NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{ruid:this._data.uid,rzid:this._data.zid});
                }else{
                    NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._data.uid});
                }
                break;
        }
    }

    protected userShotCallback(event:egret.Event)
    {
        let rdata = event.data.data;
        let ret = rdata.ret;
        if(rdata.ret != 0){
            App.CommonUtil.showTip("requestLoadErrorTip");
            return;
        }
        if(String(rdata.data.ruid) == this._data.uid)
        {
            if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
            {
                // rdata.data["crossZone"] = 1;
                rdata.data['zid'] = this._data.zid;
                rdata.data["isCrossWifeBattle"] = true;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,rdata.data);
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
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);

        this._nodeContainer = null;
        this._maskImg = null;
        this._data = null;
        this.aid = null;
        this.code = null;
        super.dispose();
    }
}