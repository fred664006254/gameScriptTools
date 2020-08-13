

class DinnerVo extends BaseVo
{

	/**
	 * 当前宴会人数
	 */
	public num:number = 0;

	/**
	 * 当前宴会分数
	 */
	public point:number = 0;

	/**
	 * 总宴会分数
	 */
	public total_point:number = 0;

	/**
	 * 当前宴会类型： 1家宴 2官宴
	 */
	public dtype:number = 0;

	/**
	 * 宴会是否公开 1公开 0不公开
	 */
	public is_open:number = 0;

	/**
	 * 宴会结束时间
	 */
	public end_time:number = 0;

	/**
	 * 参宴次数
	 */
	public day_num:number = 0;

	/**
	 * 当前举办宴会的来宾信息
	 * *.name 来宾name
	 * *.type 来宾赴宴方式
	 * *.join_time 来宾赴宴时间
	 */
	public jinfo:any[] = [];

	/**
	 * 总积分
	 */
	public total_score:number = 0;

	/**
	 * 商店刷新次数
	 */
	public shop_num:number = 0;

	/**
	 * 记录自动刷新时间
	 */
	public shop_last_time:number = 0;

	/**
	 * 积分商店道具信息[shoid1,shopid2]
	 */
	public shop_info:string[] = [];

	/**
	 * 积分购买的道具信息[shoid1:1,shopid2:1]
	 */
	public buy_info:Object = null;

	/**
	 * 请求处理最后时间
	 */
	public lastday:number = 0;

	/**
	 * 积分商店道具信息[shoid1,shopid2]
	 */
	public name:string = null;

	public pic:number = null;
	public level:number = null;
	public title:string = null;

	public other_info:Object = null;
	public phototitle:string = null;

	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if (data) {
			if (data.num != null) {
				this.num =data.num;
			}
			if (data.point != null) {
				this.point =data.point;
			}
			if (data.dtype != null) {
				this.dtype =data.dtype;
			}
			if (data.is_open != null) {
				this.is_open =data.is_open;
			}
			if (data.end_time != null) {
				this.end_time =data.end_time;
			}
			if (data.day_num != null) {
				this.day_num =data.day_num;
			}
			if (data.jinfo != null) {
				this.jinfo =data.jinfo;
			}
			if (data.total_score != null) {
				this.total_score =data.total_score;
			}
			if (data.total_point != null) {
				this.total_point =data.total_point;
			}
			if (data.shop_num != null) {
				this.shop_num =data.shop_num;
			}
			if (data.shop_last_time != null) {
				this.shop_last_time =data.shop_last_time;
			}
			if (data.shop_info != null) {
				this.shop_info =data.shop_info;
			}
			if (data.buy_info != null) {
				this.buy_info =data.buy_info;
			}
			if (data.lastday != null) {
				this.lastday =data.lastday;
			}
			if (data.name != null) {
				this.name =data.name;
			}
			if (data.pic != null) {
				this.pic =data.pic;
			}
			if (data.level != null) {
				this.level =data.level;
			}
			if (data.title != null) {
				this.title =data.title;
			}
			if (data.other_info != null) {
				this.other_info =data.other_info;
			}
			if (data.phototitle != null) {
				this.phototitle =data.phototitle;
			}

			
		}
	}

	public dispose()
    {
       this.num = 0;
	   this.point = 0;
	   this.dtype = 0;
	   this.is_open = 0;
	   this.end_time = 0;
	   this.day_num = 0;
	   this.jinfo.length = 0;
	   this.total_score = 0;
	   this.total_point = 0;
	   this.shop_num = 0;
	   this.shop_last_time = 0;
	   this.shop_info.length = 0;
	   this.buy_info = null;
	   this.lastday = 0;
	   this.name = null;
	   this.other_info = null;
	   this.pic = 0;
	   this.level = 0;
	   this.title = null;
	   this.phototitle = null;
    }
}