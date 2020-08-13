/**
 * 服务器列表
 * author dky
 * date 2017/11/3
 * @class ServerListMyScrollItem
 */
class ServerListMyScrollItem extends ScrollListItem
{

	private _serverInfo:{sname:string,zid:string,flag:number};
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,serverInfo:{sname:string,zid:string,flag:number,old_zid:string}):void
	{	

		this.width = 538;
		this.height = 46 +this.getSpaceY();

		let textColor = TextFieldConst.COLOR_WARN_RED3;

		
        let stateStr = LanguageManager.getlocal("serverListOld");
        if(serverInfo.flag == 1)
        {
            stateStr = LanguageManager.getlocal("serverListNew");
			textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }

		let itemBg = BaseBitmap.create("load_3");
		itemBg.width = this.width;
		itemBg.height = 46;
		itemBg.x =  this.width/2 - itemBg.width/2;
		itemBg.y = this.height/2 - itemBg.height/2;
		this.addChild(itemBg);
		let zidTemp = serverInfo.zid;
		if(serverInfo.old_zid)
		{
			zidTemp = serverInfo.old_zid;
		}
		let zidStr = null;
		if(PlatformManager.checkIsEnLang()){
			zidStr = "【" + LanguageManager.getlocal("serverListServer") + zidTemp +  "】";
		} else {
			zidStr = "【" + zidTemp + LanguageManager.getlocal("serverListServer") +  "】";
		}

		let fntSize = TextFieldConst.FONTSIZE_TITLE_SMALL;
		if(PlatformManager.checkIsViSp()){
			fntSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
		}
        let serverIdTF = ComponentManager.getTextField( zidStr,fntSize);
		serverIdTF.textColor = 0xfff8e9;//textColor;
		serverIdTF.x = 30;
		serverIdTF.y = this.height/2 - serverIdTF.height/2;
		this.addChild(serverIdTF);
	

		let serverNameTF = ComponentManager.getTextField( serverInfo.sname,fntSize);
		serverNameTF.textColor =  0xfff8e9;
		serverNameTF.x = this.width/2 - serverNameTF.width/2;;
		serverNameTF.y = this.height/2 - serverNameTF.height/2;
		this.addChild(serverNameTF);


        let serverStateTF = ComponentManager.getTextField( stateStr,fntSize);
		serverStateTF.textColor = textColor;
		serverStateTF.x = 410;
		serverStateTF.y = this.height/2 - serverStateTF.height/2;
		this.addChild(serverStateTF);
		
	}

	
	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{
		this._serverInfo = null;
		super.dispose();
	}
}