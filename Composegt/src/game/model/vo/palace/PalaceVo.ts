/**
 * 皇宫vo
 * author yanyuling
 * date 2017/11/01
 * @class PalaceVo
 */
class PalaceVo extends BaseVo
{  
    public palace = {};
    public gpalace = {};
    public isInit:boolean = false;
    public isCross:boolean = false;
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        this.isInit = true;
        if (data.palace)
        {
            for (var key in data.palace) {
                let tmpRoleVo:PalaceRoleInfoVo =  this.palace[key];
                if(! tmpRoleVo)
                {
                    tmpRoleVo = new PalaceRoleInfoVo();
                    this.palace[key] = tmpRoleVo;
                }
                tmpRoleVo.initData(data.palace[key]);
                tmpRoleVo.titleId = key;
            }
        }
        this.isCross = data.isCross;

        // if (data.gpalace)
        // {
        //     for (var key in data.gpalace) {
        //         let tmpRoleVo:PalaceRoleInfoVo =  this.gpalace[key];
        //         if(! tmpRoleVo)
        //         {
        //             tmpRoleVo = new PalaceRoleInfoVo();
        //             this.gpalace[key] = tmpRoleVo;
        //         }
        //         tmpRoleVo.initData(data.gpalace[key]);
        //         tmpRoleVo.titleId = key;
        //     }
        // }
    }

    public dispose()
    {
        this.palace = {};
        this.gpalace = {};
        this.isInit = false;
        this.isCross = false;
    }
}
