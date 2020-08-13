/**
 * 副本伤害排行
 * author yanyuling
 * date 2017/12/07
 * @class AllianceBossRankPopupView
 */
class AllianceBossRankPopupView extends PopupView
{
    // 滑动列表
    // private _nodeContainer:BaseDisplayObjectContainer;
    private _scrollList: ScrollList;
    private _topTipTF:BaseTextField;
    private _bossId:string;
    public constructor() 
    {
        super();
    }
    public initView():void
    {   
        this._bossId = this.param ? this.param.data : undefined;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSRANK),this.netCallBack,this);
         App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ALLIANCE_GETINFINITYRANK),this.netCallBack,this);
        if(this._bossId){
            NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSRANK,{bossId:this._bossId});
        }else{
            NetManager.request(NetRequestConst.REQUST_ALLIANCE_GETINFINITYRANK,{});
        }
        
        // this._nodeContainer = new BaseDisplayObjectContainer();
        // this._nodeContainer.height = 800;
        // this.addChildToContainer(this._nodeContainer);

        let startY = 20;
        this._topTipTF =  ComponentManager.getTextField("haha",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN)
        this._topTipTF.x = 30;
        this._topTipTF.y = startY;
        this._topTipTF.visible = false;
        this.addChildToContainer(this._topTipTF);

        startY += 30;
        let bg= BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        bg.height = 700;
        bg.x = this.viewBg.width/2 - bg.width/2;
        bg.y = startY;
        this.addChildToContainer(bg);
        

        let bg1= BaseBitmap.create("public_tc_bg03");
        bg1.width = bg.width - 20;
        bg1.height = bg.height - 130;
        bg1.x = bg.x + 10;
        bg1.y = bg.y + 10;
        this.addChildToContainer(bg1);
        bg1.name = "bg1";

        let bg2= BaseBitmap.create("rank_biao");
        bg2.width = bg1.width - 30;

        bg2.x = this.viewBg.width/2 - bg2.width/2;
        bg2.y = bg1.y + 14;
        this.addChildToContainer(bg2);
        bg2.name = "bg2";

        let bg3= BaseBitmap.create("public_tc_bg03");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this.addChildToContainer(bg3);
        bg3.name = "bg3";
    }

    protected initContentAfterNet(uidata:any)
    {
        let bg1 =  this.container.getChildByName("bg1");
        let bg2 =  this.container.getChildByName("bg2");
        let bg3 =  this.container.getChildByName("bg3");

        
        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title1"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+30;
        titleTxt1.y = bg2.y + 8;
        this.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title2"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.x = bg2.x+210;
        titleTxt2.y = titleTxt1.y;
        this.addChildToContainer(titleTxt2);

        // let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title3"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        // titleTxt3.x = bg2.x+ 340 - titleTxt3.width/2;
        // titleTxt3.y = titleTxt1.y;
        // this.addChildToContainer(titleTxt3);

        let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("allianceBossRank_title4"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt4.x = bg2.x+450 - titleTxt4.width/2;
        titleTxt4.y = titleTxt1.y;
        this.addChildToContainer(titleTxt4);

        let allianceBosskill = uidata.allianceBosskill;
        let bossName = "";
        if(this._bossId){
            let bossCfg = Config.AlliancebossCfg.getAllianceCfgByLv(this._bossId);
            bossName = LanguageManager.getlocal("allianceBoss_monsterName"+this._bossId);
            if (allianceBosskill.length > 0)
            {
                this._topTipTF.text = LanguageManager.getlocal("allianceBossRank_topTip",[allianceBosskill[1],bossName,String(bossCfg.addAsset),String(bossCfg.addExp)]);
            }else{
                this._topTipTF.text = LanguageManager.getlocal("allianceBossRank_topTip",["",bossName,String(bossCfg.addAsset),String(bossCfg.addExp)]);
            }
        }else{
            bossName = LanguageManager.getlocal("allianceBoss_infinity");
            this._topTipTF.text = LanguageManager.getlocal("allianceBoss_infinity_topTip");
        }
        
        this._topTipTF.x = this.viewBg.width/2 - this._topTipTF.width/2;
        this._topTipTF.visible = true;

        let dataList = [];
        if(this._bossId){
            dataList = uidata.allianceBossRank;
        }else{
             dataList = uidata.allianceInfinityRank;
        }
        
        let myName = Api.playerVoApi.getPlayerName();
        let myrData = [ LanguageManager.getlocal("atkracedes4"),"0","0" ]
        for (let key in dataList) {
            if(dataList[key][0] == myName)
            {
                myrData[0] = String(Number(key) +1);
                myrData[1] = dataList[key][1];
                myrData[2] = dataList[key][2];
                break;
            }
        }
        let nickTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        nickTxt.text = LanguageManager.getlocal("allianceBossRank_title5",[Api.playerVoApi.getPlayerName()]);
        nickTxt.x = bg3.x+20;
        nickTxt.y = bg3.y + 20;
        this.addChildToContainer(nickTxt);

        let myRankTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_BROWN)
        myRankTxt.text = LanguageManager.getlocal("allianceBossRank_title6",[myrData[0]]);
        myRankTxt.x = myRankTxt.x + 320;
        myRankTxt.y = nickTxt.y ;
        this.addChildToContainer(myRankTxt);

        let hurtvalueTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_BROWN)
        hurtvalueTxt.text = LanguageManager.getlocal("allianceBossRank_title7",[myrData[2]]);
        hurtvalueTxt.x = nickTxt.x
        hurtvalueTxt.y = nickTxt.y +40;
        this.addChildToContainer(hurtvalueTxt);

        let addvalueTxt = ComponentManager.getTextField("",nickTxt.size,TextFieldConst.COLOR_BROWN)
        addvalueTxt.text = LanguageManager.getlocal("allianceBossRank_title8",[myrData[1]]);
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = hurtvalueTxt.y ;
        this.addChildToContainer(addvalueTxt);

        let topTipTxt = "allianceBossRank_topTip";
        let rect = new egret.Rectangle(0,0,bg1.width,bg1.height -  60);
        
        let scrollView = ComponentManager.getScrollList(AllianceBossRankScrollItem,dataList,rect);
        scrollView.setEmptyTip(LanguageManager.getlocal("allianceBossRank_emptyTip"),TextFieldConst.COLOR_BROWN);
        scrollView.x = bg1.x;
        scrollView.y = bg1.y+50;
        this.addChildToContainer(scrollView);
    }


    protected netCallBack(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret == 0)
        {
            this.initContentAfterNet(rdata.data)
        }
    }
    protected getResourceList():string[]
    {
        return super.getResourceList().concat([
        ,"progress_type1_yellow","progress_type1_bg","alliance_effect",
        ]);
    }


    public dispose():void
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSRANK),this.netCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ALLIANCE_GETINFINITYRANK),this.netCallBack,this);

        // 未婚滑动列表
        this._scrollList = null;
        // this._nodeContainer = null;
        this._topTipTF = null;
        this._bossId = null;

        super.dispose();
    }
}