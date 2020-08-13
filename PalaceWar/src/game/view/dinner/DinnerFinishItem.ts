class DinnerFinishItem  extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 582;
        this.height = 50;

      

		let rankImg = BaseBitmap.create("dinner_rankbg")
		rankImg.x = 68-rankImg.width/2;
		rankImg.y = this.height/2 - rankImg.height/2;
		this.addChild(rankImg);

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rankTxt.text = String(index+1);
		rankTxt.x = 68 - rankTxt.width/2;
		rankTxt.y = this.height/2 - rankTxt.height/2;
		this.addChild(rankTxt);
		
		let scoreStr:string;
		let point:number = 0;
		let namestr:string = data.name;

		if (data.dtype == 999)
		{
			point = 50;
			scoreStr = "+"+point;
		}
		else if (data.special)
		{
			if (data.dtype==1)
			{
				point = 100;
			}
			else
			{
				point = 500;
			}
			namestr = LanguageManager.getlocal("dinnerFinishName"+data.dtype);
			scoreStr = "+"+point;
		}
		else {
			let dinnerCfg = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype);
			point = Number(dinnerCfg.getPoint);
			if (dinnerCfg.getPoint > 0) {
				scoreStr = "+"+dinnerCfg.getPoint;
			}
			else {
				scoreStr = dinnerCfg.getPoint.toString();
			}
		}
		

        let nameTxt = ComponentManager.getTextField(namestr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt.x = 270 - nameTxt.width/2
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

		let scoreTxt = ComponentManager.getTextField(scoreStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		scoreTxt.x = 480 - scoreTxt.width/2
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);
		
		if (point > 0) {
			nameTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
			scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
		}
		else {
			nameTxt.textColor = TextFieldConst.COLOR_WARN_RED2;
			scoreTxt.textColor = TextFieldConst.COLOR_WARN_RED2;
		}

        let lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = this.width /2 - lineImg.width/2;
        lineImg.y = this.height;
        this.addChild(lineImg);

	}

	public dispose():void
    {
        super.dispose();
    }
}