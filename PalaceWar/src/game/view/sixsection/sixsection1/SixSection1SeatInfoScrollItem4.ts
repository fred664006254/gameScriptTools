/**
* 编号查询 item 
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoScrollItem4
*/
class SixSection1SeatInfoScrollItem4 extends ScrollListItem{
    private _data:any = null;
    private _powerTf:BaseTextField = null;

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        this._data = data;

        this.width = 530;
        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width/2 - bg.width/2;
        this.addChild(bg);

        let titleBg = BaseBitmap.create("sixsection1_spointresult_titlebg");
        titleBg.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(titleBg);
        titleBg.width = bg.width - 25;
        let buildName = "";
        if (data.type == "director"){
            buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName"+(data.buildCfg.baseCfg.index+1));
        }
        else{
            buildName = LanguageManager.getlocal("sixSection1BuildName"+(data.buildCfg.baseCfg.index+1));
        }
        let titleName = ComponentManager.getTextField((index+1)+"."+ "<u>"+buildName+"</u>", TextFieldConst.FONTSIZE_CONTENT_COMMON , TextFieldConst.COLOR_LIGHT_YELLOW);
        titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height/2 - titleName.height/2);
        this.addChild(titleName);
        titleName.addTouchTap(this.nameClick, this, [data.data.x]);

        if (data.type == "director"){
            let title = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1TitlePopupViewTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_WARN_RED3);
            title.setPosition(titleBg.x + titleBg.width - title.width - 35, titleBg.y + titleBg.height/2 - title.height/2);
            this.addChild(title);
        }
        // let timeDownStr = App.DateUtil.getFormatBySecond(data.st, 4);
        // let timeDown = ComponentManager.getTextField(timeDownStr, TextFieldConst.FONTSIZE_CONTENT_SMALL , TextFieldConst.COLOR_LIGHT_YELLOW);
        // timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height/2 - timeDown.height/2);
        // this.addChild(timeDown);

        //席位
        let seat = BaseBitmap.create("sixsection1_seaticon");
        seat.setPosition(bg.x + 10, titleBg.y + titleBg.height + 10);
        this.addChild(seat);

        //剩余采集时间/影响力上上限
        let remianResStr = "";
        let getResNumStr = "";
        if (data.type == "director"){
            getResNumStr = LanguageManager.getlocal("sixSection1SeatInfoSearchInfluence", [""+data.buildCfg.baseCfg.maxInfluence]);
            remianResStr = LanguageManager.getlocal("sixSection1SeatInfoSearchInfluenceSpeed", [""+data.buildCfg.baseCfg.influenceSpeed]);
        }
        else{
            let getResNum = Math.floor((data.st - data.data.st) * data.buildCfg.baseCfg.shujijingyanSpeed / 3600);
            if (getResNum > data.data.remain){
                getResNum = data.data.remain;
            }
            remianResStr = LanguageManager.getlocal("sixSection1HoldSeatRes3", [""+(data.data.remain - getResNum), ""+data.buildCfg.baseCfg.max]);
            getResNumStr = LanguageManager.getlocal("sixSection1SeatInfoPointGetInfo", [""+getResNum]);
        }

        //待采集资源/影响力上限
        let getRes = ComponentManager.getTextField(getResNumStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON , TextFieldConst.COLOR_BROWN);
        getRes.setPosition(seat.x + seat.width + 10, seat.y + 10);
        this.addChild(getRes);

        //剩余资源/影响力速度
        let remainRes = ComponentManager.getTextField(remianResStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON , TextFieldConst.COLOR_BROWN);
        remainRes.setPosition(getRes.x, getRes.y + getRes.height + 10);
        this.addChild(remainRes);

        //消耗影响力
        if (data.type != "director"){
            let holdNeedStr = "sixSection1HoldSeatNeed1";
            let influenceData = Api.sixsection1VoApi.getInfluenceData();
            let need = data.buildCfg.baseCfg.influenceNeed;
            if (influenceData.num < need){
                holdNeedStr = "sixSection1HoldSeatNeed2";
            }
            let needPower = ComponentManager.getTextField(LanguageManager.getlocal(holdNeedStr, [""+need, ""+Math.floor(influenceData.num)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON , TextFieldConst.COLOR_BROWN);
            needPower.setPosition(remainRes.x, remainRes.y + remainRes.height + 10);
            this.addChild(needPower);
            bg.height = needPower.y + needPower.height + 10;
            this._powerTf = needPower;
            this.refreshPower();
        }
        else{
            bg.height = remainRes.y + remainRes.height + 10;
        } 

        let goBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskGoBtn", this.goBtnClick, this, [data.data.x]);
        goBtn.setPosition(bg.x + bg.width - goBtn.width - 1, titleBg.y + titleBg.height + (bg.height - titleBg.height - 5)/2 - goBtn.height/2);
        this.addChild(goBtn);

        TickManager.addTick(this.tick, this);
    }

    private goBtnClick(index:number):void{
        this.nameClick(null, index);
    }

    private nameClick(evt:egret.TouchEvent, index:any):void{
        let lineNum = this._data.data.x;
        let colNum = this._data.data.y;
        if (this._data.type == "director"){
            ViewController.getInstance().openView(ViewConst.POPUP.SIXSECTION1TITLEPOPUPVIEW, {lineNum: lineNum, colNum: colNum});
        }
        else{
            let sixSection1View = <SixSection1View>ViewController.getInstance().getView(ViewConst.COMMON.SIXSECTION1VIEW);
            sixSection1View.jumpToFloor(lineNum, colNum);
        }
        let baseView = ViewController.getInstance().getView(ViewConst.POPUP.SIXSECTION1SEATINFOPOPUPVIEW);
        baseView.hide();
    }

    private refreshPower():void{
        if (this._powerTf){
            let svTime = GameData.serverTime;
            let influData = Api.sixsection1VoApi.getInfluenceData();
            if (influData){
                let dt = Math.floor((svTime - influData.st) / 60);
                let currNum = Math.floor(influData.num + dt * influData.speed / 60);
                if (influData.max <= currNum){
                    currNum = influData.max;
                    if (influData.num > influData.max){
                        currNum = influData.num;
                    }
                }
                let need = this._data.buildCfg.baseCfg.influenceNeed;
                let holdNeedStr = "sixSection1HoldSeatNeed1";
                if (currNum < need){
                    holdNeedStr = "sixSection1HoldSeatNeed2";
                }

                this._powerTf.text = LanguageManager.getlocal(holdNeedStr, [""+need, ""+Math.floor(currNum)]); 
            }
        }
    }

    private tick():void{
        if (this._powerTf){
            let svTime = GameData.serverTime;
            let influData = Api.sixsection1VoApi.getInfluenceData();
            if (influData && (svTime - influData.st) % 60 == 0){
                let dt = Math.floor((svTime - influData.st) / 60);
                let currNum = Math.floor(influData.num + dt * influData.speed / 60);
                if (influData.max <= currNum){
                    currNum = influData.max;
                    if (influData.num > influData.max){
                        currNum = influData.num;
                    }
                }
                let need = this._data.buildCfg.baseCfg.influenceNeed;
                let holdNeedStr = "sixSection1HoldSeatNeed1";
                if (currNum < need){
                    holdNeedStr = "sixSection1HoldSeatNeed2";
                }

                this._powerTf.text = LanguageManager.getlocal(holdNeedStr, [""+need, ""+Math.floor(currNum)]); 
            }
        }
    }

    public getSpaceX():number{
        return 5;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        TickManager.removeTick(this.tick, this);
        this._powerTf = null;
        this._data = null;
        super.dispose();
    }
}