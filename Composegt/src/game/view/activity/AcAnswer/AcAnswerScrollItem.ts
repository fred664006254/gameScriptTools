
class AcAnswerScrollItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 502;
        this.height = 52;

        if(index % 2 == 1){
            let bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;  
            bg.y = this.height / 2 - bg.height/2;
            this.addChild(bg);
        }

        let tarColor = TextFieldConst.COLOR_BROWN
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_GREEN;
        }

        if (index < 3)
        {
            let rankImg = BaseBitmap.create("rank_"+String(index+1))
            rankImg.x = 62-rankImg.width/2;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
            rankTxt.text = String(index+1);
            rankTxt.x = 62 - rankTxt.width/2;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
		nameTxt.x = 220 - nameTxt.width/2 +20
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

		let scoreTxt = ComponentManager.getTextField(data.value,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
		scoreTxt.x = 404 - scoreTxt.width/2+10
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);
		

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