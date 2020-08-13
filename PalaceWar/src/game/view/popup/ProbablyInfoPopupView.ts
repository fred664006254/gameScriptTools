class ProbablyInfoPopupView extends RuleInfoPopupView
{
	public constructor() 
	{
		super();
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat(["popupview_probablytitle"]);
	}
    protected getTitleBgName():string
	{
		return "popupview_probablytitle";
	}
}