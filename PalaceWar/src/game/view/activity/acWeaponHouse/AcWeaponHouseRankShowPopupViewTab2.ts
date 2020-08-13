/**
 * 军团排行
 * date 2020.6.15
 * @class AcWeaponHouseRankPopupViewTab1
 */
class AcWeaponHouseRankShowPopupViewTab2 extends CommonViewTab{
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
        let rankDatalist = baseView.getArankList();
        let rankData = baseView.getAmyrank();

        let bg2= BaseBitmap.create("public_9_bg33");
        bg2.width = rewardBg.width;
        bg2.height = 40;
        bg2.x = rewardBg.x;
        bg2.y = rewardBg.y;
        this.addChild(bg2);

		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankList_title", this.getTypeCode())),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+40;
        titleTxt1.y = bg2.y + 8;
        this.addChild(titleTxt1);

        let _titleTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankAllName_title", this.getTypeCode())),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        _titleTF.x = bg2.x+210;
        _titleTF.y = titleTxt1.y;
        this.addChild(_titleTF);

        let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankcoust_title", this.getTypeCode())),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt3.x = bg2.x+430 - titleTxt3.width/2+GameData.popupviewOffsetX;
        titleTxt3.y = titleTxt1.y;
        this.addChild(titleTxt3);

        let rect = new egret.Rectangle(0, 0, 530, 520);
        let scrollList = ComponentManager.getScrollList(AcWeaponHouseRankShowPopupItem2, rankDatalist, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(rewardBg.x, bg2.y + bg2.height + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        if(!rankDatalist[0])
        {
            //暂无排名
            let noRankList = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_noRank", this.getTypeCode()),),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            this.addChild(noRankList);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, noRankList, rewardBg);
        }

        // 底部bg 
        let bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 530;
        bottomBg.height = 112;
        bottomBg.setPosition(rewardBg.x + rewardBg.width/2 - bottomBg.width/2, rewardBg.y + rewardBg.height + 2);
        this.addChild(bottomBg);
        let nickName = Api.playerVoApi.getPlayerName();
        let score:string;
        let mask:string;
        if(rankData.value)
        {
            score = rankData.value;
            mask = rankData.myrank;
        }else{
            
            score = "0";
            mask = LanguageManager.getlocal('allianceRankNoRank');
        }
        if(Api.playerVoApi.getPlayerAllianceId()!=0)
        {
            nickName = Api.playerVoApi.getPlayerAllianceName();
        }else{
            nickName = LanguageManager.getlocal('allianceRankNoAlliance');
        }
        
        let myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_gang_title", this.getTypeCode()), [String(nickName)]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(bottomBg.x + 40, bottomBg.y + 30);
        this.addChild(myRankTF);
    
        //排名
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankShow_title", this.getTypeCode()), [String(mask)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(myRankTF.x, myRankTF.y + myRankTF.height + 15);
        this.addChild(myScoreTF);

        //分数
        let myScore = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rankingList_title", this.getTypeCode()), [String(score)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScore.setPosition(bottomBg.x + bottomBg.width - myScore.width - 20, myRankTF.y + myRankTF.height + 15);
        this.addChild(myScore);

        //介绍
        let destext = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_rank_Des", this.getTypeCode()), [50+""]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, destext, bottomBg,[3,-45]);
        this.addChild(destext);
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