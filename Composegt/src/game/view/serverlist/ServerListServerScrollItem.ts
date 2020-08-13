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

		this.width = 352;
		this.height = 47;//46 +this.getSpaceY();

		let textColor = TextFieldConst.COLOR_WARN_RED3;// 0xff1818;// TextFieldConst.COLOR_WARN_RED3;

		
        let stateStr = LanguageManager.getlocal("serverListOld");
        if(serverInfo.flag == 1)
        {
            stateStr = LanguageManager.getlocal("serverListNew");
			textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }

		let itemBg = BaseBitmap.create("load_4");
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
		if (PlatformManager.checkIsEnLang()){
			zidStr = "【" +  LanguageManager.getlocal("serverListServer") + zidTemp +"】";
		} else {
			zidStr = "【" + zidTemp + LanguageManager.getlocal("serverListServer") +  "】";
		}


		let fontSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
		if(PlatformManager.checkIsViSp())
		{
			fontSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
		}

        let serverIdTF = ComponentManager.getTextField( zidStr,fontSize);
		serverIdTF.textColor = 0xfff8e9;
		serverIdTF.x = 20;
		serverIdTF.y = this.height/2 - serverIdTF.height/2;
		this.addChild(serverIdTF);
	

		let serverNameTF = ComponentManager.getTextField( serverInfo.sname,fontSize);
		serverNameTF.textColor = 0xfff8e9;
		serverNameTF.x = this.width/2 - serverNameTF.width/2;;
		serverNameTF.y = this.height/2 - serverNameTF.height/2;
		this.addChild(serverNameTF);


        let serverStateTF = ComponentManager.getTextField( stateStr,fontSize);
		serverStateTF.textColor = textColor;
		serverStateTF.x = 250;
		serverStateTF.y = this.height/2 - serverStateTF.height/2;
		this.addChild(serverStateTF);
		

		 if(serverInfo.inserver == 1)
        {
            let userIcon = BaseBitmap.create("serverlist_usericon");
			userIcon.x = 300;
			userIcon.y = this.height/2 - userIcon.height/2;
			this.addChild(userIcon);
        }
	

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