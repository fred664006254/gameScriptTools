
namespace Config
{
	export namespace WxactiveshowCfg 
	{
		let ActiveShow:Object={};
		export function formatData(data:any):void
		{
			for(var key in data.ActiveShow)
			{
				ActiveShow[key] = data.ActiveShow[key];
			}
		}

		export function isActivityInCfg(aid:string)
		{
			return ActiveShow[aid] == 1;
		}
	}


}