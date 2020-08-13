/**
 * 排行榜
 * author ycg
 * date 2019.10.18
 * @class AcFirstSightLoveRankPopupView
 */
class AcFirstSightLoveRankPopupView extends PopupView{
    public _scrollList:ScrollList = null;
    public _pageId = 1;
    public constructor(){
        super();
    }

    public initView():void{
        /**需判断两种情况，报名列表，抽奖结果 */
        let rankBg = BaseBitmap.create("public_9_bg32");
        rankBg.width = 530;
        rankBg.height = 700;
        rankBg.x = 20+GameData.popupviewOffsetX;
        this.addChildToContainer(rankBg);

        App.LogUtil.log("aid: "+this.param.data.isResult);
        let resultStr = "acFirstSightLoveJoinListBmInfo-"+this.getTypeCode();
        if (this.param.data.isResult){
            resultStr = "acFirstSightLoveJoinListInfo-"+this.getTypeCode();
        }

        let resultInfo = ComponentManager.getTextField(LanguageManager.getlocal(resultStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        resultInfo.textAlign = TextFieldConst.ALIGH_CENTER;
        resultInfo.x = rankBg.x + rankBg.width/2 - resultInfo.width/2;
        resultInfo.y = 10;
        this.addChildToContainer(resultInfo);
        rankBg.y = resultInfo.y + resultInfo.height + 10;

        let rankTopBg = BaseBitmap.create("public_9_bg37");
        rankTopBg.width = rankBg.width;
        rankTopBg.height = 35;
        rankTopBg.setPosition(rankBg.x, rankBg.y);
        this.addChildToContainer(rankTopBg);
        //序号
        let numTitle = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveJoinListNum"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        numTitle.anchorOffsetX = numTitle.width/2;
        numTitle.setPosition(rankTopBg.x + 60, rankTopBg.y + rankTopBg.height/2 - numTitle.height/2);
        this.addChildToContainer(numTitle);

        //昵称
        let nameTitle = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveJoinListName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTitle.anchorOffsetX = nameTitle.width/2;
        nameTitle.setPosition(rankTopBg.x + rankTopBg.width/2 - 70, rankTopBg.y + rankTopBg.height/2 - nameTitle.height/2);
        this.addChildToContainer(nameTitle);

        //官品
        let levelTitle = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveJoinListLevel"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        levelTitle.anchorOffsetX = levelTitle.width/2;
        levelTitle.setPosition(rankTopBg.x + rankTopBg.width/2 + 80, rankTopBg.y + rankTopBg.height/2 - levelTitle.height/2);
        this.addChildToContainer(levelTitle);

        //区服
        let serverTitle = ComponentManager.getTextField(LanguageManager.getlocal("acFristSightLoveJoinListServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        serverTitle.anchorOffsetX = serverTitle.width/2;
        serverTitle.setPosition(rankTopBg.x + rankTopBg.width - 65, rankTopBg.y + rankTopBg.height/2 - serverTitle.height/2);
        this.addChildToContainer(serverTitle);

        let dataList = [];
        if (this.param.data && this.param.data.data){
            dataList = this.param.data.data;
        }
        let listIndex = (this._pageId - 1)*100;
        let rect = new egret.Rectangle(0, 0, rankBg.width, rankBg.height - rankTopBg.height - 6);
        let scrollList = ComponentManager.getScrollList(AcFirstSightLoveRankScrollItem, dataList, rect, {aid:this.aid, code:this.code, stIndex: listIndex});
        scrollList.setPosition(rankBg.x, rankBg.y + rankTopBg.height);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;

        if (!this.param.data.isResult){
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, this.getBmDataListCallback, this);
            this._scrollList.bindMoveCompleteCallback(this.refreshChatByScroll, this);
        }

        App.LogUtil.log("datalist: "+dataList.length);
        if (dataList && dataList.length > 0){

        }
        else{
            scrollList.setEmptyTip(LanguageManager.getlocal("acFirstSightLoveNoData"));
        }

    }

    private refreshChatByScroll():void
	{
		// let isBottom:boolean = this._scrollList.checkIsAtButtom();
		// if(isBottom)
		// {
        //     //调接口
        //     App.LogUtil.log("refreshChatByScroll: aaaaaa");
        //     this._pageId += 1;
        //     NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, { activeId: this.vo.aidAndCode, page: this._pageId});
            
        // }
        let pageId = this._pageId;
        if(this._scrollList.checkIsAtButtom()){
            this._pageId +=1;
        }
        else if(this._scrollList.scrollTop <= 0){
            this._pageId = Math.max(1, this._pageId - 1);
        }
        if(this._pageId != pageId){
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, { activeId: this.vo.aidAndCode, page: this._pageId});
        }		
    }
    
    private getBmDataListCallback(evt:egret.Event){
        let rData = evt.data.data.data;
        if (rData){
            let rankList = rData.list;
            if (rankList && rankList.length > 0){
                // this._rankData.concat(rankList);
                let listIndex = (this._pageId - 1)*100;
                this._scrollList.refreshData(rankList, {aid:this.aid, code:this.code, stIndex: listIndex});
                this._scrollList.scrollTop = 0;
            }
            else{
                this._pageId -= 1;
                if (this._pageId < 1){
                    this._pageId = 1;
                }
            }
        }
        else{
            this._pageId -= 1;
        }
    }

    public getTypeCode():string{
        return this.code;
    }

    public get code():string{
        return this.param.data.code;
    }

    public get aid():string{
        return this.param.data.aid;
    }

    public get vo(){
        return  <AcFirstSightLoveVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getTitleStr():string
	{
        let str = "acFirstSightLoveJoinListTitle-"+this.getTypeCode();
        if (!this.param.data.isResult){
            str = "acFirstSightLoveJoinListBmTitle-"+this.getTypeCode();
        }
        App.LogUtil.log("gettitle: "+str + "  "+this.param.data.isResult);
        return str;
    }

    protected getResourceList():string[]{
        return super.getResourceList().concat([
            "rank_line",
        ]);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BMLIST, this.getBmDataListCallback, this);
        this._scrollList = null;
        this._pageId = 1;
        super.dispose();
    }
}