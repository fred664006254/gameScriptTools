/**
 * 排行榜vo
 * author yanyuling
 * date 2017/10/26
 * @class RankVo
 */
class RankVo extends BaseVo
{   
    /**
     * 关卡榜信息
     */
    public cinfoList = [];
    /**
     * 亲密度榜信息
     */
    public iinfoList = [];
    /**
     * 势力榜信息
     */
    public pinfoList = [];

    /**
     * 个人排行信息
     */
    public crank:number = 0;
    public lv:number = 0;
    public imacy:number = 0;
    public name:string = "";
    public cid:number = 0;
    public power:number =0;
    public irank:number = 0;
    public prank:number = 0;

    //跨服部分信息
    public anum:number=0;
    public apnum:number=0;
    public ainfo:{affect:string,creator:string,creatorname:string,exp:string, gid:string,gname:string, level:string,maxmn:string,mn:string,zid:string}[] = []; 
    public apinfo:{name:string,power:string,uid:string,zid:string,level:string,title:string,pic:string}[] = [];

    
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if(data.minfo)
        {
            this.lv =Number( data.minfo.lv);
            this.imacy = data.minfo.imacy;
            this.name = data.minfo.name;
            this.cid = data.minfo.cid;
            this.power = data.minfo.power;
            if(data.minfo.prank){
                this.prank = data.minfo.prank;
            }
            if(data.minfo.crank){
                this.crank = data.minfo.crank;
            }
            if(data.minfo.irank){
                this.irank = data.minfo.irank;
            }
        }
        if(data.pinfo)
        {
            this.initMyData(data.pinfo,this.pinfoList);
        }
        if(data.iinfo)
        {
            this.initMyData(data.iinfo,this.iinfoList);
        }
        if(data.cinfo)
        {
            this.initMyData(data.cinfo,this.cinfoList);
        }

        //跨服部分
        if(data.anum != null)
        {
            this.anum = data.anum;
        }
        if(data.apnum != null)
        {
            this.apnum = data.apnum;
        }
        if(data.ainfo)
        {
            this.ainfo = data.ainfo;
        }
        if(data.apinfo)
        {
            this.apinfo = data.apinfo;
        }
    }

    public initMyData(dataInfo,rankUVoList)
    {
        for (var index = 0; index < dataInfo.length; index++) {
            var element = dataInfo[index];
            let tmpVo:RankUserVo = rankUVoList[index]
            if (!tmpVo)
            {
                tmpVo = new RankUserVo();
                rankUVoList.push(tmpVo);
            }
            tmpVo.initData(element);
        }
    }

    public dispose():void
	{
        this.crank = 0;
        this.lv = 0;
        this.imacy = 0;
        this.name = "";
        this.cid = 0;
        this.power = 0;
        this.irank = 0;
        this.prank = 0;
        this.cinfoList = [];
        this.iinfoList = [];
        this.pinfoList = [];

        this.anum = 0;
        this.apnum = 0;
    }

}