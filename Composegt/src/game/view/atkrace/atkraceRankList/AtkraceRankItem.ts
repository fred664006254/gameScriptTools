
class AtkraceRankItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:AtkraceRankItemInfo)
    {
		this.width = 530;
        this.height = 50;

        // if(index % 2 == 1){
        //     let bg = BaseBitmap.create("public_tc_bg05");
        //     bg.width = 510;
        //     bg.height = 40;
        //     bg.x = 0;  
        //     bg.y = this.height / 2 - bg.height/2;
        //     this.addChild(bg);

        // }
        if(index>0){
            let line = BaseBitmap.create("public_line4");
            line.width = 500;
            line.x = this.width/2 - line.width/2;
            line.y = - line.height/2;
            this.addChild(line);
        }

        let tarColor = TextFieldConst.COLOR_BROWN_NEW
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
        }

        if (index < 3)
        {
            let rankImg = BaseBitmap.create("rank_"+String(index+1))
            rankImg.x = 62-rankImg.width/2+20;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
			 

            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
            rankTxt.text = String(index+1);
            rankTxt.x = 62 - rankTxt.width/2+20;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
		nameTxt.x = 220 - nameTxt.width/2 +30
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

		let scoreTxt = ComponentManager.getTextField(""+data.point,TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
		scoreTxt.x = 404 - scoreTxt.width/2+20
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

interface AtkraceRankItemInfo {
    uid: number,
    name: string,
    point: number,
    level?: number,
    title?: string
}

