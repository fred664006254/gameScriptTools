/**
 * 亲家相关vo
 * author qianjun
 * date 2017/10/28
 * @class AdultVo
 */
class SadunVo extends BaseVo
{
	public visited : any = null;
	public receive : any = null;
	public info : any = null;
	public wife : any = null;
	public refuse : any = null;
	public sadunList : any = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			this.visited = data.sadun.visited;//孩子被接待了
			this.receive = data.sadun.receive;
			this.info = data.sadun.info;
			this.wife = data.sadun.wife;
			this.refuse = data.sadun.refuse;
			if(data.sadunList){
				this.sadunList = data.sadunList;
			}
			if(this.sadunList){
				let temp = this.arr2obj(this.sadunList, 'uid');
				for(let i in this.info){
					if(temp[i]){
						for(let k in temp[i]){
							this.info[i][k] = temp[i][k];
						}
					}
				}
			}
		}
	}

	public arr2obj(arr: Array<any>, key: string): any {
		let obj: any = {};
		if (arr) {
			let ln = arr.length;
			if (ln) {
				for (let i = 0; i < ln; i++) {
					let cd: any = arr[i];
					obj[cd[key]] = cd;
				}
			}
		}
		return obj;
    }

	public dispose():void
	{
		this.visited = null;
		this.receive = null;
		this.info = null;
		this.wife = null;
		this.refuse = null;
		this.sadunList = null;
    }
}
/**
 * 
 * sadun":{"visited":{},
 * "lastday":0,
 * "receive":{},
 * "info":{},
 * "uid":1002741,
 * "wife":{},
 * "refuse":""},
 * "sadunList":{}}
 */