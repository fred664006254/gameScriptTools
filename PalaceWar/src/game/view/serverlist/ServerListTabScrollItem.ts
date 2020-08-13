/**
 * 服务器列表标签
 * author dky
 * date 2017/11/3
 * @class ServerListTabScrollItem
 */
class ServerListTabScrollItem extends ScrollListItem
{


	public constructor() 
	{
		super();
	}

	public initItem(index:number,zidStr:string):void
	{	

		// this.width = 158;
		// this.height = 60 +this.getSpaceY();

		let itemBg = BaseBitmap.create("btn_normal_yellow_down");
		// itemBg.x =  this.width/2 - itemBg.width/2;
		// itemBg.y = this.height/2 - itemBg.height/2;
		itemBg.name = "itemBg";
		this.addChild(itemBg);
		var colorMatrix = [
			1,0,0,0,7,
			0,1,0,0,21,
			0,0,1,0,48,
			0,0,0,1,0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		itemBg.filters = [colorFlilter];

		// let tabIdEnd = tabId * 10;
		// let zidStr =  tabIdEnd - 9 + "-" + tabIdEnd +  LanguageManager.getlocal("serverListServer") ;


        let serverIdTF = ComponentManager.getTextField( zidStr,TextFieldConst.FONTSIZE_TITLE_SMALL);
		serverIdTF.textColor = TextFieldConst.COLOR_BLACK;
		serverIdTF.x = itemBg.width/2 - serverIdTF.width/2;;
		serverIdTF.y = itemBg.height/2 - serverIdTF.height/2;
		this.addChild(serverIdTF);
	
	}

	
	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{

		super.dispose();
	}
}