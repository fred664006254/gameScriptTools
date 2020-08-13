/**
 * DinnerDetailView 下面每条宴会消息
 * date 2017/11/6
 * @class DinnerInfoItem
 */

class DinnerInfoItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 590;
        this.height = 32;

    

		let nameTxt:BaseTextField = ComponentManager.getTextField( (index+1) + ". " + data.name,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		nameTxt.x = 17;
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

		let descTxt:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		descTxt.x = 170;
        descTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(descTxt);

		let score:number = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype).getPoint;
		let costStr:string;
		if (Config.DinnerCfg.getGoToFeastItemCfg(data.dtype).needGem ){
			costStr =Config.DinnerCfg.getGoToFeastItemCfg(data.dtype).needGem+LanguageManager.getlocal("gemName");
		}
		else {
			costStr = LanguageManager.getlocal("itemName_"+Config.DinnerCfg.getGoToFeastItemCfg(data.dtype).needItem);
		}

		if (data.dtype != 4) {
			nameTxt.textColor = TextFieldConst.COLOR_BLACK;
			let scoreStr:string = "+"+score;	
			descTxt.text = LanguageManager.getlocal("dinnerJoinDesc1",[costStr,scoreStr]);
		}	
		else {
			nameTxt.textColor = TextFieldConst.COLOR_WARN_RED;
			descTxt.text = LanguageManager.getlocal("dinnerJoinDesc2",[costStr,score.toString()]);
		}	
		descTxt.textColor = nameTxt.textColor;
	}

	public dispose():void
    {
        super.dispose();
    }
}