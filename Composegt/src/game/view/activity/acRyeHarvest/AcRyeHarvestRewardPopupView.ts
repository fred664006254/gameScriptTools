/**
 * 母亲节奖励宝箱奖励预览弹板
 * author qianjun
 */
class AcRyeHarvestRewardPopupView  extends PopupView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor() 
	{
		super();
    }
    
    private get cfg() : Config.AcCfg.RyeHarvestCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcRyeHarvestVo{
        return <AcRyeHarvestVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	private get aid():string{
		return this.param.data.aid;
	}
	
	private get code():string{
		return this.param.data.code;
    }

    protected getUiCode() : string{
        let code = '';
        switch(Number(this.code)){
            case 2:
                code = '1';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    protected getTitleStr():string{
        return `dailyTaskRewardPreviewPopuiViewTitle`;
    }

	public initView():void
	{	
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let view = this;
        let data = this.param.data;
        let rewardId = data.id;
        let mustStr = '';
        let canReward = null;
        let rewardCfg = rewardId == 11 ? view.cfg.bigPrize : view.cfg.achievement[rewardId - 1];
        mustStr = rewardCfg.getReward;
        
        let ofy:number=51;
        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 180;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 116-ofy;
		this._nodeContainer.addChild(bg);

        let topBg = BaseBitmap.create("public_9_bg3");
        this._nodeContainer.addChild(topBg)

        let tipTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        let strTitle:string = `ryeharvestrewardtip1-${view.getUiCode()}`;
        if(rewardId == 11){
            strTitle = `ryeharvestrewardtip3-${view.getUiCode()}`;
        }
        else if(rewardId > 5){
            strTitle = `ryeharvestrewardtip2-${view.getUiCode()}`;
        }
        tipTxt1.text = LanguageManager.getlocal(strTitle);

        topBg.width = tipTxt1.textWidth + 40;
        topBg.x =  this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
        topBg.y = 65-ofy;

        tipTxt1.x = topBg.x + topBg.width/2 - tipTxt1.width/2;
        tipTxt1.y = topBg.y + topBg.height/2 - tipTxt1.height/2 + 20;
        this._nodeContainer.addChild(tipTxt1);
        
        let tipTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        tipTxt2.text = LanguageManager.getlocal(`ryeharvestrewardtip4-${view.getUiCode()}`);
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
        let rbg:BaseBitmap = BaseBitmap.create("public_9_bg1");
		rbg.width = bg.width-20;
		rbg.height = 120*lineNum;
		rbg.x = this.viewBg.x + this.viewBg.width/2 - rbg.width/2;
        rbg.y = tipTxt2.y + tipTxt2.height + 10;
		this._nodeContainer.addChild(rbg);
        bg.height = rbg.height + 90;
        // let rewardX = rbg.x + (data.type == AcConst.AID_ACMAYDAY ||data.type == AcConst.AID_ACARCHER||data.type == AcConst.AID_LABORDAY ? ((500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2): 10);//rewardX = rbg.x + (500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2;
        let rewardX = rbg.x + 10;
        let rewardY = rbg.y +10;
        for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true);
            if (index > 0 )
            {   
                rewardX +=  (iconItem.width+10);
                if( index%4 == 0){
                    // rewardX = rewardX = rbg.x + (data.type == AcConst.AID_ACMAYDAY || data.type == AcConst.AID_ACARCHER||data.type == AcConst.AID_LABORDAY ? ((500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2): 10);
                    rewardX = rewardX = rbg.x + 10;
                    rewardY += iconItem.height + 5;
                }
            }
			iconItem.x =  rewardX ;
            iconItem.y = rewardY;
            
			this._nodeContainer.addChild(iconItem);
        }
        
        let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `confirmBtn`, view.hide, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg, [0, bg.height + 20]);
        this._nodeContainer.addChild(btn);
    }

    protected getShowHeight():number{
        return 425;
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