
class DinnerMsgPopupScollItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		// this.width = 516;
        // this.height = 126;

		let bg = BaseBitmap.create("public_listbg");
		bg.width=535 - 20;
		bg.height=126;
		
		this.addChild(bg);

		let rankImg = BaseBitmap.create("rankinglist_rankbg");
		rankImg.x = bg.x+20
		rankImg.y = 10;
		this.addChild(rankImg);
		rankImg.visible =false;

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		rankTxt.text = String(index+1);
		rankTxt.x = rankImg.x+(rankImg.width-rankTxt.width)/2 + 20;
		rankTxt.y = rankImg.y+10;
		this.addChild(rankTxt);
		
		let type = LanguageManager.getlocal("dinnerTitle" + data.dtype);
		let descStr = LanguageManager.getlocal("dinnerMsgDesc",[type,data.num,data.enemy_num])
        let descTxt = ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		descTxt.x = rankImg.x+60
		descTxt.y = rankImg.y+10;
        this.addChild(descTxt);


		let timeStr = LanguageManager.getlocal("dinnerMsgTime",[App.DateUtil.getFormatBySecond(data.start_time,2)]) ;
		let timeTxt = ComponentManager.getTextField(timeStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		// timeTxt.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
		timeTxt.x = descTxt.x;
        timeTxt.y =  descTxt.y + descTxt.height + 13;
        this.addChild(timeTxt);

		let score1 = data.point;
		let score2 = data.score;
		if(score1 >= 0){
			score1 = "+" + score1; 
		}
		if(score2 >= 0){
			score2 = "+" + score2; 
		}

		let scoreStr = LanguageManager.getlocal("dinnerMsgInfo",[score1,score2]);
		let scoreTxt = ComponentManager.getTextField(scoreStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		scoreTxt.x = descTxt.x;
		scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        scoreTxt.y =  timeTxt.y + timeTxt.height + 13;
        this.addChild(scoreTxt);
		



	}

	public dispose():void
    {
        super.dispose();
    }
}