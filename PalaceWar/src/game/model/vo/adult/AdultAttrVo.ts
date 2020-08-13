/**
 * 成年属性vo
 * author dky
 * date 2017/10/28
 * @class AdultAttrVo
 */
class AdultAttrVo extends BaseVo 
{
	// 武力
	public forceTotal:number = 0;
	// 智力
	public brainsTotal:number = 0;
	// 政治
	public politicsTotal:number = 0;
	// 魅力
	public charmTotal:number = 0;
	// 总和
	public attTotal:number = 0;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data)
			{
				this.forceTotal = Number(data[0]);
				this.brainsTotal = Number(data[1]);
				this.politicsTotal = Number(data[2]);
				this.charmTotal = Number(data[3]);
				this.attTotal = this.forceTotal + this.brainsTotal + this.politicsTotal + this.charmTotal;
			}
		}
	}
	public dispose():void
	{
		this.forceTotal = 0;
		this.brainsTotal = 0;
		this.politicsTotal = 0;
		this.charmTotal = 0;
	}
}