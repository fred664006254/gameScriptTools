/**
* 兵部 单个建筑 item
* date 2020.5.8
* author ycg
* @name SixSection1BuildItem
*/
class SixSection1BuildItem extends ScrollListItem{
    private _data:any = null;
    private _itemIndex:number = 0;
    private _timeBg:BaseBitmap = null;
    private _timeDown:BaseTextField = null;
    private _seat:BaseBitmap = null;
    private _person:BaseBitmap = null;
    private _emptySeat:BaseBitmap = null;
    private _selEff:CustomMovieClip = null;

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        this._itemIndex = index;
        this._data = data;
        let isBig = param.isBig;

        let baseIndex = data.baseCfg.index;
        let container = new BaseDisplayObjectContainer();
        this.addChild(container);

        //座位
        let seatImg = "sixsection1_seat"+(baseIndex+1);
        let seat = BaseBitmap.create(seatImg);
        container.width = seat.width;
        container.height = seat.height + 30;
        this._seat = seat;
        
        //人
        let person = BaseBitmap.create("sixsection1_seat_person");
        container.addChild(person);
        person.x = container.width/2 - person.width/2;
        person.y = 2;
        person.visible = false;
        this._person = person;

        seat.setPosition(0, 30);
        container.addChild(seat);

        if (baseIndex == 0){
            container.height = 405;
            seat.y = 264;
            person.y = 237;
            person.x = container.width/2 - person.width/2 + 8;
        }

        //阴影
        let buildMask = BaseBitmap.create("sixsection1_seatmask_"+(baseIndex+1));
        buildMask.setPosition(seat.x, seat.y);
        buildMask.setScale(4);
        container.addChild(buildMask);
        buildMask.alpha = 0;
        
        //空座位
        let emptySeat = BaseBitmap.create("sixsection1_seat_empty");
        container.addChild(emptySeat);
        emptySeat.setPosition(container.width/2 - emptySeat.width/2, seat.y + seat.height/2 - emptySeat.height/2);
        emptySeat.visible = false;
        this._emptySeat = emptySeat;

        //选中特效
        let selEff = ComponentManager.getCustomMovieClip("sixsection1_seatseleff", 10, 70);
        selEff.width = 239;
        selEff.height = 180;
        selEff.setScale(0.8);
        selEff.setPosition(seat.x + seat.width/2 - selEff.width * selEff.scaleX /2, seat.y + seat.height/2 - selEff.height * selEff.scaleY/2);
        container.addChild(selEff);
        this._selEff = selEff;
        selEff.visible = false;

