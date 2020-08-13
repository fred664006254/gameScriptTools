
class AcJadeViewRankScrollItem  extends ScrollListItem
{
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {

        let key = data.key;
        let innerbg = BaseBitmap.create("rechargevie_db_01");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg); 


        let line1 = BaseBitmap.create("public_ts_bg01");
        line1.width = 260
        line1.x = this.width/2 - line1.width/2;
        line1.y = 30-line1.height/2;

        //第几名
        let txt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
        
        if (data.rankV1 == data.rankV2){
             txt.text =LanguageManager.getlocal("acJadeView_rank"+data.rankV1);
        } else {
            txt.text =LanguageManager.getlocal("acJadeView_rank4",[String(data.rankV1),String(data.rankV2)]);
        }
        
        txt.width =230;
        txt.x = this.width / 2 - txt.width/2;
        txt.textAlign ="center";
        txt.y = 30 - txt.height/2;  
        this.addChild(line1);
        this.addChild(txt);
        this.height = innerbg.y + innerbg.height + 10;

        let reward = data.reward;
        let rewardArr:RewardItemVo[] = GameData.formatRewardItem(reward);

        let itemicon = null;
        let baseWidth = 106;
        let baseHeight = 106;
        let spaceX = 10;
        let spaceY = 10;
        let startX = this.width / 2 - (baseWidth * 5 + spaceX * 4) / 2;
        let startY = 55;
        let lastY = 0;
        for(let i = 0; i < rewardArr.length; i++)
        {
            itemicon = GameData.getItemIcon(rewardArr[i],true,false);
            itemicon.x = startX + (i % 5) * (baseWidth + spaceX);
            itemicon.y = startY + Math.floor(i / 5) * (baseHeight + spaceY);
            this.addChild(itemicon);
            if(i == rewardArr.length-1){
                lastY = itemicon.y;
            }
        }

        innerbg.height = lastY + baseHeight + 25;


        this.height = innerbg.height;

    }

    public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 10;
	}
    public dispose():void
    {
        super.dispose();
    }
}