/**
 * 排行奖励
 * author sl
 * date 2020.7.29
 * @class AcWeaponPrisonPopupViewTab1
 */
class AcWeaponPrisonPopupViewTab1 extends CommonViewTab{
    public _scrollList:ScrollList = null;

    private _rewardBtn:BaseButton = null;
    private _getReward:BaseBitmap = null;

    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{

        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);

        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 575;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);

        let rankData = this.vo.rankData;

        let dataList = this.cfg.scoreRank;
        let rect = new egret.Rectangle(0, 0, 530, 560);
        let scrollList = ComponentManager.getScrollList(AcWeaponPrisonPopupScrollItem1, dataList, rect, {aid:this.aid, code:this.code, uicode:this.getTypeCode()});
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
        myRankTF.setPosition(bottomBg.x + 40, bottomBg.y + 20);
        this.addChild(myRankTF);
    
        //积分
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseGoldRankMyScore", "1"), [String(score)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(myRankTF.x +230, myRankTF.y);
        this.addChild(myScoreTF);

        //rank btn
        let rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acMouseGoldDetailRankBtn", "1"), ()=>{
            if (!this.vo.isStart){
                this.vo.showAcEndTip();
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEAPONPRISONRANKDETAILPOPUPVIEW, {aid: this.aid, code: this.code,uicode:this.getTypeCode()});
        }, this);
        rankBtn.setPosition(bottomBg.x + 40, myRankTF.y + myRankTF.height/2 + 20);
        this.addChild(rankBtn);

        let rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acFlowerMoonRankRewardBtn2", this.getTypeCode()), ()=>{
            if (!this.vo.isStart)
            {
                this.vo.showAcEndTip();
                return;
            }
            if(this.vo.checkIsInEndShowTime())
            {   
                NetManager.request(NetRequestConst.REQUEST_WEAPONPRISON_GETREWARD, { activeId: this.vo.aidAndCode}); 
            }else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acFlowerMoonRankRewardTip1-1"));
            }
        }, this);
        rewardBtn.setPosition(bottomBg.x+bottomBg.width-rewardBtn.width- 50, rankBtn.y);
        this.addChild(rewardBtn);
        this._rewardBtn = rewardBtn;   

        this._getReward = BaseBitmap.create("collectflag");
        this._getReward.x = rewardBtn.x+rewardBtn.width/2-this._getReward.width/2;
        this._getReward.y = rewardBtn.y+rewardBtn.height/2-this._getReward.height/2;
        this.addChild(this._getReward);

        this.refreshView();
        this.freshBtnFlag();

        
    }

    private refreshView():void
    {
        if(this.vo.checkIsInEndShowTime())
        {   
            if (this.vo.isHasRankReward() == false)
            {
                this._rewardBtn.setEnable(false);
            }
        }
    }

    private get cfg() : Config.AcCfg.WeaponPrisonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcWeaponPrisonVo{
        return <AcWeaponPrisonVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

    private requestCallback(event:egret.Event){
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }

        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);

        this.freshBtnFlag();
    }

    private freshBtnFlag():void
    {
        this._rewardBtn.visible = !this.vo.isGetRankReward();
        this._getReward.visible = this.vo.isGetRankReward();
    }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACFLOWERMOON_GETRANKREWARD, this.requestCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        view._scrollList = null;
        view._rewardBtn = null;
        view._getReward = null;

        super.dispose();
    }
}