/**
 * 政务
 * author yanyuling
 * date 2017/11/24
 * @class BookroomView
 */
class BookroomView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _nodeContainer2:BaseDisplayObjectContainer;
    private _monthDesk:BookroomInfoItem = null;
    private _yearDesk:BookroomInfoItem = null;
    private _plusLastDesk:BookroomInfoItem = null;
    private _refreshTh = null;
    private _topbtnX :number = 20;
    private _spDeskList:BookroomInfoItem[] = [];
    private _cmDeskList:BookroomInfoItem[] = [];
    public constructor() {
		super();
	}

    public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_BUY),this.buySeatHandlerCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshSeatNum,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshSeatNum,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY_BATCH),this.studyClickCallBack,this);

        Api.mainTaskVoApi.checkShowGuide();
        this._nodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

        this._nodeContainer2 = new  BaseDisplayObjectContainer();
		

        let bg = BaseLoadBitmap.create("bookroom_bg");
        bg.width = 640;
        bg.height = 1910;
        this._nodeContainer.addChild(bg);

        let posNum =  Api.bookroomVoApi.getSeatNum();
   
        let curPosNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        curPosNumTxt.x = 15;
        curPosNumTxt.y = 10;
        curPosNumTxt.name = "curPosNumTxt";
        this._nodeContainer2.addChild(curPosNumTxt);
        
        let addBtn = ComponentManager.getButton("mainui_btn1","",this.addBtnClickHandler,this);
		addBtn.x = 180;
		addBtn.y =curPosNumTxt.y - 10;
        addBtn.visible = false;
        addBtn.name = "addBtn";
        this._nodeContainer2.addChild(addBtn);

        if (posNum < 5)
        {
            let batchTipTxt = ComponentManager.getTextField(LanguageManager.getlocal('bookRoomServant_batchTip'),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            batchTipTxt.x = GameConfig.stageWidth - batchTipTxt.width - 30 ;
            batchTipTxt.textAlign = egret.HorizontalAlign.RIGHT;
            batchTipTxt.y = curPosNumTxt.y;
            batchTipTxt.name = "batchTipTxt";
            this._nodeContainer2.addChild(batchTipTxt);
        }
        

        let totalNum = posNum;        
        let index = 0;
        for (index = 0; index < posNum; index++) {
            this.makeSeatItem(index,index,0);
        }
        // //月卡
        if(Api.shopVoApi.ifBuyMonthCard()){
            totalNum ++;
        }
        if(Api.shopVoApi.ifBuyYearCard()){
            totalNum ++;
        }
        if(Api.shopVoApi.ifBuySpCard()){
            totalNum += 2;
        }
        for (index ; index < totalNum; index++) {
            this.makeSeatItem(index,index,1);
        }  

        //已经取消的座位
        let otherInfo = Api.bookroomVoApi.getOtherUsedSeatInfo(index);

        // this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        let idx = index;
        for(let key in otherInfo){
            if(otherInfo[key].servantid){
                this.makeSeatItem(idx,Number(key)-1,1);
                idx ++;
            }

        }
        
        let scrollH = GameConfig.stageHeigth - this.container.y+10;
        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,scrollH);
        let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
        scrollView.y = -15;
        scrollView.bounces = false;
        this.addChildToContainer(scrollView);
        let mask = BaseLoadBitmap.create("servant_mask");
        mask.width = GameConfig.stageWidth;
        mask.scaleY = -1;
        mask.y = 120;
        this.addChildToContainer(mask);
        this.addChildToContainer(this._nodeContainer2);

        if(Api.switchVoApi.checkOpenBookRoomStrenthen()){
            this.makeStrengthenBtn();
        }
        if(Api.switchVoApi.checkOpenAutoStudy())
        {
            this.makeStudyBtn();
        }

        this.makeBatchBtn(posNum);
    }
  /**
     * 一键太学
     */
    private makeStudyBtn()
    {
        let needVip = Config.VipCfg.getbookRoomServant();
        let vipLevel = Api.playerVoApi.getPlayerVipLevel();
       
        let forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        forpeople_bottom.y = 70;
        this._nodeContainer2.addChild(forpeople_bottom);
        forpeople_bottom.name = "study_batch";
        forpeople_bottom.x = this._topbtnX;
        this._topbtnX += 110;



        this._nodeContainer2.addChild(forpeople_bottom);

        let bookroom_study = ComponentManager.getButton("bookroomview_study","",this.studyClick,this);
        bookroom_study.x = forpeople_bottom.x + forpeople_bottom.width/2 - bookroom_study.width/2;
        bookroom_study.y = forpeople_bottom.y + forpeople_bottom.height/2 - bookroom_study.height/2;
        this._nodeContainer2.addChild(bookroom_study);
        bookroom_study.name = "bookroomview_study";

        let studyFlag =  BaseBitmap.create("bookroomview_study_text");
        studyFlag.x =  forpeople_bottom.x + forpeople_bottom.width/2 - studyFlag.width/2;
        studyFlag.y = forpeople_bottom.y + forpeople_bottom.height - studyFlag.height-10;
        this._nodeContainer2.addChild(studyFlag);
         studyFlag.name = "bookroomview_study_text";
        if(vipLevel >= needVip)
        {
            bookroom_study.setGray(false);
        }
        else
        {
            bookroom_study.setGray(true);
        }
    }

    private studyClickCallBack(event:egret.Event)
	{
		let ret = event.data.data.ret;
		if(ret == 0){
            this.refreshSeatNum();
        }else{
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomViewStudyTip1"));
        }
     }

      /**
     * 学习的监听事件
     */
    private studyClick()
    {
        let needVip = Config.VipCfg.getbookRoomServant();
        let vipLevel = Api.playerVoApi.getPlayerVipLevel();
        if(vipLevel < needVip)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_studyTip",[""+needVip]));
            return;
        }
        if(!Api.bookroomVoApi.isBatchStudyEnable())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomViewStudyTip1"));
            return;
        }
         NetManager.request(NetRequestConst.REQUEST_BOOKROOM_STUDY_BATCH,{});
        
    }
    private refreshCardSearPosAfterFinish()
    {
        // if(1==1){
        //     return;
        // }
        let tmpType = 0;
        let curSpDeskList:BookroomInfoItem[] = []; 
        let curCmDeskList:BookroomInfoItem[] = []; 
        let posList = [];

        let spNum = 0;
        if(Api.shopVoApi.ifBuyMonthCard()){
            spNum ++;
        }
        if(Api.shopVoApi.ifBuyYearCard()){
            spNum ++;
        }
        if(Api.shopVoApi.ifBuySpCard()){
            spNum += 2;
        }

        // let lastIndex = 0;

        if(this._spDeskList && this._spDeskList.length > 0 ){
            for(let i = 0; i < this._spDeskList.length; i ++){
                
                

                let curDesk = this._spDeskList[i];
                posList.push({x:curDesk.x, y:curDesk.y});
                if(i < spNum || !curDesk.isEmpty){
                    curSpDeskList.push(curDesk);
                } else {
                    this._nodeContainer.removeChild(curDesk);
                }
            }
        }

        this._spDeskList = curSpDeskList;
        for(let j = 0; j < this._spDeskList.length; j++){
            this._spDeskList[j].x = posList[j].x;
            this._spDeskList[j].y = posList[j].y;
            // this._spDeskList[j].setIndex(this._cmDeskList.length +1+j);
        }
    }
    private refreshCardSeatPos()
    {
        let tmpType = 0;
        let curSpDeskList:BookroomInfoItem[] = []; 
        let curCmDeskList:BookroomInfoItem[] = []; 
        let posList = [];
        let tmpDesk:BookroomInfoItem = null;
        let tmpX = 0;
        let tmpY = 0;
        
        if(this._plusLastDesk ){
            this._cmDeskList.pop();
        }
        if(this._plusLastDesk && this._spDeskList && this._spDeskList.length > 0 ){
            for(let i = this._spDeskList.length - 1; i >= 0; i --){
                let curDesk = this._spDeskList[i];
                posList.push({x:this._plusLastDesk.x,y:this._plusLastDesk.y});
                ////
           
                if(curDesk.getPosId() > curDesk.getIndex()){
                    tmpX = curDesk.x;//this._plusLastDesk.x;
                    tmpY = curDesk.y;//this._plusLastDesk.y;

                    curDesk.x = this._plusLastDesk.x;
                    curDesk.y = this._plusLastDesk.y;

                    this._plusLastDesk.x = tmpX;
                    this._plusLastDesk.y = tmpY;

                    curDesk.setIndex(curDesk.getIndex() + 1);

                    if(curDesk.getCardType()>0){
                        curSpDeskList.push(curDesk);
                    } else {
                        curCmDeskList.push(curDesk);
                    }

                } else {
                    tmpType = this._plusLastDesk.getCardType();
                    this._plusLastDesk.setCardType(curDesk.getCardType());
                    curDesk.setCardType(tmpType);

                    console.log("1p-tmpPos",this._plusLastDesk.getPosId());
                    console.log("1c-tmpPos",curDesk.getPosId());
                    console.log("1p-tmpIndex",this._plusLastDesk.getIndex());
                    console.log("1c-tmpIndex",curDesk.getIndex());
                    // let tmpIndex = this._plusLastDesk.getIndex();
                    // this._plusLastDesk.setIndex(curDesk.getIndex());
                    // curDesk.setIndex(tmpIndex);

                    // let tmpPos = this._plusLastDesk.getPosId();
                    // this._plusLastDesk.setPosId(curDesk.getPosId());
                    // curDesk.setPosId(tmpPos);
                    console.log("2p-tmpPos",this._plusLastDesk.getPosId());
                    console.log("2c-tmpPos",curDesk.getPosId());
                    console.log("2p-tmpIndex",this._plusLastDesk.getIndex());
                    console.log("2c-tmpIndex",curDesk.getIndex());
                    if(this._plusLastDesk.getCardType()>0){
                        curSpDeskList.push(this._plusLastDesk);
                    } else {
                        curCmDeskList.push(this._plusLastDesk);
                    }

                    this._plusLastDesk = curDesk;


                }
                // if(this._plusLastDesk.getCardType()>0){
                //     curSpDeskList.push(curDesk);
                // } else {
                //     curCmDeskList.push(curDesk);
                // }



        // //已经取消的座位

               
            }
            this._spDeskList = curSpDeskList;
            // this._spDeskList = this._spDeskList.concat(curSpDeskList);
            this._cmDeskList = this._cmDeskList.concat(curCmDeskList);
            if(curSpDeskList.length > 0){
                let tmpList = [];
                for(let k = curSpDeskList.length - 1 ; k >= 0 ; k --){
                    tmpList.push(curSpDeskList[k]);
                }
                this._spDeskList = tmpList;
            }
            
            let len = posList.length;
            for(let j = 0; j < this._spDeskList.length; j ++){
                this._spDeskList[j].x = posList[len - j - 1].x;
                this._spDeskList[j].y = posList[len - j - 1].y;
            }
        }
        this._plusLastDesk = null;


    }
    protected makeSeatItem(index:number,posId:number,cardType:number =0,isPlus?:boolean):void
    {
        let bookRoomInfoItem = new BookroomInfoItem();
        bookRoomInfoItem.init(index+1,posId+1,cardType);
        let posX = 20;
        if((index%2) == 1)
        {
           posX = GameConfig.stageWidth -284 - posX ;
        }
        let posY = 500 + Math.floor(index/2)* 200;
        bookRoomInfoItem.x = posX;
        bookRoomInfoItem.y = posY;

        if(isPlus){
            this._plusLastDesk = bookRoomInfoItem;
        }


        if(cardType > 0){
            if(this._spDeskList){
               
                this._spDeskList.push(bookRoomInfoItem);
                this._nodeContainer.addChild(bookRoomInfoItem);
            }
        }
        if(cardType == 0)
        {
            this._cmDeskList.push(bookRoomInfoItem);
            this._nodeContainer.addChild(bookRoomInfoItem);
            
        }

    }


    protected makeStrengthenBtn()
    {
        let strenthen_bottom = BaseBitmap.create("forpeople_bottom");
        strenthen_bottom.y = 70;
        strenthen_bottom.x = this._topbtnX ;
        this._topbtnX += 110;
        // if(this._nodeContainer2.getChildByName("bookroom_batch")){
        //     strenthen_bottom.x = this._topbtnX ;
        // }else{
        //     strenthen_bottom.x = 10;
        // }
        strenthen_bottom.name = "strenthen_bottom";
        this._nodeContainer2.addChild(strenthen_bottom);

        let bookroom_strenthen = ComponentManager.getButton("bookroom_strenthenIcon","",this.strenthenHandler,this);
        bookroom_strenthen.x = strenthen_bottom.x + strenthen_bottom.width/2 - bookroom_strenthen.width/2;
        bookroom_strenthen.y = strenthen_bottom.y + strenthen_bottom.height/2 - bookroom_strenthen.height/2;
        bookroom_strenthen.name = "bookroom_strenthen";
        this._nodeContainer2.addChild(bookroom_strenthen);

        let strenthenFlag =  BaseBitmap.create("bookroom_strenthen_word");
        strenthenFlag.x =  strenthen_bottom.x + strenthen_bottom.width/2 - strenthenFlag.width/2;
        strenthenFlag.y = strenthen_bottom.y + strenthen_bottom.height - strenthenFlag.height-10;
        strenthenFlag.name = "strenthenFlag";
        this._nodeContainer2.addChild(strenthenFlag);
    }

    protected strenthenHandler()
    {
        if( PlatformManager.checkIsWxCfg() && Api.playerVoApi.getPlayerVipLevel() < 4){
            App.CommonUtil.showTip(LanguageManager.getlocal("bookroom_strenthen_vip4Tip"));
            return;
        }
        let bookroomCfg =  GameConfig.config.bookroomCfg;
        let count = bookroomCfg.count;
        let bRoomInfoVos = Api.bookroomVoApi.getSeatInfos();
        let isStrenEnable = false;
        for (var key in bRoomInfoVos) {
            var svo = bRoomInfoVos[key];
            let level = svo.level;
            if(level < count && svo.et > GameData.serverTime ){
                ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMSTRENTHENPOPUPVIEW,{});
                return;
            }
        }
       App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_strenghen_noSeat"));
        
    }

    protected makeBatchBtn(posNum)
    {
        let bookroomCfg = GameConfig.config.bookroomCfg;
        if (posNum >= 5 && !this._nodeContainer2.getChildByName("bookroom_batch") )
        {
            let forpeople_bottom = BaseBitmap.create("forpeople_bottom");
            forpeople_bottom.x = 10 ;//GameConfig.stageWidth - forpeople_bottom.width - 20;
            forpeople_bottom.y = 70;
            // forpeople_bottom.x = 15;
            // forpeople_bottom.y = 45;
            this._nodeContainer2.addChild(forpeople_bottom);
            // forpeople_bottom.addTouchTap(this.batchHandler,this);
            
            let bookroom_batch = ComponentManager.getButton("bookroom_visitIcon","",this.batchHandler,this);
            // bookroom_batch.anchorOffsetX = bookroom_batch.width/2;
            // bookroom_batch.anchorOffsetY = bookroom_batch.height/2;
            let batchFlag =  BaseBitmap.create("bookroom_batch");
            batchFlag.x =  forpeople_bottom.x + forpeople_bottom.width/2 - batchFlag.width/2;
            batchFlag.y = forpeople_bottom.y + forpeople_bottom.height - batchFlag.height-10;
            
            bookroom_batch.x = forpeople_bottom.x + forpeople_bottom.width/2 - bookroom_batch.width/2;
            bookroom_batch.y = forpeople_bottom.y + forpeople_bottom.height/2 - bookroom_batch.height/2;
            bookroom_batch.name = "bookroom_batch";
            this._nodeContainer2.addChild(bookroom_batch);
            this._nodeContainer2.addChild(batchFlag);

            // this._topbtnX += 110;

            if(this._nodeContainer2.getChildByName("strenthen_bottom"))
            {
                this._nodeContainer2.getChildByName("strenthen_bottom").x += 110;
                this._nodeContainer2.getChildByName("strenthenFlag").x += 110;
                this._nodeContainer2.getChildByName("bookroom_strenthen").x += 110;
                // this._topbtnX += 110;
            }

            if(this._nodeContainer2.getChildByName("bookroomview_study"))
            {
                this._nodeContainer2.getChildByName("bookroomview_study").x += 110;
                this._nodeContainer2.getChildByName("bookroomview_study_text").x += 110;
                this._nodeContainer2.getChildByName("study_batch").x += 110;
                // this._topbtnX += 110;
            }
        }
        let batchTipTxt = this._nodeContainer2.getChildByName("batchTipTxt");
        if (posNum >= 5 && batchTipTxt )
        {
            batchTipTxt.visible = false;
        }

        this.refreshSeatNum();
        if (posNum == bookroomCfg.maxPos)
        {
            this._nodeContainer2.getChildByName("addBtn").visible = false;
        }else
        {
            this._nodeContainer2.getChildByName("addBtn").visible = true;
        }
        
    }
    protected batchHandler()
    {
       let keys =  Api.bookroomVoApi.getPosListInStudy();
       if (keys.length > 0 )
       {
           if(Api.bookroomVoApi.isBatchenable() == false)
           {
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchNotEnable"));
                return;
           }
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH,{isbatch:1,pos:0});
       }else{
           App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchEmptyTip"));
       }

    }
    protected refreshSeatNum(event?:egret.Event)
    {
        if(event)
        {
            let rdata = event.data.data.data;
            let luckys = rdata.luckys;
            // luckys = [1,2,3];
            if( luckys)
            {
                let luckLen = luckys.length
                if(luckLen > 0)
                {
                    let num =0;
                    let ths =this;
                    let timerNum:number =egret.setInterval(()=> 
                    {
                        num+=1;
                        this.playLucky();
                        if(num >= luckLen)
                        {
                            egret.clearInterval(timerNum);
                        }
                            
                    } ,ths, 1500,1);
                }
            }
            let th =this;
            this._refreshTh = egret.setTimeout(()=> 
            {
                egret.clearTimeout(this._refreshTh);
                this._refreshTh = null;
                this.refreshNum();
            } ,th, 100);
            // egret.setInterval(this.refreshNum,this,1000);
        } else {
            this.refreshNum();
            
        }
        
        
        // this.refreshNum();

    }
    private refreshNum()
    {
       
        let posNum = Api.bookroomVoApi.getSeatNum();


        this.refreshCardSearPosAfterFinish();
        
        if(Api.shopVoApi.ifBuyMonthCard()){
            posNum ++;   
          
        }
        if(Api.shopVoApi.ifBuyYearCard()){
            posNum ++;    
           
        }
        if(Api.shopVoApi.ifBuySpCard()){
            posNum += 2; 
            
        }




        let curPosNumTxt = <BaseTextField>this._nodeContainer2.getChildByName("curPosNumTxt");
        let posStr =  Api.bookroomVoApi.getPosListInStudy().length  + "/" +posNum;
        curPosNumTxt.text = LanguageManager.getlocal("bookRoom_posNUm",[posStr]);



    }
    protected buySeatHandlerCallback(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret == 0)
        {
            let posNum = Api.bookroomVoApi.getSeatNum();
            let realPosNum = posNum;
            if(this._spDeskList && this._spDeskList.length){
                realPosNum += this._spDeskList.length;
            }
            this.makeSeatItem(realPosNum -1,realPosNum -1,0,true);
            this.refreshCardSeatPos();
            this.makeBatchBtn(posNum);
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_buySeatTip1"));
        }else
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_buySeatTip2"));
        }
       
        /**
         * 扩充席位后，需要调整展示
         */
    }
    protected buySeatHandler()
    {
         NetManager.request(NetRequestConst.REQUEST_BOOKROOM_BUY,{});
    }
    protected addBtnClickHandler()
    {
        let bookroomCfg = GameConfig.config.bookroomCfg;
        let needNum = bookroomCfg.needGem[Api.bookroomVoApi.getSeatNum()-1];

		let message = LanguageManager.getlocal("bookRoomServant_buySeat",[String(needNum)]);
		let mesObj = {
			 confirmCallback: this.buySeatHandler, 
			 handler: this, 
			 icon:  "itemicon1",
			 iconBg: "itembg_1", 
			 num: Api.playerVoApi.getPlayerGem(), 
             useNum:needNum,
             msg: message ,
             id : 1,
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
    }

    private playLucky():void
	{
		let boomPic:BaseBitmap = BaseBitmap.create("manage_boomtext");
		boomPic.anchorOffsetX=boomPic.width/2;
		boomPic.anchorOffsetY=boomPic.height/2;
		let picX = 500;
		let picY = 250;
		boomPic.setPosition(picX,picY);
		LayerManager.msgLayer.addChild(boomPic);
		egret.Tween.get(boomPic).to({scaleX:1.1,scaleY:1.1},50).to({scaleX:1,scaleY:1},70).to({y:picY-50,alpha:0.7},600).call(function(boomPic:BaseTextField){
			boomPic.dispose();
		}.bind(this,boomPic),this);
		App.CommonUtil.showGodbless("bookRoom");
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "forpeople_bottom",
            "bookroom_strenthen_exp",
            "bookroom_strenthen_word",
            "bookroom_strenthenBtn",
            "bookroom_strenthenIcon",
            "bookroom_stren1","bookroom_stren2","bookroom_stren3","recharge2_fnt",
            // "bookroomview_study_text","bookroomview_study",
		]);
	}
    public dispose():void
	{
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_BUY),this.buySeatHandlerCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshSeatNum,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshSeatNum,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY_BATCH),this.studyClickCallBack,this);

        this._nodeContainer = null;
        this._nodeContainer2 = null;
        this._monthDesk = null;
        this._yearDesk = null;
        this._plusLastDesk = null;
        this._spDeskList = [];
        this._cmDeskList = [];
        if(this._refreshTh){
            egret.clearTimeout(this._refreshTh);
        }
        this._refreshTh = null;
        this._topbtnX = 20;
        super.dispose();
    }
}