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

		this.width = 158;
		this.height = 60 +this.getSpaceY();

		let itemBg = BaseBitmap.create("btn_loginbg_down");
		itemBg.x =  this.width/2 - itemBg.width/2+8;
		itemBg.y = this.height/2 - itemBg.height/2;
		// itemBg.scaleX = it/mBg.scaleY =0.9;
		itemBg.name = "itemBg";
		this.addChild(itemBg);

		// let tabIdEnd = tabId * 10;
		// let zidStr =  tabIdEnd - 9 + "-" + tabIdEnd +  LanguageManager.getlocal("serverListServer") ;

		let fntSize = TextFieldConst.FONTSIZE_TITLE_SMALL;
		if(PlatformManager.checkIsViSp()){
			fntSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
		}
        let serverIdTF = ComponentManager.getTextField( zidStr,fntSize);
		serverIdTF.textColor = TextFieldConst.COLOR_BROWN;
		serverIdTF.x = this.width/2 - serverIdTF.width/2;;
		serverIdTF.y = this.height/2 - serverIdTF.height/2;
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