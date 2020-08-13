/**
 * 红颜省亲系统api
 * author shaoliang
 * date 2019/2/20
 * @class WifebanishVoApi
 */
class WifebanishVoApi extends BaseVoApi
{
    private wifebanishVo:WifebanishVo;
	public constructor() 
	{
		super();
	}

    public getPosNum():number
    {
        return this.wifebanishVo.pos_num;
    }

    public getTotalPosNum():number
    {
        let num = this.wifebanishVo.pos_num;
        let list:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(AcConst.AID_BATTLEPASS);
        list.sort((a,b)=>{
            return a.et - b.et;
        });
        for(let i in list){
            let vo = <AcBattlePassVo>list[i];
            if(vo && vo.isInActivity() && vo.getWifeBanPos()){
                num += vo.getWifeBanPos();
            }
        }
		return num;
    }

    public getBanishNum():number
    {
        return Object.keys(this.wifebanishVo.wifeBanishInfoVo).length;
    }

    public getBanishInfoVo(key:string|number):WifeBanishInfoVo
    {
        return this.wifebanishVo.wifeBanishInfoVo[String(key)];
    }

     public getBanishInfoVoByWife(wifeId:string|number):WifeBanishInfoVo
    {   
        wifeId = String(wifeId);
        for (let k in this.wifebanishVo.wifeBanishInfoVo)
        {
            if (this.wifebanishVo.wifeBanishInfoVo[k].wifeId == wifeId)
            {
                return this.wifebanishVo.wifeBanishInfoVo[k];
            }
        }
        return null;
    }

    public getIsWifeBanishing(wifeId:string):number
    {   
        for (let k in this.wifebanishVo.wifeBanishInfoVo)
        {
            if (this.wifebanishVo.wifeBanishInfoVo[k].wifeId == wifeId && this.wifebanishVo.wifeBanishInfoVo[k].et > GameData.serverTime)
            {
                return 1;
            }
        }
        return 0;
    }

    public getWifeHead(wid:string):BaseDisplayObjectContainer
    {
        let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        
        let headbg:BaseBitmap = BaseBitmap.create("banish_wifebg");
        container.addChild(headbg);

        let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,headbg.width,headbg.height-5);

       
        let wifecfg = Config.WifeCfg.getWifeCfgById(wid);
        let wifePic:string = wifecfg.icon;//"wife_half_"+wid;
        if(Api.wifeSkinVoApi.isHaveSkin(wid))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wid);
			if(wifeSkinVo && wifeSkinVo.equip != "")
			{
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePic = skinCfg.icon;
			}
			
		}

        let wifeHead:BaseLoadBitmap = BaseLoadBitmap.create(wifePic,rect);
        container.addChild(wifeHead);
  
        let mask:BaseBitmap = BaseBitmap.create("banish_wifemask");
        mask.setPosition(7,6);
        container.addChild(mask);
		wifeHead.mask = mask;

        return container;
    }

    public isShowNpc():boolean
	{
		if (Api.switchVoApi.checkOpenBanish() && Api.wifeVoApi.getWifeNum() > Config.BanishCfg.getNumNeed())
		{
			return true;
		}
		return false;
	}

    public checkNpcMessage():boolean
	{
		if (this.isShowNpc()) {
			for (let k in this.wifebanishVo.wifeBanishInfoVo)
            {
                if (this.wifebanishVo.wifeBanishInfoVo[k].et < GameData.serverTime)
                {
                    return true;
                }
            }
		}
		return false;
	}
}