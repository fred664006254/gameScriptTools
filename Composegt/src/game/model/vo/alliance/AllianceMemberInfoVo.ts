/**
 * 军团成员vo
 * author dky
 * date 2017/11/30
 * @class AllianceMemberInfoVo
 */
class AllianceMemberInfoVo extends BaseVo
{
	// id
	public id:string = "";
	// 帮派成员名称
	public name:string = "";
	// 帮派成员头像
	public pic:number = 0;
	// level
	public level:number = 0;
	// 帮派当前献值
	public ctv:number = 0;
	// 帮派成员贡献值
	public tctv:number = 0;
	// po
	public po:number = 0;
	// 帮派成员最后登录时间
	public logindt:number = 0;
	// 帮势力
	public power:number = 0;
	// 玩家ID
	public uid:number = 0;
	// 捐献的ID
	public donate:string = "0";
	public constructor() 
	{
		super();
	}

	// todo  根据配置添加get方法，比如，子嗣头像，子嗣当前阶段，当前升级需要经验等



	public initData(data:any):void
	{
		if(data)
		{
			if(data.name)
			{
				this.name = String(data.name);
			}
			if(data.pic)
			{
				this.pic = data.pic;
			}
			if(data.level)
			{
				this.level = data.level;
			}
			if(data.tctv)
			{
				this.tctv = Number(data.tctv);
			}
			if(data.ctv)
			{
				this.ctv = Number(data.ctv);
			}
			if(data.po)
			{
				this.po = Number(data.po);
			}
			if(data.logindt)
			{
				this.logindt = Number(data.logindt);
			}
			if(data.power)
			{
				this.power = Number(data.power);
			}
			if(data.uid)
			{
				this.uid = Number(data.uid);
			}
			if(data.donate)
			{
				this.donate = String(data.donate);
			}
		}
	}

	public dispose():void
	{
		this.id = "";
		this.name = "";
		this.pic = 0;
		this.level = 0;
		this.tctv = 0;
		this.po = 0;
		this.logindt = 0;
		this.power = 0;
		this.uid = 0;
		this.donate = "0";
	
	}
}