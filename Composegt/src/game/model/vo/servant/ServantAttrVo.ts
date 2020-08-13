/**
 * 门客属性vo
 * author dmj
 * date 2017/9/22
 * @class ServantAttrVo
 */
class ServantAttrVo extends BaseVo
{
	// 武力
	public forceTotal:number = 0;
	// _1,2,3,4分别代表资质，丹丸，红颜，光环加成
	public forceAdd_1:number = 0;
	public forceAdd_2:number = 0;
	public forceAdd_3:number = 0;
	public forceAdd_4:number = 0;
	public forceAdd_5:number = 0;
	// 智力
	public brainsTotal:number = 0;
	public brainsAdd_1:number = 0;
	public brainsAdd_2:number = 0;
	public brainsAdd_3:number = 0;
	public brainsAdd_4:number = 0;
	public brainsAdd_5:number = 0;
	// 政治
	public politicsTotal:number = 0;
	public politicsAdd_1:number = 0;	
	public politicsAdd_2:number = 0;	
	public politicsAdd_3:number = 0;	
	public politicsAdd_4:number = 0;	
	public politicsAdd_5:number = 0;	
	// 魅力
	public charmTotal:number = 0;
	public charmAdd_1:number = 0;
	public charmAdd_2:number = 0;
	public charmAdd_3:number = 0;
	public charmAdd_4:number = 0;
	public charmAdd_5:number = 0;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.attr)
			{
				this.forceTotal = Number(data.attr[0]);
				this.brainsTotal = Number(data.attr[1]);
				this.politicsTotal = Number(data.attr[2]);
				this.charmTotal = Number(data.attr[3]);
			}
			if(data.attrAdd)
			{
				this.forceAdd_1 = Number(data.attrAdd[0][0]);
				this.forceAdd_2 = Number(data.attrAdd[0][1]);
				this.forceAdd_3 = Number(data.attrAdd[0][2]);
				this.forceAdd_4 = Number(data.attrAdd[0][3]);
				if (data.attrAdd[0][4])
				{
					this.forceAdd_5 = Number(data.attrAdd[0][4]);
				}

				this.brainsAdd_1 = Number(data.attrAdd[1][0]);
				this.brainsAdd_2 = Number(data.attrAdd[1][1]);
				this.brainsAdd_3 = Number(data.attrAdd[1][2]);
				this.brainsAdd_4 = Number(data.attrAdd[1][3]);
				if (data.attrAdd[1][4])
				{
					this.brainsAdd_5 = Number(data.attrAdd[1][4]);
				}

				this.politicsAdd_1 = Number(data.attrAdd[2][0]);
				this.politicsAdd_2 = Number(data.attrAdd[2][1]);
				this.politicsAdd_3 = Number(data.attrAdd[2][2]);
				this.politicsAdd_4 = Number(data.attrAdd[2][3]);
				if (data.attrAdd[2][4])
				{
					this.politicsAdd_5 = Number(data.attrAdd[2][4]);
				}
				
				this.charmAdd_1 = Number(data.attrAdd[3][0]);
				this.charmAdd_2 = Number(data.attrAdd[3][1]);
				this.charmAdd_3 = Number(data.attrAdd[3][2]);
				this.charmAdd_4 = Number(data.attrAdd[3][3]);
				if (data.attrAdd[3][4])
				{
					this.charmAdd_5 = Number(data.attrAdd[3][4]);
				}
			}
		}
	}
	public dispose():void
	{
		this.forceTotal = 0;
		this.forceAdd_1 = 0;
		this.forceAdd_2 = 0;
		this.forceAdd_3 = 0;
		this.forceAdd_4 = 0;
		this.forceAdd_5 = 0;
		this.brainsTotal = 0;
		this.brainsAdd_1 = 0;
		this.brainsAdd_2 = 0;
		this.brainsAdd_3 = 0;
		this.brainsAdd_4 = 0;
		this.brainsAdd_5 = 0;
		this.politicsTotal = 0;
		this.politicsAdd_1 = 0;	
		this.politicsAdd_2 = 0;	
		this.politicsAdd_3 = 0;	
		this.politicsAdd_4 = 0;	
		this.politicsAdd_5 = 0;	
		this.charmTotal = 0;
		this.charmAdd_1 = 0;
		this.charmAdd_2 = 0;
		this.charmAdd_3 = 0;
		this.charmAdd_4 = 0;
		this.charmAdd_5 = 0;
	}
}