class LadderRankViewTab1Item  extends ScrollListItem
{   
    private _data:any = null;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any,itemparam:any)
    {   
        this._data = data;
        let tarColor = TextFieldConst.COLOR_BROWN
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = 0xa77c38;
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
            rankbg.width = 606;
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
            rankbg.width = 606;
            rankbg.scaleY = 70/rankbg.height;
            rankbg.x =0;
            rankbg.y = 0;
            this.addChild(rankbg);

            let rankTxt = ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            rankTxt.text = String(index+1);
            rankTxt.x = 68 - rankTxt.width/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        nameTxt.x = 176 - nameTxt.width/2;
        nameTxt.y = this.height/2-nameTxt.height/2;
        this.addChild(nameTxt);

        let serverTxt = ComponentManager.getTextField(data.zid,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        serverTxt.x = 438 - serverTxt.width/2;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);

        let scoreTxt = ComponentManager.getTextField(data.value,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        scoreTxt.x = 538 - scoreTxt.width/2;
        scoreTxt.y = nameTxt.y;
        this.addChild(scoreTxt);

        if (data.title &&  data.title.title && data.title.title != "")
        {   
            let officerImg = App.CommonUtil.getTitlePic(data.title);
            let deltaV = 0.8;
            officerImg.setScale(deltaV);
            officerImg.x = 260; 
            officerImg.y = nameTxt.y + nameTxt.height/2 - officerImg.height*officerImg.scaleY/2;
            this.addChild(officerImg);
        }
        else
        {
            let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            officerTxt.text = LanguageManager.getlocal("officialTitle"+ data.level);
            officerTxt.x = 320-officerTxt.width/2;
            officerTxt.y = nameTxt.y;
            this.addChild(officerTxt);
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this.addTouchTap(()=>{
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{
                ruid:data.uid,
                rzid:Api.mergeServerVoApi.getTrueZid(data.uid)
            });
        },this);
    }

    private userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        if(String(data.ruid) == this._data.uid)
        {
            if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
            {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(this._data.uid);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        }
    }

    public dispose(): void {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this._data = null;
        
        super.dispose();
	}
}