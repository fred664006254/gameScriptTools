/**
 * 奖池
 * author ycg
 * date 2020.2.26
 * @class AcRecoveryDetailPopupViewTab3
 */
class AcRecoveryDetailPopupViewTab3 extends CommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 50);
        this.addChild(rewardBg);

        let topBg = BaseBitmap.create("public_9_bg91");
        topBg.width = rewardBg.width - 20;
        topBg.setPosition(rewardBg.x + rewardBg.width/2 - topBg.width/2, rewardBg.y + 8);
        this.addChild(topBg);

        let topMsg = ComponentManager.getTextField(LanguageManager.getlocal("acRecoveryPoolInfo-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topMsg.setPosition(topBg.x + topBg.width/2 - topMsg.width/2, topBg.y + topBg.height/2 - topMsg.height/2);
        this.addChild(topMsg);

        let dataList = this.cfg.getPoolListCfg();
        let rect = new egret.Rectangle(0, 0, 530, 660 - topBg.height);
        let scrollList = ComponentManager.getScrollList(AcRecoveryDetailTab3ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(25, topBg.y + topBg.height + 7);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }
    
    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }
	
    private get cfg() : Config.AcCfg.RecoveryCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcRecoveryVo{
        return <AcRecoveryVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }

     public dispose(){
       
        this._scrollList = null;
        super.dispose();
     }
}