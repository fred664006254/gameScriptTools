
class AtkraceCorssFengyunRankItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private _data : any = null;
	protected initItem(index:number,data:any)
    {
		this.width = 520;
        this.height = 75;
        this._data = data;
        if (index < 3)
        {
            let rankbg = BaseBitmap.create("rankbgs_"+String(index+1));
            rankbg.width = 520;
            rankbg.height = 75;
            this.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(index+1))
            rankImg.x = 62-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let rankbg = BaseBitmap.create("rankbgs_4");
            rankbg.width = 520;
            rankbg.height = 75;
            this.addChild(rankbg);

            var rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(index+1);
            rankTxt.x = 62 - rankTxt.width/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       
        let tarColor = TextFieldConst.COLOR_BROWN;
        if(data.uid){
            if( data.uid == Api.playerVoApi.getPlayerID())
            {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }       

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
		nameTxt.x = 220 - nameTxt.width/2-40;
        nameTxt.y =  this.height/2 - nameTxt.height/2;
        this.addChild(nameTxt);

        let servername = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        let serverTxt = ComponentManager.getTextField(servername,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
		serverTxt.x =  277;////220 - nameTxt.width/2+90;
        serverTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(serverTxt);

		let scoreTxt = ComponentManager.getTextField(data.point,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
        // if(Api.switchVoApi.checkOpenAtkracegChangegpoint())
        // {
        //     if(data.point <= -2000)
        //     {
        //          scoreTxt.text = data.point + LanguageManager.getlocal("acRank_FloorTip");
        //     }
        // }
		scoreTxt.x =404 - scoreTxt.width/2+20
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);
		

        let lineImg = BaseBitmap.create("rank_line");
        lineImg.x = 520 /2 - lineImg.width/2;
        lineImg.y = this.height;
        this.addChild(lineImg);

        // if(Api.playerVoApi.getPlayerName()==data.name)
        // {
        //     nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        //     serverTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        //     scoreTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW; 
        // } 
        this.addTouchTap(this.clickItemHandler,this,[]);
    }
    private clickItemHandler(event: egret.TouchEvent): void {	
		this.showUserInfo();
    }
    
	private showUserInfo(){
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_USERSHOT,{ruid:this._data.uid});
    }

    protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_USERSHOT),this.userShotCallback,this)
    }

	public dispose():void
    {
        let view = this;
        view.removeTouchTap();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_USERSHOT),this.userShotCallback,this)
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}