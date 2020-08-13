
class AcJadeViewTotalScrollItem extends ScrollListItem
{
    /**
     * 充值进度条
     */
    private _progress:ProgressBar = null;
    private _rechargeBtn:BaseButton = null;
    private _vo:AcJadeVo = null;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any,param)
    {
  
        this._vo = <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(param.aid,param.code);
    
        let key = data.key;
        let innerbg = BaseBitmap.create("rechargevie_db_01");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg); 

        let line1 = null;
        let txt = null;

        let descColor = TextFieldConst.COLOR_BROWN;
        if(data.rankV1 <= this._vo.getRechargeValue() && (data.rankV2 >= this._vo.getRechargeValue() ||data.rankV2 == -1))
        {
            descColor = 0xde7b46;
            line1 = BaseBitmap.create("acjadeview_red");
            txt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
        } else {
            line1 = BaseBitmap.create("public_ts_bg01");
            txt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
        }

       
        line1.width = 260
        line1.x = this.width/2 - line1.width/2;
        line1.y = 30-line1.height/2;


        //第几名
        
        txt.text =LanguageManager.getlocal("acJadeView_totalrank"+(index + 1));        
        txt.width =230;
        txt.x = this.width / 2 - txt.width/2;
        txt.textAlign ="center";
        txt.y = 30 - txt.height/2;  
        this.addChild(line1);
        this.addChild(txt);
        this.height = innerbg.y + innerbg.height + 10;


        //描述1
        let desc1 = ComponentManager.getTextField("",18,descColor);
        desc1.text =LanguageManager.getlocal("acJadeView_totaldesc1",[data.rankV1]);        
        // desc.width =230;
        desc1.x = this.width / 2 - txt.width/2;
        desc1.textAlign ="center";
        desc1.y = 67 - txt.height/2;  
  
        this.addChild(desc1);




        let reward = data.reward;
        let rewardArr:RewardItemVo[] = GameData.formatRewardItem(reward);

        let itemicon = null;
        let baseWidth = 106;
        let baseHeight = 106;
        let spaceX = 10;
        let spaceY = 10;
        let startX = this.width / 2 - (baseWidth * 5 + spaceX * 4) / 2;
        let startY = 55 + 25;
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

        // innerbg.height = lastY + baseHeight + 25;

        this._progress = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",400);
        this._progress.setPosition(20,lastY + baseHeight + 10);
        this._progress.setText(this._vo.getRechargeValue()+"/"+ data.rankV1+LanguageManager.getlocal("acJadeTotalListGem"));
        this._progress.setPercentage(this._vo.getRechargeValue()/data.rankV1)
        this.addChild(this._progress);

        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acCarnivalToChargeBtnText",this.rechargeHandler ,this);
        this._rechargeBtn.setPosition(this._progress.x + this._progress.width +45,this._progress.y - 5);
        this.addChild(this._rechargeBtn);

        //描述2
        let desc2 = ComponentManager.getTextField("",18,descColor);
        
        if(data.rankV1 - this._vo.getRechargeValue() <=0){
            desc2.text =LanguageManager.getlocal("acJadeView_totaldesc3");        
        } else {
            desc2.text =LanguageManager.getlocal("acJadeView_totaldesc2",[(data.rankV1 - this._vo.getRechargeValue()).toString()]);        
        }
        desc2.textAlign ="center";
        desc2.x = this._progress.x + this._progress.width / 2 - desc2.width/2;
        desc2.y = this._progress.y + this._progress.height + 5;  
  
        this.addChild(desc2);

        innerbg.height = this._progress.y + this._progress.height + 45;
        this.height = innerbg.height;

    }
	/**
     * 打开充值界面
     */
    private rechargeHandler(event:egret.Event)
    {

        
        

        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
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
        this._progress = null;
        this._rechargeBtn = null;
        this._vo = null;
        super.dispose();
    }
}