// declare function loadttf(name:string,callback:any);
class TTFManager extends egret.DisplayObject
{
	private static _instance:TTFManager = null;
	private _loadedObj:Object=null;
	public static TH_FONTNAME:string = "sarabun";
    public constructor() 
    {
        super();
    }
	public static get Ins():TTFManager
	{
		if(this._instance == null)
		{
			this._instance = new TTFManager();
		}
		return this._instance;
	}

	/**
	 * 加载字体资源
	 * @param fontName --资源名，后面也做fontFamily用    //资源放在resource/asset/css下
	 * @param callback --回调方法
	 */
    public loadttfRes(fontName,callBack)
    {
		if(this._loadedObj == null)
		{
			this._loadedObj = {};
		}
		if(this._loadedObj[fontName])
		{
			callBack(1);
			return;
		}
		console.log("beginwindowLoad______________ttf");
		if(window["loadttf"])
		{
			console.log("windowLoad______________ttf");
			window["loadttf"](fontName,(num)=>
			{
				console.log("loaded______________ttf");
				callBack(num);
				if(num == 1 || num == 3)
				{
					if(!this._loadedObj[fontName])
					{
						this._loadedObj[fontName] = true;
					}
				}
			});
		}
    }
}
