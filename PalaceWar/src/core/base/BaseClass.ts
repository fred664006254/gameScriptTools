/**
 * author 陈可
 * date 2017/8/9
 * @class BaseClass
 */
abstract class BaseClass extends egret.HashObject implements base.Ibase
{
	public constructor() 
	{
		super();
	}

	abstract dispose():void;
}