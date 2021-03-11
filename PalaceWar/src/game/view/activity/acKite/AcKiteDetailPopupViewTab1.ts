/**
 * 排行
 * date 2020.4.1
 * @class AcKiteDetailPopupViewTab1
 */
class AcKiteDetailPopupViewTab1 extends CommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_CHARGE, this.requestCallback, this);
        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 583;
        rewardBg.setPosition(46, 50);
        this.addChild(rewardBg);

        let baseView = <AcKiteDetailPopupView>ViewController.getInstance().getView("AcKiteDetailPopupView");
        let rankData = baseView.getMyRankData();

        let dataList = this.cfg.rankItemList;
        let rect = new egret.Rectangle(0, 0, 530, 570);
        let firstInfo:any = rankData.acrank.rankList[0];
        let scrollList = ComponentManager.getScrollList(AcKiteDetailPopupViewTab1ScrollItem, dataList, rect, {aid:this.aid, code:this.code, firstInfo: firstInfo});
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
        if( rankData && rankData.acrank && rankData.acrank.myrank)
        {
            if (rankData.acrank.myrank.myrank){
                myRank = rankData.acrank.myrank.myrank;
                if (myRank > 10000){
                    myRank = "10000+";
                }
            }
            else{
                myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankNotInRank", this.getTypeCode()));
            }
            if (rankData.acrank.myrank.value){
                score = rankData.acrank.myrank.value * this.cfg.unitLength;
            }
            else{
                score = this.vo.maxhight * this.cfg.unitLength;
            }
        }
        else{
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankNotInRank", this.getTypeCode()));
        }
        let myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankMyRank", this.getTypeCode()), [String(myRank)]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChild(myRankTF);
    
        //积分
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acKiteRankMyScore", this.getTypeCode()), [String(score)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(myRankTF.x, myRankTF.y + myRankTF.height + 15);
        this.addChild(myScoreTF);

        //rank btn
        let rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acKiteRankTitle", this.getTypeCode()), ()=>{
            if (!this.vo.isStart){
                this.vo.showAcEndTip();
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACKITERANKDETAILPOPUPVIEW, {aid: this.aid, code: this.code});
        }, this);
        rankBtn.setPosition(bottomBg.x + bottomBg.width - rankBtn.width - 20, bottomBg.y + bottomBg.height/2 - rankBtn.height/2);
        this.addChild(rankBtn);
    }

    private refreshView():void{

    }

    private get cfg() : Config.AcCfg.KiteCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcKiteVo{
        return <AcKiteVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        view._scrollList = null;

        super.dispose();
    }
}