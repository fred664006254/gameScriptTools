/**
 * author yanyuling 
 */
class AcFlipCardBoxRewardPopupView  extends PopupView
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

        let ofy:number=10;
        let topBg = BaseBitmap.create("public_tc_bg02");
        topBg.width = 272;
        topBg.x =  this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
        topBg.y = ofy;
        this._nodeContainer.addChild(topBg)

        let lockTxt = "acFlipCard_nettip5"
        let tipTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt1.text = LanguageManager.getlocal(lockTxt,[""+this.param.data.need]);
        tipTxt1.x = topBg.x + topBg.width/2 - tipTxt1.width/2;
        tipTxt1.y =topBg.y + topBg.height/2 - tipTxt1.height/2;
        this._nodeContainer.addChild(tipTxt1);

        ofy += topBg.height + 10;
        let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 520;
		bg.height = 205;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        bg.y = ofy ;
		this._nodeContainer.addChild(bg);

        let tipTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt2.text = LanguageManager.getlocal( "dailyTaskRewardPreviewPopuiViewTitle" );
        tipTxt2.x = bg.x+10;
        tipTxt2.y = bg.y + 20;
        this._nodeContainer.addChild(tipTxt2);

        let resultStr = this.param.data.rewardstr;
        let rewardArr = GameData.formatRewardItem(resultStr);
        let lineNum = Math.ceil(rewardArr.length / 4);
        let rbg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		rbg.width = bg.width-20;
		rbg.height = 120*lineNum +40;
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
        let rewardX = rbg.x + 15
        let rewardY = rbg.y +15;
        for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true);
            if (index > 0 && index%4 == 0 )
            {   rewardX = rbg.x + 15;
                rewardY += iconItem.height + 15;
                iconItem.x =  rewardX ;
            }else{
                iconItem.x =  rewardX ;
                rewardX +=  (iconItem.width+15);
            }
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