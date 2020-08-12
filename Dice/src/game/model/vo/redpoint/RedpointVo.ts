class RedpointVo extends BaseVo
{
    private info : any = null;
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if(data)
		{
			if(data.info)
			{
				this.info = data.info;
            }
        }
    }

    public checkHavePointByAid(aid : string, type? : string):boolean{
        let flag = false;
        if(this.info && this.info[aid]){
            let unit = this.info[aid];
            for(let i in unit){
                //i 对应具体的功能 后期做扩展
                if(unit[i] && unit[i] == 1){
                    flag = type ? (type == i) : true;
                    break;
                }
            }
        }
        return flag;
    }

    public dispose():void
	{
        this.info = null;
	}
}