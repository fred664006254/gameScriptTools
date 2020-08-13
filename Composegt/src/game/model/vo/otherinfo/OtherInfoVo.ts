/**
 * 其他杂项vo
 * author yanyuling
 * date 2017/10/27
 * @class OtherInfoVo
 */
class OtherInfoVo extends BaseVo
{  
    public imacy:number=0;
    public power:number=0;
    public challenge:number = 0;
    public palace_flag:number =0;
    public banet:number =0;//禁言时间
    public info:any;
    public certification:any=null;
    public lastday:number = 0;
    public jd618:{st:number,et:number,flag:number}=null;
    public gpower:number=0;
    public galliance:number=0;
    public banEmMsg:number = 0;
    public skinHad:Object = null;
    public skinWared:string = null;
    public wxchatgift:number = 0;
    public twdailyshare:number = 0;

    public firstchallengefail:number = 0;
    public kvmap:any={};
    //秒杀截止时间
    public autosmallattacket:number = 0;

    // public notsharewife:number = 0;
    // public notshareservant:number = 0;
    public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if (data.rv_info)
        {
            if(data.rv_info.imacy)
            {
                this.imacy = data.rv_info.imacy;
            }
            if(data.rv_info.power)
            {
                this.power = data.rv_info.power;
            }
            if(data.rv_info.challenge)
            {
                this.challenge = data.rv_info.challenge;
            }
            if(data.rv_info.gpower)
            {
                this.gpower = data.rv_info.gpower;
            }
            if(data.rv_info.galliance)
            {
                this.galliance = data.rv_info.galliance;
            }
        }
        if(data.palace)
        {
            this.palace_flag = data.palace.flag;
        }
        if(data.info)
        {
            this.info=data.info;
        }
        if(data.banet)
        {
            this.banet=data.banet;
        }
        if(data.info&&data.info.certification)
        {
            this.certification = data.info.certification;
        }
        if(data.lastday)
        {
            this.lastday = data.lastday;
        }
        if(data.info && data.info.skin != null)
        {
            this.skinHad = data.info.skin.had;
            this.skinWared = data.info.skin.wared;
        }
        
        if(data.info && data.info.wxchatgift != null)
        {
            this.wxchatgift = data.info.wxchatgift;
        }
        if(data.info && data.info.twdailyshare != null)
        {
            this.twdailyshare = data.info.twdailyshare;
        }
        if(data.info && data.info.firstchallengefail != null)
        {
            this.firstchallengefail = data.info.firstchallengefail;
        }
        if(data.info && data.info.kvmap != null)
        {
            this.kvmap = data.info.kvmap;
        }
        if(data.info && data.info.autosmallattacket != null){
            this.autosmallattacket = data.info.autosmallattacket;
        }
        
        
	
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_OTHERINFO_REFRESHVO);

    }

    public dispose()
    {
        this.imacy = 0;
        this.power = 0;
        this.challenge = 0;
        this.palace_flag = 0;
        this.banet = 0;
        this.info = null;
        this.certification =null;
        this.lastday = 0;
        this.skinHad = null;
        this.skinWared = null;
        this.wxchatgift = 0;
        this.kvmap={};
        this.autosmallattacket = 0;
    }
}
