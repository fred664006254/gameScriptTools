/**
 * 军团成员vo
 * author dky
 * date 2017/11/30
 * @class AllianceMemberVo
 */
class AllianceMemberVo extends BaseVo
{

	// 成员vo列表
	public memberInfoVoObj:Object = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			this.memberInfoVoObj = null;

			if(data)
			{
				if(this.memberInfoVoObj == null)
				{
					this.memberInfoVoObj = {};
				}
				for(var key in data)
				{

					if(this.memberInfoVoObj[key])
					{
						this.memberInfoVoObj[key].initData(data[key]);
						
					}
					else
					{
						let allianceInfoVo:AllianceMemberInfoVo = new AllianceMemberInfoVo();
						allianceInfoVo.id = key;
						allianceInfoVo.initData(data[key]);
						this.memberInfoVoObj[key] = allianceInfoVo;
					}
				}
				for(var key in this.memberInfoVoObj)
				{
					if(!data[key])
					{
						delete this.memberInfoVoObj[key];
					}
				}
			}
		}
	}

	public dispose():void
	{
		if(this.memberInfoVoObj)
		{
			for(let key in this.memberInfoVoObj)
			{
				(this.memberInfoVoObj[key])
				{
					this.memberInfoVoObj[key].dispose();
					this.memberInfoVoObj[key] = null;
				}
			}
		}
	}
}