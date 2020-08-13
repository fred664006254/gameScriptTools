/**
 * 离线消息Item
 * author shaoliang
 * date 2017/11/2
 * @class DinnerMessageItem
 */

class DinnerMessageItem  extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 498;
        this.height = 54;

		let dinnerCfg = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype);

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTxt.x = 125 - nameTxt.width/2
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

		let scoreStr:string
		if (dinnerCfg.getPoint > 0) {
			scoreStr = "+"+dinnerCfg.getPoint;
		}
		else {
			scoreStr = dinnerCfg.getPoint.toString();
		}

		let scoreTxt = ComponentManager.getTextField(scoreStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		scoreTxt.x = 372 - scoreTxt.width/2
        scoreTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(scoreTxt);
		
		if (dinnerCfg.getPoint > 0) {
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