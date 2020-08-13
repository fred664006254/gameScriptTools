
/**
 * author:qianjun
 * desc:个人排行榜单item
*/
class AcCorssImacyPRankItem extends ScrollListItem
{
    private _data;
    public constructor() {
		super();
	}

	protected initItem(index:number,data:any, itemParam?:any)
    {
        let type = data.type;
        this._data = data;
        this.width = type == 'enterIn' ? 502 : 520;
        this.height = type == 'enterIn' ? 32 : 52;
        let desc = (570 - this.width) / 2;
        let param = {
            enterIn : [40, 184, 372, 516],
            rank : [65 - desc, 160 - desc, 300 - desc, 407 - desc]
        };
        let itemIndex = (itemParam && itemParam.index || itemParam.index == 0) ? itemParam.index + index : index;
        if (itemIndex < 3 && type != 'enterIn')
        {
            let rankImg = BaseBitmap.create("rankinglist_rank"+String(itemIndex+1))
            rankImg.x = param[type][0] + (44 - rankImg.width) / 2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
			// let rankImg = BaseBitmap.create("rankinglist_rankbg")
            // rankImg.x = param[type][0] + (44 - rankImg.width)/2;
            // rankImg.y = this.height/2 - rankImg.height/2;
            // this.addChild(rankImg);

            var rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(itemIndex+1);
            rankTxt.x = param[type][0] + (44 - rankTxt.textWidth)/2;;//62 - rankTxt.textWidth/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt.x = param[type][1] + (88 - nameTxt.textWidth) / 2;
        nameTxt.y =  this.height/2 - nameTxt.height/2;
        this.addChild(nameTxt);
        this.addTouchTap(this.clickItemHandler,this, []);

        let sidname = '';
        if(data.uid){
            sidname = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        }
        else{
            sidname = LanguageManager.getlocal("ranserver2",[data.zid.toString()]);
        }
        
        let serverTxt = ComponentManager.getTextField(sidname,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverTxt.x = param[type][2] + (44 - serverTxt.textWidth) / 2;
        serverTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(serverTxt);

        let pointstr = App.StringUtil.changeIntToText(data.point);
        if (data.acid == "newCrossServerAtkRace")
        {
           pointstr = String(data.point);
            if(data.point < -8888)
            {
                pointstr = LanguageManager.getlocal("newatkraceRankLess");
            }
        }
        if(data.acid == "crossServerAtkRace")
        {
            pointstr = String(data.point);
        }
		let scoreTxt = ComponentManager.getTextField(pointstr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		scoreTxt.x = param[type][3] + (88 - scoreTxt.textWidth) / 2;
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);

        if(Api.playerVoApi.getPlayerName() == data.name)
        {
            nameTxt.textColor = serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
            if(rankTxt){
                rankTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
            } 
        } 
        if(Api.playerVoApi.getPlayerName() != data.name &&  Api.mergeServerVoApi.judgeIsSameServer(data.zid, Api.mergeServerVoApi.getTrueZid())){
            nameTxt.textColor = serverTxt.textColor = scoreTxt.textColor = 0x80e9fc;
            if(rankTxt){
                rankTxt.textColor = 0x80e9fc;
            }
        }
    }
    
    private clickItemHandler(event: egret.TouchEvent): void {	
		this.showUserInfo();
    }
    
	private showUserInfo(){
        if(this._data.imacy || this._data.crosspower){
            let net = this._data.crosspower ? NetRequestConst.REQUEST_POWER_USERSHOT : NetRequestConst.REQUEST_IMACY_USERSHOT; 
            App.MessageHelper.addEventListener(NetManager.getMessageName(net),this.userShotCallback,this)
            NetManager.request(net,{ruid:this._data.uid});
        }
    }

    protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        // }
        let net = this._data.crosspower ? NetRequestConst.REQUEST_POWER_USERSHOT : NetRequestConst.REQUEST_IMACY_USERSHOT; 
        App.MessageHelper.removeEventListener(NetManager.getMessageName(net),this.userShotCallback,this)
    }


	public dispose():void
    {
        this.removeTouchTap();
        super.dispose();
    }
}