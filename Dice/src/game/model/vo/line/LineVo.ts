class LineVo extends BaseVo
{

    public cur:number=0;
    public sid:number=0;
    public scene:string[]=null;
    public info1:{id:string}[]=null;
    public info2:{id:string}[]=null;
    public info3:{id:string}[]=null;

    public constructor()
    {
        super();
    }

    public initData(data:any):void
    {
        for (const key in data) 
        {
            if (data.hasOwnProperty(key)) 
            {
                this[key] = data[key];
            }
        }
    }

    public dispose():void
    {

    }
}