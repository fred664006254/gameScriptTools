/**
 * 活动组主界面父类
 * author 陈可
 * date 2018/12/3
 * @class AcGroupCommonView
 */
abstract class AcGroupCommonView extends AcCommonView
{
	public constructor() 
	{
		super();
		this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("AcGroup","").replace("View",""));
	}

	protected get acVo():AcGroupBaseVo
	{
		return Api.acVoApi.getGroupAcVo(this.aid);
	}

	protected getTitleStr():string
	{
		return "acGroup"+App.StringUtil.firstCharToUper(this.aid)+"_Title";
	}
}