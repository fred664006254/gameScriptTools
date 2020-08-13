/**
 * 服务器列表
 * author dky
 * date 2017/11/3
 * @class ServerListServerScrollItem
 */
class ServerListServerScrollItem extends ScrollListItem
{

	private _serverInfo:{sname:string,zid:string,flag:number,inserver:number};
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,serverInfo:{sname:string,zid:string,flag:number,inserver:number,old_zid:string}):void
	{	

		// this.width = 320;
		// this.height = 46 +this.getSpaceY();

		let textColor = TextFieldConst.COLOR_WARN_RED3;

		let serverNameColor=TextFieldConst.COLOR_QUALITY_WHITE;

        let stateStr = LanguageManager.getlocal("serverListOld");
        if(serverInfo.flag == 1)
        {
            stateStr = LanguageManager.getlocal("serverListNew");
			textColor = TextFieldConst.COLOR_WARN_GREEN;
			serverNameColor=TextFieldConst.COLOR_WARN_GREEN;
        }

		let itemBg = BaseBitmap.create("serverlist_itembg");//"public_9_probiginnerbg");
		itemBg.width = 353;
		this.addChild(itemBg);

		let zidTemp = serverInfo.zid;
		if(serverInfo.old_zid)
		{
			zidTemp = serverInfo.old_zid;
		}
		let zidStr = null;
		if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()){
			zidStr = "【" +  LanguageManager.getlocal("serverListServer") + zidTemp +"】";
		} else {
			zidStr = "【" + zidTemp + LanguageManager.getlocal("serverListServer") +  "】";
		}

        let serverIdTF = ComponentManager.getTextField( zidStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		serverIdTF.textColor = serverNameColor;
		serverIdTF.x = 20;
		serverIdTF.y = itemBg.height/2 - serverIdTF.height/2;
		this.addChild(serverIdTF);
	

		let serverNameTF = ComponentManager.getTextField( serverInfo.sname,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		serverNameTF.textColor = serverNameColor;
		serverNameTF.x = itemBg.width/2 - serverNameTF.width/2;;
		serverNameTF.y = itemBg.height/2 - serverNameTF.height/2;
		this.addChild(serverNameTF);


        let serverStateTF = ComponentManager.getTextField( stateStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		serverStateTF.textColor = textColor;
		serverStateTF.x = itemBg.width-100;
		serverStateTF.y = itemBg.height/2 - serverStateTF.height/2;
		this.addChild(serverStateTF);
		

		 if(serverInfo.inserver == 1)
        {
            let userIcon = BaseBitmap.create("serverlist_usericon");
			userIcon.x = itemBg.width-userIcon.width-10;;
			userIcon.y = itemBg.height/2 - userIcon.height/2;
			this.addChild(userIcon);
        }
	

	}

	
	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
		this._serverInfo = null;
		super.dispose();
	}
}