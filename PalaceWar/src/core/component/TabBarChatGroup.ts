class TabBarChatGroup extends TabBarGroup
{
    public constructor() 
	{
		super();
	}

    public init(buttonName:string|string[],textArr:Array<string>|any[],callback:({param:any,index:number})=>void,handler:any,param?:any,aligh?:string):void
	{
        super.init(buttonName,textArr,callback,handler,null,null,110);

        // for (let i:number = 0; i<=this._tbArr.length; i++)
        // {
        // }
    }
}