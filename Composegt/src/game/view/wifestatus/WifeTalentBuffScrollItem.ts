
class WifeTalentBuffScrollItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any,param:any)
    {
		this.width = 510;
        this.height = 40;
        let rankTxt:BaseTextField;

        if(index % 2 == 1){
            let bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            this.addChild(bg);
        }

        rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
        rankTxt.text = String(index+1);
        rankTxt.x = 65 - rankTxt.width/2;
        rankTxt.y = this.height/2 - rankTxt.height/2;
        this.addChild(rankTxt);
       

        let nameTxt = ComponentManager.getTextField(data.artistryRange[0]+"",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		nameTxt.x = 200 - nameTxt.width/2
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

		let scoreTxt = ComponentManager.getTextField(data.rankBuff,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		scoreTxt.x = 404 - scoreTxt.width/2
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);
		
        if (data.artistryRange[0] <= param ) {
            rankTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            nameTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
	}

	public dispose():void
    {
        super.dispose();
    }
}