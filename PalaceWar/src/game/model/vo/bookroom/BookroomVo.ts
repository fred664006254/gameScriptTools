/**
 * 书院vo
 * author yanyuling
 * date 2017/11/24
 * @class BookroomVo
 */
class BookroomVo extends BaseVo
{  
    
    public pos_num:number=0; //普通席位
    public infoList:Object = {};
    public vip_pos:any =null;
    private month_pos:Array<any> =[];
    private year_pos:Array<any> =[];
    public base_pos:Array<any> =[];
    public item_pos:Array<any> =[];
    
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{   //lock  1未解锁
        
        this.month_pos =[];
        this.year_pos = [];
        this.base_pos = [];
        this.item_pos = []
        this.pos_num = data.pos_num; 
        for (var key in this.infoList) 
        {
            this.infoList[key].dispose();
        }
        this.infoList = {};
        for (var key in data.info) {
            let tmpinfo = data.info[key]
            let infovo = this.infoList[key]
            if( infovo == null)
            {
                infovo = new BookroomInfoVo();
                this.infoList[key] = infovo;
                infovo.posId = key;
                if(100<Number(key)&&Number(key)<200)
                {
                    this.month_pos.push(tmpinfo);
                }
                
                if(Number(key)>200&&Number(key)<300)
                {
                    this.year_pos.push(tmpinfo);
                } 
                if(Number(key)<100)
                {
                    this.base_pos.push(tmpinfo);
                }
                if(Number(key)>300&&Number(key)<400)
                {
                    this.item_pos.push(tmpinfo);
                } 
            }
            infovo.initData(tmpinfo);
        }
    }
    // 解锁的月卡就有两个席位，lock解锁就是0;
    public ismonthunlock():number
    {   
        var num:number=0;
        for(var i:number=0;i<this.month_pos.length; i++)
        {
            if(this.month_pos[i].lock==0||this.month_pos[i].et>0)
            {
                num +=1; 
            }
        }
        return num; 
    }
    public ismonthTimer():number
    {
        if(this.month_pos[0])
        {
            return this.month_pos[0].lastet;
        }
        return 0;
    }

    public isitemTimer():number
    {
        if(this.item_pos[0])
        {
            return this.item_pos[0].lastet;
        }
        return 0;
    }

    //年卡长度
     public yearLength():number
    {   
        var num = 0;
        for(var i:number=0;i<this.year_pos.length;i++)
        {
            if(this.year_pos[i]&&this.year_pos[i].lock==0||this.year_pos[i].et>0)
            {
                num+=1;
            }
        }  
        return num; 
    }

    //道具卡使用数量
    public itemLength():number
    {   
        var num = 0;
        for(var i:number=0;i<this.item_pos.length;i++)
        {
            if(this.item_pos[i]&&(this.item_pos[i].lock==0||this.item_pos[i].et>0))
            {
                num+=1;
            }
        }  
        return num; 
    }

    //未解锁的年卡
    public unluckYearArr():Array<any>
    {   
        var num = 0;
        for(var i:number=0;i<this.year_pos.length;i++)
        {
            if(this.year_pos[i]&&this.year_pos[i].lock==1)
            {
                this.year_pos[i].year = 2;
                return this.year_pos[i]; 
            }
        }  
    } 

    public getYearneedLevel( ):number
    {
        var needlv:number =0;
        for(var i:number=0;i<this.year_pos.length;i++)
        {
           needlv = this.year_pos[i].needLevel
        }
        return needlv; 
    }


    // 终身卡最大数量 8
    public vipyearMaxnum():number
    {
        let bookroomCfg = GameConfig.config.bookroomCfg;
        var maxNum =bookroomCfg.permPos.length;
        return maxNum;
    }

    // 道具卡最大数量
    public itemMaxnum():number
    {
        let bookroomCfg = GameConfig.config.bookroomCfg;
        let maxNum =bookroomCfg.temporaryMax;
        return maxNum;
    }
    //月卡最大数量 2
    public vipmonthMaxnum():number
    {
        return 2;
    }


    public dispose()
    {
        this.year_pos = [];
        this.month_pos = [];
        this.pos_num = 0;
        this.infoList = {};
        this.item_pos = [];
    }
}