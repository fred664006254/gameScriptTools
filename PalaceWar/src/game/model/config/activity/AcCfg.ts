namespace Config
{
	export namespace AcCfg 
	{
		export let isGetAll:boolean=false;
		export let cfgList:Object={};
		// export function getCfgByActivityId(aid:string)
		// {
		// 	return cfgList[aid];
		// }

		let extraTimeList:Object={
			punish:1,
			newYear:1,
			crossServerAtkRace:1,
			springCelebrate:1,
			mayDay:1,
			crossServerIntimacy:1,
			dragonBoatDay:1,
			crossServerServant:1,
			archer:1,
			maze:1,
			crossServerPower:1,
			midAutumn:1,
			wipeBoss:1,
			singleDay:1,
			lottery:1
		};

		let needAloneGetCfgList:Object={
			battlePass:true,
			conquerMainLand:true,
		};


		export function getIfAloneNeedGetCfg(aid:string):boolean
		{
			return needAloneGetCfgList[aid]?true:false;
		}

		export function getCfgByActivityIdAndCode(aid:string,code:number|string)
		{
			return cfgList[aid]?cfgList[aid][code]:null;
		}

		/**
		 * 获取活动展示期（单位：天）
		 */
		export function getExtraTimeByIdAndCode(aid:string,code:number|string):number
		{	
			let extraTime:number = 0;
			if (getCfgByActivityIdAndCode(aid,code) && getCfgByActivityIdAndCode(aid,code).extraTime)
			{
				extraTime = getCfgByActivityIdAndCode(aid,code).extraTime;
			}
			else if (extraTimeList[aid])
			{
				extraTime = extraTimeList[aid];
			}
			return extraTime;
		}

		export function formatAllCfg(data:any):void
		{
			
			
			for(let aidAndCode in data)
			{
				let aidArr:string[]=aidAndCode.split("-");
				let aid=aidArr[0];
				let code=aidArr[1];
				let cfgClassName:string="Config.AcCfg."+App.StringUtil.firstCharToUper(aid)+"Cfg";
				let cfgClass=egret.getDefinitionByName(cfgClassName);
				if(cfgList.hasOwnProperty(aid)==false)
				{
					cfgList[aid]={};
				}
				if(cfgClass)
				{
					let cfg=new cfgClass();
					cfg.formatData(data[aidAndCode]);
					cfgList[aid][code]=cfg;
				}
				else
				{
					App.LogUtil.log("缺少活动配置解析"+cfgClassName+"，请参考DailyChargeCfg写法");
				}
				let index = Api.acVoApi.needAloneGetCfgList.indexOf(aidAndCode);
				if (index>=0)
				{
					Api.acVoApi.needAloneGetCfgList.splice(index,1);
				}
			}
			if (Api.acVoApi.needAloneGetCfgList.length>0)
			{
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,{activeId:Api.acVoApi.needAloneGetCfgList[0]});
			}
			else
			{
				isGetAll=true;
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACTIVITY_POP);
			}

			
		}

		export function formatPreloadCfg(key:string, data:any):void{
			if (key == "v"){
				return ;
			}
			if (!data || data.length == 0){
				return ;
			}
			let aid = key;
			for (let k in data){
				let code = Number(k) + 1;
				let cfgClassName:string="Config.AcCfg."+App.StringUtil.firstCharToUper(aid)+"Cfg";
				let cfgClass=egret.getDefinitionByName(cfgClassName);
				if(cfgList.hasOwnProperty(aid)==false)
				{
					cfgList[aid]={};
				}
				if(cfgClass)
				{
					let cfg=new cfgClass();
					cfg.formatData(data[k]);
					cfgList[aid][code]=cfg;
				}
				else
				{
					App.LogUtil.log("缺少活动配置解析"+cfgClassName+"，请参考DailyChargeCfg写法");
				}
			}
		}

		export function formatCfgById(acData:any,aid:string):void
		{

		}
	}
}