        // this.addTouchTap(this.seatClick, this, [index + 1]);
        this.addTouch((event: egret.TouchEvent) => {
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    buildMask.alpha = 0.5;
                    break;
                case egret.TouchEvent.TOUCH_TAP:
                    buildMask.alpha = 0.5;
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                    buildMask.alpha = 0;
                    break;
                case egret.TouchEvent.TOUCH_END:
                    buildMask.alpha = 0;
                    this.seatClick(null, index+1);
                    break;
            }
        }, this);

        //倒计时
        let timeBg = BaseBitmap.create("public_9_viewmask");
        timeBg.width = seat.width;
        timeBg.height = 20;
        timeBg.setPosition(container.width/2 - timeBg.width/2, seat.y + seat.height - timeBg.height);
        container.addChild(timeBg);
        timeBg.visible = false;
        this._timeBg = timeBg;

        let timeDown = ComponentManager.getTextField("", 14, TextFieldConst.COLOR_WHITE);
        timeDown.setPosition(timeBg.x, timeBg.y + timeBg.height/2 - 7);
        container.addChild(timeDown);
        this._timeDown = timeDown;
        timeDown.visible = false;

        this.width = container.width;
        this.height = container.height;

        // this.update();
        TickManager.addTick(this.tick, this);
        // this.cacheAsBitmap = true;
    }

    public update():void{
        let lineNum = this._data.lineNum;
        let seatInfo = Api.sixsection1VoApi.getSeatDataByPos(lineNum, this._itemIndex);
        let baseCfg = this._data.baseCfg;
        // App.LogUtil.log("builditem update "+lineNum);
        // console.log("update seatInfo ",seatInfo);
        // if (!Api.sixsection1VoApi.isInPeriousTime()){

        //     return;
        // }
        if (seatInfo && Object.keys(seatInfo).length > 0){
            let et = Math.ceil(seatInfo.remain * 3600 / baseCfg.shujijingyanSpeed) + seatInfo.st;
            if (GameData.serverTime >= et){
                this._timeBg.visible = false;
                this._timeDown.visible = false;
                this._emptySeat.visible = true;
                this._person.visible = false;
                this._seat.visible = false;
                if (this._data.baseCfg.index == 0){
                    this._emptySeat.visible = false;
                    this._seat.visible = true;
                    App.DisplayUtil.changeToGray(this._seat);
                }
                else{
                    App.DisplayUtil.changeToGray(this._emptySeat);
                }
            }
            else{
                this._timeBg.visible = true;
                this._timeDown.visible = true;
                this._emptySeat.visible = false;
                this._person.visible = true;
                this._seat.visible = true;
                App.DisplayUtil.changeToNormal(this._seat);
                let timeNum = et - GameData.serverTime;
                if (timeNum < 0){
                    timeNum = 0;
                }
                if (seatInfo.uid == Api.playerVoApi.getPlayerID()){
                    this._timeDown.setColor(TextFieldConst.COLOR_WARN_YELLOW);
                }
                else{
                    this._timeDown.setColor(TextFieldConst.COLOR_WHITE);
                }
                this._timeDown.text = App.DateUtil.getFormatBySecond(timeNum, 1);
                this._timeDown.x = this._timeBg.x + this._timeBg.width/2 - this._timeDown.width/2;
            }   
        }   
        else{
            App.DisplayUtil.changeToNormal(this._seat);
            this._timeBg.visible = false;
            this._timeDown.visible = false;
            this._emptySeat.visible = false;
            this._person.visible = false;
            this._seat.visible = true;
        }
    }

    private tick():void{
        if (this._timeDown && this._timeDown.visible){
            let baseCfg = this._data.baseCfg;
            let mapInfo = Api.sixsection1VoApi.getMapInfoByFloor(this._data.lineNum);
            if (!Api.sixsection1VoApi.isInPeriousTime()){
                this._timeBg.visible = false;
                this._timeDown.visible = false;
                TickManager.removeTick(this.tick, this);
                return ;
            }
            if (mapInfo && mapInfo.length > 0){
                let data = mapInfo[this._itemIndex];
                let et = data.st + Math.ceil(data.remain * 3600 / baseCfg.shujijingyanSpeed);
                let dt = et - GameData.serverTime;
                if (dt <= 0){
                    dt = 0;
                    this._timeBg.visible = false;
                    this._timeDown.visible = false;
                    TickManager.removeTick(this.tick, this);
                    App.LogUtil.log("tick end");
                    this.update();
                }
                else{
                    this._timeDown.text = App.DateUtil.getFormatBySecond(dt, 1);
                    this._timeDown.x = this._timeBg.x + this._timeBg.width/2 - this._timeDown.width/2;
                    // this._timeDown.y = this._seat.y + this._seat.height * this._seat.scaleY - this._timeDown.height;
                }  
            }
        }
        // this.update();
    }

    private seatClick(evt:any, index:number):void{
        App.LogUtil.log("seatClick "+index + "linenum "+this._data.lineNum);
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
            return ;
        }
        let mapInfo = Api.sixsection1VoApi.getMapInfoByFloor(this._data.lineNum);
        let uid = null;
        let endTime = 0;
        let seatCfg = this._data.baseCfg;
        if (mapInfo && mapInfo[this._itemIndex] && Object.keys(mapInfo[this._itemIndex]).length > 0){
            //席位有人
            let info = mapInfo[this._itemIndex];
            uid = info.uid;
            endTime =info.st + Math.ceil(info.remain * 3600 / seatCfg.shujijingyanSpeed);
        }
        //判断时间是否已结束
        if (endTime > 0 && GameData.serverTime > endTime){
            uid = null;
            //暂无资源
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldSeatNotResTip"));
            return ;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.SIXSECTION1HOLDSEATPOPUPVIEW, {data: this._data, index: this._itemIndex, uid: uid});
    }

    public showLight():void{
        this._selEff.visible = true;
        this._selEff.playWithTime(3);
        this._selEff.setEndCallBack(()=>{
            this._selEff.visible = false;
        }, this);
    }

    public getSpaceX():number{
        return 0;
    }

    public getSpaceY():number{
        return 0;
    }

    public dispose():void{
        TickManager.removeTick(this.tick, this);
        this._itemIndex = 0;
        this._data = null;
        this._timeBg = null;
        this._timeDown = null;
        this._seat = null;
        this._person = null;
        this._emptySeat = null;
        this._selEff = null;

        super.dispose();
    }
}