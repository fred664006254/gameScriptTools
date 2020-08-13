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
	// _1,2,3,4分别代表资质，丹丸，红颜，光环加成 衣装加成
	public forceAdd_1:number = 0;
	public forceAdd_2:number = 0;
	public forceAdd_3:number = 0;
	public forceAdd_4:number = 0;
	public forceAdd_5:number = 0;
	public forceAdd_6:number = 0;
	public forceAdd_7:number = 0;
	public forceAdd_9:number = 0;
	// 智力
	public brainsTotal:number = 0;
	public brainsAdd_1:number = 0;
	public brainsAdd_2:number = 0;
	public brainsAdd_3:number = 0;
	public brainsAdd_4:number = 0;
	public brainsAdd_5:number = 0;
	public brainsAdd_6:number = 0;
	public brainsAdd_7:number = 0;
	public brainsAdd_9:number = 0;
	// 政治
	public politicsTotal:number = 0;
	public politicsAdd_1:number = 0;	
	public politicsAdd_2:number = 0;	
	public politicsAdd_3:number = 0;	
	public politicsAdd_4:number = 0;	
	public politicsAdd_5:number = 0;	
	public politicsAdd_6:number = 0;	
	public politicsAdd_7:number = 0;	
	public politicsAdd_9:number = 0;
	// 魅力
	public charmTotal:number = 0;
	public charmAdd_1:number = 0;
	public charmAdd_2:number = 0;
	public charmAdd_3:number = 0;
	public charmAdd_4:number = 0;
	public charmAdd_5:number = 0;
	public charmAdd_6:number = 0;
	public charmAdd_7:number = 0;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data){
			if(data.attr){
				this.forceTotal = Number(data.attr[0]);
				this.brainsTotal = Number(data.attr[1]);
				this.politicsTotal = Number(data.attr[2]);
				this.charmTotal = Number(data.attr[3]);
			}
			if(data.attrAdd){
				let arr = [`forceAdd_`,`brainsAdd_`,`politicsAdd_`,`charmAdd_`];
				for(let i in arr){
					let unit = arr[i];
					for(let j = 1; j <= 9; ++ j){
						//门客神器暂无	
						// if(j == 8){
						// 	continue;
						// }
						if(data.attrAdd[Number(i)][j - 1]){
							this[`${unit}${j}`] = Number(data.attrAdd[Number(i)][j - 1]);
						}
					}
				}
			}
		}
	}

	public dispose():void
	{
		let arr = [`forceAdd_`,`brainsAdd_`,`politicsAdd_`,`charmAdd_`];
		for(let i in arr){
			let unit = arr[i];
			for(let j = 1; j <= 7; ++ j){
				let temp = this[`${unit}${j}`];
				if(temp){
					this[`${unit}${j}`] = 0;
				}
			}
		}
	}
}