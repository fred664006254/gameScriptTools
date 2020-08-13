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
    private _data:any = null;
    private bigType:number =0;
    private baseArr:Array<any> =[];
    private monthArr:Array<any> =[];
    private yearArr:Array<any> =[];
    private bigArr:Array<any> =[];
    private bg:BaseBitmap = null;
    private floorArr:Array<BaseBitmap>  = [];
    private _mainTaskHandKey:string = null;
    

    public constructor() {
		super();
	}

    protected get uiType():string
	{
		return "2";
	}

    protected getContainerY():number
	{
		return 10;
	}

    public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_BUY),this.buySeatHandlerCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshSeatNum,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshSeatNum,this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REST_BOOKROOM,this.restList,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY, this.onekeyCallback, this);

        Api.mainTaskVoApi.checkShowGuide();

        this._nodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

        this._nodeContainer2 = new  BaseDisplayObjectContainer();
		

        let bg = BaseBitmap.create("bookroom_bg");
        this._nodeContainer.addChild(bg);
        this.bg = bg;

        let posNum =  Api.bookroomVoApi.getSeatNum();

        this.baseArr = this.getBaseArray(); 

        let curPosNumTxt = ComponentManager.getTextField("",20);
        curPosNumTxt.x = 30;
        curPosNumTxt.y = 10;
        curPosNumTxt.name = "curPosNumTxt";
        this._nodeContainer2.addChild(curPosNumTxt);
        
        let addBtn = ComponentManager.getButton("mainui_btn1","",this.addBtnClickHandler,this);
		addBtn.x = 180;
		addBtn.y =curPosNumTxt.y - 7;
        addBtn.visible = false;
        addBtn.name = "addBtn";
        this._nodeContainer2.addChild(addBtn);
      
        // if(Api.switchVoApi.checkOpenAutoStudy())
        // {
        //     this.makeStudyBtn();
        // } 
        if (!Api.rookieVoApi.isGuiding && (!Api.rookieVoApi.isInGuiding)){
            egret.callLater(()=>{
                this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
                    this.parent,
                    addBtn.x,
                    addBtn.y + 100,
                    [addBtn],
                    501,
                    true,
                    function(){
                        let posNum = 0;
                        if(Api.switchVoApi.checkOpenSeat()){ 
                            posNum = Api.bookroomVoApi.getMaxleng(); 
                        }
                        else{
                            posNum =  Api.bookroomVoApi.getSeatNum();
                        }
                        return posNum < GameConfig.config.bookroomCfg.maxPos;
                    },
                    this
                )
            }, this); 
        }
         
        this.upData(); 
        this.showFloor(this._data.maxNum);

        this.bigArr = this.getbigArr(); 
        // this.makeBatchBtn(this.bigArr.length); 
        for (var index = 0; index < this.bigArr.length; index++) 
        {   
            var currObj =this.bigArr[index];
            var num = Number(currObj.posId);   
            this.makeSeatItem(num,currObj,index);
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

        //一键太学 一键完成合并
        this.showAutoMake();

        if (!Api.rookieVoApi.isInGuiding && (!Api.rookieVoApi.isGuiding)){
            let indexData = this.getFirstEmptySeat();
            let taskId = Api.mainTaskVoApi.getCurMainTaskId();
            let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
            if (taskCfg && taskCfg.questType == 502 && indexData.index > -1){
                let top = Math.min(Math.max(0, 200 * (indexData.index - 2)), this._nodeContainer.height - scrollView.height);
                scrollView.setScrollTop(top);
            }
        }
    }

    /**
     * 一键太学 一键完成合并
     */
    private showAutoMake():void{
        let forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        forpeople_bottom.x = GameConfig.stageWidth - forpeople_bottom.width - 20;
        forpeople_bottom.y = 5; 
        this._nodeContainer2.addChild(forpeople_bottom); 

        let autoBtn = ComponentManager.getButton("bookroom_visitIcon","",this.autoMakeBtnHandler,this);
        autoBtn.x = forpeople_bottom.x + forpeople_bottom.width/2 - autoBtn.width/2;
        autoBtn.y = forpeople_bottom.y + forpeople_bottom.height/2 - autoBtn.height/2;
        autoBtn.name = "autoRoomBtn";
        this._nodeContainer2.addChild(autoBtn);

        let batchFlag =  BaseBitmap.create("bookroom_batch");
        batchFlag.x =  forpeople_bottom.x + forpeople_bottom.width/2 - batchFlag.width/2;
        batchFlag.y = forpeople_bottom.y + forpeople_bottom.height - batchFlag.height;
        this._nodeContainer2.addChild(batchFlag);
        batchFlag.name = "autoBatchFlag";

        let studyFlag =  BaseBitmap.create("bookroomview_study_text");
        studyFlag.x =  forpeople_bottom.x + forpeople_bottom.width/2 - studyFlag.width/2;
        studyFlag.y = forpeople_bottom.y + forpeople_bottom.height - studyFlag.height;
        this._nodeContainer2.addChild(studyFlag);
        studyFlag.name = "studyFlag"; 
        this.refreshSeatNum();
        this.freshAutoMake();
    }

    private freshAutoMake():void{
        let autoBtn = <BaseButton>this._nodeContainer2.getChildByName("autoRoomBtn");
        let batchFlag = <BaseBitmap>this._nodeContainer2.getChildByName("autoBatchFlag");
        let studyFlag = <BaseBitmap>this._nodeContainer2.getChildByName("studyFlag");

        let bookroomCfg = GameConfig.config.bookroomCfg;
        let vipLevel = Api.playerVoApi.getPlayerVipLevel();
        let maxPosNum =  Api.bookroomVoApi.getMaxleng();
        let studyNum = Api.bookroomVoApi.getInStudyServantNum();
        this.baseArr = this.getBaseArray();
        // App.LogUtil.log("freshAutoMake "+ Api.bookroomVoApi.isBatchenable() + " maxPosNum "+maxPosNum + " studyNum "+studyNum);
        if (Api.bookroomVoApi.isBatchenable()){
            batchFlag.visible = true;
            studyFlag.visible = false;
            //一键完成
            if (vipLevel < bookroomCfg.needVip){
                if (maxPosNum < 5){
                    autoBtn.setGray(true);
                }
                else{
                    autoBtn.setGray(false);
                }
            }
            else{
                autoBtn.setGray(false);
            }
        }
        else{
            if (vipLevel < bookroomCfg.needVip){
                //座位数已满
                if (maxPosNum <= studyNum){
                    autoBtn.setGray(true);
                    batchFlag.visible = true;
                    studyFlag.visible = false;
                }
                else{
                    autoBtn.setGray(true);
                    batchFlag.visible = false;
                    studyFlag.visible = true;
                }
            }
            else{
                if (maxPosNum > studyNum){
                    //一键学习
                    batchFlag.visible = false;
                    studyFlag.visible = true;
                    autoBtn.setGray(false);
                }
                else{
                    //一键完成
                    batchFlag.visible = true;
                    studyFlag.visible = false;
                    autoBtn.setGray(true);
                }
            }
        }
        if (this.baseArr.length== bookroomCfg.maxPos)
        {
            this._nodeContainer2.getChildByName("addBtn").visible = false;
        }
        else
        {
            this._nodeContainer2.getChildByName("addBtn").visible = true;
        }
    }

    public tick():void{
        this.freshAutoMake();
    }

    /**
     * 一键太学、完成 按钮事件
     */
    private autoMakeBtnHandler():void{
        let bookroomCfg = GameConfig.config.bookroomCfg;
        let vipLevel = Api.playerVoApi.getPlayerVipLevel();
        let maxPosNum =  Api.bookroomVoApi.getMaxleng();
        let studyNum = Api.bookroomVoApi.getInStudyServantNum();

        if (Api.bookroomVoApi.isBatchenable()){
            //一键完成
            if (vipLevel < bookroomCfg.needVip){
                if (maxPosNum < 5){
                    App.CommonUtil.showTip(LanguageManager.getlocal('bookRoomServant_batchTip'));
                    return;
                }
                else{
                    //调用一键完成接口
                    NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH,{isbatch:1, pos:0});
                }
            }
            else{
                //调用一键完成接口
                NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH,{isbatch:1, pos:0});
            }
        }
        else{
            if (vipLevel < bookroomCfg.needVip){
                //座位数已满
                if (maxPosNum <= studyNum){
                    if (maxPosNum < 5){
                        App.CommonUtil.showTip(LanguageManager.getlocal('bookRoomServant_batchTip'));
                    }
                    else{
                        App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchNotEnable"));
                    }
                }
                else{
                    App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_studyTip",[bookroomCfg.needVip]));
                }
            }
            else{
                if (maxPosNum > studyNum){
                    //调用一键学习接口
                    let data = this.getbigArr();
                    let canUseData = Api.bookroomVoApi.getCanUseSeat(data);
                    ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMAUTOSELECTSERVANTPOPUPVIEW, {data: data, seatNum: canUseData.length});
                }
                else{
                    //一键完成
                    App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_batchNotEnable"));
                }
            } 
        }
    }

    /**
     * 一键太学
     */
    private makeStudyBtn()
    {
        let bookroomCfg = GameConfig.config.bookroomCfg;
        let vipLevel = Api.playerVoApi.getPlayerVipLevel();
       
        let forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        forpeople_bottom.x = GameConfig.stageWidth - (forpeople_bottom.width + 20) * 2;
        forpeople_bottom.y = 5;
        this._nodeContainer2.addChild(forpeople_bottom);

        let bookroom_study = ComponentManager.getButton("bookroomview_study","",this.studyClick,this);
        bookroom_study.x = forpeople_bottom.x + forpeople_bottom.width/2 - bookroom_study.width/2;
        bookroom_study.y = forpeople_bottom.y + forpeople_bottom.height/2 - bookroom_study.height/2;
        this._nodeContainer2.addChild(bookroom_study);

        let studyFlag =  BaseBitmap.create("bookroomview_study_text");
        studyFlag.x =  forpeople_bottom.x + forpeople_bottom.width/2 - studyFlag.width/2;
        studyFlag.y = forpeople_bottom.y + forpeople_bottom.height - studyFlag.height;
        this._nodeContainer2.addChild(studyFlag);
        if(vipLevel >= bookroomCfg.needVip)
        {
            bookroom_study.setGray(false);
        }
        else
        {
            bookroom_study.setGray(true);
        }
    }
    /**
     * 学习的监听事件
     */
    private studyClick()
    {
        let bookroomCfg = GameConfig.config.bookroomCfg;
        let vipLevel = Api.playerVoApi.getPlayerVipLevel();
        if(vipLevel < bookroomCfg.needVip)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_studyTip",[bookroomCfg.needVip]));
            return;
        }
        if(Api.bookroomVoApi.isServantStudy())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomViewStudyTip2"));
        }
        else
        {
             NetManager.request(NetRequestConst.REQUEST_BOOKROOM_STUDY,{"onekey":1});
        }
    }
    
    private itemArr:Array<any> =[];
    protected makeSeatItem(index:number,data:any=null,_length:number)
    { 
        let bookRoomInfoItem = new BookroomInfoItem();   
        bookRoomInfoItem.init(index,data); 
        let posX = 20;
        if((_length%2) == 1)
        {
        //如果是比较长的语言  bookRoomInfoItem中的容器会被文本撑开  所以默认固定间隔是桌子的宽度 284 
        //    posX = GameConfig.stageWidth -bookRoomInfoItem.width - posX ;
            posX = GameConfig.stageWidth - 304;
        }
        let posY = 500 + Math.floor(_length/2)* 200;
        bookRoomInfoItem.x = posX;
        bookRoomInfoItem.y = posY;
        this._nodeContainer.addChild(bookRoomInfoItem);
        this.itemArr.push(bookRoomInfoItem); 
    }
    protected makeBatchBtn(posNum)
    {
        let posNum2 =  Api.bookroomVoApi.getMaxleng();
        let bookroomCfg = GameConfig.config.bookroomCfg;
        this.baseArr = this.getBaseArray(); 
        // posNum >= 5 && 
        let bookroom_batch:BaseButton = null;
        if (!this._nodeContainer2.getChildByName("bookroom_batch") )
        {
            let forpeople_bottom = BaseBitmap.create("forpeople_bottom");
            forpeople_bottom.x = GameConfig.stageWidth - forpeople_bottom.width - 20;
            forpeople_bottom.y = 5; 
            this._nodeContainer2.addChild(forpeople_bottom); 

            bookroom_batch = ComponentManager.getButton("bookroom_visitIcon","",this.batchHandler,this);
            let batchFlag =  BaseBitmap.create("bookroom_batch");
            batchFlag.x =  forpeople_bottom.x + forpeople_bottom.width/2 - batchFlag.width/2;
            batchFlag.y = forpeople_bottom.y + forpeople_bottom.height - batchFlag.height;
            
            bookroom_batch.x = forpeople_bottom.x + forpeople_bottom.width/2 - bookroom_batch.width/2;
            bookroom_batch.y = forpeople_bottom.y + forpeople_bottom.height/2 - bookroom_batch.height/2;
            bookroom_batch.name = "bookroom_batch";
            this._nodeContainer2.addChild(bookroom_batch);
            this._nodeContainer2.addChild(batchFlag);
        }
        else
        {
            bookroom_batch = <BaseButton>this._nodeContainer2.getChildByName("bookroom_batch");
        }
        // let batchTipTxt = this._nodeContainer2.getChildByName("batchTipTxt");&& batchTipTxt
        if (posNum2 >= 5)
        {
            // batchTipTxt.visible = false;
            bookroom_batch.setGray(false);
        }
        else
        {
            bookroom_batch.setGray(true);
        }

        this.refreshSeatNum();
        if (this.baseArr.length== bookroomCfg.maxPos)
        {
            this._nodeContainer2.getChildByName("addBtn").visible = false;
        }
        else
        {
            this._nodeContainer2.getChildByName("addBtn").visible = true;
        }
        
    }
    protected batchHandler()
    {
        let posNum =  Api.bookroomVoApi.getMaxleng();
        if(posNum < 5)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('bookRoomServant_batchTip'));
            return;
        }
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
        if(event && event.data && event.data.ret)
        {
            let rdata = event.data.data.data;
            let luckys = rdata.luckys;
            let bookroomstat = rdata.bookroomstat;
            if(bookroomstat)
            {
                if(bookroomstat == 3)
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomViewStudyTip1"));
                }
                else if(bookroomstat == 2)
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomViewStudyTip2"));
                }
            }
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
        }
        var posNum =0;
        if(Api.switchVoApi.checkOpenSeat())
        { 
             posNum = Api.bookroomVoApi.getMaxleng(); 
        }
        else
        {
             posNum =  Api.bookroomVoApi.getSeatNum();
        }
       
        let curPosNumTxt = <BaseTextField>this._nodeContainer2.getChildByName("curPosNumTxt");
        let posStr =  Api.bookroomVoApi.getPosListInStudy().length  + "/" +posNum;
        curPosNumTxt.text = LanguageManager.getlocal("bookRoom_posNUm",[posStr]); 
        
        
    }
    protected buySeatHandlerCallback(event:egret.Event)
    {   
        if (event && event.data && event.data.ret){
            let rdata = event.data.data;
            if(rdata.ret == 0)
            {   
                this.restList();
                let posNum =0;
                if(Api.switchVoApi.checkOpenSeat())
                { 
                    posNum = Api.bookroomVoApi.getMaxleng(); 
                }
                else
                {
                    posNum =  Api.bookroomVoApi.getSeatNum();
                }
            
                let curPosNumTxt = <BaseTextField>this._nodeContainer2.getChildByName("curPosNumTxt");
                let posStr =  Api.bookroomVoApi.getPosListInStudy().length  + "/" +posNum;
                curPosNumTxt.text = LanguageManager.getlocal("bookRoom_posNUm",[posStr]);

                if (posNum == GameConfig.config.bookroomCfg.maxPos)
                {
                    this._nodeContainer2.getChildByName("addBtn").visible = false;
                }
                else
                {
                    this._nodeContainer2.getChildByName("addBtn").visible = true;
                }
            
            //    if(Api.switchVoApi.checkOpenSeat()==false)
            //    {
            //         // let posNum = Api.bookroomVoApi.getSeatNum();
            //         // this.makeSeatItem2(posNum -1);
            //         // this.makeBatchBtn(posNum); 
            //         this.restList();
            //    }
            //    else
            //    {
            //         this.restList();
            //    }
        
                //重新布置背景 
            
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_buySeatTip1"));
            }else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_buySeatTip2"));
            }
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
        // if (Api.playerVoApi.getPlayerGem() < needNum)
        // {
        //     App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_gemNotEncouch"));
        //     return;
        // }
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
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj);
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
    
    private onekeyCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return;
        }
        let rData = evt.data.data.data;
        if (rData && rData.posPast){
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_autoDataChangeTip"));
        }
        this.refreshSeatNum(evt);
        this.restList();
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "bookroom_batch","bookroom_bg","bookroom_cdbg","bookroom_desk",
            "bookroom_desk_1",
            "bookroom_desk_2", 
            "bookroom_desk_1_b",
            "bookroom_desk_2_b",
            "bookroom_yf",
            "bookroom_mf", 
            "bookbanish_floor",
            "bookroom_tipbg","bookroom_visitIcon","forpeople_bottom","bookroom_visitIcon_down",
            "bookroomview_study_down","bookroomview_study","bookroomview_study_text"
            
		]);
	}

    private upData():void
    {   
        //额外 需要扩充的席位 
        var additionalNum = 0; 
        this._data = null;
        if(Api.switchVoApi.checkOpenSeat())
        {       
            var yearNum  = Api.bookroomVoApi.getYearlengh; 
            var monthNum  = Api.bookroomVoApi.getMonthNum; 
            let itemnum = Api.bookroomVoApi.geItemNum;
            let posNum = Api.bookroomVoApi.getSeatNum();

            //未拥有月卡，年卡时候
            additionalNum = 2;  
            if(yearNum==0)
            {
                additionalNum = 3;
            }
            posNum +=  additionalNum;
            posNum +=  yearNum;  //年卡数量
            posNum +=  monthNum;  //月卡数量  
            posNum +=  itemnum;  //道具卡数量  
            var data:any = {}; 
            if(yearNum>0)
            {   
                //年卡开了
                data.yearType = 1; 
            }
            else
            {
                data.yearType = 0;  
            } 
            
            if(monthNum>0)
            {
                data.monthType = 1; //月卡开了
                posNum-=Api.bookroomVoApi.vipmonthMaxnum;//数量2 
            }
            else
            {
                data.monthType = 0;  
            }
            data.maxNum = posNum;
            this._data = data;
        } 
        else
        {   
            var data:any = {}; 
            data.maxNum = Api.bookroomVoApi.getSeatNum();
            this._data =data;
        }
    }
   
    private showFloor(posNum:number=0):void
    {   
        this.clearFloor();
        var moveN = 0;
        if(posNum>10)
        {
             moveN =  posNum-10;
        }
        let floorNum:number = Math.ceil(moveN/2); 
        for (let i:number=0; i<floorNum+1; i++)
        {
            let floorTile:BaseBitmap = BaseBitmap.create("bookbanish_floor");
            floorTile.y = this.bg.height + floorTile.height*i;
            this._nodeContainer.addChild(floorTile);
            if(this.floorArr)
            {
                this.floorArr.push(floorTile);
            } 
        }
    }

    private clearFloor():void
    {   
        if(this.floorArr)
        {
            for(var i:number =0; i< this.floorArr.length; i++)
            {
                var floor =this.floorArr[i]; 
                if(floor&&floor.parent)
                {
                    floor.dispose();
                    floor =null;
                }
            }
            this.floorArr =  []
        }
       
    }

    private getBaseArray():Array<any>
    {
        let posNumArr =   Api.bookroomVoApi.getSeatNum(); 
        var  newArr:any = [];
        for(var i:number=0;i<posNumArr;i++)
        {   
            var mesObj:any={}; 
            mesObj.year=0;
            mesObj.month=0; 
            mesObj.posId = i+1+"";
            newArr.push(mesObj);
        } 
        return newArr; 
    }
    public getbigArr():Array<any>
    {
        var data = this._data;
        var baseArr =this.getBaseArray();
        var monthArr =   Api.bookroomVoApi.getMothBookList();
        var yearArr  =   Api.bookroomVoApi.getYearBookList();
        var unlockArr = Api.bookroomVoApi.getUnlockArr();
        let itemarr = Api.bookroomVoApi.getItemBookList();

        let tmparr = [];
        for(let j:number=0;j<itemarr.length;j++)
        {
            let unit:any=itemarr[j]; 
            if(unit.lock == 0 && unit.lastet > 0 && (unit.lastet > GameData.serverTime || unit.et > 0)){
                unit.year=0;
                unit.month=0; 
                unit.item = true;
                tmparr.push(itemarr[j]);
            }
        }  

        // if(Api.switchVoApi.checkOpenSeat())
        // {   
        //都解锁
        if(data.yearType==1&&data.monthType==1)
        {
            let arr = [];
            let monthLock = []; 
            for(var j:number=0;j<monthArr.length;j++)
            {
                var deskObj3 = monthArr[j]; 
                if(deskObj3.lock==0)
                {
                    deskObj3.month = 1;
                    arr.push(deskObj3);
                }
                else
                {
                    deskObj3.month = 2; 
                    monthLock.push(deskObj3);
                }
                
                // arr.push(deskObj3);
            }

            for(var i:number=0;i<yearArr.length;i++)
            {
                var deskObj2 = yearArr[i]; 
                deskObj2.year = 1; 
                arr.push(deskObj2);
            } 
            this.bigArr =  baseArr.concat(arr);
            this.bigArr = this.bigArr.concat(tmparr).concat(monthLock);
        }
        //年卡解锁，月卡未解锁
        else if(data.yearType==1&&data.monthType!=1)
        {
            let arr = []; 
            for(var i:number=0;i<yearArr.length;i++)
            {
                var deskObj2 = yearArr[i]; 
                deskObj2.year = 1; 
                arr.push(deskObj2);
            }

            let arr1 = []; 
            for(var j:number=0;j<monthArr.length;j++)
            {
                var deskObj3 = monthArr[j]; 
                deskObj3.month = 2;//月卡未解锁
                arr1.push(deskObj3);
            }
            // this.bigArr =  baseArr.concat(arr1);
            this.bigArr = baseArr.concat(arr).concat(tmparr).concat(arr1);
        }
        //年卡未解锁，月卡解锁
        else if(data.yearType!=1&&data.monthType==1)
        {
            let arr = [];
            let monthLock = [];  
            for(var j:number=0;j<monthArr.length;j++)
            {
                var deskObj3 = monthArr[j]; 
                // deskObj3.month = 1; 
                if(deskObj3.lock==0)
                {
                    deskObj3.month = 1;
                    arr.push(deskObj3);
                }
                else
                {
                    deskObj3.month = 2; 
                    monthLock.push(deskObj3);
                }
                // arr.push(deskObj3);
            }

            // //未来解锁年卡
            // for(var i:number=0;i<1;i++)
            // {
            //     var deskObj2:any={};
            //     deskObj2.year = 2;
            //     arr.push(deskObj2);
            // } 
            this.bigArr =  baseArr.concat(arr).concat(tmparr).concat(monthLock);
        }
        //年卡未解锁，月卡未解锁
        else  
        { 
            var arr=[];
            for(var j:number=0;j<Api.bookroomVoApi.vipmonthMaxnum;j++)
            {
                var deskObj3:any={};
                deskObj3.month = 2; 
                arr.push(deskObj3);
            }  
            this.bigArr =  baseArr.concat(tmparr).concat(arr);
        }  

        let lastArr = this.bigArr.concat(unlockArr);
        // let tmparr = [];
        // for(let j:number=0;j<itemarr.length;j++)
        // {
        //     let unit:any=itemarr[j]; 
        //     if(unit.lock == 0 && unit.lastet > 0 && (unit.lastet > GameData.serverTime || unit.et > 0)){
        //         unit.year=0;
        //         unit.month=0; 
        //         unit.item = true;
        //         tmparr.push(itemarr[j]);
        //     }
        // }  
        // lastArr = lastArr.concat(tmparr);

        
        if(Api.switchVoApi.checkOpenSeat())
        {
             return lastArr; 
        }
        else
        {
             return baseArr.concat(tmparr);
        } 
    }
    private restList():void
    {
        //清空之前列表
        this.upData();
        for(var i =0;i< this.itemArr.length;i++)
        {
            var item = this.itemArr[i];
            if(item)
            {
                item.dispose();//parent.removeChild(item);
                item = null;
            }
            // this._nodeContainer.removeChild(item);
        }
        this.itemArr = []; 

        //重新布局列表排序
        this.bigArr = this.getbigArr(); 
        this.showFloor(this.bigArr.length); 
        for (var index = 0; index < this.bigArr.length; index++) 
        {   
            var currObj = this.bigArr[index]; 
            var num = Number(currObj.posId);  
            this.makeSeatItem(num,currObj,index);
        } 
        // this.makeBatchBtn(this.bigArr.length); 
    }

    private useCallback(event:egret.Event=null):void
	{ 
		let isBuy = Api.shopVoApi.ifBuyMonthCard();
        let isyearBuy = Api.shopVoApi.ifBuyYearCard();
		if(isBuy||isyearBuy)
		{
            this.restList();
        } 
    }

    //原来逻辑
    protected makeSeatItem2(index:number)
    {
        let bookRoomInfoItem = new BookroomInfoItem();
        bookRoomInfoItem.init(index+1);
        
        let posX = 20;
        if((index%2) == 1)
        {
        //如果是比较长的语言  bookRoomInfoItem中的容器会被文本撑开  所以默认固定间隔是桌子的宽度 284 
        //    posX = GameConfig.stageWidth -bookRoomInfoItem.width - posX ;
            posX = GameConfig.stageWidth - 304;
        }
        let posY = 500 + Math.floor(index/2)* 200;
        bookRoomInfoItem.x = posX;
        bookRoomInfoItem.y = posY;
        this._nodeContainer.addChild(bookRoomInfoItem);
    }

    //主线任务引导 最靠上的空位置
    public getFirstEmptySeat():any{
        let data = this.bigArr;
        for (let i=0; i < data.length; i++){
            let bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(Number(data[i].posId));
            if (!bRoomInfoVo){
                if (data[i].year == 1 || data[i].month == 1){
                    if (data[i].item){
                        if (data[i].lastet - GameData.serverTime > 0){
                            return {index: i, data: data[i]};
                        }
                    }
                    else{
                       return {index: i, data: data[i]};
                    }
                }
                else if (data[i].year==0 && data[i].month == 0){
                    if (data[i].item){
                        if (data[i].lastet - GameData.serverTime > 0 ){
                            return {index: i, data: data[i]};
                        }
                    }
                    else{
                        return {index: i, data: data[i]};
                    }
                } 
            }
        }
        return {index: -1, data: null};
    }

    protected getRuleInfo()
	{ 
        if(Api.switchVoApi.checkOpenSeat())
		{
			return "bookroomRuleInfo_withNewMonthYear";
		}
		return "bookroomRuleInfo";
	}

    protected getExtraRuleInfo():string
    {   
        let params:string[] = [];
        
        if ( Api.switchVoApi.checkOpenSeat())
        {
           params.push(LanguageManager.getlocal("bookroomRuleInfoPart1"));
        }
        else
        {
            params.push("");
        }
        return LanguageManager.getlocal("bookroomRuleInfoSpell",params);
    }


    public dispose():void
	{
		Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_BUY),this.buySeatHandlerCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshSeatNum,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshSeatNum,this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REST_BOOKROOM,this.restList,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY, this.onekeyCallback, this);
        this._nodeContainer = null;
        this._nodeContainer2 = null;
        this.bigArr=null;
        this.floorArr =null;
        this.baseArr =null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        super.dispose();
    }
}