/**
 * author:qianjun
 * desc:区服排行榜单item
*/
class AcConquerMainLandRankItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private _data : any = null;

	protected initItem(index:number,data:any){	
        let view = this;
        view._data = data;
        view.width = GameConfig.stageWidth;
        view.height = 35;
       
        let pos = data.pos[0];

        let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rankTxt.text = String(index+1);
        rankTxt.x = pos.x + (pos.width - rankTxt.textWidth) / 2;
        rankTxt.y = view.height/2 - rankTxt.textHeight/2;
        view.addChild(rankTxt);
		
        pos = data.pos[1];
        let zidname = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,data.zid);
        let serverTxt = ComponentManager.getTextField(zidname,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverTxt.x = pos.x + (pos.width - serverTxt.textWidth) / 2;;//GameConfig.stageWidth/2 - serverTxt.textWidth/2;
        serverTxt.y = view.height/2 - serverTxt.textHeight/2;
        view.addChild(serverTxt);

        pos = data.pos[2];
		let scoreTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(data.zscore, 4),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		scoreTxt.x = pos.x + (pos.width - scoreTxt.textWidth) / 2;//GameConfig.stageWidth/2 + 155 - scoreTxt.textWidth/2;
        scoreTxt.y = view.height/2 - scoreTxt.textHeight/2;
        view.addChild(scoreTxt);
	
		if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
			serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
            if(rankTxt){
                rankTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE;
            }
        }

        // this.addTouchTap(this.rankClick, this);
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