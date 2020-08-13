/**
 * 排行奖励
 * author sl
 * date 2020.7.29
 * @class AcMouseTreasurePopupViewTab3
 */
class AcMouseTreasurePopupViewTab3 extends CommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 575;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);

        let rankData = this.vo.rankData;

        let dataList = this.cfg.rankList;
        let rect = new egret.Rectangle(0, 0, 530, 560);
        let scrollList = ComponentManager.getScrollList(AcMouseTreasureScrollItem3, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(rewardBg.x, rewardBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        // 底部bg 
        let bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 530;
        bottomBg.height = 113;
        bottomBg.setPosition(rewardBg.x + rewardBg.width/2 - bottomBg.width/2, rewardBg.y + rewardBg.height + 10);
        this.addChild(bottomBg);

        // 我的排名 
        let myRank:any = null;
        let score = 0;
        let code = "1";
        if( rankData && rankData.myrankArr && rankData.myrankArr.myrank)
        {
            myRank = rankData.myrankArr.myrank;
            if (myRank > 10000){
                myRank = "10000+";
            }
            if (rankData.myrankArr.value){
                score = rankData.myrankArr.value;
            }
            else{
                score = this.vo.getScore();
            }
        }
        else{
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankNotInRank", "1"));
            score = this.vo.getScore();
        }
        let myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankMyRank", "1"), [String(myRank)]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChild(myRankTF);
    
        //积分
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankMyScore", "1"), [String(score)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(myRankTF.x, myRankTF.y + myRankTF.height + 15);
        this.addChild(myScoreTF);

        //rank btn
        let rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acMouseGoldDetailRankBtn", "1"), ()=>{
            if (!this.vo.isStart){
                this.vo.showAcEndTip();
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASURERERANKDETAILPOPUPVIEW, {aid: this.aid, code: this.code,uicode:this.getTypeCode()});
        }, this);
        rankBtn.setPosition(bottomBg.x + bottomBg.width - rankBtn.width - 20, bottomBg.y + bottomBg.height/2 - rankBtn.height/2);
        this.addChild(rankBtn);
    }

    private refreshView():void{

    }

    private get cfg() : Config.AcCfg.MouseTreasureCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcMouseTreasureVo{
        return <AcMouseTreasureVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        return this.param.data.uicode;
    }

    public dispose():void{
        let view = this;
        view._scrollList = null;

        super.dispose();
    }
}