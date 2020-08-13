/**
 * 基类Api
 * author 陈可
 * date 2017/9/8
 * @namespace BaseVoApi
 */
abstract class BaseVoApi extends BaseClass
{
	protected _dataVoList:BaseVo[]=[];
	private _vo:BaseVo;
	public constructor() 
	{
		super();
	}

	public formatData(data:any):void
	{
		if(this._vo == null)
		{
			let className:string = this.getClassName();
			let voClassName:string = className.substring(0,className.length-3);
			let voClass:any = egret.getDefinitionByName(voClassName);
			
			this._vo = new voClass();
			// this._vo.initData(data);
			this[App.StringUtil.firstCharToLower(voClassName)] = this._vo;
		}
		this._vo.initData(data);
	}

	public getModeName():string
	{
		return this.getClassName().replace("VoApi","").toLowerCase();
	}

	protected getClassName():string
    {
        return egret.getQualifiedClassName(this);
    }

	public checkNpcMessage():boolean
	{
		return false;
	}

	public dispose():void
	{
		if(this._vo)
		{
			this._vo.dispose();
			this._vo = null;
		}
	}
	
}