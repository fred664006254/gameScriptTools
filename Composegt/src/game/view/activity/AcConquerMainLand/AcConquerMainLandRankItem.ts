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
        view.width = 580;
        view.height = 55;
        let tarColor = TextFieldConst.COLOR_BROWN_NEW;
        if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
            tarColor = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
        }
        let pos = data.pos[0];
        let orderid = index + 1;
        if (index < 3)
        {    
            let rankImg = BaseBitmap.create("rank_"+orderid)
            rankImg.x = pos.x + (pos.width - rankImg.width) / 2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let rankTxt = ComponentManager.getTextField("",22,tarColor);
            rankTxt.text = String(index+1);
            rankTxt.x = pos.x + (pos.width - rankTxt.textWidth) / 2;
            rankTxt.y = view.height/2 - rankTxt.textHeight/2;
            view.addChild(rankTxt);
        }
		
        pos = data.pos[1];
        let zidname = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,data.zid);
        let serverTxt = ComponentManager.getTextField(zidname,22,tarColor);
		serverTxt.x = pos.x + (pos.width - serverTxt.textWidth) / 2;
        serverTxt.y = view.height/2 - serverTxt.textHeight/2;
        view.addChild(serverTxt);

        pos = data.pos[2];
		let scoreTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(data.zscore),22,tarColor);
		scoreTxt.x = pos.x + (pos.width - scoreTxt.textWidth) / 2;
        scoreTxt.y = view.height/2 - scoreTxt.textHeight/2;
        view.addChild(scoreTxt);
	

        let line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 33;
        line.y  = this.height - line.height;

    }
    
	public dispose():void
    {
        let view = this;
        view.removeTouchTap();
        super.dispose();
    }
}