/**
 * author:qianjun
 * desc:区服排行榜单item
*/
class AcCorssImacyServerItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {	
        let type = data.type;
        this.width = type == 'enterIn' ? GameConfig.stageWidth : 520;
        this.height = type == 'enterIn' ? 40 : 52;
        let desc = (570 - this.width) / 2;

        //  if(index % 2 == 1)
        // {
        //     let bg = BaseBitmap.create("public_tc_bg05");
        //     bg.width = 510;
        //     bg.height = 40;
        //     bg.x = this.width / 2 - bg.width/2; 
        //     bg.y = this.height / 2 - bg.height/2;
        //     this.addChild(bg); 
        // }

        let param = {
            enterIn : [143, 298, 431],
            rank : [65 - desc , 236 - desc, 407 - desc]
        };

        // if (index < 3 && type != 'enterIn')
        // {
        //     let rankImg = BaseBitmap.create("rank_"+String(index+1))
        //     rankImg.x = param[type][0] + (44 - rankImg.width) / 2;;//GameConfig.stageWidth/2 - 155 - rankImg.width / 2;
        //     rankImg.y = this.height/2 - rankImg.height/2;
        //     this.addChild(rankImg);
        // }else
        // {
		// 	let rankImg = BaseBitmap.create("rankinglist_rankbg")
        //     rankImg.x = GameConfig.stageWidth/2 - 155 - rankImg.width/2;
        //     rankImg.y = this.height/2 - rankImg.height/2;
		// 	this.addChild(rankImg);
			
			var rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(index+1);
            rankTxt.x = param[type][0] + (44 - rankTxt.textWidth) / 2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
			this.addChild(rankTxt);
		// }
		
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
			serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_CROSS_YELLOW; 
            rankTxt.textColor = TextFieldConst.COLOR_CROSS_YELLOW; 
        } else {
			serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_CROSS_RED; 
            rankTxt.textColor = TextFieldConst.COLOR_CROSS_RED; 
        }
        // if(rankTxt){
        //     rankTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        // }
        
	}

	public dispose():void
    {
        super.dispose();
    }
}