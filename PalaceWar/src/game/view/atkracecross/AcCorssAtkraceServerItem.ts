/**
 * author:qianjun
 * desc:区服排行榜单item
*/
class AcCorssAtkraceServerItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private _data : any = null;

	protected initItem(index:number,data:any)
    {	
        let type = data.type;
        let view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = type == 'enterIn' ? GameConfig.stageWidth : 520;
        this.height = type == 'enterIn' ? 40 : 52;
        let desc = (570 - this.width) / 2;
        let param = {
            enterIn : [143, 298, 431],
            rank : [65 - desc , 236 - desc, 407 - desc]
        };
        if (index < 3 && type != 'enterIn')
        {
            let rankImg = BaseBitmap.create("rankinglist_rank" + String(index+1))
            rankImg.x = param[type][0] + (44 - rankImg.width) / 2;;//GameConfig.stageWidth/2 - 155 - rankImg.width / 2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
			
			// let rankImg = BaseBitmap.create("rankinglist_rankbg")
            // rankImg.x = GameConfig.stageWidth/2 - 155 - rankImg.width/2;
            // rankImg.y = this.height/2 - rankImg.height/2;
			// this.addChild(rankImg);
			
			var rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(index+1);
            rankTxt.x = param[type][0] + (44 - rankTxt.textWidth) / 2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
			this.addChild(rankTxt);
		}
        
        let zidname = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,data.zid);
        let serverTxt = ComponentManager.getTextField(zidname,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverTxt.x = param[type][1] + (44 - serverTxt.textWidth) / 2;;//GameConfig.stageWidth/2 - serverTxt.textWidth/2;
        serverTxt.y = this.height/2 - serverTxt.textHeight/2;
        this.addChild(serverTxt);

		let scoreTxt = ComponentManager.getTextField(String(data.point),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		scoreTxt.x = param[type][2] + (88 - scoreTxt.textWidth) / 2;//GameConfig.stageWidth/2 + 155 - scoreTxt.textWidth/2;
        scoreTxt.y = this.height/2 - scoreTxt.textHeight/2;
        this.addChild(scoreTxt);
	
		if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
			serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN; 
            if(rankTxt){
                rankTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
            }
        }

        this.addTouchTap(this.rankClick, this);
    }
    
    private rankClick():void{
        let view = this;
        if(view._data.type == 'rank'){
            ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSRANKLISTVIEW, {
                zid : this._data.zid,
                acid : this._data.acid,
            });
        }
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK, {
		// 	zid : this._data.zid,
		// });
        //
    }

	public dispose():void
    {
        let view = this;
        view.removeTouchTap();
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}