

class AcBattleGroundChallengeView extends PopupView
{	

    //挑战界面  //复仇  
    public constructor() 
	{   
		super();
    }

    protected getOffsetX():number
	{	
		return 35;
	}
    
    protected getResourceList():string[]
	{
         return super.getResourceList().concat([
		]);
    }
    protected getTitleStr():string
    {
        //type 1挑战按钮  //2复仇   //3追杀
        if(AtkraceChallengeItem.data)
        {
            if(AtkraceChallengeItem.data.type==1)
            {
                return "atkraceChallenge";
            }
            else if(AtkraceChallengeItem.data.type==2)
            {
                return "atkraceRevenge";
            }
            else if(AtkraceChallengeItem.data.type==3)
            {
                return "atkraceVisitTab3";
            }
        }
    }

    protected getTabbarTextArr():Array<string>
	{
		return [
            "acBattleGroundTip15-1",
            "acBattleGroundTip16-1",
		];
	}

    protected initView():void
    {
    
    }
    
    protected getShowHeight():number
    {
        return 730;
    }

    public dispose():void
    {
        super.dispose();
    }

}