
class AtkraceCorssRankItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = GameConfig.stageWidth;
        this.height = 52;

        // if(index % 2 == 1){
        //     let bg = BaseBitmap.create("public_tc_bg05");
        //     bg.width  = 510;
        //     bg.height = 45;
        //     bg.x = 0;  
        //     bg.y = this.height / 2 - bg.height/2;
        //     this.addChild(bg); 
        // }
        if(index > 0 ){
            let line = BaseBitmap.create("public_line4");
            line.width = 500;
            line.x = this.width/2 - line.width/2;
            line.y = -line.height/2;
            this.addChild(line);
        }

        if (index < 3)
        {
            let rankImg = BaseBitmap.create("rank_"+String(index+1))
            rankImg.x = 62-rankImg.width/2 + 60;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
			// let rankImg = BaseBitmap.create("rankinglist_rankbg")
            // rankImg.x = 62-rankImg.width/2;
            // rankImg.y = this.height/2 - rankImg.height/2;
            // this.addChild(rankImg);

            var rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
            rankTxt.text = String(index+1);
            rankTxt.x = 62 - rankTxt.width/2 + 60;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt.x = 220 - nameTxt.width/2-50 + 60;
        nameTxt.y =  this.height/2 - nameTxt.height/2;
        this.addChild(nameTxt);


        let servername = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        let serverTxt = ComponentManager.getTextField(servername,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverTxt.x =  290 + 60;////220 - nameTxt.width/2+90;
        serverTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(serverTxt);

		let scoreTxt = ComponentManager.getTextField(data.point,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		scoreTxt.x =404 - scoreTxt.width/2+20 + 60+2;
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);
		

        // let lineImg = BaseBitmap.create("dinner_line");
        // lineImg.x = 520 /2 - lineImg.width/2;
        // lineImg.y = this.height;
        // this.addChild(lineImg);

        // if(Api.playerVoApi.getPlayerName()==data.name)
        // console.log(Api.playerVoApi.getPlayerID(),data);
        if(Api.playerVoApi.getPlayerID()==data.uid)
        {
            nameTxt.textColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
            serverTxt.textColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN_NEW; 
        } 
        else
        {
            nameTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
            serverTxt.textColor = TextFieldConst.COLOR_BROWN_NEW;
            scoreTxt.textColor = TextFieldConst.COLOR_BROWN_NEW; 
        }
        
	}

	public dispose():void
    {
        super.dispose();
    }
}