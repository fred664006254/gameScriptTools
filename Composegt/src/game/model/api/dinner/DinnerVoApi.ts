/**
 * 宴会api
 * author shaoliang
 * date 2017/11/1
 * @class DinnerVoApi
 */

class DinnerVoApi extends BaseVoApi
{	
	public lastShareTime:number[] = [0,0];
	private dinnerVo:DinnerVo;
	private totalNum:number = 0;
	/**
	 * 当前宴会人数
	 */
	private viewList:any[] =  [];
	// [{"dtype":"2","uid":"1000559","num":"0","name":"真英勋"},{"dtype":"1","uid":"1000559","num":"0","name":"端倰"},
	// {"dtype":"1","uid":"1000559","num":"10","name":"繁悦爱"},{"dtype":"2","uid":"1000559","num":"0","name":"秋辅"},
	// {"dtype":"1","uid":"1000559","num":"0","name":"秋辅"},{"dtype":"2","uid":"1000559","num":"0","name":"秋辅"}];
	public constructor() {
		super();
	}

	/**
	 * 当前宴会人数
	 */
	public getNum():number
	{
		return this.dinnerVo.num;
	}
	/**
	 * 当前宴会分数
	 */
	public getPoint():number
	{
		return this.dinnerVo.point;
	}
	/**
	 * 当前宴会类型： 1家宴 2官宴
	 */
	public getDtype():number
	{
		return this.dinnerVo.dtype;
	}
	/**
	 * 宴会是否公开 1公开 0不公开
	 */
	public getIsOpen():number
	{
		return this.dinnerVo.is_open;
	}
	/**
	 * 宴会结束时间
	 */
	public getEndTime():number
	{
		return this.dinnerVo.end_time;
	}
	/**
	 * 参宴次数
	 */
	public getDayNum():number
	{
		return this.dinnerVo.day_num;
	}

	/**
	 * 当前举办宴会的来宾信息
	 */
	public getJinfo():any[]
	{	
		// return [{name:"XSaf",pic:1,dtype:1},{name:"XSsdaf",pic:1,dtype:2},{name:"X1Saf",pic:1,dtype:3},{name:"XSffffaf",pic:1,dtype:4},
		// {name:"XSaf",pic:1,dtype:1},{name:"XSsdaf",pic:1,dtype:2},{name:"X1Saf",pic:1,dtype:3},{name:"XSffffaf",pic:1,dtype:4},];
		return this.dinnerVo.jinfo;
	}
	/**
	 * 总积分
	 */
	public getTotalScore():number
	{
		return this.dinnerVo.total_score;
	}

	public getTotalPoint():number
	{
		return this.dinnerVo.total_point;
	}
	/**
	 * 商店刷新次数
	 */
	public getShopNum():number
	{
		return this.dinnerVo.shop_num;
	}

	/**
	 * 记录自动刷新时间
	 */
	public getShopLastTime():number
	{
		return this.dinnerVo.shop_last_time;
	}
	/**
	 * 积分商店道具信息[shoid1,shopid2]
	 */
	public getShopInfo():string[]
	{
		return this.dinnerVo.shop_info;
	}
	/**
	 * 积分购买的道具信息[shoid1:1,shopid2:1]
	 */
	public getBuyInfo():Object
	{
		return this.dinnerVo.buy_info;
	}
	/**
	 * 请求处理最后时间
	 */
	public getLastDay():number
	{
		return this.dinnerVo.lastday;
	}

	public getName():string
	{
		return this.dinnerVo.name;
	}

	public getPic():number
	{
		return this.dinnerVo.pic;
	}
	public getLevel():number
	{
		return this.dinnerVo.level;
	}
	public getTitle():string
	{
		return this.dinnerVo.title;
	}
	public getPhototitle():string
	{
		return this.dinnerVo.phototitle;
	}


	public getListInfo(idx:number):any
	{
		if (this.viewList.length > idx && this.viewList[idx] && this.viewList[idx].uid ) {
			return this.viewList[idx];
		}
		else {
			return null;
		}
	}

	public getListInfoLength():number
	{
		return this.viewList.length
	}
	public setTotalNum(count):void
	{
		this.totalNum = count;
	}
	public getTotalNum():number
	{
		return this.totalNum;
	}

	public setListInfo(info:any[]):void
	{
		if (info) {
			this.viewList = info;
		}
	}

	public getShareTime():number
	{
		if (this.dinnerVo.other_info && this.dinnerVo.other_info["isshare"]) {
			return this.dinnerVo.other_info["isshare"];
		}
		return 0;
	}

	public isShowNpc():boolean
	{
		return Api.composemapVoApi.getMaxLv() >= Config.DinnerCfg.getNeedLv() && Api.switchVoApi.checkOpenCrossDinner();
	}

	public getLockedString():string
	{
		let returnStr = "";
		if(Api.switchVoApi.checkOpenCrossDinner() == false)
		{
			returnStr = LanguageManager.getlocal("dinnerViewTitle")+LanguageManager.getlocal("sysWaitOpen");
		}
		else{
			returnStr = LanguageManager.getlocal("composeUnlockFuncDesc",[Config.DinnerCfg.getNeedLv()+""]);
		}
		return returnStr
	}

	public getNeedItem():string
	{
		return Config.DinnerCfg.getNeedItem();
	}

	public dispose():void
	{
		this.viewList.length=0;
		this.lastShareTime = [0,0];
		this.totalNum = 0;
		super.dispose();
	}

}