/**
 * 跑马灯api
 * author shaoliang
 * date 2017/10/28
 * @class LampVoApi
 */

class LampVoApi extends BaseVoApi
{
	public constructor() {
		super();
	}

	private _waitingShow:any[]= [];
	// [{"msg":"","need":"103","st":1509164487,"uid":1000505,"dtype":"1","name":"甘守"},
	// {"msg":"","need":"1007","st":1509164487,"uid":1000505,"dtype":"2","name":"甘守"},
	// {"msg":"","need":"6666666","st":1509164487,"uid":1000505,"dtype":"3","name":"甘守"},
	// {"msg":"","need":"5","st":1509164487,"uid":1000505,"dtype":"4","name":"甘守"},
	// {"msg":"","need":"5","st":1509164487,"uid":1000505,"dtype":"5","name":"甘守"},
	// {"msg":"下午发布goon广告11111","uid":"","st":1509170545,"need":"","dtype":"100","name":""}];

	public insertLampInfo(t:any[]):void
	{	

		for (let k in t) 
		{
			this._waitingShow.push(t[k])
			if(t[k].dtype == 6)
			{
				let godName =  String(t[k].info[0]);
				App.CommonUtil.showGodLoginFlaunt(godName.substring(5,godName.length));
			}
				
		}
		if (this._waitingShow.length>0) {
			this._waitingShow.sort((a:any,b:any)=>{
				// let valueA = Config.LampinfoCfg.getLampInfoItemCfg(a.dtype);
				// let valueB = Config.LampinfoCfg.getLampInfoItemCfg(a.dtype);;
				return a.sortId-b.sortId;
			});
		}
	}

	public formatData(data:any):void
	{
		this.insertLampInfo(data);
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SHOW_LAMP);
	}

	public getShowLampInfo():any
	{	
		if (this._waitingShow.length>0) {
			let a:any = this._waitingShow.shift();
			return a;
		}
		else {
			return null;
		}
	}

	public dispose():void
	{

		this._waitingShow.length = 0;

		super.dispose();
	}
}