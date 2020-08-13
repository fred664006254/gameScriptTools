/**
* 江湖声望 席位 item
* date 2020.7.8
* author ycg
* @name NewAtkraceCrossFamePopupScrollItem
*/
class NewAtkraceCrossFamePopupScrollItem extends ScrollListItem{
    private _titleItemList:NewAtkraceCrossFamePopupItem[] = [];

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        this.width = 522;
        let container = new BaseDisplayObjectContainer();
        container.width = this.width;
        this.addChild(container);
        
        let baseCfg = data.baseCfg;
        if (data.isFirst){
            let titleBgStr = "newcrossatkrace_fametitlenamebg"+ (data.baseCfg.index+1);
            if (!ResourceManager.hasRes(titleBgStr)){
                titleBgStr = "newcrossatkrace_fametitlenamebg4";
            }
            let titleBg = BaseBitmap.create(titleBgStr);
            titleBg.x = this.width/2 - titleBg.width/2;
            this.addChild(titleBg);
            container.y = titleBg.height + 20;
            
            let titleTxt = BaseBitmap.create("newcrossatkrace_fame_titlename"+ (data.baseCfg.index+1));
            titleTxt.x = this.width/2 - titleTxt.width/2;
            titleTxt.y = titleBg.y + 5;
            this.addChild(titleTxt);
        }

        let seatType = baseCfg.perMaxSeat;
        let spaceX = 0;
        let itemH:number = 0;
        for (let i = 0; i < data.seatNum; i++){
            let item = new NewAtkraceCrossFamePopupItem();
            item.initItem(i, data, null);
            container.addChild(item);
            this._titleItemList[i] = item;
            let offX = 0;
            if (seatType == 1){
                offX = container.width/2 - item.width/2;
            }
            else if (seatType == 5){
                spaceX = 20;
                offX = 5 + (container.width - seatType * item.width - (seatType -1) * spaceX)/2 + i%seatType * (item.width + spaceX);
            }
            else if (seatType == 6){
                spaceX = 7;
                offX = 5 + (container.width - seatType * item.width - (seatType -1) * spaceX)/2 + i%seatType * (item.width + spaceX);
            }
            item.x = offX;
            itemH = item.height;
        }
        container.height = itemH;
        
        this.height = container.y + container.height + this.getSpaceY();

        // let lineContainer = new BaseDisplayObjectContainer();
        // this.addChild(lineContainer);
        // let lineBg = BaseBitmap.create("sixsectionmainui_linenumbg1");
        // lineBg.width = 30;
        // lineBg.height = this.height+ 1;
        // lineContainer.width = lineBg.width;
        // lineContainer.height = lineBg.height;
        // lineContainer.addChild(lineBg);

        // let lineNum = ComponentManager.getTextField(""+data.lineNum, 14, TextFieldConst.COLOR_WHITE);
        // lineNum.setPosition(lineBg.x + lineBg.width/2 - lineNum.width/2, container.y + (container.height - 30)/2 - lineNum.height/2);
        // lineContainer.addChild(lineNum);
        
    }

    public freshData(){
        for (let i=0; i < this._titleItemList.length; i++){
            this._titleItemList[i].update();
        }
    }

    public playAni(index:number):void{
        App.LogUtil.log("playani "+index);
        let item = this._titleItemList[index-1];
        if (item){
            item.playAni();
        }
    }

    public getSpaceX():number{
        return 0;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this._titleItemList = [];

        super.dispose();
    }
}