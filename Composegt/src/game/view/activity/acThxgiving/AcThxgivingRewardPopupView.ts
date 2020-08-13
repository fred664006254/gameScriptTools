/**
 * 每日奖励宝箱奖励预览弹板
 * author yanyuling qianjun 通用于转盘宝箱
 * date 2017/10/30
 * @class DailyTaskRewardPreviewPopuiView
 */
class AcThxgivingRewardPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private aid:string;
    private code:string;
    public constructor() 
	{
		super();
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
	public initView():void
	{	
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        this.aid = this.param.data.aid;
        this.code = this.param.data.code;

        let data = this.param.data;
        let rewardId = data.id;
        let rewardCfg = null;
        let need : number = 0;
        let mustStr = '';

        let cfg : Config.AcCfg.ThxgivingCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        need = cfg.feastList[rewardId].needNum;
        mustStr = cfg.feastList[rewardId].getReward;

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


        let lockTxt = this.getDefaultCn("acThxgvingRewardCase");
        if(rewardId==9){
            lockTxt = this.getDefaultCn("acThxgvingRewardCase2");
        }


        let tipTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt1.text = LanguageManager.getlocal(lockTxt,[String(need)]);
        tipTxt1.x = topBg.x + topBg.width/2 - tipTxt1.width/2;
        tipTxt1.y =topBg.y + topBg.height/2 - tipTxt1.height/2;
        this._nodeContainer.addChild(tipTxt1);
        
        let tipTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt2.text = LanguageManager.getlocal(this.getDefaultCn("acThxgvingRewardTip"));
        tipTxt2.x = bg.x+10;
        tipTxt2.y = bg.y + 20;
        this._nodeContainer.addChild(tipTxt2);
        
        
        let rewardArr = GameData.formatRewardItem(mustStr);
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
        let rewardX = rbg.x + rbg.width /2 - (4 * 106 + 15 * 3)/2; //rbg.x + (500 - 108 * rewardArr.length - 15 * (rewardArr.length - 1)) / 2;//rewardX = rbg.x + (500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2;
        let rewardY = rbg.y +12;
        for (var index = 0; index < rewardArr.length; index++) {
            let itemVo = rewardArr[index]
            // if(itemVo.type==104 && itemVo.id == 20801)
            // {
            //     let rewardArr = GameData.formatRewardItem("6_6201_1");
            //     itemVo = rewardArr[0];
            // }

            
			let iconItem = GameData.getItemIcon(itemVo,true);
            let numLb = iconItem.getChildByName("numLb");
            let iconBg:BaseBitmap = <BaseBitmap>iconItem.getChildByName("iconBg");
            
			iconItem.x = rewardX + (index % 4) * (106 + 15); ;
            iconItem.y = rewardY + Math.floor(index / 4) * (106+15);
            
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