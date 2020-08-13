/**
 * 福袋宝箱
 * author jiangliuyang 通用于转盘宝箱
 * date 2018/7/6
 * @class AcLuckBagBoxRewardPopupView
 */
class AcLuckBagBoxRewardPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor() 
	{
		super();
	}

	public initView():void
	{	
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let data = this.param.data;
        let rewardId = data.id;
        let rewardCfg = null;
        let need : number = 0;
        let mustStr = '';
        let canReward = null;
        
        let cfg = Config.AcCfg.LuckBagCfg = Config.AcCfg.getCfgByActivityIdAndCode(AcLuckBagView.AID, AcLuckBagView.CODE);
        rewardCfg = cfg.getBoxRewardById(rewardId);
        need = rewardCfg.needNum;
        mustStr = rewardCfg.getReward;
        

        
        let ofy:number=51;
        let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 520;
		bg.height = 205;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        bg.y = 116 - ofy + 15;
		// bg.y = 116-ofy;
		this._nodeContainer.addChild(bg);

        let topBg = BaseBitmap.create("public_tc_bg02");
        topBg.width = 272;
        topBg.x =  this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
        topBg.y = 65-ofy;
        this._nodeContainer.addChild(topBg)



        let tipTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt1.text = LanguageManager.getlocal("acLuckBagBoxDesc",[String(need)]);
        tipTxt1.x = topBg.x + topBg.width/2 - tipTxt1.width/2;
        tipTxt1.y =topBg.y + topBg.height/2 - tipTxt1.height/2;
        this._nodeContainer.addChild(tipTxt1);
        
        let tipTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt2.text = LanguageManager.getlocal("acLuckBagBoxDesc1");
        tipTxt2.x = bg.x+10;
        tipTxt2.y = bg.y + 20;
        this._nodeContainer.addChild(tipTxt2);
        
        if (!canReward){
            canReward = [];
        }
        let resultStr = mustStr;
        for (var index = 0; index < canReward.length; index++) {
            resultStr = resultStr + "|" + canReward[index];
        }
        let rewardArr = GameData.formatRewardItem(resultStr);
        let lineNum = Math.ceil(rewardArr.length / 4);
        let rbg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		rbg.width = bg.width-30;
		rbg.height = 120*lineNum +15;
		rbg.x = this.viewBg.x + this.viewBg.width/2 - rbg.width/2;
        rbg.y = tipTxt2.y + tipTxt2.height + 10;
		this._nodeContainer.addChild(rbg);


        let leftF = BaseBitmap.create("public_tcdw_bg01");
		leftF.x = rbg.x + 5 ;
		leftF.y = rbg.y +3;
		this._nodeContainer.addChild(leftF);

		let rightF = BaseBitmap.create("public_tcdw_bg02");
		rightF.x = rbg.x + rbg.width - rightF.width - 5 ;
		rightF.y = rbg.y +3;
		this._nodeContainer.addChild(rightF);

        bg.height = rbg.height + 70;
        let rewardX = rbg.x + (500 - 108 * rewardArr.length - 15 * (rewardArr.length - 1)) / 2;//rewardX = rbg.x + (500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2;
        let rewardY = rbg.y +12;
        for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true);
            let numLb = iconItem.getChildByName("numLb");
            // if(numLb)
            // {
            //     numLb.visible = false;
            // }
            if (index > 0 )
            {   
                rewardX +=  (iconItem.width+15);
                if( index%4 == 0){
                    rewardX = rewardX = rbg.x + (500 - 108 * rewardArr.length - 15 * (rewardArr.length - 1)) / 2;
                    rewardY += iconItem.height + 15;
                }
            }
			iconItem.x =  rewardX ;
            iconItem.y = rewardY;
            
			this._nodeContainer.addChild(iconItem);
		}
    }

     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	public dispose():void
	{
        this._nodeContainer = null
        super.dispose();
    }
}