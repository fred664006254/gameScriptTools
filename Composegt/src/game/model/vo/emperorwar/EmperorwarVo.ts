
class EmperorwarVo extends BaseVo
{	
	public version:number = 0;
	public ak:number = 0;
	public status:number = 0;
	/**
	 * 编号
	 */
	public number:number = 0;
	/**
	 * 报名时间
	 */
	public bmst:number = 0;
	/**
	 * 报名消耗
	 */
	public pemcost:number = 0;
	/**
	 * 门客信息  {sinfo={}}
	 */
	public info:Object = {};
	/**
	 * 人气
	 */
	public getcheer:number = 0;
	/**
	 * 助威别人  {uid=0,num=0}
	 */
	public cheerinfo:Object = {};
	/**
	 * 领奖信息   {et=0,bmflag=0,winflag=0}
	 */
	public winfo:Object = {};
	/**
	 * 
	 */
	public updated_at:number = 0;

	public constructor() {
		super();
	}

	public initData(data:any):void
	{
		if (data) {
			if (data.version != null) {
				this.version =data.version;
			}
			if (data.ak != null) {
				this.ak =data.ak;
			}
			if (data.status != null) {
				this.status =data.status;
			}
			if (data.number != null) {
				this.number =data.number;
			}
			if (data.bmst != null) {
				this.bmst =data.bmst;
			}
			if (data.pemcost != null) {
				this.pemcost =data.pemcost;
			}
			if (data.info != null) {
				this.info =data.info;
			}
			if (data.getcheer != null) {
				this.getcheer =data.getcheer;
			}
			if (data.cheerinfo != null) {
				this.cheerinfo =data.cheerinfo;
			}
			if (data.winfo != null) {
				this.winfo =data.winfo;
			}
			if (data.updated_at != null) {
				this.updated_at =data.updated_at;
			}
		}
	}

	public dispose()
    {
		this.version = 0;
		this.ak = 0;
		this.status = 0;
		this.number = 0;
		this.bmst = 0;
		this.pemcost = 0;
		this.info = {};
		this.getcheer = 0;
		this.cheerinfo = {};
		this.winfo = {};
		this.updated_at = 0;

	}
}