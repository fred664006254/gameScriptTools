/**
 * 排行
 * date 2020.6.15
 * @class AcWeaponHouseRankPopupViewTab1
 */
class AcWeaponHouseRankPopupViewTab1 extends CommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 583;
        rewardBg.setPosition(26, 53);
        this.addChild(rewardBg);

        let baseView = <AcWeaponHouseRankPopupView>ViewController.getInstance().getView("AcWeaponHouseRankPopupView");
        let rankData = baseView.getMyrank();

        let dataList = this.cfg.getRankOneItemList();
        let rect = new egret.Rectangle(0, 0, 530, 570);
        let scrollList = ComponentManager.getScrollList(AcWeaponHouseRankScrollItem1, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(rewardBg.x, rewardBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        // 底部bg 
        let bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 530;
        bottomBg.height = 112;
        bottomBg.setPosition(rewardBg.x + rewardBg.width/2 - bottomBg.width/2, rewardBg.y + rewardBg.height + 2);
        this.addChild(bottomBg);

        // 我的排名 
        let myRank:any = null;
        let score = 0;
        if( rankData && rankData.myrank)
        {
            myRank = rankData.myrank;
            if (myRank > 10000){
                myRank = "10000+";
            }
            if (rankData.myrank.value){
                score = rankData.myrank.value;
            }
            else{
                score = this.vo.getScoreNum();
            }
        }
        else{
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeRankNotInRank", this.getTypeCode()));
            score = this.vo.getScoreNum();
        }
        let myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_ranking_title", this.getTypeCode()), [String(myRank)]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChild(myRankTF);
    
        //积分
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankGrade_title", this.getTypeCode()), [String(score)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(myRankTF.x, myRankTF.y + myRankTF.height + 15);
        this.addChild(myScoreTF);

        //rank btn
        let rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acWeaponHouse_rankOneList_title", this.getTypeCode()), ()=>{
            if (!this.vo.isStart){
                this.vo.showAcEndTip();
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONHOUSERANKSHOWPOPUPVIEW, {aid: this.aid, code: this.code});
        }, this);
        rankBtn.setPosition(bottomBg.x + bottomBg.width - rankBtn.width - 20, bottomBg.y + bottomBg.height/2 - rankBtn.height/2);
        this.addChild(rankBtn);
    }

    private refreshView():void{

    }

    private get cfg() : Config.AcCfg.WeaponHouseCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcWeaponHouseVo{
        return <AcWeaponHouseVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    public dispose():void{
        let view = this;
        view._scrollList = null;

        super.dispose();
    }
}