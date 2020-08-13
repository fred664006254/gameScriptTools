
class TradeRankItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 510;
        this.height = 40;
        if(index % 2 == 1){
            let bg = BaseBitmap.create("public_tc_bg05");
            // bg.x = 5;
            // bg.y = 10;
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            // bg.y = 5;ß
            this.addChild(bg);

        }
        let tarColor = TextFieldConst.COLOR_BROWN
        if( data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_GREEN;
        }

        if (index < 3)
        {
            let rankImg = BaseBitmap.create("rank_"+String(index+1))
            rankImg.x = 72-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
			// let rankImg = BaseBitmap.create("rankinglist_rankbg")
            // rankImg.x = 72-rankImg.width/2;
            // rankImg.y = this.height/2 - rankImg.height/2;
            // this.addChild(rankImg);

            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
            rankTxt.text = String(index+1);
            rankTxt.x = 72 - rankTxt.width/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
		nameTxt.x = 220 - nameTxt.width/2
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

		let scoreTxt = ComponentManager.getTextField(data.point,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
		scoreTxt.x = 404 - scoreTxt.width/2
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);
		

        // let lineImg = BaseBitmap.create("dinner_line");
        // lineImg.x = 520 /2 - lineImg.width/2;
        // lineImg.y = this.height;
        // this.addChild(lineImg);

	}

	public dispose():void
    {
        super.dispose();
    }
}