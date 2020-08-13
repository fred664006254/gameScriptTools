abstract class AcCommonView extends CommonView
{
	/**
	 * 当前活动的Id
	 */
	protected aid:string;
	public constructor() 
	{
		super();
		this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
	}
	protected  getUiCode():string
	{
		return this.code;
	}
	protected getResourceList():string[]
	{
		let resArr:string[]=[];
		if(this.code&&ResourceManager.hasRes(String(this.aid).toLowerCase()+this.code))
		{
			resArr.push(String(this.aid).toLowerCase()+this.code);
		}
		return super.getResourceList().concat(resArr);
	}
	protected get code():string
	{
		if(this.param && this.param.data){
			return this.param.data;
		} else {
			return "";
		}
		
	}
    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } else {
            return resName+"-"+defaultCode;
        }
    }
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
	protected get acVo():AcBaseVo
	{
		return Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
	}
	//概率展示
	protected getProbInfo():string
	{
		if(!Api.switchVoApi.checkOpenProbInfo()){
			return "";
		}
		let probStr = this.getClassName().toLowerCase().replace("view","") + "ProbInfo" + this.code;
		if(LanguageManager.checkHasKey(probStr))
		{
			return probStr;
		} else 
		{ 

		}
		return "";

	}
    // 规则说明内容
	protected getRuleInfo():string
	{
		let acRuleStr=this.getClassName().toLowerCase().replace("view","")+"RuleInfo" +this.code;
		let ruleStr=this.getClassName().toLowerCase().replace("view","")+"RuleInfo";
		if(LanguageManager.checkHasKey(acRuleStr)) 
		{
			return acRuleStr;
		} else if(LanguageManager.checkHasKey(ruleStr))
		{
			return ruleStr;
		}
		else
		{
			
			
		}
		return "";
	}	
	protected getTitleStr():string
	{
		return "ac"+App.StringUtil.firstCharToUper(this.acVo.aidAndCode)+"_Title";
	}
	protected getTitleParams():string[]
	{
		return null;
	}
	
}