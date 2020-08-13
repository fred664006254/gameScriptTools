
/**
 * author:qianjun
 * desc:个人排行榜单item
*/
class AcCorssImacyPRankItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
        let type = data.type;
        this.width = type == 'enterIn' ? 502 : 520;
        this.height = type == 'enterIn' ? 40 : 52;
        let desc = (570 - this.width) / 2;
        let param = {
            enterIn : [40, 184, 372, 516],
            rank : [65 - desc, 160 - desc, 300 - desc, 407 - desc]
        };

        // if(index % 2 == 1)
        // {
        //    let bg = BaseBitmap.create("public_tc_bg05");
        //     bg.width = 510;
        //     bg.height = 40;
        //     bg.x = this.width / 2 - bg.width/2; 
        //     bg.y = this.height / 2 - bg.height/2;
        //     this.addChild(bg); 
        // }

        // if (index < 3 && type != 'enterIn')
        // {
        //     let rankImg = BaseBitmap.create("rank_"+String(index+1))
        //     rankImg.x = param[type][0] + (44 - rankImg.width) / 2;
        //     rankImg.y = this.height/2 - rankImg.height/2;
        //     this.addChild(rankImg);
        // }else
        // {
			// let rankImg = BaseBitmap.create("rankinglist_rankbg")
            // rankImg.x = param[type][0] + (44 - rankImg.width)/2;
            // rankImg.y = this.height/2 - rankImg.height/2;
            // this.addChild(rankImg);

            var rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_CROSS_RED);
            rankTxt.text = String(index+1);
            rankTxt.x = param[type][0] + (44 - rankTxt.textWidth)/2;;//62 - rankTxt.textWidth/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        // }
       
        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_CROSS_RED);
		nameTxt.x = param[type][1] + (88 - nameTxt.textWidth) / 2;
        nameTxt.y =  this.height/2 - nameTxt.height/2;
        this.addChild(nameTxt);

        let sidname = '';
        if(data.uid){
            sidname = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        }
        else{
            sidname = LanguageManager.getlocal("ranserver2",[data.zid.toString()]);
        }

        let serverTxt = ComponentManager.getTextField(sidname,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_CROSS_RED);
		serverTxt.x = param[type][2] + (44 - serverTxt.textWidth) / 2;
        serverTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(serverTxt);

		let scoreTxt = ComponentManager.getTextField(data.point,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_CROSS_RED);
		scoreTxt.x = param[type][3] + (88 - scoreTxt.textWidth) / 2;
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);

        if(Api.playerVoApi.getPlayerName() == data.name)
        {
            nameTxt.textColor = serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_CROSS_YELLOW;
            if(rankTxt){
                rankTxt.textColor = TextFieldConst.COLOR_CROSS_YELLOW;
            } 
        } 
        if(Api.playerVoApi.getPlayerName() != data.name && Api.mergeServerVoApi.judgeIsSameServer(data.zid, Api.mergeServerVoApi.getTrueZid())){
            nameTxt.textColor = serverTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_CROSS_YELLOW;
            if(rankTxt){
                rankTxt.textColor = TextFieldConst.COLOR_CROSS_YELLOW;
            }
        }
	}

	public dispose():void
    {
        super.dispose();
    }
}