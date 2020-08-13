class PromoteVo extends BaseVo
{
    /*
    ["model.promote"] = "分封模型",
    ["model.promote.king"] = "是否是皇帝1:是",
    ["model.promote.position"] = "分封的官职",
    ["model.promote.ptime"] = "分封的时间",
    ["model.promote.version"] = "分封的期号(服务端用)"
    */
    public info : any = {};
    public king : number = 0;
    public position : number = 1;
    public ptime : number = 0;
    public version : number = 0;
    public et : number = 0;
    //国策信息
    public spinfo:{spid:string,effinfo:{},isread:number,nextinfo:{spid:string,num:number},totalnum:number};
    //政令信息
    public gdinfo:{gdid:string,num:number,isread:number,effinfo:{},gdtypes:number[],nextinfo:{spid:string,num:number},ismore:number,zan:number};

	public constructor() 
	{
		super();
    }
    
    public initData(data:any):void{
        let view = this;
        for(let i in data){
            // if(typeof view[i] != 'undefined'){
                view[i] = data[i];
            // }
        }
    }

	public dispose():void
	{
        this.et = 0;
    }
}