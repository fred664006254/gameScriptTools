/**
 * author dmj
 * date 2017/9/7
 * @class Dictionary
 */
class Dictionary
{
	private _keys:any[] = [];
	private _values:any[] = [];
	public constructor() 
	{
		
	}

	/**
	 * 添加、更新key、value
	 * @param key 可以是任何类型
	 * @param value 可以是任何类型
	 */
	public set(key: any, value: any): void 
	{
		var index = this._keys.indexOf(key, 0);
		if (index != -1) {
			this._keys[index] = key;
			this._values[index] = value;
		}
		else
		{
			this._keys.push(key);
			this._values.push(value)
		}
	}

	/**
	 * 删除
	 * @param key 
	 */
	public remove(key: any):void
	{
		var index = this._keys.indexOf(key, 0);
		this._keys.splice(index, 1);
		this._values.splice(index, 1);
	}
	/**
	 * 测试代码
	 */
	public testLog():void
	{
		App.LogUtil.log("key length =======" + this._keys.length);
		App.LogUtil.log("_values length ======" + this._values.length);
		for(var i = 0;i < this._keys.length;i++)
		{
			App.LogUtil.log("key =" + this._keys[i]);
		}
		for(var i = 0;i < this._values.length;i++)
		{
			App.LogUtil.log("value =" + this._values[i]);
		}

		App.LogUtil.log("=================end=====================");
	}

	// 长度
	private length(): number 
	{
		return this._keys.length;
	}

	/**
	 * 判断是否包含该key,true包含
	 * @param key 
	 */
	public has(key: any): boolean 
	{
		let ks = this._keys;
		for (let i = 0; i < ks.length; ++i) {
			if (ks[i] == key) {
				return true;;
			}
		}
		return false;
	}

	public dispose():void
	{
		this._keys.length = 0;
		this._values.length = 0;
	}

	/**
	 * 通过key查找value
	 * @param key 
	 */
	public get(key: any): any
	{
		let ks = this._keys;
		for (let i = 0; i < ks.length; ++i) {
			if (ks[i] == key) {
				return true;;
			}
		}
		return false;
	}

	public getKeys(): any[] 
	{
		return this._keys;
	}

	public getValues(): any[] 
	{
		return this._values;
	}
}