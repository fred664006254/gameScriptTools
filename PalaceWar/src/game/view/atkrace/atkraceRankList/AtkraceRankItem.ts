
class AtkraceRankItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 502;
        this.height = 52;

        if (index < 3)
        {
            let rankImg = BaseBitmap.create("rankinglist_rank"+String(index+1))
            rankImg.x = 62-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
			let rankImg = BaseBitmap.create("rankinglist_rankbg")
            rankImg.x = 62-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);

            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(index+1);
            rankTxt.x = 62 - rankTxt.width/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);

            if(data.uid == Api.playerVoApi.getPlayerID())
            {
                rankTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt.x = 220 - nameTxt.width/2
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

		let scoreTxt = ComponentManager.getTextField(data.point,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		scoreTxt.x = 404 - scoreTxt.width/2
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);
		

        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }

        let lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = 520 /2 - lineImg.width/2;
        lineImg.y = this.height;
        this.addChild(lineImg);

	}

	public dispose():void
    {
        super.dispose();
    }
}