
class AmuletVo extends BaseVo
{
	public constructor() 
	{
		super();
	}
    private amuletInfoVoList = [];
	public initData(data:any):void
	{
		if(data.info){
            for (var key in data.info) {
                let vo:AmuletInfoVo = this.amuletInfoVoList[key];
                if (!vo) {
                    vo = new AmuletInfoVo();
                    this.amuletInfoVoList[key] = vo;
                }
                vo.initData(data.info[key]);
                vo.servantId = key;
            }
        }
	}

    public getAmuListById(serId:string){
        return this.amuletInfoVoList[""+serId];
    }

    public dispose(): void
    {
        this.amuletInfoVoList = [];
    }

}


class AmuletInfoVo  extends BaseVo
{
    public servantId:string;
    public amuletList:{amuletId:{amuletNum:number,obligate:number,skinId:string}}[] = []
	// public amuletId:string;
	// public amuletNum:number = 0;
    // public obligate:string;
    // public skinId:string;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
            this.amuletList = data;
			// for (var key in data) {
            //     if (data.hasOwnProperty(key)) {
            //         this[key] = data[key]
            //     }
            // }
		}
	}

	public dispose():void
	{
        this.servantId = "";
        this.amuletList = [];
		// this.amuletId = "";
		// this.amuletNum = 0;
        // this.obligate = "";
        // this.skinId = "";
	}
}