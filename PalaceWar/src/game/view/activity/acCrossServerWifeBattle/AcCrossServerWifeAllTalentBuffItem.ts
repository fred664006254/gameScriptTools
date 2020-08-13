
class AcCrossServerWifeAllTalentBuffItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any,param:any)
    {
		this.width = 510;
        this.height = 47;
        let bg = BaseBitmap.create(`wifetalentlistbg1`);
        bg.x = (510 - bg.width)/2;
        this.addChild(bg);
        let rankTxt:BaseTextField;

        rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
        rankTxt.text = String(index+1);
        rankTxt.x = 65 - rankTxt.width/2;
        rankTxt.y = this.height/2 - rankTxt.height/2;
        this.addChild(rankTxt);
       

        let nameTxt = ComponentManager.getTextField(data.artistryRange[0]+"",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTxt.x = 200 - nameTxt.width/2
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

		let scoreTxt = ComponentManager.getTextField(data.rankBuff,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		scoreTxt.x = 404 - scoreTxt.width/2
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);
		
        if (data.artistryRange[0] <= param.num) {
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }        

        if(param.curlv == (index+1)){
            bg.setRes(`wifetalentlistbg2`);
            let arrow  = BaseBitmap.create(`wifeview_artistryicon`);
            arrow.x = 10;
            arrow.y = this.height/2 - arrow.height/2;
            this.addChild(arrow);
        }
         let lineImg = BaseBitmap.create("public_line1");
        lineImg.width = this.width;
        lineImg.x = 0;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);
	}

	public dispose():void
    {
        super.dispose();
    }
}