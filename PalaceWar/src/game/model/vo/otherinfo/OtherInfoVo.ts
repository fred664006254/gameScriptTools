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
    public jd618:{st:number,et:number,flag:number}=null;
    public gpower:number=0;
    public galliance:number=0;
    public gbiography:number = 0;
    public banEmMsg:number = 0;

    public skinHad:Object = null;
    public skinWared:string = null;
    public skinHad2:Object = null;
    public skinWared2:string = null;
    public skinHad3:Object = null;
    public skinWared3:string = null;
    public citySkinNewYear:number = 0;
    public homeSkinNewYear:number = 0;

    public setactivitypop:number = null;
    public pushInfo:any = {};
    //登记玩家信息
    public userMsg:any = {};
    //记录红颜脱衣
    public wifeUndress:any = [];
    public kvmap:any={};
    public crosschatNum:number = 0;
    public autoFastNum:number=0;

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
             if(data.rv_info.gbiography)
            {
                this.gbiography = data.rv_info.gbiography;
            }
        }
        if(data.palace)
        {
            this.palace_flag = data.palace.flag;
        }
        if(data.info)
        {
            this.info=data.info;
            this.banEmMsg = data.info.banEmMsg ? 1 : 0;
        }
        if(data.banet)
        {
            this.banet=data.banet;
        }
        if(data.info&&data.info.certification)
        {
            this.certification = data.info.certification;
        }
        if(data.info&&data.info.jd618 != null)
        {
            this.jd618 = data.info.jd618;
        }

        if(data.info && data.info.skin != null)
        {
            this.skinHad = data.info.skin.had;
            this.skinWared = data.info.skin.wared;

            if (data.info.skin.st && data.info.skin.et)
            {
                if (data.info.skin.st <= GameData.serverTime && data.info.skin.et > GameData.serverTime)
                {
                    this.homeSkinNewYear = data.info.skin.et;
                }   
                else
                {
                    this.homeSkinNewYear = 0;
                }
            }

        }
        if(data.info && data.info.citySceneSkin != null)
        {
            this.skinHad2 = data.info.citySceneSkin.had;
            this.skinWared2 = data.info.citySceneSkin.wared;
            if (data.info.citySceneSkin.st && data.info.citySceneSkin.et)
            {
                if (data.info.citySceneSkin.st <= GameData.serverTime && data.info.citySceneSkin.et > GameData.serverTime)
                {
                    this.citySkinNewYear = data.info.citySceneSkin.et;
                }   
                else
                {
                    this.citySkinNewYear = 0;
                }
            }

            //  this.skinWared2 = "205";
            
        }
        if(data.info && data.info.searchScene != null)
        {
            this.skinHad3 = data.info.searchScene.had;
            this.skinWared3 = data.info.searchScene.wared;
        }
        if(data.info && data.info.activityPop != null)
        {
            this.setactivitypop = data.info.activityPop;
        }
        if(data.info && data.info.pushInfo != null)
        {
            this.pushInfo = data.info.pushInfo;
        }
        if(data.info && data.info.kvmap != null)
        {
            this.kvmap = data.info.kvmap;
        }
        if(data.info && data.info.crosschatNum != null)
        {
            this.crosschatNum = data.info.crosschatNum;
        }
         if(data.info && data.info.autoFastNum != null)
        {
            this.autoFastNum = data.info.autoFastNum;
        }        
        if(data.info)
        {
            if (data.info.userMsg != null)
            {
                this.userMsg = data.info.userMsg;
            }
        }
        
    }

    public dispose()
    {
        this.imacy = 0;
        this.power = 0;
        this.gbiography = 0;
        this.challenge = 0;
        this.palace_flag = 0;
        this.banet = 0;
        this.info = null;
        this.certification =null;
        this.jd618 = null;

        this.skinHad = null;
        this.skinWared = null;
        this.skinHad2 = null;
        this.skinWared2 = null;
        this.skinHad3 = null;
        this.skinWared3 = null;
        this.setactivitypop = null;
        this.pushInfo = {};
        this.userMsg = {};
        this.wifeUndress = [];
        this.kvmap={};
        this.crosschatNum = 0;
        this.autoFastNum = 0;
        this.citySkinNewYear = 0;
        this.homeSkinNewYear = 0;
    }
}
